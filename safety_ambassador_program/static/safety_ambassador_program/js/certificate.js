const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const nameInput = ""; //enter name of request.user

canvas.addEventListener('click', () => {
    location.href = canvas.toDataURL();
})

const image = new Image();
image.src = ""; //give the file source here
image.onload = () => {
    drawImage();
}

function drawImage() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = '30px';
    ctx.fillText(nameInput, 0, 0); // 2nd and 3rd arguments are x and y values 
}