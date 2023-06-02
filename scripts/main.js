const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 60
canvas.height = 500

ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)

let draw_color = "black"
let draw_width = 2
let is_drawing = false

const undo_array = []
let index = -1

canvas.addEventListener('touchstart',start)
canvas.addEventListener('touchmove',draw)
canvas.addEventListener('mousedown',start)
canvas.addEventListener('mousemove',draw)
canvas.addEventListener('touchend',stop)
canvas.addEventListener('mouseup',stop)
canvas.addEventListener('mouseout',stop)

function start(event){
    is_drawing = true

    ctx.beginPath()
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    event.preventDefault()
}

function draw(event){
    if(is_drawing){
        ctx.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop)
        ctx.strokeStyle = draw_color
        ctx.lineWidth = draw_width
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.stroke()
    }
    event.preventDefault()
}

function stop(event){
    if(is_drawing){
        ctx.stroke()
        ctx.closePath()
        is_drawing = false
    }
    event.preventDefault()

    if(event.type != 'mouseout'){
        undo_array.push(ctx.getImageData(0,0,canvas.width,canvas.height))
        index+=1
    }

}

function change_color(element){
    draw_color = element.style.background
    console.log(element.style.background)
}

document.querySelector('#clear').addEventListener('click',clear)

function clear(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        undo_array.length = 0
        index = -1
}

document.querySelector('#undo').addEventListener('click',()=>{
    if(index <= 0){
        clear()
    }
    else{
        index-=1
        undo_array.pop()
        ctx.putImageData(undo_array[index],0,0)
    }
}
)