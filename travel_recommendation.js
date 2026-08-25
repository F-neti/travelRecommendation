// =====================================
// Travel Recommendation Web Application
// =====================================


// -------------------------------------
// Task 6: Fetch JSON data
// -------------------------------------

let travelData = null;

async function fetchData() {
    try {

        const response = await fetch("travel_recommendation_api.json");

        if (!response.ok) {
            throw new Error("Could not load the JSON file");
        }

        travelData = await response.json();

        console.log("Travel data loaded:");
        console.log(travelData);

    } catch (error) {

        console.error("Error fetching data:", error);

    }
}


// -------------------------------------
// Task 7: Normalize search keyword
// -------------------------------------

function normalizeKeyword(input) {

    // Remove spaces and convert to lowercase
    input = input.trim().toLowerCase();


    // Accept beach / beaches
    if (input === "beach" || input === "beaches") {
        return "beaches";
    }


    // Accept temple / temples
    if (input === "temple" || input === "temples") {
        return "temples";
    }


    // Accept country / countries
    if (input === "country" || input === "countries") {
        return "countries";
    }


    return input;
}


// -------------------------------------
// Task 8: Display recommendations
// -------------------------------------

function giveRecommendation() {

    // Get what the user typed
    const input =
        document.getElementById("keywordInput").value;


    // Normalize the keyword
    const keyword = normalizeKeyword(input);


    // Get results container
    const resultDiv =
        document.getElementById("result");


    // Clear previous results
    resultDiv.innerHTML = "";


    // Check whether JSON data has loaded
    if (!travelData) {

        resultDiv.innerHTML =
            "<p>Travel data is still loading. Please try again.</p>";

        return;
    }


    let recommendations = [];


    // ---------------------------------
    // BEACH SEARCH
    // ---------------------------------

    if (keyword === "beaches") {

        recommendations = travelData.beaches;

    }


    // ---------------------------------
    // TEMPLE SEARCH
    // ---------------------------------

    else if (keyword === "temples") {

        recommendations = travelData.temples;

    }


    // ---------------------------------
    // COUNTRY SEARCH
    // ---------------------------------

    else if (keyword === "countries") {

        /*
         The countries section contains
         countries, and each country contains
         cities.

         We will display the cities as
         recommendations.
        */

        travelData.countries.forEach(country => {

            country.cities.forEach(city => {

                recommendations.push(city);

            });

        });

    }


    // ---------------------------------
    // INVALID SEARCH
    // ---------------------------------

    else {

        resultDiv.innerHTML =
            "<p>Please search for beach, temple, or country.</p>";

        return;
    }


    // ---------------------------------
    // Create recommendation cards
    // ---------------------------------

    recommendations.forEach(item => {

        // Create card
        const card = document.createElement("div");

        card.className = "recommendation";


        // Create title
        const title = document.createElement("h2");

        title.textContent = item.name;


        // Create image
        const image = document.createElement("img");

        image.src = "images/" + item.imageUrl;

        image.alt = item.name;


        // Create description
        const description = document.createElement("p");

        description.textContent = item.description;


        // Put everything inside the card
        card.appendChild(title);

        card.appendChild(image);

        card.appendChild(description);


        // Put card inside results
        resultDiv.appendChild(card);

    });

}


// -------------------------------------
// Task 9: Clear button
// -------------------------------------

function resetSearch() {

    // Clear search input
    document.getElementById("keywordInput").value = "";


    // Clear results
    document.getElementById("result").innerHTML = "";

}


// -------------------------------------
// Button event listeners
// -------------------------------------

document
    .getElementById("btnSearch")
    .addEventListener("click", giveRecommendation);


document
    .getElementById("btnClear")
    .addEventListener("click", resetSearch);


// -------------------------------------
// Load JSON when page starts
// -------------------------------------

fetchData();