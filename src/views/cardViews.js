import {
    elements,
    getElementByRole
} from './base';


export const insertCard = (card, role) => {
    let html = `<div class="col-2">
    <figure>
        <img src="${card.img}" class="card-img-top" alt="${card.value}">
    </figure>
</div>`
    getElementByRole(role).insertAdjacentHTML('beforeend', html);
}

export const insertCards = player => {
    clearAllCardsByRole(player.role);
    player.myDeckCards.forEach(el => insertCard(el, player.role));
}


export const clearAllCardsByRole = role => {
    getElementByRole(role).innerHTML = '';

}

export const changeMoneyInvest = player => {
    elements.moneyInvestInput.value = player.gamblingMoney;
}


export const changeMoneyTotal = player => {
    elements.moneyTotal.textContent = player.moneyTotal.toFixed(2);
}

export const getMoneyTotal = () => {
    return elements.moneyTotal.textContent * 1;
}

export const getMoneyInvest = () => {
    return elements.moneyInvestInput.value * 1;
}

export const lockInput = (lock = false) => {
    elements.moneyInvestInput.disabled = lock;
}

export const lockBtnReady = (lock = false) => {
    elements.btnReady.disabled = lock;
}


export const RenderAll = (player, dealer) => {
    insertCards(player);
    insertCards(dealer);
}

export const lockGame = (lock = false, btnReadyLock = false) => {
    elements.btnHit.disabled = lock;
    elements.btnDouble.disabled = lock;
    elements.btnSurender.disabled = lock;
    elements.btnStand.disabled = lock;
    elements.btnReady.disabled = btnReadyLock;
}