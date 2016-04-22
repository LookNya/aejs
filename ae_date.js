
Date.prototype.startOfDay = function() {
	var new_date = new Date(this)
	new_date.setHours(0, 0, 0, 0)
	return new_date
}
Date.prototype.startOfWeek = function() {
	var new_date = new Date(this)
	new_date.setHours(0, 0, 0, 0)
	var weekday = new_date.getDay()
	new_date.setDate(new_date.getDate() - (weekday==0 ? 6 : weekday-1))
	return new_date
}
Date.prototype.endOfWeek = function() {
	var new_date = new Date(this)
	new_date.setHours(0, 0, 0, 0)
	var weekday = new_date.getDay()
	new_date.setDate(new_date.getDate() + (weekday==0 ? 0 : 7-weekday))
	return new_date
}
Date.prototype.startOfMonth = function() {
	var new_date = new Date(this)
	new_date.setHours(0, 0, 0, 0)
	new_date.setDate(1)
	return new_date
}
Date.prototype.hms = function() {
	var hours = this.getHours()
	var minutes = "0" + this.getMinutes()
	var seconds = "0" + this.getSeconds()
	return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
Date.prototype.hm = function() {
	var hours = this.getHours()
	var minutes = "0" + this.getMinutes()
	return hours + ':' + minutes.substr(-2)
}
Date.prototype.h = function() {
	var hours = "0" + this.getHours()
	return hours.substr(-2)
}
Date.prototype.m = function() {
	var minutes = "0" + this.getMinutes()
	return minutes.substr(-2)
}
Date.prototype.dmy = function() {
	return this.getDate().toLen(2) +'.'+ (this.getMonth()+1).toLen(2) +'.'+ this.getFullYear()
}
Date.prototype.dm = function() {
	return this.getDate().toLen(2) +'.'+ (this.getMonth()+1).toLen(2)
}
Date.prototype.isDayStart = function() {
	return this.getHours()==0 && this.getMinutes()==0 && this.getSeconds()==0 && this.getMilliseconds()==0
}
Date.prototype.isWeekStart = function() {
	return this.getDay()==1 && this.isDayStart()
}
Date.monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
Date.dayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
Date.daysInMonth = function(year, month){ return new Date(year, month+1, 0).getDate() }
Date.fixDay = function(day) {
	return day==0 ? 6 : day-1
}
Date.fromDMY = function(str) {
	var dmy = str.split(/\D/)
	return new Date(+dmy[2], +dmy[1]-1, +dmy[0])
}
Date.fromYMD8601 = function(str) {
	var ymd = str.split('-')
	return new Date(+ymd[0], +ymd[1]-1, +ymd[2])
}
Date.dtimeDebug = function(dtime) {
	var d = new Date(dtime)
	return d.dmy() +' '+ d.hms() +' ('+ dtime +')'
}
Date.delta = {
	hm: function(timedelta){
		var prefix = ''
		if (timedelta < 0){ timedelta*=-1; prefix='-' }
		return prefix+(timedelta/60/60/1000|0).toLen(2) + ':' + ((timedelta/60/1000|0)%60).toLen(2)
	},
	fromHM: function(str){
		var hm = str.split(':')
		return (+hm[0]).hours + (+hm[1]).minutes
	}
}
Date.second = 1000
Date.minute = Date.second * 60
Date.hour = Date.minute * 60
Date.day = Date.hour * 24
Date.week = Date.day * 7