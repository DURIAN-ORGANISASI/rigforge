# RigForge — Skala Desain (neobrutalism modern)

Satu sumber kebenaran untuk konsistensi visual RigForge. Nilai teknis ada di
`src/styles/tokens.css`; file ini menjelaskan **peran** tiap nilai. Komponen memakai token peran untuk tema utama. Warna ilustrasi statis di pratinjau hero dibuat tetap agar menyerupai editor dan contoh kode.

Prinsip: **satu nama peran untuk kedua mode.** Blok `[data-theme='dark']`
hanya mengganti nilai. Palet blok cerah (`--c-*`) sama di kedua mode.
Teks antarmuka memakai system sans (`--font-ui`); wordmark, data teknis, dan editor Lua memakai JetBrains Mono (`--font-mono`).

> Riwayat: gaya sebelumnya neobrutalism sudut-0 satu-kuning
> (`--radius: 0`, `--accent: #ffd400`, bayangan krem-di-krem di mode malam
> yang terbaca sebagai garis ganda). Token lama (`--radius`, `--shadow*`,
> `--accent*`, `--scroll-thumb`) sudah dihapus; bayangan malam kini
> berwarna mengikuti bloknya.

---

## 1. Token peran

| Token | Siang | Malam | Peran |
| --- | --- | --- | --- |
| `--c-yellow` | `#FFD60A` | sama | Logo, header Hasil Lua, seleksi, scrollbar, garis footer |
| `--c-pink` | `#FF8FCB` | sama | Header Data mentah, bayangan kartu input (malam), marker wordmark (`--accent-3`) |
| `--c-mint` | `#7CF2B4` | sama | Tombol primer, bayangan tombol tema (malam) |
| `--c-blue` | `#8CB4FF` | sama | Zigzag dekoratif, cincin fokus (malam) |
| `--c-orange` | `#FF9F43` | sama | Stiker burst |
| `--c-red` | `#FF5C5C` | sama | Tombol bahaya |
| `--c-black` | `#111111` | sama | Border + bayangan di atas blok cerah (aturan a) |
| `--bg` | `#FFFBEB` | `#121212` | Latar halaman berpola titik (juga `theme-color`) |
| `--dot` | `rgba(17,17,17,.14)` | `#2A2A2A` | Titik pola latar |
| `--surface` | `#FFFFFF` | `#1C1C1C` | Isi kartu, tombol sekunder/tema |
| `--surface-2` | `#FFF7DB` | `#242424` | Track scrollbar |
| `--ink` | `#111111` | `#F5F0E6` | Border elemen di atas latar (HANYA border di malam, aturan b) |
| `--text` | `#111111` | `#F5F0E6` | Teks utama |
| `--muted` | `#4B4B55` | `#B9B2A3` | Label/hint/placeholder (≥4,5:1 di permukaan polos) |
| `--focus` | `#1E3A8A` | `var(--c-blue)` | Cincin fokus (navy di siang: biru cerah 1,9:1 = gagal) |
| `--accent-3` | `#FF8FCB` | sama | Highlight marker wordmark |
| `--ok` / `--ok-ink` | `#2fbf71` / `#0f0f0f` | `#4ade80` / `#0f0f0f` | Status tersalin |
| `--danger-text` | `#b3261e` | `#ff5c5c` | Teks error panel |
| `--footer-bg` | `#111111` | `#111111` | Pita footer (hitam di kedua mode) |
| `--footer-text` | `#f5f0e6` | `#f5f0e6` | Teks footer (≥4,5:1) |
| `--footer-line` | campuran 40% | campuran 40% | Garis dalam footer (±3,5:1, ≥3:1) |

Aturan garis & bayangan:

- a) Di atas BLOK CERAH → border + bayangan selalu `#111` kedua mode.
- b) Kartu/panel + tombol tema di atas latar GELAP (malam) → border krem
  3px, bayangan berwarna (input pink, output kuning, tema mint). Siang:
  bayangan selalu `#111`.
- c) Tidak ada kombinasi border krem + bayangan krem di mana pun.
- Tombol nonaktif: opasitas 0,5, bayangan hilang, `cursor: not-allowed`.
- **Tanpa warna hijau terminal StockMeta** di komponen.

## 2. Bentuk — membulat tegas

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `--radius-card` | `14px` | Kartu/panel (header ikut via radius-dalam 11px) |
| `--radius-ctl` | `10px` | Tombol, tombol tema, ikon merek 48px→12px |
| `--radius-badge` | `999px` | Cadangan bila ada badge/pil |

