<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'surname',
        'date_of_birth',
        'country_id',
    ];

    public function country(){
        return $this->belongsTo(Country::class);
    }
}
