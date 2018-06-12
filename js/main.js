
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


function animateMagicSquare() {
  var timer = 200,
      increment = 300,
      row_num = 1;

  var col_bgd_color = function(selector, color) {
    d3.select(selector).style('background-color', color);
  }

  //col_bgd_color('#intro-r1c4', '');

  c14 = d3.select('#intro-r1c4')

  var cellId = function(name, row, col) {
    return '#' + name + '-r' + row + 'c' + col
  }

  var c = 0;
  var col_num = 1
  var t;
  var timer_is_on = false;
  var num_cols = 3
  var num_rows = 3

  cells_by_row = []
  cells_by_col = []

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

  // This has potenital? Wtf am I doing

  cell_count = 0
  rows = true

  function timedCount() {
    x = c + 1
    cell_id = cells_by_row[c]

    if (rows) {
      animateRows(cell_id)
    } else {
      cell_id = cells_by_col[c]
      animateCols(cell_id)
    }

  }

  function startCount() {
      if (!timer_is_on) {
          timer_is_on = true;
          timedCount();
      }
  }

  function stopCount() {
    clearTimeout(t)
    console.log('stopped')
  }

  function animateRows(cell_id) {

    if (cell_id) {
      if (x % 4 == 0) {
        c1 = cells_by_row[c - 3]
        c2 = cells_by_row[c - 2]
        c3 = cells_by_row[c - 1]

        col_bgd_color(c1, '')
        col_bgd_color(c2, '')
        col_bgd_color(c3, '')

        col_bgd_color(cell_id, 'lightgreen')
        cell_count = 0
        c++
        t = setTimeout(timedCount, 250);
      } else {
        cell_value = d3.select(cell_id).text()
        cell_count += Number(cell_value)

        if (x <= 3) {
          cell4 = cells_by_row[3]
          d3.select(cell4).text(cell_count)
        } else if (x > 3 && x <= 8) {
          cell8 = cells_by_row[7]
          d3.select(cell8).text(cell_count)
        } else {
          cell12 = cells_by_row[11]
          d3.select(cell12).text(cell_count)
        }

        col_bgd_color(cell_id, 'orange')
        c++
        t = setTimeout(timedCount, 250);
      }
      //console.log(cell_id)

    } else {
      rows = false
      c = 0
      timedCount()
    }
  }

  function animateCols(cell_id) {
    if (cell_id) {
      if (x % 4 == 0) {
        c1 = cells_by_col[c - 3]
        c2 = cells_by_col[c - 2]
        c3 = cells_by_col[c - 1]

        col_bgd_color(c1, '')
        col_bgd_color(c2, '')
        col_bgd_color(c3, '')

        col_bgd_color(cell_id, 'lightgreen')
        cell_count = 0
        c++
        t = setTimeout(timedCount, 250);
      } else {
        cell_value = d3.select(cell_id).text()
        cell_count += Number(cell_value)

        if (x <= 3) {
          cell4 = cells_by_col[3]
          d3.select(cell4).text(cell_count)
        } else if (x > 3 && x <= 8) {
          cell8 = cells_by_col[7]
          d3.select(cell8).text(cell_count)
        } else {
          cell12 = cells_by_col[11]
          d3.select(cell12).text(cell_count)
        }

        col_bgd_color(cell_id, 'orange')
        c++
        t = setTimeout(timedCount, 250);
      }
    } else {
      stopCount()
    }

  }

  startCount()


  // // There has got to be a better of doing this.
  // // Row 1
  // c11 = d3.select('#intro-r1c1').text();
  // c12 = d3.select('#intro-r1c2').text();
  // c13 = d3.select('#intro-r1c3').text();
  // c14 = d3.select('#intro-r1c4')
  //
  // window.setTimeout(function() {
  //   col_bgd_color('#intro-r1c1', 'orange');
  //   c14.text(c11);
  //   c14_val = Number(c14.text());
  // }, timer);
  //
  // window.setTimeout(function() {
  //   col_bgd_color('#intro-r1c2', 'orange');
  //   c14.text(c14_val + Number(c12));
  //   c14_val = Number(c14.text());
  // }, timer + increment);
  //
  // window.setTimeout(function() {
  //   col_bgd_color('#intro-r1c3', 'orange');
  //   c14.text(c14_val + Number(c13));
  // }, timer + (2 * increment));
  //
  // window.setTimeout(function() {
  //   col_bgd_color('#intro-r1c4', 'lightgreen');
  //   col_bgd_color('#intro-r1c1', '');
  //   col_bgd_color('#intro-r1c2', '');
  //   col_bgd_color('#intro-r1c3', '');
  // }, timer + (3 * increment));
  //animateRow()
}
