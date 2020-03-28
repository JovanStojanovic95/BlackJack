import Card from "./card";
export default class Player {
    constructor(myPocketMoney, role) {
        this.myDeckCards = [];
        this.sumCardsValue = 0;
        this.moneyTotal = myPocketMoney;
        this.gamblingMoney = 0;
        this.role = role;

    }
    hitMe(card) {
        this.myDeckCards.push(card);
        this.aceChange();

        //this.sumCardsValue = this.sumValues();
    }
    doublePosible() {
        if (this.myDeckCards.length === 2) {
            if (
                this.sumCardsValue === 9 ||
                this.sumCardsValue === 10 ||
                this.sumCardsValue === 11
            ) {
                return true;
            }
        }
        return false;
    }
    doubleIt(card) {
        if (this.doublePosible()) {
            this.gamblingMoney = this.gamblingMoney * 2;
            this.hitMe(card);
        }
    }
    popAllCards() {
        this.myDeckCards = [];
        this.sumCardsValue = 0;
        this.dealerSpecCard = undefined;
        this.gamblingMoney = 0;
    }
    surender() {
        this.moneyTotal = this.moneyTotal + this.gamblingMoney / 2;
        this.popAllCards();
    }
    invest(investSum) {
        this.gamblingMoney = investSum;

        this.moneyTotal = this.moneyTotal - this.gamblingMoney;
    }
    gainMoney(normal = 2) {
        this.moneyTotal = this.moneyTotal + this.gamblingMoney * normal;
    }
    lose() {
        this.gamblingMoney = 0;
    }
    aceChange() {

        let aces = this.myDeckCards.filter(el => el.value === 11);
        let others = this.myDeckCards.filter(el => el.value !== 11);

        this.myDeckCards = others;


        const sumWithOutAce = this.sumValues();

        if (aces.length) {
            if (aces.length > 2) {
                for (let i = 1; i < aces.length; i++) {
                    aces[i].value = 1;
                }
            } else if (aces.length === 2 || sumWithOutAce >= 11) {
                aces[0].value = 1;
            }
            this.myDeckCards = [...others, ...aces];
        }

        this.sumCardsValue = this.sumValues();

    }
    sumValues() {
        return this.myDeckCards.reduce((ac, el) => {
            return ac + el.value;
        }, 0);
    }
}