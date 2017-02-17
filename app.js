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

            ],

  currentCorrect: 0
}

//State Modification functions
var numCorrect = function(Quiz){
  Quiz.currentCorrect++;
};

//render functions
var renderQuestion = function(Quiz, element){
  var questionHTML  = `
  <h1 class = "question js-question">${Quiz.questions[1].question}</h1>
  <input type="radio" class="radioAns js-radio1" name="answer" value="Answer 1"><span class ="answer-text js-answer-text">${Quiz.questions[1].answers[0]}</span><br>
  <input type="radio" class="radioAns js-radio2" name="answer" value="Answer 2"><span class ="answer-text js-answer-text">${Quiz.questions[1].answers[1]}</span><br>
  <input type="radio" class="radioAns js-radio3" name="answer" value="Answer 3"><span class ="answer-text js-answer-text">${Quiz.questions[1].answers[2]}</span><br>
  <input type="radio" class="radioAns js-radio4" name="answer" value="Answer 4"><span class ="answer-text js-answer-text">${Quiz.questions[1].answers[3]}</span><br>`;

  element.html(questionHTML);
}


$(function(){

  $(".js-question").text(Quiz.questions[0].question);

  $("#js-startButton").on('click', function(event){
    $(".js-question-body").toggleClass("hidden");
    $(".js-welcome-screen").toggleClass("hidden");
  });

  function loadNextQuestion(){
    renderQuestion(Quiz, $(".js-question-block"))
  }
  loadNextQuestion();
});
// alert(Quiz.questions[0].question);
// alert(Quiz.questions[0].correctAnswer);
