var Quiz = {
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

//State Modification functions
var numCorrect = function(Quiz){
  Quiz.currentCorrect++;
};

//render functions
var renderQuestion = function(Quiz, questionNumber, element){
  var question = Quiz.questions[questionNumber].question;
  var answer1 = Quiz.questions[questionNumber].answers[0];
  var answer2 = Quiz.questions[questionNumber].answers[1];
  var answer3 = Quiz.questions[questionNumber].answers[2];
  var answer4 = Quiz.questions[questionNumber].answers[3];

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

TempQuiz = {};


var renderAnswer = function(Quiz, questionNumber, element) {
  var question = Quiz.questions[questionNumber].correctAnswer;


}

$(function(){

  $(".js-question").text(Quiz.questions[0].question);

  $("#js-startButton").on('click', function(event){
    $(".js-question-body").toggleClass("hidden");
    $(".js-welcome-screen").toggleClass("hidden");
    $(".js-quiz-start").toggleClass("hidden");
    $(".js-quiz-progress").toggleClass("hidden");
  });

  function loadNextQuestion(){
    varNextQuestion = Math.floor(Math.random()*Quiz.questions.length);
    renderQuestion(Quiz, varNextQuestion, $(".js-question-block"))
  }
  loadNextQuestion();
});

function generateUniqueQuestionSet(desiredUniqueQuestons) {
  uniqueSet = [];
  var i = 0;
  while(i < desiredUniqueQuestons) {
    var randQuestionNumber = Math.floor(Math.random()*Quiz.questions.length);
    if(uniqueSet.indexOf(randQuestionNumber) == -1) {
      uniqueSet.push(randQuestionNumber);
      i++;
    }
  }
  return uniqueSet;
}

alert(generateUniqueQuestionSet(5));
