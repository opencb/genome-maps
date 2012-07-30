//genomemaps
(function(){
	var f = [
	         "/bioinfo-js/genome-maps/config/gm-config.json",
	         "/bioinfo-js/genome-maps/config/plugins-config.json",
	         "/bioinfo-js/genome-maps/genome-maps.js",

	         //plugins
	         "/bioinfo-js/genome-maps/plugins/generic-plugin.js",
	         "/bioinfo-js/genome-maps/plugins/expression.js",
	         "/bioinfo-js/genome-maps/plugins/genotype.js",
	         "/bioinfo-js/genome-maps/plugins/my-plugin.js"
	         ];

	for ( var i = 0; i < f.length; i++) {
		var s = document.createElement("script");
		s.setAttribute("type","text/javascript");
		s.setAttribute("src",f[i]);
		document.head.appendChild(s);
	}
})(this);