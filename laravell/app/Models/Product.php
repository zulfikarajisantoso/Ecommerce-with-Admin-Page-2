<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'category_id',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'name',
        'slug',
        'description',
        'brand',
        'selling_price',
        'original_price',
        'qty',
        'image',
        'featured',
        'popular',
        'status',
    ];

    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id','id');
    }
}
  