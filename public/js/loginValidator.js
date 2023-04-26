window.onload = async () => {


    let form = document.querySelector("form");

    form.addEventListener("submit", function(e){       

        let email = form.elements["email"];
        let emailError = document.querySelector(".errors[name='email']")

        if(!validator.isEmail(email.value)){
            e.preventDefault();
            emailError.value = "Validación Front: Email inválido";
        }

    });
}