(() => {
    "use strict";
    var e = {
        d: (n, s) => {
            for (var t in s)
                e.o(s, t) &&
                    !e.o(n, t) &&
                    Object.defineProperty(n, t, { enumerable: !0, get: s[t] });
        },
        o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
    };
    function n(e) {
        const n = `\n                <div class="game-head center">\n                <div class="timer-container">\n                    <div class="timer-text-container">\n                        <div class="min">min</div>\n                        <div class="sek">sek</div>\n                    </div>\n                    <div class="timer"><span id="minutes">00</span>:<span id="seconds">00</span></div>\n                </div>\n                <button class="start-again-btn">\n                    Начать заново\n                </button>\n            </div>\n            <div class="cards center">\n                ${c.cards
            .map(
                (e, n) =>
                    `<img src="./img/${e[0]} ${e[1]}.png" class="card" alt="" data-index=${n}></img>`
            )
            .join("")}\n            </div>\n            ${
            i
                ? `<div class="modal">\n            <div class="modal-content">\n                <div class="modal-content-container">\n                    <img class="modal-img" src="/img/${
                      "win" === c.result ? "win" : "lose"
                  }.png">\n                    <div class="result">Вы ${
                      "win" === c.result ? "выйграли" : "проиграли"
                  }!</div>\n                    <div class="result-time-descr">Затраченное время:</div>\n                    <div class="result-time"><span id="minutess">00</span>:<span id="secondss">00</span></div>\n                    <button class="play-again">Играть снова</button>\n                </div>\n            </div>\n            </div>`
                : ""
        }`;
        e.innerHTML = n;
    }
    e.d({}, { H: () => c, I: () => i });
    let s,
        t = 0,
        l = 0;
    const c = {
        time: { minutes: 0, seconds: 0 },
        difficultyLevel: 0,
        status: "level",
        cards: [],
        userCards: [],
        result: "",
    };
    let i = !1;
    const r = ["Diamonds", "Hearts", "Clubs", "Spades"],
        o = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];
    function d(e) {
        return Math.floor(Math.random() * e);
    }
    function a(e) {
        document.querySelector(e).addEventListener("click", () => {
            (i = !1),
                (t = 0),
                (l = 0),
                (c.time.minutes = 0),
                (c.time.seconds = 0),
                (c.difficultyLevel = 0),
                (c.status = "level"),
                (c.cards = []),
                (c.userCards = []),
                (c.result = ""),
                v();
        });
    }
    function u(e, n) {
        e.addEventListener("click", () => {
            const s = document.querySelector(".levelone"),
                t = document.querySelector(".leveltwo"),
                l = document.querySelector(".levelthree"),
                i = document.querySelector(".btn");
            s.classList.remove("choosed"),
                t.classList.remove("choosed"),
                l.classList.remove("choosed"),
                (c.cards = []),
                e.classList.add("choosed");
            for (let e = 0; e <= n - 1; e += 2)
                (c.cards[e] = [r[d(r.length)], o[d(o.length)]]),
                    e + 1 < n && (c.cards[e + 1] = c.cards[e]);
            !(function (e) {
                for (let n = e.length - 1; n > 0; n--) {
                    const s = Math.floor(Math.random() * (n + 1)),
                        t = e[n];
                    (e[n] = e[s]), (e[s] = t);
                }
                console.log(e);
            })(c.cards),
                e === s && (c.difficultyLevel = 1),
                e === t && (c.difficultyLevel = 2),
                e === l && (c.difficultyLevel = 3),
                console.log("game object", c),
                i.addEventListener("click", () => {
                    (c.status = "game"), v(), console.log("game object", c);
                });
        });
    }
    function v() {
        const e = document.getElementById("app");
        if ("level" === c.status) {
            const n =
                '\n            <div class="container">\n            <div class="box">\n                <div class="header">\n                    <div>Выбери</div>\n                    <div>сложность</div>\n                </div>\n                <div class="levels">\n                    <button class="levelone">1</button>\n                    <button class="leveltwo">2</button>\n                    <button class="levelthree">3</button>\n                </div>\n                    <button class="btn">Старт</button>\n            </div>\n        </div>';
            e.innerHTML = n;
            const s = document.querySelector(".levelone"),
                t = document.querySelector(".leveltwo"),
                l = document.querySelector(".levelthree");
            u(s, 6), u(t, 12), u(l, 18);
        }
        if ("game" === c.status) {
            n(e), a(".start-again-btn");
            const r = document.querySelectorAll(".card");
            setTimeout(() => {
                r.forEach((e) => {
                    e.classList.add("closed-card");
                }),
                    (function () {
                        (t = 0), (l = 0);
                        const e = document.getElementById("minutes"),
                            n = document.getElementById("seconds");
                        clearInterval(s),
                            (s = window.setInterval(function () {
                                l++,
                                    l <= 9 && (n.innerHTML = "0" + l),
                                    l > 9 && (n.innerHTML = String(l)),
                                    l > 59 &&
                                        (console.log("minutes"),
                                        t++,
                                        (e.innerHTML = "0" + t),
                                        (l = 0),
                                        (n.innerHTML = "00")),
                                    t > 9 && (e.innerHTML = String(t));
                            }, 1e3));
                    })();
                for (const o of r)
                    o.addEventListener("click", () => {
                        o.classList.remove("closed-card");
                        const r = Number(o.dataset.index);
                        if (
                            (console.log(r),
                            c.userCards.push(c.cards[r]),
                            console.log(c.userCards, "user cards"),
                            c.userCards.length % 2 === 0)
                        ) {
                            if (
                                c.userCards[c.userCards.length - 2][0] ===
                                    c.userCards[c.userCards.length - 1][0] &&
                                c.userCards[c.userCards.length - 2][1] ===
                                    c.userCards[c.userCards.length - 1][1]
                            ) {
                                if (c.userCards.length !== c.cards.length)
                                    return;
                                clearInterval(s),
                                    (c.status = "finish"),
                                    (c.result = "win");
                            } else
                                clearInterval(s),
                                    (c.status = "finish"),
                                    (c.result = "lose");
                            (c.time.minutes = t),
                                (c.time.seconds = l),
                                console.log(c),
                                (i = !0),
                                n(e);
                            const r = document.getElementById("minutess"),
                                o = document.getElementById("secondss");
                            l <= 9 && (o.innerHTML = "0" + l),
                                l > 9 && (o.innerHTML = String(l)),
                                t <= 9 && (r.innerHTML = "0" + t),
                                t > 9 && (r.innerHTML = String(t)),
                                a(".play-again");
                        }
                    });
            }, 5e3);
        }
    }
    v();
})();
