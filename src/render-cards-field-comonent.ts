import { game, isFinished } from "./index.ts";

export function renderCardsField(appEl: any) {
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
                    <div class="timer"><span id="minutes">00</span>:<span id="seconds">00</span></div>
                </div>
                <button class="start-again-btn">
                    Начать заново
                </button>
            </div>
            <div class="cards center">
                ${cardsHtml}
            </div>
            ${
                isFinished
                    ? `<div class="modal">
            <div class="modal-content">
                <div class="modal-content-container">
                    <img class="modal-img" src="/img/${
                        game.result === "win" ? "win" : "lose"
                    }.png">
                    <div class="result">Вы ${
                        game.result === "win" ? "выйграли" : "проиграли"
                    }!</div>
                    <div class="result-time-descr">Затраченное время:</div>
                    <div class="result-time"><span id="minutess">00</span>:<span id="secondss">00</span></div>
                    <button class="play-again">Играть снова</button>
                </div>
            </div>
            </div>`
                    : ""
            }`;
    appEl.innerHTML = gameHtml;
}
