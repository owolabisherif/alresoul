<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Override;

class Playlist extends Model
{
    use HasSlug;

    public $guarded = [];

    public function medias() {
        return $this->hasMany(Media::class, "playlist_id");
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
