//---	Name:	DefaultProperties/Vesion:	0.1.2a/Authors:	AlexanderDV/Description:	Default-properties	.javascript.	---
var	props={}
props.misc = {
	editmode	:	false,
	polishmode	:	false
}
props.numberForms=mathsProps.numberForms
props.variables = {
	names	:	{
		default	:	"abcdefghijklmnopqrstuvwxyz",
		black	:	"0123456789"+"*/-+!^√%:&|#"+"	,;"+"()[]{}"+".",
		white	:	"abcdefghijklmnopqrstuvwxyz"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"αβγδεζηθικλμνοπρσςτυφχψω"+"ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣξΤΥΦΧΨΩ"+"_",
		mode	:	"!black||white"
	}
}
props.actions = {
	default	:	{	a	:	0,	b	:	0	},
	laws	:	{
		a	: "Associative",
		c	: "Commutative"
	},
	rules	:	{
		d	: "Distributive"
	},
	byPriority	:	[
		[
			{	name	:	"Not",	text	:	"`",	func	:	"(!b)*1",		a	:	0,	b	:	1	}
		],
		[
			{	name	:	"Factorial",	text	:	"!",	func	:	"function(a,b){var	r=1;for(var	v=b+1;v<=a;v++)r*=v;return	r}(a,b)",		a	:	2,	b	:	1	}
		],
		[
			{	name	:	"Power",			text	:	"^",	func	:	"Math.pow(a,b)",		a	:	10,	b	:	2, pos:"√", prev:"*", rules	:	"d(*/)"	},
			{	name	:	"Root",				text	:	"√",	func	:	"Math.pow(b,1/a)",	a	:	2,	b	:	4, neg:"^", rules	:	"d(*/)",rotated:true}
		],
		[
			{	name	:	"Multiply",		text	:	"*",	func	:	"a*b",	a	:	2,	b	:	2, pos:"/", prev:"+", laws	:	"ac", rules	:	"d(+-)"	},
			{	name	:	"Divide",			text	:	"/",	func	:	"a/b",	a	:	1,	b	:	2, neg:"*", rules	:	"d(+-)"	},
			{	name	:	"Percent",		text	:	"%",	func	:	"a/100*b",	a	:	2,	b	:	6	},
			{	name	:	"Remainder",	text	:	"#",	func	:	"a/b-Number((a/b+'').split('.')[0])",	a	:	1,	b	:	2	},
			{	name	:	"DivideWithoutRemainder",text	:	":",	func	:	"Number((a/b+'').split('.')[0])",	a	:	10,	b	:	2	}
		],
		[
			{	name	:	"Plus",				text	:	"+",	func	:	"a+b",	a	:	1,	b	:	1,	pos:"-", laws	:	"ac"	},
			{	name	:	"Minus",			text	:	"-",	func	:	"a-b",	a	:	0,	b	:	1,	neg:"+"	}
		],
		[
			{	name	:	"Equals",					text	:	"==",	func	:	"(a==b)*1",	a	:	0,	b	:	0	},
			{	name	:	"MoreOrEquals",		text	:	">=",	func	:	"(a>=b)*1",	a	:	0,	b	:	0	},
			{	name	:	"LessOrEquals",		text	:	"<=",	func	:	"(a<=b)*1",	a	:	0,	b	:	0	},
			{	name	:	"More",						text	:	">",	func	:	"(a>b)*1",	a	:	0,	b	:	0	},
			{	name	:	"Less",						text	:	"<",	func	:	"(a<b)*1",	a	:	0,	b	:	0	},
			{	name	:	"NotEquals",			text	:	"`=",	func	:	"(a!=b)*1",	a	:	0,	b	:	0	}
		]
	]
}
for(var v in props.actions.byPriority)
	for(var v2 in props.actions.byPriority[v])
	{
		props.actions.byPriority[v][v2].does=props.actions.byPriority[v][v2].func
		props.actions.byPriority[v][v2].func=new Function("a","b","return "+props.actions.byPriority[v][v2].func)
	}
