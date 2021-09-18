
var mealImage = $("#meal-img")
var mealName = $(".meal-name")
var mealInstructions = $(".instructions")
var youtube = $(".youtube")


var homeButton = $("#homeBtn")
var randomButton = $("#randomBtn")
homeButton.on("click", function() {
    window.location.href = "index.html"
})

randomButton.on('click', function () {
    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/random.php"

    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    saveRandom(data);
                })
            } else {
                return //redirect to a 404 page
            }
        })

})

function saveRandom(random) {
    localStorage.setItem("meal", JSON.stringify(random))
    setAttributes();
}

function setAttributes() {
    var meal = JSON.parse(localStorage.getItem("meal"))
    mealImage.attr("src",meal.meals[0].strMealThumb)
    mealName.html(meal.meals[0].strMeal)
    mealInstructions.html(meal.meals[0].strInstructions)
    youtube.attr("href",meal.meals[0].strYoutube)
    
    
    
    console.log(meal.meals[0].strMeal)
    var ingredients = []
    for (i=1; i<21; i++) {
        var strIngredient = "strIngredient" + i
        var strMeasure = "strMeasure" + i
        ingredients.push(meal.meals[0][strIngredient])
        ingredients.push(meal.meals[0][strMeasure])
    }
    // ingredients = ingredients.toString()
    console.log(ingredients)
    
    var filtered = ingredients.filter(Boolean)
    
    for(i=0; i<filtered.length; i++) {
        
    }


    console.log(filtered)
    
    
    // var ingredientText = ingredients[0] + ": " + ingredients[1]
    // console.log(ingredientText)


}








function init() {
    setAttributes();
}

init();