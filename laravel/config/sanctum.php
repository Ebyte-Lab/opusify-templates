<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains/hosts will receive stateful API
    | authentication cookies. Typically, these should include your local
    | and production domains which access your API via a frontend SPA.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1,127.0.0.1:8000,::1')),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that Sanctum will use to
    | authenticate users. Typically, this is the "web" guard.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes after which an issued token
    | will be considered expired. If this value is null, personal access
    | tokens do not expire.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Limits
    |--------------------------------------------------------------------------
    |
    | This value controls the maximum number of active tokens a user can
    | have. If this is null, token count will be unlimited.
    |
    */

    'token_limits' => null,

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your SPA with Sanctum, you may need to customize
    | some of the middleware Sanctum uses.
    |
    */

    'middleware' => [
        'encrypt_cookies' => \Illuminate\Cookie\Middleware\EncryptCookies::class,
        'validate_csrf_token' => \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ],

];
