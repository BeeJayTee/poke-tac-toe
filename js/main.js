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
// color variables for X and O
const xColor = '#FF0000'
const oColor = '#3B4CCA'

// all the boxes
let boxes = document.querySelectorAll('.box')
boxes = Array.from(boxes)

// set original heading
let heading = $('.heading')
heading.innerText = "Welcome, please enter pokemon names to begin"



// on box clixk
function clicked(box) {
    if (count === 0 || count % 2 ===0) {
        box.style['background-color'] = xColor
        box.style['background-image'] = `url(${xPictureUrl})`
        box.style[`background-size`] = 'cover'
        box.style['-moz-box-shadow'] = 'inset 0 0 10px #000000'
        box.style['-webkit-box-shadow'] = 'inset 0 0 10px #000000'
        box.style['box-shadow'] = 'inset 0 0 10px #000000'
    } else if (count % 2 === 1 && count !== 9) {
        box.style['background-color'] = oColor
        box.style['background-image'] = `url(${oPictureUrl})`
        box.style[`background-size`] = 'cover'
        box.style['-moz-box-shadow'] = 'inset 0 0 10px #000000'
        box.style['-webkit-box-shadow'] = 'inset 0 0 10px #000000'
        box.style['box-shadow'] = 'inset 0 0 10px #000000'
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
    if (box1.style['background-image'] && box1.style['background-image'] === box2.style['background-image'] && box1.style['background-image'] === box3.style['background-image']) {
        return true
    } else if (box4.style['background-image'] && box4.style['background-image'] === box5.style['background-image'] && box4.style['background-image'] === box6.style['background-image']) {
        return true
    } else if (box7.style['background-image'] && box7.style['background-image'] === box8.style['background-image'] && box7.style['background-image'] === box9.style['background-image']) {
        return true
    } else if (box1.style['background-image'] && box1.style['background-image'] === box5.style['background-image'] && box1.style['background-image'] === box9.style['background-image']) {
        return true
    } else if (box3.style['background-image'] && box3.style['background-image'] === box5.style['background-image'] && box3.style['background-image'] === box7.style['background-image']) {
        return true
    } else if (box1.style['background-image'] && box1.style['background-image'] === box4.style['background-image'] && box1.style['background-image'] === box7.style['background-image']) {
        return true
    } else if (box2.style['background-image'] && box2.style['background-image'] === box5.style['background-image'] && box2.style['background-image'] === box8.style['background-image']) {
        return true
    } else if (box3.style['background-image'] && box3.style['background-image'] === box6.style['background-image'] && box3.style['background-image'] === box9.style['background-image']) {
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
    boxes.forEach(box => {
        box.style['-moz-box-shadow'] = 'none'
        box.style['-webkit-box-shadow'] = 'none'
        box.style['box-shadow'] = 'none'
    }) 
    count = 0
}


// getting the pokemon for each user
var player1Value = ''
$('#player1Submit').addEventListener('click', function() {
    player1Value = $('#player1Input').value
    fetch(`https://pokeapi.co/api/v2/pokemon/${player1Value.toLowerCase()}`)
        .then(response=>response.json())
        .then(data => {
            console.log(data)
            if (data.name) {
                $('.player1Container h2').innerText = data.name
                $('.player1Container h2').style.visibility = 'visible'
                $('.player1Container h2').style.color = xColor
                $('.player1Container form').style.display = 'none'
                xPictureUrl = data.sprites.other['official-artwork'].front_default
                $('.player1Container img').setAttribute('src', xPictureUrl)
                xName = data.name
            }
            if ($('.player1Container img').getAttribute('src') && $('.player2Container img').getAttribute('src')) {
                changeHeading()
            }
        })
        .catch(err=> {
            $('.player1Container h2').innerText = 'Pokemon does not exist'
            $('.player1Container h2').style.visibility = 'visible'
        })
})
$('#player1Input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        player1Value = $('#player1Input').value
        fetch(`https://pokeapi.co/api/v2/pokemon/${player1Value.toLowerCase()}`)
            .then(response=>response.json())
            .then(data => {
                if (data.name) {
                    $('.player1Container h2').innerText = data.name
                    $('.player1Container h2').style.visibility = 'visible'
                    $('.player1Container h2').style.color = xColor
                    $('.player1Container form').style.display = 'none'
                    xPictureUrl = data.sprites.other['official-artwork'].front_default
                    $('.player1Container img').setAttribute('src', xPictureUrl)
                    xName = data.name
                }
                if ($('.player1Container img').getAttribute('src') && $('.player2Container img').getAttribute('src')) {
                    changeHeading()
                }
            })
            .catch(err=> {
                $('.player1Container h2').innerText = 'Pokemon does not exist'
                $('.player1Container h2').style.visibility = 'visible'
            })
    }
})
$('#player2Submit').addEventListener('click', function() {
    player2Value = $('#player2Input').value
    fetch(`https://pokeapi.co/api/v2/pokemon/${player2Value.toLowerCase()}`)
        .then(response=>response.json())
        .then(data => {
            if (data.name) {
                $('.player2Container h2').innerText = data.name
                $('.player2Container h2').style.visibility = 'visible'
                $('.player2Container h2').style.color = oColor
                $('.player2Container form').style.display = 'none'
                oPictureUrl = data.sprites.other['official-artwork'].front_default
                $('.player2Container img').setAttribute('src', oPictureUrl)
                oName = data.name
            }
            if ($('.player1Container img').getAttribute('src') && $('.player2Container img').getAttribute('src')) {
                changeHeading()
            }
        })
        .catch(err=> {
            $('.player2Container h2').innerText = 'Pokemon does not exist'
            $('.player2Container h2').style.visibility = 'visible'
        })
})
$('#player2Input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        player2Value = $('#player2Input').value
        fetch(`https://pokeapi.co/api/v2/pokemon/${player2Value.toLowerCase()}`)
            .then(response=>response.json())
            .then(data => {
                if (data.name) {
                    $('.player2Container h2').innerText = data.name
                    $('.player2Container h2').style.visibility = 'visible'
                    $('.player2Container h2').style.color = oColor
                    $('.player2Container form').style.display = 'none'
                    oPictureUrl = data.sprites.other['official-artwork'].front_default
                    $('.player2Container img').setAttribute('src', oPictureUrl)
                    oName = data.name
                }
                if ($('.player1Container img').getAttribute('src') && $('.player2Container img').getAttribute('src')) {
                    changeHeading()
                }
            })
            .catch(err=> {
                $('.player2Container h2').innerText = 'Pokemon does not exist'
                $('.player2Container h2').style.visibility = 'visible'
            })
    }
})

// check to see if both pokemon names exist
function namesExist() {
    return (xName !== '' && oName !== '')
}






// main game
boxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        if (namesExist() && !box.style['background-image']) {
            box.style['-moz-box-shadow'] = 'inset 0 0 10px #000000'
            box.style['-webkit-box-shadow'] = 'inset 0 0 10px #000000'
            box.style['box-shadow'] = 'inset 0 0 10px #000000'
            box.style.cursor = 'crosshair';
        }
    })
    box.addEventListener('mouseleave', function() {
        if (namesExist() && !box.style['background-image']) {
            box.style['-moz-box-shadow'] = 'none'
            box.style['-webkit-box-shadow'] = 'none'
            box.style['box-shadow'] = 'none'
            box.style.cursor = 'default';
        }
    })
    box.addEventListener('mouseover', function() {
        if (box.style['background-image']) {
            box.style.cursor = 'default';
        }
    })
    box.addEventListener('click', function() {
        if (!box.style['background-image'] && namesExist()) {
            clicked(box)
        }
    })
})