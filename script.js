const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

let selectedHanzi = '';

const ctx = canvas.getContext('2d');
const mql = window.matchMedia("(max-width: 600px)");
// console.log(mql);
if(mql.matches) {
    ctx.canvas.height = 320;
    ctx.canvas.width = 320;
    canvasContainer.style.width = '320px';
    canvasContainer.style.height = '320px';
} else {
    ctx.canvas.height = 500;
    ctx.canvas.width = 500;
}
// mql.addListener(function(e){
//   if(e.matches){
//     console.log('enter mobile');
//   }
//   else{
//     console.log('leave mobile');
//   }
// });
// ctx.canvas.height = 320;
// ctx.canvas.width = 320;
console.log(ctx);

// Fill the canvas with white background:
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

let size = 6;
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
    //setting up canvas2
    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    const mql2 = window.matchMedia("(max-width: 600px)");

    if(mql2.matches) {
    ctx2.canvas.height = 320;
    ctx2.canvas.width = 320;
    // canvasContainer.style.width = '320px';
    // canvasContainer.style.height = '320px';
} else {
    ctx2.canvas.height = 500;
    ctx2.canvas.width = 500;
}

    //ctx2.drawImage(can1, 0, 0) // paint first canvas onto new canvas
    ctx2.drawImage(canvas, 0, 0);

    //ctx.clearRect(0, 0, width, height) // clear first canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //set up white BG:
    const canvasBG = document.createElement('canvas');
    const ctxBG = canvasBG.getContext('2d');
    const mql3 = window.matchMedia("(max-width: 600px)");

    if(mql3.matches) {
    ctxBG.canvas.height = 320;
    ctxBG.canvas.width = 320;
    // canvasContainer.style.width = '320px';
    // canvasContainer.style.height = '320px';
} else {
    ctxBG.canvas.height = 500;
    ctxBG.canvas.width = 500;
}

    ctxBG.fillStyle = "white";
    ctxBG.fillRect(0, 0, ctxBG.canvas.width, ctxBG.canvas.height);

    //ctx.drawImage(background, 0, 0) // draw bg-image on first canvas
    ctx.drawImage(canvasBG, 0, 0);

    //draw hanzi text layer (Not ready)
    const canvasHZ = document.createElement('canvas');
    const ctxHZ = canvasHZ.getContext('2d');
    const mql4 = window.matchMedia("(max-width: 600px)");

    if(mql4.matches) {
    ctxHZ.canvas.height = 320;
    ctxHZ.canvas.width = 320;
    // canvasContainer.style.width = '320px';
    // canvasContainer.style.height = '320px';
} else {
    ctxHZ.canvas.height = 500;
    ctxHZ.canvas.width = 500;
}
    ctxHZ.fillStyle = "#f0f0f0";
    console.log(ctxHZ)
    ctxHZ.textBaseline = 'middle';
    ctxHZ.textAlign = "center";
    ctxHZ.font = "50vh Bishunziti";
//     let f = new FontFace("Bishunziti", "url('fonts/bishunziti.ttf')");
//     f.load().then(() => {
//         console.log(f)
//         ctxHZ.font = `normal 90px ${f.family}`;
// });
    // ctxHZ.strokeText(selectedHanzi, ctxHZ.canvas.width/2, ctxHZ.canvas.height/2, 2);
    ctxHZ.fillText(selectedHanzi, ctxHZ.canvas.width/2, ctxHZ.canvas.height/2);
    // ctx.fillText(selectedHanzi, 150, 150)
    ctx.drawImage(canvasHZ, 0, 0);
    ctxHZ.clearRect(0, 0, ctxHZ.canvas.width, ctxHZ.canvas.height);
    
    
    //ctx.drawImage(can2, 0, 0) // draw the (saved) first canvas back to itself
    ctx.drawImage(canvas2, 0, 0);

    //Saving canvas:
    const data = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'image.png';
    anchor.click();

    //Restoring canvas:
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(canvas2, 0, 0);
  }

  

  //Input:
  const input = document.getElementById('input');
  const submitBtn = document.getElementById('submit');
  const form = document.getElementById('form');
  
  function showHanziBG(hanzi) {
    if(canvasContainer.querySelector('.bg-hanzi')) {
        canvasContainer.querySelector('.bg-hanzi').remove();
    }
    const hanziEl = document.createElement('span');  
    hanziEl.innerHTML = hanzi;
    hanziEl.classList.add('bg-hanzi');
    canvasContainer.prepend(hanziEl);
    selectedHanzi = hanzi;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    showHanziBG(input.value);
  })
  

  //Choose-hanzi from lateral
  const hanziDisplay = document.querySelectorAll('.hanzi-display span');

  hanziDisplay.forEach(hanzi => hanzi.addEventListener('click', () => {
      const hanziToBG = hanzi.textContent;
      showHanziBG(hanziToBG);
  }))

  //////Touch

  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
        };
    }

  // Set up touch events for mobile, etc
    let mousePos = { x: 0, y: 0 };

    canvas.addEventListener("touchstart",  function (e) {
        mousePos = getTouchPos(canvas, e);
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", function (e) {
        const mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);
    
    canvas.addEventListener("touchmove", function (e) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    // Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchend", function (e) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchmove", function (e) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, { passive: false });