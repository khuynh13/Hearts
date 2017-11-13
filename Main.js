$(document).ready(function() {
    // $("button#play-card").hide()

    var north = new DumbAI("Bob")
    var east = new DumbAI("Carol")
    var west = new DumbAI("David")
    var player = new Player("You")

    var match = new HeartsMatch(north, east, player, west);

    match.run();

})