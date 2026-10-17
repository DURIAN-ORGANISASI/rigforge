<div align="center">

<img src="docs/images/banner.svg" alt="RigForge — konverter data avatar Roblox menjadi script Lua" width="100%">

<p><strong>Ubah data avatar Roblox menjadi script Lua yang siap ditinjau dan disalin ke Roblox Studio.</strong><br>
Konversi berjalan di browser; data avatar yang ditempel tidak dikirim ke server RigForge.</p>

<p>
  <a href="https://rigforge-mocha.vercel.app/"><img src="https://img.shields.io/badge/Buka_RigForge-demo-6C63FF?style=for-the-badge&labelColor=111827" alt="Buka demo RigForge"></a>
  <a href="https://rigforge-mocha.vercel.app/relay"><img src="https://img.shields.io/badge/Buka_Relay-Discord-5865F2?style=for-the-badge&labelColor=111827" alt="Buka Relay"></a>
  <a href="README.en.md"><img src="https://img.shields.io/badge/Read_in-English-38BDF8?style=for-the-badge&labelColor=111827" alt="Read in English"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-App_Router-111827?logo=nextdotjs" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-087EA4?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/Deploy-Vercel-111827?logo=vercel" alt="Vercel">
</p>

</div>

---

## ✦ Apa itu RigForge?

RigForge adalah alat web untuk mengubah data mentah avatar Roblox menjadi struktur script Lua yang dapat digunakan sebagai titik awal di Roblox Studio. Tempel data, tinjau hasil konversi, lalu salin kode.

Dalam repo dan deployment yang sama tersedia **Relay**, workspace terpisah untuk menguji akses channel dan mengirim pesan Discord menggunakan Bot Token resmi.

| Workspace | Fungsi |
| --- | --- |
| **RigForge — `/`** | Membaca token avatar dan data `AccessoryBlob`, lalu menghasilkan struktur Lua. |
| **Relay — `/relay`** | Menyimpan konfigurasi bot di browser, menguji akses channel, dan meneruskan pengiriman pesan ke Discord melalui API Route. |

## Fitur utama

- **Konversi otomatis** — hasil Lua diperbarui saat input berubah; tersedia juga tombol Generate Paksa.
- **Dua format input** — token seperti `Head: 123` dan JSON setelah `AccessoryBlob Data:` dapat digunakan bersama.
- **Template konsisten** — setiap kelompok memiliki jumlah slot minimum; slot yang belum terisi memakai `AssetId = 0`, dan ID tambahan membuat baris baru.
- **Pembersihan duplikat** — ID yang sama dalam bagian yang sama ditulis satu kali.
- **Salin ke clipboard** — salin seluruh hasil lalu tempel manual ke Roblox Studio.
- **Tema terang/gelap** — mengikuti preferensi sistem atau dapat diganti dari antarmuka.
- **Relay untuk Discord** — konfigurasi Bot Token resmi, sampai 10 slot channel, pemeriksaan akses, pengiriman pesan, dan riwayat sesi.

## Tampilan aplikasi

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/images/preview-dark.png" alt="Tampilan RigForge dalam mode gelap" width="100%"><br><sub>Mode gelap</sub></td>
    <td width="50%" align="center"><img src="docs/images/preview-light.png" alt="Tampilan RigForge dalam mode terang" width="100%"><br><sub>Mode terang</sub></td>
  </tr>
</table>

## Cara menggunakan

<img src="docs/images/workflow.svg" alt="Empat tahap: tempel data, konversi, tinjau output, lalu salin ke Roblox Studio" width="100%">

