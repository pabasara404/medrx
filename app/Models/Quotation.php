<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    /** @use HasFactory<\Database\Factories\QuotationFactory> */
    use HasFactory;

    protected $fillable = [
        'prescription_id',
        'items',
        'total',
        'status',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }
}