props.keyboard = {
	default	:	{	text	:	null,	func	:	"enter(key.text)",	disabled	:	false},
	table	:	[
		[
			{	name	:	"MemoryClear",	text	:	"MC",	func	:	"",	disabled	:	true	},
			{	name	:	"MemoryR",			text	:	"MR",	func	:	"",	disabled	:	true	},
			{	name	:	"MemorySave",		text	:	"MS",	func	:	"",	disabled	:	true	},
			{	name	:	"MemoryMinus",	text	:	"M-",	func	:	"",	disabled	:	true	},
			{	name	:	"MemoryPlus",		text	:	"M+",	func	:	"",	disabled	:	true	}
		],
		[
			{	name	:	"Left",					text	:	"◄",		func	:	"left()",			},
			{	name	:	"Right",				text	:	"►",		func	:	"right()",		},
			{	name	:	"Clear",				text	:	"C",		func	:	"clear()",		},
			{	name	:	"Backspace",		text	:	"←",		func	:	"backspace()"	}
		],
		[
			{	name	:	"BracketLeft",	text	:	"(",		func	:	"enter('(')"		},
			{	name	:	"BracketRight",	text	:	")",		func	:	"enter(')')"		},
			{	name	:	"Comma",				text	:	",	",	func	:	"enter(',')"		}
		],
		[
			{	name	:	"Equals",				text	:	"==",		func	:	"enter('==')"		},
			{	name	:	"More",					text	:	">",		func	:	"enter('>')"		},
			{	name	:	"Less",					text	:	"<",		func	:	"enter('<')"		},
			{	name	:	"MoreOrEquals",	text	:	">=",		func	:	"enter('>=')"		},
			{	name	:	"LessOrEquals",	text	:	"<=",		func	:	"enter('<=')"		},
			{	name	:	"NotEquals",		text	:	"`=",		func	:	"enter('`=')"		}
		],
		[
			{	name	:	"And",					text	:	"&&",		func	:	"enter('&&')"		},
			{	name	:	"Or",						text	:	"||",		func	:	"enter('||')"		},
			{	name	:	"Not",					text	:	"`",		func	:	"enter('`')"		}
		],
		[
			{	name	:	"Remainder",		text	:	"#",		func	:	"enter('#')",	},
			{	name	:	"Root",					text	:	"√",		func	:	"enter('√')",	},
			{	name	:	"Power",				text	:	"^",		func	:	"enter('^')",	},
			{	name	:	"Factorial",		text	:	"!",		func	:	"enter('!')"	}
		],
		[
			{	name	:	"DivideWithoutRemainder",				text	:	":",		func	:	"enter(':')"	},
			{	name	:	"Divide",				text	:	"/",		func	:	"enter('/')"	},
			{	name	:	"Seven",				text	:	"7",		func	:	"enter('7')"	},
			{	name	:	"Eight",				text	:	"8",		func	:	"enter('8')"	},
			{	name	:	"Nine",					text	:	"9",		func	:	"enter('9')"	}
		],
		[
			{	name	:	"Percent",			text	:	"%",		func	:	"enter('%')"	},
			{	name	:	"Multiply",			text	:	"*",		func	:	"enter('*')"	},
			{	name	:	"Four",					text	:	"4",		func	:	"enter('4')"	},
			{	name	:	"Five",					text	:	"5",		func	:	"enter('5')"	},
			{	name	:	"Six",					text	:	"6",		func	:	"enter('6')"	}
		],
		[
			{	name	:	"BitAnd",				text	:	"&",		func	:	"enter('&')",	disabled	:	true	},
			{	name	:	"Plus",					text	:	"+",		func	:	"enter('+')"	},
			{	name	:	"One",					text	:	"1",		func	:	"enter('1')"	},
			{	name	:	"Two",					text	:	"2",		func	:	"enter('2')"	},
			{	name	:	"Three",				text	:	"3",		func	:	"enter('3')"	}
		],
		[
			{	name	:	"BitOr",				text	:	"|",		func	:	"enter('|')",	disabled	:	true	},
			{	name	:	"Minus",				text	:	"-",		func	:	"enter('-')"	},
			{	name	:	"Dot",					text	:	".",		func	:	"enter('.')"	},
			{	name	:	"Zero",					text	:	"0",		func	:	"enter('0')"	},
			{	name	:	"Result",				text	:	"=",		func	:	"result()"		}
		]
	]
}
for(var v in props.keyboard.table)
	for(var v2 in props.keyboard.table[v])
	{
		props.keyboard.table[v][v2].does=props.keyboard.table[v][v2].func
		props.keyboard.table[v][v2].func=new Function("return "+props.keyboard.table[v][v2].func)
	}
