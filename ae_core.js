// это должно быть в модели
// window.addEventListener('error', function(e) {
// 	var err_text;
// 	if (e.error) {
// 		err_text = e.message+"\n"+e.error.stack;
// 	} else
// 	if (e.message || e.filename) {
// 		err_text = e.message+" in "+e.filename+":"+e.lineno+":"+e.colno;
// 	} else {
// 		err_text = "unknown error happened ("+(!!e.error)+")"
// 	}
// 	Model.error(err_text)
// });

// function download(string, fileName, mimeType) {
// 	//string, fileName, mimeType
// 	if (navigator.msSaveOrOpenBlob) {
// 		// ИЕ10+ и Edge (в последнем должен работать a[download], но не работает)
// 		navigator.msSaveOrOpenBlob(new Blob([string], {type: mimeType}), fileName)
// 	} else if (/Version\/[\d\.]+.*Safari/.test(navigator.userAgent)) {
// 		// Safari
// 		location.href = 'data:'+ mimeType +';charset=utf-8,'+ encodeURIComponent(string) //URL.createObjectURL(blob)
// 	} else {
// 		// FF, Chrome, Opera
// 		var a = document.createElement('a')
// 		a.href = 'data:'+ mimeType +';charset=utf-8,'+ encodeURIComponent(string)
// 		a.target = '_blank'
// 		//a.download = fileName
// 		a.setAttribute('download', fileName)
// 		document.body.appendChild(a)
// 		a.click()
// 		setTimeout(function(){ a.remove() }, 100)
// 	}
// 	//window.open('data:attachment/csv;charset=utf-8,' + encodeURIComponent(string))
// 	//https://github.com/eligrey/FileSaver.js/blob/master/FileSaver.js
// 	//https://github.com/rndme/download/blob/master/download.js
// }

// //////////////////////////////////////////////////////////////////
$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)
Element.prototype.$ = Element.prototype.querySelector
Element.prototype.$$ = Element.prototype.querySelectorAll
Element.prototype.remove = function() {
	this.parentElement.removeChild(this)
}

Element.prototype.$up = function(selector){
	//selector
	var cur = this
	while(cur){
		if (cur.matches(selector)) return cur
		cur = cur.parentElement
	}
	return false
}
Element.prototype.$$up = function(selector){
	//selector
	var cur = this
	var res = []
	while(cur){
		if (cur.matches(selector)) res.push(cur)
		cur = cur.parentElement
	}
	return res
}
if(!Element.prototype.matches){
	if(!Element.prototype.matchesSelector){
		Element.prototype.matches = function (selector) {
			var el = this
			var matches = (el.document || el.ownerDocument).querySelectorAll(selector),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== elm) {}
			return i > -1;
		}
	} else {
		Element.prototype.matches = Element.prototype.matchesSelector
	}
}

NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.indexOf = Array.prototype.indexOf
Object.defineProperty(NodeList.prototype, 'first', { get: function(){ return this[0] } })
Object.defineProperty(NodeList.prototype, 'last', { get: function(){ return this[this.length-1] } })
createEl = function(params){
	return  document.createElement(params)
}

Object.defineProperty(NodeList.prototype, 'classList', { get: function(){
  return {
    _elems: this,
    add: function(){
      for (var i=0; i<this._elems.length; i++) {
        var l = this._elems[i].classList
        l.add.apply(l, arguments)
      }
    },
    remove: function(){
      for (var i=0; i<this._elems.length; i++) {
        var l = this._elems[i].classList
        l.remove.apply(l, arguments)
      }
    },
    toggle: function(){
      for (var i=0; i<this._elems.length; i++) {
        var l = this._elems[i].classList
        l.toggle.apply(l, arguments)
      }
    }
  }
} })

