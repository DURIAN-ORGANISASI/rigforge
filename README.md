<div align="center">

<img src="docs/images/banner.svg" alt="RigForge — konverter data avatar Roblox ke Lua" width="100%">

# RigForge

**Dari data avatar Roblox menjadi struktur Lua yang siap ditinjau.**

Konverter avatar berbasis browser dengan workspace tambahan untuk pengiriman pesan Discord melalui Bot API resmi.

<p>
  <a href="https://rigforge-mocha.vercel.app/"><img src="https://img.shields.io/badge/BUKA_RIGFORGE-Live-4C8DFF?style=for-the-badge&labelColor=0B1220" alt="Buka RigForge"></a>
  <a href="https://rigforge-mocha.vercel.app/relay"><img src="https://img.shields.io/badge/BUKA_RELAY-Discord-4AD7E9?style=for-the-badge&labelColor=0B1220" alt="Buka Relay"></a>
  <a href="README.en.md"><img src="https://img.shields.io/badge/Read_in-English-9AB8FF?style=for-the-badge&labelColor=0B1220" alt="Read in English"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-111827?logo=nextdotjs" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-087EA4?logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/Deploy-Vercel-111827?logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/badge/License-MIT-16A879" alt="MIT License">
</p>

</div>

---

## Ringkasan

RigForge adalah aplikasi web independen untuk mengubah data mentah avatar Roblox menjadi struktur Lua yang dapat ditinjau dan disalin ke Roblox Studio. Data konversi diproses langsung di browser, sehingga input avatar tidak perlu dikirim ke server RigForge.

Repositori dan deployment yang sama juga menyertakan **Relay**, workspace terpisah untuk menyiapkan konfigurasi Discord Bot, memeriksa akses channel, dan mengirim pesan melalui server-side API Route.

