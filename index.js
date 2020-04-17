//--- Name: EniCalc/Vesion: 0.2.3a/Authors: AlexanderDV/Description: Main EniCalc .javascript. ---
//--- Start of standard initialization
//Program info
var programInfo={
	"packet" : "eniCalc",
	"name" : "EniCalc",
	"version" : "0.2.3a",
	"authors" : "AlexanderDV"
}
programInfo.title= programInfo.name + " v" + programInfo.version + " by " + programInfo.authors
document.title=programInfo.title
// Universal local storage initialization
var storage = window.localStorage

// Messages language initialization by default value
var messagesLanguage='ru'
// Function for getting message by key
var getMsg=function(key, lang){
	return props.msgs[lang||messagesLanguage][key]
}
// End of standard initialization ---

//
if(storage[programInfo.packet+".calculatorKeyboard.save."+storage[programInfo.packet+".calculatorKeyboard.last"]])
	props.keyboard=JSON.parse(storage[programInfo.packet+".calculatorKeyboard.save."+storage[programInfo.packet+".calculatorKeyboard.last"]])
// Init mover-elements
function initMovingElements(){
	for(var v in document.getElementsByClassName("mover"))
	{
		addMovingElement(document.getElementsByClassName("mover")[v].parentNode, document.getElementsByClassName("mover")[v])
		//document.getElementsByClassName("mover")[v].innerText=(document.getElementsByClassName("mover")[v].innerText||"").replace(/[$][m][o][v][e][$]/g,getMsg("move"))
	}
}
//
function setElementsTextTranslates(lang){
	for(var v in props.msgs[lang||messagesLanguage])
		for(var v2 in document.getElementsByClassName("$"+v+"$"))
			document.getElementsByClassName("$"+v+"$")[v2].innerText=props.msgs[lang||messagesLanguage][v]
}
//
var propCmdHandlers = {"boolean":function(args, variants, current, prop)
	{
		if(!prop)
			prop=args[current-1]
		console.log(args)
		switch (args[1])
		{
			case "set":
				props[prop] = Boolean(args[2])
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			case "get":
				return "Property '" + prop + "' = " + props[prop]
			case undefined:
			case "":
			case "invert":
				props[prop] = !props[prop]
				return "Property '" + prop + "' successfully inverted to " + props[prop] + "!"
			default:
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
		}
	},"string": function(args, variants, current, prop)
	{
		if(!prop)
			prop=args[current-1]
		switch (args[1])
		{
			case "set":
				props[prop] = args[2]
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			case undefined:
			case "":
			case "get":
				return "Property '" + prop + "' = " + props[prop]
			default:
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
		}
	},"number":function(args, variants, current, prop)
	{
		if(!prop)
			prop=args[current-1]
		switch (args[1])
		{
			case "set":
				props[prop] = Number(args[2])
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			case undefined:
			case "":
			case "get":
				return "Property '" + prop + "' = " + props[prop]
			default:
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
		}
	}
}
var cmdGet={
	"handler" : function(args, variants, current)
	{
		return "Property '" + prop + "' = " + props[prop]
	}
}
var cmdNotExists={
	"handler" : function(args)
	{
		return "Command '" + args[0] + " " + args[1] + "' not exists!"
	}
}
var propCmdVariants = {
		"boolean" : {
			"set" : {
				"handler" : function(args, variants, current)
				{
					props[prop] = Boolean(args[2]);
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}
			},
			"invert|" : {
				"handler" : function(args, variants, current)
				{
					props[args[current - 2]] = !props[args[current - 2]]
					return "Property '" + args[current - 2] + "' successfully inverted to " + props[args[current - 2]] + "!"
				}
			},
			"get" : cmdGet,
			"" : cmdNotExists

		},
		"string" : {
			"set" : {
				"handler" : function(args)
				{
					props[prop] = args[2]
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}
			},
			"get" : cmdGet,
			"" : cmdNotExists

		},
		"number" : {
			"set" : {
				"handler" : function(args)
				{
					props[prop] = Number(args[2])
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}
			},
			"get" : cmdGet,
			"" : cmdNotExists

		}
	}
