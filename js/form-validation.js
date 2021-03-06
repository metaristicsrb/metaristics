$(function() {
    $("#contactForm").validate({
      rules: {
        name: "required",
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        }
      },
      messages: {
        name: "Por favor ingrese su nombre",
        message: "Por favor ingrese un mensaje",
        email: "Por favor ingrese un email válido"
      },
      submitHandler: function(form) {
        var contact = new Object();
        contact.Name = $("#name").val();
        contact.Email = $("#email").val();
        contact.Phone = $("#phone").val();
        contact.Message = $("#message").val();
        contact.CaptchaResponse = grecaptcha.getResponse();

        if(contact.CaptchaResponse !== '')
        {
            $("#submitButton").prop("disabled", true);
            $("#submitButton").text("Enviando mensaje...");
            $.ajax({
                type: "POST",
                url: "https://api.serveezy.com/api/email/contact",
                data: JSON.stringify(contact),
                contentType: "application/json; charset=utf-8",  
                dataType: "json",  
                success: function(response) {
                    grecaptcha.reset();
                    $('#submitSuccessMessage').removeClass("d-none");
                    $('#captchErrorMessage').addClass("d-none");
                    $("#form-container").addClass("d-none");
                    $("#submitButton").addClass("d-none");
                },
                error : function(request, status, error) {
                    $('#submitErrorMessage').removeClass("d-none");
                }
            })
        } else {
            $('#captchErrorMessage').removeClass("d-none");
        }
      }
    });
  });
