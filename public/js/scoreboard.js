var fb = new Firebase("https://hackdarts.firebaseio.com");

var players = fb.child("players")
var curPlayer = fb.child("current")

players.on('value', function(playerData){
  var tableData = playerData;
  console.log(playerData.val());
  var table = $('#score-table').empty()
  table.append('<tr id="Player"></tr>')
  table.append('<tr id="15"></tr>')
  table.append('<tr id="16"></tr>')
  table.append('<tr id="17"></tr>')
  table.append('<tr id="18"></tr>')
  table.append('<tr id="19"></tr>')
  table.append('<tr id="20"></tr>')
  table.append('<tr id="Bull"></tr>')
  table.append('<tr id="Score"></tr>')
  table.children().children().each(function(i, e) {$(e).append("<td>"+e.id+"</td>")})
  tableData.forEach(function(player){
    d = player.val();
    d.unshift(player.name())
    table.children().children().each(function(i, e) {
      if (i > 0 && i < 8){
        icon = ''
        if (d[i] == 1) {
          icon = '<i class="fa fa-minus fa-lg"></i>'
        } else if (d[i] == 2) {
          icon = '<i class="fa fa-times fa-lg"></i>'
        } else if (d[i] == 3) {
          icon = '<i class="fa fa-plus-circle fa-lg"></i>'
        }
        $(e).append("<td>"+icon+"</td>");
      } else {
        $(e).append("<td>"+d[i]+"</td>");
      }
    })
  })
});

curPlayer.on('value', function(cp){
  $("#player").text("Turn: "+cp.val())
});
