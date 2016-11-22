String.prototype.replaceAll = function(regexp, replaceValue){
	var result = this;
	while (result.match(regexp)) {
		result = result.replace(regexp, replaceValue);
	}
	return result;
};

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
