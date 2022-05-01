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

function clicked(box) {
    if (count === 0 || count % 2 ===0) {
        box.innerHTML = 'X'
    } else {
        box.innerHTML = 'O'
    }
    if (checkWin()) {
        console.log('winner')
        endGame()
    }
    count++
}

let boxes = document.querySelectorAll('.box')
boxes = Array.from(boxes)
boxes.forEach(box => {
    box.addEventListener('click', function() {
        if (!box.innerHTML) {
            clicked(box)
        }
    })
})

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

// function gameOn() {
//     let gameOn = true
//     while (gameOn) {
//         checkWin()
//     }
// }
