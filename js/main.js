
var intro_table = d3.select('#intro-magic-square')
              .append('table')
               .attr('id', 'intro-magic-square-grid')
              .append('tbody');

draw3x3MagicSquare(intro_table, 'intro', 1, 3, 5)


// The function takes 3 variables:
//    table_element: the table element that the grid will go into (might change
//        this to parent element and append table inside function?).
//    grid_short_name: A short name for the specific grid so that each cell can
//        be given a unique ID.
//    n: The number of rows or columns you want in the grid (i.e. it will
//        draw a nxn grid).
// Returns:
//    Draws an n x n grid.
function drawSquareGrid(table_element, grid_short_name, n) {
  var table = table_element,
      grid_name_text = grid_short_name + '-'
      row_num = 0;

  for (var i = 0; i < n; i++) {
    var row = table.append('tr'),
        col_num = 0;

    for (var j = 0; j < n; j++) {
      row.append('td')
         .attr('id', grid_name_text + 'r' + row_num + 'c' + col_num)
         .text('')

      col_num++;
    }

    row_num++;
  }
}


// The function uses an already existing 3x3 grid and uses the Lucas's formula
// (https://en.wikipedia.org/wiki/Magic_square#Specific_methods_of_construction)
// to insert numbers into the cells such that it becomes a magic square.
// The function takes in 5 variables:
//    table_element: for the drawSquareGrid function (see above).
//    square_name: for the drawSquareGrid function (see above).
//    a: an integer that's greater than 0.
//    b: an integer that's greater than a.
//    c: an integer such that (c - a) > b
// Conditions aren't checked here (yet), but the other one is b != 2a
// Returns:
//    Inserts numbers into empty table cells according to the forumla.
function draw3x3MagicSquare(table_element, square_name, a, b, c) {
  // Draw square grid (extra row + col is for totals)
  drawSquareGrid(table_element, square_name, 5);

  // Dictionary that will be used to apply formula to determine each cell's number
  const cell_mapping = {
    'r1c1': c - b,
    'r1c2': c + (a + b),
    'r1c3': c - a,
    'r2c1': c - (a - b),
    'r2c2': c,
    'r2c3': c + (a - b),
    'r3c1': c + a,
    'r3c2': c - (a + b),
    'r3c3': c + b
  }

  // Dictionary that will be used to add classes for border CSS changes to
  // totals row (remove/lighten some borders, basically)
  const totals_cells = {
    'r0c0': 'top-left',
    'r0c1': 'center-top',
    'r0c2': 'center-top',
    'r0c3': 'center-top',
    'r0c4': 'top-right',
    'r1c0': 'center-left',
    'r2c0': 'center-left',
    'r3c0': 'center-left',
    'r1c4': 'center-right',
    'r2c4': 'center-right',
    'r3c4': 'center-right',
    'r4c0': 'bottom-left',
    'r4c1': 'center-bottom',
    'r4c2': 'center-bottom',
    'r4c3': 'center-bottom',
    'r4c4': 'bottom-right'
  }

  const totals_cells_keys = Object.keys(totals_cells);

  var name = square_name + '-';
      row_num = 1;

  for (var i = 0; i < 3; i++) {
    var col_num = 1;

    for (var j = 0; j < 3; j++) {
      var cell_id = 'r' + row_num + 'c' + col_num;
      d3.select('#' + name + cell_id)
        .text(cell_mapping[cell_id]);

      col_num++;
    }

    row_num++;
  }

  // Iterate through keys and apply classes to each selected cell
  for (i = 0; i < totals_cells_keys.length; i++) {
    var cell_id = totals_cells_keys[i]

    d3.select('#' + name + cell_id)
      .attr('class', 'totals-' + totals_cells[cell_id]);
  }

}

