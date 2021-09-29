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
    const questionDiv = document.getElementById(question);
    const val = questionDiv.value;
    let correctAnswer = "";
    // if (val.length > 3 && val.length < 20) {
    //     document.getElementById("next-button").disabled = false;
    //     document.getElementById("invalid-input-msg").style.opacity = 0;
    // }
    // else {
    //     document.getElementById("invalid-input-msg").style.opacity = 1;
    //     document.getElementById("next-button").disabled = true;
    // }
    for (let i = 0; i < questionDiv.children.length; i++) {
        if (questionDiv.children[i].id == "correct-answer") {
            correctAnswer = questionDiv.children[i].innerHTML;
            break;
        }
    }
    if (val == correctAnswer) {
        document.getElementById("invalid-input-msg").style.opacity = 0;
        const carouselInner = document.getElementById("quiz-div").getElementsByClassName("carousel-inner")[0];
        for(let i = 1; i < 20; i++) {
            let confetti = document.createElement('div');
            confetti.className += "confetti";
            questionDiv.parentNode.insertBefore(confetti, questionDiv)
        }
    }
    // fix the wrong answer error and the archives page
    else {
        document.getElementById("invalid-input-msg").style.opacity = 1;
    }
    document.getElementById("next-button").disabled = false;
    document.getElementById(question).disabled = true;
}