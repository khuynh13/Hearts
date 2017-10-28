$(document).ready(function() {
    // console.log("ready");

    // var north = new Player("You")
    // var east = new DumbAI("Bob");
    // var south = new DumbAI("Carol");
    // var west = new DumbAI("David");

    $("button#play-card").hide()

    var north = new DumbAI("Bob")
    var east = new DumbAI("Carol")
    var west = new DumbAI("David")
    var player = new Player("You")

    var match = new HeartsMatch(north, east, player, west);

    // alert("Press 'Start Game' to begin playing!")

    // $("button#play-game").on('click', function(e) {
    //     // console.log("play button pressed")
    //     match.run();
    //     alert("Game Started!")
        
    // })

    match.run();

})