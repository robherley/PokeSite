var apiURL = "http://pokeapi.co/api/v2/";
var pokedex = "json/pokedex.json";
var currPokemon;

function main(){
  console.log("Page is loaded.");

  $.getJSON(pokedex, function(json){
      console.log("JSON is loaded.");
      fillSelector(getPkmnList(json))
      console.log("Selector is filled.")
  });
  var dropdown = document.getElementById("pokeSelect");
  dropdown.onchange = function(){
    pokeSelect(this.value);
    changeImg(currPokemon);
  };
  var button = document.getElementById("pokeButton");
  button.onclick = function(){
    console.log("Button pressed!");
    document.cookie = "pkmn="+currPokemon;
    console.log("Cookie Stored!");
    document.location.href = "stats.html";
  }
}

/**
  Sorts pokedex json into an ordered object array
**/
function getPkmnList(dex){
  var pkmnList = [];
  for(var i = 0; i < dex.pokemon_entries.length; i++){
    pkmnList.push(fixPokeNumber(dex.pokemon_entries[i].entry_number) + " - " + cap(dex.pokemon_entries[i].pokemon_species.name));
  }
  return pkmnList;
}

/**
  Pads pokenumber with 3 Zero's
**/
function fixPokeNumber(string){
  return ("000" + string).slice(-3)
}

/**
  Capitalizes the first letter of poke name
**/
function cap(string){
  return string.charAt().toUpperCase() + string.slice(1);
}

function fillSelector(list){
  var select = document.getElementById("pokeSelect");
  for(var i = 0; i < list.length; i++){
    select.options[select.options.length] = new Option(list[i], i);
  }
}

function pokeSelect(value){
  if(value == "Choose"){
    currPokemon = "000";
  }else{
    currPokemon = fixPokeNumber(parseInt(value)+1);
  }
  console.log("Pokemon " + currPokemon + " selected.");
}

function changeImg(value){
  $("#poke-sprite").attr('src','images/sprites/'+currPokemon+".png");
}

$(document).ready(function() {
  main();
});
