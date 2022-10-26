<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Country;
use App\Models\Continent;


use Auth;


class CountryController extends Controller
{
    //Get all resources with given filters from DB
    public function index(Request $request){

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $countries = Country::getWithUsersInRange($start_date, $end_date);

        return response($countries, 200);

    }
}
