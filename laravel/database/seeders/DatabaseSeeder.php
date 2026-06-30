<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed standard demo user
        User::factory()->create([
            'name'  => 'Demo Developer',
            'email' => 'demo@example.com',
        ]);

        // Seed additional dummy users
        User::factory(9)->create();

        // Call resource seeders
        $this->call([
            ItemSeeder::class,
        ]);
    }
}
