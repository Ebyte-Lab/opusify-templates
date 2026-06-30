<?php

namespace App\Http\Controllers\Api;

use App\Services\ItemService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends ApiController
{
    protected ItemService $itemService;

    /**
     * Inject ItemService.
     */
    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    /**
     * Display a listing of items.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 15);
        $paginatedItems = $this->itemService->getPaginatedItems((int) $perPage);

        return $this->respondWithPagination($paginatedItems, 'Items list retrieved successfully');
    }

    /**
     * Store a newly created item.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'sku'         => 'required|string|unique:items,sku|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'quantity'    => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return $this->respondWithError('Validation Error', 422, $validator->errors());
        }

        $item = $this->itemService->createItem($request->all());

        return $this->respondWithSuccess($item, 'Item created successfully', 201);
    }

    /**
     * Display the specified item.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $item = $this->itemService->getItemById($id);

        if (!$item) {
            return $this->respondWithError('Item not found', 404);
        }

        return $this->respondWithSuccess($item, 'Item detail retrieved successfully');
    }

    /**
     * Update the specified item.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $item = $this->itemService->getItemById($id);

        if (!$item) {
            return $this->respondWithError('Item not found', 404);
        }

        $validator = Validator::make($request->all(), [
            'name'        => 'sometimes|required|string|max:255',
            'sku'         => 'sometimes|required|string|max:100|unique:items,sku,' . $item->id,
            'description' => 'nullable|string',
            'price'       => 'sometimes|required|numeric|min:0',
            'quantity'    => 'sometimes|required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return $this->respondWithError('Validation Error', 422, $validator->errors());
        }

        $updatedItem = $this->itemService->updateItem($item, $request->all());

        return $this->respondWithSuccess($updatedItem, 'Item updated successfully');
    }

    /**
     * Remove the specified item.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $item = $this->itemService->getItemById($id);

        if (!$item) {
            return $this->respondWithError('Item not found', 404);
        }

        $this->itemService->deleteItem($item);

        return $this->respondWithSuccess([], 'Item deleted successfully');
    }
}
