<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\QueryException;
use Tests\TestCase;

class DatabaseLayerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that user factory creates database records successfully.
     */
    public function test_user_factory_hydrates_database(): void
    {
        $user = User::factory()->create([
            'name'  => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'id'    => $user->id,
            'name'  => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);
    }

    /**
     * Test that item factory creates records with proper schema columns.
     */
    public function test_item_factory_hydrates_database(): void
    {
        $item = Item::factory()->create([
            'name'     => 'Cool Gadget',
            'sku'      => 'CG-1234',
            'price'    => 199.99,
            'quantity' => 10,
        ]);

        $this->assertDatabaseHas('items', [
            'id'       => $item->id,
            'sku'      => 'CG-1234',
            'price'    => 199.99,
            'quantity' => 10,
        ]);
    }

    /**
     * Test that item SKU uniqueness constraint is enforced.
     */
    public function test_item_sku_uniqueness_is_enforced(): void
    {
        Item::factory()->create(['sku' => 'DUPLICATE-123']);

        $this->expectException(QueryException::class);

        Item::factory()->create(['sku' => 'DUPLICATE-123']);
    }
}
