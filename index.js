var programInfo={
	name : "EniCalc",
	version : "0.2.9a",
	authors : "AlexanderDV"
}
programInfo.title= programInfo.name + " v" + programInfo.version + " by " + programInfo.authors
document.title=programInfo.title
// End of standard initialization ---

//FnCalc-
fnCalcButton.onclick=function(){
	var fncs={
		"=":{opr:true,func:function(formula,i){
			fncs[formula[i-1]]={link:formula[i+1]};
			formula.splice(i-1,3,formula[i-1])
		}},
		"#":{opr:true,func:function(formula,i){
			var r=formula[i+1]+"#"+getVal(formula[i+1]);
			fnCalcResultArea.value+=r+"\n";
			console.log(r);
			formula.splice(i,2,formula[i+1])
		}},
		"<":{opr:true,func:function(formula,i){
			fncs[getVar(formula[i-1])]={val:eval(formula[i+1])};
			formula.splice(i-1,3,formula[i-1])
		}}
	}
	function getVal(link)
	{
		for(var v in fncs)
			if(v==link)
				return fncs[v].link?getVal(fncs[v].link):fncs[v].val
		return link
	}
	function getVar(link)
	{
		for(var v in fncs)
			if(v==link)
				return fncs[v].link?getVar(fncs[v].link):v
		return link
	}
	var exec=`m=55
	n=m
	n=0
	5#1
	5=3
	5#1
	5=5
	n<60
	n#y
	m#1`
	fnCalcResultArea.value=""
	exec=fnCalcExecArea.value
	console.log(exec);
	for(var v in exec.split("\n"))
	{
		//console.log(exec.split("\n")[v]);
	    var formula=[""]
	    for(var s in exec.split("\n")[v])
	    {
	        formula[formula.length-1]+=exec.split("\n")[v][s]
	        for(var v2 in fncs)
			{
				//console.log(formula[formula.length-1]);
	            if(formula[formula.length-1].endsWith(v2)&&fncs[v2].opr)
				{
					var f=formula[formula.length-1]
					formula[formula.length-1]=f.substr(0,f.length-f.match(v2)[0].length)
	                formula[formula.length]=f.match(v2)[0]
	                formula[formula.length]=""
				}
			}
	    }
		console.log(formula);
	    for(;;)
		{
			var e=false
	        for(var v2=0;v2<formula.length;v2++)
				if(fncs[formula[v2]]&&fncs[formula[v2]].opr)
				{
					e=true
					//console.log(formula);
					fncs[formula[v2]].func(formula,v2)
				}
			if(!e)
				break
		}
	}
}
//-FnCalc

