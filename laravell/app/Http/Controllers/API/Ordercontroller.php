<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class Ordercontroller extends Controller
{
    public function index()
    {
        $order = Order::all();
        return response()->json([
            'status' => 200,
            'order' => $order
        ]);
    }

}
