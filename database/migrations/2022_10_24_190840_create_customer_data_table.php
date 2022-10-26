<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_data', function (Blueprint $table) {
            $table->id('customer_id');
            $table->string('customer_title', 10);
            $table->string('customer_fname', 255);
            $table->string('customer_lname', 255);
            $table->string('customer_address', 255);
            $table->string('customer_phone', 15);
            $table->string('customer_email', 255);
            $table->text('customer_notes')->nullable();
            $table->smallInteger(('bolDeleted'))->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_data');
    }
};
