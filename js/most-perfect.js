const most_perfect_table = d3.select('#most-perfect-magic-square')
                             .append('table')
                              .attr('id', 'most-perfect-magic-square-grid')
                             .append('tbody')

drawMostPerfectMagicSquare(most_perfect_table, 'most-perfect', 4)

// Draw totals UI for most perfect magic square
d3.select('#most-perfect-magic-square')
 .append('div')
  .attr('id', 'most-perfect-totals-container')

const totals_row1_html = "<div class='most-perfect-totals-row'>" +
  "<div id='most-perfect-pink' class='most-perfect-total-cell most-perfect-left-cell'></div>" +
  "<div id='most-perfect-pink-total' class='most-perfect-total-cell most-perfect-right-cell'></div>" +
  "<div id='most-perfect-centre-1' class='most-perfect-total-cell most-perfect-centre-cell'></div>" +
  "<div id='most-perfect-yellow' class='most-perfect-total-cell most-perfect-left-cell'></div>" +
  "<div id='most-perfect-yellow-total' class='most-perfect-total-cell most-perfect-right-cell'></div>" + "</div>"

const totals_row2_html = "<div class='most-perfect-totals-row'>" +
  "<div id='most-perfect-lightblue' class='most-perfect-total-cell most-perfect-left-cell'></div>" +
  "<div id='most-perfect-lightblue-total' class='most-perfect-total-cell most-perfect-right-cell'></div>" +
  "<div id='most-perfect-centre-2' class='most-perfect-total-cell most-perfect-centre-cell'></div>" +
  "<div id='most-perfect-orange' class='most-perfect-total-cell most-perfect-left-cell'></div>" +
  "<div id='most-perfect-orange-total' class='most-perfect-total-cell most-perfect-right-cell'></div>" + "</div>"

document.getElementById('most-perfect-totals-container').innerHTML = totals_row1_html + totals_row2_html


function drawMostPerfectMagicSquare(table_element, square_name, n) {
  drawSquareGrid(table_element,
    'most-perfect',
    n,
    zero_indexed=false,
    on_click_function=true)

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
      var cell_id = 'r' + row_num + 'c' + col_num;
      d3.select('#' + name + cell_id)
        .text(cell_mapping[cell_id]);

      col_num++;
    }

    row_num++
  }
}

// Set up scrollytelling
var controller = new ScrollMagic.Controller();

// Scene that pins magic square
new ScrollMagic.Scene({
  triggerElement: '#most-perfect-slide-1',
  duration: 2900
})
.setPin('#most-perfect-graphic-container')
.addTo(controller)

// Activate each slide
activateSlide('#most-perfect-slide-1')
activateSlide('#most-perfect-slide-2')
activateSlide('#most-perfect-slide-3')
activateSlide('#most-perfect-slide-4')
activateSlide('#most-perfect-slide-5')
activateSlide('#most-perfect-slide-6')
activateSlide('#most-perfect-slide-7')
activateSlide('#most-perfect-slide-8')
activateSlide('#most-perfect-slide-9')


// Function that creates the Scene that activates the particular slide
function activateSlide(slide_id) {
  const slide_num = slide_id.split('').reverse()[0]
  //console.log(slide_num)

  return new ScrollMagic.Scene({
    triggerElement: slide_id,
    duration: 295
  })
  .setClassToggle(slide_id, 'active-slide')
  .on('enter', function() {
    animateMostPerfectMagicSquare(slide_num)
  })
  .addTo(controller)
}

