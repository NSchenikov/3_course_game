import { game } from "./index.js";

export function renderCardsField(appEl) {
    const cardsHtml = game.cards
        .map((card, index) => {
            return `<img src="./img/${card[0]} ${card[1]}.png" class="card" alt="" data-index=${index}></img>`;
        })
        .join("");
    const gameHtml = `
                <div class="game-head center">
                <div class="timer-container">
                    <div class="timer-text-container">
                        <div class="min">min</div>
                        <div class="sek">sek</div>
                    </div>
                    <div class="timer">00.00</div>
                </div>
                <button class="start-again-btn">
                    Начать заново
                </button>
            </div>
            <div class="cards center">
                ${cardsHtml}
            </div>`;
    appEl.innerHTML = gameHtml;
}