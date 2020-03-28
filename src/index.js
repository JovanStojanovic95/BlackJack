import CardDeck from "./models/cardDeck";
import Player from "./models/player";
import * as cardViews from "./views/cardViews";
import {
    elements
} from "./views/base";
// Global STATE of app
/*
 * ---Search object
 * ---Curent recipe object
 * ---shopping list object
 * ---liked recipes
 */
let state = {};

state.setHandlers = function () {

    const lockALL = () => {
        changeInputs();
        this.restared = true;
        cardViews.lockGame(true, true);
    }

    const endGameTest = () => { // ok
        if (this.player.sumCardsValue > 21) {
            this.player.lose();
            lockALL();
            console.log('YOU LOSE!!!');
            alert('YOU LOSE!!!');
        } else if (this.player.sumCardsValue === 21) {
            this.player.gainMoney();
            lockALL();
            console.log("YOU GOT BLACKJACK!!!!");
            alert("YOU GOT BLACKJACK!!!!");

        } else if (this.dealer.sumCardsValue > 21) {
            this.player.gainMoney();
            lockALL();
            console.log('YOU WON!!!');
            alert('YOU WON!!!');
        }
    }
    const endGame = () => { // ok
        this.dealer.myDeckCards.splice(0, 1);
        this.dealer.hitMe(this.dealer.dealerSpecCard);
        cardViews.insertCards(this.dealer);
        if (this.dealer.sumCardsValue > 21) {
            this.player.gainMoney();
            lockALL();
            console.log('YOU WON!!!');
            alert('YOU WON!!!');
        } else if (this.dealer.sumCardsValue - 21 < this.player.sumCardsValue - 21) {
            this.player.gainMoney();
            console.log('YOU WON!!!');
            alert('YOU WON!!!');
        } else {
            this.player.lose();
            console.log('YOU LOSE!!!');
            alert('YOU LOST!!!');
        }
        changeInputs();
        cardViews.lockGame(true, true);
        this.restared = true;
        console.log(this.dealer);
    }

    const restart = (newDeck = true) => { // ok

        if (newDeck) {
            this.cardDeck = new CardDeck();
        }
        if (this.restared) {
            this.player.popAllCards();
            this.dealer.popAllCards();

            cardViews.clearAllCardsByRole(this.player.role);
            cardViews.clearAllCardsByRole(this.dealer.role);

            cardViews.lockGame(true, false);
            cardViews.lockInput();

            changeInputs();
            this.restared = false;
        }
    }


    const dealerPlay = () => { // ok
        if (this.dealer.sumCardsValue >= 16) {
            endGame();
        } else {
            this.dealer.hitMe(...this.cardDeck.removeCard());
            cardViews.insertCards(this.dealer);
            console.log(this.dealer);
            endGameTest();
        }
    }
    const hit = () => { // ok
        this.player.hitMe(...this.cardDeck.removeCard());
        cardViews.insertCards(this.player);
        endGameTest();
    }



    const changeInputs = () => { // valjda ok
        cardViews.changeMoneyTotal(this.player);
        cardViews.changeMoneyInvest(this.player);
    }

    const double = () => { //  ok
        if (this.player.doublePosible()) {
            this.player.doubleIt(...this.cardDeck.removeCard());
            changeInputs();
            cardViews.insertCards(this.player);
            endGameTest();
        }
    }

    const surender = () => { //  ok

        this.player.surender();
        this.restared = true;
        restart(false);
    }

    const stand = () => { // ok
        cardViews.lockGame(false, true);
        dealerPlay();
    }

    const ready = () => {
        if (cardViews.getMoneyInvest() > 0 && cardViews.getMoneyInvest() <= cardViews.getMoneyTotal()) {
            this.player.invest(cardViews.getMoneyInvest());

            changeInputs();

            cardViews.lockInput(true);
            cardViews.lockBtnReady(true);

            this.dealer.dealerSpecCard = this.cardDeck.removeCard()[0];
            this.dealer.hitMe({
                type: "",
                value: 0,
                img: "./img/red_back.png"
            })
            this.dealer.hitMe(...this.cardDeck.removeCard());


            console.log(this.dealer);
            hit();
            hit();
            cardViews.RenderAll(this.player, this.dealer);
            cardViews.lockGame(false, true);
            this.restared = false;
            endGameTest();
        } else {
            alert("NEMEZE");
        }
    }

    elements.btnHit.addEventListener("click", hit);
    elements.btnDouble.addEventListener("click", double);
    elements.btnStand.addEventListener("click", stand);
    elements.btnSurender.addEventListener("click", surender);
    elements.btnReady.addEventListener('click', ready);
    elements.btnRestart.addEventListener('click', restart);

};



state.init = function () {

    this.cardDeck = new CardDeck();

    this.player = new Player(10000, "player");
    this.dealer = new Player(5000, "dealer");



    cardViews.clearAllCardsByRole(this.player.role);
    cardViews.clearAllCardsByRole(this.dealer.role);


    cardViews.lockGame(true, false);
    cardViews.lockInput();


    cardViews.changeMoneyTotal(this.player);
    this.setHandlers();
    this.restared = false;
};
state.init();