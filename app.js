
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
let jsonData;
let trimmedData = [];

// This will call the CoinAPI and store the returned JSON:
const callAPI = async () => {
    const response = await fetch (apiUrl, {
         headers: {
        'Accept': 'application/json',
        'X-CoinAPI-Key': `${apiKey}`,
    }
});
    jsonData = await response.json();
    getNamePricePairs(jsonData);
    sortData(trimmedData);
}

/*
Event Listeners are established here:
*/
btnTest.addEventListener("click", function(){
    callAPI()
})


/*
Functions are established here:
*/
function performSearch(){
    // Perform the search logic here - so far grabbed the value from the input box.
    let searchText = searchBox.value;
    console.log(`Search criteria taken from text box: ${searchText}`)
}

function getNamePricePairs(inputJson){
    // Iterates through the returned JSON and extracts the currency name, ID and its USD value:
    for (let i = 0; i<inputJson.length; i++){
        if ((inputJson[i].name != null || undefined) && (inputJson[i].price_usd != null || undefined) && (inputJson[i].asset_id != null || undefined) && inputJson[i].type_is_crypto === 1) {
            trimmedData = [...trimmedData, [inputJson[i].asset_id, inputJson[i].name, Math.round(inputJson[i].price_usd)]]
        }
    }
}

function sortData(arr){
    // Sorts descending price USD:
   arr.sort(function(a,b) {return b[2]-a[2]})
   console.log(arr)
}