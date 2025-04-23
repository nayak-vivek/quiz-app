// get data from session storage
let brandCode;
brandCode = sessionStorage.getItem("brandCode")
if(brandCode == null){
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "black";
    swal("UnAuthorised User!", "Don`t waste Your Time please try to login", "warning"); 

}
let allUserData = JSON.parse(localStorage.getItem(brandCode+"_brand"))
let h1 = document.querySelector("#brand-name");
console.log(allUserData);
h1.innerHTML = "Welcome Mr: "+allUserData.brandName;

//Logout Coding

let logoutBtn = document.querySelector("#logout-Btn");
logoutBtn.addEventListener("click",function(e){
    e.target = this.innerHTML = "please waittt....."
    this.disabled = true;
    this.style.backgroundColor = "#ccc";
    setTimeout(function(){
        window.location = "../company/company.html";
        sessionStorage.removeItem("brandCode")
    },2000)
})

// start store subject coding

let visibleSubject = document.querySelector(".visible-subject");
let subjectBtn = document.querySelector(".subject-btn");
let subjectEl = document.querySelector(".subjects");
let allSubject = [];

subjectBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(subjectEl.value != ""){
        newSubject();
        subjectEl.value = "";
    }else{
        swal("Subject is empty", "please enter suject", "warning");
    }
    updateSubject();
})


const newSubject = (subject,index) => {
    let subjectName = subjectEl.value;
    if(subject){
        subjectName = subject.subjectName;
    }
    visibleSubject.innerHTML += `
    <div class="d-flex subject-box justify-content-between align-items-center">
        <h3 index ='${index}'>${subjectName}</h3>
        
        <div>
                <i class="fa fa-edit edit-btn mx-2" style="font-size: 22px;"></i>
                <i class="fa fa-save mx-2 save-btn d-none" style="font-size: 22px;"></i>
                <i class="fa fa-trash del-btn mx-2" style="font-size: 22px;"></i>
        </div>
            </div>
    `;

    // Start Delete Coding
    let i;
    let DelAllBtn = visibleSubject.querySelectorAll(".del-btn");
    for(i=0;i<DelAllBtn.length;i++){
        DelAllBtn[i].addEventListener("click",function(){
            let parent = this.parentElement.parentElement;
            // console.log(parent);
            
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    parent.remove();
                    updateSubject();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
        })
    }

    // start edit coding

    let EditAllBtn = visibleSubject.querySelectorAll(".edit-btn");
    for(i=0;i<EditAllBtn.length;i++){
        EditAllBtn[i].addEventListener("click",function(){
            let parent = this.parentElement.parentElement;
            let saveBtn = parent.querySelector(".save-btn");
            let h3 = parent.getElementsByTagName("h3");
            h3[0].contentEditable = true;
            h3[0].focus();
            this.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            saveBtn.addEventListener("click",function(){
                let editedSub = h3[0].innerHTML;
                let id = h3[0].getAttribute("index");
                updateSubject(editedSub,id);
                this.classList.add("d-none");
                EditAllBtn[id].classList.remove("d-none");
                h3[0].contentEditable = false;
            })
        })
    }
}

if(localStorage.getItem(brandCode+"_allSubject") != null){
    allSubject = JSON.parse(localStorage.getItem(brandCode+"_allSubject"));
    allSubject.forEach((subject,index)=>{
        newSubject(subject,index);
        
    })    
}

function updateSubject(subject,id){
    if(subject != undefined && id != undefined){
        allSubject[id] = {
            subjectName: subject
        }
    }else{
        let i;
        allSubject = [];
        let subjectBox = visibleSubject.querySelectorAll(".subject-box");
        for(i=0;i<subjectBox.length;i++){
            let h3 = subjectBox[i].getElementsByTagName("h3");
            allSubject.push({
                subjectName : h3[0].innerHTML
        })
    }
    }
    
    localStorage.setItem(brandCode+"_allSubject",JSON.stringify(allSubject));
}

// start return subject in question form

let chooseSubject = document.querySelector("#choose-subject");
let questionForm = document.querySelector(".question-form");
let allQuesInput = questionForm.querySelectorAll("input");
let selectSubject = document.querySelector("#select-subject");
let subjectResultEl = document.querySelector("#subject-result-el");
let allQuestion = [];
let subject;
questionForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    insertQuestionFunc();
})

