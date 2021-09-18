var submitBtn = $('.submitBtn');
var randomBtn = $('.randomBtn');

submitBtn.on("click", function () {
    var meat = [];
    var veg = [];
    var allergy = [];

    //fish options salmon 

    $.each($("input[name='meat']:checked"), function () {
        meat.push($(this).val());
    });

    $.each($("input[name='veggie']:checked"), function () {
        veg.push($(this).val());
    });

    $.each($("input[name='allergy']:checked"), function () {
        allergy.push($(this).val());
    });

    fetchApi(meat, veg, allergy)
});

function reRoll() {
    var meat = [];
    var veg = [];
    var allergy = [];
    $.each($("input[name='meat']:checked"), function () {
        meat.push($(this).val());
    });

    $.each($("input[name='veggie']:checked"), function () {
        veg.push($(this).val());
    });

    $.each($("input[name='allergy']:checked"), function () {
        allergy.push($(this).val());
    });

    fetchApi(meat, veg, allergy)
}


function fetchApi(meat, veg, allergy) {
    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" //+ ingredients list 
    console.log(meat)
    console.log(veg)
    console.log(allergy)
    selectedIngredients = []

    if (meat.length >= 1) {
    
    meat = meat[Math.floor(Math.random() * meat.length)]
    selectedIngredients.push(meat)
    } 
    if (veg.length >= 1) {
    veg = veg[Math.floor(Math.random() * veg.length)]
    selectedIngredients.push(veg)
    }

    if (selectedIngredients.length !== 2) {
        requestUrl = requestUrl + selectedIngredients[0]
    } else {
    requestUrl = requestUrl + selectedIngredients[0] + "," + selectedIngredients[1]
    }
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getDetails(data)
                })
            }
        }) 
}

function getDetails(data) {
    if (data.meals === null) {
        reRoll();
    } else {
        requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" //something
        requestUrl = requestUrl + data.meals[0].idMeal
        console.log(requestUrl)
        console.log(data.meals[0].idMeal)

        fetch(requestUrl)
            .then(function(response) {
                if(response.ok) {
                    response.json().then(function (data) {
                        saveChoice(data)
                    })
                }
            })

    }
}

randomBtn.on('click', function () {
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
    console.log(random)
    localStorage.setItem("meal", JSON.stringify(random))
    displayMealInfo(random)
}

function saveChoice(choice) {
    console.log(choice)
    if (choice.meals === null) {
        reRoll();
    } else {
        localStorage.setItem("meal", JSON.stringify(choice))
        window.location.href = "page2.html"
        // displayMealInfo(choice)
    }
}

function displayMealInfo(data) {
    console.log(data)

    var mealName = data.meals[0].strMeal
    var mealImg = data.meals[0].strMealThumb
    var mealInstructions = data.meals[0].strInstructions
    var youtube = data.meals[0].strYoutube
    var ingredients = []
    var meals = data.meals[0]
    


    for (i=1; i<21; i++) {
        var strIngredient = "strIngredient" + i
        var strMeasure = "strMeasure" + i
        console.log(strIngredient)
        console.log(data.meals[0][strIngredient])
        ingredients.push(data.meals[0][strIngredient])
        ingredients.push(data.meals[0][strMeasure])
        
       

    }
    console.log(ingredients)
} 