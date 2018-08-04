const birthday_table = d3.select('#birthday-magic-square')
                         .append('table')
                          .attr('class', 'magic-square')
                          .attr('id', 'birthday-magic-square-grid')
                         .append('tbody')

let day = 24
let month = 05
let yy = 19
let YY = 96

drawBirthdayMagicSquare(birthday_table, 'birthday', 4, day, month, yy, YY)

function drawBirthdayMagicSquare(table_element, square_name, n, day, month, yy, YY) {
  drawSquareGrid(birthday_table,
    square_name,
    n,
    zero_indexed=false,
    on_click_function=false)

  const cell_mapping = {
    'r1c1': day,
    'r1c2': month,
    'r1c3': yy,
    'r1c4': YY,
    'r2c1': YY + 1,
    'r2c2': yy - 1,
    'r2c3': month - 3,
    'r2c4': day + 3,
    'r3c1': month - 2,
    'r3c2': day + 2,
    'r3c3': YY + 2,
    'r3c4': yy - 2,
    'r4c1': yy + 1,
    'r4c2': YY - 1,
    'r4c3': day + 1,
    'r4c4': month - 1
  }

  const name = square_name + '-'
  let row_num = 1

  for (let i = 0; i < n; i++) {
    let col_num = 1

    for (let j = 0; j < n; j++) {
      let cell_id = 'r' + row_num + 'c' + col_num
      d3.select('#' + name + cell_id)
        .text(cell_mapping[cell_id])

      col_num++
    }

    row_num ++
  }

}
