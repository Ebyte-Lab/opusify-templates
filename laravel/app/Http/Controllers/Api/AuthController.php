<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{
    /**
     * Handle user registration.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->respondWithError('Validation Error', 422, $validator->errors());
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respondWithSuccess([
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 'User registered successfully', 201);
    }

    /**
     * Handle user authentication.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->respondWithError('Validation Error', 422, $validator->errors());
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->respondWithError('Invalid email or password credentials', 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respondWithSuccess([
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 'Logged in successfully');
    }

    /**
     * Retrieve the current authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        return $this->respondWithSuccess($request->user(), 'Authenticated user profile');
    }

    /**
     * Handle user logout (revoke token).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->respondWithSuccess([], 'Token revoked successfully');
    }
}
