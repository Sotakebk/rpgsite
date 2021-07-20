/* DIRECTIONS ARE CLOCKWISE
 * 0 UP 
 * 1 RIGHT
 * 2 DOWN
 * 3 LEFT
 */
let rooms = [
    [/*0,0*/{ directions: [0, 0, 0, 0] },/*1,0*/ { directions: [0, 0, 1, 0] },/*2,0*/ { directions: [0, 0, 0, 0] },/*3,0*/ { directions: [0, 0, 0, 0] },/*4,0*/ { directions: [0, 0, 0, 0] },/*5,0*/ { directions: [0, 0, 0, 0] }],
    [/*0,1*/{ directions: [0, 1, 0, 0] },/*1,1*/ { directions: [1, 1, 1, 1] },/*2,1*/ { directions: [0, 1, 1, 1] },/*3,1*/ { directions: [0, 1, 0, 1] },/*4,1*/ { directions: [0, 0, 1, 1] },/*5,1*/ { directions: [0, 0, 0, 0] }],
    [/*0,2*/{ directions: [0, 0, 0, 0] },/*1,2*/ { directions: [1, 0, 1, 0] },/*2,2*/ { directions: [1, 0, 0, 0] },/*3,2*/ { directions: [0, 1, 1, 0] },/*4,2*/ { directions: [1, 0, 0, 1] },/*5,2*/ { directions: [0, 0, 0, 0] }],
    [/*0,3*/{ directions: [0, 1, 0, 0] },/*1,3*/ { directions: [1, 1, 1, 1] },/*2,3*/ { directions: [0, 0, 0, 1] },/*3,3*/ { directions: [1, 0, 1, 0] },/*4,3*/ { directions: [0, 0, 0, 0] },/*5,3*/ { directions: [0, 0, 0, 0] }],
    [/*0,4*/{ directions: [0, 0, 0, 0] },/*1,4*/ { directions: [1, 0, 0, 0] },/*2,4*/ { directions: [0, 0, 0, 0] },/*3,4*/ { directions: [1, 1, 0, 0] },/*4,4*/ { directions: [0, 1, 0, 1] },/*5,4*/ { directions: [0, 0, 0, 1] }],
];

// nothing: #ffffff, cave: #292222, outside (grass): #9bc785, house: #462608, ice: #afd2ce, desert: #f9fbcf, dungeon: #2e3120
let colors = [
    ["#ffffff", "#9bc785", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    ["#462608", "#9bc785", "#9bc785", "#afd2ce", "#afd2ce", "#ffffff"],
    ["#ffffff", "#9bc785", "#292222", "#afd2ce", "#afd2ce", "#ffffff"],
    ["#462608", "#9bc785", "#9bc785", "#f9fbcf", "#ffffff", "#ffffff"],
    ["#ffffff", "#292222", "#ffffff", "#f9fbcf", "#2e3120", "#2e3120"],
];

let transform = document.getElementById("transformer");
let hidingCss = document.getElementById("css-hideWhenMoving");
let body_inner = document.getElementById("body_inner");

let buttons = [
    document.getElementById("up"),
    document.getElementById("right"),
    document.getElementById("down"),
    document.getElementById("left")
];

let health = 3;
let hearts = [
    document.getElementById("heart_1"),
    document.getElementById("heart_2"),
    document.getElementById("heart_3"),
    document.getElementById("heart_4")
];

let posX = 0;
let posY = 0;

let movingX = 0;
let movingY = 0;

let isMoving = false;

function Up() {
    Move(0);
}


function Right() {
    Move(1);
}

function Down() {
    Move(2);
}

function Left() {
    Move(3);
}


function Move(dir) {
    if (isMoving) return;
    isMoving = true;
    switch (dir) {
        case (0): // up
            movingX = 0;
            movingY = 1;
            break;
        case (1): // right
            movingX = 1;
            movingY = 0;
            break;
        case (2): // down
            movingX = 0;
            movingY = -1;
            break;
        case (3): // left
            movingX = -1;
            movingY = 0;
            break;
    }
    Animate();
    isMoving = false;
}

function Animate() {
    posX += movingX;
    posY -= movingY;

    // disable controls etc
    hidingCss.disabled = false;

    // moving
    transform.style = "transform: translate(-" + posX + "00%, -" + posY + "00%)";
    body_inner.style = "background-color: " + colors[posY][posX] + ";";
    // wait for moving end
    setTimeout(() => { EndAnimation(); }, 1700);
}

function EndAnimation() {
    // enable controls etc
    hidingCss.disabled = true;

    for (let i = 0; i < 4; i++) {
        let b = (rooms[posY][posX].directions[i] == 1);
        buttons[i].style = (b) ? "visibility: inherit" : "visibility: hidden";
    }
}

function UpdateHealthBar() {
    for (let i = 0; i < 4; i++) {
        hearts[i].style = (i < health) ? "visibility: inherit" : "visibility: hidden";
    }
}

function Initialize() {
    transform.style = "transform: translate(-100%, -400%);";
    hidingCss.disabled = false;
    posX = 1;
    posY = 4;
    movingX = 0;
    movingY = 0;
    UpdateHealthBar();
    setTimeout(() => {
        transform.classList.add('transition');
        Animate();
    }, 1000);
}

function Fullscreenize() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.getElementById("body_inner").requestFullscreen();
    }
}

