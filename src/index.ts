"use strict";

import "./css/style.css";
import { renderCardsField } from "./render-cards-field-comonent";

// let minutes: number = 0;
// let seconds: number = 0;
// let interval: number;

type Card = [string, string];

type Game = {
    time: {
        minutes: number;
        seconds: number;
    };
    difficultyLevel: number;
    status: string;
    cards: Card[];
    userCards: Card[];
    result: string;
};

export const game: Game = {
    time: {
        minutes: 0,
        seconds: 0,
    },
    difficultyLevel: 0,
    status: "level",
    cards: [],
    userCards: [],
    result: "",
};
export let isFinished = false;

const cardSuits: string[] = ["Diamonds", "Hearts", "Clubs", "Spades"];
const cardRanks: string[] = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];

function getRandomCard(cardsNum: number) {
    return Math.floor(Math.random() * cardsNum);
}

function clickToPlayAgain(element: string) {
    const el = document.querySelector(element) as HTMLInputElement;
    el.addEventListener("click", () => {
        isFinished = false;
        minutes = 0;
        seconds = 0;
        game.time.minutes = 0;
        game.time.seconds = 0;
        game.difficultyLevel = 0;
        game.status = "level";
        game.cards = [];
        game.userCards = [];
        game.result = "";
        renderApp();
    });
}

function startTimer() {
    const appendMinutes = document.getElementById("minutes") as HTMLElement;
    const appendSeconds = document.getElementById("seconds") as HTMLElement;
    function start() {
        clearInterval(interval);
        interval = window.setInterval(starta, 1000);
    }

    function starta() {
        seconds++;
        if (seconds <= 9) {
            appendSeconds.innerHTML = "0" + seconds;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = String(seconds);
        }
        if (seconds > 59) {
            console.log("minutes");
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }
        if (minutes > 9) {
            appendMinutes.innerHTML = String(minutes);
        }
    }
    start();
}

function getLevel(el: HTMLElement, cardsNum: number) {
    el.addEventListener("click", () => {
        const levelone = document.querySelector(
            ".levelone"
        ) as HTMLInputElement;
        const leveltwo = document.querySelector(
            ".leveltwo"
        ) as HTMLInputElement;
        const levelthree = document.querySelector(
            ".levelthree"
        ) as HTMLInputElement;
        const start = document.querySelector(".btn") as HTMLInputElement;

        levelone.classList.remove("choosed");
        leveltwo.classList.remove("choosed");
        levelthree.classList.remove("choosed");
        game.cards = [];

        el.classList.add("choosed");

        for (let i = 1; i <= cardsNum; i++) {
            game.cards.push([
                cardSuits[getRandomCard(cardSuits.length)],
                cardRanks[getRandomCard(cardRanks.length)],
            ]);
        }

        if (el === levelone) {
            game.difficultyLevel = 1;
        }
        if (el === leveltwo) {
            game.difficultyLevel = 2;
        }
        if (el === levelthree) {
            game.difficultyLevel = 3;
        }

        console.log("game object", game);

        start.addEventListener("click", () => {
            game.status = "game";
            renderApp();
            console.log("game object", game);
        });
    });
}

function renderApp() {
    const appEl = document.getElementById("app") as HTMLElement;

    if (game.status === "level") {
        const gameHtml = `
            <div class="container">
            <div class="box">
                <div class="header">
                    <div>Выбери</div>
                    <div>сложность</div>
                </div>
                <div class="levels">
                    <button class="levelone">1</button>
                    <button class="leveltwo">2</button>
                    <button class="levelthree">3</button>
                </div>
                    <button class="btn">Старт</button>
            </div>
        </div>`;

        appEl.innerHTML = gameHtml;

        const levelone = document.querySelector(".levelone") as HTMLElement;
        const leveltwo = document.querySelector(".leveltwo") as HTMLElement;
        const levelthree = document.querySelector(".levelthree") as HTMLElement;

        getLevel(levelone, 6);
        getLevel(leveltwo, 12);
        getLevel(levelthree, 18);
    }

    if (game.status === "game") {
        renderCardsField(appEl);
        clickToPlayAgain(".start-again-btn");
        const cards = document.querySelectorAll(".card");
        setTimeout(() => {
            cards.forEach((card) => {
                card.classList.add("closed-card");
            });
            startTimer();
            for (const item of cards) {
                item.addEventListener("click", () => {
                    item.classList.remove("closed-card");
                    const index = Number((item as HTMLElement).dataset.index);
                    console.log(index);
                    if (game.userCards.length <= 2) {
                        game.userCards.push(game.cards[index]);
                        console.log(game.userCards, "user cards");
                    }
                    if (game.userCards.length === 2) {
                        clearInterval(interval);
                        if (
                            game.userCards[0][0] === game.userCards[1][0] &&
                            game.userCards[0][1] === game.userCards[1][1]
                        ) {
                            game.status = "finish";
                            game.result = "win";
                        } else {
                            game.status = "finish";
                            game.result = "lose";
                        }

                        game.time.minutes = minutes;
                        game.time.seconds = seconds;
                        console.log(game);

                        isFinished = true;
                        renderCardsField(appEl);
                        const appendMinutess = document.getElementById(
                            "minutess"
                        ) as HTMLElement;
                        const appendSecondss = document.getElementById(
                            "secondss"
                        ) as HTMLElement;
                        if (seconds <= 9) {
                            appendSecondss.innerHTML = "0" + seconds;
                        }
                        if (seconds > 9) {
                            appendSecondss.innerHTML = String(seconds);
                        }
                        if (minutes <= 9) {
                            appendMinutess.innerHTML = "0" + minutes;
                        }
                        if (minutes > 9) {
                            appendMinutess.innerHTML = String(minutes);
                        }
                        clickToPlayAgain(".play-again");
                    }
                });
            }
        }, 5000);
    }
}

renderApp();
