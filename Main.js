var x = 0;
var total = 0;
var orders = [];
var formatted = [];
var username = "adrin";
document.getElementById("number").innerHTML = "$" + Math.ceil(total * 100) / 100;


var money = [];
money.push(0);
money.push(6.25);
money.push(4.25);
money.push(5.95);
money.push(6.95);
money.push(10.45);
money.push(10.95);
money.push(9.45);
money.push(9.45);
money.push(9.45);
money.push(3.95);
money.push(4.5);
money.push(3.95);
money.push(2.95);

//Clearing the page
clear();

function clear(){
	document.getElementById("Appetizers").style.display = "none";
	document.getElementById("Entrees").style.display = "none";
	document.getElementById("Dessert").style.display = "none";
	document.getElementById("Review").style.display = "none";
	document.getElementById("comformation").style.display = "none";
}
function addition(ids) {
	x += money[ids];
	total += x * document.getElementById(ids).value; 
	document.getElementById("number").innerHTML = "$" + Math.ceil(total * 100) / 100; 
	x = 0;

	for (var i = 0; i < document.getElementById(ids).value; i++) {
		orders.push(ids);
	}
	document.getElementById(ids).value.clear;
}

function update(){
	var current = 0;
	for (var i = 1; i<=13; i++) {
		current = document.getElementById("i"+i).value;
		for(var j = 0; j < orders.length; j++){
			if (orders[j] == i) {
				current --;
			}
		}
		if(current>0){
			for(var j = 0; j < current; j++){
				orders.push(i);
				total += money[i];
				document.getElementById("number").innerHTML = "$" + Math.ceil(total * 100) / 100;
			}
		}
		if(current<0){
			for(var j = current; j < 0; j++){
				orders.push(i);
				total -= money[i];
				document.getElementById("number").innerHTML = "$" + Math.ceil(total * 100) / 100;
			}
		}
	}
}

function review(){
	clear();
	document.getElementById("Review").style.display = "block"; 
	for (var i = 0; i < orders.length; i++) {
		document.getElementById("i" + orders[i]).style.display = "block";
		document.getElementById("d" + orders[i]).style.display = "block";
		document.getElementById("close" + orders[i]).style.display = "block";
		document.getElementById("i" + orders[i]).value ++;
	}
	document.getElementById("total").style.display = "block";
}

function Appetizers(){
	clear();
	document.getElementById("Appetizers").style.display = "block"; 
}

function Entrees(){
	clear();
	document.getElementById("Entrees").style.display = "block"; 
}

function Dessert(){
	clear();
	document.getElementById("Dessert").style.display = "block"; 
}

function submit(){
	clear();
	document.getElementById("comformation").style.display = "block";

	var valu = 0;
	for (var i = 1; i < 13; i++) {
		for (var j = 0; j < orders.length; j++) {
			if (orders[j] == i) {
				valu ++;
				document.getElementById(i + "q").innerHTML = "qn." + valu;
			}
		}
		valu = 0;
	}

}

function done(){
	clear();
	document.getElementById("end").style.display = "block"; 
	document.getElementById("total").style.display = "none"; 
	format();
	var text = { "CurrentCustomer":username, "CurrentOrder":formatted};
	var obj = JSON.stringify(text);
	console.log(text.CurrentCustomer + "," + text.CurrentOrder.toString());
	//HERE
	//THE FILE SHOULD BE SAVED HERE
	//adgj;adg dsgosd;'lgksd;gsd;'glsd;'gl;'sdlg';sdl;g'lsdglsd;'glsdlg;'sdlg;'sdlglsdgsd;'glsglsd;'gl;'sdlg;'sdlg;'sdlg';sdlg'lsd;'glsd';glsd;glsd
}
function close(){
		Dessert();
	for (var i = 0; i < orders.length; i++) {
		if(orders[i] == part){
			
			document.getElementById("i" + orders[part]).value  = 0;
			total -= money[part];
			document.getElementById("number").innerHTML = "$" + Math.ceil(total * 100) / 100;
		}
	}
}
function format(){
	for (var i = 0; i < 13; i++) {
		formatted.push(0);
		for(var j = 0; j < orders.length; j++) {
			if (orders[j] == (i+1)) {
				formatted[i] ++;
			}
		}
	}
}

function name(nameIn){
	username = nameIn;
}