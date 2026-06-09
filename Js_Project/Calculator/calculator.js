let currentAnswer = 0;
let currentNumber = 0;
let currentOperator = "#";

function resetEverything(){
    currentAnswer = currrentNumber = 0;
    currentOperator = '#';

}

function clearDisplay(){
    const currentAnswerElement = document.getElementById('answer-section');
    currentAnswerElement.value = '0';
}

function updateCurrentNumber(){

    const currentAnswerElement = document.getElementById('answer-section');
    const newNumber = Number(currentAnswerElement.value);
        
        if(isNaN(newNumber)){
            alert(`Please enter a valid number`);
            return;
        }

        currentNumber = newNumber;
}

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        const currentAnswerElement = document.getElementById('answer-section');
        let currentString = (currentAnswerElement.value === '0') ? "": currentAnswerElement.value ;

        if(number.innerText === '.'){
            currentString += number.innerText;
            currentAnswerElement.value = currentString;
            //console.log(currentString);
            return;
        }

        currentString += number.innerText;
        currentAnswerElement.value = String(currentString);
    })
})

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', ()=> {
       
        updateCurrentNumber();


        currentOperator = operator.innerText;
        //console.log(currentOperator)

        currentAnswer = currentNumber;
        currentNumber = 0;
        
        const currentAnswerElement = document.getElementById('answer-section');
        currentAnswerElement.value = String(currentNumber);

        console.log(currentAnswer);
    })
    
})

const equals = document.getElementById('equals');
equals.addEventListener('click', () => {
    if(currentOperator === '#') return;

    updateCurrentNumber();

    //console.log(`${currentAnswer} is answer and ${currentNumber} is number and ${currentOperator} is operator`);

    switch(currentOperator){
        case '+':
            currentAnswer += currentNumber;
            break;
        case '-':
            currentAnswer -= currentNumber;
            break;
        case 'x':
            currentAnswer *= currentNumber;
            break;
        case '/':
            currentAnswer /= currentNumber;
            break;
        case '%':
            currentAnswer %= currentNumber;
            break;
        case 'Exp':
            currentAnswer = Math.pow(currentAnswer, currentNumber);
            break;
        default:
            console.log("Unidentified operator");
            break;
    }

    const currentAnswerElement = document.getElementById('answer-section');
    currentAnswerElement.value = currentAnswer;
    
    resetEverything();
})

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    resetEverything();
    clearDisplay();
})

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => {
     const currentAnswerElement = document.getElementById('answer-section');
    const currString = currentAnswerElement.value;
    let newString = "";
     if(currString === '0') return;

     if(currString.length === 1){
        newString = '0';
     }
     else{
        newString = currString.slice(0, currString.length - 1);
     }

     currentAnswerElement.value = newString;
})