function chooseSubjectFunc(){
    // allSubject name ke array me mera sara data h uspe for each loop chalega
    allSubject.forEach((subject,index)=>{
        chooseSubject.innerHTML += `
            <option value='${subject.subjectName}'>${subject.subjectName}</option>
        `;
        selectSubject.innerHTML += `
            <option value='${subject.subjectName}'>${subject.subjectName}</option>
        `;
        subjectResultEl.innerHTML += `
            <option value='${subject.subjectName}'>${subject.subjectName}</option>
        `;
    })
}
chooseSubjectFunc();

chooseSubject.addEventListener('change',()=>{
    checkSubject();
    checkSubjectKey();
})
let options = chooseSubject.querySelectorAll("option");
let firstOption = options.length > 1 ? options[1] : null;
// console.log(firstOption);

function checkSubject(){
    if(chooseSubject.value == "choose Subjects"){
        subject = firstOption ? firstOption.value : "";
    }else{
        subject = chooseSubject.value;
    }
}

checkSubject();

function checkSubjectKey(){
    if(localStorage.getItem(brandCode+subject+"_question") != null){
        allQuestion = JSON.parse(localStorage.getItem(brandCode+subject+"_question"));
    }else{
        allQuestion = [];
    }
}
checkSubjectKey();


function insertQuestionFunc(sub,id,question,opOne,opTwo,opThree,opFour,corrAns){
    if(sub != undefined && id != undefined){
        allQuestion[id]= {
            question : question,
                optionOne : opOne,
                optionTwo : opTwo,
                optionThree : opThree,
                optionFour : opFour,
                correctAnswer : corrAns
        }
        localStorage.setItem(brandCode+sub+"_question",JSON.stringify(allQuestion));
        swal("success","data Updated Successsfully","success");

    }else{
        if(chooseSubject.value != "choose Subjects"){
            allQuestion.push({
                question : allQuesInput[0].value,
                optionOne : allQuesInput[1].value,
                optionTwo : allQuesInput[2].value,
                optionThree : allQuesInput[3].value,
                optionFour : allQuesInput[4].value,
                correctAnswer : allQuesInput[5].value
            });
            localStorage.setItem(brandCode+chooseSubject.value+"_question",JSON.stringify(allQuestion));
            swal("success","data Inserted Successsfully","success");
            questionForm.reset('');
    
        }else{
            swal("choose subject","please select a subject","warning");
        }
    }
    
}

