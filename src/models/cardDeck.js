import Card from './card';
export default class CardDeck {
    constructor() {
        this.cards = [];
        this.mixCards();
        this.nCards = 52;
    }
    mixCards() {
        for (let i = 2; i <= 10; i++) {
            this.cards.push(new Card('H', i, `./img/${i}H.png`));
            this.cards.push(new Card('D', i, `./img/${i}D.png`));
            this.cards.push(new Card('C', i, `./img/${i}C.png`));
            this.cards.push(new Card('S', i, `./img/${i}S.png`));
        }
        for (let i = 2; i <= 4; i++) {
            this.cards.push(new Card('H', 10, `./img/${i+10}H.png`));
            this.cards.push(new Card('D', 10, `./img/${i+10}D.png`));
            this.cards.push(new Card('C', 10, `./img/${i+10}C.png`));
            this.cards.push(new Card('S', 10, `./img/${i+10}S.png`));
        }
        this.cards.push(new Card('H', 11, `./img/${11}H.png`));
        this.cards.push(new Card('D', 11, `./img/${11}D.png`));
        this.cards.push(new Card('C', 11, `./img/${11}C.png`));
        this.cards.push(new Card('S', 11, `./img/${11}S.png`));

    }
    removeCard() {
        if (this.cards.length !== 0) {
            return this.cards.splice(Math.floor(Math.random() * this.nCards--), 1);
        } else {
            console.log('No more cards')
        }
    }

}