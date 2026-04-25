let currentQuestion = 0;
let scores = { karna: 0, arjuna: 0, krishna: 0 };

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");
const shareBtn = document.getElementById("shareBtn");

function loadQuestion() {
  const q = questions[currentQuestion];
  quiz.innerHTML = `<h2>${q.question}</h2>`;

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;

    btn.onclick = () => {
      scores[answer.type]++;
      nextQuestion();
    };

    quiz.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quiz.classList.add("hidden");
  nextBtn.classList.add("hidden");

  const winner = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const result = resultsData[winner];

  resultDiv.innerHTML = `
    <h2>You are ${result.name}</h2>
    <p>${result.desc}</p>
  `;

  resultDiv.classList.remove("hidden");
  shareBtn.classList.remove("hidden");
}

shareBtn.onclick = () => {
  const text = resultDiv.innerText;
  navigator.share
    ? navigator.share({ title: "My Result", text })
    : alert("Copy this:\n" + text);
};

loadQuestion();