const resetBtn = document.getElementById('reset-btn');
const table = document.getElementById('game-boxes');
const td = document.querySelectorAll('td')
let count = 0;
let shipCount = 0, waterCount = 0;

function removeImgs(){
    
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.classList.add('hidden')
    })
}

function resetCounts(){
    count = 0;
    shipCount = 0;
    waterCount = 0;
}

resetBtn.addEventListener('click', () => {
    removeImgs();
    resetCounts();
});

td.forEach(t => {
    t.addEventListener('click', (event) => {
        const img = event.currentTarget.querySelector('img');
        
        if(!img.classList.contains('hidden')) return;

        img.classList.remove('hidden');

        if(img.classList.contains('ship')) shipCount++;
        else waterCount++;
        
        count++;
        checkWinner();
    });
})

const checkWinner = () => {
    if(shipCount == 5){
        setTimeout(() => {
            alert('You WON !!!');
            removeImgs();
            resetCounts();
            
        }, 100)
        return;
    }

    if(count == 8){
         setTimeout(() => {
            alert('You LOST !!!');
            removeImgs();
            resetCounts();
        }, 100);
        return;
    }
}

