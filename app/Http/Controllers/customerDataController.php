<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomerData as ModelsCustomerData;

class customerDataController extends Controller
{
    public function retrieveCustomers(){
		$aReturn = array(
			'success' => 0
		);

        $results = ModelsCustomerData::where('bolDeleted', 0)->get();
    
        foreach($results as $result){
            foreach($result as $key=>$value){
                $aReturn['success'] = 1;
                $aReturn[$key] = rtrim($value);
            }
        }
        
        return $results;
	}

    public function retrieveCustomerDetails(Request $request){
        $aReturn = array(
			'success' => 0
		);

        $results = ModelsCustomerData::where('customer_id', $request->id)->get()->toArray();
        
        if($results != null){
            $aReturn['success'] = 1;
            foreach($results as $result){
                foreach($result as $key=>$value){
                    $aReturn[$key] = rtrim($value);
                }
            }
        }

        return response()->json($aReturn);
    }

    public function insertCustomerDetails(Request $request){
		$aReturn = array(
			'success' => 0
		);

        $validated = $request->validate([
            'customer_title' => 'required',
            'customer_fname' => 'required', 
            'customer_lname' => 'required',
            'customer_phone' => 'required|numeric|digits:10',
            'customer_address' =>'required',
            'customer_email' => 'required|email',
        ]);

        $newCustomerData = new ModelsCustomerData;
        $newCustomerData->customer_title = $request->customer_title;
        $newCustomerData->customer_fname = $request->customer_fname;
        $newCustomerData->customer_lname = $request->customer_lname;
        $newCustomerData->customer_phone = $request->customer_phone;
        $newCustomerData->customer_address = $request->customer_address;
        $newCustomerData->customer_email = $request->customer_email;
        $newCustomerData->customer_notes = $request->customer_notes;
        $newCustomerData->save();

        $aReturn['success'] = 1;

        return $aReturn;
	}

    public function updateCustomerDetails(Request $request){
		$aReturn = array(
			'success' => 0
		);

        $validated = $request->validate([
            'customer_title' => 'required',
            'customer_fname' => 'required', 
            'customer_lname' => 'required',
            'customer_phone' => 'required|numeric|digits:10',
            'customer_address' =>'required',
            'customer_email' => 'required|email',
        ]);

        $customerData = ModelsCustomerData::find($request->customer_id);
        $customerData->customer_title = $request->customer_title;
        $customerData->customer_fname = $request->customer_fname;
        $customerData->customer_lname = $request->customer_lname;
        $customerData->customer_phone = $request->customer_phone;
        $customerData->customer_address = $request->customer_address;
        $customerData->customer_email = $request->customer_email;
        $customerData->customer_notes = $request->customer_notes;
        $customerData->save();

        $aReturn['success'] = 1;

        return $aReturn;
	}

    public function deleteCustomerDetails(Request $request){
		$aReturn = array(
			'success' => 0
		);

        $customerData = ModelsCustomerData::find($request->customer_id);
        $customerData->bolDeleted = 1;
        $customerData->save();

        $aReturn['success'] = 1;

        return $aReturn;
	}
}
