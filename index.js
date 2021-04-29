"use strict";

async function fetchDataToBeRendered( resourceUrl ) {
    //This fetches the data to be rendered, from a json file. I used an async and await because it's going to take time. And besides, this is a non-blocking code.
    let response = await fetch( resourceUrl );
    let data = await response.json();
    return data;
};


let listContainer = document.getElementById("list__container"), //gets the container that list items will be rendered into
    searchInput = document.getElementById("search"), //gets the search input bar
    collectedJsonData = [], //creates a variable for storing fetched data. It was created globally so it'll be accessible to different functions (filtering and rendering)
    output = "", //creates a variable to store all list items(in list tags)
    url = "list.json"; //url of data to be used on fetch api


function renderMethod ( toBeRenderedData ) { //This function handles the rendering of any data 
    if (toBeRenderedData.length === 0 ) {
        //this handles the condition if an empty array is returned, when the original fetched data passes through filtering
        listContainer.innerHTML = "no match";
    } else {
//        toBeRenderedData.forEach( data => output += `<li>${data.stack}</li>` ); //this wraps each list item in an  HTML list tag and concatenates & store them all in a variable
        toBeRenderedData.forEach( data => output += `<li>${data}</li>` ); //this wraps each list item in an  HTML list tag and concatenates & store them all in a variable
        listContainer.innerHTML = output; //puts the concatenated tags in the DOM
        output = "" //this resets "output" variable to an empty string. comment it out and see what happens when the search input is used
    }
}


fetchDataToBeRendered( url ) //this calls the async function containing the fetch api
    .then( arr => { //an async function returns a promise, so a ".then" is chained to it
//    console.log(arr)
        arr.forEach( i => collectedJsonData.push(i.title) )
//    collectedJsonData.length = 25;
//        collectedJsonData = [...arr]; //using the spread operator, the json result is "deep" copied to a variable (created globally)
        renderMethod(collectedJsonData); //calls the function that handles the rendering of data, using the deep copied data
    }).catch( err => console.log( "An error occurred:", err ) ) //handles error by logging it to the console


function collectInputValue(e) { //this works as the name indicates - collect input value
    let searchInputValue = e.target.value.trim(); //gets the value of the search input bar and removes every "outer space" out of the value collected. Remove the trim and use the search bar to see what happens
    
    let filtered = collectedJsonData.filter( item => { //this subjects the fetched data to filtering using the search input value as a query
        return item.includes(searchInputValue) //the array method ".includes" returns either true or false. 
    //and the filter only returns items that return true to a function
    } )
    
    renderMethod(filtered); //calls the function that handles the rendering of data, using the filtered data
}


searchInput.addEventListener("input", collectInputValue) //adds event listener to the the search input bar, and calls the function that collects its value