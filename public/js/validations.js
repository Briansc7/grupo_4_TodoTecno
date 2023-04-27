window.onload = async () => {
    //se obtiene que se va a validar (login, etc) desde los atributos en la inclusion del script en el html
    let view_name = document.getElementById("validations").getAttribute("validate"); 
    //se obtiene la clase del formulario que se va a validar desde los atributos en la inclusion del script en el html
    let form_name = document.getElementById("validations").getAttribute("form-name");

    let form = document.querySelector(`form.${form_name}`); //se obtiene el formulario a validar

    //prefijo para saber que estas validaciones son de frontend y no de backend. Dejar como "" en producción
    let prefijo = "Validación Front: ";     

    //todos los tipos de validaciones de todos los campos posibles
    let fieldsValidations = {
        email: {
            name: "email",
            validations: [{
                validation:(input) => validator.isLength(input.value,{min: 1}), //no existe isNotEmpty en validator js
                errorMsg: prefijo +"No ingresó ningún email"
            },
            {
                validation:(input) => validator.isEmail(input.value),
                errorMsg: prefijo + "Debe ingresar un email válido"
            },
            {
                validation:(input) => validator.isLength({max: 45}),
                errorMsg: prefijo + "El email puede tener hasta 45 caracteres"
            }            
            ]
        },
        password: 
        {
            name: "password",
            validations:[
                {
                    validation:(input) => validator.isLength(input.value,{min: 1}),
                    errorMsg: prefijo + "No ingresó ninguna contraseña"
                },
                {
                    validation:(input) => validator.isLength(input.value,{min: 8, max: 45}),
                    errorMsg: prefijo + "La contraseña debe tener entre 8 y 45 caracteres"
                }
                
            ]

        }        
        
    };

    //Para cada tipo de vista, que campos se van a validar
    //La key debe coincidir con el valor pasado por parámetro en view_name
    let formTypes = {
        login: [
            fieldsValidations.email,
            fieldsValidations.password
        ]
    }
    
    //
    form.addEventListener("submit", function(e){  
        
        //se elige con view_name el tipo de vista a validar y se itera por los campos que se van a validar
        formTypes[view_name].forEach(fieldValidation => {
            let input = document.querySelector(`input[name=${fieldValidation.name}]`);
            let error = document.querySelector(`span.errors[name=${fieldValidation.name}]`);

            //Para el campo a validar, se itera por todas las validaciones de ese campo en específico
            fieldValidation.validations.every(validation => { //every es como foreach pero se detiene al retornar false
                if(!validation.validation(input)){ //compruebo el valor ingresado con respecto a la validacion 
                    error.innerHTML = validation.errorMsg; //se muestra el error de validacion
                    e.preventDefault();
                    return false;   //ya no se comprueban las demás validaciones de este campo como se hacía con el bail()
                }else{
                    error.innerHTML = "";   //borro los errores que pueden existir de una anterior ejecución
                }
            });
        });

    });





}