//	Messages	value-by-key	for	different	languages
props.msgs = {
	"en"	:	{
		"add"	:	"Add",
		"move"	:	"Move",
		"graphicByFunction"	:	"Graphic by function",
		"unitConverter"	:	"Unit converter",
		"calculator"	:	"Calculator",
		"variables"	:	"Variables",
		"byPreviousActionsDecompose"	:	"By previous action decompose"
	},
	"ru"	:	{
		"add"	:	"Добавить",
		"move"	:	"Двигать",
		"graphicByFunction"	:	"График по функции",
		"unitConverter"	:	"Преобразователь единиц",
		"calculator"	:	"Калькулятор",
		"variables"	:	"Переменные",
		"byPreviousActionsDecompose"	:	"Разложение по предыдущим действиям"
	}
}
//Formulas	of	unit	finding
props.formulas = {
	"l,L"	:	[],
	"m,M"	:	[],
	"t,T"	:	[],
	"I,I"	:	[],
	"T,Θ"	:	[],
	"I`v,J":[],
	"n,N"	:	[],

	"∠"		:	[	"l*l^-1=1",	"[м·м^−1	=	1]"],
	"Ω"		:	[	"l^2*l^-2=1",	"[м^2·м^−2	=	1]"],
	"ν"		:	[	"t^-1",	"[с^−1]"],
	"F"		:	[	"m*l*t^-2",	"[кг·м·c^−2]"],
	"E"		:	[	"F*s",],
	"EW"	:	[	"m*l^2*t^-2",	"[Н·м	=	кг·м^2·c^−2]"],
	"NPW"	:	[	"E/t",	"m*l^2*t^-3",	"[Дж/с	=	кг·м^2·c^−3]"],
	"p"		:	[	"m*l^-1*t^-2",	"[Н/м2	=	кг·м^−1·с^−2]"],
	"φ`v"	:	[	"I`v*Ω",	"[кд·ср]"],
	"E`v"	:	[	"I`v*Ω/l^2",	"[лм/м^2	=	кд·ср/м^2]"],
	"q"		:	[	"I*t",	"[А·с]"],
	"U"		:	[	"m*l^2*t^-3*I^-1",	"[Дж/Кл	=	кг·м^2·с^−3·А^−1]"],
	"R"		:	[	"m*l^2*t^-3*I^-2",	"[В/А	=	кг·м^2·с^−3·А^−2]"],
	"C"		:	[	"t^4*I^2*m^-1*l^-2",	"[Кл/В	=	с^4·А^2·кг^−1·м^−2]"],
	"φ"		:	[	"m*l^2*t^-2*I^-1",	"[кг·м^2·с^−2·А^−1]"],
	"B"		:	[	"m*t^-2*I^-1",	"[Вб/м^2	=	кг·с^−2·А^−1]"],
	"L"		:	[	"m*l^2*t^-2*I^-2",	"[кг·м^2·с^−2·А^−2]"],
	"G"		:	[	"t^3*I^2*m^-1*l^-2",	"[Ом^−1	=	с^3·А^2·кг^−1·м^−2]"],
	""		:	[	"t^-1",	"[с^−1]"],
	""		:	[	"l^2/t^2",	"[Дж/кг	=	м^2/c^2]"],
	"E"		:	[	"l^2/t^2",	"[Дж/кг	=	м^2/c^2]"],
	"W"		:	[	"n/t",	"[моль/с]"],

	"S"		:	[	"l^2"],
	"V"		:	[	"l^3"],

	"ρ"		:	[	"m/V",	"m/l^3"],
	"v"		:	[	"l/t",	"l/t"],
	"a"		:	[	"v/t",	"l/t^2"],
}
//Units
props.unitPrefixes = {
	"и+"	:	{	long	:	"Иокто+",	func:0.001*0.001*0.001*0.001*0.001*0.001*0.001*0.001},
	"з+"	:	{	long	:	"Зепто+",	func:0.001*0.001*0.001*0.001*0.001*0.001*0.001},
	"а+"	:	{	long	:	"Атто+",	func:0.001*0.001*0.001*0.001*0.001*0.001},
	"ф+"	:	{	long	:	"Фемто+",	func:0.001*0.001*0.001*0.001*0.001},
	"п+"	:	{	long	:	"Пико+",	func:0.001*0.001*0.001*0.001},
	"н+"	:	{	long	:	"Нано+",	func:0.001*0.001*0.001},
	"мк+"	:	{	long	:	"Микро+",	func:0.001*0.001},
	"м+"	:	{	long	:	"Милли+",	func:0.001},
	"с+"	:	{	long	:	"Санти+",	func:0.01},
	"д+"	:	{	long	:	"Деци+",	func:0.1},
	"+"		:	{	long	:	"+",			func:1},
	"да+"	:	{	long	:	"Дека+",	func:10},
	"г+"	:	{	long	:	"Гекто+",	func:100},
	"к+"	:	{	long	:	"Кило+",	func:1000},
	"М+"	:	{	long	:	"Мега+",	func:1000*1000},
	"Г+"	:	{	long	:	"Гига+",	func:1000*1000*1000},
	"Т+"	:	{	long	:	"Тера+",	func:1000*1000*1000*1000},
	"П+"	:	{	long	:	"Пета+",	func:1000*1000*1000*1000*1000},
	"Э+"	:	{	long	:	"Экса+",	func:1000*1000*1000*1000*1000*1000},
	"З+"	:	{	long	:	"Зетта+",	func:1000*1000*1000*1000*1000*1000*1000},
	"И+"	:	{	long	:	"Иотта+",	func:1000*1000*1000*1000*1000*1000*1000*1000},
	"Ки+"	:	{	long	:	"Киби+",	func:1024},
	"Ми+"	:	{	long	:	"Меби+",	func:1024*1024},
	"Ги+"	:	{	long	:	"Гиби+",	func:1024*1024*1024},
	"Ти+"	:	{	long	:	"Теби+",	func:1024*1024*1024*1024},
	"Пи+"	:	{	long	:	"Пеби+",	func:1024*1024*1024*1024*1024},
	"Эи+"	:	{	long	:	"Эксби+",	func:1024*1024*1024*1024*1024*1024},
	"Зи+"	:	{	long	:	"Зеби+",	func:1024*1024*1024*1024*1024*1024*1024},
	"Ии+"	:	{	long	:	"Иоби+",	func:1024*1024*1024*1024*1024*1024*1024*1024}
}
function fromGeneral(short,	long,	func){
	var	clone = makeClone(props.unitPrefixes)
	var	result = {}
	for(var	v	in	clone)
		result[v.replace("+",short)]	=	{	long	:	clone[v].long.replace("+",long),	func	:	clone[v].func*func}
	return result
}
function fromAction(first,	second,	char,	action){
	var	result = {}
	for(var	v	in	first)
		for(var	v2	in	second)
			if(first[v].long||first[v].func)
				if(second[v2].long||second[v2].func)
					result[v+char+v2]={long:first[v].long+char+second[v2].long,func:action(first[v].func,second[v2].func)}
				else
				{
					result[v+char+v2]={}
					for(var	v2v2	in	second[v2])
						result[v+char+v2][vv+char+v2]={long:first[v].long+char+second[v2].long,func:action(first[v].func,second[v2].func)}
				}
			else
			{
				result[v+char+v2]={}
				for(var	vv	in	first[v])
					if(second[v2].long||second[v2].func)
						result[v+char+v2][v+char+v2v2]={long:first[v].long+char+second[v2].long,func:action(first[v].func,second[v2].func)}
					else
					{
						result[v+char+v2][vv+char+v2]={}
						for(var	v2v2	in	second[v2])
							result[v+char+v2][vv+char+v2][vv+char+v2v2]={long:first[v].long+char+second[v2].long,func:action(first[v].func,second[v2].func)}
					}
			}
	return result
}
function fromPower(first,	power){
	var result = {}
	for(var	v	in	first)
		if(first[v].long||first[v].func)
			result[v+"^"+power]={long:first[v].long+"^"+power,func:Math.pow(first[v].func,power)}
		else
		{
			result[v+"^"+power]={}
			for(var	vv	in	first[v])
				result[v+"^"+power][vv+"^"+power]={long:first[v][vv].long+"^"+power,func:Math.pow(first[v][vv].func,power)}
		}
	return result
}
props.units = {
	"m,Масса"	:	{
		"КилоГраммы(осн СИ)"	:	fromGeneral("г",	"Граммы",0.001),
		"ц"				:	{	long	:	"Центнеры",				func	:	100},
		"т"				:	{	long	:	"Тонны",					func	:	1000},
		"-кт"			:	{	long	:	"Короткие Тонны",	func	:	907.18474},
		"-дт"			:	{	long	:	"Длинные Тонны",	func	:	1016.0469088},
		"-карат"	:	{	long	:	"Караты",					func	:	0.0002},
		"-стоун"	:	{	long	:	"Стоуны",					func	:	6.35029318},
		"-унция"	:	{	long	:	"Унции",					func	:	0.028349523125},
		"-фунт"		:	{	long	:	"Фунты",					func	:	0.45359237}
		},
	"t,Время"	:	{
		"Секунды(осн СИ)"		:	fromGeneral("с",	"Секунды",1),
		"-мин"		:	{	long	:	"Минуты",											func	:	60},
		"-ч"			:	{	long	:	"Часы",												func	:	60*60},
		"-д"			:	{	long	:	"Дни, Половины суток",				func	:	60*60*12},
		"-сут"		:	{	long	:	"Сутки",											func	:	60*60*12*2},
		"-нед"		:	{	long	:	"Недели",											func	:	60*60*12*2*7},
		"-мес31"	:	{	long	:	"Месяцы, 31 день",						func	:	60*60*12*2*31},
		"-мес30"	:	{	long	:	"Месяцы, 30 дней",						func	:	60*60*12*2*30},
		"-мес12"	:	{	long	:	"Месяцы, 1/12 года",					func	:	60*60*12*2*365.25/12},
		"-годср"	:	{	long	:	"Года, 365.25 дней",					func	:	60*60*12*2*365.25},
		"-год"		:	{	long	:	"Года, 365 дней",						func	:	60*60*12*2*365},
		"-год366"	:	{	long	:	"Висакосные года, 366 дней",	func	:	60*60*12*2*366},
		"-век"		:	{	long	:	"Века",												func	:	60*60*12*2*365.25*100},
		"-тыс"		:	{	long	:	"Тысячелетие",								func	:	60*60*12*2*365.25*100},
	},
	"s,Расстояние"	:	{
		"Метры(осн СИ)"	:	fromGeneral("м",	"Метры",1),
		"-Ангстрем"	:	{	long	:	"Ангстремы",			func	:	0.0000000001},
		"-Ладонь"		:	{	long	:	"Ладони",					func	:	0.1016},
		"-Линк"			:	{	long	:	"Линки",					func	:	0.201168},
		"-Сажень"		:	{	long	:	"Сажени",					func	:	1},
		"-Дюйм"			:	{	long	:	"Дюймы",					func	:	0.0254},
		"-Ярд"			:	{	long	:	"Ярды",						func	:	0.9144},
		"-Фут"			:	{	long	:	"Футы",						func	:	0.3048},
		"-Микрон"		:	{	long	:	"Микроны",				func	:	0.000001},
		"-Миля"			:	{	long	:	"Мили",						func	:	1609.344},
		"-Мормиля"	:	{	long	:	"Морские мили",	func	:	1852},
		"-Мерцепь"	:	{	long	:	"Мерные цепи",		func	:	20.1168},
		"-Морсаж"		:	{	long	:	"Моские сажени",	func	:	1.8288},
		"-Пика"			:	{	long	:	"Пики",						func	:	0.0042175176},
		"-Род"			:	{	long	:	"Роды",						func	:	5.0292},
		"-Пядь"			:	{	long	:	"Пяди",						func	:	0.2286},
		"c/год"			:	{	long	:	"Световые года",	func	:	299792458*60*60*12*2*365.25},
		"ае"				:	{	long	:	"Астрономическая	единица",	func	:	149597870700},
		"пк"				:	{	long	:	"Парсеки",				func	:	3.2616*299792458*60*60*12*2*365.25}
	},
	"I,Сила тока"	:	{
		"Амперы(осн СИ)"	:	fromGeneral("А",	"Амперы",	1)
	},
	"n,Количество вещества"	:	{
		"Моли(осн СИ)"	:	fromGeneral("моль",	"Моли",	1),
		"Na"	:	{	long	:	"Постоянная Авагадро",	func	:	6.02214085775e+23}
	},
	"I`v,Сила света"	:	{
		"Канделы(осн СИ)"	:	fromGeneral("кд",	"Канделы",1)
	},
	"T,Температура"	:	{
		"Кельвины(осн СИ)"	:	fromGeneral("К",	"Кельвины",	1),
		"°C"	:	{	long	:	"Градусы Цельсия",					func	:	function(a)	{	return a-273.15},	anti	:	function(a){return	a+273.15}},
		"°F"	:	{	long	:	"Градусы Фаренгейта",			func	:	function(a)	{	return 9/5*a+32},	anti	:	function(a){return	5/9*a-32}},
		"°R"	:	{	long	:	"Градусы Реомюра",					func	:	function(a)	{	return (a-273.15)*0.8},	anti	:	0},
		"°Rø"	:	{	long	:	"Градусы Рёмера",					func	:	function(a)	{	return 0},	anti	:	0},
		"°Ra"	:	{	long	:	"Градусы Ранкина",					func	:	function(a)	{	return 0},	anti	:	0},
		"°D"	:	{	long	:	"Градусы Делиля",					func	:	function(a)	{	return 0},	anti	:	0},
		"°H"	:	{	long	:	"Градусы Гука",						func	:	function(a)	{	return 0},	anti	:	0},
		"°Dа"	:	{	long	:	"Градусы Дальтона",				func	:	function(a)	{	return 0},	anti	:	0},
		"°N"	:	{	long	:	"Градусы Ньютона",					func	:	function(a)	{	return 0},	anti	:	0},
		"°L"	:	{	long	:	"Градусы Лейдена",					func	:	function(a)	{	return 0},	anti	:	0},
		"TP"	:	{	long	:	"Планковская	температура",	func	:	function(a)	{	return 0},	anti	:	0}
	},
	"∠,Плоский Угол"	:	{
		"Радианы(доп СИ)"	:	fromGeneral("рад",	"Радианы",	1),
		"°О"	:	{	long	:	"Обороты",	func	:	2/3.14159265358979323846264338327950288419716939937510},
		"°У"	:	{	long	:	"Градусы",	func	:	2/3.14159265358979323846264338327950288419716939937510/360},
		"'"		:	{	long	:	"Минуты",		func	:	2/3.14159265358979323846264338327950288419716939937510/360/60},
		"\""	:	{	long	:	"Секунды",	func	:	2/3.14159265358979323846264338327950288419716939937510/360/60/60},
		"град":	{	long	:	"Грады",		func	:	2/3.14159265358979323846264338327950288419716939937510/360*0.9}
	},
	"Ω,Телесный Угол"	:	{
		"Герцы(доп СИ)"	:	fromGeneral("ср",	"Стерадианы",1)
	},
	"ν,Частота"	:	{
		"Герцы(доп СИ)"	:	fromGeneral("Гц",	"Герцы",1)
	},
	"F,Сила"	:	{
		"Ньютоны(доп СИ)"	:	fromGeneral("Н",	"Ньютоны",1)
	},
	"EW,Энергия"	:	{
		"Джоули(доп СИ)"	:	fromGeneral("Дж",	"Джоули",1),
		"Калории"		:	fromGeneral("кал",		"Калории",		4.1868),
		"Калории15"	:	fromGeneral("кал15",	"Калории15",	4.1855),
		"КалорииТХ"	:	fromGeneral("калТХ",	"КалорииТХ",	4.1840),
		"-брте"		:	{	long	:	"Британские тепловые единицы",				func	:	1055.056},
		"-тт"			:	{	long	:	"Футо-фунты",													func	:	1.3558179483314},
		"-тт"			:	{	long	:	"Електрон-вольты",										func	:	1.60217653e-19},
		"-тт"			:	{	long	:	"Эквиваленты барреля	нефти",					func	:	0},
		"-тт"			:	{	long	:	"Килотонны тротилового эквиваленты",	func	:	0}
	},
	"NPW,Мощность"	:	{
		"Ватты(доп СИ)"	:	fromGeneral("Вт",	"Ватты",1),
		"-тт"	:	{	long	:	"Британские тепловые единицы/Минуты",	func	:	17.58426666666667},
		"-тт"	:	{	long	:	"Лошадиные силы",			func	:	745.6998715822702},
		"-тт"	:	{	long	:	"Футо-фунты/Минуты",	func	:	0.0225969658055233}
	},
	"p,Давление"	:	{
		"Паскали(доп СИ)"	:	fromGeneral("Па",	"Паскали",1),
		"-атм"					:	{	long	:	"Атмосферы",			func	:	101325},
		"-бар"					:	{	long	:	"Бары",						func	:	100000},
		"-ммртст"				:	{	long	:	"МиллиМетры Ртутного Столба",	func	:	133.3},
		"-фунт/дюйм^2"	:	{	long	:	"Фунты/Дюймы^2",	func	:	6894.757}
	},
	"φ`v,Световой поток"	:	{
		"Ньютоны(доп СИ)"	:	fromGeneral("лм",	"Люмены",1)
	},
	"E`v,Освещенность"	:	{
		"Ньютоны(доп СИ)"	:	fromGeneral("лк",	"Люксы",1)
	},
	"q,Электрозаряд"	:	{
		"Ньютоны(доп СИ)"	:	fromGeneral("Кл",	"Кулоны",1)
	},
	"U,Напряжение"	:	{
		"Вольты(доп СИ)"	:	fromGeneral("В",	"Вольты",1)
	},
	"R,Сопротивление"	:	{
		"Омы(доп СИ)"	:	fromGeneral("Ом",	"Омы",1)
	},
	"C,Электроемкость"	:	{
		"Фарады(доп СИ)"	:	fromGeneral("Ф",	"Фарады",1)
	},
	"φ,Магнитный поток"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("Вб",	"Веберы",1)
	},
	"B,Магнитная индукция"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("Тл",	"Теслы",1)
	},
	"L,Индуктивность"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("Гн",	"Генри",1)
	},
	"G,Электропроводность"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("См",	"Сименсы",1)
	},
	",Радиоактивность"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("Бк",	"Беккерели",1)
	},
	",Поглощенная радиация"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("Гр",	"Греи",1)
	},
	"E,Эффективная радиация"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("Зв",	"Зиверты",1)
	},
	"W,Активность катализатора"	:	{
		"Сименсы(доп СИ)"	:	fromGeneral("кат",	"Каталы",1)
	},
	"n,Количество"	:	{
		"π"	:	{long	:	"Число Пи",								func	:	3.14159265358979323846264338327950288419716939937510},
		"e"	:	{long	:	"Число Е",									func	:	2.71828182845904523536028747135266249775724709369995},
		"ρ"	:	{long	:	"Пластическое число",				func	:	1.32471795724474602596090885447809734073440405690173},
		"φ"	:	{long	:	"Золотое Сечение",					func	:	1.61803398874989484820458683436563811772030917980576},
		"ψ"	:	{long	:	"Сверхзолотое сечение",			func	:	1.46557123187676802665},
		"-кореньдвух"	:	{	long	:	"Корень двух",	func	:	1.41421356237309504880168872420969807856967187537694},
		"-кореньтрех"	:	{	long	:	"Корень трех",	func	:	1.73205080756887729352744634150587236694280525381038},
		"-кореньпяти"	:	{	long	:	"Корень пяти",	func	:	2.23606797749978969640917366873127623544061835961152}
	},
	"-,Объем информации"	:	{
		"-ст"	:	{	long	:	"Состояния",	func	:	1},
		"-бт"	:	{	long	:	"Биты",	func	:	2},
		"-тт"	:	{	long	:	"Триты",	func	:	3},
		"Нибблы"	:	fromGeneral("Н",	"Нибблы",2*2*2*2),
		"Байты"		:	fromGeneral("Б",	"Байты",2*2*2*2*2*2*2*2),
		"Трайты"	:	fromGeneral("Т",	"Трайты",3*3*3*3*3*3),
	}
}
props.units["S,Площадь"]=Object.assign(fromPower(props.units["s,Расстояние"],2),{
	"а"		:	{	long	:	"Ары",			func:100},
	"га"	:	{	long	:	"ГектАры",	func:10000},
	"-ак"	:	{	long	:	"Акры",			func:4046.86}
})
props.units["V,Объем"]=Object.assign(fromPower(props.units["s,Расстояние"],3),{
	"л"			:	{	long	:	"Литры",	func:0.001},
	"-амжу"	:	{	long	:	"Америнская	жидкая	унция",	func	:	0.0000295735295625},
	"-амк"	:	{	long	:	"Америнская	кварта",				func	:	0.000946352946},
	"-амп"	:	{	long	:	"Америнская	пинта",					func	:	0.000473176473},
	"-амг"	:	{	long	:	"Америнский	галлон",				func	:	0.003785411784},
	"-бржу"	:	{	long	:	"Британская	жидкая	унция",	func	:	0.0000284130625},
	"-брк"	:	{	long	:	"Британская	кварта",				func	:	0.0011365225},
	"-брп"	:	{	long	:	"Британская	пинта",					func	:	0.00056826125},
	"-брг"	:	{	long	:	"Британский	галлон",				func	:	0.00454609}
})

