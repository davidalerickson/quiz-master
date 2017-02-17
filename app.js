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

$(function(){
  $(".js-question").text(Quiz.questions[0].question);

  $("#js-startButton").on('click', function(event){
    $(".js-question-body").toggleClass("hidden");
    $(".js-welcome-screen").toggleClass("hidden");
  });
});
// alert(Quiz.questions[0].question);
// alert(Quiz.questions[0].correctAnswer);
