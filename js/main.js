let $ = s => document.querySelector(s)

let count = 0

function clicked(box) {
    if (count === 0 || count % 2 ===0) {
        box.innerHTML = 'X'
    } else {
        box.innerHTML = 'O'
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