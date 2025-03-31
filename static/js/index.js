
//---------- Global Constants & Variables ----------
const table = document.getElementById('grid-table')
const score = document.getElementById('score')
const num_rows = 30
const num_cols = 30
const position = {
    row: num_rows-1,
    col: 0
}
let grid = []
let current_direction = 'UP'
let current_score = 0
let foodRow = position.row
let foodCol = position.col
let dead = false
let invervalID = 0
//--------------------------------------------------

//----------------- Functions ---------------------
function populateGrid() {
    grid = new Array(num_rows).fill(0)
    grid.forEach((v, i) => grid[i] = new Array(num_cols).fill(0))
    grid[position.row][position.col] = 1
}

function placeFood() {
    foodRow = position.row
    foodCol = position.col
    while (foodRow == position.row && foodCol == position.col) {
        foodRow = Math.floor(Math.random() * num_rows)
        foodCol = Math.floor(Math.random() * num_cols)
    }
    grid[foodRow][foodCol] = 2
}

function checkIfFoodEaten() {
    if (foodRow == position.row && foodCol == position.col) {
        current_score++
        placeFood()
    }
}

function checkIfDead() {
    if (dead) {
        clearInterval(invervalID)
    }
}

function updateTable() {
    table.innerHTML = ''
    grid.forEach(row => {
        const tr = document.createElement('tr')
        row.forEach(cell => {
            const td = document.createElement('td')
            if (cell == 1) {
                td.classList.add('snake-cell')
            } else if (cell == 2) {
                td.classList.add('food-cell')
            }
            tr.appendChild(td)
        })
        table.appendChild(tr)
    })
}

function updateScore() {
    score.innerHTML = `Score: ${current_score}`
}

function movePosition() {
    if (current_direction == 'UP' && position.row !== 0) {
        grid[position.row][position.col] = 0
        grid[position.row-1][position.col] = 1
        position.row--
        checkIfFoodEaten()
        updateTable()
    } else if (current_direction == 'RIGHT' && position.col < num_cols - 1) {
        grid[position.row][position.col] = 0
        grid[position.row][position.col+1] = 1
        position.col++
        checkIfFoodEaten()
        updateTable()
    } else if (current_direction == 'DOWN' && position.row < num_rows - 1) {
        grid[position.row][position.col] = 0
        grid[position.row+1][position.col] = 1
        position.row++
        checkIfFoodEaten()
        updateTable()
    } else if (current_direction == 'LEFT' && position.col !== 0) {
        grid[position.row][position.col] = 0
        grid[position.row][position.col-1] = 1
        position.col--
        checkIfFoodEaten()
        updateTable()
    } else {
        dead = true
    }
}
//--------------------------------------------------

//----------------- Event Listeners ----------------
document.addEventListener('keydown', event => {
    if (event.key === 'w') {
        current_direction = 'UP'
    } else if (event.key === 'd') {
        current_direction = 'RIGHT'
    } else if (event.key === 's') {
        current_direction = 'DOWN'
    } else if (event.key === 'a') {
        current_direction = 'LEFT'
    }
})
//--------------------------------------------------

function main() {
    populateGrid()
    placeFood()
    updateTable()
    invervalID = setInterval(() => {
        movePosition()
        updateScore()
        checkIfDead()
    }, 100)
}

main()
