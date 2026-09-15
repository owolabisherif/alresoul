<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Override;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Sermon extends Model
{
    use HasSlug;

    protected $guarded = [];


    #[Override]
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->selfHealing();
    }

    protected function cover(): Attribute
    {
        return Attribute::make(
            get: fn(string | null $value) => $value ? "/storage/sermons/$value" : null,
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("Y-m-d"),
        );
    }
}
