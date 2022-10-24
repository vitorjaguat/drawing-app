const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

//Fill the canvas with white background:
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

let size = 10;
let isPressed = false;
let color = 'black';
let x;
let y;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
} 

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

colorEl.addEventListener('input', (e) => color = e.target.value)

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

increaseBtn.addEventListener('click', () => {
    size++
    if(size > 50) {
        size = 50;
    }
    updateSizeOnScreen();
})

decreaseBtn.addEventListener('click', () => {
    size--
    if(size < 1) {
        size = 1;
    }
    updateSizeOnScreen();
})

clearEl.addEventListener('click', () => {
    //Clear canvas:
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Fill the canvas with white background:
    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
})


//Saving images:

window.onload = () => {
    const saveButton = document.getElementById('save');
    saveButton.addEventListener('click', () => save(canvas));
  };

function save(canvas) {
    const data = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'image.png';
    anchor.click();
  }


  //Input:
  const input = document.getElementById('input');
  const canvasContainer = document.getElementById('canvas-container');

  input.addEventListener('input', () => {
    const hanziEl = document.createElement('span');  
    hanziEl.innerHTML = input.value;
    hanziEl.classList.add('bg-hanzi');
    canvasContainer.prepend(hanziEl);
  })