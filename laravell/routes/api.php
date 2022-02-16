<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\Cartcontroller;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\Frontcontroller;
use App\Http\Controllers\API\Ordercontroller;
use App\Http\Controllers\API\Productcontrol;
use App\Http\Controllers\Categorycontoller;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!

*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('getcategory', [Frontcontroller::class, 'category']);

Route::get('getproduct/{slug}', [Frontcontroller::class, 'product']);
Route::get('home', [Frontcontroller::class, 'popular']);
Route::get('detailproduct/{category_slug}/{product_slug}', [Frontcontroller::class, 'detailproduct']);

Route::post('add-to-cart', [Cartcontroller::class, 'addtocart']);
Route::get('cart', [Cartcontroller::class, 'viewcart']);
Route::get('ap', [Cartcontroller::class, 'cartt']);
Route::put('cart-updateqty/{cart_id}/{scope}', [Cartcontroller::class, 'cartqty']);
Route::delete('deletecart/{cart_id}', [Cartcontroller::class, 'deletecart']);

Route::middleware(['auth:sanctum', 'isApiAdmin'])->group ( function () {
    Route::get('/checkingauth', function () {
        return response()->json(['message' => 'your in' , 'status'=>200], 200);
    });
    //category
    Route::get('view-category', [Categorycontoller::class, 'index' ]);
    Route::post('store-category', [Categorycontoller::class, 'store' ]);
    Route::get('edit-category/{id}', [Categorycontoller::class, 'edit' ]);
    Route::put('update-category/{id}', [Categorycontoller::class, 'update' ]);
    Route::delete('delete-category/{id}', [Categorycontoller::class, 'destroy' ]);
    Route::get('all-category', [Categorycontoller::class, 'allcategory' ]);

    Route::post('orderplace', [CheckoutController::class, 'placeorder' ]);
    Route::post('validate-order', [CheckoutController::class, 'validateerror' ]);

    // orders
    Route::get('admin/orders', [Ordercontroller::class, 'index' ]);

    //product
    Route::post('store-product', [Productcontrol::class, 'store']);
    Route::get('view-product', [Productcontrol::class, 'index']);

    Route::get('edit-product/{id}', [Productcontrol::class, 'edit']);
    Route::post('update-product/{id}', [Productcontrol::class, 'update']);
});

Route::middleware(['auth:sanctum'])->group ( function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
