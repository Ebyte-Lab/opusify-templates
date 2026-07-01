<?php

namespace App\Services;

use App\Repositories\ItemRepositoryInterface;
use App\Models\Item;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class ItemService
{
    protected ItemRepositoryInterface $itemRepository;

    /**
     * Inject Repository Dependency.
     */
    public function __construct(ItemRepositoryInterface $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    /**
     * Retrieve all items.
     */
    public function getAllItems(): Collection
    {
        return $this->itemRepository->all();
    }

    /**
     * Retrieve paginated items.
     */
    public function getPaginatedItems(int $perPage = 15): LengthAwarePaginator
    {
        return $this->itemRepository->paginate($perPage);
    }

    /**
     * Retrieve single item.
     */
    public function getItemById(int $id): ?Item
    {
        return $this->itemRepository->find($id);
    }

    /**
     * Create item with business orchestration/logging.
     */
    public function createItem(array $data): Item
    {
        Log::info('Creating a new transactional item log', [
            'name' => $data['name'] ?? null,
            'sku' => $data['sku'] ?? null
        ]);

        return $this->itemRepository->create($data);
    }

    /**
     * Update item.
     */
    public function updateItem(Item $item, array $data): Item
    {
        Log::info("Updating transactional item ID: {$item->id}");
        $this->itemRepository->update($item, $data);
        return $item->fresh();
    }

    /**
     * Delete item.
     */
    public function deleteItem(Item $item): bool
    {
        Log::info("Deleting transactional item ID: {$item->id}");
        return $this->itemRepository->delete($item);
    }
}
