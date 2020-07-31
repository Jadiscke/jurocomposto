const options1 = { style: 'currency', currency: 'BRL' };
const currencyFormat = new Intl.NumberFormat('pt-BR', options1);
function getValues(){
  const inputs = document.querySelectorAll("input");
  const select = document.querySelector("select");
  const values = {};
  for (const input of inputs){
    const name = input.name;
    const value = input.value;
    values[name] = Number(value);
  }
  values[select.name] = select.value;
  return values
}
function futureValue(initial_value, months, interest){
  return initial_value * Math.pow(interest,months)
}
function futureValueApplyMonthly(monthly_value, months,interest){
  return monthly_value * (Math.pow(interest,months) - 1)/(interest - 1)
}
function updateInterest(interest_type, interest){
  const updatedInterest = interest/100 + 1;
  if (interest_type === "yearly"){
    return Math.pow(updatedInterest, 1/12)
  }
  return updatedInterest
}
function calculateReturn(options){
  const {initial_value, monthly_value, months, interest, interest_type} = options;
  const updatedInterest = updateInterest(interest_type, interest);
  const initalAplication = futureValue(initial_value,months,updatedInterest);
  const monthlyAplication = futureValueApplyMonthly(monthly_value, months, updatedInterest);

  return initalAplication + monthlyAplication
}

const calculateButton = document.querySelector("button.calculate");
const resultDiv = document.querySelector("div.result");
calculateButton.addEventListener('click', ()=>{
  return resultDiv.innerHTML=`
  <span>${currencyFormat.format(calculateReturn(getValues()))} </span>
  `
});