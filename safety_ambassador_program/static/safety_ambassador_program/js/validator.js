document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('quiz-div');

    carousel.addEventListener('slid.bs.carousel', function () {
        const item = document.getElementsByClassName("carousel-item active");
        if (item[0].className.replace('carousel-item active', '').localeCompare('') != 0) {
            fetchData(item[0].className.replace('carousel-item active', '').trim()); //fetching data from the API
        }
        if (item[0].getElementsByClassName("section-questions")[0] != undefined) {
            document.getElementById("next-button").disabled = true;
        }
    })
})

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function addConfetti(questionParent) {
    if (questionParent.parentNode.getElementsByClassName('confetti')) {
        for(let i = 1; i < 20; i++) {
            let confetti = document.createElement('div');
            confetti.className += "confetti";
            confetti.style.left = Math.random() * 99 + "%";
            confetti.style.animationDelay = Math.random() * 4 + 's';
            questionParent.parentNode.insertBefore(confetti, questionParent);
        }
    }
}

function verifyAnswer(question) {
    const questionParent = question.parentNode.querySelector('select');
    const correctAnswer = questionParent.querySelector('#correct-answer').value;
    const inputValue = questionParent.value;

    if (inputValue == correctAnswer) {
        document.getElementById("invalid-input-msg").style.opacity = 0;
        const sound = new Audio();
        sound.src = "/media/sounds/applause.wav";
        sound.play();
        this.addConfetti(questionParent);
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
    this.sendUserResponse(questionParent.id, inputValue.charAt(0));
}

const fetchData = async (section) => {
    let digitalSection = section.substring(0, 2);
    digitalSection = digitalSection.replace(section[0], section[0].toUpperCase());
    const result = await fetch(window.location.href + 'student-responses?section=' + digitalSection);
    const response = await result.json();
    await drawChart(section, response[0]);
}
// Working patch request
function sendUserResponse(questionSection, studentResponse) {
    const data = { section: questionSection, answer: studentResponse };
    const csrftoken = getCookie('csrftoken');
    fetch(window.location.href+'student-responses', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
    // console.log('Success:', data);
    console.log("Success!")
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

const drawChart = (section, userData) => {
    let ctx = document.getElementById(section).getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Option A', 'Option B', 'Option C', 'Option D'],
            datasets: [{
                label: 'Student Responses - Digital ' + section,
                data: [userData.a, userData.b, userData.c, userData.d],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                hoverBorderWidth: 2.5,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}