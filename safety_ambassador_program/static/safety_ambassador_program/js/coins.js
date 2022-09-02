let currentCoins = 0;
const apiURL = "https://safety-ambassador-program.herokuapp.com/user/score";

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

document.addEventListener("DOMContentLoaded", () => {
  fetchScore();
});

const fetchScore = async () => {
  try {
    const response = await fetch(apiURL);
    const result = await response.json();
    document.getElementById("coins-score").innerHTML =
      "Digital Breadcrumbs Collected: " + result;
    currentCoins = result;
  } catch (err) {
    document.getElementById("coins-score").innerHTML =
      "Unable to fetch digital breadcrumbs! Try again later!";
  }
};

if (userIntroCompleted === "True") {
  setTimeout(() => {
    for (let i = 1; i <= 2; i++) {
      const coin = document.createElement("div");
      coin.classList += "coin";
      coin.style.left = Math.random() * 99 + "%";
      coin.style.top = Math.random() * document.body.scrollHeight + "px";
      coin.addEventListener("click", async () => {
        incrementScore(1);

        if (currentCoins == 1) {
          const speechBubble = document.createElement("p");
          speechBubble.innerHTML =
            "Congratulations! You just collected a digital breadcrumb. You can find more as you explore the website! <br> <i>Tip: Make sure to stay on a page for atleast 20 seconds</i>";
          speechBubble.id = "speech-bubble";
          speechBubble.style.left = coin.style.left;
          speechBubble.style.top =
            parseFloat(
              coin.style.top.substring(0, coin.style.top.indexOf("p"))
            ) +
            150 +
            "px";
          speechBubble.addEventListener("click", () => {
            speechBubble.parentNode.removeChild(speechBubble);
          });
          document.querySelector("body").appendChild(speechBubble);
        }
        const sound = new Audio();
        sound.src = "/media/sounds/coin.wav";
        sound.play();
        fetchScore(); //updates current score when someone picks up another digital breadcrumb
        document.querySelector("body").removeChild(coin);
      });
      document.querySelector("body").appendChild(coin);
    }
  }, 20000);
}

const incrementScore = async (addedPoints) => {
  console.log(addedPoints);
  const data = { points: addedPoints };
  const csrftoken = getCookie("csrftoken");
  try {
    const response = await fetch(apiURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return await result;
  } catch (err) {
    console.log(err);
  }
};
