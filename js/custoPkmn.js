var pathTypeJSON = "json/types.json";

function main(){
  fillSelector("hpInput");
  fillSelector("atkInput");
  fillSelector("defInput");
  fillSelector("saInput");
  fillSelector("sdInput");
  fillSelector("spdInput");
}


function fillSelector(selector){
  var select = document.getElementById(selector);
  for(var i = 0; i < 101; i++){
    select.options.add(new Option(i, i));
  }
}

function openEditor(){
  document.getElementById('id01').style.display='block';
}

function closeEditor(){
  document.getElementById('id01').style.display='none';
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

function submitForm(){
  var inputNum = "#" + document.getElementById("pkmnNumber").value + " " + document.getElementById("pkmnName").value;
  document.getElementById("idname").innerHTML = inputNum;
  var inputDesc = document.getElementById("pkmnDesc").value;
  document.getElementById("desc").innerHTML = inputDesc;
  var checkboxes = document.getElementsByName("types[]")
  var typeArray = [];
  for(var i=0; i<checkboxes.length; i++){
    if(checkboxes[i].checked){
      typeArray.push(checkboxes[i].value);
    }
  }
  addStrengthWeak(typeArray);

  var hpInput = document.getElementById("hpInput").value;
  var atkInput = document.getElementById("atkInput").value;
  var defInput = document.getElementById("defInput").value;
  var saInput = document.getElementById("saInput").value;
  var sdInput = document.getElementById("sdInput").value;
  var spdInput = document.getElementById("spdInput").value;

  document.getElementById("hp").innerHTML = hpInput;
  document.getElementById("atk").innerHTML = atkInput;
  document.getElementById("def").innerHTML = defInput;
  document.getElementById("sa").innerHTML = saInput;
  document.getElementById("sd").innerHTML = sdInput;
  document.getElementById("spd").innerHTML = spdInput;

  var errMessage = "";
  var errorFlag = false;
  if(document.getElementById("pkmnNumber").value > 999 || document.getElementById("pkmnNumber").value < 0){
    errMessage += "Please Enter a Pokemon Number x where 0 < x < 999.\n"
    errorFlag = true;
  }
  if(document.getElementById("pkmnName").value.length > 25){
    errMessage += "Please Enter a Pokemon Name less than 25 characters.\n"
    errorFlag = true;
  }
  if(document.getElementById("pkmnDesc").value.length > 80){
    errMessage += "Please Enter a Description less than 80 characters.\n"
    errorFlag = true;
  }
  if(typeArray.length > 3){
    errMessage += "Please Select 3 Types or less.\n"
    errorFlag = true;
  }
  if(document.getElementById("pkmnNumber").value == ""){
    errMessage += "Please Enter a Pokemon Number.\n"
    errorFlag = true;
  }
  if(document.getElementById("pkmnName").value == ""){
    errMessage += "Please Enter a Pokemon Name.\n"
    errorFlag = true;
  }
  if(document.getElementById("pkmnDesc").value == ""){
    errMessage += "Please Enter a Pokemon Description.\n"
    errorFlag = true;
  }
  if(typeArray.length == 0){
    errMessage += "Please Select a Pokemon Type.\n"
    errorFlag = true;
  }
  if(errorFlag == true){
    alert(errMessage);
    errMessage = "";
    erroFlag = false;
  }
  else{
    document.getElementById('hiddenPokeDiv').style.display='block';
    closeEditor();
  }
}

window.onload = function() {
  main();
};
