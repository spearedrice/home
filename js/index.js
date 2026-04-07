let z = 10;

const mainWin = document.getElementById("main-window");
const mainBar = document.getElementById("main-titlebar");

function centerMainWindow() {
    mainWin.style.left = "50%";
    mainWin.style.top = "50%";
    mainWin.style.transform = "translate(-50%, -50%)";
}
centerMainWindow();

mainBar.onmousedown = e => {
    let r = mainWin.getBoundingClientRect();
    mainWin.style.left = r.left + "px";
    mainWin.style.top = r.top + "px";
    mainWin.style.transform = "none";
    let sx = e.clientX - r.left;
    let sy = e.clientY - r.top;
    mainWin.style.zIndex = ++z;

    let drag = true;
    const move = ev => { if (!drag) return; mainWin.style.left = (ev.clientX - sx) + "px"; mainWin.style.top = (ev.clientY - sy) + "px"; };
    const up = () => { drag = false; document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};

document.querySelectorAll(".navbtn").forEach(btn => {
    btn.onclick = () => openChild(btn.dataset.page);
});

function openChild(page) {
    let existing = document.getElementById(page);
    if (existing) {
        existing.style.display = "block";
        existing.style.zIndex = ++z;
        return;
    }

    let w = document.createElement("div");
    w.className = "child-window";
    w.id = page;
    w.style.left = (180 + Math.random() * 160) + "px";
    w.style.top = (100 + Math.random() * 140) + "px";
    w.style.zIndex = ++z;

    w.innerHTML = `
        <div class="child-titlebar">
            ${page}
            <button class="closebtn">×</button>
        </div>
        <iframe src="children/${page}.html"></iframe>
    `;

    document.body.appendChild(w);

    let tb = w.querySelector(".child-titlebar");
    let dragging = false, dx = 0, dy = 0;

    tb.onmousedown = e => {
        dragging = true;
        dx = e.clientX - w.offsetLeft;
        dy = e.clientY - w.offsetTop;
        w.style.zIndex = ++z;

        const move = ev => { if (!dragging) return; w.style.left = (ev.clientX - dx) + "px"; w.style.top = (ev.clientY - dy) + "px"; };
        const up = () => { dragging = false; document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    };

    w.querySelector(".closebtn").onclick = () => w.style.display = "none";
}

window.copyAddress = function(text) {
    navigator.clipboard.writeText(text);
    const popup = document.getElementById("copy-popup");
    popup.style.opacity = 1;
    setTimeout(() => popup.style.opacity = 0, 1200);
};