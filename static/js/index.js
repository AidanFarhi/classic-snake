
//---------- Global Constants & Variables ----------
// constants
const table = document.getElementById('grid-table')
const score = document.getElementById('score')
const num_rows = 30
const num_cols = 30
const new_position = {
    headRow: num_rows-1,
    headCol: 0,
    tailRow: num_rows-1,
    tailCol: 0 
}

// variables
let grid = []
let current_direction = 'UP'
let current_score = 0
let foodRow = new_position.headRow
let foodCol = new_position.headCol
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
    do {
        foodRow = Math.floor(Math.random() * num_rows)
        foodCol = Math.floor(Math.random() * num_cols)
    } while (grid[foodRow][foodCol] != 0)
    grid[foodRow][foodCol] = 2
}

function handleFoodEaten() {
    if (foodRow == new_position.headRow && foodCol == new_position.headCol) {
        current_score++
        placeFood()
        return true
    }
    return false
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
    if (current_direction == 'UP' && new_position.headRow !== 0) {
        grid[new_position.headRow-1][new_position.headCol] = 1
        new_position.headRow--
        if (!handleFoodEaten()) {
            grid[new_position.tailRow][new_position.tailCol] = 0
        }
        updateTable()
    } else if (current_direction == 'RIGHT' && new_position.headCol < num_cols - 1) {
        grid[new_position.headRow][new_position.col+1] = 1
        new_position.headCol++
        if (!handleFoodEaten()) {
            grid[new_position.tailRow][new_position.tailCol] = 0
        }
        updateTable()
    } else if (current_direction == 'DOWN' && new_position.headRow < num_rows - 1) {
        grid[new_position.headRow+1][new_position.headCol] = 1
        new_position.headRow++
        if (!handleFoodEaten()) {
            grid[new_position.tailRow][new_position.tailCol] = 0
        }
        updateTable()
    } else if (current_direction == 'LEFT' && new_position.headCol !== 0) {
        grid[new_position.headRow][new_position.headCol-1] = 1
        new_position.headCol--
        if (!handleFoodEaten()) {
            grid[new_position.tailRow][new_position.tailCol] = 0
        }
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
