const recipeBtn = document.querySelector("#recipe-btn");
const homeBtn = document.querySelector("#home-btn");
var modal = document.querySelector("#error-modal");
var span = document.getElementsByClassName("close")[0];
var recipeName = document.querySelector(".recipe-name")
var calories = document.querySelector("#calories");
var totalFat = document.querySelector("#fat");
var carbs = document.querySelector("#carbohydrates");
var protein = document.querySelector("#protein");
var nutritionArray = [];
var spoonApiKey = 'ac0a4b145emshfe4704cf11e8436p1c62fejsn125fb00f23c5';

span.onclick = function() {
    modal.style.display = "none";
}

var showModal = function() {
    modal.style.display = "block";
}

// displays the nutrition information from the spoonacular api
var displayNutrition = function() {
    recipeName.textContent = JSON.parse(localStorage.getItem('meal')).meals[0].strMeal;
    
    calories.textContent = nutritionArray[0].calories['value'];
    protein.textContent = nutritionArray[0].protein['value'] + ' g';
    carbs.textContent = nutritionArray[0].carbs['value'] + ' g';
    totalFat.textContent = nutritionArray[0].protein['value'] + ' g';
};

var getNutrition = function(event) {
    recipeTitle = JSON.parse(localStorage.getItem('meal')).meals[0].strMeal;
    console.log('this is meal:', recipeTitle);
    var spoonacularApi = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title=${recipeTitle}`;

    fetch(spoonacularApi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "ac0a4b145emshfe4704cf11e8436p1c62fejsn125fb00f23c5"
	}})
    .then(response => {
        return response.json();
    }).then(data =>{
        // evaluates if there is nutrition data and returns to recipe if nutrition data isn't found
        console.log(data);
        if(data.status === 'error') {
            showModal();
        
        } else {
            console.log('displays nutrition facts');
            nutritionArray = [data];
        
            displayNutrition(nutritionArray);
        }
    });
};

// adds event listener and location for the 'Back to Recipe' button
recipeBtn.addEventListener("click", function () {
    location.href = "page2.html";
});

// adds event listener and location for the 'Return to Home' button
homeBtn.addEventListener("click", function () {
    location.href = "index.html";
});

// calls the api
getNutrition();