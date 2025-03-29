
//--------------- Global Constants ----------------
const table = document.getElementById('grid-table')
const num_rows = 30
const num_cols = 30
const grid = []
const position = {
    row: num_rows-1,
    col: 0
}
//--------------------------------------------------

//----------------- Functions ---------------------
function populateGrid() {
    for (let i = 0; i < num_rows; i++) {
        const row = []
        for (let j = 0; j < num_cols; j++) {
            row.push(0)
        }
        grid.push(row)
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
            }
            tr.appendChild(td)
        })
        table.appendChild(tr)
    })
}
//--------------------------------------------------

//----------------- Event Listeners ----------------
document.addEventListener('keydown', event => {
    if (event.key === 'w') {
        grid[position.row][position.col] = 0
        grid[position.row-1][position.col] = 1
        position.row--
        updateTable()
    } else if (event.key === 'd') {
        grid[position.row][position.col] = 0
        grid[position.row][position.col+1] = 1
        position.col++
        updateTable()
    } else if (event.key === 's') {
        grid[position.row][position.col] = 0
        grid[position.row+1][position.col] = 1
        position.row++
        updateTable()
    } else if (event.key === 'a') {
        grid[position.row][position.col] = 0
        grid[position.row][position.col-1] = 1
        position.col--
        updateTable()
    }
})
//--------------------------------------------------

function main() {
    populateGrid()
    grid[position.row][position.col] = 1
    updateTable()
}

main()