Element.prototype.highlight = function(delay){
	//delay in ms
	var delay = delay || 700
	var elem = this
	if(!elem.classList.contains('highlighted')){
		elem.classList.add('highlighted')
		setTimeout(function(){
			elem.classList.remove('highlighted')
		}, delay)
	}
}
Node.prototype.insertAfter = function(newNode, referenceNode) {
	//newNode, referenceNode
	return referenceNode.parentNode.insertBefore(
		newNode, referenceNode.nextSibling)
}
function getElemSequenceNumber(elem, params){
	//elem, obj params.
	//params.not - excluded class
	if(!params || !params.not){
		var children = elem.parentNode.children
		for(var i=0; i<children.length; i++) {
			if(children[i] == elem) return i
		}
		return -1
	} else if(params.not){
		var excludeClass = params.not
		var children = elem.parentNode.children
		var minus = 0
		for(var i=0; i<children.length; i++) {
			if(children[i].classList.contains(excludeClass)) minus++
			if(children[i] == elem) return i-minus
		}
		return -1
	}
}
function getScrollbarSize(){
	if(getScrollbarSize.size){
		return {width: getScrollbarSize.size.width, height: getScrollbarSize.size.height}
	}
	var div = document.createElement('div')
	div.style.position = 'absolute'
	div.style.top = '90000px'
	div.style.overflow = 'scroll'
	document.body.appendChild(div)
	var width = div.offsetWidth
	var height = div.offsetHeight
	div.remove()
	getScrollbarSize.size =  {width: width, height: height}
	return {width: width, height: height}
}

function calcPosForDropDown(params, ddWidth, ddHeight, margin){
	//params: ClientRect блока, от которого показываем дропдаун
	// точка - частный случай блока, у которого все углы на одной координате
	var tWidth = document.body.clientWidth
	var tHeight = document.body.clientHeight
	var margin = margin || 0
	var x = 0
	var y = 0
	//если дропдаун можно показать вниз
	if(params.bottom + ddHeight < tHeight){
		//если он влезает по ширине
		if(params.left + ddWidth < tWidth){
			x = params.left
			y = params.bottom
		} else {
			x = params.right - ddWidth
			y = params.bottom
		}
	} else {
		if(params.left + ddWidth < tWidth){
			x = params.left
			y = params.top - ddHeight - margin
		} else {
			x = params.right - ddWidth
			y = params.top - ddHeight - margin
		}
	}
	return {x:x, y:y}
}
// Если элемент null/undefined, создаёт и возвращает тег с именем `tagName`.
// Если элемент не null/undefined, проверяет, что его тег - `tagName` и возвращает этот же элемент.
// Если проверка тега не прошла, гидает ошибку с префиксом `errMsgPrefix`.
// Например:
//   maybe_null_elem = createOrCheckTag(maybe_null_elem, 'div', 'AHTUNG: ')
function createOrCheckTag(elem, tagName, errMsgPrefix){
	//elem, tagName, errMsgPrefix
	if (!elem) return document.createElement(tagName)
	if (elem.tagName != tagName.toUpperCase())
		throw new Error((errMsgPrefix||'')+
						'elememnt must be an <'+ tagName +'> '+
						'but it is <'+ elem.tagName +'>')
	return elem
}
// //////////////////////////////////////////////////////////////////
//ИЕ11 передаёт привет
;(function () {
	try {
		new window.CustomEvent('test', {detail: 0}) // в ИЕ11 это вызовет ошибку
		return
	} catch(e) {}

	function CustomEvent(e, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined }
		var evt = document.createEvent('CustomEvent')
		evt.initCustomEvent(e, params.bubbles, params.cancelable, params.detail)
		return evt
	}

	CustomEvent.prototype = window.Event.prototype
	window.CustomEvent = CustomEvent
})()
function onceOnEvent(name, func){
	//event name, func
	function handler(e){
		this.removeEventListener(name, handler)
		func.call(this, e)
	}
	this.addEventListener(name, handler)
}
window.constructor.prototype.throwEvent = function(name, data, bubbles){
	//event name, obj data, bubbles
	if(!data) data = {}
	var myEvent = new CustomEvent(name, {
		detail: data,
		bubbles: !!bubbles,
	})
	this.dispatchEvent(myEvent)
}
Element.prototype.throwEvent = window.constructor.prototype.throwEvent
initEvents = function(view){
	//veiw obj {events: {...}}
	//пары селектор - функция. Все, что в "custom", вешается на виндоу
	var events = view.events
	var ok = Object.keys(events)
	for(var i = 0; i< ok.length; i++){
		var type = ok[i]
		var inEvents = events[ok[i]]
		var inOk = Object.keys(inEvents)
		try{
			if(type != 'custom'){
				for(var j=0; j<inOk.length; j++){
					$(inOk[j]).addEventListener(type, inEvents[inOk[j]])
				}
			} else {
				for(var j=0; j<inOk.length; j++){
					addEventListener(inOk[j], inEvents[inOk[j]])
				}
			}
		}catch(e){
			console.error('Ошибка развешивания эвентов: '+ inOk[j])
		}
	}
}
removeEvents = function(view){
	//view obj {events: {...}}
	//пары селектор - функция. Все, что в "custom", вешается на виндоу
	var events = view.events
	var ok = Object.keys(events)
	for(var i = 0; i< ok.length; i++){
		var type = ok[i]
		var inEvents = events[ok[i]]
		var inOk = Object.keys(inEvents)
		try{
			if(type != 'custom'){
				for(var j=0; j<inOk.length; j++){
					$(inOk[j]).removeEventListener(type, inEvents[inOk[j]])
				}
			} else {
				for(var j=0; j<inOk.length; j++){
					removeEventListener(inOk[j], inEvents[inOk[j]])
				}
			}
		}catch(e){
			console.error('Ошибка развешивания эвентов: '+ inOk[j])
		}
	}
}
// //////////////////////////////////////////////////////////////////
Object.defineProperty(Array.prototype, 'remove', {
	value: function(elem) {
		var ind = this.indexOf(elem)
		if (ind == -1) return false
		this.splice(ind, 1)
		return true
	}
})
Object.defineProperty(Array.prototype, 'first', { get: function(){ return this[0] } })
Object.defineProperty(Array.prototype, 'last', { get: function(){ return this[this.length-1] } })

