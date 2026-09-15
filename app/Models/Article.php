<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Override;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Article extends Model
{
    use HasSlug;

    public $guarded = [];

    #[Override]
    public function getSlugOptions(): SlugOptions
    {
       return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->selfHealing();
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => "/storage/{$this->listing_type}/$value",
        );
    }

    protected function video(): Attribute
    {
        return Attribute::make(
            get: fn(string | null $value) => $value ? "/storage/{$this->listing_type}/video/$value" : null,
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("Y-m-d"),
        );
    }

}
