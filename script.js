// main object
const store={
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
        'What?',
        '42',
        '1',
        '69'
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
        'LOL',
        'Never gonna let you down...'
      ],
      correctAnswer: 'Never gonna let you down'
    },
    {
      question: 'Who is the main character in "The Office"',
      answers: [
        'Stanley Hudson',
        'Michael Scott',
        'Walter White',
        'Creed Bratton'
      ],
      correctAnswer: 'Michael Scott'
    },
    {
      question: 'SpongeBob created _____ in the episode “Frankendoodle”',
      answers: [
        'DoodleBob',
        'SpongeGar',
        'Sheldon J. Plankton',
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
let index=store.questionNumber;
let question=store.questions[index].question;
let answers=store.questions[index].answers;
let correctAnswer=store.questions[index].correctAnswer;

// Show start screen
function renderStart() {
  $('main').empty();
  $('main').append(
    `<form class="start-form">
      <h3>Meme Enough?</h3>
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
    let selection=$('input:checked').val();
    (selection === correctAnswer) ? renderCorrect() : renderWrong();
  })
}

// Render correct answer page
function renderCorrect() {
  $('main').html(
    `<form class="next-question-form">
      <label class="correct">CORRECT!</label>
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
      <label class="wrong">Wrong T_T</label>
      <label class="wrong-extra">The correct answer is:</label>
      <label class="wrong-extra">${correctAnswer}</label>
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
      question=store.questions[index].question;
      answers=store.questions[index].answers;
      correctAnswer=store.questions[index].correctAnswer;
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
      <label for="finished-label">YOU FINISHED!<div class=finished>
      <p>${store.score}/${store.questions.length} questions correct!</p></div></label>
      <button>Play again!</button>
    </form>`
  );
}

// Assign handler to Play Again submit
function handlePlayAgain() {
  $('main').on('submit', '#finished-form', () => {
    resetVariables();
    renderStart();
  })
}

// Background as separate image to manage gradient
function renderBackground() {
  $('html').append(
    `<div class="background">
      <img src="/img/background2.jpg" alt="background" />
    </div>`
  );
}

function renderHeader() {
  $('main').before(
    `<header>
      <h1>Quiz App: Meme Generation</h1>
    </header>`
  );
}

function handleHeader() {
  $('header h1').on('click', function () {
    renderStart();
  });
}

function renderFooter() {
  $('main').after(
    `<footer id="footer">
      <div class='icons'>
        <a href="mailto:dionisggr@gmail.com"
          target="_blank"
          rel='noreferrer'
          aria-label="email"
        >
          <i class="fa fa-envelope"
            aria-hidden="true">
          </i>
        </a>

        <a href="https://github.com/dionisggr/spaced-repetition/"
          target="_blank"
          rel='noreferrer'
          aria-label="github"
        > 
          <i
            class="fa fa-github"
            aria-hidden="true">
          </i>
        </a>

        <a href="https://www.linkedin.com/in/dionis-gonzalez-ramirez/"
          target="_blank"
          rel='noreferrer'
          aria-label="linked-in"
        > 
          <i
            class="fa fa-linkedin-square"
            aria-hidden="true">
          </i>
        </a>
      </div>
      
      <h2>&copy; Dionis Gonzalez</h2>
    </footer>`
  );
}

// Screen to show question
function render() {
  $('main').html(
    `<form class="question-form">
      <label>Pick an answer:</label>
      <div class="group">
        <div class="question-item">
          <label>${question}</label>
          <ul>
            <li>
              <input type="radio" id="answer_1" name="answer" value="${answers[0]}" required>
              <label for="answer_1">${answers[0]}</label>
            </li>
            <li>
              <input type="radio" id="answer_2" name="answer" value="${answers[1]}">
              <label for="answer_2">${answers[1]}</label>
            </li>
            <li>
              <input type="radio" id="answer_3" name="answer" value="${answers[2]}">
              <label for="answer_3">${answers[2]}</label>
            </li>
            <li>
              <input type="radio" id="answer_4" name="answer" value="${answers[3]}">
              <label for="answer_4">${answers[3]}</label>
            </li>
          </ul>
        </div>
      </div>
      <button type="submit" class="question-submit">Submit</button>
      <div class=questions-counter>
        <label>Question ${index+1} of ${store.questions.length}</label>
        <label>${store.score} out of ${index} correct</label>
      </div>
    </form>`
  )
}

//Main function
function main() {
  renderBackground();
  renderHeader();
  renderStart();
  renderFooter();
  handleHeader();
  handleStart();
  handleAnswer();
  handleNextQuestion();
  handlePlayAgain();
}

// Run
$(main);