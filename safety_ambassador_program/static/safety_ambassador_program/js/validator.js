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
    const questionDiv = document.querySelector('#correct-answer');
    if (inputValue == correctAnswer) {
        document.getElementById("invalid-input-msg").style.opacity = 0;
        const carouselInner = document.getElementById("quiz-div").getElementsByClassName("carousel-inner")[0];
        for(let i = 1; i < 20; i++) {
            let confetti = document.createElement('div');
            confetti.className += "confetti";
            questionParent.parentNode.insertBefore(confetti, questionParent);
        }
    }
    // fix the wrong answer error and the archives page
    else {
        console.log(questionParent.parentNode)
        questionParent.parentNode.querySelector('#invalid-input-msg').style.opacity = 1;
    }
    document.getElementById("next-button").disabled = false;
    questionParent.parentNode.querySelector('select').disabled = true;
}