<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminEmail = env('ADMIN_DEFAULT_EMAIL', 'admin@jainmandir.com');
        $adminPassword = env('ADMIN_DEFAULT_PASSWORD', 'admin123');

        // Prevent seeding default development passwords in production
        if (app()->isProduction() && $adminPassword === 'admin123') {
            throw new RuntimeException('SECURITY ERROR: Cannot seed default credentials ("admin123") in production. Set ADMIN_DEFAULT_PASSWORD in your environment.');
        }

        $admin = User::firstOrNew(['email' => $adminEmail]);
        $admin->name = 'Admin User';
        $admin->password = Hash::make($adminPassword);
        // Explicit trusted assignment to bypass mass-assignment guard
        $admin->is_admin = true;
        $admin->save();
    }
}