props.units["ρ,Плотность"]=Object.assign(fromAction(props.units["m,Масса"],props.units["V,Объем"],"/",	function(a,b){return	a/b}),{
})
props.units["v,Скорость"]=Object.assign(fromAction(props.units["s,Расстояние"],props.units["t,Время"],"/",	function(a,b){return	a/b}),{
	"c"			:	{	long	:	"Скорости	света",	func	:	299792458},
	"-узел"	:	{	long	:	"Узлы",						func	:	0.5144444444444444},
	"M"			:	{	long	:	"Числа	Маха	(Скорости	звука)",	func	:	340.2933}
})
props.units["a,Ускорение"]=Object.assign(fromAction(props.units["v,Скорость"],props.units["t,Время"],"/",	function(a,b){return	a/b}),{
	"g"			:	{	long	:	"Ускорение	свободного	падения	Земли",	func	:	9.8}
})

props.units["Скорость передачи данных"]=Object.assign(fromAction(props.units["Объем информации"],props.units["t,Время"],"/",	function(a,b){return	a/b}),{
})
props.units["Расход массы"]=Object.assign(fromAction(props.units["m,Масса"],	props.units["t,Время"],"/",	function(a,b){return	a/b}),{
})
props.units["Расход объема"]=Object.assign(fromAction(props.units["V,Объем"],	props.units["t,Время"],"/",	function(a,b){return	a/b}),{
})
props.units["Расход топлива"]=Object.assign(fromAction(props.units["V,Объем"],props.units["s,Расстояние"],"/",	function(a,b){return	a/b}),{
})
