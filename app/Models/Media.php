<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Override;

class Media extends Model
{
    use HasSlug;

    public $guarded = [];

    protected function cover(): Attribute
    {
        return Attribute::make(
            get: fn(string | null $value) => $value ? "/storage/medias/$value" : null,
        );
    }

    public function medias()
    {
        return $this->hasMany(Media::class, "parent_id");
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->format("Y-m-d"),
        );
    }

    #[Override]
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->selfHealing();
    }
}
