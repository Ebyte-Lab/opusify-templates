<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthCheckTest extends TestCase
{
    /**
     * Test that the base endpoint returns a healthy JSON response.
     */
    public function test_base_endpoint_returns_healthy_json_response(): void
    {
        $response = $this->getJson('/');

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'Healthy',
                     'framework' => 'Laravel 11.x',
                 ]);
    }

    /**
     * Test the framework built-in health check up endpoint.
     */
    public function test_up_endpoint_returns_ok(): void
    {
        $response = $this->get('/up');

        $response->assertStatus(200);
    }
}
