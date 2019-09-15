//Get objects
var storage = window.localStorage
//
var editmode=false
//
addMovingElement(unitsDiv, unitsMoverDiv)
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
		case "showresult":
			switch(args[1])
			{
				case "set":
					resultInput.style.display = Boolean(args[2])?"":"none"
					return "Show result successfully setted to "+(resultInput.style.display!='none')+"!"
				case "get":
					return "Show result = "+(resultInput.style.display!='none')
				case undefined:
				case "":
				case "invert":
					resultInput.style.display = (resultInput.style.display=='none')?"":"none"
					return "Show result successfully inverted to "+(resultInput.style.display!='none')+"!"
				default:
					return "Command '"+args[0]+" "+args[1]+"' not exists!"
			}
		case "shownumbersexpression":
			switch(args[1])
			{
				case "set":
					numbersExpressionInput.style.display = Boolean(args[2])?"":"none"
						return "Show result successfully setted to "+(numbersExpressionInput.style.display!='none')+"!"
				case "get":
					return "Show result = "+(numbersExpressionInput.style.display!='none')
				case undefined:
				case "":
				case "invert":
					numbersExpressionInput.style.display = (numbersExpressionInput.style.display=='none')?"":"none"
					return "Show result successfully inverted to "+(numbersExpressionInput.style.display!='none')+"!"
				default:
					return "Command '"+args[0]+" "+args[1]+"' not exists!"
			}
		case "showexpression":
			switch(args[1])
			{
				case "set":
					expressionInput.style.display = Boolean(args[2])?"":"none"
						return "Show result successfully setted to "+(expressionInput.style.display!='none')+"!"
				case "get":
					return "Show result = "+(expressionInput.style.display!='none')
				case undefined:
				case "":
				case "invert":
					expressionInput.style.display = (expressionInput.style.display=='none')?"":"none"
					return "Show result successfully inverted to "+(expressionInput.style.display!='none')+"!"
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
					if(storage["calculatorAndMath.calcKeyboard.last"]=="default")
						updateCalcKeyboard(defaultCalcKeyboard)
					else
					{
						var loaded=storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]]
						if(!loaded)
							return "Calc keyboard save not exist!"
						updateCalcKeyboard(JSON.parse(loaded))
					}
					return "Calc keyboard successfully loaded from "+storage["calculatorAndMath.calcKeyboard.last"]+"!"
				default:
					return "Command '"+args[0]+" "+args[1]+"' not exists!"
			}
		default:
			return "Command '"+args[0]+"' not exists!"
	}
},{
	"button":["byname","settext","setaction"],
	"editmode":["set","get","invert"],
	"showresult":["set","get","invert"],
	"shownumbersexpression":["set","get","invert"],
	"showexpression":["set","get","invert"],
	"calcKeyboard":["save","load"]})
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
var enterSelStart=expressionInput.selectionStart
var enterSelEnd=expressionInput.selectionEnd
var moveCaretTo=function(position)
{
	expressionInput.selectionStart=enterSelStart=expressionInput.selectionEnd=enterSelEnd=position
}
var updateSelection=function()
{
	expressionInput.selectionStart=enterSelStart
	expressionInput.selectionEnd=enterSelEnd
}
var enter=function(value)
{
	updateSelection()
	expressionInput.value=expressionInput.value.substring(0,expressionInput.selectionStart)+value+expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	moveCaretTo(enterSelStart+value.length)
}
var left=function()
{
	moveCaretTo(enterSelStart-1)
}
var right=function()
{
	moveCaretTo(enterSelStart+1)
}
var clear=function()
{
	updateSelection()
	expressionInput.value=""
	expressionInput.oninput()
	moveCaretTo(0)
}
var backspace=function()
{
	updateSelection()
	expressionInput.value=expressionInput.value.substring(0,expressionInput.selectionStart==expressionInput.selectionEnd?expressionInput.selectionStart-1:expressionInput.selectionStart)+expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	moveCaretTo(expressionInput.selectionStart==expressionInput.selectionEnd?enterSelStart-1:enterSelStart)
}
expressionInput.onmousemove=expressionInput.onmousedown=function(e)
{
	enterSelStart=expressionInput.selectionStart
	enterSelEnd=expressionInput.selectionEnd
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
	return multilineCount(expression)
	var spl=expression.replace(/\b-\b/g,"+-").split("+")
	var result=0
	for(var v in spl)
		result+=Number(spl[v])
	return result
}
var calcActions=[
	[
		{"symbol":"^","defaultA":10,"defaultB":2,"function":function(a,b){return Math.pow(a,b)}},
		{"symbol":"V","defaultA":2,"defaultB":0,"function":function(a,b){return Math.pow(b,1/a)}}
	],
	[
		{"symbol":"*","defaultA":0,"defaultB":0,"function":function(a,b){return a*b}},
		{"symbol":"/","defaultA":1,"defaultB":0,"function":function(a,b){return a/b}}
	],
	[
		{"symbol":"+","defaultA":0,"defaultB":0,"function":function(a,b){return a+b}},
		{"symbol":"-","defaultA":0,"defaultB":0,"function":function(a,b){return a-b}}
	]]
