
var intro_table = d3.select('#intro-magic-square')
              .append('table')
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
      row_num = 1;

  for (var i = 0; i < n; i++) {
    var row = table.append('tr'),
        col_num = 1;

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
  drawSquareGrid(table_element, square_name, 4);

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
    'r1c4': 'top-right',
    'r2c4': 'center-right',
    'r3c4': 'center-right',
    'r4c1': 'bottom-left',
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
