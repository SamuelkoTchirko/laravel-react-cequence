<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Country;
use App\Models\Continent;


use Auth;


class UserController extends Controller
{
    //Store new resource in DB
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:128'],
            'surname' => ['required', 'max:128'],
            'date_of_birth' => ['required', 'date'],
            'country_id' => ['required', 'exists:countries,id'],
        ]);

        User::create($validatedData);
        
        return response(200);
    }

    //Update resource already stored in DB
    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:128'],
            'surname' => ['required', 'max:128'],
            'date_of_birth' => ['required', 'date'],
            'country_id' => ['required', 'exists:countries,id'],
        ]);

        $user->update($validatedData);
        
        return response(200);
    }

    //Delete resource from DB
    public function destroy(User $user)
    {
        $user->delete();
        
        return response(200);
    }
}
