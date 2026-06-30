<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Sanctum stateful API middleware configuration
        $middleware->statefulApi();

        $middleware->alias([
            'abilities' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability' => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Force all authentication exceptions to return JSON envelopes
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated. Please login via POST /api/login to get a Bearer token.',
            ], 401);
        });

        // Force route/model not found exceptions to return JSON envelopes
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Resource or route not found.',
            ], 404);
        });

        // Handle wrong HTTP method (e.g. GET on a POST-only route)
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException $e, $request) {
            return response()->json([
                'success'         => false,
                'message'         => 'HTTP method not allowed for this route.',
                'allowed_methods' => explode(', ', $e->getHeaders()['Allow'] ?? ''),
                'tip'             => 'Use the API Explorer at /explorer to interact with all endpoints correctly.',
            ], 405);
        });

        // Format validation exceptions as JSON envelopes
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors'  => $e->errors(),
            ], 422);
        });

        // Catch-all: any remaining HTTP exception returns a clean JSON envelope
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\HttpException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage() ?: 'An HTTP error occurred.',
                'status'  => $e->getStatusCode(),
            ], $e->getStatusCode());
        });
    })->create();
