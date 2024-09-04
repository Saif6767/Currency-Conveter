const droplist = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton =document.querySelector("form button");

for(let i = 0; i < droplist.length; i++){
    for(currency_code in country_code ){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i == 1){
            selected = currency_code == "NPR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend",optionTag);
    }
    droplist[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code] }/flat/64.png`;
    }
    }
}

getButton.addEventListener("load", () =>{
    getExchangeRate();
    
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
    
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
        
    }
    
    exchangeRateTxt.innerText =" Getting exchange rate...";
    let apiKey = "cc29b62fa1b0be2dac1adf7a";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}