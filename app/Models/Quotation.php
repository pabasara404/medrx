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
        'total' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the prescription that owns the quotation
     */
    public function prescription(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Prescription::class);
    }

    /**
     * Get the decoded items
     */
    public function getDecodedItemsAttribute()
    {
        return json_decode($this->items, true);
    }
}
