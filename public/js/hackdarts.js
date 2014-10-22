var fb = new Firebase("https://hackdarts.firebaseio.com");

var players = fb.child("players");
var curPlayer = fb.child("current");

curPlayer.on('value', function(player){
  var cur = player.val();
  if(cur) {
    console.log("The Current Player is: "+ cur);
  }
});

function addPlayer(player) {
  players.child(player).set([0,0,0,0,0,0,0,0]);
}

function removePlayer(player) {
  players.child(player).remove();
}


function nextPlayer() {
  curPlayer.once('value', function(data){
    players.once('value', function(playersData){
      var cur = data.val();
      var rdy = false;
      var done = playersData.forEach( function(player) {
        if (!cur || rdy){
          curPlayer.set(player.name());
          return true;
        } else {
          if (cur == player.name()) {
            rdy = true;
          }
        }
      });
      if (!done) {
        playersData.forEach( function (player) {
          curPlayer.set(player.name());
          return true;
        });
      }
    });
  });
}


// hits array contains double values if necessary ie [15, 15, 16, 17, 17, 17]
function submitScore(hitsArray) {

  function pointToIndex(point) {
    if (point == 25) {
      return 6;
    }
    return point - 15;
  }

  function scorable(point, data) {
    for (var curArray in data) {
      if (data[curArray][pointToIndex(point)] < 3) {
        return true;
      }
    }
    return false;
  }

  function addPoint(player, data, point) {
    var index = pointToIndex(point);

    if (data[player][index] < 3) {
      data[player][index] ++;
    } else {
      if (scorable(point, data)) {
        data[player][7] += point;
      }
    }
    return data;
  }

  curPlayer.once("value", function(cur){
    players.once("value", function(data){
      var playerData = data.val();

      hitsArray.forEach(function(point){
        playerData = addPoint(cur.val(), playerData, point);
      });

      players.set(playerData);

      nextPlayer();
    });
  });
}
