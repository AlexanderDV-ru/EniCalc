//Element moving
var addMovingElement = function(moving, mover, onmousedownRealisation, ondragstartRealisation, getCoordsRealisation, moveAtRealisation, onmousemoveRealisation, onmouseupRealisation)
{
	mover.ondragstart = ondragstartRealisation || function()
	{
		return false
	}

	var getCoords = getCoordsRealisation || function(elem)
	{
		var box = elem.getBoundingClientRect()
		return {
			top : box.top + pageYOffset,
			left : box.left + pageXOffset
		}
	}

	mover.onmousedown = onmousedownRealisation || function(e)
	{
		var moveAt = moveAtRealisation || function(e)
		{
			moving.style.left = e.pageX - shiftX + 'px'
			moving.style.top = e.pageY - shiftY + 'px'
		}

		document.onmousemove = onmousemoveRealisation || function(e)
		{
			moveAt(e)
		}

		mover.onmouseup = onmouseupRealisation || function()
		{
			document.onmousemove = null
			mover.onmouseup = null
		}

		var coords = getCoords(moving)
		var shiftX = e.pageX - coords.left
		var shiftY = e.pageY - coords.top

		moving.style.position = 'absolute'
		// document.body.appendChild(moving)
		moveAt(e)

		moving.style.zIndex = 1000
	}
}
// Console element
var addConsoleElement = function(consoleElement, onCommand, vars, getTabVarRealisation, onkeydownRealisation)
{
	var selStart = consoleElement.selectionStart, selEnd = consoleElement.selectionEnd
	var fixed = consoleElement.value = consoleElement.value == "" ? ">" : consoleElement.value + "\n>", editable = ""
	var last = [""], n = 0
	var tabIndex = -1, tabN = -1
	consoleElement.oninput = function(e)
	{
		if (!consoleElement.value.startsWith(fixed))
		{
			consoleElement.value = fixed + editable
			consoleElement.selectionStart = selStart
			consoleElement.selectionEnd = selEnd
		}
		else
		{
			editable = consoleElement.value.substring(fixed.length)
			if (n == last.length - 1)
				last[n] = editable
			selStart = consoleElement.selectionStart
			selEnd = consoleElement.selectionEnd
			tabIndex = tabN = -1
		}
	}
	if (vars)
		if (!vars.allVars)
		{
			vars = {
				"allVars" : vars,
				"allVarsArray0" : [],
				"allVarsArray1" : []
			}
			for ( var v in vars.allVars)
				vars.allVarsArray0.push(v)
			for ( var v in vars.allVars)
				for ( var v2 in vars.allVars[v])
				{
					vars.allVarsArray0.push(vars.allVars[v][v2])
					vars.allVarsArray1.push(vars.allVars[v][v2])
				}
			for ( var v in vars.allVars)
				vars.allVarsArray1.push(v)
		}
	var getTabVar = getTabVarRealisation || function(args, n)
	{
		var levelVars = args.length > 1 ? (vars.allVars[args[0]] || vars.allVarsArray1) : (Object.keys(vars.allVars) || vars.allVarsArray0)
		var curVars = []
		for ( var v in levelVars)
			if (levelVars[v].startsWith(args[args.length - 1]))
				curVars.push(levelVars[v])
		return curVars[(n % curVars.length + curVars.length) % curVars.length] || args[args.length - 1]
	}
	consoleElement.onkeydown = onkeydownRealisation || function(e)
	{
		if (consoleElement.selectionStart == consoleElement.value.length)
			switch (e.key)
			{
				case "Enter":
					var lines = editable.split("\n")
					for ( var v in lines)
						consoleElement.value = fixed = fixed + lines[v] + "\n" + onCommand(lines[v].toLowerCase().split(" ")) + "\n>"
					last[n = last.length] = editable = ""
					console.log(last)
					return false
				case "ArrowUp":
					editable = last[n == 0 ? n : --n]
					consoleElement.value = fixed + editable
					return false
				case "ArrowDown":
					editable = last[n == last.length - 1 ? n : ++n]
					consoleElement.value = fixed + editable
					return false
				case "Tab":
					if (tabIndex == -1)
						tabIndex = editable.length
					var args = editable.substring(0, tabIndex).split(" ")
					editable = editable.substring(0, tabIndex - args[args.length - 1].length) + getTabVar(args, ++tabN)
					consoleElement.value = fixed + editable
					return false
			}
	}
}
//
var defaultProperties = {
	"numberForm" : {
		"default" : {
			"digits" : "0123456789",
			"direction" : false,
			"minus" : "-",
			"dot" : ".",
			"minusPos" : false
		}
	}
}
var stringToNumber = function(value, digits, direction, minus, dot, minusPos)
{
	if (!digits)
		digits = defaultProperties.numberForm["default"].digits
	if (!direction)
		direction = defaultProperties.numberForm["default"].direction
	if (!minus)
		minus = defaultProperties.numberForm["default"].minus
	if (!dot)
		dot = defaultProperties.numberForm["default"].dot
	if (!minusPos)
		minusPos = defaultProperties.numberForm["default"].minusPos
	var val = ""
	for (var v = 0; value.length > v; v++)
		val = direction ? value[v] + val : val + value[v]
	var num = 0
	var min = value[0] == minus ? minus : ""
	var d
	for (var v = (minusPos ? 0 : min.length); val.length - (minusPos ? min.length : 0) > v; v++)
		if (val[v] == dot)
			d = true
		else num += d ? 1 / digits.match(val[v]).index * Math.pow(digits.length, val.length - 1 - v) : digits.match(val[v]).index * Math.pow(digits.length, val.length - 1 - v)
	return min ? -num : num
}
var numberToString = function(value, digits, direction, minus, dot, minusPos)
{
	if (!digits)
		digits = defaultProperties.numberForm["default"].digits
	if (!direction)
		direction = defaultProperties.numberForm["default"].direction
	if (!minus)
		minus = defaultProperties.numberForm["default"].minus
	if (!dot)
		dot = defaultProperties.numberForm["default"].dot
	if (!minusPos)
		minusPos = defaultProperties.numberForm["default"].minusPos
	var str = ""
	var min = 0 > value ? minus : ""
	for (; value != 0;)
	{
		str = digits[value % digits.length] + str
		value = (value - value % digits.length) / digits.length
	}
	str = min + str
	var val = ""
	for (var v = 0; str.length > v; v++)
		val = direction ? str[v] + val : val + str[v]
	return val
}
var multiply = function(a, b)
{
	var str = ""
	for (; a.length * b > str.length;)
		str += a[str.length % a.length]
	return str
}
var fromUpperCase = function(str)
{
	return (str + "")[0].toUpperCase() + (str + "").substring(1)
}
var objectToJson = function(object)
{
	return JSON.stringify(object).replace(/{/g, "{\n\t").replace(/\[/g, "[\n\t").replace(/,/g, ",\n\t").replace(/:/g, " : ").replace(/}/g, "\n}").replace(/]/g, "\n]")
}
var makeClone = function(orig)
{
	if ("object" !== typeof orig)
		return orig
	let clone = (orig instanceof Array) ? [] : {} // Создаем новый пустой
	// объект или массив
	for ( let prop in orig)
		// Перебираем все свойства копируемого объекта
		if (orig.hasOwnProperty(prop))
			if ("object" !== typeof orig[prop])
				clone[prop] = orig[prop]
			else clone[prop] = makeClone(orig[prop]) // Делаем клон свойства
	return clone
}