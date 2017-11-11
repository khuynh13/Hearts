var Player = function(name, uiDiv) {

    var match = null
    var position = null
    var currentGame = null
    var playerKey = null
    var cardPlayed = null

    var hasPassed = false;

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

        game.registerEventHandler(Hearts.CARD_PLAYED_EVENT, function(e) {
            setTimeout(4000)
            console.log("card is played")
            console.log(e.getCard().toString())
            cardPlayed = e.getCard()
            alert(e.getPosition() + " played " + e.getCard())

            var cardPlayedPng = $("<img src=" + "PNG-cards-1.3/" + cardDict[cardPlayed.toString()] + ".png" + 
                                    " alt='card text' width= 50px height=73px>")



        
            $("#" + e.getPosition()).append(cardPlayedPng)
            
        })

        game.registerEventHandler(Hearts.TRICK_CONTINUE_EVENT, function(e) {
            if (e.getNextPos() === position) {
                refreshHand()
                showPlayable()
            }
        })

    
    } 

    var getLastPlayedCard = function() {
        return cardPlayed
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
            if ($(".cardSelected").length < 3 || $(this).hasClass('cardSelected')) {
                $(this).toggleClass('cardSelected')
            } 

        }

    }


    var cardToPlayStack = []
    var handlePlaying = function(e) {
        // if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {
            // refreshHand()
            // console.log("handling playing")
            // for (i = 0; i < currentGame.getHand(playerKey).getUnplayedCards(playerKey).length; i++) {
            //     var currentSuit = currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i].toString().split(" ")
            //     // console.log(currentSuit[2])
            //     var imgSrcSuit = $("#player").find("img").attr('src').split("/")[1].split("_")[2].split(".")[0]
            //     imgSrcSuit = imgSrcSuit.charAt(0).toUpperCase() + imgSrcSuit.slice(1)
            //     console.log(imgSrcSuit)

            //     if (imgSrcSuit === currentSuit) {
            //         console.log("same suit")
            //         $(".cards").addClass("cardPlayable")
            //     }
            // }

            // var currentSuit = currentGame.getHand(playerKey).getUnplayedCards(playerKey)[i].toString().split(" ")
            // var imgSrcSuit = $("#player").find("img").attr('src').split("/")[1].split("_")[2].split(".")[0]
            // imgSrcSuit = imgSrcSuit.charAt(0).toUpperCase() + imgSrcSuit.slice(1)

        //     if ($(e.target).hasClass("cards")) {
        //         console.log($(e.target).attr('src'))
        //         var currentImgSrcSuit = $(e.target).attr('src').split("/")[1].split("_")[2].split(".")[0]
        //         currentImgSrcSuit = currentImgSrcSuit.charAt(0).toUpperCase() + currentImgSrcSuit.slice(1)
        //         console.log(currentImgSrcSuit)
        //         var suitPlayed = getLastPlayedCard().toString().split(" ")[2]
        //         console.log(suitPlayed)
                
        //         if (currentImgSrcSuit === suitPlayed) {
        //             $(e.target).addClass("cardPlayable")
        //         } else {
        //             alert("You must play a card of suit " + suitPlayed)
        //         }

        //     }
        // }
        if (cardToPlayStack.length !== 0) {
            cardToPlayStack.pop()
            $(".cardToPlay").removeClass("cardToPlay")
        } else {
            $(this).addClass("cardToPlay")
            cardToPlayStack.push($(this))
            console.log($(e.target).attr("src"))        
        }

    }

    var showPlayable = function() {
        if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {
            $("#player").children(".cards").each(function() {
                var currentImgSrcSuit = $(this).attr('src').split("/")[1].split("_")[2].split(".")[0]
                currentImgSrcSuit = currentImgSrcSuit.charAt(0).toUpperCase() + currentImgSrcSuit.slice(1)
                
                if (currentImgSrcSuit === cardPlayed.toString().split(" ")[2]) {
                    $(this).addClass("cardPlayable")
                    $(this).on('click', handlePlaying)    
                }

            })

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
                alert("Please choose 3 cards to pass!")
                cardsPassed = []
                handlePassing()
            } else {  
                $("#player").find((".cardSelected")).removeClass("cardSelected")
                currentGame.passCards(cardsPassed, playerKey)
            }

        } 

        // if (cardsPassed.length === 3) {
        //     cardsPassed = []
        //     $("button#pass").hide()
        //     $("button#play-card").show()
        // }

        cardsPassed = []
        $("button#pass").hide()
        $("button#play-card").show()

    })

    var refreshHand = function() {
        console.log("refreshing hand")
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

            $("#player").append(img)
        })
        
    }

    $("button#play-card").on('click', function(e) {
        // if (currentGame.getStatus() === Hearts.TRICK_IN_PROGRESS) {
        //     currentGame.playCard(cardToPlay, playerKey)
        //     $("#player").empty()
        //     var dealt = currentGame.getHand(playerKey).getUnplayedCards(playerKey)

        //     dealt.forEach(function(c) {
        //         var displayedCards = $('img').map(function() { return this.src }).get()
        
        //         for (card in displayedCards) {
        //             if (displayedCards[card].indexOf(cardDict[c.toString()]) !== -1) {
        //                 return
        //             }
        
        //         } 
                
        //         var img = $("<img class='cards' src=" + "PNG-cards-1.3/" + cardDict[c.toString()] + ".png" + " alt='card text' width= 70px height=95px>")
    
        //         $("#player").append(img);
        //     })
        // }

        var cardToPlay = cardToPlayStack.pop().attr("src").split("/")[1].split(".")[0]
        console.log(cardToPlay) // 10_of_clubs
        // cardToPlay = cardToPlay.pop()
        cardToPlay = cardToPlay.split("_") // 10 of clubs

        // cardToPlay = cardToPlay.toString().replace(/,/g, " ")

        cardToPlay[0] = cardToPlay[0].charAt(0).toUpperCase() + cardToPlay[0].slice(1)
        cardToPlay[2] = cardToPlay[2].charAt(0).toUpperCase() + cardToPlay[2].slice(1)
        
        console.log(cardToPlay[0])


        console.log(cardToPlay)
        // var suit = cardToPlay[2].charAt(0).toUpperCase()
        // cardToPlay[2] = suit
        // cardToPlay = cardToPlay.toString().replace(/,/g, " ")
        // console.log(cardToPlay)

        
    })



}