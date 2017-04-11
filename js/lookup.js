window.onload = function() { init() };

//var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1p1DUEkzQ6qIQvZRuTcxoSz_AKO6gUJfLWe4cDAxJ0IM/pubhtml';



/*
console.log("hello");
$("#setsheet").click(function() {
  console.log("I was pressed");
  new_spreadsheet = $("#SheetURL").val();
  public_spreadsheet_url = new_spreadsheet;
  //init();
});
*/
// Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
    if(localStorage.url) {
      var public_spreadsheet_url = localStorage.getItem("url");
    }
    else {
      var public_spreadsheet_url = window.prompt("Public Google Sheet URL: \n(Must have 'name' column.)");
      localStorage.setItem("url", public_spreadsheet_url);
    }
    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
} else {
  console.log("oops, no browser storage!")
  var public_spreadsheet_url = window.prompt("Public Google Sheet URL: \n(Must have 'name' column.)");
    //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}


function init() {
Tabletop.init( { key: public_spreadsheet_url,
                 callback: showInfo,
                 simpleSheet: true } )
}


dictionary = {}

function showInfo(data, tabletop) {
console.log(data);

var lookupAcronym = function() {
    inputValue = $("#AcronymInput").val().toUpperCase().replace(/[^\w\s]/gi, '');
    $("#definition").html('');
    if(dictionary[inputValue]) {
        $("#response").removeClass("notfound");
        $("#response").html("<b>" + dictionary[inputValue]['Acronym'] + "</b>: " + dictionary[inputValue]['Word'])
        if(dictionary[inputValue]['Definition']) {
            $("#definition").html(dictionary[inputValue]['Definition']);
        }
    }
    else if(inputValue.length > 0){
        $("#response").addClass("notfound");
        $("#response").html(inputValue + " is not in the acronym dictionary. <b><a href='https://docs.google.com/a/girlswhocode.com/spreadsheets/d/12Mfkk63yxsbKDZQFhLF4ZBLW-lH8dM7syPEcZLo4Qas/edit?usp=sharing' target='_blank'>Add it here</a></b>.")
    }
    else {
        $("#response").html("");
    }

//  alert( "Handler for .keydown() called." );
}


for(var i=0; i < data.length; i++) {
    dictionary[data[i]['name'].toUpperCase().replace(/[^\w\s]/gi , '')] = {'Acronym': data[i]['Acronym'], 'Word': data[i]['Word'], 'Definition': data[i]['Definition']};
}

$('#request').click(function() {


    alert("feature coming soon!");
});

$("#AcronymInput").focusin(function() {
    $("#AcronymInput").attr('placeholder','');
});

$("#AcronymInput").focusout(function() {
    $("#AcronymInput").attr('placeholder','???');
});

$("#AcronymInput" ).keyup(lookupAcronym);

function getRandomInt(min, max) {
  max ++;
  return Math.floor(Math.random() * (max - min)) + min;
}

$("#random").click(function() {
    var keys = Object.keys(dictionary);
    var randomInt = getRandomInt(0,keys.length-1);
    $("#AcronymInput").val(keys[randomInt]);
    lookupAcronym();
});

}
