window.onload = async () => {

    let form = document.querySelector("form.form-login"); //selecciono el formulario de login

    form.addEventListener("submit", function(e){       
        
        let inputEmail = form.elements["email"]; //selecciono el input de email 
        let emailError = document.querySelector("span.errors[name='email']"); //selecciono el span donde voy a mostrar el error

        let inputPassword = form.elements["password"]; //selecciono el input de email 
        let passwordError = document.querySelector("span.errors[name='password']"); //selecciono el span donde voy a mostrar el error

        if(!validator.isEmail(inputEmail.value)){ //valido si se ingresó un valor correspondiente a un email
            emailError.innerHTML = "Validación Front: Email inválido"; //muestro el error
            e.preventDefault();
        }else{
            emailError.innerHTML = "";
        }

        if(!validator.isLength(inputPassword.value,{min: 8, max: 45})){
            passwordError.innerHTML = "Validación Front: La contraseña debe tener entre 8 y 45 caracteres"; //muestro el error
            e.preventDefault();
        }else{
            passwordError.innerHTML = "";
        }

    });
}