## 3. Bayangan — keras, tanpa blur, tanpa transparansi

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `--shadow-card` | `6px 6px 0` | Kartu (#111; malam: pink/kuning ikut blok) |
| `--shadow-ctl` | `4px 4px 0` | Tombol, ikon merek (#111; tema malam: mint) |
| `--shadow-hover` | `7px 7px 0` | Keadaan hover tombol |

Container memberi padding kanan/bawah ≥ bayangan kartu (6px) + gap;
tidak ada scroll horizontal akibat bayangan di lebar 320–3840.

## 4. Interaksi tombol

- Hover (aktif): geser `(-2px, -2px)`, bayangan 7px.
- Active (ditekan): geser `(+4px, +4px)`, bayangan hilang.
- `transition` ≤120ms hanya `transform` + `box-shadow`; nonaktif di
  `prefers-reduced-motion`.
- Primer (Generate Paksa): mint + `#111`, bobot 800. Sekunder (Contoh
  Data, Salin Kode): putih + `#111`. Bahaya (Reset): merah + `#111`.

## 5. Font UI dan kode

Landing page, deskripsi, navigasi, dan kontrol memakai system sans (`--font-ui`) agar hirarki teks lebih mudah dipindai. Wordmark, label teknis tertentu, dan editor kode tetap memakai JetBrains Mono (`--font-mono`, variable, self-hosted via `@fontsource-variable/jetbrains-mono`). Skala token `--text-*` dipertahankan.

| Token | Nilai | lh | Peran |
| --- | --- | --- | --- |
| `--text-meta` | `clamp(12px, 11.5px + 0.15vw, 12.5px)` | 1.4 | Label kapital, pesan error panel, baris bawah footer |
| `--text-small` | 13px | 1.5 | Hint, teks footer |
| `--text-body` | 14px | 1.5 | Teks dasar body, kontrol, tombol, isi textarea/output Lua |
| `--text-title` | 16px | 1.3 | Judul panel |
| `--text-brand` | 20px | 1.2 | Token cadangan; wordmark diatur dengan ukuran responsif tersendiri. |

Wordmark memakai JetBrains Mono tebal dengan highlight marker; ukurannya disesuaikan pada breakpoint di `src/styles/landing.css`.
Ikon SVG: `stroke-width: 2.5`; logo 26px, tombol tema 24px.

## 6. Pola komponen

- Header sticky dengan CTA konversi dan tombol tema; logo stiker mengecil di layar sempit dan zigzag disembunyikan pada mobile.
- Hero produk memakai dua kolom di desktop dan satu kolom pada tablet/mobile; kartu workspace menumpuk saat lebarnya tidak cukup.
- Kartu: radius 14px, `overflow: visible` (burst boleh keluar), header
  flat pink/kuning teks `#111`/800 + garis `#111`; isi `--surface`
  tanpa border tambahan; textarea tanpa border, fokus outline 3px
  inset; seleksi kuning + `#111`.
- Burst oranye 38px di sudut atas kanan header Hasil Lua, putar
  12deg, tanpa teks, non-interaktif, tersembunyi <640px.
- Footer: pita `#111`, garis atas kuning 4px, merek kuning +
  kotak ikon 28px; teks `#F5F0E6`.
- Scrollbar 14px: thumb kuning + border 3px + radius 8px.

## 7. Kontras (WCAG AA, kedua mode)

- Teks normal ≥ **4,5:1**, teks besar/elemen UI ≥ **3:1** (tabel ukur di
  laporan pengerjaan; `#111` lolos ≥6:1 di semua blok cerah).
- Teks error memakai `--danger-text`; fokus memakai `--focus`.
- Layout tidak berubah: susunan header/dua panel/footer, urutan tombol
  (Generate Paksa lalu Salin Kode), debounce, breakpoint tumpuk, dan
  perilaku tema (ikut sistem + override `localStorage`) sama persis.

## 8. Motion (hanya transform + opacity, tanpa library)

Token (`:root`, dipakai semua, jangan tulis angka berulang):

| Token | Nilai |
| --- | --- |
| `--ease-pop` | `cubic-bezier(.34,1.56,.64,1)` |
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` |
| `--dur-fast` | `120ms` |
| `--dur-base` | `220ms` |
| `--dur-enter` | `520ms` |

Daftar animasi:

| # | Pemicu | Gerak | Durasi |
| --- | --- | --- | --- |
| A | Load: header / logo / kartu input-output / footer | Turun-fade / skala+putar ke -4° / naik-fade stagger 150-250ms / fade-up 350ms; semua `backwards` | Total ≤700ms |
| B | Loop: burst / zigzag / titik | Putar 360° 24s (8s saat kartu di-hover) / ayun ±3px 3s / geser satu periode 22px 40s | Tepat 3 loop |
| C | Logo hover / klik | Goyang -4°→+4°→-2°→+4° / lompat -4px | 400ms / 220ms |
| D | Tombol | Transisi `transform`+`box-shadow` pop; outline memudar 100ms | 120ms |
| E | Generate diklik | Ikon putar terus selama jendela visual 500ms (konversi tetap sinkron) | 500ms |
| F | Salin berhasil | Ikon centang pop 0.4→1.15→1, kembali 1,5 dtk; teks tetap "Salin Kode"; `role="status"` mengumumkan | 300ms |
| G | Tema diklik | Ikon putar 180° + kempis 350ms; `.theme-fade` 300ms di `<html>` untuk warna, lalu dilepas | 350/300ms |
| H | Hasil berubah | Panel kedip opacity 0.55→1 sekali via lepas-pasang class (tanpa render, tanpa konversi) | 200ms |
| I | Kartu di-hover | Lift -2px, bayangan tetap | 220ms |
| J | Reset berisi | Kedua panel getar ±4px via class di `.bench` | 240ms |

Aturan:

- Dilarang menganimasikan `width/height/top/left/margin/padding` dan
  `box-shadow` besar (kecuali transisi hover tombol yang sudah ada).
- `prefers-reduced-motion: reduce` → `animation: none` total sehingga
  `document.getAnimations()` kosong; transisi jadi instan; ikon centang,
  warna tema, dan status tetap berganti jelas tanpa gerak.
- Dekorasi berputar/bergeser terkungkung pembungkusnya; `body`
  `overflow-x: clip` sebagai pengaman; tidak ada layout shift (CLS ≈ 0).
