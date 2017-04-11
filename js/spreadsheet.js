// ID of the Google Spreadsheet
var spreadsheetID = "1p1DUEkzQ6qIQvZRuTcxoSz_AKO6gUJfLWe4cDAxJ0IM";

// Make sure it is public or set to Anyone with link can view
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

$("button").click(function(){
  $.getJSON(url, function(data) {

   var entry = data.feed.entry;

   $(entry).each(function(){
     // Column names are name, age, etc.
     $('.results').prepend('<h2>'+this.gsx$name.$t+'</h2>');
   });

  });

});

//document.getElementById("PersonCalled").innerHTML = entry;
