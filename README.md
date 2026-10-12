<div align="center">

<img src="docs/images/banner.svg" alt="RigForge: konverter avatar Roblox ke script Lua" width="100%">

<br>

[![Live demo](https://img.shields.io/badge/demo-rigforge--mocha.vercel.app-ffd60a?style=for-the-badge&labelColor=111111)](https://rigforge-mocha.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Relay](https://img.shields.io/badge/Relay-Discord_Tools-5865F2?style=flat-square&logo=discord&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232a?style=flat-square&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6e9f18?style=flat-square&logo=vitest&logoColor=white)
![Deploy](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[Bahasa Indonesia](README.md) · [English](README.en.md)

**Ubah data mentah avatar Roblox menjadi script Lua untuk Roblox Studio.**
Berjalan di browser Anda. Data yang ditempel tidak pernah melewati server.

[Coba sekarang](https://rigforge-mocha.vercel.app/) ·
[Fitur](#fitur) ·
[Cara pakai](#cara-pakai) ·
[Format input](#format-input) ·
[Privasi](#privasi-dan-keamanan) ·
[Pengembangan](#pengembangan-lokal) ·
[Kontribusi](#kontribusi)

</div>

---

## Ringkasan

RigForge mengubah data mentah avatar Roblox menjadi script Lua. Dalam repo dan deployment yang sama, Relay menyediakan workspace pengiriman pesan Discord melalui Bot Token resmi.

Ada tiga hal yang menjadi pegangan alat ini:

- **Dua alat, satu tempat.** RigForge tetap ada di halaman utama (`/`); Relay tersedia di `/relay`. Gunakan tombol kuning di header untuk berpindah halaman.
- **Template yang konsisten.** Setiap bagian punya jumlah slot minimum, jadi bentuk output selalu sama dan mudah dibandingkan antar avatar.
- **Terkunci oleh tes.** Parser dan generator dijaga 74 tes, termasuk 26 kasus snapshot, supaya perilaku konversi tidak berubah diam-diam.

## Dua workspace

- **RigForge (`/`)** — konversi data avatar Roblox ke script Lua; semua input konversi diproses lokal di browser.
- **Relay (`/relay`)** — konfigurasi Bot Token resmi, uji akses channel, dan kirim pesan Discord. Tombol kuning di header berpindah antara RigForge dan Relay.

## Tampilan

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/images/preview-dark.png" alt="Pratinjau RigForge mode malam"><br><sub>Mode malam</sub></td>
    <td width="50%" align="center"><img src="docs/images/preview-light.png" alt="Pratinjau RigForge mode siang"><br><sub>Mode siang</sub></td>
  </tr>
</table>

<sub>Pratinjau antarmuka dengan Contoh Data bawaan. ID pada gambar hanya contoh.</sub>

## Fitur

| | |
|---|---|
| **Konversi otomatis** | Hasil Lua muncul saat data berubah, dengan jeda singkat (sekitar 0,2 detik) supaya tempel data besar tidak menahan halaman. |
| **Dua cara input** | Daftar token (`Head: 123`) atau blob JSON setelah `AccessoryBlob Data:`. Keduanya bisa dipakai bersamaan. |
| **Template universal** | Jumlah slot minimum per bagian. ID mengisi dari atas, sisa slot tetap `AssetId = 0`, dan baris baru ditambahkan bila ID melebihi slot. |
| **Parser yang toleran** | Token tidak peka huruf besar-kecil. Mengenali `DynamicHead` dan variasi penulisan `TShirt` (`T-Shirt`, `Tshirt`). |
| **Tanpa duplikat** | ID identik dalam satu bagian hanya ditulis sekali. |
| **Contoh Data dan Reset** | Halaman langsung terisi data contoh. Satu klik untuk memuat ulang, satu klik untuk mengosongkan. |
| **Generate Paksa** | Menjalankan ulang konversi seketika, tanpa menunggu jeda. |
| **Salin Kode** | Menyalin seluruh hasil Lua ke clipboard dengan satu klik. |
| **Mode siang dan malam** | Mengikuti sistem, bisa diganti manual lewat tombol di header, dan pilihan tersimpan di browser. |
| **Aksesibel** | Tautan lewati ke konten, label ARIA, dan cincin fokus keyboard yang kontrasnya diperiksa di kedua mode. |
| **Relay: Discord** | Konfigurasi Bot Token resmi, 10 slot channel, uji koneksi, pengiriman pesan, mode code block, dan riwayat sesi. |

## Cara pakai

<img src="docs/images/workflow.svg" alt="Alur kerja RigForge: tempel, konversi, tinjau, salin" width="100%">

1. **Buka** [rigforge-mocha.vercel.app](https://rigforge-mocha.vercel.app/). Halaman langsung terisi Contoh Data dan hasilnya sudah tampil.
2. **Tempel** data mentah avatar di panel **Data mentah**. Klik **Reset** dulu bila ingin mulai dari kosong.
3. **Lihat hasilnya** di panel **Hasil Lua**. Konversi berjalan otomatis setiap data berubah.
4. Klik **Generate Paksa** bila ingin menjalankan ulang konversi saat itu juga.
5. **Tinjau** bagian `Body`, `Clothes`, dan `Accessories` pada hasil.
6. Klik **Salin Kode**, lalu tempel ke Roblox Studio.
7. Gunakan tombol kuning di header untuk pindah ke Relay (`/relay`). Di sana Anda dapat mengonfigurasi bot Discord dan mengirim pesan. Tombol pada header Relay kembali ke RigForge.

> [!TIP]
> Tidak yakin dengan format data Anda? Klik **Contoh Data**, lihat bentuk input dan outputnya, lalu ganti isinya dengan data Anda.

## Format input

Parser mencari token di mana pun dalam teks, tidak peka huruf besar-kecil. Token boleh berada di baris terpisah.

| Bagian | Token | Catatan |
|---|---|---|
| **Tubuh** | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` | Satu ID per token. Bila `DynamicHead` ada, nilainya dipakai menggantikan `Head`. |
| **Pakaian klasik** | `Pants`, `Shirt`, `TShirt` | Satu ID per token. `TShirt` juga dikenali sebagai `T-Shirt` dan `Tshirt`. |
| **Warna kulit** | `Body Color: 242,215,205 (#F2D7CD)` | Kode hex dalam kurung dipakai lebih dulu. Tanpa hex, teks setelah `Body Color:` dipakai. Tanpa keduanya, nilainya `Pastel orange`. |
| **Aksesori** | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` | Daftar ID dipisah koma. |
| **Blob** | `AccessoryBlob Data:` diikuti array JSON | Tiap item memakai `AccessoryType` dan `AssetId`. Tipe pakaian berlapis dan aksesori masuk ke bagian yang sesuai. |

Urutan ID dalam satu bagian: daftar token lebih dulu, lalu item dari blob.

> [!NOTE]
> Bila JSON pada blob tidak valid, blob diabaikan dan galatnya dicatat di konsol browser. Sisa data tetap dikonversi.

## Template universal

Setiap bagian punya jumlah slot minimum. Daftar lengkapnya ada di `LAYERED_GROUPS` dan `ACCESSORY_GROUPS` pada `src/lib/converter.ts`.

| Kelompok | Bagian dan slot minimum |
|---|---|
| `Clothes.Layered` | `LeftShoe` 2, `RightShoe` 2, `TShirt` 3, `Shirt` 3, `Pants` 3, `Shorts` 3, `DressSkirt` 3, `Sweater` 3, `Jacket` 4 |
| `Accessories` | `Hat` 3, `Hair` 3, `Face` 7, `Front` 3, `Neck` 3, `Back` 3, `Shoulder` 3, `Waist` 3 |

<img src="docs/images/slot-template.svg" alt="Cara slot terisi: ID mengisi dari atas, sisa slot AssetId = 0, ID berlebih menambah baris" width="100%">

| Situasi | Perilaku |
|---|---|
| ID lebih sedikit dari slot | ID mengisi slot dari atas ke bawah. Sisa slot tetap `AssetId = 0`. |
| ID melebihi jumlah slot | Baris baru ditambahkan **di bagian yang sama**. |
| Tipe aksesori tidak ada di template | Dibuatkan **bagian baru** di akhir `Accessories`. |
| ID identik dalam satu bagian | Hanya ditulis **sekali**. |
| Input kosong | Panel hasil dikosongkan. |

Potongan hasil nyata dari Contoh Data (`FaceAccessory` berisi dua ID, lima slot sisanya tetap nol):

```lua
Accessories = {
	-- ...
	{ AssetId = 90044197280959, AccessoryType = "Face" },
	{ AssetId = 15873662828, AccessoryType = "Face" },
	{ AssetId = 0, AccessoryType = "Face" },
	{ AssetId = 0, AccessoryType = "Face" },
	{ AssetId = 0, AccessoryType = "Face" },
	{ AssetId = 0, AccessoryType = "Face" },
	{ AssetId = 0, AccessoryType = "Face" },
	-- ...
},
```

> [!IMPORTANT]
> Nilai `Scaling` (semuanya `0`), `Face = 0`, `UserId = 0`, dan warna kulit bawaan `Pastel orange` ditulis tetap di `converter.ts`. Bila Anda mengubahnya, perbarui juga `src/lib/__fixtures__/golden.json` karena output snapshot ikut berubah.

## Privasi dan keamanan

<img src="docs/images/privacy.svg" alt="Data diproses di browser dan ditempel manual ke Roblox Studio, tanpa melewati server RigForge" width="100%">

- **RigForge:** data avatar yang ditempel diproses di browser; server tidak menerima input konversi.
- **Relay:** Bot Token dan 10 slot channel disimpan di `localStorage` browser. Request uji dan pengiriman pesan diteruskan melalui API Route Next.js (`/api/discord/check` dan `/api/discord/send`). Route meneruskan token ke Discord sebagai header `Authorization: Bot ...` dan tidak menyimpannya ke database atau log aplikasi.
- Tidak perlu token akun pribadi/self-bot. Gunakan Bot Token resmi dari Discord Developer Portal.
- Aplikasi tidak memakai analytics maupun pelacak.
- Font di-host sendiri lewat Fontsource, tanpa Google Fonts.
- `vercel.json` menetapkan header keamanan: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, dan `Permissions-Policy`.

## Batasan yang diketahui

- **Satu avatar per konversi.** Hasil menggantikan isi panel, tidak ditambahkan.
- **Data tidak disimpan.** Setelah halaman dimuat ulang, panel kembali terisi Contoh Data. Hanya pilihan tema yang diingat.
- **Hasil tetap perlu diuji** di Roblox Studio sebelum dipakai, terutama untuk data dari sumber yang berbeda-beda.
- **Tidak ada tombol unduh.** Hasil disalin ke clipboard, lalu ditempel sendiri ke Studio.
- Alat ini bersifat independen dan **tidak berafiliasi dengan Roblox Corporation**. "Roblox" adalah merek dagang Roblox Corporation, dipakai hanya untuk menjelaskan fungsi alat.

## Pengembangan lokal

Prasyarat: **Node.js 22** dan npm.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm install
npm run dev        # http://localhost:5173
```

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan Next.js pada `http://localhost:3000`. |
| `npm run build` | Memeriksa dan membuat build produksi Next.js. |
| `npm run start` | Menjalankan build produksi lokal setelah `npm run build`. |
| `npm run test` | Menjalankan unit test (Vitest). |
| `npm run typecheck` | Memeriksa tipe TypeScript. |

Tidak ada environment variable yang dibutuhkan.

### Struktur folder

```
src/
  app/
    page.tsx                  Halaman utama RigForge
    relay/page.tsx            Workspace Relay
    api/discord/               Endpoint server-side Discord
  components/                 UI RigForge + Relay + AppSwitcher
  hooks/                      Tema dan konfigurasi bot
  lib/                        Parser Lua dan helper Relay
  styles/                     Tema dan layout RigForge
public/                 favicon, brand.svg, ikon iOS, gambar Open Graph
docs/                   DESIGN.md (sistem desain), export-assets.py, images/
```

### Tech stack

- **Next.js App Router**, **React**, dan **TypeScript**
- **CSS biasa** dengan design token, gaya neobrutalism (border tebal, bayangan keras tanpa blur, palet blok cerah)
- **JetBrains Mono** lewat Fontsource sebagai satu-satunya font
- **Vitest** untuk unit test

Panduan visual ada di [`docs/DESIGN.md`](docs/DESIGN.md).

## Deploy ke Vercel

Hubungkan repo ini ke Vercel Dashboard, atau deploy dari terminal:

```bash
npx vercel          # pratinjau
npx vercel --prod   # produksi
```

Vercel menjalankan aplikasi sebagai Next.js. `vercel.json` mengatur framework dan header keamanan. Endpoint Relay berjalan sebagai API Route server-side; tidak ada environment variable wajib untuk penggunaan standar.

## Kontribusi

Masukan dan perbaikan sangat diterima. Sebelum membuka pull request, jalankan `npm run test` dan `npm run build` sampai lulus. Bila perubahan Anda memengaruhi output Lua, perbarui `golden.json` dan jelaskan alasannya di deskripsi PR.

## Lisensi

Dirilis di bawah [Lisensi MIT](LICENSE).

---

<div align="center">
<sub>RigForge. Alat independen untuk avatar Roblox. Diproses lokal di browser.</sub>
</div>
