var submitBtn = $('.submitBtn');
var randomBtn = $('.randomBtn');

submitBtn.on("click", function(){
    var meat = [];
    var veg = [];
    var allergy = []; 

    $.each($("input[name='meat']:checked"), function(){
     meat.push($(this).val());
    });

   $.each($("input[name='veggie']:checked"), function(){
    veg.push($(this).val());
    });

    $.each($("input[name='allergy']:checked"), function(){
         allergy.push($(this).val());
    });
        
    console.log(meat)
    console.log(veg)
    console.log(allergy)
});

