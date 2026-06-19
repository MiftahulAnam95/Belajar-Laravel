window.LaravelLabEditor = (() => {
  const data = window.LaravelLabData;
  const debugAttemptStorageKey = "laravel-beginner-lab-debug-attempts-v1";
  let elements = {};

  const escapeHTML = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const loadStoredMap = (key) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch (error) {
      return {};
    }
  };

  const getActiveDebugChallenge = () => {
    const debugId = new URLSearchParams(window.location.search).get("debug");
    return data.debugChallenges.find((challenge) => challenge.id === debugId);
  };

  const getDebugEditorTarget = (code = "") => {
    const source = code.trim();
    if (/^<|@csrf|@error|@method|\{\{|@foreach|@if/i.test(source)) return "blade";
    if (/Route::|^use\s+|DB_|GET\s+\/api|routes\/api\.php/i.test(source)) return "routes";
    if (/class\s+\w+|function\s+\w+|\$request|return\s+view|::create|extends\s+Model/i.test(source)) return "controller";
    return "routes";
  };

  const saveDebugDraft = (challenge, code) => {
    if (!challenge) return;
    const attempts = loadStoredMap(debugAttemptStorageKey);
    attempts[challenge.id] = {
      ...(attempts[challenge.id] || {}),
      code,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(debugAttemptStorageKey, JSON.stringify(attempts));
  };

  const unquote = (value) => value.trim().slice(1, -1).replace(/\\(["'\\])/g, "$1");

  const splitTopLevel = (source = "") => {
    const parts = [];
    let buffer = "";
    let depth = 0;
    let quote = null;

    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      const previous = source[index - 1];

      if (quote) {
        buffer += char;
        if (char === quote && previous !== "\\") quote = null;
        continue;
      }

      if (char === "'" || char === '"') {
        quote = char;
        buffer += char;
        continue;
      }

      if (char === "[" || char === "(") depth += 1;
      if (char === "]" || char === ")") depth -= 1;

      if (char === "," && depth === 0) {
        if (buffer.trim()) parts.push(buffer.trim());
        buffer = "";
        continue;
      }

      buffer += char;
    }

    if (buffer.trim()) parts.push(buffer.trim());
    return parts;
  };

  const splitPair = (source = "") => {
    let depth = 0;
    let quote = null;

    for (let index = 0; index < source.length - 1; index += 1) {
      const char = source[index];
      const previous = source[index - 1];

      if (quote) {
        if (char === quote && previous !== "\\") quote = null;
        continue;
      }

      if (char === "'" || char === '"') {
        quote = char;
        continue;
      }

      if (char === "[" || char === "(") depth += 1;
      if (char === "]" || char === ")") depth -= 1;
      if (char === "=" && source[index + 1] === ">" && depth === 0) {
        return [source.slice(0, index).trim(), source.slice(index + 2).trim()];
      }
    }

    return null;
  };

  const parseValue = (rawValue = "", variables = {}) => {
    const value = rawValue.trim().replace(/,$/, "");
    if (!value) return "";
    if (/^['"]/.test(value) && /['"]$/.test(value)) return unquote(value);
    if (/^\$[A-Za-z_]\w*$/.test(value)) return variables[value.slice(1)] ?? "";
    if (/^(true|false)$/i.test(value)) return value.toLowerCase() === "true";
    if (/^null$/i.test(value)) return null;
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);

    if (value.startsWith("[") && value.endsWith("]")) {
      const inside = value.slice(1, -1).trim();
      if (!inside) return [];
      const items = splitTopLevel(inside);
      const pairs = items.map(splitPair);

      if (pairs.every(Boolean)) {
        return Object.fromEntries(
          pairs.map(([key, itemValue]) => [String(parseValue(key, variables)), parseValue(itemValue, variables)])
        );
      }

      return items.map((item) => parseValue(item, variables));
    }

    return value;
  };

  const parseVariables = (source = "") => {
    const variables = {};
    const pattern = /\$([A-Za-z_]\w*)\s*=\s*(\[[\s\S]*?\]|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|-?\d+(?:\.\d+)?|true|false|null)\s*;/g;
    let match;

    while ((match = pattern.exec(source))) {
      variables[match[1]] = parseValue(match[2], variables);
    }

    return variables;
  };

  const parseRoute = (source = "") => {
    const warnings = [];
    const routeMatch = source.match(/Route::(get|post|put|patch|delete)\(\s*['"]([^'"]+)['"]\s*,\s*([\s\S]*?)\)\s*(?:->name\(\s*['"]([^'"]+)['"]\s*\))?\s*;/);

    if (!routeMatch) {
      warnings.push("Route belum terbaca. Gunakan pola Route::get('/path', ...); agar simulator dapat mengikuti alurnya.");
      return { method: "GET", path: "/", name: null, action: null, warnings };
    }

    const [, method, path, actionSource, name] = routeMatch;
    const controllerMatch = actionSource.match(/\[\s*([A-Za-z_]\w*)::class\s*,\s*['"]([A-Za-z_]\w*)['"]\s*\]/);
    const closureView = actionSource.match(/function\s*\([^)]*\)\s*\{([\s\S]*)\}$/);

    return {
      method: method.toUpperCase(),
      path,
      name: name || null,
      action: controllerMatch
        ? { type: "controller", controller: controllerMatch[1], method: controllerMatch[2] }
        : { type: "closure", body: closureView?.[1] || actionSource },
      warnings
    };
  };

  const parseViewReturn = (source = "") => {
    const variables = parseVariables(source);
    const viewMatch = source.match(/return\s+view\(\s*['"]([^'"]+)['"]\s*(?:,\s*([\s\S]*?))?\)\s*;/);

    if (!viewMatch) {
      const textMatch = source.match(/return\s+['"]([^'"]+)['"]\s*;/);
      return {
        view: null,
        data: {},
        directHtml: textMatch ? escapeHTML(textMatch[1]) : null
      };
    }

    return {
      view: viewMatch[1],
      data: viewMatch[2] ? parseValue(viewMatch[2].trim(), variables) : {},
      directHtml: null
    };
  };

  const resolvePath = (scope, expression = "") => {
    const cleaned = expression.trim().replace(/^\$/, "");
    const parts = cleaned.split(/->|\./).filter(Boolean);
    return parts.reduce((value, key) => {
      if (value == null) return "";
      return value[key] ?? "";
    }, scope);
  };

  const renderBlade = (template = "", viewData = {}) => {
    const renderWithScope = (source, scope) => {
      let html = source;

      html = html.replace(/{{--[\s\S]*?--}}/g, "");
      html = html.replace(/@csrf/g, '<input type="hidden" name="_token" value="simulated-csrf-token">');
      html = html.replace(/@method\(\s*['"]([^'"]+)['"]\s*\)/g, '<input type="hidden" name="_method" value="$1">');

      html = html.replace(/@if\s*\(\s*\$([A-Za-z_]\w*)\s*\)([\s\S]*?)@endif/g, (_, key, body) =>
        scope[key] ? renderWithScope(body, scope) : ""
      );

      html = html.replace(
        /@foreach\s*\(\s*\$([A-Za-z_]\w*)\s+as\s+\$([A-Za-z_]\w*)\s*\)([\s\S]*?)@endforeach/g,
        (_, collectionName, itemName, body) => {
          const collection = Array.isArray(scope[collectionName]) ? scope[collectionName] : [];
          return collection
            .map((item) => renderWithScope(body, { ...scope, [itemName]: item }))
            .join("");
        }
      );

      html = html.replace(/{{\s*\$([A-Za-z_]\w*(?:(?:->|\.)[A-Za-z_]\w*)*)\s*}}/g, (_, expression) =>
        escapeHTML(resolvePath(scope, expression))
      );

      return html;
    };

    return renderWithScope(template, viewData);
  };

  const buildPreview = (css, body) => {
    const safeCSS = css.replace(/<\/style/gi, "<\\/style");
    const safeBody = body.replace(/<\/script/gi, "<\\/script");

    return `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <style>
      ${safeCSS}
      .laravel-empty-output {
        color: #647089;
        font: 14px/1.6 Arial, sans-serif;
        padding: 18px;
      }
    </style>
  </head>
  <body>
    ${safeBody || '<p class="laravel-empty-output">Blade selesai dirender, tetapi belum ada output HTML.</p>'}
  </body>
</html>`;
  };

  const runEditor = () => {
    const routeSource = elements.routes.value;
    const controllerSource = elements.controller.value;
    const bladeSource = elements.blade.value;
    const css = elements.css.value;
    const warnings = [];
    const route = parseRoute(routeSource);
    warnings.push(...route.warnings);

    let response;
    if (route.action?.type === "closure") {
      response = parseViewReturn(route.action.body);
    } else {
      const methodPattern = new RegExp(`function\\s+${route.action?.method || ""}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*)\\}`, "m");
      const methodMatch = controllerSource.match(methodPattern);
      if (!methodMatch) {
        warnings.push(`Method ${route.action?.method || "controller"} belum ditemukan di controller.`);
        response = { view: null, data: {}, directHtml: null };
      } else {
        response = parseViewReturn(methodMatch[1]);
      }
    }

    if (response.view && !bladeSource.trim()) warnings.push(`View ${response.view}.blade.php belum berisi HTML.`);
    if (!response.view && !response.directHtml) warnings.push("Simulator belum menemukan return view(...) atau return teks sederhana.");

    const rendered = response.directHtml || renderBlade(bladeSource, response.data);
    elements.frame.srcdoc = buildPreview(css, rendered);

    const summary = [
      `${route.method} ${route.path}${route.name ? ` (${route.name})` : ""}`,
      route.action?.type === "controller"
        ? `${route.action.controller}@${route.action.method}`
        : "Closure route",
      response.view ? `view: ${response.view}.blade.php` : "response langsung",
      `data view: ${Object.keys(response.data || {}).length} item`
    ];

    elements.console.textContent = warnings.length
      ? `Preview diperbarui dengan catatan:\n\n${warnings.map((warning) => `- ${warning}`).join("\n")}\n\nAlur terbaca:\n${summary.join(" -> ")}`
      : `Preview diperbarui. Alur Laravel terbaca:\n${summary.join(" -> ")}`;
  };

  const setActiveTab = (tabName) => {
    document.querySelectorAll("[data-editor-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.editorTab === tabName);
    });
    document.querySelectorAll("[data-editor-panel]").forEach((panel) => {
      panel.classList.toggle("d-none", panel.dataset.editorPanel !== tabName);
    });
  };

  const insertTab = (event) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const input = event.currentTarget;
    const start = input.selectionStart;
    input.value = `${input.value.slice(0, start)}  ${input.value.slice(input.selectionEnd)}`;
    input.setSelectionRange(start + 2, start + 2);
  };

  const init = () => {
    if (!document.getElementById("routesEditor")) return;

    elements = {
      routes: document.getElementById("routesEditor"),
      controller: document.getElementById("controllerEditor"),
      blade: document.getElementById("bladeEditor"),
      css: document.getElementById("cssEditor"),
      frame: document.getElementById("previewFrame"),
      console: document.getElementById("editorConsole")
    };

    elements.frame.setAttribute("sandbox", "allow-scripts");

    const activeDebug = getActiveDebugChallenge();
    const debugAttempt = activeDebug ? loadStoredMap(debugAttemptStorageKey)[activeDebug.id] || {} : {};
    const debugCode = debugAttempt.code || activeDebug?.code || "";
    const debugTarget = activeDebug ? getDebugEditorTarget(debugCode) : null;
    const editorState = { ...data.editorDefaults };
    if (activeDebug && debugTarget) editorState[debugTarget] = debugCode;

    elements.routes.value = editorState.routes;
    elements.controller.value = editorState.controller;
    elements.blade.value = editorState.blade;
    elements.css.value = editorState.css;

    if (activeDebug && debugTarget) {
      const head = elements[debugTarget].closest(".editor-shell")?.querySelector(".editor-head span");
      head?.insertAdjacentHTML("beforeend", ` <span class="editor-debug-badge">debug: ${escapeHTML(activeDebug.title)}</span>`);
      saveDebugDraft(activeDebug, elements[debugTarget].value);
    }

    [elements.routes, elements.controller, elements.blade, elements.css].forEach((input) => {
      input.addEventListener("keydown", insertTab);
      if (activeDebug && debugTarget && input === elements[debugTarget]) {
        input.addEventListener("input", () => saveDebugDraft(activeDebug, input.value));
      }
    });

    document.getElementById("runEditor").addEventListener("click", runEditor);
    document.querySelectorAll("[data-editor-tab]").forEach((button) => {
      button.addEventListener("click", () => setActiveTab(button.dataset.editorTab));
    });

    runEditor();
  };

  return {
    init,
    runEditor,
    parseRoute,
    parseViewReturn,
    renderBlade,
    escapeHTML
  };
})();
