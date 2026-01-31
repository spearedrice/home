const mainWindow = document.getElementById('window');
const mainBar = document.getElementById('titlebar');

let zIndex = 1;

function drag(win, bar) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;

  bar.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    win.style.zIndex = ++zIndex;
  });

  document.addEventListener('mousemove', e => {
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
}

drag(mainWindow, mainBar);

function spawnChildWindow(page) {
  const win = document.createElement('div');
  win.className = 'child-window window';
  win.style.zIndex = ++zIndex;

  const bar = document.createElement('div');
  bar.className = 'titlebar';

  const title = document.createElement('span');
  title.textContent = page;

  const close = document.createElement('button');
  close.className = 'close';
  close.textContent = '×';
  close.onclick = () => win.remove();

  bar.appendChild(title);
  bar.appendChild(close);

  const content = document.createElement('div');
  content.className = 'content';
  content.textContent = 'loading...';

  win.appendChild(bar);
  win.appendChild(content);
  document.body.appendChild(win);

  drag(win, bar);

  fetch(`children/${page}.html`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
    });
}

document.querySelectorAll('.navbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    spawnChildWindow(btn.dataset.page);
  });
});
