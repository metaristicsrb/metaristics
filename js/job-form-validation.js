$(function() {
    $("#job-form").validate({
      rules: {
        name: "required",
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        cv: {
          required: true
        }
      },
      messages: {
        name: "Por favor ingrese su nombre",
        phone: "Por favor ingrese su numero telefónico",
        email: "Por favor ingrese un email válido",
        cv: "Por favor adjunté su CV"
      },
      submitHandler: function(form) {
        var formData = new FormData(form);
        var captcha = grecaptcha.getResponse();
        formData.append("PositionName", "Becario (Especialidad en Q.A)");
        formData.append("RefNumber", "0001");
        formData.append("CaptchaResponse", captcha);

        if(captcha !== '')
        {
          $("#submitButton").prop("disabled", true);
          $("#submitButton").text("Enviando mensaje...");
            $.ajax({
                type: "POST",
                url: "https://api.serveezy.com/api/email/job-application",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                enctype: 'multipart/form-data',
                success: function(response) {
                    grecaptcha.reset();
                    $('#submitSuccessMessage').removeClass("d-none");
                    $('#captchErrorMessage').addClass("d-none");
                    $("#form-container").addClass("d-none");
                    $("#submitButton").addClass("d-none");
                    $('#submitButton').addClass("d-none");
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
