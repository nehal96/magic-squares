
var intro_table = d3.select('#intro-magic-square')
              .append('table')
              .append('tbody');

drawSquareGrid(intro_table, 3);


function drawSquareGrid(table_element, n) {
  var table = table_element,
      count = 1;

  for (var i = 0; i < n; i++) {
    var row = table.append('tr')

    for (var j = 0; j < n; j++) {
      row.append('td')
         .text(count)

      count++;
    }
  }
}
