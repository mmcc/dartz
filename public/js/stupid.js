$(function() {
  var currentScore = [];

  curPlayer.on('value', function(p) {
    $('.current-player-name').text(p.val());
    $('.score-buttons').show();
  });

  $('.score-buttons button').click(function(e) {
    e.preventDefault();

    var value = parseInt($(this).attr('id'));

    var count = countInArray(currentScore, value);

    if (count >= 9) {
      removeAllFromArray(currentScore, value);
    }
    currentScore.push(value);

    // count again just in case we removed things.
    count = countInArray(currentScore, value);

    $(this).children('span').text(count);
  });

  $('#submit-score').click(function(e) {
    e.preventDefault();

    submitScore(currentScore);

    clearScores();
  });

  function clearScores() {
    $('.score-buttons button').each(function() {
      $(this).children('span').text('0');
    });

    currentScore = [];
  }

  function countInArray(array, item) {
    var count = 0;
    for (var i=0; i<array.length; i++) {
      if (array[i] === item) {
        count++;
      }
    }
    return count;
  }

  function removeAllFromArray(array, item) {
    for(var i = array.length - 1; i >= 0; i--) {
      if(array[i] === item) {
        array.splice(i, 1);
      }
    }
  }
});
