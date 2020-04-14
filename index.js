//--- Name: EniCalc/Vesion: 0.2.0a/Authors: AlexanderDV/Description: Main EniCalc file. ---
//--- Start of standard initialization
//Program info
var programInfo={
	"packet" : "eniCalc",
	"name" : "EniCalc",
	"version" : "0.2.0a",
	"authors" : "AlexanderDV"
}
programInfo.title= programInfo.name + " v" + programInfo.version + " by " + programInfo.authors
document.title=programInfo.title
// Universal local storage initialization
var storage = window.localStorage

// Messages language initialization by default value
var messagesLanguage='ru'
// Function for getting message by key
var getMsg=function(key, lang)
{
	return props.msgs[lang||messagesLanguage][key]
}
// End of standard initialization ---

//
if(storage[programInfo.packet+".calcKeyboard.save."+storage[programInfo.packet+".calcKeyboard.last"]])
	props.keyboard=JSON.parse(storage[programInfo.packet+".calcKeyboard.save."+storage[programInfo.packet+".calcKeyboard.last"]])
//
addMovingElement(unitsDiv, unitsMoverDiv)
addMovingElement(calcDiv, calcMoverDiv)
//
unitsMoverDiv.innerText=getMsg("move")
calcMoverDiv.innerText=getMsg("move")
addUnitFieldButton.innerText=getMsg("add")
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
var propCmdVariants = {
		"boolean" : {
			"set" : {
				"handler" : function(args, variants, current)
				{
					props[prop] = Boolean(args[2]);
					console.log(123)
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}
			},
			"get" : {
				"handler" : function(args, variants, current)
				{
					return "Property '" + prop + "' = " + props[prop]
				}
			},
			"invert|" : {
				"handler" : function(args, variants, current)
				{
					props[args[current - 2]] = !props[args[current - 2]]
					return "Property '" + args[current - 2] + "' successfully inverted to " + props[args[current - 2]] + "!"
				}
			},
			"" : {
				"handler" : function(args, variants, current)
				{
					return "Command '" + args[0] + " " + args[1] + "' not exists!"
				}
			}

		},
		"string" : {
			"set" : {
				"handler" : function(args)
				{
					props[prop] = args[2]
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}
			},
			"get" : {
				"handler" : function(args)
				{
					return "Property '" + prop + "' = " + props[prop]
				}
			},
			"" : {
				"handler" : function(args)
				{
					return "Command '" + args[0] + " " + args[1] + "' not exists!"
				}
			}

		},
		"number" : {
			"set" : {
				"handler" : function(args)
				{
					props[prop] = Number(args[2])
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}
			},
			"get" : {
				"handler" : function(args)
				{
					return "Property '" + prop + "' = " + props[prop]
				}
			},
			"" : {
				"handler" : function(args)
				{
					return "Command '" + args[0] + " " + args[1] + "' not exists!"
				}
			}

		}
	}
