var QuizBank = {
  questions: [{question: "What is the moon made of?",
                answers: [
                  "Cheese",
                  "Bologna",
                  "Basalt",
                  "Silly Putty"
                ],
                correctAnswer: "Cheese"
                },
                {question: "What is the capitol of Thailand?",
                  answers: [
                    "Ayutayah",
                    "Phi Phi",
                    "Bangkok",
                    "Sukhothai"
                  ],
                  correctAnswer: "Bangkok"
                  },
                {question: "What is a synonym for Donald Trump?",
                answers: [
                  "Narcicism",
                  "Orangutan",
                  "Danger, Danger",
                  "Putin Playtoy"
                ],
                correctAnswer: "Putin Playtoy"
                },
                {question: "How do you say SHAMELESS in Portuguese?",
                  answers: [
                    "Lula",
                    "Sem Vegonha",
                    "Cunha",
                    "Temer"
                  ],
                  correctAnswer: "Sem Vergonha"
                  },
                {question: "How much is that doggy in the window?",
                answers: [
                  "10 bucks",
                  "5 bucks",
                  "A box of kitty litter",
                  "Who cares?"
                ],
                correctAnswer: "A box of kitty litter"
                },
                {question: "Which of these is composed of the element Carbon?",
                  answers: [
                    "A Diamond",
                    "Graphene",
                    "Graphite",
                    "All of the above"
                  ],
                  correctAnswer: "All of the above"
                  },
                {question: "If you asked for Feijoada in Portuguese, would you recieve?",
                answers: [
                  "A girl in a very small bikini",
                  "A small goat",
                  "A bowl of black bean based stew",
                  "Something that is green and sticky"
                ],
                correctAnswer: "A bowl of black bean based stew"
                },
                {question: "Who is Padre Cicero?",
                  answers: [
                    "An italian opera singer",
                    "A priest who is venerated in Crato",
                    "Cicero's Dad",
                    "Who cares?"
                  ],
                  correctAnswer: "A priest who is venerated in Crato"
                  },
            ],

  currentCorrect: 0
}

TempQuiz = {questions:[],
            currentQuestion: 0,
            correctQuestion: function(answer) {
              // alert("the answer selected is: " + answer);
              // alert("the correct answer  is: " + this.questions[this.currentQuestion].correctAnswer);
              var CorrectAnswer = this.questions[this.currentQuestion].correctAnswer;
              if(answer === CorrectAnswer) {
                renderAnswer(1, CorrectAnswer);//correct
              } else {
                renderAnswer(0, CorrectAnswer);//incorrect
              }
            }
};

//State Modification functions
function initalizeTempQuiz() {
  var questionOrderInArray = generateUniqueQuestionSet(5);
    questionOrderInArray.forEach(function(questionNum) {
      TempQuiz.questions.push(QuizBank.questions[questionNum]);
      // alert(questionOrderInArray);
      return 5;
    });
}

function runQuizModule() {
  numQuestions = initalizeTempQuiz();
  var currentQuestion = TempQuiz.currentQuestion;
  renderQuestion(TempQuiz, currentQuestion, $(".js-question-block"));

  // alert(TempQuiz.questions[0].question);
}

var numCorrect = function(TempQuiz){
  TempQuiz.currentCorrect++;
};

//render functions
var renderQuestion = function(TempQuiz, questionNumber, element){
  var question = TempQuiz.questions[questionNumber].question;
  var answer1 = TempQuiz.questions[questionNumber].answers[0];
  var answer2 = TempQuiz.questions[questionNumber].answers[1];
  var answer3 = TempQuiz.questions[questionNumber].answers[2];
  var answer4 = TempQuiz.questions[questionNumber].answers[3];

  var questionHTML  = `
  <div class="theQuestion">
    <h3 class = "question js-question">${question}</h3>
  </div>

  <div class="theAnswers">
    <input type="radio" class="radioAns js-radio1" name="answer" value="Answer 1"><span class ="answer-text js-answer-text">${answer1}</span><br>
    <input type="radio" class="radioAns js-radio2" name="answer" value="Answer 2"><span class ="answer-text js-answer-text">${answer2}</span><br>
    <input type="radio" class="radioAns js-radio3" name="answer" value="Answer 3"><span class ="answer-text js-answer-text">${answer3}</span><br>
    <input type="radio" class="radioAns js-radio4" name="answer" value="Answer 4"><span class ="answer-text js-answer-text">${answer4}</span><br>
  </div>
  `;
  element.html(questionHTML);
}

var renderAnswer = function(correct, correctAnswer) {
  alert("Correct: " + correct);
  alert(correctAnswer);

  var element = $(".js-response-correct");
  var correctHTML = `
  <h2 class="correct">You Answered Correctly!</h2>
  <p>The answer is: ${correctAnswer}</p>
  `;
  var incorrectHTML = `
  <h2 class="incorrect">You are WRONG!</h2>
  <p>The answer is: ${correctAnswer}</p>
  `;
  if(correct){
    element.html(correctHTML);
  } else {
    element.html(incorrectHTML);
  }
}

$(function(){

  //set up listeners

  $("#js-startButton").on('click', function(event){
    $(".js-question-body").toggleClass("hidden");
    $(".js-welcome-screen").toggleClass("hidden");
    $(".js-quiz-start").toggleClass("hidden");
    $(".js-quiz-progress").toggleClass("hidden");
    runQuizModule();
  });

  $(".js-submit-answer-button").on('click', function(event){
    event.preventDefault();
    var selectedOption = $("input:radio[name='answer']:checked").next("span").text();
    if (!selectedOption) {
      alert("you need to select and option");
    } else {
      TempQuiz.correctQuestion(selectedOption);
    }
  });

});

function generateUniqueQuestionSet(desiredUniqueQuestons) {
  uniqueSet = [];
  var i = 0;
  while(i < desiredUniqueQuestons) {
    var randQuestionNumber = Math.floor(Math.random()*QuizBank.questions.length);
    if(uniqueSet.indexOf(randQuestionNumber) == -1) {
      uniqueSet.push(randQuestionNumber);
      i++;
    }
  }
  return uniqueSet;
}