var multilineCount=function(expression)
{
	//console.log(expression)
	var lines=[expression+""]
	var move=function(start, end)
	{
		var last=multiply("#",end-start)
		for(var v=0;lines.length>v;v++)
		{
			var subs=lines[v].substring(start, end)
			lines[v]=lines[v].substring(0, start)+last+lines[v].substring(end)
			last=subs
			if(v+1==lines.length)
				lines[v+1]=multiply("_",start)+subs+multiply("_",lines[v].length-end)
			else continue
			break
		}
	}
	var numberRegExp="([-]|)(\\d*[.]\\d*|\\d+)"
	//console.log("--------------")
	for(;lines[0].match(/[(][^()]+[)]/);)
		lines[0]=lines[0].replace(/[(][^()]+[)]/,function(match){return multilineCount(match.substring(1,match.length-1))})
	for(var v=0;calcActions.length>v;v++)
		for(;;)
		{
			var actions=[]
			for(var v2 in calcActions[v])
				actions.push(calcActions[v][v2].symbol)
			var actionsRegExp=actions.join("|").replace(/[^]/g,"[$&]").replace(/\[\^\]/g,"\\^").replace(/\[\|\]/g,"|")
			//console.log(actionsRegExp)
			var result=lines[0].match(new RegExp("("+numberRegExp+"|#+)"+"("+actionsRegExp+")"+"("+numberRegExp+"|#+)"))
			//console.log(lines)
			//console.log(result)
			console.log(actionsRegExp)
			if(!result)
				break
			move(result.index,result.index+result[0].length)
		}
	var resultLines=[]
	for(var v=lines.length-1;v>0;v--)
	{
				//console.log(v)
		for(var v2=0;calcActions.length>v2;v2++)
			for(var v34 in calcActions[v2])
			{
				var v3=calcActions[v2][v34].symbol
				//console.log(new RegExp(""+numberRegExp+"[ ]*("+v3.replace(/[^]/g,"[$&]").replace(/\[\^\]/g,"\\^")+")"+numberRegExp+"[ ]*"))
				//console.log(lines[v].match(new RegExp(""+numberRegExp+"[ ]*("+v3.replace(/[^]/g,"[$&]").replace(/\[\^\]/g,"\\^")+")"+numberRegExp+"[ ]*")))
				//console.log(lines[v])
				lines[v]=lines[v].replace(new RegExp(""+numberRegExp+"[ ]*("+v3.replace(/[^]/g,"[$&]").replace(/\[\^\]/g,"\\^")+")"+numberRegExp+"[ ]*"),function(match)
						{
					//console.log("v3");
					return calcActions[v2][v34]["function"](Number(match.split(v3)[0]),Number(match.split(v3)[1]))+multiply(" ",match.length-(calcActions[v2][v34]["function"](Number(match.split(v3)[0]),Number(match.split(v3)[1]))+"").length)
					})
			//console.log(lines[v])
			}
				if(!resultLines[v])
		resultLines[v]=[]
		resultLines[v-1]=[]
		for(var v2=0;lines[v].length>v2;v2++)
		{
//			///console.log(lines[v-1][v2]=="#")
			//if(lines[v-1][v2]=="#")
			{
				////console.log(v)
				////console.log(v2)
				////console.log(lines[v-1][v2])
				resultLines[v-1][v2]=lines[v-1][v2]=="#"?lines[v][v2]:lines[v-1][v2]
				resultLines[v][v2]=lines[v][v2]=="#"?"_":lines[v][v2]
				////console.log(lines[v-1][v2])
				////console.log(lines[v][v2])
				//resultLines[v][v2]="_"
				////console.log(lines[v][v2])
			}
		}
		lines[v]=resultLines[v].join('')
		lines[v-1]=resultLines[v-1].join('')
	}
			
	//console.log(lines)
	//console.log(resultLines)
	return Number(lines[0])
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
var unitTypes= {
		"Масса":[
			{"short":"мкг","long":"Микрограммы","func":0.000000001},
			{"short":"мг","long":"Миллиграммы","func":0.000001},
			{"short":"г","long":"Граммы","func":0.001},
			{"short":"кг","long":"Килограммы","func":1},
			{"short":"ц","long":"Центнеры","func":100},
			{"short":"т","long":"Тонны","func":1000},
		],
		"Время":[ 
			{"short":"c","long":"Секунды","func":1},
			{"short":"м","long":"Минуты","func":60},
			{"short":"ч","long":"Часы","func":60*60},
			{"short":"-","long":"Дни, Половины суток","func":60*60*12},
			{"short":"-","long":"Сутки","func":60*60*12*2},
			{"short":"-","long":"Недели","func":60*60*12*2*7},
			{"short":"-","long":"Месяцы, 31 день","func":60*60*12*2*31},
			{"short":"-","long":"Месяцы, 30 дней","func":60*60*12*2*30},
			{"short":"-","long":"Месяцы, 1/12 года","func":60*60*12*2*365.25/12},
			{"short":"-","long":"Года, 365.25 дней","func":60*60*12*2*365.25},
			{"short":"-","long":"Года, 365 дней","func":60*60*12*2*365},
			{"short":"-","long":"Висакосные года, 366 дней","func":60*60*12*2*366},
			{"short":"-","long":"Века","func":60*60*12*2*365.25*100},
		],
		"Давление":[ 
			{"short":"-","long":"Паскали","func":1}
		],
		"Скорость":[ 
			{"short":"м/с","long":"Метры в секунду","func":1}
		],
		"Скорость передачи данных":[ 
			{"short":"-","long":"Биты в секунду","func":1}
		],
		"Расстояние":[ 
			{"short":"м","long":"Метры","func":1}
		],
		"Мощность":[ 
			{"short":"-","long":"Ватты","func":1}
		],
		"Объем":[ 
			{"short":"м^3","long":"Кубометры","func":1}
		],
		"Объем информации":[ 
			{"short":"-","long":"Байты","func":1}
		],
		"Площадь":[ 
			{"short":"м^2","long":"Квадратные метры","func":1}
		],
		"Температура":[ 
			{"short":"-","long":"Градусы цельсия","func":1}
		],
		"Расход топлива":[ 
			{"short":"-","long":"Километры на литр","func":1}
		],
		"Угол":[ 
			{"short":"-","long":"Градусы","func":1}
		],
		"Частота":[ 
			{"short":"-","long":"Герцы","func":1}
		],
		"Энергия":[ 
			{"short":"-","long":"Джоули","func":1}
		]
}
for(var v in unitTypes)
	unitTypeSelect.innerHTML+="<option>"+v+"</option>"
var form="$short$ ($long$)"
unitTypeSelect.oninput=function(e)
{
	firstUnitPowerSelect.innerHTML=""
	secondUnitPowerSelect.innerHTML=""
	var unitSelects=[firstUnitPowerSelect,secondUnitPowerSelect,thirdUnitPowerSelect,fourthUnitPowerSelect,fifthUnitPowerSelect]
	for(var v2 in unitSelects)
		for(var v in unitTypes[unitTypeSelect.value])
			unitSelects[v2].innerHTML+="<option>"+form.replace("$short$",unitTypes[unitTypeSelect.value][v].short).replace("$long$",unitTypes[unitTypeSelect.value][v].long)+"</option>"
}
unitTypeSelect.oninput()
var lastUnitInput=firstInput
var updateUnits=function(currentInput,currentSelect,otherInputs,otherSelects)
{
	var value=Number(currentInput.value)
	for(var v in unitTypes[unitTypeSelect.value])
	{
		var crt=unitTypes[unitTypeSelect.value][v]
		if(form.replace("$short$",crt.short).replace("$long$",crt.long)==currentSelect.value)
			value=("function" !=typeof crt.func)?value*crt.func:crt.func(value)
	}
	for(var v2 in otherInputs)
		for(var v in unitTypes[unitTypeSelect.value])
		{
			var crt=unitTypes[unitTypeSelect.value][v]
			if(form.replace("$short$",crt.short).replace("$long$",crt.long)==otherSelects[v2].value)
				otherInputs[v2].value=("function" !=typeof crt.func)?value/crt.func:crt.func(value)
		}
	lastUnitInput=currentInput
}
firstInput.oninput=function(e)
{
	updateUnits(firstInput,firstUnitPowerSelect,[secondInput,thirdInput,fourthInput,fifthInput],[secondUnitPowerSelect,thirdUnitPowerSelect,fourthUnitPowerSelect,fifthUnitPowerSelect])
}
secondInput.oninput=function(e)
{
	updateUnits(secondInput,secondUnitPowerSelect,[firstInput,thirdInput,fourthInput,fifthInput],[firstUnitPowerSelect,thirdUnitPowerSelect,fourthUnitPowerSelect,fifthUnitPowerSelect])
}
thirdInput.oninput=function(e)
{
	updateUnits(thirdInput,thirdUnitPowerSelect,[firstInput,secondInput,fourthInput,fifthInput],[firstUnitPowerSelect,secondUnitPowerSelect,fourthUnitPowerSelect,fifthUnitPowerSelect])
}
fourthInput.oninput=function(e)
{
	updateUnits(fourthInput,fourthUnitPowerSelect,[firstInput,secondInput,thirdInput,fifthInput],[firstUnitPowerSelect,secondUnitPowerSelect,thirdUnitPowerSelect,fifthUnitPowerSelect])
}
fifthInput.oninput=function(e)
{
	updateUnits(fifthInput,fifthUnitPowerSelect,[firstInput,secondInput,thirdInput,fourthInput],[firstUnitPowerSelect,secondUnitPowerSelect,thirdUnitPowerSelect,fourthUnitPowerSelect])
}
firstUnitPowerSelect.oninput=secondUnitPowerSelect.oninput=thirdUnitPowerSelect.oninput=fourthUnitPowerSelect.oninput=fifthUnitPowerSelect.oninput=function(e)
{
	lastUnitInput.oninput()
}
//Init calc keyboard
var defaultCalcKeyboard = [
	[
		{"name":"Left",		"text":"<",	"action":"left()"},
		{"name":"Right",	"text":">",	"action":"right()"},
		{"name":"Clear",	"text":"C",	"action":"clear()"},
		{"name":"Backspace","text":"<-","action":"backspace()"}
	],
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
		{"name":"Equals",	"text":"=",	"action":"result()"}
	]]
var loadedCalcKeyboard=storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]]
//console.log(storage["calculatorAndMath.calcKeyboard.last"])
//console.log(storage["calculatorAndMath.calcKeyboard.save."+storage["calculatorAndMath.calcKeyboard.last"]])
if(loadedCalcKeyboard)
	loadedCalcKeyboard=JSON.parse(loadedCalcKeyboard)
updateCalcKeyboard(loadedCalcKeyboard||defaultCalcKeyboard)


calcDiv.style.left=document.documentElement.clientWidth/2-calcDiv.getBoundingClientRect().width/2+"px"
calcDiv.style.top=document.documentElement.clientHeight/2-calcDiv.getBoundingClientRect().height/2+"px"
//console.log(calcDiv)