var expressions=["10*a+10/2*a","10+a+(15+a)","(11+a)+(8-a)","1+2*a-(5+3*a)", "5*4+1","(1+5)*4+1","((5))","(5*(3+4))","5*(2+(3+1)*2)"],prepared=[],countedInBrackets=[],counted=[],v=0
for(var v=0;v<expressions.length;v++)
{
	console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
	console.log(expressions[v])
	console.log(prepared[v]=prepare(expressions[v],props.numberForms.default,props.actions.byPriority))
	console.log(countedInBrackets[v]=countInBrackets(prepared[v],props.numberForms.default,props.actions.byPriority))
	console.log(counted[v]=count(countedInBrackets[v],props.numberForms.default,props.actions.byPriority))
}
function fCount(expr) {
	return count(countInBrackets(prepare(expr,props.numberForms.default,props.actions.byPriority),props.numberForms.default,props.actions.byPriority),props.numberForms.default,props.actions.byPriority)
}
byPreviousActionsDecomposeTextarea.oninput=function() {
	var result=""
	var selectionStart=byPreviousActionsDecomposeTextarea.selectionStart+0
	var selectionEnd=byPreviousActionsDecomposeTextarea.selectionEnd+0
	for(var v in byPreviousActionsDecomposeTextarea.value.split("\n"))
	{
		var expression=byPreviousActionsDecomposeTextarea.value.split("\n")[v].split("{")[0].split("=")[0]
		var res=""
		if(byPreviousActionsDecomposeTextarea.value.split("\n")[v].indexOf("{")!=-1)
		{
			var act
			for(var v2 in props.actions.byPriority)
				for(var v3 in props.actions.byPriority[v2])
					if(expression.indexOf(props.actions.byPriority[v2][v3].text)!=-1)
						act=props.actions.byPriority[v2][v3]
			var did=expression
			var time=0
			while (did.indexOf(act.text)!=-1&&time++<5)
				did="("+multiplyStr(act.prev+did.split(act.text)[0],did.split(act.text)[1]).substr(1)+")"+did.substr(did.split(act.text)[0].length+act.text.length+did.split(act.text)[1].length)
			res="="+fCount(expression)+"{"+fCount(did)+"="+did
		}
		result+=expression+res+"\n"
	}
	byPreviousActionsDecomposeTextarea.value=result
	byPreviousActionsDecomposeTextarea.selectionStart=selectionStart
	byPreviousActionsDecomposeTextarea.selectionEnd=selectionEnd
}
//
if(storage[programInfo.packet+".calculatorKeyboard.save."+storage[programInfo.packet+".calculatorKeyboard.last"]])
	props.keyboard=JSON.parse(storage[programInfo.packet+".calculatorKeyboard.save."+storage[programInfo.packet+".calculatorKeyboard.last"]])
