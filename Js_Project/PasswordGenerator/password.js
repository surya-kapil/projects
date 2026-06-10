async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text successfully copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

const sliderValue = document.getElementById('sliderValue');
const slider = document.getElementById('mySlider');
slider.addEventListener('input', () => {
    console.log(slider.value)
    
    sliderValue.innerText = String(slider.value);
    const newPassword = generateNewPassword(slider.value)
    console.log(newPassword);

    const passwordText = document.getElementById('actualPassword')
    console.log(passwordText);
    if(newPassword) passwordText.value = newPassword;
  
})

const generateNewPassword = (value) => {
    const isNumbersChecked = document.getElementById('number-checkbox').checked
    const isLettersChecked = document.getElementById('letter-checkbox').checked;
    const isMixedChecked = document.getElementById('mixed-checkbox').checked;
    const isPunctuationsChecked = document.getElementById('punctuations-checkbox').checked;

    if(!isNumbersChecked && !isLettersChecked &&
        !isMixedChecked && !isPunctuationsChecked
    ){
            console.log("Check atleast one box");
            return;
    }

    const allowedNums = [];

    if(isNumbersChecked){
        const newArr = [];
        for(let i=0;i<10;i++)  newArr.push(i);
        allowedNums.push(...newArr)
    }

    if(isLettersChecked){
        const newArr = Array.from('abcdefghijklmnopqrstuvxyz');
        allowedNums.push(...newArr);
    }

    if(isMixedChecked){
        if(!isLettersChecked){
            const newArr = Array.from('abcdefghijklmnopqrstuvxyz');
        allowedNums.push(...newArr);
        }

        const newArr = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        allowedNums.push(...newArr);
    }

    if(isPunctuationsChecked){
        const newArr = Array.from(',/.<>?;:"{}[]-_=+');
        allowedNums.push(...newArr);
    }

    const randomsWithDuplicates = [];
    let newPassword = "";

    for (let i = 0; i < value; i++) {
        const randomIndex = Math.floor(Math.random() * allowedNums.length);
        newPassword += allowedNums[randomIndex]
    }
    
    return newPassword;
}

const copyPassword = document.getElementById('copy');
copyPassword.addEventListener('click', () => {
     const passwordText = document.getElementById('actualPassword').value;

     if(!passwordText) return;
    copyToClipboard(passwordText);
})