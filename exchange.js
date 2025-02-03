
//Adds an event listener to the DOMContentLoaded event, which fires when the HTML document has finished loading. 
//It ensures that the JavaScript code runs only after the HTML has been fully parsed and rendered.
document.addEventListener('DOMContentLoaded', function() {
    const amount = document.getElementById('amount'); //the amount the user wants to convert 
    const currency = document.getElementById('currency'); //the currency the user picks to convert too 
    const converter = document.getElementById('converter'); //converter button 
    const result = document.getElementById('results'); //final results of the conversion 

    const apiKey = '35a3e6d58fmsh499147b4295f63bp1f5a78jsn8780027056d9'; 
    const apiUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to='; //apiUrl is responsible for specifying the currency pair in the API request and getting the corresponding exchange rate between USD and the selected currency.

    //adds a click event listener to the converter button. The arrow function () => { ... } defines the code that should execute when the button is clicked.
    converter.addEventListener('click', () => {
        const amountTotal = amount.value;
        const currencyTotal = currency.value;
        const url = `${apiUrl}${currencyTotal}`; //appends the currency the user selected from the drop down menu with the apiURL

        //The fetch() function is responsible for sending an HTTP request to the specified URL (url) and retrieving the response from the server. 
        //It initiates the network request and returns a Promise that resolves to the Response object representing the response from the server.
        fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        })
        

        //This line takes the Response object returned by the fetch() function and uses the .json() method to parse the response as JSON. 
        //The .json() method returns a new promise that resolves to the parsed JSON data. This step is necessary to extract the data from the response body.
        .then(response => response.json()) 

         //Within this block, the response is converted to JSON format using response.json(). 
         //Then, the resulting data is accessed to extract the exchange rate (rate property). 
         //Finally, the conversion calculation is performed and displayed in the result element.

         .then(data => {
            const rate = data.rates[currencyTotal];
            if (rate) {
                const conversionResult = amountTotal * rate;
                result.innerHTML = `${amountTotal} USD = ${conversionResult.toFixed(2)} ${currencyTotal}`;
            } else {
                result.innerHTML = 'Failed to retrieve exchange rate. Please try again.';
            }
        })
        
        .catch(error => {
            console.error('Request failed:', error);
            result.innerHTML = 'An error occurred, please try again.';
        });
    });
    
});