// Function that validates the three numbers (a, b, c) entered in order to draw the 3x3
// magic square. The function is called everytime a number is entered into any
// of the fields.
// (It assumes that a is the first number entered. So if you enter b and c
// first, and enter an invalid a for those b and c, then it will show b and c
// as invalid - for now, still need to decide which way I wanna go with that).
function validateMagicSquareVariables() {
  const a_input = document.getElementById('intro-ms-a-input')
  const b_input = document.getElementById('intro-ms-b-input')
  const c_input = document.getElementById('intro-ms-c-input')

  const a_selector = d3.select('#intro-ms-a-input')
  const b_selector = d3.select('#intro-ms-b-input')
  const c_selector = d3.select('#intro-ms-c-input')

  const a_value = Number(a_input.value)
  const b_value = Number(b_input.value)
  const c_value = Number(c_input.value)

  // If only a value is entered, show green outline after number entered, otherwise
  // go back to default
  if (a_value > 0) {
    a_selector.classed('input-failed', false)
    a_selector.classed('input-accepted', true)
  } else {
    a_selector.classed('input-accepted', false)
    a_selector.classed('input-failed', true)
  }

  // If both a and b are entered, we can validate b.
  if (a_value && b_value) {
    if ((b_value > a_value) && (b_value !== 2 * a_value)) {
      b_selector.classed('input-failed', false)    // If the previous outcome didn't go through, remove the failed tag
      b_selector.classed('input-accepted', true)
    } else {
      b_selector.classed('input-accepted', false)  // Same as above, but for accepted tag
      b_selector.classed('input-failed', true)
    }
  }

  // If both a, b, and c are entered, we can validate c.
  if (a_value && b_value && c_value) {
    if ((c_value - a_value) > b_value) {
      c_selector.classed('input-failed', false)
      c_selector.classed('input-accepted', true)
    } else {
      c_selector.classed('input-accepted', false)
      c_selector.classed('input-failed', true)
    }
  }

  // If there is no number typed in, go back to default input focus and
  // default border
  if (!a_value) {
    a_selector.classed('input-accepted', false)
    a_selector.classed('input-failed', false)
  }

  if (!b_value) {
    b_selector.classed('input-accepted', false)
    b_selector.classed('input-failed', false)
  }

  if (!c_value) {
    c_selector.classed('input-accepted', false)
    c_selector.classed('input-failed', false)
  }
}


var animation_is_on = false;  // Boolean that keeps in check whether animation is called
const totals_cells_3x3 = ['r0c4', 'r1c4', 'r2c4', 'r3c4', 'r4c0', 'r4c1', 'r4c2', 'r4c3', 'r4c4']

