var currPokemon = getCookie("pkmn");
var pathJSON = "json/pkmn/"+currPokemon+".json";
var pathTypeJSON = "json/types.json";
var pathDescJSON = "json/desc.json";
var pathEvoJSON = "json/evo.json";
var pokeJSON;
var typeJSON;
var descJSON;
var evoJSON;

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
  addStrengthWeak(typeArray());
  getDesc(currPokemon);
  console.log(typeArray());
  getEvolutions(currPokemon);
}

function typeArray(){
  var typeArray = pokeJSON.types;
  var newArray = [];
  for (i = 0; i < typeArray.length; i++){
    newArray.push(cap(typeArray[i].type.name));
  }
  return newArray
}

function addStrengthWeak(typeArray){
  $.getJSON(pathTypeJSON, function(json){
    typeJSON = json;
    var table = document.getElementById("typeTab");
    var rowCount = 1;
    document.getElementById("typeTab").deleteRow(1);
    for(i=0; i < typeArray.length; i++){
      var row = table.insertRow(rowCount);
      var type = row.insertCell(0);
      var strong = row.insertCell(1);
      var weak = row.insertCell(2);
      type.innerHTML = typeArray[i];
      strong.innerHTML = typeJSON[typeArray[i]].S;
      weak.innerHTML = typeJSON[typeArray[i]].W;
      rowCount++;
    }
  });
}

function getDesc(currPokemon){
  $.getJSON(pathDescJSON, function(json){
    descJSON = json;
    $("#desc").text(descJSON.PkmnDescriptions[parseInt(currPokemon)]);
  });
}

function getEvolutions(currPokemon){
  $.getJSON(pathEvoJSON, function(json){
    evoJSON = json;
    var table = document.getElementById("evoTab");
    var evoNum = evoJSON[currPokemon].evo.length;
    var methNum = evoJSON[currPokemon].method.length;
    var evoRow = document.getElementById("evoRow");
    for(i=6; i > evoNum + methNum - 1; i--){
       evoRow.deleteCell(i);
    }
    if(evoNum == 1){
      $("#evoOne").attr('src','images/sprites/'+evoJSON[currPokemon].evo[0]+".png");
      $("#evoOne").css("width", "30%");
      $("#row1").append(evoJSON[currPokemon].evo[0]);
    }
    else if (evoNum == 2) {
      $("#evoOne").attr('src','images/sprites/'+evoJSON[currPokemon].evo[0]+".png");
      $("#row1").append(evoJSON[currPokemon].evo[0]);
      $("#methodOne").append(evoJSON[currPokemon].method[0]);
      $("#evoTwo").attr('src','images/sprites/'+evoJSON[currPokemon].evo[1]+".png");
      $("#row2").append(evoJSON[currPokemon].evo[1]);
    }
    else if (evoNum == 3){
      $("#evoOne").attr('src','images/sprites/'+evoJSON[currPokemon].evo[0]+".png");
      $("#row1").append(evoJSON[currPokemon].evo[0]);
      $("#methodOne").append(evoJSON[currPokemon].method[0]);
      $("#evoTwo").attr('src','images/sprites/'+evoJSON[currPokemon].evo[1]+".png");
      $("#row2").append(evoJSON[currPokemon].evo[1]);
      $("#methodTwo").append(evoJSON[currPokemon].method[1]);
      $("#evoThree").attr('src','images/sprites/'+evoJSON[currPokemon].evo[2]+".png");
      $("#row3").append(evoJSON[currPokemon].evo[2]);
    }
    else{
      $("#evoOne").attr('src','images/sprites/'+evoJSON[currPokemon].evo[0]+".png");
      $("#methodOne").append(evoJSON[currPokemon].method[0]);
      $("#row1").append(evoJSON[currPokemon].evo[0]);
      $("#evoTwo").attr('src','images/sprites/'+evoJSON[currPokemon].evo[1]+".png");
      $("#methodTwo").append(evoJSON[currPokemon].method[1]);
      $("#row2").append(evoJSON[currPokemon].evo[1]);
      $("#evoThree").attr('src','images/sprites/'+evoJSON[currPokemon].evo[2]+".png");
      $("#methodThree").append(evoJSON[currPokemon].method[2]);
      $("#row3").append(evoJSON[currPokemon].evo[2]);
      $("#evoFour").attr('src','images/sprites/'+evoJSON[currPokemon].evo[3]+".png");
      $("#row4").append(evoJSON[currPokemon].evo[3]);
    }
  });
}

function cap(string){
  return string.charAt().toUpperCase() + string.slice(1);
}

$(document).ready(function() {
  console.log("Current Pokemon: " + currPokemon);
  if(currPokemon == "undefined"){
    document.getElementById('pokeStatsTables').style.display='none';
  }
  else{
    document.getElementById('hidden-div').style.display='none';
    main();
  }
});
