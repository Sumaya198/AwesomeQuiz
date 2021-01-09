let questions = [
    {
        question : "What does XML stand for?",
        
        firstChoice : "eXtensible Markup Language",
        secondChoice : "eXecutable Multiple Language",
        thirdChoice : "eXTra Multi-Program Language",
        fourthChoice : "eXamine Multiple Language",
        correct : "first"
    },{
        question : "What does SQL stand for?",
       
        firstChoice : "Stylish Question Language",
        secondChoice : "Stylesheet Query Language",
        thirdChoice : "Statement Question Language",
        fourthChoice : "Structured Query Language",
        correct : "fourth"
    },{
        question : "What does CSS stand for?",
        
        firstChoice : "Common Style Sheet",
        secondChoice : "Colorful Style Sheet",
        thirdChoice : "Computer Style Sheet",
        fourthChoice : "Cascading Style Sheet",
        correct : "fourth"
    },{
        question : "Who is making the Web standards?",
        
        firstChoice : "Microsoft",
        secondChoice : "Google",
        thirdChoice : "Mozilla",
        fourthChoice : "The World Wide Web Consortium",
        correct : "fourth"
    },{
        question : "Which bootstrap class provides a responsive fixed width container?",
        
        firstChoice : ".container",
        secondChoice : ".container-fixed",
        thirdChoice : ".container-fluid",
        fourthChoice : ".row",
        correct : "third"
    },{
        question : "The Bootstrap grid system is based on how many columns?",
        
        firstChoice : "3",
        secondChoice : "6",
        thirdChoice : "12",
        fourthChoice : "9",
        correct : "third"
    }
];


const startContainer = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const firstChoice = document.getElementById("first");
const secondChoice = document.getElementById("second");
const thirdChoice = document.getElementById("third");
const fourthChoice = document.getElementById("fourth");
const progress = document.getElementById("ScoreBar");
const scoreCon = document.getElementById("scoreContainer");


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
let Timer;
let score = 0;

// render a question
function renderQuestion(){
    let Q = questions[runningQuestion];
    question.innerHTML = "<p>"+ Q.question +"</p>";
    firstChoice.innerHTML = Q.firstChoice;
    secondChoice.innerHTML = Q.secondChoice;
    thirdChoice.innerHTML = Q.thirdChoice;
    fourthChoice.innerHTML = Q.fourthChoice;
}


startContainer.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    startContainer.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    Timer = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
       
        count++
    }else{
        count = 0;
        // change progress color to red
        wrongAnswer();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(Timer);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        rightAnswer();
    }else{
        // answer is wrong
        // change progress color to red
        wrongAnswer();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(Timer);
        scoreRender();
    }
}

// answer is correct
function rightAnswer(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function wrongAnswer(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

//function to save score to local storage
// function to save name to local storage
// function saveName(){
//     const nameVal = document.getElementById('name').value
//     document.getElementById("demo").innerHTML =nameVal
   
// }

// function getName(){
//     const getPlayer = localStorage.getItem("userName");
//     console.log('Player', getPlayer)
// }

// score render
function scoreRender(){
    const nameVal = document.getElementById('name').value
   // document.getElementById("demo").innerHTML =nameVal
        
  if (nameVal !== null){
    scoreCon.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    
    scoreCon.innerHTML += "<p>" + nameVal + " Your Score is: " + scorePerCent +"%</p>";
  } else{
      return ''
  }
 
}

