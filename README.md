<div align="center">

<img src="docs/images/banner.svg" alt="RigForge — konverter avatar Roblox ke Lua" width="100%">

<p><strong>Konverter data avatar Roblox menjadi struktur Lua, langsung di browser.</strong><br>
<sub>Termasuk workspace Relay untuk konfigurasi bot dan pengiriman pesan Discord.</sub></p>

<p>
  <a href="https://rigforge-mocha.vercel.app/"><img src="https://img.shields.io/badge/BUKA_RIGFORGE-4C8DFF?style=for-the-badge&labelColor=0B1220" alt="Buka RigForge"></a>
  <a href="https://rigforge-mocha.vercel.app/relay"><img src="https://img.shields.io/badge/BUKA_RELAY-4AD7E9?style=for-the-badge&labelColor=0B1220" alt="Buka Relay"></a>
  <a href="README.en.md"><img src="https://img.shields.io/badge/DOKUMENTASI-English-9AB8FF?style=for-the-badge&labelColor=0B1220" alt="Documentation in English"></a>
</p>

<p>
  <a href="https://github.com/akndrn000/rigforge/actions/workflows/verify.yml"><img src="https://github.com/akndrn000/rigforge/actions/workflows/verify.yml/badge.svg?branch=main" alt="CI status"></a>
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white" alt="Node.js 22">
  <img src="https://img.shields.io/badge/Next.js-16-111827?logo=nextdotjs" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-087EA4?logo=react" alt="React 19">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-4AD7B1?labelColor=0B1220" alt="MIT License"></a>
</p>

</div>

---

## Daftar isi

