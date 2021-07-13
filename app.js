
/*
Page elements such as buttons and UI tiles are established here:
*/
const btnTest = document.getElementById("btnTest");
const searchBox = document.getElementById("searchBox");

/* 
Parameters for the API are here:
*/
const apiUrl = "https://rest.coinapi.io/v1/assets";
const apiKey = "7AEDAEF9-DEC4-4CC7-B682-C7AB3A36CD93"; // Only 100 calls are allowed, so you will need to generate your own key for this.

// This will call the CoinAPI and store the returned JSON:
const callAPI = async () => {
    const response = await fetch (apiUrl, {
         headers: {
        'Accept': 'application/json',
        'X-CoinAPI-Key': `${apiKey}`,
        }
    });
    const jsonData = await response.json();
    const trimmedData = getNamePricePairs(jsonData);
    return sortData(trimmedData);
}

/*
Event Listeners are established here:
*/
btnTest.addEventListener("click", () => {
    callAPI()
})


/*
Functions are established here:
*/
const performSearch = () => {
    // Perform the search logic here - so far grabbed the value from the input box.
    let searchText = searchBox.value;
    console.log(`Search criteria taken from text box: ${searchText}`)
}

const getNamePricePairs = (inputJson) => {
    // Iterates through the returned JSON and extracts the currency name, ID and its USD value:
    return inputJson.reduce((accumulator, crypto) => {
        const price_usd = parseFloat(Number(crypto.price_usd).toString()).toFixed(6);
        const { name, asset_id, type_is_crypto } = crypto;

        if (name && price_usd && price_usd !== "NaN" && asset_id && type_is_crypto === 1) {
            accumulator = [...accumulator, { asset_id, name, price_usd }]
        }
        return accumulator;
    }, []);
}

const sortData = (arr) => {
    // Sorts descending price USD:
   const sortedArray = arr.sort((a,b) => {return Number(b.price_usd) - Number(a.price_usd)})
   console.log(sortedArray);
   return sortedArray;
}