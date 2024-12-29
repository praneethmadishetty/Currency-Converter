const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


let fromCurr = document.querySelector(".select");
let tocurr = document.querySelector("#to");
const dropdowns = document.querySelectorAll(".country select");
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD') {
            newOption.selected = "selected";
        } else if (select.name === 'to' && currCode === 'INR') { 
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}



let amt = document.querySelector("#amt");
let btn = document.querySelector("#msgbtn");
btn.addEventListener("click", async (evt) => {
    accAmt(amt.value);
    updateExchange(evt);

})

const accAmt = (amount) => {
    if (amount == '' || amount < 1) {
        amount = '1';
        amt.value = '1';
    }
    console.log(amount);
}

const updateExchange = async () => {
    console.log(fromCurr.value, tocurr.value);
    const msg = document.querySelector(".msg");
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data[tocurr.value.toLowerCase()];
    console.log(rate);
    // let newmsg = `${amt}${}`
    console.log(msg.innerText);
    finalRate = amt.value * rate;
    let newmsg = `${amt.value} ${fromCurr.value} = ${finalRate} ${tocurr.value}`
    msg.innerText = newmsg; 
}
window.addEventListener('load' ,() => {
    updateExchange();
})