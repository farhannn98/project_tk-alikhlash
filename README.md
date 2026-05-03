# Project TK Al-Ikhlas (Fullstack)

Project ini terdiri dari dua bagian:
1. **frontend-tk**: Dibuat menggunakan Next.js
2. **backend-tk**: Dibuat menggunakan Laravel

## Cara Menjalankan
### Backend
1. `cd backend-tk`
2. `composer install`
3. `cp .env.example .env` (lalu sesuaikan DB)
4. `php artisan key:generate`
5. `php artisan migrate`
6. `php artisan serve`

### Frontend
1. `cd frontend-tk`
2. `npm install`
3. `npm run dev`
