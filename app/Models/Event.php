<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Override;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Event extends Model
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
            get: fn(string $value) => "/storage/events/$value",
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
            get: fn(string $value) => Carbon::parse($value)->format("h:i A"),
        );
    }
    protected function timeEnd(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("h:i A"),
        );
    }
}
