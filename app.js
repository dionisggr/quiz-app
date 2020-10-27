// main object
const store = {
  questions: [
    {
      question: 'Which pop star burnt down her home gym with candles?',
      answers: [
        'Katy Perry',
        'Britney Spears',
        'Madonna',
        'Lady Gaga'
      ],
      correctAnswer: 'Britney Spears'
    },
    {
      question: 'In "Arrested Development", there’s always money where?',
      answers: [
        'Sofa',
        'Car dealership',
        'Bottom shoe drawer',
        'Banana stand'
      ],
      correctAnswer: 'Banana stand'
    },
    {
      question: 'What is Star Wars day?',
      answers: [
        'March 14th',
        'May 4th',
        'April 1st',
        'July 12'
      ],
      correctAnswer: 'May 4th'
    },
    {
      question: 'What is the answer to life, the universe and everything?',
      answers: [
        'Come on...',
        '1',
        '69',
        '42'
      ],
      correctAnswer: '42'
    },
    {
      question: 'What is the name of Han Solo’s ship?',
      answers: [
        'Century Hawk',
        'Gotham City',
        'Millenium Falcon',
        'Chewbacca'
      ],
      correctAnswer: 'Millenium Falcon'
    },
    {
      question: 'Never gonna give you up...',
      answers: [
        'Let the rains down in Africa',
        'YOLO',
        'Never gonna let you down...',
        'LOL'
      ],
      correctAnswer: 'Never gonna let you down'
    },
    {
      question: 'Who is the main character in "The Office"',
      answers: [
        'Stanley Hudson',
        'Michael Scott',
        'Walter White',
        'Morty Smith'
      ],
      correctAnswer: 'Michael Scott'
    },
    {
      question: 'SpongeBob created _____ in the episode “Frankendoodle”',
      answers: [
        'Sheldon J. Plankton',
        'SpongeGar',
        'DoodleBob',
        'Gary the Snail'
      ],
      correctAnswer: 'DoodleBob'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  correct: false,
  answered: false,
};

// Variables
let index = store.questionNumber;
let question = store.questions[index].question;
let answers = store.questions[index].answers;
let correctAnswer = store.questions[index].correctAnswer;

// Show start screen
function renderStart() {
  $('main').html(
    `<form class="start-form">
      <label">Are You Meme Enough???</label>
      <button type="submit">BEGIN</button>
    </form>`
  );
}

// Assign handler to start Submit
function handleStart() {
  $('.start-form').submit(function(evt) {
    evt.preventDefault();
    render();
  });
}

// Assign handler to question response
function handleAnswer() {
  $('main').on('submit', '.question-form', function(evt) {
    let selection = $('input:checked').val();
    (selection === correctAnswer) ? renderCorrect() : renderWrong();
  })
}

// Render correct answer page
function renderCorrect() {
  $('main').html(
    `<form class="next-question-form">
      <label for="next-question-label">CORRECT!</label>
      <button type="submit" class="continue">Continue</button>
      <div class=questions-counter>
        <label>Question ${index+1} of ${store.questions.length}</label>
        <label>${++store.score} out of ${index+1} correct</label>
      </div>
    </form>`
  )
}

// Render wrong answer page
function renderWrong() {
  $('main').html(
    `<form class="next-question-form">
      <label>Wrong T_T</label>
      <label>The correct answer is:</label>
      <label>${correctAnswer}</label>
      <button type="submit" class="continue">Continue</button>
      <div class=questions-counter>
        <label>Question ${index+1} of ${store.questions.length}</label>
        <label>${store.score} out of ${index+1} correct</label>
      </div>
    </form>`
  )
}

// Assign handler on Continue for next question
function handleNextQuestion() {
  $('main').on('submit', '.next-question-form', function(evt) {
    index++;
    try {
      question = store.questions[index].question;
      answers = store.questions[index].answers;
      correctAnswer = store.questions[index].correctAnswer;
      render();
    } catch(e) {
      renderFinish();
    }
  })
}

// Reset variables to begin game
function resetVariables() {
  store.questionNumber = 0;
  store.score = 0;
  index = store.questionNumber;
  question = store.questions[index].question;
  answers = store.questions[index].answers;
  correctAnswer = store.questions[index].correctAnswer;
  render();
}

// Show endgame screen
function renderFinish() {
  $('main').html(
    `<form id="finished-form">
      <label for="finished-label">YOU FINISHED!<div class = finished>
      <p>${store.score}/${store.questions.length} questions correct!</p></div></label>
      <button>Play again!</button>
    </form>`
  );
}

// Assign handler to Play Again submit
function handlePlayAgain() {
  $('main').on('submit', '#finished-form', evt => {
    resetVariables();
    renderStart();
  })
}

// Screen to show question
function render() {
  $('main').html(
    `<form class="question-form">
      <label>Pick an answer:</label>
      <div class = "group">
        <div class = "questionItem">
          <label>${question}</label>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[0]}" required>
          <label for="other">${answers[0]}</label></div>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[1]}">
          <label for="female">${answers[1]}</label></div>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[2]}">
          <label for="other">${answers[2]}</label></div>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[3]}">
          <label for="other">${answers[3]}</label></div>
        </div>
        <div class = tracker><button type="submit" class="question-submit">Submit</button></div>
      </div>
      <div class=questions-counter>
        <label>Question ${index+1} of ${store.questions.length}</label>
        <label>${store.score} out of ${index} correct</label>
      </div>
    </form>`
  )
}

//Main function
function main() {
  renderStart();
  handleStart();
  handleAnswer();
  handleNextQuestion();
  handlePlayAgain();
}

// Run
$(main);