/* SCRIPTED EVENTS HERE */

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

let item_gun = document.getElementById("item_gun");
let item_gold = document.getElementById("item_gold");
let item_skates = document.getElementById("item_skates");
item_gun.classList.add("disabled");
item_gold.classList.add("disabled");
item_skates.classList.add("disabled");

let heart = document.getElementById("heart");
function PickedUpHeart() {
    heart.classList.remove("interactive");
    heart.classList.add("dissapear");
    health = 4;
    UpdateHealthBar();
}

let gun = document.getElementById("gun");
let goblin_lever = document.getElementById("goblin_lever");
function PickedUpGun() {
    gun.classList.remove("interactive");
    gun.classList.add("dissapear");
    item_gun.classList.remove("disabled");
    goblin_lever.classList.add("interactive");
}

let lever1 = document.getElementById("lever1");
let lever2 = document.getElementById("lever2");
lever2.classList.add("disabled");

function LeverGoblinClicked() {
    goblin_lever.classList.remove("interactive");
    goblin_lever.classList.add("dissapear");
    lever1.classList.add("interactive");
}

let bridge1 = document.getElementById("bridge1");
let bridge2 = document.getElementById("bridge2");
bridge2.classList.add("disabled");
rooms[3][1].directions[0] = 0;
function LeverClicked() {
    lever1.classList.remove("interactive");
    lever1.classList.add("disabled");
    lever2.classList.remove("disabled");
    lever2.classList.add("interactive");
    bridge2.classList.remove("disabled");
    bridge1.classList.add("disabled");
    rooms[3][1].directions[0] = 1;
}
function Lever2Clicked() {
    lever1.classList.add("interactive");
    lever1.classList.remove("disabled");
    lever2.classList.add("disabled");
    lever2.classList.remove("interactive");
    bridge2.classList.add("disabled");
    bridge1.classList.remove("disabled");
    rooms[3][1].directions[0] = 0;
}


let goblin_cave = document.getElementById("goblin_cave");
let gold = document.getElementById("gold");
function CaveGoblinClicked() {
    goblin_cave.classList.remove("interactive");
    goblin_cave.classList.add("dissapear");
    gold.classList.add("interactive");

}

let skates = document.getElementById("skates");
function GoldClicked() {
    gold.classList.remove("interactive");
    gold.classList.add("dissapear");
    item_gold.classList.remove("disabled");
    skates.classList.add("interactive");
}

rooms[1][3].directions[1] = 0;
function SkatesClicked() {
    skates.classList.remove("interactive");
    skates.classList.add("dissapear");
    item_skates.classList.remove("disabled");
    rooms[1][3].directions[1] = 1;
}
let skeles = [
    document.getElementById("skeleton_1"),
    document.getElementById("skeleton_2"),
    document.getElementById("skeleton_3")
];

let count = 0;
rooms[4][4].directions[1] = 0;
function ClickSkele(index) {
    skeles[index].classList.remove("interactive");
    skeles[index].classList.add("dissapear");
    count++;
    if (count == 3) {
        rooms[4][4].directions[1] = 1;
        EndAnimation();
    }
}

function IntroPlay() {
    Fullscreenize();
    let overlay = document.getElementById("overlay");
    overlay.classList.add("animate");
}

Initialize();