1. Buka [RigForge](https://rigforge-mocha.vercel.app/). Contoh Data dimuat secara otomatis.
2. Tempel data avatar ke panel **Data mentah**. Tekan **Reset** terlebih dahulu bila ingin memulai dari input kosong.
3. Periksa hasil pada panel **Hasil Lua**. Konversi berjalan otomatis ketika input berubah.
4. Gunakan **Generate Paksa** untuk menjalankan ulang konversi tanpa menunggu jeda.
5. Tinjau bagian tubuh, pakaian, dan aksesori, lalu pilih **Salin Kode**.
6. Tempel kode ke Roblox Studio dan uji sebelum digunakan.

Untuk membuka Relay, gunakan ikon zigzag biru di dekat nama workspace. Relay dan RigForge berada dalam aplikasi dan deployment yang sama.

## Format input

Parser mencari token di seluruh teks dan tidak membedakan huruf besar/kecil.

| Data | Contoh token | Catatan |
| --- | --- | --- |
| Tubuh | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` | Satu ID per token. `DynamicHead` menggantikan nilai `Head` bila tersedia. |
| Pakaian klasik | `Pants`, `Shirt`, `TShirt` | Variasi `T-Shirt` dan `Tshirt` juga dikenali. |
| Warna kulit | `Body Color: 242,215,205 (#F2D7CD)` | Kode hex di dalam tanda kurung diprioritaskan; default-nya `Pastel orange`. |
| Aksesori | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` | Beberapa ID dapat dipisahkan dengan koma. |
| AccessoryBlob | `AccessoryBlob Data:` diikuti array JSON | Item memakai properti `AccessoryType` dan `AssetId`; item ditempatkan ke kelompok yang sesuai. |

Jika sebuah kategori muncul dalam token dan blob, ID token diproses terlebih dahulu, lalu item dari blob. JSON blob yang tidak valid diabaikan; kesalahannya dicatat di konsol browser, sementara input lainnya tetap diproses.

## Template slot universal

Jumlah slot minimum ditetapkan di `LAYERED_GROUPS` dan `ACCESSORY_GROUPS` pada `src/lib/converter.ts`.

<img src="docs/images/slot-template.svg" alt="Ilustrasi slot minimum, AssetId nol untuk slot kosong, dan baris tambahan saat ID melebihi slot" width="100%">

| Kelompok | Slot minimum |
| --- | --- |
| `Clothes.Layered` | `LeftShoe` 2, `RightShoe` 2, `TShirt` 3, `Shirt` 3, `Pants` 3, `Shorts` 3, `DressSkirt` 3, `Sweater` 3, `Jacket` 4 |
| `Accessories` | `Hat` 3, `Hair` 3, `Face` 7, `Front` 3, `Neck` 3, `Back` 3, `Shoulder` 3, `Waist` 3 |

- ID mengisi slot dari atas; slot kosong tetap bernilai `AssetId = 0`.
- ID berlebih menambah baris di kelompok yang sama.
- Jenis aksesori yang belum tercantum mendapat bagian baru di akhir `Accessories`.
- ID duplikat dalam satu kelompok hanya ditulis sekali.
- Input kosong akan mengosongkan panel hasil.

Nilai seperti `Scaling`, `Face`, `UserId`, dan warna kulit default ditetapkan di converter. Jika mengubahnya, perbarui fixture snapshot di `src/lib/__fixtures__/golden.json` juga.

## Privasi dan keamanan

<img src="docs/images/privacy.svg" alt="Diagram perbedaan jalur data RigForge dan Relay" width="100%">

- **RigForge:** data avatar yang ditempel diproses di browser; input konversi tidak dikirim ke server.
- **Relay:** konfigurasi bot dan 10 slot channel disimpan di `localStorage` browser. Pemeriksaan channel dan pengiriman pesan melewati Next.js API Route, lalu diteruskan ke Discord. Token tidak disimpan ke database atau log aplikasi.
- Gunakan Bot Token resmi dari Discord Developer Portal; token akun pribadi atau self-bot tidak didukung.
- Aplikasi tidak menggunakan analytics atau pelacak. Font di-host sendiri melalui Fontsource.
- `vercel.json` menetapkan header keamanan, termasuk `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, dan `Permissions-Policy`.

## Batasan yang perlu diketahui

- Satu avatar diproses dalam satu waktu; hasil baru menggantikan isi panel sebelumnya.
- Input konversi tidak disimpan. Setelah halaman dimuat ulang, Contoh Data dimuat kembali.
- Tidak tersedia tombol unduh; hasil disalin ke clipboard lalu ditempel manual ke Studio.
- Selalu tinjau dan uji hasil di Roblox Studio, terutama untuk data dari sumber yang berbeda.
- RigForge adalah proyek independen dan tidak berafiliasi dengan Roblox Corporation.

## Jalankan secara lokal

Prasyarat: **Node.js 22** dan npm.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk pemeriksaan sebelum kontribusi:

| Perintah | Tujuan |
| --- | --- |
| `npm run dev` | Server pengembangan Next.js. |
| `npm run test` | Menjalankan unit test Vitest. |
| `npm run typecheck` | Memeriksa tipe TypeScript. |
| `npm run build` | Membuat build produksi. |
| `npm run start` | Menjalankan build produksi lokal. |

Tidak ada environment variable wajib untuk penggunaan standar.

### Teknologi

Next.js App Router · React · TypeScript · CSS dengan design token · Vitest.

Struktur penting: `src/app/` berisi halaman dan API Route, `src/components/` berisi antarmuka, dan `src/lib/` berisi parser serta helper. Panduan visual tersedia di [docs/DESIGN.md](docs/DESIGN.md).

## Deploy ke Vercel

Hubungkan repo ini ke Vercel Dashboard, atau jalankan:

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Aplikasi berjalan sebagai Next.js. Endpoint Relay menggunakan API Route server-side; variabel lingkungan tidak wajib untuk alur standar.

## Kontribusi

Saran dan perbaikan dipersilakan. Sebelum membuat pull request, jalankan `npm run test` dan `npm run build`. Jika output Lua berubah, perbarui `golden.json` dan jelaskan alasannya.

## Lisensi

Dirilis di bawah [Lisensi MIT](LICENSE).

---

<div align="center"><sub>RigForge · alat independen untuk avatar Roblox · konversi avatar diproses lokal di browser.</sub></div>