// start returning question from local storage
let newQuestions = [];
let visibleQuestion = document.querySelector(".visible-question");
selectSubject.onchange = ()=>{
    if(localStorage.getItem(brandCode + selectSubject.value+"_question")){
        newQuestions = JSON.parse(localStorage.getItem(brandCode + selectSubject.value+"_question"));
        // console.log(newQuestions);
        visibleQuestion.innerHTML = "";
        newQuestionFunc();
        
    }else{
        visibleQuestion.innerHTML = "<b style='color: red'>No Data Available</b>"
    }
}
function newQuestionFunc(){
    newQuestions.forEach((question,index)=>{
        console.log(question,index);
        visibleQuestion.innerHTML += `
        <div class="mb-5"  index = "${index}">
            <div class="d-flex justify-content-between">
                <h3>${index+1}) ${question.question}</h3>
                <div>
                    <i class="fa fa-edit  edit-btn mx-3" style="font-size: 22px;"></i>
                    <i class="fa fa-save  save-btn d-none mx-3 " style="font-size: 22px;"></i>
                    <i class="fa fa-trash del-btn mx-3" style="font-size: 22px;"></i>
                </div>
            </div>
            <br />
            <div>
                <span>1) ${question.optionOne}</span>
                <br> <br>
                <span>2) ${question.optionTwo}</span>
                <br> <br>
                <span>3) ${question.optionThree}</span>
                <br> <br>
                <span>4) ${question.optionFour}</span>
                <br> <br>
                <span class="bg-info p-3 text-white">${question.correctAnswer}</span>

            </div>
            </div>
        `
    });
    // delete coding 
    let allDelBtn = visibleQuestion.querySelectorAll(".del-btn");
    console.log(allDelBtn);
    for(let i =0;i<allDelBtn.length;i++){
        allDelBtn[i].addEventListener("click",(e)=>{
            let parent = e.target.parentElement.parentElement.parentElement;
            let index= parent.getAttribute("index");
            
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    newQuestions.splice(index,1);
                    localStorage.setItem(brandCode+selectSubject.value+"_question",JSON.stringify(newQuestions));
                    parent.remove();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
        })
    }
    // edit coding
    let allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");
    
    for (let i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].addEventListener("click", function (e) {
        let parent = this.parentElement.parentElement.parentElement;
        let index = +parent.getAttribute("index");
        let saveBtn = parent.querySelector(".save-btn");
        
        this.classList.add("d-none");  // Correct use of 'this'
        saveBtn.classList.remove("d-none");

        let h3 = parent.querySelector("h3");
        let span = parent.querySelectorAll("span");
        h3.contentEditable = true;
        h3.focus();

        for(let j=0;j<span.length;j++){
            span[j].contentEditable = true;
            span[j].style.border = "2px solid red";
        }
        saveBtn.addEventListener("click", () => {
            let subject = selectSubject.value;
            let question = h3.innerHTML.replace(`${index+1}) `,"");
            let opOne = span[0].innerHTML.replace("1) ","");
            let opTwo = span[1].innerHTML.replace("2) ","");
            let opThree = span[2].innerHTML.replace("3) ","");
            let opFour = span[3].innerHTML.replace("4) ","");
            let corrAns = span[4].innerHTML;
            swal({
                title: "Are you sure?",
                text: "Once Updated, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willUpdated) => {
                if (willUpdated) {
                    insertQuestionFunc(subject,index,question,opOne,opTwo,opThree,opFour,corrAns);
                    allEditBtn[index].classList.remove("d-none");
                    saveBtn.classList.add("d-none");
                    h3.contentEditable = false;
                    for(let j=0;j<span.length;j++){
                        span[j].contentEditable = false;
                        span[j].style.border = "none";
                    }
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
        });
    });
}

}

// start registration coding

let registrationForm = document.querySelector(".registration-form");
let allRegInput =  registrationForm.querySelectorAll("input");
let userType = registrationForm.querySelector("select");
let address = registrationForm.querySelector("textarea");
let registrationdataEl = document.querySelector(".registration-data");
let profileBox = document.querySelector(".upload-box");
let uploadInput = document.querySelector(".upload-input");
let moadalImgUrl;
let registrationData = [];
registrationForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    registrationFunc();
    getRegistratioDataFunc();
})
// get data
if(localStorage.getItem(brandCode+"_registrationData") != null){
    registrationData = JSON.parse(localStorage.getItem(brandCode+"_registrationData"))
}
function registrationFunc (){
    if(userType.value != "choose type"){
        registrationData.push({
            name: allRegInput[0].value,
            fatherName: allRegInput[1].value,
            dob: allRegInput[2].value,
            userType: userType.value,
            mobile: allRegInput[3].value,
            enrollment: allRegInput[4].value,
            password: allRegInput[5].value,
            address: address.value,
            profilePic : "./css/avatar.png"

        });
        localStorage.setItem(brandCode+"_registrationData",JSON.stringify(registrationData));
        swal("Data Inserted","registration Done Successfully","success");
        registrationForm.reset('');

    }else{
        swal("choose type","please select a user","warning");
    }
}


