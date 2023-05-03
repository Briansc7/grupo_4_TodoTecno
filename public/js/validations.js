window.addEventListener("load", async () => {
    //se obtiene que se va a validar (login, etc) desde los atributos en la inclusion del script en el html
    let view_name = document.getElementById("validations").getAttribute("view_name"); 
    //se obtiene la clase del formulario que se va a validar desde los atributos en la inclusion del script en el html
    let form_name = document.getElementById("validations").getAttribute("form_name");

    let form = document.querySelector(`form.${form_name}`); //se obtiene el formulario a validar

    //prefijo para saber que estas validaciones son de frontend y no de backend. Dejar como "" en producción
    //let prefijo = "Validación Front: ";
    let prefijo = "";     

    //todos los tipos de validaciones de todos los campos posibles
    let optional = (input) =>  validator.isLength(input.value,{max: 0}); //como es opcional, no realizo la validacion si el campo está vacío

    let fieldsValidations = {
        /* Validaciones de usuario para registro, login y crud de usuarios*/
        email: {
            name: "email",
            validations: [
                {
                    validation:(input) => input?true:false, //no existe isNotEmpty en validator js
                    errorMsg: prefijo +"No ingresó ningún email"
                },
                {
                    validation:(input) => validator.isEmail(input.value),
                    errorMsg: prefijo + "Debe ingresar un email válido"
                },
                {
                    validation:(input) => validator.isLength(input.value, {max: 45}),
                    errorMsg: prefijo + "El email puede tener hasta 45 caracteres"
                }            
            ]
        },
        password: 
        {
            name: "password",
            validations:[
                {
                    validation:(input) => input?true:false,
                    errorMsg: prefijo + "No ingresó ninguna contraseña"
                },
                {
                    validation:(input) => validator.isLength(input.value,{min: 8, max: 45}),
                    errorMsg: prefijo + "La contraseña debe tener entre 8 y 45 caracteres"
                }
                
            ]//TODO: validacion de passwordRepeat

        },
        passwordOptional: 
        {
            name: "password",
            validations:[
                {
                    validation:(input) => optional(input) || validator.isLength(input.value,{min: 8, max: 45}),
                    errorMsg: prefijo + "La contraseña debe tener entre 8 y 45 caracteres"
                }
                
            ]//TODO: validacion de passwordRepeat

        },
        firstName:
        {
            name: "firstName",
            validations: [
                {
                    validation:(input) => input?true:false,
                    errorMsg: prefijo + "No ingresó ningún nombre"
                },
                {
                    validation:(input) => validator.isAlpha(input.value,'es-ES', {ignore: ' '}),
                    errorMsg: prefijo + "El nombre no puede tener números ni caracteres especiales"
                },
                {
                    validation:(input) => validator.isLength(input.value,{min: 2, max: 45}),
                    errorMsg: prefijo + "El nombre debe tener entre 2 y 45 caracteres"
                }
            ]
        },
        lastName:
        {
            name: "lastName",
            validations: [
                {
                    validation:(input) => input?true:false,
                    errorMsg: prefijo + "No ingresó ningún apellido"
                },
                {
                    validation:(input) => validator.isAlpha(input.value,'es-ES', {ignore: ' '}),
                    errorMsg: prefijo + "El apellido no puede tener números ni caracteres especiales"
                },
                {
                    validation:(input) => validator.isLength(input.value,{min: 2, max: 45}),
                    errorMsg: prefijo + "El apellido debe tener entre 2 y 45 caracteres"
                }
            ]
        },
        birthday:
        {
            name: "birthday",
            validations: [
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isDate(input.value), 
                    errorMsg: prefijo + "Debe ingresar una fecha"
                }
            ]
        },
        address:
        {
            name: "address",
            validations: [
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isAlphanumeric(input.value,'es-ES', {ignore: ' '}), 
                    errorMsg: prefijo + "La dirección no puede tener caracteres especiales"
                },
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isLength(input.value,{max: 45}), 
                    errorMsg: prefijo + "La dirección puede tener hasta 45 caracteres"
                }
            ]
        },
        zipCode:
        {
            name: "zipCode",
            validations: [
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isAlphanumeric(input.value), 
                    errorMsg: prefijo + "El código postal no puede tener caracteres especiales ni espacios"
                },
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isLength(input.value,{min: 4, max: 8}), 
                    errorMsg: prefijo + "El código postal debe tener entre 4 y 8 caracteres"
                }
            ]
        },
        location:
        {
            name: "location",
            validations: [
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isAlpha(input.value, 'es-ES', {ignore: ' '}), 
                    errorMsg: prefijo + "La localidad no puede tener números ni caracteres especiales"
                },
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isLength(input.value,{max: 45}), 
                    errorMsg: prefijo + "La localidad puede tener hasta 45 caracteres"
                }
            ]
        },
        province:
        {
            name: "province",
            validations: [
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isAlpha(input.value, 'es-ES', {ignore: ' '}), 
                    errorMsg: prefijo + "La provincia no puede tener números ni caracteres especiales"
                },
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isLength(input.value,{max: 45}), 
                    errorMsg: prefijo + "La provincia puede tener hasta 45 caracteres"
                }
            ]
        },
        phone:
        {
            name: "phone",
            validations: [
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    //se admite los caracteres +, -, y el espacio vacío en los números de teléfono
                    validation:(input) => optional(input) || validator.isNumeric(removeCharacters(input.value, [" ","+","-"])), 
                    errorMsg: prefijo + "El teléfono no puede tener letras"
                },
                {   //como es opcional, no realizo la validacion si el campo está vacío
                    validation:(input) => optional(input) || validator.isLength(input.value,{min: 8, max: 15}), 
                    errorMsg: prefijo + "El teléfono debe tener entre 8 y 15 caracteres"
                }
            ]
        },
        avatar:
        {
            name: "avatar",
            validations: [
                {
                    validation:(input) => {
                        const filetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];//typos de archivos permitidos
                        const files = input.files;

                        for (const file of files) {
                            if(!filetypes.includes(file.type)){
                                return false;
                            }
                        }

                        return true;

                    }, 
                    errorMsg: prefijo + "La imagen debe ser un archivo jpeg, jpg, png, o gif"
                }
            ]
        },

        //Validaciones de campos de productos
        model:
        {
            name: "model",
            validations: [
                {
                    validation:(input) => input?true:false,
                    errorMsg: prefijo + "No ingresó el modelo del producto"
                },
                {
                    validation:(input) => validator.isAlphanumeric(input.value, 'es-ES', {ignore: ' '}), 
                    errorMsg: prefijo + "El modelo no puede tener caracteres especiales"
                },
                {
                    validation:(input) => validator.isLength(input.value,{min: 5, max: 45}), 
                    errorMsg: prefijo + "El nombre del producto debe tener entre 5 y 45 caracteres"
                }
            ]
        },
        artNumber:
        {
            name: "artNumber",
            validations: [
                {
                    validation:(input) => optional(input) || validator.isNumeric(input.value), 
                    errorMsg: prefijo + "Debe ingresar un número en el número de artículo"
                },
                {
                    validation:(input) => optional(input) || validator.isInt(input.value,{min:0, max: 9999999999999}), 
                    errorMsg: prefijo + "El número de artículo debe estar entre 0 y 9999999999999"
                }
            ]
        }, 
        price:
        {
            name: "price",
            validations: [
                {
                    validation:(input) => input?true:false,
                    errorMsg: prefijo + "No ingresó el precio del producto"
                },
                {
                    validation:(input) => validator.isNumeric(input.value), 
                    errorMsg: prefijo + "Debe ingresar un número en el precio del producto"
                },
                {
                    validation:(input) => validator.isFloat(input.value, {min: 0, max: 99999999.99}), 
                    errorMsg: prefijo + "El precio debe ser mayor a 0 y menor a 99999999.99"
                }
            ]
        }, 
        discountPorc:
        {
            name: "discount",
            validations: [
                {
                    validation:(input) => optional(input) || validator.isNumeric(input.value), 
                    errorMsg: prefijo + "Debe ingresar un número en el Porcentaje de descuento"
                },
                {
                    validation:(input) => optional(input) || validator.isInt(input.value,{min:0, max: 100}), 
                    errorMsg: prefijo + "El porcentaje de descuento debe ser mayor a 0 y menor a 100"
                }
            ]
        }, 
        description:
        {
            name: "description",
            validations: [
                {
                    validation:(input) => validator.isLength(input.value,{min: 1}),
                    errorMsg: prefijo + "No ingresó una descripción para el producto"
                },
                {
                    validation:(input) => validator.isLength(input.value,{min: 20, max: 65535}), 
                    errorMsg: prefijo + "La descripción debe tener entre 20 y 65535 caracteres"
                }
            ]
        },
        images:
        {
            name: "images",
            validations: [
                {
                    validation:(input) => {
                        const filetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];//tipos de archivos permitidos
                        const files = input.files;

                        for (const file of files) {
                            if(!filetypes.includes(file.type)){
                                return false;
                            }
                        }

                        return true;

                    }, 
                    errorMsg: prefijo + "Las imágenes deben ser archivos jpeg, jpg, png, o gif"
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
        ],
        register: [
            fieldsValidations.firstName,
            fieldsValidations.lastName,
            fieldsValidations.email,
            fieldsValidations.password,
            fieldsValidations.avatar
        ],

        user: [
            fieldsValidations.firstName,
            fieldsValidations.lastName,
            fieldsValidations.email,
            fieldsValidations.password,
            fieldsValidations.birthday,
            fieldsValidations.address,
            fieldsValidations.zipCode,        
            fieldsValidations.location,
            fieldsValidations.province,
            fieldsValidations.phone,
            fieldsValidations.avatar
        ],

        edit_profile: [
            fieldsValidations.firstName,
            fieldsValidations.lastName,
            fieldsValidations.email,
            fieldsValidations.passwordOptional,
            fieldsValidations.birthday,
            fieldsValidations.address,
            fieldsValidations.zipCode,        
            fieldsValidations.location,
            fieldsValidations.province,
            fieldsValidations.phone
        ],

        product: [
            fieldsValidations.model,
            fieldsValidations.artNumber,
            fieldsValidations.price,
            fieldsValidations.discountPorc,
            fieldsValidations.description,
            fieldsValidations.images
        ]
    };

    
    //
    form.addEventListener("submit", function(e){  
        //e.preventDefault();
        //se elige con view_name el tipo de vista a validar y se itera por los campos que se van a validar
        formTypes[view_name].forEach(fieldValidation => {
            let input = document.querySelector(`input[name=${fieldValidation.name}]`) ?? document.querySelector(`textarea[name=${fieldValidation.name}]`);
            let error = document.querySelector(`span.errors[name=${fieldValidation.name}]`);

            //Para el campo a validar, se itera por todas las validaciones de ese campo en específico
            fieldValidation.validations.every(validation => { //every es como foreach pero se detiene al retornar false
                if(!validation.validation(input)){ //compruebo el valor ingresado con respecto a la validacion 
                    error.innerHTML = validation.errorMsg; //se muestra el error de validacion
                    e.preventDefault();
                    return false;   //ya no se comprueban las demás validaciones de este campo como se hacía con el bail()
                }else{
                    error.innerHTML = "";//borro los errores que pueden existir de una anterior ejecución
                    return true;   //se sigue comprobando las demás validaciones de este campo
                }
            });
        });

    });





})

//funcion para ser usada donde validator js no soporte la opción ignore
function removeCharacters(string, charactersToRemove){
    let stringResult = string;

    charactersToRemove.forEach(characterToRemove=>{
        stringResult = stringResult.replace(characterToRemove, "");
    });

    return stringResult;
}