setTimeout(() => {
    for(let i = 1; i<=2; i++) {
    const coin = document.createElement('div');
    coin.classList += "coin";
    coin.style.left = Math.random() * 99 + "%";
    coin.style.top = Math.random() * document.body.scrollHeight + "px";
    coin.addEventListener('click', () => {
        let currentCoins = localStorage.getItem("coins-collected")?localStorage.getItem("coins-collected"):0;
        localStorage.setItem("coins-collected", ++currentCoins);
        if(currentCoins == 1) {
            const speechBubble = document.createElement('p');
            speechBubble.innerHTML = "Congratulations! You just collected a coin. You can find more as you explore the website!";
            speechBubble.id = "speech-bubble";
            speechBubble.style.left = coin.style.left;
            speechBubble.style.top = (parseFloat(coin.style.top.substring(0, coin.style.top.indexOf('p'))) + 150) + "px";
            speechBubble.addEventListener('click', () => {
                speechBubble.parentNode.removeChild(speechBubble)
            })
            document.querySelector('body').appendChild(speechBubble);
        }
        const sound = new Audio();
        sound.src = "/media/sounds/coin.wav";
        sound.play();
        document.getElementById('coins-score').innerHTML = "Coins Collected: " + currentCoins;
        document.querySelector('body').removeChild(coin);
    })
    document.querySelector('body').appendChild(coin);
}
}, 20000)