const { it, expect } = require("@jest/globals");

function game() {
    this.cards = [];
}

const cardSuits = ["Diamonds", "Hearts", "Clubs", "Spades"];
const cardRanks = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];

function getRandomCard(cardsNum) {
    return Math.floor(Math.random() * cardsNum);
}

function getLevel(cardsNum, array) {
    for (let i = 1; i <= cardsNum; i++) {
        array.push([
            cardSuits[getRandomCard(cardSuits.length)],
            cardRanks[getRandomCard(cardRanks.length)],
        ]);
    }
}

// Подготовка

// Действие

// Проверка

it("should add 6 elements to object", () => {
    const g = new game();

    getLevel(6, g.cards);

    if (g.cards.length === 0) {
        throw Error("game.cards array equal to 0");
    }

    expect(g.cards).toHaveLength(6);
});

it("should add 12 elements to object", () => {
    const g = new game();

    getLevel(12, g.cards);

    if (g.cards.length === 0) {
        throw Error("game.cards array equal to 0");
    }
    expect(g.cards).toHaveLength(12);
});

it("should add 18 elements to object", () => {
    const g = new game();

    getLevel(18, g.cards);

    if (g.cards.length === 0) {
        throw Error("game.cards array equal to 0");
    }
    expect(g.cards).toHaveLength(18);
});
