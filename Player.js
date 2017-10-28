var Player = function(name, uiDiv) {

    var match = null
    var position = null
    var currentGame = null
    var playerKey = null

    this.getName = function() {
        return name
    }

    this.setupMatch = function(heartsMatch, pos) {
        match = heartsMatch
        position = pos
    }

    this.setupNextGame = function(game, pKey) {
        currentGame = game
        playerKey = pKey


        game.registerEventHandler(Hearts.ALL_EVENTS, function(e) {
            // alert(e.event_type)
        })

        game.registerEventHandler(Hearts.TRICK_START_EVENT, function(e) {
            if (e.getStartPos() === position) {
                alert("your turn")
            } else {
                console.log(e.getStartPos())
            }
        })

        var cardPlayed;
        game.registerEventHandler(Hearts.CARD_PLAYED_EVENT, function(e) {
            console.log("card is played")
            console.log(e.getCard().toString())
            cardPlayed = e.getCard()
        })

        game.registerEventHandler(Hearts.TRICK_CONTINUE_EVENT, function(e) {
            // cardPlayed = cardPlayed.toString();
            // console.log("inside trick continue")
            if (e.getNextPos() === position) {
                console.log("is my position")
                // $("button#play-card").bind('click', showHand)
                // console.log("is my position")
                // for (i = 0; i < currentGame.getHand(playerKey).getUnplayedCards(playerKey).length; i++) {
                //     console.log("inside for looping hand")
                //     var currentCard = currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i].toString().split(" ")[2]
                //     var imgSrc = $("#player").find("img").attr('src').split("/")[1].split("_")[2].split(".")[0]
                //     imgSrc = imgSrc.charAt(0).toUpperCase() + imgSrc.slice(1)
                    
                //     // console.log(currentCard)
                //     // console.log(currentCard.toString())
                //     // console.log(currentCard)
                //     if (currentCard === imgSrc) {
                //         console.log("matching suit found")
                //         console.log(currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS)

                //         // $(".cards").bind('click', showHand)

                // $(".cards").bind('click', showHand)
                showHand()

                //         // $("#player").eq(i).addClass("cardPlayable")
                //         // console.log("matching suit")
                //         // console.log($("#player").find("img").attr('src'))
                //         // var imgSrc = $("#player").find("img").attr('src').split("/")[1].split("_")[2].split(".")[0]
                //         // console.log(imgSrc)
                //         // imgSrc = imgSrc.charAt(0).toUpperCase() + imgSrc.slice(1)
                //         // console.log(imgSrc)
                //         // var validCard = currentCard.toString().split(" ")[0] // grab the appropriate suit
                //         // $("#player").children().css({"outline-color:": "red"})
                //         // $(".cards").bind('click', function(e) {
                //         //     console.log('playable card clicked')
                //         //     $(this).addClass("cardPlayable")
                //         // })

                //     }
                // }
            }
        })

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

    for (i = 0; i < 13; i++) {
        $("#north-player").append("<img src='face-down-card.png' width=50px height=73px>") 
        $("#east-player").append("<img src='face-down-card.png' width=50px height=73px>")  
        $("#west-player").append("<img src='face-down-card.png' width=50px height=73px>")         
    }

    var handlePassing = function(e) {
        if (currentGame.getStatus() === Hearts.PASSING) {
            if ($(this).hasClass("cardSelected")) { // unselect
                $(this).removeClass("cardSelected")
                cardsPassed.pop() // remove last card from clicked
            } else if ($(".cardSelected").length === 3) { // 3 already selected, replace last selected with new selected
                $(".cardSelected").last().removeClass("cardSelected")
                $(this).addClass("cardSelected")
                for (i = 0; i < 13; i++) {
                    var cardSelected = currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i]
                    if (e.target.id === cardSelected.toString().replace(/\s/g, "_")) {
                        cardsPassed[cardsPassed.length - 1] = cardSelected
                    } 
                }
            } else { // select
                $(this).addClass("cardSelected")
                for (i = 0; i < 13; i++) {
                    var cardSelected = currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i]
                    try {
                        if (e.target.id === cardSelected.toString().replace(/\s/g, "_")) {
                            cardsPassed.push(cardSelected)
                        } 
                    } catch(error) {

                    }

                }                
            }
        } else if (false) {
            // something
        }
    }


    var handlePlaying = function(e) {
        console.log("inside handle play function")
        alert("handle play")
        if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {
            console.log("handling playing")
            for (i = 0; i < currentGame.getHand(playerKey).getUnplayedCards(playerKey).length; i++) {
                var currentSuit = currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i].toString().split(" ")
                console.log(currentSuit[2])
                // console.log(e.target.id.split("_")[2])
                console.log(currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i].toString().split(" "))
                console.log(e.target.id.split("_"))
                if (e.target.id.split("_")[2] === currentSuit) {
                    console.log("same suit")
                    $(this).addClass("cardSelected")
                }
            }
        }
    }


    var showHand = function() {
        var dealt = currentGame.getHand(playerKey).getUnplayedCards(playerKey);
        var img;
        dealt.forEach(function(c) {
            var displayedCards = $('img').map(function() { return this.src }).get()
    
            for (card in displayedCards) {
                if (displayedCards[card].indexOf(cardDict[c.toString()]) !== -1) {
                    return
                }
    
            } 
            
            var cardName = c.toString().replace(/\s/g, "_")
            img = $("<img class='cards' id=" + cardName + " src=" + "PNG-cards-1.3/" + cardDict[c.toString()] + ".png" + " alt='card text' width= 70px height=95px>")

            $("#player").append(img); 

        })

        if (currentGame.getStatus() === Hearts.PASSING) {
            $(".cards").bind('click', handlePassing)
            $("button#show-dealt").hide()
        } else if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {
            $(".cards").bind('click', handlePlaying)
            console.log("Trick in progres")
        }

        
        
    }

    $("button#show-dealt").on('click', showHand)


    var cardsPassed = []

    $("button#pass").on('click', function(e) {
        if (currentGame.getStatus() === Hearts.PASSING) {
            if (!currentGame.passCards(cardsPassed, playerKey)) {
                alert("Please choose " + Math.abs((3 - cardsPassed.length)) + " more cards to pass!")
                handlePassing()
            } else {
                currentGame.passCards(cardsPassed, playerKey)
                $("#player").empty()
                var dealt = currentGame.getHand(playerKey).getUnplayedCards(playerKey);
                dealt.forEach(function(c) {
                    var displayedCards = $('img').map(function() { return this.src }).get()
            
                    for (card in displayedCards) {
                        if (displayedCards[card].indexOf(cardDict[c.toString()]) !== -1) {
                            return
                        }
            
                    } 
                    
                    var img = $("<img class='cards' src=" + "PNG-cards-1.3/" + cardDict[c.toString()] + ".png" + " alt='card text' width= 70px height=95px>")
        
                    $("#player").append(img);
                })
            }

            if (cardsPassed.length === 3) {
                $("button#pass").hide()
                $("button#play-card").show()
            }
        } 

    })

    var cardToPlay;

    $("button#play-card").on('click', function(e) {
        if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {
            currentGame.playCard(cardToPlay, playerKey)
            $("#player").empty()
            var dealt = currentGame.getHand(playerKey).getUnplayedCards(playerKey)
            
            dealt.forEach(function(c) {
                var displayedCards = $('img').map(function() { return this.src }).get()
        
                for (card in displayedCards) {
                    if (displayedCards[card].indexOf(cardDict[c.toString()]) !== -1) {
                        return
                    }
        
                } 
                
                var img = $("<img class='cards' src=" + "PNG-cards-1.3/" + cardDict[c.toString()] + ".png" + " alt='card text' width= 70px height=95px>")
    
                $("#player").append(img);
            })
        }
    })



}