var commands={
	editmode	:	{
		vars	:	"editmode",
		variants	:	propCmdVariants.boolean,
	},
	polishmode	:	{
		variants	:	propCmdVariants.boolean,
	}
}
var handler=function(args, variants, current){
	if(!variants)
		variants=commands
	if(!current)
		current=0
	for(var cmdRegExp in variants)
		{
		var matching=(typeof args[current]=="string"?"'"+args[current]+"'":args[current]+"")
		var match=matching.match(new RegExp(cmdRegExp.split("/")[0],cmdRegExp.split("/")[1]))
		if(match&&match.length==matching)
		{
			var ret=((variants[cmdRegExp].handler instanceof Function)?variants[cmdRegExp].handler:handler)(args, variants[cmdRegExp].variants, current+1)
			console.log(variants[cmdRegExp].handler)
			if(ret)
				return ret
		}}
}
addConsoleElement(consoleTextarea, handler, commands)
// Calculator part
expressionInput.onkeydown = function(e){
	if (e.key == "Enter")
		result()
}
var result = function(e){
	var expr = expressionInput.value
	var other=[]
	for ( var v in variablesTextarea.value.split("\n"))
		if (variablesTextarea.value.split("\n")[v].split("=")[0].split(":")[0])
			other.push(variablesTextarea.value.split("\n")[v].split("=")[0].split(":")[0])
	expressionInput.value = getValName(other)
	variablesTextarea.value = (variablesTextarea.value+"\n"+expressionInput.value + "=" + expr + "=" + fullCount(expr) + "\n").replace(/\n\n/g,"\n")
	expressionInput.oninput()
}
var getValName = function(other){
	var max=0
	for(var v in other)
	{
		var c=0
		for(var v2 in other[v])
			if(props.variables.names.default.match(other[v][v2]))
				if(props.variables.names.default.match(other[v][v2]).index!=-1)
					c+=(props.variables.names.default.match(other[v][v2]).index+1)*Math.pow(props.variables.names.default.length,other[v].length-1-v2)
		max=Math.max(c,max)
	}
	var n=max+1
	var res = ""
	while (n != 0)
	{
		res = props.variables.names.default[(n - 1) % props.variables.names.default.length] + res
		n = (n - (n - 1) % props.variables.names.default.length) / props.variables.names.default.length
		n -= n % 1
	}
	return res
}
var enterSelStart = expressionInput.selectionStart
var enterSelEnd = expressionInput.selectionEnd
var moveCaretTo = function(position){
	expressionInput.selectionStart = enterSelStart = expressionInput.selectionEnd = enterSelEnd = position
}
var updateSelection = function(){
	expressionInput.selectionStart = enterSelStart
	expressionInput.selectionEnd = enterSelEnd
}
var enter = function(value){
	updateSelection()
	expressionInput.value = expressionInput.value.substring(0, expressionInput.selectionStart) + value + expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	moveCaretTo(enterSelStart + value.length)
}
var left = function(){
	moveCaretTo(enterSelStart - 1)
}
var right = function(){
	moveCaretTo(enterSelStart + 1)
}
var clear = function(){
	updateSelection()
	expressionInput.value = ""
	expressionInput.oninput()
	moveCaretTo(0)
}
var clearHistory = function(){
	updateSelection()
	variablesTextarea.value = ""
	expressionInput.oninput()
	updateSelection()
}
var backspace = function(){
	updateSelection()
	expressionInput.value = expressionInput.value.substring(0, expressionInput.selectionStart == expressionInput.selectionEnd ? expressionInput.selectionStart - 1 : expressionInput.selectionStart) + expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	moveCaretTo(expressionInput.selectionStart == expressionInput.selectionEnd ? enterSelStart - 1 : enterSelStart)
}
expressionInput.onmousemove = expressionInput.onmousedown = function(e){
	enterSelStart = expressionInput.selectionStart
	enterSelEnd = expressionInput.selectionEnd
}
function getVariables(config){
	var variables={}
	for(var v in config.split("\n"))
		variables[config.split("\n")[v].split("=")[0].split(":")[0]]=config.split("\n")[v].split("=")[2]
	return variables
}
expressionInput.oninput = function(e){
	numbersExpressionInput.value = replaceVariables(expressionInput.value, getVariables(variablesTextarea.value))
	resultInput.value	=	fullCount(expressionInput.value)
}
function fullCount(expression, polishmode, variables, numberForm, actionsByPriority){
	if(polishmode==undefined)
		polishmode=props.misc.polishmode
	if(variables==undefined)
		variables=getVariables(variablesTextarea.value)
	if(numberForm==undefined)
		numberForm=props.numberForm
	if(actionsByPriority==undefined)
		actionsByPriority=props.actions.byPriority

	var replaced	=	replaceVariables(expression, variables)
	var func	=	polishmode	?	polishCount	:	splitCount
	replaced	=	bracketsCount(replaced, numberForm, actionsByPriority, func, true)
	return func(replaced, numberForm, actionsByPriority)	||	NaN
}
variablesTextarea.oninput = function(e){
	for ( var v1 in variablesTextarea.value.split("\n"))
	{
		var selStart = variablesTextarea.selectionStart
		var selEnd = variablesTextarea.selectionEnd
		var val = ""
		for ( var v in variablesTextarea.value.split("\n"))
			if (variablesTextarea.value.split("\n")[v])
				if(v != v1)
					val+=variablesTextarea.value.split("\n")[v] + "\n"
				else switch(variablesTextarea.value.split("\n")[v].split("=")[0].split(":")[1])
				{
					case "default":
						val += variablesTextarea.value.split("\n")[v].split("=")[0] + "=" + variablesTextarea.value.split("\n")[v].split("=")[1] + "=" + fullCount(variablesTextarea.value.split("\n")[v].split("=")[1],	false) + "\n"
						break
					case "polish":
						val += variablesTextarea.value.split("\n")[v].split("=")[0] + "=" + variablesTextarea.value.split("\n")[v].split("=")[1] + "=" + fullCount(variablesTextarea.value.split("\n")[v].split("=")[1],	false) + "\n"
						break
					case "value":
						val += variablesTextarea.value.split("\n")[v].split("=")[0] + "=" + variablesTextarea.value.split("\n")[v].split("=")[1] + "=" + variablesTextarea.value.split("\n")[v].split("=")[1] + "\n"
						break
					default:
						val+=variablesTextarea.value.split("\n")[v] + "\n"
						break
				}
		variablesTextarea.value = val
		variablesTextarea.selectionStart = selStart
		variablesTextarea.selectionEnd = selEnd
	}
}
// functions
var multiplyVals=function(expression){
	var start="",end="",third="",ok=0
	for(var v in expression)
	{
		//console.log("start: "+start)
		//console.log("end	: "+end)
		//console.log("third: "+third)
		if(ok!=1)
			if(expression[v]=="+"||expression[v]=="-")
			{
				ok=0
				start=start+end.replace(/[()]/g,"").replace(/-/g,"+-").split("+").join(third+"+")+third
				end=third=""
			}
		if(expression[v]=="(")
			ok=1
		if(ok==2)
			third+=expression[v]
		else if(ok==1)
			end+=expression[v]
		else start+=expression[v]
		if(expression[v]==")")
			ok=2

	}
	start=start+end.replace(/[()]/g,"").replace(/-/g,"+-").split("+").join(third+"+")+third
	start=moveVals(start,true)
	return start
}
var moveVals=function(expression,no){
	var start="",end="",ok=false
	for(var v in expression)
	{
		//console.log("start: "+start)
		//console.log("end	: "+end)
		if(expression[v]=="+"||expression[v]=="-")
		{
			start+=end
			end=""
		}
		if(expression[Number(v)+1]=="«")
			ok=true
		if(ok)
			end+=expression[v]
		else start+=expression[v]
		if(expression[v]=="»")
			ok=false
	}
	start=start+end
	if(!no)
	start=multiplyVals(start)
	return start
}
var temp
var createCalculatorKeyboardButton = function(v, v2){
	var button = document.createElement("button")
	button.className="maxWidth"
	button.id="calculatorKeyboardKey"+props.keyboard.table[v][v2].name
	button.title=props.keyboard.table[v][v2].name+"\nDoes: "+(props.keyboard.table[v][v2].does||"-")
	button.innerText=props.keyboard.table[v][v2].text
	button.disabled=props.keyboard.table[v][v2].disabled
	button.onclick=new Function("temp["+v+"]["+v2+"]()")


	temp[v][v2]=function()
	{
		var btn=button
		if(props.misc.editmode)
		{
			if(btn.children.length==0)
			{
				btn.appendChild(document.createElement('textarea'))
				btn.children[0].onclick=function(){btn.appendChild(document.createElement('label'))}
				btn.children[0].value=objectToJson(props.keyboard.table[v][v2])
				btn.children[0].focus()
			}
			else if(btn.children.length==1)
			{
				props.keyboard.table[v][v2]=JSON.parse(btn.children[0].value)
				btn.parentNode.appendChild(createCalculatorKeyboardButton(currentCalculatorKeyboard, v, v2))
				btn.parentNode.removeChild(btn)
			}
			else btn.removeChild(btn.children[1])
		}
		else props.keyboard.table[v][v2].func()
	}
	return button
}
var createCalculatorKeyboardTd = function(v, v2){
	var td = document.createElement("td")
	td.height=100/props.keyboard.table.length+"%"
	var width=0
	for(var v22 in props.keyboard.table)
		width=Math.max(width,props.keyboard.table[v22].length)
	td.width=100/width+"%"
	td.appendChild(createCalculatorKeyboardButton(v, v2))
	return td
}
var updateCalculatorKeyboard = function(){
	temp=[]
	calculatorKeyboardTable.innerHTML=""
	for(var v in props.keyboard.table)
	{
		temp[v]=[]

		var tr = document.createElement("tr")
		tr.height=100/props.keyboard.table.length+"%"
		calculatorKeyboardTable.appendChild(tr)

		for(var v2 in props.keyboard.table[v])
			tr.appendChild(createCalculatorKeyboardTd(v, v2))
	}
}
var setCalculatorKeyboard=function(keyboard){
	props.keyboard=keyboard
	updateCalculatorKeyboard()
}
// Posite moving elements in display
function positeMovingElements(){
	calculatorDiv.style.left=document.documentElement.clientWidth/2-calculatorDiv.getBoundingClientRect().width/2+"px"
	calculatorDiv.style.top=document.documentElement.clientHeight/2-calculatorDiv.getBoundingClientRect().height/2+"px"

	unitConverterDiv.style.left=document.documentElement.clientWidth/2-unitConverterDiv.getBoundingClientRect().width/2+"px"
	unitConverterDiv.style.top=0+"px"

	graphicDiv.style.right=0+"px"
	graphicDiv.style.top=document.documentElement.clientHeight/2-graphicDiv.getBoundingClientRect().height/2+"px"

	variablesDiv.style.left=0+"px"
	variablesDiv.style.top=document.documentElement.clientHeight/2-variablesDiv.getBoundingClientRect().height/2+"px"
}
// Unit converter part
for(var v2=0;document.getElementById("unitFieldNum"+v2);v2++){
	document.getElementById("unitPowerSelectNum"+v2).oninput = new Function("updateUnits(lastUnitFieldNum)")
	document.getElementById("unitPowerSelectEx1Num"+v2).oninput = new Function("updateUnits(lastUnitFieldNum)")
	document.getElementById("unitInputNum"+v2).oninput = new Function("updateUnits("+v2+")")
}
var form="short (long)"
var lastUnitFieldNum=0
addUnitFieldButton.onclick=function(){
	var v2=0
	for(;document.getElementById("unitFieldNum"+v2);v2++);
	var newUnitField=document.createElement("tr")
	unitFieldNum0.parentNode.appendChild(newUnitField)
	newUnitField.id="unitFieldNum"+v2
	newUnitField.innerHTML=unitFieldNum0.innerHTML.replace(/Num0/g,"Num"+v2)
	document.getElementById("unitPowerSelectNum"+v2).oninput = new Function("updateUnits(lastUnitFieldNum)")
	document.getElementById("unitPowerSelectEx1Num"+v2).oninput = new Function("updateUnits(lastUnitFieldNum)")
	document.getElementById("unitInputNum"+v2).oninput = new Function("updateUnits("+v2+")")
}
var updateUnits=function(currentNum){
	var currentInput=document.getElementById("unitInputNum"+currentNum)
	var currentSelect=document.getElementById("unitPowerSelectNum"+currentNum)
	var value
	var currentUnitPower=props.units[unitTypeSelect.value][currentSelect.value.split(" (")[0]]

	{
		var inner=""
		for(var v in props.units[unitTypeSelect.value][document.getElementById("unitPowerSelectNum"+currentNum).value.split(" (")[0]])
			inner+="<option>"+(form.replace("short",v).replace("long",props.units[unitTypeSelect.value][document.getElementById("unitPowerSelectNum"+currentNum).value.split(" (")[0]][v].long))+"</option>"
		if(document.getElementById("unitPowerSelectEx1Num"+currentNum).innerHTML!=inner)
			document.getElementById("unitPowerSelectEx1Num"+currentNum).innerHTML=inner
		document.getElementById("unitPowerSelectEx1Num"+currentNum).oninput=document.getElementById("unitPowerSelectNum"+currentNum).oninput
	}
	if(!currentUnitPower.long&&!currentUnitPower.func)
	{
		document.getElementById("unitPowerSelectEx1Num"+currentNum).style.display=""
		currentUnitPower=currentUnitPower[document.getElementById("unitPowerSelectEx1Num"+currentNum).value.split(" (")[0]]
	}
	else if(document.getElementById("unitPowerSelectEx1Num"+currentNum))
		document.getElementById("unitPowerSelectEx1Num"+currentNum).style.display="none"
	value=("function" !=typeof currentUnitPower.func)?stringToNumber(fullCount(currentInput.value))*currentUnitPower.func:currentUnitPower.func(Number(currentInput.value))

	for(var v2=0;document.getElementById("unitFieldNum"+v2);v2++)
		if(v2!=currentNum)
		{
			{
				var inner=""
				for(var v in props.units[unitTypeSelect.value][document.getElementById("unitPowerSelectNum"+v2).value.split(" (")[0]])
					inner+="<option>"+(form.replace("short",v).replace("long",props.units[unitTypeSelect.value][document.getElementById("unitPowerSelectNum"+v2).value.split(" (")[0]][v].long))+"</option>"
				if(document.getElementById("unitPowerSelectEx1Num"+v2).innerHTML!=inner)
					document.getElementById("unitPowerSelectEx1Num"+v2).innerHTML=inner
				document.getElementById("unitPowerSelectEx1Num"+v2).oninput=document.getElementById("unitPowerSelectNum"+v2).oninput
			}
			var crt = props.units[unitTypeSelect.value][document.getElementById("unitPowerSelectNum"+v2).value.split(" (")[0]]
			if(!crt.long)
				crt=crt[document.getElementById("unitPowerSelectEx1Num"+v2).value.split(" (")[0]]
			document.getElementById("unitInputNum"+v2).value=numberToString(("function" !=typeof crt.func)?value/crt.func:crt.anti(Number(currentInput.value)))
		}
	lastUnitFieldNum=currentNum
}
var updateUnitConverter=function(){
	for(var v in props.units)
		unitTypeSelect.innerHTML+="<option>"+v+"</option>"
	unitTypeSelect.oninput=function(e)
	{
		for(var v2=0;document.getElementById("unitPowerSelectNum"+v2);v2++)
		{
			document.getElementById("unitPowerSelectNum"+v2).innerHTML=""
			for(var v in props.units[unitTypeSelect.value])
				document.getElementById("unitPowerSelectNum"+v2).innerHTML+="<option>"+form.replace("short",v).replace("long",props.units[unitTypeSelect.value][v].long)+"</option>"
		}
	}
	unitTypeSelect.oninput()
}
//Graphic part
variablesTextarea.oninput=graphicFunction0Input.oninput=graphicFunction1Input.oninput=graphicColor0Input.oninput=graphicColor1Input.oninput=graphicXOffsetInput.oninput=graphicYOffsetInput.oninput=graphicXScaleInput.oninput=graphicYScaleInput.oninput=function(){
graphicCanvas.width=60
graphicCanvas.height=60
	var context=graphicCanvas.getContext('2d')
	var image = context.getImageData(0, 0, graphicCanvas.width, graphicCanvas.height)
	var pixels = image.data
	var offset	=	{	x	:	Number(graphicXOffsetInput.value),	y	:	Number(graphicYOffsetInput.value)}
	var scale	=	{	x	:	Number(graphicXScaleInput.value),	y	:	Number(graphicYScaleInput.value)}
	var func,color,r,g,b,a
	var variables=getVariables(variablesTextarea.value)
	for(var v=-1;v<2;v++)
		if(document.getElementById("graphicFunction0Input".replace("0",v))||v==-1)
		{
			var val=v!=-1?document.getElementById("graphicFunction0Input".replace("0",v)).value:""
			val=_splitCount(replaceVariables(val,variables),props.numberForm,props.actions.byPriority)
			if(v!=-1)
			{
				func=new Function("val","return splitCount(bracketsCount(val,props.numberForm,props.actions.byPriority,splitCount,true),props.numberForm,props.actions.byPriority)")
				color=document.getElementById("graphicColor0Input".replace("0",v)).value
				r=1
				g=1
				b=1
				a=1
				r=stringToNumber(color.substr(1,2),"0123456789abcdef")/255
				g=stringToNumber(color.substr(3,2),"0123456789abcdef")/255
				b=stringToNumber(color.substr(5,2),"0123456789abcdef")/255
			}
			else r=g=b=a=1
			for(var x=0;x<graphicCanvas.width;x++)
			{
				var val2=[]
				for(var v2 in val)
					val2[v2]=typeof val[v2]=="string"?val[v2].replace(/[x]/g,(x+offset.x)*scale.x):val[v2]

						if(v!=-1)
						console.log(val2);
				for(var y=0;y<graphicCanvas.height;y++)
				{
					if(v!=-1)
					{
							var val3=[]
							for(var v3 in val2)
								val3[v3]=typeof val2[v3]=="string"?val2[v3].replace(/[y]/g,(y+offset.y)*scale.y):val2[v3]
														if(v!=-1)
														console.log(val3);
							a=_splitCount2(val3,props.numberForm,props.actions.byPriority)
							console.log(a);
					}
					var off = ((graphicCanvas.height-1-y) * graphicCanvas.width + x) * 4
					pixels[off] = pixels[off]*(1-a)+r*255*a
					pixels[off + 1] = pixels[off+1]*(1-a)+g*255*a
					pixels[off + 2] = pixels[off+2]*(1-a)+b*255*a
					pixels[off + 3] = 255
				}
			}
		}
	context.putImageData(image, 0, 0)
}
//
updateCalculatorKeyboard()
updateUnitConverter()
initMovingElements()
setElementsTextTranslates()
positeMovingElements()
