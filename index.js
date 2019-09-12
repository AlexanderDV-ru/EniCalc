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
	}
},{"button":["byname","settext","setaction"]})
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
	expressionInput.value=expressionInput.value.substring(0,expressionInput.selectionStart)+value+expressionInput.value.substring(expressionInput.selectionEnd)
	expressionInput.oninput()
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
	var spl=expression.split("+")
	var result=0
	for(var v in spl)
		result+=Number(spl[v])
	return result
}