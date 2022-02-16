<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class Cartcontroller extends Controller
{
    public function addtocart(Request $request)
    {   
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
            
            $productCheck = Product::where('id', $product_id )->first();
            if($productCheck)
            {
                if(Cart::Where('product_id', $product_id)->where('user_id', $user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>  $productCheck->name.  'Already Add to Cart'
                    ]);
                }
                else {
                    $cartitem = new Cart;
                    $cartitem->user_id = $user_id;
                    $cartitem->product_id = $product_id;
                    $cartitem->product_qty = $product_qty;
                    $cartitem->save();

                    return response()->json([
                        'status'=>201,
                        'message'=> 'Added to Cart'
                    ]);
                }
                
            }
            else {
                return response()->json([
                    'status'=>404,
                    'message'=> 'Product Not Found'
                ]);  
            }          
        }
        else {
            return response()->json([
                'status'=>401,
                'message'=> 'Login to Add to Cart'
            ]);
        }
    }

    public function viewcart()
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status'=> 200,
                'carrt'=> $cartitems
            ]);
        }   
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to View Cart data'
            ]);
        }
    }

    public function cartqty($cart_id, $scope)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('id', $cart_id)->where('user_id',  $user_id)->first();
            if($scope == "inc"){
                $cartitems->product_qty += 1;
            }else if($scope == "dec") {
                $cartitems->product_qty -= 1;
            }
            $cartitems->update();
            return response()->json([
                'status'=>200,
                'message'=> 'Quantity Updated' 
            ]);
        }   
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to Continue'
            ]);
        }
    }

    public function deletecart ($cart_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('id', $cart_id)->where('user_id',  $user_id)->first();
            if( $cartitems)
            {
                $cartitems->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cart success remove'
                ]);
            }
            else 
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Cart not Found'
                ]);
            }
        }
        else {
            return response()-> json([
                'status'=> 401,
                'message' => "Login to continue"
            ]);
        }
    }
}
