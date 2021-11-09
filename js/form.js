/* eslint-disable no-unused-vars */

function openFormModal(){
    document.getElementById("formModal").classList.add("show");
    document.getElementById("smoke").classList.add("show");
}

function closeFormModal(){
    document.getElementById("formModal").classList.remove("show");
    document.getElementById("smoke").classList.remove("show");
}

function resetErrors(){
    borderColorInput(document.getElementById("firstName"), "white");
    borderColorInput(document.getElementById("lastName"), "white");
    borderColorInput(document.getElementById("email"), "white");
    borderColorInput(document.getElementById("message"), "white");
}

function displayContentForm(firstname, lastname, email, message){
    console.log("Firstname : " + firstname.value);
    console.log("Lastname : " + lastname.value);
    console.log("Email : " + email.value);
    console.log("Message : " + message.value);
}

/* Form Validators */
function isValidFirstName(element){
    return (element.value !== null && element.value.length >= 2);
}

function isValidLastName(element){
    return (element.value !== null && element.value.length >= 2);
}

function isValidEmail(element) {
    return /^\S+@\S+\.\S+$/.test(element.value);
}

function isValidMessage(element){
    return (element.value !== null && element.value.length >= 2);
}

/* Show errors */
function borderColorInput(element, color){
    element.style.borderColor = color;
}

function formModalSubmit(event){
    event.preventDefault();

    var valid = true;
    resetErrors();

    var firstname = document.getElementById("firstName");
    var lastname = document.getElementById("lastName");
    var email = document.getElementById("email");
    var message = document.getElementById("message");

    if(!isValidFirstName(firstname)){
        valid = false;
        borderColorInput(firstname,"red");
    }
    if(!isValidLastName(lastname)){
        valid = false;
        borderColorInput(lastname,"red");
    }
    if(!isValidEmail(email)){
        valid = false;
        borderColorInput(email,"red");
    }
    if(!isValidMessage(message)){
        valid = false;
        borderColorInput(message,"red");
    }

    if(valid){
        closeFormModal();
        displayContentForm(firstname,lastname,email,message);
    }
}