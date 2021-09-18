const recipeBtn = document.querySelector("#recipe-btn");
const homeBtn = document.querySelector("#home-btn");
var recipeName = document.querySelector("#recipe-name")
var calories = document.querySelector("#calories");
var totalFat = document.querySelector("#fat");
var carbs = document.querySelector("#carbohydrates");
var protein = document.querySelector("#protein");
var spoonApiKey = 'ac0a4b145emshfe4704cf11e8436p1c62fejsn125fb00f23c5';


var getNutrition = function(event) {
    recipeTitle = JSON.parse(localStorage.getItem('mealName'));
    var spoonacularApi = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title=${recipeTitle}`;

    fetch(spoonacularApi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "ac0a4b145emshfe4704cf11e8436p1c62fejsn125fb00f23c5"
	}})
    .then(response => {
        console.log(response);
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                displayNutrition(data);
            }) 
        }

    })
    .catch(err => {
        console.error(err);
        alert(`Error: ${response.statusText}`);
    });
};

var displayNutrition = function() {
    recipeName = JSON.parse(localStorage.getItem('mealName'))
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    calories.textContent = data.calories.value;
    protein.textContent = data.protein.value;
    carbs.textContent = data.carbs.value;
    totalFat.textContent = data.fat.value;
};


submitBtn.on('click', function() {

console.log(alergyCheckbox.checked)

})




// adds event listener and location for the 'Back to Recipe' button
recipeBtn.addEventListener("click", function () {
    location.href = "page2.html";
});

// adds event listener and location for the 'Return to Home' button
homeBtn.addEventListener("click", function () {
    location.href = "index.html";
});


