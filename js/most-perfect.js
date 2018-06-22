const most_perfect_table = d3.select('#most-perfect-magic-square')
                             .append('table')
                              .attr('id', 'most-perfect-magic-square-grid')
                             .append('tbody')

drawMostPerfectMagicSquare(most_perfect_table, 'most-perfect', 4)

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
  duration: 1300
})
.setPin('#most-perfect-graphic-container')
.addTo(controller)

// // Activate each slide
activateSlide('#most-perfect-slide-1')
activateSlide('#most-perfect-slide-2')
activateSlide('#most-perfect-slide-3')
activateSlide('#most-perfect-slide-4')


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

  if (slide_num == 1) {
    //console.log('First slide animation')
  }

  if (slide_num == 2) {
    colorMostPerfectMagicSquare(panmagic_color_mapping, default_color=true)
  }

  if (slide_num == 3) {
    // Panmagic colouring
    colorMostPerfectMagicSquare(panmagic_color_mapping)
  }

  if (slide_num == 4) {
    // Four square colouring
    colorMostPerfectMagicSquare(four_squares_color_mapping)
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
}