;[Int8Array, Int32Array].forEach(function(TypedArr){
	if (!('fill' in TypedArr.prototype)) TypedArr.prototype.fill = function(value) {
		for (var i=0; i<this.length; i++) this[i] = value
	}
})

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.splice = function(index, howManyToDelete, stringToInsert){
	var characterArray = this.split('')
	Array.prototype.splice.apply(characterArray, arguments)
	return (characterArray.join(''))
}
if (!String.prototype.repeat) {
	String.prototype.repeat = function(count) {
		if (count < 0) throw new RangeError('repeat count must be non-negative')
		if (count == Infinity) throw new RangeError('repeat count must be less than infinity')
		count = Math.floor(count)
		if (this.length == 0 || count == 0) return ''
		var str = this
		var res = ''
		for (;;) {
			if ((count & 1) == 1) res += str
			count >>>= 1
			if (count == 0) break
			str += str
		}
		return res
	}
}
// //////////////////////////////////////////////////////////////////
Number.prototype.round = function(base) {
	return Math.round(this/base)*base
}
Number.prototype.ceil = function(base) {
	return Math.ceil(this/base)*base
}
Number.prototype.floor = function(base) {
	return Math.floor(this/base)*base
}
Number.prototype.toLen = function(len) {
	var res = ''+this
	while (res.length < len) res = '0'+ res
	return res
}
Object.defineProperties(Number.prototype, {
	'second':  { get: function(){ return this*Date.second } },
	'seconds': { get: function(){ return this*Date.second } },
	'minute':  { get: function(){ return this*Date.minute } },
	'minutes': { get: function(){ return this*Date.minute } },
	'hour':  { get: function(){ return this*Date.hour } },
	'hours': { get: function(){ return this*Date.hour } },
	'day':  { get: function(){ return this*Date.day } },
	'days': { get: function(){ return this*Date.day } },
	'week':  { get: function(){ return this*Date.week } },
	'weeks': { get: function(){ return this*Date.week } },
})
// //////////////////////////////////////////////////////////////////
Object.clear = function(obj) {
	for (var i in obj) delete obj[i]
}
Object.extend = function(oldObj, data) {
	for (var i in data) oldObj[i] = data[i]
}
function rd(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}
// //////////////////////////////////////////////////////////////////
