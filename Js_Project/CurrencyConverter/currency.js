async function getCountries(){

    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies")
        const data = await response.json();
    
        const countries = [];
    
        data.forEach((country) => {
            const newObj = {
                name: country.name.official,
                code: Object.keys(country.currencies)[0],
                code2: country.cca2
            }

            countries.push(newObj)
        })

       console.log(countries);
        return countries;

       
    } catch (error) {
        console.log(error.message)
    }
}

function getFlagEmoji(code) {
    return String.fromCodePoint(
        ...code.toUpperCase()
              .split('')
              .map(char => 127397 + char.charCodeAt())
    );
}


async function fillCountries(fromSelect, toSelect){
    const countryDetails = await getCountries();

    //console.log(countryDetails);

    countryDetails.forEach((country) => {
        const newOption1 = document.createElement('option');
        const newOption2 = document.createElement('option');
        
        const flag = getFlagEmoji(country.code2);

        newOption1.value = country.code;
        newOption2.value = country.code;

        newOption1.innerText = `${flag} ${country.code} - ${country.name}`;
        newOption2.innerText = `${flag} ${country.code} - ${country.name}`;

        fromSelect.append(newOption1);
        toSelect.append(newOption2);
    })
}


const selectElement = document.getElementsByTagName('select')
fillCountries(selectElement[0], selectElement[1]);

const convertBtn = document.getElementById('convert-button');
convertBtn.addEventListener('click', async () => {
    const getNumber = document.getElementById('value').value;

    if(!getNumber) return;

    const getFromCountry = document.getElementById('from-country').value;
    const getToCountry = document.getElementById('to-country').value;

    if(getFromCountry === "#" || getToCountry === "#"){
        console.log('Choose right country');
        return;
    }
    const fetchRate =  await fetch(`https://v6.exchangerate-api.com/v6/1a281671cadebd584e39218d/latest/USD`)
    const rateData = await fetchRate.json();


    const conversionList = rateData.conversion_rates;
    const rate = conversionList[getToCountry] / conversionList[getFromCountry];
    
    console.log(rate);
    const convertedDiv = document.getElementById('converted-value');
    convertedDiv.innerText = String(Number(getNumber) * rate);

})






