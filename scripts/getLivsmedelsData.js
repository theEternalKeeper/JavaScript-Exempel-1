$("#search-table").hide();

var searchBtn = document.getElementById("sok-button");
var searchField = document.getElementById("search-word");
var table = document.getElementById("search-table");
var tableBody = table.getElementsByTagName('tbody')[0];
var headers = document.getElementsByTagName('th');
headers[2].innerHTML = "Protein";
headers[3].innerHTML = "Fett";
headers[4].innerHTML = "Kolhydrater";
searchBtn.type = "button";


function sok (evt){
    var searchWord = searchField.value;
    $('#search-table tbody').empty()
    $.ajax({
        url: "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php",
        dataType: "jsonp",
        data: {
            namn: searchWord,
        },
        success: function(response) {
            $('#search-table').show();            
            var foodArray = response.livsmedel;
            for(var i=0; i < foodArray.length; i++) {
                var food = foodArray[i];                
                var newRow = document.createElement("tr");
                for(var y = 0; y < 5; y++){
                    var foodValue = Object.values(food);
                    var newColumn = document.createElement("td");
                    var newColumnText = document.createTextNode(foodValue[y]);
                    newRow.appendChild(newColumn);
                    newColumn.appendChild(newColumnText);
                }
                tableBody.append(newRow);

            }
            if ($('#search-table td').length == 0 || $('#search-table td').length == null) {
                $('#search-table').hide();
            }

        },
        error: function(response) {
            $('#search-table').hide();
        }
    });
}

searchBtn.addEventListener("click", sok, false);