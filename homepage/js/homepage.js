// get brand code from local storage
let allbrandKeys =  [];
for(let i=0;i<localStorage.length;i++){
    let allKeys = localStorage.key(i);
    if(allKeys.match("_brand")){
        allbrandKeys.push(
            allKeys.replace("_brand","")
        );        
    }
}
console.log(allbrandKeys);

// create option coding for brand code
let BrandCodeEl = document.querySelector("#brand-code-el");
allbrandKeys.forEach((code,index)=>{
    BrandCodeEl.innerHTML += `
        <option value="${code}">${code}</option>
    `;
})

// all global variable
let loginForm = document.querySelector(".login-form"); 
let allLoginInput = loginForm.querySelectorAll("input");
let loginBtn = loginForm.querySelector("button");
let brandCode;
// start login coding
BrandCodeEl.addEventListener("change",()=>{
    if(BrandCodeEl.value != "choose space code"){
        sessionStorage.setItem("brandCode",BrandCodeEl.value);
        allLoginInput[0].disabled = false;
        allLoginInput[1].disabled = false;
        loginBtn.disabled = false;
        brandCode = sessionStorage.getItem("brandCode",);
        // alert(brandCode);
        loginUserFun();
    }else{
        allLoginInput[0].disabled = true;
        allLoginInput[1].disabled = true;
        loginBtn.disabled = true;
        swal("please select brand!","please select brand code first","warning");
    }
});

function loginUserFun(){
    if(localStorage.getItem(brandCode+"_registrationData") != null){
        allUserData = JSON.parse(localStorage.getItem(brandCode+"_registrationData"));
    }
    console.log(allUserData);
    loginForm.onsubmit = function(e){
        e.preventDefault();
        for(i=0;i<allUserData.length;i++){
            if(allUserData[i].enrollment == allLoginInput[0].value){
                if(allUserData[i].password == allLoginInput[1].value){
                    if(allUserData[i].userType == "teacher"){
                        sessionStorage.setItem("brandCode",brandCode);
                        window.location = "../dashboard/dashboard.html";
                    }else{
                        sessionStorage.setItem("enrollment",allUserData[i].enrollment);
                        sessionStorage.setItem("name",allUserData[i].name);
                        sessionStorage.setItem("address",allUserData[i].address);
                        sessionStorage.setItem("fatherName",allUserData[i].fatherName);
                        sessionStorage.setItem("brandCode",brandCode);
                        sessionStorage.setItem("imgUrl",allUserData[i].profilePic);
                        window.location = "../welcome/welcome.html";
                    }
                    return;
                }else{
                    swal("wrong password","please contact your teacher","warning");
                    return;
                }
            }else{
                swal("wrong enrollment","please contact your teacher","warning");
            }
        }
    }
    
}