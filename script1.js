let signinForm = document.getElementById("signinForm");

if(signinForm){

    signinForm.onsubmit = function(event){

        event.preventDefault();

        let email = document.getElementById("email");
        let password = document.getElementById("password");

        let emailError = document.getElementById("errorMsgEmail");
        let passwordError = document.getElementById("errorMsgPassword");

        let valid = true;

        emailError.innerHTML = "";
        passwordError.innerHTML = "";

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email.value.trim() == ""){
            emailError.innerHTML = "Email cannot be empty";
            valid = false;
        }
        else if(!emailPattern.test(email.value.trim())){
            emailError.innerHTML = "Please enter a valid email";
            valid = false;
        }

        if(password.value.trim() == ""){
            passwordError.innerHTML = "Password cannot be empty";
            valid = false;
        }

        if(valid){
            alert("Sign in successful!");
        }
    }

}