// Init mover-elements
function initMovingElements(){
	for(var v in document.getElementsByClassName("mover"))
		addMovingElement(document.getElementsByClassName("mover")[v].parentNode, document.getElementsByClassName("mover")[v])
}
//
function setElementsTextTranslates(lang){
	for(var v in props.msgs[lang||props.msgsLang])
		for(var v2 in document.getElementsByClassName("$"+v+"$"))
			document.getElementsByClassName("$"+v+"$")[v2].innerText=props.msgs[lang||props.msgsLang][v]
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
	variablesTextarea.value = (variablesTextarea.value+"\n"+expressionInput.value + "=" + expr + "=" + typedCount(expr) + "\n").replace(/\n\n/g,"\n")
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
	resultInput.value	=	typedCount(expressionInput.value)
}
function fullCount(expression, polishmode, variables, numberForm, actionsByPriority){
	if(polishmode==undefined)
		polishmode=props.misc.polishmode
	if(variables==undefined)
		variables=getVariables(variablesTextarea.value)
	if(numberForm==undefined)
		numberForm=props.numberForms.default
	if(actionsByPriority==undefined)
		actionsByPriority=props.actions.byPriority

	var replaced	=	replaceVariables(expression, variables)
	var func	=	polishmode	?	polishCount	:	fCount
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
						val += variablesTextarea.value.split("\n")[v].split("=")[0] + "=" + variablesTextarea.value.split("\n")[v].split("=")[1] + "=" + typedCount(variablesTextarea.value.split("\n")[v].split("=")[1]) + "\n"
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

	settingsDiv.style.left=0+"px"
	settingsDiv.style.bottom=0+"px"

	byPreviousActionsDecomposeDiv.style.left=document.documentElement.clientWidth/2-byPreviousActionsDecomposeDiv.getBoundingClientRect().width/2+"px"
	byPreviousActionsDecomposeDiv.style.bottom=0+"px"

	fnCalcDiv.style.right=0+"px"
	fnCalcDiv.style.bottom=0+"px"
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
	currentNum=currentNum||0
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
		console.log(currentInput.value);
	value=typedCount(currentInput.value, "number")
	console.log(value);
	value=("function" !=typeof currentUnitPower.func)?value*currentUnitPower.func:currentUnitPower.func(value)

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
	unitTypeGroupSelect.innerHTML=""
	for(var v in props.unitGroups)
		unitTypeGroupSelect.innerHTML+="<option>"+v+"</option>"

	unitTypeGroupSelect.oninput=function(e)
	{
		unitTypeSelect.innerHTML=""
		for(var v in props.unitGroups[unitTypeGroupSelect.value])
			unitTypeSelect.innerHTML+="<option>"+props.unitGroups[unitTypeGroupSelect.value][v]+"</option>"
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
	unitTypeGroupSelect.oninput()
}
//Graphic part
graphicFunction0Input.oninput=graphicFunction1Input.oninput=graphicColor0Input.oninput=graphicColor1Input.oninput=graphicXOffsetInput.oninput=graphicYOffsetInput.oninput=graphicXScaleInput.oninput=graphicYScaleInput.oninput=function(){
graphicCanvas.width=60
graphicCanvas.height=60
	var context=graphicCanvas.getContext('2d')
	var image = context.getImageData(0, 0, graphicCanvas.width, graphicCanvas.height)
	var pixels = image.data
	var offset	=	{	x	:	Number(graphicXOffsetInput.value),	y	:	Number(graphicYOffsetInput.value)}
	var scale	=	{	x	:	Number(graphicXScaleInput.value),	y	:	Number(graphicYScaleInput.value)}
	var func,color,r,g,b,a
	var variables=getVariables(variablesTextarea.value)
	var vars=getVariables(variablesTextarea.value)
	for(var v=-1;v<2;v++)
		if(document.getElementById("graphicFunction0Input".replace("0",v))||v==-1)
		{
			var val=v!=-1?document.getElementById("graphicFunction0Input".replace("0",v)).value:""
			//val=_splitCount(replaceVariables(val,variables),props.numberForm,props.actions.byPriority)
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
				//for(var v2 in val)
				//	val2[v2]=typeof val[v2]=="string"?val[v2].replace(/[x]/g,(x+offset.x)*scale.x):val[v2]

						//if(v!=-1)
						//console.log(val2);
				for(var y=0;y<graphicCanvas.height;y++)
				{
					if(v!=-1)
					{
							//var val3=[]
							//for(var v3 in val2)
							//	val3[v3]=typeof val2[v3]=="string"?val2[v3].replace(/[y]/g,(y+offset.y)*scale.y):val2[v3]
							//							if(v!=-1)
							//							console.log(val3);
							//a=_splitCount2(val3,props.numberForm,props.actions.byPriority)
							//console.log(a);
							vars.x=x
							vars.y=y
							a=typedCount(val,"number",vars)
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
function initSettings(){
	countTypeSelect.value=storageValue("countTypeSelect")||props.settings.defaultSettings.countTypeSelect
	countTypeSelect.onchange=function(){storageValue("countTypeSelect",countTypeSelect.value)}
}
initSettings()
clearSettingsButton.onclick=function(){storage["EniCalc"]="";initSettings()}
function typedCount(expression, resultType, variables, type, variablesJs) {
	variables=variables||getVariables(variablesTextarea.value)
	var str,num,res
	switch (type||countTypeSelect.value) {
		default:
		case "New default":
			res	= fCount(expression)
			break
		case "Old default.default":
			res	= fullCount(expression,false)
			break
		case "Old default.polish":
			res	= fullCount(expression,true)
			break
		case "JavaScript code":
			var varsJs=variablesJs||""
			for(var v in variables)
				varsJs+="var "+v+"="+variables[v]+";"
			res	= new Function(varsJs+"return "+expression)(variables)
			break
		case "Polish record":
			res	= polishCount(expression)
			break
	}
	if(typeof res=="number")
		num=res
	else str=res
	return (resultType=="number"?(str?stringToNumber(str):num):(resultType=="string"?(num?numberToString(num):str):res))
}
//
updateCalculatorKeyboard()
updateUnitConverter()
initMovingElements()
setElementsTextTranslates()
positeMovingElements()
