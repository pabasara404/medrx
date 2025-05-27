<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\QuotationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Prescription routes
    Route::resource('prescriptions', PrescriptionController::class);

    // Quotation routes
    Route::get('/quotations', [QuotationController::class, 'index'])->name('quotations.index');
    Route::post('/quotations/{prescription}', [QuotationController::class, 'store'])->name('quotations.store');
    Route::get('/quotations/{quotation}', [QuotationController::class, 'show'])->name('quotations.show');

    // Quotation response routes (for users to accept/reject)
    Route::post('/quotations/{quotation}/respond', [QuotationController::class, 'respond'])->name('quotations.respond');
});

require __DIR__.'/auth.php';
