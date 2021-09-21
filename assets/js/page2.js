
var mealImage = $("#meal-img")
var mealName = $(".meal-name")
var mealInstructions = $(".instructions")
var youtube = $(".youtube")
var list = $(".ingredients")

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
                    savePrior();
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
    savePrior();
}

var savedMeals = []

function savePrior() {
    var meal = JSON.parse(localStorage.getItem("meal"))
    var mealPic = meal.meals[0].strMealThumb
    var mealId = meal.meals[0].idMeal
    savedMeals = JSON.parse(localStorage.getItem("saved"))
    if (savedMeals === null) {
        savedMeals = []
        savedMeals.push({
            mealPic, mealId
        })
        storePrior();
    } else if (savedMeals.length < 5) {
        console.log("hello")
        savedMeals.unshift({
            mealPic, mealId
        })
        storePrior();
    } else {
        savedMeals.shift()
        savedMeals.push({
            mealPic, mealId
        })
        
        storePrior();
    }
}

function storePrior() {
    localStorage.setItem("saved", JSON.stringify(savedMeals))
    populateSaved();
}


var img1 = $("#save1")
var img2 = $("#save2")
var img3 = $("#save3")
var img4 = $("#save4")


function populateSaved() {
    var toPopulate = JSON.parse(localStorage.getItem("saved"))
    
    img1.css("background-image", "url(" + toPopulate[0].mealPic + ")")
    img1.attr("name","'" +  toPopulate[0].mealId + "'")
    if (toPopulate.length === 2) {
        img2.attr("src", toPopulate[1].mealPic)
    } else if (toPopulate.length === 3) {
        img2.css("background-image", "url(" + toPopulate[1].mealPic + ")")
        img3.css("background-image", "url(" + toPopulate[2].mealPic + ")")
    } else {
        
        img2.css("background-image", "url(" + toPopulate[1].mealPic + ")")
        img3.css("background-image", "url(" + toPopulate[2].mealPic + ")")
        img4.css("background-image", "url(" + toPopulate[3].mealPic + ")")
    }
}

img1.on("click", function () {
    var toPopulate = JSON.parse(localStorage.getItem("saved"))
    searchItem = toPopulate[0].mealId
    loadLast(searchItem)

})

img2.on("click", function () {
    var toPopulate = JSON.parse(localStorage.getItem("saved"))
    searchItem = toPopulate[1].mealId
    loadLast(searchItem)
})

img3.on("click", function () {
    var toPopulate = JSON.parse(localStorage.getItem("saved"))
    searchItem = toPopulate[2].mealId
    loadLast(searchItem)
})

img4.on("click", function () {
    var toPopulate = JSON.parse(localStorage.getItem("saved"))
    searchItem = toPopulate[3].mealId
    loadLast(searchItem)
})

function loadLast (data) {
    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + data
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


}


init();




// img2.attr("src", toPopulate[1].mealPic)
// img3.attr("src", toPopulate[2].mealPic)
// img4.attr("background", toPopulate[3].mealPic)