var commands={
	"editmode":{
		"vars":"editmode",
		"variants":propCmdVariants.boolean,
	},
	"polishmode":{
		"variants":propCmdVariants.boolean,
	},
	"resultdigits":{
		"variants":propCmdVariants.string,
	},
	"resultdirection":{
		"variants":propCmdVariants.boolean,
	},
	"expressiondigits":{
		"variants":propCmdVariants.string,
	},
	"expressiondirection":{
		"variants":propCmdVariants.boolean,
	},
}
// function(args)
// {
// switch (args[0])
// {
//
// case "showresult":
// switch (args[1])
// {
// case "set":
// resultInput.style.display = Boolean(args[2]) ? "" : "none"
// return "Show result successfully setted to " + (resultInput.style.display !=
// 'none') + "!"
// case "get":
// return "Show result = " + (resultInput.style.display != 'none')
// case undefined:
// case "":
// case "invert":
// resultInput.style.display = (resultInput.style.display == 'none') ? "" :
// "none"
// return "Show result successfully inverted to " + (resultInput.style.display
// != 'none') + "!"
// default:
// return "Command '" + args[0] + " " + args[1] + "' not exists!"
// }
// case "shownumbersexpression":
// switch (args[1])
// {
// case "set":
// numbersExpressionInput.style.display = Boolean(args[2]) ? "" : "none"
// return "Show result successfully setted to " +
// (numbersExpressionInput.style.display != 'none') + "!"
// case "get":
// return "Show result = " + (numbersExpressionInput.style.display != 'none')
// case undefined:
// case "":
// case "invert":
// numbersExpressionInput.style.display = (numbersExpressionInput.style.display
// == 'none') ? "" : "none"
// return "Show result successfully inverted to " +
// (numbersExpressionInput.style.display != 'none') + "!"
// default:
// return "Command '" + args[0] + " " + args[1] + "' not exists!"
// }
// case "showexpression":
// switch (args[1])
// {
// case "set":
// expressionInput.style.display = Boolean(args[2]) ? "" : "none"
// return "Show result successfully setted to " + (expressionInput.style.display
// != 'none') + "!"
// case "get":
// return "Show result = " + (expressionInput.style.display != 'none')
// case undefined:
// case "":
// case "invert":
// expressionInput.style.display = (expressionInput.style.display == 'none') ?
// "" : "none"
// return "Show result successfully inverted to " +
// (expressionInput.style.display != 'none') + "!"
// default:
// return "Command '" + args[0] + " " + args[1] + "' not exists!"
// }
// case "calckeyboard":
// switch (args[1])
// {
// case "save":
// if (args[2])
// storage["calculatorAndMath.calcKeyboard.last"] = args[2]
// if (!storage["calculatorAndMath.calcKeyboard.last"])
// storage["calculatorAndMath.calcKeyboard.last"] = "newsave"
// storage["calculatorAndMath.calcKeyboard.save." +
// storage["calculatorAndMath.calcKeyboard.last"]] =
// JSON.stringify(calcKeyboard)
// return "Calc keyboard successfully saved to " +
// storage["calculatorAndMath.calcKeyboard.last"] + "!"
// case "load":
// if (args[2])
// storage["calculatorAndMath.calcKeyboard.last"] = args[2]
// if (!storage["calculatorAndMath.calcKeyboard.last"])
// storage["calculatorAndMath.calcKeyboard.last"] = "newsave"
// if (storage["calculatorAndMath.calcKeyboard.last"] == "default")
// updateCalcKeyboard(defaultCalcKeyboard)
// else
// {
// var loaded = storage["calculatorAndMath.calcKeyboard.save." +
// storage["calculatorAndMath.calcKeyboard.last"]]
// if (!loaded)
// return "Calc keyboard save not exist!"
// updateCalcKeyboard(JSON.parse(loaded))
// }
// return "Calc keyboard successfully loaded from " +
// storage["calculatorAndMath.calcKeyboard.last"] + "!"
// default:
// return "Command '" + args[0] + " " + args[1] + "' not exists!"
// }
// default:
// return "Command '" + args[0] + "' not exists!"
// }
// }, {
// "editmode" : ["set", "get", "invert"],
// "polishmode" : ["set", "get", "invert"],
// "showresult" : ["set", "get", "invert"],
// "shownumbersexpression" : ["set", "get", "invert"],
// "showexpression" : ["set", "get", "invert"],
// "expressiondigits" : ["set", "get"],
// "expressiondirection" : ["set", "get", "invert"],
// "resultdigits" : ["set", "get"],
// "resultdirection" : ["set", "get", "invert"],
// "calcKeyboard" : ["save", "load"]
// }
var handler=function(args, variants, current)
{
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
// calc
expressionInput.onkeydown = function(e)
{
	if (e.key == "Enter")
		result()
}
var result = function(e)
{
	var expr = expressionInput.value
	var other=[]
	for ( var v in historyTextarea.value.split("\n"))
		if (historyTextarea.value.split("\n")[v].split("=")[0].split(":")[0])
			other.push(historyTextarea.value.split("\n")[v].split("=")[0].split(":")[0])
	expressionInput.value = getValName(other)
	historyTextarea.value += expressionInput.value + "=" + expr + "=" + expressionNumberToString(props.misc.polishmode?polishCount(replaceVals(expr)):multilineCount(replaceVals(expr))) + "\n"
	expressionInput.oninput()
}
var getValName = function(other)
{
	var max=0
	for(var v in other)
	{
		var c=0
		for(var v2 in other[v])
			c+=("abcdefghijklmnopqrstuvwxyz".match(other[v][v2]).index+1)*Math.pow(26,other[v].length-1-v2)
		max=Math.max(c,max)
	}
	var n=max+1
	var res = ""
	while (n != 0)
	{
		res = "abcdefghijklmnopqrstuvwxyz"[(n - 1) % 26] + res
		n = (n - (n - 1) % 26) / 26
		n -= n % 1
	}
	return res
}
var enterSelStart = expressionInput.selectionStart
var enterSelEnd = expressionInput.selectionEnd
var moveCaretTo = function(position)
{
	expressionInput.selectionStart = enterSelStart = expressionInput.selectionEnd = enterSelEnd = position
}
var updateSelection = function()
{
	expressionInput.selectionStart = enterSelStart
	expressionInput.selectionEnd = enterSelEnd
}
var enter = function(value)
{
	updateSelection()
	expressionInput.value = expressionInput.value.substring(0, expressionInput.selectionStart) + value + expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	moveCaretTo(enterSelStart + value.length)
}
var left = function()
{
	moveCaretTo(enterSelStart - 1)
}
var right = function()
{
	moveCaretTo(enterSelStart + 1)
}
var clear = function()
{
	updateSelection()
	expressionInput.value = ""
	expressionInput.oninput()
	moveCaretTo(0)
}
var clearHistory = function()
{
	updateSelection()
	historyTextarea.value = ""
	expressionInput.oninput()
	updateSelection()
}
var backspace = function()
{
	updateSelection()
	expressionInput.value = expressionInput.value.substring(0, expressionInput.selectionStart == expressionInput.selectionEnd ? expressionInput.selectionStart - 1 : expressionInput.selectionStart) + expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
	moveCaretTo(expressionInput.selectionStart == expressionInput.selectionEnd ? enterSelStart - 1 : enterSelStart)
}
expressionInput.onmousemove = expressionInput.onmousedown = function(e)
{
	enterSelStart = expressionInput.selectionStart
	enterSelEnd = expressionInput.selectionEnd
}
expressionInput.oninput = function(e)
{
	numbersExpressionInput.value = replaceVals(expressionInput.value)
	resultInput.value = resultNumberToString(props.misc.polishmode?polishCount(replaceVals(expressionInput.value)):multilineCount(replaceVals(expressionInput.value)))||""
}
historyTextarea.oninput = function(e)
{
	for ( var v1 in historyTextarea.value.split("\n"))
	{
		var selStart = historyTextarea.selectionStart
		var selEnd = historyTextarea.selectionEnd
		var val = ""
		for ( var v in historyTextarea.value.split("\n"))
			if (historyTextarea.value.split("\n")[v])
				if(v != v1)
					val+=historyTextarea.value.split("\n")[v] + "\n"
				else switch(historyTextarea.value.split("\n")[v].split("=")[0].split(":")[1])
				{
					case "default":
						val += historyTextarea.value.split("\n")[v].split("=")[0] + "=" + historyTextarea.value.split("\n")[v].split("=")[1] + "=" + multilineCount(replaceVals(historyTextarea.value.split("\n")[v].split("=")[1])) + "\n"
						break
					case "polish":
						val += historyTextarea.value.split("\n")[v].split("=")[0] + "=" + historyTextarea.value.split("\n")[v].split("=")[1] + "=" + polishCount(replaceVals(historyTextarea.value.split("\n")[v].split("=")[1])) + "\n"
						break
					case "value":
						val += historyTextarea.value.split("\n")[v].split("=")[0] + "=" + historyTextarea.value.split("\n")[v].split("=")[1] + "=" + historyTextarea.value.split("\n")[v].split("=")[1] + "\n"
						break
					default:
						val+=historyTextarea.value.split("\n")[v] + "\n"
						break
				}
		historyTextarea.value = val
		historyTextarea.selectionStart = selStart
		historyTextarea.selectionEnd = selEnd
	}
}
// functions
var expressionNumberToString = function(value)
{
	var cur = props.misc.numberForm.expression, def = props.misc.numberForm["default"]
	return numberToString(value, cur.digits || def.digits, cur.direction || def.direction, cur.minus || def.minus, cur.dot || def.dot, cur.minusPos || def.minusPos)
}
var expressionStringToNumber = function(value)
{
	var cur = props.misc.numberForm.expression, def = props.misc.numberForm["default"]
	return stringToNumber(value, cur.digits || def.digits, cur.direction || def.direction, cur.minus || def.minus, cur.dot || def.dot, cur.minusPos || def.minusPos)
}
var resultNumberToString = function(value)
{
	var cur = props.misc.numberForm.result, def = props.misc.numberForm["default"]
	return numberToString(value, cur.digits || def.digits, cur.direction || def.direction, cur.minus || def.minus, cur.dot || def.dot, cur.minusPos || def.minusPos)
}
var resultStringToNumber = function(value)
{
	var cur = props.misc.numberForm.result, def = props.misc.numberForm["default"]
	return stringToNumber(value, cur.digits || def.digits, cur.direction || def.direction, cur.minus || def.minus, cur.dot || def.dot, cur.minusPos || def.minusPos)
}
var replaceVals = function(expression)
{
	for ( var v in historyTextarea.value.split("\n"))
		if (historyTextarea.value.split("\n")[v].split("=")[0])
			expression = expression.replace(new RegExp("\\b" + historyTextarea.value.split("\n")[v].split("=")[0].split(":")[0] + "\\b", "g"), historyTextarea.value.split("\n")[v].split("=")[2])
	return expression
}
var action=function(operator, args, priority, number)
{
	if(!priority&&!number&&operator)
		for(var v2=0;props.actions.byPriority.length>v2;v2++)
			for(var v34 in props.actions.byPriority[v2])
				if(props.actions.byPriority[v2][v34].text==operator)
				{
					priority=v2
					number=v34
				}
	for(;args.length>1;)
		args.splice(0,2,new Function("a","b","return "+props.actions.byPriority[priority][number].func)(args[0],args[1]))
	return args[0]
}
var polishCount=function(expression, digits, direction, minus, dot, minusPos)
{
	if (!digits)
		digits = props.misc.numberForm["default"].digits
	if (!direction)
		direction = props.misc.numberForm["default"].direction
	if (!minus)
		minus = props.misc.numberForm["default"].minus
	if (!dot)
		dot = props.misc.numberForm["default"].dot
	if (!minusPos)
		minusPos = props.misc.numberForm["default"].minusPos

	var stack=[]
	var spl=expression.split(",")
	for(var v in spl)
		if(function(){try{return stringToNumber(spl[v], digits, direction, minus, dot, minusPos);}catch(Exception){return false;}}())
			stack.push(stringToNumber(spl[v], digits, direction, minus, dot, minusPos))
		else stack=[action(spl[v],stack)]
	return stack[0]
}
var multilineCount=function(expression, digits, direction, minus, dot, minusPos)
{
	if (!digits)
		digits = props.misc.numberForm["default"].digits
	if (!direction)
		direction = props.misc.numberForm["default"].direction
	if (!minus)
		minus = props.misc.numberForm["default"].minus
	if (!dot)
		dot = props.misc.numberForm["default"].dot
	if (!minusPos)
		minusPos = props.misc.numberForm["default"].minusPos

	// console.log(expression)
	var lines=[[{"start":0,"end":expression.length,"value":expression+""}]]
	var move=function(start, end)
	{
		var last=[[{"start":start,"end":end,"value":multiply("#",end-start)}]]
		for(var v=0;lines.length>v;v++)
		{
			last.push([])
			var ok
			for(var v2=0;lines[v].length>v2;v2++)
			{
				if(lines[v][v2].end>=start&&end>=lines[v][v2].start)
				{
					var subsl={
							"start":Math.max(lines[v][v2].start,start),
							"end":Math.min(lines[v][v2].end,end),
							"value":lines[v][v2].value.substring(start-lines[v][v2].start, end-lines[v][v2].start)
					}
					lines[v][v2].value=lines[v][v2].value.substring(0, Math.max(lines[v][v2].start,start)-lines[v][v2].start)+last[v][0].value+lines[v][v2].value.substring(Math.min(lines[v][v2].end,end)-lines[v][v2].start)
					lines[v][v2].start=Math.min(lines[v][v2].start,last[v][0].start)
					lines[v][v2].end=Math.max(lines[v][v2].end,last[v][0].end)
					last[v+1].push(makeClone(subsl))
					if(v+1==lines.length)
						lines[++v]=[makeClone(subsl)]
					console.log("last: "+JSON.stringify(last))
					console.log("lines: "+JSON.stringify(lines))
					ok=true
				}
				// if(!(!(v2+1==lines[v].length)||(!ok)))
				// lines[v].push({"start":start,"end":end,"value":""})
			}
		}
		 console.log("lines: "+JSON.stringify(lines))
	}
	var numberRegExp="(?:[-]|)(?:["+digits+"]*[.]["+digits+"]*|["+digits+"]+)"
	console.log("--------------")
	console.log(JSON.stringify(lines))
	for(;lines[0][0].value.match(/[(][^()]+[)]/);)
		lines[0][0].value=lines[0][0].value.replace(/[(][^()]+[)]/,function(match){return multilineCount(match.substring(1,match.length-1))})
	for(var v=0;props.actions.byPriority.length>v;v++)
		for(;;)
		{
			var actions=[]
			for(var v2 in props.actions.byPriority[v])
				actions.push(props.actions.byPriority[v][v2].text)
			var actionsRegExp=actions.join("|").replace(/[^]/g,"[$\u0026]").replace(/\[\^\]/g,"\\^").replace(/\[\|\]/g,"|")
			// console.log(actionsRegExp)
			var result=lines[0][0].value.match(new RegExp("(?:"+numberRegExp+"|#+)"+"(?:"+actionsRegExp+")"+"(?:"+numberRegExp+"|#+)"))
			 console.log(result)
			if(!result)
				break
			move(result.index,result.index+result[0].length)
		}
	for(var v=lines.length-1;v>0;v--)
		for(var v22=0;lines[v].length>v22;v22++)
	{
			console.log("dsf")
			console.log(JSON.stringify(lines))
				// console.log(v)
		for(var v2=0;props.actions.byPriority.length>v2;v2++)
			for(var v34 in props.actions.byPriority[v2])
			{
				var v3=props.actions.byPriority[v2][v34].text
				// console.log(new RegExp(""+numberRegExp+"[
				// ]*("+v3.replace(/[^]/g,"[$\u0026]").replace(/\[\^\]/g,"\\^")+")"+numberRegExp+"[
				// ]*"))
				// console.log(lines[v].match(new RegExp(""+numberRegExp+"[
				// ]*("+v3.replace(/[^]/g,"[$\u0026]").replace(/\[\^\]/g,"\\^")+")"+numberRegExp+"[
				// ]*")))
				// console.log(lines[v])
				// console.log(lines[v][v22].value)
				// console.log(lines)
				lines[v][v22].value=lines[v][v22].value.replace(new RegExp(""+numberRegExp+"[ ]*(?:"+v3.replace(/[^]/g,"[$\u0026]").replace(/\[\^\]/g,"\\^")+")"+numberRegExp+"[ ]*"),function(match)
						{
					// console.log("v3");
					// console.log(new Function("a","b","return
					// "+props.actions.byPriority[v2][v34].func)(stringToNumber(match.split(v3)[0],
					// digits, direction, minus, dot,
					// minusPos),stringToNumber(match.split(v3)[1], digits,
					// direction, minus, dot, minusPos)))
					return numberToString(action(undefined,[stringToNumber(match.split(v3)[0], digits, direction, minus, dot, minusPos),stringToNumber(match.split(v3)[1], digits, direction, minus, dot, minusPos)],v2,v34), digits, direction, minus, dot, minusPos)// numberToString(new
																																																																		// Function("a","b","return
																																																																		// "+props.actions.byPriority[v2][v34].func)(stringToNumber(match.split(v3)[0],
																																																																		// digits,
																																																																		// direction,
																																																																		// minus,
																																																																		// dot,
																																																																		// minusPos),stringToNumber(match.split(v3)[1],
																																																																		// digits,
																																																																		// direction,
																																																																		// minus,
																																																																		// dot,
																																																																		// minusPos)),
																																																																		// digits,
																																																																		// direction,
																																																																		// minus,
																																																																		// dot,
																																																																		// minusPos)
					})
			// console.log(lines[v])
			}
			console.log(JSON.stringify(lines))
		for(var v222=0;lines[v-1].length>v222;v222++)
		{
			if(!(!(lines[v][v22].start>=lines[v-1][v222].start) ||!( lines[v-1][v222].end>=lines[v][v22].end)))
				lines[v-1][v222].value=lines[v-1][v222].value.substring(0,lines[v][v22].start-lines[v-1][v222].start)+lines[v][v22].value+lines[v-1][v222].value.substring(lines[v][v22].end-lines[v-1][v222].start)
		}
		lines[v].splice(v22)
		console.log(JSON.stringify(lines))
	}

	// console.log(lines)
	// console.log(resultLines)
	console.log(lines[0][0].value, digits, direction, minus, dot, minusPos)
	return stringToNumber(lines[0][0].value, digits, direction, minus, dot, minusPos)
}
console.log(resultNumberToString(123))
console.log(resultStringToNumber(123+""))
var temp
var createCalcKeyboardButton = function(v, v2)
{
	var button = document.createElement("button")
	button.className="maxWidth"
	button.id="calcKeyboardKey"+props.keyboard.table[v][v2].name
	button.title=props.keyboard.table[v][v2].name+"\nDoes: "+(props.keyboard.table[v][v2].func||"-")
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
				btn.parentNode.appendChild(createCalcKeyboardButton(currentCalcKeyboard, v, v2))
				btn.parentNode.removeChild(btn)
			}
			else btn.removeChild(btn.children[1])
		}
		else new Function(props.keyboard.table[v][v2].func)()
	}
	return button
}
var createCalcKeyboardTd = function(v, v2)
{
	var td = document.createElement("td")
	td.height=100/props.keyboard.table.length+"%"
	var width=0
	for(var v22 in props.keyboard.table)
		width=Math.max(width,props.keyboard.table[v22].length)
	td.width=100/width+"%"
	td.appendChild(createCalcKeyboardButton(v, v2))
	return td
}
var updateCalculatorKeyboard = function()
{
	temp=[]
	calcKeyboardTable.innerHTML=""
	for(var v in props.keyboard.table)
	{
		temp[v]=[]

		var tr = document.createElement("tr")
		tr.height=100/props.keyboard.table.length+"%"
		calcKeyboardTable.appendChild(tr)

		for(var v2 in props.keyboard.table[v])
			tr.appendChild(createCalcKeyboardTd(v, v2))
	}
}
var setCalculatorKeyboard=function(keyboard)
{
	props.keyboard=keyboard
	updateCalculatorKeyboard()
}
//

