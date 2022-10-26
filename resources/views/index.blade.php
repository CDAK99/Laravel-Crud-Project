<!DOCTYPE html>
<html>
 <head>
    <meta charset="UTF-8" />
    <title>Customer Details Table</title>
	<link rel="stylesheet" href="{{asset('css/app.css')}}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
    <script src="{{asset('js/main.js')}}"></script>
</head>
  <body>
    <div class="container">
	  <div class="header">
		<a>Home</a>
      </div>
      <div class="content">
		<h1>Customer Details</h1></br>

        <table id="customerDetails">
			<thead><tr><th>Customer ID</th><th>Title</th><th>First Name</th><th>Last Name</th><th>Edit</th></tr></thead>
			<tbody></tbody>
		</table>

		<br/>

		<button id="resetButton" class="submitbutton">Reset</button>
		<button id="addCustomerButton" class="submitbutton">Add Customer</button>

		<form style="max-width:500px;margin:auto" id="customerForm">
			
			{{ csrf_field() }}

			<hr>
			<label for ="title"><b>Title</b></label>
			<input type="text" class = "input" name="title" id="customerTitle" maxlength="4" required disabled/>
			<div class="error-box"></div><br/>

			<label for ="first_name"><b>First Name</b></label>
			<input type="text" class = "input" name="first_name" id="customerFname" maxlength="15" required disabled/>
			<div class="error-box"></div><br/>
			
			<label for="last_name"><b>Last Name</b></label>
			<input type="text" class = "input" name="last_name" id="customerLname" maxlength="15" required disabled/>
			<div class="error-box"></div><br/>
			
			<label for="address"><b>Address</b></label>
			<input type="text" class = "input" name="address" id="customerAddress" maxlength="150" required disabled/>
			<div class="error-box"></div><br/>

			<label for="email"><b>Email Address</b></label>
			<input type="text" class = "input" name="email" id="customerEmail" maxlength="30" required disabled/>
			<div class="error-box"></div><br/>
			
            <label for="phone"><b>Phone Number</b></label>
			<input type="text" class = "input" name="phone" id="customerPhone" maxlength="11" required disabled/>
			<div class="error-box"></div><br/>
			
			<label for="notes"><b>Notes</b></label>
			<textarea style="width: 524px;" id="customerNotes" rows="4" cols="72" maxlength="300" disabled></textarea>
			<div class="error-box"></div><br/>
			<hr>
			
			<div class="error-box" id="main-error"></div>

			<button id="deleteButton" class="submitbutton delete">Delete Customer Details</button>
			<button id="updateButton" class="submitbutton">Update Customer Details</button>
			<button id="insertButton" class="submitbutton" style="display:none;">Submit Customer Details</button>
		</form>
	  </div>
	  <div class="footer">
	  </div>
	</div>
   </body>
</html>