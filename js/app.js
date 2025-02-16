document.addEventListener("DOMContentLoaded", () => {
    const restartbtn = document.getElementById("restart-btn");
    const startbtn = document.getElementById("start-btn");
    const score = document.getElementById("score");
    const result = document.getElementById("result-container");
    const nextbtn = document.getElementById("next-btn");
    const quelist = document.getElementById("choices-list");
    const que = document.getElementById("question-text");
    const quecont = document.getElementById("question-container");
  
    const question = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
      },
      {
        question: "Who wrote 'Hamlet'?",
        choices: [
          "Charles Dickens",
          "Jane Austen",
          "William Shakespeare",
          "Mark Twain",
        ],
        answer: "William Shakespeare",
      },
    ];
  
    let total = 0;
    let index = 0;
  
    startbtn.addEventListener("click", () => {
      startquiz();
    });
  
    function startquiz() {
      startbtn.classList.add("hidden");
      quecont.classList.remove("hidden");
      result.classList.add("hidden");
      showque();
    }
  
    restartbtn.addEventListener("click", () => {
      index = 0;
      total = 0;
      result.classList.add("hidden");
      startquiz();
    });
  
    nextbtn.addEventListener("click", () => {
      index++;
      if (index < question.length) {
        showque();
      } else {
        showresult();
      }
    });
  
    function showresult() {
      quecont.classList.add("hidden");
      result.classList.remove("hidden");
      score.innerHTML = `${total} out of ${question.length}`;
    }
  
    function showque() {
      nextbtn.classList.add("hidden");
      que.textContent = question[index].question;
      quelist.innerHTML = "";
      question[index].choices.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => {
          selectans(option);
        });
  
        quelist.appendChild(li);
      });
      const li = document.createElement("li");
      li.innerHTML = ``;
    }
  
    function selectans(choice) {
      const correctans = question[index].answer;
      if (correctans == choice) {
        total++;
      }
  
      nextbtn.classList.remove("hidden");
    }
  });
  