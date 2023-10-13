let rules = []

let t2 = '\u0301'
let t3 = '\u0300'

let t5 = '\u0302'

let t7 = '\u0304'
let t8 = '\u030D'
let t9 = '\u030B'

//normalize weird characters
{
	rules.push(["ı", "i"])
}

//POJ to TL phase 1
{
	rules.push(["ⁿ", "nn"])
	rules.push(["\u0358", "o"])
}

//to lower case
{
	//consonant
	rules.push(["M", "m"])
	rules.push(["N", "n"])
	rules.push(["P", "p"])
	rules.push(["B", "b"])
	rules.push(["T", "t"])
	rules.push(["K", "k"])
	rules.push(["G", "g"])
	rules.push(["H", "h"])
	rules.push(["J", "j"])
	rules.push(["S", "s"])
	rules.push(["L", "l"])
	rules.push(["C", "c"])
	//vowel
	rules.push(["A", "a"])
	rules.push(["E", "e"])
	rules.push(["I", "i"])
	rules.push(["O", "o"])
	rules.push(["U", "u"])
	//tone 2
	rules.push(["Á", "á"])
	rules.push(["É", "é"])
	rules.push(["Í", "í"])
	rules.push(["Ó", "ó"])
	rules.push(["Ú", "ú"])
	rules.push(["Ḿ", "ḿ"])
	rules.push(["Ń", "ń"])
	//tone 3
	rules.push(["À", "à"])
	rules.push(["È", "è"])
	rules.push(["Ì", "ì"])
	rules.push(["Ò", "ò"])
	rules.push(["Ù", "ù"])
	rules.push(["Ǹ", "ǹ"])
	//tone 5
	rules.push(["Â", "â"])
	rules.push(["Ê", "ê"])
	rules.push(["Î", "î"])
	rules.push(["Ô", "ô"])
	rules.push(["Û", "û"])
	//tone 7
	rules.push(["Ā", "ā"])
	rules.push(["Ē", "ē"])
	rules.push(["Ī", "ī"])
	rules.push(["Ō", "ō"])
	rules.push(["Ū", "ū"])
	//tone 9
	rules.push(["Ő", "ő"])
	rules.push(["Ű", "ű"])
}

//tone to tone num
{
	rules.push(["á", "a2"])
	rules.push(["à", "a3"])
	rules.push(["â", "a5"])
	rules.push(["ā", "a7"])

	rules.push(["é", "e2"])
	rules.push(["è", "e3"])
	rules.push(["ê", "e5"])
	rules.push(["ē", "e7"])

	rules.push(["ó", "o2"])
	rules.push(["ò", "o3"])
	rules.push(["ô", "o5"])
	rules.push(["ō", "o7"])
	rules.push(["ő", "o9"])

	rules.push(["í", "i2"])
	rules.push(["ì", "i3"])
	rules.push(["î", "i5"])
	rules.push(["ī", "i7"])

	rules.push(["ú", "u2"])
	rules.push(["ù", "u3"])
	rules.push(["û", "u5"])
	rules.push(["ū", "u7"])
	rules.push(["ű", "u9"])


	rules.push([t2, "2"])
	rules.push([t3, "3"])
	rules.push([t5, "5"])
	rules.push([t7, "7"])
	rules.push([t8, "8"])
	rules.push([t9, "9"])
}

//move tone num before final
{
	for (var f of ["p", "t", "k", "h"]) {
		rules.push([f + "8", "8" + f])
	}

	for (var f of ["m", "n", "nn", "ng"]) {
		for (var v of "aeiou") {
			for (var t of ["2", "3", "5", "7", "8", "9"]) {
				rules.push([v + f + t, v + t + f])
			}
		}
	}
}

//POJ to TL phase 2 
{
	rules.push(["ch", "ts"])
	rules.push(["oa", "ua"])
	rules.push(["oe", "ue"])
	rules.push(["ek", "ik"])
	rules.push(["eng", "ing"])
	for (var t of ["2", "3", "5", "7", "8", "9"]) {
		rules.push(["o" + t + "a", "ua" + t])
		rules.push(["o" + t + "e", "ue" + t])
		rules.push(["u" + t + "i", "ui" + t])
		rules.push(["e" + t + "k", "i" + t + "k"])
		rules.push(["e" + t + "ng", "i" + t + "ng"])
	}
}

//Tone num to TL tone position
{
	/*
	aiT aTi
	auT aTu
	-skip- iaT iaT
	-skip- ioT ioT
	-skip- iuT iuT
	-skip- uiT uiT
	
	-skip- oaiT oaTi
	-skip- iauT iaTu
	
	ngT nTg
	-skip- mT mT
	
	-skip- uaT uaT
	-skip- ueT ueT
	ooT oTo
	*/
	for (var t of ["2", "3", "5", "7", "8", "9"]) {
		rules.push(["ai" + t, "a" + t + "i"])
		rules.push(["au" + t, "a" + t + "u"])
		rules.push(["ng" + t, "n" + t + "g"])
		rules.push(["oo" + t, "o" + t + "o"])
	}
}

//Tone num to tone character
{
	//tone 2
	rules.push(["a2", "á"])
	rules.push(["e2", "é"])
	rules.push(["i2", "í"])
	rules.push(["o2", "ó"])
	rules.push(["u2", "ú"])
	rules.push(["m2", "ḿ"])
	rules.push(["n2", "ń"])
	//tone 3
	rules.push(["a3", "à"])
	rules.push(["e3", "è"])
	rules.push(["i3", "ì"])
	rules.push(["o3", "ò"])
	rules.push(["u3", "ù"])
	rules.push(["n3", "ǹ"])
	//tone 5
	rules.push(["a5", "â"])
	rules.push(["e5", "ê"])
	rules.push(["i5", "î"])
	rules.push(["o5", "ô"])
	rules.push(["u5", "û"])
	//tone 7
	rules.push(["a7", "ā"])
	rules.push(["e7", "ē"])
	rules.push(["i7", "ī"])
	rules.push(["o7", "ō"])
	rules.push(["u7", "ū"])
	//tone 9
	rules.push(["o9", "ő"])
	rules.push(["u9", "ű"])
}

//tone num to tone combine
{
	rules.push(["1", ""])
	rules.push(["2", t2])
	rules.push(["3", t3])
	rules.push(["4", ""])
	rules.push(["5", t5])
	rules.push(["7", t7])
	rules.push(["8", t8])
	rules.push(["9", t9])
}

function get_yomichan_format() {
	let t = []
	for (var r of rules) {
		t.push(
			{
				"pattern": r[0],
				"ignoreCase": true,
				"replacement": r[1]
			})
	}
	return JSON.stringify(t)
}

function to_TL(s) {
	function replaceAll(string, search, replace) {
		return string.split(search).join(replace);
	}
	for (var r of rules) {
		if (s.includes(r[0])) {
			let news = replaceAll(s, r[0], r[1])
			console.log(s + " (" + r[0] + "->" + r[1] + ") " + news)
			s = news
		}
	}
	return s
}