- [Gambaran proyek](#gambaran-proyek)
- [Workspace](#workspace)
- [Fitur utama](#fitur-utama)
- [Cara menggunakan](#cara-menggunakan)
- [Format input](#format-input)
- [Privasi dan keamanan](#privasi-dan-keamanan)
- [Menjalankan secara lokal](#menjalankan-secara-lokal)
- [Struktur proyek](#struktur-proyek)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Gambaran proyek

**RigForge** adalah aplikasi web independen untuk mengubah data mentah avatar Roblox menjadi struktur Lua yang dapat ditinjau dan disalin ke Roblox Studio. Konversi avatar berjalan di browser dan tidak membutuhkan akun.

Repositori ini juga menyediakan **Relay**, workspace terpisah untuk menyimpan konfigurasi bot di browser, memeriksa akses channel, dan mengirim pesan melalui Discord Bot API.

## Workspace

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>RigForge / Avatar → Lua</h3>
      <p>Konversi token avatar dan data <code>AccessoryBlob</code> menjadi output Lua terstruktur.</p>
      <ul>
        <li>Konversi otomatis dan Generate Paksa</li>
        <li>Template slot untuk pakaian dan aksesori</li>
        <li>Contoh data, reset, dan salin kode</li>
        <li>Pemrosesan lokal di browser</li>
      </ul>
      <a href="https://rigforge-mocha.vercel.app/">Buka RigForge ↗</a>
    </td>
    <td width="50%" valign="top">
      <h3>Relay / Discord</h3>
      <p>Workspace untuk menyiapkan Bot Token, memilih channel tujuan, dan mengirim pesan.</p>
      <ul>
        <li>Hingga 10 slot Channel ID</li>
        <li>Tes akses sebelum mengirim</li>
        <li>Pesan terpisah dan opsi code block</li>
        <li>Status pengiriman dan riwayat sesi</li>
      </ul>
      <a href="https://rigforge-mocha.vercel.app/relay">Buka Relay ↗</a>
    </td>
  </tr>
</table>

## Fitur utama

### Konverter avatar

- **Dua bentuk input:** token teks seperti `Head: 12345` dan JSON setelah penanda `AccessoryBlob Data:`.
- **Output konsisten:** ID dikelompokkan ke bagian tubuh, pakaian klasik, layered clothing, dan aksesori.
- **Slot otomatis:** slot minimum tetap tersedia; slot kosong menggunakan `AssetId = 0`; ID tambahan memperluas kelompok.
- **Penanganan duplikat:** ID berulang dalam kelompok yang sama hanya ditulis satu kali.
- **Alur kerja cepat:** muat contoh, reset, generate ulang, dan salin output Lua.
- **Tema terang/gelap** dan layout responsif untuk desktop maupun perangkat mobile.

### Relay

- Menyimpan konfigurasi di `localStorage` browser dan mendukung hingga 10 slot channel.
- Memvalidasi akses channel melalui Discord Bot API sebelum mengirim.
- Mengirim token/baris yang dipisahkan spasi sebagai pesan terpisah, dengan opsi code block.
- Menangani respons rate limit `429` dengan jeda dan percobaan ulang terbatas.
- Menampilkan feedback serta riwayat ringkas untuk sesi aktif.

## Cara menggunakan

### RigForge

1. Buka [RigForge](https://rigforge-mocha.vercel.app/).
2. Tempel data avatar pada panel **Data mentah**, atau pilih **Contoh Data**.
3. Hasil pada panel **Hasil Lua** diperbarui otomatis. Gunakan **Generate Paksa** untuk menjalankan konversi segera.
4. Periksa output, lalu pilih **Salin Kode**.
5. Tempel dan uji script di Roblox Studio sebelum digunakan.

### Relay

1. Buka [Relay](https://rigforge-mocha.vercel.app/relay).
2. Tempel Bot Token dari Discord Developer Portal.
3. Atur label dan Channel ID, lalu pilih slot aktif.
4. Jalankan tes koneksi dan akses channel.
5. Tulis pesan, periksa tujuan, kemudian kirim.

> Relay dapat mengirim pesan nyata. Uji terlebih dahulu pada channel yang aman dan pastikan bot memiliki izin yang sesuai.

## Format input

Parser membaca seluruh teks tanpa membedakan huruf besar/kecil. Contoh:

```text
Head: 12345
Torso: 23456
Pants: 34567
HairAccessory: 45678, 56789
Body Color: 242,215,205 (#F2D7CD)
```

| Kelompok | Contoh token |
| --- | --- |
| Bagian tubuh | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` |
| Pakaian klasik | `Pants`, `Shirt`, `TShirt` |
| Warna kulit | `Body Color` dengan nilai RGB atau hex |
| Aksesori | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` |
| Data JSON | `AccessoryBlob Data:` diikuti array JSON |

`DynamicHead` menggantikan nilai `Head` jika tersedia. Slot minimum didefinisikan di `LAYERED_GROUPS` dan `ACCESSORY_GROUPS` pada `src/lib/converter.ts`. ID berlebih menambah baris; jenis aksesori yang tidak ada dalam template memperoleh kelompok baru.

## Privasi dan keamanan

- **RigForge:** input avatar diproses di browser dan tidak dikirim ke server konversi RigForge.
- **Relay:** konfigurasi bot disimpan di `localStorage` browser. Pemeriksaan channel dan pengiriman pesan diteruskan melalui Next.js API Route ke Discord.
- Jaga kerahasiaan Bot Token. Jangan menaruh token pada issue, screenshot publik, atau pesan yang dibagikan.
- Gunakan Bot Token resmi dari Discord Developer Portal; token akun pribadi/self-bot tidak didukung.
- Data hasil konversi perlu diperiksa dan diuji di Roblox Studio sebelum dipakai.

Bila menggunakan perangkat bersama, keluar dari sesi dan hapus data situs setelah selesai agar konfigurasi yang tersimpan di browser tidak tertinggal.

## Menjalankan secara lokal

**Persyaratan:** Node.js 22.x, npm, dan Git.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Perintah pengembangan

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan. |
| `npm run lint` | Menjalankan ESLint. |
| `npm run typecheck` | Memeriksa tipe TypeScript. |
| `npm run test` | Menjalankan unit test dengan Vitest. |
| `npm run build` | Membuat build produksi. |
| `npm run start` | Menjalankan build produksi secara lokal. |

Pemeriksaan sebelum rilis:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Alur penggunaan standar tidak memerlukan environment variable tambahan. Pengujian pengiriman Relay membutuhkan Bot Token valid dan channel Discord yang dapat diakses bot.

## Struktur proyek

```text
src/
├── app/                 # Halaman dan API Routes Next.js
├── components/          # Komponen UI RigForge dan Relay
├── hooks/               # Tema dan konfigurasi Relay
├── lib/
│   ├── converter.ts     # Parser avatar dan generator Lua
│   ├── relay/           # Integrasi Discord dan tipe data
│   └── __fixtures__/    # Fixture pengujian konverter
└── styles/              # Token dan stylesheet antarmuka
docs/                    # Panduan, diagram, dan aset dokumentasi
```

## Deployment

### Vercel

1. Impor repository `akndrn000/rigforge` di [Vercel](https://vercel.com/).
2. Pastikan framework terdeteksi sebagai Next.js dan gunakan Node.js 22.x.
3. Deploy. Halaman RigForge dan Relay tersedia dalam satu deployment.

Deployment produksi melalui CLI:

```bash
npx vercel --prod
```

Setelah deploy, uji konversi, salin kode, pilihan tema, konfigurasi Relay, tes channel, dan pengiriman ke channel percobaan.

## Kontribusi

Issue dan pull request dipersilakan. Sertakan langkah reproduksi yang jelas untuk bug. Untuk perubahan parser atau generator, tambahkan contoh input/output dan perbarui fixture `src/lib/__fixtures__/golden.json` jika output yang diharapkan berubah.

## Lisensi

RigForge dirilis di bawah [MIT License](LICENSE). RigForge adalah proyek independen dan tidak berafiliasi dengan Roblox Corporation atau Discord Inc. Roblox dan Discord merupakan merek dagang pemilik masing-masing.

---

<div align="center">
  <sub>Dibangun agar konversi avatar dan pengelolaan pesan tetap jelas, terstruktur, dan praktis.</sub>
</div>
