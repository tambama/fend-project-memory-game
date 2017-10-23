/*
 * Create a list that holds all of your cards
 */

 var cardList = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];


var moveCount = 0;
var starRating = 3;
var openCards = [];
var currentCardIndex = -1;
var lastCardIndex;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCards(){
    var shuffled = shuffle(cardList);
    var cards = shuffled.map(card => '<li data-card="'+ card +'" class="card"><i class="fa '+ card +'"></i></li>');

    //add each card's HTML to the page
    cards.forEach(function(item){
        $(".deck").append(item);
    })

    display();
}

// flip a card
function flipCard(){
    $(".card").click(function(){
        // cannot flip a card locked as matched
        if($(this).hasClass('match') || $(this).hasClass('open'))
            return;
        $(this).toggleClass("open show");
        lastCardIndex = currentCardIndex;
        currentCardIndex = $('.card').index($(this));
        addToOpen($(this).attr('data-card'), currentCardIndex, lastCardIndex);
    })
}

// add to list of open cards
function addToOpen(card, current, last){
    if(openCards.length % 2 !== 0){
        
        var lastCard = openCards[openCards.length - 1];
        if(lastCard === card){
            lockOpen(card);
            openCards.push(card);
        } else {
            removeFromOpen(current, last)
        }
    } else{
        openCount = openCards.push(card);
    }
    
    incrementMove();
}

// lock matching cards
function lockOpen(card){

    $('li[data-card="'+card+'"]').toggleClass("show match");
    if(openCards.length === 15){
        setTimeout(function() {
            displayFinalScore();
        }, 1000);
    }
}

// close cards
function removeFromOpen(currentCard, lastCard){
    setTimeout(function() {
        $('.card:nth('+currentCard+')').toggleClass('open incorrect');
        $('.card:nth('+lastCard+')').toggleClass('open incorrect');

    }, 500);
    
    setTimeout(function() {
        $('.card:nth('+currentCard+')').toggleClass('incorrect show');
        $('.card:nth('+lastCard+')').toggleClass('incorrect show');
    }, 1000);
    
    openCards.splice(openCards.indexOf(lastCard), 1);
}

// Increment the moves counter and set star-rating
function incrementMove(){
    moveCount++;
    if(moveCount <= 16){
        starRating = 3;
    } else if(moveCount === 17){
        starRating = 2;
        $('.stars li:nth(2) i').toggleClass('fa-star-o')
    } else if(moveCount ===  21){
        starRating = 1;
        $('.stars li:nth(1) i').toggleClass('fa-star-o')       
    } else if(moveCount === 25){
        starRating = 0;
        $('.stars li:nth(0) i').toggleClass('fa-star-o')        
    } else {
        console.log(moveCount)
    }

    $('.moves').html(moveCount);
    $('span.stars').html(starRating);
    
}

// Reset the cards
function restart(){
    $(".deck").empty();
    createCards();
    flipCard();
    starRating = 3;
    moveCount = 0;
    $('.moves').html(moveCount);
}

// display cards for 5s and hide them
function display(){
    setTimeout(function() {
        $('.card').toggleClass('open show')
    }, 900);

    setTimeout(function() {
        $('.card').toggleClass('open show')
    }, 5000);
}

// Display the final score when all card match
function displayFinalScore(){
    $('.game-page, .completion-page').toggleClass('hidden');
}

// Go back to replay card game
function goToPlay(){
    $('.game-page, .completion-page').toggleClass('hidden');
    restart();
}

// Initialize Cards
createCards();
// Initialize click event on cards
flipCard();

// Click event on restart
$(".restart").click(function(){
    restart();
});

// Click event on game completion
$('#goToPlay').click(function(){
    goToPlay();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Clock

 function clock() {

 var time = new Date(),
     hours = time.getHours(),
     minutes = time.getMinutes(),
     
     
     seconds = time.getSeconds();
 
 document.querySelectorAll('.clock')[0].innerHTML = formatDigits(hours) + ":" + formatDigits(minutes) + ":" + formatDigits(seconds);
   
   function formatDigits(nguva) {
     if (nguva < 10) {
       nguva = '0' + nguva
     }
     return nguva;
   }
 }

 setInterval(clock, 1000);
