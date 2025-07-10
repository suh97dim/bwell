$(document).ready(function () {

  $(".mask-phone").mask("+7 (999) 999-99-99");

  $("#see-more-test").click(function (e) {
    $(".lk-test:hidden").slice(0, 3).fadeIn();
    if ($("lk-test:hidden").length < 1) $(this).fadeOut();
  });

  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $(".burger-menu").toggleClass("active");
    $(".header-backdrop ").toggleClass("active");
    $("body ").toggleClass("not-scroll");
  });





  $(".qa-title").click(function () {
    if ($(".qa-title").is(":visible")) {
      $(".qa-details").slideUp(300);
      $(".qa-item").removeClass("active");
      $(".qa-details").css("opacity", "0");
    }
    if ($(this).next(".qa-details").is(":visible")) {
      $(this).next(".qa-details").slideUp(300);
      $(this).parent().removeClass("active");
      $(this).next(".qa-desc").css("opacity", "0");
    } else {
      $(this).next(".qa-details").slideDown(300);
      $(this).next(".qa-details").css("opacity", "1");
      $(this).parent().addClass("active");
    }
  });
});

const questions = [
  {
    question:
      "Столица испании?",
    answers: ["Берлин", "Париж", "Рим", "Мадрид"],
    correct: 3,
  },
  {
    question: "Сколько дней в неделе?",
    answers: ["7", "6", "7", "8"],
    correct: 0,
  },
  {
    question: "2 + 2 = ?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "1 + 1= ?",
    answers: ["1", "2", "5", "6"],
    correct: 1,
  },
];

let currentQuestion = 0;

let correctLengt = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  document.getElementById("modal-title").textContent =
    "Вопрос" + " " + (1 + currentQuestion);
  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";
  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.classList.add("answer");
    btn.textContent = answer;
    btn.onclick = () => handleAnswer(btn, i === q.correct);
    answersBox.appendChild(btn);
  });
}

function handleAnswer(button, isCorrect) {
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach((btn) => (btn.disabled = true));

  if (isCorrect) {
    button.classList.add("correct");
    correctLengt += 1;
    console.log(correctLengt);
  } else {
    button.classList.add("wrong");
    // Показать правильный вариант
    const q = questions[currentQuestion];
    buttons[q.correct].classList.add("correct");
  }

  setTimeout(() => {
    currentQuestion++;
    console.log(correctLengt, questions.length * 0.5);
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      if (correctLengt <= questions.length * 0.5) {
        // если ответить меньше половины
        document.getElementById("modal-title").textContent = "Тест завершен";
        document.getElementById(
          "quiz-box"
        ).innerHTML = `<span class="quiz-result">Вы ответили верно на ${correctLengt} вопросов из ${questions.length}.</span>
                      <span class="quiz-result-red">Попробуйте еще раз! </span>
                      <button class="btn btn-red mt-30 mx-a" type="button" data-bs-dismiss="modal" aria-label="Close">Продолжить</button>
                     `;
      }
      if (
        (correctLengt > questions.length * 0.5) &
        (correctLengt < questions.length)
      ) {
        // если ответить больше половины
        document.getElementById("modal-title").textContent = "Тест завершен";
        document.getElementById(
          "quiz-box"
        ).innerHTML = `<span class="quiz-result">Вы ответили верно на ${correctLengt} вопросов из ${questions.length}.</span>
                        <img src="img/prize-1.png" class="test-result__img" /> 
                      <span class="quiz-result-red">Ожидайте получения подарка – 50 руб. на счет мобильного телефона</span>
                      <button class="btn btn-red mt-30 mx-a" type="button" data-bs-dismiss="modal" aria-label="Close">Продолжить</button>
                     `;
      }
      if (correctLengt === questions.length) {
        // если ответить все
        document.getElementById("modal-title").textContent = "Тест завершен";
        document.getElementById(
          "quiz-box"
        ).innerHTML = `<span class="quiz-result">Вы ответили верно на ${correctLengt} вопросов из ${questions.length}.</span>
                        <img src="img/prize-2.png" class="test-result__img" /> 
                      <span class="quiz-result-red">Ожидайте получения подарка – 100 руб. на счет мобильного телефона</span>
                      <button class="btn btn-red mt-30 mx-a" type="button" data-bs-dismiss="modal" aria-label="Close">Продолжить</button>
                     `;
      }
    }
  }, 2000);
}

loadQuestion();

// img(src="upload/success/brest_main.png" alt="").img-fluid

$("#my-test, #my-payments").DataTable({
  ordering: false,
  bLengthChange: false,
  info: false,
  sDom: '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center d-flex justify-content-center"ip>>>',
  pageLength: 6,
  pagingType: "simple_numbers",
  language: {
    paginate: {
      previous:
        '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="19" fill="none" viewBox="0 0 11 19"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m9.5 17.42-8-7.894 8-7.895"/></svg>',
      next: '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="19" fill="none" viewBox="0 0 11 19"> <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m1.5 1.631 8 7.895-8 7.895"/></svg>',
    },
  },
});

var forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );
});
