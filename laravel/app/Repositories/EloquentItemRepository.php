<?php

namespace App\Repositories;

use App\Models\Item;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentItemRepository implements ItemRepositoryInterface
{
    /**
     * Get all items.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return Item::all();
    }

    /**
     * Get paginated items.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Item::latest()->paginate($perPage);
    }

    /**
     * Find item by ID.
     *
     * @param int $id
     * @return Item|null
     */
    public function find(int $id): ?Item
    {
        return Item::find($id);
    }

    /**
     * Create a new item.
     *
     * @param array $data
     * @return Item
     */
    public function create(array $data): Item
    {
        return Item::create($data);
    }

    /**
     * Update an existing item.
     *
     * @param Item $item
     * @param array $data
     * @return bool
     */
    public function update(Item $item, array $data): bool
    {
        return $item->update($data);
    }

    /**
     * Delete an item.
     *
     * @param Item $item
     * @return bool
     */
    public function delete(Item $item): bool
    {
        return $item->delete();
    }
}
