// form control Coding
let signupBtn = document.querySelector(".signup-btn");
let loginBtn = document.querySelector(".login-btn");
let loginBox = document.querySelector(".login-box");
let signupBox = document.querySelector(".signup-box");

signupBtn.addEventListener("click",function(){
    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    loginBtn.classList.remove("d-none");
    signupBtn.classList.add("d-none");
})

loginBtn.addEventListener("click",function(){
    loginBox.classList.add("active");
    signupBox.classList.remove("active");
    loginBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
})

// start register coding

let registerForm = document.querySelector(".signup-form");
let allInput = registerForm.querySelectorAll("input");
let textArea = document.querySelector("#address");
// console.log(allInput,textArea);


registerForm.addEventListener("submit",function(e){
    e.preventDefault();
    registrationData();
})

function registrationData(){
   if(localStorage.getItem(allInput[0].value+"_brand") == null){
    const userData = {
        brandCode: allInput[0].value,
        brandName: allInput[1].value,
        website: allInput[2].value,
        contact: allInput[3].value,
        textarea: textArea.value,
        username: allInput[4].value,
        password: allInput[5].value
    }
    let userString = JSON.stringify(userData);
    localStorage.setItem(allInput[0].value+"_brand",userString);
    registerForm.reset('');
    swal("Registration Done", "please signIn!", "success");
   }else{
    swal("change Brand Code", "this Brand Code is already Exist!", "warning");  
 }
}

// sign in coding
let signinBtn = document.querySelector(".signin-btn");
let brandCode = document.querySelector("#brand-code");
let username = document.querySelector("#username");
let password = document.querySelector("#password");

signinBtn.addEventListener("click",function(e){
    e.preventDefault();
    if((brandCode.value !='') && (username.value != '') && (password.value !='')){
        if(localStorage.getItem(brandCode.value+"_brand") != null){
            var allData = JSON.parse(localStorage.getItem(brandCode.value+"_brand"));
            console.log(allData);
            if(allData.username == username.value){
                if(allData.password == password.value){
                    signinBtn.innerHTML = "please wait..."
                    signinBtn.disabled = true;
                    setTimeout(function(){
                        window.location = "../dashboard/dashboard.html"
                        sessionStorage.setItem("brandCode",brandCode.value)
                    },2000)
                }else{
                    swal("Wrong password!", "please check password", "warning"); 
                }
            }else{
                swal("Wrong username!", "please check username", "warning"); 
            }
        }else{
            swal("Wrong BrandCode!", "please Sign Up first", "warning");  

        }
    }else{
        swal("Empty field!", "please fill all the field", "warning");  

    }
})