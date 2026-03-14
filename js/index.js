let win=document.getElementById("window")
let bar=document.getElementById("titlebar")

let offsetX=0
let offsetY=0
let drag=false

bar.onmousedown=e=>{
drag=true
offsetX=e.clientX-win.offsetLeft
offsetY=e.clientY-win.offsetTop
}

document.onmouseup=()=>drag=false

document.onmousemove=e=>{
if(!drag)return
win.style.left=e.clientX-offsetX+"px"
win.style.top=e.clientY-offsetY+"px"
win.style.transform="none"
}

document.querySelectorAll(".navbtn").forEach(btn=>{
btn.onclick=()=>{
openChild(btn.dataset.page)
}
})

function openChild(page){

let existing=document.getElementById(page+"Win")
if(existing){
existing.style.display="block"
return
}

fetch("children/"+page+".html")
.then(r=>r.text())
.then(html=>{

let div=document.createElement("div")
div.className="child-window"
div.id=page+"Win"
div.style.left=150+Math.random()*200+"px"
div.style.top=120+Math.random()*160+"px"
div.innerHTML=html

document.body.appendChild(div)

let t=div.querySelector(".child-titlebar")

let dx=0,dy=0,d=false

t.onmousedown=e=>{
d=true
dx=e.clientX-div.offsetLeft
dy=e.clientY-div.offsetTop
}

document.onmousemove=e=>{
if(!d)return
div.style.left=e.clientX-dx+"px"
div.style.top=e.clientY-dy+"px"
}

document.onmouseup=()=>d=false

div.querySelector(".closebtn").onclick=()=>{
div.style.display="none"
}

})

}

function copyAddress(id){
let text=document.getElementById(id).innerText
navigator.clipboard.writeText(text)

let p=document.getElementById("copy-popup")
p.style.opacity=1
setTimeout(()=>p.style.opacity=0,1200)
}