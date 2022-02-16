<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\FuncCall;

class Productcontrol extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'qty' => 'required|max:4',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:4048',

        ]);
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        else {
            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_description = $request->input('meta_description');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');

            if($request -> hasFile('image'))
            {
                $file= $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/'.$filename;
            }

            $product->qty = $request->input('qty');
            $product->brand = $request->input('brand');
            $product->featured = $request->input(' featured') == true ? '1': '0' ;
            $product->popular = $request->input('popular')  == true ? '1': '0' ;
            $product->status = $request->input('status')  == true ? '1': '0' ;
            $product->save();
            
            return response()->json([
                'status' => 200,
                'message' => 'Product Add Success',
            ]);
        
        }
    }

    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status'=> 200,
            'products'=>$products
        ]);
    }   

    public function edit($id)
    {
        $product = Product::find($id);
        if($product)
        {

            return response() -> json([
                'status' => 200,
                'product' => $product
            ]);

        } else {
            return response() -> json([
                'status' => 404,
                'message' => 'No Product Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'qty' => 'required|max:4',
           

        ]);
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        else {
            $product = Product::find($id) ;
            if($product)
            {
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_description = $request->input('meta_description');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');

            if($request->hasFile('image'))
            {
                $path = $product->image;
                if(File::exists ($path))
                {
                    File::delete($path); 
                }
                $file= $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/'.$filename;
            }

            $product->qty = $request->input('qty');
            $product->brand = $request->input('brand');
            $product->featured = $request->input('featured') ;
            $product->popular = $request->input('popular')  ;
            $product->status = $request->input('status')  ;
            $product->update();
            
            return response()->json([
                'status' => 200,
                'message' => 'Product Update Success',
            ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found',
                ]);    
            }
        } 
    }

   
}
