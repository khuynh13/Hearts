var Player = function(name, uiDiv) {

    var match = null
    var position = null
    var currentGame = null
    var playerKey = null
    var cardPlayed = null
    var username = null

    var hasPassed = false;

    this.getName = function() {
        return name
    }

    this.setupMatch = function(heartsMatch, pos) {
        username = window.prompt("Please enter your name", "SOUTH PLAYER")
        username = username.toUpperCase()

        $("div#north-label").append("<p>NORTH PLAYER [SCORE: " + getCurrentScore(Hearts.NORTH) + "]</p>")
        $("div#east-label").append("<p>EAST PLAYER [SCORE: " + getCurrentScore(Hearts.EAST) + "]</p>")
        $("div#west-label").append("<p>WEST PLAYER [SCORE: " + getCurrentScore(Hearts.WEST) + "]</p>")
        $("div#player").append("<div class='score' id='south-score'><p>" + username + " [SCORE: " + getCurrentScore(Hearts.SOUTH) + "]</p></div>")

        match = heartsMatch
        position = pos
    }

    this.setupNextGame = function(game, pKey) {
        currentGame = game
        playerKey = pKey


        game.registerEventHandler(Hearts.GAME_STARTED_EVENT, function(e) {
            showStatus("NEW GAME")
            showStatus("GAME STARTED")
            
            for (i = 0; i < 13; i++) {
                $("div#North-hand").append("<img src='face-down-card.png' width=50px height=73px>") 
                $("div#East-hand").append("<img src='face-down-card.png' width=50px height=73px>")  
                $("div#West-hand").append("<img src='face-down-card.png' width=50px height=73px>")         
            }

            showHand()
            $("button#play-card").hide()
            $("button#pass").show()

        })

        game.registerEventHandler(Hearts.TRICK_START_EVENT, function(e) {
            refreshHand()
            showPlayable()
        })

        game.registerEventHandler(Hearts.PASSING_COMPLETE_EVENT, function(e) {
            refreshHand()
        })

        game.registerEventHandler(Hearts.CARD_PLAYED_EVENT, function(e) {
            cardPlayed = e.getCard()
            var cardPlayedPng = $("<img src='PNG-cards-1.3/" + cardDict[cardPlayed.toString()] + ".png'" 
                                    + " alt='card text' width=60px height=82px>")

            $("div#" + e.getPosition()).append(cardPlayedPng)
            $("div#" + e.getPosition() + "-hand").children().last().remove(); // remove one card from hand view
            refreshHand()
        })

        game.registerEventHandler(Hearts.TRICK_CONTINUE_EVENT, function(e) {
            if (e.getNextPos() === position) {
                showStatus("YOUR TURN")
                refreshHand()
                showPlayable()
            }
        })

        game.registerEventHandler(Hearts.TRICK_COMPLETE_EVENT, function(e) {
            showStatus(e.getTrick().getWinner().toUpperCase() + " WINS THE TRICK")
            setTimeout(function() {
                emptyView()
            }, 1500) 
        })

        game.registerEventHandler(Hearts.GAME_OVER_EVENT, function(e) {
            console.log(match.getScoreboard()[Hearts.NORTH])
            console.log(match.getScoreboard()[Hearts.EAST])
            console.log(match.getScoreboard()[Hearts.SOUTH])
            console.log(match.getScoreboard()[Hearts.WEST])
            

            $("div.score").empty()
            $("div#north-label").append("<p>NORTH PLAYER [SCORE: " + match.getScoreboard()[Hearts.NORTH] + "]</p>")
            $("div#east-label").append("<p>EAST PLAYER [SCORE: " + match.getScoreboard()[Hearts.EAST] + "]</p>")
            $("div#west-label").append("<p>WEST PLAYER [SCORE: " + match.getScoreboard()[Hearts.WEST] + "]</p>")   
            $("div#player").append("<div class='score' id='south-score'><p>" + username + " [SCORE: " + match.getScoreboard()[Hearts.SOUTH] + "]</p></div>")
            
            showStatus("GAME OVER")
        }) 
    } 

    var emptyView = function() {
        $("div#West").empty()
        $("div#North").empty()
        $("div#East").empty()
        $("div#South").empty()
    }

    var cardDict = {
        "Two of Clubs": "2_of_clubs",
        "Two of Diamonds": "2_of_diamonds",
        "Two of Hearts": "2_of_hearts",
        "Two of Spades": "2_of_spades",
        "Three of Clubs": "3_of_clubs",
        "Three of Diamonds": "3_of_diamonds",
        "Three of Hearts": "3_of_hearts",
        "Three of Spades": "3_of_spades",
        "Four of Clubs": "4_of_clubs",
        "Four of Diamonds": "4_of_diamonds",
        "Four of Hearts": "4_of_hearts",
        "Four of Spades": "4_of_spades",
        "Five of Clubs": "5_of_clubs",
        "Five of Diamonds": "5_of_diamonds",
        "Five of Hearts": "5_of_hearts",
        "Five of Spades": "5_of_spades",
        "Six of Clubs": "6_of_clubs",
        "Six of Diamonds": "6_of_diamonds",
        "Six of Hearts": "6_of_hearts",
        "Six of Spades": "6_of_spades",
        "Seven of Clubs": "7_of_clubs",
        "Seven of Diamonds": "7_of_diamonds",
        "Seven of Hearts": "7_of_hearts",
        "Seven of Spades": "7_of_spades",
        "Eight of Clubs": "8_of_clubs",
        "Eight of Diamonds": "8_of_diamonds",
        "Eight of Hearts": "8_of_hearts",
        "Eight of Spades": "8_of_spades",
        "Nine of Clubs": "9_of_clubs",
        "Nine of Diamonds": "9_of_diamonds",
        "Nine of Hearts": "9_of_hearts",
        "Nine of Spades": "9_of_spades",
        "Ten of Clubs": "10_of_clubs",
        "Ten of Diamonds": "10_of_diamonds",
        "Ten of Hearts": "10_of_hearts",
        "Ten of Spades": "10_of_spades",
        "Jack of Clubs": "jack_of_clubs",
        "Jack of Diamonds": "jack_of_diamonds",
        "Jack of Hearts": "jack_of_hearts",
        "Jack of Spades": "jack_of_spades",
        "Queen of Clubs": "queen_of_clubs",
        "Queen of Diamonds": "queen_of_diamonds",
        "Queen of Hearts": "queen_of_hearts",
        "Queen of Spades": "queen_of_spades",
        "King of Clubs": "king_of_clubs",
        "King of Hearts": "king_of_hearts",
        "King of Diamonds": "king_of_diamonds",
        "King of Spades": "king_of_spades",
        "Ace of Clubs": "ace_of_clubs",
        "Ace of Diamonds": "ace_of_diamonds",
        "Ace of Hearts": "ace_of_hearts",
        "Ace of Spades": "ace_of_spades",        
    }

    var handlePassing = function(e) {
        if ($(".cardSelected").length === 3) {
            if ($(this).hasClass("cardSelected")) { 
                $(this).toggleClass("cardSelected")
            } else { 
                $(".cardSelected").first().toggleClass("cardSelected")
                $(this).toggleClass("cardSelected")
            }
        } else { 
            $(this).toggleClass("cardSelected")
        }
    }

    var handlePlaying = function(e) {
        if ($(".cardToPlay").length !== 0) {
            $(".cardToPlay").removeClass("cardToPlay")
            $(this).addClass("cardToPlay")
        } else {
            $(this).addClass("cardToPlay")            
        }

    }

    var showPlayable = function() {
        if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {

            var playableCards = currentGame.getHand(playerKey).getPlayableCards(playerKey)
            playableCards = playableCards.map(c => c.toString())

            playableCards.forEach(function(c) {
                var cardPng = "/" + cardDict[c] + ".png"
                $('div#player').find("img[src$='" + cardPng + "']").addClass("cardPlayable").on('click', handlePlaying)
            })

            if (playableCards[0] === "Two of Clubs") showStatus("PLAY THE TWO OF CLUBS TO BEGIN")
        }
    }

    var showHand = function() {
        var dealt = currentGame.getHand(playerKey).getUnplayedCards(playerKey);
        var img;
        dealt.forEach(function(c) {
            var displayedCards = $("img").map(function() { return this.src }).get()
    
            for (card in displayedCards) {
                if (displayedCards[card].indexOf(cardDict[c.toString()]) !== -1) {
                    return
                }
            } 
            
            var cardName = c.toString().replace(/\s/g, "_")
            img = $("<img class='cards' id=" + cardName + " src=" + "PNG-cards-1.3/" + cardDict[c.toString()] + ".png" + " alt='card text' width= 68px height=93px>")
            $("div#player").append(img); 
        })

        if (currentGame.getStatus() === Hearts.PASSING) {
            $(".cards").on('click', handlePassing)
            cardsPassed = []
            $("button#show-dealt").hide()
        } 

    }

    $("button#show-dealt").on('click', showHand)

    $("button#pass").on('click', function(e) {
        var cardsPassed = []
        var selected = []

        var currentHand = currentGame.getHand(playerKey).getUnplayedCards(playerKey)

        Array.from($(".cardSelected")).forEach(c => selected.push(c.id.replace(/_/g, " ")))
        
        for (var i = 0; i < currentHand.length; i++) {
            for (var j = 0; j < selected.length; j++) {
                if (currentHand[i].toString() === selected[j]) {
                    cardsPassed.push(currentHand[i])
                }
            }
            
        }

        if (currentGame.getStatus() === Hearts.PASSING) {
            if (!currentGame.passCards(cardsPassed, playerKey)) {
                showStatus("PLEASE CHOOSE 3 CARDS TO PASS")
                handlePassing()
            } else {  
                $("#player").find((".cardSelected")).removeClass("cardSelected")
                currentGame.passCards(cardsPassed, playerKey)
                cardsPassed = []
                $("button#pass").hide()
                $("button#play-card").show()
            }
        }

    })

    var getCurrentScore = function(pos) {
        if (currentGame === null || currentGame.getScore(pos) === undefined) {
            return 0
        } else {
            return currentGame.getScore(pos)
        }
    }

    var showStatus = function(status) {
        $("td#status").empty()
        
        if (status === "GAME STARTED") {
            $("td#status").html(status + "<br/>----------<br/>SELECT 3 CARDS TO PASS")   
        } else {
            $("td#status").html(status)
        }

        setTimeout(function() {
            $("td#status").empty()            
        }, 1500)
    }

    var refreshHand = function() {
        $("div#player").empty()
        $("div#player").append("<div class='score' id='south-score'><p>" + username + " [SCORE: " + match.getScoreboard()[Hearts.SOUTH] + "]</p></div>")
        
        var dealt = currentGame.getHand(playerKey).getUnplayedCards(playerKey)
        dealt.forEach(function(c) {
            var displayedCards = $('img').map(function() { return this.src }).get()
    
            for (card in displayedCards) {
                if (displayedCards[card].indexOf(cardDict[c.toString()]) !== -1) {
                    return
                }
    
            } 
            
            var img = $("<img class='cards' src=" + "PNG-cards-1.3/" + cardDict[c.toString()] + ".png" + " alt='card text' width= 68px height=93px>")

            $("div#player").append(img)
        })
        
    }

    $("button#play-card").on('click', function(e) {
        var playableCards = currentGame.getHand(playerKey).getPlayableCards(playerKey)
        var cardSelectedToPlay = $("div#player").find(".cardToPlay").attr("src").split("/")[1] // grab name of png

        var cardToPlay = playableCards.filter(function(c) {
            return cardSelectedToPlay === cardDict[c.toString()] + ".png"
        })

        if (!currentGame.playCard(cardToPlay[0], playerKey)) {
            showStatus("Please select one card to play!")
        } 
    })

}