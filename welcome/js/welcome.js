// global variable
let selectSubjectEl = document.querySelector("#select-subject-el");
let startQuizBtn = document.querySelector(".start-quiz-btn");
let brandCcode = sessionStorage.getItem("brandCode");
let allSubject = [];
// reading subject from local storage
if(localStorage.getItem(brandCcode+"_allSubject") != null){
    allSubject = JSON.parse(localStorage.getItem(brandCcode+"_allSubject"));
    allSubject.forEach((subject,index)=>{
        selectSubjectEl.innerHTML += `
            <option>${subject.subjectName}</option>

        `;
    })
    
}

startQuizBtn.addEventListener("click",()=>{
    if(selectSubjectEl.value != "choose subject"){
        let subject = selectSubjectEl.value;
        sessionStorage.setItem("subject",subject);
        window.location = "../quiz/quiz.html";
    }else{
        swal("select subject","please select subject first","warning");
    }
})
