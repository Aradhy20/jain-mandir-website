<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    protected $fillable = ['title', 'content', 'news_date', 'image_url'];
}