function animateMagicSquare() {

  // Function that generates each cell ID based on name, row number, and column
  // number
  var cellId = function(name, row, col) {
    return '#' + name + '-r' + row + 'c' + col
  }

  // For now, only deals with first 3x3 square. Need to change this (and other
  // stuff) to make it flexible with other sized squares.
  const num_cols = 3
  const num_rows = 3

  var col_num = 1,
      row_num = 1;

  // Initialise empty arrays where each cell ID to iterate over (in order) will go
  cells_by_row = []
  cells_by_col = []
  cells_by_right_diag = []
  cells_by_left_diag = []

  // Populate cells_by_row array with each cell ID (in order of row animation)
  for (i = 0; i < num_cols; i++) {
    for (j = 0; j < num_rows + 1; j++) {
      cell_id = cellId('intro', row_num, col_num)
      cells_by_row.push(cell_id)
      col_num++
    }
    col_num = 1
    row_num++
  }

  // Reset row_num and col_num variables
  var row_num = 1,
      col_num = 1

  // Populate cells_by_col array with each cell ID (in order of col animation)
  for (i = 0; i < num_rows; i++) {
    for (j = 0; j < num_cols + 1; j++) {
      cell_id = cellId('intro', row_num, col_num)
      cells_by_col.push(cell_id)
      row_num++
    }
    row_num = 1
    col_num++
  }

  // Reset row_num and col_num variables
  var row_num = 1,
      col_num = 1

  // Populate cells_by_right_diag array with each cell ID (in order of col animation)
  for (i = 0; i < num_rows + 1; i++) {
    cell_id = cellId('intro', row_num, col_num)
    cells_by_right_diag.push(cell_id)
    row_num++
    col_num++
  }

  // New row and col number initializations for left diagonal (bec it goes right to left)
  var row_num = 1,
      col_num = 3

  // Populate cells_by_left_diag array with each cell ID (in order of col animation)
  for (i = 0; i < num_rows + 1; i++) {
    cell_id = cellId('intro', row_num, col_num)
    cells_by_left_diag.push(cell_id)
    row_num++
    col_num--
  }


  // Finally getting to the animation bit.

  // Set delay for each colouring step in animation
  const delay = 250

  // Function to change background colour of element based on element ID
  var col_bgd_color = function(selector, color) {
    d3.select(selector).style('background-color', color);
  }

  var c = 0,                    // Index for cell ID array iteration
      cell_count = 0,           // Counter for totals cell
      step = 1;                 // Number that represents which step the animation is on:
                                //  1: rows, 2: columns, 3: right diagonal, 4: left diagonal

  // Recursive setTimeout: https://javascript.info/settimeout-setinterval
  // https://www.w3schools.com/Jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout2
  // This is a helluva hack-y way to forego a for statement.
  function animate() {
    x = c + 1                   // Used to determine which cells are totals cells
    cell_id = cells_by_row[c]

    // The animation does rows first and then does columns. So this if statement
    // checks if it's still on rows or not, and calls the appropriate function.
    if (step === 1) {
      animateRows(cell_id)
    } else if (step == 2) {
      cell_id = cells_by_col[c]   // Switch to new order of cell IDs
      animateCols(cell_id)
    } else if (step == 3) {
      cell_id = cells_by_right_diag[c]
      animateRightDiagonal(cell_id)
    } else {
      cell_id = cells_by_left_diag[c]
      animateLeftDiagonal(cell_id)
    }

  }

  // Function that calls animate().
  function startAnimation() {
    if (!animation_is_on) {
      // Reset totals cell to blank background colour and no text
      totals_cells_3x3.forEach(function(c) {
        cell = '#intro-' + c;
        col_bgd_color(cell, '')
        d3.select(cell).text('')
      })

      animation_is_on = true;
      animate();
    }
  }

  // Function that clears the recursive setTimeout to stop the animation.
  function stopAnimation() {
    clearTimeout(t)
    console.log('stopped')
  }

  // Row-by-row animation
  function animateRows(cell_id) {
    if (cell_id) {
      // This checks if it is the totals row. If it is, do the specific animation
      // for totals cells. Otherwise the normal animation.
      if (x % 4 == 0) {
        animateTotalsCells(cell_id, cells_by_row)
      } else {
        animateSquareCells(cell_id, cells_by_row)
      }
    } else {
      // Now that there are no more cells remaining and rows are over, set row
      // variable to false so column animation can begin
      step = 2
      c = 0         // Reset index
      animate()     // Call animate function again to animate by column
    }
  }

  // Column-by-column animation
  function animateCols(cell_id) {
    if (cell_id) {
      // This checks if it is the totals row. If it is, do the specific animation
      // for totals cells. Otherwise the normal animation.
      if (x % 4 == 0) {
        animateTotalsCells(cell_id, cells_by_col)
      } else {
        animateSquareCells(cell_id, cells_by_col)
      }
    } else {
      step = 3
      c = 0
      animate()
    }
  }

  // Right-diagonal animation
  function animateRightDiagonal(cell_id) {
    if (cell_id) {
      if (x % 4 == 0){
        animateTotalsCells(cell_id, cells_by_right_diag)
      } else {
        animateSquareCells(cell_id, cells_by_right_diag)
      }
    } else {
      step = 4
      c = 0
      animate()
    }
  }

  // Left-diagonal animation
  function animateLeftDiagonal(cell_id) {
    if (cell_id) {
      if (x % 4 == 0){
        animateTotalsCells(cell_id, cells_by_left_diag)
      } else {
        animateSquareCells(cell_id, cells_by_left_diag)
      }
    } else {
      // Colour and add total to last, top-right cell
      col_bgd_color('#intro-r0c' + (num_cols + 1), 'lightgreen')
      cells_by_left_diag.forEach(function(cell) {
        if ((c + 1) % 4 !== 0) {
          cell_value = d3.select(cell).text()     // Get value of cell
          cell_count += Number(cell_value)
          c++
        }
      })
      d3.select('#intro-r0c' + (num_cols + 1)).text(cell_count)
      stopAnimation()
      animation_is_on = false
    }

  }

  function animateTotalsCells(cell_id, cell_id_array) {
    // The previous three cells on the row (relative to the totals cell)
    c1 = cell_id_array[c - 3]
    c2 = cell_id_array[c - 2]
    c3 = cell_id_array[c - 1]

    // Change their background colors back to default
    col_bgd_color(c1, '')
    col_bgd_color(c2, '')
    col_bgd_color(c3, '')

    // Now that it's done, change the totals cell to lightgreen
    col_bgd_color(cell_id, 'lightgreen')

    cell_count = 0        // Reset cell count
    c++
    t = setTimeout(animate, delay);
  }

  function animateSquareCells(cell_id, cell_id_array) {
    cell_value = d3.select(cell_id).text()    // Get value of cell
    cell_count += Number(cell_value)          // Increment the value to the counter
                                              //  so a running total can be displayed.

    // Gotta change this so it's useful for non-3x3 squares.
    // Choosing the totals cell based on which row we are currently on.
    if (x <= 3) {
      cell4 = cell_id_array[3]
      d3.select(cell4).text(cell_count)
    } else if (x > 3 && x <= 8) {
      cell8 = cell_id_array[7]
      d3.select(cell8).text(cell_count)
    } else {
      cell12 = cell_id_array[11]
      d3.select(cell12).text(cell_count)
    }

    // Change current cell background to orange to show we have gone over it
    col_bgd_color(cell_id, 'orange')
    c++
    t = setTimeout(animate, delay);
  }

  // Let's roll...
  startAnimation()
}
