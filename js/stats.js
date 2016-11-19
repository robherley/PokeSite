var currPokemon = getCookie("pkmn");
var pathJSON = "json/pkmn/"+currPokemon+".json"
var pathTypeJSON = "json/types.json"
var pokeJSON;
var typeJSON;
var currType = [];

function main(){
  console.log("Page is loaded.");
  $.getJSON(pathJSON, function(json){
      pokeJSON = json;
      console.log("JSON is loaded.");
      updateContent();
  });
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function updateContent(){
  $("#idname").text("#"+currPokemon+" "+cap(pokeJSON.name));
  $("#stat-img").attr('src','images/sprites/'+currPokemon+".png");
  $("#hp").text(pokeJSON.stats[5].base_stat);
  $("#atk").text(pokeJSON.stats[4].base_stat);
  $("#def").text(pokeJSON.stats[3].base_stat);
  $("#sa").text(pokeJSON.stats[2].base_stat);
  $("#sd").text(pokeJSON.stats[1].base_stat);
  $("#spd").text(pokeJSON.stats[0].base_stat);
  $("#type").text(arrayToString);
  getStrengthWeak(currType);
  getDesc(currPokemon);
  console.log(typeArray());
}

function arrayToString(){
  var typeArray = pokeJSON.types;
  var string= "";
  for (i = 0; i < typeArray.length; i++){
    string += cap(typeArray[i].type.name) + ", ";
    currType[i] = cap(typeArray[i].type.name);
  }
  return string.substring(0, string.length - 2);
}

function typeArray(){
  var typeArray = pokeJSON.types;
  var newArray = [];
  for (i = 0; i < typeArray.length; i++){
    newArray.push(cap(typeArray[i].type.name));
  }
  return newArray
}

//Possibly fix to add table row for every type
function getStrengthWeak(type){
  $.getJSON(pathTypeJSON, function(json){
    typeJSON = json;
    var strong = "";
    var weak = "";
    for(i=0; i < type.length; i++){
      strong += (typeJSON[currType[i]].S) + ", ";
      weak += (typeJSON[currType[i]].W) + ", ";
    }
    $("#strong").text(strong.substring(0, strong.length - 2));
    $("#weak").text(weak.substring(0, weak.length - 2));
  });
}

function getDesc(currPokemon){
  $.getJSON("http://pokeapi.co/api/v1/pokemon/"+currPokemon, function(json){
    descURL = json.descriptions[0].resource_uri;
    $.getJSON("http://pokeapi.co" + descURL, function(json){
      $("#desc").text(json.description);
      console.log(json.description);
    });
  });
}

function cap(string){
  return string.charAt().toUpperCase() + string.slice(1);
}

$(document).ready(function() {
  console.log("Current Pokemon: " + currPokemon);
  main();
});
