# OnLearn

find me and I’ll teach you

sebuah aplikasi mobile yang memudahkan calon pengajar freelance menemukan calon siswanya, dan calon siswa meenemukan calon pengajarnya

## 🏗️ Arsitektur Teknologi

- **Backend API**: Node.js + Express
- **Database**: MongoDB (Schema untuk User, Jadwal, Booking, Pembayaran)
- **Auth**: JWT (role-based: admin, pengajar, siswa)
- **Frontend Web (Admin)**: React + Material UI
- **Frontend Mobile (User App)**: React Native (Expo)
- **Payment Gateway**: Midtrans / Stripe (opsional)
- **Notification**: Firebase Cloud Messaging

---

## 📌 Fitur Inti

### 🔹 **Admin Dashboard (Web)**

- Dashboard statistik (jumlah pengajar, siswa, booking, pendapatan)
- Manajemen user (CRUD pengajar & siswa)
- Manajemen kelas & jadwal
- Monitoring transaksi & laporan
- Support chat / ticketing

### 🔹 **Pengajar (Mobile)**

- Registrasi & verifikasi pengajar
- Membuat profil pengajar (foto, bio, keahlian, tarif)
- Menentukan jadwal available
- Mengelola booking masuk (approve/reject)
- Histori pendapatan & jadwal kelas

### 🔹 **Siswa (Mobile)**

- Registrasi & login
- Browsing daftar pengajar (filter by mata pelajaran, rating, harga)
- Booking jadwal belajar (real-time availability)
- Pembayaran online (wallet/transfer/card)
- Notifikasi kelas (reminder)
- Review & rating pengajar

---

## 📐 Wireframe Konsep

### 1. **Admin Dashboard (Web)**

- **Sidebar**: Dashboard | User | Jadwal | Booking | Transaksi | Laporan
- **Dashboard Page**:
    - Card statistik (Total siswa, pengajar, booking, pendapatan)
    - Grafik booking per minggu
- **User Management**:
    - Tabel user dengan role filter
    - Action: suspend, edit, detail
- **Booking Management**:
    - List semua booking
    - Status: pending, confirmed, selesai
- **Laporan Keuangan**:
    - Grafik transaksi
    - Export ke Excel/PDF

---

### 2. **Mobile App (React Native)**

**🔹 Halaman Siswa**

- **Home**: Search pengajar, kategori pelajaran
- **Detail Pengajar**: Profil, rating, jadwal tersedia, harga per sesi → tombol “Book Now”
- **Booking Flow**: Pilih slot → bayar → konfirmasi → notifikasi
- **My Classes**: List kelas yang sudah dibooking
- **Profile**: Edit profil, histori booking

**🔹 Halaman Pengajar**

- **Home**: Ringkasan (total booking hari ini, pendapatan)
- **Schedule**: Set jadwal available
- **Booking Request**: Approve/Reject booking
- **Earnings**: Grafik pendapatan
- **Profile**: Update biodata, skill, harga

---

## 🔗 Alur Integrasi

1. **Siswa** → Cari pengajar → Booking slot → Bayar → Notifikasi
2. **Pengajar** → Terima request booking → Jadwal update otomatis
3. **Admin** → Monitor semua transaksi & booking → Bisa intervensi jika ada masalah