var numQuestionsInQuiz = 5;
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
                    "Sem Vergonha",
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
            welcomeScreen: 1,
            currentQuestion: 0,
            currentCorrect: 0,
            correctQuestion: function(answer) {
              var CorrectAnswer = this.questions[this.currentQuestion].correctAnswer;
              if(answer === CorrectAnswer) {
                renderAnswer(1, CorrectAnswer, 0);//correct
                this.currentCorrect++;
              } else {
                renderAnswer(0, CorrectAnswer, 0);//incorrect
              }
              renderNav($(".js-nav"));
              if(this.currentQuestion < this.questions.length) {
                this.currentQuestion++;//quix still running
              }
              if(this.currentQuestion === this.questions.length){
                renderAnswer("", CorrectAnswer, 1);//end of quiz
                $(".js-submit-answer-button").toggleClass("hidden");
              }
            }
};

//State Modification functions
function initalizeTempQuiz() {
  TempQuiz.questions = [];
  var questionOrderInArray = generateUniqueQuestionSet(numQuestionsInQuiz);
    questionOrderInArray.forEach(function(questionNum) {
      TempQuiz.questions.push(QuizBank.questions[questionNum]);
      TempQuiz.currentQuestion = 0;
      TempQuiz.currentCorrect = 0;
      return numQuestionsInQuiz;
    });
}

function runQuizModule() {
  numQuestions = initalizeTempQuiz();
  var currentQuestion = TempQuiz.currentQuestion;
  renderQuestion(TempQuiz, currentQuestion, $(".js-question-block"));
  renderNav($(".js-nav"));
  renderAnswer("", "", 0);
}

var numCorrect = function(TempQuiz){
  TempQuiz.currentCorrect++;
};

//render functions

var renderWelcomeScreen = function(element){
  var welcomeHTML = `
  <h1>Welcome to Wacky Quiz!</h1>
  <p>Click on "Start Quiz to test yourself on some really stupid subjects with ridiculous questions and equally absurd answers."</p>
  <p>You may repeat this Quiz as many times as you like if you are so inclined, but I recommend a good pint of ale and a Netflix session instead."</p>
  <h1>Good Luck!</h1>
  <div class="js-quiz-start">
    <button class="startButton" id="js-startButton" type="button" name="button">Start Quiz</button>
  </div>
  `;
  element.html(welcomeHTML);
  //set up listener for start button
  $("#js-startButton").on('click', function(event){
    $(".js-quiz-start").toggleClass("hidden");
    $(".js-response-correct").toggleClass("hidden");
    runQuizModule();
  });
}

var renderQuestion = function(TempQuiz, questionNumber, element){
  var question = TempQuiz.questions[questionNumber].question;
  var answer1 = TempQuiz.questions[questionNumber].answers[0];
  var answer2 = TempQuiz.questions[questionNumber].answers[1];
  var answer3 = TempQuiz.questions[questionNumber].answers[2];
  var answer4 = TempQuiz.questions[questionNumber].answers[3];

  var questionHTML  = `
  <form class="" action="index.html" method="post">
  <div class="theQuestion">
    <h3 class = "question js-question">${question}</h3>
  </div>

  <div class="theAnswers">
    <input type="radio" class="radioAns js-radio1" name="answer" value="Answer 1"><span class ="answer-text js-answer-text">${answer1}</span><br>
    <input type="radio" class="radioAns js-radio2" name="answer" value="Answer 2"><span class ="answer-text js-answer-text">${answer2}</span><br>
    <input type="radio" class="radioAns js-radio3" name="answer" value="Answer 3"><span class ="answer-text js-answer-text">${answer3}</span><br>
    <input type="radio" class="radioAns js-radio4" name="answer" value="Answer 4"><span class ="answer-text js-answer-text">${answer4}</span><br>
  </div>
  <div class="okButtonDiv"><button class="submit-answer-button js-submit-answer-button" type="submit" name="submit">Submit Answer</button></div>
  </form>
  `;
  element.html(questionHTML);
  //bind the event listeners
  $(".js-submit-answer-button").on('click', function(event){
    event.preventDefault();
    var btnText = $(".js-submit-answer-button").text();
    if(btnText == "Next >") {
      renderQuestion(TempQuiz, TempQuiz.currentQuestion, $(".js-question-block"));
    }
    var selectedOption = $("input:radio[name='answer']:checked").next("span").text();
    if (!selectedOption) {
      renderTheError("you need to select an option", $(".js-response-correct"));
    } else {
      $("input[type=radio]").attr("disabled", true);
      $(".js-submit-answer-button").html("Next &gt;");
      TempQuiz.correctQuestion(selectedOption);
    }
  });
  renderNav($(".js-nav"));
}

var renderAnswer = function(correct, correctAnswer, isEnd) {

  var element = $(".js-response-correct");
  var correctHTML = `
  <h2 class="correct">You Answered Correctly! <span class="black">The answer is: ${correctAnswer}</span></h2>
  <p></p>
  `;
  var incorrectHTML = `
  <h2 class="incorrect">You are WRONG!  <span class="black">The answer is: ${correctAnswer}</span></h2>
  `;
  var theEndHTML = `
  <h3>End of Quiz - You got ${TempQuiz.currentCorrect} of ${TempQuiz.questions.length} correct. <button class="repeat-quiz-button" id="js-repeat-quiz-button" type="button" name="button">Repeat Quiz</button></h3>
  `;

  if(isEnd) {
    if(correct) {
      element.html(`${correctHTML} ${theEndHTML}`);
    } else {
      element.html(`${incorrectHTML} ${theEndHTML}`);
    }

    $("#js-repeat-quiz-button").on('click', function(event){
      renderWelcomeScreen($(".js-question-block"));
      runQuizModule();
    });
  } else {
    if(correct){
      element.html(correctHTML);
    } else if(correct === 0){
      element.html(incorrectHTML);
    } else {
      element.html("<h3>Start of Quiz - Please Choose an answer.</h3>");
    }
  }
}

var renderTheError = function(errorMsg, element) {
  var errorHTML;
  var btnText = $(".js-submit-answer-button").text();
  if(btnText == "Submit Answer") {
    errorHTML = `<h2>Choose an answer</h2>`;
  } else {
    errorHTML = `<h2 class="incorrect">Are you Stupid</h2>
    <p>You have to choose an answer, Duh.</p>
    `;
  }
  element.html(errorHTML);
}

var renderNav = function(element) {
  var NavHTML = `
  <div class="js-quiz-progress">
    <span>question ${TempQuiz.currentQuestion + 1} of  ${TempQuiz.questions.length} - (${TempQuiz.currentCorrect} correct)</span>
  </div>  `;
  element.html(NavHTML);
}

var renderStartQuizButton = function(element) {
  startQuizHTML = `
  <div class="c">
    <button class="startButton" id="js-startButton" type="button" name="button">Start Quiz</button>
  </div>
  `;
  element.html(startQuizHTML);
}


$(function(){
  renderWelcomeScreen($(".js-question-block"));
});//Jquery Function



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
