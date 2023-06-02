<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::table( 'posts', function ( Blueprint $table ) {
            $table->dropSoftDeletes();
// $table->dropColumn('deleted_at');
// $table->dropColumn(['content','deleted_at']);
// $table->dropTimestamps();
        } );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::table( 'posts', function ( Blueprint $table ) {
            //
        } );
    }
};
