<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prescription_id')->constrained()->onDelete('cascade');
            $table->json('items'); // Store quotation items as JSON
            $table->decimal('total', 10, 2); // Total amount
            $table->enum('status', ['quoted', 'accepted', 'rejected'])->default('quoted');
            $table->timestamps();

            // Index for faster queries
            $table->index(['prescription_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
