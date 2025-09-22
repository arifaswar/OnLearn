Fullstack Booking & Scheduling System

Repository includes:

Backend: Node.js + Express + MongoDB (Mongoose)

Admin Dashboard: React (Create React App)

Mobile App: React Native (Expo) for Students & Teachers

Overview & Rules

Admin only uses the Admin Dashboard (web) to register/login and manage settings (set prices, view bookings, pay teachers).

Teachers & Students use the Mobile App (React Native) to register/login and interact with schedules/bookings.

Teacher creates weekly schedules (select day ranges and time ranges per day).

Pricing rules (set by admin):

90 minutes online = 35.000 IDR

90 minutes offline = 75.000 IDR

Payment flow:

Student must have wallet balance before booking.

When booking, student's wallet is charged immediately and that money goes to admin (simulate in DB).

After a teacher confirms class completion and uploads proof photo, admin releases payment to teacher: teacher receives 90% of booking amount, admin keeps 10% commission.

Location filtering for offline classes uses a city + simple distance check (coordinates).

Project Structure
booking-system/
├─ backend/
│ ├─ package.json
│ ├─ server.js
│ ├─ config/
│ │ └─ db.js
│ ├─ models/
│ │ ├─ Admin.js
│ │ ├─ Student.js
│ │ ├─ Teacher.js
│ │ ├─ Schedule.js
│ │ ├─ Booking.js
│ │ └─ Payment.js
│ ├─ routes/
│ │ ├─ auth.js
│ │ ├─ admin.js
│ │ ├─ teachers.js
│ │ ├─ students.js
│ │ ├─ schedules.js
│ │ └─ bookings.js
│ └─ middleware/
│ └─ auth.js


├─ admin-frontend/
│ ├─ package.json
│ └─ src/
│ ├─ App.js
│ ├─ api.js
│ ├─ pages/Login.js
│ ├─ pages/Dashboard.js
│ └─ components/*


└─ mobile-app/
├─ package.json (Expo)
└─ src/
├─ App.js
├─ api.js
├─ screens/Student/*
└─ screens/Teacher/*