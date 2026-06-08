const boxes = document.querySelectorAll('td');
let turn = 0;
let gameOver = false;
let winner = '';

const resetBtn = document.getElementById('reset-btn');
const allFilled = () => {
    let count = 0;
    
    boxes.forEach((box) => {
        const div = box.querySelector('div');
        if(div) count++;
    })
    if(count == 9) return true;

    return false;
}

const checkWinner = () => {
    const board = [...boxes].map(box => {
        const div = box.querySelector('div');
        return div ? div.innerText : '';
    });

    const wins = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]           
    ];

    for( const [a, b, c] of wins){
        if(board[a] != '' && board[a] === board[b] && board[b] === board[c]){
            boxes[a].classList.add('winner');
            boxes[b].classList.add('winner');
            boxes[c].classList.add('winner');
            gameOver = true;
            winner = board[a];
            return;
        }
    }

    if(allFilled()) gameOver = true;
}
function enableBoard(){
    boxes.forEach(box => {
        box.addEventListener('click', (event) => {
            //console.log("Dhh")
            if(gameOver) return;
            if(box.classList.contains('filled')) return;
            
            box.classList.add('filled');

            const div = document.createElement('div')
            div.style.display = "flex";
            div.style.justifyContent = "center"
            div.style.alignItems = "center"
            div.style.fontSize = "30px";


            //console.log('Done')
            if(!turn) div.innerText = 'X';
            else div.innerText = 'O';

            box.append(div);

            turn = (turn + 1) % 2;

            checkWinner();

            if(gameOver && winner != ''){
                const p = document.createElement('p');
                p.innerText = `The Winner is ${winner}`
                p.style.fontSize = "30px";
                const winnerDiv = document.getElementById('winner-msg');
                winnerDiv.append(p)
                p.classList.add('winner-display')
            }
            else if(gameOver){
                const p = document.createElement('p');
                p.innerText = `This Game is a TIE`
                p.style.fontSize = "30px";
                 const winnerDiv = document.getElementById('winner-msg');
                winnerDiv.append(p)
                p.classList.add('winner-display')
            }
        })
    })
}

enableBoard();

function clearBoard(){
    boxes.forEach(box => {
        const getDiv = box.querySelector('div')
        getDiv?.remove();
        box.classList.remove('filled');
        box.classList.remove('winner')
    })

    winner = '';
    gameOver = false;
    const winnerMsg = document.getElementsByClassName('winner-display')[0];
    if(winnerMsg) winnerMsg.remove();

}

resetBtn.addEventListener('click', clearBoard);