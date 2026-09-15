<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Override;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Guide extends Model
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
            get: fn(string $value) => "/storage/guides/$value",
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("Y-m-d"),
        );
    }

    protected function timeStart(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("H:i"),
        );
    }
    protected function timeEnd(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("h:i A"),
        );
    }
}
