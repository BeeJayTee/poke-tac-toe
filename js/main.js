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
let popUp = $('.popUp')
let screen = $('.screen')
let board = $('.board')
var xName = ''
var oName = ''
var xPictureUrl = ''
var oPictureUrl = ''

// all the boxes
let boxes = document.querySelectorAll('.box')
boxes = Array.from(boxes)

// set original heading
let heading = $('.heading')
heading.innerText = "Welcome, please enter pokemon names to beginPoops"

// color variables for X and O
const xColor = '#d4db04'
const oColor = '#b802a2'

// game functionality
function clicked(box) {
    if (count === 0 || count % 2 ===0) {
        box.style.background = `url(${xPictureUrl})`
        box.style[`background-size`] = 'cover'
    } else if (count % 2 === 1 && count !== 9) {
        box.style.background = `url(${oPictureUrl})`
        box.style[`background-size`] = 'cover'
    }
    if (checkWin()) {
        console.log('winner')
        endGame()
        return
    }
    count++
    if (!checkWin() && count === 9) {
        console.log('tie')
        endGame()
        return
    }
    console.log(count)
    changeHeading()
}

// check if a player has won
function checkWin() {
    if (box1.style.background && box1.style.background === box2.style.background && box1.style.background === box3.style.background) {
        return true
    } else if (box4.style.background && box4.style.background === box5.style.background && box4.style.background === box6.style.background) {
        return true
    } else if (box7.style.background && box7.style.background === box8.style.background && box7.style.background === box9.style.background) {
        return true
    } else if (box1.style.background && box1.style.background === box5.style.background && box1.style.background === box9.style.background) {
        return true
    } else if (box3.style.background && box3.style.background === box5.style.background && box3.style.background === box7.style.background) {
        return true
    }
}

// change the heading
function changeHeading() {
    if (count === 0 || count % 2 === 0) {
        heading.innerText = `${xName}'s Turn`
    } else {
        heading.innerText = `${oName}'s Turn`
    }
}

// end game 
function endGame() {
    if (count % 2 === 0) {
        heading.innerText = `${xName} Wins`
    } else if (count % 2 === 1 && count !== 9) {
        heading.innerText = `${oName} Wins`
    } else if (count === 9) {
        heading.innerText = "It's a tie!"
    }
    board.style.filter = 'blur(100px)'
    screen.style.display = 'block'
    popUp.style.display = 'block'
    popUp.addEventListener('click', clearBoxes)
    console.log('game over')
}

// clear boxes
function clearBoxes() {
    board.style.filter = 'blur(0)'
    popUp.style.display = 'none'
    screen.style.display = 'none'
    heading.innerText = `${xName}'s Turn`
    count = 0
    box1.style.background = '' 
    box2.style.background = '' 
    box3.style.background = '' 
    box4.style.background = '' 
    box5.style.background = '' 
    box6.style.background = '' 
    box7.style.background = '' 
    box8.style.background = '' 
    box9.style.background = '' 
    count = 0
}


// getting the pokemon for each user
var player1Value = ''
$('#player1Submit').addEventListener('click', function() {
    player1Value = $('#player1Input').value
    fetch(`https://pokeapi.co/api/v2/pokemon/${player1Value}`)
        .then(response=>response.json())
        .then(data => {
            if (data.name) {
                $('.player1Container h2').innerText = data.name
                $('.player1Container h2').style.visibility = 'visible'
                $('.player1Container form').style.visibility = 'hidden'
                xPictureUrl = data.sprites.other['official-artwork'].front_default
                $('.player1Container img').setAttribute('src', xPictureUrl)
                xName = data.name
            }
            if ($('.player1Container form').style.visibility === 'hidden' && $('.player2Container form').style.visibility === 'hidden') {
                changeHeading()
            }
        })
        .catch(err=>console.log(err))
})
$('#player1Input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        player1Value = $('#player1Input').value
        fetch(`https://pokeapi.co/api/v2/pokemon/${player1Value}`)
            .then(response=>response.json())
            .then(data => {
                if (data.name) {
                    $('.player1Container h2').innerText = data.name
                    $('.player1Container h2').style.visibility = 'visible'
                    $('.player1Container form').style.visibility = 'hidden'
                    xPictureUrl = data.sprites.other['official-artwork'].front_default
                    $('.player1Container img').setAttribute('src', xPictureUrl)
                    xName = data.name
                }
                if ($('.player1Container form').style.visibility === 'hidden' && $('.player2Container form').style.visibility === 'hidden') {
                    changeHeading()
                }
            })
            .catch(err=>console.log(err))
    }
})
$('#player2Submit').addEventListener('click', function() {
    player2Value = $('#player2Input').value
    fetch(`https://pokeapi.co/api/v2/pokemon/${player2Value}`)
        .then(response=>response.json())
        .then(data => {
            if (data.name) {
                $('.player2Container h2').innerText = data.name
                $('.player2Container h2').style.visibility = 'visible'
                $('.player2Container form').style.visibility = 'hidden'
                oPictureUrl = data.sprites.other['official-artwork'].front_default
                $('.player2Container img').setAttribute('src', oPictureUrl)
                oName = data.name
            }
            if ($('.player1Container form').style.visibility === 'hidden' && $('.player2Container form').style.visibility === 'hidden') {
                changeHeading()
            }
        })
        .catch(err=>console.log(err))
})
$('#player2Input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        player1Value = $('#player2Input').value
        fetch(`https://pokeapi.co/api/v2/pokemon/${player2Value}`)
            .then(response=>response.json())
            .then(data => {
                if (data.name) {
                    $('.player2Container h2').innerText = data.name
                    $('.player2Container h2').style.visibility = 'visible'
                    $('.player2Container form').style.visibility = 'hidden'
                    oPictureUrl = data.sprites.other['official-artwork'].front_default
                    $('.player2Container img').setAttribute('src', oPictureUrl)
                    oName = data.name
                }
                if ($('.player1Container form').style.visibility === 'hidden' && $('.player2Container form').style.visibility === 'hidden') {
                    changeHeading()
                }
            })
            .catch(err=>console.log(err))
    }
})

// check to see if both pokemon names exist
function namesExist() {
    return (xName !== '' && oName !== '')
}






// main game
boxes.forEach(box => {
    box.addEventListener('click', function() {
        if (!box.innerHTML && namesExist()) {
            clicked(box)
        }
    })
})