function getRegistratioDataFunc(){
    registrationdataEl.innerHTML = " ";
    registrationData.forEach((allData,index)=>{
        registrationdataEl.innerHTML += `
        <tr index="${index}">
            <th scope="row">${index+1}</th>
            <td>
                <div class="profile">
                    <img src="${allData.profilePic}" width="40" height="40" alt="">
                </div>
            </td>
            <td class="text-nowrap" style="width: 8rem;">${allData.name}</td>
            <td class="text-nowrap" style="width: 8rem;">${allData.fatherName}</td>
            <td class="text-nowrap" style="width: 8rem;">${allData.dob}</td>
            <td class="text-nowrap" style="width: 8rem;">${allData.userType}</td>
            <td class="text-nowrap" style="width: 8rem;">${allData.mobile}</td>
            <td class="text-nowrap" style="width: 8rem;">${allData.enrollment}</td>
            <td class="text-nowrap" style="width: 8rem;">${allData.password}</td>
            <td style="width: 8rem;">${allData.address}</td>
            <td class="text-nowrap" style="width: 8rem;">
                <i class="fa fa-trash del-btn mx-3"></i>
                <i class="fa fa-eye edit-btn" data-bs-toggle="modal" data-bs-target="#myModal"></i>
            </td>
        </tr>
        `
    })

    //start delete coding
    let allDelBtn = registrationdataEl.querySelectorAll(".del-btn");
    for(let i=0;i<allDelBtn.length;i++){
        allDelBtn[i].addEventListener("click",(e)=>{
            let parent = e.target.parentElement.parentElement;
            let index = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    registrationData.splice(index,1);
                    localStorage.setItem(brandCode+"_registrationData",JSON.stringify(registrationData));
                    parent.remove();
                    getRegistratioDataFunc();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });            
            
        })
    }
    // start update coding
    let allEditBtn = registrationdataEl.querySelectorAll(".edit-btn");
    let modalEditBtn = document.querySelector(".modal-edit");
    let ModalUpdateBtn = document.querySelector(".modal-update-btn");
    
    let modalForm = document.querySelector(".modal-form");
    let allModalInput = modalForm.querySelectorAll("input");
    let modalTextarea = modalForm.querySelector("textarea"); 
    let closeBtn = document.querySelector(".btn-close");
    for(i=0;i<allEditBtn.length;i++){
        allEditBtn[i].addEventListener("click",(e)=>{
            let parent = e.target.parentElement.parentElement;
            let index = parent.getAttribute("index");
            let td = parent.querySelectorAll("td")
            let imgUrl = td[0].querySelector("img").src;
            let name = td[1].innerHTML;
            let fatherName = td[2].innerHTML;
            let dob = td[3].innerHTML;
            let userType = td[4].innerHTML;
            let mobile = td[5].innerHTML;
            let enrollment = td[6].innerHTML;
            let password = td[7].innerHTML;
            let address =  td[8].innerHTML;
            
            profileBox.style.backgroundImage = `url(${imgUrl})`;
            allModalInput[0].value = name;
            allModalInput[1].value = fatherName;
            allModalInput[2].value = dob;
            allModalInput[3].value = userType;
            allModalInput[4].value = mobile;
            allModalInput[5].value = enrollment;
            allModalInput[6].value = password;
            modalTextarea.value = address
            
            for(let j=0;j<allModalInput.length;j++){
                allModalInput[j].disabled = true;
            }
            modalTextarea.disabled = true; 
            uploadInput.disabled = true;

            modalEditBtn.addEventListener("click",(e)=>{
                for(let j=0;j<allModalInput.length;j++){
                    allModalInput[j].disabled = false;
                }
                modalTextarea.disabled = false; 
                uploadInput.disabled = false;
                e.target.classList.add("d-none");
                ModalUpdateBtn.classList.remove("d-none");

                ModalUpdateBtn.onclick = function(){
                    let name = allModalInput[0].value;
                    let fatherName = allModalInput[1].value;
                    let dob = allModalInput[2].value;
                    let userType = allModalInput[3].value;
                    let mobile = allModalInput[4].value;
                    let enrollment = allModalInput[5].value;
                    let password = allModalInput[6].value;
                    let address  = modalTextarea.value;

                   
                    swal({
                        title: "Are you sure?",
                        text: "you want to Update?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willUpdated) => {
                        if (willUpdated) {
                            registrationData[index] ={
                                name: name,
                                fatherName: fatherName,
                                dob: dob,
                                userType: userType,
                                mobile: mobile,
                                enrollment: enrollment,
                                password: password,
                                address: address,
                                profilePic: moadalImgUrl == undefined ? imgUrl : moadalImgUrl
                            }
                            localStorage.setItem(brandCode+"_registrationData",JSON.stringify(registrationData));
                            getRegistratioDataFunc();
                            this.classList.add("d-none");
                            modalEditBtn.classList.remove("d-none");
                            closeBtn.click();
                          swal("Poof! Your imaginary file has been Updated!", {
                            icon: "success",
                          });
                        } else {
                          swal("Your imaginary file is safe!");
                        }
                      });   
                }
            })
        })
    }
} 
getRegistratioDataFunc();

//read image coding
uploadInput.addEventListener("change",()=>{
    let fReader = new FileReader();
    fReader.onload = function(e){
        moadalImgUrl = e.target.result;
        profileBox.style.backgroundImage = `url(${moadalImgUrl})`;
    }
    fReader.readAsDataURL(uploadInput.files[0]);

})


