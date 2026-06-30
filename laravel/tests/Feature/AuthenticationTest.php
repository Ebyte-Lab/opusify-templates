<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that accessing a protected API route without auth headers returns 401.
     */
    public function test_unauthenticated_request_is_rejected(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401);
    }

    /**
     * Test that user registration successfully saves user and returns a token.
     */
    public function test_user_can_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name'                  => 'John Developer',
            'email'                 => 'john@example.com',
            'password'              => 'secret123',
            'password_confirmation' => 'secret123',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         'user' => ['id', 'name', 'email'],
                         'access_token',
                         'token_type'
                     ],
                     'message'
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
        ]);
    }

    /**
     * Test that user can login with valid credentials.
     */
    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = User::factory()->create([
            'email'    => 'dev@example.com',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'dev@example.com',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         'user',
                         'access_token',
                         'token_type'
                     ]
                 ]);
    }

    /**
     * Test that user cannot login with incorrect password.
     */
    public function test_user_cannot_login_with_incorrect_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'dev@example.com',
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'dev@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'success' => false,
                     'message' => 'Invalid email or password credentials'
                 ]);
    }

    /**
     * Test that Sanctum actingAs token allows access to protected routes.
     */
    public function test_authenticated_user_can_access_protected_routes(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/me');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data'    => [
                         'email' => $user->email,
                     ]
                 ]);
    }
}
