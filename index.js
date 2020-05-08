// question database
const STORE = [
    {
        question: 'What does # stand for in music theory?',
        answers: [
          'hashtag',
          'pound sign',
          'sharp',
          'flat'
        ],
        correctAnswer:
          'sharp'
      },
      {
        question: 'What is the opposite of crescendo?',
        answers: [
          'fortissimo',
          'poco',
          'loco',
          'diminuendo'
        ],
        correctAnswer:
          'diminuendo'
      },
      {
        question: 'A dotted half note is equal to how many quarter notes?',
        answers: [
          '4',
          '3',
          '2',
          '1'
        ],
        correctAnswer:
          '3'
      },
      {
        question: 'What is the musical term used to denote differences in volume?',
        answers: [
          'dynamics',
          'harmony',
          'resonance',
          'loudness'
        ],
        correctAnswer:
          'dynamics'
      },
      {
        question: 'Which scale is the only scale that does not use sharps or flats?',
        answers: [
          'G major',
          'F major',
          'D major',
          'C major'
        ],
        correctAnswer:
          'C major'
      },
];

//variables to store quiz score and question number 
let score = 0;
let questionNumber = 0;

//function to generate questions
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createForm(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments value of the "score" variable by one and updates it
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the "question number" variable by one and updates it
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables and updates it
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.quizScore').text(0);
  $('.questionNumber').text(0);
}

//start the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
function submitAnswer() {
  $('.containerBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createForm(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//feedback for correct answer and updates score
function correctAnswer() {
  $('.response').html(
    `<h1>You got it right!</h1>
    <p class="sizeMe">Great job!</p>
      <button type="button" class="nextButton button">Next</button>`);
  updateScore();
}

//feedback if wrong answer is selected
function wrongAnswer() {
  $('.response').html(
    `<h1>Not quite...</h1>
    <p class="sizeMe">The correct answer was:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//creates next question
function nextQuestion() {
  $('.containerBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//gives final score + feedback when done with quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!',
    'Wow! You must be the next Mozart!'
  ];

  const good = [
    'Good, but not great.',
    'Maybe you will get there one day...'
  ];

  const bad = [
    'That wasn\'t so great...',
    'Do you even know what music is?'
  ];

  if (score >= 4) {
    array = great;
  } else if (score === 3) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 5</h3>
        <p class="sizeMe">${array[1]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//restart the quiz
function restartQuiz() {
  $('.containerBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//run the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);