//start toggler coding
    const sideNav = document.querySelector('.side-nav');
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    
    openMenu.addEventListener('click', () => {
        sideNav.classList.add('active');
        openMenu.style.display = 'none';
        closeMenu.style.display = 'block';
    });
    
    closeMenu.addEventListener('click', () => {
        sideNav.classList.remove('active');
        openMenu.style.display = 'block';
        closeMenu.style.display = 'none';
    });

// start get result coding from database
let allResult = [];
let allUserResultBox = document.querySelector(".subject-result-data")
subjectResultEl.addEventListener("change",()=>{
    allUserResultBox.innerHTML = ""
    if(subjectResultEl.value != "choose Subjects"){
        if(localStorage.getItem(brandCode+"_"+subjectResultEl.value+"_result") != null){
            allResult = JSON.parse(localStorage.getItem(brandCode+"_"+subjectResultEl.value+"_result"));
            allResult.forEach((data,index)=>{
                allUserResultBox.innerHTML += ` 
                    <tr>
                        <td class="text-nowrap" style="width: 8rem;">${index+1}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.subject}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.wrongAns}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.maxMark}</td>
                    </tr>
                `
            })
        }
    }else{
        swal({
            title: "Select Subject",
            text: "Please select subject first",
            icon: "warning",
                
            })
    }
})

// start get certificate coding

let closeBtn = document.querySelector(".certificate-close-btn");
let certificateMainBox = document.querySelector(".certificate-main");

let certificateForm = document.querySelector(".certificate-form");
let cirInput = certificateForm.querySelector("input");
let cirBrandName = certificateMainBox.querySelector(".brand-name");
let cirAddress = certificateMainBox.querySelector(".brand-address");
let cirName = certificateMainBox.querySelector(".cir-name");
let cirEnrollment = certificateMainBox.querySelector(".cir-enrollment");
let cirfather = certificateMainBox.querySelector(".cir-father");
let cirData = certificateMainBox.querySelector(".cir-data");
let cirTotal = certificateMainBox.querySelectorAll(".cir-total");
let cirProfile = certificateMainBox.querySelector(".cir-Profile");
let finalResultBox = certificateMainBox.querySelector(".final-result-box");
// getting result from DB
certificateForm.onsubmit = function(e){
    e.preventDefault();
    getUserResult();
}

function getUserResult(){
    if(cirInput.value != ""){
        cirData.innerHTML = " "; 
        if(localStorage.getItem(brandCode+"_"+cirInput.value+"_result") != null){
            let resultData = JSON.parse(localStorage.getItem(brandCode+"_"+cirInput.value+"_result"));
            console.log(resultData);
            certificateMainBox.classList.add("active");
            cirBrandName.innerHTML = allUserData.brandName;
            cirAddress.innerHTML = allUserData.textarea;
            cirName.innerHTML = resultData[0].name;
            cirEnrollment.innerHTML = resultData[0].enrollment;
            cirfather.innerHTML = resultData[0].fatherName;
            cirProfile.src =  resultData[0].profilePic;
            let maxMarks = 0;
            let mark = 0;
            let total = 0;
            resultData.forEach((data,index)=>{
                cirData.innerHTML += `
                    <tr>
                        <td>${index+1}</td>
                        <td>${data.subject}</td>
                        <td>${data.maxMark}</td>
                        <td>${data.rightAns}</td>
                        <td>${data.rightAns}</td>
                    </tr>
                `;
                maxMarks += data.maxMark; 
                mark += data.rightAns;
                total += data.rightAns;
            });
            cirTotal[0].innerHTML = maxMarks;
            cirTotal[1].innerHTML = mark;
            cirTotal[2].innerHTML = total; 
            let finalResult = (total /maxMarks*100).toFixed(2);
            if(finalResult <= 32.99){
                finalResultBox.innerHTML = "FAIL";
            }else{
                finalResult.innerHTML = "PASS"
            }
            
        }   
        else{
            swal({
                title: "No Result Found",
                text: "There is no result related enrollment",
                icon: "warning",
                    
                })
        }
    }else{
        swal({
            title: "Input field is empty",
            text: "Please enter enrollment first",
            icon: "warning",
                
            })
    }
}
// closing model coding
closeBtn.addEventListener("click",()=>{
    certificateMainBox.classList.remove("active"); 
})
 