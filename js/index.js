const win = document.getElementById('window');
const bar = document.getElementById('titlebar');

let dragging = false;
let startX = 0;
let startY = 0;
let x = 0;
let y = 0;

bar.addEventListener('mousedown', (e) => {
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
  if (!dragging) return;

  x += e.clientX - startX;
  y += e.clientY - startY;

  startX = e.clientX;
  startY = e.clientY;

  win.style.transform =
    `translate(-50%, -50%) translate(${x}px, ${y}px)`;
});

document.addEventListener('mouseup', () => {
  dragging = false;
});

/* just typing shi atp */