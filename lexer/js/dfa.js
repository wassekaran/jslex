/**
 * @author	YuhangGe
 * @email	abraham1@163.com
 * @address	software institute, nanjing university
 * @blog	http://yuhanghome.net
 */

/**
 * dfa.js
 * dfa的数据结构。继承自nfa的相关类，因为具体近乎一样的性质。参考龙书《编译原理》第二版
 */
if( typeof Alice === 'undefined')
	Alice = {};


Alice.DFAState = function(isAccept, name) {
	this.base(isAccept, name);
	this.id = Alice.DFAState.__auto_id__++;
	this.nfaset = [];
	this.tag = false;
	this.input = [];
	this.next = [];
}
Alice.DFAState.__auto_id__ = 0;

Alice.DFAState.prototype.toString = function() {
	var str = "【";
	for(var i = 0; i < this.input.length; i++)
	str += this.input[i] + "->" + this.next[i].id + ";";
	str += '】';
	return this.callBase('toString') + str;
}
Alice.DFAState.prototype.addMove = function(input, next) {
	if(this.input.indexOf(input) < 0) {
		this.input.push(input);
		this.next.push(next);
	} else
		throw "DFA 状态转移一个输入只能有一个输出！(defined)";
}
Alice.DFAState.prototype.getMove = function(input) {
	input = Alice.CharTable.getEqc(input.charCodeAt(0));
	//$.dprint(input);
	if(input===0)
		return null;
	var i = this.input.indexOf(input);
	if(i < 0)
		return null;
	else
		return this.next[i];
}
$.inherit(Alice.DFAState, Alice.State);

Alice.DFA = function(start, finish) {
	this.states = [];
	this.start = start;
}

Alice.DFA.prototype.addState = function(state) {
	if( state instanceof Array)
		for(var i = 0; i < state.length; i++)
		this.states.push(state[i]);
	else
		for(var i = 0; i < arguments.length; i++)
		this.states.push(arguments[i]);
}
Alice.DFA.prototype.toString = function(state) {
	var rtn = "";
	for(var i = 0; i < this.states.length; i++)
	rtn += this.states[i].toString() + " ; ";
	return rtn;
}