let $ = s => document.querySelector(s)
let box1 = $('.box1')
let box2 = $('.box2')
let box3 = $('.box3')
let box4 = $('.box4')
let box5 = $('.box5')
let box6 = $('.box6')
let box7 = $('.box7')
let box8 = $('.box8')
let box9 = $('.box9')
let count = 0

// set original heading
let heading = $('.heading')
heading.innerText = "X's Turn"

// color variables for X and O
const xColor = '#d4db04'
const oColor = '#b802a2'

// game functionality
function clicked(box) {
    if (count === 0 || count % 2 ===0) {
        box.innerHTML = 'X'
        box.style.background = xColor
    } else {
        box.innerHTML = 'O'
        box.style.background = oColor
    }
    if (checkWin()) {
        console.log('winner')
        endGame()
        return
    }
    count++
    console.log(count)
    changeHeading()
}

// event listeners for boxes
let boxes = document.querySelectorAll('.box')
boxes = Array.from(boxes)
boxes.forEach(box => {
    box.addEventListener('click', function() {
        if (!box.innerHTML) {
            clicked(box)
        }
    })
})

// check if a player has won
function checkWin() {
    if (box1.innerHTML && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML) {
        return true
    } else if (box4.innerHTML && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML) {
        return true
    } else if (box7.innerHTML && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML) {
        return true
    } else if (box1.innerHTML && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML) {
        return true
    } else if (box3.innerHTML && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML) {
        return true
    }
}

// change the heading
function changeHeading() {
    if (count === 0 || count % 2 === 0) {
        heading.innerText = "X's Turn"
    } else {
        heading.innerText = "Y's Turn"
    }
}

// end game 
function endGame() {
    if (count % 2 === 0) {
        alert('X wins')
    } else {
        alert('Y wins')
    }
    console.log('game over')
    count = 0
    clearBoxes()
}

// clear boxes
function clearBoxes() {
    box1.innerHTML = '' 
    box2.innerHTML = '' 
    box3.innerHTML = '' 
    box4.innerHTML = '' 
    box5.innerHTML = '' 
    box6.innerHTML = '' 
    box7.innerHTML = '' 
    box8.innerHTML = '' 
    box9.innerHTML = '' 
    box1.style.background = 'blue'
    box2.style.background = 'blue'
    box3.style.background = 'blue'
    box4.style.background = 'blue'
    box5.style.background = 'blue'
    box6.style.background = 'blue'
    box7.style.background = 'blue'
    box8.style.background = 'blue'
    box9.style.background = 'blue'
    count = 0
}