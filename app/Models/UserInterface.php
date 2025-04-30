<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;

class UserInterface extends Model
{
    use HasFactory;

    protected $table = 'userinterface';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'text',
        'description',
        'image',
        'page',
        'layout',
        'urutan',
        'position',
        'status',
    ];

    protected $casts = [
        'description' => 'array',
        'status' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = strtoupper(Str::random(16));
            }
        });

        static::deleted(function ($model) {
            if ($model->image) {
                Storage::disk('public')->delete($model->image);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('image')) {
                $originalImage = $model->getOriginal('image');
                if ($originalImage) {
                    Storage::disk('public')->delete($originalImage);
                }
            }
        });
    }

    public static function handleImageUpload($file)
    {
        try {
            $randomCode = str_pad(mt_rand(1, max: 99999), 5, '0', STR_PAD_LEFT);
            $filename = 'Lazer_Shope_' . $randomCode . '.webp';
            $path = 'user-interface/' . $filename;

            $manager = new ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
            $image = $manager->read($file->getRealPath());

            Storage::disk('public')->put(
                $path,
                (string) $image->toWebp(quality: 90)
            );

            return $path;
        } catch (\Exception $e) {
            logger()->error('Image upload failed: ' . $e->getMessage());
            throw new \Exception('Gagal mengupload gambar: ' . $e->getMessage());
        }
    }

    public function getRouteKeyName()
    {
        return 'id';
    }
}