/*
Page elements such as buttons and UI tiles are established here:
*/
const btnTest = document.getElementById("btnTest");
const searchBox = document.getElementById("searchBox");


/*
Event Listeners are established here:
*/
btnTest.addEventListener("click", function(){
    performSearch()
})


/*
Functions are established here:
*/
function performSearch(){
    // Perform the search logic here - so far grabbed the value from the input box.
    let searchText = searchBox.value;
    console.log(`Search criteria taken from text box: ${searchText}`)
}