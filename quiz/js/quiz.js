let subject = sessionStorage.getItem("subject");
let brandCode = sessionStorage.getItem("brandCode");
let studentName = sessionStorage.getItem("name");
let address = sessionStorage.getItem("address");
let fatherName = sessionStorage.getItem("fatherName");
let enrollment = sessionStorage.getItem("enrollment");
let imgUrl = sessionStorage.getItem("imgUrl");
console.log(imgUrl);

// alert(enrollment);
let allQuestion = [];

// reading questions from local storage
if(localStorage.getItem(brandCode+subject+"_question") != null){
    allQuestion = JSON.parse(localStorage.getItem(brandCode+subject+"_question"));
    console.log(allQuestion);
} 

let mainBox = document.querySelector(".main"); 
let questionEl = document.querySelector(".question-el");
let index = 0;
let right = 0;
let wrong = 0;
let allOptionsEl = document.querySelectorAll(".option");
let nextBtn = document.querySelector(".next-btn");
let total = allQuestion.length;

let allUserResult = [];
let particularUserResult = [];
function getQuestionFunc(){
    if(index == total){
        return endQuiz();
    }
    resetFunc();
    let data = allQuestion[index];
    questionEl.innerHTML = `Q-${index+1} : ${data.question}`
    allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
    allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
    allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
    allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
}
getQuestionFunc();

nextBtn.onclick = function(){
    let data = allQuestion[index];
    let ans = getAnswer();
    // alert(ans);
    if(ans == data.correctAnswer){
        right++;
        console.log("right = "+right);
    }else{
        wrong++;
        console.log("right = "+wrong);
    }
    index++;
    getQuestionFunc();
    return;
}

function getAnswer(){
    let answer;
    allOptionsEl.forEach((input)=>{
        if(input.checked){
            answer =  input.value;
        }
    });
    return answer;
}

function resetFunc(){
    allOptionsEl.forEach((input)=>{
        input.checked = false;
    })
}


function endQuiz(){
    mainBox.innerHTML = `
    <h2>Click on Submit Button to Complete your examination.</h2>
    <div align="center">
        <button class="btn btn-primary quiz-submit-btn">Submit</button>
    </div>
    `;
    submitFunc();
}

function submitFunc(){
    if(localStorage.getItem(brandCode+"_"+subject+"_result") != null){
        allUserResult = JSON.parse(localStorage.getItem(brandCode+"_"+subject+"_result"));
    }
    if(localStorage.getItem(brandCode+"_"+enrollment+"_result") != null){
        particularUserResult = JSON.parse(localStorage.getItem(brandCode+"_"+enrollment+"_result"));
    }
    let submitBtn = document.querySelector(".quiz-submit-btn");
    submitBtn.addEventListener("click",(e)=>{
        allUserResultFunc();
        particularUserResultFunc();
        e.target.innerHTML = "please wait....";
        e.target.disabled = true;
    })
} 

function allUserResultFunc(){
    allUserResult.push({
        name : studentName,
        enrollment : enrollment,
        rightAns : right,
        wrongAns : wrong,
        subject : subject, 
        maxMark : total
    })
    console.log(allUserResult);
    
    localStorage.setItem(brandCode+"_"+subject+"_result",JSON.stringify(allUserResult));
    setTimeout(function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("enrollment");
        sessionStorage.removeItem("fatherName"); 
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("subject");
        window.location = "../homepage/homepage.html";
    },2000)
}

function particularUserResultFunc(){
    particularUserResult.push({
        name : studentName,
        fatherName : fatherName,
        enrollment : enrollment,
        rightAns : right,
        wrongAns : wrong,
        subject : subject, 
        maxMark : total,
        profilePic : imgUrl
    })
    localStorage.setItem(brandCode+"_"+enrollment+"_result",JSON.stringify(particularUserResult));
    setTimeout(function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("enrollment");
        sessionStorage.removeItem("fatherName"); 
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("subject");
        window.location = "../homepage/homepage.html";
    },2000)
}