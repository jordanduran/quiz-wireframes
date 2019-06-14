const myQuestions = [
    {
      question:
        "How many muscles do you have in total in all your fingers combined?",
      answers: ["None", "Ten", "Twenty-two", "Twenty"],
      correct: 0
    }
  ];
  
  let score = 0;
  let current = 0;
  function startQuiz() {
    $(".start-button").click(function() {
      $(".start-quiz").hide();
      $(".next").hide();
      $(".questions").show();
      displayQuestion();
      $(".score").text("Current Score: " + score);
      console.log("Start Quiz button clicked");
    });
  }
  function handleNextButton() {
    $(".next-button").click(function(event) {
      console.log("Next button clicked");
      displayQuestion();
      $(".next").hide();
      $("#feedback").empty();
    });
  }
  function handleSubmitButton() {
    $("ul.list").on("submit", ".submit-button", function(event) {
      event.preventDefault();
      console.log("Form submitted");
      let userAnswer = $("input[name=answer]:checked", ".submit-button").val();
      console.log(userAnswer);
      checkAnswer(userAnswer);
      $(".submit-button").hide();
      $(".next").show();
    });
  }
  function handleRetakeButton() {
    $(".retake-button").click(function() {
      location.reload();
      console.log("Restart button clicked");
    });
  }
  $(document).ready(function() {
    // Create an event listener to listen for a click on the Start Quiz button
    startQuiz();
    handleNextButton();
    handleSubmitButton();
    handleRetakeButton();
  });
  
  //***************FUNCTIONS**************
  function displayQuestion() {
    $(".question-number").text("Question Number: " + (current + 1) + "/10");
    if (current < myQuestions.length) {
      let listQuestion = myQuestions[current];
      $("h2").text(listQuestion.question);
      $("ul.list").html("");
      $("ul.list").append('<form class="submit-button">');
      for (let i = 0; i < listQuestion.answers.length; i++) {
        $(".submit-button").append(
          '<div><label id = "' +
            i +
            '">' +
            listQuestion.answers[i] +
            `</label><input type="radio" name="answer" value="${i}" checked></div>`
        );
      }
      $(".submit-button").append('<input type="submit" value="Check Answer"/>');
  
      $("ul.list").append("</form>");
    } else {
      // show summary that says how many you got correct
      displayScore();
    }
  }
  
  // Checks answer from the array to see if the one chosen is the one that is correct
  function checkAnswer(answer) {
    let listQuestion = myQuestions[current];
    if (listQuestion.correct == answer) {
      score++;
      $("#feedback").html("<p>You got it right!</p>");
    } else {
      $("#feedback").html(
        `<p>Sorry, wrong answer!</p><p>Correct answer: ${
          listQuestion.answers[listQuestion.correct]
        }</p>`
      );
    }
    $(".score").text("Current Score: " + score);
    current++;
  }
  
  //Display score
  function displayScore() {
    $(".questions").hide();
    $(".end-quiz").show();
    $(".end-score").text("Your score is: " + score + "/10");
    if (score >= 0) {
      $(".comment").text("Thanks for playing!");
    }
  }
  
  function createQuiz() {
    startQuiz();
    handleNextButton();
    handleSubmitButton();
    handleRetakeButton();
  }
  