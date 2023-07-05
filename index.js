
let game = {
    time: 0,
    difficultyLevel: 0,
    status: "level",
    cards: [],
    userCards: [],
};

const cardSuits = ["Diamonds", "Hearts", "Clubs", "Spades"];
const cardRanks = ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'];

function getRandomCard(cardsNum) {
    return Math.floor(Math.random() * cardsNum);
}

function getLevel(el, cardsNum) {

    el.addEventListener('click', () => {

        let levelone = document.querySelector(".levelone");
        let leveltwo = document.querySelector(".leveltwo");
        let levelthree = document.querySelector(".levelthree");
        let start = document.querySelector(".btn");

        levelone.classList.remove('choosed');
        leveltwo.classList.remove('choosed');
        levelthree.classList.remove('choosed');
        game.cards = [];

        el.classList.add('choosed');

        for(let i = 1; i <= cardsNum; i++) {
            game.cards.push([cardSuits[getRandomCard(cardSuits.length)], cardRanks[getRandomCard(cardRanks.length)]]);
        }

        if(el === levelone) {
            game.difficultyLevel = 1;
        }
        if(el === leveltwo) {
            game.difficultyLevel = 2;
        }
        if(el === levelthree) {
            game.difficultyLevel = 3;
        }

        console.log("game object", game);

        start.addEventListener('click', () => {
            game.status = "game";
            renderApp();
            console.log("game object", game);
        });
    });
}

function renderApp() {

    const appEl = document.getElementById("app");

    if(game.status === "level") {

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

        let levelone = document.querySelector(".levelone");
        let leveltwo = document.querySelector(".leveltwo");
        let levelthree = document.querySelector(".levelthree");
        let start = document.querySelector(".btn");

        getLevel(levelone, 6);
        getLevel(leveltwo, 12);
        getLevel(levelthree, 18);
    }

    if(game.status === "game") {
        const gameHtml = `<div>Игра началась!</div>`;
        appEl.innerHTML = gameHtml;
    }
}

renderApp();







