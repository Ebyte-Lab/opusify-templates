<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'        => fake()->words(3, true),
            'sku'         => strtoupper(Str::random(3)) . '-' . fake()->unique()->numberBetween(1000, 9999),
            'description' => fake()->sentence(),
            'price'       => fake()->randomFloat(2, 5, 500),
            'quantity'    => fake()->numberBetween(1, 100),
        ];
    }
}
