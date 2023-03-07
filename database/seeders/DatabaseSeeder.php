<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        $this->call(Question_tagSeeder::class);
        $this->call(Question_levelSeeder::class);
        $this->call(Good4questionSeeder::class);
        $this->call(Good4commentSeeder::class);
        $this->call(Later_flagSeeder::class);
        $this->call(Complete_flagSeeder::class);
    }
}
