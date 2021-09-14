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

function fetchApi(meat, veg, allergy) {
    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" //+ ingredients list 
    console.log(meat)
    console.log(veg)
    console.log(allergy)
    selectedIngredients = []

    if (meat.length >= 1) {
    selectedIngredients.push(meat)
    meat = meat[Math.floor(Math.random() * meat.length)]
    } 
    if (veg.length >= 1) {
    veg = veg[Math.floor(Math.random() * veg.length)]
    selectedIngredients.push(veg)
    }

    console.log(selectedIngredients)

    requestUrl = requestUrl + selectedIngredients[0] + "," + selectedIngredients[1]
    console.log(requestUrl)
    
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    saveChoice(data);
                })
            }
        }
        )


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
}

function saveChoice(choice) {
    console.log(choice)
}