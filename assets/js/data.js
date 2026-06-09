window.LaravelLabData = (() => {
  const starterPrerequisite =
    "Sudah pernah belajar HTML, CSS, JavaScript dasar, dan PHP dasar. Tidak perlu hafal semuanya, cukup paham alur halaman web dan sintaks PHP sederhana.";

  const lesson = (item) => ({
    icon: "bi-layers",
    duration: "10 menit",
    prerequisite: starterPrerequisite,
    overview: item.goal,
    steps: [
      "Baca masalah yang ingin diselesaikan.",
      "Perhatikan contoh kode dan nama file Laravel-nya.",
      "Ketik ulang contoh pada project Laravel lokal.",
      "Ubah satu nilai kecil lalu refresh hasilnya.",
      "Jawab recall sebelum lanjut ke materi berikutnya."
    ],
    terms: [
      { term: "Request", meaning: "Permintaan dari browser atau client ke aplikasi Laravel." },
      { term: "Response", meaning: "Jawaban yang dikirim Laravel kembali ke browser atau client." },
      { term: "Convention", meaning: "Kebiasaan struktur dan penamaan yang diikuti Laravel agar project mudah dibaca." }
    ],
    commonMistakes: [
      "Menyalin kode tanpa memperhatikan lokasi file.",
      "Lupa menjalankan server lokal atau migrasi saat materi membutuhkan database."
    ],
    checkpoint: "Kamu siap lanjut jika dapat menjelaskan alur konsep ini dengan bahasa sendiri.",
    filename: "routes/web.php",
    ...item
  });

  const lessons = [
    lesson({
      id: "intro-laravel",
      title: "Apa itu Laravel?",
      icon: "bi-braces-asterisk",
      duration: "8 menit",
      goal: "Memahami Laravel sebagai framework PHP yang membantu membuat aplikasi web lebih rapi.",
      problem: "Setelah belajar PHP, project bisa cepat berantakan jika routing, tampilan, validasi, dan database ditulis tanpa pola yang jelas.",
      analogy: "PHP dasar seperti bahan bangunan. Laravel seperti denah, peralatan, dan aturan kerja yang membuat bangunan lebih cepat selesai dan mudah dirawat.",
      explanation: "Laravel adalah framework PHP. Ia menyediakan routing, controller, Blade, Eloquent, migration, middleware, validation, session, dan banyak fitur siap pakai agar kita fokus ke logika aplikasi.",
      code: `// routes/web.php
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('welcome');
});`,
      lineNotes: [
        "Route::get mendaftarkan halaman yang dibuka dengan method GET.",
        "Tanda / berarti halaman utama aplikasi.",
        "return view('welcome') menampilkan file resources/views/welcome.blade.php."
      ],
      exercise: "Jelaskan dengan bahasamu sendiri mengapa Laravel disebut framework, bukan sekadar bahasa pemrograman baru.",
      recall: "Apa masalah yang dibantu Laravel setelah kamu belajar PHP dasar?",
      debug: {
        question: "Mengapa kode Laravel tidak cukup dibuka sebagai file HTML biasa?",
        hint: "Laravel tetap berjalan di atas PHP dan membutuhkan server aplikasi.",
        solution: "Jalankan project dengan php artisan serve atau web server yang mengarah ke folder public."
      },
      quiz: {
        question: "Laravel adalah...",
        options: ["Framework PHP", "Bahasa pengganti CSS", "Database server", "Editor kode"],
        answer: 0,
        explanation: "Laravel adalah framework yang berjalan di atas PHP."
      },
      previewOutput: "Browser membuka / lalu Laravel menampilkan view welcome."
    }),
    lesson({
      id: "persiapan-laravel",
      title: "Menyiapkan Laravel lokal",
      icon: "bi-terminal",
      duration: "12 menit",
      goal: "Membuat project Laravel dan menjalankan server lokal.",
      problem: "Laravel membutuhkan Composer, PHP, dan struktur project agar fitur artisan, routing, dan view bekerja.",
      analogy: "Composer seperti toko alat. Artisan seperti asisten bengkel yang bisa membuat file dan menjalankan tugas otomatis.",
      explanation: "Untuk mulai, pastikan PHP dan Composer tersedia. Buat project dengan Composer, masuk folder project, lalu jalankan php artisan serve.",
      filename: "terminal",
      code: `composer create-project laravel/laravel toko-belajar
cd toko-belajar
php artisan serve`,
      lineNotes: [
        "composer create-project mengunduh kerangka Laravel baru.",
        "cd masuk ke folder project.",
        "php artisan serve menjalankan server development Laravel."
      ],
      exercise: "Buat project Laravel baru bernama latihan-laravel lalu buka alamat localhost yang muncul di terminal.",
      recall: "Apa peran Composer dan Artisan dalam project Laravel?",
      debug: {
        question: "Terminal menampilkan composer tidak dikenali. Apa artinya?",
        hint: "Sistem belum menemukan program Composer.",
        solution: "Install Composer, tutup lalu buka terminal baru, kemudian cek dengan composer --version."
      },
      quiz: {
        question: "Perintah untuk menjalankan server development Laravel adalah...",
        options: ["php artisan serve", "laravel start css", "npm serve-laravel", "php route:start"],
        answer: 0,
        explanation: "Artisan menyediakan command serve untuk menjalankan server lokal."
      },
      previewOutput: "Laravel development server started: http://127.0.0.1:8000"
    }),
    lesson({
      id: "struktur-folder",
      title: "Membaca struktur folder",
      icon: "bi-folder2-open",
      duration: "11 menit",
      goal: "Mengenali folder penting agar tidak bingung menaruh kode.",
      problem: "Pemula sering bingung membedakan routes, app, resources, database, public, dan config.",
      analogy: "Project Laravel seperti sekolah: routes adalah papan informasi, controller adalah guru, views adalah ruang kelas, database adalah arsip.",
      explanation: "Laravel memisahkan tanggung jawab. Route biasanya berada di routes/web.php, controller di app/Http/Controllers, Blade di resources/views, migration di database/migrations, dan asset publik di public.",
      filename: "struktur-project",
      code: `app/Http/Controllers   -> controller
routes/web.php          -> route halaman web
resources/views         -> file Blade
database/migrations     -> rancangan tabel
public                  -> entry point dan asset publik`,
      lineNotes: [
        "routes/web.php adalah pintu masuk halaman web.",
        "resources/views berisi tampilan yang dikirim ke browser.",
        "database/migrations menyimpan riwayat perubahan struktur tabel."
      ],
      exercise: "Buka project Laravel lalu temukan folder routes, app/Http/Controllers, resources/views, dan database/migrations.",
      recall: "File apa yang biasanya kamu buka saat ingin menambah halaman web baru?",
      debug: {
        question: "Mengapa file CSS di resources tidak langsung bisa dibuka dari browser?",
        hint: "Browser hanya membaca asset publik dari folder tertentu.",
        solution: "Gunakan Vite untuk asset resources, atau letakkan asset statis sederhana di public jika memang perlu diakses langsung."
      },
      quiz: {
        question: "Folder untuk file Blade adalah...",
        options: ["resources/views", "routes/views", "public/controllers", "database/views"],
        answer: 0,
        explanation: "View Laravel disimpan di resources/views."
      },
      previewOutput: "Struktur project terbaca: route -> controller -> view -> database."
    }),
    lesson({
      id: "routing",
      title: "Routing: pintu masuk halaman",
      icon: "bi-signpost-split",
      duration: "12 menit",
      goal: "Membuat alamat URL dan menentukan response yang dikirim.",
      problem: "Aplikasi butuh banyak alamat seperti /produk, /kontak, dan /dashboard yang masing-masing punya isi berbeda.",
      analogy: "Route seperti resepsionis. Ia melihat alamat yang diminta lalu mengarahkan ke ruangan yang tepat.",
      explanation: "Route web ditulis di routes/web.php. Untuk halaman sederhana, route bisa langsung mengembalikan teks atau view.",
      code: `// routes/web.php
use Illuminate\\Support\\Facades\\Route;

Route::get('/kontak', function () {
    return 'Halaman kontak';
});`,
      lineNotes: [
        "GET cocok untuk membuka halaman.",
        "/kontak adalah alamat yang diketik di browser.",
        "Closure mengembalikan response sederhana."
      ],
      exercise: "Tambahkan route /tentang yang menampilkan teks pendek tentang dirimu.",
      recall: "Apa hubungan URL dan route?",
      debug: {
        question: "Mengapa halaman menampilkan 404 Not Found?",
        hint: "Laravel belum menemukan route yang cocok dengan URL.",
        solution: "Periksa path route, method HTTP, dan pastikan server menjalankan project yang benar."
      },
      quiz: {
        question: "File utama untuk route web adalah...",
        options: ["routes/web.php", "app.php", "public/index.html", "database/web.php"],
        answer: 0,
        explanation: "Laravel menyimpan route web di routes/web.php."
      },
      previewOutput: "GET /kontak -> Halaman kontak"
    }),
    lesson({
      id: "route-parameter",
      title: "Route parameter dan nama route",
      icon: "bi-sliders",
      duration: "13 menit",
      goal: "Membuat URL dinamis dan memberi nama pada route.",
      problem: "Aplikasi perlu halaman detail seperti /produk/sepatu dan link yang tetap aman saat alamat berubah.",
      analogy: "Parameter seperti formulir kecil di alamat. Nama route seperti kontak tersimpan, jadi kita tidak perlu menghafal alamat lengkap.",
      explanation: "Parameter ditulis dengan kurung kurawal. Nama route diberikan dengan ->name() dan dipanggil memakai helper route().",
      code: `// routes/web.php
Route::get('/produk/{slug}', function (string $slug) {
    return "Detail produk: " . $slug;
})->name('produk.show');`,
      lineNotes: [
        "{slug} menerima bagian URL yang berubah.",
        "$slug berisi nilai dari URL.",
        "name('produk.show') membuat route mudah dipanggil dari Blade atau controller."
      ],
      exercise: "Buat route /kelas/{nama} dan tampilkan nama kelasnya.",
      recall: "Mengapa named route lebih aman daripada menulis URL manual di banyak tempat?",
      debug: {
        question: "Mengapa helper route('produk.show') error missing parameter?",
        hint: "Route memiliki parameter wajib.",
        solution: "Kirim parameter: route('produk.show', ['slug' => 'sepatu'])."
      },
      quiz: {
        question: "Bagian dinamis pada /produk/{slug} disebut...",
        options: ["Route parameter", "CSS selector", "Migration", "Middleware"],
        answer: 0,
        explanation: "{slug} adalah route parameter."
      },
      previewOutput: "GET /produk/sepatu -> Detail produk: sepatu"
    }),
    lesson({
      id: "blade-template",
      title: "Blade template",
      icon: "bi-filetype-html",
      duration: "13 menit",
      goal: "Menampilkan data dari Laravel ke HTML dengan Blade.",
      problem: "HTML perlu menampilkan data dinamis tanpa membuat file PHP campur aduk.",
      analogy: "Blade seperti cetakan undangan. Isi nama dan detailnya berubah, tapi desain dasarnya tetap.",
      explanation: "Blade adalah template engine Laravel. Gunakan {{ }} untuk menampilkan data dengan aman dan directive seperti @foreach untuk perulangan.",
      filename: "resources/views/profil.blade.php",
      code: `<h1>Halo, {{ $nama }}</h1>

<ul>
  @foreach ($skills as $skill)
    <li>{{ $skill }}</li>
  @endforeach
</ul>`,
      lineNotes: [
        "{{ $nama }} menampilkan nilai variabel dengan escaping otomatis.",
        "@foreach mengulang data array.",
        "@endforeach menutup blok perulangan."
      ],
      exercise: "Buat view profil.blade.php yang menampilkan nama, kota, dan daftar target belajar.",
      recall: "Mengapa {{ }} lebih aman daripada echo mentah?",
      debug: {
        question: "Mengapa muncul undefined variable $nama?",
        hint: "View belum menerima data dari route atau controller.",
        solution: "Kirim data dengan return view('profil', ['nama' => 'Nadia'])."
      },
      quiz: {
        question: "Sintaks Blade untuk menampilkan data dengan aman adalah...",
        options: ["{{ $nama }}", "<? $nama ?>", "[[nama]]", "@show($nama)"],
        answer: 0,
        explanation: "Blade menggunakan {{ }} untuk output yang di-escape."
      },
      previewOutput: "Halo, Nadia\n- Route\n- Controller\n- Blade"
    }),
    lesson({
      id: "layout-blade",
      title: "Layout dan komponen Blade",
      icon: "bi-window-stack",
      duration: "14 menit",
      goal: "Menghindari pengulangan HTML dengan layout dan section.",
      problem: "Navbar, footer, dan struktur HTML akan berulang di banyak halaman jika tidak dibuat layout.",
      analogy: "Layout seperti bingkai buku. Setiap bab punya isi berbeda, tapi sampul, header, dan nomor halaman tetap rapi.",
      explanation: "Blade menyediakan @extends, @section, @yield, @include, dan component agar tampilan dapat disusun dari bagian kecil.",
      filename: "resources/views/layouts/app.blade.php",
      code: `<!-- layouts/app.blade.php -->
<title>@yield('title', 'Belajar Laravel')</title>
<main>
  @yield('content')
</main>

<!-- home.blade.php -->
@extends('layouts.app')
@section('title', 'Home')
@section('content')
  <h1>Belajar Laravel</h1>
@endsection`,
      lineNotes: [
        "@yield adalah slot yang akan diisi halaman anak.",
        "@extends memilih layout induk.",
        "@section mengisi bagian tertentu pada layout."
      ],
      exercise: "Buat layout app sederhana lalu pakai di halaman home dan kontak.",
      recall: "Apa keuntungan layout dibanding menyalin navbar ke semua view?",
      debug: {
        question: "Mengapa isi halaman tidak muncul di layout?",
        hint: "Nama section harus sama dengan yield.",
        solution: "Pastikan @section('content') cocok dengan @yield('content')."
      },
      quiz: {
        question: "Directive untuk memakai layout induk adalah...",
        options: ["@extends", "@loop", "@route", "@model"],
        answer: 0,
        explanation: "@extends menghubungkan view dengan layout induk."
      },
      previewOutput: "Layout app menampilkan section title dan content."
    }),
    lesson({
      id: "controller",
      title: "Controller: tempat logika halaman",
      icon: "bi-diagram-3",
      duration: "14 menit",
      goal: "Memindahkan logika dari route ke controller.",
      problem: "Route akan sulit dibaca jika semua logika halaman ditulis langsung di web.php.",
      analogy: "Route adalah resepsionis, controller adalah staf yang benar-benar menyiapkan jawabannya.",
      explanation: "Controller menyimpan method untuk menangani request. Route cukup menunjuk controller dan method yang sesuai.",
      filename: "app/Http/Controllers/PageController.php",
      code: `// routes/web.php
Route::get('/profil', [PageController::class, 'profil']);

// app/Http/Controllers/PageController.php
class PageController extends Controller
{
    public function profil()
    {
        return view('profil', ['nama' => 'Nadia']);
    }
}`,
      lineNotes: [
        "Route menunjuk PageController dan method profil.",
        "Method profil menyiapkan response.",
        "view('profil') membuka resources/views/profil.blade.php."
      ],
      exercise: "Buat PageController dengan method tentang, lalu hubungkan ke route /tentang.",
      recall: "Kapan logika sebaiknya dipindahkan dari route ke controller?",
      debug: {
        question: "Mengapa muncul Target class PageController does not exist?",
        hint: "Laravel belum menemukan class controller yang dimaksud.",
        solution: "Import controller dengan use App\\Http\\Controllers\\PageController; atau tulis namespace yang benar."
      },
      quiz: {
        question: "Controller biasanya disimpan di...",
        options: ["app/Http/Controllers", "resources/controllers", "routes/controllers", "public/app"],
        answer: 0,
        explanation: "Folder controller Laravel berada di app/Http/Controllers."
      },
      previewOutput: "GET /profil -> PageController@profil -> view profil."
    }),
    lesson({
      id: "request-input",
      title: "Request dan input form",
      icon: "bi-ui-checks",
      duration: "14 menit",
      goal: "Membaca data dari form menggunakan object Request.",
      problem: "Aplikasi perlu menerima nama, email, komentar, pencarian, dan data lain dari pengguna.",
      analogy: "Request seperti amplop berisi data yang dikirim pengguna. Laravel membantu membuka amplop itu dengan rapi.",
      explanation: "Laravel menyediakan Illuminate\\Http\\Request. Data form dapat dibaca dengan $request->input('nama') atau $request->only([...]).",
      filename: "app/Http/Controllers/KontakController.php",
      code: `use Illuminate\\Http\\Request;

public function kirim(Request $request)
{
    $nama = $request->input('nama');
    return "Terima kasih, " . $nama;
}`,
      lineNotes: [
        "Request diinjeksi ke method controller.",
        "input('nama') membaca field form bernama nama.",
        "Data input sebaiknya divalidasi sebelum dipakai."
      ],
      exercise: "Buat form kontak dengan input nama dan pesan, lalu baca datanya di controller.",
      recall: "Apa hubungan attribute name pada input dengan $request->input()?",
      debug: {
        question: "Mengapa $request->input('nama') bernilai kosong?",
        hint: "Periksa attribute name dan method form.",
        solution: "Pastikan input memakai name=\"nama\", form mengarah ke route yang benar, dan token CSRF tersedia untuk POST."
      },
      quiz: {
        question: "Object Laravel untuk membaca input pengguna adalah...",
        options: ["Request", "Response", "Migration", "Seeder"],
        answer: 0,
        explanation: "Illuminate\\Http\\Request membawa data request."
      },
      previewOutput: "POST /kontak -> Terima kasih, Nadia"
    }),
    lesson({
      id: "validasi-form",
      title: "Validasi form",
      icon: "bi-shield-check",
      duration: "15 menit",
      goal: "Memastikan data input sesuai aturan sebelum diproses.",
      problem: "Tanpa validasi, aplikasi dapat menerima email kosong, angka salah, atau teks yang terlalu panjang.",
      analogy: "Validasi seperti petugas loket yang memeriksa formulir sebelum diteruskan ke bagian berikutnya.",
      explanation: "Gunakan $request->validate([...]) untuk aturan umum seperti required, email, min, max, numeric, dan exists.",
      code: `public function simpan(Request $request)
{
    $data = $request->validate([
        'nama' => ['required', 'max:80'],
        'email' => ['required', 'email'],
    ]);

    return "Data valid: " . $data['nama'];
}`,
      lineNotes: [
        "required berarti field wajib diisi.",
        "email memastikan format email benar.",
        "Jika gagal, Laravel otomatis redirect kembali dengan error."
      ],
      exercise: "Tambahkan validasi required dan max pada form catatan belajar.",
      recall: "Apa yang terjadi saat validasi Laravel gagal pada request web?",
      debug: {
        question: "Mengapa pesan error validasi tidak terlihat di Blade?",
        hint: "Validasi sudah gagal, tapi view belum menampilkan error.",
        solution: "Tampilkan @error('field') atau loop $errors->all() di view."
      },
      quiz: {
        question: "Rule untuk memastikan field wajib diisi adalah...",
        options: ["required", "needed", "must", "filled-only"],
        answer: 0,
        explanation: "required adalah rule validasi wajib isi."
      },
      previewOutput: "Input valid -> Data valid: Nadia\nInput tidak valid -> kembali ke form dengan error."
    }),
    lesson({
      id: "migration",
      title: "Migration dan koneksi database",
      icon: "bi-database",
      duration: "16 menit",
      goal: "Membuat rancangan tabel database dengan migration.",
      problem: "Struktur tabel perlu dibuat, dibagikan, dan diubah secara rapi tanpa mencatat SQL manual di luar project.",
      analogy: "Migration seperti buku riwayat renovasi rumah. Semua perubahan struktur dicatat berurutan.",
      explanation: "Migration berisi instruksi membuat atau mengubah tabel. Koneksi database diatur melalui file .env.",
      filename: "database/migrations/create_notes_table.php",
      code: `Schema::create('notes', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('body')->nullable();
    $table->timestamps();
});`,
      lineNotes: [
        "id membuat primary key auto increment.",
        "string cocok untuk teks pendek.",
        "timestamps membuat kolom created_at dan updated_at."
      ],
      exercise: "Buat migration notes dengan kolom title dan body, lalu jalankan php artisan migrate.",
      recall: "Mengapa migration lebih mudah dirawat daripada membuat tabel manual tanpa catatan?",
      debug: {
        question: "Mengapa migrate gagal karena database tidak ditemukan?",
        hint: "Laravel membaca konfigurasi dari .env.",
        solution: "Buat database sesuai DB_DATABASE di .env atau ubah nilai .env agar cocok dengan database yang tersedia."
      },
      quiz: {
        question: "Command untuk menjalankan migration adalah...",
        options: ["php artisan migrate", "php artisan route", "composer migrate", "npm database"],
        answer: 0,
        explanation: "Artisan migrate menjalankan migration yang belum diterapkan."
      },
      previewOutput: "Tabel notes dibuat dengan id, title, body, created_at, updated_at."
    }),
    lesson({
      id: "eloquent-model",
      title: "Model Eloquent",
      icon: "bi-boxes",
      duration: "16 menit",
      goal: "Menggunakan model untuk membaca dan menyimpan data tabel.",
      problem: "Menulis query manual untuk setiap operasi database membuat kode cepat berulang.",
      analogy: "Model seperti petugas arsip khusus untuk satu jenis data. Ia tahu cara mengambil dan menyimpan catatan.",
      explanation: "Eloquent adalah ORM Laravel. Model mewakili tabel dan menyediakan method seperti all, create, find, update, dan delete.",
      filename: "app/Models/Note.php",
      code: `class Note extends Model
{
    protected $fillable = ['title', 'body'];
}

// Controller
$notes = Note::latest()->get();
Note::create($request->validated());`,
      lineNotes: [
        "Model Note biasanya terhubung ke tabel notes.",
        "$fillable menentukan field yang boleh diisi mass assignment.",
        "latest()->get() membaca data terbaru lebih dulu."
      ],
      exercise: "Buat model Note dan tampilkan semua data notes di controller.",
      recall: "Apa fungsi $fillable pada model Eloquent?",
      debug: {
        question: "Mengapa muncul MassAssignmentException?",
        hint: "Eloquent melindungi field yang belum diizinkan.",
        solution: "Tambahkan nama field yang boleh diisi ke property $fillable pada model."
      },
      quiz: {
        question: "Eloquent adalah...",
        options: ["ORM Laravel", "Template CSS", "Router browser", "Package icon"],
        answer: 0,
        explanation: "Eloquent memetakan model PHP ke tabel database."
      },
      previewOutput: "Note::latest()->get() menghasilkan daftar catatan dari tabel notes."
    }),
    lesson({
      id: "crud-resource",
      title: "CRUD resource",
      icon: "bi-pencil-square",
      duration: "18 menit",
      goal: "Membuat alur tambah, tampil, ubah, dan hapus data.",
      problem: "Aplikasi nyata biasanya membutuhkan operasi create, read, update, dan delete untuk satu jenis data.",
      analogy: "CRUD seperti buku catatan: menulis catatan baru, membaca daftar, mengoreksi isi, dan mencoret yang tidak diperlukan.",
      explanation: "Laravel menyediakan resource controller dan route resource agar pola CRUD konsisten.",
      filename: "routes/web.php",
      code: `Route::resource('notes', NoteController::class);

// Method penting:
// index, create, store, show, edit, update, destroy`,
      lineNotes: [
        "Route resource membuat beberapa route CRUD sekaligus.",
        "store menyimpan data baru.",
        "update mengubah data, destroy menghapus data."
      ],
      exercise: "Buat NoteController resource dan implementasikan index, create, store, edit, update, dan destroy secara bertahap.",
      recall: "Sebutkan empat operasi dalam CRUD.",
      debug: {
        question: "Mengapa form edit tidak bisa memakai method PUT langsung?",
        hint: "HTML form hanya mendukung GET dan POST.",
        solution: "Gunakan method=\"POST\" lalu tambahkan @method('PUT') di Blade."
      },
      quiz: {
        question: "Method resource untuk menyimpan data baru adalah...",
        options: ["store", "savePage", "insertView", "push"],
        answer: 0,
        explanation: "store digunakan untuk request penyimpanan data baru."
      },
      previewOutput: "GET /notes -> index\nPOST /notes -> store\nPUT /notes/{note} -> update"
    }),
    lesson({
      id: "session-flash",
      title: "Redirect, session, dan flash message",
      icon: "bi-chat-square-dots",
      duration: "13 menit",
      goal: "Memberi pesan setelah aksi seperti simpan, update, dan hapus.",
      problem: "Setelah menyimpan data, pengguna perlu tahu apakah aksinya berhasil.",
      analogy: "Flash message seperti nota kecil dari kasir: muncul sekali setelah transaksi selesai.",
      explanation: "Gunakan redirect()->route(...)->with('success', '...') untuk mengirim pesan satu kali ke halaman berikutnya.",
      code: `return redirect()
    ->route('notes.index')
    ->with('success', 'Catatan berhasil disimpan.');

// Blade
@if (session('success'))
  <div>{{ session('success') }}</div>
@endif`,
      lineNotes: [
        "redirect mengarahkan browser ke route lain.",
        "with menyimpan flash data ke session.",
        "session('success') membaca pesan di Blade."
      ],
      exercise: "Tambahkan flash message saat catatan berhasil dibuat dan dihapus.",
      recall: "Mengapa flash message biasanya hanya tampil sekali?",
      debug: {
        question: "Mengapa pesan sukses tidak muncul setelah redirect?",
        hint: "Periksa key session yang dipakai.",
        solution: "Pastikan with('success', ...) cocok dengan session('success') di Blade."
      },
      quiz: {
        question: "Method untuk menyimpan flash message saat redirect adalah...",
        options: ["with", "flashNowOnly", "messageToView", "sendText"],
        answer: 0,
        explanation: "with menambahkan data flash ke redirect response."
      },
      previewOutput: "Data tersimpan -> redirect ke notes.index -> pesan sukses tampil sekali."
    }),
    lesson({
      id: "middleware-auth",
      title: "Middleware dan proteksi halaman",
      icon: "bi-person-lock",
      duration: "15 menit",
      goal: "Memahami middleware sebagai penjaga sebelum request masuk ke controller.",
      problem: "Beberapa halaman seperti dashboard dan admin tidak boleh dibuka semua orang.",
      analogy: "Middleware seperti satpam di pintu. Sebelum masuk ruangan, ia memeriksa kartu akses.",
      explanation: "Middleware memeriksa request sebelum atau sesudah controller. Laravel menyediakan middleware auth untuk halaman yang perlu login.",
      code: `Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware('auth');`,
      lineNotes: [
        "middleware('auth') melindungi route.",
        "Pengunjung yang belum login diarahkan sesuai konfigurasi auth.",
        "Middleware dapat dipasang pada route satuan atau group."
      ],
      exercise: "Buat route /dashboard lalu pasang middleware auth secara konseptual.",
      recall: "Apa tugas middleware sebelum request sampai ke controller?",
      debug: {
        question: "Mengapa dashboard selalu mengarah ke login?",
        hint: "Middleware auth menganggap user belum terautentikasi.",
        solution: "Pastikan fitur login sudah tersedia dan session login berhasil dibuat."
      },
      quiz: {
        question: "Middleware bekerja sebagai...",
        options: ["Penyaring request", "Template HTML", "Tabel database", "File gambar"],
        answer: 0,
        explanation: "Middleware memeriksa request sebelum diteruskan."
      },
      previewOutput: "GET /dashboard -> middleware auth -> controller/view jika user login."
    }),
    lesson({
      id: "file-upload",
      title: "Upload file dan storage",
      icon: "bi-cloud-arrow-up",
      duration: "15 menit",
      goal: "Menerima file dari form dan menyimpannya dengan Storage.",
      problem: "Aplikasi profil, produk, dan artikel sering membutuhkan upload gambar atau dokumen.",
      analogy: "Storage seperti rak penyimpanan yang punya aturan lokasi dan akses publik.",
      explanation: "Laravel membaca file dengan $request->file('foto'), memvalidasi tipe file, lalu menyimpan memakai store atau storePublicly.",
      code: `$data = $request->validate([
    'foto' => ['required', 'image', 'max:2048'],
]);

$path = $request->file('foto')->store('profiles', 'public');`,
      lineNotes: [
        "image memastikan file adalah gambar.",
        "max:2048 membatasi ukuran sekitar 2 MB.",
        "store menyimpan file dan mengembalikan path."
      ],
      exercise: "Buat form upload foto dan validasi image maksimal 2 MB.",
      recall: "Mengapa file upload harus divalidasi?",
      debug: {
        question: "Mengapa file tidak terkirim ke controller?",
        hint: "Form upload butuh attribute khusus.",
        solution: "Tambahkan enctype=\"multipart/form-data\" pada tag form."
      },
      quiz: {
        question: "Attribute form yang dibutuhkan untuk upload file adalah...",
        options: ["enctype=\"multipart/form-data\"", "method=\"file\"", "upload=\"true\"", "data-storage"],
        answer: 0,
        explanation: "multipart/form-data membuat browser mengirim file dengan benar."
      },
      previewOutput: "Upload valid -> file tersimpan di storage/app/public/profiles."
    }),
    lesson({
      id: "pagination-search",
      title: "Pagination dan pencarian",
      icon: "bi-search",
      duration: "15 menit",
      goal: "Menampilkan data banyak secara bertahap dan bisa dicari.",
      problem: "Daftar data akan berat dan sulit dibaca jika semuanya ditampilkan sekaligus.",
      analogy: "Pagination seperti halaman buku, sedangkan search seperti indeks di belakang buku.",
      explanation: "Gunakan query builder atau Eloquent untuk filter, lalu paginate agar data dibagi menjadi beberapa halaman.",
      code: `$notes = Note::query()
    ->when($request->search, function ($query, $search) {
        $query->where('title', 'like', '%' . $search . '%');
    })
    ->latest()
    ->paginate(10)
    ->withQueryString();`,
      lineNotes: [
        "when menjalankan filter hanya saat search ada.",
        "paginate(10) membagi data per 10 item.",
        "withQueryString menjaga query search saat pindah halaman."
      ],
      exercise: "Tambahkan input pencarian untuk daftar catatan dan tampilkan link pagination.",
      recall: "Mengapa withQueryString berguna saat memakai search dan pagination bersamaan?",
      debug: {
        question: "Mengapa keyword pencarian hilang saat klik halaman berikutnya?",
        hint: "Query string belum dibawa ke link pagination.",
        solution: "Tambahkan withQueryString() sebelum mengirim data ke view."
      },
      quiz: {
        question: "Method Eloquent untuk membagi data per halaman adalah...",
        options: ["paginate", "splitView", "pageData", "chunkHtml"],
        answer: 0,
        explanation: "paginate membuat hasil query dibagi menjadi halaman-halaman."
      },
      previewOutput: "Daftar catatan tampil 10 per halaman dan keyword search tetap terbawa."
    }),
    lesson({
      id: "api-json",
      title: "Route API dan response JSON",
      icon: "bi-braces",
      duration: "14 menit",
      goal: "Membuat endpoint sederhana yang mengirim data JSON.",
      problem: "Aplikasi modern sering perlu mengirim data ke JavaScript frontend, mobile app, atau layanan lain.",
      analogy: "JSON seperti paket data ringkas yang mudah dibaca banyak aplikasi.",
      explanation: "Route API biasanya berada di routes/api.php dan mengembalikan response JSON. Untuk awal, cukup pahami struktur endpoint dan data array.",
      filename: "routes/api.php",
      code: `Route::get('/notes', function () {
    return response()->json([
        'data' => Note::latest()->get(),
    ]);
});`,
      lineNotes: [
        "routes/api.php digunakan untuk endpoint API.",
        "response()->json mengirim header dan body JSON.",
        "Data biasanya dibaca dari model atau service."
      ],
      exercise: "Buat endpoint /api/status yang mengembalikan JSON berisi status dan waktu.",
      recall: "Apa perbedaan response HTML dan response JSON?",
      debug: {
        question: "Mengapa browser menampilkan HTML 404 untuk endpoint API?",
        hint: "Periksa prefix dan lokasi route.",
        solution: "Route di routes/api.php otomatis memakai prefix /api, jadi endpoint notes menjadi /api/notes."
      },
      quiz: {
        question: "File route yang umum dipakai untuk endpoint API adalah...",
        options: ["routes/api.php", "resources/api.blade.php", "public/api.json", "app/api.php"],
        answer: 0,
        explanation: "Laravel memisahkan route API di routes/api.php."
      },
      previewOutput: "{ \"data\": [ ...catatan... ] }"
    }),
    lesson({
      id: "mini-project",
      title: "Mini project Laravel",
      icon: "bi-rocket-takeoff",
      duration: "20 menit",
      goal: "Menggabungkan route, controller, Blade, validasi, model, dan database menjadi aplikasi kecil.",
      problem: "Konsep terpisah akan lebih kuat jika dipakai dalam satu alur aplikasi yang nyata.",
      analogy: "Mini project seperti latihan memasak satu menu lengkap setelah belajar memotong, menumis, dan menyajikan.",
      explanation: "Mulailah dari fitur minimum: daftar catatan belajar. Tambah fitur satu per satu setelah alur utama berjalan.",
      filename: "roadmap-mini-project",
      code: `Fitur minimum:
1. Tampilkan daftar catatan
2. Tambah catatan baru
3. Validasi title wajib
4. Edit dan hapus catatan
5. Tampilkan flash message`,
      lineNotes: [
        "Mulai dari daftar dan tambah data.",
        "Validasi menjaga data tetap rapi.",
        "Flash message memberi umpan balik setelah aksi."
      ],
      exercise: "Bangun CRUD catatan belajar dengan Laravel resource controller.",
      recall: "Bagian Laravel apa saja yang terlibat dalam CRUD catatan?",
      debug: {
        question: "Mengapa project terasa terlalu besar saat mulai dibuat?",
        hint: "Fitur terlalu banyak dikerjakan sekaligus.",
        solution: "Kerjakan versi minimum dulu: index dan store. Setelah itu baru edit, update, destroy, search, dan upload."
      },
      quiz: {
        question: "Urutan paling aman saat membuat mini project adalah...",
        options: ["Fitur minimum dulu", "Tampilan sempurna dulu", "Semua fitur sekaligus", "Deploy sebelum route dibuat"],
        answer: 0,
        explanation: "Fitur minimum membuat alur utama cepat terbukti."
      },
      previewOutput: "Route + Controller + Blade + Model + Migration bekerja sebagai satu aplikasi kecil."
    }),
    lesson({
      id: "tutorial-website-sederhana",
      title: "Tutorial membuat website sederhana",
      icon: "bi-window-sidebar",
      duration: "50 menit",
      goal: "Membuat website profil sederhana dengan Laravel dari project kosong sampai halaman siap dicoba dan dirapikan.",
      problem: "Setelah paham konsep route, controller, Blade, dan validasi secara terpisah, pemula sering bingung menyusun semuanya menjadi website utuh dengan struktur file yang rapi.",
      analogy: "Materi ini seperti merakit rumah contoh: mulai dari pondasi project, membuat ruangan halaman, memasang pintu navigasi, memberi dekorasi CSS, lalu mengecek semua jalur sebelum ditempati.",
      explanation: "Kita akan membuat website profil bernama Studio Belajar. Website ini punya halaman Beranda, Tentang, Layanan, dan Kontak. Tutorialnya sengaja dibuat lengkap: dari command awal, struktur folder, route bernama, controller, layout Blade, partial navbar/footer, file CSS, halaman per halaman, form kontak, validasi, flash message, sampai checklist pengecekan akhir.",
      filename: "tutorial-website-sederhana",
      overview: "Bangun satu website kecil dari nol supaya route, controller, Blade, asset, form, validasi, dan finishing terasa sebagai satu alur nyata.",
      steps: [
        "Pastikan PHP dan Composer tersedia, lalu buat project Laravel baru.",
        "Tentukan target website: halaman apa saja, menu navbar, dan isi singkat setiap halaman.",
        "Buat PageController sebagai pusat logika halaman statis dan form kontak.",
        "Daftarkan route bernama untuk Home, Tentang, Layanan, Kontak, dan submit kontak.",
        "Buat folder views: layouts, partials, dan pages.",
        "Buat layout utama agar struktur HTML tidak diulang di semua halaman.",
        "Buat partial navbar dan footer agar navigasi konsisten.",
        "Buat file CSS di public/css/style.css untuk tampilan sederhana.",
        "Buat halaman Beranda dengan hero dan ringkasan layanan.",
        "Buat halaman Tentang untuk cerita singkat website.",
        "Buat halaman Layanan dengan data dari controller.",
        "Buat halaman Kontak dengan form, @csrf, old input, error, dan flash message.",
        "Jalankan php artisan route:list untuk mengecek nama route.",
        "Tes semua link navbar, submit form kosong, submit form valid, dan tampilan mobile.",
        "Rapikan teks, warna, jarak, dan pesan sebelum website dianggap selesai."
      ],
      terms: [
        { term: "Website profil", meaning: "Website sederhana untuk memperkenalkan nama, layanan, kontak, atau portofolio." },
        { term: "Partial", meaning: "Potongan Blade kecil seperti navbar atau footer yang dipakai ulang." },
        { term: "Named route", meaning: "Route yang diberi nama agar link di Blade tidak perlu menulis URL manual." },
        { term: "Flash message", meaning: "Pesan sementara yang biasanya muncul sekali setelah redirect." },
        { term: "Finishing", meaning: "Tahap mengecek link, pesan error, responsive, dan isi sebelum website dianggap selesai." }
      ],
      tutorialSections: [
        {
          title: "Tentukan target dan buat project baru",
          description: "Target akhirnya adalah website profil bernama Studio Belajar dengan empat halaman dan satu form kontak.",
          steps: [
            "Buka terminal di folder tempat kamu menyimpan project belajar.",
            "Buat project baru dengan Composer.",
            "Masuk ke folder project dan jalankan server Laravel.",
            "Buka alamat yang muncul, biasanya http://127.0.0.1:8000.",
            "Jika halaman Laravel muncul, pondasi project sudah benar."
          ],
          files: [
            {
              filename: "terminal",
              note: "Command awal dari nol.",
              code: `composer create-project laravel/laravel studio-belajar
cd studio-belajar
php artisan serve`
            },
            {
              filename: "target-website",
              note: "Catatan fitur minimum sebelum menulis kode.",
              code: `Nama website: Studio Belajar

Halaman:
- Beranda: hero, ringkasan layanan, ajakan kontak
- Tentang: cerita singkat dan nilai utama
- Layanan: daftar layanan dari controller
- Kontak: form nama, email, pesan

Fitur Laravel:
- Named route
- Controller
- Layout Blade
- Partial navbar dan footer
- CSS di public
- Validasi form
- Flash message`
            }
          ],
          checklist: [
            "Folder studio-belajar sudah dibuat.",
            "Server lokal bisa dibuka.",
            "Kamu sudah tahu halaman apa saja yang akan dibuat."
          ]
        },
        {
          title: "Buat controller dan route bernama",
          description: "Route menjadi daftar alamat website, sedangkan controller menyiapkan data dan memilih view yang akan ditampilkan.",
          steps: [
            "Buat controller dengan Artisan.",
            "Import controller di routes/web.php.",
            "Buat route GET untuk halaman.",
            "Buat route POST untuk form kontak.",
            "Beri nama route agar link Blade bisa memakai route('nama')."
          ],
          files: [
            {
              filename: "terminal",
              note: "Membuat controller halaman.",
              code: `php artisan make:controller PageController`
            },
            {
              filename: "routes/web.php",
              note: "Daftar semua alamat website.",
              code: `<?php

use App\\Http\\Controllers\\PageController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/tentang', [PageController::class, 'about'])->name('about');
Route::get('/layanan', [PageController::class, 'services'])->name('services');
Route::get('/kontak', [PageController::class, 'contact'])->name('contact');
Route::post('/kontak', [PageController::class, 'sendContact'])->name('contact.send');`
            }
          ],
          checklist: [
            "Route /, /tentang, /layanan, dan /kontak sudah ada.",
            "Route submit kontak memakai POST.",
            "Semua route punya nama."
          ]
        },
        {
          title: "Isi controller dengan data halaman dan validasi kontak",
          description: "Controller menjaga route tetap bersih. Data layanan dibuat di controller dulu agar halaman Blade tinggal menampilkan.",
          steps: [
            "Buka app/Http/Controllers/PageController.php.",
            "Tambahkan use Illuminate\\Http\\Request.",
            "Buat method home, about, services, contact, dan sendContact.",
            "Kirim title ke setiap view agar layout bisa memakai judul berbeda.",
            "Validasi form kontak lalu redirect kembali dengan pesan sukses."
          ],
          files: [
            {
              filename: "app/Http/Controllers/PageController.php",
              note: "Controller lengkap untuk website sederhana.",
              code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class PageController extends Controller
{
    public function home()
    {
        return view('pages.home', [
            'title' => 'Beranda',
            'headline' => 'Belajar membuat website rapi dengan Laravel',
            'summary' => 'Studio Belajar membantu pemula memahami alur website dari ide, tampilan, sampai form kontak.',
        ]);
    }

    public function about()
    {
        return view('pages.about', [
            'title' => 'Tentang',
            'values' => ['Ramah pemula', 'Praktik langsung', 'Kode mudah dibaca'],
        ]);
    }

    public function services()
    {
        $services = [
            [
                'title' => 'Kelas Laravel Dasar',
                'description' => 'Belajar route, controller, Blade, validasi, dan database dari awal.',
            ],
            [
                'title' => 'Review Project',
                'description' => 'Merapikan struktur folder, nama route, tampilan Blade, dan alur form.',
            ],
            [
                'title' => 'Mentoring Mini Project',
                'description' => 'Mendampingi pembuatan website sederhana sampai bisa dipresentasikan.',
            ],
        ];

        return view('pages.services', [
            'title' => 'Layanan',
            'services' => $services,
        ]);
    }

    public function contact()
    {
        return view('pages.contact', [
            'title' => 'Kontak',
        ]);
    }

    public function sendContact(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'max:80'],
            'email' => ['required', 'email', 'max:120'],
            'pesan' => ['required', 'min:10', 'max:500'],
        ], [
            'nama.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email belum benar.',
            'pesan.required' => 'Pesan wajib diisi.',
            'pesan.min' => 'Pesan minimal 10 karakter.',
        ]);

        // Untuk tahap awal, data belum disimpan ke database.
        // Nanti bagian ini bisa diganti menjadi ContactMessage::create($data).

        return back()
            ->with('success', 'Terima kasih, ' . $data['nama'] . '. Pesan kamu berhasil dikirim.')
            ->withInput();
    }
}`
            }
          ],
          checklist: [
            "Setiap method controller mengembalikan view yang jelas.",
            "Halaman layanan menerima array services.",
            "Form kontak punya validasi dan pesan error Indonesia."
          ]
        },
        {
          title: "Buat struktur folder view",
          description: "Pisahkan layout, partial, dan halaman agar project mudah dibaca saat bertambah besar.",
          steps: [
            "Buat folder resources/views/layouts.",
            "Buat folder resources/views/partials.",
            "Buat folder resources/views/pages.",
            "Layout menyimpan kerangka HTML utama.",
            "Partial menyimpan navbar dan footer.",
            "Pages menyimpan isi halaman."
          ],
          files: [
            {
              filename: "struktur-folder",
              note: "Struktur view yang dipakai tutorial ini.",
              code: `resources/views/
├── layouts/
│   └── app.blade.php
├── partials/
│   ├── navbar.blade.php
│   └── footer.blade.php
└── pages/
    ├── home.blade.php
    ├── about.blade.php
    ├── services.blade.php
    └── contact.blade.php`
            }
          ],
          checklist: [
            "Folder sudah dibuat sesuai struktur.",
            "Nama file Blade sama dengan yang dipanggil controller.",
            "Tidak ada halaman yang disimpan sembarang di root views tanpa alasan."
          ]
        },
        {
          title: "Buat layout utama Blade",
          description: "Layout membuat semua halaman punya struktur yang sama: head, navbar, main, footer, dan link CSS.",
          steps: [
            "Buat file resources/views/layouts/app.blade.php.",
            "Gunakan variabel $title untuk judul halaman.",
            "Panggil CSS dari public/css/style.css dengan asset().",
            "Masukkan partial navbar dan footer.",
            "Sediakan @yield('content') untuk isi halaman."
          ],
          files: [
            {
              filename: "resources/views/layouts/app.blade.php",
              note: "Kerangka utama semua halaman.",
              code: `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Studio Belajar adalah website profil sederhana yang dibuat dengan Laravel.">
    <title>{{ $title ?? 'Studio Belajar' }} | Studio Belajar</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  </head>
  <body>
    @include('partials.navbar')

    <main>
      @yield('content')
    </main>

    @include('partials.footer')
  </body>
</html>`
            }
          ],
          checklist: [
            "Semua halaman nanti cukup memakai @extends('layouts.app').",
            "CSS sudah diarahkan ke public/css/style.css.",
            "Navbar dan footer tidak perlu disalin ke setiap halaman."
          ]
        },
        {
          title: "Buat navbar dan footer sebagai partial",
          description: "Partial membuat bagian berulang lebih mudah dirawat. Saat menu berubah, kamu hanya mengubah satu file navbar.",
          steps: [
            "Buat partial navbar.",
            "Gunakan route() untuk membuat link.",
            "Gunakan request()->routeIs() untuk memberi class active pada menu saat ini.",
            "Buat footer sederhana.",
            "Pastikan nama route sama dengan routes/web.php."
          ],
          files: [
            {
              filename: "resources/views/partials/navbar.blade.php",
              note: "Navigasi utama website.",
              code: `<header class="site-header">
  <nav class="navbar">
    <a class="brand" href="{{ route('home') }}">Studio Belajar</a>

    <div class="nav-links">
      <a class="{{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">Beranda</a>
      <a class="{{ request()->routeIs('about') ? 'active' : '' }}" href="{{ route('about') }}">Tentang</a>
      <a class="{{ request()->routeIs('services') ? 'active' : '' }}" href="{{ route('services') }}">Layanan</a>
      <a class="{{ request()->routeIs('contact') ? 'active' : '' }}" href="{{ route('contact') }}">Kontak</a>
    </div>
  </nav>
</header>`
            },
            {
              filename: "resources/views/partials/footer.blade.php",
              note: "Footer dipakai semua halaman.",
              code: `<footer class="site-footer">
  <p>&copy; {{ date('Y') }} Studio Belajar. Dibuat dengan Laravel.</p>
</footer>`
            }
          ],
          checklist: [
            "Link navbar memakai helper route().",
            "Menu aktif berubah sesuai halaman.",
            "Footer muncul di semua halaman."
          ]
        },
        {
          title: "Tambahkan CSS dasar",
          description: "Untuk pemula, menyimpan CSS di public/css/style.css cukup sederhana. Nanti setelah nyaman, kamu bisa belajar Vite.",
          steps: [
            "Buat folder public/css jika belum ada.",
            "Buat file style.css.",
            "Tambahkan style untuk layout umum, navbar, tombol, card, form, dan responsive.",
            "Refresh browser setelah CSS dibuat.",
            "Jika CSS tidak berubah, cek path asset di layout."
          ],
          files: [
            {
              filename: "public/css/style.css",
              note: "Tampilan sederhana dan responsive.",
              code: `* {
  box-sizing: border-box;
}

body {
  background: #f7f9fc;
  color: #17213a;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e9f2;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar,
.section,
.site-footer {
  margin: 0 auto;
  max-width: 1080px;
  padding: 20px;
}

.navbar {
  align-items: center;
  display: flex;
  gap: 24px;
  justify-content: space-between;
}

.brand {
  color: #ff2d20;
  font-size: 22px;
  font-weight: 800;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav-links a {
  border-radius: 8px;
  color: #556173;
  font-weight: 700;
  padding: 8px 12px;
}

.nav-links a.active,
.nav-links a:hover {
  background: #ffeeed;
  color: #ff2d20;
}

.hero {
  background: linear-gradient(135deg, #ffffff, #eef6ff);
  border: 1px solid #e5e9f2;
  border-radius: 18px;
  padding: 42px;
}

.eyebrow {
  color: #ff2d20;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

h1 {
  font-size: 42px;
  line-height: 1.1;
  margin: 12px 0;
}

.button {
  background: #ff2d20;
  border-radius: 10px;
  color: #ffffff;
  display: inline-block;
  font-weight: 800;
  margin-top: 12px;
  padding: 12px 16px;
}

.grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(3, 1fr);
}

.card,
.form-card {
  background: #ffffff;
  border: 1px solid #e5e9f2;
  border-radius: 14px;
  padding: 20px;
}

.form-group {
  margin-bottom: 14px;
}

label {
  display: block;
  font-weight: 700;
  margin-bottom: 6px;
}

input,
textarea {
  border: 1px solid #cfd6e4;
  border-radius: 10px;
  font: inherit;
  padding: 12px;
  width: 100%;
}

.error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
}

.alert-success {
  background: #ecfdf5;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  color: #047857;
  margin-bottom: 16px;
  padding: 12px;
}

.site-footer {
  color: #6b7280;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 760px) {
  .navbar {
    align-items: flex-start;
    flex-direction: column;
  }

  h1 {
    font-size: 32px;
  }

  .hero {
    padding: 26px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}`
            }
          ],
          checklist: [
            "Navbar, card, tombol, dan form punya style.",
            "Grid layanan berubah menjadi satu kolom di layar kecil.",
            "Tidak ada teks yang keluar dari layar mobile."
          ]
        },
        {
          title: "Buat halaman Beranda",
          description: "Beranda menjadi pintu masuk. Isinya headline, penjelasan singkat, CTA, dan ringkasan alasan memilih website ini.",
          steps: [
            "Buat file pages/home.blade.php.",
            "Gunakan layout app.",
            "Tampilkan data headline dan summary dari controller.",
            "Tambahkan tombol menuju halaman kontak.",
            "Tambahkan tiga kartu ringkasan."
          ],
          files: [
            {
              filename: "resources/views/pages/home.blade.php",
              note: "Halaman utama website.",
              code: `@extends('layouts.app')

@section('content')
  <section class="section">
    <div class="hero">
      <span class="eyebrow">Website Laravel Pemula</span>
      <h1>{{ $headline }}</h1>
      <p>{{ $summary }}</p>
      <a class="button" href="{{ route('contact') }}">Konsultasi sekarang</a>
    </div>
  </section>

  <section class="section">
    <div class="grid">
      <article class="card">
        <h2>Route jelas</h2>
        <p>Setiap halaman punya alamat dan nama route yang mudah dipanggil.</p>
      </article>
      <article class="card">
        <h2>Blade rapi</h2>
        <p>Layout dan partial membuat tampilan tidak perlu ditulis berulang.</p>
      </article>
      <article class="card">
        <h2>Form tervalidasi</h2>
        <p>Input kontak dicek sebelum diproses agar data lebih aman.</p>
      </article>
    </div>
  </section>
@endsection`
            }
          ],
          checklist: [
            "Halaman / menampilkan hero.",
            "Tombol kontak mengarah ke route contact.",
            "Tidak ada undefined variable."
          ]
        },
        {
          title: "Buat halaman Tentang dan Layanan",
          description: "Halaman Tentang berisi cerita singkat. Halaman Layanan membaca array services yang dikirim dari controller.",
          steps: [
            "Buat pages/about.blade.php.",
            "Loop nilai utama dengan @foreach.",
            "Buat pages/services.blade.php.",
            "Loop data services dari controller.",
            "Pastikan semua key array sesuai dengan data controller."
          ],
          files: [
            {
              filename: "resources/views/pages/about.blade.php",
              note: "Halaman cerita singkat.",
              code: `@extends('layouts.app')

@section('content')
  <section class="section">
    <span class="eyebrow">Tentang Kami</span>
    <h1>Membantu pemula belajar web dengan langkah kecil.</h1>
    <p>
      Studio Belajar adalah contoh website sederhana untuk memahami cara Laravel
      menyusun route, controller, view, asset, dan form dalam satu project.
    </p>

    <div class="grid">
      @foreach ($values as $value)
        <article class="card">
          <h2>{{ $value }}</h2>
          <p>Nilai ini dipakai agar proses belajar tetap terarah dan tidak terburu-buru.</p>
        </article>
      @endforeach
    </div>
  </section>
@endsection`
            },
            {
              filename: "resources/views/pages/services.blade.php",
              note: "Halaman daftar layanan.",
              code: `@extends('layouts.app')

@section('content')
  <section class="section">
    <span class="eyebrow">Layanan</span>
    <h1>Pilih bantuan belajar yang kamu butuhkan.</h1>

    <div class="grid">
      @foreach ($services as $service)
        <article class="card">
          <h2>{{ $service['title'] }}</h2>
          <p>{{ $service['description'] }}</p>
        </article>
      @endforeach
    </div>
  </section>
@endsection`
            }
          ],
          checklist: [
            "Halaman /tentang tampil tanpa error.",
            "Halaman /layanan menampilkan tiga layanan.",
            "Loop @foreach ditutup dengan @endforeach."
          ]
        },
        {
          title: "Buat halaman Kontak dengan validasi dan flash message",
          description: "Halaman kontak menunjukkan pola form Laravel yang sangat sering dipakai: @csrf, old input, @error, POST route, dan pesan sukses.",
          steps: [
            "Buat pages/contact.blade.php.",
            "Arahkan form ke route contact.send.",
            "Tambahkan @csrf karena method POST wajib dilindungi.",
            "Gunakan old() agar input tidak hilang saat validasi gagal.",
            "Tampilkan error field dengan @error.",
            "Tampilkan session success setelah submit valid."
          ],
          files: [
            {
              filename: "resources/views/pages/contact.blade.php",
              note: "Form kontak lengkap.",
              code: `@extends('layouts.app')

@section('content')
  <section class="section">
    <span class="eyebrow">Kontak</span>
    <h1>Ceritakan kebutuhan belajar kamu.</h1>

    <div class="form-card">
      @if (session('success'))
        <div class="alert-success">
          {{ session('success') }}
        </div>
      @endif

      <form method="POST" action="{{ route('contact.send') }}">
        @csrf

        <div class="form-group">
          <label for="nama">Nama</label>
          <input id="nama" name="nama" type="text" value="{{ old('nama') }}" placeholder="Nama kamu">
          @error('nama')
            <p class="error">{{ $message }}</p>
          @enderror
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" value="{{ old('email') }}" placeholder="nama@email.com">
          @error('email')
            <p class="error">{{ $message }}</p>
          @enderror
        </div>

        <div class="form-group">
          <label for="pesan">Pesan</label>
          <textarea id="pesan" name="pesan" rows="5" placeholder="Tulis pesan minimal 10 karakter">{{ old('pesan') }}</textarea>
          @error('pesan')
            <p class="error">{{ $message }}</p>
          @enderror
        </div>

        <button class="button" type="submit">Kirim pesan</button>
      </form>
    </div>
  </section>
@endsection`
            }
          ],
          checklist: [
            "Submit form kosong menampilkan error.",
            "Input lama tetap terisi saat validasi gagal.",
            "Submit valid menampilkan flash message sukses.",
            "Tidak muncul error 419 karena @csrf sudah ada."
          ]
        },
        {
          title: "Tes route, link, form, dan tampilan",
          description: "Tahap terakhir adalah memastikan website benar-benar jadi, bukan sekadar tidak error.",
          steps: [
            "Jalankan php artisan route:list untuk melihat semua route.",
            "Klik semua menu navbar dari browser.",
            "Buka halaman yang salah untuk memahami 404.",
            "Submit form kontak kosong untuk mengecek validasi.",
            "Submit form kontak valid untuk mengecek flash message.",
            "Kecilkan browser atau buka dari mode mobile.",
            "Baca ulang semua teks agar tidak ada typo."
          ],
          files: [
            {
              filename: "terminal",
              note: "Command pengecekan.",
              code: `php artisan route:list
php artisan serve`
            },
            {
              filename: "checklist-final",
              note: "Tanda website sudah selesai.",
              code: `Cek akhir:
[ ] / membuka halaman Beranda
[ ] /tentang membuka halaman Tentang
[ ] /layanan membuka halaman Layanan
[ ] /kontak membuka halaman Kontak
[ ] Navbar aktif sesuai halaman
[ ] Form kosong menampilkan error
[ ] Form valid menampilkan pesan sukses
[ ] Tampilan mobile tidak melebar
[ ] Tidak ada undefined variable
[ ] Tidak ada View not found
[ ] Tidak ada Route not defined`
            }
          ],
          checklist: [
            "Jika route tidak ditemukan, cek nama route di web.php dan route() di Blade.",
            "Jika view tidak ditemukan, cek nama file dan folder resources/views/pages.",
            "Jika CSS tidak tampil, cek file public/css/style.css dan asset('css/style.css')."
          ]
        }
      ],
      code: `Alur lengkap website:
1. Composer membuat project Laravel.
2. Route menerima URL dari browser.
3. PageController memilih view dan mengirim data.
4. Layout Blade membungkus semua halaman.
5. Partial navbar/footer dipakai ulang.
6. CSS di public membuat tampilan rapi.
7. Form kontak mengirim POST request.
8. Laravel memvalidasi input.
9. Redirect kembali menampilkan flash message.
10. Website dicek lewat route:list, klik link, dan test form.`,
      lineNotes: [
        "Mulai dari project kosong agar kamu tahu file apa saja yang dibuat.",
        "Route bernama membuat link navbar lebih aman daripada menulis URL manual.",
        "Controller mengirim data ke view agar Blade tidak berisi logika yang terlalu banyak.",
        "Layout dan partial menjaga HTML berulang tetap rapi.",
        "Validasi dan flash message membuat form terasa seperti fitur nyata."
      ],
      exercise: "Ikuti tutorial ini sampai selesai, lalu ubah tema website menjadi milikmu sendiri: ganti nama brand, teks layanan, warna utama, dan isi halaman tentang.",
      recall: "Tuliskan ulang dari ingatan: file apa saja yang dibuat, apa fungsi masing-masing file, dan bagaimana alur submit form kontak bekerja.",
      commonMistakes: [
        "Membuat banyak halaman tanpa layout sehingga navbar harus disalin berulang.",
        "Lupa memberi nama route sehingga link Blade masih ditulis manual.",
        "Form kontak POST tidak memakai @csrf.",
        "Nama view di controller tidak sama dengan lokasi file Blade.",
        "Lupa mengirim data services dari controller ke halaman layanan.",
        "Menulis CSS di resources tetapi layout memanggil public, atau sebaliknya.",
        "Tidak mengecek php artisan route:list saat URL tidak sesuai."
      ],
      checkpoint: "Kamu selesai jika empat halaman bisa dibuka dari navbar, form kontak menampilkan error saat kosong, pesan sukses muncul saat valid, CSS tampil, route:list rapi, dan tampilan tidak melebar di mobile.",
      debug: {
        question: "Website sudah punya beberapa view, tetapi navbar dan footer berbeda-beda di setiap halaman. Apa yang perlu diperbaiki?",
        hint: "Bagian yang sama sebaiknya tidak disalin manual ke semua view.",
        solution: "Buat layout utama dan partial navbar/footer. Halaman cukup memakai @extends('layouts.app') dan mengisi @section('content')."
      },
      quiz: {
        question: "Agar website sederhana Laravel mudah dirawat, bagian navbar dan footer sebaiknya dibuat sebagai...",
        options: ["Partial atau layout Blade", "Migration", "Seeder", "File .env"],
        answer: 0,
        explanation: "Navbar dan footer adalah tampilan berulang, jadi lebih rapi jika dibuat sebagai layout atau partial Blade."
      },
      previewOutput: "Website Studio Belajar selesai: Home, Tentang, Layanan, Kontak, form valid, dan flash message tampil."
    })
  ];

  const quizQuestions = [
    {
      question: "Laravel berjalan di atas bahasa...",
      options: ["PHP", "CSS", "SQL saja", "Bash"],
      answer: 0,
      explanation: "Laravel adalah framework PHP."
    },
    {
      question: "File route web utama adalah...",
      options: ["routes/web.php", "resources/views/web.php", "public/web.php", "app/Route.php"],
      answer: 0,
      explanation: "Route halaman web ditulis di routes/web.php."
    },
    {
      question: "Command untuk menjalankan server lokal Laravel adalah...",
      options: ["php artisan serve", "php laravel run", "composer serve", "npm artisan"],
      answer: 0,
      explanation: "Artisan serve menjalankan server development."
    },
    {
      question: "Template engine bawaan Laravel adalah...",
      options: ["Blade", "Twig wajib", "Mustache", "Handlebars"],
      answer: 0,
      explanation: "Blade adalah template engine bawaan Laravel."
    },
    {
      question: "Controller biasanya dipakai untuk...",
      options: ["Menaruh logika request", "Mewarnai tombol", "Menyimpan gambar mentah", "Mengganti Composer"],
      answer: 0,
      explanation: "Controller menangani request dan menyiapkan response."
    },
    {
      question: "Rule validasi field wajib adalah...",
      options: ["required", "must", "notempty", "need"],
      answer: 0,
      explanation: "required memastikan field wajib ada dan tidak kosong."
    },
    {
      question: "Migration digunakan untuk...",
      options: ["Mengatur struktur tabel", "Membuat ikon", "Menghapus CSS", "Membuat branch git"],
      answer: 0,
      explanation: "Migration mencatat perubahan struktur database."
    },
    {
      question: "Eloquent adalah fitur Laravel untuk...",
      options: ["Bekerja dengan database lewat model", "Mengatur warna tema", "Menjalankan browser", "Mengompres gambar"],
      answer: 0,
      explanation: "Eloquent adalah ORM Laravel."
    },
    {
      question: "Blade output aman ditulis dengan...",
      options: ["{{ $data }}", "{!! $data !!}", "<? echo $data ?>", "@raw($data)"],
      answer: 0,
      explanation: "{{ }} melakukan escaping agar output lebih aman."
    },
    {
      question: "Route API biasanya berada di...",
      options: ["routes/api.php", "api/routes.html", "database/api.php", "resources/api.php"],
      answer: 0,
      explanation: "Laravel memisahkan route API di routes/api.php."
    }
  ];

  const recallChallenges = [
    {
      id: "recall-flow",
      type: "Alur request",
      title: "Route ke view",
      prompt: "Jelaskan alur saat browser membuka /profil sampai Blade tampil.",
      answer: "Browser mengirim request ke /profil, Laravel mencocokkan route, menjalankan closure atau controller, lalu mengembalikan view Blade sebagai response HTML."
    },
    {
      id: "recall-route",
      type: "Routing",
      title: "Route dinamis",
      prompt: "Apa fungsi parameter pada route seperti /produk/{slug}?",
      answer: "Parameter menangkap bagian URL yang berubah agar satu route dapat menangani banyak data, misalnya detail produk berbeda."
    },
    {
      id: "recall-blade",
      type: "Blade",
      title: "Output aman",
      prompt: "Mengapa output Blade dengan {{ }} lebih disarankan untuk data pengguna?",
      answer: "{{ }} melakukan escaping sehingga teks pengguna tidak langsung dianggap sebagai HTML aktif."
    },
    {
      id: "recall-controller",
      type: "Controller",
      title: "Memindahkan logika",
      prompt: "Kapan logika sebaiknya dipindahkan dari routes/web.php ke controller?",
      answer: "Saat route mulai berisi validasi, query, banyak cabang logika, atau dipakai untuk fitur yang perlu dirawat."
    },
    {
      id: "recall-validation",
      type: "Validasi",
      title: "Input form",
      prompt: "Apa tujuan validasi sebelum menyimpan data ke database?",
      answer: "Validasi memastikan data wajib ada, formatnya benar, ukurannya sesuai, dan lebih aman sebelum diproses."
    },
    {
      id: "recall-crud",
      type: "CRUD",
      title: "Aplikasi kecil",
      prompt: "Sebutkan komponen Laravel yang biasanya terlibat dalam CRUD sederhana.",
      answer: "Route, controller, request validation, model Eloquent, migration, Blade view, redirect, dan flash message."
    }
  ];

  const debugChallenges = [
    {
      id: "debug-route-404",
      title: "Route 404",
      symptom: "Browser menampilkan 404 Not Found saat membuka /kontak.",
      code: `Route::get('/contact', function () {
    return view('kontak');
});`,
      question: "Mengapa /kontak tidak cocok dengan route di atas?",
      hint: "Bandingkan path yang dibuka dengan path yang didaftarkan.",
      explanation: [
        "URL yang dibuka adalah /kontak.",
        "Route yang dibuat adalah /contact.",
        "Laravel hanya menjalankan route yang path-nya cocok.",
        "Samakan path route dengan URL yang ingin dipakai.",
        "Setelah diubah, refresh halaman /kontak."
      ],
      solution: `Route::get('/kontak', function () {
    return view('kontak');
});`
    },
    {
      id: "debug-view-name",
      title: "View tidak ditemukan",
      symptom: "Laravel menampilkan View [profile] not found.",
      code: `return view('profile');`,
      question: "File Blade apa yang dicari Laravel?",
      hint: "Nama view harus cocok dengan lokasi file di resources/views.",
      explanation: [
        "view('profile') mencari resources/views/profile.blade.php.",
        "Jika file yang dibuat bernama profil.blade.php, namanya tidak cocok.",
        "Gunakan nama view yang sama dengan file.",
        "Untuk folder, gunakan titik seperti admin.dashboard.",
        "Pastikan ejaan konsisten."
      ],
      solution: `return view('profil');`
    },
    {
      id: "debug-controller-import",
      title: "Controller belum di-import",
      symptom: "Muncul error Target class PageController does not exist.",
      code: `Route::get('/profil', [PageController::class, 'profil']);`,
      question: "Apa yang kurang di routes/web.php?",
      hint: "Class controller perlu namespace yang jelas.",
      explanation: [
        "PageController berada di namespace App\\Http\\Controllers.",
        "routes/web.php perlu use statement.",
        "Tanpa import, PHP mencari class di namespace yang salah.",
        "Tambahkan use di bagian atas file.",
        "Pastikan nama class dan file sama."
      ],
      solution: `use App\\Http\\Controllers\\PageController;

Route::get('/profil', [PageController::class, 'profil']);`
    },
    {
      id: "debug-csrf",
      title: "CSRF token hilang",
      symptom: "Submit form POST menghasilkan halaman 419 Page Expired.",
      code: `<form method="POST" action="/kontak">
  <input name="nama">
  <button>Kirim</button>
</form>`,
      question: "Directive Blade apa yang harus ditambahkan?",
      hint: "Laravel melindungi request POST dari CSRF.",
      explanation: [
        "Form POST web membutuhkan token CSRF.",
        "Blade menyediakan directive @csrf.",
        "Token ini dikirim sebagai hidden input.",
        "Middleware Laravel memeriksa token tersebut.",
        "Tambahkan @csrf di dalam form."
      ],
      solution: `<form method="POST" action="/kontak">
  @csrf
  <input name="nama">
  <button>Kirim</button>
</form>`
    },
    {
      id: "debug-validation-error",
      title: "Error validasi tidak tampil",
      symptom: "Form kembali setelah validasi gagal, tetapi tidak ada pesan error.",
      code: `<input name="email">`,
      question: "Apa yang perlu ditampilkan di Blade?",
      hint: "Laravel menyimpan error validasi di $errors.",
      explanation: [
        "Validasi sudah bekerja karena form kembali.",
        "Pesan error belum dirender di view.",
        "Gunakan @error untuk field tertentu.",
        "Atau loop $errors->all() untuk semua pesan.",
        "Letakkan pesan dekat input terkait."
      ],
      solution: `<input name="email" value="{{ old('email') }}">
@error('email')
  <p>{{ $message }}</p>
@enderror`
    },
    {
      id: "debug-migration-env",
      title: "Database tidak terkoneksi",
      symptom: "php artisan migrate gagal karena Access denied atau Unknown database.",
      code: `DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=`,
      question: "Bagian mana yang harus dicek lebih dulu?",
      hint: "Laravel membaca konfigurasi database dari .env.",
      explanation: [
        "Nama database harus benar-benar ada.",
        "Username dan password harus sesuai server database.",
        "Setelah mengubah .env, jalankan ulang command.",
        "Jika config di-cache, bersihkan dengan php artisan config:clear.",
        "Cek juga DB_HOST dan DB_PORT."
      ],
      solution: `DB_DATABASE=nama_database_yang_ada
DB_USERNAME=user_database
DB_PASSWORD=password_database`
    },
    {
      id: "debug-fillable",
      title: "Mass assignment",
      symptom: "Note::create($data) menghasilkan MassAssignmentException.",
      code: `class Note extends Model
{
}

Note::create($request->validated());`,
      question: "Property apa yang perlu ditambahkan di model?",
      hint: "Eloquent meminta daftar field yang boleh diisi massal.",
      explanation: [
        "create melakukan mass assignment.",
        "Laravel melindungi field model secara default.",
        "Tambahkan $fillable untuk field yang boleh diisi.",
        "Jangan masukkan field sensitif sembarangan.",
        "Setelah itu create dapat berjalan."
      ],
      solution: `class Note extends Model
{
    protected $fillable = ['title', 'body'];
}`
    },
    {
      id: "debug-method-spoofing",
      title: "Form update salah method",
      symptom: "Route PUT /notes/{note} tidak terpanggil dari form edit.",
      code: `<form method="POST" action="{{ route('notes.update', $note) }}">
  @csrf
  <button>Simpan</button>
</form>`,
      question: "Directive apa yang belum ada?",
      hint: "HTML form tidak mendukung PUT secara langsung.",
      explanation: [
        "Form HTML hanya mengirim GET atau POST.",
        "Laravel memakai hidden field untuk meniru PUT/PATCH/DELETE.",
        "Blade menyediakan @method('PUT').",
        "Route resource update menunggu PUT atau PATCH.",
        "Tambahkan directive setelah @csrf."
      ],
      solution: `<form method="POST" action="{{ route('notes.update', $note) }}">
  @csrf
  @method('PUT')
  <button>Simpan</button>
</form>`
    },
    {
      id: "debug-upload-enctype",
      title: "Upload file kosong",
      symptom: "$request->file('foto') bernilai null.",
      code: `<form method="POST" action="/profil/foto">
  @csrf
  <input type="file" name="foto">
</form>`,
      question: "Attribute form apa yang kurang?",
      hint: "Browser perlu format khusus untuk mengirim file.",
      explanation: [
        "Input file saja belum cukup.",
        "Form harus memakai multipart/form-data.",
        "Tanpa enctype, file tidak dikirim sebagai upload.",
        "Pastikan method tetap POST.",
        "Setelah itu validasi image dapat bekerja."
      ],
      solution: `<form method="POST" action="/profil/foto" enctype="multipart/form-data">
  @csrf
  <input type="file" name="foto">
</form>`
    },
    {
      id: "debug-api-prefix",
      title: "Prefix API lupa",
      symptom: "Route di routes/api.php tidak ditemukan saat membuka /notes.",
      code: `// routes/api.php
Route::get('/notes', function () {
    return response()->json(['ok' => true]);
});`,
      question: "URL apa yang seharusnya dibuka?",
      hint: "Route API Laravel memakai prefix bawaan.",
      explanation: [
        "Route di routes/api.php memakai prefix /api.",
        "Path /notes menjadi /api/notes.",
        "Route web.php tidak otomatis memakai prefix itu.",
        "Gunakan URL yang sesuai lokasi route.",
        "Cek daftar route dengan php artisan route:list."
      ],
      solution: `GET /api/notes`
    }
  ];

  const projects = [
    {
      title: "CRUD catatan belajar",
      level: "Pemula +",
      goal: "Membuat aplikasi catatan dengan route resource, controller, validasi, model, dan Blade.",
      example: {
        type: "dashboard",
        title: "Catatan belajar",
        subtitle: "Laravel CRUD",
        progress: 64,
        stats: [
          { value: "12", label: "catatan" },
          { value: "8", label: "selesai" },
          { value: "4", label: "aktif" }
        ],
        tasks: ["Route resource", "Validasi form", "Flash message"]
      },
      features: ["resource route", "controller", "Blade", "validation", "Eloquent"],
      steps: ["Buat migration notes", "Buat model dan controller resource", "Tampilkan daftar", "Tambah edit hapus bertahap"],
      hint: "Selesaikan index dan store sebelum mengerjakan update dan destroy.",
      extra: "Tambahkan pencarian judul."
    },
    {
      title: "Form kontak dengan validasi",
      level: "Pemula",
      goal: "Menerima input, memvalidasi, lalu menampilkan flash message.",
      example: {
        type: "form",
        title: "Kontak mentor",
        fields: ["Nama", "Email", "Pesan"],
        button: "Kirim pesan"
      },
      features: ["Request", "validation", "old input", "error message", "flash"],
      steps: ["Buat route GET dan POST", "Buat view form", "Validasi request", "Redirect dengan pesan"],
      hint: "Gunakan @csrf dan tampilkan @error di dekat input.",
      extra: "Simpan pesan ke database."
    },
    {
      title: "Dashboard progress",
      level: "Pemula +",
      goal: "Menampilkan data ringkasan dari model ke Blade.",
      example: {
        type: "dashboard",
        title: "Progress kelas",
        subtitle: "Blade + Eloquent",
        progress: 72,
        stats: [
          { value: "20", label: "materi" },
          { value: "6", label: "project" },
          { value: "10", label: "debug" }
        ],
        tasks: ["Controller data", "Blade loop", "Named route"]
      },
      features: ["controller", "collection", "Blade", "cards", "route name"],
      steps: ["Siapkan data dummy", "Kirim ke view", "Render card dengan @foreach", "Tambahkan route dashboard"],
      hint: "Mulai dari array biasa sebelum memakai database.",
      extra: "Hitung persentase dari data asli."
    },
    {
      title: "Katalog produk",
      level: "Menengah awal",
      goal: "Membuat daftar produk dengan pencarian, filter, dan pagination.",
      example: {
        type: "gallery",
        title: "Katalog Laravel",
        description: "Cari produk berdasarkan nama dan kategori.",
        items: [
          { title: "Keyboard", label: "aksesori" },
          { title: "Mouse", label: "aksesori" },
          { title: "Monitor", label: "display" },
          { title: "Laptop", label: "komputer" }
        ]
      },
      features: ["Eloquent query", "when", "search", "pagination", "withQueryString"],
      steps: ["Buat tabel produk", "Tampilkan daftar", "Tambahkan search", "Tambahkan pagination"],
      hint: "Gunakan withQueryString agar filter tidak hilang saat pindah halaman.",
      extra: "Tambahkan halaman detail produk."
    },
    {
      title: "Upload foto profil",
      level: "Menengah awal",
      goal: "Mengunggah gambar, memvalidasi, dan menampilkan preview dari storage.",
      example: {
        type: "notice",
        badge: "UPLOAD",
        title: "Foto profil tersimpan",
        message: "Gambar lolos validasi dan path tersimpan di database.",
        action: "Lihat profil"
      },
      features: ["file validation", "storage public", "enctype", "asset URL", "model update"],
      steps: ["Buat form upload", "Tambahkan enctype", "Validasi image", "Simpan path dan tampilkan"],
      hint: "Jalankan php artisan storage:link untuk akses publik storage.",
      extra: "Hapus file lama saat foto diganti."
    },
    {
      title: "API catatan JSON",
      level: "Menengah awal",
      goal: "Membuat endpoint API sederhana untuk daftar catatan.",
      example: {
        type: "product",
        icon: "JSON",
        category: "API RESPONSE",
        name: "Notes endpoint",
        description: "Endpoint mengirim data catatan dalam format JSON.",
        tag: "/api/notes",
        price: "200 OK",
        cta: "Fetch"
      },
      features: ["routes/api.php", "JSON response", "API resource", "status code", "collection"],
      steps: ["Buat route API", "Ambil data model", "Return JSON", "Tes lewat browser atau fetch"],
      hint: "Ingat prefix /api saat membuka endpoint.",
      extra: "Tambahkan endpoint detail berdasarkan id."
    }
  ];

  const badges = [
    { id: "laravel-starter", title: "Laravel Starter", icon: "bi-compass-fill", check: (state) => state.completedLessons.length >= 1 },
    { id: "route-reader", title: "Route Reader", icon: "bi-signpost-fill", check: (state) => ["routing", "route-parameter", "controller"].every((id) => state.completedLessons.includes(id)) },
    { id: "blade-builder", title: "Blade Builder", icon: "bi-window-stack", check: (state) => ["blade-template", "layout-blade"].every((id) => state.completedLessons.includes(id)) },
    { id: "form-guardian", title: "Form Guardian", icon: "bi-shield-check", check: (state) => ["request-input", "validasi-form"].every((id) => state.completedLessons.includes(id)) },
    { id: "eloquent-ready", title: "Eloquent Ready", icon: "bi-database-check", check: (state) => ["migration", "eloquent-model", "crud-resource"].every((id) => state.completedLessons.includes(id)) },
    { id: "api-maker", title: "API Maker", icon: "bi-braces", check: (state) => state.completedLessons.includes("api-json") },
    { id: "laravel-debugger", title: "Laravel Debugger", icon: "bi-bug-fill", check: (state) => state.completedDebug.length >= 5 }
  ];

  const editorDefaults = {
    routes: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/profil', [PageController::class, 'profil'])->name('profil');`,
    controller: `<?php

class PageController extends Controller
{
    public function profil()
    {
        return view('profil', [
            'nama' => 'Nadia',
            'level' => 'Pemula Laravel',
            'skills' => ['Route', 'Controller', 'Blade'],
            'aktif' => true,
        ]);
    }
}`,
    blade: `<section class="profile-card">
  <p class="eyebrow">Belajar Laravel</p>
  <h1>Halo, {{ $nama }}</h1>
  <p>{{ $level }}</p>

  @if ($aktif)
    <strong>Target minggu ini</strong>
  @endif

  <ul>
    @foreach ($skills as $skill)
      <li>{{ $skill }}</li>
    @endforeach
  </ul>
</section>`,
    css: `body {
  font-family: Arial, sans-serif;
  background: #f8fafc;
  color: #17213a;
  padding: 24px;
}

.profile-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  max-width: 520px;
  padding: 24px;
}

.eyebrow {
  color: #ff2d20;
  font-weight: 700;
  text-transform: uppercase;
}`
  };

  return {
    lessons,
    quizQuestions,
    recallChallenges,
    debugChallenges,
    projects,
    badges,
    editorDefaults
  };
})();
