<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'name',
    ];

    public function users(){
        return $this->hasMany(User::class);
    }

    public static function getWithUsersInRange($start_date, $end_date){
        $countries = [];

        if($end_date){
            $countries = static::with(['users' => function($query) use ($start_date, $end_date) {
                $query->select('users.*')->whereBetween('date_of_birth', [$start_date, $end_date]);
            }])->groupBy('id')->get();
        }else{
            $countries = static::with(['users' => function($query) use ($start_date) {
                $query->select('users.*')->where('date_of_birth', '>=', $start_date);
            }])->groupBy('id')->get();
        }

        return $countries;
    }
}
