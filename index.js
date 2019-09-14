//Get objects
var storage = window.localStorage
//
var editmode=false
//
addMovingElement(calcDiv, calcMoverDiv)
addConsoleElement(consoleTextarea, function(args)
{
	switch(args[0])
	{
		case "button":
			var result = ""
			var button
			var n = 0
			switch(args[++n])
			{
				case "byname":
					button = this["calcKeyboardKey" + args[++n]]
					break
			}
			switch(args[++n])
			{
				case "settext":
					button.innerText = args[++n]
					result += "Text = " + button.innerText + "\n"
					n++
					break
			}
			switch(args[n])
			{
				case "setaction":
					button.onclick = new Function('event', args[++n])
					result += "Action = " + (button.onclick+"").replace(/\n/g,"") + "\n"
					break
			}
			return result + "Successfully setted!"
		case "editmode":
			switch(args[1])
			{
				case "set":
					editmode = Boolean(args[2])
					return "Edit mode successfully setted to "+editmode+"!"
				case "get":
					return "Edit mode = "+editmode
				case undefined:
				case "":
				case "invert":
					editmode=!editmode
					return "Edit mode successfully inverted to "+editmode+"!"
				default:
					return "Command '"+args[0]+" "+args[1]+"' not exists!"
			}
		case "calckeyboard":
			switch(args[1])
			{
				case "save":
					if(args[2])
						storage["calculatorAndMath.calcKeyboard.last"]=args[2]
					if(!storage["calculatorAndMath.calcKeyboard.last"])
						storage["calculatorAndMath.calcKeyboard.last"]="newsave"
					storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]]=JSON.stringify(calcKeyboard)
					return "Calc keyboard successfully saved to "+storage["calculatorAndMath.calcKeyboard.last"]+"!"
				case "load":
					if(args[2])
						storage["calculatorAndMath.calcKeyboard.last"]=args[2]
					if(!storage["calculatorAndMath.calcKeyboard.last"])
						storage["calculatorAndMath.calcKeyboard.last"]="newsave"
					var loaded=storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]]
					if(!loaded)
						return "Calc keyboard save not exist!"
					updateCalcKeyboard(JSON.parse(loaded))
					return "Calc keyboard successfully loaded from "+storage["calculatorAndMath.calcKeyboard.last"]+"!"
				default:
					return "Command '"+args[0]+" "+args[1]+"' not exists!"
			}
		default:
			return "Command '"+args[0]+"' not exists!"
	}
},{"button":["byname","settext","setaction"],"editmode":["set","get","invert"],"calcKeyboard":[]})
//
expressionInput.onkeydown=function(e)
{
	if(e.key=="Enter")
		result()
}
var result=function(e)
{
	var n=historyTextarea.value.split("\n").length-1
	var expr=expressionInput.value
	expressionInput.value=getValName(n)
	historyTextarea.value+=expressionInput.value+"="+expr+"="+countExpression(replaceVals(expr))+"\n"
	expressionInput.oninput()
}
var getValName=function(n)
{
	n++
	var res=""
	while(n!=0)
	{
		res="abcdefghijklmnopqrstuvwxyz"[(n-1)%26]+res
		n=(n-(n-1)%26)/26
		n-=n%1
	}
	return res
}
var enter=function(value)
{
	var selStart=expressionInput.selectionStart
	var selEnd=expressionInput.selectionEnd
	expressionInput.value=expressionInput.value.substring(0,expressionInput.selectionStart)+value+expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	expressionInput.selectionStart=selStart+1
	expressionInput.selectionEnd=selEnd+1
}
expressionInput.oninput=function(e)
{
	numbersExpressionInput.value=replaceVals(expressionInput.value)
	resultInput.value=countExpression(replaceVals(expressionInput.value))
}
historyTextarea.oninput=function(e)
{
	for(var v1 in historyTextarea.value.split("\n"))
	{
		var selStart=historyTextarea.selectionStart
		var selEnd=historyTextarea.selectionEnd
		var val=""
		for(var v in historyTextarea.value.split("\n"))
			if(historyTextarea.value.split("\n")[v].split("=")[0])
				val+=(v!=v1?historyTextarea.value.split("\n")[v]:historyTextarea.value.split("\n")[v].split("=")[0]+"="+historyTextarea.value.split("\n")[v].split("=")[1]+"="+countExpression(replaceVals(historyTextarea.value.split("\n")[v].split("=")[1])))+"\n"
		historyTextarea.value=val
		historyTextarea.selectionStart=selStart
		historyTextarea.selectionEnd=selEnd
	}
}
var replaceVals=function(expression)
{
	for(var v in historyTextarea.value.split("\n"))
		if(historyTextarea.value.split("\n")[v].split("=")[0])
			expression=expression.replace(new RegExp("\\b"+historyTextarea.value.split("\n")[v].split("=")[0]+"\\b","g"),historyTextarea.value.split("\n")[v].split("=")[2])
	return expression
}
var countExpression=function(expression)
{
	var spl=expression.replace(/\b-\b/g,"+-").split("+")
	console.log(spl)
	var result=0
	for(var v in spl)
		result+=Number(spl[v])
	return result
}
var calcKeyboard
var createCalcKeyboardButton = function(currentCalcKeyboard, v, v2)
{
	var button = document.createElement("button")
	button.className="maxSize"
	button.id="calcKeyboardKey"+currentCalcKeyboard[v][v2].info.name
	button.innerText=currentCalcKeyboard[v][v2].info.text
	button.onclick=new Function("calcKeyboard["+v+"]["+v2+"].generated.func()") //new Function(calcKeyboard[v][v2].action)
	
	currentCalcKeyboard[v][v2].generated.btn=button
	currentCalcKeyboard[v][v2].generated.func=function()
	{
		var btn=currentCalcKeyboard[v][v2].generated.btn
		if(editmode)
		{
			if(btn.children.length==0)
			{
				btn.appendChild(document.createElement('textarea'))
				//btn.children[0].value=currentCalcKeyboard[v][v2].info.name+"\n"+currentCalcKeyboard[v][v2].info.text+"\n"+currentCalcKeyboard[v][v2].info.action
				btn.children[0].onclick=function(){btn.appendChild(document.createElement('label'))}
				btn.children[0].value=objectToJson(currentCalcKeyboard[v][v2].info)
				btn.children[0].focus()
			}
			else if(btn.children.length==1)
			{
				//currentCalcKeyboard[v][v2]={"info":{"name":btn.children[0].value.split("\n")[0],
				//		"text":btn.children[0].value.split("\n")[1],
				//		"action":btn.children[0].value.split("\n")[2]},"generated":{}}
				currentCalcKeyboard[v][v2]={"info":JSON.parse(btn.children[0].value),"generated":{}}
				btn.parentNode.appendChild(createCalcKeyboardButton(currentCalcKeyboard, v, v2))
				btn.parentNode.removeChild(btn)
			}
			else btn.removeChild(btn.children[1])
		}
		else new Function(currentCalcKeyboard[v][v2].info.action)()
	}
	return button
}
var createCalcKeyboardTd = function(currentCalcKeyboard, v, v2)
{
	var td = document.createElement("td")
	td.height=100/calcKeyboard.length+"%"
	td.width=100/calcKeyboard[v].length+"%"

	currentCalcKeyboard[v][v2]={"info":(currentCalcKeyboard[v][v2].info||currentCalcKeyboard[v][v2]),"generated":{}}
	td.appendChild(createCalcKeyboardButton(currentCalcKeyboard, v, v2))
		
	return td
}
var updateCalcKeyboard = function(currentCalcKeyboard)
{
	while(calcKeyboardTable.children.length>0)
		calcKeyboardTable.removeChild(calcKeyboardTable.children[0])
	calcKeyboard=makeClone(currentCalcKeyboard)
	for(var v in calcKeyboard)
	{
		var tr = document.createElement("tr")
		tr.height=100/calcKeyboard.length+"%"
		
		for(var v2 in calcKeyboard[v])
			tr.appendChild(createCalcKeyboardTd(calcKeyboard, v, v2))
		
		calcKeyboardTable.appendChild(tr)
	}
}
//Init calc keyboard
var defaultCalcKeyboard = [
	[
		{"name":"Root",		"text":"V",	"action":"enter('V')"},
		{"name":"Power",	"text":"^",	"action":"enter('^')"},
		{"name":"Percent",	"text":"%",	"action":"enter('%')"},
		{"name":"Factorial","text":"!",	"action":"enter('!')"}
	],
	[
		{"name":"Divide",	"text":"/",	"action":"enter('/')"},
		{"name":"Seven",	"text":"7",	"action":"enter('7')"},
		{"name":"Eight",	"text":"8",	"action":"enter('8')"},
		{"name":"Nine",		"text":"9",	"action":"enter('9')"}
	],
	[
		{"name":"Multiply",	"text":"*",	"action":"enter('*')"},
		{"name":"Four",		"text":"4",	"action":"enter('4')"},
		{"name":"Five",		"text":"5",	"action":"enter('5')"},
		{"name":"Six",		"text":"6",	"action":"enter('6')"}
	],
	[
		{"name":"Plus",		"text":"+",	"action":"enter('+')"},
		{"name":"One",		"text":"1",	"action":"enter('1')"},
		{"name":"Two",		"text":"2",	"action":"enter('2')"},
		{"name":"Three",	"text":"3",	"action":"enter('3')"}
	],
	[
		{"name":"Minus",	"text":"-",	"action":"enter('-')"},
		{"name":"Dot",		"text":".",	"action":"enter('.')"},
		{"name":"Zero",		"text":"0",	"action":"enter('0')"},
		{"name":"Equals",	"text":"=",	"action":"result();"}
	]]
var loadedCalcKeyboard=storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]]
console.log(storage["calculatorAndMath.calcKeyboard.last"])
console.log(storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]])
if(loadedCalcKeyboard)
	loadedCalcKeyboard=JSON.parse(loadedCalcKeyboard)
updateCalcKeyboard(loadedCalcKeyboard||defaultCalcKeyboard)


calcDiv.style.left=document.documentElement.clientWidth/2-calcDiv.getBoundingClientRect().width/2+"px"
calcDiv.style.top=document.documentElement.clientHeight/2-calcDiv.getBoundingClientRect().height/2+"px"
console.log(calcDiv)