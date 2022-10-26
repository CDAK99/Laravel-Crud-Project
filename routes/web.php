<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\customerDataController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/retrieve_customers', [customerDataController::class, 'retrieveCustomers']);

Route::post('/retrieve_customer_details', [customerDataController::class, 'retrieveCustomerDetails']);

Route::post('/insert_customer_details', [customerDataController::class, 'insertCustomerDetails']);

Route::post('/update_customer_details', [customerDataController::class, 'updateCustomerDetails']);

Route::post('/delete_customer_details', [customerDataController::class, 'deleteCustomerDetails']);