calcDiv.style.left=document.documentElement.clientWidth/2-calcDiv.getBoundingClientRect().width/2+"px"
calcDiv.style.top=document.documentElement.clientHeight/2-calcDiv.getBoundingClientRect().height/2+"px"

unitsDiv.style.left=document.documentElement.clientWidth/2-unitsDiv.getBoundingClientRect().width/2+"px"
// console.log(calcDiv)
// Unit converter
for(var v2=0;document.getElementById("unitFieldNum"+v2);v2++)
{
	document.getElementById("unitPowerSelectNum"+v2).oninput = new Function("updateUnits(lastUnitFieldNum)")
	document.getElementById("unitPowerSelectEx1Num"+v2).oninput = new Function("updateUnits(lastUnitFieldNum)")
	document.getElementById("unitInputNum"+v2).oninput = new Function("updateUnits("+v2+")")
}
var form="short (long)"
var lastUnitFieldNum=0
addUnitFieldButton.onclick=function()
{
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
var updateUnits=function(currentNum)
{
	var currentInput=document.getElementById("unitInputNum"+currentNum)
	var currentSelect=document.getElementById("unitPowerSelectNum"+currentNum)
	var value
	var currentUnitPower=props.units[unitTypeSelect.value][currentSelect.value.split(" (")[0]]

	var inner=""
	for(var v in currentUnitPower)
		inner+="<option>"+(form.replace("short",v).replace("long",currentUnitPower[v].long))+"</option>"
	if(document.getElementById("unitPowerSelectEx1Num"+currentNum).innerHTML!=inner)
		document.getElementById("unitPowerSelectEx1Num"+currentNum).innerHTML=inner
	document.getElementById("unitPowerSelectEx1Num"+currentNum).oninput=currentSelect.oninput
	if(!currentUnitPower.long&&!currentUnitPower.func)
	{
		document.getElementById("unitPowerSelectEx1Num"+currentNum).style.display=""
		currentUnitPower=currentUnitPower[document.getElementById("unitPowerSelectEx1Num"+currentNum).value.split(" (")[0]]
	}
	else if(document.getElementById("unitPowerSelectEx1Num"+currentNum))
		document.getElementById("unitPowerSelectEx1Num"+currentNum).style.display="none"
	value=("function" !=typeof currentUnitPower.func)?Number(currentInput.value)*currentUnitPower.func:currentUnitPower.func(Number(currentInput.value))

	for(var v2=0;document.getElementById("unitFieldNum"+v2);v2++)
		if(v2!=currentNum)
		{
			var crt = props.units[unitTypeSelect.value][document.getElementById("unitPowerSelectNum"+v2).value.split(" (")[0]]
			if(!crt.long)
				crt=crt[document.getElementById("unitPowerSelectEx1Num"+v2).value.split(" (")[0]]
			document.getElementById("unitInputNum"+v2).value=("function" !=typeof crt.func)?value/crt.func:crt.anti(Number(currentInput.value))
		}
	lastUnitFieldNum=currentNum
	console.log(lastUnitFieldNum)
}
var updateUnitConverter=function()
{
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
//
updateCalculatorKeyboard()
updateUnitConverter()
