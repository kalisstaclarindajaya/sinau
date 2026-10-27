# 🎬 SINAU — Video Promosi (Web-based, 4K-ready)

Video promosi profesional untuk platform **SINAU — Siap Nambah Ilmu**, dibangun sebagai
animasi web (HTML/CSS/JS) bergaya *cinematic* dengan palet **maroon · putih · emas**.
Berjalan penuh otomatis ± **75 detik** (dalam rentang 60–90 dtk), rasio **16:9**, siap direkam ke **4K MP4**.

## ▶️ Cara menjalankan
Buka `index.html` di browser (Chrome/Edge disarankan). Video langsung diputar otomatis.

Kontrol:
- **F** — layar penuh (fullscreen)
- **Spasi** atau tombol **↻** — putar ulang dari awal

> Jika membuka langsung dari file lokal tak menampilkan font, jalankan server statis sederhana
> lalu buka alamat lokalnya, mis. `http://localhost:8000`:
> ```bash
> python3 -m http.server 8000
> ```

## 🎥 Cara ekspor menjadi file video MP4 (4K)
Karena ini animasi web, "render" dilakukan dengan **merekam layar**:

**Opsi A — Rekam layar (paling mudah)**
1. Buka `index.html`, tekan **F** untuk fullscreen (idealnya di monitor/skala 4K atau 1080p).
2. Rekam dengan OBS Studio / perekam layar bawaan, output 3840×2160, 60fps.
3. Tekan **↻** / **Spasi** untuk memutar ulang, lalu rekam durasi penuh.
4. Tambahkan voice-over (lihat `NASKAH-PRODUKSI.md`) + musik di editor (CapCut/Premiere/DaVinci).

**Opsi B — Render bersih tanpa capture manual (butuh Node + Playwright)**
Gunakan Playwright untuk merekam video halaman secara otomatis (lihat komentar di bagian bawah file ini).

## 📁 Struktur
| File | Isi |
|------|-----|
| `index.html` | Struktur 7 scene + mockup antarmuka |
| `styles.css` | Styling cinematic, palet brand, keyframe animasi |
| `promo.js` | Timeline engine, subtitle VO, partikel, count-up |
| `NASKAH-PRODUKSI.md` | Naskah VO timecoded, storyboard, brief musik, style guide |

## ⚠️ Catatan penting tentang konten
Website asli **sinauproject.vercel.app tidak dapat diakses** dari lingkungan pembuatan ini
(diblokir + sandbox tanpa internet keluar). Maka:
- Fitur, statistik, dan mockup UI di sini bersifat **ilustratif/asumsi** berbasis platform belajar mahasiswa.
- Untuk hasil setara iklan startup profesional, **ganti Scene 4 dengan rekaman layar website asli**,
  dan koreksi warna/logo/fitur agar 100% sesuai identitas SINAU.
- Kirimkan ke saya: fitur utama, tagline, screenshot/logo — akan saya sinkronkan semuanya.

---
<!--
Opsi B — contoh skrip Playwright untuk auto-record (jalankan di mesin dengan internet):
  npm i -D playwright && npx playwright install chromium
  node record.js   // record.js: buka page dgn viewport 3840x2160, context.recordVideo, tunggu 76 dtk.
-->
