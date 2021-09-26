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
    const val = document.getElementById(question).value;
    // if (val.length > 3 && val.length < 20) {
    //     document.getElementById("next-button").disabled = false;
    //     document.getElementById("invalid-input-msg").style.opacity = 0;
    // }
    // else {
    //     document.getElementById("invalid-input-msg").style.opacity = 1;
    //     document.getElementById("next-button").disabled = true;
    // }
    console.log(val);
    if (val == document.getElementById("correct-answer").value) {
        document.getElementById("invalid-input-msg").style.opacity = 0;
        console.log("here!")
    }
    else {
        document.getElementById("invalid-input-msg").style.opacity = 1;
    }
    document.getElementById("next-button").disabled = false;
    document.getElementById(question).disabled = true;
}