| Workspace | URL | Kegunaan |
| --- | --- | --- |
| **RigForge** | [Buka konverter](https://rigforge-mocha.vercel.app/) | Konversi token avatar dan data AccessoryBlob menjadi struktur Lua. |
| **Relay** | [Buka Relay](https://rigforge-mocha.vercel.app/relay) | Konfigurasi Bot Token, mengelola hingga 10 slot channel, memeriksa akses, dan mengirim pesan. |

## Fitur

### RigForge — konverter avatar
- **Konversi otomatis.** Hasil diperbarui saat input berubah, dengan jeda singkat agar pengetikan dan paste data besar tetap nyaman.
- **Beragam data input.** Parser mengenali token teks seperti Head: 123 dan JSON setelah penanda AccessoryBlob Data.
- **Output terstruktur.** ID dipetakan ke bagian tubuh, pakaian klasik, layered clothing, dan aksesori.
- **Template slot konsisten.** Slot minimum dipertahankan; slot kosong menggunakan AssetId = 0; ID tambahan membuat baris baru.
- **Penanganan duplikat.** ID berulang dalam kelompok yang sama hanya ditulis sekali.
- **Aksi cepat.** Muat data contoh, reset input, generate ulang, dan salin Lua ke clipboard.
- **Tema terang dan gelap.** Pilihan tema mengikuti preferensi sistem pada kunjungan pertama dan dapat diubah dari header.
- **Desain responsif.** Panel editor, navigasi, dan panduan menyesuaikan desktop, tablet, serta ponsel.

### Relay — workspace Discord
- Konfigurasi Bot Token resmi dan hingga 10 slot Channel ID.
- Label slot, pemilihan channel aktif, dan penyimpanan konfigurasi di browser.
- Pemeriksaan akses channel sebelum mengirim pesan.
- Pengiriman pesan melalui Discord Bot API dengan umpan balik status.
- Dukungan pengiriman beberapa token/baris sebagai pesan terpisah dan mode code block.
- Penanganan rate limit 429 dengan jeda dan percobaan ulang terbatas.
- Riwayat ringkas sesi untuk pengiriman yang berhasil.

## Pratinjau

<table>
  <tr>
    <td width="50%" align="center">
      <img src="docs/images/preview-dark.png" alt="RigForge dalam tema gelap" width="100%">
      <sub>Tampilan gelap</sub>
    </td>
    <td width="50%" align="center">
      <img src="docs/images/preview-light.png" alt="RigForge dalam tema terang" width="100%">
      <sub>Tampilan terang</sub>
    </td>
  </tr>
</table>

> Pratinjau statis bisa berbeda dari tampilan deployment setelah perubahan antarmuka terbaru.

## Cara menggunakan RigForge

1. Buka [RigForge](https://rigforge-mocha.vercel.app/).
2. Tempel data avatar ke panel **Data mentah**, atau pilih **Contoh Data** untuk mencoba.
3. Tunggu konversi otomatis atau tekan **Generate Paksa** untuk menjalankan konversi segera.
4. Tinjau hasil pada panel **Hasil Lua**.
5. Tekan **Salin Kode**, lalu tempel dan uji script tersebut di Roblox Studio.
6. Gunakan **Reset** untuk mengosongkan input dan memulai kembali.

### Format input yang dikenali

Parser mencari token di seluruh teks dan tidak membedakan huruf besar/kecil.

| Kategori | Contoh | Catatan |
| --- | --- | --- |
| Bagian tubuh | Head, Torso, LeftArm, RightArm, LeftLeg, RightLeg | DynamicHead menggantikan nilai Head bila tersedia. |
| Pakaian klasik | Pants, Shirt, TShirt | Variasi T-Shirt dan Tshirt juga dikenali. |
| Warna kulit | Body Color: 242,215,205 (#F2D7CD) | Nilai hex dalam tanda kurung diprioritaskan. |
| Aksesori | Hat, HairAccessory, FaceAccessory, FrontAccessory, NeckAccessory, BackAccessory, ShoulderAccessory, WaistAccessory | Beberapa ID dapat dipisahkan dengan koma. |
| AccessoryBlob | Penanda AccessoryBlob Data diikuti array JSON | Item menggunakan properti AccessoryType dan AssetId. |

Saat data token dan AccessoryBlob menyebut kategori yang sama, token diproses lebih dahulu, kemudian item JSON. JSON blob yang tidak valid diabaikan agar bagian input lain tetap dapat diproses; detail diagnostik ditulis ke konsol browser.

### Template slot

Jumlah slot minimum didefinisikan dalam LAYERED_GROUPS dan ACCESSORY_GROUPS pada src/lib/converter.ts.

| Kelompok | Slot minimum |
| --- | --- |
| Clothes.Layered | LeftShoe 2, RightShoe 2, TShirt 3, Shirt 3, Pants 3, Shorts 3, DressSkirt 3, Sweater 3, Jacket 4 |
| Accessories | Hat 3, Hair 3, Face 7, Front 3, Neck 3, Back 3, Shoulder 3, Waist 3 |

Slot kosong diisi dengan AssetId = 0. ID yang melebihi slot minimum menambah baris pada kelompok terkait. Jenis aksesori yang belum tercantum mendapatkan kelompok baru di akhir bagian Accessories.

## Privasi dan keamanan

### Pemrosesan avatar
- Input konversi RigForge diproses lokal di browser dan tidak dikirim ke server RigForge.
- Data input avatar tidak disimpan sebagai riwayat aplikasi.
- Hasil Lua perlu ditinjau dan diuji sebelum digunakan di Roblox Studio.

### Relay dan Bot Token
- Konfigurasi Relay disimpan pada localStorage browser.
- Tes channel dan pengiriman pesan diteruskan melalui Next.js API Route ke Discord.
- Jangan membagikan Bot Token. Gunakan token dari Discord Developer Portal dan hak akses minimum yang diperlukan.
- Jangan gunakan token akun pribadi atau self-bot.
- Bot hanya dapat mengirim ke channel yang dapat diaksesnya dan yang sesuai dengan konfigurasi.

### Batasan yang perlu diketahui
- RigForge tidak menyediakan tombol unduh file; salin output dan tempel secara manual.
- Input konversi tidak dipertahankan setelah halaman dimuat ulang; data contoh dimuat kembali.
- Riwayat pengiriman Relay hanya untuk sesi saat ini dan hilang setelah refresh.
- Relay mengirim pesan nyata ke Discord. Periksa channel dan payload sebelum menjalankan pengiriman.
- Pahami privasi browser serta perangkat yang digunakan, terutama saat berbagi komputer.

## Menjalankan secara lokal

### Prasyarat
- [Node.js 22.x](https://nodejs.org/)
- npm
- Git

### Instalasi

~~~bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm install
npm run dev
~~~

Buka [http://localhost:3000](http://localhost:3000).

### Skrip proyek

| Perintah | Fungsi |
| --- | --- |
| npm run dev | Menjalankan server pengembangan Next.js. |
| npm run lint | Memeriksa aturan ESLint. |
| npm run typecheck | Memeriksa tipe TypeScript tanpa menghasilkan output. |
| npm run test | Menjalankan unit test dengan Vitest. |
| npm run build | Membuat build produksi. |
| npm run start | Menjalankan build produksi secara lokal. |

Untuk pemeriksaan sebelum rilis, jalankan:

~~~bash
npm run lint
npm run typecheck
npm run test
npm run build
~~~

Penggunaan standar tidak memerlukan environment variable tambahan. Pengujian Relay terhadap Discord membutuhkan Bot Token valid dan channel yang dapat diakses bot.

## Struktur proyek

~~~text
src/
├── app/
│   ├── api/discord/       # API Route pemeriksaan dan pengiriman Discord
│   ├── relay/             # Halaman Relay
│   ├── globals.css        # Gaya dasar aplikasi
│   ├── layout.tsx         # Metadata, font, dan inisialisasi tema
│   └── page.tsx           # Halaman utama
├── components/            # Komponen UI dan workspace
├── hooks/                 # Hook tema dan konfigurasi Relay
├── lib/
│   ├── converter.ts       # Parsing data avatar menjadi Lua
│   ├── relay/             # Integrasi Discord dan tipe Relay
│   └── __fixtures__/      # Fixture pengujian output
└── styles/                # Token dan stylesheet halaman

docs/                      # Panduan desain, gambar, dan dokumentasi
~~~

## Deploy ke Vercel

1. Impor repository akndrn000/rigforge di [Vercel](https://vercel.com/).
2. Biarkan framework terdeteksi sebagai Next.js.
3. Pilih Node.js 22 sesuai konfigurasi proyek.
4. Deploy. Route utama dan /relay tersedia dalam deployment yang sama.

Alternatif melalui CLI:

~~~bash
npx vercel
npx vercel --prod
~~~

Setelah deployment, uji halaman utama, toggle tema, konversi avatar, clipboard, konfigurasi Relay, pemeriksaan channel, dan pengiriman pesan pada channel uji.

## Kontribusi

Pull request dan laporan bug dipersilakan. Sertakan langkah reproduksi untuk bug UI atau fungsional. Untuk perubahan parser, sertakan contoh input-output dan perbarui fixture src/lib/__fixtures__/golden.json bila hasil Lua yang diharapkan memang berubah.

## Lisensi dan merek

RigForge dirilis di bawah [MIT License](LICENSE).

RigForge adalah proyek independen dan tidak berafiliasi dengan Roblox Corporation atau Discord Inc. Roblox dan Discord merupakan merek dagang pemiliknya masing-masing.

---

<div align="center">

**RigForge** · Avatar tooling yang menjaga alur kerja tetap sederhana.

<sub>Dibangun untuk konversi yang jelas, kontrol yang praktis, dan pengalaman penggunaan yang nyaman.</sub>

</div>
