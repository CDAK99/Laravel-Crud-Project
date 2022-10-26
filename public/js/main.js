$(document).ready(function () {

	$(window).keydown(function(event){
        if(event.keyCode == 13) {
        event.preventDefault();
        return false;
        }
    });

    $("#customerForm").submit(function(e){
        e.preventDefault();
    });

    fetch_customer_details();

    function fetch_customer_details(){
        $.ajax({
            url:"/retrieve_customers", type: 'get',
            data:'',
            success:function(data){
                if(data['success'] === undefined){
                    var array = $.map(data, function(value, index) {
                        return [value];
                    });

                    var tbody = $('#customerDetails tbody'),
                    props = ["customer_id", "customer_title", "customer_fname", "customer_lname"];
                    $.each(array, function(i, customer) {
                        var tr = $('<tr>');
                        $.each(props, function(i, prop) {
                            $('<td>').html(customer[prop]).appendTo(tr);  
                        });
                        $('<td>').html('<button type="button" class="editButton" id='+customer['customer_id']+'>Edit</button>').appendTo(tr); 
                        tbody.append(tr);
                    });
                }
            },
            error:function(request, status, error) {
                console.log(error);
            },
            dataType:'json'
        }).done(function(data){
        });
    }

    $('#resetButton').on("click", function(){
        $('#customerForm')[0].reset();
        disable_form_input();
        $("#customerDetails").find("input,button").attr("disabled", false);
        $('#addCustomerButton').attr('disabled', false);
        $('.error-box').empty();
    });

    $(document).on("click","#customerDetails tbody tr td button.editButton", function() {
        customerID = $(this).attr('id');

        $("#customerDetails").find("input,button").attr("disabled", true);
        $('#addCustomerButton').attr('disabled', true);

        $.ajax({
            url:"/retrieve_customer_details", type: 'post',
            data:{'_token': $('input[name=_token]').val(), "id": customerID},
            success:function(data){

                $('#customerTitle').val(data['customer_title']);

                $('#customerFname').val(data['customer_fname']);

                $('#customerLname').val(data['customer_lname']);

                $('#customerAddress').val(data['customer_address']);

                $('#customerEmail').val(data['customer_email']);

                $('#customerPhone').val(data['customer_phone']);

                $('#customerNotes').val(data['customer_notes']);

                enable_form_input();
                $('#updateButton').attr('name', data['customer_id']);
                $('#deleteButton').attr('name', data['customer_id']);

                $('#updateButton').show();
                $('#deleteButton').show();
                $('#insertButton').hide();
            },
            dataType:'json'
        }).done(function(data){
        });
    });
    
    function enable_form_input(){
        
        $('#customerTitle').attr('disabled', false);

        $('#customerFname').attr('disabled', false);

        $('#customerLname').attr('disabled', false);

        $('#customerAddress').attr('disabled', false);

        $('#customerEmail').attr('disabled', false);

        $('#customerPhone').attr('disabled', false);

        $('#customerNotes').attr('disabled', false);

        $('#addCustomerButton').attr('disabled', true);
  
    }

    $('#updateButton').on('click', function(){
        if(!validate_form_input()){
            $('#main-error').append("Form contains errors, please check your input.");
            return false;
        }

        customerID = $(this).attr('name');
        customerTitle = $('#customerTitle').val();
        customerFname = $('#customerFname').val();
        customerLname = $('#customerLname').val();
        customerAddress = $('#customerAddress').val();
        customerEmail = $('#customerEmail').val();
        customerPhone = $('#customerPhone').val();
        customerNotes = $('#customerNotes').val();

        $.ajax({
            url:"/update_customer_details", type: 'post',
            data:{'_token': $('input[name=_token]').val(), "customer_id": customerID, "customer_title": customerTitle, "customer_fname": customerFname, "customer_lname": customerLname, "customer_address": customerAddress, "customer_phone": customerPhone, "customer_email": customerEmail, "customer_notes": customerNotes},
            success:function(data){

                $('#customerForm')[0].reset();
                $("#customerDetails > tbody").html("");
                fetch_customer_details();
                disable_form_input();
                $('#addCustomerButton').attr('disabled', false);
                $(this).attr('name') == "";

            },
            error:function(){
                $('#main-error').append("Form contains errors, please check your input.");
            },
            dataType:'json'
        }).done(function(data){
        });
    });

    $('#deleteButton').on('click', function(){
        customerID = $(this).attr('name');
        if (confirm("Are you sure you want to delete this customer?")) {
            $.ajax({
                url:"/delete_customer_details", type: 'post',
                data:{'_token': $('input[name=_token]').val(), "customer_id": customerID},
                success:function(data){
    
                    $('#customerForm')[0].reset();
                    $("#customerDetails > tbody").html("");
                    fetch_customer_details();
                    disable_form_input();
                    $('#addCustomerButton').attr('disabled', false);
                    $(this).attr('name') == "";
    
                },
                error:function(request, status, error) {
                    console.log(error);
                },
                dataType:'json'
            }).done(function(data){
            });
        }
        return false;
    });

    function disable_form_input(){
        $('#customerTitle').attr('disabled', true);

        $('#customerFname').attr('disabled', true);

        $('#customerLname').attr('disabled', true);

        $('#customerAddress').attr('disabled', true);

        $('#customerEmail').attr('disabled', true);

        $('#customerPhone').attr('disabled', true);

        $('#customerNotes').attr('disabled', true);

        $('#addCustomerButton').attr('disabled', false);
  
    }

    $('#addCustomerButton').on('click', function(){
        enable_form_input();
        $("#customerDetails").find("input,button").attr("disabled", true);
        $('#updateButton').hide();
        $('#deleteButton').hide();
        $('#insertButton').show();
    });

    $('#insertButton').on('click', function(){
        if(!validate_form_input()){
            $('#main-error').append("Form contains errors, please check your input.");
            return false;
        }

        customerTitle = $('#customerTitle').val();
        customerFname = $('#customerFname').val();
        customerLname = $('#customerLname').val();
        customerAddress = $('#customerAddress').val();
        customerEmail = $('#customerEmail').val();
        customerPhone = $('#customerPhone').val();
        customerNotes = $('#customerNotes').val();

        $.ajax({
            url:"/insert_customer_details", type: 'POST',
            data:{'_token': $('input[name=_token]').val(), "customer_title": customerTitle, "customer_fname": customerFname, "customer_lname": customerLname, "customer_address": customerAddress, "customer_phone": customerPhone, "customer_email": customerEmail, "customer_notes": customerNotes},
            success:function(data){
                $('#customerForm')[0].reset();
                $("#customerDetails > tbody").html("");
                fetch_customer_details();
                disable_form_input();
                $('#insertButton').hide();
                $('#updateButton').show();

            },
            // error:function(request, status, error) {
            //     console.log(error);
            // },
            error:function(){
                $('#main-error').append("Form contains errors, please check your input.");
            },
            dataType:'json'
        }).done(function(data){
        });
    });

    function validate_form_input(){
        $('.error-box').empty();

        customerTitle = $('#customerTitle').val();
        customerFname = $('#customerFname').val();
        customerLname = $('#customerLname').val();
        customerAddress = $('#customerAddress').val();
        customerEmail = $('#customerEmail').val();
        customerPhone = $('#customerPhone').val();

        bolErrors = 0;

        if(customerTitle == ""){
            $('#customerTitle').nextAll('.error-box:first').append('Please enter a title.');
            bolErrors = 1;
        } 
        if(customerFname == ""){
            $('#customerFname').nextAll('.error-box:first').append('Please enter a first name.');
            bolErrors = 1;
        } 
        if(customerLname == ""){
            $('#customerLname').nextAll('.error-box:first').append('Please enter a last name.');
            bolErrors = 1;
        } 
        if (customerAddress == ""){
            $('#customerAddress').nextAll('.error-box:first').append('Please enter an address.');
            bolErrors = 1;
        } 
        if(validateEmail(customerEmail) == false || customerEmail == ""){
            $('#customerEmail').nextAll('.error-box:first').append('Please enter a valid email address.');
            bolErrors = 1;
        } 
        if(customerPhone == ""){
            $('#customerPhone').nextAll('.error-box:first').append('Please enter a phone number.');
            bolErrors = 1;
        }

        if(bolErrors == 0){
            return true;
        } else {
            return false;
        }
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

});
