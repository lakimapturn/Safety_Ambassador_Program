let timer = 0;

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("quiz-div");

  if (currentSlideNumber && currentSlideNumber === 0)
    document.getElementById("prev-button").disabled = true;
  else document.getElementById("prev-button").disabled = false;

  carousel.addEventListener("slid.bs.carousel", function () {
    const item = document.getElementsByClassName("carousel-item active");
    if (
      item[0].className.replace("carousel-item active", "").localeCompare("") !=
      0
    ) {
      // checks for canvas class name
      fetchData(item[0].className.replace("carousel-item active", "").trim()); //fetching data from the API
    }

    const currentSlideNumber = localStorage.getItem("current-slide");

    questionDiv = item[0].getElementsByClassName("section-questions")
      ? item[0].getElementsByClassName("section-questions")[0]
      : null;

    if (
      (questionDiv && !questionDiv.querySelector(".form-select").disabled) ||
      parseInt(currentSlideNumber) === carouselLength - 1
    ) {
      document.getElementById("next-button").disabled = true;
    } else {
      document.getElementById("next-button").disabled = false;
    }
  });
});

// function to get the csrf token and enable us to send api requests safely
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function startTimer() {
  setInterval(() => timer++, 1000);
}

function resetTimer() {
  timer = 0;
}

// function to add confetti to the section-questions div
function addConfetti(questionParent) {
  if (questionParent.parentNode.getElementsByClassName("confetti")) {
    for (let i = 1; i < 20; i++) {
      let confetti = document.createElement("div");
      confetti.className += "confetti";
      confetti.style.left = Math.random() * 99 + "%";
      confetti.style.animationDelay = Math.random() * 4 + "s";
      questionParent.parentNode.insertBefore(confetti, questionParent);
    }
  }
}

function verifyAnswer(question) {
  const questionParent = question.parentNode.querySelector("select");
  const correctAnswer = questionParent.querySelector("#correct-answer").value;
  const inputValue = questionParent.value;
  const outputMsg = questionParent.parentNode.querySelector("#output-msg");
  outputMsg.style.opacity = 1;
  outputMsg.style.setProperty("height", "100%", "important");

  if (inputValue == correctAnswer) {
    try {
      incrementScore(100 - Math.min(30, timer) * 3); // score decreases by 3 every second
    } catch (err) {
      console.log(err);
    }
    resetTimer();
    outputMsg.className =
      "alert " + outputMsg.className.replace("alert-danger", "alert-success");
    outputMsg.innerHTML = "<b>Correct!</b>" + outputMsg.innerHTML;
    const sound = new Audio();
    sound.src = "/media/sounds/applause.wav";
    sound.play();
    this.addConfetti(questionParent);
  } else {
    outputMsg.innerHTML = "<b>Oops!</b>" + outputMsg.innerHTML;
  }
  question.disabled = true;
  document.getElementById("next-button").disabled = false;
  questionParent.parentNode.querySelector("select").disabled = true;
  this.sendUserResponse(questionParent.id, inputValue.charAt(0), studentGrade);
}

const fetchData = async (section) => {
  let digitalSection = section.substring(0, 2);
  digitalSection = digitalSection.replace(section[0], section[0].toUpperCase());

  let response = {};
  try {
    const result = await fetch(
      window.location.href +
        "user/responses?section=" +
        digitalSection +
        "&grade=" +
        studentGrade
    );
    response = await result.json();
  } catch (err) {
    console.log("Error: " + err);
  }
  await drawChart(section, response[0]);
};

// Sending request to the API to update response data
function sendUserResponse(questionSection, studentResponse, studentGrade) {
  const data = {
    section: questionSection,
    answer: studentResponse,
    grade: studentGrade,
  };
  const csrftoken = getCookie("csrftoken");
  fetch(window.location.href + `user/responses`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data);
      console.log("Success!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const drawChart = (section, userData) => {
  let ctx = document.getElementById(section).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Option A", "Option B", "Option C", "Option D"],
      datasets: [
        {
          label: "Student Responses - Digital " + section,
          data: [userData.a, userData.b, userData.c, userData.d],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          hoverBorderWidth: 2.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
