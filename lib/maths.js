//--- Name: MathsFunctions/Vesion: 0.0.2a/Authors: AlexanderDV/Description: Maths functions .javascript. ---
var mathsProps = {}
mathsProps.numberForms = {
	default	:	{
		digits	:	"0123456789",
		direction	:	false,
		minus	:	"-",
		dot	:	".",
		minusPos	:	false,
		ignoreCase	:	true
	},
	back	:	{
		direction	:	true
	},
	x2	:	{
		digits	:	"01"
	},
	x3	:	{
		digits	:	"012"
	},
	x6	:	{
		digits	:	"012345"
	},
	x8	:	{
		digits	:	"012345678"
	},
	x12	:	{
		digits	:	"0123456789ab"
	},
	x12xe	:	{
		digits	:	"0123456789xe"
	},
	x16	:	{
		digits	:	"0123456789abcdef"
	},
	x20	:	{
		digits	:	"0123456789abcdefghijkl"
	},
	letters	:	{
		digits	:	"abcdefghijklmnopqrstuvwxyz"
	},
	digitsLetters	:	{
		digits	:	"0123456789abcdefghijklmnopqrstuvwxyz"
	},
	lettersDigits	:	{
		digits	:	"abcdefghijklmnopqrstuvwxyz0123456789"
	},
	abc	:	{
		digits	:	"abcdefghijklmnopqrstuvwxyz",
		ignoreCase	:	false
	},
	ABC :	{
		digits	:	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		ignoreCase	:	false
	},
	abcABC	:	{
		digits	:	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
		ignoreCase	:	false
	},
	x60	:	{
		digits	:	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX",
		ignoreCase	:	false
	}
}
// Number form check&correct (service)
function numberFormCorrect(numberForm){
	var result={}
	arguments=[mathsProps.numberForms.default,...arguments]
	for(var v=0;v<arguments.length;v++)
		if(Array.isArray(arguments[v]))
		{
			arguments.splice(v,1,...arguments[v])
			v=0
		}
		else if(typeof arguments[v]=="string")
			arguments[v]=mathsProps.numberForms[arguments[v]]
	for(var v=0;v<arguments.length;v++)
		for(var v2 in arguments[v])
			if(arguments[v][v2]!=undefined&&arguments[v][v2]!=null)
				result[v2]=arguments[v][v2]
	return result
}
// String to number and number to string
function stringToNumber(string, numberForm){
	numberForm=numberFormCorrect(numberForm)

	var number = ""
	for (var v = 0; string.length > v; v++)
		number = numberForm.direction ? string[v] + number	:	number + string[v]
	var num = 0
	var min = string[0] == numberForm.minus ? numberForm.minus	:	""
	var d=0
	for (var v = (numberForm.minusPos ? 0	:	min.length); number.length - (numberForm.minusPos ? min.length	:	0) > v; v++)
		if (number[v] == numberForm.dot)
			d = 1
		else
    {
      num += numberForm.digits.match(number[v]).index*Math.pow(numberForm.digits.length, d?-d:(number.indexOf(".")==-1?number.length:number.indexOf("."))-v-1)
      d=d==0?0:d+1
    }
	return min ? -num	:	num
}
function numberToString(number, numberForm){
	numberForm=numberFormCorrect(numberForm)

	var string = ""
	var min = 0 > number ? numberForm.minus	:	""
	if(number instanceof Number)
		for (; number != 0;)
		{
			string = numberForm.digits[number % numberForm.digits.length] + string
			number = (number - number % numberForm.digits.length) / numberForm.digits.length
		}
	else return number+""
	string = min + string
	var val = ""
	for (var v = 0; string.length > v; v++)
		val = numberForm.direction ? string[v] + val	:	val + string[v]
	return val
}
// String&number functions
var multiplyStr = function(a, b){
	var result = ""
	for (; a.length * b > str.length;)
		str += a[str.length % a.length]
	return str
}
// Replace variables in expression
function replaceVariables(expression, variables){
	for ( var v in variables)
			if (variables[v]!=undefined)
				expression = expression.replace(new RegExp("[" + v.split("").join("][")+"]", "g"), "("+variables[v]+")")
			else expression = expression.replace(new RegExp("[" + v.split("").join("][")+"]", "g"), "«"+v+"»")
	return expression
}
// Get action by text
function actionByText(text, actionsByPriority){
  for(var v in actionsByPriority)
    for(var v2 in actionsByPriority[v])
      if(actionsByPriority[v][v2].text == action)
        return actionsByPriority[v][v2]
}
// Make action by operator in actionsByPriority array for args in actions array
function makeAction(args, action, numberForm, actionsByPriority){
	numberForm=numberFormCorrect(numberForm)

  if(typeof action == "string")
    action  = actionByText(action)
	while(args.length >  1)
		args.splice(0,  2,  action.func(args[0]||action.a,args[1]||action.b))
	return args[0]
}
// Count in brackets
function bracketsCount(expression,  numberForm,  actionsByPriority, func, toEndMode){
  var last
  for(var v=0;v<expression.length;v++)
    if(expression[v]=="(")
      last=v
    else if(expression[v]==")")
    {
      //console.log(expression)
      expression=expression.substr(0, last)+func(expression.substr(last+1,v-1-last),  numberForm,  actionsByPriority)+expression.substr(v+1)
      //console.log(expression)
      if(toEndMode)
        v=-1
      else break
    }
  //console.log(expression)
  return expression
}
// Polish count method
function polishCount(expression, numberForm, actionsByPriority){
	numberForm=numberFormCorrect(numberForm)

	var stack=[]
	var spl=expression.split(",")
	for(var v in spl)
		if(function(){try{return stringToNumber(spl[v], numberForm);}catch(Exception){return false;}return true}())
			stack.push(spl[v])
		else stack=[makeAction(stack, spl[v], numberForm, actionsByPriority)]
	//console.log(stack)
	return stack[0]
}
// Standard count method
function splitCount(expression, numberForm, actionsByPriority){
	numberForm=numberFormCorrect(numberForm)

  return _splitCount2(_splitCount(expression,numberForm,actionsByPriority),numberForm,actionsByPriority)
}
function _splitCount(expression,numberForm,actionsByPriority) {
  	var splited=[""]
  	for(var v in expression)
    {
      splited[splited.length-1]+=expression[v]
  		for(var v2 in actionsByPriority)
  			for(var v3 in actionsByPriority[v2])
  				if(splited[splited.length-1].endsWith(actionsByPriority[v2][v3].text))
  				{
  					splited[splited.length-1]=splited[splited.length-1].substr(0,splited[splited.length-1].length-actionsByPriority[v2][v3].text.length)
  					splited[splited.length]=actionsByPriority[v2][v3]
  					splited[splited.length]=""
            break
  				}
    }
    for(var v in splited)
      if(typeof splited[v]=="string")
        try {
          splited[v]=stringToNumber(splited[v],numberForm)
        } catch (e) {
        }
  return splited
}
function _splitCount2(splited, numberForm, actionsByPriority){

	//console.log(splited)
	for(var v in actionsByPriority)
		for(var v2=0;v2<splited.length;v2++)
			for(var v3 in actionsByPriority[v])
				if(splited[v2]==actionsByPriority[v][v3])
				{
          var a=splited[v2-1],b=splited[v2+1],action=actionsByPriority[v][v3]
          if(typeof a!="number"||Number.isNaN(a))
            a=action.a
          if(typeof b!="number"||Number.isNaN(b))
            b=action.b
            //console.log(a)
            //console.log(b)
            //console.log(action)
            //console.log(makeAction([a,b], action, numberForm))
					splited.splice(v2-1,3,(a+"").indexOf("«")!=-1||(b+"").indexOf("«")!=-1?a+action.text+b:makeAction([a,b], action, numberForm))
					//console.log(splited)
					v2=0
				}
	//console.log(splited)
	return splited[0]
}