function animateMostPerfectMagicSquare(slide_num) {
  // Function to change background colour of element based on element ID
  var col_bgd_color = function(selector, color) {
    d3.select(selector).style('background-color', color);
  }

  const panmagic_color_mapping = {
    'r1c1': '',
    'r1c2': 'yellow',
    'r1c3': 'pink',
    'r1c4': 'lightblue',
    'r2c1': 'lightblue',
    'r2c2': '',
    'r2c3': 'yellow',
    'r2c4': 'pink',
    'r3c1': 'pink',
    'r3c2': 'lightblue',
    'r3c3': '',
    'r3c4': 'yellow',
    'r4c1': 'yellow',
    'r4c2': 'pink',
    'r4c3': 'lightblue',
    'r4c4': ''
  }

  const four_squares_color_mapping = {
    'r1c1': 'pink',
    'r1c2': 'pink',
    'r1c3': 'yellow',
    'r1c4': 'yellow',
    'r2c1': 'pink',
    'r2c2': 'pink',
    'r2c3': 'yellow',
    'r2c4': 'yellow',
    'r3c1': 'lightblue',
    'r3c2': 'lightblue',
    'r3c3': 'orange',
    'r3c4': 'orange',
    'r4c1': 'lightblue',
    'r4c2': 'lightblue',
    'r4c3': 'orange',
    'r4c4': 'orange'
  }

  const alternate_color_mapping = {
    'r1c1': 'pink',
    'r1c2': 'yellow',
    'r1c3': 'pink',
    'r1c4': 'yellow',
    'r2c1': 'lightblue',
    'r2c2': 'orange',
    'r2c3': 'lightblue',
    'r2c4': 'orange',
    'r3c1': 'pink',
    'r3c2': 'yellow',
    'r3c3': 'pink',
    'r3c4': 'yellow',
    'r4c1': 'lightblue',
    'r4c2': 'orange',
    'r4c3': 'lightblue',
    'r4c4': 'orange'
  }

  const four_corners_color_mapping = {
    'r1c1': 'pink',
    'r1c2': '',
    'r1c3': '',
    'r1c4': 'pink',
    'r2c1': '',
    'r2c2': '',
    'r2c3': '',
    'r2c4': '',
    'r3c1': '',
    'r3c2': '',
    'r3c3': '',
    'r3c4': '',
    'r4c1': 'pink',
    'r4c2': '',
    'r4c3': '',
    'r4c4': 'pink'
  }

  const horizontal_rows_color_mapping = {
    'r1c1': 'pink',
    'r1c2': 'pink',
    'r1c3': 'yellow',
    'r1c4': 'yellow',
    'r2c1': 'lightblue',
    'r2c2': 'lightblue',
    'r2c3': 'orange',
    'r2c4': 'orange',
    'r3c1': 'lightblue',
    'r3c2': 'lightblue',
    'r3c3': 'orange',
    'r3c4': 'orange',
    'r4c1': 'pink',
    'r4c2': 'pink',
    'r4c3': 'yellow',
    'r4c4': 'yellow'
  }

  const vertical_rows_color_mapping = {
    'r1c1': 'pink',
    'r1c2': 'yellow',
    'r1c3': 'yellow',
    'r1c4': 'pink',
    'r2c1': 'pink',
    'r2c2': 'yellow',
    'r2c3': 'yellow',
    'r2c4': 'pink',
    'r3c1': 'lightblue',
    'r3c2': 'orange',
    'r3c3': 'orange',
    'r3c4': 'lightblue',
    'r4c1': 'lightblue',
    'r4c2': 'orange',
    'r4c3': 'orange',
    'r4c4': 'lightblue'
  }

  const plus_sign_color_mapping = {
    'r1c1': '',
    'r1c2': 'yellow',
    'r1c3': 'yellow',
    'r1c4': '',
    'r2c1': 'lightblue',
    'r2c2': 'pink',
    'r2c3': 'pink',
    'r2c4': 'lightblue',
    'r3c1': 'lightblue',
    'r3c2': 'pink',
    'r3c3': 'pink',
    'r3c4': 'lightblue',
    'r4c1': '',
    'r4c2': 'yellow',
    'r4c3': 'yellow',
    'r4c4': ''
  }

  if (slide_num == 1) {
    //console.log('First slide animation')
  }

  if (slide_num == 2) {
    /*** BACKWARD PASS ***/
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(panmagic_color_mapping, default_color=true)

    // Hide all totals cells
    hideAllTotalsCells()
  }

  if (slide_num == 3) {
    // Panmagic colouring
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(panmagic_color_mapping)

    // Show all cells
    showAllTotalCells()
    // Hide orange cell because not necessary
    hideParticularTotalsCell('orange', first_time=true)
  }

  if (slide_num == 4) {
    // Four square colouring
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(four_squares_color_mapping)

    // Show orange cell
    showAllTotalCells()
    showParticularTotalCell('orange')
  }

  if (slide_num == 5) {
    // Alternate cells colouring
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(alternate_color_mapping)

    /* BACKWARD PASS */
    const orange_width = document.getElementById('most-perfect-orange').style.width
    if (orange_width === '0%') {
      showAllTotalCells()
      showParticularTotalCell('orange')
      showParticularTotalCell('lightblue')
      showParticularTotalCell('yellow')
    }

  }

  if (slide_num == 6) {
    // Four corners cells colouring
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(four_corners_color_mapping)

    // Hide orange, lightblue, and yellow cells
    showAllTotalCells()
    hideParticularTotalsCell('orange')
    hideParticularTotalsCell('lightblue')
    hideParticularTotalsCell('yellow')
  }

  if (slide_num == 7) {
    // Horizontal rows colouring
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(horizontal_rows_color_mapping)

    showAllTotalCells()
    showParticularTotalCell('orange')
    showParticularTotalCell('lightblue')
    showParticularTotalCell('yellow')
  }

  if (slide_num == 8) {
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(vertical_rows_color_mapping)

    showAllTotalCells()
    showParticularTotalCell('orange')
  }

  if (slide_num == 9) {
    eraseMostPerfectTotals()
    colorMostPerfectMagicSquare(plus_sign_color_mapping)

    showAllTotalCells()
    hideParticularTotalsCell('orange')
  }

  function colorMostPerfectMagicSquare(color_mapping, default_color=false) {
    cell_keys = Object.keys(color_mapping)

    for (i = 0; i < 16; i++) {
      cell_id = '#most-perfect-' + cell_keys[i]
      if (default_color) {
        cell_color = ''
      } else {
        cell_color = color_mapping[cell_keys[i]]
      }
      col_bgd_color(cell_id, cell_color)
    }
  }

  function eraseMostPerfectTotals() {
    pink_total = yellow_total = blue_total = orange_total = 0

    document.getElementById('most-perfect-pink-total').innerHTML = ''
    document.getElementById('most-perfect-yellow-total').innerHTML = ''
    document.getElementById('most-perfect-lightblue-total').innerHTML = ''
    document.getElementById('most-perfect-orange-total').innerHTML = ''

    d3.select('#most-perfect-pink').style('border', '1px solid black')
    d3.select('#most-perfect-pink-total').style('border', '1px solid black')

    d3.select('#most-perfect-yellow').style('border', '1px solid black')
    d3.select('#most-perfect-yellow-total').style('border', '1px solid black')

    d3.select('#most-perfect-lightblue').style('border', '1px solid black')
    d3.select('#most-perfect-lightblue-total').style('border', '1px solid black')

    d3.select('#most-perfect-orange').style('border', '1px solid black')
    d3.select('#most-perfect-orange-total').style('border', '1px solid black')
  }

  function hideAllTotalsCells() {
    // Hide totals cells
    d3.selectAll('.most-perfect-totals-row')
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('opacity', 0)

    // Set cursor to default to indicate not clickable
    d3.select('#most-perfect-magic-square-grid')
      .style('cursor', 'default')
  }

  function showAllTotalCells() {
    // Display hidden (opacity: 0) totals cells
    d3.selectAll('.most-perfect-totals-row')
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('opacity', 1)
      .style('justify-content', 'center')

    // Set cursor to pointer to indicate it's clickable
    d3.select('#most-perfect-magic-square-grid')
      .style('cursor', 'pointer')
  }

  function hideParticularTotalsCell(color, first_time=false) {
    const color_id = '#most-perfect-' + color
    const color_total_id = '#most-perfect-' + color + '-total'

    // Hide color cell
    d3.select(color_id)
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('border', 'none')
      .style('width', '0%')

    if (first_time) {
      // Remove color without transition
      d3.select(color_id)
        .style('background-color', 'white')
    }

    // Hide color total cell
    d3.select(color_total_id)
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('background-color', 'white')
      .style('border', 'none')
      .style('width', '0%')

    // Hide the centre cell (used for spacing colors)
    switch (color) {
      case 'pink':
        d3.select('#most-perfect-centre-1')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('border', 'none')
          .style('width', '0%')
      case 'yellow':
        d3.select('#most-perfect-centre-1')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('border', 'none')
          .style('width', '0%')
      case 'orange':
        d3.select('#most-perfect-centre-2')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('border', 'none')
          .style('width', '0%')
      case 'lightblue':
        d3.select('#most-perfect-centre-2')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('border', 'none')
          .style('width', '0%')
    }
  }

  function showParticularTotalCell(color) {
    const color_id = '#most-perfect-' + color
    const color_total_id = '#most-perfect-' + color + '-total'

    // Show orange and orange-total cells
    d3.select(color_id)
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('background-color', color)
      .style('border', '1px solid #444')
      .style('width', '20%')

    d3.select(color_total_id)
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('border', '1px solid #444')
      .style('width', '20%')

    // Show the centre cell (used for spacing colors)
    switch (color) {
      case 'pink':
        d3.select('#most-perfect-centre-1')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('width', '20%')
      case 'yellow':
        d3.select('#most-perfect-centre-1')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('width', '20%')
      case 'orange':
        d3.select('#most-perfect-centre-2')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('width', '20%')
      case 'lightblue':
        d3.select('#most-perfect-centre-2')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .style('width', '20%')
    }
  }
}
