<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),

            ]);
        }
        else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_as' => $request->role_as,

            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response() -> json ([
                'status'=> 200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Registered Successfull',


            ]);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|max:191",
            "password" => "required"
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);
        }else {
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                   'status' => 401,
                    'message' => 'Password or Email False '
                ]);
            }
            else 
            {
                if($user->role_as == 1 ) // 1 = ADMIN
                {
                    $role = 'admin';
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else 
                {
                    $role = '';
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
                }
                return response() -> json ([
                    'status'=> 200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'Login Successfull',
                    'role' => $role,  
    
                ]);

            }
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message'=> 'Logout succes',
        ]);
    }
}
 