<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class ApiController extends Controller
{
    /**
     * Standard success JSON envelope response.
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @param array $meta
     * @return JsonResponse
     */
    protected function respondWithSuccess(mixed $data = [], string $message = '', int $statusCode = 200, array $meta = []): JsonResponse
    {
        $envelope = [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];

        if (!empty($meta)) {
            $envelope['meta'] = $meta;
        }

        return response()->json($envelope, $statusCode);
    }

    /**
     * Standard error JSON response.
     *
     * @param string $message
     * @param int $statusCode
     * @param mixed|null $errors
     * @return JsonResponse
     */
    protected function respondWithError(string $message = 'An error occurred', int $statusCode = 400, mixed $errors = null): JsonResponse
    {
        $envelope = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $envelope['errors'] = $errors;
        }

        return response()->json($envelope, $statusCode);
    }

    /**
     * Standard Response for Paginated Collections.
     *
     * @param LengthAwarePaginator $paginator
     * @param string $message
     * @return JsonResponse
     */
    protected function respondWithPagination(LengthAwarePaginator $paginator, string $message = ''): JsonResponse
    {
        return $this->respondWithSuccess(
            data: $paginator->items(),
            message: $message,
            statusCode: 200,
            meta: [
                'pagination' => [
                    'total'        => $paginator->total(),
                    'count'        => $paginator->count(),
                    'per_page'     => $paginator->perPage(),
                    'current_page' => $paginator->currentPage(),
                    'total_pages'  => $paginator->lastPage(),
                ]
            ]
        );
    }
}
