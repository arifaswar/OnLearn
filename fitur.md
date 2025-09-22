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


🏗️ Alur Project OnLearn
1. 🔙 Backend (Node.js + Express + MongoDB)
Auth & User

Registrasi (POST /api/auth/register)
Input: name, email, password, role (student/teacher)
Proses: Simpan ke MongoDB (hash password pakai bcrypt).
Output: JWT token + data user.

Login (POST /api/auth/login)
Input: email, password
Proses: Verifikasi user & password.
Output: JWT token + role.

Get Profile (GET /api/users/me)
Proses: Verifikasi JWT → return data user.

Booking & Jadwal

Buat Jadwal Pengajar (POST /api/schedules)
Input: teacherId, availableSlots[]
Proses: Simpan jadwal di DB.

Cari Pengajar (GET /api/teachers?subject=math&price<100000)
Proses: Query dari MongoDB.
Output: daftar pengajar dengan filter.

Booking Kelas (POST /api/bookings)
Input: studentId, teacherId, scheduleId, paymentInfo
Proses: Buat booking, update slot jadi occupied.

Konfirmasi Booking (PUT /api/bookings/:id/confirm) (oleh pengajar)
Proses: update status booking → confirmed.

Transaksi

Create Payment (POST /api/payments)
Proses: Integrasi Midtrans/Stripe, simpan transaksi di DB.

Get Transactions (GET /api/payments/:userId)
Output: histori transaksi user.

Admin

Dashboard Data (GET /api/admin/stats)
Output: jumlah user, booking, pendapatan.

Manage User (PUT/DELETE /api/admin/users/:id)
Action: suspend, delete user.

Report Keuangan (GET /api/admin/reports)
Output: data transaksi + export CSV.

2. 🌐 Frontend Web (Admin – React + Material UI)

Login Admin → form login → call POST /api/auth/login.

Dashboard → tampilkan statistik (API: /api/admin/stats).

User Management → tabel user → fetch /api/admin/users.

Booking Management → tabel booking → fetch /api/bookings.

Transaction Reports → grafik + export (API: /api/admin/reports).

Suspend/Edit User → call PUT /api/admin/users/:id.

3. 📱 Frontend Mobile (User – React Native + Expo)
🔹 Untuk Siswa

Registrasi & Login → form UI → call POST /api/auth/register & POST /api/auth/login.

Home → fetch list pengajar dari /api/teachers.

Detail Pengajar → fetch detail + jadwal dari /api/schedules/:teacherId.

Booking Flow → pilih slot → call POST /api/bookings.

Pembayaran → integrasi Midtrans/Stripe → call POST /api/payments.

My Classes → fetch /api/bookings?studentId=me.

Profile → call /api/users/me.

🔹 Untuk Pengajar

Registrasi/Login → sama dengan siswa tapi role = teacher.

Schedule → buat jadwal dengan POST /api/schedules.

Booking Request → fetch /api/bookings?teacherId=me.

Confirm/Reject Booking → call PUT /api/bookings/:id/confirm.

Earnings → fetch /api/payments?teacherId=me.

Profile → edit profil dengan PUT /api/users/:id.

4. 🔗 Alur Integrasi Lengkap

Siswa Registrasi

Backend: POST /api/auth/register → simpan user role=student

Frontend Mobile: UI form registrasi

Pengajar Registrasi

Backend: POST /api/auth/register → simpan user role=teacher

Frontend Mobile: UI form registrasi pengajar + upload bio, skill

Admin Monitoring

Backend: GET /api/admin/stats

Frontend Web: Tampilkan dashboard

Booking Flow

Siswa pilih pengajar → API /api/teachers

Pilih jadwal → API /api/schedules

Booking → API POST /api/bookings

Bayar → API POST /api/payments

Pengajar confirm → API PUT /api/bookings/:id/confirm

Notifikasi dikirim via FCM

⚡ Jadi flow project jelas:

Backend = REST API (Node.js + Express + MongoDB)

Frontend Web (Admin) = manajemen data

Frontend Mobile (User) = pengajar & siswa interaksi