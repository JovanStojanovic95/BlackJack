export const elements = {
    playerCards: document.querySelector('.player_cards'),
    dealerCards: document.querySelector('.dealer_cards'),
    moneyTotal: document.querySelector('.money_sum'),
    moneyInvestInput: document.querySelector('.money_invest_input'),
    btnHit: document.querySelector('.btn_hit'),
    btnDouble: document.querySelector('.btn_double'),
    btnSurender: document.querySelector('.btn_surender'),
    btnReady: document.querySelector('.btn_ready'),
    btnStand: document.querySelector('.btn_stand'),
    btnRestart: document.querySelector('.btn_restart')
}

export const getElementByRole = role => {

    return document.querySelector(`.${role}_cards`);
}