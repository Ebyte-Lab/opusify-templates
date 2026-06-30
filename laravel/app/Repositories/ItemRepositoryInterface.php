<?php

namespace App\Repositories;

use App\Models\Item;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ItemRepositoryInterface
{
    /**
     * Get all items.
     *
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Get paginated items.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find item by ID.
     *
     * @param int $id
     * @return Item|null
     */
    public function find(int $id): ?Item;

    /**
     * Create a new item.
     *
     * @param array $data
     * @return Item
     */
    public function create(array $data): Item;

    /**
     * Update an existing item.
     *
     * @param Item $item
     * @param array $data
     * @return bool
     */
    public function update(Item $item, array $data): bool;

    /**
     * Delete an item.
     *
     * @param Item $item
     * @return bool
     */
    public function delete(Item $item): bool;
}
