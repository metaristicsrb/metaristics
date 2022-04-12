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
            $.ajax({
                type: "POST",
                url: "http://localhost:5000/api/email/job-application",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                enctype: 'multipart/form-data',
                success: function(response) {
                    grecaptcha.reset();
                    $('#submitSuccessMessage').removeClass("d-none");
                    $('#captchErrorMessage').addClass("d-none");
                    $('#jobForm').modal('hide');
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
