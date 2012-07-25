//genomemaps
console.log("genome-maps included.");
include([
         "/bioinfo-js/genome-maps/config/gm-config.json",
         "/bioinfo-js/genome-maps/config/plugins-config.json",
         "/bioinfo-js/genome-maps/genome-maps.js",

         //plugins
         ["/bioinfo-js/genome-maps/plugins/generic-plugin.js",function(){
        	 include(["/bioinfo-js/genome-maps/plugins/expression.js",
        	          "/bioinfo-js/genome-maps/plugins/genotype.js",
        	          "/bioinfo-js/genome-maps/plugins/my-plugin.js"]);

         }]
]);	