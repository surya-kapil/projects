const submitBtn = document.getElementById('submit-btn');
const requiredLength = 5;
const maxRows = 6;
let gameOver = false;

const warningDiv = document.getElementById('warning-div');
warningDiv.style.color = "red";

const gameMsg = document.getElementById('game-msg');

let currentRow = 0;
const tableRow = document.querySelectorAll('tr');

const mpp = new Map();

const resetBtn = document.getElementById('reset');
const words = [
    "apple",
    "grape",
    "bread",
    "chair",
    "clock",
    "cloud",
    "dance",
    "dream",
    "earth",
    "flame",
    "fruit",
    "green",
    "happy",
    "house",
    "light",
    "magic",
    "mouse",
    "ocean",
    "piano",
    "plant",
    "queen",
    "river",
    "smile",
    "snake",
    "stone",
    "table",
    "tiger",
    "train",
    "water",
    "whale",
    "world",
    "zebra"
];


function getRandomWord() {
    mpp.clear();
    const word = words[Math.floor(Math.random() * words.length)];

    for(let idx in word){
        if(!mpp.has(word[idx])){
            mpp.set(word[idx], []);
        }
        mpp.get(word[idx]).push(Number(idx));
    }

    console.log(word);
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

let secretWord = getRandomWord();


submitBtn.addEventListener('click', () => {
    const inputText = document.getElementById('word-input').value.toLowerCase();
    if(gameOver){
        warningDiv.innerText = `Game is Over, please reset`;
        return;
    }

    if(inputText.length !== requiredLength){
        warningDiv.innerText = `Only words of length ${requiredLength} is allowed`;
        return;
    }



    warningDiv.innerText = "";

    let colIdx = 0;

    const cols = tableRow[currentRow].querySelectorAll('td');

    let winner = true;

    cols.forEach((col) => {
        col.innerText = inputText[colIdx];
        col.style.textAlign = "center"
        col.style.fontSize = "20px"

        

        if(!mpp.has(inputText[colIdx])){
            col.style.backgroundColor = "lightgray";
            winner = false;
        }
        else if(binarySearch(mpp.get(inputText[colIdx]), colIdx) != -1){
            col.style.backgroundColor = "green";
        }
        else{
            col.style.backgroundColor = "yellow";
            winner = false;
        }
        
        
        colIdx++;
    })

    
    currentRow++;
    if(winner){
            gameOver = true;
            gameMsg.innerText = "Congratulations, you won";
    }

    else if(currentRow === maxRows){
        gameOver = true;
        gameMsg.innerText = "Better luck next time!!";
    }

})

resetBtn.addEventListener('click', () => {
    secretWord = getRandomWord();

    tableRow.forEach((row) => {
        const columns = row.querySelectorAll('td');

        columns.forEach((col) => {
            col.innerText = "";
            col.style.backgroundColor = "white";
        })
    })
    warningDiv.innerText = "";
    currentRow = 0;
    gameOver = false;
    gameMsg.innerText = "";
})

