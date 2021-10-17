document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('quiz-div');

    carousel.addEventListener('slid.bs.carousel', function () {
        const item = document.getElementsByClassName("carousel-item active");
        if (item[0].getElementsByClassName("section-questions")[0] != undefined) {
            document.getElementById("next-button").disabled = true;
        }
    })
})

function verifyAnswer(question) {
    const questionParent = question.parentNode.querySelector('select');
    const correctAnswer = questionParent.querySelector('#correct-answer').value;
    const inputValue = questionParent.value;

    if (inputValue == correctAnswer) {
        document.getElementById("invalid-input-msg").style.opacity = 0;
        const sound = new Audio();
        sound.src = "/media/sounds/applause.wav";
        sound.play();
        if (questionParent.parentNode.getElementsByClassName('confetti')) {
            for(let i = 1; i < 20; i++) {
                let confetti = document.createElement('div');
                confetti.className += "confetti";
                confetti.style.left = Math.random() * 99 + "%";
                confetti.style.animationDelay = Math.random() * 4 + 's';
                questionParent.parentNode.insertBefore(confetti, questionParent);
            }
        }
        let correctMsg = document.createElement('div');
        correctMsg.className += "alert alert-success";
        correctMsg.innerHTML = "Correct Answer!";
        questionParent.parentNode.appendChild(correctMsg);
    }
    else {
        questionParent.parentNode.querySelector('#invalid-input-msg').style.opacity = 1;
    }
    question.disabled = true;
    document.getElementById("next-button").disabled = false;
    questionParent.parentNode.querySelector('select').disabled = true;
}

// Working patch request
// const data = { section: 'We', answer: 'a' };
// fetch('http://localhost:8000/student-responses', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-CSRFToken': csrftoken,
//   },
//   body: JSON.stringify(data),
// })
// .then((response) => response.json())
// .then((data) => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });