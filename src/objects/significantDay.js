import React from 'react';


export const moonCalculator = function(date) {
	date.setHours(18);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  this.date = function(){ return date; };
  var newMoonBase = 1516155420;
  var interval = 2551443;
  var sinceBase = Math.round((date).getTime() / 1000) - newMoonBase;
  var secondsSinceLast = sinceBase % interval;
  var daysSince = Math.floor(secondsSinceLast/60/60/24);
  var moonsSince = (sinceBase - secondsSinceLast) / interval;
  
  this.daysSinceNewMoon = function(){ return daysSince; }
  this.newMoonsSinceBase = function(){ return moonsSince; }
}

export default function(date) {
	var moonCalc = new moonCalculator(date);
  var colors = ['Black','Orange','Green','Purple','Blue'];
  var animals= ['Phoenix','Rabbit','Frog','Spider','Eagle','Fox','Boar',
  'Dragon','Turtle','Lion','Bull','Elephant','Beetle',
  'Bear','Cat','Wolf','Bat','Cricket','Owl','Beaver',
  'Horse','Rooster','Lizard','Snake','Whale',
  'Dog','Monkey','Deer','Dolphin','Tiger','Unicorn'];
  
  this.getLunarColor = function(){
  	return colors[moonCalc.newMoonsSinceBase()%colors.length];
  }
  this.getLunarAnimal = function(){
  	return animals[moonCalc.daysSinceNewMoon()];
  }
}