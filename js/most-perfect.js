const most_perfect_table = d3.select('#most-perfect-magic-square')
                             .append('table')
                              .attr('id', 'most-perfect-magic-square-grid')
                             .append('tbody')

drawMostPerfectMagicSquare(most_perfect_table, 'most-perfect', 4)

function drawMostPerfectMagicSquare(table_element, square_name, n) {
  drawSquareGrid(table_element, 'most-perfect', n)

  const cell_mapping = {
    'r1c1': 7,
    'r1c2': 12,
    'r1c3': 1,
    'r1c4': 14,
    'r2c1': 2,
    'r2c2': 13,
    'r2c3': 8,
    'r2c4': 11,
    'r3c1': 16,
    'r3c2': 3,
    'r3c3': 10,
    'r3c4': 5,
    'r4c1': 9,
    'r4c2': 6,
    'r4c3': 15,
    'r4c4': 4
  }

  const name = square_name + '-';
  var row_num = 1;

  for (var i = 0; i < n; i++) {
    var col_num = 1;

    for (var j = 0; j < n; j++) {
      console.log(row_num, col_num)
      var cell_id = 'r' + row_num + 'c' + col_num;
      d3.select('#' + name + cell_id)
        .text(cell_mapping[cell_id]);

      col_num++;
    }

    row_num++
  }
}


var controller = new ScrollMagic.Controller();

console.log('scrollmagic');
