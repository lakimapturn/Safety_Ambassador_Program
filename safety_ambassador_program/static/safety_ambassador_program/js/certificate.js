const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const nameInput = "Laksh Makhija"

function displayTextWidth(text, font) {
    let canvas1 = displayTextWidth.canvas1 || (displayTextWidth.canvas1 = document.createElement("canvas"));
    let context = canvas1.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
    }

canvas.addEventListener('click', () => {
    
})

function downloadCertificate(button) {
    button.href = canvas.toDataURL();
    button.download = true;
}

const image = new Image();
image.src = "/media/files/certificate.png"; //give the file source here
image.onload = () => {
    drawImage();
}

function drawImage() {
    console.log(nameInput)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = '50px monotype corsiva';
    ctx.fillStyle = '#000';
    ctx.fillText(nameInput, (canvas.width - displayTextWidth(nameInput, ctx.font))/2, 400); // 2nd and 3rd arguments are x and y values 
}