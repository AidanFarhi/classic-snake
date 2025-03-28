
// Global constants
const num_rows = 30
const num_cols = 30
const grid = []

// Generate grid
for (let i = 0; i < num_rows; i++) {
    const row = []
    for (let j = 0; j < num_cols; j++) {
        row.push(0)
    }
    grid.push(row)
}

// Set the starting position (lower left)
grid[num_rows-1][0] = 1

// Get the <table> element
const table = document.getElementById('grid-table')

// Populate the table using the grid
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
