const converterForm= document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const resultDiv =document.getElementById("result")


converterForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const amount= parseFloat(amountInput.value);


    //Get the selected currencies from the dropdowm menus
    const fromCurrency= fromCurrencySelect.value;
    const toCurrency =toCurrencySelect.value;

    
    //only proceed if the entered number is a valid number
    if(!isNaN(amount)){ 
    fetchConversionRate(fromCurrency,toCurrency,amount);
     }else{
        resultDiv.textContent="please enter a valid amount";
     }
   })

   //Function to fetch the converted rate and calculate the converted amount
   function fetchConversionRate(fromCurrency,toCurrency,amount){
    resultDiv.textContent="Converting...";

    //construct the API URL using the "from" currency
    const apiUrl=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;


    //make a fetch request to get the exchange rates 
    fetch(apiUrl)
    .then((response)=> response.json())
    .then((data)=>{
        const rate= data.rates[toCurrency];
        if(rate){
            const convertedAmount=amount*rate;
            resultDiv.textContent=`${amount}${fromCurrency}=${convertedAmount.toFixed(2)}${toCurrency}`;  
              }else{
                resultDiv.textContent="conversion rate not available";
              }
    })
    .catch((error)=>{
        //log any errors to the console and inform the user
        console.error("Error fetching conversion rate:",error);
        resultDiv.textContent="Error fetching conversion rate please try again later.";
    });
  }

