<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Normal user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'address' => '123 Main St, City',
            'contact_no' => '0123456789',
            'dob' => '1990-01-01',
            'role' => 'user',
            'password' => Hash::make('password'),  // always hash password
            'remember_token' => Str::random(10),
        ]);

        // Pharmacy user
        User::factory()->create([
            'name' => 'Pharmacy User',
            'email' => 'pharmacy@example.com',
            'address' => '456 Pharmacy Rd, City',
            'contact_no' => '0987654321',
            'dob' => '1985-05-15',
            'role' => 'pharmacy',
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
    }
}
