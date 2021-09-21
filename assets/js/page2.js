
var mealImage = $("#meal-img")
var mealName = $(".meal-name")
var mealInstructions = $(".instructions")
var youtube = $(".youtube")
var list = $(".ingredients")

var homeButton = $("#homeBtn")
var randomButton = $("#randomBtn")
var homeButtonMobile = $("#homeBtnMobile")
var randomMobile = $("#randomBtnMobile")


homeButton.on("click", function() {
    window.location.href = "index.html"
})

homeButtonMobile.on("click", function() {
    window.location.href = "index.html"
})

randomMobile.on("click", function () {
    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/random.php"

    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    saveRandom(data);
                })
            } else {
                alert(`Error: ${response.statusText}`)
                return //redirect to a 404 page
            }
        })

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
                alert(`Error: ${response.statusText}`)
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
    
    var ingredients = []
    for (i=1; i<21; i++) {
        var strIngredient = "strIngredient" + i
        var strMeasure = "strMeasure" + i
        ingredients.push(meal.meals[0][strIngredient])
        ingredients.push(meal.meals[0][strMeasure])
    }
    var ingredientList = []
    for (i=0; i<ingredients.length; i++) {
        ingredientList.push(" " + ingredients[i] + ": " + ingredients[i + 1])
        i = i + 1
    }
    const filtered = ingredientList.filter((element) => {
        return element.length > 4;
    });
    list.html(filtered.toString())
}

function init() {
    setAttributes();
}

init();