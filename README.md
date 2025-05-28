# MedRx – Medical Prescription Upload System

This is a Laravel-based system for uploading and managing medical prescriptions. It includes two user roles: **User** (uploads prescriptions) and **Pharmacy** (reviews prescriptions). The frontend is built using Inertia.js with React and styled using Tailwind CSS.

## ⏱️ Time Spent
Total development time: **8 hours**

## 🔧 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/pabasara404/medrx.git
cd medrx
```

### 2. Install dependencies
```bash
composer install
npm install
```

### 3. Environment configuration
Rename `.env.example` to `.env` and update the following:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=medrx
DB_USERNAME=root
DB_PASSWORD=1234

MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=c13f45f16fe72d
MAIL_PASSWORD=cd9bf56e0bf749
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

> ⚠️ You need to create a Mailtrap account to use the email functionality.

### 4. Create the MySQL database
Make sure you create a database named `medrx` or as specified in your `.env` file, and add database credentials in .env file.

### 5. Run migrations and seed the database
```bash
php artisan migrate:refresh --seed
```

### 6. Start development servers
```bash
npm run dev         # Starts the frontend
php artisan serve   # Starts the backend
```

## 🔑 Login Credentials

### Normal User
- Email: `testuser@example.com`
- Password: `password`

### Pharmacy User
- Email: `pharmacy@example.com`
- Password: `password`

## 🎥 Demo Video
A demonstration of the application is available at the following link:  
[Watch Demo](https://drive.google.com/file/d/18kzXBF3Qy1X2VVbNMfQes5iu5jww7wT5/view?usp=sharing)

## 📁 Repository
GitHub Repository: [https://github.com/pabasara404/medrx](https://github.com/pabasara404/medrx)
