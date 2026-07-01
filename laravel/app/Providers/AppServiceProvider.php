<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Decouple logic by binding interface to implementation
        $this->app->bind(
            \App\Repositories\ItemRepositoryInterface::class,
            \App\Repositories\EloquentItemRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure Sanctum if needed
    }
}
