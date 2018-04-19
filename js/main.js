
var intro_table = d3.select('#intro-magic-square')
              .append('table')
              .append('tbody');

drawSquareGrid(intro_table, 'intro', 3);


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
