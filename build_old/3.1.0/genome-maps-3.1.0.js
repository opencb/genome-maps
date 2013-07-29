/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */


//****   EVENT INTERFACE ****//
/*var Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
};*/

function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

 
Event.prototype = {
    addEventListener : function (listener) {
        return this._listeners.push(listener)-1; //return index of array
    },
    removeEventListener : function (index) {
    	this._listeners.splice(index,1);
    },
    /** Puesto por ralonso para el naranjoma, cambiar en el futuro **/
    attach : function (listener) {
        this._listeners.push(listener);
    },

    notify : function (args) {
        for (var i = 0; i < this._listeners.length; i++) {
            this._listeners[i](this._sender, args);
        }
    }
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

//Element.prototype.addChildSVG = function(elementName, attributes, index){
//	var el = document.createElementNS('http://www.w3.org/2000/svg', elementName);
//	for ( var key in attributes){
//		el.setAttribute(key, attributes[key]);
//	}
//	
//	// insert child at requested index, or as last child if index is too high or no index is specified
//    if ( null == index ) {
//      this.appendChild( el );
//    }
//    else {
//      var targetIndex = index + 1;
//      if ( 0 == index ) {
//        targetIndex = 0;
//      }
//      var targetEl = this.childNodes[ targetIndex ];
//      if ( targetEl ) {
//        this.insertBefore( el, targetEl ); 
//      }
//      else {
//        this.appendChild( el );
//      }
//    }
//    return el;
//};
//Element.prototype.initSVG = function(attributes){
//	return this.addChildSVG("svg", attributes);
//};

var SVG = {
	
	create : function (elementName, attributes){
		var el = document.createElementNS('http://www.w3.org/2000/svg', elementName);
		for ( var key in attributes){
			el.setAttribute(key, attributes[key]);
		}
		return el;
	},

	addChild : function (parent, elementName, attributes, index){
		var el = document.createElementNS('http://www.w3.org/2000/svg', elementName);
		for ( var key in attributes){
			el.setAttribute(key, attributes[key]);
		}
		return this._insert(parent, el, index);
	},
	
	addChildImage : function (parent, attributes, index){
		var el = document.createElementNS('http://www.w3.org/2000/svg', "image");
		for ( var key in attributes){
			if(key == "xlink:href"){
				el.setAttributeNS('http://www.w3.org/1999/xlink','href',attributes[key]);
			}
			el.setAttribute(key, attributes[key]);
		}
		return this._insert(parent, el, index);
	},
	
	_insert : function (parent, el, index){
		// insert child at requested index, or as last child if index is too high or no index is specified
	    if ( null == index ) {
	    	parent.appendChild( el );
	    }
	    else {
	      var targetIndex = index + 1;
	      if ( 0 == index ) {
	        targetIndex = 0;
	      }
	      var targetEl = parent.childNodes[ targetIndex ];
	      if ( targetEl ) {
	    	  parent.insertBefore( el, targetEl ); 
	      }
	      else {
	    	  parent.appendChild( el );
	      }
	    }
	    return el;
	},

	init : function (parent, attributes){
		return this.addChild(parent, "svg", attributes);
	}
};

//createSVG = function(elementName, attributes){
//	var el = document.createElementNS('http://www.w3.org/2000/svg', elementName);
//	for ( var key in attributes){
//		el.setAttribute(key, attributes[key]);
//	}
//	return el;
//};



//var SVG =
//{
//		svgns : 'http://www.w3.org/2000/svg',
//		xlinkns : "http://www.w3.org/1999/xlink",
//
////	createSVGCanvas: function(parentNode, attributes)
////	{
//////		attributes['xmlns'] = SVG.svgns;
//////		attributes['xmlns:xlink'] = SVG.xlinkns;
//////		attributes.push( ['xmlns', SVG.svgns], ['xmlns:xlink', 'http://www.w3.org/1999/xlink']);
////		var svg = document.createElementNS(SVG.svgns, "svg");
////		
////		for ( var key in attributes){
////			svg.setAttribute(key, attributes[key]);
////		}
////		
////		parentNode.appendChild(svg);
////		return svg;
////	}, 
//	
//	//Shape types : rect, circle, ellipse, line, polyline, polygon , path
//	createElement : function (svgNode, shapeName, attributes) {
//		try{
//			if(attributes.width < 0){
//				console.log("BIOINFO Warn: on SVG.createRectangle: width is negative, will be set to 0");
//				attributes.width=0;
//			}
//			if(attributes.height < 0){
//				console.log("BIOINFO Warn: on SVG.createRectangle: height is negative, will be set to 0");
//				attributes.height=0;
//			}
//			
//			var shape = document.createElementNS('http://www.w3.org/2000/svg', shapeName);
//			for ( var key in attributes){
//				shape.setAttribute(key, attributes[key]);
//			}
//			svgNode.appendChild(shape);
//		}
//		catch(e){
//			console.log("-------------------- ");
//			console.log("Error on drawRectangle " + e);
//			console.log(attributes);
//			console.log("-------------------- ");
//		}
//		return shape;
//	}
//};
//
//
//
//var CanvasToSVG = {
//		
//	convert: function(sourceCanvas, targetSVG, x, y, id, attributes) {
//		
//		var img = this._convert(sourceCanvas, targetSVG, x, y, id);
//		
//		for (var i=0; i< attributes.length; i++)
//		{
//			img.setAttribute(attributes[i][0], attributes[i][1]);
//		}
//	},
//	
//	_convert: function(sourceCanvas, targetSVG, x, y, id) {
//		var svgNS = "http://www.w3.org/2000/svg";
//		var xlinkNS = "http://www.w3.org/1999/xlink";
//		// get base64 encoded png from Canvas
//		var image = sourceCanvas.toDataURL();
//
//		// must be careful with the namespaces
//		var svgimg = document.createElementNS(svgNS, "image");
//
//		svgimg.setAttribute('id', id);
//	
//		//svgimg.setAttribute('class', class);
//		//svgimg.setAttribute('xlink:href', image);
//		svgimg.setAttributeNS(xlinkNS, 'xlink:href', image);
//		
//
//		svgimg.setAttribute('x', x ? x : 0);
//		svgimg.setAttribute('y', y ? y : 0);
//		svgimg.setAttribute('width', sourceCanvas.width);
//		svgimg.setAttribute('height', sourceCanvas.height);
//		//svgimg.setAttribute('cursor', 'pointer');
//		svgimg.imageData = image;
//	
//		targetSVG.appendChild(svgimg);
//		return svgimg;
//	},
//	
//	importSVG: function(sourceSVG, targetCanvas) {
//	    svg_xml = sourceSVG;//(new XMLSerializer()).serializeToString(sourceSVG);
//	    var ctx = targetCanvas.getContext('2d');
//
//	    var img = new Image();
//	    img.src = "data:image/svg+xml;base64," + btoa(svg_xml);
////	    img.onload = function() {
//	        ctx.drawImage(img, 0, 0);
////	    };
//	}
//	
//};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

/*

Normalizacion de datos para dibujar colores
Issues:
		No sé como debería llamarse esta libreria
		No sé si ya existe una funciçon en javascript que lo haga


*/


var Normalizer = new function()
{
   this.normalizeArray = function (arrayData)
   {
	   
	   return this.standardizeArray(this.normal(arrayData));
	   
//	  var result = this._getMaxAndMin(arrayData);
//	  var min =result[0];
//	  var max = result[1];
//	
//
//	  //los hacemos todos positivos
//	  for (var i = 0; i< arrayData.length; i++)
//	  {
//		 arrayData[i]= Math.abs(min) + parseFloat(arrayData[i]);
//	  }
//	 
//	  var result = this._getMaxAndMin(arrayData);
//	  var min =result[0];
//	  var max = result[1];
//	  
//	  
//	  var resultArray = new Array();
//	  for (var i = 0; i< arrayData.length; i++)
//	  {
//		  resultArray.push(arrayData[i]*1/max);
//	  }
//	  return resultArray;
   };
   
   this.normal = function(arrayData){
		var mean = this._getMean(arrayData);
		var deviation = this._getStdDeviation(arrayData);
		var result = this._getMaxAndMin(arrayData);
		var min = result[0];
		var max = result[1];
		
		var resultArray = new Array();
	    for (var i = 0; i< arrayData.length; i++) {
	    	if (deviation!=0){
	    		resultArray.push((arrayData[i]-mean)/deviation);
	    	}else{
	    		resultArray.push(arrayData[i]);
	    	}
	    }
	    return resultArray;
   };

   this.standardizeArray = function(arrayData)
   {
		var result = this._getMaxAndMin(arrayData);
		var min = result[0];
		var max = result[1];
		
		var offset = ( min <= 0 ) ? Math.abs(min) : (-1 * min);
		var resultArray = new Array();
	    for (var i = 0; i< arrayData.length; i++) {
	    	if(max + offset!=0){
	    		resultArray.push((arrayData[i] + offset) / (max + offset));
	    	}else{
	    		resultArray.push(arrayData[i]+offset);
	    	}
	    }
	    return resultArray;
   };


   this._getMean = function(arrayData) {
		var sum = 0;
		for (var i = 0; i< arrayData.length; i++) {
			sum = sum + parseFloat(arrayData[i]);
		}
		return sum/arrayData.length;
	};
	
   this._getStdDeviation = function(arrayData) {
	   var mean = this._getMean(arrayData);
	   var acum = 0.0;
	   for(var i=0; i<arrayData.length; i++) {
		   acum += Math.pow(parseFloat(arrayData[i]) - mean, 2);
	   }
	   return Math.sqrt(acum/arrayData.length);
   };

   this._getMaxAndMin = function(arrayData){
	   var min = Number.MAX_VALUE;
	   var max = Number.MIN_VALUE;
	   
	   for (var i = 0; i< arrayData.length; i++){
		   if (arrayData[i] < min) min =  parseFloat(arrayData[i]);
		   
		   if (arrayData[i] > max) max =  parseFloat(arrayData[i]);
	   }
	   
	   return [min, max];
   };
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

var Colors = new function()
{
   this.hashColor = [];
   this.getColorByScoreArrayValue = function (arrayScore)
   {
	   var array = new Array();
	   
	   for (var i = 0; i< arrayScore.length; i++)
	   {
		
		   var color = this.getColorByScoreValue(arrayScore[i]);
		   array.push( color);
		
	   }
	   return array;  
   };
   
   this.getHexStringByScoreArrayValue = function (arrayScore)
   {
	   var arrayColor = this.getColorByScoreArrayValue(arrayScore); 
	   var arrayHex = new Array();
	   for (var i = 0; i< arrayColor.length; i++)
	   {
		   arrayHex.push( arrayColor[i].HexString());
	   }
	   return arrayHex;   
   };
  
   this.getColorByScoreValue = function (score)
   {

		var truncate = score.toString().substr(0,4);
		if (this.hashColor[truncate]!=null)
		{
			return this.hashColor[truncate];
		}


		if(isNaN(score)) {
			return Colors.ColorFromRGB(0,0,0);
		}
		var value;
	
		var from, to;
		if(score < 0.5) {
			from = Colors.ColorFromRGB(0,0,255);
			to = Colors.ColorFromRGB(255,255,255);
			value = (score * 2);
		} else {
			from = Colors.ColorFromRGB(255,255,255);
			to = Colors.ColorFromRGB(255,0,0);			
			value = (score * 2) - 1;
		}

		var x = value;
		var y = 1.0 - value;
		var color = Colors.ColorFromRGB(y * from.Red() + x * to.Red(), y * from.Green() + x * to.Green(), y * from.Blue() + x * to.Blue());

		this.hashColor[truncate] = color;

		return color;
	};
	
  this.ColorFromHSV = function(hue, sat, val)
  {
    var color = new Color();
    color.SetHSV(hue,sat,val);
    return color;
  };

  this.ColorFromRGB = function(r, g, b)
  {
    var color = new Color();
    color.SetRGB(r,g,b);
    return color;
  };

  this.ColorFromHex = function(hexStr)
  {
    var color = new Color();
    color.SetHexString(hexStr);
    return color;
  };

  function Color() {
    //Stored as values between 0 and 1
    var red = 0;
    var green = 0;
    var blue = 0;
    
    //Stored as values between 0 and 360
    var hue = 0;
    
    //Strored as values between 0 and 1
    var saturation = 0;
    var value = 0;
     
    this.SetRGB = function(r, g, b)
    {
      red = r/255.0;
      green = g/255.0;
      blue = b/255.0;
      calculateHSV();
    };
    
    this.Red = function() { return Math.round(red*255); };
    
    this.Green = function() { return Math.round(green*255); };
    
    this.Blue = function() { return Math.round(blue*255); };
    
    this.SetHSV = function(h, s, v)
    {
      hue = h;
      saturation = s;
      value = v;
      calculateRGB();
    };
      
    this.Hue = function()
    { return hue; };
      
    this.Saturation = function()
    { return saturation; };
      
    this.Value = function()
    { return value; };
     
    this.SetHexString = function(hexString)
    {
      if(hexString == null || typeof(hexString) != "string")
      {
        this.SetRGB(0,0,0);
        return;
      }
       
      if (hexString.substr(0, 1) == '#')
        hexString = hexString.substr(1);
        
      if(hexString.length != 6)
      {
        this.SetRGB(0,0,0);
        return;
      }
          
      var r = parseInt(hexString.substr(0, 2), 16);
      var g = parseInt(hexString.substr(2, 2), 16);
      var b = parseInt(hexString.substr(4, 2), 16);
      if (isNaN(r) || isNaN(g) || isNaN(b))
      {
        this.SetRGB(0,0,0);
        return;
      }
        
      this.SetRGB(r,g,b);  
    };
      
    this.HexString = function()
    {
    
      var rStr = this.Red().toString(16);
      if (rStr.length == 1)
        rStr = '0' + rStr;
      var gStr = this.Green().toString(16);
      if (gStr.length == 1)
        gStr = '0' + gStr;
      var bStr = this.Blue().toString(16);
      if (bStr.length == 1)
        bStr = '0' + bStr;
      return ('#' + rStr + gStr + bStr).toUpperCase();
    };
    
    this.Complement = function()
    {
      var newHue = (hue >= 180) ? hue - 180 : hue + 180;
      var newVal = (value * (saturation - 1) + 1);
      var newSat = (value*saturation) / newVal;
      var newColor = new Color();
      newColor.SetHSV(newHue, newSat, newVal);
      return newColor; 
    } ;
    
    function calculateHSV()
    {
      var max = Math.max(Math.max(red, green), blue);
      var min = Math.min(Math.min(red, green), blue);
      
      value = max;
      
      saturation = 0;
      if(max != 0)
        saturation = 1 - min/max;
        
      hue = 0;
      if(min == max)
        return;
      
      var delta = (max - min);
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue = hue * 60;
      if(hue < 0)
        hue += 360;
    }
    
    function calculateRGB()
    {
      red = value;
      green = value;
      blue = value;
      
      if(value == 0 || saturation == 0)
        return;
      
      var tHue = (hue / 60);
      var i = Math.floor(tHue);
      var f = tHue - i;
      var p = value * (1 - saturation);
      var q = value * (1 - saturation * f);
      var t = value * (1 - saturation * (1 - f));
      switch(i)
      {
        case 0:
          red = value; green = t;       blue = p;
          break;
        case 1:
          red = q; green = value; blue = p;
          break;
        case 2:
          red = p; green = value; blue = t;
          break;
        case 3:
          red = p; green = q; blue = value;
          break;
        case 4:
          red = t; green = p;   blue = value;
          break;
        default:
          red = value; green = p;       blue = q;
          break;
      }
    }
  }
}();
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

var Utils = {
    //properties
    characters:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",

    //Methods
	formatNumber : function(position){
		return position.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	},
	formatText : function(text, spaceChar){
		text = text.replace(new RegExp(spaceChar, "gi"), " ");
		text = text.charAt(0).toUpperCase() + text.slice(1);
		return text;
	},
    getZoomByRegion : function (width, region){
        return this.getZoomByPixelBase(this.getPixelBaseByRegion(width,region));
    },
//    getRegionByZoom : function (zoom, width, position){
//        var baseWidth = parseInt(width/10);
//        var aux = Math.ceil((baseWidth/2)-1);
//        var pixelBase = this.getPixelBaseByZoom(zoom);
//        var start = Math.floor(position - aux);
//        var end = Math.floor(position + aux);
//        return {start:start,end:end};
//    },
	getPixelBaseByZoom : function (zoom){
		//zoom [0-100] intervals of 5
		zoom = Math.max(0,zoom);
		zoom = Math.min(100,zoom);
		return 10/(Math.pow(2,(20-(zoom/5))));
	},
	getZoomByPixelBase : function (pixelBase){
		//pixelBase [10 - 0];
		pixelBase = Math.max(0,pixelBase);
		pixelBase = Math.min(10,pixelBase);
		return 100-((Math.log(10/pixelBase)/(Math.log(2)))*5);
	},
	getPixelBaseByRegion : function (width, region){
		return width/region.length();
	},
	calculatePixelBaseAndZoomByRegion : function (args){
		var regionLength = this.regionLength(args.region);
		var pixelBase = args.width/regionLength;
		var baseWidth = parseInt(args.width/10);//10 is the max pixelbase at max zoom 100
		
		if(regionLength < baseWidth){//region is too small, start and end must be recalculated for the max allowed zoom
			pixelBase = this.getPixelBaseByZoom(args.zoom);
			var centerPosition = this.centerPosition(args.region);
			var aux = Math.ceil((baseWidth/2)-1);
			args.region.start = Math.floor(centerPosition-aux);
			args.region.end = Math.floor(centerPosition+aux);
			
			//modify the start and end
		}
		return {pixelBase:pixelBase,zoom:this.getZoomByPixelBase(pixelBase)}
	},
	isString : function (s) {
		return typeof(s) === 'string' || s instanceof String;
	},
	parseDate : function(strDate){
		return strDate.substring(0,4)+" "+strDate.substring(4,6)+" "+strDate.substring(6,8)+", "+strDate.substring(8,10)+":"+strDate.substring(10,12)+":"+strDate.substring(12,14);
	},
    genId:function(prefix){
        prefix = prefix || '';
        prefix = prefix.length == 0 ? prefix : prefix+'-';
        return prefix+this.randomString();
    },
    randomString : function(length) {
        length = length || 10;
        var str = "";
        for (var i = 0; i < length; i++) {
            str+= this.characters.charAt(this.getRandomInt(0,this.characters.length-1));
        }
        return str;
    },
    getRandomInt : function(min, max) {
        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
        // Using Math.round() will give you a non-uniform distribution!
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    endsWithIgnoreCase: function(str, test){
        var regex = new RegExp('^.*\\.('+test+')$', 'i');
        return regex.test(str);
    },
    endsWith: function(str, test){
        var regex = new RegExp('^.*\\.('+test+')$');
        return regex.test(str);
    },
    randomColor : function(){
        var color = "";
        for(var i=0; i<6;i++){
            color += ([0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]);
        }
        return "#"+color;
    },
    getSpeciesFromAvailable : function(availableSpecies, speciesCode){
        for(var i = 0; i < availableSpecies.items.length; i++){
            var phylos = availableSpecies.items[i].items;
            for(var j = 0; j < phylos.length; j++){
                var species = phylos[j];
                if(this.getSpeciesCode(species.text)==speciesCode){
                    return species;
                }
            }
        }
    },
    getSpeciesCode: function(speciesName){
        var pair = speciesName.split(" ");
        return (pair[0].charAt(0)+pair[1]).toLowerCase();
    },
	test : function(){
		return this;
	}
};


Utils.images = {
	add:"data:image/gif;base64,R0lGODlhEAAQAIcAAD2GNUKNNkOPOESMO0WNPEmPP0iNQUmPQlOVTFWWTVCZQVeeRV6cVmGeWGSgVWSgV2aiWGejW2WrVWirU2uqWGqsW2yqWm61WG+1WG+1WXS3W3S3XHC4WXK5W3O6XHG+X3asZ3iuaHe8YHi0ZH+yany6ZH28Zn2+Z3m9bn25an25a3+5bUD/QHDBY3nBZHrGa3zDa37BaX7Hb4K1boO1boa3cYi4d4y7doq5eYm+eI2+e5O/f4HMdYbJeobJfIXNeYrCeY/CfYnIf4rPfZW/gozLgY7MhI7Sg5LFgJXAgpfHhZfMhZPNiJjLhpjMh5jMipvBl5vBmJTTipbTiZXUipbUi5fVi5nRi53YkqTOlKbPlqbQlqDZlaDZlqXbm6rUnavUnKbIoKfJoa/fpa/fprPZpbTZpbTaprLbqLPdqbXbqLfaqrTdqrXfrLbdrLjVr7jdr7vcr7rWsbfgr77itr3ktsTcuMXducXowMvmw87pydTrz9fu0tzx2ODy3P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACwALAAAAAAQABAAAAi/AFkIHEiwoME7SWrMwCHH4MAdWfLs0QNnRQiHN+L4qeOlyxg8QCAU3LGmDxYmRqpQOTJHRYSBdpTw4SJFyJ8/P2DIaLNAjEAibsgU8YHiZgURHq4gaSCQBh0rPW5K/cMhxpcCAkmkGcJj6k0OJ8AMEGjjyZQXLSR85dBhiY4EAt9MYOPig4ivFzacEQBlIIgUaJByyIBBQxkLBwo6GKHGiYkSTcxQAODwgYIgW7TkCGDAocAwDAoQQBDFs2mCAQEAOw==",
	del:"data:image/gif;base64,R0lGODlhEAAQAIcAAED/QLpSNL9TOr5WOb5cQL9cQMFNM8RQNMBVPcBZP8xSPNBPPttWS9ddUcJnTMRkTMdrVM1gUc5iVMxmVclrVs1oWNZgVNZuZNtpZdxraN5ratxuadRxZd14c955dOZWTOZYTOZZTulZTelbT+ZWUOZaUuddWepcUOxfVOBlXO5mUuljW+pmXO5qXvBkVvNzXeNrYeNuY+FvcOJwZuJ7deR4ceJ5eeN4eeJ/feN/fOl7cOh6del/ePJ3Y/N5Y+qDfe6Efe+Gfu6KdfaCaPaEbPCFcPCDe/CMd/GOeviGcPiMdvCRf/eRfveTfvmSfvqTf/iUf9ymltynl+6Mge2Tju6Sj/SOgfqah/qdi/GclvGdluGpnvSgnvSinvWjn/qjkfupnPqrneGroOqwrOuzr/Ono/WmoferofarovWsofWvpfKtqvivpPS0qvi2qPm5r/q6rvC1tfC2tvjDvvzHuvnLxPnTzPzUzf3b1P3c2P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAAALAAAAAAQABAAAAi6AAEIHEiwoEE5ODRk8EDG4EAbVObYqdNmxgWHMtbkgfMFCxg6OiQUvFEGz5UlSKA4UeImRoWBcX7cwdJECJGbRHywWSBGYA41YY6gGEq0hxUeFARuePOkiJ6nUEW00IJAIIYzSYZAjcoiywCBHaYweSGirNkRRmg8EDiGARoXKsyKAFHCy4EoAznASIPihIgQH0h0sVCgYIQUZoKsMAGES4MADico2FGlSg0DBBwK3AIhgQAHUjSLJhgQADs=",
	enable:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n7MVMEiN64AsPD8/n83uucQDi/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+bSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU/rH5HW3PLsEwUYy+YCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG+UAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==",
	warning:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpVNLSJQBEP7+h6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma+DGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e/1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9/F8M4s8baid764Xi0Ilfp5voorpJfn2wwx/r3l77TwZUvR+qajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm+uTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV+YMkvjRsydC1U+lhwZsWXgHb+oWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl+981Jy1Fw6Gu0ObTtnU+cgs28AKgDiy+Awpj5OACBAhZ/qh2HOo6i+NeA73jUAML4/qWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK/OXA3/uAEUDp3rNIDQ1ctSk6kHh1/jRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv/ApRMY9mnuVMvAAAAAElFTkSuQmCC",
	edit:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB80lEQVR42o2T30tTURzArb8ioiAI6kHoZeF7CGE/IISCUDNCqAeL3rIWPfSwByskYUEJIhSChBhJFAiNqMVYPqRuc4tcW3NLt3C7u3d3d3c/+nS+0GRK0134cC6c8/ncc+7ltgFt6jqgcCg6duGQYq84deoBR6lU0iqVSq1arfI/1Dxut3u0Htke6BC5UChgmuYm+XyeXC5HOp1GIsnQNJHJi3x/7WJh/CSLT9r7Rd4jAVlgWRa2bSOjYBgGmqaRyWQwkq9Y8wyhLb0BI0VuaRrfo671xoDIwmakWCyi6zrr36bILt/HXp1l7cNDioEZqnEvgYmr1paAOgYy1u/l3NrqHNngPWpFL8XodTa+3CD8YoCvz/o078i5o1sC29FT78kG7lCzfJgrl7ESvejLThLPuxk8fbhP3KaBVFCdeX7on9yP9bOHfPAu0bEzmKkg4jQNpEKzhOduqW1/xIoNUEpcQlM7WXl6Cj39Q9Y0D4Q/TRJ662Tx3WOS/guYsV42Fm4THe/G/B2T97Jz4OVwJ+hxImPn8Tj381k91TfShfErIvLuAde1Y9g+N7Z/FL/rBDODR8gmgpTL5To7B3o69zF8pR3Pg7PMT90kn47LJ22kaeCPghapidP4Lxy3bduUiVZktdaQH7AxcFAiUm0Rhzji/gUhbp0s2Zf2xwAAAABJRU5ErkJggg==",
	info:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJ1SURBVHjafJJdSJNhFMd/z3QzLWdZrnQmSA2DPqRCK4KuhIq66kLoAy/qoqCguqqL6JsgLwoKKhCMSIy6CDKKRFZZYYQRVhJl02nWmG5uc19u7/vuPV0lW7QOnIsHnt+P8z/Pg4gw26aZ0263uzEUCn2IxWJjXq/3JqBETLIZ8gkePLhfKyKy/Z5HHJf7xe0Jic/n65mejizPK0inUiSTKUSE0dHRhxf6JoSDb4Rjr4QDz0REJBgMtmczFrJKKYVSCjCYnPR/W1FuAwQSGjbHXAA0LRXKZnIm0NJpgAKvd/hSOBz2iIj0eiPS2vtDYsmUPH/uPg9YshklIrOyCb+/eUG5ve3au5C99W2AqGbgKivk8R4X1lSkv2pJZaNmmBQVWWeZnAiGoa+3KovdyBjsW2kn/SvK4Jcgtaf7cDqrGkQMUDkBcgXVS2tOHjp8dG2jOXT1yo5lYOpgFTB0wKTAOqdQMlqOoDD7EE8kREwGXr/oWTg4HjxONAklBayuKSUeT/hFTxrwnwlAMa8I1qyrP3H95RiQgUiC/RsWM+wZ6jIME0M38wtSM0mmojM4nc6mzr5xKDQgnWb/pmoedT29EU3pTMUS+QVKKerq6kqnI3EVHwmAplO8qBh7WTFnzpz9bOg6FovlfxGEixfOrfT6YxCOQ1rDUaIAG4EJ38+PAwNb/95Bzj8ITAZwLHbMT0yHw3N33YVwEnQDqss41VzPkaalX6Iz+m6Xy/Xp34JAAICR7187nLWuvbe6h9C0DA2uRTTVV9J++87OlpaWJxUVFf9+xj+1cfOWls6OO93Nq1zblMVm9flG3pcvXNPm90+E/777ewB+UIqdqtYXHAAAAABJRU5ErkJggg==",
	bucket:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90BCg4hBcbCoOMAAABsSURBVDjLY2RgYFBjYGCIZCAPLGeBam4g0wAGJgYKARMDA8NZCvSfZYQy6sk0oJEFiUNqODRQLQxGDYCAb2To/YZswEsyDHiJbMAHMgz4gO6F5aTkQpgXYElZkoGBgZeEbL2cgYHhMwMDw3MA93ARk+mSg4gAAAAASUVORK5CYII=",
    dir:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAKNJREFUeNrEk7sNwkAQBefQ5m6BTiAAQssZiMh0QFUIMrAEpKYD8ynAJeD4nXQEkJHgu4CXv9GsdteFEEjJgMQ4gPli+aWx227cLwAD8FK8QZ4XTyCL6B6qal+YlzLgCpSn87HpbTCdzAKwAkpg1Bdgn/nbmDLQmby6hC3W5qUGGEcCGpNUJwBq09tgHdO+Pe61eamNvIMLgEkaxuoDuL9/42sAM20/EZafbV8AAAAASUVORK5CYII=",
	r:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90CDRIvNbHTpbwAAADjSURBVDjLpZFBbsIwEEUfVRZYahcVK3qKXoauMFK5C91nkyUB+xC5BqeAA7SKq1B5ugl2EiC04UkjayzN17NnROTRWvvJFbTWL8CBHqbGWOlSlqVkWSbGWAGm3aGHZiMiAByPP6FOd1rP2W7NvhvSCvDe10E+VJPFQpPnm1ZIcsmgPgJVVZGmaejX63y/XL4/AV/JJYPTCeDcN7PZWyuwKAqA8wARqSsGKDVGqXGjV8H07AnRQPq21TK8+YSBAQMN4hb6Df7wB/5eA+4zmEyehxk451itPrhFksSxUeP+lf+z+wXwdayJk/mqtgAAAABJRU5ErkJggg==",
    box:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMHAwRAVvTmTAAAAK/SURBVDjLpZM9bFxFGEXPNzPvZ+39sb2xHceREjDQBwlDCqqIiiotokAghYKEjvSkQkKJkEiB0lOkoAHaBAokFCQKUATIIOLIMbHWrHfX+7zvvZk3MzQODUgU3PJK5+g2F/5n5N/Kb66/1NNK3hAxr4HcFqVuvfju18V/Cu58sPmMVnJZ4K32Qr+t8za+KnCz4kCUuiGibm5euTv5h+CL958/nxj1XivVF+e6C9TVhPmFdbROgEhwNU1d4m09UaJuInLjhct3DgDUh5ee7j14PLxulLvYP/0seadPkub88Wib0eB3bDkmxgbRoFPpxeCuKvjsyQIzOyqImT7/y8Mh++NveW7jLFmrx6m1NlWxz6PHA7otQ7tloAmYJE9isOeeCJRtIrULLLUTjsqG7+//xs72z7jZgCTNONlVJKEiuobW0jqSaoiet19dFQATJcc2FSFEciNoLYwOHcPDASvdjM5cQntxlbR9gqacoFSK84VsnOrkH11Zdmp0FFXjobSeCFgXSDS0Eo11ge7yGXSaU092UUlCaEpC8FK4tDcu4rzZ2a/S+bWI94HSAgFigDQD24Cvp4gIOp0juBJvC2L07B1Uc/Mtg9k7sHMbywZrA3lLECV4AtaCpAp79CcmzXHlhOBrAJrGyNbOVBY7qTO1C9r5EKyPSttAiJEs01SuQStFkrdp6gKd5AzHjixVxCDxp+1paZRUxoc4Kp36bndYbS53U5WlCq0CMYIPMY7GI0mNpiqmGK0oK4jIveGkPgRqfTBt3A8Pqtvrq52HtglnGh9XIaKUkCQ6nj6RyWBsmdXCtFI/bu2Fq5c+3roGzIAgWokCDNACOhfOLb781Ip+vd+RC2dXWibROkxKvvp1z376yZe7d4HpMdz8/YVjiQYyoA30Ti6la2++0n/n83vTW/e3ix1gcgzXgPchBoC/AFu/UBF5InryAAAAAElFTkSuQmCC",
	bluebox:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMHAwTE5pcivoAAALsSURBVDjLXZPPaxxlGMc/77wz+3N2k822tWsTIrQFe/BWEKxKCV5UohdFhJ60p6rgUfpP6C0K4kHx0ENEkV7aElHwUikhFVosRGoTm83+3pnZnXfed2beHtItIQ98+Z6+H57nga8AsNYKDkYcEofcHvKZEEJYcSTszPzqL3fmf3+w/+a51tytby9d6D0N5UecGeBZ8MPv/jh9fy/6dKzMpVPHmvWdbl/XCvKn5Wbl6+ufrNwGssMgYa2VgFj58sZr7VB/LqX3zlKrydJzTTzXxdqcx90hO+0Bk2l8Z74i1z6+cOba5VfOqGeAb3579M/NR53T40xwrDGHFALPEUjn4LoMi0ktwWTKXqCIqAVrbyycvHj2hHYBR+bO8Q/Ov0imEzZ2xrRDRalQwC9LLBalUgaJQy+tU6gvIBJbv3j2RA4IFxDdICFa9ulMCrz/UgOs5kEwpeh57I4Nt/dzsmLOYlEThgFjUePp33IHoD9SJAbuTVyudRweixJvnVtg3/i00wpLPiwQ0hkO6YYKawWj0UjONqAfKHwDkxTqqeW/RHA3hO2+Zqk05e5wTD9KmOqMKDEUqoLNzU0PyF2AQaBoaIhiw0h6TIwgUDCODb5NiWJNlKREyhAozXwOW1tbFSmlcAHbD2KaytCdGgyWglfEs4LeNKeaa4axYRgpwlgTTTXVDDqdTslaewAYh4kNlKUbZsTGonOwCYwm1vq5Ft1AMYgU08SQR5o0gziOcRxHuoCNtdl6uPHX6/Vmi3Yyh9I5IoEgMdkgT9x+qJhEGrdQo77cJMuy+4DJskwLa60DOCtf3HhZpfZKtVx+L3x+sfCv8CFxTINd72HfodQ4aQp5fP24/v/Hd4Nf/5RSJmma6lkXZn1wPvvq5qndsbhS9esf/Zy/UEtzxnURfn8+/fuHV7m353mecV1XSym1lDI72kaxvr5e3N7eruyP0tpG/e3LK/rW2mLNUb7vm3K5nFarVdNqtbJer2dXV1fzJ6cDpboAZRAGAAAAAElFTkSuQmCC",
	refresh:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAK8AAACvABQqw0mAAAAAd0SU1FB90CFA8bKScXIjIAAAJ1SURBVDjLlVJdSJNRGH7es+/7NlduWFLTKAskwjJqZYiBglJhLKguqou6EFkFIkLQH9IPBFI3BsouzMJupGYRajcqmeBFhWBU5oUgpZikrSnzZ9v3nW/ndKEbziXUAwfOOe/7Puc9z/MCq1DwMmB1NX/rzfCNnsc/gK08lPgnnT8Cs33BULg0HI4YKdkHX9DqKwKArXXv1bTMTFcoyruC89E8MxaDw659t6rKhIUwRBLdP2t2v/5bBwQA+5pH8ibnIj3BucgWIQRASw8RERTGYFUtsGmWYUXKmqmr7t4UAnal54GQ8lq8MBlyOU0CEnA67MiwqfvHbhZ+Smgg6o9eV2L8Nhk6wI2lZeggrpvE+TTjxgxxQ4IbmJsJYSa00JQiotnguacJ8zIZOmDosAnzTpowt8tGj0s0ejZqprnDKmPHSNebjHDkUPatt4cTTbZ+LsmO79XK52dZxTNp9/ovAEDnaM62lo8HHrd9SVfiOelVryrSq9vrEx0s8sW2tuEzDgDgT875bcIsjy6owwAwHhjnYT5bGTL29PiHyuwAMO873aL/Ct5PiPjwXe5vq7KJW2hdJxENMFInGCkhIblLj80WRoyxGxZmh1XJGlSIlV8s6A8kuVDXn+MF6JHC7GBkBSNlOSRgiihMsQhAgJGGNNU1atc2HPG6O8YSBABwt2/nGyFlGSCSB4UIBMuyoQKMFNiUjIApRH5t8YfpFOOrO/JrhZBVUiJLxq2ipIkY8Z36uivpC6txqb3YbhqhIingFlLmxmLSKyXAGAaYqh13aFjfcHJwfE2ClSitK9psc85PMVC3M999orX4Kcf/wuPb27VW7A+O2QVVA1M1CQAAAABJRU5ErkJggg==",
    newitem:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAtxJREFUeNqM0llIVHEUBvDv3vlfZ8ac6zZtWpmamtliUUHRDlFJWlEYLdBLtG/QBlFJQUTSU089RZRlG4EvkS9NlqkpldHyYLk1OurcOzp30vHO/y6nBwsSIvzgvBw+fpyHA8MwwDmHbdsjQwSbCACkYDBYp6pqU3Fxcfyf/Z+eYRjQOQf+Bnw+30IiIsMwhizL4n3lV6mn7BzZtm1yzn8SETU0NKz+J2ARobe3t85/+SI1506j9hOHqTEO9FYEtR/ZTx/n5FDH6eOkquoni2g00NjUtEzTtBYioneLCulVHKg2yUkNmelUn5VOtUlueu0SqDE/m4iIIpFI64fm5vU65xAMIlicR9rOn/UEKytgmQbYuARAEDAqRLCiQxBFhtTNWzDzxk1LcjgkFhuKIhLR2qJKcN5Al/q7reF/cXUHoA0MtA9Gh4klJIxz6ro+PZiVC0uOw1jimJEDWZbTDhw8lCi0+/3PtUeV696ePIPUnIwxAf3fOjG/7AK8e/e9ZH2K0uWdPRdivANm3NguED1OJBYWQunvDwgAXIqifO54+CC7/tSxMQELL11B/r6D3cnJybniQDis25Ikfn1wD2GdQLIMISkF5JFhudwgjwySkyCkpILkRER0wpf7d2FJkqSoapQRRPCYjoLDR+EY70VXbS2YxCC4nAARbAAQBJBlwTIMZJRsQN7W7eA6t9O8XkE0jRhWLV2y+Gdm9q0dT6rMhLw8dPn7EAoEMBSLIcpjCPUEEPD3gU1Kw+6qZ6TPKrizq3TbAjUUIkFRVYAIkkfG99bWp4P1b7Z0vq5BXtFGPN6zE6Zuo7SiAh01PkycV4jJRRt96VOmrOHhMESHiBEAgMkNlGwqmXC78mG1DXtQdruTgx/eF5g6x9Tly1pCmtYjMSnxatnFTeXXyn8wxiCMAgxz5EmcTjCXCynxblf1C9910eFwrl254nh/dDhqcQ5zeBgAwBiDIAr4NQAWJarVjshqqgAAAABJRU5ErkJggg=="
};

Utils.genBamVariants = function(seq, size, x, y){
		var length = seq.length;
		var s = size/6;
		//if(x==null){x=0;}
		//if(y==null){y=0;}
		var d = "";
		for(var i = 0; i<length; i++){
			switch(seq.charAt(i)){
				case "A" : 
					d+="M"+((2.5*s)+x)+","+(y)+
					"l-"+(2.5*s)+","+(6*s)+
					"l"+s+",0"+
					"l"+(0.875*s)+",-"+(2*s)+
					"l"+(2.250*s)+",0"+
					"l"+(0.875*s)+","+(2*s)+
					"l"+s+",0"+
					"l-"+(2.5*s)+",-"+(6*s)+
					"l-"+(0.5*s)+",0"+
					"l0,"+s+
					"l"+(0.75*s)+","+(2*s)+
					"l-"+(1.5*s)+",0"+
					"l"+(0.75*s)+",-"+(2*s)+
					"l0,-"+s+
					" ";
					break;
				case "T" : 
					d+="M"+((0.5*s)+x)+","+(y)+
					"l0,"+s+
					"l"+(2*s)+",0"+
					"l0,"+(5*s)+
					"l"+s+",0"+
					"l0,-"+(5*s)+
					"l"+(2*s)+",0"+
					"l0,-"+s+
					" ";
					break;
				case "C" : 
					d+="M"+((5*s)+x)+","+((0*s)+y)+
					"l-"+(2*s)+",0"+
					"l-"+(2*s)+","+(2*s)+
					"l0,"+(2*s)+
					"l"+(2*s)+","+(2*s)+
					"l"+(2*s)+",0"+
					"l0,-"+s+
					"l-"+(1.5*s)+",0"+
					"l-"+(1.5*s)+",-"+(1.5*s)+
					"l0,-"+(1*s)+
					"l"+(1.5*s)+",-"+(1.5*s)+
					"l"+(1.5*s)+",0"+
					" ";
					break;
				case "G" : 
					d+="M"+((5*s)+x)+","+((0*s)+y)+
					"l-"+(2*s)+",0"+
					"l-"+(2*s)+","+(2*s)+
					"l0,"+(2*s)+
					"l"+(2*s)+","+(2*s)+
					"l"+(2*s)+",0"+
					"l0,-"+(3*s)+
					"l-"+(1*s)+",0"+
					"l0,"+(2*s)+
					"l-"+(0.5*s)+",0"+
					"l-"+(1.5*s)+",-"+(1.5*s)+
					"l0,-"+(1*s)+
					"l"+(1.5*s)+",-"+(1.5*s)+
					"l"+(1.5*s)+",0"+
					" ";
					break;
				case "N" : 
					d+="M"+((0.5*s)+x)+","+((0*s)+y)+
					"l0,"+(6*s)+
					"l"+s+",0"+
					"l0,-"+(4.5*s)+
					"l"+(3*s)+","+(4.5*s)+
					"l"+s+",0"+
					"l0,-"+(6*s)+
					"l-"+s+",0"+
					"l0,"+(4.5*s)+
					"l-"+(3*s)+",-"+(4.5*s)+
					" ";
					break;
                case "d" :
                    d+="M"+((0*s)+x)+","+((2.5*s)+y)+
                        "l"+(6*s)+",0"+
                        "l0,"+(s)+
                        "l-"+(6*s)+",0"+
                        "l0,-"+(s)+
                        " ";
                    break;
				default:d+="M0,0";break;
			}
			x += size;
		}
		return d;
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function HeaderWidget(args){
	var _this=this;
	this.id = "HeaderWidget"+ Math.round(Math.random()*10000);
	this.targetId = null;
	this.height = 67;
	this.accountData = null;

	this.appname="My new App";
	this.description='';
	this.suiteId=-1;
	this.news='';
    this.checkTimeInterval = 4000;

    if(typeof args != 'undefined'){
        this.appname = args.appname || this.appname;
        this.description = args.description || this.description;
        this.version = args.version || this.version;
        this.suiteId = args.suiteId || this.suiteId;
        this.news = args.news || this.news;
    }

	this.adapter = new OpencgaManager();
	
	/** Events **/
	this.onLogin = new Event();
	this.onLogout = new Event();
	this.onGetAccountInfo = new Event();

	/** create widgets **/
	this.loginWidget= new LoginWidget(this.suiteId);
	this.editUserWidget = new ProfileWidget();
	this.uploadWidget = new UploadWidget({suiteId:this.suiteId});//used now from opencga-browser
	this.projectManager = new ManageProjectsWidget({width:800,height:500,suiteId:this.suiteId});
	this.opencgaBrowserWidget = new OpencgaBrowserWidget({suiteId:this.suiteId});
	
	/**Atach events i listen**/
	this.loginWidget.onSessionInitiated.addEventListener(function(){
		_this.sessionInitiated();
		_this.onLogin.notify();
	});
	this.projectManager.onRefreshProjectList.addEventListener(function(sender,data){
		_this.userBarWidget.createProjectMenuItems(data);
	});
	this.adapter.onLogout.addEventListener(function(sender, data){
		console.log(data);
		//Se borran todas las cookies por si acaso
		$.cookie('bioinfo_sid', null);
		$.cookie('bioinfo_sid', null, {path: '/'});
		$.cookie('bioinfo_account', null);
		$.cookie('bioinfo_account', null, {path: '/'});
		_this.sessionFinished();
		_this.onLogout.notify();
	});
    this.opencgaBrowserWidget.onNeedRefresh.addEventListener(function(){
        _this.getAccountInfo();
    });
    this.adapter.onGetAccountInfo.addEventListener(function (evt, response){
        if(response.accountId != null){
            _this.setAccountData(response);
            _this.onGetAccountInfo.notify(response);
            console.log("accountData has been modified since last call");
        }
    });
}

HeaderWidget.prototype = {
    setAccountData : function (data){
        this.accountData = data;
        this.opencgaBrowserWidget.setAccountData(data);
        Ext.getCmp(this.id+'textUser').setText(this._getAccountText());
    },
    getAccountInfo : function() {
        var lastActivity = null;
        if(this.accountData != null){
            lastActivity =  this.accountData.lastActivity;
        }
        if(!$.cookie('bioinfo_account')){
            console.log('cookie: bioinfo_account, is not set, session will be finished...');
            this.sessionFinished();
        }else{
            this.adapter.getAccountInfo($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), lastActivity);
        }

    },
    _getAccountText : function(){
        var nameToShow = this.accountData.accountId;
        if(nameToShow.indexOf('anonymous_')!=-1){
            nameToShow='anonymous';
        }
        return 'logged in as <span style="color:darkred">'+nameToShow+'</span>'
    },
    sessionInitiated : function(){
        var _this = this;
        /**HIDE**/
        this.loginWidget.clean();
        Ext.getCmp(this.id+'btnSignin').hide();
        /**SHOW**/
        Ext.getCmp(this.id+'btnLogout').show();
        Ext.getCmp(this.id+'btnEdit').show();
        Ext.getCmp(this.id+'btnOpencga').show();

        /**START OPENCGA CHECK**/
        if(this.accountInfoInterval == null){
            this.getAccountInfo();//first call
            this.accountInfoInterval = setInterval(function(){_this.getAccountInfo();}, this.checkTimeInterval);
        }
    },
    sessionFinished : function(){
        /**HIDE**/
        Ext.getCmp(this.id+'btnOpencga').hide();
        Ext.getCmp(this.id+'btnLogout').hide();
        Ext.getCmp(this.id+'btnEdit').hide();
        /**SHOW**/
        Ext.getCmp(this.id+'btnSignin').show();

        Ext.getCmp(this.id+'textUser').setText('');
        /**CLEAR OPENCGA**/
        clearInterval(this.accountInfoInterval);
    },
    setDescription : function (text){
        $("#"+this.id+'description').text(text);
    },
    draw : function(){
        this.render();
        if($.cookie('bioinfo_sid') != null){
            this.sessionInitiated();
        }else{
            this.sessionFinished();
        }
    },
    getPanel : function (){
        this.draw();
        return this.panel;
    },
    setWidth : function (width){
        this.width=width;
        this.getPanel().setWidth(width);
        this.getPanel().updateLayout();//sencha 4.1.0 : items are not allocated in the correct position after setWidth
    },
    render : function (){
        var _this=this;
        if (this.panel==null){
//		console.log(this.args.suiteId);
            switch(this.suiteId){
                case 11://Renato
                    this.homeLink="http://renato.bioinfo.cipf.es";
                    this.helpLink="http://bioinfo.cipf.es/docs/renato/";
                    this.tutorialLink="http://bioinfo.cipf.es/docs/renato/tutorial";
                    this.aboutText = '';
                    break;
                case 6://Variant
                    this.homeLink="http://variant.bioinfo.cipf.es";
                    this.helpLink="http://docs.bioinfo.cipf.es/projects/variant";
                    this.tutorialLink="http://docs.bioinfo.cipf.es/projects/variant/wiki/Tutorial";
                    this.aboutText = '';
                    break;
                case 9://GenomeMaps
                    this.homeLink="http://www.genomemaps.org";
                    this.helpLink="http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:overview";
                    this.tutorialLink="http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:tutorial";
                    this.aboutText = 'Genome Maps is built with open and free technologies like HTML5 and SVG inline, ' +
                        'so no plug-in is needed in modern internet browsers. We’ve focused on providing the ' +
                        'best user experience possible with a modern drag navigation and many features included.<br><br>' +
                        'Genome Maps project has been developed in the <b>Computational Biology Unit</b> led by <b>Ignacio Medina</b>, at <b>Computational Genomic'+
                        ' Institute</b> led by <b>Joaquin Dopazo</b> at CIPF. Two people from my lab deserve special mention for their fantastic job done: '+
                        '<br><b>Franscisco Salavert</b> and <b>Alejandro de Maria</b>.<br><br>'+
                        'Genome Maps has been designed to be easily be embedded in any project with a couple of lines of code,' +
                        ' and it has been implemented as a plugin framework to extend the standard features.<br><br>' +
                        'Supported browsers include: Google Chrome 14+, Apple Safari 5+, Opera 12+ and Mozilla Firefox 14+ ' +
                        '(works slower than in the other browsers). Internet Explorer 10 is under RC and seems to work properly.<br><br>' +
                        'For more information or suggestions about Genome Maps please contact <br><b>Ignacio Medina</b>:  <span class="info">imedina@cipf.es</span>'
                    break;
                case 10://CellBrowser
                    this.homeLink="http://www.cellbrowser.org";
                    this.helpLink="http://docs.bioinfo.cipf.es/projects/cellbrowser";
                    this.tutorialLink="http://docs.bioinfo.cipf.es/projects/cellbrowser/wiki/Tutorial";
                    this.aboutText = '';
                    break;
                case 12://UNTBgen
                    this.homeLink="http://bioinfo.cipf.es/apps/untbgen";
                    this.helpLink="http://bioinfo.cipf.es/ecolopy/";
                    this.tutorialLink="http://bioinfo.cipf.es/ecolopy/";
                    this.aboutText = '';
                    break;
                case 22://Pathiways
                    this.homeLink="http://pathiways.bioinfo.cipf.es";
                    this.helpLink="http://bioinfo.cipf.es/pathiways";
                    this.tutorialLink="http://bioinfo.cipf.es/pathiways/tutorial";
                    this.aboutText = 'PATHiWAYS is built with open and free technologies like HTML5 and SVG inline, ' +
                        'so no plug-in is needed in modern internet browsers<br><br>'+
                        'PATHiWAYS project has been developed in the <b>Computational Biology Unit</b>, at <b>Computational Medicine'+
                        ' Institute</b> at CIPF in Valencia, Spain.<br><br>'+
                        'For more information please visit our web page  <span class="info"><a target="_blank" href="http://bioinfo.cipf.es">bioinfo.cipf.es</a></span>';
                    break;
                default:
                    this.homeLink="http://docs.bioinfo.cipf.es";
                    this.helpLink="http://docs.bioinfo.cipf.es";
                    this.tutorialLink="http://docs.bioinfo.cipf.es";
                    this.aboutText = '';
            }

            var linkbar = new Ext.create('Ext.toolbar.Toolbar', {
                id:this.id+'linkbar',
                dock: 'top',
                cls:'bio-linkbar',
                height:40,
                minHeight:40,
                maxHeight:40,
                items: [{
                    xtype: 'tbtext',
                    id: this.id + "appTextItem",
                    //		        	html: '<span class="appName">Vitis vinifera&nbsp; '+this.args.appname +'</span> <span class="appDesc">'+this.args.description+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><img height="30" src="http://www.demeter.es/imagenes/l_demeter.gif"></span>',
                    text: '<span class="appName">' + this.appname + '</span> <span id="' + this.id + 'description" class="appDesc">' + this.description + '</span><span class="appDesc" style="color:orangered;margin-left:20px">New version 3.1 beta2</span>',
                    padding: '0 0 0 10',
                    listeners:{
                        afterrender:function(){
                            $("#"+_this.id+"appTextItem").qtip({
                                content: '<span class="info">'+_this.version+'</span>',
                                position: {my:"bottom center",at:"top center",adjust: { y: 0, x:-25 }}

                            });
                        }
                    }
                },{
                    xtype:'tbtext',
                    id:this.id+"speciesTextItem",
                    text:''
                },{
                    xtype:'tbtext',
                    id:this.id+"assemblyTextItem",
                    text:''
                },'->',{
                    id: this.id + "homeButton",
                    text: 'home',
                    handler: function () {
                        window.location.href = _this.homeLink;
                    }
                },{
                    id: this.id + "helpButton",
                    text: 'documentation',
                    handler: function () {
                        window.open(_this.helpLink);
                    }
                },{
                    id: this.id + "tutorialButton",
                    text: 'tutorial',
                    handler: function () {
                        window.open(_this.tutorialLink);
                    }
                },{
                    id: this.id + "aboutButton",
                    text: 'about',
                    handler: function () {
                        Ext.create('Ext.window.Window', {
                            id: _this.id + "aboutWindow",
                            bodyStyle: 'background:#fff; color:#333;',
                            bodyPadding: 10,
                            title: 'About',
                            height: 340,
                            width: 500,
                            modal: true,
                            layout: 'fit',
                            html: _this.aboutText
                        }).show();
                    }
                }]
            });

            var userbar = new Ext.create('Ext.toolbar.Toolbar', {
                id : this.id+'userbar',
                dock: 'top',
                border:true,
                cls:'bio-userbar',
//                cls:'bio-linkbar',
                height:27,
                minHeight:27,
                maxHeight:27,
                layout:'hbox',
                items:[{
                    xtype:'tbtext',
                    id:this.id+'textNews',
                    text:this.news
                },'->',{
                    xtype:'tbtext',
                    id:this.id+'textUser',
                    text:''
                },{
                    id:this.id+'btnOpencga',
                    text: '<span class="emph">Upload & Manage</span>',
                    iconCls: 'icon-project-manager',
                    handler: function() {
                        _this.opencgaBrowserWidget.draw("manager");
                    }
                },{
                    id: this.id+'btnSignin',
                    text: '<span class="emph">sign in</span>',
                    handler: function (){
                        _this.loginWidget.draw();
                    }
                },{
                    id: this.id+'btnEdit',
                    text: '<span class="emph">profile</span>',
                    handler: function (){
                        _this.editUserWidget.draw();
                    }
                },{
                    id :this.id+'btnLogout',
                    text: '<span class="emph">logout</span>',
                    handler: function (){
                        _this.adapter.logout($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'));
                    }
                }]
            });

            this.panel = Ext.create('Ext.panel.Panel', {
                id:this.id+"panel",
                region: 'north',
                border:false,
                renderTo:this.targetId,
                height : this.height,
                minHeight: this.height,
                maxHeigth: this.height,
                items:[userbar,linkbar]
            });
        }
    }
};



/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function UserListWidget (args){
	var _this = this;
	this.id = "UserListWidget_"+ Math.round(Math.random()*10000000);
	this.data = new Array();
	
	this.args = new Object();
	this.timeout = 4000;
	this.pagedViewList = args.pagedViewList;
	this.suiteId=-1;
	this.tools = [];
	
	if (args != null){
        if (args.timeout != null && args.timeout > 4000){
        	this.timeout = args.timeout;
        }
        if (args.suiteId != null){
        	this.suiteId = args.suiteId;
        }
        if (args.tools != null){
        	this.tools = args.tools;
        }
    }
//	console.warn(this.id+' Minimum period is 4000 milliseconds, smaller values will be ignored');
};

UserListWidget.prototype.draw =  function (){
	var _this = this;
	
	this.getResponse();
	this.interval = setInterval(function () {_this.getResponse(); }, this.timeout);
};


UserListWidget.prototype.getData =  function (){
	return this.data;
};

UserListWidget.prototype.getCount = function() {
	return this.data.length;
};

UserListWidget.prototype.getResponse = function(){
	/**Que cada clase hija llame a la funcion de WumDataAdapter que necesite**/
	throw "abstract method must be implemented in child classes";
};

UserListWidget.prototype.render =  function (data){
	/**Que cada clase hija renderize como quiera los datos, ya sea con sencha o con sencho**/
	throw "abstract method must be implemented in child classes";
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

JobListWidget.prototype.draw = UserListWidget.prototype.draw;
JobListWidget.prototype.getData = UserListWidget.prototype.getData;
JobListWidget.prototype.getCount = UserListWidget.prototype.getCount;

function JobListWidget (args){
	var _this = this;
	UserListWidget.prototype.constructor.call(this, args);
	this.counter = null;
	var jobstpl = [
					'<tpl for=".">',
					'<div class="joblist-item">',
						'<p style="color:'+
											'<tpl if="visites == 0">green</tpl>'+
											'<tpl if="visites &gt; 0">blue</tpl>'+
											'<tpl if="visites == -1">red</tpl>'+
											'<tpl if="visites == -2">Darkorange</tpl>'+
											'">{name}</p>',
						'<p style="color: #15428B"><i>{date}</i></p>',
						'<p style="color:steelblue"><i>{toolName}</i></p>',
						'<p style="color:grey"><i>',
//						'<tpl if="visites == 0">finished and unvisited</tpl>',
//						'<tpl if="visites &gt; 0">{visites} visites</tpl>',
//						'<tpl if="visites == -1">',
						//'<div style="height:10px;width:{percentage/100*180}px;background:url(\'http://jsapi.bioinfo.cipf.es/ext/sencha/4.0.2/resources/themes/images/default/progress/progress-default-bg.gif\') repeat-x;">&#160;</div>',
						//'{percentage}%',
//						'running, please wait...',
//						'</tpl>',
                        '{status}',
						'<tpl if="visites &gt; -1"> - {visites} views</tpl>',
//						'</i>  - {id}</p>',
					'</div>',
					'</tpl>'
					];

	var	jobsfields = ['commandLine','date','description','diskUsage','status','finishTime','inputData','jobId','message','name','outputData','ownerId','percentage','projectId','toolName','visites'];

	this.pagedViewList.storeFields = jobsfields;
	this.pagedViewList.template = jobstpl;
	
	if (args.pagedViewList != null){
        if (args.pagedViewList.storeFields != null){
        	this.pagedViewList.storeFields = args.pagedViewList.storeFields;       
        }
        if (args.pagedViewList.template != null){
        	this.pagedViewList.template = args.pagedViewList.template;       
        }
    }
	
	this.pagedListViewWidget = new PagedViewListWidget(this.pagedViewList);
	
	this.btnAllId = 	this.id + "_btnAll";
	this.btnActivePrjId = 	this.id + "_btnActivePrj";
	this.btnFinishedId =this.id + "_btnFinished";
	this.btnVisitedId = this.id + "_btnVisited";
	this.btnRunningId = this.id + "_btnRunning";
	this.btnQueuedId = 	this.id + "_btnQueued";
	
	this.projectFilterButton = Ext.create("Ext.button.Button",{
	    id : this.btnActivePrjId,
	    iconCls: 'icon-project-all',
	    tooltip:'Toggle jobs from all projects or active project',
	    enableToggle: true,
	    pressed: false,
	    listeners: {
	    	toggle:function(){
	    	//_this.selectProjectData();
			_this.render();
	    	}
	    }
	});
	
	
	
	this.bar = new Ext.create('Ext.toolbar.Toolbar', {
//		vertical : true,
		id:this.id+"jobsFilterBar",
		style : 'border : 0',
		dock : 'top',
		items :  [
                  //this.projectFilterButton,
                  {
                	  id : this.btnAllId,
                	  text: ' ',
                	  tooltip:'Total jobs'
                  },
                  {
                	  id : this.btnFinishedId,
                	  text: ' ',
                	  tooltip:'Finished jobs'
                  },
                  {
                	  id : this.btnVisitedId,
                	  text: ' ',
                	  tooltip:'Visited jobs'
                  },
                  {
                	  id : this.btnRunningId,
                	  text: ' ',
                	  tooltip:'Running jobs'
                  },
                  {
                	  id : this.btnQueuedId,
                	  text: ' ',
                	  tooltip:'Queued jobs'
                  }
		]
	});	
	
	Ext.getCmp(this.btnAllId).on('click', this.filter, this);
	Ext.getCmp(this.btnFinishedId).on('click', this.filter, this);
	Ext.getCmp(this.btnVisitedId).on('click', this.filter, this);
	Ext.getCmp(this.btnRunningId).on('click', this.filter, this);
	Ext.getCmp(this.btnQueuedId).on('click', this.filter, this);
	
	this.allData = [];


///*HARDCODED check job status*/
//	var checkJobsStatus = function(){
//		if(_this.accountData != null){
//			var opencgaManager = new OpencgaManager();
//			for ( var i = 0; i < _this.accountData.jobs.length; i++) {
//				if(_this.tools.indexOf(_this.accountData.jobs[i].toolName) != -1){
//					if(_this.accountData.jobs[i].visites<0){
//						opencgaManager.jobStatus($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), _this.accountData.jobs[i].id);
//					}
//				}
//			}
//		}
//	}
//
//	this.accountInfoInterval = setInterval(function(){checkJobsStatus();}, 4000);
//
///*HARDCODED check job status*/

	
};

//override
JobListWidget.prototype.draw = function (){
	
};

JobListWidget.prototype.clean =  function (){
	clearInterval(this.interval);
	if(this.bar.isDescendantOf(Ext.getCmp(this.pagedListViewWidget.panelId))==true){
		Ext.getCmp(this.pagedListViewWidget.panelId).removeDocked(this.bar,false);
	}
	this.pagedListViewWidget.clean();
};

//JobListWidget.prototype.getResponse = function (){
	//this.adapter.listProject($.cookie("bioinfo_sid"), this.suiteId);
//};

JobListWidget.prototype.setAccountData = function (data){

	this.accountData = data;
	console.log("joblistwidget");
	var jobs = [];
    var job;
	for ( var i = 0; i < this.accountData.projects.length; i++) {
        for ( var j = 0; j < this.accountData.projects[i].jobs.length; j++) {
            job = this.accountData.projects[i].jobs[j];
            if(this.tools.indexOf(job.toolName) != -1){
                job.date = Utils.parseDate(job.date);
                jobs.push(job);
            }
        }
	}
	this.data = jobs;
	this.render();
};


JobListWidget.prototype.render =  function (){
	this.pagedListViewWidget.draw(this.getData());
	if(this.bar.isDescendantOf(Ext.getCmp(this.pagedListViewWidget.panelId))==false){
		Ext.getCmp(this.pagedListViewWidget.panelId).addDocked(this.bar);
	}
	
	var jobcount = this.getJobCounter();

	if (jobcount.all == 0) {
		Ext.getCmp(this.btnAllId).hide();
	} else {
		Ext.getCmp(this.btnAllId).show();
	}
	if (jobcount.finished == 0) {
		Ext.getCmp(this.btnFinishedId).hide();
	} else {
		Ext.getCmp(this.btnFinishedId).show();
	}
	if (jobcount.visited == 0) {
		Ext.getCmp(this.btnVisitedId).hide();
	} else {
		Ext.getCmp(this.btnVisitedId).show();
	}
	if (jobcount.running == 0) {
		Ext.getCmp(this.btnRunningId).hide();
	} else {
		Ext.getCmp(this.btnRunningId).show();
	}
	if (jobcount.queued == 0) {
		Ext.getCmp(this.btnQueuedId).hide();
	} else {
		Ext.getCmp(this.btnQueuedId).show();
	}
	Ext.getCmp(this.btnAllId).setText('<b style="color:black;font-size: 1.3em;">'+jobcount.all+'</b>');
	Ext.getCmp(this.btnFinishedId).setText('<b style="color:green;font-size: 1.3em;">'+jobcount.finished+'</b>');
	Ext.getCmp(this.btnVisitedId).setText('<b style="color:blue;font-size: 1.3em;">'+jobcount.visited+'</b>');
	Ext.getCmp(this.btnRunningId).setText('<b style="color:red;font-size: 1.3em;">'+jobcount.running+'</b>');
	Ext.getCmp(this.btnQueuedId).setText('<b style="color:Darkorange;font-size: 1.3em;">'+jobcount.queued+'</b>');				
};


JobListWidget.prototype.getJobCounter = function() {
	var finished = 0;
	var visited = 0;
	var running = 0;
	var queued = 0;
	for (var i =0 ; i < this.getData().length; i++) {
		if (this.getData()[i].visites > 0){
			visited++;
		}else {
			if (this.getData()[i].visites == 0){
				finished++;
			}
			if (this.getData()[i].visites == -1){
				running++;
			}
			if (this.getData()[i].visites == -2){
				queued++;
			}
		}
	}
	return {"all":this.getData().length,"visited": visited, "finished": finished, "running": running, "queued": queued};
};

/**Filters**/
//var functionAssertion = function(item){return item.data.visites > 2;};

JobListWidget.prototype.filter = function (button){
	switch (button.id) {
		case this.btnFinishedId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites == 0;});
			break;
		case this.btnVisitedId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites > 0;});
			break;
		case this.btnRunningId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites == -1;});
			break;
		case this.btnQueuedId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites == -2;});
			break;
		default:
			this.pagedListViewWidget.setFilter(function(item){return true;});
			break;
	}
	this.pagedListViewWidget.draw(this.getData());
};

JobListWidget.prototype.selectProjectData = function (){
	if(!this.projectFilterButton.pressed){
		for ( var i = 0; i < this.allData.length; i++) {
			if(this.allData[i].active){
				this.data=this.allData[i].jobs;
				break;
			}
		}
	}else{
		var allJobs = new Array();
		for ( var i = 0; i < this.allData.length; i++) {
			if(this.allData[i].jobs!=null){
				for ( var j = 0; j < this.allData[i].jobs.length; j++) {
					
					//TODO care with date order
					allJobs.push(this.allData[i].jobs[j]);
				}
			}
		}
		this.data=allJobs;
	}
	if(this.data==null){
		this.data=[];
	}
	this.pagedListViewWidget.draw(this.getData());
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

DataListWidget.prototype.draw = UserListWidget.prototype.draw;
DataListWidget.prototype.getData = UserListWidget.prototype.getData;
DataListWidget.prototype.getCount = UserListWidget.prototype.getCount;

function DataListWidget (args){
	UserListWidget.prototype.constructor.call(this, args);
	
	var _this = this;
	
	var datatpl = [
					'<tpl for=".">',
					'<div class="joblist-item">',
						'<p><span>{name}</span><i style="color:green"> ({status}) </i></p>',
						'<tpl for="dataFiles">',     // interrogate the kids property within the data
				        	'<p><i style="color:grey">{filename}</i><span style="color:blue"> {diskUsage}kB</span></p>',
				        '</tpl>',
				        	'<tpl for="tags">',     // interrogate the kids property within the data
				        	'<span style="color:limegreen"> {.},</span>',
				        '</tpl>',
				        '<p><i>{creationTime}</i></p>',
					'</div>',
					'</tpl>'
				];

	var datafields = ['commandLine','creationTime','dataFiles','dataId','date','description','diskUsage','enabled','finishTime','jobId','message','multiple','name','organization','ownerId','percentage','projectId','responsible','status','statusMessage','suiteId','tags','toolName','visites','write'];
	
	this.pagedViewList.storeFields = datafields;
	this.pagedViewList.template = datatpl;
	
	if (args.pagedViewList != null){
        if (args.pagedViewList.storeFields != null){
        	this.pagedViewList.storeFields = args.pagedViewList.storeFields;       
        }
        if (args.pagedViewList.template != null){
        	this.pagedViewList.template = args.pagedViewList.template;       
        }
    }
	
	this.pagedListViewWidget = new PagedViewListWidget(this.pagedViewList);
	
	this.adapter = new WumAdapter();
	this.adapter.onGetData.addEventListener(function (sender, data){
		var pdata=null;
		try{
			pdata = JSON.parse(data);
		}
		catch(err){
			console.log("Data received is not a JSON valid.");
			pdata = new Array();
		}
		_this.render(pdata);
	});	
};

DataListWidget.prototype.clean =  function (){
	clearInterval(this.interval);
	this.pagedListViewWidget.clean();
};


DataListWidget.prototype.getResponse = function (){
	this.adapter.getData($.cookie("bioinfo_sid"), this.suiteId);
};

DataListWidget.prototype.render =  function (data){
	this.data = data;
	this.pagedListViewWidget.draw(data);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function PagedViewListWidget(args){
	var _this=this;
	this._data = null;
	this.id = "PagedViewListWidget_"+ Math.round(Math.random()*10000);
	this.targetId = null;
	
	this.pageSize = 6;
	this.storeFields = new Object();
	this.template = new Object();
	this.width = 280;
	this.height = 550;
	this.title = "";
	this.order = 0;
	this.border = 0;
	this.mode = "view";
	this.sort = 'DESC';

	
	if (args != null){
		if (args.pageSize != null){
			this.pageSize = args.pageSize; 
		}
		if (args.storeFields != null){
			this.storeFields = args.storeFields;
		}
		if (args.template != null){
			this.template = args.template;
		}
		if (args.targetId != null){
			this.targetId = args.targetId;
		}
		if (args.width != null){
        	this.width = args.width;
        }
        if (args.height != null){
        	this.height = args.height;      
        }
        if (args.title != null){
        	this.title = args.title;      
        }
        if (args.order != null){
        	this.order = args.order;      
        }
        if (args.border != null){
        	this.border = args.border;      
        }
        if (args.mode != null){
        	this.mode = args.mode;      
        }
    }
    
	this.currentPage = 1;
	this.pageFieldId = this.id + '_pageField';
	this.pageLabelId = this.id + '_pageLabel';
	this.pagbarId = this.id + '_pagbar';
	this.panelId = this.id + '_panel';
	
	/**Events i send**/
	this.onItemClick = new Event(this);
	
	
	this.textFilterFunction = function(item){
		var str = Ext.getCmp(_this.id+"searchField").getValue().toLowerCase();
		if(item.data.name.toLowerCase().indexOf(str)<0){
			return false;
		}
		return true;
	};
	
};

PagedViewListWidget.prototype.getData = function (){
	return this._data;
};

PagedViewListWidget.prototype._setData = function (data){
	this._data = data;
};

//PagedViewListWidget.prototype.getPageSize = function (){
//	return this.pageSize;
//};

//PagedViewListWidget.prototype.getItemsCount = function (){
//	return this.getData().length;
//};

//PagedViewListWidget.prototype.getPageCount = function (){
//	return Math.ceil(this.getItemsCount() / this.getPageSize());
//};

/**FILTER **/
PagedViewListWidget.prototype.setFilter = function(filterFunction) {
	this.store.clearFilter();
	
	if(filterFunction!=null){
		this.filterFunction = filterFunction;
		this.store.filter([filterFunction,this.textFilterFunction]);
	}else{
		this.store.filter([this.textFilterFunction]);
	}
	
};

/** DRAW **/
PagedViewListWidget.prototype.draw = function(data) {
	
	this._setData(data);
//	this.changeOrder();
	this.render();
	
	this.store.loadData(this.getData());
	if (this.filterFunction != null ){
		this.setFilter(this.filterFunction);
//		this._setData(this.store.data.items);
	}
//	this.changePage(this.currentPage, this.getData(), true);
	
};
/** CLEAN **/
PagedViewListWidget.prototype.clean =  function (){
	if (this.panel != null){
		this.panel.destroy();
		delete this.panel;
	}
};


//PagedViewListWidget.prototype.changePage = function (numberPage, data, restUpdated){
//	if((data != null) && (data.length > 0)){
//		if ((numberPage > 0) && (numberPage <= this.getPageCount())){
//			this.currentPage = numberPage;
//			Ext.getCmp(this.pageLabelId).setText(numberPage+' of '+ this.getPageCount());
//			if (restUpdated != true){				
//				Ext.getCmp(this.pageFieldId).setValue(numberPage);
//			} 
//			var dataPage = new Array(); 
//			for ( var i = (this.getPageSize() * numberPage)- this.getPageSize(); i < this.getPageSize() * numberPage; i++) {
//				if (data[i] != null){
//					dataPage.push(data[i]);
//				}
//			}
//			this.store.loadData(dataPage, false);
//			}
//	}
//	else{
//		this.store.removeAll();
//		this.currentPage=1;
//		Ext.getCmp(this.pageFieldId).setValue(this.currentPage);
//		Ext.getCmp(this.pageLabelId).setText('No data found');
//		
//	}	
//};

//PagedViewListWidget.prototype.changeOrder = function (){
////	console.log(this.id+": "+this.sort);
//	if(this.sort == "desc"){
//		var aux = new Array();
//		var data = this.getData();
//		if(data != null){		
//			for ( var i = data.length-1; i >= 0; i--) {
//				aux.push(data[i]);
//			}
//		}
//		this._setData(aux);
//	}
//};

PagedViewListWidget.prototype.render = function() {
	var _this = this;
	if (this.panel == null){
				this.tpl = new Ext.XTemplate(this.template);
				
				this.store = Ext.create('Ext.data.Store', {
			    	fields: this.storeFields,
			    	sorters: [{ property : 'date', direction: 'DESC'}],
					autoLoad: false
			    });
				
			   var pan=null;
				
			   if(this.mode == "view"){
				   	this.view = Ext.create('Ext.view.View', {
				   		id : this.id+"view",
						padding:15,
						store: this.store,
					    tpl: this.tpl,
					    height:$(document).height()-200,
					    trackOver: true,
					    autoScroll:true,
	           			overItemCls: 'list-item-hover',
	           			itemSelector: '.joblist-item',
					    listeners : {
					    	scope: this,
					    	itemclick : function (este,record){
							console.log(record.data);
					    		this.onItemClick.notify(record);
				    		}
	//				    	itemmouseenter : function (este, record, item){
	//				    		item.style.cursor="pointer";
	//				    		item.firstChild.style.cursor="pointer";
	//				    		item.style.border = "1px solid deepSkyBlue";
	//				    		item.style.background = "honeydew";
	//				    	},
	//			    		itemmouseleave : function (este, record, item){
	//				    		item.style.background = "white";	
	//				    		item.style.border = "1px solid #ffffff";
	//				    	}
					    }
					});
				   	
					pan = this.view;
				}
				
				
				if(this.mode == "grid"){
					var columns = [];
					for (var j=0;j<this.storeFields.length; j++){
						columns.push({header:this.storeFields[j],dataIndex:this.storeFields[j], flex:1});
					}
					this.grid = Ext.create('Ext.grid.Panel', {
					    store: this.store,
					    columns: columns,
					    border:0
					});
					pan = this.grid;
				}
				
				/**TEXT SEARCH FILTER**/
		        var searchField = Ext.create('Ext.form.field.Text',{
		        	 id:this.id+"searchField",
			         flex:1,
			         margin:"0 1 0 0",
					 emptyText: 'enter search term',
					 enableKeyEvents:true,
					 listeners:{
					 	change:function (){
					 		_this.setFilter(null);
					 	}
					 }
		        });
				
				this.pagBar = Ext.create('Ext.toolbar.Toolbar', {
					id : this.pagbarId,
					style:'border: '+this.border,
				    items: [
//							{
//							    id : this.id+'btnPrev',
//							    iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
//							    tooltip:'Previous Page',
//							    listeners: {
//							        scope: this,
//							        click: this.onPrevClick
//							    }
//							},
//							'-',
//							{	
//							    xtype: 'numberfield',
//							    id: this.pageFieldId,
//							    cls: Ext.baseCSSPrefix + 'tbar-page-number',
//							    allowDecimals: false,
//							    minValue: 1,
//							    value:1,
//							    hideTrigger: true,
//							    enableKeyEvents: true,
//							    selectOnFocus: true,
//							    submitValue: false,
//							    width: 30,
//							    margins: '-1 2 3 2',
//							    listeners: {
//							        scope: this,
//							        keyup: this.onPageChange
//							    }
//							},
//							'-',
//							{
//							    id : this.id+'btnNext',
//							    iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
//							    tooltip:'Next Page',
//							    listeners: {
//							        scope: this,
//							        click: this.onNextClick
//							    }
//							},
//			//				'-',
//							{
//							    xtype: 'label',
//							    id: this.pageLabelId,
//							    text: '',
//							    margins: '5 0 0 5'
//							},
							{
							    id : this.id+'btnSort',
							    iconCls: 'icon-order-desc',
							    tooltip:'Change order',
							    handler: function(){
							    	if(_this.sort=="DESC") {
							    		_this.sort = "ASC";
							    		_this.store.sort('date', 'ASC');
							    		this.setIconCls('icon-order-asc');
							    	}
							    	else {
							    		_this.sort = "DESC";
							    		_this.store.sort('date', 'DESC');
							    		this.setIconCls('icon-order-desc');
							    	}
							    }
							},
							searchField,
							{
							    id : this.id+'btnClear',
//							    iconCls: 'icon-delete',
							    text: 'X',
							    margin: "0 2 0 0",
							    tooltip: 'Clear search box',
							    handler: function(){
							    	searchField.reset();
							    }
							}
							
				    ]
				});
//				this.currentPage = Ext.getCmp(this.pageFieldId).getValue();
				
				this.panel = Ext.create('Ext.panel.Panel', {
					id : this.panelId,
					//title : this.title,
					border:this.border,
				    width: this.width,
				    tbar : this.pagBar,
				    items: [pan]
				});
//				this.view.setHeight(this.panel.getHeight());
				
				var target = Ext.getCmp(this.targetId);
				if (target instanceof Ext.panel.Panel){
					target.insert(this.order, this.panel);
					//target.setActiveTab(1);//si no se pone el active da un error de EXT
					//target.setActiveTab(0);//si no se pone el active da un error de EXT
					//pan.setHeight = this.panel.getHeight();
				}else{
					this.panel.render(this.targetId);
				}
	}
};


/** Paging bar Events **/
//PagedViewListWidget.prototype.onPageChange = function (object, event, option){
//	this.changePage(Ext.getCmp(this.pageFieldId).getValue(), this.getData());
//};
//PagedViewListWidget.prototype.onPrevClick = function () {
//	this.changePage(this.currentPage - 1, this.getData());
//};
//PagedViewListWidget.prototype.onNextClick = function () {
//	this.changePage(this.currentPage + 1, this.getData());
//};
/** END Paging bar Events **/

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function UploadWidget (args){
	var _this=this;
	this.id = Utils.genId("uploadWidget");
	this.targetId = null;
	this.suiteId=null;
	
    if(typeof args !== 'undefined'){
        this.targetId = args.targetId || this.targetId;
        this.suiteId = args.suiteId || this.suiteId;
        this.opencgaBrowserWidget = args.opencgaBrowserWidget || this.opencgaBrowserWidget;
    }

	this.adapter = new OpencgaManager();
	this.adapter.onUploadObjectToBucket.addEventListener(function(sender,res){
		if(res.status == 'done'){

//            _this.adapter.onIndexer.addEventListener(function(sender,data){
//                console.log(data);
//                _this.uploadComplete(data);
//            });
//            _this.adapter.indexer($.cookie("bioinfo_account"),_this.objectID);
            console.log(_this.objectID);
			_this.uploadComplete(res.data);
		}else if (res.status == 'fail'){
			_this.uploadFailed(res.data);
		}
	});
	
	this.uploadButtonId = this.id+'_uploadButton';
	this.uploadFieldId = this.id+'_uploadField';
	
	this.selectedDataType = null;
}

//UploadWidget.prototype.getsdf = function(){
//	return this.id+'_uploadButton';
//};

UploadWidget.prototype = {
    getTypeValidation : function(types){
        return function(filename){
            var regex = new RegExp('^.*\\.('+types+')$', 'i');
            return regex.test(filename);
        }
    }
};


UploadWidget.prototype.draw = function(opencgaLocation){
	this.opencgaLocation = opencgaLocation;
	var dataTypes = {};
	dataTypes["9"]=[
		            { text: "ID List", children: [
		                { text: "SNP", tag:"idlist:snp"},//el tag es para introducirlo en la base de datos al subir los datos
		                { text: "Gene/Transcript",tag:"idlist:gene:transcript"}//si son varios van separados por ->  :
		            ] },
		            { text: "Feature", children: [
		                { text: "VCF 4.0", tag:"vcf", validate:this.getTypeValidation('vcf')},
//		                { text: "Tabix index", tag:"tbi"},
		                { text: "GFF2", tag:"gff2"},
		                { text: "GFF3", tag:"gff3"},
		                { text: "GTF", tag:"gtf"},
		                { text: "BED", tag:"bed"},
		                { text: "BAM", tag:"bam", validate:this.getTypeValidation('bam')},
		                { text: "BAI", tag:"bai", validate:this.getTypeValidation('bai')},
		                { text: "Expression", tag:"expression"}
		            ] }
		        ];
	dataTypes["6"]=[
		            { text: "Feature", children: [
		                { text: "VCF 4.0", tag:"vcf"},
		                { text: "GFF2", tag:"gff2"},
		                { text: "GFF3", tag:"gff3"},
		                { text: "GTF", tag:"gtf"},
		                { text: "BED", tag:"bed"}
		            ] }
		        ];
	dataTypes["11"]=[
	             {text : "Annotation", tag:"annotation"},
	             {text : "ID List", children : [ 
		         { text : "Gene",tag : "idlist:gene"	}, 
		         { text : "Ranked", tag : "ranked"	} 
		         ]
	} ];
	dataTypes["12"]=[
		             {text : "Abundances", tag:"abundances"}
		        ];
	dataTypes["100"]=[
		             {text : "Sequence", tag:"sequence"}
		        ];
    dataTypes["22"]=[
        {text : "Tabbed text file", tag:"txt", validate:this.getTypeValidation('txt|text')},
        {text : "CEL compressed file", tag:"cel", validate:this.getTypeValidation('zip|tar|tar.gz|tgz')}
    ];
	switch (this.suiteId){
		case 9: this.checkDataTypes(dataTypes["9"]); this.render(dataTypes["9"]); break;
		case 6: this.checkDataTypes(dataTypes["6"]); this.render(dataTypes["6"]); break;
		case 11: this.checkDataTypes(dataTypes["11"]); this.render(dataTypes["11"]); break;
		case 12: this.checkDataTypes(dataTypes["12"]); this.render(dataTypes["12"]); break;
		case 22: this.checkDataTypes(dataTypes["22"]); this.render(dataTypes["22"]); break;
		case 100: this.checkDataTypes(dataTypes["100"]); this.render(dataTypes["100"]); break;
		case -1: break;
		default: this.render([{text: "No data types defined"}]);		
	}
};

UploadWidget.prototype.clean = function (){
	if (this.panel != null){
		this.panel.destroy();
		delete this.panel;
		console.log(this.id+' PANEL DELETED');
	}
};

UploadWidget.prototype.checkDataTypes = function (dataTypes){
	for (var i = 0; i<dataTypes.length; i++){
		if(dataTypes[i]["children"]!=null){
			dataTypes[i]["iconCls"] ='icon-box';
			dataTypes[i]["expanded"] =true;
			this.checkDataTypes(dataTypes[i]["children"]);
		}else{
			dataTypes[i]["iconCls"] ='icon-blue-box';
			dataTypes[i]["leaf"]=true;
		}
	}
	
};

UploadWidget.prototype.render = function(dataTypes){
	var _this=this;
	if (this.panel == null){
		var store = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "Data type",
		        children: dataTypes
		    }
		});
		var height = Object.keys(store.tree.nodeHash).length*23;
		if (height<250){
				height=250;
		} 
		
		
		var pan1Width = 250;		
		var pan1 = Ext.create('Ext.tree.Panel', {
		    title: 'Select your data type',
		    bodyPadding:10,
		   	height : height,
		   	border:false,
		   	cls:'panel-border-right',
		   	width: pan1Width,
		    store: store,
		    useArrows: true,
		    rootVisible: false,
		    listeners : {
			    	scope: this,
			    	itemclick : function (este,record){
			    		if(record.data.leaf){
			    			this.selectedDataType = record.raw.tag;
			    			this.selectedDataTypeObj = record.raw;
			    			this.dataTypeLabel.setText('<span class="info">Type:</span><span class="ok"> OK </span>',false);
			    		}else{
			    			this.selectedDataType = null;
			    			this.selectedDataTypeObj = null;
			    			this.dataTypeLabel.setText('<span class="info">Select a data type</span><span class="err"> !!!</span>',false);
			    		}
			    		this.validate();
		    		}
			}
		});
		
		this.nameField = Ext.create('Ext.form.field.Text', {
	        name: 'datalabel',
	        fieldLabel: 'Data name',
	        labelWidth: 110,
	        msgTarget: 'side',
	        //allowBlank: false,
	        enableKeyEvents: true,
	        listeners: {
		        scope: this,
		        change: function(el) {
		        		if(el.getValue()!=""){
			        		this.dataNameLabel.setText('<span class="info">Name:</span><span class="ok"> OK </span>',false);			        			
		        		}else{
		        			this.dataNameLabel.setText('<span class="info">Enter the data name</span><span class="err"> !!!</span>',false);
		        		}
						this.validate();
		       	}
	        }
		});
		this.textArea = Ext.create('Ext.form.field.TextArea', {
			   name: 'datadescription',
			   fieldLabel: 'Data description',
			   labelWidth: 110,
			   msgTarget: 'side'
		});
		this.organizationField = Ext.create('Ext.form.field.Text', {
	        name: 'organization',
	        fieldLabel: 'Organization',
	        labelWidth: 110,
	        msgTarget: 'side'
		});
		this.responsableField = Ext.create('Ext.form.field.Text', {
	        name: 'responsable',
	        fieldLabel: 'Responsible',
	        labelWidth: 110,
	        msgTarget: 'side'
		});
		this.acquisitiondate = Ext.create('Ext.form.field.Text', {
	        name: 'acquisitiondate',
	        fieldLabel: 'Acquisition date',
	        labelWidth: 110,
	        msgTarget: 'side'
		});
		
		var pan2Width = 350;
		var pan2 = Ext.create('Ext.panel.Panel', {
			title: 'Some aditional data',
		    width: pan2Width,
		    border:false,
		    height : height,
		    bodyPadding: 15,
		    items: [this.nameField,this.textArea,this.organizationField,this.responsableField,this.acquisitiondate]
	
		});
				  
		this.dataTypeLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="info">Select a data type</span>'
		});
		this.dataNameLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="info">Enter the data name</span>'
		});
		this.dataFieldLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="info">Select a data file</span>'
		});		
		this.originCheck = Ext.create('Ext.form.field.Checkbox', {
			xtype:'checkbox',
			margin:'0 0 5 5',
			boxLabel : 'Text mode',
			listeners: {
			      scope: this,
			      change: function(){
			      		if(this.originCheck.getValue()){
			      			this.dataFieldLabel.setText('<span class="ok">'+this.editor.getValue().length+'</span><span class="info"> chars</span>',false);
							this.uploadBar.hide();
			      			this.editor.show();
			      			this.uploadField.destroy();
			      			this.uploadField.setRawValue(null);
			       		}else{
			       			this.dataFieldLabel.setText('<span class="info">Select a data file</span>',false);
			       			this.editor.hide();
							this.uploadBar.show();
			       			this.editor.setRawValue(null);
			       			this.createUploadField();
			       		}
			       		this.validate();
			       }
			}
		});		
		var uploadButton = Ext.create('Ext.button.Button', {
			 id:this.uploadButtonId,
			 text: 'Upload',
			 disabled:true,
			 handler: function() {
//				_this.uploadMsg =  Ext.Msg.show({
//					 closable:false,
//				     title:'Uploading file',
//				     msg: 'Please wait...'
//				});
				_this.uploadFile2();
	        }
		});
		
		
        
		this.editor = Ext.create('Ext.form.field.TextArea', {
       	 	xtype: 'textarea',
        	width: 602,
        	flex:1,
        	height: 100,
        	emptyText:'Paste or write your file directly',
        	hidden:true,
        	name: 'file',
        	margin:"-1",
        	enableKeyEvents:true,
        	listeners: {
			       scope: this,
			       change: function(){
			       			this.dataFieldLabel.setText('<span class="ok">'+this.editor.getValue().length+'</span> <span class="info"> chars</span>',false);
			       			this.validate();
			       }
			       
	        }
		});
		
		this.uploadBar = Ext.create('Ext.toolbar.Toolbar',{cls:"bio-border-false"});
		this.createUploadField();
		
		this.modebar = Ext.create('Ext.toolbar.Toolbar',{
			dock:'top',
			height:28,
			border:false,
			items:[this.originCheck,'->',this.dataTypeLabel,'-',/*this.dataNameLabel,'-',*/this.dataFieldLabel]
		});
		
		var pan3 = Ext.create('Ext.panel.Panel', {
			title: 'File origin',
		    colspan:2,
		    border:false,
		    width: pan1Width+pan2Width,
		    cls:'panel-border-top',
//		    bodyStyle:{"background-color":"#d3e1f1"}, 
		    items:[this.uploadBar,this.editor],
		    bbar:this.modebar
		});

		this.panel = Ext.create('Ext.window.Window', {
		    title: 'Upload a data file'+' -  <span class="err">ZIP files will be allowed shortly</span>',
		    iconCls:'icon-upload',
		    resizable: false,
//		    minimizable :true,
			constrain:true,
		    closable:false,
		    modal:true,
			layout: {
       			 		type: 'table',
       			 		columns: 2,
       			 		rows:2
    				},
		    items: [pan1,pan2,pan3],
		    buttonAlign:'right',
		    buttons : [{text:"Close",handler:function(){_this.panel.destroy();}}, uploadButton],
		    listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.destroy();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	        }
		});
		
	}
	this.panel.show();
};


UploadWidget.prototype.createUploadField = function()  {
	this.uploadField = Ext.create('Ext.form.field.File', {
			id:this.uploadFieldId,
			xtype: 'filefield',
			name: 'file',
	        flex:1,
	        padding:1,
	        msgTarget: 'side',
	        emptyText: 'Choose a file',
	        allowBlank: false,
	        anchor: '100%',
	        buttonText: 'Open file...',
	        listeners: {
			       scope: this,
			       change:  function() {
		             		this.fileSelected();
							this.validate();
			       }
	        }
        });
    this.uploadBar.add(this.uploadField);
};

UploadWidget.prototype.validate = function (){
//	console.log(this.selectedDataType != null);
//	console.log(this.nameField.getValue() !="");
//	console.log((this.uploadField.getRawValue()!="" || this.editor.getValue()!=""));

    var extensionValid = true;
    if(this.selectedDataTypeObj.validate != null){
        extensionValid = this.selectedDataTypeObj.validate(Ext.getCmp(this.uploadFieldId).getValue());
    }

    if (extensionValid && this.selectedDataType != null /*&& this.nameField.getValue() !=""*/ && (this.uploadField.getRawValue()!="" || this.editor.getValue()!="") ){
        Ext.getCmp(this.uploadButtonId).enable();
        this.dataTypeLabel.setText('<span class="info">Type:</span><span class="ok"> OK </span>',false);
    }else{
        Ext.getCmp(this.uploadButtonId).disable();
        this.dataTypeLabel.setText('<span class="info">Type:</span><span class="err"> Not valid </span>',false);
    }
};


UploadWidget.prototype.fileSelected = function (){
		var inputId=this.uploadField.fileInputEl.id;
        var file = document.getElementById(inputId).files[0];
        if (file) {
          var fileSize = 0;
          if (file.size > 1024 * 1024)
        	  fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
          else
        	  fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

           
          this.dataFieldLabel.setText('<span class="info">Size: </span><span class="ok">'+fileSize+'</span>',false);
//          document.getElementById('fileName').innerHTML = '<b>Name</b>: ' + file.name;
//          document.getElementById('fileSize').innerHTML = '<b>Size</b>: ' + fileSize;
//          document.getElementById('fileType').innerHTML = '<b>Type</b>: ' + file.type;
        }
};

UploadWidget.prototype.uploadFile = function()  {
	var _this=this;
	Ext.getBody().mask('Uploading file...');
	this.panel.disable();

    var fd = new FormData();
    var inputFileName = null;
    if(this.originCheck.getValue()){
    	inputFileName = this.nameField.getValue();
    	fd.append("file", this.editor.getValue());
    }else{
		var inputFile = document.getElementById(Ext.getCmp(this.uploadFieldId).fileInputEl.id).files[0];
		inputFileName = inputFile.name;
	    fd.append("file", inputFile);
    }
    var sessionId = $.cookie('bioinfo_sid');
    var objectId = this.opencgaLocation.directory+inputFileName;
    objectId = objectId.replace(new RegExp("/", "gi"),":");

   	fd.append("name", this.nameField.getValue()); 
   	fd.append("fileFormat", this.selectedDataType);
   	fd.append("responsible", this.responsableField.getValue());
   	fd.append("organization", this.organizationField.getValue());
   	fd.append("date", this.acquisitiondate.getValue());
   	fd.append("description", this.textArea.getValue());
   	fd.append("objectid", objectId);
   	fd.append("sessionid", sessionId);


    //TODO DELETE THIS
    this.objectID = this.opencgaLocation.bucketId+":"+objectId;

	//accountid, sessionId, projectname, formData
	this.adapter.uploadObjectToBucket($.cookie("bioinfo_account"), sessionId, this.opencgaLocation.bucketId, objectId, fd);
	
};

UploadWidget.prototype.uploadFile2 = function()  {
	var _this=this;

    var inputFile = document.getElementById(Ext.getCmp(this.uploadFieldId).fileInputEl.id).files[0];

    var objectId = this.opencgaLocation.directory+inputFile.name;
    objectId = objectId.replace(new RegExp("/", "gi"),":");

    var fileuploadWorker = new Worker(UPLOAD_WORKER);
    this.opencgaBrowserWidget.addUpload(inputFile, fileuploadWorker);
    fileuploadWorker.postMessage({
        'host':OPENCGA_HOST,
        'accountId': $.cookie("bioinfo_account"),
        'sessionId': $.cookie("bioinfo_sid"),
        'file' : inputFile,
        'objectId':objectId,
        'fileFormat': this.selectedDataType,
        'bucketId':this.opencgaLocation.bucketId,
        'resume' : true
    });
    this.panel.close();
};

//UploadWidget.prototype.uploadProgress = function(evt)  {
//	console.log("Progress...");
//    if (evt.lengthComputable) {
//      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
//  		console.log(percentComplete);
////      document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
//    }
//    else {
//    	console.log('unable to compute');
////      document.getElementById('progressNumber').innerHTML = 'unable to compute';
//    }
//};

UploadWidget.prototype.uploadComplete = function(response)  {
	/* This event is raised when the server send back a response */
//	this.dataFieldLabel.setText('<span class="info">Upload </span><span class="ok">finished successfully</span> '+response,false);
	var msg = "Uploaded sucessfully";
	if (response.indexOf("ERROR")!=-1){//el createErrorResponse devuelte la palabra error siempre o deberia
		msg = response;
	}
	Ext.Msg.show({
		title:'Upload status',
		msg: msg
	});
	this.panel.enable();
	Ext.getBody().unmask();
	if (msg == "Uploaded sucessfully"){
		this.panel.close();
	}
};

UploadWidget.prototype.uploadFailed = function(response)  {
	console.log(response);
	Ext.Msg.show({
		title:'Upload status',
		msg: 'There was an error attempting to upload the file.'
	});
//	alert("There was an error attempting to upload the file.");
	this.panel.enable();
	Ext.getBody().unmask();
};

UploadWidget.prototype.uploadCanceled = function(response)  {
	console.log(response);
	Ext.Msg.show({
		title:'Upload status',
		msg: 'The upload has been canceled by the user or the browser dropped the connection.'
	});
//	alert("The upload has been canceled by the user or the browser dropped the connection.");
	this.panel.enable();
	Ext.getBody().unmask();
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function LoginWidget (suiteId, args){
	var _this=this;
	this.id = "LoginWidget_";
	this.targetId = null;
	this.suiteId = suiteId;
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
    }

	/**Events i send**/
	this.onSessionInitiated = new Event(this);

	this.adapter = new OpencgaManager();
	
	/**Atach events i listen**/
	this.adapter.onLogin.addEventListener(function (sender, data){
        if(_this.panel != null){
		    _this.panel.setLoading(false);
        }
		console.log(data);
		if(data.errorMessage == null){
			$.cookie('bioinfo_sid', data.sessionId /*,{path: '/'}*/);//TODO ATENCION si se indica el path el 'bioinfo_sid' es comun entre dominios
			$.cookie('bioinfo_account', data.accountId);
			$.cookie('bioinfo_bucket', data.bucketId);
			_this.onSessionInitiated.notify();
		}else{
			Ext.getCmp(_this.labelEmailId).setText('<span class="err">'+data.errorMessage+'</span>', false);
			//Delete all cookies
			$.cookie('bioinfo_sid', null);
			$.cookie('bioinfo_sid', null, {path: '/'});
			$.cookie('bioinfo_account',null);
			$.cookie('bioinfo_account', null, {path: '/'});
		}
	});
	this.adapter.onCreateAccount.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
		data = data.replace(/^\s+|\s+$/g, '');
		if(data.indexOf("OK")!=-1){
			Ext.getCmp(_this.labelEmailId).setText('<span class="ok">Account created</span>', false);
//			console.log(_this.id+' LOGIN RESPONSE -> '+data);
			//$.cookie('bioinfo_sid', data /*,{path: '/'}*/);//TODO ATENCION si se indica el path el 'bioinfo_sid' es comun entre dominios
			//_this.onSessionInitiated.notify();
		}else{
			data = data.replace(/ERROR: /gi," ");
			Ext.getCmp(_this.labelEmailId).setText('<span class="err">Account already exists</span>', false);
			//Se borran las cookies por si acaso
			$.cookie('bioinfo_sid', null);
			$.cookie('bioinfo_sid', null, {path: '/'});
			$.cookie('bioinfo_account',null);
			$.cookie('bioinfo_account', null, {path: '/'});
		}
	});
	this.adapter.onResetPassword.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
		Ext.getCmp(_this.labelEmailId).setText('<span class="emph">'+data+'</span>', false);
	});
	
	
	
	/**ID**/
	this.labelEmailId = this.id+"labelEmail";
	this.labelPassId = this.id+"labelPass";
	 
	this.fldEmailId = this.id+"fldEmail";
	this.fldPasswordId = this.id+"fldPassword";
	this.fldNpass1Id = this.id+"fldNpass1";
	this.fldNpass2Id = this.id+"fldNpass2";
	
	this.btnSignId = this.id+"fldSign";
	this.btnAnonymousId = this.id+"btnAnonymous";
	this.btnForgotId =  this.id+"btnForgot";
	this.btnNewaccId =  this.id+"btnNewacc";
	
	this.btnSendId = this.id+"btnSend";
	this.btnBackId = this.id+"btnBack";
	
	this.btnRegisterId =  this.id+"btnRegister";
	
}

LoginWidget.prototype.sign = function (){
	if(Ext.getCmp(this.btnAnonymousId).getValue()){
        this.anonymousSign();
        this.panel.setLoading('Waiting server...');
	}else{
		if(this.checkAccountId()){
            this.adapter.login(this.getLogin(), this.getPassword(), this.suiteId );
			this.panel.setLoading('Waiting server...');
			$.cookie('bioinfo_user', this.getLogin(), {path:'/',expires: 7});
		}
	}
};

LoginWidget.prototype.anonymousSign = function (){
    this.adapter.login("anonymous", "", this.suiteId );
};

LoginWidget.prototype.register = function (){ 
	if(this.checkAccountId()  && this.checkemail() && this.checkName() && this.checkpass()){
		this.adapter.createAccount(this.getLogin(), this.getEmail(), this.getAccountName(),this.getPasswordReg(), this.suiteId );
	}else{
		Ext.getCmp(this.labelEmailId).setText('<span class="info">Fill all fields</span>', false);
	}
};

LoginWidget.prototype.sendRecover = function (){
	if(this.checkAccountId() && this.checkemail()){
		this.adapter.resetPassword(this.getLogin(), this.getEmail());
		this.panel.setLoading('Waiting server...');
	}
};

LoginWidget.prototype.getLogin = function (){
	return Ext.getCmp(this.id+"accountId").getValue();
};
LoginWidget.prototype.getAccountName = function (){
	return Ext.getCmp(this.id+"accountName").getValue();
};
LoginWidget.prototype.getEmail = function (){
	return Ext.getCmp(this.fldEmailId).getValue();
};

LoginWidget.prototype.getPassword = function (){
	return $.sha1(Ext.getCmp(this.fldPasswordId).getValue());
};

LoginWidget.prototype.getPasswordReg = function (){
	return $.sha1(Ext.getCmp(this.fldNpass1Id).getValue());
};

LoginWidget.prototype.draw = function (){
	this.render();		
};

LoginWidget.prototype.clean = function (){
	if (this.panel != null){
		this.panel.destroy();
	}
};

LoginWidget.prototype.render = function (){
	var _this=this;
	if (this.panel == null){
		
		var labelEmail = Ext.create('Ext.toolbar.TextItem', {
			id : this.labelEmailId,
			padding:3,
			text: '<span class="info">Type your account ID and password</span>'
		});
		this.pan = Ext.create('Ext.form.Panel', {
			id : this.id+"formPanel",
			bodyPadding:20,
		    width: 350,
		    height: 145,
		    border:false,
		    bbar:{items:[labelEmail]},
		    items: [{
		    	id: this.id+"accountId",
		    	xtype:'textfield',
		    	value:$.cookie('bioinfo_user'),
		        fieldLabel: 'account ID',
		        hidden: false,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkAccountId
			    }
		    },{
		    	id: this.fldPasswordId,
		    	xtype:'textfield',
		        fieldLabel: 'password',
		        inputType: 'password' ,
//		        emptyText:'please enter your password',
		        listeners:{
					specialkey: function(field, e){
                        console.log("asdf");
	                    if (e.getKey() == e.ENTER) {
	                    	_this.sign();
	                    }
	                }
				}
		    },{
		    	id: this.fldEmailId,
		    	xtype:'textfield',
		        fieldLabel: 'e-mail',
		        hidden: true,
//		        enableKeyEvents: true,
//		        emptyText:'please enter your email',
		        listeners: {
			        change: function(){
			        	_this.checkemail();
			        },
			        specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	_this.sign();
	                    }
	                }
			    }
		    },{
		    	id: this.id+"accountName",
		    	xtype:'textfield',
		        fieldLabel: 'name',
		        hidden: true,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkName
			    }
		    },{
		    	id: this.fldNpass1Id,
		    	xtype:'textfield',
		        fieldLabel: 'password',
		        inputType: 'password' ,
		        hidden: true,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkpass
			    }
		    },{
		    	id: this.fldNpass2Id,
		    	xtype:'textfield',
		        fieldLabel: 're-password',
		        inputType: 'password' ,
		        hidden: true,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkpass
			    }
		    },{
		    	id: this.btnAnonymousId,
		    	xtype:'checkboxfield',
		    	padding:"10 0 0 0",
		    	boxLabel:'Anonymous login <p class="tip s90">Your work will be lost after logout</p>',
		    	margin:"0 0 0 50",
		    	listeners:{
					change:function(me, newValue, oldValue, eOpts){
						if(newValue){
							Ext.getCmp(_this.id+"accountId").disable();
							Ext.getCmp(_this.fldPasswordId).disable();
						}else{
							Ext.getCmp(_this.id+"accountId").enable();
							Ext.getCmp(_this.fldPasswordId).enable();
						}
					}
				}
		    }
		    ]
		});
		
		this.panel = Ext.create('Ext.window.Window', {
			id : this.id+"windowPanel",
		    title: 'Sign in',
		    resizable: false,
		    minimizable :true,
			constrain:true,
		    closable:true,
		    modal:true,
		    items:[this.pan],
		    buttonAlign:'center',
		    buttons:[{
		    	id: this.btnSignId,
		    	text:'Sign in'
		    },{
		    	id: this.btnForgotId,
		    	text:'Forgot yout password?',
		    	width:130,
		    	minWidth:130
		    },{
		    	id: this.btnNewaccId,
		    	text:'New account',
		    	width:100,
		    	minWidth:100
		    },{
				id : this.btnSendId,
				text:'Send',	
				hidden: true
			},{ 
				id : this.btnRegisterId,
				text:'Register',
				hidden: true
			},{ 
				id : this.btnBackId,
				text:'Back',
				hidden: true
			}
		    ],
		    listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.hide();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	        }
		});
		
		Ext.getCmp(this.btnForgotId).on('click', this.ShowForgot, this);
		Ext.getCmp(this.btnBackId).on('click', this.ShowBack, this);
		Ext.getCmp(this.btnNewaccId).on('click', this.ShowNewacc, this);
		
		Ext.getCmp(this.btnSignId).on('click', this.sign, this);
		Ext.getCmp(this.btnSendId).on('click', this.sendRecover, this);
		Ext.getCmp(this.btnRegisterId).on('click', this.register, this);
		Ext.getCmp(this.btnAnonymousId).on('change', this.anonymousSelected, this);
	}
	this.panel.show();
};

LoginWidget.prototype.ShowForgot = function (){
	Ext.getCmp(this.fldEmailId).reset();
	Ext.getCmp(this.fldEmailId).show();
	Ext.getCmp(this.fldPasswordId).reset();
	Ext.getCmp(this.btnAnonymousId).reset();
	Ext.getCmp(this.fldNpass1Id).reset();
	Ext.getCmp(this.fldNpass2Id).reset();
	
	Ext.getCmp(this.fldPasswordId).hide();
	Ext.getCmp(this.btnAnonymousId).hide();
	Ext.getCmp(this.fldNpass1Id).hide();
	Ext.getCmp(this.fldNpass2Id).hide();
	
	Ext.getCmp(this.btnSignId).hide();
	Ext.getCmp(this.btnForgotId).hide();
	Ext.getCmp(this.btnNewaccId).hide();
	
	Ext.getCmp(this.btnSendId).show();
	Ext.getCmp(this.btnBackId).show();
	Ext.getCmp(this.btnRegisterId).hide();

	Ext.getCmp(this.id+"accountId").reset();
	Ext.getCmp(this.id+"accountName").hide();
	
	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your account ID and email to send a new password</span>', false);
	Ext.getCmp(this.id+"formPanel").setHeight(145);

	Ext.getCmp(this.id+"accountId").setFieldLabel('account ID', false);
	Ext.getCmp(this.fldEmailId).setFieldLabel('e-mail', false);
};
LoginWidget.prototype.ShowBack = function (){
	Ext.getCmp(this.fldEmailId).hide();
	Ext.getCmp(this.fldPasswordId).reset();
	Ext.getCmp(this.btnAnonymousId).reset();
	Ext.getCmp(this.fldNpass1Id).reset();
	Ext.getCmp(this.fldNpass2Id).reset();
	
	Ext.getCmp(this.fldPasswordId).show();
	Ext.getCmp(this.btnAnonymousId).show();
	Ext.getCmp(this.fldNpass1Id).hide();
	Ext.getCmp(this.fldNpass2Id).hide();
	
	Ext.getCmp(this.btnSignId).show();
	Ext.getCmp(this.btnForgotId).show();
	Ext.getCmp(this.btnNewaccId).show();
	
	Ext.getCmp(this.btnSendId).hide();
	Ext.getCmp(this.btnBackId).hide();
	Ext.getCmp(this.btnRegisterId).hide();

	Ext.getCmp(this.id+"accountId").reset();
	Ext.getCmp(this.id+"accountName").hide();

	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your account ID and password</span>', false);
	Ext.getCmp(this.id+"formPanel").setHeight(145);

	Ext.getCmp(this.id+"accountId").setFieldLabel('account ID', false);
};
LoginWidget.prototype.ShowNewacc = function (){
	
	Ext.getCmp(this.fldEmailId).reset();
	Ext.getCmp(this.fldEmailId).show();
	Ext.getCmp(this.fldPasswordId).reset();
	Ext.getCmp(this.btnAnonymousId).reset();
	Ext.getCmp(this.fldNpass1Id).reset();
	Ext.getCmp(this.fldNpass2Id).reset();
	
	Ext.getCmp(this.fldPasswordId).hide();
	Ext.getCmp(this.btnAnonymousId).hide();
	Ext.getCmp(this.fldNpass1Id).show();
	Ext.getCmp(this.fldNpass2Id).show();
	
	Ext.getCmp(this.btnSignId).hide();
	Ext.getCmp(this.btnForgotId).hide();
	Ext.getCmp(this.btnNewaccId).hide();
	
	Ext.getCmp(this.btnSendId).hide();
	Ext.getCmp(this.btnBackId).show();
	Ext.getCmp(this.btnRegisterId).show();

	Ext.getCmp(this.id+"accountId").reset();
	Ext.getCmp(this.id+"accountName").reset();
	Ext.getCmp(this.id+"accountName").show();
	
	Ext.getCmp(this.labelEmailId).setText('&nbsp;', false);
	Ext.getCmp(this.id+"formPanel").setHeight(200);
	
	Ext.getCmp(this.id+"accountName").setFieldLabel('name', false);
	Ext.getCmp(this.id+"accountId").setFieldLabel('account ID', false);
	Ext.getCmp(this.fldEmailId).setFieldLabel('e-mail', false);
	Ext.getCmp(this.fldNpass1Id).setFieldLabel('password', false);
	Ext.getCmp(this.fldNpass2Id).setFieldLabel('re-password', false);
	Ext.getCmp(this.id+"accountId").setValue("");
};

LoginWidget.prototype.checkpass = function (){
	var passwd1 = Ext.getCmp(this.fldNpass1Id).getValue();
	var passwd2 = Ext.getCmp(this.fldNpass2Id).getValue();
	var patt = new RegExp("[ *]");
	
		if(!patt.test(passwd1) && passwd1.length > 3){
			if (passwd1 == passwd2){
				Ext.getCmp(this.fldNpass1Id).setFieldLabel('<span class="ok">password</span>', false);
				Ext.getCmp(this.fldNpass2Id).setFieldLabel('<span class="ok">re-password</span>', false);
				Ext.getCmp(this.labelEmailId).setText('&nbsp;', false);
				return true;
			}else{
				Ext.getCmp(this.fldNpass1Id).setFieldLabel('<span class="err">password</span>', false);
				Ext.getCmp(this.fldNpass2Id).setFieldLabel('<span class="err">re-password</span>', false);
				Ext.getCmp(this.labelEmailId).setText('<span class="err">Password does not match</span>', false);
				return false;
			}
		}else{
			Ext.getCmp(this.fldNpass1Id).setFieldLabel('<span class="err">password</span>', false);
			Ext.getCmp(this.fldNpass2Id).setFieldLabel('<span class="err">re-password</span>', false);
			Ext.getCmp(this.labelEmailId).setText('<span class="err">Password minimum length is 4</span>', false);
			return false;
		}
};

LoginWidget.prototype.anonymousSelected = function (este,value){ 
	if(value){
		Ext.getCmp(this.labelEmailId).setText('<span class="ok">Anonymous selected</span>', false);
	}else{
		Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your account ID and password</span>', false);
	}
	
};

LoginWidget.prototype.checkemail = function (a,b,c){
	Ext.getCmp(this.btnAnonymousId).reset();
	var email = Ext.getCmp(this.fldEmailId).getValue();
	var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (patt.test(email)){
        Ext.getCmp(this.fldEmailId).setFieldLabel('<span class="ok">e-mail</span>', false);
        return true;
    }else{
        Ext.getCmp(this.fldEmailId).setFieldLabel('<span class="err">e-mail</span>', false);
        return false;
    }
};
LoginWidget.prototype.checkName = function (a,b,c){
	var name = Ext.getCmp(this.id+"accountName").getValue();
	if(name!="" && name!=null){
		Ext.getCmp(this.id+"accountName").setFieldLabel('<span class="ok">name</span>', false);
		return true;
	}else{
		Ext.getCmp(this.id+"accountName").setFieldLabel('<span class="err">name</span>', false);
		return false;
	}
};
LoginWidget.prototype.checkAccountId = function (a,b,c){
	var accountId = Ext.getCmp(this.id+"accountId").getValue();
	if(accountId!="" && accountId!=null){
		Ext.getCmp(this.id+"accountId").setFieldLabel('<span class="ok">account ID</span>', false);
		return true;
	}else{
		Ext.getCmp(this.id+"accountId").setFieldLabel('<span class="err">account ID</span>', false);
		return false;
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ProfileWidget(args){
	var _this=this;
	this.id = "EditUserWidget_"+ Math.round(Math.random()*10000);
	this.targetId = null;

    if(typeof args != 'undefined'){
        this.targetId = args.targetId || this.targetId;
    }

	this.adapter = new OpencgaManager();
	
	this.adapter.onChangePassword.addEventListener(function (sender, data){
			_this.panel.setLoading(false);
			if(data.indexOf("ERROR")==-1){
				Ext.getCmp(_this.id+'fldOld').setValue(null);
				Ext.getCmp(_this.id+'fldNew1').setValue(null);
				Ext.getCmp(_this.id+'fldNew2').setValue(null);
			}
            Ext.getCmp(_this.id+'labelPass').setText('<span class="info">'+data+'</span>', false);
	});
	this.adapter.onChangeEmail.addEventListener(function (sender, data){
			_this.panel.setLoading(false);
			if(data.indexOf("ERROR")==-1){
				Ext.getCmp(_this.id+'fldEmail').setValue(null);
				Ext.getCmp(_this.id+'fldEmail').setFieldLabel('e-mail', false);
			}
            Ext.getCmp(_this.id+'labelPass').setText('<span class="info">'+data+'</span>', false);
	});
}

ProfileWidget.prototype = {
    getOldPassword : function (){
        return $.sha1(Ext.getCmp(this.id+'fldOld').getValue());
    },
    getNewPassword : function (){
        return $.sha1(Ext.getCmp(this.id+'fldNew1').getValue());
    },
    getLogin : function (){
        return Ext.getCmp(this.id+'fldEmail').getValue();
    },
    clearAllFields:function(){
        Ext.getCmp(this.id+'fldOld').setValue(null);
        Ext.getCmp(this.id+'fldNew1').setValue(null);
        Ext.getCmp(this.id+'fldNew2').setValue(null);
        Ext.getCmp(this.id+'fldEmail').setValue(null);
        Ext.getCmp(this.id+'labelPass').setText('&nbsp', false);
    },
    changeEmail : function (){
        if(this.checkemail()){
            this.adapter.changeEmail($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), this.getLogin());
            this.panel.setLoading('Waiting for the server to respond...');
        }
    },
    changePassword : function (){
        if(this.checkpass()){
            this.adapter.changePassword($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), this.getOldPassword(), this.getNewPassword(), this.getNewPassword());
            this.panel.setLoading('Waiting for the server to respond...');
        }
    },
    draw : function (){
        this.render();
    },
    clean : function (){
        if (this.panel != null){
            this.panel.destroy();
            delete this.panel;
            console.log(this.id+' PANEL DELETED');
        }
    },
    render : function (){
        var _this=this;
        if (this.panel == null){
            console.log(this.id+' CREATING PANEL');

            var labelPass = Ext.create('Ext.toolbar.TextItem', {
                id : this.id+'labelPass',
                padding:3,
                text:'&nbsp'
            });
            var changePasswordForm = Ext.create('Ext.form.Panel', {
                title:'Change password',
                bodyPadding:15,
                width: 350,
                height:155,
                border:false,
                items: [{
                    id:this.id+"fldOld",
                    name: 'password',
                    xtype:'textfield',
                    fieldLabel: 'Old password',
                    inputType: 'password'
                },{
                    id:this.id+"fldNew1",
                    name: 'new_password1',
                    xtype:'textfield',
                    fieldLabel: 'New password',
                    inputType: 'password' ,
//		        enableKeyEvents: true,
                    listeners: {
                        scope: this,
                        change: this.checkpass
                    }
                },{
                    id:this.id+"fldNew2",
                    name: 'new_password2',
                    xtype:'textfield',
                    fieldLabel: 'Confirm new',
                    inputType: 'password' ,
//		        enableKeyEvents: true,
                    listeners: {
                        scope: this,
                        change: this.checkpass
                    }
                },{
                    xtype:'button',
                    text:'Change',margin:'0 0 0 105',
                    handler:function(){
                        _this.changePassword();
                    }
                }
                ]
            });
            var changeEmailForm = Ext.create('Ext.form.Panel', {
                title:'Change email',
                bodyPadding:15,
                width: 350,
                height:155,
                border:false,
                items: [{
                    id:this.id+"fldEmail",
                    name: 'new_email',
                    xtype:'textfield',
                    fieldLabel: 'e-mail',
//		        enableKeyEvents: true,
//		        emptyText:'please enter your email',
                    listeners: {
                        change: function(){
                            _this.checkemail();
                        }
                    }
                },{
                    xtype:'button',
                    text:'Change',margin:'0 0 0 105',
                    handler:function(){
                        _this.changeEmail();
                    }
                }
                ]
            });
            var profileTabPanel = Ext.create('Ext.tab.Panel', {
                width: 350,
                height:175,
                border:false,
                bbar:{items:[labelPass]},
                items: [changePasswordForm,changeEmailForm],
                listeners:{
                    tabchange:function(){
                        _this.clearAllFields();
                    }
                }
            });
            this.panel = Ext.create('Ext.window.Window', {
                title: 'Profile',
                resizable: false,
                minimizable :true,
                constrain:true,
                closable:true,
                modal:true,
                items:[profileTabPanel],
                buttonAlign:'center',
                buttons:[{
                    text:'Close',handler:function(){_this.panel.close();}
                }],
                listeners: {
                    scope: this,
                    minimize:function(){
                        this.panel.hide();
                    },
                    destroy: function(){
                        delete this.panel;
                    }
                }
            });
        }
        this.panel.show();
    },
    checkpass : function (){
        var passwd1 = Ext.getCmp(this.id+'fldNew1').getValue();
        var passwd2 = Ext.getCmp(this.id+'fldNew2').getValue();
        var oldPass = Ext.getCmp(this.id+'fldOld').getValue();
        var patt = new RegExp("[ *]");

        if(oldPass != ''){
            if(!patt.test(passwd1) && passwd1.length > 3){
                if (passwd1 == passwd2){
                    Ext.getCmp(this.id+'labelPass').setText('<p class="ok">Passwords match</p>', false);
                    return true;
                }else{
                    Ext.getCmp(this.id+'labelPass').setText('<p class="err">Passwords does not match</p>', false);
                    return false;
                }
            }else{
                Ext.getCmp(this.id+'labelPass').setText('<p class="err">Password must be at least 4 characters</p>', false);
                return false;
            }
        }else{
            Ext.getCmp(this.id+'labelPass').setText('<p class="err">Old password is empty</p>', false);
            return false;
        }

    },
    checkemail : function (){
        var email = Ext.getCmp(this.id+'fldEmail').getValue();
        var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (patt.test(email)){
            Ext.getCmp(this.id+'fldEmail').setFieldLabel('<span class="ok">e-mail</span>', false);
            return true;
        }else{
            Ext.getCmp(this.id+'fldEmail').setFieldLabel('<span class="err">e-mail</span>', false);
            if(email==''){
                Ext.getCmp(this.id+'fldEmail').setFieldLabel('e-mail', false);
            }
            return false;
        }
    }
};


/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ResultWidget(args){
	var _this = this;
	this.id = "ResultWidget"+ Math.round(Math.random()*10000);
	this.targetId = null;
	
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
		if (args.application!= null){
        	this.application = args.application;       
        }
		if (args.app!= null){
        	this.app = args.app;       
        }
    }
	
	this.adapter = new OpencgaManager();
	
	this.adapter.onJobResult.addEventListener(function (sender, data){
//		console.log(data);
		_this.data = JSON.parse(data);
		Ext.getBody().unmask();
		_this.panel.setLoading(false);
		_this.render();
	});

	this.panelId=null;
	this.networkViewerId = null;
	this.genomeMapsId = null;
	
	this.resultTables = new Object();
	this.resultHistograms = new Object();
	this.resultGCharts = new Object();
	this.variantFiles = new Object();
	
//	this.onRendered = new Event();
	
	this.onViewRendered = new Event();
	this.onViewRendered.addEventListener(function (sender, targetId){
		_this.drawTables();
		_this.drawHistograms();
		_this.drawGCharts();
		_this.drawApplicationItems();
	});
};

ResultWidget.prototype.draw = function (sid, record){
//	console.log(record.data);
	this.record = record;
	this.jobId = this.record.data.id;
	this.id = this.jobId+this.id;
	this.panelId = "ResultWidget_"+this.jobId;
	this.networkViewerId = this.panelId+"_CellBrowserId";
	this.genomeMapsId = this.panelId+"_GenomeMapsId";
	
	
		this.panel = Ext.getCmp(this.panelId);
		if(this.panel==null){
			this.panel = Ext.create('Ext.panel.Panel', {
				id :this.panelId,
				border: 0,
			    title: this.record.data.name,
			    closable:true,
			    autoScroll:true
		//		html: this.tpl.applyTemplate(outputItems)
			});
			
			Ext.getCmp(this.targetId).add(this.panel);
			Ext.getCmp(this.targetId).setActiveTab(this.panel);
			this.panel.setLoading("Loading job info...");
			Ext.getBody().mask();
			
			//this.adapter.jobResult(this.jobId, "json", sid);
			//accountId, sessionId, bucketname, jobId, format
			this.adapter.jobResult($.cookie("bioinfo_account"), sid, this.jobId, "json");
			//this.adapter.jobResult(this.jobId, "json", sid);
		}else{
//			this.panel.setLoading(false);
			Ext.getCmp(this.targetId).setActiveTab(this.panel);
		}
};

ResultWidget.prototype.render = function (){
	var _this=this;
	
	console.log(this.application);
	debugger
		if(this.data.outputItems.length != 0){
			
			var outputItems = this.data.inputItems.concat(this.data.outputItems);
			
			//obtener todos los grupos quitando los repetidos
			var obj = {};
			for(var i = 0; i < outputItems.length; i++){
				var group = outputItems[i].group;
				
				if(group != "" ){ //no meter items con grupo distinto a ""
					if(group.indexOf(".")!=-1){//comprobar si alguno tiene un subgrupo
						var parent_group = group.split(".")[0];
						var sub_group = group.split(".")[1];
						if(obj[parent_group]==null) {
							obj[parent_group]={};
						}
						if(obj[parent_group][sub_group]==null){
							obj[parent_group][sub_group]=[];
						}
						
						//ESTE if quita los resultados para los pvalue = 0.005, 0.01, 0.1, deja solo los 0.05
						if(this.checkPValue(outputItems[i].title)){
							obj[parent_group][sub_group].push(outputItems[i]);
						}
					}else {
						if(obj[group]==null){
							obj[group]={};
							obj[group]["items"]=[];
						}
						
						//QUITAR la cadena de texto ${pvalue} si existe y la sustituye por 0.05
						this.renamePValue(outputItems[i]);
						obj[group]["items"].push(outputItems[i]);			
					}
					

				}
			}

			if(this.application == 'renato' || this.application == 'variant'){
				obj["Interactive Results"]={items:[]};
			}
			console.log(obj);
			
			var topLink = Ext.create('Ext.container.Container', {html:'<a name="'+this.jobId+'top"></a>'});
			var info = Ext.create('Ext.container.Container', {
				margin: "15 0 5 15",
				html:'<p >The job named <span class="info">'+this.record.data.name+' </span>'+
				'was launched on <span class="err">'+this.record.data.date+' </span>'+
				//'and has been visited <span class="dis">'+this.record.data.visites+' times</span></p>'+
				//'You can download the job results by pressing the <b>download</b> button.'
				'<br>'
			});
			
			var result = [];
			//Solo grupos juntos al principio
			var i=1;
			for (key in obj){
				var groupId = this.jobId+key.replace(/\s/g, '_')+"group";
				var groupBox = Ext.create('Ext.container.Container', {
					padding:"0 0 2 15",
					width:(key.length*14),
					//html:'<p class="s110 emph">'+i+'. <a href="#'+key+'">'+key+'</a></p>'
					groupId:groupId,
					html:'<span class="s110 emph">'+i+'. '+key+'</span>',
					listeners:{
						afterrender:function(){
							this.getEl().addClsOnOver("ssel u");
							this.getEl().addCls("dedo");
							var groupId = this.groupId;
							//inlineblock
							this.getEl().on("click",function(){
								var pos = $('#'+groupId).position().top;
								$(_this.panel.getEl().dom).children().scrollTop(pos);
							});
						}
					}
				});
				result.push(groupBox);
				i++;
			}
			
			//Grupos con resultados a continuacion
			var i=1;
			for (key in obj){
				//Grupo
				var infoId = (this.jobId+key+"info").replace(/ /gi, "");
				var groupId = this.jobId+key.replace(/\s/g, '_')+"group";
				var groupBox = Ext.create('Ext.container.Container', {
					infoId:infoId,
					groupName:key,
					padding:"60 15 5 15",
					//html:'<p class="panel-border-bottom"><span class="s140 emph">'+i+'. <a name="'+key+'" href="#'+this.jobId+'top">'+key+'</a>'+
						//' </span><span class="info" id="'+infoId+'"></span></p>',
					html:'<p id="'+groupId+'" class="panel-border-bottom"><span class="s140 emph">'+i+'. '+key+' &nbsp;&nbsp; &uarr;'+
						' </span><span class="info" id="'+infoId+'"></span></p>',
					listeners:{
						afterrender:function(){
							this.getEl().addClsOnOver("ssel");
							this.getEl().addCls("dedo");
							this.getEl().on("click",function(){
								$(_this.panel.getEl().dom).children().scrollTop(0);
							});
							
							var text = _this.getInfo(this.groupName);
							if(text!=""){
								$("#"+this.infoId).html("+info");
								var infoTip = Ext.create('Ext.tip.Tip',{
									html:text,
									listeners:{
										show:function(){
											var este = this;
											this.getEl().on("mouseleave",function(){
												este.hide();
											});
										}
									}
								});
								$("#"+this.infoId).mouseover(function(ev){
									$(this).css({cursor:"pointer"});
									infoTip.showAt(ev.clientX,ev.clientY);
								});
								$("#"+this.infoId).click(function(){
									infoTip.hide();
								});
							}
							
						}
					}
					
				});
				result.push(groupBox);
				
				//Resultados - se le pasa el array de items
				result.push(this.getResults(obj[key].items));
				
				//Comprobamos si tiene subgrupos 1 - nivel solo
				var c = 1;
				for(clave in obj[key]){
					if (clave != "items"){
						//Grupo
						var groupBox = Ext.create('Ext.container.Container', {
							padding:"15 15 5 30",
							cls:"inlineblock",
							html:'<p class="panel-border-bottom s120 emph">'+i+'.'+c+' '+clave+'</p>'
						});
						//si la clave es Your annotation tratarlo de otra manera... para mas adelante
//						console.log(clave)
						result.push(groupBox);
						
//						debugger
						//Resultados - se le pasa el array de items
						result.push(this.getResults(obj[key][clave]));
					c++;
					}
				}//subgrupos
				i++;
			}
			
			
			var downloadButton = Ext.create('Ext.button.Button', {
				 text: 'Download',
				 margin: "0 0 25 15",
				 handler: function (){
					 _this.adapter.download(_this.jobId, $.cookie('bioinfo_sid'));
				 }
			});
			

			var deleteJobButton = Ext.create('Ext.button.Button', {
				 text: 'Delete',
				 margin: "0 0 25 30",
				 handler: function (){
					 Ext.Msg.confirm("Delete job", "Are you sure you want to delete this job?", function (btnClicked){
//						 console.log(btnClicked);
						 if(btnClicked == "yes") {
							 _this.adapter.onDeleteJob.addEventListener(function (sender, data){
								 var msg = "";
								 if(data.response.indexOf("OK") != -1) {
									 Ext.getCmp(_this.targetId).getActiveTab().close();
									 msg = "The job has been succesfully deleted.";
								 }
								 else {
									 msg = "ERROR: could not delete job.";
								 }
								 Ext.Msg.alert("Delete job", msg);
							 });
//							 console.log("Job id: "+_this.jobId+" Cookie: "+$.cookie('bioinfo_sid'));
							 _this.adapter.deleteJob(_this.jobId, $.cookie('bioinfo_sid'));
						 }
					 });
				 }
			});


			this.panel.add(topLink);
			this.panel.add(info);
			//this.panel.add(downloadButton);
			//this.panel.add(deleteJobButton);
			this.panel.add(result);

			_this.onViewRendered.notify();			

		}//else
};


ResultWidget.prototype.getResults = function (items){
	//Resultados
	var boxes = [];
	for (var j = 0; j < items.length; j++){
		var item = items[j];
		
		//Obtener el container con el resultado
		var itemBox = this.showInfo(item);
		boxes.push(itemBox);
		
		//Añadir el container para resultados adicionales segun el type y el tag si procede
		var container = this.showTypeInfo(item);
		if(container){
			boxes.push(container);
		}
		var container = this.showTagInfo(item);
		if(container!=null){
			boxes.push(container);
		}
	}
	var itemsBox = Ext.create('Ext.container.Container', {
		layout: {type: 'table',columns: 1, tableAttrs: {style: {width: '100%'}}},					       
		items:boxes
	});
	return itemsBox;
};


ResultWidget.prototype.showInfo = function (item){
	var _this=this;
	
	
	var itemTpl = new Ext.XTemplate(
//			'<tpl for="tags">',
//			'<span class="ok">{.} </span>:: ',
//			'</tpl>',
//			'<span class="err">{type} </span>',
			'<span class="key">{title} </span>',
			'<span class="{[ this.setCSS(values) ]}">{value}</span><br>'
	,
	{
	 // XTemplate configuration:
	disableFormats: true,
    // member functions:
	setCSS: function(item){
    	switch(item.type){
    		case 'FILE':
			return 'file';
			break;
			case 'MESSAGE':
				//Setting species code 
				if (item.name == "species"){
					_this.species=item.value;
				}
			return 'message';
			break;
    	}
    }
    
	});
	//fin template
	
	return itemBox = Ext.create('Ext.container.Container', {
		data:item,
		datos:item,
		margin:"0 10 0 20",
		padding:5,
		tpl:itemTpl,
		cls:"inlineblock",
		listeners:{
			afterrender:function(){
				var datos = this.datos;
				if(this.datos.type == 'FILE'){
					this.getEl().addClsOnOver("encima");
					this.getEl().addCls("whiteborder");
					
	    			if(_this.application=="variant" && datos.title.toLowerCase().indexOf("filter")!=-1){
	    				_this.filteredVcfFile=datos.value;
	    			}
					
	    			this.getEl().on("click",function(){
	    				console.log(datos);
	    				var value = datos.value.trim();
		    			_this.adapter.poll($.cookie('bioinfo_account'),$.cookie('bioinfo_sid'), _this.jobId, value, true);
	    			});
	    		}
			}
		}
	});
};


ResultWidget.prototype.showTypeInfo = function (item){
	var _this=this;
	var box = Ext.create('Ext.container.Container',{
		margin:"0 10 0 10",
		padding:5
	});
	switch(item.type){
		case 'IMAGE':
				/*width="400" height="200" */
			var filename = item.value.trim();
			box.html =  '<div><img src="'+_this.adapter.pollurl($.cookie('bioinfo_account'),$.cookie('bioinfo_sid'), _this.jobId,filename)+'"></div>';
			return box;
		break;
		default: return null;
	}
};

ResultWidget.prototype.showTagInfo = function (item){
	var _this=this;
	var box = Ext.create('Ext.container.Container',{
		margin:"0 10 0 10",
		flex:1,
		padding:5,
		html:""
	});
	for(var i = 0; i < item.tags.length ; i++){
    	switch(item.tags[i]){
    		case 'TABLE':
        		var value = item.value.trim();
        		var id = _this.jobId+value+item.tags;
				_this.resultTables[id] =  new ResultTable (_this.jobId, value, item.tags,{targetId:'resultTable_'+id});
//							_this.resultTables[id].onRendered.
				box.html +=  '<div id="resultTable_'+id+'" style="padding:5px;"></div>';
				return box;
			break;
    		case 'HISTOGRAM':
    			var id = "histogram_"+_this.jobId+item.value+item.tags;
    			_this.resultHistograms[id] = item.value;
    			box.html =  '<div id="'+id+'" style="padding:5px;"></div>';
    			return box;
			break;
    		case 'GCHART':
    			var id = 'gchart_'+item.name;
    			_this.resultGCharts[id] = item.value;
    			box.html =  '<div id="'+id+'"></div>';
    			return box;
    		break;
    		case 'CONSEQUENCE_TYPE_VARIANTS':
    			this.variantFiles[item.name] = item.title;
    		break;
    	}
	}
	return null;
};

ResultWidget.prototype.drawTables = function (){
//	console.log(this.resultTables);
	for(id in this.resultTables){
		this.resultTables[id].draw();
	}	
};

ResultWidget.prototype.drawHistograms = function (){
	//se dibujan todas las tablas
//	console.log(this.resultHistograms);
	for(id in this.resultHistograms){
		
		var adapterPoll = new OpencgaManager();
		adapterPoll.onPoll.addEventListener(function(sender,data){
			if(data!=""){
				var lines = data.split("\n");
				var fields=[];
				var names=[];
				var values=[];
				var normValues=[];
				var total = 0;
				for ( var i = 0; i < lines.length; i++) {
					fields.push(lines[i].split("\t"));
					if(fields[i][0]!=""){
						names.push(fields[i][0]);
					}
					if(fields[i][1]!=null){
						total = total + parseFloat(fields[i][1]);
						values.push(fields[i][1]);
					}
				}
				for ( var i = 0; i < values.length; i++) {
					normValues.push(Math.round(parseFloat(values[i])/total*100));
				}
				names = names.toString().replace(/,/gi,"|");
				var img = '<img src="https://chart.googleapis.com/chart?cht=p&chs=600x300&chd=t:'+normValues+'&chl='+names+'&chtt=Consequence+types&chts=000000,14.5">';
				document.getElementById(id).innerHTML=img;
			}
		});
		
		//adapterPoll.poll(this.jobId,this.resultHistograms[id],false,$.cookie('bioinfo_sid'));
		adapterPoll.poll($.cookie("bioinfo_account"), $.cookie('bioinfo_sid'), this.jobId, this.resultHistograms[id], false);
	}	
};
ResultWidget.prototype.drawGCharts = function (){
	for(id in this.resultGCharts){
		drawChart(id, this.resultGCharts[id]);
	}
};

ResultWidget.prototype.drawApplicationItems  = function (){
	var _this=this;
	var viewerContainer = Ext.create('Ext.container.Container', {
		id:this.application+this.id+"Container",
		border: true,
		margin:"50 50 0 50",
		html:'<div class="greyborder" id="'+this.id+'Container"></div><div style="height:40px"></div>'
	});
		
	switch (this.application){
	case "variant":
		viewerContainer.on("afterrender",function(){
			_this.createGenomeViewer(_this.id+"Container");
		});
		break;
	case "renato":
		//***********bar
		var pbar = Ext.create('Ext.ProgressBar', {id:this.id+'pbar',margin:"5 0 0 50",width: 500});
		// Wait for 5 seconds, then update the status el (progress bar will auto-reset)
		pbar.wait({
			interval: 500, //bar will move fast!
			duration: 50000,
			increment: 15,
			text: 'Getting database information and drawing the network, please wait...',
			scope: this,
			fn: function(){
				pbar.updateText('Done!');
			}
		});
		//Add de bar to the main panel
		this.panel.add(pbar);
		/*************************/
		viewerContainer.on("afterrender",function(){
			_this.createCellBrowser(_this.id+"Container");
		});
		break;
	
	default: return null;
	}
		
	this.panel.add(viewerContainer);
};


ResultWidget.prototype.createGenomeViewer = function (targetId){
	var _this = this;

	var width = Ext.getCmp(this.application+targetId).getWidth();
	var height = Ext.getCmp(this.application+targetId).getHeight();
		
	//var genomeViewer = new GenomeViewer(targetId, AVAILABLE_SPECIES[0],{
		//version:"",
		//zoom:75,
		//width:width-2,
		//height:height-2
	//});
	//genomeViewer.setMenuBar(this.getGenomeViewerResultBar(genomeViewer));
	

	genomeViewer = new GenomeViewer(targetId, DEFAULT_SPECIES,{
		sidePanelCollapsed:true,
		width:width-2,
		height:700-2
	});
	genomeViewer.afterRender.addEventListener(function(sender,event){
		_this.app.setTracks(genomeViewer);
		genomeViewer.addSidePanelItems();
		var variantFilterWidget = new VariantFilterWidget(_this.jobId,{
				width:width-2,
				targetId:_this.application+targetId,
				viewer:genomeViewer,
				fileNames:_this.variantFiles
		});
	});
	genomeViewer.draw();
	
	var adapter = new OpencgaManager();
	adapter.onPoll.addEventListener(function(sender, data){
		if(data.indexOf("ERROR")!=1){
			console.error(data);
		}
		var vcfDataAdapter = new VCFDataAdapter(new StringDataSource(data),{async:false,species:genomeViewer.species});
		var vcfTrack = new TrackData("VCF file",{
			adapter: vcfDataAdapter
		});
		genomeViewer.addTrack(vcfTrack,{
			id:"VCF file",
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		//var feature = vcfDataAdapter.featureCache.getFirstFeature();
		//genomeViewer.region.load(feature);
		//genomeViewer.setRegion({sender:""});
//		genomeViewer.setZoom(75);
	});
	
	
//	console.log(this.filteredVcfFile)
	if(this.filteredVcfFile != null){
		adapter.poll($.cookie("bioinfo_account"), $.cookie('bioinfo_sid'), _this.jobId, this.filteredVcfFile, false);
		//adapter.poll(_this.jobId, this.filteredVcfFile, false, $.cookie('bioinfo_sid'));
	}else{
		console.log("No filtered VCF file.");
	}
};



var mostSignificativesFeatures = new Array();
ResultWidget.prototype.createCellBrowser = function (targetId){
	var _this = this;
	record = this.record;
	
	//hide network-viewer, all nodes mut be rendered before show
	Ext.getCmp(this.application+targetId).disable();
	
	var width = Ext.getCmp(this.application+targetId).getWidth();
	var height = Ext.getCmp(this.application+targetId).getHeight();
	
	//Pako creating cellBrowser
	this.networkViewer = new NetworkViewer(targetId,this.getSpeciesItem(this.species),{
		width:width-2,
		height:height-2
	});
//	this.networkViewer.setSpeciesMenu(AVAILABLE_SPECIES);
	this.networkViewer.draw();

	
	
	
	//setting a empty data and format, nodes will be draw later using the interface
	var dataset = new GraphDataset();
	var layout = new LayoutDataset();
	var formatter = new NetworkDataSetFormatter({
		"defaultFormat": {"type":"LineEdgeNetworkFormatter","opacity":1, "fill":"#000000", "radius":"5", "strokeWidth":"1", "stroke":"#000000", "size":"2", "title":{"fontSize":10, "fill":"#000000"}},
		"selected": {"opacity":0.9, "fill":"#FF0000", "radius":"5", "stroke":"#000000",  "size":"2"},
		"over": {"opacity":1, "fill":"#DF0101", "radius":"5", "stroke":"#000000",   "size":"2", "strokeWidth":"1"}
	}, 
	{
		"defaultFormat": {  "opacity":0.8,"stroke":"#000000", "strokeWidth":"1", "strokeOpacity":0.5, "title":{"fontSize":6, "fontColor":"#000000"}},
		"selected": {"stroke":"#DF0101", "fill":"#FF0000"},
		"over": { "stroke":"#DF0101","strokeOpacity":1, "strokeWidth":"4"}
	},
//		{ "labeled":false, "height":height,"width":this.width,"right":this.width,"backgroundColor":"#FFFFFF", "balanceNodes":false, "nodesMaxSize":4, "nodesMinSize":2});		
	{ "labeled":false, "backgroundColor":"#FFFFFF", "balanceNodes":false, "nodesMaxSize":4, "nodesMinSize":2});		
	formatter.dataBind(dataset);
	layout.dataBind(dataset);
	
	formatter.setHeight(height - 140);
	formatter.setWidth(width-2-13);
	this.networkViewer.drawNetwork(dataset, formatter, layout);
	
	
	
	//Getting significant_your_annotation_0.05.txt
	var adapter2 = new WumRestAdapter();
	adapter2.onPoll.addEventListener(function(sender, data){
		var lines = data.split("\n");
		var significativesFeatures = new Array();
		for ( var i = 1; i < lines.length; i++) {
			var column = 13;
			if(record.data.toolName == "fatiscan"){
				if(lines[i].split("\t").length==7){
					//we are in the case of logistic model
					column = 6;
				}
			}
			var significativeValue = lines[i].split("\t")[column];
			if(significativeValue < 1000000){
				significativesFeatures.push(lines[i].split("\t")[0]);
			} 
		}
		console.log('significativesFeatures.length: '+significativesFeatures.length);
		
		
		/** TFBS **/
		var adapter3 = new WumRestAdapter();
		adapter3.onPoll.addEventListener(function(sender, data){
			var genes = data.split("\n");
			/** Para elminar la linea en blanco: Gorrion Rules! **/
			genes.pop();
			console.log('genes.length: '+genes.length);
			_this.loadNetworkOnCellBrowser(genes, significativesFeatures, targetId);
		});

		var file = "clean_list1.txt";
		if(record.data.toolName == "fatiscan")
			file = "id_list.txt";
		adapter3.poll(_this.jobId, file, false, $.cookie('bioinfo_sid'));
	});
	adapter2.poll(this.jobId, "significant_your_annotation_0.05.txt", false, $.cookie('bioinfo_sid'));
	//END getting significant_your_annotation_0.05.txt
		
	
	
	
	// By Nacho
	// getting 50 most significant genes
	console.log('getting ranked_list...');
	var cleanListWumAdapater = new WumRestAdapter();
	cleanListWumAdapater.onPoll.addEventListener(function(sender, data) {
		var lines = data.split("\n");
		var numGenes = lines.length;
		var cont = 0;
		console.log('getting top clean_list...');
		for(var i = 0; cont < 50 && i < numGenes; i++) {
			if(lines[i].indexOf('#') < 0) {
//				console.log('getting top ranked_list... '+lines[i]);
//				console.log('getting top ranked_list... '+lines[i].split("\t")[0]);
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
		cont = 0;
		console.log('getting bottom clean_list...');
		for(var i = numGenes-1; cont < 50 && i > 0; i--) {
			if(lines[i].indexOf('#') < 0) {
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
	});
	cleanListWumAdapater.poll(this.jobId, "clean_list1.txt", false, $.cookie('bioinfo_sid'));
	// END getting 50 most significant genes
	
	
	
	
	// getting ranked_list
	console.log('getting ranked_list...');
	var rankedListWumAdapater = new WumRestAdapter();
	rankedListWumAdapater.onPoll.addEventListener(function(sender, data) {
		var lines = data.split("\n");
		var numGenes = lines.length;
		var cont = 0;
		console.log('getting top ranked_list...');
		for(var i = 0; cont < 50 && i < numGenes; i++) {
			if(lines[i].indexOf('#') < 0) {
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
		cont = 0;
		console.log('getting bottom ranked_list...');
		for(var i = numGenes-1; cont < 50 && i > 0; i--) {
			if(lines[i].indexOf('#') < 0) {
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
	});
	rankedListWumAdapater.poll(this.jobId, "ranked_list.txt", false, $.cookie('bioinfo_sid'));
	//END getting ranked_list	
		
};


ResultWidget.prototype.loadNetworkOnCellBrowser = function (genes, tfbs, targetId){
	var _this = this;

	//tfbs and mirna nodes are rendered
	//2 indicates that mirna and tfbs are done 
	var nodesRendered = 0;

	//Getting tfbs by gene
	var cellBaseManager = new CellBaseManager(this.networkViewer.species);
	cellBaseManager.success.addEventListener(function (evt, response){
		var data_tfbs = response.result;
		var tfbsByGene = new Object();
		for (var i = 0; i < data_tfbs.length; i++){
			for ( var j = 0; j < data_tfbs[i].length; j++) {
				if(tfbs.toString().indexOf(data_tfbs[i][j].tfName) != -1){
					if (tfbsByGene[data_tfbs[i][j].tfName] == null){
						tfbsByGene[data_tfbs[i][j].tfName] = new Object();
					}

					if(tfbsByGene[data_tfbs[i][j].tfName][genes[i]] == null){
						tfbsByGene[data_tfbs[i][j].tfName][genes[i]] = true;
					}
				}
			}
		}
		console.log(tfbsByGene);
		console.log(data_tfbs.length);
		console.log('contando TFBSs...');
		// check the number of elemts to be rendered
		// if there are more than 500 then select the most significant
		var numElements = 0;
		for ( var tf in tfbsByGene) {
			if(numElements > 500) {
				break;
			}
			for ( var gene in tfbsByGene[tf]) {
				numElements++;
			}
		}
		console.log('menos de 500: '+numElements);
		for ( var tf in tfbsByGene) {
			_this.networkViewer.networkWidget.getDataset().addNode(tf, {type:"tf"});
			var verticeId = _this.networkViewer.networkWidget.getDataset().getVerticesCount() - 1;
			_this.networkViewer.networkWidget.getFormatter().getVertexById(verticeId).getDefault().setFill("#DF0101");

//			console.log(tfbsByGene[tf]);
//			console.log(_this.networkViewer.networkWidget.getFormatter().getVertexById(verticeId));
			for ( var gene in tfbsByGene[tf]) {
				if(numElements < 500 || mostSignificativesFeatures[gene] == true) {
//					console.log(gene);
					/** Conecto los tfbs con sus genes **/
					if(_this.networkViewer.networkWidget.getDataset().getVertexByName(gene).length == 0){
						_this.networkViewer.networkWidget.getDataset().addNode(gene, {type:"gene"});
					}

//					console.log(_this.networkViewer.networkWidget.getDataset());
					// getVertexByName returns an array

					var vertexGeneId = _this.networkViewer.networkWidget.getDataset().getVertexByName(gene)[0].id;
					var vertexTfbsId = _this.networkViewer.networkWidget.getDataset().getVertexByName(tf)[0].id;
					_this.networkViewer.networkWidget.getDataset().addEdge("tfbs_" + vertexGeneId + "_" + vertexTfbsId, vertexTfbsId, vertexGeneId);
					_this.networkViewer.networkWidget.getFormatter().getVertexById(vertexGeneId).getDefault().setFill("#0000FF");
				}
			}
		}


		_this.networkViewer.networkWidget.getLayout().getLayout("neato");
		_this.networkViewer.networkWidget.getLayout().layoutDone.addEventListener(function (evt){
			nodesRendered++;
			if(nodesRendered==2){
				Ext.getCmp(_this.id+'pbar').destroy();
				Ext.getCmp(_this.application+targetId).enable();
			}
		});
	});
	if(genes.length>0){
		cellBaseManager.get("feature", "gene", genes, "tfbs");
	}
	//getting mirna target by gene
	var cellBaseManagerMirna = new CellBaseManager(this.networkViewer.species);
	cellBaseManagerMirna.success.addEventListener(function (evt, response){
		var data_tfbs = response.result;
		var tfbsByGene = new Object();
		for (var i = 0; i < data_tfbs.length; i++){
			for ( var j = 0; j < data_tfbs[i].length; j++) {

				if(tfbs.toString().indexOf(data_tfbs[i][j].mirbaseId) != -1){
					if (tfbsByGene[data_tfbs[i][j].mirbaseId] == null){
						tfbsByGene[data_tfbs[i][j].mirbaseId] = new Object();
					}

					if(tfbsByGene[data_tfbs[i][j].mirbaseId][genes[i]] == null){
						tfbsByGene[data_tfbs[i][j].mirbaseId][genes[i]] = true;
					}
				}
			}
		}
		console.log(tfbsByGene);
		console.log(data_tfbs.length);
		console.log('contando miRNAs...');
		// check the number of elemts to be rendered
		// if there are more than 500 then select the most significant
		var numElements = 0;
		for ( var tf in tfbsByGene) {
			if(numElements > 500) {
				break;
			}
			for ( var gene in tfbsByGene[tf]) {
				numElements++;
			}
		}
		console.log('menos de 500: '+numElements);
		for ( var mirna in tfbsByGene) {
			_this.networkViewer.networkWidget.getDataset().addNode(mirna, {type:"mirna"});
			var verticeId = _this.networkViewer.networkWidget.getDataset().getVerticesCount() - 1;
			_this.networkViewer.networkWidget.getFormatter().getVertexById(verticeId).getDefault().setFill("red");
			for ( var gene in tfbsByGene[mirna]) {
				if(numElements < 500 || mostSignificativesFeatures[gene] == true) {
//					console.log(gene);
					if(_this.networkViewer.networkWidget.getDataset().getVertexByName(gene).length == 0){
//						if(_this.networkViewer.networkWidget.getDataset().getVertexByName(gene) == null) {
						_this.networkViewer.networkWidget.getDataset().addNode(gene, {type:"gene"});
					}

					var vertexGeneId = _this.networkViewer.networkWidget.getDataset().getVertexByName(gene)[0].id;
					var vertexTfbsId = _this.networkViewer.networkWidget.getDataset().getVertexByName(mirna)[0].id;
					_this.networkViewer.networkWidget.getDataset().addEdge("tfbs_" + vertexGeneId + "_" + vertexTfbsId, vertexTfbsId, vertexGeneId);
					_this.networkViewer.networkWidget.getFormatter().getVertexById(vertexGeneId).getDefault().setFill("blue");

					var edgeId = _this.networkViewer.networkWidget.getDataset().getEdgesCount() - 1;


					_this.networkViewer.networkWidget.getFormatter().changeEdgeType(edgeId, "CutDirectedLineEdgeNetworkFormatter");
				}

			}
		}    


		_this.networkViewer.networkWidget.getLayout().getLayout("neato");
		_this.networkViewer.networkWidget.getLayout().layoutDone.addEventListener(function (evt){
			nodesRendered++;
			if(nodesRendered==2){
				Ext.getCmp(_this.id+'pbar').destroy();
				Ext.getCmp(_this.application+targetId).enable();
			}
		});

	});
	if(genes.length>0){
		cellBaseManagerMirna.get("feature", "gene", genes, "mirna_target");    
	}else{
		Ext.getCmp(_this.id+'pbar').destroy();
		Ext.getCmp(_this.application+targetId).enable();
	}
};



ResultWidget.prototype.getGenomeViewerResultBar = function(genomeViewer) {
	var _this=this;

	switch (this.application){
	case "variant":
		var toolbarMenu = Ext.create('Ext.container.Container', {
			cls:'bio-toolbar',
			defaults:{margin:'1 0 0 2'},
			layout:'vbox',
			height:27,
			items : [
				{xtype:'button',text:'<span class="info">Variant filter tool...</span>',handler:function(){
						var variantFilterWidget = new VariantFilterWidget(_this.jobId,{viewer:genomeViewer,fileNames:_this.variantFiles});
//						variantFilterWidget.draw();
//						variantFilterWidget.parseData(data);
//						var wumRestAdapter = new WumRestAdapter();
//						wumRestAdapter.onPoll.addEventListener(function(sender, data){
//						});
						
//						wumRestAdapter.poll(_this.jobId, "variant.txt", false, $.cookie('bioinfo_sid'));
					}
				}
			]
		});
		return toolbarMenu;
		break;
		
	
	default: return null;
	}
};


ResultWidget.prototype.getSpeciesItem = function(species) {
	//selecciona el objeto AVAILABLE_SPECIES segun el species code
	for ( var i = 0; i < AVAILABLE_SPECIES.length; i++) {
		if(AVAILABLE_SPECIES[i].species==species){
			return AVAILABLE_SPECIES[i];
		}
	}
};

//Quita los resultados para your annotation
ResultWidget.prototype.checkPValue = function(str) {
	//return false si es 0.005, 0.01 ó 0.1
	if(str.indexOf("pvalue<0.005")!= -1 ||
		str.indexOf("pvalue<0.01")!= -1 ||
		str.indexOf("pvalue<0.1")!= -1
	){
		return false;
	}
	return true;
};

//Quita los resultados para your annotation
ResultWidget.prototype.renamePValue = function(item) {
	//reemplaza la cadena ${pvalue} por 0.05
	if(item.value.indexOf("${pvalue}") != -1){
		item.value = item.value.replace(/\$\{pvalue\}/gi, "0.05");
	}
};

//XXX no se usa por ahora...Para mas adelante
ResultWidget.prototype.setPValue = function(value) {
	console.log(this.id);
	var divId="#pvalue"+this.id;
	$(divId).html(value);
};

//Quita los resultados para your annotation
ResultWidget.prototype.getInfo = function(groupName) {
	switch (this.application){
	case "renato":
		switch (groupName){
			case "Input data": return "This section is a reminder of the parameters or settings you have submitted to run the analysis.";
			case "Summary": return "<p>This section shows the number of genes annotated to each database in each list.</p><br><p>Gene list: contains three elements, the number of genes in your gene list annotated in the database over the total number of genes remaining in your gene list after the duplicates management, a percentage of genes in your gene list annotated in the database and the ratio of regulators per gene.<br> Genome: the same structure explained above but applied to the whole genome (TFBS or miRNA) or Your Annotations after the duplicates management.</p>";
			case "Significant Results":  return "<p>We consider a significant enrichment after correcting the results by a multiple testing correction method. Enrichment p-values are corrected applying the False discovery rate (FDR) method (Benjamini et al., 1995; Storey andTibshirani, 2003). The threshold of signification applied to the correction has been set to 0.05.</p><br><p>The table provided summarizes the information about the enrichment test for each of the significant regulatory elements that have an Adjusted p-value < 0.05. The table is originally sorted by adjusted p-value and can be sorted up and down by clicking in any of the other column headings. When the number of significant results in a table is higher than five, results are split into different pages. You can move forward or backward in the page list using the arrow buttons.</p>";
			case "All results": return "This section contains a downloadable individual text file containing all results for all significant and not significant regulators. This file follows the same structure described above.";
			case "Annotation files": return "<p>When significant results are obtained, we can suppose that there is one or several regulatory elements behaving different when comparing groups. The list of genes included in the analysis have pointed to a significantly over-represented set of common regulators to these genes. The interpretation of the results will be different in the case of TFs (transcription factors) and miRNAs given that (generally) the first are positive regulators and the latter are negative regulators.</p><br><p>TFs generally bind to the promoter region of their target genes to assist and promote the transcription. miRNAs, on the other hand, bind to transcript products preventing them from being translated. Significant TF and miRNAs can be pointed to be responsible for the differential expression of the genes observed in the list. We must take special care in the interpretation of over-expressed or under-expressed genes in a functional analysis. In the case of TFs, if we are working with the list of over-expressed genes, the significant results makes reference to active TFs in one condition with respect to the other; while significant results of under-expressed genes makes reference to inactive TFs. In miRNAs, significant results of over-expressed genes will point to inactive miRNAs, while significant results of under-expressed genes will point to active miRNAs when comparing conditions.</p>";
			default: return "";
		}
	break;
	case "variant":
		switch (groupName){
			case "Variants by Consequence Type": return "Click this link: <a class='ok' target='_blank' href='http://docs.bioinfo.cipf.es/projects/variant/wiki/Output_columns'>Output columns</a>";
			default: return "";
		}
	break;
	
	default: return "";
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ResultTable(jobId, filename, tags, args){
	var _this = this;
	this.id = "ResultTable"+ Math.round(Math.random()*10000000);
	this.targetId = null;
	
	this.jobId = jobId;
	this.fileName=filename;
	this.tags=tags;
	this.numRows=10;
	this.flex=null;
	this.collapsible=true;
	this.border=true;
	this.cls=null;

    if(typeof args != 'undefined'){
        this.targetId = args.targetId || this.targetId;
        this.numRows = args.numRows || this.numRows;
        this.flex  = args.flex  || this.flex;
        this.collapsible  = args.collapsible  || this.collapsible;
        this.border  = args.border  || this.border;
        this.cls  = args.cls  || this.cls;
        this.tableLayout  = args.tableLayout  || this.tableLayout;
    }

	this.adapter = new OpencgaManager();
	
    this.table = null;
    
    this.onRendered = new Event();
	this.onRendered.addEventListener(function (sender, targetId){
		_this.draw();
	});
};



ResultTable.prototype.draw = function (){
	this.render();
};

ResultTable.prototype.render = function (){
	var _this = this;
	
	var rows=null;
	
	var filteredGridNames = new Array();
	var filteredColNames = new Array();
//	for( var i =0; i < tables.length; i++){
//		if (this.tags.indexOf(tables[i].name)!= -1){//me quedo con la primera que encuentro
//			this.tableSkel = tables[i];
//			this.colNames = tables[i].colNames;
//			this.colVisibilty = tables[i].colVisibility;
//			this.colTypes = tables[i].colTypes;
//			rows = tables[i].numRows;
//
//			filteredGridNames = new Array();
//			filteredColNames = new Array();
//			for (var j=0;j<this.colNames.length; j++){
//				if (this.colVisibilty[j]==1){
//					filteredGridNames.push({header:this.colNames[j],dataIndex:this.colNames[j], flex:1});
//					filteredColNames.push({name:this.colNames[j],type:this.colTypes[j]});
//				}
//			}
//		break;
//		}
//	}
    this.tableSkel = this.tableLayout;
    this.colNames = this.tableSkel.colNames;
    this.colVisibilty = this.tableSkel.colVisibility;
    this.colTypes = this.tableSkel.colTypes;
    rows = this.tableSkel.numRows;

    filteredGridNames = new Array();
    filteredColNames = new Array();
    for (var j=0;j<this.colNames.length; j++){
        if (this.colVisibilty[j]==1){
            filteredGridNames.push({header:this.colNames[j],dataIndex:this.colNames[j], flex:1});
            filteredColNames.push({name:this.colNames[j],type:this.colTypes[j]});
        }
    }


	if(this.tableSkel.type == "text"){
		
		var adapterPoll = new WumAdapter();
		adapterPoll.onPoll.addEventListener(function(sender,data){
			var altura = 75+22*2;
			
			var lines = _this.parse(data);
			var items = [];
			for ( var i = 0; i < lines.length; i++){
				var cont = Ext.create('Ext.container.Container', {
					data:lines[0],
					tpl:_this.getTemplate(_this.tableSkel.colNames)
				});
				items.push(cont);
			}
			
			this.table = Ext.create('Ext.container.Container', {
				items:items,
				margin:"0 0 0 50",
				renderTo: _this.targetId
			});
			
		});
		adapterPoll.poll(this.jobId,this.fileName,false,$.cookie('bioinfo_sid'));
		
	}else{
		//accountId, sessionId, bucketname, jobId, filename, colNames, colVisibilty, sessionId
		//var url = this.adapter.tableurl(this.jobId,this.fileName,this.colNames,this.colVisibilty,$.cookie('bioinfo_sid'));

		var url = this.adapter.tableurl($.cookie("bioinfo_account"),$.cookie('bioinfo_sid'),this.jobId,this.fileName,this.colNames,this.colVisibilty);
		console.log(url);
		
		/*
		http://ws.bioinfo.cipf.es/opencga/rest/job/86232/table?
				sessionid=QtjXeeOwKsRdTcyCF1vOiM2xbIC57fhlNvXafCjZMXCAFH2M6iZPfEXETt1Lp7F4
				&filename=significant_your_annotation_0.1.txt
				&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids
				&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0
				&_dc=1326109874569
				&page=1
				&start=0
				&limit=10
				&sort=%5B%7B%22property%22%3A%22List1%20unannotateds%22%2C%22direction%22%3A%22DESC%22%7D%5D
				&callback=Ext.data.JsonP.callback5
		
		http://ws.bioinfo.cipf.es/opencga-beta/rest/job/42/table?
				sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll
				&filename=significant_your_annotation_0.1.txt
				&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids
				&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0
				&_dc=1326278871739
				&page=1
				&start=0
				&limit=5
				&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%2C%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D
				&callback=Ext.data.JsonP.callback3
		http://ws.bioinfo.cipf.es/opencga-beta/rest/job/42/table?sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll&filename=significant_your_annotation_0.1.txt&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0&_dc=1326279241960&page=1&start=0&limit=5
		&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D
		&callback=Ext.data.JsonP.callback7
		http://ws.bioinfo.cipf.es/opencga-beta/rest/job/42/table?sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll&filename=significant_your_annotation_0.1.txt&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0&_dc=1326279394677&page=1&start=0&limit=5
		&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D&callback=Ext.data.JsonP.callback2
		*
		*/
		if(rows==null){
			rows = this.numRows;
		}
		var itemsPerPage = rows; 

		this.st = Ext.create('Ext.data.Store', {
			fields: filteredColNames, //las colNames no pueden tener el caracter "."
	    	pageSize: itemsPerPage,
		    remoteSort:true,
//		    remoteFilter:true,//TODO o no
	    	proxy: {
		        type: 'jsonp',
		        url : url,
		        reader: {
		            type: 'json',
		            root: 'items',
	            	totalProperty: 'total'
		        }
	    	}
		});
		this.st.loadPage(1);
		
		var altura = 75+22*itemsPerPage;
		this.table = Ext.create('Ext.grid.Panel', {
			title: /*this.tableName+" - "+*/this.fileName,
			collapsible:this.collapsible,
			flex:this.flex,
		    store: this.st,
		    border:this.border,
		    cls:this.cls,
		    columns: filteredGridNames,
		    height: altura,
//			selType: 'cellmodel',
			dockedItems: [{
		        xtype: 'pagingtoolbar',
		        store: this.st,   // same store GridPanel is using
		        dock: 'top',
		        displayInfo: true
	    	}],
		    renderTo: this.targetId
		});	
		
	}
};

/***/
ResultTable.prototype.parse = function (data){
	var _this = this;
	var lines = data.split("\n");
	var objLines=[];
	for ( var i = 0; i < lines.length; i++) {
		if(lines[i].charAt(0)!="#" && lines[i]!=""){
			var fields = lines[i].split("\t");
			var obj = {};
			for ( var j = 0; j < fields.length; j++) {
				if(fields[j]!=""){
					obj[_this.tableSkel.colNames[j].replace(/ /g,"_")]=fields[j];
				}
			}
			objLines.push(obj); 
		}
	}
	return objLines;
};
ResultTable.prototype.getTemplate = function (keys){
	var str = "<p>";
	for ( var i = 0; i < keys.length; i++) {
		str+='<span class="dis s90">'+keys[i]+' </span> {'+keys[i].replace(/ /g,"_")+'} &nbsp; &nbsp; &nbsp;';
	}
	str +="</p>";
	return  new Ext.XTemplate(	str);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function BrowserDataWidget(args){
	var _this=this;
	this.id = "BrowserDataWidget_" + Math.round(Math.random()*10000000);
	this.targetId = null;
    this.tags=null;
	
   	this.width = 900;
	this.height = 500;
    
	this.retrieveData=true;
	this.notAvailableSuiteList = ['SEA', 'GSnow'];
	
    if (args != null){
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
        if (args.retrieveData!= null){
        	this.retrieveData = args.retrieveData;       
        }
        if (args.notAvailableSuites!= null){
        	for(var i=0; i<args.notAvailableSuites.length; i++) {
        		this.notAvailableSuiteList.push(args.notAvailableSuites[i]);       
        	}
        }
    }
    
    this.adapter = new WumAdapter();
	this.adapter.onGetData.addEventListener(function (sender, data){
		_this.data=data;
		_this.adapter.getSuiteList();
	});	
	this.adapter.onSuiteList.addEventListener(function (sender, data){
		_this.suiteList = data;
//		console.log(data);
		Ext.getBody().unmask();
		_this.render();
	});	
	
	this.onSelect = new Event(this);
	/**ID**/
	this.searchFieldId = this.id + "_searchField";
};

BrowserDataWidget.prototype.draw = function (sessionID, tags){
	this.tags = tags;
	Ext.getBody().mask("Loading...");
	this.adapter.getData(sessionID, -1);
};

BrowserDataWidget.prototype.render = function (){
	var _this=this;
	if (this.panel == null){
		var data = JSON.parse(this.data);
		var months = {"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"};
		for(var i =0; i < data.length; i++){
			
			var yearNum = data[i].creationTime.substring(0,4);
			var monthNum = data[i].creationTime.substring(5,7);
			var dayNum = data[i].creationTime.substring(8,10);
			var hourNum = data[i].creationTime.substring(11,16);
			
			data[i].yearMonth = yearNum+" - "+monthNum+" ("+months[parseInt(monthNum)]+")";
			data[i].dayHour = dayNum+" - "+hourNum;
			
			data[i].tagsMatch=false;
			if(data[i].tags!=null){
				data[i].tagsMatch = this.checkTags(data[i].tags);				
			}
		}

		
		/**GRID**/
		this.gridStore = Ext.create('Ext.data.Store', {
		    fields: ["dataId", "ownerId", "jobId", "suiteId", "name", "multiple", "diskUsage", "creationTime", "responsible", "organization", "date", "description", "status", "statusMessage", "write", "enabled", "tags", "dataFiles", "yearMonth","dayHour", "tagsMatch"],
			groupField: 'yearMonth',
		    sorters: [{ property : 'yearMonth',direction: 'DESC'}],
		    data: data
		});
		this.selectedLabel = Ext.create('Ext.toolbar.TextItem', {
			padding:3,
			flex:1,
			text:'<span class="info"> Please select a file</span>.'
		});
		var tagsLabel = Ext.create('Ext.toolbar.TextItem', {
			padding:3,
			text:'Suported tags by this analysis: <span class="emph">'+this.tags.toString().replace(/,/gi,', ').replace(/\|/gi,' or ')+'</span>'
		});
		var tpl = ['<tpl if="tagsMatch"><span class="emph">{name}</span></tpl>',
				   '<tpl if="!tagsMatch"><span class="dis">{name}</span></tpl>'];
				   
		this.grid = Ext.create('Ext.grid.Panel', {
			border:false,
//		    title: 'Data Files',
		    store: this.gridStore,
		    columns: [{"header":"Name",flex:3, xtype:'templatecolumn', tpl:tpl},
		    		  {"header":"Disk usage (KB)","dataIndex":"diskUsage",flex:1.2},{"header":"Year & Month","dataIndex":"yearMonth",flex:1.3},{"header":"Day & Time","dataIndex":"dayHour",flex:1},{"header":"Tags","dataIndex":"tags",flex:1}],
		    features: [{ftype:'grouping'}],
		    selModel: {
                mode: 'SINGLE',
//                allowDeselect:true,
                listeners: {
                	scope:this,
                    selectionchange: function (este,item){
                    					if(item.length>0){//se compr
                    						if(item[0].data.tagsMatch){
                    							this.selectButton.enable();
                    							this.selectedLabel.setText('<p>The selected file <span class="emph">'+item[0].data.name.substr(0,40)+'</span><span class="ok"> is allowed</span>.</p>',false);
                    						}else{
                    							this.selectButton.disable();
                    							this.selectedLabel.setText('<p>The selected file <span class="dis">'+item[0].data.name.substr(0,40)+'</span><span class="err"> is not allowed</span>.</p>',false);
                    						}
                    						//TODO por defecto cojo el primero pero que pasa si el data contiene varios ficheros??
                    					}else{
                    						this.selectButton.disable();
                    					}
                    				}
                }
            },
//		    width: 600,
//		    height: 370,
            flex:4,
		    bbar:{items:[tagsLabel,'-',this.selectedLabel]}
		});
		
		
		/**ORIGIN FILTER**/
		var origins = [{ suiteId: "all",name:"all"},{ suiteId: "Uploaded Data",name:"Uploaded Data"},{ suiteId: "Job Generated",name:"Job Generated"}];
		
	 	var stOrigin = Ext.create('Ext.data.Store', {
	 		fields: ["suiteId","name"],
	 		data : origins
		});
		this.viewOrigin = Ext.create('Ext.view.View', {
		    store : stOrigin,
            selModel: {
                mode: 'SINGLE',
//                allowDeselect:true,
                listeners: {
                    selectionchange:function(){_this.setFilter();}
                }
            },
            cls: 'list',
         	trackOver: true,
            overItemCls: 'list-item-hover',
            itemSelector: '.list-item',
            tpl: '<tpl for="."><div class="list-item">{name}</div></tpl>'
        });
        
        var panOrigin = Ext.create('Ext.panel.Panel', {
        	title:'Search by origin',
        	border:0,
        	bodyPadding:5,
        	style: 'border-bottom:1px solid #99bce8;',
		    items : [this.viewOrigin]
		});
        
		
        /**SUITE FILTER**/
		var parsedSuites = JSON.parse(this.suiteList);
		var suites = [];
		// remove not available suites
		for(var i = 0; i < parsedSuites.length; i++) {
			if(this.notAvailableSuiteList.indexOf(parsedSuites[i].name)==-1){ // es que esta para quitar
				suites.push(parsedSuites[i]);
			}
		}
		
        var stSuite = Ext.create('Ext.data.Store', {
	 		fields: ["suiteId","name","description"],
	 		data : suites
		});
		
		this.viewSuite = Ext.create('Ext.view.View', {
		    store : stSuite,
            selModel: {
                mode: 'SINGLE',
//                allowDeselect:true,
                listeners: {
                	selectionchange:function(){_this.setFilter();}
                }
            },
            cls: 'list',
         	trackOver: true,
            overItemCls: 'list-item-hover',
            itemSelector: '.list-item',
            tpl: '<tpl for="."><div class="list-item">{name}</div></tpl>'
        });
         
        var panSuite = Ext.create('Ext.panel.Panel', {
        	title:'Search by suite',
        	border:0,
        	bodyPadding:5,
		    items : [this.viewSuite]
		});

		
		/**TEXT SEARCH FILTER**/
        this.searchField = Ext.create('Ext.form.field.Text',{
        	 id:this.searchFieldId,
	         flex:1,
			 emptyText: 'enter search term',
			 enableKeyEvents:true,
			 listeners:{
			 	scope:this,
			 	change:this.setFilter
			 }
        });
        
        /**FILTER PANEL**/
         var panFilter = Ext.create('Ext.panel.Panel', {
			minWidth: 125,
		    minHeight : 370,
			flex:1,
			cls:'panel-border-right',
		    border:false,
		    items : [panOrigin,panSuite],
		    tbar : {items:this.searchField}
		});
		
		this.selectButton = Ext.create('Ext.button.Button', {
			 text: 'Ok',
			 disabled:true,
			 handler: function(){
	       			var item = _this.grid.getSelectionModel().getSelection()[0];
	       			if(_this.retrieveData==true){
	       				_this.adapter.readData($.cookie('bioinfo_sid'),item.data.dataFiles[0].dataId,item.data.dataFiles[0].filename);	       				
	       			}
	       			_this.onSelect.notify(item.data.dataFiles[0]);
	       			_this.panel.close();
	       	}
		});  
		
		/**MAIN PANEL**/
//		this.height=205+(26*suites.length);//segun el numero de suites
		this.panel = Ext.create('Ext.window.Window', {
		    title: 'Browse Data',
		    resizable: false,
		    minimizable :true,
			constrain:true,
		    closable:true,
		    modal:true,
		    height:this.height,
		    width:this.width,
		    layout: { type: 'hbox',align: 'stretch'},
		    items: [panFilter,this.grid],
		    buttonAlign:'right',
		    buttons:[
		             { text: 'Close', handler: function(){_this.panel.close();}},
		             this.selectButton
		             ],
		    listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.hide();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	        }
		});
	}//if null
	this.panel.show();
	this.viewOrigin.getSelectionModel().select(this.viewOrigin.store.first());
    this.viewSuite.getSelectionModel().select(this.viewSuite.store.first());
};

BrowserDataWidget.prototype.setFilter = function (){
	var _this=this;
	var recordOrigin = this.viewOrigin.getSelectionModel().getSelection()[0];
	var recordSuite = this.viewSuite.getSelectionModel().getSelection()[0];
	
	this.gridStore.clearFilter();
	
	if(recordOrigin!=null){
		switch(recordOrigin.data.suiteId){
			case  "all": 			break;
			case  "Uploaded Data": 	this.gridStore.filter(function(item){return item.data.jobId < 0;}); break;
			case  "Job Generated": 	this.gridStore.filter(function(item){return item.data.jobId > 0;}); break;
		}
	}
	if(recordSuite!=null){
		switch(recordSuite.data.suiteId){
			case  1: 				break;
			default : 				this.gridStore.filter(function(item){return item.data.suiteId == recordSuite.data.suiteId;});
		}
	}
	
	this.gridStore.filter(function(item){
			var str = Ext.getCmp(_this.searchFieldId).getValue().toLowerCase();
			if(item.data.name.toLowerCase().indexOf(str)<0){
				return false;
			}
			return true;
		});
};

BrowserDataWidget.prototype.checkTags = function(tags){
	for(var i = 0; i < this.tags.length ; i++){
		if (this.tags[i].indexOf('|')>-1){
			var orTags = this.tags[i].split('|');
			var orMatch = false;
			for(var j = 0; j < orTags.length ; j++){
				if (tags.indexOf(orTags[j]) >-1){
					orMatch=true;
				}
			}
			if(!orMatch){
				return false;
			}
		}else{
			if (tags.indexOf(this.tags[i])==-1){
				return false;
			}
		}
	}
	return true;
	
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function OpencgaBrowserWidget(args) {
    var _this = this;
    if (typeof args != 'undefined') {
        this.targetId = args.targetId || this.targetId;
        this.title = args.title || this.title;
        this.width = args.width || this.width;
        this.height = args.height || this.height;
    }

    this.adapter = new OpencgaManager();
    this.adapter.onCreateBucket.addEventListener(function (sender, data) {
        if (data.indexOf("ERROR") != -1) {
            Ext.Msg.alert("Create project", "ERROR: could not create this project.");
        } else {
            _this.onNeedRefresh.notify();
        }
        _this.panel.setLoading(false);
        Ext.getBody().unmask();
    });

    this.uploadWidget = new UploadWidget({suiteId: args.suiteId, opencgaBrowserWidget: this});

    this.uploadWidget.adapter.onUploadObjectToBucket.addEventListener(function (sender, res) {
        if (res.status == 'done') {
            _this.onNeedRefresh.notify();
        }
    });
    /**ID**/
    this.searchFieldId = this.id + "_searchField";
}

OpencgaBrowserWidget.prototype = {
    /* Default properties */
    id: "OpencgaBrowserWidget_" + Math.round(Math.random() * 10000000),
//	targetId:undefined,
    title: 'Cloud data',
    onSelect: new Event(this),
    onNeedRefresh: new Event(this),
    width: 800,
    height: 375,
    rendered: false,
//    selectedFolderNode:undefined,
//    selectedFileNode:undefined,//can be set by the tree panel or the grid panel

    /* Methods */
    draw: function (mode) {
        //Ext.getBody().mask("Loading...");
        //this.adapter.getData(sessionID, -1);
        this.render(mode);
        this.rendered = true;
    },

    setAccountData: function (data) {
        this.accountData = data;
        if (this.rendered) {
            this._updateFolderTree();
        }
    },

    _updateFolderTree: function () {
        var _this = this;
        console.log("updating folder tree");
        var find = function (str, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].text == str) {
                    return i;
                }
            }
            return -1;
        };

        if (this.accountData != null && this.accountData.accountId != null) {
            this.folderStore.getRootNode().removeAll();
            this.allStore.getRootNode().removeAll();
            this.filesStore.removeAll();
//            this.folderTree.getSelectionModel().deselectAll();
            for (var i = 0; i < this.accountData.buckets.length; i++) {
                var folders = [];
                for (var j = 0; j < this.accountData.buckets[i].objects.length; j++) {
                    var data = this.accountData.buckets[i].objects[j];
                    data["bucketId"] = this.accountData.buckets[i].id;
                    //sencha uses id so need to rename to oid, update: sencha can use id but dosent like char '/' on the id string

                    if (data.id != null) {
                        data["oid"] = data.id;
                        delete data.id;
                    }
                    var pathArr = data.oid.split("/");
                    if (data.fileType == "dir") {
                        data["expanded"] = true;
                        data["icon"] = Utils.images.dir;
                    } else {
                        data["leaf"] = true;
                        data["icon"] = Utils.images.r;
                    }
                    //console.log(pathArr)

                    var current = folders;
                    for (var k = 0; k < pathArr.length; k++) {
                        var found = find(pathArr[k], current);
                        if (found != -1) {
                            current = current[found].children;
                        } else {
                            var children = [];
                            var idx = current.push({text: pathArr[k], children: children}) - 1;
                            if (typeof pathArr[k + 1] == 'undefined') {//isLast
                                for (key in data) {
                                    if (key != "children") {
                                        current[idx][key] = data[key];
                                    }
                                }
                            }
                            current = children;
                        }
                    }
                }
                folders = JSON.stringify(folders);
                this.allStore.getRootNode().appendChild({text: this.accountData.buckets[i].name, bucketId: this.accountData.buckets[i].name, oid: "", icon: Utils.images.bucket, expanded: true, isBucket: true, children: JSON.parse(folders)});
                this.folderStore.getRootNode().appendChild({text: this.accountData.buckets[i].name, bucketId: this.accountData.buckets[i].name, oid: "", icon: Utils.images.bucket, expanded: true, isBucket: true, children: JSON.parse(folders)});
            }
        }

        //collapse and expand to update the view after append, possible ExtJS 4.2.0 bug
        this.folderStore.getRootNode().collapse();
        this.folderStore.getRootNode().expand();


        //reselect nodes after account update
        if (this.selectedFolderNode != null) { //devuelve el value y el field porque el bucket no tiene oid
            var lastNode = this.folderTree.getRootNode().findChild(this.selectedFolderNode.field, this.selectedFolderNode.value, true);
            if (lastNode != null) {
                this.folderTree.getSelectionModel().select(lastNode);
            }
        }
        if (this.selectedFileNode != null) { //devuelve el value y el field porque el bucket no tiene oid
            var index = this.filesGrid.getStore().findExact('oid', this.selectedFileNode.oid);
            if (index != -1) {
                this.filesGrid.getSelectionModel().select(index);
            }
        }
    },

    addUpload: function (file, fileuploadWorker) {
        var pbar = Ext.create('Ext.ProgressBar', {
            text: 'Ready',
            width: 250,
            margin: '4 6 0 6'
        });
        var nameBox = Ext.create('Ext.Component', {
            html: file.name.substr(0, 67),
            width: 430,
            margin: '7 6 0 6'
        });
//        #ffffd6  amarillete
        // #1155cc azulete
        var btn = Ext.create('Ext.Button', {
            text: '<span style="color:#1155cc">Cancel</span>',
            margin: '3 6 0 4',
            width: 50,
            handler: function () {
                fileuploadWorker.terminate();
                cont.destroy();
            }
        });
        var cont = Ext.create('Ext.container.Container', {
            padding: '3 6 0 6',
            layout: 'hbox',
            items: [nameBox, pbar, btn]
        });
        fileuploadWorker.onmessage = function (e) {
            var res = e.data;
            console.log("@@@@@@@@@@@@@@@@ WORKER event message");
            console.log(res);
            pbar.updateProgress((res.chunkId + 1) / res.total, 'uploading part ' + (res.chunkId + 1) + ' of ' + res.total, false);
            if (res.finished == true) {
                btn.setText('<span style="color:#1155cc">Done </span>');
            }
//            _this.adapter.onIndexer(function(data){
//                console.log(data);
//            });
//            _this.adapter.indexer($.cookie("bioinfo_account"),objectId);
        };
        this.activeUploadsCont.add(cont);
        Ext.getCmp(this.id + 'activeUploadsButton').toggle(true);
    },
    viewBuckets: function () {
        var _this = this;
        _this.panel.removeAll(false);
        _this.panel.add(_this.panAccordion);
        _this.panel.add(_this.filesGrid);

    },
    viewUploads: function () {
        var _this = this;
        _this.panel.removeAll(false);
        _this.panel.add(_this.activeUploadsCont);
    }
    //endclass
};

OpencgaBrowserWidget.prototype.render = function (mode) {
    var _this = this;
    if (this.panel == null) {

        this.folderStore = Ext.create('Ext.data.TreeStore', {
            id:this.id+'folderStore',
            fields: ['text', 'oid'],
            root: {
                expanded: true,
                text: 'Drive',
                children: []
            },
            listeners: {
                beforeappend: function (este, node) {
                    if (node.isLeaf()) {
//                        console.log(node.raw.oid + " is a file");
                        return false; //cancel append because is leaf
                    }
                }
            }
        });
        this.allStore = Ext.create('Ext.data.TreeStore', {
            id:this.id+'allStore',
            fields: ['text', 'oid'],
            root: {
                expanded: true,
                text: 'Drive',
                children: []
            }
        });
        this.filesStore = Ext.create('Ext.data.Store', {
            fields: ['oid', 'fileBioType', 'fileType', 'fileFormat', 'fileName', 'multiple', 'diskUsage', 'creationTime', 'responsible', 'organization', 'date', 'description', 'status', 'statusMessage', 'members'],
            data: []
        });

        var refreshBucketAction = Ext.create('Ext.Action', {
            icon: Utils.images.refresh,
            text: 'Refresh bucket',
            handler: function(widget, event) {
                var record = _this.folderTree.getSelectionModel().getSelection()[0];
                if (record) {
                    if (record.raw.isBucket) {
                        var opencgaManager = new OpencgaManager();
                        opencgaManager.onRefreshBucket.addEventListener(function (sender, res) {
                            Ext.example.msg('Refresh Bucket', '</span class="emph">' + res + '</span>');
                            if (res.indexOf("ERROR") != -1) {
                                console.log(res);
                            } else {
                                _this.onNeedRefresh.notify();
                            }
                        });
                        opencgaManager.refreshBucket($.cookie("bioinfo_account"), record.raw.text, $.cookie("bioinfo_sid"));
                    }
                }
            }
        });

        var renameBucketAction = Ext.create('Ext.Action', {
//            icon: Utils.images.refresh,
            text: 'Rename bucket',
            handler: function(widget, event) {
                var record = _this.folderTree.getSelectionModel().getSelection()[0];
                if (record) {
                    if (record.raw.isBucket) {
                        Ext.Msg.prompt('Rename bucket', 'Please enter a new name:', function (btn, text) {
                            if (btn == 'ok') {
                                text = text.replace(/[^a-z0-9-_.\/\s]/gi, '').trim();

                                var opencgaManager = new OpencgaManager();
                                opencgaManager.onRenameBucket.addEventListener(function (sender, res) {
                                    Ext.example.msg('Refresh Bucket', '</span class="emph">' + res + '</span>');
                                    if (res.indexOf("ERROR") != -1) {
                                        console.log(res);
                                    } else {
                                        _this.onNeedRefresh.notify();
                                    }
                                });
//                                accountId, bucketId, newBucketId, sessionId
                                opencgaManager.renameBucket($.cookie("bioinfo_account"), record.raw.bucketId, text, $.cookie("bioinfo_sid"));
                            }
                        }, null, null, "new name");
                    }
                }
            }
        });

        this.folderTree = Ext.create('Ext.tree.Panel', {
            //xtype:"treepanel",
            id: this.id + "activeTracksTree",
            title: "Upload & Manage",
            bodyPadding: "5 0 0 0",
            margin: "-1 0 0 0",
            border: false,
            autoScroll: true,
            flex: 4,
            useArrows: true,
            rootVisible: false,
            hideHeaders: true,
//			selType: 'cellmodel',
            //plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2,listeners:{
            //edit:function(editor, e, eOpts){
            //var record = e.record; //en la vista del cliente
            /*todo, ahora q llame la servidor. y lo actualize*/
            //}
            //}})],
            columns: [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'text',
                    flex: 1,
                    editor: {xtype: 'textfield', allowBlank: false}
                }
//                ,
//                {
//                    xtype: 'actioncolumn',
//                    menuDisabled: true,
//                    align: 'center',
//                    width: 30,
//                    renderer: function (value, metaData, record) {
//                        if (record.raw.isBucket) {
//                            this.icon = Utils.images.refresh;
//                            this.tooltip = 'Refresh bucket to find new files';
//                        } else {
//                            this.tooltip = null;
//                            this.icon = null;
//                        }
//                    },
//                    handler: function (grid, rowIndex, colIndex, actionItem, event, record, row) {
//                        if (record.raw.isBucket) {
//                            var opencgaManager = new OpencgaManager();
//                            opencgaManager.onRefreshBucket.addEventListener(function (sender, res) {
//                                Ext.example.msg('Refresh Bucket', '</span class="emph">' + res + '</span>');
//                                if (res.indexOf("ERROR") != -1) {
//                                    console.log(res);
//                                } else {
//                                    _this.onNeedRefresh.notify();
//                                }
//                            });
//                            opencgaManager.refreshBucket($.cookie("bioinfo_account"), record.raw.text, $.cookie("bioinfo_sid"));
//                        }
//
//                    }
//                }
            ],
            viewConfig: {
                markDirty: false,
                plugins: {
                    ptype: 'treeviewdragdrop'
                },
                listeners: {
                    drop: function (node, data, overModel, dropPosition, eOpts) {
                        var record = data.records[0];
                        //check if is leaf and if the record has a new index
                        if (record.isLeaf() && record.data.index != record.removedFrom && record.data.checked) {
                            var id = record.data.trackId;
                            _this.setTrackIndex(id, record.data.index);
                        }
                    },
                    itemcontextmenu: function(este, record, item, index, e) {
                        e.stopEvent();
                        var items = [];
                        console.log(record)
                        if (record.raw.isBucket) {
                            items.push(refreshBucketAction);
                            items.push(renameBucketAction);
                            var contextMenu = Ext.create('Ext.menu.Menu', {
                                items: items
                            });
                            contextMenu.showAt(e.getXY());
                        }
                        return false;
                    }
                }
            },
            listeners: {
                selectionchange: function (este, selected, eOpts) {
                    var record = selected[0];
                    if (typeof record != 'undefined') {//avoid deselection
                        var field, deep;
                        if (record.raw.isBucket != null) {//is a bucket
                            field = 'text';
                            deep = false;
                        } else {
                            field = 'oid';
                            deep = true;
                        }
                        var node = _this.allStore.getRootNode().findChild(field, record.raw[field], deep);
                        var childs = [];
                        _this.selectedFolderNode = {value: node.data[field], field: field};
                        node.eachChild(function (n) {
                            childs.push(n.raw);
                        });
                        _this.filesGrid.setTitle(node.getPath("text", " / "));
                        _this.filesStore.loadData(childs);
                        if (mode == "folderSelection") {
                            _this.selectedFileNode = node.raw;
                            _this.selectButton.enable();
                        }
                    }
                },
                viewready: function (este, eOpts) {//Fires when the grid view is available (use this for selecting a default row).
                    setTimeout(function(){ // forced to do this because some ExtJS 4.2.0 event problem
                        var node = este.getRootNode().getChildAt(0);
                        if (typeof node != 'undefined') {
                            este.getSelectionModel().select(node);
                        }
                    },0);
                },
                checkchange: function (node, checked) {
                },
                itemmouseenter: function (este, record) {
                },
                itemmouseleave: function (este, record) {
                }
            },
            store: this.folderStore
        });


        /*MANAGE BUCKETS*/
        var newProjectButton = Ext.create('Ext.button.Button', {
            text: 'OK',
            handler: function () {
                _this.createProject();
                _this.folderTree.toggleCollapse();
                //manageProjects.toggleCollapse();
            }
        });
        var newProjectNameField = Ext.create('Ext.form.field.Text', {
            id: this.id + "newProjectNameField",
//        	width: 160,
            emptyText: 'name',
            allowBlank: false
        });
        var newProjectDescriptionField = Ext.create('Ext.form.field.TextArea', {
            id: this.id + "newProjectDescriptionField",
//        	width: 160,
            emptyText: 'description'
        });
        var newProjectCont = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: { type: 'hbox', align: 'stretch'},
            items: [newProjectNameField, newProjectDescriptionField]
        });
        var manageProjects = Ext.create('Ext.panel.Panel', {
            title: "Create bucket",
            bodyPadding: 5,
            border: false,
            items: [newProjectNameField, newProjectDescriptionField, newProjectButton]
        });
        /*END MANAGE PROJECTS*/





        /*Files grid*/
        var indexAction = Ext.create('Ext.Action', {
            icon   : Utils.images.info,  // Use a URL in the icon config
            text: 'Create index',
//            disabled: true,
            handler: function(widget, event) {
                var record = _this.filesGrid.getSelectionModel().getSelection()[0];
                if (record) {
                    var opencgaManager = new OpencgaManager();
                    opencgaManager.onIndexer.addEventListener(function (sender, response) {
                        console.log(response);
                        Ext.example.msg("indexer", response);
                        record.raw.indexerId = response;
//                                if (response.indexOf("ERROR:") != -1){
//                                }else{
//                                    //delete complete
////                                    record.destroy();
//                                    _this.onNeedRefresh.notify();
//                                }
                    });
                    opencgaManager.indexer($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid);


//                    console.log(record.raw.status);
//                    if (record.raw.status.indexOf('indexer') == -1) {
//                        opencgaManager.onIndexer.addEventListener(function (sender, response) {
//                            console.log(response)
//                            Ext.example.msg("indexer", response);
//                            record.raw.indexerId = response;
////                                if (response.indexOf("ERROR:") != -1){
////                                }else{
////                                    //delete complete
//////                                    record.destroy();
////                                    _this.onNeedRefresh.notify();
////                                }
//                        });
//                        opencgaManager.indexer($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid);
//                    } else {
//                        Ext.example.msg('Indexer', 'The file is already being indexed');
//                        opencgaManager.onIndexerStatus.addEventListener(function (sender, response) {
//                            console.log(response)
//                            Ext.example.msg("indexer status", response);
////                                if (response.indexOf("ERROR:") != -1){
////                                }else{
////                                    //delete complete
//////                                    record.destroy();
////                                    _this.onNeedRefresh.notify();
////                                }
//                        });
//                        opencgaManager.indexerStatus($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid, record.raw.status);
//                    }
                }
            }
        });
        var showName = Ext.create('Ext.Action', {
//            icon: Utils.images.info,
            text: 'Show name',
//            disabled: true,
            handler: function(widget, event) {
                var rec = _this.filesGrid.getSelectionModel().getSelection()[0];
                if (rec) {
                    Ext.example.msg('objectId', '' + rec.get('oid'));
                }
            }
        });

        var deleteAction = Ext.create('Ext.Action', {
            icon: Utils.images.del,
            text: 'Delete this file',
//            disabled: true,
            handler: function(widget, event) {
                var record = _this.filesGrid.getSelectionModel().getSelection()[0];
                if (record) {
                    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this file?<p class="emph">' + record.data.fileName + '<p>', function (answer) {
                        if (answer == "yes") {
                            console.log("deleting")
                            var opencgaManager = new OpencgaManager();
                            opencgaManager.onDeleteObjectFromBucket.addEventListener(function (sender, response) {
                                if (response.indexOf("ERROR:") != -1) {
                                    Ext.example.msg("Deleting", response);
                                } else {
                                    //delete complete
                                    record.destroy();
                                    _this.onNeedRefresh.notify();
                                }
                            });
                            opencgaManager.deleteObjectFromBucket($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid);
                        }
                    });
                }
            }
        });

        this.filesGrid = Ext.create('Ext.grid.Panel', {
            title: this.allStore.getRootNode().getPath("text", " / "),
            store: this.filesStore,
            flex: 4,
            border: false,
            viewConfig: {
                stripeRows: true,
                listeners: {
                    itemcontextmenu: function(este, record, item, index, e) {
                        e.stopEvent();
                        var items = [showName];
                        console.log(record)
                        if (record.raw.fileFormat == 'bam' || record.raw.fileFormat == 'vcf') {
                            items.push(indexAction);
                        }
                        items.push(deleteAction);
                        var contextMenu = Ext.create('Ext.menu.Menu', {
                            items: items
                        });
                        contextMenu.showAt(e.getXY());
                        return false;
                    }
                }
            },
            selModel: {
                mode: 'SINGLE',
                //allowDeselect:true,
                listeners: {
                    selectionchange: function (este, item) {
                        if (item.length > 0) {//se compr
                            _this.selectedFileNode = item[0].raw;
                            if (mode == "fileSelection" && item[0].raw.fileType == "dir") {
                                return;
                            }
                            _this.selectButton.enable();
                            //this.selectedLabel.setText('<p>The selected file <span class="emph">'+item[0].data.fileName.substr(0,40)+'</span><span class="ok"> is allowed</span>.</p>',false);
                            //TODO por defecto cojo el primero pero que pasa si el data contiene varios ficheros??
                        } else {
                            _this.selectButton.disable();
                        }
                    }
                }
            },
            columns: [
                { text: 'File type', xtype: 'actioncolumn', menuDisabled: true, align: 'center', width: 54, icon: Utils.images.bluebox,
                    renderer: function (value, metaData, record) {
                        this.icon = Utils.images[record.data.fileType];
                        this.tooltip = record.data.fileType;
                    }
                },
                { text: 'Name', dataIndex: 'fileName', flex: 2 },
                { text: 'Creation time', dataIndex: 'creationTime', flex: 1 }
            ]
        });
        /**/

        this.panAccordion = Ext.create('Ext.panel.Panel', {
            minWidth: 125,
            minHeight: 250,
            flex: 1,
            cls: 'panel-border-right',
            border: false,
            layout: 'accordion',
            items: [this.folderTree, manageProjects /*, panFilter*/]
        });

        this.selectButton = Ext.create('Ext.button.Button', {
            text: 'Ok',
            disabled: true,
            handler: function () {
                _this.onSelect.notify({id: _this.selectedFileNode.oid, bucketId: _this.selectedFileNode.bucketId});
                _this.panel.close();
            }
        });

        this.activeUploadsCont = Ext.create('Ext.container.Container', {
            autoScroll: true,
            items: []
        });


        /**MAIN PANEL**/
//		this.height=205+(26*suites.length);//segun el numero de suites

        var tbarObj = {items: []};
        switch (mode) {
            case "folderSelection" :
                var item;
                item = {text: 'New folder', handler: function () {
                    _this.folderTree.expand();
                    _this.createFolder();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New bucket', handler: function () {
                    manageProjects.expand();
                }};
                tbarObj.items.splice(0, 0, item);
                this.filesStore.filter("fileType", /dir/);
                break;
            case "manager" :
                var item;
                item = {text: 'Upload', handler: function () {
                    _this.drawUploadWidget();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New folder', handler: function () {
                    _this.folderTree.expand();
                    _this.createFolder();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New bucket', handler: function () {
                    manageProjects.expand();
                }};
                tbarObj.items.splice(0, 0, item);
                this.selectButton.hide();
                break;
            default :
                var item;
                item = {text: 'Upload', handler: function () {
                    _this.drawUploadWidget();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New folder', handler: function () {
                    _this.folderTree.expand();
                    _this.createFolder();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New bucket', handler: function () {
                    manageProjects.expand();
                }};
                tbarObj.items.splice(0, 0, item);
                break;
        }

        tbarObj.items.push({
            id: this.id + 'activeUploadsButton',
            text: 'Active uploads',
            enableToggle: true,
            pressed: false,
            toggleHandler: function () {
                if (this.pressed) {
                    _this.viewUploads();
                } else {
                    _this.viewBuckets();
                }
            }
        });
        this.panel = Ext.create('Ext.window.Window', {
            title: 'Upload & Manage',
            resizable: false,
            minimizable: true,
            constrain: true,
            closable: false,
            modal: true,
            height: this.height,
            width: this.width,
            layout: { type: 'hbox', align: 'stretch'},
            tbar: tbarObj,
            items: [this.panAccordion, this.filesGrid],
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Close', handler: function () {
                    _this.onSelect = new Event();
                    _this.panel.hide();
                }},
                this.selectButton
            ],
            listeners: {
                scope: this,
                minimize: function () {
                    this.panel.hide();
                },
                destroy: function () {
                    delete this.panel;
                }
            }
        });
    }//if null

    this._updateFolderTree();
    this.panel.show();
};

OpencgaBrowserWidget.prototype.setFilter = function () {
    var _this = this;
    var recordOrigin = this.viewOrigin.getSelectionModel().getSelection()[0];
    var recordSuite = this.viewSuite.getSelectionModel().getSelection()[0];

    this.folderStore.clearFilter();

    if (recordOrigin != null) {
        switch (recordOrigin.data.suiteId) {
            case  "all":
                break;
            case  "Uploaded Data":
                this.folderStore.filter(function (item) {
                    return item.data.jobId < 0;
                });
                break;
            case  "Job Generated":
                this.folderStore.filter(function (item) {
                    return item.data.jobId > 0;
                });
                break;
        }
    }
    if (recordSuite != null) {
        switch (recordSuite.data.suiteId) {
            case  1:
                break;
            default :
                this.folderStore.filter(function (item) {
                    return item.data.suiteId == recordSuite.data.suiteId;
                });
        }
    }

    this.folderStore.filter(function (item) {
        var str = Ext.getCmp(_this.searchFieldId).getValue().toLowerCase();
        if (item.data.name.toLowerCase().indexOf(str) < 0) {
            return false;
        }
        return true;
    });
};

OpencgaBrowserWidget.prototype.checkTags = function (tags) {
    for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].indexOf('|') > -1) {
            var orTags = this.tags[i].split('|');
            var orMatch = false;
            for (var j = 0; j < orTags.length; j++) {
                if (tags.indexOf(orTags[j]) > -1) {
                    orMatch = true;
                }
            }
            if (!orMatch) {
                return false;
            }
        } else {
            if (tags.indexOf(this.tags[i]) == -1) {
                return false;
            }
        }
    }
    return true;

};


OpencgaBrowserWidget.prototype.createProject = function () {
    var _this = this;
    var name = Ext.getCmp(this.id + "newProjectNameField").getValue();
    var desc = Ext.getCmp(this.id + "newProjectDescriptionField").getValue();
    if (name != "") {
        Ext.getBody().mask();
        _this.panel.setLoading("Creating project");
        this.adapter.createBucket(name, desc, $.cookie("bioinfo_account"), $.cookie("bioinfo_sid"));
    }
};

OpencgaBrowserWidget.prototype._getFolderTreeSelection = function () {
    var selectedBuckets = this.folderTree.getSelectionModel().getSelection();
    if (selectedBuckets.length < 1) {
        Ext.example.msg('No folder selected', 'Please select a bucket or a folder.');
        return null;
    } else {
        var record = selectedBuckets[0];
        var bucketName;
        var parent = '';
        if (record.raw.fileType != null && record.raw.fileType == "dir") {
            var path = record.getPath("text", "/").substr(1);
            var pathArr = path.split("/", 2);
            parent = path.replace(pathArr.join("/"), "").substr(1) + "/";
            bucketName = pathArr[1];
        } else {
            bucketName = record.raw.text;
        }
        return {bucketId: bucketName, directory: parent};
    }
};

OpencgaBrowserWidget.prototype.drawUploadWidget = function () {
    var _this = this;
    var folderSelection = this._getFolderTreeSelection();
    if (folderSelection != null) {
        _this.uploadWidget.draw(folderSelection);
    }
};

OpencgaBrowserWidget.prototype.createFolder = function () {
    var _this = this;
    if (this.accountData.buckets.length < 1) {
        Ext.MessageBox.alert('No buckets found', 'Please create and select a bucket.');
    } else {
        var folderSelection = this._getFolderTreeSelection();
        if (folderSelection != null) {
            Ext.Msg.prompt('New folder', 'Please enter a name for the new folder:', function (btn, text) {
                if (btn == 'ok') {
                    text = text.replace(/[^a-z0-9-_.\s]/gi, '');
                    text = text.trim() + "/";
                    var opencgaManager = new OpencgaManager();
                    opencgaManager.onCreateDirectory.addEventListener(function (sender, res) {
                        Ext.example.msg('Create folder', '</span class="emph">' + res + '</span>');
                        if (res.indexOf("ERROR") != -1) {
                            console.log(res);
                        } else {
                            _this.onNeedRefresh.notify();
                        }
                    });
                    opencgaManager.createDirectory($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), folderSelection.bucketId, folderSelection.directory + text);
                }
            }, null, null, "New Folder");
        }
    }
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ManageProjectsWidget(args){
	var _this=this;
	this.id = "ManageProjectsWidget_"+ Math.round(Math.random()*10000);
	this.targetId = null;

	this.title = null;
   	this.width = 880;
	this.height = 420;
	this.suiteId=-1;
	
	this.args = args;
	
	if (args != null){
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
        if (args.suiteId != null){
        	this.suiteId = args.suiteId;
        }
    }
	
	this.selectedItems = new Object();
	this.selectedProjectId = null;
	this.selectedProjectName = null;
	this.selectedProjectSuiteId = null;
	this.selectedProjectJobs = null;
	this.lastSelectedItem = null;
	
	this._storeProjects = Ext.create('Ext.data.Store', {
		fields: ["name","projectId","jobs","active"],
		data : []
	});
	
	//barrier while deleting
	this.deleting=false;
	
	this.onRefreshProjectList = new Event();
};

ManageProjectsWidget.prototype.draw = function (){
	var _this = this;
	this._render();
	this._panel.show();
	this.refreshListProject();
	this.interval = setInterval(function () {
			_this.refreshListProject();
	},4000);
		
};

ManageProjectsWidget.prototype.getPanel = function (div){
	this._render("panel",div);
	return this._panel;
};

ManageProjectsWidget.prototype._render = function (mode,targetId){
	var _this=this;
	if(this._panel==null){		
        var viewProject = Ext.create('Ext.view.View', {
			id:this.id+'viewProject',
		    store : this._storeProjects,
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    selectionchange:function(este,sel){
                    	if(sel.length>0){//sometimes returns null
                    		if(sel[0].data.jobs == null){ sel[0].data.jobs=[]; }
                    		_this.optionProjectClick(sel[0].data);
                    	}
                    }
                }
            },
            cls: 'list',
         	trackOver: true,
            overItemCls: 'list-item-hover',
            itemSelector: '.list-item',
            tpl: '<tpl for="."><div class="list-item">{name}</div></tpl>'
        });
        

		
        var newProjectButton = Ext.create('Ext.button.Button',{
        	text : 'OK',
        	handler : function() {
        		_this.optionProjectClick("newProject");
        		newProjectPan.toggleCollapse();
        	}
        });
        var newProjectNameField = Ext.create('Ext.form.field.Text',{
        	id:this.id+"newProjectNameField",
        	width: 210,
        	emptyText: 'name',
        	allowBlank:false
        });
        var newProjectDescriptionField = Ext.create('Ext.form.field.TextArea',{
        	id:this.id+"newProjectDescriptionField",
        	width: 210,
        	emptyText: 'description'
        });
		var newProjectCont = Ext.create('Ext.container.Container', {
			flex:1,
			layout: { type: 'hbox',align: 'stretch'},
			items:[newProjectNameField,newProjectDescriptionField]
		});

		var newProjectPan = Ext.create('Ext.panel.Panel', {
			title:"Create Project",
			bodyPadding:5,
			border:false,
			items:[newProjectNameField,newProjectDescriptionField,newProjectButton]
		});
		/**TEXT SEARCH FILTER**/
		var searchField = Ext.create('Ext.form.field.Text',{
			flex:1,
			emptyText: 'search project',
			enableKeyEvents:true,
			listeners:{
				change:function(){
					var searchText = this.getValue().toLowerCase();
					_this._storeProjects.clearFilter();
					_this._storeProjects.filter(function(item){
						if(item.data.name.toLowerCase().indexOf(searchText)<0){
							return false;
						}
						return true;
					});
				}
			}
		});
		
		var renameButton = Ext.create('Ext.button.Button',{
			id: this.id+"rBtn",
        	iconCls: 'icon-rename-project',
        	tooltip: "Rename selected project",
        	margin: "0 0 0 2",
        	handler: function(){
//        		console.log("Renaming project: "+_this.selectedProjectId+" Name: "+_this.selectedProjectName);
        		_this.renameProject(_this.selectedProjectId, _this.selectedProjectName);
        	}
        });
        var deleteButton = Ext.create('Ext.button.Button',{
        	id: this.id+"dBtn",
        	iconCls: 'icon-project-delete',
        	tooltip: "Delete selected project",
        	margin: "0 0 0 2",
        	handler: function(){
//        		console.log("Deleting project: "+_this.selectedProjectId);
        		_this.deleteProject(_this.selectedProjectId, _this.selectedProjectSuiteId, _this.selectedProjectJobs);
        	}
        });
        var activeButton = Ext.create('Ext.button.Button',{
        	id: this.id+"aBtn",
        	iconCls: 'icon-change-project',
        	tooltip: "Active selected project",
        	margin: "0 0 0 2",
        	handler: function(){
        		_this.activeProject(_this.selectedProjectId, _this.selectedProjectName);
        	}
        });
		
		var searchProjectPanel = Ext.create('Ext.panel.Panel', {
        	layout: 'hbox',
        	flex: 1,
        	border: false,
			items: [searchField,renameButton,deleteButton,activeButton]
		});
        
        var panProjectList = Ext.create('Ext.panel.Panel', {
        	title:"Project list",
        	flex:1,
		    border:false,
			autoScroll:true,
			bodyPadding:5,
		    items:[searchProjectPanel,viewProject]
		});

		 var cont = Ext.create('Ext.panel.Panel', {
			    border:false,
			    minWidth:220,
				width:220,
				layout:'accordion',
			    items:[panProjectList,newProjectPan]
		});
        
        if(mode=='panel'){
			this._panel = Ext.create('Ext.panel.Panel', {
				title: 'Manage projects',
				renderTo:targetId,
				height:this.height,
				width:this.width,
				layout: { type: 'hbox',align: 'stretch'},
				items: cont
			});
		}
        else{
			this._panel = Ext.create('Ext.window.Window', { 
				title: 'Manage projects',
				iconCls:'icon-project-manager',
		    	resizable: false,
				minimizable: false,
				constrain: true,
				closable: true,
				modal: true,
				height: this.height,
				width: this.width,
				layout: { type: 'hbox',align: 'stretch'},
				items: cont,
				listeners: {
					 minimize: function(){
						 _this._panel.hide();
					 },
					 close: function(){
						 clearInterval(_this.interval);
						 if(_this._panel.getComponent(1)!=null){
							 _this._panel.getComponent(1).hide();
							 _this._panel.remove(1,false);
						 }
						 delete _this._panel;
					 }
				}
			});
		}
	}
};

//ManageProjectsWidget.prototype.parseData = function (data){	
////  load data
////	this._storeProjects.loadData(data);
////	console.log(this.selectedProjectName);
//	if(this[this.selectedProjectName+"Grid"] != null){
//		var months = {"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September","10":"October","11":"November","12":"December"};
//		var monthNum = null;
//		data = JSON.parse(data);
//		var projectData = new Array();
//		for(var i=0; i<data.length; i++){
//			if(data[i].projectId == this.selectedProjectId && data[i].visites >= 0){
//				monthNum = data[i].creationTime.substr(5,2);
//				data[i].creationMonth = data[i].creationTime.substr(0,4)+" - "+months[monthNum];
//				console.log(data[i].creationMonth);
//				projectData.push(data[i]);				
//			}
//		}
//		this[this.selectedProjectName+"Grid"].store.loadData(projectData);
//	}
//};

ManageProjectsWidget.prototype.optionProjectClick = function (dataRecord){
	this.selectedItems = new Object();
	var projectName = dataRecord.name;
	if(this.selectedProjectName != projectName){
		this.lastSelectedItem=null;
	}
	this.selectedProjectId = dataRecord.projectId;
	this.selectedProjectName = projectName;
	this.selectedProjectSuiteId = dataRecord.suiteId;
	this.selectedProjectJobs = dataRecord.jobs;
	if(this._panel.getComponent(1)!=null){
		this._panel.getComponent(1).hide();
		this._panel.remove(1,false);
	}
	switch (dataRecord){
		case "newProject": this.createProject(); break;
		default: this._panel.add(this.getByProjectGrid(dataRecord.jobs,projectName).show());
	}
};

ManageProjectsWidget.prototype.getByProjectGrid = function(data, name){
	var _this=this;
	var months = {"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","09":"September","10":"October","11":"November","12":"December"};
	var monthNum = null;
	var projectData = new Array();
	for(var i=0; i<data.length; i++){
		if(data[i].visites >= 0){
			monthNumStr = data[i].creationTime.substr(5,2); 
			monthNum = parseInt(monthNumStr);
			data[i].creationMonth = data[i].creationTime.substr(0,4)+" - "+monthNumStr+" ("+months[monthNum]+")";
			projectData.push(data[i]);
		}
	}
	
    if(this[name+"Grid"]==null){
    	var groupField = 'creationMonth';
    	var modelName = name;
    	var fields= ["name", "creationTime", "toolName", "creationMonth","jobId"];
    	var columns = [
		    		  {"header":"Name","dataIndex":"name",flex:1},
		    		  {"header":"Launched on","dataIndex":"creationTime",flex:0.7},
		    		  {"header":"Tool name","dataIndex":"toolName",flex:1}];    	
		this[name+"Grid"] = this.doGrid(columns,fields,modelName,groupField);
    }
//    console.log(this.lastSelectedItem);
    if(this.lastSelectedItem != null){
    	var jid = this.lastSelectedItem.data.jobId;
    }
    
    if(!this.deleting){
    	this[name+"Grid"].store.loadData(projectData);
    }
    
    
    if(this.lastSelectedItem != null){
    	this[name+"Grid"].getSelectionModel().select(this[name+"Grid"].store.find("jobId",jid));
    }
    return this[name+"Grid"];
};

ManageProjectsWidget.prototype.doGrid = function (columns,fields,modelName,groupField){
	var _this = this;
	
    Ext.define(modelName, {
	    extend: 'Ext.data.Model',
    	fields:fields
	});
   	var store = Ext.create('Ext.data.Store', {
		groupField: groupField,
		sorters: [{ property : 'creationMonth', direction: 'DESC'}, { property : 'creationTime', direction: 'DESC'}],
		model:modelName
    });
	var grid = Ext.create('Ext.grid.Panel', {
		id: this.id+modelName,
        store: store,
        title : "Jobs of project "+modelName,
        border: false,
        cls: 'panel-border-left',
		flex: 3,
		multiSelect: false,
		features: [{ftype:'grouping'}],
        columns: columns,
        listeners: {
            selectionchange:function(este,sel){
            	if(sel[0]!=null){//sometimes returns null
            		_this.selectedItems = new Object();
            		for(var i=0; i<sel.length; i++){
            			_this.selectedItems[sel[i].data.jobId]=sel[i];
            			_this.lastSelectedItem = sel[i];
            		}
//            		Ext.getCmp("deleteButton").enable();
            	}
            }
        },
        tbar: [{
        	id: "deleteButton",
        	text: 'Delete selected job',
        	iconCls: 'icon-delete',
//        	disabled: true,
        	handler : function(){
        		_this.deleteJob(modelName);
        	}
        }]
    });
	
return grid;
};

ManageProjectsWidget.prototype.deleteJob = function (modelName){
	var _this = this;

	this.deleting = true;
	Ext.Msg.confirm("Delete job", "Are you sure you want to delete the selected job(s)?", function (btnClicked){
		if(btnClicked == "yes") {
			_this[modelName+"Grid"].store.remove(_this.lastSelectedItem);
			var adapter = new WumAdapter();
			adapter.onDeleteJob.addEventListener(function (sender, data){
				console.log("back from delete "+data.response);
				if(data.response.indexOf("OK") != -1) {
					_this.deleting = false;
				}
				else {
					Ext.Msg.alert("Delete job", "ERROR: could not delete job.");
				}
			});
			adapter.deleteJob(_this.lastSelectedItem.data.jobId, $.cookie('bioinfo_sid'));
			_this.lastSelectedItem = null;
		}
	});
};

ManageProjectsWidget.prototype.createProject = function (){
	var _this = this;
	
	var name = Ext.getCmp(this.id+"newProjectNameField").getValue();
	var desc = Ext.getCmp(this.id+"newProjectDescriptionField").getValue();
	if(name!=""){
		var adapter = new WumAdapter();
		adapter.onCreateProject.addEventListener(function (sender, data){
			if(data.indexOf("ERROR") != -1) {
				Ext.Msg.alert("Create project", "ERROR: could not create this project.");
			}
			else {
				_this.refreshListProject();
			}
			_this._panel.setLoading(false);
			Ext.getBody().unmask();
		});
		Ext.getBody().mask();
		_this._panel.setLoading("Creating project");
		adapter.createProject(name, desc, $.cookie("bioinfo_sid"));
	}
};

ManageProjectsWidget.prototype.renameProject = function (projectId, projectName){
	var _this = this;
	var nameField = Ext.create('Ext.form.field.Text',{
		fieldLabel: 'New name',
		labelWidth: 70,
		width: 200,
		minWidth: 200,
		allowBlank: false
	});
	
	var labelInfo = Ext.create('Ext.toolbar.TextItem', {
		padding:3,
		text:'<span class="info">Type the new project name</span>'
	});
	
	this.pan = Ext.create('Ext.panel.Panel', {
		bodyPadding:20,
	    height:100,
	    border:false,
	    bbar:{items:[labelInfo]},
	    items: [nameField]
	});
	
	this.renameWindow = Ext.create('Ext.window.Window',{
		title: 'Rename project '+projectName,
		resizable: false,
		closable: true,
		constrain:true,
		modal: true,
		items: this.pan,
		buttons:['->',
		         {text:'Ok', handler: function(){
		        	 	var newProjectName = nameField.getValue();
		        		if(newProjectName!=""){
		        			var adapter = new WumAdapter();
		        			adapter.onRenameProject.addEventListener(function (sender, data){
		        				if(data.indexOf("OK") != -1) {
		        					Ext.getCmp(_this.id+_this.selectedProjectName).setTitle("Jobs of project "+newProjectName);
		        					_this.refreshListProject();
		        				}
		        				else {
		        					Ext.Msg.alert("Rename project", "ERROR: could not rename this project.");
		        				}
		        			});
		        			adapter.renameProject(projectId, newProjectName, $.cookie("bioinfo_sid"));
		        			_this.renameWindow.close();
		        		}
		        	 }
		         }
		]
	});
	this.renameWindow.show();
};

ManageProjectsWidget.prototype.deleteProject = function (projectId, projectSuiteId, projectJobs){
	var _this = this;

	Ext.Msg.confirm("Delete project", "Are you sure you want to delete this project?", function (btnClicked){
		if(btnClicked == "yes") {
			var adapter = new WumAdapter();
			adapter.onDeleteProject.addEventListener(function (sender, data){
				if(data.indexOf("OK") != -1) {
					_this.refreshListProject();
					if(_this._panel.getComponent(1)!=null){
						_this._panel.getComponent(1).hide();
						_this._panel.remove(1,false);
					}
				}
				else {
					Ext.Msg.alert("Delete project", "ERROR: could not delete this project. Project must not have jobs to be deleted.");
				}
				_this._panel.setLoading(false);
				Ext.getBody().unmask();
			});
			Ext.getBody().mask();
			_this._panel.setLoading("Deleting project");
			adapter.deleteProject(projectId, $.cookie("bioinfo_sid"), projectSuiteId);
		}
	});
};

ManageProjectsWidget.prototype.refreshListProject = function (){
	var _this = this;
	
	var adapter = new WumAdapter();
	adapter.onListProject.addEventListener(function(sender,data){
		var data = JSON.parse(data);
		_this._storeProjects.loadData(data);
		var activeProjectId = null;
		var projectList = new Array();
		for ( var i = 0; i < data.length; i++) {
			projectList.push({name:data[i].name,projectId:data[i].projectId});
			if(data[i].active){
				activeProjectId=data[i].projectId;
				_this.selectedProjectName = data[i].name;
//				console.log(_this.selectedProjectName);
			}
		}
		if(_this.selectedProjectId==null){
			_this.selectedProjectId=activeProjectId;
		}
			
		_this._panel.setTitle("Manage projects - "+'<b class="err">'+_this.selectedProjectName+'</b>');
		var activeRecord = _this._storeProjects.find("projectId", _this.selectedProjectId);
		Ext.getCmp(_this.id+"viewProject").getSelectionModel().select(activeRecord);
//		Ext.getCmp('UserBarWidget__spltbtnActiveProjectID').setText('<b class="emph">'+_this.selectedProjectName+'</b>');
		_this.onRefreshProjectList.notify(projectList);
	});
	adapter.listProject($.cookie("bioinfo_sid"),_this.suiteId);
};

ManageProjectsWidget.prototype.activeProject = function (projectId, projectName){
	var _this = this;
	
	var adapter = new WumAdapter();
	adapter.onActiveProject.addEventListener(function (sender, data){
		 if(data.indexOf("ERROR") != -1) {
			 Ext.Msg.alert("Create project", "ERROR: could not active this project.");
		 }
		 else {
			 Ext.getCmp('UserBarWidget__spltbtnActiveProjectID').setText('<b class="emph">'+projectName+'</b>');
			 _this._panel.setTitle("Manage projects - "+'<b class="err">'+projectName+'</b>');
		 }
		 _this._panel.setLoading(false);
		 Ext.getBody().unmask();
	});	
	Ext.getBody().mask();
	this._panel.setLoading("Loading project");
	adapter.activeProject(projectId, $.cookie('bioinfo_sid'));
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function CheckBrowser(appName){

    if(Ext.isIE){
        //console.time implementation for IE
        if(window.console && typeof(window.console.time) == "undefined") {
            console.time = function(name, reset){
                if(!name) { return; }
                var time = new Date().getTime();
                if(!console.timeCounters) { console.timeCounters = {} };
                var key = "KEY" + name.toString();
                if(!reset && console.timeCounters[key]) { return; }
                console.timeCounters[key] = time;
            };

            console.timeEnd = function(name){
                var time = new Date().getTime();
                if(!console.timeCounters) { return; }
                var key = "KEY" + name.toString();
                var timeCounter = console.timeCounters[key];
                if(timeCounter) {
                    var diff = time - timeCounter;
                    var label = name + ": " + diff + "ms";
                    console.info(label);
                    delete console.timeCounters[key];
                }
                return diff;
            };
        }
    }

	var browserOk = false;
	switch (appName){
	case "renato":
		if(Ext.chromeVersion>=16){
			browserOk = true;
		}
		if(Ext.safariVersion>=5){
			browserOk = true;
		}
		if(Ext.firefoxVersion>=10){
			browserOk = true;
		}
		break;
	case "variant":
		if(Ext.chromeVersion>=16){
			browserOk = true;
		}
		if(Ext.safariVersion>=5){
			browserOk = true;
		}
		if(Ext.firefoxVersion>=10){
			browserOk = true;
		}
		break;
	default:
		if(Ext.chromeVersion>=14){
			browserOk = true;
		}
		if(Ext.safariVersion>=5){
			browserOk = true;
		}
        if(Ext.isIE10>=5){
            browserOk = true;
        }
	}
//if(Ext.operaVersion<=0){
//	browserOk = true;
//}
//if(Ext.firefoxVersion<=0){
//	browserOk = true;
//}
	if(browserOk==false){
		console.log("--------------------------------------------"+browserOk)
//		Ext.create("Ext.window.Window",{
//			title:'Supported browsers',
//		modal:true,
//		resizable:false,
//		bodyStyle:"background:#ffffff;",
//		bodyPadding:15,
//		width:330,
//		height:200,
//			html:'<p>This release makes an intensive use of new web technologies and standards like HTML5, so the browsers that are fully supported from now on are:</p>'+ 
//			'<br><p class="emph">Chrome 14+</p>'+ 
//			'<p class="emph">Safari 5+</p>'+ 
//			'<br>Other browsers or may rise some errors.'
//		}).show();
		$("#checkBrowser")
//		.html('<p>This release makes an intensive use of new web technologies and standards like HTML5 and SVG, so the browsers that are fully supported and will provide the best user experience are:</p>'+ 
//				'<p class="emph">Google Chrome 14+</p>'+ 
//				'<p class="emph">Apple Safari 5+</p>'+ 
//				'Other browsers may rise some errors. Firefox11+ works very slow on Linux and Windows 7 and the usage it is not recommended. Internet Explorer 9 is not supported since they not support many of the features of HTML5, Internet Explorer 10 Consumer Preview works fine.')
		.html('This application provides the best user experience with Google Chrome and Apple Safari, otherwise some latencies may be experienced when browsing due to some problems in Firefox.')
		.css('width','540px')
		.css('height','40px')
		.css('position','absolute')
		.css('margin-left','300px')
		.css('margin-top','26px')
		.css('padding','5px')
		.css('border','1px solid #F1D031')
		.css('background','#FFFFA3')
		.css('color','#555')
		.css('position','absolute')
		.css('z-index','50000')
		.click(function(){
			$("#checkBrowser").fadeOut(function (){ $(this).remove(); });  
		});
	}
}

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function FileWidget(args){
	var _this=this;
	this.targetId = null;
	this.id = "FileWidget_" + Math.round(Math.random()*100000);
	this.wum = true;
	this.tags = [];
	
	this.args = args;
	
	if (args != null){
		if (args.targetId!= null){
			this.targetId = args.targetId;       
		}
		if (args.title!= null){
			this.title = args.title;    
			this.id = this.title+this.id;
		}
		if (args.wum!= null){
			this.wum = args.wum;    
		}
        if (args.tags!= null){
        	this.tags = args.tags;       
        }
        if (args.viewer!= null){
        	this.viewer = args.viewer;       
        }
        
	}
	
	this.dataAdapter = null;
	this.onOk = new Event(this);
	
//	this.browserData = new BrowserDataWidget();
	/** Events i listen **/
//	this.browserData.onSelect.addEventListener(function (sender, data){
//		_this.trackNameField.setValue(data.filename);
//		_this.fileNameLabel.setText('<span class="emph">'+ data.filename +'</span> <span class="info">(server)</span>',false);
//		_this.panel.setLoading();
//	});
//    this.browserData.adapter.onReadData.addEventListener(function (sender, data){
//    	console.log(data)
//    	_this.trackNameField.setValue(data.filename);
//    	_this.fileNameLabel.setText('<span class="emph">'+ data.filename +'</span> <span class="info">(server)</span>',false);
//    	_this.loadFileFromServer(data);
//    	_this.panel.setLoading(false);
//	});
    
    this.chartWidgetByChromosome = new ChartWidget({height:200,width:570});
};

FileWidget.prototype.getTitleName = function(){
	return this.trackNameField.getValue();
};


FileWidget.prototype.getFileFromServer = function(){
	//abstract method
};

FileWidget.prototype.loadFileFromLocal = function(){
	//abstract method
};

FileWidget.prototype.getChartItems = function(){
	return [this.chartWidgetByChromosome.getChart(["features","chromosome"])];
};

FileWidget.prototype.getFileUpload = function(){
	var _this = this;
	this.uploadField = Ext.create('Ext.form.field.File', {
		msgTarget : 'side',
		flex:1,
        padding:1,
//		width:75,
		emptyText: 'Choose a file',
        allowBlank: false,
        anchor: '100%',
		buttonText : 'Browse local',
//		buttonOnly : true,
		listeners : {
			change : {
				fn : function() {
					_this.panel.setLoading();
					var file = document.getElementById(_this.uploadField.fileInputEl.id).files[0];
                    debugger
					_this.trackNameField.setValue(file.name);
					_this.fileNameLabel.setText('<span class="emph">'+ file.name +'</span> <span class="info">(local)</span>',false);
					_this.loadFileFromLocal(file);
					_this.panel.setLoading(false);

				}
			}
		}
	});
	return this.uploadField;
};


FileWidget.prototype.draw = function(){
	var _this = this;
	
	if (this.openDialog == null){
	
		/** Bar for the chart **/
		var featureCountBar = Ext.create('Ext.toolbar.Toolbar');
		this.featureCountLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="dis">No file loaded</span>'
		});
		featureCountBar.add([this.featureCountLabel]);
		
		/** Bar for the file upload browser **/
		var browseBar = Ext.create('Ext.toolbar.Toolbar',{cls:'bio-border-false'});
		browseBar.add(this.getFileUpload());
		
		this.panel = Ext.create('Ext.panel.Panel', {
			border: false,
			cls:'panel-border-top panel-border-bottom',
	//		padding: "0 0 10 0",
			height:230,
			title: "Previsualization",
		    items : this.getChartItems(),
		    bbar:featureCountBar
		});
		
	//	var colorPicker = Ext.create('Ext.picker.Color', {
	//	    value: '993300',  // initial selected color
	//	    listeners: {
	//	        select: function(picker, selColor) {
	//	            alert(selColor);
	//	        }
	//	    }
	//	});
		this.trackNameField = Ext.create('Ext.form.field.Text',{
			name: 'file',
            fieldLabel: 'Track Name',
            allowBlank: false,
            value: 'New track from '+this.title+' file',
            emptyText: 'Choose a name',
            flex:1
		});
		
		var panelSettings = Ext.create('Ext.panel.Panel', {
			border: false,
			layout: 'hbox',
			bodyPadding: 10,
		    items : [this.trackNameField]	 
		});
		
		
		if(this.wum){
//			this.btnBrowse = Ext.create('Ext.button.Button', {
//		        text: 'Browse server',
//		        disabled:true,
////		        iconCls:'icon-local',
////		        cls:'x-btn-default-small',
//		        handler: function (){
//	    	   		_this.browserData.draw($.cookie('bioinfo_sid'),_this.tags);
//	       		}
//			});
			
//			browseBar.add(this.btnBrowse);
			
			if($.cookie('bioinfo_sid') != null){
				this.sessionInitiated();
			}else{
				this.sessionFinished();
			}
		}
		
		this.fileNameLabel = Ext.create('Ext.toolbar.TextItem', {
//			text:'<span class="emph">Select a <span class="info">local</span> file or a <span class="info">server</span> file from your account.</span>'
		});
//		browseBar.add(['->',this.fileNameLabel]);
		
		
		
		this.btnOk = Ext.create('Ext.button.Button', {
			text:'Ok',
			disabled:true,
			handler: function(){
				_this.onOk.notify({fileName:_this.file.name, adapter:_this.adapter});
				_this.openDialog.close();
			}
		});
		
		this.openDialog = Ext.create('Ext.ux.Window', {
			title : 'Open '+this.title+' file',
			taskbar:Ext.getCmp(this.args.viewer.id+'uxTaskbar'),
			width : 600,
	//		bodyPadding : 10,
			resizable:false,
			items : [browseBar, /*this.panel,*/ panelSettings],
			buttons:[this.btnOk, 
			         {text:'Cancel', handler: function(){_this.openDialog.close();}}],
			listeners: {
			    	scope: this,
			    	minimize:function(){
						this.openDialog.hide();
			       	},
			      	destroy: function(){
			       		delete this.openDialog;
			      	}
		    	}
		});
		
	}
	this.openDialog.show();
};

FileWidget.prototype._loadChartInfo = function(){

	var datastore = new Array();
 	for ( var chromosome in this.adapter.featuresByChromosome) {
		datastore.push({ features: this.adapter.featuresByChromosome[chromosome], chromosome: chromosome });
	}
 	this.chartWidgetByChromosome.getStore().loadData(datastore);
 	
 	this.panel.setLoading(false);
 	this.featureCountLabel.setText("Features count: " + this.adapter.featuresCount, false);
};



FileWidget.prototype.sessionInitiated = function (){
//	if(this.btnBrowse!=null){
//		this.btnBrowse.enable();
//	}
};
FileWidget.prototype.sessionFinished = function (){
//	if(this.btnBrowse!=null){
//		this.btnBrowse.disable();
//	}
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function LegendWidget(args){
	
	this.width = 300;
	this.height = 300;
	this.title = "Legend";
	
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
    }
	
	this.legendPanel = new LegendPanel();
	
};

LegendWidget.prototype.draw = function(legend){
	var _this = this;
	if(this.panel==null){
		
		var item = this.legendPanel.getPanel(legend);
	
		this.panel = Ext.create('Ext.ux.Window', {
			title : this.title,
			resizable: false,
			constrain:true,
			closable:true,
			width: item.width+10,
			height: item.height+70,
			items : [item],
			buttonAlign:'right',
			 layout: {
		        type: 'hbox',
		        align:'stretch' 
		    },
			buttons:[
					{text:'Close', handler: function(){_this.panel.close();}}
			]
		});
	}
	this.panel.show();
	
	
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function LegendPanel(args){
	this.width = 200;
	this.height = 250;
	
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
    }
	
	
};

LegendPanel.prototype.getColorItems = function(legend){
	panelsArray = new Array();
	
	for ( var item in legend) {
//		var color = legend[item].toString().replace("#", "");
//		var cp = new Ext.picker.Color();
//		cp.width = 20;
//		cp.colors = [color];
		var size=15;
		var color = Ext.create('Ext.draw.Component', {
        width: size,
        height: size,
        items:[{
				type: 'rect',
				fill: legend[item],
				x:0,y:0,
				width: size,
				height : size
				}]
		});
		
		var name = Utils.formatText(item, "_");
		
		var panel = Ext.create('Ext.panel.Panel', {
			height:size,
			border:false,
			flex:1,
			margin:"1 0 0 1",
		    layout: {type: 'hbox',align:'stretch' },
		    items: [color, {xtype: 'tbtext',text:name, margin:"1 0 0 3"} ]
		});
		
		panelsArray.push(panel);
	}
	
	return panelsArray;
};




LegendPanel.prototype.getPanel = function(legend){
	var _this=this;
	
	if (this.panel == null){
		
		var items = this.getColorItems(legend);
		
		this.panel  = Ext.create('Ext.panel.Panel', {
			bodyPadding:'0 0 0 2',
			border:false,
			layout: {
		        type: 'vbox',
		        align:'stretch' 
		    },
			items:items,
			width:this.width,
			height:items.length*20
		});		
	}	
	
	return this.panel;
};

LegendPanel.prototype.getButton = function(legend){
	var _this=this;
	
	if (this.button == null){
		
		this.button = Ext.create('Ext.button.Button', {
			text : this.title,
			menu : {
                plain:true,
                items: [this.getPanel(legend)]
            }
		});
	}	
	return this.button;
	
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function UrlWidget(args){
	var _this=this;
	this.id = "UrlWidget_" + Math.round(Math.random()*10000000);
	this.targetId = null;
	
	this.title = "Custom url";
	this.width = 500;
	this.height = 400;
	
	if (args != null){
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
    }
	
	this.onAdd = new Event(this);
};

UrlWidget.prototype.draw = function (){
	if(this.panel==null){
		this.render();
	}
	this.panel.show();
};

UrlWidget.prototype.render = function (){
	var _this=this;
	
    this.urlField = Ext.create('Ext.form.field.Text',{
    	margin:"0 2 2 0",
    	labelWidth : 30,
    	width:this.width-55,
    	fieldLabel : 'URL',
		emptyText: 'enter a valid url',
//		value : "http://das.sanger.ac.uk/das/grc_region_GRCh37/features",
		value : "http://www.ensembl.org/das/Homo_sapiens.GRCh37.gene/features",
		listeners : { change: {fn: function(){ var dasName = this.value.split('/das/')[1].split('/')[0];
											   _this.trackNameField.setValue(dasName); }}
		}
    });
    this.checkButton = Ext.create('Ext.button.Button',{
		text : 'Check',
		handler : function() {
			_this.form.setLoading();
//			var dasDataAdapter = new DasRegionDataAdapter({
//				url : _this.urlField.getValue()
//			});
//			dasDataAdapter.successed.addEventListener(function() {
//				_this.contentArea.setValue(dasDataAdapter.xml);
//				_this.form.setLoading(false);
//			});
//
//			dasDataAdapter.onError.addEventListener(function() {
//				_this.contentArea.setValue("XMLHttpRequest cannot load. This server is not allowed by Access-Control-Allow-Origin");
//				_this.form.setLoading(false);
//			});
//			dasDataAdapter.fill(1, 1, 1);
			
			var dasAdapter = new DasAdapter({
				url: _this.urlField.getValue(),
				featureCache:{
					gzip: false,
					chunkSize:10000
				}
			});
			
			dasAdapter.onCheckUrl.addEventListener(function(sender,event){
				console.log(event.data);
				_this.contentArea.setValue(event.data);
				_this.form.setLoading(false);
			});
			
			dasAdapter.onError.addEventListener(function() {
				_this.contentArea.setValue("XMLHttpRequest cannot load. This server is not allowed by Access-Control-Allow-Origin");
				_this.form.setLoading(false);
			});
				
			dasAdapter.checkUrl();
		}
    });
	this.trackNameField = Ext.create('Ext.form.field.Text',{
		name: 'file',
//        fieldLabel: 'Track name',
        allowBlank: false,
        value: _this.urlField.value.split('/das/')[1].split('/')[0],
        emptyText: 'Choose a name',
        flex:1
	});
	this.panelSettings = Ext.create('Ext.panel.Panel', {
		layout: 'hbox',
		border:false,
		title:'Track name',
		cls:"panel-border-top",
		bodyPadding: 10,
		width:this.width-2,
	    items : [this.trackNameField]	 
	});
	this.contentArea = Ext.create('Ext.form.field.TextArea',{
		margin:"-1",
		width : this.width,
		height : this.height
	});
	this.infobar = Ext.create('Ext.toolbar.Toolbar',{
		height:28,
		cls:"bio-border-false",
		items:[this.urlField,this.checkButton]
	});
	this.form = Ext.create('Ext.panel.Panel', {
		border : false,
		items : [this.infobar,this.contentArea,this.panelSettings]
	});
	
	this.panel = Ext.create('Ext.ux.Window', {
		title : this.title,
		layout: 'fit',
		resizable:false,
		items : [this.form],
		buttons : [{
			text : 'Add',
			handler : function() {
				_this.onAdd.notify({name:_this.trackNameField.getValue(),url:_this.urlField.getValue()});
				_this.panel.close();
			}
		},{text : 'Cancel',handler : function() {_this.panel.close();}}
		],
		listeners: {
	      	destroy: function(){
	       		delete _this.panel;
	      	}
    	}
	});
};
GV_CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";


FEATURE_CONFIG = {
	gene:{
		filters:[{
			name:"biotype",
			text:"Biotype",
			values:["3prime_overlapping_ncrna", "ambiguous_orf", "antisense", "disrupted_domain", "IG_C_gene", "IG_D_gene", "IG_J_gene", "IG_V_gene", "lincRNA", "miRNA", "misc_RNA", "Mt_rRNA", "Mt_tRNA", "ncrna_host", "nonsense_mediated_decay", "non_coding", "non_stop_decay", "polymorphic_pseudogene", "processed_pseudogene", "processed_transcript", "protein_coding", "pseudogene", "retained_intron", "retrotransposed", "rRNA", "sense_intronic", "sense_overlapping", "snoRNA", "snRNA", "transcribed_processed_pseudogene", "transcribed_unprocessed_pseudogene", "unitary_pseudogene", "unprocessed_pseudogene"],
			selection:"multi"
		}]
		//options:[
		//]
	},
	snp:{
		filters:[{
			name:"consequence_type",
			text:"Consequence Type",
			values:["2KB_upstream_variant", "5KB_upstream_variant", "500B_downstream_variant", "5KB_downstream_variant", "3_prime_UTR_variant", "5_prime_UTR_variant", "coding_sequence_variant", "complex_change_in_transcript", "frameshift_variant", "incomplete_terminal_codon_variant", "inframe_codon_gain", "inframe_codon_loss", "initiator_codon_change", "non_synonymous_codon", "intergenic_variant", "intron_variant", "mature_miRNA_variant", "nc_transcript_variant", "splice_acceptor_variant", "splice_donor_variant", "splice_region_variant", "stop_gained", "stop_lost", "stop_retained_variant", "synonymous_codon"],
			selection:"multi"
		}]
		//options:[
		//]
	},
	bam:{
		//filters:[{
				//name:"view",
				//text:"View",
				//values:["view_as_pairs","show_soft-clipped_bases"],
				//selection:"multi"
			//}
		//],
		options:[{
				text:"View as pairs",
				name:"view_as_pairs",
				type:"checkbox",
				fetch:true,
				checked : false
			},{
				text:"Show Soft-clipping",
				name:"show_softclipping",
				type:"checkbox",
				fetch:true,
				checked : false
			},{
				text:"Insert size interval",
				name:"insert_size_interval",
				type:"doublenumberfield",
				fetch:false,
				minValue : 0,
				maxValue : 0
			}
		]
	}
	
};
FEATURE_OPTIONS = {
	gene:[{
		name:"biotype",
		text:"Biotype",
		values:["3prime_overlapping_ncrna", "ambiguous_orf", "antisense", "disrupted_domain", "IG_C_gene", "IG_D_gene", "IG_J_gene", "IG_V_gene", "lincRNA", "miRNA", "misc_RNA", "Mt_rRNA", "Mt_tRNA", "ncrna_host", "nonsense_mediated_decay", "non_coding", "non_stop_decay", "polymorphic_pseudogene", "processed_pseudogene", "processed_transcript", "protein_coding", "pseudogene", "retained_intron", "retrotransposed", "rRNA", "sense_intronic", "sense_overlapping", "snoRNA", "snRNA", "transcribed_processed_pseudogene", "transcribed_unprocessed_pseudogene", "unitary_pseudogene", "unprocessed_pseudogene"],
		selection:"multi"
	}],
	snp:[{
		name:"consequence_type",
		text:"Consequence Type",
		values:["2KB_upstream_variant", "5KB_upstream_variant", "500B_downstream_variant", "5KB_downstream_variant", "3_prime_UTR_variant", "5_prime_UTR_variant", "coding_sequence_variant", "complex_change_in_transcript", "frameshift_variant", "incomplete_terminal_codon_variant", "inframe_codon_gain", "inframe_codon_loss", "initiator_codon_change", "non_synonymous_codon", "intergenic_variant", "intron_variant", "mature_miRNA_variant", "nc_transcript_variant", "splice_acceptor_variant", "splice_donor_variant", "splice_region_variant", "stop_gained", "stop_lost", "stop_retained_variant", "synonymous_codon"],
		selection:"multi"
	}],
	bam:[{
		name:"view",
		text:"View",
		values:["view_as_pairs","show_soft-clipped_bases"],
		selection:"multi"
	}]
};

GENE_BIOTYPE_COLORS = {
		"3prime_overlapping_ncrna":"Orange",
		"ambiguous_orf":"SlateBlue",
		"antisense":"SteelBlue",
		"disrupted_domain":"YellowGreen",
		"IG_C_gene":"#FF7F50",
		"IG_D_gene":"#FF7F50",
		"IG_J_gene":"#FF7F50",
		"IG_V_gene":"#FF7F50",
		"lincRNA":"#8b668b",
		"miRNA":"#8b668b",
		"misc_RNA":"#8b668b",
		"Mt_rRNA":"#8b668b",
		"Mt_tRNA":"#8b668b",
		"ncrna_host":"Fuchsia",
		"nonsense_mediated_decay":"seagreen",
		"non_coding":"orangered",
		"non_stop_decay":"aqua",
		"polymorphic_pseudogene":"#666666",
		"processed_pseudogene":"#666666",
		"processed_transcript":"#0000ff",
		"protein_coding":"#a00000",
		"pseudogene":"#666666",
		"retained_intron":"goldenrod",
		"retrotransposed":"lightsalmon",
		"rRNA":"indianred",
		"sense_intronic":"#20B2AA",
		"sense_overlapping":"#20B2AA",  
		"snoRNA":"#8b668b",
		"snRNA":"#8b668b",
		"transcribed_processed_pseudogene":"#666666",
		"transcribed_unprocessed_pseudogene":"#666666",
		"unitary_pseudogene":"#666666",
		"unprocessed_pseudogene":"#666666",
		"":"orangered",
		"other":"#000000"
};



SNP_BIOTYPE_COLORS = {
	"2KB_upstream_variant":"#a2b5cd",
	"5KB_upstream_variant":"#a2b5cd",
	"500B_downstream_variant":"#a2b5cd",
	"5KB_downstream_variant":"#a2b5cd",
	"3_prime_UTR_variant":"#7ac5cd",
	"5_prime_UTR_variant":"#7ac5cd",
	"coding_sequence_variant":"#458b00",
	"complex_change_in_transcript":"#00fa9a",
	"frameshift_variant":"#ff69b4",
	"incomplete_terminal_codon_variant":"#ff00ff",
	"inframe_codon_gain":"#ffd700",
	"inframe_codon_loss":"#ffd700",
	"initiator_codon_change":"#ffd700",
	"non_synonymous_codon":"#ffd700",
	"intergenic_variant":"#636363",
	"intron_variant":"#02599c",
	"mature_miRNA_variant":"#458b00",
	"nc_transcript_variant":"#32cd32",
	"splice_acceptor_variant":"#ff7f50",
	"splice_donor_variant":"#ff7f50",
	"splice_region_variant":"#ff7f50",
	"stop_gained":"#ff0000",
	"stop_lost":"#ff0000",
	"stop_retained_variant":"#76ee00",
	"synonymous_codon":"#76ee00",
	"other":"#000000"
};


SEQUENCE_COLORS = {A:"#009900", C:"#0000FF", G:"#857A00", T:"#aa0000", N:"#555555"};

SAM_FLAGS = [["read paired", 0x1],
             ["read mapped in proper pair", 0x2],
             ["read unmapped", 0x4],
             ["mate unmapped", 0x8],
             ["read reverse strand", 0x10],
             ["mate reverse strand", 0x20],
             ["first in pair", 0x40],
             ["second in pair", 0x80],
             ["not primary alignment", 0x100],
             ["read fails platform/vendor quality checks", 0x200],
             ["read is PCR or optical duplicate", 0x400]];


FEATURE_TYPES = {
	
	//methods
	formatTitle : function (str){
		var s = str.replace(/_/gi, " ");
		s = s.charAt(0).toUpperCase() + s.slice(1);
		return s;
	},
	getTipCommons : function(f){
		var strand = (f.strand != null) ? f.strand : "NA";
		return 'start-end:&nbsp;<span class="emph">'+f.start+'-'+f.end+'</span><br>'+
		'strand:&nbsp;<span class="emph">'+strand+'</span><br>'+
		'length:&nbsp;<span class="info">'+(f.end-f.start+1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</span><br>';
	},
		
	//items
	sequence:{
		color: SEQUENCE_COLORS
	},
	undefined:{
		getLabel: function(f){
			var str = "";
			str+= f.chromosome + ":" + f.start + "-" + f.end;
			return str;
		},
		getTipTitle: function(f){
			return " ";
		},
		getTipText: function(f){
			return " ";
		},
		getColor: function(f){
			return "grey";
		},
//		infoWidgetId: "id",
		height:10
//		histogramColor:"lightblue"
	},
	gene:{
		getLabel: function(f){
            var name = (f.name != null) ? f.name : f.id;
			var str = "";
			str+= (f.strand < 0 || f.strand == '-') ? "<" : "";
			str+= " "+name+" ";
			str+= (f.strand > 0 || f.strand == '+') ? ">" : "";
            if(f.biotype != null && f.biotype != ''){
			    str+= " ["+f.biotype+"]";
            }
			return str;
		},
		getTipTitle: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return FEATURE_TYPES.formatTitle(f.featureType) +
			' - <span class="ok">'+name+'</span>';
		},
		getTipText: function(f){
			var color = GENE_BIOTYPE_COLORS[f.biotype];
			return	'id:&nbsp;<span class="ssel">'+f.id+'</span><br>'+
			'biotype:&nbsp;<span class="emph" style="color:'+color+';">'+f.biotype+'</span><br>'+
			'description:&nbsp;<span class="emph">'+f.description+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return GENE_BIOTYPE_COLORS[f.biotype];
		},
		infoWidgetId: "id",
		height:4,
		histogramColor:"lightblue"
	},
//	geneorange:{
//		getLabel: function(f){
//			var str = "";
//			str+= (f.strand < 0) ? "<" : "";
//			str+= " "+f.name+" ";
//			str+= (f.strand > 0) ? ">" : "";
//			str+= " ["+f.biotype+"]";
//			return str;
//		},
//		getTipTitle: function(f){
//			return FEATURE_TYPES.formatTitle(f.featureType) +
//			' - <span class="ok">'+f.name+'</span>';
//		},
//		getTipText: function(f){
//			var color = GENE_BIOTYPE_COLORS[f.biotype];
//			return	'Ensembl&nbsp;ID:&nbsp;<span class="ssel">'+f.id+'</span><br>'+
//			'biotype:&nbsp;<span class="emph" style="color:'+color+';">'+f.biotype+'</span><br>'+
//			'description:&nbsp;<span class="emph">'+f.description+'</span><br>'+
//			FEATURE_TYPES.getTipCommons(f)+
//			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
//		},
//		getColor: function(f){
//			return GENE_BIOTYPE_COLORS[f.biotype];
//		},
//		infoWidgetId: "id",
//		height:4,
//		histogramColor:"lightblue"
//	},
	transcript:{
		getLabel: function(f){
            var name = (f.name != null) ? f.name : f.id;
			var str = "";
			str+= (f.strand < 0) ? "<" : "";
			str+= " "+name+" ";
			str+= (f.strand > 0) ? ">" : "";
            if(f.biotype != null && f.biotype != ''){
                str+= " ["+f.biotype+"]";
            }
			return str;
		},
		getTipTitle: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return FEATURE_TYPES.formatTitle(f.featureType) +
			' - <span class="ok">'+name+'</span>';
		},
		getTipText: function(f){
			var color = GENE_BIOTYPE_COLORS[f.biotype];
			return	'id:&nbsp;<span class="ssel">'+f.id+'</span><br>'+
			'biotype:&nbsp;<span class="emph" style="color:'+color+';">'+f.biotype+'</span><br>'+
			'description:&nbsp;<span class="emph">'+f.description+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return GENE_BIOTYPE_COLORS[f.biotype];
		},
		infoWidgetId: "id",
		height:1,
		histogramColor:"lightblue"
	},
	exon:{//not yet
		getLabel: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return name;
		},
		getTipTitle: function(f){
            var name = (f.name != null) ? f.name : f.id;
            if (name == null){name = ''}
			return FEATURE_TYPES.formatTitle(f.featureType)+' - <span class="ok">'+name+'</span>';
		},
		getTipText: function(e,t){
            var ename = (e.name != null) ? e.name : e.id;
            var tname = (t.name != null) ? t.name : t.id;
			var color = GENE_BIOTYPE_COLORS[t.biotype];
			return	'transcript name:&nbsp;<span class="ssel">'+t.name+'</span><br>'+
			'transcript Ensembl&nbsp;ID:&nbsp;<span class="ssel">'+t.id+'</span><br>'+
			'transcript biotype:&nbsp;<span class="emph" style="color:'+color+';">'+t.biotype+'</span><br>'+
			'transcript description:&nbsp;<span class="emph">'+t.description+'</span><br>'+
			'transcript start-end:&nbsp;<span class="emph">'+t.start+'-'+t.end+'</span><br>'+
			'exon start-end:&nbsp;<span class="emph">'+e.start+'-'+e.end+'</span><br>'+
			'strand:&nbsp;<span class="emph">'+t.strand+'</span><br>'+
			'length:&nbsp;<span class="info">'+(e.end-e.start+1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</span><br>';
		},
		getColor: function(f){
			return "black";
		},
		infoWidgetId: "id",
		height:5,
		histogramColor:"lightblue"
	},
	snp:{
		getLabel: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return name;
		},
		getTipTitle: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return f.featureType.toUpperCase() +
			' - <span class="ok">'+name+'</span>';
		},
		getTipText: function(f){
			var color = SNP_BIOTYPE_COLORS[f.displaySoConsequence];
			return 'alleles:&nbsp;<span class="ssel">'+f.alleleString+'</span><br>'+
//			'ancestral allele:&nbsp;<span class="ssel">'+f.ancestralAllele+'</span><br>'+
//			'SO consequence:&nbsp;<span class="emph" style="color:'+color+';">'+f.displaySoConsequence+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
			
		},
		getColor: function(f){
//			return SNP_BIOTYPE_COLORS[f.displaySoConsequence];
			return 'lightblue';
		},
		infoWidgetId: "id",
		height:8,
		histogramColor:"orange"
	},
	cpg_island:{
		getLabel: function(f){
			return f.name;
		},
		getTipTitle: function(f){
			return 'CpG island - <span class="ok">'+f.name+'</span>';
		},
		getTipText: function(f){
			return 'CpG number:&nbsp;<span class="ssel">'+f.cpgNum+'</span><br>'+
			'CpG precentage:&nbsp;<span class="ssel">'+f.perCpG+'</span><br>'+
			'CG number:&nbsp;<span class="ssel">'+f.gcNum+'</span><br>'+
			'CG percentage:&nbsp;<span class="ssel">'+f.perGc+'</span><br>'+
			'observed-expected ratio:&nbsp;<span class="ssel">'+f.observedExpectedRatio+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "Aquamarine";
		},
		infoWidgetId: "name",
		height:8,
		histogramColor:"Aquamarine"
	},
	mutation:{
		getLabel: function(f){
			return f.mutationCds;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType)+' - <span class="ok">'+f.mutationCds+'</span>';
		},
		getTipText: function(f){
			return 'mutation CDS:&nbsp;<span class="ssel">'+f.mutationCds+'</span><br>'+
			'mutation Aa:&nbsp;<span class="ssel">'+f.mutationAa+'</span><br>'+
			'mutation description:&nbsp;<span class="ssel">'+f.mutationDescription+'</span><br>'+
			'primary histology:&nbsp;<span class="ssel">'+f.primaryHistology+'</span><br>'+
			'primary site:&nbsp;<span class="ssel">'+f.primarySite+'</span><br>'+
			'site subtype:&nbsp;<span class="ssel">'+f.siteSubtype+'</span><br>'+
			'gene name:&nbsp;<span class="ssel">'+f.geneName+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return "Chartreuse";
		},
		infoWidgetId: "mutationCds",
		height:8,
		histogramColor:"Chartreuse"
	},
	structural_variation:{
		getLabel: function(f){
			return f.displayId;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType)+' - <span class="ok">'+f.displayId+'</span>';
		},
		getTipText: function(f){
			return 'display ID:&nbsp;<span class="ssel">'+f.displayId+'</span><br>'+
			'SO term:&nbsp;<span class="ssel">'+f.soTerm+'</span><br>'+
			'study description:&nbsp;<span class="emph">'+f.studyDescription+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return "indigo";
		},
		infoWidgetId: "name",
		height:8,
		histogramColor:"indigo"
	},
	tfbs:{
		getLabel: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return name;
		},
		getTipTitle: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return 'TFBS - <span class="ok">'+name+'</span>';
		},
		getTipText: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return 'TF name:&nbsp;<span class="ssel">'+name+'</span><br>'+
//			'relative start:&nbsp;<span class="ssel">'+f.relativeStart+'</span><br>'+
//			'relative end:&nbsp;<span class="ssel">'+f.relativeEnd+'</span><br>'+
//			'target gene name:&nbsp;<span class="ssel">'+f.targetGeneName+'</span><br>'+
			'score:&nbsp;<span class="ssel">'+f.score+'</span><br>'+
//			'sequence:&nbsp;<span class="ssel">'+f.sequence+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return "blue";
		},
		infoWidgetId: "name",
		height:8,
		histogramColor:"blue"
	},
	mirna_target:{
		getLabel: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return name;
		},
		getTipTitle: function(f){
            var name = (f.name != null) ? f.name : f.id;
			return 'miRNA target - <span class="ok">'+name+'</span>';
		},
		getTipText: function(f){
			return ''+
//            'gene target name:&nbsp;<span class="ssel">'+f.geneTargetName+'</span><br>'+
//			'experimental method:&nbsp;<span class="ssel">'+f.experimentalMethod+'</span><br>'+
			'score:&nbsp;<span class="ssel">'+f.score+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return "#8b668b";
		},
		infoWidgetId: "name",
		height:8,
		histogramColor:"#8b668b"
	},
	conserved_region:{
		getLabel: function(f){
			return f.conservedRegionId;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType)+' - <span class="ok">'+f.conservedRegionId+'</span>';
		},
		getTipText: function(f){
			return 'method:&nbsp;<span class="ssel">'+f.method+'</span><br>'+
			'data range primate:&nbsp;<span class="ssel">'+f.dataRangePrimate+'</span><br>'+
			'lower limit primate:&nbsp;<span class="ssel">'+f.lowerLimitPrimate+'</span><br>'+
			'sumData primate:&nbsp;<span class="ssel">'+f.sumDataPrimate+'</span><br>'+
			'sumSquare primate:&nbsp;<span class="ssel">'+f.sumSquarePrimate+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "DodgerBlue";
		},
		infoWidgetId: "name",
		height:8,
		histogramColor:"DodgerBlue"
	},
	file:{
		getLabel: function(f){
			var str = "";
			str+= f.label;
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType);
		},
		getTipText: function(f){
			return FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		height:8,
		histogramColor:"orange"
	},
	vcf:{
		getLabel: function(f){
                return f.id;
				try {
						var fields = f.sampleData.split("\t");
					} catch (e) {
					//Uncaught TypeError: Cannot call method 'split' of undefined 
						console.log(e)
						debugger
						
					}
			
			if(fields.length>10 || fields.length==9)
				return f.id+" "+f.ref+"/"+f.alt+"";
			else{
				var gt = fields[9].split(":")[0];
				if(gt.indexOf(".")!= -1 || gt.indexOf("-")!= -1)
					return gt;
				var label = "";
				var alt = f.alt.split(",");
				if(gt.charAt(0)=='0')
					label = f.ref;
				else{
					var pos = gt.charAt(0)-1
					label = alt[pos] 
				}				
				label+=gt.charAt(1)
				if(gt.charAt(2)=='0')
					label += f.ref;
				else{
					var pos = gt.charAt(2)-1
					label += alt[pos] 
				}
		
				return label;
			}
		},
		getTipTitle: function(f){
			return 'VCF variant - <span class="ok">'+f.id+'</span>';
		},
		getTipText: function(f){
			return 'alleles (ref/alt):&nbsp;<span class="emph">'+f.reference+"/"+f.alternate+'</span><br>'+
			'quality:&nbsp;<span class="emph">'+f.quality+'</span><br>'+
			'filter:&nbsp;<span class="emph">'+f.filter+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		infoWidgetId: "id",
		height:8,
		histogramColor:"gray"
	},
	gff2:{
		getLabel: function(f){
			var str = "";
			str+= f.label;
			return str;
		},
		getTipTitle: function(f){
			return f.featureType.toUpperCase() +
			' - <span class="ok">'+f.label+'</span>';
		},
		getTipText: function(f){
			return 'score:&nbsp;<span class="emph">'+f.score+'</span><br>'+
			'frame:&nbsp;<span class="emph">'+f.frame+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		height:8,
		histogramColor:"gray"
	},
	gff3:{
		getLabel: function(f){
			var str = "";
			str+= f.label;
			return str;
		},
		getTipTitle: function(f){
			return f.featureType.toUpperCase() +
			' - <span class="ok">'+f.label+'</span>';
		},
		getTipText: function(f){
			return 'score:&nbsp;<span class="emph">'+f.score+'</span><br>'+
			'frame:&nbsp;<span class="emph">'+f.frame+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		height:8,
		histogramColor:"gray"
	},
	gtf:{
		getLabel: function(f){
			var str = "";
			str+= f.label;
			return str;
		},
		getTipTitle: function(f){
			return f.featureType.toUpperCase() +
			' - <span class="ok">'+f.label+'</span>';
		},
		getTipText: function(f){
			return 'score:&nbsp;<span class="emph">'+f.score+'</span><br>'+
			'frame:&nbsp;<span class="emph">'+f.frame+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		height:8,
		histogramColor:"gray"
	},
	bed:{
		getLabel: function(f){
			var str = "";
			str+= f.label;
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType);
		},
		getTipText: function(f){
			return FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			//XXX convert RGB to Hex
	        var rgbColor = new Array();
	        rgbColor = f.itemRgb.split(",");
	        var hex = function (x) {
	        	var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	            return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	        };
	        var hexColor = hex(rgbColor[0])+ hex(rgbColor[1]) + hex(rgbColor[2]);
			return "#"+hexColor;
		},
		height:8,
		histogramColor:"orange"
	},
	bam:{
		explainFlags : function(flags) {
			var summary = '<div style="background:#FFEF93;font-weight:bold;margin:0 15px 0 0;">flags : <span class="ssel">'+flags+'</span></div>';
			for(var i = 0; i < SAM_FLAGS.length; i++) {
				if(SAM_FLAGS[i][1] & flags) {
					summary  += SAM_FLAGS[i][0] + "<br>";
				} 
			}
			return summary;
		},
		getLabel: function(f){
			return  "bam  "+f.chromosome+":"+f.start+"-"+f.end;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType)+' - <span class="ok">'+f.name+'</span>';
		},
		getTipText: function(f){
			f.strand = FEATURE_TYPES.bam.getStrand(f);
			var one =  'cigar:&nbsp;<span class="ssel">'+f.cigar+'</span><br>'+
				'insert size:&nbsp;<span class="ssel">'+f.inferredInsertSize+'</span><br>'+
				FEATURE_TYPES.getTipCommons(f)+'<br>'+
				this.explainFlags(f.flags);
			
			var three = '<div style="background:#FFEF93;font-weight:bold;">attributes</div>';
			delete f.attributes["BQ"];//for now because is too long
			for (var key in f.attributes) {
				three += key+":"+f.attributes[key]+"<br>";
			}
			var style = "background:#FFEF93;font-weight:bold;";
			return '<div style="float:left">'+one+'</div>'+
					'<div style="float:right">'+three+'</div>';
		},
		getColor: function(f, chr){
			if(f.mateReferenceName != chr){return "lightgreen";}
			return (parseInt(f.flags)&(0x10)) == 0 ? "DarkGray" : "LightGray";/**/
		},
		getStrokeColor: function(f){
			if(this.getMateUnmappedFlag(f)){return "tomato"}
			return "whitesmoke";
		},
		getStrand: function(f){
			return (parseInt(f.flags)&(0x10)) == 0 ? "Forward" : "Reverse";
		},
		getReadPairedFlag: function(f){
			return (parseInt(f.flags)&(0x1)) == 0 ? false : true;
		},
		getFirstOfPairFlag: function(f){
			return (parseInt(f.flags)&(0x40)) == 0 ? false : true;
		},
		getMateUnmappedFlag: function(f){
			return (parseInt(f.flags)&(0x8)) == 0 ? false : true;
		},
		height:8,
		histogramColor:"grey"
	},
	das:{
		getLabel: function(f){
			var str = "";
			str+= f.id;
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType);
		},
		getTipText: function(f){
			return FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		height:8,
		histogramColor:"orange"
	}
};


/*
 * Binary Search Tree implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A binary search tree implementation in JavaScript. This implementation
 * does not allow duplicate values to be inserted into the tree, ensuring
 * that there is just one instance of each value.
 * @class BinarySearchTree
 * @constructor
 */
function FeatureBinarySearchTree() {
    
    /**
     * Pointer to root node in the tree.
     * @property _root
     * @type Object
     * @private
     */
    this._root = null;
}

FeatureBinarySearchTree.prototype = {

    //restore constructor
    constructor: FeatureBinarySearchTree,
    
    //-------------------------------------------------------------------------
    // Private members
    //-------------------------------------------------------------------------
    
    /**
     * Appends some data to the appropriate point in the tree. If there are no
     * nodes in the tree, the data becomes the root. If there are other nodes
     * in the tree, then the tree must be traversed to find the correct spot
     * for insertion. 
     * @param {variant} value The data to add to the list.
     * @return {Void}
     * @method add
     */
    add: function (v){
        //create a new item object, place data in
        var node = { 
                value: v, 
                left: null,
                right: null 
            },
            
            //used to traverse the structure
            current;
    
        //special case: no items in the tree yet
        if (this._root === null){
            this._root = node;
            return true;
        } 
        	//else
            current = this._root;
            
            while(true){
            
                //if the new value is less than this node's value, go left
                if (node.value.end < current.value.start){
                
                    //if there's no left, then the new node belongs there
                    if (current.left === null){
                        current.left = node;
                        return true;
//                        break;
                    } 
                    	//else                  
                        current = current.left;
                    
                //if the new value is greater than this node's value, go right
                } else if (node.value.start > current.value.end){
                
                    //if there's no right, then the new node belongs there
                    if (current.right === null){
                        current.right = node;
                        return true;
//                        break;
                    } 
                    	//else
                        current = current.right;
 
                //if the new value is equal to the current one, just ignore
                } else {
                	return false;
//                    break;
                }
            }        
        
    },
    
    contains: function (v){
        var node = { 
                value: v, 
                left: null,
                right: null 
            },
    	found = false,
    	current = this._root;
          
      //make sure there's a node to search
      while(!found && current){
      
          //if the value is less than the current node's, go left
          if (node.value.end < current.value.start){
              current = current.left;
              
          //if the value is greater than the current node's, go right
          } else if (node.value.start > current.value.end){
              current = current.right;
              
          //values are equal, found it!
          } else {
              found = true;
          }
      }
      
      //only proceed if the node was found
      return found;   
        
    }
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function GenomeViewer(targetId, species, args) {
	var _this=this;
	this.id = "GenomeViewer"+ Math.round(Math.random()*10000);
	this.menuBar = null;

	this.sidePanelWidth = 26;
	// If not provided on instatiation
	this.width =  $(document).width()-this.sidePanelWidth;
	this.height = $(document).height();
	this.targetId=null;


	//Default values
	this.species="hsa";
	this.speciesName="Homo sapiens";
	this.increment = 3;
	this.zoom=100;

	this.confPanelHidden = false;
	this.regionPanelHidden = false;

	//Setting paramaters
	if (targetId != null){
		this.targetId=targetId;
	}
	if (species != null) {
		this.species = Utils.getSpeciesCode(species.text);
		this.speciesName = species.text + ' ' + species.assembly;
	}
	if (args != null){
		if(args.toolbar != null){
			this.toolbar = args.toolbar;
		}
		if (args.width != null) {
			this.width = args.width-this.sidePanelWidth;
		}
		if (args.height != null) {
			this.height = args.height;
		}
        if (args.popularSpecies != null) {
            this.popularSpecies = args.popularSpecies;
        }
		if (args.availableSpecies != null) {
			this.setSpeciesMenu(args.availableSpecies, this.popularSpecies);
		}
		if (args.zoom != null) {//evaluate zoom after
			this.zoom = args.zoom;
		}
		if (args.region != null) {
			this.region = args.region;
		}else{
			this.region = new Region(species.region);
		}
		if (args.confPanelHidden != null) {
			this.confPanelHidden = args.confPanelHidden;
		}
		if (args.regionPanelHidden != null) {
			this.regionPanelHidden = args.regionPanelHidden;
		}
		if (args.region != null && args.region.url != null) {
			this._calculateZoomByRegion();
		}else{
			this._calculateRegionByZoom();
			this._calculateZoomByRegion();
		}
	}

	

	//Events i send
	this.onSpeciesChange = new Event();
	this.onRegionChange = new Event();
	this.afterLocationChange = new Event();
	this.afterRender = new Event();
	
	//Events i listen
	this.onRegionChange.addEventListener(function(sender,data){
		_this.setRegion(data);
		if(data.sender != "trackSvgLayout"){
			Ext.getCmp(_this.id+"regionHistory").add({
				xtype:'box',padding:"2 5 2 3",border:1,
				html:_this.region.toString(),
				s:_this.region.toString(),
				listeners:{
				afterrender:function(){
						var s = this.s;
						this.getEl().addClsOnOver("encima");
						this.getEl().addCls("whiteborder");
						this.getEl().on("click",function(){
							_this.region.parse(s);
							_this.setRegion({sender:"regionHistory"});
						});
					}
				}
			});
		}
	});
	
	//Events i propagate
	this.onSvgRemoveTrack = null;//assigned later, the component must exist
	
	// useful logs
	console.log(this.width+"x"+this.height);
	console.log(this.targetId);
	console.log(this.id);
}

GenomeViewer.prototype.draw = function(){
	this.render();
};
GenomeViewer.prototype.render = function(){
	var _this = this;
	var container = Ext.create('Ext.container.Container', {
		id:this.id+"container",
        width:this.width,
        height:this.height,
		cls:'x-unselectable',
		region:"center",
		flex:0,
		layout: { type: 'vbox',align: 'stretch'},
		region : 'center',
		margins : '0 0 0 0'
	});

	this.sideContainer = Ext.create('Ext.panel.Panel', {
		id: this.id+"sideContainer",
		region: "east",
		title: "Configuration",
		collapsed:this.confPanelHidden,
		collapsible:true,
		titleCollapse:true,
		width: this.sidePanelWidth+260,
		layout: 'accordion'
	});
	
	var containerPort = Ext.create('Ext.container.Container', {
		id:this.id+"containerPort",
		renderTo:this.targetId,
        width:this.width+this.sidePanelWidth,
        height:this.height,
		cls:'x-unselectable',
		layout: { type: 'border'},
		region : 'center',
		margins : '0 0 0 0',
		items:[container,this.sideContainer]
	});
	//if(this.toolbar!=null){
		//containerPort.add(this.toolbar);
	//}
	//The last item is regionPanel
	//when all items are inserted afterRender is notified, tracks can be added now
	var tracksPanel = this._drawTracksPanel();
	var regionPanel = this._drawRegionPanel();
	var regionAndTrackRendered = 0;
	
	var createSvgLayout = function (){//there will be two instances of TrackSvgLayout, one for detailed information and other for Overview
		var divTop = $('#'+_this.id+"tracksSvgTop")[0];
		var divTrack = $('#'+_this.id+"tracksSvgTrack")[0];
		_this.trackSvgLayout = new TrackSvgLayout({top:divTop,track:divTrack},{
			width:_this.width-18,
			region:_this.region,
			genomeViewer:_this
		});
		
		_this.trackSvgLayout.onMove.addEventListener(function(sender,data){
			_this.onRegionChange.notify({sender:"trackSvgLayout"});
		});
		_this.trackSvgLayout.onMousePosition.addEventListener(function(sender,data){
			Ext.getCmp(_this.id+"mouseLabel").setText('<span class="ssel">Position: '+Utils.formatNumber(data.mousePos)+'</span>');
			$('#'+_this.id+"mouseLabel").qtip({content:'Mouse position',style:{width:95},position: {my:"bottom center",at:"top center"}});
			Ext.getCmp(_this.id+"mouseNucleotidLabel").setText(data.baseHtml);
		});
		Ext.getCmp(_this.id+"windowSize").setText('<span class="emph">'+_this.trackSvgLayout.windowSize+'</span>');
		_this.trackSvgLayout.onWindowSize.addEventListener(function(sender,data){
			Ext.getCmp(_this.id+"windowSize").setText('<span class="emph">'+data.windowSize+'</span>');
		});

		_this.trackSvgLayout.onReady.addEventListener(function(sender,data){
			Ext.getCmp(_this.id+"container").setLoading(false);
		});
		
		//propagate event to TrackSvgLayout
		_this.onSvgRemoveTrack = _this.trackSvgLayout.onSvgRemoveTrack;
		
		var divTop = $('#'+_this.id+"regionSvgTop")[0];
		var divTrack = $('#'+_this.id+"regionSvgTrack")[0];
		_this.trackSvgLayoutOverview = new TrackSvgLayout({top:divTop,track:divTrack},{
			width:_this.width-18,
			region:_this.region,
			zoomOffset:40,
			zoomMultiplier:8,
			genomeViewer:_this,
			parentLayout:_this.trackSvgLayout
		});
		_this.trackSvgLayoutOverview.onRegionSelect.addEventListener(function(sender,data){
			_this.onRegionChange.notify({sender:"trackSvgLayoutOverview"});
		});
		_this.afterRender.notify();
	};
	
	tracksPanel.on("afterrender", function(){
		regionAndTrackRendered++;
		if(regionAndTrackRendered>1){
			createSvgLayout();
		}
	});
	regionPanel.on("afterrender", function(){
		regionAndTrackRendered++;
		if(regionAndTrackRendered>1){
			createSvgLayout();
		}
	});
	
	containerPort.insert(0, this._getNavigationBar());
	containerPort.insert(1, this._getBottomBar());
	container.insert(0, this._drawKaryotypePanel().hide());//the good one
	//container.insert(1, this._drawKaryotypePanel());
	container.insert(1, this._drawChromosomePanel());
	container.insert(2, tracksPanel);
	container.insert(2, regionPanel);//rendered after trackspanel but inserted with minor index

	Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.region.chromosome);
	Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.region.chromosome);
	Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
};
GenomeViewer.prototype.setMenuBar = function(toolbar) {
	this.toolbar = toolbar;
};
GenomeViewer.prototype.addSidePanelItems = function(items) {
	this.sideContainer.insert(1,{
		title: 'Region history',
		bodyPadding:'10',
		id:this.id+"regionHistory"
	});
	if(items!=null){
		this.sideContainer.insert(0, items);
	}
};

GenomeViewer.prototype.setSize = function(width,height) {
	this.width = width-this.sidePanelWidth;
	this.trackSvgLayout.setWidth(this.width-18);
	this.trackSvgLayoutOverview.setWidth(this.width-18);
	this.chromosomeWidget.setWidth(this.width);
	this.karyotypeWidget.setWidth(this.width);
	Ext.getCmp(this.id+"containerPort").setSize(width,height);
};

GenomeViewer.prototype._calculateRegionByZoom = function() {
	var zoomBaseLength = parseInt(this.width/Utils.getPixelBaseByZoom(this.zoom));
	var centerPosition = this.region.center();
	var aux = Math.ceil((zoomBaseLength/2)-1);
	this.region.start = Math.floor(centerPosition-aux);
	this.region.end = Math.floor(centerPosition+aux);
};

GenomeViewer.prototype._calculateZoomByRegion = function() {
	this._getZoomSlider().suspendEvents();
	this.setZoom(Math.round(Utils.getZoomByPixelBase((this.width/this.region.length()))));
	this._getZoomSlider().resumeEvents();
};

GenomeViewer.prototype.setRegion = function(data) {
	switch(data.sender){
	case "setSpecies":
		this._calculateZoomByRegion();
		this.species = data.species;
		this.speciesName = data.text;
		Ext.example.msg('Species', this.speciesName+' selected.');
		Ext.getCmp(this.id+"speciesMenuButton").setText(this.speciesName);
		
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this._updateChrStore();
		this.trackSvgLayout.setRegion({species:this.species});
		this.trackSvgLayoutOverview.setRegion({species:this.species});
		this.chromosomeWidget.setRegion({species:this.species});
		this.karyotypeWidget.setRegion({species:this.species});
		this.onSpeciesChange.notify();
		Ext.getCmp(this.id+"container").setLoading();
		break;
	case "_getChromosomeMenu":
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.chromosomeWidget.setRegion({});
		this.karyotypeWidget.setRegion({});
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"container").setLoading();
		break;
	case "GoButton":
		this._calculateZoomByRegion();
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.region.chromosome);
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.chromosomeWidget.setRegion({});
		this.karyotypeWidget.setRegion({});
		Ext.getCmp(this.id+"container").setLoading();
		break;
	case "KaryotypePanel":
		this._calculateZoomByRegion();
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.chromosomeWidget.setRegion({});
		//this.karyotypeWidget.updatePositionBox();
		Ext.getCmp(this.id+"container").setLoading();
		break;
	case "ChromosomeWidget":
		this._calculateZoomByRegion();
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.karyotypeWidget.setRegion({});
		Ext.getCmp(this.id+"container").setLoading();
		break;
	case "trackSvgLayout":
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this.chromosomeWidget.setRegion({});
		this.karyotypeWidget.setRegion({});
		break;
	case "trackSvgLayoutOverview":
		this._calculateZoomByRegion();
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.chromosomeWidget.setRegion({});
		this.karyotypeWidget.setRegion({});
		Ext.getCmp(this.id+"container").setLoading();
		break;
	case "zoom":
		this._calculateRegionByZoom();
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.chromosomeWidget.setRegion({});
		this.karyotypeWidget.setRegion({});
		Ext.getCmp(this.id+"container").setLoading();
		break;
	default:
		this._calculateZoomByRegion();
		if(data.species != null){
			this.species = data.species;
			this.speciesName = data.text;
			Ext.example.msg('Species', this.speciesName+' selected.');
			this.onSpeciesChange.notify();
		}
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.region.chromosome);
		Ext.getCmp(this.id+"speciesMenuButton").setText(this.speciesName);
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.region.toString());
		this._updateChrStore();
		this.trackSvgLayout.setRegion({});
		this.trackSvgLayoutOverview.setRegion({});
		this.chromosomeWidget.setRegion({});
		this.karyotypeWidget.setRegion({});
		Ext.getCmp(this.id+"container").setLoading();
	}
};


//XXX
//XXX
//XXX
//XXX
//XXX SENCHA ITEMS
//XXX
//XXX
//XXX
//XXX
//XXX

//NAVIGATION BAR
GenomeViewer.prototype._getNavigationBar = function() {
	var _this = this;

	var searchResults = Ext.create('Ext.data.Store', {
		fields: ["xrefId","displayId","description"]
	});
	
	
	var searchCombo = Ext.create('Ext.form.field.ComboBox', {
		id : this.id+'quickSearch',
		displayField: 'displayId',
		valueField: 'displayId',
		emptyText:'gene, snp',
		hideTrigger: true,
        fieldLabel:'Search:',
        labelWidth:40,
		width:150,
		store: searchResults,
		queryMode: 'local',
		typeAhead:false,
		autoSelect:false,
		queryDelay: 500,
		listeners:{
			change:function(){
				var value = this.getValue();
				var min = 2;
				if(value && value.substring(0,3).toUpperCase() == "ENS"){
					min = 10;
				}
				if(value && value.length > min){
					$.ajax({
						url:new CellBaseManager().host+"/latest/"+_this.species+"/feature/id/"+this.getValue()+"/starts_with?of=json",
						success:function(data, textStatus, jqXHR){
							var d = JSON.parse(data);
							searchResults.loadData(d[0]);
							console.log(searchResults)
						},
						error:function(jqXHR, textStatus, errorThrown){console.log(textStatus);}
					});
				}
			},
			select: function(field, e){
				_this._handleNavigationBar('GoToGene');
			}
//			,specialkey: function(field, e){
//				if (e.getKey() == e.ENTER) {
//					_this._handleNavigationBar('GoToGene');
//				}
//			}
		}
	});
	
	var navToolbar = Ext.create('Ext.toolbar.Toolbar', {
		id:this.id+"navToolbar",
		cls:"bio-toolbar",
		region:"north",
		border:true,
		height:35,
//		enableOverflow:true,//if the field is hidden getValue() reads "" because seems the hidden field is a different object
		items : [
		         {
		        	 id:this.id+"speciesMenuButton",
		        	 text : this.speciesName,
		        	 menu: this._getSpeciesMenu()			
		         },{
		        	 id: this.id + "chromosomeMenuButton",
		        	 text : 'Chromosome',
		        	 menu: this._getChromosomeMenu()			
		         },
		         '-',
		         {
		        	 id:this.id+"karyotypeButton",
		        	 text : 'Karyotype',
		        	 enableToggle:true,
		        	 pressed:false,
		        	 toggleHandler:function() {
		        		 if(this.pressed){
		        			 Ext.getCmp(_this.id+"karyotypePanel").show();
		        		 }else{
		        			 Ext.getCmp(_this.id+"karyotypePanel").hide();
		        		 }
		        	 }
		         },
		         {
		        	 id:this.id+"ChromosomeToggleButton",
		        	 text : 'Chromosome',
		        	 enableToggle:true,
		        	 pressed:true,
		        	 toggleHandler:function() {
		        		 if(this.pressed){
		        			 Ext.getCmp(_this.id+"chromosomePanel").show();
		        		 }else{
		        			 Ext.getCmp(_this.id+"chromosomePanel").hide();
		        		 }
		        	 }
		         },
		         {
		        	 id:this.id+"RegionToggleButton",
		        	 text : 'Region',
		        	 enableToggle:true,
		        	 pressed:this.regionPanelHidden,
		        	 toggleHandler:function() {
		        		 if(this.pressed){
		        			 Ext.getCmp(_this.id+"regionPanel").show();
		        		 }else{
		        			 Ext.getCmp(_this.id+"regionPanel").hide();
		        		 }
		        	 }
		         },
		         '-',
//		         {
//		        	 id:this.id+"left1posButton",
//		        	 text : '<',
//		        	 margin : '0 0 0 15',
//		        	 handler : function() {
//		        		 _this._handleNavigationBar('<');
//		        	 }
//		         }, 
		         {
		        	 id:this.id+"zoomOutButton",
                     tooltip:'Zoom out',
		        	 iconCls:'icon-zoom-out',
		        	 margin : '0 0 0 10',
		        	 listeners : {
		        		 click:{
		        			 fn :function() {
		        				 var current = Ext.getCmp(_this.id+'zoomSlider').getValue();
		        				 Ext.getCmp(_this.id+'zoomSlider').setValue(current-_this.increment);
		        			 }
//		        			 buffer : 300
		        		 }
		        	 }
		         },
		         this._getZoomSlider(),
		         {
		        	 id:this.id+"zoomInButton",
		        	 margin:'0 5 0 0',
                     tooltip:'Zoom in',
		        	 iconCls:'icon-zoom-in',
		        	 listeners : {
		        		 click:{
		        			 fn :function() {
		        				 var current = Ext.getCmp(_this.id+'zoomSlider').getValue();
		        				 Ext.getCmp(_this.id+'zoomSlider').setValue(current+_this.increment);
		        			 }
//		        			 buffer : 300
		        		 }
		        	 }
		         },'-',
//		         {
//		        	 id:this.id+"right1posButton",
//		        	 text : '>',
//		        	 handler : function() {
//		        		 _this._handleNavigationBar('>');
//		        	 }
//		         },
		         {
		        	 id:this.id+"positionLabel",
		        	 xtype : 'label',
		        	 text : 'Position:',
		        	 margins : '0 0 0 10'
		         },{
		        	 id : this.id+'tbCoordinate',
		        	 xtype : 'textfield',
		        	 width : 165,
		        	 text : this.chromosome + ":" + this.position,
		        	 listeners:{
		        		 specialkey: function(field, e){
		        			 if (e.getKey() == e.ENTER) {
		        				 _this._handleNavigationBar('Go');
		        			 }
		        		 }
		        	 }
				},
		         {
		        	 id : this.id+'GoButton',
		        	 text : 'Go',
		        	 handler : function() {
		        		 _this._handleNavigationBar('Go');
		        	 }
		         },'->',
//		         {
//		        	 id : this.id+'searchLabel',
//		        	 xtype : 'label',
//		        	 text : 'Quick search:',
//		        	 margins : '0 0 0 10'
//		         },
		         searchCombo,
//		         {
//		        	 id : this.id+'quickSearch',
//		        	 xtype : 'textfield',
//		        	 emptyText:'gene, protein, transcript',
//		        	 name : 'field1',
//		        	 listeners:{
//		        		 specialkey: function(field, e){
//		        			 if (e.getKey() == e.ENTER) {
//		        				 _this._handleNavigationBar('GoToGene');
//		        			 }
//		        		 },
//		        		 change: function(){
//		        			 	var str = this.getValue();
//		        			 	if(str.length > 3){
//		        			 		console.log(this.getValue());
//		        			 	}
//					     }
//		        	 }
//		         },
		         {
		        	 id : this.id+'GoToGeneButton',
		        	 iconCls:'icon-find',
		        	 handler : function() {
		        		 _this._handleNavigationBar('GoToGene');
		        	 }
		         }]
	});
	return navToolbar;

};

//Creates the species empty menu if not exist and returns it
GenomeViewer.prototype._getSpeciesMenu = function() {
	//items must be added by using  setSpeciesMenu()
	if(this._specieMenu == null){
		this._specieMenu = Ext.create('Ext.menu.Menu', {
			id:this.id+"_specieMenu",
			margin : '0 0 10 0',
			floating : true,
            plain:true,
			items : []
		});
	}
	return this._specieMenu;
};
//Sets the species buttons in the menu
GenomeViewer.prototype.setSpeciesMenu = function(speciesObj, popular) {
	var _this = this;

	var menu = this._getSpeciesMenu();
	//Auto generate menu items depending of AVAILABLE_SPECIES config
	menu.hide();//Hide the menu panel before remove
	menu.removeAll(); // Remove the old species

    var popularSpecies = [];

    for(var i = 0; i < speciesObj.items.length; i++){
        var phyloSpecies = speciesObj.items[i].items;
        var pyhlo = speciesObj.items[i];
        pyhlo.menu = {items:phyloSpecies};
        for(var j = 0; j < phyloSpecies.length; j++){
            var species = phyloSpecies[j];
            var text = species.text+' ('+species.assembly+')';
//            species.id = this.id+text;
            species.name = species.text;
            species.species = Utils.getSpeciesCode(species.text);
            species.text = text;
            species.speciesObj = species;
            species.iconCls = '';
//            species.icon = 'http://static.ensembl.org/i/species/48/Danio_rerio.png';
            species.handler = function(me){
                _this.setSpecies(me.speciesObj);
            };

            if(popular.indexOf(species.name) != -1){
                popularSpecies.push(species);
            }
        }
    }
    popularSpecies.sort(function(a, b) {return a.text.localeCompare(b.text);});
    popularSpecies.push('-');
    var items = popularSpecies.concat(speciesObj.items);
    menu.add(items);
};

//Sets the new specie and fires an event
GenomeViewer.prototype.setSpecies = function(data){
	this.region.load(data.region);
	data["sender"]="setSpecies";
	this.onRegionChange.notify(data);
};

GenomeViewer.prototype._getChromosomeMenu = function() {
	var _this = this;
	var chrStore = Ext.create('Ext.data.Store', {
		id:this.id+"chrStore",
		fields: ["name"],
		autoLoad:false
	});
	/*Chromolendar*/
 	var chrView = Ext.create('Ext.view.View', {
 		id:this.id+"chrView",
 		width:125,
		style:'background-color:#fff',
 		store : chrStore,
 		selModel: {
 			mode: 'SINGLE',
 			listeners: {
 				selectionchange:function(este,selNodes){
 					if(selNodes.length>0){
						_this.region.chromosome = selNodes[0].data.name;
 						_this.onRegionChange.notify({sender:"_getChromosomeMenu"});
// 					_this.setChromosome(selNodes[0].data.name);
 					}
 					chromosomeMenu.hide();
 				}
 			}
 		},
 		cls: 'list',
 		trackOver: true,
 		overItemCls: 'list-item-hover',
 		itemSelector: '.chromosome-item', 
 		tpl: '<tpl for="."><div style="float:left" class="chromosome-item">{name}</div></tpl>'
//	        tpl: '<tpl for="."><div class="chromosome-item">chr {name}</div></tpl>'
 	});
	/*END chromolendar*/

 	var chromosomeMenu = Ext.create('Ext.menu.Menu', {
 		id:this.id+"chromosomeMenu",
 		almacen :chrStore,
        plain: true,
		items : [/*{xtype:'textfield', width:125},*/chrView]
//        items:[ //TODO alternative
//            {
//                xtype: 'buttongroup',
//                id:this.id+'chrButtonGroup',
////                title: 'User options',
//                columns: 5,
//                defaults: {
//                    xtype: 'button',
////                    scale: 'large',
//                    iconAlign: 'left',
//                    handler:function(){}
//                },
////                items : [chrView]
////                items: []
//            }
//        ]
	});
 	this._updateChrStore();
	return chromosomeMenu;
};

GenomeViewer.prototype._updateChrStore = function(){
	var _this = this;
	var chrStore = Ext.getStore(this.id+"chrStore");
	var chrView = Ext.getCmp(this.id+"chrView");
//	var chrButtonGroup = Ext.getCmp(this.id+"chrButtonGroup");
	var cellBaseManager = new CellBaseManager(this.species);
 	cellBaseManager.success.addEventListener(function(sender,data){
 		var chromosomeData = [];
 		var chrItems = [];
 		var sortfunction = function(a, b) {
 			var IsNumber = true;
 			for (var i = 0; i < a.length && IsNumber == true; i++) {
 				if (isNaN(a[i])) {
 					IsNumber = false;
 				}
 			}
 			if (!IsNumber) return 1;
 			return (a - b);
 		};
 		data.result.sort(sortfunction);
		for (var i = 0; i < data.result.length; i++) {
			chromosomeData.push({'name':data.result[i]});
//            chrItems.push({text:data.result[i],iconAlign: 'left'});
		}
		chrStore.loadData(chromosomeData);
//        chrButtonGroup.removeAll();
//        chrButtonGroup.add(chrItems);
//		chrView.getSelectionModel().select(chrStore.find("name",_this.chromosome));
 	});
 	cellBaseManager.get('feature', 'chromosome', null, 'list');
};

GenomeViewer.prototype._getZoomSlider = function() {
	var _this = this;
	if(this._zoomSlider==null){
		this._zoomSlider = Ext.create('Ext.slider.Single', {
			id : this.id+'zoomSlider',
			width : 170,
			maxValue : 100,
			minValue : 0,
//			value : this.zoom,
			useTips : true,
			increment : 1,
			tipText : function(thumb) {
				return Ext.String.format('<b>{0}%</b>', thumb.value);
			},
			listeners : {
				'change': {
					fn :function(slider, newValue) {
					 _this._handleNavigationBar("ZOOM", newValue);
					},
					buffer : 500
				}
			}
		});
	}
	return this._zoomSlider;
};

GenomeViewer.prototype._disableZoomElements = function(){
	//disable sencha elements till render gets finished
	Ext.getCmp(this.id+'zoomSlider').disable();
	Ext.getCmp(this.id+"zoomOutButton").disable();
	Ext.getCmp(this.id+"zoomInButton").disable();
};
GenomeViewer.prototype._enableZoomElements = function(){
	Ext.getCmp(this.id+'zoomSlider').enable();
	Ext.getCmp(this.id+"zoomOutButton").enable();
	Ext.getCmp(this.id+"zoomInButton").enable();
};

GenomeViewer.prototype.setZoom = function(zoom) {
	this.zoom = zoom;
	this._getZoomSlider().setValue(zoom);
};

//Action for buttons located in the NavigationBar
GenomeViewer.prototype._handleNavigationBar = function(action, args) {
//	var _this = this;
    if (action == 'OptionMenuClick'){
            this.genomeWidget.showTranscripts = Ext.getCmp("showTranscriptCB").checked;
            this.genomeWidgetProperties.setShowTranscripts(Ext.getCmp("showTranscriptCB").checked);
            this.refreshMasterGenomeViewer();
    }
    if (action == 'ZOOM'){
    	this.setZoom(args);
    	this.onRegionChange.notify({sender:"zoom"});
    }
    if (action == 'GoToGene'){
        var geneName = Ext.getCmp(this.id+'quickSearch').getValue();
        if(geneName != null){
        	if(geneName.slice(0, "rs".length) == "rs" || geneName.slice(0, "AFFY_".length) == "AFFY_" || geneName.slice(0, "SNP_".length) == "SNP_" || geneName.slice(0, "VAR_".length) == "VAR_" || geneName.slice(0, "CRTAP_".length) == "CRTAP_" || geneName.slice(0, "FKBP10_".length) == "FKBP10_" || geneName.slice(0, "LEPRE1_".length) == "LEPRE1_" || geneName.slice(0, "PPIB_".length) == "PPIB_") {
        		this.openSNPListWidget(geneName);
        	}else{
        		this.openGeneListWidget(geneName);
        	}
        }
    }
    if (action == '+'){
//  	var zoom = this.genomeWidgetProperties.getZoom();
    	var zoom = this.zoom;
    	if (zoom < 100){
    		this.setZoom(zoom + this.increment);
    	}
    }
    if (action == '-'){
//    	 var zoom = this.genomeWidgetProperties.getZoom();
    	 var zoom = this.zoom;
  	   if (zoom >= 5){
  		   this.setZoom(zoom - this.increment);
  	   }
    }
    
    if (action == 'Go'){
    	var value = Ext.getCmp(this.id+'tbCoordinate').getValue();

		var reg = new Region({str:value});
		
        // Validate chromosome and position
        if(isNaN(reg.start) || reg.start < 0){
        	Ext.getCmp(this.id+'tbCoordinate').markInvalid("Position must be a positive number");
        }
        else if(Ext.getCmp(this.id+"chromosomeMenu").almacen.find("name", reg.chromosome) == -1){
        	Ext.getCmp(this.id+'tbCoordinate').markInvalid("Invalid chromosome");
        }
        else{
			this.region.load(reg);
			this.onRegionChange.notify({sender:"GoButton"});
        }
        
    }
};


GenomeViewer.prototype._drawKaryotypePanel = function() {
	var _this = this;
	var panel =  Ext.create('Ext.panel.Panel', {
		id:this.id+"karyotypePanel",
		height : 200,
		title:'Karyotype',
		border:true,
		margin:'0 0 1 0',
		//cls:'border-bot panel-border-top',
		html: '<div id="'+this.id+'karyotypeSvg" style="margin-top:2px"></div>',
		listeners:{
			afterrender:function(){
				var div = $('#'+_this.id+"karyotypeSvg")[0];
				_this.karyotypeWidget = new KaryotypeWidget(div,{
					width:_this.width,
					height:168,
					species:_this.species,
					region:_this.region
				});
				_this.karyotypeWidget.onClick.addEventListener(function(sender,data){
					_this.onRegionChange.notify({sender:"KaryotypePanel"});
				});
				_this.karyotypeWidget.drawKaryotype();
			}
		}
	});
	return panel;
};


GenomeViewer.prototype._drawChromosomePanel = function() {
	var _this = this;
	var panel =  Ext.create('Ext.panel.Panel', {
		id:this.id+"chromosomePanel",
		height : 95,
		title:'Chromosome',
		border:true,
		margin:'0 0 1 0',
		//cls:'border-bot panel-border-top',
		html: '<div id="'+this.id+'chromosomeSvg" style="margin-top:2px"></div>',
		listeners:{
			afterrender:function(){
				var div = $('#'+_this.id+"chromosomeSvg")[0];
				_this.chromosomeWidget = new ChromosomeWidget(div,{
					width:_this.width,
					height:65,
					species:_this.species,
					region:_this.region,
					zoom:_this.zoom
				});
				_this.chromosomeWidget.onClick.addEventListener(function(sender,data){
					_this.onRegionChange.notify({sender:"ChromosomeWidget"});
				});
				_this.chromosomeWidget.drawChromosome();
			}
		}
	});
	return panel;
};


GenomeViewer.prototype._drawRegionPanel = function() {
	var _this=this;
	var c1 = Ext.create('Ext.container.Container', {
		height:25,
		style:'background:whitesmoke',
		html:'<div id = "'+this.id+'regionSvgTop"></div>'
	});
	var c2 = Ext.create('Ext.container.Container', {
		overflowY:'auto',//scrollbar
		overflowX:'hidden',//scrollbar
		style:'background:whitesmoke',
		flex: 1,//scrollbar
		html:'<div id = "'+this.id+'regionSvgTrack" style="margin-top:0px"></div></div>'
	});
	var panel =  Ext.create('Ext.panel.Panel', {
		id:this.id+"regionPanel",
		//style:'background:whitesmoke',
		height : 150,
		title:'Region overview <span class="ssel" id="'+this.id+"regionPanelZoom"+'"></span>',
		border:true,
        hidden:!this.regionPanelHidden,
		margin:'0 0 1 0',
		layout: { type: 'vbox',align: 'stretch'},//scrollbar
		//cls:'border-bot panel-border-top x-unselectable',
		items:[c1,c2]
		//html: '<div id="'+this.id+'regionSvg" '
	});
	return panel;
};

GenomeViewer.prototype._drawTracksPanel = function() {
	var _this=this;
	var c1 = Ext.create('Ext.container.Container', {
		height:25,
		style:'background:whitesmoke',
		html:'<div id = "'+this.id+'tracksSvgTop"></div>'
	});
	var c2 = Ext.create('Ext.container.Container', {
		overflowY:'auto',//scrollbar
		overflowX:'hidden',//scrollbar
		style:'background:whitesmoke',
		flex: 1,//scrollbar
		html:'<div id = "'+this.id+'tracksSvgTrack"></div>'
	});
	
	var panel = Ext.create('Ext.panel.Panel', {
		id:this.id+"tracksPanel",
		title:'Detailed information <span class="ssel" id="'+this.id+"regionPanelZoom"+'"></span>',
        shrinkWrap:1,
		layout: { type: 'vbox',align: 'stretch'},//scrollbar
		border:true,
        cls:'x-unselectable',
		//cls:"border-bot panel-border-top x-unselectable",
		flex: 1,
		items:[c1,c2]
	});
	return panel;
};

GenomeViewer.prototype.addTrack = function(trackData, args) {
	this.trackSvgLayout.addTrack(trackData, args);
};

GenomeViewer.prototype.getTrackSvgById = function(trackId) {
	return this.trackSvgLayout.getTrackSvgById(trackId);
};

GenomeViewer.prototype.removeTrack = function(trackId) {
	return this.trackSvgLayout.removeTrack(trackId);
};

GenomeViewer.prototype.restoreTrack = function(trackSvg, index) {
	return this.trackSvgLayout.restoreTrack(trackSvg, index);
};

GenomeViewer.prototype.setTrackIndex = function(trackId, newIndex) {
	return this.trackSvgLayout.setTrackIndex(trackId, newIndex);
};

GenomeViewer.prototype.scrollToTrack = function(trackId) {
	return this.trackSvgLayout.scrollToTrack(trackId);
};

GenomeViewer.prototype.showTrack = function(trackId) {
	this.trackSvgLayout._showTrack(trackId);
};

GenomeViewer.prototype.hideTrack = function(trackId) {
	this.trackSvgLayout._hideTrack(trackId);
};

GenomeViewer.prototype.checkRenderedTrack = function(trackId) {
	if(this.trackSvgLayout.swapHash[trackId]){
		return true;
	}
	return false;
};


//XXX BOTTOM BAR

GenomeViewer.prototype._getBottomBar = function() {
	var geneLegendPanel = new LegendPanel({title:'Gene legend'});
	var snpLegendPanel = new LegendPanel({title:'SNP legend'});
	
//	var scaleLabel = Ext.create('Ext.draw.Component', {
//		id:this.id+"scaleLabel",
//        width: 100,
//        height: 20,
//        items:[
//            {type: 'text',text: 'Scale number',fill: '#000000',x: 10,y: 9,width: 5, height: 20},
//            {type: 'rect',fill: '#000000',x: 0,y: 0,width: 2, height: 20},
//			{type: 'rect',fill: '#000000',x: 2,y: 12, width: 100,height: 3},
//			{type: 'rect',fill: '#000000',x: 101,y: 0, width: 2,height: 20}
//		]
//	});
//	scale.surface.items.items[0].setAttributes({text:'num'},true);
	
	var versionLabel = Ext.create('Ext.toolbar.TextItem', {
		id:this.id+"versionLabel",
		text:''
	});
	
	var mouseLabel = Ext.create('Ext.toolbar.TextItem', {
		id:this.id+"mouseLabel",
		width:110,
		text:'<span class="ssel">Position: -</span>'
	});
	var mouseNucleotidLabel = Ext.create('Ext.toolbar.TextItem', {
		id:this.id+"mouseNucleotidLabel",
		width:10,
		text:'-'
	});
	var windowSize = Ext.create('Ext.toolbar.TextItem', {
		id:this.id+"windowSize",
		width:150,
		text:'<span class="emph">Window size: -</span>'
	});
	
	var taskbar = Ext.create('Ext.toolbar.Toolbar', {
		id:this.id+'uxTaskbar',
		winMgr: new Ext.ZIndexManager(),
		enableOverflow:true,
		cls: 'bio-hiddenbar',
		height:28,
		flex:1
	});
	
	var legendBar = Ext.create('Ext.toolbar.Toolbar', {
		id:this.id+'legendBar',
		cls: 'bio-hiddenbar',
		width:610,
		height:28,
		items : [/*scaleLabel, */
		         '-',mouseLabel,mouseNucleotidLabel,windowSize,
		         geneLegendPanel.getButton(GENE_BIOTYPE_COLORS),
		         snpLegendPanel.getButton(SNP_BIOTYPE_COLORS),
		         '->',versionLabel]
	});
	
	var bottomBar = Ext.create('Ext.container.Container', {
		id:this.id+'bottomBar',
		layout:'hbox',
		region:"south",
		cls:"bio-botbar x-unselectable",
		height:30,
		border:true,
		items : [taskbar,legendBar]
	});
	return bottomBar;
};
//BOTTOM BAR



GenomeViewer.prototype.openListWidget = function(args) {
	var _this = this;
	
	console.log(args.query)
	
	var cellBaseManager = new CellBaseManager(this.species);
	cellBaseManager.success.addEventListener(function(evt, data) {
		if(data.result[0].length>1){
			var genomicListWidget = new GenomicListWidget(_this.species,{title:args.title, gridFields:args.gridField,viewer:_this});
			genomicListWidget.draw(data);
			
			genomicListWidget.onSelected.addEventListener(function(evt, feature) {
//			console.log(feature);
				if (feature != null && feature.chromosome != null) {
					if(_this.chromosome!= feature.chromosome || _this.position != feature.start){
						_this.onRegionChange.notify({sender:"",chromosome:feature.chromosome, position:feature.start});
					}
				}
			});
			
			genomicListWidget.onTrackAddAction.addEventListener(function(evt, event) {
				var track = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.trackSvgLayout.addTrack(track,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});
		}else{
			var feature = data.result[0][0];
			if(feature != null){
				_this.region.load(feature);
				_this.onRegionChange.notify({sender:""});
			}else{
				Ext.example.msg('Feature <span class="ssel">'+args.query+'</span> not found',"");
			}
		}
	});
	cellBaseManager.get(args.category, args.subcategory, args.query, args.resource, args.params);
};
GenomeViewer.prototype.openGeneListWidget = function(name) {
	this.openListWidget({
		category:"feature",
		subcategory:"id",
		query:name.toString(),
		resource:"gene",
		title:"Gene List"
	});
};

GenomeViewer.prototype.openTranscriptListWidget = function(name) {
	this.openListWidget({
		category:"feature",
		subcategory:"transcript",
		query:name.toString(),
		resource:"info",
		title:"Transcript List",
		gridField:["externalName","stableId", "biotype", "chromosome", "start", "end", "strand", "description"]
	});
};

GenomeViewer.prototype.openExonListWidget = function(name) {
	this.openListWidget({
		category:"feature",
		subcategory:"exon",
		query:name.toString(),
		resource:"info",
		title:"Exon List",
		gridField:["stableId", "chromosome","start", "end", "strand"]
	});
};

GenomeViewer.prototype.openSNPListWidget = function(name) {
	this.openListWidget({
		category:"feature",
		subcategory:"id",
		query:name.toString(),
		resource:"snp",
		title:"SNP List",
		gridField:["name", "variantAlleles", "ancestralAllele", "mapWeight",  "position", "sequence","chromosome","start","end"]
	});
};

GenomeViewer.prototype.openGOListWidget = function(name) {
	this.openListWidget({
		category:"feature",
		subcategory:"id",
		query:name.toString(),
		resource:"gene",
		title:"Gene List by GO"
	});
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function TrackSvg(parent, args) {
	this.args = args;
//	this.id = Math.round(Math.random()*10000000); // internal id for this class
	this.parent = parent;
	
	this.y = 0;
	this.height = 25;
	this.width = 200;
	this.title = "track";
	this.renderedArea = {};//used for renders to store binary trees
	
	this.maxPixelWidth=500000;//mesa
	this.pixelPosition=this.maxPixelWidth/2;
	
	this.histogramZoom = -1000;//no histogram by default
	
	this.titleVisibility = 'visible';	
	
	this.closable = true;
	this.types = FEATURE_TYPES;
	
	
	this.labelZoom = -1;

    if (typeof args != 'undefined') {
        this.id = args.id || this.id;
        this.title = args.title || this.title;
        this.type = args.type || this.type;
        this.trackSvgLayout = args.trackSvgLayout || this.trackSvgLayout;
        this.trackData = args.trackData || this.trackData;
        this.width = args.width || this.width;
        this.height = args.height || this.height;
        this.zoom = args.zoom || this.zoom;
        this.region = args.region || this.region;
        this.pixelBase = args.pixelBase || this.pixelBase;
        this.closable = args.closable || this.closable;
        this.labelZoom = args.labelZoom || this.labelZoom;
        this.histogramZoom = args.histogramZoom || this.histogramZoom;
        this.transcriptZoom = args.transcriptZoom || this.transcriptZoom;
        this.featureTypes = args.featureTypes || this.featureTypes;
        this.titleVisibility = args.titleVisibility || this.titleVisibility;
        this.visibleRange = args.visibleRange || this.visibleRange;

		if(args.featuresRender != null){
			switch(args.featuresRender){
				case "MultiFeatureRender": this.featuresRender = this.MultiFeatureRender; break;
				case "SequenceRender": this.featuresRender = this.SequenceRender; break;
				case "GeneTranscriptRender": this.featuresRender = this.GeneTranscriptRender; break;
				case "BamRender": this.featuresRender = this.BamRender; break;
				default: this.featuresRender = this.MultiFeatureRender;
			}
			this.defaultRender = this.featuresRender;
		}
    }

	this.position = this.region.center();
	
	//flags
	this.rendered = false;//svg structure already draw, svg elements can be used from now
	this.status = null;
	
	this.interval=null;
	this.histogram=null;//histogram flag
	this.transcript=null;

	//diplayed boolean object
	this.chunksDisplayed = {};
}

TrackSvg.prototype = {
    setY : function(value){
        this.y = value;
    },

    getHeight : function(){
        return this.height;
    },

    setHeight : function(height){
        this.height=height;
        if(this.rendered){
            this.main.setAttribute("height",height);
            this.features.setAttribute("height",height);
            this.titlebar.setAttribute("height",height);
        }
    },

    setWidth : function(width){
        this.width=width;
        if(this.rendered){
            this.main.setAttribute("width",width);
        }
    },

    setLoading : function(bool){
        if(bool){
            //this.titleGroup.setAttribute("transform","translate(40)");
            this.loading.setAttribute("visibility", "visible");
            this.status = "rendering";
        }else{
            //this.titleGroup.setAttribute("transform","translate(0)");
            this.loading.setAttribute("visibility", "hidden");
            this.status = "ready";
        }
    },

    setHistogramLegend : function(bool){
        if(bool){
            this.histogramLegend.setAttribute("transform", "translate(0)");
        }else{
            this.histogramLegend.setAttribute("transform", "translate(-1000)");
        }
    },

    setFilters : function(filters){
        this.trackData.setFilters(filters);
        this.regionChange();
    },

    getFilters : function(){
        return this.trackData.adapter.filters;
    },

    getFiltersConfig : function(){
        return this.trackData.adapter.filtersConfig;
    },

    setOption : function(option, value){
        this.trackData.setOption(option, value);
        this.regionChange();
    },

    getOptions : function(){
        return this.trackData.adapter.options;
    },

    getOptionsConfig : function(){
        return this.trackData.adapter.optionsConfig;
    },

    cleanSvg : function(filters){
        console.time("-----------------------------------------empty");
        //$(this.features).empty();
//		this.features.textContent = "";
        while (this.features.firstChild) {
            this.features.removeChild(this.features.firstChild);
        }
        console.timeEnd("-----------------------------------------empty");
        //deprecated, diplayed object is now in trackSvg class
        //this.adapter.featureCache.chunksDisplayed = {};
        this.chunksDisplayed = {};
        this.renderedArea = {};
    },

    setTitle : function(title){
        this.titleText.textContent =  title;
        //this.titlebar.setAttribute("width", (15+title.length*6));
    },

    getTitle : function(){
        return this.titleText.textContent;
    },

    draw : function(){
        var _this = this;
        var main = SVG.addChild(this.parent,"svg",{
//		"style":"border:1px solid #e0e0e0;",
            "id":this.id,
            "class":"trackSvg",
            "x":0,
            "y":this.y,
            "width":this.width,
            "height":this.height
        });

        var titleGroup = SVG.addChild(main,"g",{
            "class":"trackTitle"
            //visibility:this.titleVisibility
        });


        var text = this.title;
        var textWidth = 15+text.length*6;
        var titlebar = SVG.addChild(titleGroup,"rect",{
            "x":0,
            "y":0,
            //"width":textWidth,
            "width":this.width,
            //"height":22,
            "height":this.getHeight(),
            //"stroke":"lightgray",
            //"stroke":"deepSkyBlue",
            //"stroke-width":"1",
            "opacity":"0.6",
            //"fill":"honeydew"
            "fill":"transparent"
        });
        var titleText = SVG.addChild(titleGroup,"text",{
            "x":4,
            "y":14,
            "font-size": 12,
            "opacity":"0.4",
            "font-family": "Oxygen",
            "fill":"black"
//		"transform":"rotate(-90 50,50)"
        });
        titleText.textContent =  text;

        var features = SVG.addChild(titleGroup,"svg",{
            "class":"features",
            "x":-this.pixelPosition,
            "width":this.maxPixelWidth,
            "height":this.height
        });
        //var settingsRect = SVG.addChildImage(titleGroup,{
        //"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABHNCSVQICAgIfAhkiAAAAPJJREFUOI2llD0OgkAQhb/QExuPQGWIB/A63IAbGLwG0dNQWxPt6GmoELMWzuJk3IUYJ5mQnXlv/nYWnHOEFCgAp7SIYRPiclg5f0SyJkCmqtgBrankBuwVJwMS59xsKAV4Bc7AwwTwOgEXwTmgFD5boI+QnkAn35C/Fz7HSMYTkErXqZynAPYIkAN346giI6wM7g7kfiYbYFAtpJYtuFS1NggPvRejODtLNvvTCW60GaKVmADhSpZmEqgiPBNWbkdVsHg7/+/Jjxv7EP+8sXqwCe+34CX0dlqxe8mE9zV9LbUJUluAl+CvQAI2xtxYjE/8Ak/JC4Cb6l5eAAAAAElFTkSuQmCC",
        //"x":4+textWidth,
        //"y":3,
        //"width":17,
        //"height":17,
        //"opacity":"0.6",
        //"visibility":"hidden"
        //});
        //
        //var upRect = SVG.addChildImage(titleGroup,{
        //"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD9JREFUOI1jYKAhEGBgYJgPxWSB+QwMDP+hmGRDkDWTbAg2zUQbgk8zQUOI0Uyyd2AacAImYk0aNWAwG0AxAABRBSdztC0IxQAAAABJRU5ErkJggg==",
        //"x":22+textWidth,
        //"y":4,
        //"width":16,
        //"height":16,
        //"opacity":"0.6",
        //"visibility":"hidden"
        //});
        //
        //var downRect = SVG.addChildImage(titleGroup,{
        //"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAERJREFUOI1jYKAx+A/FOAETpTaMGjDYDJjPgIh39PhHF5+Py0BshhCtmRhDCGrGZwjRmrEZQrJmZEPmMzAwCJBrAEEAANCqJXdWrFuyAAAAAElFTkSuQmCC",
        //"x":36+textWidth,
        //"y":4,
        //"width":16,
        //"height":16,
        //"opacity":"0.6",
        //"visibility":"hidden"
        //});
        //var hideRect = SVG.addChildImage(titleGroup,{
        //"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAJFJREFUOI2tks0NgzAMhb+wAFP05FM2aCdjtDBCLjkxBRO4F4JoAONIfVKkyHk/sl4CQIyRFqpKzvk0/zvCMRSYgU9LEpH9XkpJwFtEgqr+8NJmkozAR45F2N+WcTQyrk3c4lYwbadLXFGFCkx34sHr9lrXrvTLFXrFx509Fd+K3SaeqkwTb1XV5Axvz73/wcQXYitIjMzG550AAAAASUVORK5CYII=",
        //"x":52+textWidth,
        //"y":4,
        //"width":16,
        //"height":16,
        //"opacity":"0.6",
        //"visibility":"hidden"
        //});

        //bamStrandPatt
//	var bamStrandPatt = SVG.addChild(main,"pattern",{
//		"id":this.id+"bamStrandPatt",
//		"patternUnits":"userSpaceOnUse",
//		"x":0,
//		"y":0,
//		"width":30,
//		"height":10
//	});
//
//	var bamStrandPattArrow = SVG.addChild(bamStrandPatt,"path",{
//		"d":"M 1 1 L 8 5 L 1 9 Z",
//	});

        /*GRADIENT*/
        //var bamStrandForward = SVG.addChild(main,"linearGradient",{
        //"id":this.id+"bamStrandForward"
        //});
        //var bamStrandReverse = SVG.addChild(main,"linearGradient",{
        //"id":this.id+"bamStrandReverse"
        //});
        //var stop1 = SVG.addChild(bamStrandForward,"stop",{
        //"offset":"5%",
        //"stop-color":"#666"
        //});
        //var stop2 = SVG.addChild(bamStrandForward,"stop",{
        //"offset":"95%",
        //"stop-color":"#BBB"
        //});
        //var stop1 = SVG.addChild(bamStrandReverse,"stop",{
        //"offset":"5%",
        //"stop-color":"#BBB"
        //});
        //var stop2 = SVG.addChild(bamStrandReverse,"stop",{
        //"offset":"95%",
        //"stop-color":"#666"
        //});
        /*GRADIENT*/

////	XXX para mañana, arrastrar para ordenar verticalmente
//	$(titleGroup).mousedown(function(event){
//		main.parentNode.appendChild(main);
////		var x = parseInt(main.getAttribute("x")) - event.offsetX;
//		var y = parseInt(main.getAttribute("y")) - event.clientY;
//		$(this.parentNode).mousemove(function(event){
////			main.setAttribute("x",x + event.offsetX);
//			main.setAttribute("y",y + event.clientY);
//		});
//	});
//	$(main).mouseup(function(event){
//		$(this).off('mousemove');
//	});


//	var over = SVG.addChild(main,"rect",{
//		"x":0,
//		"y":0,
//		"width":this.width,
//		"height":this.height,
//		"opacity":"0",
//		"stroke":"330000",
//		"stroke-width":"1",
//		"fill":"deepskyblue"
//	});

        this.fnTitleMouseEnter = function(){
//		over.setAttribute("opacity","0.1");
            //titlebar.setAttribute("width",74+textWidth);
            titlebar.setAttribute("opacity","0.1");
            titlebar.setAttribute("fill","greenyellow");
            titleText.setAttribute("opacity","1.0");
            //upRect.setAttribute("visibility","visible");
            //downRect.setAttribute("visibility","visible");
            //if(_this.closable == true){ hideRect.setAttribute("visibility","visible"); }
//		settingsRect.setAttribute("visibility","visible");//TODO not implemented yet, hidden for now...
        };
        this.fnTitleMouseLeave = function(){
////	over.setAttribute("opacity","0.0");
            //titlebar.setAttribute("width",textWidth);
            titlebar.setAttribute("opacity","0.6");
            titlebar.setAttribute("fill","transparent");
            titleText.setAttribute("opacity","0.4");
            //upRect.setAttribute("visibility","hidden");
            //downRect.setAttribute("visibility","hidden");
            //hideRect.setAttribute("visibility","hidden");
            //settingsRect.setAttribute("visibility","hidden");
        };

        $(titleGroup).off("mouseenter");
        $(titleGroup).off("mouseleave");
        $(titleGroup).mouseenter(this.fnTitleMouseEnter);
        $(titleGroup).mouseleave(this.fnTitleMouseLeave);

        //$([upRect,downRect,hideRect,settingsRect]).mouseover(function(event){
        //this.setAttribute("opacity","1.0");
        //});
        //$([upRect,downRect,hideRect,settingsRect]).mouseleave(function(event){
        //this.setAttribute("opacity","0.6");
        //});
//
        //$(settingsRect).mouseover(function(event){
        //titlebar.setAttribute("height",22+22);
        //});
        //$(settingsRect).mouseleave(function(event){
        //titlebar.setAttribute("height",22);
        //});
        //
        //set initial values when hide due mouseleave event not fires when hideTrack from TrackSvgLayout
        //$(hideRect).click(function(event){
        //titlebar.setAttribute("width",textWidth);
        //titlebar.setAttribute("opacity","0.6");
        //titleText.setAttribute("opacity","0.4");
        //upRect.setAttribute("visibility","hidden");
        //downRect.setAttribute("visibility","hidden");
        //hideRect.setAttribute("visibility","hidden");
        //settingsRect.setAttribute("visibility","hidden");
        //});


        this.invalidZoomText = SVG.addChild(titleGroup,"text",{
            "x":154,
            "y":24,
            "font-size": 10,
            "opacity":"0.6",
            "fill":"black",
            "font-family": "Oxygen",
            "visibility":"hidden"
        });
        this.invalidZoomText.textContent = "This level of zoom isn't appropiate for this track";


        var loadingImg = '<?xml version="1.0" encoding="utf-8"?>'+
            '<svg version="1.1" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
            '<defs>'+
            '<g id="pair">'+
            '<ellipse cx="7" cy="0" rx="4" ry="1.7" style="fill:#ccc; fill-opacity:0.5;"/>'+
            '<ellipse cx="-7" cy="0" rx="4" ry="1.7" style="fill:#aaa; fill-opacity:1.0;"/>'+
            '</g>'+
            '</defs>'+
            '<g transform="translate(11,11)">'+
            '<g>'+
            '<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.5s" repeatDur="indefinite"/>'+
            '<use xlink:href="#pair"/>'+
            '<use xlink:href="#pair" transform="rotate(45)"/>'+
            '<use xlink:href="#pair" transform="rotate(90)"/>'+
            '<use xlink:href="#pair" transform="rotate(135)"/>'+
            '</g>'+
            '</g>'+
            '</svg>';

        this.loading = SVG.addChildImage(main,{
            "xlink:href":"data:image/svg+xml,"+encodeURIComponent(loadingImg),
            "x":10,
            "y":0,
            "width":22,
            "height":22,
            "visibility":"hidden"
        });

        //ya no se usa, es track svg layout el q captura el evento de click y arrastrar
        //$(this.parent).mousedown(function(event) {
        //var x = parseInt(features.getAttribute("x")) - event.clientX;
        //$(this).mousemove(function(event){
        //features.setAttribute("x",x + event.clientX);
        //});
        //});
        //$(this.parent).mouseup(function(event) {
        //$(this).off('mousemove');
        //});


        this.main = main;
        this.titleGroup = titleGroup;
        this.titlebar = titlebar;
        this.titleText = titleText;
        //this.upRect = upRect;
        //this.downRect = downRect;
        //this.hideRect = hideRect;
        //this.settingsRect = settingsRect;
        this.features = features;

        this.rendered = true;
        this.status = "ready";

        this.histogramLegend =  SVG.addChild(this.titleGroup,"g");

    }
};




//RENDERS for MultiFeatureRender, sequence, Snp, Histogram
TrackSvg.prototype.MultiFeatureRender = function(response){//featureList
	var featureList = this._getFeaturesByChunks(response);
	//here we got features array
	var _this = this;
	console.time("Multirender ["+featureList.length+"] "+ response.params.resource);
//	console.log(featureList.length);
	var draw = function(feature){
		var start = feature.start;
		var end = feature.end;
		var width = (end-start)+1;
		
		var middle = _this.width/2;
		
		if(width<0){//snps can be negative
			width=Math.abs(width);
		}
		if(width==0){//snps with same start - end
			width=1;
		}
		
		//get featureType settings object
		var settings = _this.types[feature.featureType];
		try {
			var color = settings.getColor(feature);
		} catch (e) {
			//Uncaught TypeError: Cannot call method 'getColor' of undefined 
			console.log(e)
			debugger
			
		}


		//transform to pixel position
		width = width * _this.pixelBase;
		var x = _this.pixelPosition+middle-((_this.position-start)*_this.pixelBase);
		
		var textHeight = 9;
		if(_this.zoom > _this.labelZoom){
			try{
				var maxWidth = Math.max(width, settings.getLabel(feature).length*8); //XXX cuidado : text.getComputedTextLength()
			}catch(e){
				var maxWidth = 72;
			}
		}else{
			var maxWidth = Math.max(width,2);
			textHeight = 0;
		}
		
		
		var rowHeight = textHeight+10;
		var rowY = 0;
		var textY = textHeight+settings.height;
		
		while(true){
			if(_this.renderedArea[rowY] == null){
				_this.renderedArea[rowY] = new FeatureBinarySearchTree();
			}
			var found = _this.renderedArea[rowY].add({start: x, end: x+maxWidth-1});
			
			if(found){
				var featureGroup = SVG.addChild(_this.features,"g");
				var rect = SVG.addChild(featureGroup,"rect",{
					"x":x,
					"y":rowY,
					"width":width,
					"height":settings.height,
					"stroke": "black",
					"stroke-width": 1,
					"stroke-opacity": 0.5,
					"fill": color,
					"cursor": "pointer"
				});
				if(_this.zoom > _this.labelZoom){
					var text = SVG.addChild(featureGroup,"text",{
						"i":i,
						"x":x,
						"y":textY,
						"font-size":10,
						"opacity":null,
						"fill":"black",
                        "font-family": "Oxygen Mono",
						"cursor": "pointer"
					});
					text.textContent = settings.getLabel(feature);
				}
				
				$(featureGroup).qtip({
					content: {text:settings.getTipText(feature), title:settings.getTipTitle(feature)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:true, classes: 'ui-tooltip ui-tooltip-shadow'}
				});
				
				$(featureGroup).click(function(event){
					_this.showInfoWidget({query:feature[settings.infoWidgetId], feature:feature, featureType:feature.featureType, adapter:_this.trackData.adapter});
				});
				break;
			}
			rowY += rowHeight;
			textY += rowHeight;
		}
	};
	
	//process features
	for ( var i = 0, leni = featureList.length; i < leni; i++) {
		draw(featureList[i]);
	}
	var newHeight = Object.keys(this.renderedArea).length*24;
	if(newHeight>0){
		this.setHeight(newHeight+/*margen entre tracks*/10);
	}
	console.timeEnd("Multirender ["+featureList.length+"] "+ response.params.resource);
};

TrackSvg.prototype.BamRender = function(response){
	var _this = this;

	//CHECK VISUALIZATON MODE
	var viewAsPairs = false;
	if(response.params["view_as_pairs"] != null){
		viewAsPairs = true;
	}
	console.log("viewAsPairs "+viewAsPairs);
	var insertSizeMin = 0;
	var insertSizeMax = 0;
	var variantColor = "orangered";
	if(response.params["insert_size_interval"] != null){
		insertSizeMin = response.params["insert_size_interval"].split(",")[0];
		insertSizeMax = response.params["insert_size_interval"].split(",")[1];
	}
	console.log("insertSizeMin "+insertSizeMin);
	console.log("insertSizeMin "+insertSizeMax);

	//Prevent browser context menu
	$(this.features).contextmenu(function(e) {
		console.log("click derecho")
		//e.preventDefault();
	});
	
	console.time("BamRender "+ response.params.resource);
	
	response = this._removeDisplayedChunks(response);
	var chunkList = response.items;

	var middle = this.width/2;
	
	var bamCoverGroup = SVG.addChild(_this.features,"g",{
		"class":"bamCoverage",
		"cursor": "pointer"
	});
	var bamReadGroup = SVG.addChild(_this.features,"g",{
		"class":"bamReads",
		"cursor": "pointer"
	});

	var drawCoverage = function(chunk){
		//var coverageList = chunk.coverage.all;
		var coverageList = chunk.coverage.all;
		var coverageListA = chunk.coverage.a;
		var coverageListC = chunk.coverage.c;
		var coverageListG = chunk.coverage.g;
		var coverageListT = chunk.coverage.t;
		var start = parseInt(chunk.start);
		var end = parseInt(chunk.end);
		var pixelWidth = (end-start+1)*_this.pixelBase;


		var points = "", pointsA = "", pointsC = "", pointsG = "", pointsT = "";
		var baseMid = (_this.pixelBase/2)-0.5;//4.5 cuando pixelBase = 10
		
		var x,y, p = parseInt(chunk.start);
		var lineA = "", lineC = "", lineG = "", lineT = "";
		var coverageNorm = 200, covHeight = 50;
		for ( var i = 0; i < coverageList.length; i++) {
			//x = _this.pixelPosition+middle-((_this.position-p)*_this.pixelBase)+baseMid;
			x = _this.pixelPosition+middle-((_this.position-p)*_this.pixelBase);
            xx = _this.pixelPosition+middle-((_this.position-p)*_this.pixelBase)+_this.pixelBase;
			
			lineA += x+","+coverageListA[i]/coverageNorm*covHeight+" ";
			lineA += xx+","+coverageListA[i]/coverageNorm*covHeight+" ";
			lineC += x+","+(coverageListC[i]+coverageListA[i])/coverageNorm*covHeight+" ";
			lineC += xx+","+(coverageListC[i]+coverageListA[i])/coverageNorm*covHeight+" ";
			lineG += x+","+(coverageListG[i]+coverageListC[i]+coverageListA[i])/coverageNorm*covHeight+" ";
			lineG += xx+","+(coverageListG[i]+coverageListC[i]+coverageListA[i])/coverageNorm*covHeight+" ";
			lineT += x+","+(coverageListT[i]+coverageListG[i]+coverageListC[i]+coverageListA[i])/coverageNorm*covHeight+" ";
			lineT += xx+","+(coverageListT[i]+coverageListG[i]+coverageListC[i]+coverageListA[i])/coverageNorm*covHeight+" ";
			
			p++;
		}

		//reverse to draw the polylines(polygons) for each nucleotid
		var rlineC = lineC.split(" ").reverse().join(" ").trim();
		var rlineG = lineG.split(" ").reverse().join(" ").trim();
		var rlineT = lineT.split(" ").reverse().join(" ").trim();
		
		var firstPoint = _this.pixelPosition+middle-((_this.position-parseInt(chunk.start))*_this.pixelBase)+baseMid;
		var lastPoint = _this.pixelPosition+middle-((_this.position-parseInt(chunk.end))*_this.pixelBase)+baseMid;

        var polA = SVG.addChild(bamCoverGroup,"polyline",{
			"points":firstPoint+",0 "+lineA+lastPoint+",0",
			//"opacity":"1",
			//"stroke-width":"1",
			//"stroke":"gray",
			"fill":"green"
		});
        var polC = SVG.addChild(bamCoverGroup,"polyline",{
			"points":lineA+" "+rlineC,
			//"opacity":"1",
			//"stroke-width":"1",
			//"stroke":"black",
			"fill":"blue"
		});
        var polG = SVG.addChild(bamCoverGroup,"polyline",{
			"points":lineC+" "+rlineG,
			//"opacity":"1",
			//"stroke-width":"1",
			//"stroke":"black",
			"fill":"gold"
		});
        var polT = SVG.addChild(bamCoverGroup,"polyline",{
			"points":lineG+" "+rlineT,
			//"opacity":"1",
			//"stroke-width":"1",
			//"stroke":"black",
			"fill":"red"
		});
		
		var dummyRect = SVG.addChild(bamCoverGroup,"rect",{
			"x":_this.pixelPosition+middle-((_this.position-start)*_this.pixelBase),
			"y":0,
			"width":pixelWidth,
			"height":covHeight,
			"opacity":"0.5",
			"fill": "lightgray",
			"cursor": "pointer"
		});


		$(dummyRect).qtip({
			content:" ",
			position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
			style: { width:true, classes: 'ui-tooltip-shadow'}
		});
		_this.trackSvgLayout.onMousePosition.addEventListener(function(sender,obj){
			var pos = obj.mousePos-parseInt(chunk.start);
			//if(coverageList[pos]!=null){
				var str = 'depth: <span class="ssel">'+coverageList[pos]+'</span><br>'+
						'<span style="color:green">A</span>: <span class="ssel">'+chunk.coverage.a[pos]+'</span><br>'+
						'<span style="color:blue">C</span>: <span class="ssel">'+chunk.coverage.c[pos]+'</span><br>'+
						'<span style="color:darkgoldenrod">G</span>: <span class="ssel">'+chunk.coverage.g[pos]+'</span><br>'+
						'<span style="color:red">T</span>: <span class="ssel">'+chunk.coverage.t[pos]+'</span><br>';
				$(dummyRect).qtip('option', 'content.text', str ); 
			//}
		});
	};
	
	var drawSingleRead = function(feature){
		//var start = feature.start;
		//var end = feature.end;
		var start = feature.unclippedStart;
		var end = feature.unclippedEnd;
		var diff = feature.diff;
		/*get type settings object*/
		var settings = _this.types[feature.featureType];
		var strand = settings.getStrand(feature);
		var color = settings.getColor(feature, _this.region.chromosome);
		
		if(insertSizeMin != 0 && insertSizeMax != 0 && !settings.getMateUnmappedFlag(feature)){
			if(Math.abs(feature.inferredInsertSize) > insertSizeMax){
				color = 'maroon';
			}
			if(Math.abs(feature.inferredInsertSize) < insertSizeMin){
				color = 'navy';
			}
		}

		/*transform to pixel position*/
		var width = ((end-start)+1)*_this.pixelBase;
		var x = _this.pixelPosition+middle-((_this.position-start)*_this.pixelBase);
//		try{
//			var maxWidth = Math.max(width, /*settings.getLabel(feature).length*8*/0); //XXX cuidado : text.getComputedTextLength()
//		}catch(e){
//			var maxWidth = 72;
//		}
        maxWidth = width;


		var rowHeight = 12;
		var rowY = 70;
//		var textY = 12+settings.height;
		while(true){
			if(_this.renderedArea[rowY] == null){
				_this.renderedArea[rowY] = new FeatureBinarySearchTree();
			}
			var enc = _this.renderedArea[rowY].add({start: x, end: x+maxWidth-1});
			if(enc){
				var readEls = [];
				var points = {
					"Reverse":x+","+(rowY+(settings.height/2))+" "+(x+5)+","+rowY+" "+(x+width-5)+","+rowY+" "+(x+width-5)+","+(rowY+settings.height)+" "+(x+5)+","+(rowY+settings.height),
					"Forward":x+","+rowY+" "+(x+width-5)+","+rowY+" "+(x+width)+","+(rowY+(settings.height/2))+" "+(x+width-5)+","+(rowY+settings.height)+" "+x+","+(rowY+settings.height)
				}
				var poly = SVG.addChild(bamReadGroup,"polygon",{
					"points":points[strand],
					"stroke": settings.getStrokeColor(feature),
					"stroke-width": 1,
					"fill": color,
					"cursor": "pointer"
				});
				readEls.push(poly);

				//var rect = SVG.addChild(bamReadGroup,"rect",{
					//"x":x+offset[strand],
					//"y":rowY,
					//"width":width-4,
					//"height":settings.height,
					//"stroke": "white",
					//"stroke-width":1,
					//"fill": color,
					//"clip-path":"url(#"+_this.id+"cp)",
					//"fill": 'url(#'+_this.id+'bamStrand'+strand+')',
				//});
				//readEls.push(rect);
				
				if(diff != null && _this.zoom > 95){
					//var	t = SVG.addChild(bamReadGroup,"text",{
						//"x":x+1,
						//"y":rowY+settings.height-1,
						//"font-size":13,
						//"fill":"darkred",
						//"textLength":width,
						//"cursor": "pointer",
						//"font-family": "Ubuntu Mono"
					//});
					//t.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space","preserve");
					//t.textContent = diff;
					//readEls.push(t);
					var path = SVG.addChild(bamReadGroup,"path",{
						"d":Utils.genBamVariants(diff, _this.pixelBase, x, rowY),
						"fill":variantColor
					});
					readEls.push(path);
				}
				
				$(readEls).qtip({
					content: {text:settings.getTipText(feature), title:settings.getTipTitle(feature)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:280,classes: 'ui-tooltip ui-tooltip-shadow'},
                    show: 'click',
                    hide: 'click mouseleave'
				});
				$(readEls).click(function(event){
					console.log(feature);
					_this.showInfoWidget({query:feature[settings.infoWidgetId], feature:feature, featureType:feature.featureType, adapter:_this.trackData.adapter});
				});
				break;
			}
			rowY += rowHeight;
//			textY += rowHeight;
		}
	};

	var drawPairedReads = function(read, mate){
		var readStart = read.unclippedStart;
		var readEnd = read.unclippedEnd;
		var mateStart = mate.unclippedStart;
		var mateEnd = mate.unclippedEnd;
		var readDiff = read.diff;
		var mateDiff = mate.diff;
		/*get type settings object*/
		var readSettings = _this.types[read.featureType];
		var mateSettings = _this.types[mate.featureType];
		var readColor = readSettings.getColor(read, _this.region.chromosome);
		var mateColor = mateSettings.getColor(mate, _this.region.chromosome);
		var readStrand = readSettings.getStrand(read);
		var matestrand = mateSettings.getStrand(mate);

		if(insertSizeMin != 0 && insertSizeMax != 0){
			if(Math.abs(read.inferredInsertSize) > insertSizeMax){
				readColor = 'maroon';
				mateColor = 'maroon';
			}
			if(Math.abs(read.inferredInsertSize) < insertSizeMin){
				readColor = 'navy';
				mateColor = 'navy';
			}
		}

		var pairStart = readStart;
		var pairEnd = mateEnd;
		if(mateStart <= readStart){
			pairStart = mateStart;
		}
		if(readEnd >= mateEnd){
			pairEnd = readEnd;
		}
		
		/*transform to pixel position*/
		var pairWidth = ((pairEnd-pairStart)+1)*_this.pixelBase;
		var pairX = _this.pixelPosition+middle-((_this.position-pairStart)*_this.pixelBase);
		
		var readWidth = ((readEnd-readStart)+1)*_this.pixelBase;
		var readX = _this.pixelPosition+middle-((_this.position-readStart)*_this.pixelBase);
		
		var mateWidth = ((mateEnd-mateStart)+1)*_this.pixelBase;
		var mateX = _this.pixelPosition+middle-((_this.position-mateStart)*_this.pixelBase);

		var rowHeight = 12;
		var rowY = 70;
//		var textY = 12+settings.height;

		while(true){
			if(_this.renderedArea[rowY] == null){
				_this.renderedArea[rowY] = new FeatureBinarySearchTree();
			}
			var enc = _this.renderedArea[rowY].add({start: pairX, end: pairX+pairWidth-1});
			if(enc){
				var readEls = [];
				var mateEls = [];
				var readPoints = {
					"Reverse":readX+","+(rowY+(readSettings.height/2))+" "+(readX+5)+","+rowY+" "+(readX+readWidth-5)+","+rowY+" "+(readX+readWidth-5)+","+(rowY+readSettings.height)+" "+(readX+5)+","+(rowY+readSettings.height),
					"Forward":readX+","+rowY+" "+(readX+readWidth-5)+","+rowY+" "+(readX+readWidth)+","+(rowY+(readSettings.height/2))+" "+(readX+readWidth-5)+","+(rowY+readSettings.height)+" "+readX+","+(rowY+readSettings.height)
				}
				var readPoly = SVG.addChild(bamReadGroup,"polygon",{
					"points":readPoints[readStrand],
					"stroke": readSettings.getStrokeColor(read),
					"stroke-width": 1,
					"fill": readColor,
					"cursor": "pointer"
				});
				readEls.push(readPoly);
				var matePoints = {
					"Reverse":mateX+","+(rowY+(mateSettings.height/2))+" "+(mateX+5)+","+rowY+" "+(mateX+mateWidth-5)+","+rowY+" "+(mateX+mateWidth-5)+","+(rowY+mateSettings.height)+" "+(mateX+5)+","+(rowY+mateSettings.height),
					"Forward":mateX+","+rowY+" "+(mateX+mateWidth-5)+","+rowY+" "+(mateX+mateWidth)+","+(rowY+(mateSettings.height/2))+" "+(mateX+mateWidth-5)+","+(rowY+mateSettings.height)+" "+mateX+","+(rowY+mateSettings.height)
				}
				var matePoly = SVG.addChild(bamReadGroup,"polygon",{
					"points":matePoints[matestrand],
					"stroke": mateSettings.getStrokeColor(mate),
					"stroke-width": 1,
					"fill": mateColor,
					"cursor": "pointer"
				});
				mateEls.push(matePoly);

				var line = SVG.addChild(bamReadGroup,"line",{
					"x1":(readX+readWidth),
					"y1":(rowY+(readSettings.height/2)),
					"x2":mateX,
					"y2":(rowY+(readSettings.height/2)),
					"stroke-width": "1",
					"stroke": "gray",
					//"stroke-color": "black",
					"cursor": "pointer"
				});
				
				if(_this.zoom > 95){
					if(readDiff != null){
						var readPath = SVG.addChild(bamReadGroup,"path",{
							"d":Utils.genBamVariants(readDiff, _this.pixelBase, readX, rowY),
							"fill":variantColor
						});
						readEls.push(readPath);
					}
					if(mateDiff != null){
						var matePath = SVG.addChild(bamReadGroup,"path",{
							"d":Utils.genBamVariants(mateDiff, _this.pixelBase, mateX, rowY),
							"fill":variantColor
						});
						mateEls.push(matePath);
					}
				}
				
				$(readEls).qtip({
					content: {text:readSettings.getTipText(read), title:readSettings.getTipTitle(read)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:280,classes: 'ui-tooltip ui-tooltip-shadow'},
                    show: 'click',
                    hide: 'click mouseleave'
				});
				$(readEls).click(function(event){
					console.log(read);
					_this.showInfoWidget({query:read[readSettings.infoWidgetId], feature:read, featureType:read.featureType, adapter:_this.trackData.adapter});
				});
				$(mateEls).qtip({
					content: {text:mateSettings.getTipText(mate), title:mateSettings.getTipTitle(mate)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:280,classes: 'ui-tooltip ui-tooltip-shadow'},
                    show: 'click',
                    hide: 'click mouseleave'
				});
				$(mateEls).click(function(event){
					console.log(mate);
					_this.showInfoWidget({query:mate[mateSettings.infoWidgetId], feature:mate, featureType:mate.featureType, adapter:_this.trackData.adapter});
				});
				break;
			}
			rowY += rowHeight;
//			textY += rowHeight;
		}
	};

	var drawChunk = function(chunk){
		drawCoverage(chunk);//TODO testing
		var readList = chunk.data;
		for ( var i = 0, li = readList.length; i < li; i++) {
			var read = readList[i];
			if(viewAsPairs){
				var nextRead = readList[i+1];
				if(nextRead!=null){
					if(read.name == nextRead.name){
						drawPairedReads(read,nextRead);
						i++;
					}else{
						drawSingleRead(read);
					}
				}
			}else{
				drawSingleRead(read);
			}
		}
	};
	
	//process features
	if(chunkList.length>0){
		for ( var i = 0, li = chunkList.length; i < li; i++) {
					if(chunkList[i].data.length > 0){
						drawChunk(chunkList[i]);
					}
		}
		var newHeight = Object.keys(this.renderedArea).length*24;
		if(newHeight>0){
			this.setHeight(newHeight+/*margen entre tracks*/10+70);
		}
        //TEST
//        this.setHeight(200);
	}
	console.timeEnd("BamRender "+ response.params.resource);
};

TrackSvg.prototype.GeneTranscriptRender = function(response){
	var featureList = this._getFeaturesByChunks(response);
	//here we got features array
	var _this = this;
	console.time("GeneTranscriptRender");
//	console.log(featureList.length);
	var draw = function(feature){
		var start = feature.start;
		var end = feature.end;
		var width = (end-start)+1;

		var middle = _this.width/2;
		//get type settings object
		var settings = _this.types[feature.featureType];
		var color = settings.getColor(feature);
		
		//transform to pixel position
		width = width * _this.pixelBase;
		var x = _this.pixelPosition+middle-((_this.position-start)*_this.pixelBase);
		
		try{
			var maxWidth = Math.max(width, settings.getLabel(feature).length*8); //XXX cuidado : text.getComputedTextLength()
		}catch(e){
			var maxWidth = 72;
		}
		
		var rowHeight = 20;
		var rowY = 0;
		var textY = 10+settings.height;
		
		
		while(true){
			if(_this.renderedArea[rowY] == null){
				_this.renderedArea[rowY] = new FeatureBinarySearchTree();
			}

			var enc;//if true, i can paint
			
			//check if transcripts can be painted
			var checkRowY = rowY;
			if(feature.transcripts!=null){
				for ( var i = 0, leni = feature.transcripts.length+1; i < leni; i++) {
					if(_this.renderedArea[checkRowY] == null){
						_this.renderedArea[checkRowY] = new FeatureBinarySearchTree();
					}
					enc = !_this.renderedArea[checkRowY].contains({start: x, end: x+maxWidth-1});
					if(enc == false){
						break;
					}
					checkRowY += rowHeight;
				}
			}else{
				enc = _this.renderedArea[rowY].add({start: x, end: x+maxWidth-1});
			}

			if(enc){//paint genes
				var rect = SVG.addChild(_this.features,"rect",{
					"x":x,
					"y":rowY,
					"width":width,
					"height":settings.height,
					"stroke": "#3B0B0B",
					"stroke-width": 0.5,
					"fill": color,
					"cursor": "pointer"
				});

				var text = SVG.addChild(_this.features,"text",{
					"i":i,
					"x":x,
					"y":textY,
					"font-size":10,
					"opacity":null,
					"fill":"black",
                    "font-family": "Oxygen Mono",
					"cursor": "pointer"
				});
				text.textContent = settings.getLabel(feature);

				$([rect,text]).qtip({
					content: {text:settings.getTipText(feature), title:settings.getTipTitle(feature)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:true, classes: 'ui-tooltip ui-tooltip-shadow'}
				});

				$([rect,text]).click(function(event){
                    var settings = _this.types[feature.featureType];
					_this.showInfoWidget({query:feature[settings.infoWidgetId], feature:feature, featureType:feature.featureType , adapter:_this.trackData.adapter});
				});


				//paint transcripts
				var checkRowY = rowY+rowHeight;
				var checkTextY = textY+rowHeight;
				if(feature.transcripts!=null){
					for(var i = 0, leni = feature.transcripts.length; i < leni; i++){/*Loop over transcripts*/
						if(_this.renderedArea[checkRowY] == null){
							_this.renderedArea[checkRowY] = new FeatureBinarySearchTree();
						}
						var transcript = feature.transcripts[i];
						var transcriptX = _this.pixelPosition+middle-((_this.position-transcript.start)*_this.pixelBase);
						var transcriptWidth = (transcript.end-transcript.start+1) * ( _this.pixelBase);

						//get type settings object
						var settings = _this.types[transcript.featureType];
						var color = settings.getColor(transcript);

						try{
							//se resta el trozo del final del gen hasta el principio del transcrito y se le suma el texto del transcrito
							var maxWidth = Math.max(width, width-((feature.end-transcript.start)* ( _this.pixelBase))+settings.getLabel(transcript).length*7);
						}catch(e){
							var maxWidth = 72;
						}

						//add to the tree the transcripts size
						_this.renderedArea[checkRowY].add({start: x, end: x+maxWidth-1});

						
						var transcriptGroup = SVG.addChild(_this.features,"g",{
							"widgetId":transcript[settings.infoWidgetId]
						});
						
						
						var rect = SVG.addChild(transcriptGroup,"rect",{//this rect its like a line
							"x":transcriptX,
							"y":checkRowY+1,
							"width":transcriptWidth,
							"height":settings.height,
							"fill": "gray",
							"cursor": "pointer"
						});
						var text = SVG.addChild(transcriptGroup,"text",{
							"x":transcriptX,
							"y":checkTextY,
							"font-size":10,
							"opacity":null,
							"fill":"black",
                            "font-family": "Oxygen Mono",
							"cursor": "pointer"
						});
						text.textContent = settings.getLabel(transcript);


						$(transcriptGroup).qtip({
							content: {text:settings.getTipText(transcript), title:settings.getTipTitle(transcript)},
							position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
							style: { width:true, classes: 'ui-tooltip ui-tooltip-shadow'}
						});
						$(transcriptGroup).click(function(event){
							var query = this.getAttribute("widgetId");
							_this.showInfoWidget({query:query, feature:transcript, featureType:transcript.featureType, adapter:_this.trackData.adapter});
						});

						//paint exons
						for(var e = 0, lene = feature.transcripts[i].exons.length; e < lene; e++){/* loop over exons*/
							var exon = feature.transcripts[i].exons[e];
							var exonSettings = _this.types[exon.featureType];
							var exonStart = parseInt(exon.start);
							var exonEnd =  parseInt(exon.end);

							var exonX = _this.pixelPosition+middle-((_this.position-exonStart)*_this.pixelBase);
							var exonWidth = (exonEnd-exonStart+1) * ( _this.pixelBase);

							var exonGroup = SVG.addChild(_this.features,"g");
							
							$(exonGroup).qtip({
								content: {text:exonSettings.getTipText(exon,transcript), title:exonSettings.getTipTitle(exon)},
								position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
								style: { width:true, classes: 'ui-tooltip ui-tooltip-shadow'}
							});
							
							var eRect = SVG.addChild(exonGroup,"rect",{//paint exons in white without coding region
								"i":i,
								"x":exonX,
								"y":checkRowY-1,
								"width":exonWidth,
								"height":exonSettings.height,
								"stroke": "gray",
								"stroke-width": 1,
								"fill": "white",
								"cursor": "pointer"
							});
							//XXX now paint coding region
							var	codingStart = 0;
							var codingEnd = 0;
							// 5'-UTR
							if(transcript.genomicCodingStart > exonStart && transcript.genomicCodingStart < exonEnd){
								codingStart = parseInt(transcript.genomicCodingStart);
								codingEnd = exonEnd;
							}else {
								// 3'-UTR
								if(transcript.genomicCodingEnd > exonStart && transcript.genomicCodingEnd < exonEnd){
									codingStart = exonStart;		
									codingEnd = parseInt(transcript.genomicCodingEnd);		
								}else
									// all exon is transcribed
									if(transcript.genomicCodingStart < exonStart && transcript.genomicCodingEnd > exonEnd){
										codingStart = exonStart;		
										codingEnd = exonEnd;	
									}
//									else{
//										if(exonEnd < transcript.genomicCodingStart){
//										
//									}
							}
							var coding = codingEnd-codingStart;
							var codingX = _this.pixelPosition+middle-((_this.position-codingStart)*_this.pixelBase);
							var codingWidth = (coding+1) * ( _this.pixelBase);

							if(coding > 0 ){
								var cRect = SVG.addChild(exonGroup,"rect",{
									"i":i,
									"x":codingX,
									"y":checkRowY-1,
									"width":codingWidth,
									"height":exonSettings.height,
									"stroke": color,
									"stroke-width": 1,
									"fill": color,
									"cursor": "pointer"
								});
								//XXX draw phase only at zoom 100, where this.pixelBase=10
								for(var p = 0, lenp = 3 - exon.phase; p < lenp && Math.round(_this.pixelBase)==10 && exon.phase!=-1; p++){//==10 for max zoom only
									SVG.addChild(exonGroup,"rect",{
										"i":i,
										"x":codingX+(p*10),
										"y":checkRowY-1,
										"width":_this.pixelBase,
										"height":exonSettings.height,
										"stroke": color,
										"stroke-width": 1,
										"fill": 'white',
										"cursor": "pointer"
									});
								}
							}


						}

						checkRowY += rowHeight;
						checkTextY += rowHeight;
					}
				}// if transcrips != null
				break;
			}
			rowY += rowHeight;
			textY += rowHeight;
		}
	};
	
	//process features
	for ( var i = 0, leni = featureList.length; i < leni; i++) {
		draw(featureList[i]);
	}
	var newHeight = Object.keys(this.renderedArea).length*24;
	if(newHeight>0){
		this.setHeight(newHeight+/*margen entre tracks*/10);
	}
	console.timeEnd("GeneTranscriptRender");
};

TrackSvg.prototype.SequenceRender = function(response){
    /*conserved region beta*/
//    var v = function(){
//       return (Math.random()*40)-20;
//    };


//    var text = SVG.addChild(this.titleGroup,"text",{
//        "x":14,
//        "y":24,
//        "font-size": 12,
//        "opacity":"0.9",
//        "fill":"blue",
//        "visibility":"visible"
//    });
//    text.textContent = "4";
//    var text2 = SVG.addChild(this.titleGroup,"text",{
//        "x":10,
//        "y":84,
//        "font-size": 12,
//        "opacity":"0.9",
//        "fill":"blue",
//        "visibility":"visible"
//    });
//    text2.textContent = "-4";

    /**/

    this.invalidZoomText.setAttribute("visibility", "hidden");

	console.time("Sequence render "+response.items.sequence.length);
    var chromeFontSize = "14";
    if(this.zoom == 95){
        chromeFontSize = "10";
    }

    var middle = this.width/2;

    var start = response.items.start;
    var seqStart = response.items.start;
    var seqString = response.items.sequence;
//    var phastCons = response.items.phastCons;
//    var phylop = response.items.phylop;

//    var points = '';
//    var firstx = this.pixelPosition+middle-((this.position-start)*this.pixelBase);
//    points += firstx+','+50+' ';

    for ( var i = 0; i < seqString.length; i++) {
        var x = this.pixelPosition+middle-((this.position-start)*this.pixelBase);
        start++;

//        var height = /*histogramHeight * */ v();
//        var width = this.pixelBase;
//        points += (x+(width/2))+","+(50 - height)+' ';

        var text = SVG.addChild(this.features,"text",{
            "x":x+1,
            "y":12,
            "font-size":chromeFontSize,
            "font-family": "Oxygen Mono",
            "fill":SEQUENCE_COLORS[seqString.charAt(i)]
        });
        text.textContent = seqString.charAt(i);
        $(text).qtip({
            content:seqString.charAt(i)+" "+(seqStart+i).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")/*+'<br>'+phastCons[i]+'<br>'+phylop[i]*/,
            position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
            style: { width:true, classes: 'qtip-light qtip-shadow'}
        });
    }

//    var lastx = this.pixelPosition+middle-((this.position-start)*this.pixelBase);
//    points += lastx+','+50+' ';

//    var pol = SVG.addChild(this.features,"polyline",{
//        "points":points,
//        "stroke": "#000000",
//        "stroke-width": 0.2,
//        "fill": 'red',
//        "cursor": "pointer"
//    });


    console.timeEnd("Sequence render "+response.items.sequence.length);
    this.trackSvgLayout.setNucleotidPosition(this.position);
};


TrackSvg.prototype.HistogramRender = function(response){
	var featureList = this._getFeaturesByChunks(response);
    console.log("HISTOGRAM LENGTH: " + featureList.length);

	//here we got features array
	var middle = this.width/2;
    var multiplier = 5;
//	console.log(featureList);
	var histogramHeight = 75;
	var points = '';
//debugger
	if(featureList.length>0) {//Force first point at histogramHeight
        var firstFeature = featureList[0];
        var width = (firstFeature.end-firstFeature.start)* this.pixelBase;
		var x = this.pixelPosition+middle-((this.position-parseInt(firstFeature.start))*this.pixelBase);
		points = (x+(width/2))+','+histogramHeight+' ';
	}

    var maxValue = 0;

	for ( var i = 0, len = featureList.length; i < len; i++) {

		var feature = featureList[i];
        feature.start = parseInt(feature.start);
        feature.end = parseInt(feature.end);
		var width = (feature.end-feature.start);
		//get type settings object
		var settings = this.types[feature.featureType];
		var color = settings.histogramColor;
		
		width = width * this.pixelBase;
		var x = this.pixelPosition+middle-((this.position-feature.start)*this.pixelBase);




		var height = /*histogramHeight * */ featureList[i].value;
		if(height == null){
            height = featureList[i].features_count;
        }
        height = height*multiplier;

		//
//		if(featureList[i].value==null){
//			console.log(featureList[i]);
//		}

		//TODO FOR POLYLINE Width/2 to center the point
		points += (x+(width/2))+","+(histogramHeight - height)+" ";

//		var rect = SVG.addChild(this.features,"rect",{
//			"x":x,
//			"y":histogramHeight - height,
//			"width":width,
//			"height":height,
//			"stroke": "#3B0B0B",
//			"stroke-width": 0.5,
//			"fill": color,
//			"cursor": "pointer"
//		});


        //calculate max for debug purposes
//        if(featureList[i].value>maxValue){
//            maxValue = featureList[i].value
//        }
	}
	if(featureList.length>0) {//force last point at histogramHeight
        var lastFeature = featureList[featureList.length-1];
        var width = (lastFeature.end-lastFeature.start)* this.pixelBase;
		var x = this.pixelPosition+middle-((this.position-parseInt(lastFeature.start))*this.pixelBase);
		points += (x+(width/2))+','+histogramHeight+' ';
		
	}

//	console.log(points);
	var pol = SVG.addChild(this.features,"polyline",{
		"points":points,
		"stroke": "#000000",
		"stroke-width": 0.2,
		"fill": color,
		"cursor": "pointer"
	});

    this.setHeight(histogramHeight+/*margen entre tracks*/10);
    console.log(maxValue);

    if(!this.axis){//Create axis values for histogram
        this.axis = true;
        var text = SVG.addChild(this.histogramLegend,"text",{
            "x":10,
            "y":histogramHeight+4,
            "font-size": 12,
            "opacity":"0.9",
            "fill":"gray",
            "font-family": "Oxygen Mono",
            "visibility":"visible"
        });
        text.textContent = "-0";
        var text = SVG.addChild(this.histogramLegend,"text",{
            "x":10,
            "y":histogramHeight+4 - (Math.log(10)*multiplier),
            "font-size": 12,
            "opacity":"0.9",
            "fill":"gray",
            "font-family": "Oxygen Mono",
            "visibility":"visible"
        });
        text.textContent = "-10";
        var text = SVG.addChild(this.histogramLegend,"text",{
            "x":10,
            "y":histogramHeight+4 - (Math.log(100)*multiplier),
            "font-size": 12,
            "opacity":"0.9",
            "fill":"gray",
            "font-family": "Oxygen Mono",
            "visibility":"visible"
        });
        text.textContent = "-100";
        var text = SVG.addChild(this.histogramLegend,"text",{
            "x":10,
            "y":histogramHeight+4 - (Math.log(1000)*multiplier),
            "font-size": 12,
            "opacity":"0.9",
            "fill":"gray",
            "font-family": "Oxygen Mono",
            "visibility":"visible"
        });
        text.textContent = "-1000";
    }
};


TrackSvg.prototype.showInfoWidget = function(args){
	if(this.trackData.adapter.species=="orange"){
		//data.resource+="orange";
		if(args.featureType.indexOf("gene")!=-1)
			args.featureType="geneorange";
		if(args.featureType.indexOf("transcript")!=-1)
			args.featureType="transcriptorange";
	}
	switch (args.featureType) {
	case "gene": new GeneInfoWidget(null,this.trackData.adapter.species).draw(args); break;
	case "geneorange": new GeneOrangeInfoWidget(null,this.trackData.adapter.species).draw(args); break;
	case "transcriptorange": new TranscriptOrangeInfoWidget(null,this.trackData.adapter.species).draw(args); break;
	case "transcript": new TranscriptInfoWidget(null,this.trackData.adapter.species).draw(args); break;
	case "snp" : new SnpInfoWidget(null,this.trackData.adapter.species).draw(args); break;	
	case "vcf" : new VCFVariantInfoWidget(null,this.trackData.adapter.species).draw(args); break;
	default: break;
	}
};

TrackSvg.prototype._getFeaturesByChunks = function(response, filters){
	//Returns an array avoiding already drawn features in this.chunksDisplayed
	var chunks = response.items;
	var dataType = response.params.dataType;
	var chromosome = response.params.chromosome;
	var features = [];


	var feature, displayed, featureFirstChunk, featureLastChunk, features = [];
	for ( var i = 0, leni = chunks.length; i < leni; i++) {
		if(this.chunksDisplayed[chunks[i].key+dataType]!=true){//check if any chunk is already displayed and skip it

			for ( var j = 0, lenj = chunks[i][dataType].length; j < lenj; j++) {
				feature = chunks[i][dataType][j];

					//check if any feature has been already displayed by another chunk
					displayed = false;
					featureFirstChunk = this.trackData.adapter.featureCache._getChunk(feature.start);
					featureLastChunk = this.trackData.adapter.featureCache._getChunk(feature.end);
					for(var f=featureFirstChunk; f<=featureLastChunk; f++){
						var fkey = chromosome+":"+f;
						if(this.chunksDisplayed[fkey+dataType]==true){
							displayed = true;
							break;
						}
					}
					if(!displayed){
						//apply filter
						// if(filters != null) {
						//		var pass = true;
						// 		for(filter in filters) {
						// 			pass = pass && filters[filter](feature);
						//			if(pass == false) {
						//				break;
						//			}				
						// 		}
						//		if(pass) features.push(feature);
						// } else {
						features.push(feature);
					}
			}
			this.chunksDisplayed[chunks[i].key+dataType]=true;
		}
	}
	return features;

	
	//we only get those features in the region AND check if chunk has been already displayed
	//if(feature.end > region.start && feature.start < region.end){

	//}
};

TrackSvg.prototype._removeDisplayedChunks = function(response){
	//Returns an array avoiding already drawn features in this.chunksDisplayed
	var chunks = response.items;
	var newChunks = []; 
	var dataType = response.params.dataType;
	var chromosome = response.params.chromosome;

	var feature, displayed, featureFirstChunk, featureLastChunk, features = [];
	for ( var i = 0, leni = chunks.length; i < leni; i++) {//loop over chunks
		if(this.chunksDisplayed[chunks[i].key+dataType] != true){//check if any chunk is already displayed and skip it

			features = []; //initialize array, will contain features not drawn by other drawn chunks
			for ( var j = 0, lenj = chunks[i][dataType].length; j < lenj; j++) {
				feature = chunks[i][dataType][j];

					//check if any feature has been already displayed by another chunk
					displayed = false;
					featureFirstChunk = this.trackData.adapter.featureCache._getChunk(feature.start);
					featureLastChunk = this.trackData.adapter.featureCache._getChunk(feature.end);
					for(var f=featureFirstChunk; f<=featureLastChunk; f++){//loop over chunks touched by this feature
						var fkey = chromosome+":"+f;
						if(this.chunksDisplayed[fkey+dataType]==true){
							displayed = true;
							break;
						}
					}
					if(!displayed){
						features.push(feature);
					}
			}
			this.chunksDisplayed[chunks[i].key+dataType]=true;
			chunks[i][dataType] = features;//update features array
			newChunks.push(chunks[i]);
		}
	}
	response.items = newChunks;
	return response;
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function TrackSvgLayout(parent, args) {//parent is a DOM div element
	var _this = this;
	this.args = args;
	this.id = Math.round(Math.random()*10000000);

	this.trackSvgList = [];
	this.swapHash = {};
	this.zoomOffset = 0;//for region overview panel, that will keep zoom higher, 0 by default
	//
	
	this.parentLayout = null;
	this.mousePosition = null;
	this.windowSize = null;

	this.zoomMultiplier = 1;

	//default values
	this.height=0;

    if (typeof args != 'undefined') {
        this.width = args.width || this.width;
        this.height = args.height || this.height;
        this.region = args.region || this.region;
        this.zoomOffset = args.zoomOffset || this.zoomOffset;
        this.zoomMultiplier = args.zoomMultiplier || this.zoomMultiplier;
        this.parentLayout = args.parentLayout || this.parentLayout;
        this.genomeViewer = args.genomeViewer || this.genomeViewer;
    }

	//this region is used to do not modify original region, and will be used by trackSvg
	this.visualRegion = new Region();
	this.visualRegion.load(this.region);
	
	///*******/
	this._calculateMinRegion();
	this._calculatePixelBase();
	/********/
	
	//SVG structure and events initialization
	this.onReady = new Event();
	this.onRegionChange = new Event();
	this.onRegionSelect = new Event();//only when parentLayout is not null
	this.onMove = new Event();
	this.onWindowSize = new Event();
	this.onMousePosition = new Event();
	this.onSvgRemoveTrack = new Event();


	//this.tracksDiv = $('<div></div>').height(this.height).css({"overflow-y":"auto"})[0];
	//$(this.tracksDiv).appendTo(parent);

	//Main SVG and his events
	this.parent = parent;
	this.svgTop = SVG.init(parent.top,{
		"width":this.width,
        "height":25
	});
	

	//Main SVG and his events
	this.svg = SVG.init(parent.track,{
		"width":this.width,
		"height":this.height
	});
	
	//grid
	//var patt = SVG.addChild(this.svg,"pattern",{
		//"id":this.id+"gridPatt",
		//"patternUnits":"userSpaceOnUse",
		//"x":0,
		//"y":0,
		//"width":_this.pixelBase,
		//"height":2000
	//});
	
	var mid = this.width/2;
	//this.grid = SVG.addChild(patt,"rect",{
		//"x":parseInt(mid%10),
		//"y":0,
		//"width":1,
		//"height":2000,
		//"opacity":"0.15",
		//"fill":"grey"
	//});
	//
	//this.grid2 = SVG.addChild(this.svg,"rect",{
		//"width":0,
		//"height":2000,
		//"x":0,
		//"fill":"url(#"+this.id+"gridPatt)"
	//});
	
	this.positionText = SVG.addChild(this.svgTop,"text",{
		"x":mid-30,
		"y":22,
		"font-size":10,
        "font-family": "Oxygen Mono",
		"fill":"green"
	});
	this.nucleotidText = SVG.addChild(this.svgTop,"text",{
		"x":mid+35,
		"y":22,
        "font-family": "Oxygen Mono",
		"font-size":13
	});
	this.firstPositionText = SVG.addChild(this.svgTop,"text",{
		"x":0,
		"y":22,
		"font-size":10,
        "font-family": "Oxygen Mono",
		"fill":"green"
	});
	this.lastPositionText = SVG.addChild(this.svgTop,"text",{
		"x":this.width-70,
		"y":22,
		"font-size":10,
        "font-family": "Oxygen Mono",
		"fill":"green"
	});
	this.viewNtsArrow = SVG.addChild(this.svgTop,"rect",{
		"x":2,
		"y":6,
		"width":this.width-4,
		"height":2,
		"opacity":"0.5",
		"fill":"black"
	});
	this.viewNtsArrowLeft = SVG.addChild(this.svgTop,"polyline",{
		"points":"0,1 2,1 2,13 0,13",
		"opacity":"0.5",
		"fill":"black"
	});
	this.viewNtsArrowRight = SVG.addChild(this.svgTop,"polyline",{
		"points":this.width+",1 "+(this.width-2)+",1 "+(this.width-2)+",13 "+this.width+",13",
		"opacity":"0.5",
		"fill":"black"
	});
	this.windowSize = "Window size: "+this.region.length()+" nts";
    this.viewNtsTextBack = SVG.addChild(this.svgTop,"rect",{
        "x":mid-40,
        "y":0,
        "width":this.windowSize.length*7,
        "height":13,
        "fill":"whitesmoke"
    });
	this.viewNtsText = SVG.addChild(this.svgTop,"text",{
		"x":mid-30,
		"y":11,
		"font-size":10,
        "font-family": "Oxygen Mono",
		"fill":"black"
	});
	this.viewNtsText.textContent = this.windowSize;
	this._setTextPosition();

	this.currentLine = SVG.addChild(this.svg,"rect",{
		"id":this.id+"centerLine",
		"x":mid,
		"y":this.height,
		"width":this.pixelBase,
		"height":this.height,
		"stroke-width":"2",
		"stroke":"orangered",
		"opacity":"0.5",
		"fill":"orange"
	});


	this.mouseLine = SVG.addChild(this.svg,"rect",{
		"id":this.id+"mouseLine",
		"x":-20,
		"y":this.height,
		"width":this.pixelBase,
		"height":this.height,
		"stroke-width":"2",
		//"stroke":"LawnGreen",
		"stroke":"lightgray",
		"opacity":"0.7",
		//"fill":"GreenYellow"
		"fill":"gainsboro"
	});

	if(this.parentLayout==null){
		//this.minRegionRect = SVG.addChild(this.svg,"rect",{
			//"x":mid,
			//"y":this.height,
			//"width":this.minRectWidth,
			//"height":2000,
			//"stroke-width":"2",
			//"stroke":"gray",
			//"opacity":"0.3",
			//"fill":"lightgray",
			//"visibility":"hidden",
		//});
	
		
		//Main svg  movement events
//		this.svg.setAttribute("cursor", "move");

		$(parent.track).mousemove(function(event) {
			var centerPosition = _this.region.center();
			var mid = _this.width/2;
			var mouseLineOffset = _this.pixelBase/2;
			var offsetX = (event.clientX - $(parent.track).offset().left);
			var cX = offsetX-mouseLineOffset;
			var rcX = (cX/_this.pixelBase) | 0;
			var pos = (rcX*_this.pixelBase) + mid%_this.pixelBase;
			_this.mouseLine.setAttribute("x",pos);
			
			var posOffset = (mid/_this.pixelBase) | 0;
			_this.mousePosition = centerPosition+rcX-posOffset;
			_this.onMousePosition.notify({mousePos:_this.mousePosition,baseHtml:_this.getMousePosition(_this.mousePosition)});
		});
		
		$(this.svg).mousedown(function(event) {
//            $('.qtip').qtip('hide').qtip('disable'); // Hide AND disable all tooltips
//			_this.mouseLine.setAttribute("visibility","hidden");
			this.setAttribute("cursor", "move");
			var downX = event.clientX;
			var lastX = 0;
			$(this).mousemove(function(event){
				this.setAttribute("cursor", "move");
				var newX = (downX - event.clientX)/_this.pixelBase | 0;//truncate always towards zero
				if(newX!=lastX){
					var desp = lastX-newX;
					var centerPosition = _this.region.center();
					var p = centerPosition - desp;
					if(p>0){//avoid 0 and negative positions
						_this.region.start -= desp;
						_this.region.end -= desp;
						_this._setTextPosition();
						_this.onMove.notify(desp);
						lastX = newX;
						_this.setNucleotidPosition(p);
					}
				}
			});
		});
		$(this.svg).mouseup(function(event) {
//            $('.qtip').qtip('enable'); // To enable them again ;)
			_this.mouseLine.setAttribute("visibility","visible");
			this.setAttribute("cursor", "default");
			$(this).off('mousemove');
		});
		$(this.svg).mouseleave(function(event) {
			this.setAttribute("cursor", "default");
			$(this).off('mousemove');
			$("body").off('keydown');
		});
		
		$(this.svg).mouseenter(function(e) {
//            $('.qtip').qtip('enable'); // To enable them again ;)
			$("body").off('keydown');
			enableKeys();
		});
		
		var enableKeys = function(){
			//keys
			$("body").keydown(function(e) {
				var desp = 0;
				switch (e.keyCode){
					case 37://left arrow
						if(e.ctrlKey){
							desp = Math.round(100/_this.pixelBase);
						}else{
							desp = Math.round(10/_this.pixelBase);
						}
					break;
					case 39://right arrow
						if(e.ctrlKey){
							desp = Math.round(-100/_this.pixelBase)
						}else{
							desp = Math.round(-10/_this.pixelBase);
						}
					break;
					case 109://minus key
						if(e.shiftKey){
							console.log("zoom out");
						}
					break;
					case 107://plus key
						if(e.shiftKey){
							console.log("zoom in");
						}
					break;
				}
				if(desp != 0){
					_this.region.start -= desp;
					_this.region.end -= desp;
					_this._setTextPosition();
					_this.onMove.notify(desp);
				}
			});
		};
	}else{
		_this.parentLayout.onMove.addEventListener(function(sender,desp){
			_this._setTextPosition();
			_this.onMove.notify(desp);
		});

		//allow selection in trackSvgLayoutOverview
		var selBox = SVG.addChild(this.svg,"rect",{
				"x":0,
				"y":0,
				"stroke-width":"2",
				"stroke":"deepskyblue",
				"opacity":"0.5",
				"fill":"honeydew"
		});
		var downX, moveX;
		$(this.svg).mousedown(function(event) {
			downX = (event.pageX - $(_this.svg).offset().left);
			selBox.setAttribute("x",downX);
			$(this).mousemove(function(event){
				moveX = (event.pageX - $(_this.svg).offset().left);
				if(moveX < downX){
					selBox.setAttribute("x",moveX);
				}
				selBox.setAttribute("width",Math.abs(moveX - downX));
				selBox.setAttribute("height",_this.height);
			});
		});
		$(this.svg).mouseup(function(event) {
			selBox.setAttribute("width",0);
			selBox.setAttribute("height",0);
			$(this).off('mousemove');

			if(downX != null && moveX != null){
				var ss = downX/_this.pixelBase;
				var ee =moveX/_this.pixelBase;
				ss += _this.visualRegion.start;
				ee += _this.visualRegion.start;
				_this.region.start = parseInt(Math.min(ss,ee));
				_this.region.end =  parseInt(Math.max(ss,ee));
				_this.onRegionSelect.notify();
			}
		});
		$(this.svg).mouseleave(function(event) {
			//cancel action
			selBox.setAttribute("width",0);
			selBox.setAttribute("height",0);
			$(this).off('mousemove');
			downX = null;
			moveX = null;
		});
	}
}

TrackSvgLayout.prototype = {
    setHeight : function(height){
        this.height=Math.max(height,60);
        this.svg.setAttribute("height",height);
        //this.grid.setAttribute("height",height);
        //this.grid2.setAttribute("height",height);
        this.currentLine.setAttribute("height",parseInt(height));//25 es el margen donde esta el texto de la posicion
        this.mouseLine.setAttribute("height",parseInt(height));//25 es el margen donde esta el texto de la posicion
    },

    setWidth : function(width){
        this.width=width;
        this._calculateMinRegion();

        //this._calculatePixelBase();
        var mid = this.width/2;
        this.svg.setAttribute("width",width);
        this.svgTop.setAttribute("width",width);
        //this.grid.setAttribute("x",parseInt(mid%10));
        //this.grid2.setAttribute("width",width);
        this.positionText.setAttribute("x",mid-30);
        this.nucleotidText.setAttribute("x",mid+35);
        this.lastPositionText.setAttribute("x",width-70);
        this.viewNtsArrow.setAttribute("width",width-4);
        this.viewNtsArrowRight.setAttribute("points",width+",1 "+(width-2)+",1 "+(width-2)+",13 "+width+",13");
        this.viewNtsText.setAttribute("x",mid-30);
        this.viewNtsTextBack.setAttribute("x",mid-40);
        this.currentLine.setAttribute("x",mid);
        this.currentLine.setAttribute("width", this.pixelBase);
        this.mouseLine.setAttribute("width", this.pixelBase);
        for ( var i = 0; i < this.trackSvgList.length; i++) {
            this.trackSvgList[i].setWidth(width);
        }
        this._setTextPosition();
        this.onWindowSize.notify({windowSize:this.viewNtsText.textContent});
        this.onRegionChange.notify();
    },

    setZoom : function(zoom){
        throw("DEPRECATED: TrackSvgLayout.prototype.setZoom");
    },

    setRegion : function(item){//item.chromosome, item.position, item.species
        var _this = this;
        this._calculateMinRegion();
        //get pixelbase by Region

        this._calculatePixelBase();

        this.currentLine.setAttribute("width", this.pixelBase);
        this.mouseLine.setAttribute("width", this.pixelBase);
        this.viewNtsText.textContent = "Window size: "+this.region.length()+" nts";
        this.windowSize = this.viewNtsText.textContent;
        this._setTextPosition();
        this.onWindowSize.notify({windowSize:this.viewNtsText.textContent});

        if(item.species!=null){
            //check species and modify CellBaseAdapter, clean cache
            for(i in this.trackSvgList){
                if(this.trackSvgList[i].trackData.adapter instanceof CellBaseAdapter ||
                    this.trackSvgList[i].trackData.adapter instanceof SequenceAdapter
                    ){
                    this.trackSvgList[i].trackData.adapter.species = item.species;
                    //this.trackSvgList[i].trackData.adapter.featureCache.clear();

                    this.trackSvgList[i].trackData.adapter.clearData();
                }
            }
        }

        this.nucleotidText.textContent = "";//remove base char, will be drawn later if needed


        /************ Loading ************/
        var checkAllTrackStatus = function(status){
            for(i in _this.trackSvgList){
                if(_this.trackSvgList[i].status != status) return false;
            }
            return true;
        };
        var checkStatus = function(){
            if(checkAllTrackStatus('ready')){
                if(_this.parentLayout==null){
                    _this.onReady.notify();
                }
            }else{
                setTimeout(checkStatus,100);
            }
        };
        setTimeout(checkStatus, 10);
        /***************************/
        this.onRegionChange.notify();

        //this.minRegionRect.setAttribute("width",this.minRectWidth);
        //this.minRegionRect.setAttribute("x",(this.width/2)-(this.minRectWidth/2)+6);
    },

    addTrack : function(trackData, args){
        var _this = this;
        var visibleRange = args.visibleRange;

        args["region"] = this.region;
        args["trackData"] = trackData;
        args["zoom"] = this.zoom;
        args["pixelBase"] = this.pixelBase;
        args["width"] = this.width;
        args["visibleRange"] = args.visibleRange;
        args["adapter"] = trackData.adapter;
        args["trackSvgLayout"] = this;

        //deprecated
        //var i = this.trackDataList.push(trackData);
        var trackSvg = new TrackSvg(this.svg, args);

        var i = this.trackSvgList.push(trackSvg);
        this.swapHash[trackSvg.id] = {index:i-1,visible:true};
        trackSvg.setY(this.height);
        trackSvg.draw();

        this.setHeight(this.height + trackSvg.getHeight());

        //XXX help methods
        var callStart, callEnd, virtualStart, vitualEnd;
        var setCallRegion = function (){
            //needed call variables
            callStart = parseInt(_this.region.start - _this.halfVirtualBase*2);
            callEnd = parseInt(_this.region.end + _this.halfVirtualBase*2);
            virtualStart = parseInt(_this.region.start - _this.halfVirtualBase*2);//for now
            vitualEnd = parseInt(_this.region.end + _this.halfVirtualBase*2);//for now

            trackSvg.pixelBase = _this.pixelBase;
        };
        var checkHistogramZoom = function(){
            if(_this.zoom <= trackSvg.histogramZoom){
                trackSvg.histogram = true;
                trackSvg.histogramLogarithm = true;
                trackSvg.histogramMax = 500;
//                trackSvg.interval = parseInt(Math.min(512, 5/_this.pixelBase));
                trackSvg.interval = parseInt(5/_this.pixelBase);//server interval limit 512
//			console.log(trackData.adapter.featureCache);
            }else{
                trackSvg.histogram = null;
                trackSvg.histogramLogarithm = null;
                trackSvg.histogramMax = null;
            }
        };
        var checkTranscriptZoom = function(){ //for genes only
            if(trackSvg.transcriptZoom != null && _this.zoom >= trackSvg.transcriptZoom){
                trackSvg.transcript=true;
            }else{
                trackSvg.transcript=null;
            }
        };
        //var cleanSvgFeatures = function(){
        //console.time("empty");
        //$(trackSvg.features).empty();
        //trackSvg.features.textContent = "";
        //while (trackSvg.features.firstChild) {
        //trackSvg.features.removeChild(trackSvg.features.firstChild);
        //}
        //console.timeEnd("empty");
        //
        //deprecated, diplayed object is now in trackSvg class
        //trackData.adapter.featureCache.chunksDisplayed = {};
        //
        //trackSvg.chunksDisplayed = {};
        //trackSvg.renderedArea = {};
        //};
        var retrieveData = function(sender){
            // check if track is visible in this zoom
            if(_this.zoom >= visibleRange.start-_this.zoomOffset && _this.zoom <= visibleRange.end ){
                // Just before retrieve data the track is set to loading
                trackSvg.setLoading(true);
                trackData.retrieveData({
                    chromosome:_this.region.chromosome,
                    start:virtualStart,
                    end:vitualEnd,
                    histogram:trackSvg.histogram,
                    histogramLogarithm:trackSvg.histogramLogarithm,
                    histogramMax:trackSvg.histogramMax,
                    interval:trackSvg.interval,
                    transcript:trackSvg.transcript,
                    sender:sender
                });
                trackSvg.invalidZoomText.setAttribute("visibility", "hidden");
            }else{
                trackSvg.invalidZoomText.setAttribute("visibility", "visible");
            }
        };
        //END help methods



        //EventListeners
        //Watch out!!!
        //this event must be attached before call "trackData.retrieveData()"

        trackSvg.getData = function(sender,response){
            if(response.params.histogram == true){
                trackSvg.featuresRender = trackSvg.HistogramRender;
                trackSvg.setHistogramLegend(true);
            }else{
                trackSvg.featuresRender = trackSvg.defaultRender;
                trackSvg.setHistogramLegend(false);
            }

            _this.setHeight(_this.height - trackSvg.getHeight());//modify height before redraw

            trackSvg.featuresRender(response);
            trackSvg.setLoading(false);

            _this.setHeight(_this.height + trackSvg.getHeight());//modify height after redraw
            _this._redraw();
        };

        trackSvg.onGetDataIdx = trackData.adapter.onGetData.addEventListener(trackSvg.getData);


        //first load, get virtual window and retrieve data
        checkHistogramZoom();
        checkTranscriptZoom();//for genes only
        setCallRegion();
        retrieveData("firstLoad");


        //on region change set new virtual window and update track values
        trackSvg.regionChange = function(sender,data){
            trackSvg.pixelBase = _this.pixelBase;
            trackSvg.zoom = _this.zoom;
            trackSvg.position = trackSvg.region.center();

            checkHistogramZoom();
            checkTranscriptZoom();//for genes only

            trackSvg.cleanSvg();
            setCallRegion();
            retrieveData("onRegionChange");
        };
        trackSvg.onRegionChangeIdx = this.onRegionChange.addEventListener(trackSvg.regionChange);


        trackSvg.move = function(sender,desp){
            trackSvg.position = _this.region.center();
            var despBase = desp*_this.pixelBase;
            trackSvg.pixelPosition-=despBase;

            //parseFloat important
            var move =  parseFloat(trackSvg.features.getAttribute("x")) + despBase;
            trackSvg.features.setAttribute("x",move);

            virtualStart = parseInt(trackSvg.region.start - _this.halfVirtualBase);
            virtualEnd = parseInt(trackSvg.region.end + _this.halfVirtualBase);
            // check if track is visible in this zoom
            if(_this.zoom >= visibleRange.start && _this.zoom <= visibleRange.end){

                if(desp>0 && virtualStart < callStart){
                    trackData.retrieveData({
                        chromosome:_this.region.chromosome,
                        start:parseInt(callStart-_this.halfVirtualBase),
                        end:callStart,
                        histogram:trackSvg.histogram,
                        interval:trackSvg.interval,
                        transcript:trackSvg.transcript,
                        sender:"onMove"
                    });
                    callStart = parseInt(callStart-_this.halfVirtualBase);
                }

                if(desp<0 && virtualEnd > callEnd){
                    trackData.retrieveData({
                        chromosome:_this.region.chromosome,
                        start:callEnd,
                        end:parseInt(callEnd+_this.halfVirtualBase),
                        histogram:trackSvg.histogram,
                        interval:trackSvg.interval,
                        transcript:trackSvg.transcript,
                        sender:"onMove"
                    });
                    callEnd = parseInt(callEnd+_this.halfVirtualBase);
                }

            }
        };
        //movement listeners
        trackSvg.onMoveIdx = this.onMove.addEventListener(trackSvg.move);


        //track buttons
        //XXX se puede mover?
        //$(trackSvg.upRect).bind("click",function(event){
        //_this._reallocateAbove(this.parentNode.parentNode.id);//"this" is the svg element
        //});
        //$(trackSvg.downRect).bind("click",function(event){
        //_this._reallocateUnder(this.parentNode.parentNode.id);//"this" is the svg element
        //});
        //$(trackSvg.hideRect).bind("click",function(event){
        ////_this._hideTrack(this.parentNode.parentNode.id);//"this" is the svg element
        //_this.removeTrack(this.parentNode.parentNode.id);//"this" is the svg element
        //_this.onSvgRemoveTrack.notify(this.parentNode.parentNode.id);
        //});
        //$(trackSvg.settingsRect).bind("click",function(event){
        //console.log("settings click");//"this" is the svg element
        //});
    },

    removeTrack : function(trackId){
        // first hide the track
        this._hideTrack(trackId);

        var i = this.swapHash[trackId].index;

        // delete listeners
        this.onRegionChange.removeEventListener(this.trackSvgList[i].onRegionChangeIdx);
        this.onMove.removeEventListener(this.trackSvgList[i].onMoveIdx);

        // delete data
        var track = this.trackSvgList.splice(i, 1)[0];

        delete this.swapHash[trackId];
        //uddate swapHash with correct index after splice
        for ( var i = 0; i < this.trackSvgList.length; i++) {
            this.swapHash[this.trackSvgList[i].id].index = i;
        }
        return track;
    },

    restoreTrack : function(trackSvg, index){
        var _this = this;

        trackSvg.region = this.region;
        trackSvg.zoom = this.zoom;
        trackSvg.pixelBase = this.pixelBase;
        trackSvg.width = this.width;

        var i = this.trackSvgList.push(trackSvg);
        this.swapHash[trackSvg.id] = {index:i-1,visible:true};
        trackSvg.setY(this.height);
        trackSvg.draw();
        this.setHeight(this.height + trackSvg.getHeight());

        trackSvg.onRegionChangeIdx = this.onRegionChange.addEventListener(trackSvg.regionChange);
        trackSvg.onMoveIdx = this.onMove.addEventListener(trackSvg.move);

        trackSvg.regionChange();

        if(index!=null){
            this.setTrackIndex(trackSvg.id, index);
        }
    },

    _redraw : function(){
        var _this = this;
        var trackSvg = null;
        var lastY = 0;
        for ( var i = 0; i < this.trackSvgList.length; i++) {
            trackSvg = this.trackSvgList[i];
            if(this.swapHash[trackSvg.id].visible){
                trackSvg.main.setAttribute("y",lastY);
                lastY += trackSvg.getHeight();
            }
        }
    },

    //This routine is called when track order is modified
    _reallocateAbove : function(trackId){
        var i = this.swapHash[trackId].index;
        console.log(i+" wants to move up");
        if(i>0){
            var aboveTrack=this.trackSvgList[i-1];
            var underTrack=this.trackSvgList[i];

            var y = parseInt(aboveTrack.main.getAttribute("y"));
            var h = parseInt(underTrack.main.getAttribute("height"));
            aboveTrack.main.setAttribute("y",y+h);
            underTrack.main.setAttribute("y",y);

            this.trackSvgList[i] = aboveTrack;
            this.trackSvgList[i-1] = underTrack;
            this.swapHash[aboveTrack.id].index=i;
            this.swapHash[underTrack.id].index=i-1;
        }else{
            console.log("is at top");
        }
    },

    //This routine is called when track order is modified
    _reallocateUnder : function(trackId){
        var i = this.swapHash[trackId].index;
        console.log(i+" wants to move down");
        if(i+1<this.trackSvgList.length){
            var aboveTrack=this.trackSvgList[i];
            var underTrack=this.trackSvgList[i+1];

            var y = parseInt(aboveTrack.main.getAttribute("y"));
            var h = parseInt(underTrack.main.getAttribute("height"));
            aboveTrack.main.setAttribute("y",y+h);
            underTrack.main.setAttribute("y",y);

            this.trackSvgList[i] = underTrack;
            this.trackSvgList[i+1] = aboveTrack;
            this.swapHash[underTrack.id].index=i;
            this.swapHash[aboveTrack.id].index=i+1;

        }else{
            console.log("is at bottom");
        }
    },

    setTrackIndex : function(trackId, newIndex){
        var oldIndex = this.swapHash[trackId].index;

        //remove track from old index
        var track = this.trackSvgList.splice(oldIndex,1)[0]

        //add track at new Index
        this.trackSvgList.splice(newIndex,0,track);

        //uddate swapHash with correct index after slice
        for ( var i = 0; i < this.trackSvgList.length; i++) {
            this.swapHash[this.trackSvgList[i].id].index = i;
        }
        //update svg coordinates
        this._redraw();
    },

    scrollToTrack : function(trackId){
        var swapTrack = this.swapHash[trackId];
        if(swapTrack != null){
            var i = swapTrack.index;
            var track = this.trackSvgList[i];
            $(this.svg).parent().parent().scrollTop(track.main.getAttribute("y"));
        }
    },


    _hideTrack : function(trackMainId){
        this.swapHash[trackMainId].visible=false;
        var i = this.swapHash[trackMainId].index;
        var track = this.trackSvgList[i];
        this.svg.removeChild(track.main);

        this.setHeight(this.height - track.getHeight());

        this._redraw();
    },

    _showTrack : function(trackMainId){
        this.swapHash[trackMainId].visible=true;
        var i = this.swapHash[trackMainId].index;
        var track = this.trackSvgList[i];
        this.svg.appendChild(track.main);

        this.setHeight(this.height + track.getHeight());

        this._redraw();
    },

    _calculatePixelBase : function(){
        this.pixelBase = this.width/this.region.length();
        this.pixelBase = this.pixelBase / this.zoomMultiplier;
        this.pixelBase = Math.max(this.pixelBase,(10/Math.pow(2,20)));

        this.halfVirtualBase = (this.width*3/2) / this.pixelBase;
        this.zoom = Math.round(Utils.getZoomByPixelBase(this.pixelBase));
    },

    _setTextPosition : function(){
        var centerPosition = this.region.center();
        var baseLength = parseInt(this.width/this.pixelBase);//for zoom 100
        var aux = Math.ceil((baseLength/2)-1);
        this.visualRegion.start = Math.floor(centerPosition-aux);
        this.visualRegion.end = Math.floor(centerPosition+aux-1);

        this.positionText.textContent = Utils.formatNumber(centerPosition);
        this.firstPositionText.textContent = Utils.formatNumber(this.visualRegion.start);
        this.lastPositionText.textContent = Utils.formatNumber(this.visualRegion.end);

        this.viewNtsText.textContent = "Window size: "+this.visualRegion.length()+" nts";
        this.viewNtsTextBack.setAttribute("width", this.viewNtsText.textContent.length*7);
        this.windowSize = this.viewNtsText.textContent;
    },

    getTrackSvgById : function(trackId){
        if(this.swapHash[trackId]!=null){
            var position = this.swapHash[trackId].index;
            return this.trackSvgList[position];
        }
        return null;
    },

    getMousePosition : function(position){
        var base = '';
        var colorStyle = '';
        if(position>0){
            base = this.getSequenceNucleotid(position);
            colorStyle = 'color:'+SEQUENCE_COLORS[base];
        }
//        this.mouseLine.setAttribute('stroke',SEQUENCE_COLORS[base]);
//        this.mouseLine.setAttribute('fill',SEQUENCE_COLORS[base]);
        return '<span style="font-family: Ubuntu Mono;font-size:19px;'+colorStyle+'">'+base+'</span>';
    },

    getSequenceNucleotid : function(position){
        var seqTrack = this.getTrackSvgById(1);
        if( seqTrack != null && this.zoom >= seqTrack.visibleRange.start-this.zoomOffset && this.zoom <= seqTrack.visibleRange.end){
            return seqTrack.trackData.adapter.getNucleotidByPosition({start:position,end:position,chromosome:this.region.chromosome})
        }
        return '';
    },

    setNucleotidPosition : function(position){
        var base = this.getSequenceNucleotid(position);
        this.nucleotidText.setAttribute("fill",SEQUENCE_COLORS[base]);
        this.nucleotidText.textContent = base;
    },

    _calculateMinRegion : function() {
        var regionLength = this.region.length();
        var minimumBaseLength = parseInt(this.width/Utils.getPixelBaseByZoom(100));//for zoom 100
        //this.minRectWidth = regionLength*Utils.getPixelBaseByZoom(100);
        if(regionLength < minimumBaseLength){
            //the zoom will be 100, region must be recalculated
            var centerPosition = this.region.center();
            var aux = Math.ceil((minimumBaseLength/2)-1);
            this.region.start = Math.floor(centerPosition-aux);
            this.region.end = Math.floor(centerPosition+aux);
        }
    }
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function TrackData(id, args) {
	this.id = id;
	if (args != null){
		if(args.adapter != null){
			this.adapter = args.adapter;
//			console.log(this.adapter);
		}
		if(args.gzip != null){
			this.gzip = args.gzip;
		}
	}
};

TrackData.prototype.retrieveData = function(region){
	this.adapter.getData(region);
};

TrackData.prototype.setFilters = function(filters){
	this.adapter.setFilters(filters);
};
TrackData.prototype.setOption = function(option, value){
	this.adapter.setOption(option, value);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function TrackSettingsWidget(args) {
	this.id = "TrackSettingsWidget"+ Math.round(Math.random()*10000);


    if (typeof args != 'undefined') {
        this.trackSvg = args.trackSvg || this.trackSvg;
        this.treeRecord = args.treeRecord || this.treeRecord;
	}


	this.filtersConfig = this.trackSvg.getFiltersConfig();
	this.filters = this.trackSvg.getFilters();
	if(this.filtersConfig != null){
		this.draw();
	}
}

TrackSettingsWidget.prototype = {
    setFilters : function(filters){
        this.trackSvg.setFilters(filters);
    },

    draw : function(){
        var _this = this;
        var items = [];
        var stores = [];

        for(var i = 0; i < this.filtersConfig.length; i++){
            var rootText = this.filtersConfig[i].text;
            var rootName = this.filtersConfig[i].name;

            var children = [];
            var checked;
            this.filters[rootName] != null ? checked=false : checked=true;
            for(var j = 0; j < this.filtersConfig[i].values.length; j++){
                children.push({text: this.filtersConfig[i].values[j], leaf: true, checked:checked, iconCls:"icon-blue-box"});
            }

            var root = {
                text:rootName,
                expanded: true,
                checked:checked,
                iconCls:"icon-box",
                children:children
            };
            var st = Ext.create('Ext.data.TreeStore',{root:root,fields:['text', 'name']});
            items.push({
                xtype:"treepanel",
                useArrows:true,
                //rootVisible: false,
                bodyPadding:"10 0 10 0",
                title : rootText,
                border:false,
                store:st,
                listeners:{
                    checkchange:function(node, checked, eOpts ){
                        if(node.isRoot()){
                            node.eachChild(function(n){
                                n.set("checked", checked);
                            });
                        }
                    },
                    afterrender:function(este){
                        //restore previous filter config
                        var node = este.getStore().getRootNode();
                        var name = node.get("text");
                        if(_this.filters[name] != null){
                            for(var i = 0; i < _this.filters[name].length; i++){
                                var child = node.findChild("text",_this.filters[name][i]);
                                child.set("checked",true);
                                child.save;
                            }
                        }
                    }
                }
            });

            stores.push(st);
        }

        var displaySettingsPanel = Ext.create('Ext.panel.Panel', {
            title: "Display settings",
            bodyPadding:10,
            items: [{
                xtype:'textfield',
                value: _this.trackSvg.getTitle(),
                fieldLabel:'TrackName',
                allowBlank: false,
                listeners:{
                    change:function(este, newValue){
                        if(este.isValid()){
                            _this.trackSvg.setTitle(newValue);
                            _this.treeRecord.set('text',newValue);
                            _this.treeRecord.save();
                        }
                    }
                }
            }
            ]
        });
        var tabFilter = Ext.create('Ext.tab.Panel', {
            title: "Filters",
            items: items
        });

        Ext.create('Ext.window.Window', {
            id:this.id+"window",
            title: 'Settings',
            width: 500,
            modal:true,
            items: [displaySettingsPanel, tabFilter],
            buttons:[{text:'Ok',id:this.id+"okButton", handler: function(){
                var filters = {};
                for(var i = 0; i < stores.length; i++){
                    var root = stores[i].getRootNode();
                    var name = root.get("text");
                    var checkValues = [];
                    var nodesLength = 0;
                    root.eachChild(function(node){
                        nodesLength++;
                        if(node.data.checked){
                            checkValues.push(node.get("text"));
                        }
                    });
                    //all check is the same as none checked
                    if(checkValues.length == nodesLength){
                        checkValues = [];
                    }
                    //if(checkValues.length > 0){
                    filters[name]=checkValues;
                    //}
                }
                console.log(filters)
                _this.setFilters(filters);
                Ext.getCmp(_this.id+"window").destroy();
            }
            },
                {text:'Cancel', handler: function(){
                    _this.trackSvg.setTitle(originalValue);
                    _this.treeRecord.set('text',originalValue);
                    _this.treeRecord.save();
                    Ext.getCmp(_this.id+"window").destroy();
                }}
            ]
        }).show();

        var originalValue = _this.trackSvg.getTitle();
    }
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function FeatureCache(args) {
	this.args = args;
	this.id = Math.round(Math.random() * 10000000); // internal id for this class

	this.chunkSize = 50000;
	this.gzip = true;
	this.maxSize = 10*1024*1024;
	this.size = 0;
	
	if (args != null){
		if(args.chunkSize != null){
			this.chunkSize = args.chunkSize;
		}
		if(args.gzip != null){
			this.gzip = args.gzip;
		}
	}
	
	this.cache = {};
	this.chunksDisplayed = {};
	
	this.maxFeaturesInterval = 0;
	
	//XXX
	this.gzip = false;
};

FeatureCache.prototype._getChunk = function(position){
	return Math.floor(position/this.chunkSize);
};

FeatureCache.prototype.getChunkRegion = function(region){
	start = this._getChunk(region.start) * this.chunkSize;
	end = (this._getChunk(region.end) * this.chunkSize) + this.chunkSize-1;
	return {start:start,end:end};
};

FeatureCache.prototype.getFirstFeature = function(){
	var feature;
	if(this.gzip) {
		feature = JSON.parse(RawDeflate.inflate(this.cache[Object.keys(this.cache)[0]].data[0]));
	}else{
		feature = this.cache[Object.keys(this.cache)[0]].data[0];
	}
	return feature;
};


//new 
FeatureCache.prototype.getFeatureChunk = function(key){
	if(this.cache[key] != null) {
		return this.cache[key];
	}
	return null;
};
//new
FeatureCache.prototype.getFeatureChunksByRegion = function(region){
	var firstRegionChunk, lastRegionChunk,  chunks = [], key;
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	for(var i=firstRegionChunk; i<=lastRegionChunk; i++){
		key = region.chromosome+":"+i;
		// check if this key exists in cache (features from files)
		if(this.cache[key] != null ){
			chunks.push(this.cache[key]);
		}
		
	}
	//if(chunks.length == 0){
		//return null;
	//}
	return chunks;
};


FeatureCache.prototype.putFeaturesByRegion = function(featureDataList, region, featureType, dataType){
	var key, firstRegionChunk, lastRegionChunk, firstChunk, lastChunk, feature, gzipFeature;

	
	//initialize region
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	for(var i=firstRegionChunk; i<=lastRegionChunk; i++){
		key = region.chromosome+":"+i;
		if(this.cache[key]==null){
			this.cache[key] = {};
			this.cache[key].key = key;
		}
		if(this.cache[key][dataType]==null){
			this.cache[key][dataType] = [];
		}
	}
	
	//Check if is a single object
	if(featureDataList.constructor != Array){
		featureDataList = [featureDataList];
	}
	
	//loop over features and set on corresponding chunks
	for(var index = 0, len = featureDataList.length; index<len; index++) {
		feature = featureDataList[index];
		feature.featureType = featureType;
		firstChunk = this._getChunk(feature.start);
		lastChunk = this._getChunk(feature.end);
		
		if(this.gzip) {
			gzipFeature = RawDeflate.deflate(JSON.stringify(feature));
		}else{
			gzipFeature = feature;
		}
		
		for(var i=firstChunk; i<=lastChunk; i++) {
			if(i >= firstRegionChunk && i<= lastRegionChunk){//only if is inside the called region
				key = region.chromosome+":"+i;
				this.cache[key][dataType].push(gzipFeature);
			}
		}
	}
};


//used by BED, GFF, VCF
FeatureCache.prototype.putFeatures = function(featureDataList, dataType){
	var feature, key, firstChunk, lastChunk;

	//Check if is a single object
	if(featureDataList.constructor != Array){
		featureDataList = [featureDataList];
	}

	for(var index = 0, len = featureDataList.length; index<len; index++) {
		feature = featureDataList[index];
		firstChunk = this._getChunk(feature.start);
		lastChunk = this._getChunk(feature.end);
		for(var i=firstChunk; i<=lastChunk; i++) {
			key = feature.chromosome+":"+i;
			if(this.cache[key]==null){
				this.cache[key] = [];
				this.cache[key].key = key;
			}
			if(this.cache[key][dataType]==null){
				this.cache[key][dataType] = [];
			}
			if(this.gzip) {
				this.cache[key][dataType].push(RawDeflate.deflate(JSON.stringify(feature)));
			}else{
				this.cache[key][dataType].push(feature);
			}

		}
	}
};



FeatureCache.prototype.putChunk = function(key, item){
	this.cache[key] = item;
};

FeatureCache.prototype.getChunk = function(key){
	return this.cache[key];
};

FeatureCache.prototype.putCustom = function(f){
	f(this);
};

FeatureCache.prototype.getCustom = function(f){
	f(this);
};



FeatureCache.prototype.remove = function(region){
	var firstChunk = this._getChunk(region.start);
	var lastChunk = this._getChunk(region.end);
	for(var i=firstChunk; i<=lastChunk; i++){
		var key = region.chromosome+":"+i;
		this.cache[key] = null;
	}
};

FeatureCache.prototype.clear = function(){
		this.size = 0;		
		this.cache = {};
};


//END



//THOSE METHODS ARE NOT USED



/*
FeatureCache.prototype.getFeaturesByChunk = function(key, dataType){
	var features =  [];
	var feature, firstChunk, lastChunk;
	
	if(this.cache[key] != null && this.cache[key][dataType] != null) {
		for ( var i = 0, len = this.cache[key][dataType].length; i < len; i++) {
			if(this.gzip) {
				feature = JSON.parse(RawDeflate.inflate(this.cache[key][dataType][i]));
			}else{
				feature = this.cache[key][dataType][i];
			}
			
			//check if any feature chunk has been already displayed 
			var displayed = false;
			firstChunk = this._getChunk(feature.start);
			lastChunk = this._getChunk(feature.end);
			for(var f=firstChunk; f<=lastChunk; f++){
				var fkey = feature.chromosome+":"+f;
				if(this.chunksDisplayed[fkey+dataType]==true){
					displayed = true;
					break;
				}
			}
			
			if(!displayed){
				features.push(feature);
				returnNull = false;
			}
		}
		this.chunksDisplayed[key+dataType]=true;
		return features;
	}
	
	return null;
};


FeatureCache.prototype.getFeaturesByRegion = function(region, dataType){
	var firstRegionChunk, lastRegionChunk, firstChunk, lastChunk, features = [], feature, key, returnNull = true, displayed;
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	for(var i=firstRegionChunk; i<=lastRegionChunk; i++){
		key = region.chromosome+":"+i;
		 //check if this key exists in cache (features from files)
		if(this.cache[key] != null && this.cache[key][dataType] != null){
			for ( var j = 0, len = this.cache[key][dataType].length; j < len; j++) {
				if(this.gzip) {
					try {
						feature = JSON.parse(RawDeflate.inflate(this.cache[key][dataType][j]));
					} catch (e) {
						//feature es "" 
						console.log(e)
						debugger
						
					}
					
				}else{
					feature = this.cache[key][dataType][j];
				}
				// we only get those features in the region AND check if chunk has been already displayed
				if(feature.end > region.start && feature.start < region.end){

			//		 check displayCheck argument 
					if(region.displayedCheck != false){
				//		check if any feature chunk has been already displayed 
						displayed = false;
						firstChunk = this._getChunk(feature.start);
						lastChunk = this._getChunk(feature.end);
						for(var f=firstChunk; f<=lastChunk; f++){
							var fkey = region.chromosome+":"+f;
							if(this.chunksDisplayed[fkey+dataType]==true){
								displayed = true;
								break;
							}
						}
						
						if(!displayed){
							features.push(feature);
							returnNull = false;
						}
					}else{
						features.push(feature);
						returnNull = false;
					}

					
				}
			}
		}
		 //check displayCheck argument 
		if(region.displayedCheck != false){
			this.chunksDisplayed[key+dataType]=true;//mark chunk as displayed
		}
	}
	if(returnNull){
		return null;
	}else{
		return features;
	}
};
*/




/*

FeatureCache.prototype.putChunk = function(featureDataList, chunkRegion, dataType){
	var feature, key, chunk;
	chunk = this._getChunk(chunkRegion.start);
	key = chunkRegion.chromosome+":"+chunk;

	if(this.cache[key]==null){
		this.cache[key] = [];
	}
	if(this.cache[key][dataType]==null){
		this.cache[key][dataType] = [];
	}

	if(featureDataList.constructor == Object){
		if(this.gzip) {
			this.cache[key][dataType].push(RawDeflate.deflate(JSON.stringify(featureDataList)));
		}else{
			this.cache[key][dataType].push(featureDataList);
		}
	}else{
		for(var index = 0, len = featureDataList.length; index<len; index++) {
			feature = featureDataList[index];
			if(this.gzip) {
				this.cache[key][dataType].push(RawDeflate.deflate(JSON.stringify(feature)));
			}else{
				this.cache[key][dataType].push(feature);
			}
		}
	}
	
};

*/


//NOT USED dev not tested
//FeatureCache.prototype.histogram = function(region, interval){
//
	//var intervals = (region.end-region.start+1)/interval;
	//var intervalList = [];
	//
	//for ( var i = 0; i < intervals; i++) {
		//var featuresInterval = 0;
		//
		//var intervalStart = i*interval;//deberia empezar en 1...
		//var intervalEnd = ((i+1)*interval)-1;
		//
		//var firstChunk = this._getChunk(intervalStart+region.start);
		//var lastChunk = this._getChunk(intervalEnd+region.start);
		//
		//console.log(this.cache);
		//for(var j=firstChunk; j<=lastChunk; j++){
			//var key = region.chromosome+":"+j;
			//console.log(key);
			//console.log(this.cache[key]);
			//for ( var k = 0, len = this.cache[key].length; k < len; k++) {
				//if(this.gzip) {
					//feature = JSON.parse(RawDeflate.inflate(this.cache[key][k]));
				//}else{
					//feature = this.cache[key][k];
				//}
				//if(feature.start > intervalStart && feature.start < intervalEnd);
				//featuresInterval++;
			//}
			//
		//}
		//intervalList[i]=featuresInterval;
		//
		//if(this.maxFeaturesInterval<featuresInterval){
			//this.maxFeaturesInterval = featuresInterval;
		//}
	//}
	//
	//for ( var inter in  intervalList) {
		//intervalList[inter]=intervalList[inter]/this.maxFeaturesInterval;
	//}
//};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function FeatureDataAdapter(dataSource, args){
	var _this = this;
	
	this.dataSource = dataSource;
	this.gzip = true;
	
	this.params = {};
	if (args != null){
		if(args.gzip != null){
			this.gzip = args.gzip;
		}
		if(args.species != null){
			this.species = args.species;
		}
		if(args.params != null){
			this.params = args.params;
		}
	}
	
	this.featureCache =  new FeatureCache({chunkSize:10000, gzip:this.gzip});
	
	this.onLoad = new Event();	
	this.onGetData = new Event();

	//chromosomes loaded
	this.chromosomesLoaded = {};
}

FeatureDataAdapter.prototype.getData = function(region){
	
	console.log("TODO comprobar histograma");
	console.log(region);
	this.params["dataType"] = "data";
	this.params["chromosome"] = region.chromosome;

	//check if the chromosome has been already loaded
	if(this.chromosomesLoaded[region.chromosome] != true){
		this._fetchData(region);
		this.chromosomesLoaded[region.chromosome]=true;
	}
	
	var itemList = this.featureCache.getFeatureChunksByRegion(region);
	if(itemList != null){
		this.onGetData.notify({items:itemList, params:this.params, cached:true});
	}
};

FeatureDataAdapter.prototype._fetchData = function(region){
	var _this = this;
	if(this.dataSource!=null){//could be null in expression genomic attributer widget 59
		if(this.async){
			this.dataSource.success.addEventListener(function(sender,data){
				_this.parse(data, region);
				_this.onLoad.notify();
			});
			this.dataSource.fetch(this.async);
		}else{
			var data = this.dataSource.fetch(this.async);
			this.parse(data,region);
		}
	}
}

FeatureDataAdapter.prototype.addFeatures = function(features){
		this.featureCache.putFeatures(features, "data");
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ChromosomeWidget(parent, args) {
	
	this.id = Math.round(Math.random()*10000000);
	if(args != null){
		if(args.width != null){
			this.width = args.width;
		}
		if(args.height != null){
			this.height = args.height;
		}
		if(args.species != null){
			this.species = args.species;
		}
		if(args.region != null){
			this.region = args.region;
		}
	}

	this.lastChromosome = "";

	this.onClick = new Event();
	
	this.svg = SVG.init(parent,{
		"width":this.width,
		"height":this.height
	});
	
	this.colors = {gneg:"white", stalk:"#666666", gvar:"#CCCCCC", gpos25:"silver", gpos33:"lightgrey", gpos50:"gray", gpos66:"dimgray", gpos75:"darkgray", gpos100:"black", gpos:"gray", acen:"blue", clementina:'#ffc967'};
	
	this.data = null;
};

ChromosomeWidget.prototype.setWidth = function(width){
	this.width=width;
	this.svg.setAttribute("width",width);
	this.tracksViewedRegion = this.width/Utils.getPixelBaseByZoom(this.zoom);
	while (this.svg.firstChild) {
		this.svg.removeChild(this.svg.firstChild);
	}
	this._drawSvg(this.data);
};

ChromosomeWidget.prototype.drawChromosome = function(){
	var _this = this;

    var sortfunction = function(a, b) {
        return (a.start - b.start);
    };

	var cellBaseManager = new CellBaseManager(this.species);
 	cellBaseManager.success.addEventListener(function(sender,data){
 		_this.data = data.result[0];
        _this.data.cytobands.sort(sortfunction);
 		_this._drawSvg(_this.data);
 	});
 	cellBaseManager.get("feature", "chromosome", this.region.chromosome, "info");
 	this.lastChromosome = this.region.chromosome;
};

ChromosomeWidget.prototype._drawSvg = function(chromosome){
	var _this = this;
	this.chromosomeLength = chromosome.size;
	_this.pixelBase = (_this.width - 40) / this.chromosomeLength;
	var x = 20;
	var y = 10;
	var firstCentromere = true;

	var offset = 20;
	var centerPosition = _this.region.center();
	
	var pointerPosition = (centerPosition * _this.pixelBase) + offset;

	var group = SVG.addChild(_this.svg,"g",{"cursor":"pointer"});

	var selBox = SVG.addChild(this.svg,"rect",{
		"x":0,
		"y":2,
		"stroke-width":"2",
		"stroke":"deepskyblue",
		"opacity":"0.5",
		"fill":"honeydew"
	});

	/*Remove event listeners*/
	$(this.svg).off('contextmenu');
	$(this.svg).off('mousedown');
	$(this.svg).off('mouseup');
	$(this.svg).off('mousemove');
	$(this.svg).off('mouseleave');

	//Prevent browser context menu
	$(this.svg).contextmenu(function(e) {
		e.preventDefault();
	});
	var overPositionBox = false;
	var movingPositionBox = false;
	var selectingRegion = false;
	var downY, downX, moveX, moveY, lastX;
	$(this.svg).mousedown(function(event) {
		downX = (event.pageX - $(_this.svg).offset().left);
		selBox.setAttribute("x",downX);
		lastX = _this.positionBox.getAttribute("x");
		$(this).mousemove(function(event){
			moveX = (event.pageX - $(_this.svg).offset().left);
			if(overPositionBox==false && movingPositionBox==false){
				selectingRegion = true;
				if(moveX < downX){
					selBox.setAttribute("x",moveX);
				}
				selBox.setAttribute("width",Math.abs(moveX - downX));
				selBox.setAttribute("height",_this.height-3);
			}else if(selectingRegion == false){
				movingPositionBox=true;
				var w = _this.positionBox.getAttribute("width");
				_this.positionBox.setAttribute("x",moveX-(w/2));
			}
		});
	});
	
	$(this.svg).mouseup(function(event) {
		$(this).off('mousemove');
		if(downX != null){
			if(moveX != null){
				if(overPositionBox==false && movingPositionBox==false){
					var bioS = (downX-offset)/_this.pixelBase;
					var bioE = (moveX-offset)/_this.pixelBase;
					_this.region.start = parseInt(Math.min(bioS,bioE));
					_this.region.end =  parseInt(Math.max(bioS,bioE));

					var w = Math.abs(downX-moveX);
					_this.positionBox.setAttribute("width",w);
					_this.positionBox.setAttribute("x",Math.abs((downX+moveX)/2)-(w/2));
					_this.onClick.notify();
					selectingRegion = false;
				}else{//click to move the positionBox
					var w = _this.positionBox.getAttribute("width");
					var pixS = moveX-(w/2);
					var pixE = moveX+(w/2);
					var bioS = (pixS-offset)/_this.pixelBase;
					var bioE = (pixE-offset)/_this.pixelBase;
					_this.region.start = Math.round(bioS);
					_this.region.end =  Math.round(bioE);

					_this.positionBox.setAttribute("x",moveX-(w/2));
					_this.onClick.notify();
					movingPositionBox=false;
				}
			}else{
				var w = _this.positionBox.getAttribute("width");
				var pixS = downX-(w/2);
				var pixE = downX+(w/2);
				var bioS = (pixS-offset)/_this.pixelBase;
				var bioE = (pixE-offset)/_this.pixelBase;
				_this.region.start = Math.round(bioS);
				_this.region.end =  Math.round(bioE);

				_this.positionBox.setAttribute("x",downX-(w/2));
				_this.onClick.notify();
			}
		}
		selBox.setAttribute("width",0);
		selBox.setAttribute("height",0);
		downX = null;
		moveX = null;
		lastX = _this.positionBox.getAttribute("x");
	});
	$(this.svg).mouseleave(function(event) {
		$(this).off('mousemove')
		if(lastX!=null){
			_this.positionBox.setAttribute("x",lastX);
		}
		selBox.setAttribute("width",0);
		selBox.setAttribute("height",0);
		downX = null;
		moveX = null;
		lastX = null;
		overPositionBox = false;
		movingPositionBox = false;
		selectingRegion = false;
	});

	for (var i = 0; i < chromosome.cytobands.length; i++) {
        var cytoband = chromosome.cytobands[i];
		var width = _this.pixelBase * (cytoband.end - cytoband.start);
		var height = 18;
		var color = _this.colors[cytoband.stain];
		if(color == null) color = "purple";
		var middleX = x+width/2;
		var endY = y+height;

		if(cytoband.stain == "acen"){
			var points = "";
			var middleY = y+height/2;
			var endX = x+width;
			if(firstCentromere){
				points = x+","+y+" "+middleX+","+y+" "+endX+","+middleY+" "+middleX+","+endY+" "+x+","+endY;
				firstCentromere = false;
			}else{
				points = x+","+middleY+" "+middleX+","+y+" "+endX+","+y+" "+endX+","+endY+" "+middleX+","+endY;
			}
			SVG.addChild(group,"polyline",{
				"points":points,
				"stroke":"black",
				"opacity":0.8,
				"fill":color
			});
		}else{
			SVG.addChild(group,"rect",{
				"x":x,
				"y":y,
				"width":width,
				"height":height,
				"stroke":"black",
				"opacity":0.8,
				"fill":color
			});
		}

		var textY = endY+2;
		var text = SVG.addChild(group,"text",{
			"x":middleX,
			"y":textY,
			"font-size":10,
			"transform": "rotate(90, "+middleX+", "+textY+")",
			"fill":"black"
		});
		text.textContent = cytoband.name;

		x = x + width;
	}

	var positionBoxWidth = _this.region.length()*_this.pixelBase;
	this.positionBox = SVG.addChild(group,"rect",{
		"x":pointerPosition-(positionBoxWidth/2),
		"y":2,
		"width":positionBoxWidth,
		"height":_this.height-3,
		"stroke":"orangered",
		"stroke-width":2,
		"opacity":0.5,
		"fill":"navajowhite"
	});
	$(this.positionBox).off('mouseenter');
	$(this.positionBox).off('mouseleave');
	$(this.positionBox).mouseenter(function(event) {
		if(selectingRegion==false){
			overPositionBox = true;
		}
	});
	$(this.positionBox).mouseleave(function(event) {
		overPositionBox = false;
	});
};


ChromosomeWidget.prototype.setRegion = function(item){//item.chromosome, item.region
	var needDraw = false;
	if(item.species!=null){
		this.species = item.species;
		needDraw = true;
	}
	if(this.lastChromosome != this.region.chromosome){
		needDraw = true;
	}
	
	var centerPosition = this.region.center();
	if(!isNaN(centerPosition)){
		var pointerPosition = (centerPosition*this.pixelBase)+20;
		var positionBoxWidth = parseFloat(this.positionBox.getAttribute("width"));
		this.positionBox.setAttribute("x",pointerPosition-(positionBoxWidth/2));
		var positionBoxWidth = this.region.length()*this.pixelBase;
		this.positionBox.setAttribute("width",positionBoxWidth);
	}
	if(needDraw){
//		$(this.svg).empty();
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}
		this.drawChromosome();
	}
};

//ChromosomeWidget.prototype.setZoom = function(zoom){
	//this.zoom=zoom;
	//this.tracksViewedRegion = this.width/Utils.getPixelBaseByZoom(this.zoom);
	//var width = this.tracksViewedRegion*this.pixelBase;
	//this.positionBox.setAttribute("width",width);
//
	//var centerPosition = Utils.centerPosition(this.region);
	//var pointerPosition = centerPosition*this.pixelBase+20;
	//this.positionBox.setAttribute("x",pointerPosition-(width/2));
//};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function CircularChromosomeWidget(parent, args) {
	//variables globales, podremos utilizarlas en todo el metodo
	var _this = this; 

	//por si es nulo el valor que le pasamos, ponemos aqui unos valores por defecto
	//si hemos pasado los valores, se sobreescribiran
	this.coord_x = 400;
	this.coord_y = 250;	
	this.radius = 200;
	this.stroke_width = 20;
	
		if(args != null){
			if(args.coord_x != null){
				this.coord_x = args.coord_x;
				}
			if(args.coord_y != null){
				this.coord_y = args.coord_y;
				}
			if(args.radius != null){
				this.radius = args.radius;
				}
			if(args.stroke_width != null){
				this.stroke_width = args.stroke_width;
				}
		}
	
	//longitud del circulo
	this.circleLength = 2*Math.PI*this.radius;
	
	//variables que le daremos valor al cargar los datos
	this.d = null; //tendra todos los datos de la base de datos
	this.chroLength = null; //numero de elementos de la base de datos
	this.pixelRatio = null; //numero de elementos de la base de datos en cada pixel
	this.angle_click = null; //angulo del punto en el que vamos a clickar
	
	//coordenadas de la linea que indica donde hemos clickado
	this.x_point = null;;
	this.y_point = null;;
	this.x_point2 = null;;
	this.y_point2 = null;;

	//separacion de lo que marca donde hemos clikado con el circulo principal
	this.sep = 27;

	//angulo en el cual se ira separando la zona que indica donde hemos clickado
	this.angle_lines = Math.PI/6; //por defecto, ponemos 2 grados en radianes
	
	this.colors = {gneg:"white", stalk:"#666666", gvar:"#CCCCCC", gpos25:"silver", gpos33:"lightgrey", gpos50:"gray", gpos66:"dimgray", gpos75:"darkgray", gpos100:"black", gpos:"gray", acen:"blue"};
	this.mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");//Crea un elemento con el URI del espacio y el nombre de calificado.
	console.log(this.mySvg);
//	this.mySvg.setAttribute("version", "1.2"); // Añade una nueva aracteristica poniendo el nombre del atributo seleccionado y el valor
//	this.mySvg.setAttribute("baseProfile", "tiny");
	this.mySvg.setAttribute("width", "1000");
	this.mySvg.setAttribute("height", "600");
	parent.appendChild(this.mySvg); // Añade un nuevo nodo despues despues del ultimo nodo hijo
	    
	        
    //para decargarse los datos de la base de datos, de esta forma, copiamos todos los datos en data
    $.ajax({
	url: "http://ws-beta.bioinfo.cipf.es/cellbase/rest/latest/hsa/genomic/region/13/cytoband?of=json"
    }).done(function(data,b,c) {

  
    	_this.d = JSON.parse(data);
    	_this.chroLength = _this.d[0][_this.d[0].length-1].end; //numero de elementos
    	_this.pixelRatio  = _this.chroLength/ _this.circleLength;  //elementos en cada pixel
     
        $(_this.mySvg).click(function (event){ //event tiene una serie de parametros con informacion dle evento
    	 
 		var dist_max_x, dist_max_y; // contendra la distancia del borde del circulo por fuera
     	var dist_min_x, dist_min_y; //contendra la distancia del borde del circulo por dentro
     	var dist_max, dist_min; //la distancia maxima y minima del centro del circulo al borde por fuera y por dentro
     	var dist_click; //tendra la distancia desde donde clickamos al centro del circulo
     	
     	//el borde se encuentra la mitad fuera del circulo y la otra mitad dentro
     	//obtenenos las coordenadas de un punto en los bordes del borde del circulo
     	//como por referencia vamos a calcular la distancia del punto que se encuentra en el grado 180, la x es la misma
     	dist_max_x = _this.coord_x;
     	dist_max_y = _this.radius + _this.coord_y + (_this.stroke_width/2);

     	dist_min_x = _this.coord_x; 
     	dist_min_y = _this.radius + _this.coord_y - (_this.stroke_width/2);        	
     	
     	//calculamos las distancias del borde maxima y minima, como es un circulo, en cualquier punto sera la misma
     	dist_max = Math.sqrt(Math.pow((dist_max_x-_this.coord_x),2)+ (Math.pow((dist_max_y-_this.coord_y),2)));
     	dist_min = Math.sqrt(Math.pow((dist_min_x-_this.coord_x),2)+ (Math.pow((dist_min_y-_this.coord_y),2)));

     	//calculamos la distancia del punto donde clickamos al centro
     	//la posicion de la y esta desplazada 100 píxeles a la izquierda, por eso sumamos 100
     	dist_click =  Math.sqrt(Math.pow((event.clientX-_this.coord_x),2)+ Math.pow((event.clientY-_this.coord_y),2));
   	
     	var bb = false; //variable que hara que si nos encontremos dentro del circulo, mire en que elemento exacto
     	
	     	//si el punto donde hemos clickado se encuentra dentro del borde del circulo
	     	if (dist_click >= dist_min && dist_click <= dist_max)
	     		bb = true;

	     	if(bb)
	     	{
		        //ahora vamos a distinguir entre zonas del borde mediante el angulo 
		        _this.angle_click = 0; //tendra el angulo donde se encuentra el punto donde hemos clickado
		
		        	//segun donde se $(this.mySvg).click(function (event){ //event tiene una serie de parametros con informacion dle evento
		        	if(event.clientX > _this.coord_x &&  event.clientY < _this.coord_y)
		        		_this.angle_click = Math.atan((event.clientX - _this.coord_x)/(_this.coord_y - event.clientY));
		        	else if(event.clientX > _this.coord_x &&  event.clientY > _this.coord_y)
		        		_this.angle_click = (Math.PI/2) + Math.atan((event.clientY -_this.coord_y)/(event.clientX - _this.coord_x));
		        	else if(event.clientX < _this.coord_x &&  event.clientY > _this.coord_y)
		        		_this.angle_click = Math.PI + Math.atan((_this.coord_x - event.clientX)/(event.clientY - _this.coord_y));
		        	else if(event.clientX < _this.coord_x &&  event.clientY < _this.coord_y)	
		        		_this.angle_click = (3*Math.PI/2) + Math.atan((_this.coord_y - event.clientY)/(_this.coord_x - event.clientX));
		
		        var rad_360_grados = 2*Math.PI;//360 * Math.PI / 180;  //calculamos 360 grados en radianes
		        var pix_of_click; //el numero del pixel donde hemos pulsado
		            
		        //en rad_360_grados tenemos circleLength píxeles, con una regla de tres obtenemos cuantos pixeles tenemos en otro angulo en radianes
		        pix_of_click = (_this.angle_click * _this.circleLength) / rad_360_grados; 
		        var elem_pixel; //obtenmos el elemento que tenemos en ese pixel
		        elem_pixel = pix_of_click * _this.pixelRatio;
		        	
		        var ii = 0;
		        var b = true;
		        	
		        	//miramos en la base de datos cual es el objeto que contiene ese pixel
		        	while(ii < _this.d[0].length && b)  //para todos los datos que tenemos
		        		{
		        		  if (_this.d[0][ii].start <= elem_pixel &&  _this.d[0][ii].end >= elem_pixel)
		        			  	b = false;
		        	    ii++;
		        		}
		        	
		        //en i-1 tenemos el elemento donde hemos clickado
		        console.log(parseInt(elem_pixel));
		        	
		        //aqui damos las coordenadas a la recta para indicarle donde hemos clickado
		        _this.x_point = (_this.radius+_this.sep) * Math.cos(_this.angle_click)+ _this.coord_x;
		        _this.y_point = (_this.radius+_this.sep) * Math.sin(_this.angle_click)+ _this.coord_y;
		        _this.x_point2 = (_this.radius-_this.sep) * Math.cos(_this.angle_click)+ _this.coord_x;
		        _this.y_point2 = (_this.radius-_this.sep) * Math.sin(_this.angle_click)+ _this.coord_y;
		        	
		    	obj.setAttribute("x1", _this.x_point);
		    	obj.setAttribute("y1", _this.y_point);
		    	obj.setAttribute("x2", _this.x_point2);
		    	obj.setAttribute("y2", _this.y_point2);  
	
		    	//circulo que rodea donde hemos clickado
		    	var circle1 = [];   		
		    		
		    		//en el caso en el que el circulo se pinten en dos partes al situarse entre el principio y el final donde la funcion empieza a pintar
		    		if(_this.angle_click - _this.angle_lines < 0) //clickar despues del angulo cero
		    			{
		    			circle1.push((_this.angle_click + _this.angle_lines)* _this.circleLength / rad_360_grados); 
		    			circle1.push((rad_360_grados - (2*_this.angle_lines))*  _this.circleLength  / rad_360_grados); 
		    			circle1.push(((_this.angle_lines - _this.angle_click) *  _this.circleLength  / rad_360_grados)+2);
		    			}	
		    		else if(_this.angle_click + _this.angle_lines > rad_360_grados) //clickar antes del angulo 0
		    			{
		    				    			
		    			circle1.push((_this.angle_lines-(rad_360_grados-_this.angle_click))*  _this.circleLength  / rad_360_grados); 
		    			circle1.push((rad_360_grados - (2*_this.angle_lines))*  _this.circleLength  / rad_360_grados); 
		    			circle1.push(((_this.angle_lines + (rad_360_grados - _this.angle_click)) *  _this.circleLength  / rad_360_grados)+2);
		    			}
		    		else //caso normal
		    			{	
		    			circle1.push(0); 
			    		circle1.push(((_this.angle_click - _this.angle_lines) *  _this.circleLength ) / rad_360_grados); //pixels hasta la seleccion
			    		circle1.push(((_this.angle_lines * 2) *  _this.circleLength ) / rad_360_grados);  //pixels de la seleccion
			    		circle1.push((((rad_360_grados -(_this.angle_click - _this.angle_lines) + (_this.angle_lines * 2))) *  _this.circleLength ) / rad_360_grados);  //pixels de lo que sobra del circulo		
		    			}	
		    	c11.setAttribute ("cx", _this.coord_x);
		    	c11.setAttribute ("cy", _this.coord_y);
		    	c11.setAttribute ("r", _this.radius);
		    	c11.setAttribute("stroke-dasharray",circle1.toString());
	  		}
    });


//    //creamos un indicador y lo situamos inicialmente en un punto
	var obj = document.createElementNS("http://www.w3.org/2000/svg", "line");
    obj.setAttribute("stroke", "red");
    obj.setAttribute("stroke-width", 1);
    obj.setAttribute("transform","rotate(-90,"+ _this.coord_x+","+_this.coord_y+")"); //lo rotamos para que empiece por arriba y lo desplazamos para verlo en la pantalla  
    _this.mySvg.appendChild (obj);
    
    
//    var obj = SVG.addChild(_this.mySvg, "line", {
//    	"stroke": "red",
//    	"stroke-width": 1,
//    	"transform":"rotate(-90,"+ _this.coord_x+","+_this.coord_y+")",
//    });
    
    
    
    //llamamos a la funcion aqui y no en el index para que os datos esten bien dargados antes de dibujar
    _this.drawChromosome();

    
    //circulo que rodea la seleccion
    var c11 = document.createElementNS ("http://www.w3.org/2000/svg", "circle");

    c11.setAttribute("fill", "transparent");
    c11.setAttribute("stroke", "orange");
    c11.setAttribute("opacity", "0.2");
    c11.setAttribute("stroke-width", 55);
    c11.setAttribute("transform","rotate(-90,"+ _this.coord_x+","+_this.coord_y+")"); //lo rotamos para que empiece por arriba y lo desplazamos para verlo en la pantalla

    _this.mySvg.appendChild (c11);
    

    
  });
};

CircularChromosomeWidget.prototype.drawChromosome = function(){
	var _this = this; //global
	_this.chroLength = _this.d[0][_this.d[0].length-1].end; //numero de elementos
	var dashArray = []; //contendra los numeros que le pasaremos a la funcion dasharray para que pite el circulo por partes
	var aux = 0; // numero de elementos que tiene cada grupo
	var colores = []; //array que contendra los diferentes colores e indicara los diferentes circulos a pintar
	var b = true;
	
	//damos valores al array colors mirando todos los colores diferentes que tenemos
	colores.push(_this.d[0][0].stain); //almacenamos el primero
	 
		 for(var j = 1; j<= _this.d[0].length-1; j++) //0 a 35
		 {
		     for(var w=0; w <= colores.length-1; w++)
		     {
		       if(colores[w] == _this.d[0][j].stain)  //si se encuentra ya en el vector, lo indicamos
		         b = false;
		     } 
		     if(b) //si ese color no esta en el array, se almacena
		      colores.push(_this.d[0][j].stain);
	
	     b = true;
		 }

    var indice=null; //esta variable se guardara el indice del anterior elementos que era del mismo color para calcular el hueco
	var bb = true; //variable que indicara cuando hay que dibujar el primero

	//llenamos el vector desharray
	for(var w = 0; w<colores.length;w++)   //los almacenamos por colores
	{
	   for(var i = 0; i< _this.d[0].length; i++)  //para todos los datos que tenemos
	   {  
	      
	      if(_this.d[0][i].stain == colores[w]) //miramos que sea del mismo color
	      {
		    if(bb)// en este sitio solo entramos la primera vez que vamos a pintar cada color
	  	    {  
		      //hay que diferenciar cuando se empieza pintando y cuando se empieza dejandolo en blanco en el primero de los datos
		      if(i==0 && _this.d[0][i].start==1)
		      {
			      //calculamos el numero de pixeles para pintar
				  aux = _this.d[0][i].end - _this.d[0][i].start;

				  aux = aux / _this.pixelRatio;
				  dashArray.push(aux);
		      }
		      else
		      {
				  dashArray.push(0); //cuando primero hay un blanco, ponemos 0 para que no pinte nada
				  //como ya tenemos el elemento, calculamos el espacio y el siguente a colorear
				  aux = _this.d[0][i].start - 1; // calculamos el espacio que hay desde ese elemento al inicio
				  aux = aux / _this.pixelRatio;

				  dashArray.push(aux); 
				  //calculamos el espacio a pintar
			          aux = _this.d[0][i].end - _this.d[0][i].start;
				  aux = aux / _this.pixelRatio;
				  dashArray.push(aux);	
		      }
		    indice = i; //nos guardamos la posicion del anterior elemento con el mismo color para calcular el hueco con el siguiente
		    bb= false; 
		  }
		 else
		   {  
		   //espacio transparente mirando el espacio que hay con el anterior
		    aux = _this.d[0][i].start - _this.d[0][indice].end;    //i-1 no es el anterior, sino otro
		    aux = aux / _this.pixelRatio;
		    
		    if( _this.colors[colores[w]]=="blue")
		      dashArray.push(2); // si es azul aunque este todo junto lo separamos un poco
		    else
		       dashArray.push(aux); 
		   
		    //espacio pintado
		    aux = _this.d[0][i].end -_this. d[0][i].start;
		    aux = aux / _this.pixelRatio;
		    dashArray.push(aux);			  
		    indice = i; //nos almacenamos el siguente elemento oara calcular el hueco al siguiente
		    }
	     }
	    }
	//cuando termina hay que indicarle que almacene el blanco (transparente) hasta el final
	aux = _this.chroLength - _this.d[0][indice].end;
	aux = aux / _this.pixelRatio;
	dashArray=dashArray +","+ aux;
	DrawCircles(dashArray, w, colores);
	dashArray = [];  //vaciamos para volver a llenar esta variable con los numeros de otro color
	bb = true;
	}	    

	function DrawCircles(dashArray, w, colores)
	{	
      var c1 = document.createElementNS ("http://www.w3.org/2000/svg", "circle");
      c1.setAttribute ("cx", _this.coord_x);
      c1.setAttribute ("cy", _this.coord_y);
      c1.setAttribute ("r", _this.radius);
      c1.setAttribute("fill", "transparent");
      c1.setAttribute("stroke", _this.colors[colores[w]]);
      c1.setAttribute("stroke-width", _this.stroke_width);
      //lo rotamos para que empiece por arriba y lo desplazamos para verlo en la pantalla
      c1.setAttribute("transform","rotate(-90,"+ _this.coord_x+","+_this.coord_y+")"); 
      c1.setAttribute("stroke-dasharray",dashArray.toString());
      _this.mySvg.appendChild (c1);
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function KaryotypeWidget(parent, args) {
	
	this.parent = parent;
	this.id = Math.round(Math.random()*10000000);
	if(args != null){
		if(args.width != null){
			this.width = args.width;
		}
		if(args.height != null){
			this.height = args.height;
		}
		if(args.species != null){
			this.species = args.species;
		}
		if(args.region != null){
			this.region = args.region;
		}
	}

	this.onClick = new Event();
	this.afterRender = new Event();
	
	this.rendered=false;
	
	this.svg = SVG.init(parent,{
		"width":this.width,
		"height":this.height
	});
	this.markGroup = SVG.addChild(this.svg,"g",{"cursor":"pointer"});
	
	this.colors = {gneg:"white", stalk:"#666666", gvar:"#CCCCCC", gpos25:"silver", gpos33:"lightgrey", gpos50:"gray", gpos66:"dimgray", gpos75:"darkgray", gpos100:"black", gpos:"gray", acen:"blue"};

	this.chromosomeList = null;
	this.data2 = null;
};

KaryotypeWidget.prototype.setWidth = function(width){
	this.width=width;
	this.svg.setAttribute("width",width);
	while (this.svg.firstChild) {
		this.svg.removeChild(this.svg.firstChild);
	}
	this._drawSvg(this.chromosomeList,this.data2);
};

KaryotypeWidget.prototype.drawKaryotype = function(){
	var _this = this;

	var sortfunction = function(a, b) {
		var IsNumber = true;
		for (var i = 0; i < a.name.length && IsNumber == true; i++) {
			if (isNaN(a.name[i])) {
				IsNumber = false;
			}
		}
		if (!IsNumber) return 1;
		return (a.name - b.name);
	};
	
//	var cellBaseManager = new CellBaseManager(this.species);
// 	cellBaseManager.success.addEventListener(function(sender,data){
// 		_this.chromosomeList = data.result;
// 		_this.chromosomeList.sort(sortfunction);
// 		var cellBaseManager2 = new CellBaseManager(_this.species);
// 		cellBaseManager2.success.addEventListener(function(sender,data2){
// 			_this.data2 = data2;
// 			_this._drawSvg(_this.chromosomeList,data2);
// 		});
// 		cellBaseManager2.get("genomic", "region", _this.chromosomeList.toString(),"cytoband");
// 	});
// 	cellBaseManager.get("feature", "karyotype", "none", "chromosome");

	var cellBaseManager = new CellBaseManager(this.species);
	cellBaseManager.success.addEventListener(function(sender,data){
		_this.chromosomeList = data.result;
		_this.chromosomeList.sort(sortfunction);
        _this._drawSvg(_this.chromosomeList);
	});
	cellBaseManager.get('feature', 'chromosome', null , 'all');


	
};
KaryotypeWidget.prototype._drawSvg = function(chromosomeList){
	var _this = this;

	var x = 20;
	var xOffset = _this.width/chromosomeList.length;
	var yMargin = 2;

	///////////
	var biggerChr = 0;
	for(var i=0, len=chromosomeList.length; i<len; i++){
		var size = chromosomeList[i].size;
		if(size > biggerChr){
            biggerChr = size;
        }
	}
	_this.pixelBase = (_this.height - 10) / biggerChr;
	_this.chrOffsetY = {};
	_this.chrOffsetX = {};

	for(var i=0, len=chromosomeList.length; i<len; i++){ //loop over chromosomes
        var chromosome = chromosomeList[i];
//		var chr = chromosome.name;
		var chrSize = chromosome.size * _this.pixelBase;
		var y = yMargin + (biggerChr * _this.pixelBase) - chrSize;
		_this.chrOffsetY[chromosome.name] = y;
		var firstCentromere = true;
		
		var centerPosition = _this.region.center();
		var pointerPosition = (centerPosition * _this.pixelBase);

		var group = SVG.addChild(_this.svg,"g",{"cursor":"pointer","chr":chromosome.name});
		$(group).click(function(event){
			var chrClicked = this.getAttribute("chr");
//			for ( var k=0, len=chromosomeList.length; k<len; k++) {
//			var offsetX = (event.pageX - $(_this.svg).offset().left);
//			if(offsetX > _this.chrOffsetX[chromosomeList[k]]) chrClicked = chromosomeList[k];
//			}

			var offsetY = (event.pageY - $(_this.svg).offset().top);
//			var offsetY = event.originalEvent.layerY - 3;

			_this.positionBox.setAttribute("x1",_this.chrOffsetX[chrClicked]-10);
			_this.positionBox.setAttribute("x2",_this.chrOffsetX[chrClicked]+23);
			_this.positionBox.setAttribute("y1",offsetY);
			_this.positionBox.setAttribute("y2",offsetY);

			var clickPosition = parseInt((offsetY - _this.chrOffsetY[chrClicked])/_this.pixelBase);
			_this.region.chromosome = chrClicked;
			_this.region.start = clickPosition;
			_this.region.end = clickPosition;
			
			_this.onClick.notify(_this.region);
		});

		for ( var j=0, lenJ=chromosome.cytobands.length; j<lenJ; j++){ //loop over chromosome objects
            var cytoband = chromosome.cytobands[j];
			var height = _this.pixelBase * (cytoband.end - cytoband.start);
			var width = 13;

			var color = _this.colors[cytoband.stain];
			if(color == null) color = "purple";

			if(cytoband.stain == "acen"){
				var points = "";
				var middleX = x+width/2;
				var middleY = y+height/2;
				var endX = x+width;
				var endY = y+height;
				if(firstCentromere){
					points = x+","+y+" "+endX+","+y+" "+endX+","+middleY+" "+middleX+","+endY+" "+x+","+middleY;
					firstCentromere = false;
				}else{
					points = x+","+endY+" "+x+","+middleY+" "+middleX+","+y+" "+endX+","+middleY+" "+endX+","+endY;
				}
				SVG.addChild(group,"polyline",{
					"points":points,
					"stroke":"black",
					"opacity":0.8,
					"fill":color
				});
			}else{
				SVG.addChild(group,"rect",{
					"x":x,
					"y":y,
					"width":width,
					"height":height,
					"stroke":"grey",
					"opacity":0.8,
					"fill":color
				});
			}

			y += height;
		}
		var text = SVG.addChild(_this.svg,"text",{
			"x":x+1,
			"y":_this.height,
			"font-size":9,
			"fill":"black"
		});
		text.textContent = chromosome.name;

		_this.chrOffsetX[chromosome.name] = x;
		x += xOffset;
	}
	_this.positionBox = SVG.addChild(_this.svg,"line",{
		"x1":_this.chrOffsetX[_this.region.chromosome]-10,
		"y1":pointerPosition + _this.chrOffsetY[_this.region.chromosome],
		"x2":_this.chrOffsetX[_this.region.chromosome]+23,
		"y2":pointerPosition + _this.chrOffsetY[_this.region.chromosome],
		"stroke":"orangered",
		"stroke-width":2,
		"opacity":0.5
	});

	_this.rendered=true;
	_this.afterRender.notify();
};


KaryotypeWidget.prototype.setRegion = function(item){//item.chromosome, item.position, item.species
	var needDraw = false;
	if(item.species!=null){
		this.species = item.species;
		needDraw = true;
	}
	if(item.species==null){
		this.positionBox.setAttribute("x1",this.chrOffsetX[this.region.chromosome]-10);
		this.positionBox.setAttribute("x2",this.chrOffsetX[this.region.chromosome]+23);
	}
	
	var centerPosition = this.region.center();
	if(!isNaN(centerPosition)){
		if(item.species==null){
			var pointerPosition = centerPosition * this.pixelBase + this.chrOffsetY[this.region.chromosome];
			this.positionBox.setAttribute("y1", pointerPosition);
			this.positionBox.setAttribute("y2", pointerPosition);
		}
	}
	if(needDraw){
//		$(this.svg).empty();
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}
		this.drawKaryotype();
	}
};


KaryotypeWidget.prototype.updatePositionBox = function(){
	this.positionBox.setAttribute("x1",this.chrOffsetX[this.region.chromosome]-10);
	this.positionBox.setAttribute("x2",this.chrOffsetX[this.region.chromosome]+23);

	var centerPosition = Utils.centerPosition(this.region);
	var pointerPosition = centerPosition * this.pixelBase + this.chrOffsetY[this.region.chromosome];
	this.positionBox.setAttribute("y1",pointerPosition);
	this.positionBox.setAttribute("y2",pointerPosition);
};	
	
KaryotypeWidget.prototype.addMark = function(item){//item.chromosome, item.position
	var _this = this;
	
	var mark = function (){

		if(item.chromosome!=null && item.start!=null){
			if(_this.chrOffsetX[item.chromosome]!= null){
				var x1 = _this.chrOffsetX[item.chromosome]-10;
				var x2 = _this.chrOffsetX[item.chromosome];
				var y1 = (item.start * _this.pixelBase + _this.chrOffsetY[item.chromosome]) - 4;
				var y2 = item.start * _this.pixelBase + _this.chrOffsetY[item.chromosome];
				var y3 = (item.start * _this.pixelBase + _this.chrOffsetY[item.chromosome]) + 4;
				var points = x1+","+y1+" "+x2+","+y2+" "+x1+","+y3+" "+x1+","+y1;
				SVG.addChild(_this.markGroup,"polyline",{
					"points":points,
					"stroke":"black",
					"opacity":0.8,
					"fill":"#33FF33"
				});
			}
		}
	};
	
	if(this.rendered){
		mark();
	}else{
		this.afterRender.addEventListener(function(sender,data){
			mark();
		});
	}
};

KaryotypeWidget.prototype.unmark = function(){
//	$(this.markGroup).empty();
	while (this.markGroup.firstChild) {
		this.markGroup.removeChild(this.markGroup.firstChild);
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function DataSource() {
	
};

DataSource.prototype.fetch = function(){

};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function CellBaseAdapter(args){
	this.host = null;
	this.gzip = true;
	
	this.params={};
	if (args != null){
		if(args.host != null){
			this.host = args.host;
		}
		if(args.species != null){
			this.species = args.species;
		}
		if(args.category != null){
			this.category = args.category;
		}
		if(args.subCategory != null){
			this.subCategory = args.subCategory;
		}
		if(args.resource != null){
			this.resource = args.resource;
		}
		if(args.featureCache != null){
			var argsFeatureCache = args.featureCache;
		}
		if(args.params != null){
			this.params = args.params;
		}
		if(args.filters != null){
			this.filters = args.filters;
		}
		if(args.options != null){
			this.options = args.options;
		}
		if(args.featureConfig != null){
			if(args.featureConfig.filters != null){
				this.filtersConfig = args.featureConfig.filters;
			}
			if(args.featureConfig.options != null){
				this.optionsConfig = args.featureConfig.options;
				for(var i = 0; i < this.optionsConfig.length; i++){
					if(this.optionsConfig[i].checked == true){
						this.options[this.optionsConfig[i].name] = true;
						this.params[this.optionsConfig[i].name] = true;
					}				
				}
			}
		}
	}
	this.featureCache =  new FeatureCache(argsFeatureCache);
	this.onGetData = new Event();
}

CellBaseAdapter.prototype.clearData = function(){
	this.featureCache.clear();
};

CellBaseAdapter.prototype.setFilters = function(filters){
	this.clearData();
	this.filters = filters;
	for(filter in filters){
		var value = filters[filter].toString();
		delete this.params[filter];
		if(value != ""){
			this.params[filter] = value;
		}
	}
};
CellBaseAdapter.prototype.setOption = function(opt, value){
	if(opt.fetch){
		this.clearData();
	}
	this.options[opt.name] = value;
	for(option in this.options){
		if(this.options[opt.name] != null){
			this.params[opt.name] = this.options[opt.name];
		}else{
			delete this.params[opt.name];
		}
	}
};


CellBaseAdapter.prototype.getData = function(args){
	var rnd = String.fromCharCode(65+Math.round(Math.random()*10));
	var _this = this;
	//region check
	this.params["histogram"] = args.histogram;
	this.params["interval"] = args.interval;
	this.params["transcript"] = args.transcript;
	this.params["chromosome"] = args.chromosome;
	this.params["resource"] = this.resource;
	
	if(args.start<1){
		args.start=1;
	}
	if(args.end>300000000){
		args.end=300000000;
	}
	
	var dataType = "data";
	if(args.histogram){
		dataType = "histogram"+args.interval;
	}
	if(args.transcript){
		dataType = "withTranscripts";
	}

	this.params["dataType"] = dataType;
	
	var firstChunk = this.featureCache._getChunk(args.start);
	var lastChunk = this.featureCache._getChunk(args.end);
	var chunks = [];
	var itemList = [];
	for(var i=firstChunk; i<=lastChunk; i++){
		var key = args.chromosome+":"+i;
		if(this.featureCache.cache[key] == null || this.featureCache.cache[key][dataType] == null) {
			chunks.push(i);
		}else{
			var item = this.featureCache.getFeatureChunk(key);
			itemList.push(item);
		}
	}
	
	//CellBase data process
	var cellBaseManager = new CellBaseManager(this.species,{host: this.host});
	cellBaseManager.success.addEventListener(function(sender,data){
		var dataType = "data";
		if(data.params.histogram){
			dataType = "histogram"+data.params.interval;
		}
		if(data.params.transcript){
			dataType = "withTranscripts";
		}

		//XXX quitar cuando este arreglado el ws
		if(data.params.histogram == true){
			data.result = [data.result];
		}

        var featureType = data.resource;
		//XXX
		
		var queryList = [];
		for(var i = 0; i < data.query.length; i++) {
			var splitDots = data.query[i].split(":");
			var splitDash = splitDots[1].split("-");
			queryList.push({chromosome:splitDots[0],start:splitDash[0],end:splitDash[1]});
		}
		
		for(var i = 0; i < data.result.length; i++) {
			
			//Check if is a single object
			if(data.result[i].constructor != Array){
				data.result[i] = [data.result[i]];
			}
			
			if(featureType == "gene" && data.params.transcript!=null){
				for ( var j = 0, lenj = data.result[i].length; j < lenj; j++) {
					for (var t = 0, lent = data.result[i][j].transcripts.length; t < lent; t++){
						data.result[i][j].transcripts[t].featureType = "transcript";
						//loop over exons
						for (var e = 0, lene = data.result[i][j].transcripts[t].exons.length; e < lene; e++){
							data.result[i][j].transcripts[t].exons[e].featureType = "exon";
						}
					}
				}
			}

            if(featureType == "regulatory"){
                featureType = data.params.type;
                if(featureType == 'TF_binding_site_motif'){
                    featureType = 'tfbs';
                }
            }

			console.time(_this.resource+" save "+rnd);
			_this.featureCache.putFeaturesByRegion(data.result[i], queryList[i], featureType, dataType);
			var items = _this.featureCache.getFeatureChunksByRegion(queryList[i]);
			console.timeEnd(_this.resource+" save "+rnd);
			if(items != null){
				itemList = itemList.concat(items);
			}
		}
		if(itemList.length > 0){
			_this.onGetData.notify({items:itemList, params:_this.params, cached:false});
		}
		console.timeEnd(_this.resource+" get and save "+rnd);
	});

	var querys = [];
	var updateStart = true;
	var updateEnd = true;
	if(chunks.length > 0){
//		console.log(chunks);
		
		for ( var i = 0; i < chunks.length; i++) {
			
			if(updateStart){
				var chunkStart = parseInt(chunks[i] * this.featureCache.chunkSize);
				updateStart = false;
			}
			if(updateEnd){
				var chunkEnd = parseInt((chunks[i] * this.featureCache.chunkSize) + this.featureCache.chunkSize-1);
				updateEnd = false;
			}
			
			if(chunks[i+1]!=null){
				if(chunks[i]+1==chunks[i+1]){
					updateEnd =true;
				}else{
					var query = args.chromosome+":"+chunkStart+"-"+chunkEnd;
					querys.push(query);
					updateStart = true;
					updateEnd = true;
				}
			}else{
				var query = args.chromosome+":"+chunkStart+"-"+chunkEnd;
				querys.push(query);
				updateStart = true;
				updateEnd = true;
			}
		}
//		console.log(querys);
		console.time(_this.resource+" get and save "+rnd);
		cellBaseManager.get(this.category, this.subCategory, querys, this.resource, this.params);
	}else{
		if(itemList.length > 0){
			this.onGetData.notify({items:itemList, params:this.params});
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

FileDataSource.prototype.fetch = DataSource.prototype.fetch;

function FileDataSource(file) {
	DataSource.prototype.constructor.call(this);
	
	this.file = file;
	this.success = new Event();
	this.error = new Event();
};

FileDataSource.prototype.error = function(){
	alert("File is too big. Max file size is 100 Mbytes.");
};

FileDataSource.prototype.fetch = function(async){
	var _this = this;
	if(this.file.size <= 52428800){
		if(async){
			var  reader = new FileReader();
			reader.onload = function(evt) {
				_this.success.notify(evt.target.result);
			};
			reader.readAsText(this.file, "UTF-8");
		}else{
			// FileReaderSync web workers only
			var reader = new FileReaderSync();
			return reader.readAsText(this.file, "UTF-8");
		}
	}else{
		_this.error();
		_this.error.notify();
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

StringDataSource.prototype.fetch = DataSource.prototype.fetch;

function StringDataSource(str) {
	DataSource.prototype.constructor.call(this);
	
	this.str = str;
	this.success = new Event();
};

StringDataSource.prototype.fetch = function(async){
	if(async){
		this.success.notify(this.str);
	}else{
		return this.str;
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

UrlDataSource.prototype.fetch = DataSource.prototype.fetch;

function UrlDataSource(url, args) {
	DataSource.prototype.constructor.call(this);
	
	this.url = url;
	this.proxy = CELLBASE_HOST+"/latest/utils/proxy?url=";
	if(args != null){
		if(args.proxy != null){
			if(typeof(args.proxy) == "boolean"){
				if(args.proxy == false){
					this.proxy = false;
				}
				else{
					this.url = this.proxy + url;
				}
			}else if(typeof(args.proxy) == "string"){
				this.url = args.proxy + url;
			}
		}
	}
	this.success = new Event();
	this.error = new Event();
};

UrlDataSource.prototype.fetch = function(async){
	var _this = this;
	
	var datos = null;
	
	if(this.url){
		$.ajax({
			type : "GET",
			url : this.url,
			async : async,
			success : function(data, textStatus, jqXHR) {
				if(async){
					_this.success.notify(data);
				}else{
					datos = data;
				}
			},
			error : function(jqXHR, textStatus, errorThrown){
				console.log("URL Data source: Ajax call returned : "+errorThrown+'\t'+textStatus+'\t'+jqXHR.statusText+" END");
				_this.error.notify();
			}
		});
		
		return datos;
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

VCFDataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;
VCFDataAdapter.prototype._fetchData = FeatureDataAdapter.prototype._fetchData;

function VCFDataAdapter(dataSource, args){
	FeatureDataAdapter.prototype.constructor.call(this, dataSource, args);
	var _this = this;
	
	this.async = true;
	//stat atributes
	this.featuresCount = 0;
	this.featuresByChromosome = {};
	
	this.header = "";
	this.samples = [];

	if (args != null){
		if(args.async != null){
			this.async = args.async;
		}
	}
}

VCFDataAdapter.prototype.parse = function(data, region){
	console.log(data);
	var _this = this;
	var dataType = "data";
	var lines = data.split("\n");
    debugger
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
        debugger
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			if(fields[0]==region.chromosome){// load only one chromosome on the cache
			
				if(line.substr(0,1)==="#"){
					if(line.substr(1,1)==="#"){
						this.header+=line.replace(/</gi,"&#60;").replace(/>/gi,"&#62;")+"<br>";
					}else{
						this.samples = fields.slice(9);
					}
				}else{
	//				_this.addQualityControl(fields[5]);
					var feature = {
							"chromosome": 	fields[0],
							"position": 	parseInt(fields[1]), 
							"start": 		parseInt(fields[1]),//added
							"end": 			parseInt(fields[1]),//added
							"id":  			fields[2],
							"reference": 			fields[3],
							"alternate": 			fields[4],
							"quality": 		fields[5], 
							"filter": 		fields[6], 
							"info": 		fields[7].replace(/;/gi,"<br>"), 
							"format": 		fields[8],
							"sampleData":	line,
	//						"record":		fields,
	//						"label": 		fields[2] + " " +fields[3] + "/" + fields[4] + " Q:" + fields[5],
							"featureType":	"vcf"
					};
					
					this.featureCache.putFeatures(feature, dataType);
					
					if (this.featuresByChromosome[fields[0]] == null){
						this.featuresByChromosome[fields[0]] = 0;
					}
					this.featuresByChromosome[fields[0]]++;
					this.featuresCount++;
				}
			}
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GFF2DataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;
GFF2DataAdapter.prototype._fetchData = FeatureDataAdapter.prototype._fetchData;

function GFF2DataAdapter(dataSource, args){
	FeatureDataAdapter.prototype.constructor.call(this, dataSource, args);
	var _this = this;
	
	this.async = true;
	
	//stat atributes
	this.featuresCount = 0;
	this.featuresByChromosome = {};

	if (args != null){
		if(args.async != null){
			this.async = args.async;
		}
	}
};

GFF2DataAdapter.prototype.parse = function(data, region){
	var _this = this;
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			var chromosome = fields[0].replace("chr", "");
			if(chromosome == region.chromosome){// load only one chromosome on the cache

				//NAME  SOURCE  TYPE  START  END  SCORE  STRAND  FRAME  GROUP
				var feature = {
						"chromosome": chromosome, 
						"label": fields[2], 
						"start": parseInt(fields[3]), 
						"end": parseInt(fields[4]), 
						"score": fields[5],
						"strand": fields[6], 
						"frame": fields[7],
						"group": fields[8],
						"featureType":	"gff2"
				} ;

				this.featureCache.putFeatures(feature, dataType);
				
				if (this.featuresByChromosome[chromosome] == null){
					this.featuresByChromosome[chromosome] = 0;
				}
				this.featuresByChromosome[chromosome]++;
				this.featuresCount++;
			}
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GFF3DataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;
GFF3DataAdapter.prototype._fetchData = FeatureDataAdapter.prototype._fetchData;

function GFF3DataAdapter(dataSource, args){
	FeatureDataAdapter.prototype.constructor.call(this, dataSource, args);
	var _this = this;
	
	this.async = true;

	//stat atributes
	this.featuresCount = 0;
	this.featuresByChromosome = {};

	if (args != null){
		if(args.async != null){
			this.async = args.async;
		}
	}
};

GFF3DataAdapter.prototype.parse = function(data, region){
	var _this = this;
	
	//parse attributes column
	var getAttr = function(column){
		var arr = column.split(";");
		var obj = {};
		for (var i = 0, li = arr.length; i<li ; i++){
			var item = arr[i].split("=");
			obj[item[0]] = item[1];
		}
		return obj;
	};
	
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			var chromosome = fields[0].replace("chr", "");
			if(chromosome == region.chromosome){// load only one chromosome on the cache

				//NAME  SOURCE  TYPE  START  END  SCORE  STRAND  FRAME  GROUP
				var feature = {
						"chromosome": chromosome, 
						"label": fields[2], 
						"start": parseInt(fields[3]), 
						"end": parseInt(fields[4]), 
						"score": fields[5],
						"strand": fields[6], 
						"frame": fields[7],
						"attributes": getAttr(fields[8]),
						"featureType":	"gff3"
				} ;

				this.featureCache.putFeatures(feature, dataType);
				if (this.featuresByChromosome[chromosome] == null){
					this.featuresByChromosome[chromosome] = 0;
				}
				this.featuresByChromosome[chromosome]++;
				this.featuresCount++;

			}
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GTFDataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;
GTFDataAdapter.prototype._fetchData = FeatureDataAdapter.prototype._fetchData;

function GTFDataAdapter(dataSource, args){
	FeatureDataAdapter.prototype.constructor.call(this, dataSource, args);
	var _this = this;
	
	this.async = true;
	
	//stat atributes
	this.featuresCount = 0;
	this.featuresByChromosome = {};

	if (args != null){
		if(args.async != null){
			this.async = args.async;
		}
	}
};

GTFDataAdapter.prototype.parse = function(data, region){
	var _this = this;
	
	//parse attributes column
	var getAttr = function(column){
		var arr = column.split(";");
		var obj = {};
		for (var i = 0, li = arr.length; i<li ; i++){
			var item = arr[i].split("=");
			obj[item[0]] = item[1];
		}
		return obj;
	};
	
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			var chromosome = fields[0].replace("chr", "");
			if(chromosome == region.chromosome){// load only one chromosome on the cache
			
				//NAME  SOURCE  TYPE  START  END  SCORE  STRAND  FRAME  GROUP
				var feature = {
						"chromosome": chromosome, 
						"label": fields[2], 
						"start": parseInt(fields[3]), 
						"end": parseInt(fields[4]), 
						"score": fields[5],
						"strand": fields[6], 
						"frame": fields[7],
						"attributes": getAttr(fields[8]),
						"featureType":	"gtf"
				} ;

				this.featureCache.putFeatures(feature, dataType);
				if (this.featuresByChromosome[chromosome] == null){
					this.featuresByChromosome[chromosome] = 0;
				}
				this.featuresByChromosome[chromosome]++;
				this.featuresCount++;
			}
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

BEDDataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;
BEDDataAdapter.prototype._fetchData = FeatureDataAdapter.prototype._fetchData;

function BEDDataAdapter(dataSource, args){
	FeatureDataAdapter.prototype.constructor.call(this, dataSource, args);
	var _this = this;
	
	this.async = true;
	
	//stat atributes
	this.featuresCount = 0;
	this.featuresByChromosome = {};

	if (args != null){
		if(args.async != null){
			this.async = args.async;
		}
	}
};

BEDDataAdapter.prototype.parse = function(data, region){
	var _this = this;
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			var chromosome = fields[0].replace("chr", "");
			if(chromosome == region.chromosome){// load only one chromosome on the cache
			
				var feature = {
						"label":fields[3],
						"chromosome": chromosome, 
						"start": parseFloat(fields[1]), 
						"end": parseFloat(fields[2]), 
						"score":fields[4],
						"strand":fields[5],
						"thickStart":fields[6],
						"thickEnd":fields[7],
						"itemRgb":fields[8],
						"blockCount":fields[9],
						"blockSizes":fields[10],
						"blockStarts":fields[11],
						"featureType":	"bed"
				} ;

				this.featureCache.putFeatures(feature, dataType);
				
				if (this.featuresByChromosome[chromosome] == null){
					this.featuresByChromosome[chromosome] = 0;
				}
				this.featuresByChromosome[chromosome]++;
				this.featuresCount++;
			}
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function TabularDataAdapter(dataSource, args){
	var _this = this;
	
	this.dataSource = dataSource;
	this.async = true;

	if (args != null){
		if(args.async != null){
			this.async = args.async;
		}
	}
	
	this.fileLines = [];
	
	if(this.async){
		this.dataSource.success.addEventListener(function(sender,data){
			_this.parse(data);
			_this.onLoad.notify();
		});
		this.dataSource.fetch(this.async);
	}else{
		var data = this.dataSource.fetch(this.async);
		this.parse(data);
	}
	
	this.onLoad = new Event();	
};

TabularDataAdapter.prototype.getLines = function(){
	return this.fileLines;
};

TabularDataAdapter.prototype.parse = function(data){
	var _this = this;
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		line = line.replace(/\//gi,"");//TODO DONE   /  is not allowed in the call
		if ((line != null)&&(line.length > 0) && line.charAt(0)!="#"){
			var fields = line.split("\t");
			this.fileLines.push(fields);
		}
	}
};

//
TabularDataAdapter.prototype.getLinesCount = function(){
	return this.fileLines.length;
};

TabularDataAdapter.prototype.getValuesByColumnIndex = function(columnIndex){
	var result = new Array();
	for (var i = 0; i < this.getLinesCount(); i++) {
		if (this.getLines()[i][columnIndex] != null){
			result.push(this.getLines()[i][columnIndex]);
		}
	}
	return result;
};

/** Returns: 'numeric' || 'string **/
TabularDataAdapter.prototype.getHeuristicTypeByColumnIndex = function(columnIndex){
	return this.getHeuristicTypeByValues(this.getValuesByColumnIndex(columnIndex));
};

TabularDataAdapter.prototype.getHeuristicTypeByValues = function(values){
	var regExp = /^[-+]?[0-9]*\.?[0-9]+$/;
	for (var i = 0; i < values.length; i++) {
		if(!regExp.test(new String(values[i]).replace(",", "."))){
			return 'string';
		}
	}
	return 'numeric';
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function DasAdapter(args){
	this.gzip = true;
	
	this.proxy = CELLBASE_HOST+"/latest/utils/proxy?url=";
	
	this.params = {};
	if (args != null){
		if (args.url != null){
			this.url = args.url;
		}
		if(args.species != null){
			this.species = args.species;
		}
		if(args.featureCache != null){
			var argsFeatureCache = args.featureCache;
		}
		if(args.params != null){
			this.params = args.params;
		}
	}
	this.featureCache =  new FeatureCache(argsFeatureCache);
	this.onGetData = new Event();
	this.onCheckUrl = new Event();
	this.onError = new Event();
};

DasAdapter.prototype.getData = function(args){
//	console.time("all");
	var _this = this;
	//region check
	
	this.params["histogram"] = args.histogram;
	this.params["interval"] = args.interval;
	this.params["transcript"] = args.transcript;
	
	if(args.start<1){
		args.start=1;
	}
	if(args.end>300000000){
		args.end=300000000;
	}
	
	var dataType = "data";
	if(args.histogram){
		dataType = "histogram"+args.interval;
	}

	this.params["dataType"] = dataType;
	
	var firstChunk = this.featureCache._getChunk(args.start);
	var lastChunk = this.featureCache._getChunk(args.end);

	var chunks = [];
	var itemList = [];
	for(var i=firstChunk; i<=lastChunk; i++){
		var key = args.chromosome+":"+i;
		if(this.featureCache.cache[key] == null || this.featureCache.cache[key][dataType] == null) {
			chunks.push(i);
		}else{
			var item = this.featureCache.getFeatureChunk(key);
//			console.time("concat");
			itemList.push(item);
//			console.timeEnd("concat");
		}
	}
//	//notify all chunks
	if(itemList.length>0){
		this.onGetData.notify({items:itemList, params:this.params, cached:true});
	}
	
	
	//data process
	var updateStart = true;
	var updateEnd = true;
	if(chunks.length > 0){
//		console.log(chunks);
		
		for ( var i = 0; i < chunks.length; i++) {
			var query = null;
			
			if(updateStart){
				var chunkStart = parseInt(chunks[i] * this.featureCache.chunkSize);
				updateStart = false;
			}
			if(updateEnd){
				var chunkEnd = parseInt((chunks[i] * this.featureCache.chunkSize) + this.featureCache.chunkSize-1);
				updateEnd = false;
			}
			
			if(chunks[i+1]!=null){
				if(chunks[i]+1==chunks[i+1]){
					updateEnd =true;
				}else{
					query = args.chromosome+":"+chunkStart+","+chunkEnd;
					updateStart = true;
					updateEnd = true;
				}
			}else{
				query = args.chromosome+":"+chunkStart+","+chunkEnd;
				updateStart = true;
				updateEnd = true;
			}

			if(query){
				var fullURL = this.proxy + this.url + "?segment=" + query;
				console.log("fullURL: "+fullURL);

				$.ajax({
					url: fullURL,
					type: 'GET',
					dataType:"xml",
					error: function(){
						alert("error");
						_this.onError.notify("It is not allowed by Access-Control-Allow-Origin " );
					},

					success: function(data){
						_this.xml =   (new XMLSerializer()).serializeToString(data);
						var xmlStringified =  (new XMLSerializer()).serializeToString(data); //data.childNodes[2].nodeValue;
						var data = xml2json.parser(xmlStringified);

						if(data.dasgff != null){//Some times DAS server does not respond
							var result = new Array();
								
							if (typeof(data.dasgff.gff.segment)  != 'undefined'){
								if (typeof(data.dasgff.gff.segment.feature)  != 'undefined'){	  
									result = data.dasgff.gff.segment.feature;	
								}
								else if (typeof(data.dasgff.gff.segment[0])  != 'undefined'){
									if (data.dasgff.gff.segment[0].feature != null){
										for ( var i = 0; i < data.dasgff.gff.segment.length; i++) {
											for ( var j = 0; j < data.dasgff.gff.segment[i].feature.length; j++) {
												data.dasgff.gff.segment[i].feature[j]["chromosome"] = args.chromosome;
												result.push(data.dasgff.gff.segment[i].feature[j]);
											}
										}
									}
									else{
										result.push([]);
									}
								}
							}
							var region = {chromosome:args.chromosome, start:chunkStart, end:chunkEnd};
							var resource = "das";
							_this.featureCache.putFeaturesByRegion(result, region, resource, dataType);
							console.log(_this.featureCache.cache);
							var items = _this.featureCache.getFeatureChunksByRegion(region);
							if(items != null){
								_this.onGetData.notify({items:items, params:_this.params, cached:false});
							}
						}
					}
				});
			}
		}
	}
};

DasAdapter.prototype.checkUrl = function(){
	var _this = this;
	var fullURL = this.proxy + this.url + "?segment=1:1,1";
	console.log("Checking URL: "+fullURL);

	$.ajax({
		url: fullURL,
		type: 'GET',
		dataType:"xml",
		error: function(){
			alert("error");
			_this.onError.notify("It is not allowed by Access-Control-Allow-Origin " );
		},
		success: function(data){
			_this.xml = (new XMLSerializer()).serializeToString(data);
			_this.onCheckUrl.notify({data:_this.xml});
		}
	});
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

VCFFileWidget.prototype.getTitleName = FileWidget.prototype.getTitleName;
VCFFileWidget.prototype.getFileUpload = FileWidget.prototype.getFileUpload;
VCFFileWidget.prototype.draw = FileWidget.prototype.draw;
VCFFileWidget.prototype.sessionInitiated = FileWidget.prototype.sessionInitiated;
VCFFileWidget.prototype.sessionFinished = FileWidget.prototype.sessionFinished;
VCFFileWidget.prototype.getChartItems = FileWidget.prototype.getChartItems;
VCFFileWidget.prototype._loadChartInfo = FileWidget.prototype._loadChartInfo;

function VCFFileWidget(args){
	if (args == null){
		args = new Object();
	}
	args.title = "VCF";
	args.tags = ["vcf"];
	FileWidget.prototype.constructor.call(this, args);
};

VCFFileWidget.prototype.loadFileFromLocal = function(file){
	var _this = this;
	this.file = file;
	this.adapter = new VCFDataAdapter(new FileDataSource(file),{species:this.viewer.species});
	this.adapter.onLoad.addEventListener(function(sender){
		console.log(_this.adapter.featuresByChromosome);
		_this._loadChartInfo();
	});
	_this.btnOk.enable();
};

VCFFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	this.adapter = new VCFDataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
	this._loadChartInfo();
	this.btnOk.enable();
};


/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GFFFileWidget.prototype.getTitleName = FileWidget.prototype.getTitleName;
GFFFileWidget.prototype.getFileUpload = FileWidget.prototype.getFileUpload;
GFFFileWidget.prototype.draw = FileWidget.prototype.draw;
GFFFileWidget.prototype.sessionInitiated = FileWidget.prototype.sessionInitiated;
GFFFileWidget.prototype.sessionFinished = FileWidget.prototype.sessionFinished;
GFFFileWidget.prototype.getChartItems = FileWidget.prototype.getChartItems;
GFFFileWidget.prototype._loadChartInfo = FileWidget.prototype._loadChartInfo;

function GFFFileWidget(args){
	if (args == null){
		args = new Object();
	}
	this.version = "2";
    if (args.version!= null){
    	this.version = args.version;       
    }
	args.title = "GFF"+this.version;
	args.tags = ["gff"];
	FileWidget.prototype.constructor.call(this, args);
};



GFFFileWidget.prototype.loadFileFromLocal = function(file){
	var _this = this;
	this.file = file;
	
	switch(this.version){
	case "2":
		this.adapter = new GFF2DataAdapter(new FileDataSource(file),{species:this.viewer.species});
		break;
	case "3":
		this.adapter = new GFF3DataAdapter(new FileDataSource(file),{species:this.viewer.species});
		break;
	default :
		this.adapter = new GFF2DataAdapter(new FileDataSource(file),{species:this.viewer.species});
		break;
	}
	
	this.adapter.onLoad.addEventListener(function(sender){
		_this._loadChartInfo();
	});
	_this.btnOk.enable();
};


GFFFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	switch(this.version){
	case "2":
		this.adapter = new GFF2DataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
		break;
	case "3":
		this.adapter = new GFF3DataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
		break;
	default :
		this.adapter = new GFF2DataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
		break;
	}
	
	this._loadChartInfo();
	this.btnOk.enable();
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GTFFileWidget.prototype.getTitleName = FileWidget.prototype.getTitleName;
GTFFileWidget.prototype.getFileUpload = FileWidget.prototype.getFileUpload;
GTFFileWidget.prototype.draw = FileWidget.prototype.draw;
GTFFileWidget.prototype.sessionInitiated = FileWidget.prototype.sessionInitiated;
GTFFileWidget.prototype.sessionFinished = FileWidget.prototype.sessionFinished;
GTFFileWidget.prototype.getChartItems = FileWidget.prototype.getChartItems;
GTFFileWidget.prototype._loadChartInfo = FileWidget.prototype._loadChartInfo;

function GTFFileWidget(args){
	if (args == null){
		args = new Object();
	}
	args.title = "GTF";
	args.tags = ["gtf"];
	FileWidget.prototype.constructor.call(this, args);
	
};

GTFFileWidget.prototype.loadFileFromLocal = function(file){
	var _this = this;
	this.file = file;
	this.adapter = new GTFDataAdapter(new FileDataSource(file),{species:this.viewer.species});
	this.adapter.onLoad.addEventListener(function(sender){
		console.log(_this.adapter.featuresByChromosome);
		_this._loadChartInfo();
	});
	_this.btnOk.enable();
};


GTFFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	this.adapter = new GTFDataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
	this._loadChartInfo();
	this.btnOk.enable();
};


/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

BEDFileWidget.prototype.getTitleName = FileWidget.prototype.getTitleName;
BEDFileWidget.prototype.getFileUpload = FileWidget.prototype.getFileUpload;
BEDFileWidget.prototype.draw = FileWidget.prototype.draw;
BEDFileWidget.prototype.sessionInitiated = FileWidget.prototype.sessionInitiated;
BEDFileWidget.prototype.sessionFinished = FileWidget.prototype.sessionFinished;
BEDFileWidget.prototype.getChartItems = FileWidget.prototype.getChartItems;
BEDFileWidget.prototype._loadChartInfo = FileWidget.prototype._loadChartInfo;

function BEDFileWidget(args){
	if (args == null){
		args = new Object();
	}
	args.title = "BED";
	args.tags = ["bed"];
	FileWidget.prototype.constructor.call(this, args);
	
};


BEDFileWidget.prototype.loadFileFromLocal = function(file){
	var _this = this;
	this.file = file;
	this.adapter = new BEDDataAdapter(new FileDataSource(file),{species:this.viewer.species});
	this.adapter.onLoad.addEventListener(function(sender){
		_this._loadChartInfo();
	});
	_this.btnOk.enable();
};


BEDFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	this.adapter = new BEDDataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
	this._loadChartInfo();
	this.btnOk.enable();
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function SequenceAdapter(args){
	this.host = null;
	this.gzip = true;
	
	this.params={};
	if (args != null){
		if(args.host != null){
			this.host = args.host;
		}
		if(args.species != null){
			this.species = args.species;
		}
		if(args.category != null){
			this.category = args.category;
		}
		if(args.subCategory != null){
			this.subCategory = args.subCategory;
		}
		if(args.resource != null){
			this.resource = args.resource;
		}
		if(args.featureCache != null){
			var argsFeatureCache = args.featureCache;
		}
		if(args.params != null){
			this.params = args.params;
		}
	}
	this.onGetData = new Event();
	this.sequence = {};
	this.phastCons = {};
	this.phylop = {};
	this.start = {};
	this.end = {};
}

SequenceAdapter.prototype.clearData = function(){
	this.sequence = {};
	this.start = {};
	this.end = {};
};

SequenceAdapter.prototype.getData = function(args){
	var _this = this;
	this.sender = args.sender;
	var chromosome = args.chromosome;

	if(args.start<1){
		args.start=1;
	}
    if(args.end<1){
        args.end=1;
    }
	if(args.end>300000000){
		args.end=300000000;
	}

	//clean when the new position is too far from current
	if(args.start<this.start[chromosome]-5000 || args.end > this.end[chromosome]+5000){
		this.clearData();
	}
	
	//region check
	this.params["histogram"] = args.histogram;
	this.params["interval"] = args.interval;
	this.params["transcript"] = args.transcript;
	this.params["chromosome"] = args.chromosome;
	this.params["resource"] = this.resource;

	

	//console.log("--------------------------------------------------------------------"+this.start[chromosome]+" "+this.end[chromosome]);
	//console.log("--------------------------------------------------------------------"+args.start+" "+args.end);

	var queryString = this._getSequenceQuery(args);

	if(queryString != ""){
		var cellBaseManager = new CellBaseManager(this.species,{host: this.host});
//
		cellBaseManager.success.addEventListener(function(sender,data){
			_this._processSequenceQuery(data,true);
		});
	
		cellBaseManager.get(this.category, this.subCategory, queryString, this.resource, this.params);
	}else{
		if(this.sender != "onMove"){
			this.onGetData.notify({
                items:{
                    sequence:this.sequence[chromosome],
                    phastCons:this.phastCons[chromosome],
                    phylop:this.phylop[chromosome],
                    start:this.start[chromosome],
                    end:this.end[chromosome]
                },
                params:this.params
            });
		}
	}
	
};

SequenceAdapter.prototype._getSequenceQuery = function(args){
	var _this = this;
	var chromosome = args.chromosome;
	
	var s,e, query, querys = [];
	if(_this.start[chromosome]==null && _this.end[chromosome]==null){
			//args.start -= 100;
			//args.end += 100;
			_this.start[chromosome] = args.start;
			_this.end[chromosome] = args.end;
			s = args.start;
			e = args.end;
			query = chromosome+":"+s+"-"+e;
			querys.push(query);
	}else{
		if(args.start <= _this.start[chromosome]){
			s = args.start;
			e = _this.start[chromosome]-1;
            e = (e<1) ? args.end=1 : e ;
			_this.start[chromosome] = s;
			query = args.chromosome+":"+s+"-"+e;
			querys.push(query);
		}
		if(args.end >= _this.end[chromosome]){
			e = args.end;
			s = _this.end[chromosome]+1;
			_this.end[chromosome] = e;
			query = args.chromosome+":"+s+"-"+e;
			querys.push(query);
		}
	}
	
	//console.log("--------------------------------------------------------------------"+s+" "+e);
	//console.log("--------------------------------------------------------------------"+this.start[args.chromosome]+" "+this.end[args.chromosome]);
	
	return querys.toString();
};

SequenceAdapter.prototype._processSequenceQuery = function(data, throwNotify){
	var _this = this;
	var seqResponse = data.result;
	var params = data.params;
	var chromosome = data.params.chromosome;

	for(var i = 0; i < seqResponse.length; i++){
		var splitDots = data.query[i].split(":");
		var splitDash = splitDots[1].split("-");
		var queryStart = parseInt(splitDash[0]);
		var queryEnd = parseInt(splitDash[1]);
		
		if(this.sequence[chromosome] == null){
			this.sequence[chromosome] = seqResponse[i].sequence;
//			this.phastCons[chromosome] = seqResponse[i].phastCons;
//			this.phylop[chromosome] = seqResponse[i].phylop;
		}else{
			if(queryStart == this.start[chromosome]){
				this.sequence[chromosome] = seqResponse[i].sequence + this.sequence[chromosome];
//				this.phastCons[chromosome] = seqResponse[i].phastCons.concat(this.phastCons[chromosome]);
//				this.phylop[chromosome] = seqResponse[i].phylop.concat(this.phylop[chromosome]);
			}else{
				this.sequence[chromosome] = this.sequence[chromosome] + seqResponse[i].sequence;
//				this.phastCons[chromosome] = this.phastCons[chromosome].concat(seqResponse[i].phastCons);
//				this.phylop[chromosome] = this.phylop[chromosome].concat(seqResponse[i].phylop);
			}
		}
		if(this.sender == "onMove" && throwNotify == true){
			this.onGetData.notify({
                items:{
                    sequence:seqResponse[i].sequence,
                    phastCons:seqResponse[i].phastCons,
                    phylop:seqResponse[i].phylop,
                    start:queryStart,
                    end:queryEnd
                },
                params:params
            });
		}
	}
	//if not onMove the svg was cleared so all sequence is sent to redraw
	if(this.sender != "onMove" && throwNotify == true){
		this.onGetData.notify({
            items:{
                sequence:this.sequence[chromosome],
                phastCons:this.phastCons[chromosome],
                phylop:this.phylop[chromosome],
                start:this.start[chromosome],
                end:this.end[chromosome]
            },
            params:params
        });
	}
};

// DEPRECATED Used by bam to get the mutations
//SequenceAdapter.prototype.getDiffString = function(args){
	//var _this=this;
	//var queryString = this._getSequenceQuery(args);
	//var chromosome = args.chromosome;
	//
	//if(queryString != ""){
		//var cellBaseManager = new CellBaseManager(this.species,{host: this.host, async:false});
		//var data = cellBaseManager.get(this.category, this.subCategory, queryString, this.resource, this.params);
		//_this._processSequenceQuery(data);
	//}
		///*now the needed sequence is on the cache*/
		//
	//var referenceSubStr = this.sequence[chromosome].substr(args.start-this.start[chromosome],args.read.length);
//
	//resultStr = "";
	//for(var i = 0; i < args.read.length; i++){
		//if(args.read.charAt(i) == referenceSubStr.charAt(i)){
			//resultStr+=" ";
		//}else{
			//resultStr+=args.read.charAt(i);
		//}
	//}
	//return resultStr;
//};

//Used by bam to get the mutations
SequenceAdapter.prototype.getNucleotidByPosition = function(args){
	var _this=this;
    if(args.start > 0 && args.end>0){
        var queryString = this._getSequenceQuery(args);

        var chromosome = args.chromosome;

        if(queryString != ""){
            var cellBaseManager = new CellBaseManager(this.species,{host: this.host, async:false});
            var data = cellBaseManager.get(this.category, this.subCategory, queryString, this.resource, this.params);
            _this._processSequenceQuery(data);
        }
        if(this.sequence[chromosome] != null){
            var referenceSubStr = this.sequence[chromosome].substr((args.start-this.start[chromosome]),1);
            return referenceSubStr;
        }else{
            console.log("SequenceRender: this.sequence[chromosome] is undefined");
            return "";
        }
    }
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function Region(args) {

    this.start = null;
    this.end = null;
    this.chromosome = null;

    if (typeof args != 'undefined') {
        this.start = args.start || this.start;
        this.end = args.end || this.end;
        this.chromosome = args.chromosome || this.chromosome;

        if (args.str != null) {
            this.parse(args.str);
        }
    }
}

Region.prototype = {
    parse : function (str) {
        var splitDots = str.split(":");
        if (splitDots.length == 2) {
            var splitDash = splitDots[1].split("-");
            this.chromosome = splitDots[0];
            this.start = parseInt(splitDash[0]);
            if (splitDash.length == 2) {
                this.end = parseInt(splitDash[1]);
            } else {
                this.end = this.start;
            }
        }
    },
    load : function (obj) {
        this.start = obj.start;
        this.end = obj.end;
        this.chromosome = obj.chromosome;
    },
    center : function () {
        return this.start + Math.floor((this.length()) / 2);
    },

    length : function () {
        return this.end - this.start + 1;
    },
    toString : function (formated) {
        var str;
        if (formated == true) {
            str = this.chromosome + ":" + Utils.formatNumber(this.start) + "-" + Utils.formatNumber(this.end);
        } else {
            str = this.chromosome + ":" + this.start + "-" + this.end;
        }
        return str;
    }
};



/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function OpencgaManager(host){

    this.host = host || this.host;
    //deprecated
    //this.host = "http://bioinfo.cipf.es/dqs-naranjoma-ws/rest";
    //if(window.location.host.indexOf("ralonso")!=-1){
    //this.host = "http://ralonso:8080/dqs-naranjoma-ws/rest";
    //}

    /** Events **/
    /*ACCOUNT*/
    this.onGetAccountInfo = new Event(this);
    this.onLogin = new Event(this);
    this.onCreateAccount = new Event(this);
    this.onResetPassword = new Event(this);
    this.onChangePassword = new Event(this);
    this.onChangeEmail = new Event(this);
    this.onLogout = new Event(this);

    /*Bucket*/
    this.onCreateBucket = new Event(this);
    this.onRefreshBucket = new Event(this);
    this.onRenameBucket = new Event(this);
    this.onUploadObjectToBucket = new Event(this);
    this.onDeleteObjectFromBucket = new Event(this);
    this.onCreateDirectory = new Event(this);

    /*Jobs*/
    this.onJobStatus = new Event(this);
    this.onJobResult = new Event(this);
    this.onTable = new Event(this);
    this.onPoll = new Event(this);
    this.onDeleteJob = new Event(this);

    /*ANALYSIS*/
    this.onRunAnalysis = new Event(this);
    this.onIndexer = new Event(this);
    this.onIndexerStatus = new Event(this);

    /*BAM*/
    this.onBamList = new Event(this);
    this.onGetAccountInfo = new Event(this);
    this.onRegion = new Event(this);


    this.onLocalFileList = new Event(this);

    this.onError = new Event(this);
}

OpencgaManager.prototype = {
    host : OPENCGA_HOST,
    getHost : function(){
        return this.host;
    },
    setHost : function(hostUrl){
        this.host = hostUrl;
    },
    doGet : function (url, successCallback, errorCallback){
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: successCallback,
            error: errorCallback
        });
    },
    doPost : function (url, formData, successCallback, errorCallback){
        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: successCallback,
            error: errorCallback
        });
    },
    getQuery : function(paramsWS){
        var query = "";
        for ( var key in paramsWS) {
            if(paramsWS[key]!=null)
                query+=key+'='+paramsWS[key]+'&';
        }
        if(query!='')
            query = "?"+query.slice(0,-1);
        return query;
    },


    getAccountUrl : function(accountId){
        return this.getHost()+'/account/'+accountId;
    },
    getStorageUrl : function(accountId){
        return this.getAccountUrl(accountId)+'/storage';
    },
    getAdminProfileUrl : function(accountId){
        return this.getAccountUrl(accountId)+'/admin/profile';
    },
    getAdminBucketUrl : function(accountId,bucketId){
        return this.getAccountUrl(accountId)+'/admin/bucket/'+bucketId;
    },
    getAdminProjectUrl : function(accountId,projectId){
        return this.getAccountUrl(accountId)+'/admin/project/'+projectId;
    },
    getBucketUrl : function(accountId, bucketId){
        return this.getStorageUrl(accountId)+'/'+bucketId;
    },
    getObjectUrl : function(accountId, bucketId, objectId){
        return this.getStorageUrl(accountId)+'/'+bucketId+'/'+objectId;
    },
    getAnalysisUrl : function(accountId, analysis){
        return this.getAccountUrl(accountId)+'/analysis/'+analysis;
    },
    getJobAnalysisUrl : function(accountId, jobId){
        return this.getAccountUrl(accountId)+'/analysis/job/'+jobId;
    },
    /*ACCOUNT METHODS*/
    createAccount : function (accountId, email, name, password, suiteId){
        var _this = this;
        var queryParams = {
            'name':name,
            'email':email,
            'password':password,
            'suiteid':suiteId
        };
        var url =  this.getAccountUrl(accountId)+'/create'+this.getQuery(queryParams);
        function success(data){
            _this.onCreateAccount.notify(data);
        }
        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    login : function(accountId, password, suiteId){
        var _this=this;
        var queryParams = {
            'password':password,
            'suiteid':suiteId
        };
        var url =  this.getAccountUrl(accountId)+'/login'+this.getQuery(queryParams);
        function success(data){
            if(data.indexOf("ERROR") == -1){
                _this.onLogin.notify(JSON.parse(data));
            }else{
                _this.onLogin.notify({errorMessage:data});
            }
        }
        function error(data){
            console.log("ERROR: " + data);
        }
        this.doGet(url, success, error);
    },
    logout : function(accountId, sessionId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getAccountUrl(accountId)+'/logout'+this.getQuery(queryParams);
        function success(data){
            _this.onLogout.notify(data);
        }

        function error(data){
            $.cookie('bioinfo_sid', null);
            $.cookie('bioinfo_sid', null, {path: '/'});
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    getAccountInfo : function(accountId, sessionId, lastActivity){
        console.log(lastActivity)
        var _this=this;
        var queryParams = {
            'last_activity':lastActivity,
            'sessionid':sessionId
        };
        var url =  this.getAccountUrl(accountId)+'/info'+this.getQuery(queryParams);
        function success(data){
            if(data.indexOf("ERROR") == -1){
                _this.onGetAccountInfo.notify(JSON.parse(data));
            }else{
                console.log(data);
            }
        }
        function error(data){
            console.log("ERROR: " + data);
            console.log(data);
        }
        this.doGet(url, success, error);
//        console.log(url);
    },
    changePassword : function(accountId, sessionId, old_password, new_password1, new_password2){
        var _this=this;
        var queryParams = {
            'old_password':old_password,
            'new_password1':new_password1,
            'new_password2':new_password2,
            'sessionid':sessionId
        };
        var url =  this.getAdminProfileUrl(accountId)+'/change_password'+this.getQuery(queryParams);
        function success(data){
            _this.onChangePassword.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    resetPassword : function(accountId, email){
        var _this=this;
        var queryParams = {
            'email':email
        };
        var url =  this.getAdminProfileUrl(accountId)+'/reset_password'+this.getQuery(queryParams);
        function success(data){
            _this.onResetPassword.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    changeEmail : function(accountId, sessionId, new_email){
        var _this=this;
        var queryParams = {
            'new_email':new_email,
            'sessionid':sessionId
        };
        var url =  this.getAdminProfileUrl(accountId)+'/change_email'+this.getQuery(queryParams);
        function success(data){
            _this.onChangeEmail.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },

    /* BUCKET METHODS */
    getBuckets : function(){
        return 'TODO';
    },

    createBucket : function(bucketId, description, accountId, sessionId){
        var _this=this;
        var queryParams = {
            'description':description,
            'sessionid':sessionId
        };
        var url =  this.getAdminBucketUrl(accountId,bucketId)+'/create'+this.getQuery(queryParams);
        function success(data){
            _this.onCreateBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },

    refreshBucket : function(accountId, bucketId, sessionId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getAdminBucketUrl(accountId,bucketId)+'/refresh'+this.getQuery(queryParams);
        function success(data){
            _this.onRefreshBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        console.log(url);
    },

    renameBucket : function(accountId, bucketId, newBucketId, sessionId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getAdminBucketUrl(accountId,bucketId)+'/rename/'+newBucketId+this.getQuery(queryParams);
        function success(data){
            _this.onRenameBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        console.log(url);
    },
    deleteBucket : 'TODO',
    shareBucket : 'TODO',

    uploadObjectToBucket : function(accountId, sessionId, bucketId, objectId, formData, parents){
        var _this=this;
        var queryParams = {
            'parents':(parents || false),
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/upload'+this.getQuery(queryParams);

        function success(data){
            console.log(data);
            _this.onUploadObjectToBucket.notify({status:"done",data:data});
        }

        function error(data){
            _this.onUploadObjectToBucket.notify({status:"fail",data:data});
        }

        this.doPost(url, formData, success, error);
        //	console.log(url);
    },
    createDirectory : function(accountId, sessionId, bucketId, objectId, parents){
        objectId = objectId.replace(new RegExp("/", "gi"),":");
        var _this=this;
        var queryParams = {
            'parents':(parents || false),
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/create_directory'+this.getQuery(queryParams);
        function success(data){
            console.log(data);
            _this.onCreateDirectory.notify(data);
        }
        function error(data){
            console.log("ERROR: " + data);
        }
        this.doGet(url, success, error);
    },
    deleteObjectFromBucket : function(accountId, sessionId, bucketId, objectId){
        objectId = objectId.replace(new RegExp("/", "gi"),":");
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/delete'+this.getQuery(queryParams);

        function success(data){
            console.log(data);
            _this.onDeleteObjectFromBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    region : function(accountId, sessionId, bucketId, objectId, region, queryParams){
        objectId = objectId.replace(new RegExp("/", "gi"),":");
        var _this=this;
        queryParams["sessionid"] = sessionId;
        queryParams["region"] = region;
        queryParams["cellbasehost"] = CELLBASE_HOST+'/'+CELLBASE_VERSION;

        if(this.host.indexOf("localhost")!=-1){
            queryParams["region"] = region;
            queryParams["filepath"] = objectId;
            var url =  this.host+'/storage/fetch'+this.getQuery(queryParams);
        }else{
            var url = this.getObjectUrl(accountId,bucketId,objectId)+'/fetch'+this.getQuery(queryParams);
        }


        function success(data){
            if(!(data.substr(0,5).indexOf('ERROR') != -1)){
                _this.onRegion.notify({resource:queryParams["category"],result:JSON.parse(data),filename:objectId,query:region,params:queryParams});
            }
        }

        function error(data){
            console.log("ERROR: " + data);
            console.log(data);
        }

        this.doGet(url, success, error);
        console.log(url);
    },

    /* JOB METHODS */
    jobResult : function(accountId, sessionId, jobId, format){
        var _this=this;
        //@Path("/{accountid}/{bucketname}/job/{jobid}/result.{format}")
        var queryParams = {
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/result.js'+this.getQuery(queryParams);
        //var url = this.getHost() + '/job/'+jobId+'/result.'+format+'?incvisites=true&sessionid='+sessionId;
        function success(data){
            _this.onJobResult.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        	console.log(url);
    },
    jobResultUrl : function(accountId, sessionId, jobId, format){
        var queryParams = {
            'sessionid':sessionId
        };
        return this.getJobAnalysisUrl(accountId,jobId)+'/result.js'+this.getQuery(queryParams);
    },
    jobStatus : function(accountId, sessionId,  jobId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/status'+this.getQuery(queryParams);
        function success(data){
            _this.onJobStatus.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        	console.log(url);
    },

    table : function(accountId, sessionId, jobId, filename, colNames, colVisibility){
        var _this=this;
        var queryParams = {
            'filename':filename,
            'colNames':colNames,
            'colVisibility':colVisibility,
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/table'+this.getQuery(queryParams);
        function success(data){
            _this.onTable.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },

    tableurl : function(accountId, sessionId, jobId, filename, colNames, colVisibility){
        var queryParams = {
            'filename':filename,
            'colNames':colNames,
            'colVisibility':colVisibility,
            'sessionid':sessionId
        };
        return this.getJobAnalysisUrl(accountId,jobId)+'/table'+this.getQuery(queryParams);
    },

    poll : function(accountId, sessionId, jobId, filename, zip){
        var _this=this;
        var queryParams = {
            'filename':filename,
            'sessionid':sessionId
        };
        var url;
        if(zip==true){
            url = this.getJobAnalysisUrl(accountId,jobId)+'/poll'+this.getQuery(queryParams);
            open(url);
        }else{
            queryParams['zip']=false;
            url = this.getJobAnalysisUrl(accountId,jobId)+'/poll'+this.getQuery(queryParams);
            function success(data){
                _this.onPoll.notify(data);
            }
            function error(data){
                console.log("ERROR: " + data);
            }
            this.doGet(url, success, error);
        }
        //	console.log(url);
    },

    pollurl : function(accountId, sessionId, jobId, filename){
        var queryParams = {
            'filename':filename,
            'sessionid':sessionId,
            'zip':false
        };
        return this.getJobAnalysisUrl(accountId,jobId)+'/poll'+this.getQuery(queryParams);
        //debugger
    },

    deleteJob : function(accountId, sessionId, jobId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/delete'+this.getQuery(queryParams);
        function success(data){
            _this.onDeleteJob.notify(data);
        }
        function error(data){
            console.log("ERROR: " + data);
        }
        this.doGet(url, success, error);
        //	console.log(url);
    },

    downloadJob : function(accountId, sessionId, jobId){
        var queryParams = {
            'sessionid':sessionId
        };
        open(this.getJobAnalysisUrl(accountId,jobId)+'/download'+this.getQuery(queryParams));
    },



    /* ANALYSIS */
    runAnalysis : function(analysis, paramsWS){
        var _this=this;
        var accountId = paramsWS.accountid;
        var queryParams = {
//            'projectId':'default'
        };
        var url = this.getAnalysisUrl(accountId, analysis)+'/run'+this.getQuery(queryParams);
        console.log(url);
        console.log(paramsWS);

        function success(data){
            _this.onRunAnalysis.notify({status:"done",data:data});
        }

        function error(data){
            _this.onRunAnalysis.notify({status:"fail",data:data});
        }

        $.ajax({type:"POST", url:url, data:paramsWS, success:success, error:error});
    },
    indexer : function(accountId, sessionId, bucketId, objectId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/index'+this.getQuery(queryParams);
        console.log(url);

        function success(data){
            _this.onIndexer.notify(data);
        }

        function error(data){
            _this.onIndexer.notify(data);
        }
        this.doGet(url, success, error);
    },
    indexerStatus : function(accountId, sessionId, bucketId, objectId, indexerId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId,
            'indexerid':indexerId
        };
        var url = this.getObjectUrl(accountId,bucketId,objectId)+'/index_status'+this.getQuery(queryParams);
        console.log(url);

        function success(data){
            _this.onIndexerStatus.notify(data);
        }
        function error(data){
            _this.onIndexerStatus.notify(data);
        }
        this.doGet(url, success, error);
    },

    localFileList : function(){
        var _this=this;

        var url = this.host+'/getdirs';
        console.log(url);

        function success(data){
            _this.onLocalFileList.notify(data);
        }

        function error(data){
            _this.onLocalFileList.notify(data);
        }
        this.doGet(url, success, error);
    }
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function OpencgaAdapter(args){
	this.host = null;
	this.gzip = true;
	
	this.params={};
	if (args != null){
		if(args.host != null){
			this.host = args.host;
		}
		if(args.category != null){
			this.category = args.category;
		}
		if(args.resource != null){
			this.resource = args.resource;
		}
		if(args.featureCache != null){
			var argsFeatureCache = args.featureCache;
		}
		if(args.params != null){
			this.params = args.params;
		}
	}
	this.featureCache =  new FeatureCache(argsFeatureCache);
	this.onGetData = new Event();
}

OpencgaAdapter.prototype.getData = function(args){
	var _this = this;
	//region check
	
	this.params["histogram"] = args.histogram;
    this.params["histogramLogarithm"] = args.histogramLogarithm;
    this.params["histogramMax"] = args.histogramMax;
	this.params["interval"] = args.interval;
	this.params["transcript"] = args.transcript;
	
	
	if(args.start<1){
		args.start=1;
	}
	if(args.end>300000000){
		args.end=300000000;
	}
	
	var type = "data";
	if(args.histogram){
		type = "histogram"+args.interval;
	}
	
	var firstChunk = this.featureCache._getChunk(args.start);
	var lastChunk = this.featureCache._getChunk(args.end);

	var chunks = [];
	var itemList = [];
	for(var i=firstChunk; i<=lastChunk; i++){
		var key = args.chromosome+":"+i;
		if(this.featureCache.cache[key] == null || this.featureCache.cache[key][type] == null) {
			chunks.push(i);
		}else{
			var items = this.featureCache.getFeatureChunk(key, type);
			itemList = itemList.concat(items);
		}
	}
////	//notify all chunks
//	if(itemList.length>0){
//		this.onGetData.notify({data:itemList, params:this.params, cached:true});
//	}
	
	
	//CellBase data process
	var opencgaManager = new OpencgaManager(this.host);
	var calls = 0;
	var querys = [];
	opencgaManager.onRegion.addEventListener(function (evt, data){
		console.timeEnd("dqs");
		console.time("dqs-cache");
		var type = "data";
		if(data.params.histogram){
			type = "histogram"+data.params.interval;
		}
        _this.params["dataType"] = type;

		var splitDots = data.query.split(":");
		var splitDash = splitDots[1].split("-");
		var query = {chromosome:splitDots[0],start:splitDash[0],end:splitDash[1]};

        //check if features contains positon or start-end
        if(data.result[0] != null && data.result[0]['position'] != null){
            for(var i = 0; i < data.result.length; i++) {
                data.result[i]['start'] = data.result[i].position;
                data.result[i]['end'] =  data.result[i].position;
            }
        }

		_this.featureCache.putFeaturesByRegion(data.result, query, _this.category, type);
		var items = _this.featureCache.getFeatureChunksByRegion(query, type);
		console.timeEnd("dqs-cache");
		if(items != null){
			itemList = itemList.concat(items);
		}
		if(calls == querys.length ){
			_this.onGetData.notify({items:itemList, params:_this.params, cached:false});
		}
	});

	var updateStart = true;
	var updateEnd = true;
	if(chunks.length > 0){
//		console.log(chunks);
		
		for ( var i = 0; i < chunks.length; i++) {
			
			if(updateStart){
				var chunkStart = parseInt(chunks[i] * this.featureCache.chunkSize);
				updateStart = false;
			}
			if(updateEnd){
				var chunkEnd = parseInt((chunks[i] * this.featureCache.chunkSize) + this.featureCache.chunkSize-1);
				updateEnd = false;
			}
			
			if(chunks[i+1]!=null){
				if(chunks[i]+1==chunks[i+1]){
					updateEnd =true;
				}else{
					var query = args.chromosome+":"+chunkStart+"-"+chunkEnd;
					querys.push(query);
					updateStart = true;
					updateEnd = true;
				}
			}else{
				var query = args.chromosome+":"+chunkStart+"-"+chunkEnd;
				
				querys.push(query);
				updateStart = true;
				updateEnd = true;
			}
		}
//		console.log(querys)
		for ( var i = 0, li = querys.length; i < li; i++) {
			console.time("dqs");
			calls++;
//			opencgaManager.region(this.category, this.resource, querys[i], this.params);
            opencgaManager.region($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"),this.resource.bucketId, this.resource.id, querys[i], this.params);
		}
	}else{
		if(itemList.length > 0){
			this.onGetData.notify({items:itemList, params:this.params});
		}
	}
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

BamCache.prototype.putHistogramFeaturesByRegion = FeatureCache.prototype.putFeaturesByRegion;

function BamCache(args) {
	this.args = args;
	this.id = Math.round(Math.random() * 10000000); // internal id for this class

	this.chunkSize = 50000;
	this.gzip = true;
	this.maxSize = 10*1024*1024;
	this.size = 0;
	
	if (args != null){
		if(args.chunkSize != null){
			this.chunkSize = args.chunkSize;
		}
		if(args.gzip != null){
			this.gzip = args.gzip;
		}
	}
	
	this.cache = {};

	//deprecated trackSvg has this object now
	//this.chunksDisplayed = {};
	
	this.maxFeaturesInterval = 0;//for local histogram
	
	//XXX
	this.gzip = false;
};

BamCache.prototype._getChunk = function(position){
	return Math.floor(position/this.chunkSize);
};

//new 
BamCache.prototype.getFeatureChunk = function(key){
	if(this.cache[key] != null) {
		return this.cache[key];
	}
	return null;
};
//new
BamCache.prototype.getFeatureChunksByRegion = function(region){
	var firstRegionChunk, lastRegionChunk,  chunks = [], key;
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	for(var i=firstRegionChunk; i<=lastRegionChunk; i++){
		key = region.chromosome+":"+i;
		// check if this key exists in cache (features from files)
		if(this.cache[key] != null ){
			chunks.push(this.cache[key]);
		}
		
	}
	//if(chunks.length == 0){
		//return null;
	//}
	return chunks;
};



BamCache.prototype.putFeaturesByRegion = function(resultObj, region, featureType, dataType){
	var key, firstChunk, lastChunk, firstRegionChunk, lastRegionChunk, read, gzipRead;
	var reads = resultObj.reads;
	var coverage = resultObj.coverage;
	
	//initialize region
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	
	var chunkIndex = 0;
	console.time("BamCache.prototype.putFeaturesByRegion1")
	//TODO the region for now is a chunk region, so this for is always 1 loop
	for(var i=firstRegionChunk, c=0; i<=lastRegionChunk; i++, c++){
		key = region.chromosome+":"+i;
		if(this.cache[key]==null || this.cache[key][dataType] == null){
			this.cache[key] = {};
			this.cache[key][dataType] = [];
			this.cache[key].key = key;
			this.cache[key].start = parseInt(region.start)+(c*this.chunkSize);
			this.cache[key].end = parseInt(region.start)+((c+1)*this.chunkSize)-1;
		}
        if(dataType === 'data'){
            //divide the coverage array in multiple arrays of chunksize length
    //		var chunkCoverage = coverage.slice(chunkIndex,chunkIndex+this.chunkSize);
            var chunkCoverageAll = coverage.all.slice(chunkIndex,chunkIndex+this.chunkSize);
            var chunkCoverageA = coverage.a.slice(chunkIndex,chunkIndex+this.chunkSize);
            var chunkCoverageC = coverage.c.slice(chunkIndex,chunkIndex+this.chunkSize);
            var chunkCoverageG = coverage.g.slice(chunkIndex,chunkIndex+this.chunkSize);
            var chunkCoverageT = coverage.t.slice(chunkIndex,chunkIndex+this.chunkSize);
            var chunkCoverage = {
                "all":chunkCoverageAll,
                "a":chunkCoverageA,
                "c":chunkCoverageC,
                "g":chunkCoverageG,
                "t":chunkCoverageT
            };
        }

		if(this.gzip) {
			this.cache[key]["coverage"]=RawDeflate.deflate(JSON.stringify(chunkCoverage));
		}else{
			this.cache[key]["coverage"]=chunkCoverage;
		}
		chunkIndex+=this.chunkSize;
	}
	console.timeEnd("BamCache.prototype.putFeaturesByRegion1")
	console.time("BamCache.prototype.putFeaturesByRegion")
	var ssss = 0;


    if(dataType === 'data'){
        for(var index = 0, len = reads.length; index<len; index++) {
            read = reads[index];
            read.featureType = 'bam';
            firstChunk = this._getChunk(read.start);
            lastChunk = this._getChunk(read.end == 0?read.end=-1:read.end);//0 is not a position, i set to -1 to avoid enter in for
    //		Some reads has end = 0. So will not be drawn IGV does not draw those reads

            if(this.gzip) {
                gzipRead = RawDeflate.deflate(JSON.stringify(read));
                //ssss+= gzipRead.length;
            }else{
                gzipRead = read;
                //ssss+= JSON.stringify(gzipRead).length;
            }

            for(var i=firstChunk, c=0; i<=lastChunk; i++, c++) {
                if(i >= firstRegionChunk && i<= lastRegionChunk){//only if is inside the called region
                    key = read.chromosome+":"+i;
//                    if(this.cache[key].start==null){
//                        this.cache[key].start = parseInt(region.start)+(c*this.chunkSize);
//                    }
//                    if(this.cache[key].end==null){
//                        this.cache[key].end = parseInt(region.start)+((c+1)*this.chunkSize)-1;
//                    }
//                    if(this.cache[key][dataType] != null){
//                        this.cache[key][dataType] = [];
                        this.cache[key][dataType].push(gzipRead);
//                    }

                }
            }
        }
    }


	console.timeEnd("BamCache.prototype.putFeaturesByRegion");
	console.log("BamCache.prototype.putFeaturesByRegion"+ssss)
};

BamCache.prototype.clear = function(){
	this.size = 0;		
	this.cache = {};
	console.log("bamCache cleared")
};

/*
BamCache.prototype.getFeaturesByChunk = function(key, dataType){
	var features =  [];
	var feature, firstChunk, lastChunk, chunk;
	var chr = key.split(":")[0], chunkId = key.split(":")[1];
	var region = {chromosome:chr,start:chunkId*this.chunkSize,end:chunkId*this.chunkSize+this.chunkSize-1};
	
	if(this.cache[key] != null && this.cache[key][dataType] != null) {
		if(this.gzip) {
			coverage = JSON.parse(RawDeflate.inflate(this.cache[key]["coverage"]));
		}else{
			coverage = this.cache[key]["coverage"];
		}
		
		for ( var i = 0, len = this.cache[key]["data"].length; i < len; i++) {
			if(this.gzip) {
				feature = JSON.parse(RawDeflate.inflate(this.cache[key]["data"][i]));
			}else{
				feature = this.cache[key]["data"][i];
			}
			
			//check if any feature chunk has been already displayed 
			var displayed = false;
			firstChunk = this._getChunk(feature.start);
			lastChunk = this._getChunk(feature.end);
			for(var f=firstChunk; f<=lastChunk; f++){
				var fkey = feature.chromosome+":"+f;
				if(this.chunksDisplayed[fkey+dataType]==true){
					displayed = true;
					break;
				}
			}
			
			if(!displayed){
				features.push(feature);
				returnNull = false;
			}
		}
		this.chunksDisplayed[key+dataType]=true;
		chunk = {reads:features,coverage:coverage,region:region};
		return chunk;
	}
	
};

BamCache.prototype.getFeaturesByRegion = function(region, dataType){
	var firstRegionChunk, lastRegionChunk, firstChunk, lastChunk, chunks = [], feature, key, coverage, features = [], displayed;
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	for(var i=firstRegionChunk; i<=lastRegionChunk; i++){
		key = region.chromosome+":"+i;
		if(this.cache[key] != null){
			if(this.gzip) {
				coverage = JSON.parse(RawDeflate.inflate(this.cache[key]["coverage"]));
			}else{
				coverage = this.cache[key]["coverage"];
			}

			for ( var j = 0, len = this.cache[key]["data"].length; j < len; j++) {
				if(this.gzip) {
					feature = JSON.parse(RawDeflate.inflate(this.cache[key]["data"][j]));
				}else{
					feature = this.cache[key]["data"][j];
				}
				
				
//				check if any feature chunk has been already displayed 
				displayed = false;
				firstChunk = this._getChunk(feature.start);
				lastChunk = this._getChunk(feature.end);
				for(var f=firstChunk; f<=lastChunk; f++){
					var fkey = region.chromosome+":"+f;
					if(this.chunksDisplayed[fkey+dataType]==true){
						displayed = true;
						break;
					}
				}
				
				if(!displayed){
					features.push(feature);
				}
				
			}
		}
		this.chunksDisplayed[key+dataType]=true;//mark chunk as displayed
		chunks.push({reads:features,coverage:coverage,region:region});
	}
	return chunks;
};
*/



//BamCache.prototype.remove = function(region){
//	var firstChunk = this._getChunk(region.start);
//	var lastChunk = this._getChunk(region.end);
//	for(var i=firstChunk; i<=lastChunk; i++){
//		var key = region.chromosome+":"+i;
//		this.cache[key] = null;
//	}
//};
//

//
//BamCache.prototype.clearType = function(dataType){
//	this.cache[dataType] = null;
//};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function BamAdapter(args){
    if(typeof args != 'undefined'){
        this.host = args.host || this.host;
        this.category = args.category || this.category;
		this.resource = args.resource || this.resource;
		this.params = args.params || this.params;
		this.filters = args.filters || this.filters;
		this.options = args.options || this.options;
        this.species = args.species || this.species;
        var argsFeatureCache = args.featureCache || {};
    }
	if (args != null){
		if(args.featureConfig != null){
			if(args.featureConfig.filters != null){
				this.filtersConfig = args.featureConfig.filters;
			}
			if(args.featureConfig.options != null){//apply only check boxes
				this.optionsConfig = args.featureConfig.options;
				for(var i = 0; i < this.optionsConfig.length; i++){
					if(this.optionsConfig[i].checked == true){
						this.options[this.optionsConfig[i].name] = true;
						this.params[this.optionsConfig[i].name] = true;
					}				
				}
			}
		}
	}

	this.featureCache = new BamCache(argsFeatureCache);
	this.onGetData = new Event();
}

BamAdapter.prototype = {
    host : null,
    gzip : true,
    params : {}
};

BamAdapter.prototype.clearData = function(){
	this.featureCache.clear();
};

BamAdapter.prototype.setFilters = function(filters){
	this.clearData();
	this.filters = filters;
	for(filter in filters){
		var value = filters[filter].toString();
		delete this.params[filter];
		if(value != ""){
			this.params[filter] = value;
		}
	}
};
BamAdapter.prototype.setOption = function(opt, value){
	if(opt.fetch){
		this.clearData();
	}
	this.options[opt.name] = value;
	for(option in this.options){
		if(this.options[opt.name] != null){
			this.params[opt.name] = this.options[opt.name];
		}else{
			delete this.params[opt.name];
		}
	}
};


BamAdapter.prototype.getData = function(args){
	var _this = this;
	//region check
	this.params["histogram"] = args.histogram;
	this.params["histogramLogarithm"] = args.histogramLogarithm;
	this.params["histogramMax"] = args.histogramMax;
	this.params["interval"] = args.interval;
	this.params["transcript"] = args.transcript;
	this.params["chromosome"] = args.chromosome;
	this.params["resource"] = this.resource.oid;
	this.params["category"] = this.category;
	this.params["species"] = this.species;


	if(args.start<1){
		args.start=1;
	}
	if(args.end>300000000){
		args.end=300000000;
	}
	
	var dataType = "data";
	if(args.histogram){
		dataType = "histogram"+args.interval;
	}

	this.params["dataType"] = dataType;
	
	var firstChunk = this.featureCache._getChunk(args.start);
	var lastChunk = this.featureCache._getChunk(args.end);
	var chunks = [];
	var itemList = [];
	for(var i=firstChunk; i<=lastChunk; i++){
		var key = args.chromosome+":"+i;
		if(this.featureCache.cache[key] == null || this.featureCache.cache[key][dataType] == null) {
			chunks.push(i);
		}else{
			var item = this.featureCache.getFeatureChunk(key);
			itemList.push(item);
		}
	}
	
	//CellBase data process
	var opencgaManager = new OpencgaManager(this.host);
	opencgaManager.onRegion.addEventListener(function (evt, data){
		var splitDots = data.query.split(":");
		var splitDash = splitDots[1].split("-");
		var query = {chromosome:splitDots[0],start:splitDash[0],end:splitDash[1]};


		var dataType = "data";
		if(data.params.histogram){
			dataType = "histogram"+data.params.interval;
		    _this.featureCache.putHistogramFeaturesByRegion(data.result, query, data.resource, dataType);
		}else{
		    _this.featureCache.putFeaturesByRegion(data.result, query, data.resource, dataType);
        }

		var items = _this.featureCache.getFeatureChunksByRegion(query, dataType);
		itemList = itemList.concat(items);
		if(itemList.length > 0){
			_this.onGetData.notify({items:itemList, params:_this.params, cached:false});
		}
	});

	var querys = [];
	var updateStart = true;
	var updateEnd = true;
	if(chunks.length > 0){//chunks needed to retrieve
//		console.log(chunks);
		
		for ( var i = 0; i < chunks.length; i++) {
			
			if(updateStart){
				var chunkStart = parseInt(chunks[i] * this.featureCache.chunkSize);
				updateStart = false;
			}
			if(updateEnd){
				var chunkEnd = parseInt((chunks[i] * this.featureCache.chunkSize) + this.featureCache.chunkSize-1);
				updateEnd = false;
			}
			
			if(chunks[i+1]!=null){
				if(chunks[i]+1==chunks[i+1]){
					updateEnd =true;
				}else{
					var query = args.chromosome+":"+chunkStart+"-"+chunkEnd;
					querys.push(query);
					updateStart = true;
					updateEnd = true;
				}
			}else{
				var query = args.chromosome+":"+chunkStart+"-"+chunkEnd;
				querys.push(query);
				updateStart = true;
				updateEnd = true;
			}
		}
//		console.log(querys);
		for ( var i = 0, li = querys.length; i < li; i++) {
			console.time("dqs");
			//accountId, sessionId, bucketname, objectname, region,
			opencgaManager.region($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"),this.resource.bucketId, this.resource.id, querys[i], this.params);
		}
	}else{//no server call
		if(itemList.length > 0){
			this.onGetData.notify({items:itemList, params:this.params});
		}
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function InfoWidget(targetId, species, args){
	this.id = "InfoWidget_" + Math.round(Math.random()*10000000);
	this.targetId = null;
	
	this.species=species;
	
	this.title = null;
	this.featureId = null;
	this.width = 800;
	this.height = 460;
	
	this.feature = null;
	this.query = null;
	this.adapter = null;
	
	
	if (targetId!= null){
		this.targetId = targetId;       
	}
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
    }
	
	switch (species){
	case "hsapiens":
		this.ensemblSpecie = "Homo_sapiens"; 
		this.reactomeSpecie = "48887"; 
		this.wikipathwaysSpecie = "Homo+sapiens"; 
		this.omimSpecie = ""; 
		this.uniprotSpecie = ""; 
		this.intactSpecie = ""; 
		this.dbsnpSpecie = ""; 
		this.haphapSpecie = ""; 
//		this.Specie = ""; 
		break;
	case "mmusculus":
		this.ensemblSpecies = "Mus_musculus"; 
		this.reactomeSpecies = "48892";
		this.wikipathwaysSpecie = "Mus+musculus"; 
		this.omimSpecie = ""; 
		this.uniprotSpecie = ""; 
		this.intactSpecie = ""; 
		this.dbsnpSpecie = ""; 
		this.haphapSpecie = ""; 
//		this.Specie = ""; 
		break;
	case "drerio":
		this.ensemblSpecie = "Danio_rerio"; 
		this.reactomeSpecie = "68323"; 
		this.wikipathwaysSpecie = "Danio+rerio"; 
		this.omimSpecie = ""; 
		this.uniprotSpecie = ""; 
		this.intactSpecie = ""; 
		this.dbsnpSpecie = ""; 
		this.haphapSpecie = ""; 
//		this.Specie = ""; 
		break;
	}
	
	this.notFoundPanel = Ext.create('Ext.panel.Panel',{
		id:this.id+"notFoundPanel",
		cls:'panel-border-left',
		border:false,
		flex:3,
		bodyPadding:'40',
		html:'No results found'
	});
	
};

InfoWidget.prototype.draw = function (args){
	console.log(args);
//	this.featureId = feature.id;
	this.query = args.query;
	this.feature = args.feature;
	this.adapter = args.adapter;
//	if(feature.getName()==null){
//		console.log("getName not defined");
////		var feature = new Object();
////		feature.getName = function(){return feature;};
//	}	
	
//	console.log(feature.getName());
//	this.feature.getName = function(){return "a";};
	
	this.panel=Ext.getCmp(this.title +" "+ this.query);
	if (this.panel == null){
		//the order is important
		this.render();
		this.panel.show();
		this.getData();
	}else{
		this.panel.show();
	}
};

InfoWidget.prototype.render = function (){
		/**MAIN PANEL**/
		this.panel = Ext.create('Ext.ux.Window', {
		    title: this.title +" "+ this.query,
		    id : this.title +" "+ this.query,
//		    resizable: false,
		    minimizable :true,
			constrain:true,
		    closable:true,
		    height:this.height,
		    width:this.width,
//		    modal:true,
//			layout: {type: 'table',columns: 2},
		    layout: { type: 'hbox',align: 'stretch'},
		    items: [this.getTreePanel()],
		    buttonAlign:'right',
//		    buttons:[],
		    listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.hide();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	        }
		});
};

InfoWidget.prototype.getTreePanel = function (){
		var dataTypes = this.getdataTypes();
	   	this.checkDataTypes(dataTypes);
	        
		var treeStore = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "Options",
		        children: dataTypes
		    }
		});
		
		var treePan = Ext.create('Ext.tree.Panel', {
		    title: 'Detailed information',
		    bodyPadding:10,
		    flex:1,
		   	border:false,
		    store: treeStore,
		    useArrows: true,
		    rootVisible: false,
		    listeners : {
			    	scope: this,
			    	itemclick : function (este,record){
			    		this.optionClick(record.data);
		    		}
			}
		});
		return treePan;
};



InfoWidget.prototype.doGrid = function (columns,fields,modelName,groupField){
		var groupFeature = Ext.create('Ext.grid.feature.Grouping',{
			groupHeaderTpl: '{[values.name]} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
			startCollapsed: true
	    });
		var filters = [];
		for(var i=0; i<fields.length; i++){
			filters.push({type:'string', dataIndex:fields[i]});
		}
		var filters = {
				ftype: 'filters',
				local: true, // defaults to false (remote filtering)
				filters: filters
		};
	    Ext.define(modelName, {
		    extend: 'Ext.data.Model',
	    	fields:fields
		});
	   	var store = Ext.create('Ext.data.Store', {
			groupField: groupField,
			model:modelName
	    });
		var grid = Ext.create('Ext.grid.Panel', {
			id: this.id+modelName,
	        store: store,
	        title : modelName,
	        border:false,
	        cls:'panel-border-left',
			flex:3,        
	        features: [groupFeature,filters],
	        viewConfig: {
//	            stripeRows: true,
	            enableTextSelection: true
	        },
	        columns: columns,
	        bbar  : ['->', {
	            text:'Clear Grouping',
	            handler : function(){
	                groupFeature.disable();
	            }
	        }]
	    });
    return grid;
};


InfoWidget.prototype.checkDataTypes = function (dataTypes){
	for (var i = 0; i<dataTypes.length; i++){
		if(dataTypes[i]["children"]!=null){
			dataTypes[i]["iconCls"] ='icon-box';
			dataTypes[i]["expanded"] =true;
			this.checkDataTypes(dataTypes[i]["children"]);
		}else{
			dataTypes[i]["iconCls"] ='icon-blue-box';
			dataTypes[i]["leaf"]=true;
		}
	}
};

InfoWidget.prototype.getdataTypes = function (){
	//Abstract method
	return [];
};
InfoWidget.prototype.optionClick = function (){
	//Abstract method
};
InfoWidget.prototype.getData = function (){
	//Abstract method
};

InfoWidget.prototype.getGeneTemplate = function (){
	return  new Ext.XTemplate(
		    '<div style="font-family:Oxygen"><span class="panel-border-bottom"><span class="ssel s130">{name}</span> &nbsp; <span class="emph s120"> {id} </span></span>',
			' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Location/View?g={id}">Ensembl</a>',
			' &nbsp; <a target="_blank" href="http://wikipathways.org//index.php?query={externalName}&species='+this.wikipathwaysSpecie+'&title=Special%3ASearchPathways&doSearch=1">Wikipathways</a>',
			'</div><br>',
		    '<div><span class="w75 infokey s90">Location: </span> <span class="">{chromosome}:{start}-{end} </span><span style="margin-left:50px" class=" infokey s90">Strand: </span> {strand}</div>',
		    '<div><span class="w75 infokey s90">Biotype: </span> {biotype}</div>',
		    '<div><span class="w75 infokey s90">Description: </span> <span><tpl if="description == &quot;&quot;">No description available</tpl>{description}</span></div>',
		    '<div><span class="w75 infokey s90">Source: </span> <span class="s110">{source}</span></div>',
//		    '<div><span class="w75 infokey s90">External DB: </span> {externalDb}</div>',
		    '<div><span class="w75 infokey s90">Status: </span> {status}</div>' // +  '<br>'+str
	);
};
InfoWidget.prototype.getTranscriptTemplate = function (){
	return new Ext.XTemplate(
		    '<div style="font-family:Oxygen"><span class="panel-border-bottom"><span class="ssel s130">{name}</span> &nbsp; <span class="emph s120"> {id} </span></span>',
		    ' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Transcript/Transcript?t={id}">Ensembl</a>',
		    ' &nbsp; <a target="_blank" href="http://wikipathways.org//index.php?query={externalName}&species='+this.wikipathwaysSpecie+'&title=Special%3ASearchPathways&doSearch=1">Wikipathways</a>',
		    '</div><br>',
		    '<div><span class="w100 infokey s90">Location: </span> <span class="">{chromosome}:{start}-{end} </span><span style="margin-left:50px" class=" infokey s90">Strand: </span> {strand}</div>',
		    '<div><span class="w100 infokey s90">Biotype: </span> {biotype}</div>',
		    '<div><span class="w100 infokey s90">Description: </span> <span><tpl if="description == &quot;&quot;">No description available</tpl>{description}</span></div>',
		    '',
		    '<div><span class="w100 infokey s90">CDS &nbsp; (start-end): </span> {genomicCodingStart}-{genomicCodingEnd} <span style="margin-left:50px" class="w100 infokey s90">CDNA (start-end): </span> {cdnaCodingStart}-{cdnaCodingEnd}</div>',
		    '<div><span class="w100 infokey s90">External DB: </span> {externalDb}</div>',
		    '<div><span class="w100 infokey s90">Status: </span> {status}</div><br>'// +  '<br>'+str
		);
};
InfoWidget.prototype.getSnpTemplate = function (){

//
//    alleleString: "C/T"
//    alternate: "T"
//    assembly: ""
//    chromosome: "13"
//    end: 32889669
//    featureAlias: "featureAlias"
//    featureId: "featureId"
//    id: "rs55880202"
//    populationFrequencies: null
//    reference: "C"
//    samples: Array[0]
//    source: ""
//    species: ""
//    start: 32889669
//    strand: "1"
//    transcriptVariations: Array[6]
//    type: "SNV"
//    validationStatus: "freq,1000Genome"
//    variantFreq: "variantFreq"
//    version: ""
//    xrefs: Array[0]

	return new Ext.XTemplate(
		    '<div style="font-family:Oxygen"><span class="panel-border-bottom"><span class="ssel s130">{id}</span></span>',
		    ' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Variation/Summary?v={id}">Ensembl</a>',
		    '</div><br>',
		    '<div><span class="w140 infokey s90">Location: </span> <span class="">{chromosome}:{start}-{end} </span><span style="margin-left:50px" class=" infokey s90">Strand: </span> {strand}</div>',
		    '<div><span class="w140 infokey s90">Source: </span> <span class="s110">{source}</span></div>',
		    '<div><span class="w140 infokey s90">Type: </span> <span class="s110">{type}</span></div>',
		    '<div><span class="w140 infokey s90">Map weight: </span> {mapWeight}</div>',
		    '<div><span class="w140 infokey s90">Allele string: </span> {alleleString}</div>',
		    '<div><span class="w140 infokey s90">Ancestral allele: </span> {ancestralAllele}</div>',
		    '<div><span class="w140 infokey s90">Display SO consequence type: </span> {displayConsequenceType}</div>',
		    '<div><span class="w140 infokey s90">SO consequence types: </span> {consequenceTypes}</div>'
//		    '<div><span class="w140 infokey s90">Xrefs: </span> {xrefs}</div>'
//		    '<div><span class="w140 infokey s90">Sequence: </span> {sequence}</div>' // +  '<br>'+str
		);
};

InfoWidget.prototype.getExonTemplate = function (){
	return new Ext.XTemplate(
			'<span style="font-family:Oxygen" ><span class="panel-border-bottom"><span class="ssel s110">{id}</span></span></span>',
			'<span><span style="margin-left:30px" class="infokey s90"> Location: </span> <span class="">{chromosome}:{start}-{end} </span></span>',
			'<span><span style="margin-left:30px" class="infokey s90"> Strand: </span> {strand}</span>'
		);
};

InfoWidget.prototype.getProteinTemplate = function (){
	return new Ext.XTemplate(
			 '<div style="font-family:Oxygen"><span class="panel-border-bottom"><span class="ssel s130">{name}</span> &nbsp; <span class="emph s120"> {primaryAccession} </span></span></div>',
			 '<br>',
			 '<div><span class="w100 infokey s90">Full name: </span> <span class="">{fullName}</span></div>',
			 '<div><span class="w100 infokey s90">Gene name: </span> <span class="">{geneName}</span></div>',
			 '<div><span class="w100 infokey s90">Organism: </span> <span class="">{organism}</span></div>'
		);
};


InfoWidget.prototype.getVCFVariantTemplate = function (){
	return new Ext.XTemplate(
			'<div style="font-family:Oxygen"><span><span class="panel-border-bottom"><span class="ssel s130">{chromosome}:{start}-{alt}</span> &nbsp; <span class="emph s120"> {label} </span></span></span></div><br>',
			'<div><span class="w75 infokey s90">Alt: </span> {alt}</div>',
			'<div><span class="w75 infokey s90">Ref: </span> {ref}</div>',
			'<div><span class="w75 infokey s90">Quality: </span> {quality}</div>',
			'<div><span class="w75 infokey s90">Format: </span> {format}</div>',
			'<div><span class="w75 infokey s90">Samples: </span> {samples}</div>',
			'<div><span class="w75 infokey s90">Info: <br></span> {info}</div>'
		);
};

InfoWidget.prototype.getPWMTemplate = function (){
	return new Ext.XTemplate(
			 '<div style="font-family:Oxygen"><span class="panel-border-bottom"><span class="ssel s130">{accession}</span> &nbsp; <span class="emph s120"> {tfName} </span></span></div>',
			 '<br>',
			 '<div><span class="w100 infokey s90">Type: </span> <span class="">{source}</span></div>',
			 '<div><span class="w100 infokey s90">Source: </span> <span class="">{type}</span></div>',
			 '<div><span class="w100 infokey s90">Description: </span> <span class="">{description}</span></div>',
			 '<div><span class="w100 infokey s90">Length: </span> <span class="">{length}</span></div>',
			 '<div><span class="w100 infokey s90">Frequencies: </span> <span class="">{[this.parseFrequencies(values.frequencies)]}</span></div>',
			 {
				 parseFrequencies: function(values){
					 return '<div>'+values.replace(/,/gi, '<br>')+"</div>";
				 }
			 }
		);
};

InfoWidget.prototype.getProteinXrefTemplate = function (){
	return new Ext.XTemplate(
			'<div style="font-family:Oxygen"><span class="w75 emph s100">{[values.source.toUpperCase()]}</span> &nbsp; <span class="emph w125 s100"> {[this.generateLink(values)]} <span class="info">&raquo;</span> </span></div>',
			{
				generateLink: function(values){
					if(values.source!=null){
						switch(values.source.toUpperCase()){
						case "GO": 	return 		'<a TARGET="_blank" href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='+values.name+'">'+values.name+'</a>'; break;
						case "REACTOME": return '<a TARGET="_blank" href="http://www.reactome.org/cgi-bin/eventbrowser_st_id?ST_ID='+values.name+'">'+values.name+'</a>'; break;
						case "KEGG": return 	'<a TARGET="_blank" href="http://www.genome.jp/dbget-bin/www_bget?'+values.name+'">'+values.name+'</a>'; break;
						case "INTACT": return 	'<a TARGET="_blank" href="http://www.ebi.ac.uk/intact/pages/interactions/interactions.xhtml?query='+values.name+'">'+values.name+'</a>'; break;
						case "MINT": return 	'<a TARGET="_blank" href="http://mint.bio.uniroma2.it/mint/search/search.do?queryType=protein&interactorAc='+values.name+'">'+values.name+'</a>'; break;
						case "DIP": return 		'<a TARGET="_blank" href="http://dip.doe-mbi.ucla.edu/dip/Browse.cgi?ID='+values.name+'">'+values.name+'</a>'; break;
						case "STRING": return 	'<a TARGET="_blank" href="http://string-db.org/newstring_cgi/show_network_section.pl?identifier=P51587">'+values.name+'</a>'; break;
						case "MIM": return 		'<a TARGET="_blank" href="http://www.omim.org/entry/'+values.name+'">'+values.name+'</a>'; break;
						case "PHARMGKB": return '<a TARGET="_blank" href="http://www.pharmgkb.org/do/serve?objId='+values.name+'&objCls=Gene">'+values.name+'</a>'; break;
						case "ORPHANET": return '<a TARGET="_blank" href="http://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=EN&Expert='+values.name+'">'+values.name+'</a>'; break;
						}
					}
					else{
						return "";
					}
				}
			}
		);
};

InfoWidget.prototype.getSnpTranscriptTemplate = function (){
//    alleleString: "C/T"
//    cdnEnd: 0
//    cdnaStart: 0
//    cdsEnd: 0
//    cdsStart: 0
//    codonAlleleString: ""
//    consequenceTypes: Array[1]
//    distanceToTranscript: 188
//    hgvsGenomic: "13:g.32889669C>T"
//    hgvsProtein: ""
//    hgvsTranscript: ""
//    peptideAlleleString: ""
//    polyphenPrediction: ""
//    polyphenScore: 0
//    siftPrediction: ""
//    siftScore: 0
//    somatic: "0"
//    transcriptId: "ENST00000533490"
//    translationEnd: 0
//    translationStart: 0

	return new Ext.XTemplate(
		    '<div style="font-family:Oxygen"><span class="panel-border-bottom"><span class="ssel s130">{[this.getStableId(values)]}</span></span>',
		    ' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Transcript/Transcript?t={[this.getStableId(values)]}">Ensembl</a>',
		    '</div><br>',
		    '<div><span class="w140 infokey s90">CDS &nbsp; (start : end): </span> {cdsStart} : {cdsEnd} <span style="margin-left:50px" class="w100 infokey s90">cDNA (start : end): </span> {cdnaStart} : {cdnaEnd}</div>',
		    '<div><span class="w140 infokey s90">Translation (start : end): </span> {translationStart} : {translationEnd}</div>',
		    '<div><span class="w140 infokey s90">Peptide allele: </span> {peptideAlleleString}</div>',
//		    '<div><span class="w140 infokey s90">Alt. peptide allele: </span> {alternativePeptideAlleleString}</div>',
			'<div><span class="w140 infokey s90">Codon: </span> {codonAlleleString}</div>',
//			'<div><span class="w140 infokey s90">Reference codon: </span> {referenceCodon}</div>',
			'<div><span class="w140 infokey s90">Polyphen prediction: </span> {polyphenPrediction}',
			'<span style="margin-left:50px" class="w140 infokey s90">Polyphen score: </span> {polyphenScore}</div>',
			'<div><span class="w140 infokey s90">Sift prediction: </span> {siftPrediction}',
			'<span style="margin-left:50px" class="w140 infokey s90">Sift score: </span> {siftScore}</div>',
            '<div><span class="w140 infokey s90">SO consequence types: </span> {consequenceTypes}</div><br>',
		    {
		    	getStableId: function(values){
		    		if(values.transcriptId!=""){
		    			return values.transcriptId;
		    		}
		    		return "Intergenic SNP";
		    	}
		    }
		);
};


InfoWidget.prototype.getConsequenceTypeTemplate = function (){
	return new Ext.XTemplate(
		    '<div><span class="panel-border-bottom"><span class="ssel s130">{transcriptId}</span> &nbsp; </span></div><br>',
		    '<div><span class="w140 infokey s90">SO consequence types: </span> {consequenceTypes}</div><br>'
//		    '<div><span class="w100 infokey s90">SO term: </span> {consequenceType.soTerm}</div>',
//		    '<div><span class="w100 infokey s90">Feature So term: </span> {consequenceType.featureSoTerm}</div>',
//		    '<div><span class="w100 infokey s90">NCBI term: </span> {consequenceType.ncbiTerm}</div>',
//		    '<div><span class="w100 infokey s90">Rank: </span> {consequenceType.rank}</div><br>'
		);
};


InfoWidget.prototype.getPhenotypeTemplate = function (){
	return new Ext.XTemplate(
		    '<div><span class="panel-border-bottom"><span class="ssel s130">{phenotypeDescription}</span> &nbsp; <span class="emph s120"> {source} </span></span></div><br>',
			'<div><span class="w150 infokey s90">PValue: </span>{PValue}</div>',
			'<div><span class="w150 infokey s90">Assoc. gene name: </span>{associatedGeneName}</div>',
			'<div><span class="w150 infokey s90">Assoc. variant risk allele: </span>{associatedVariantRiskAllele}</div>',
			'<div><span class="w150 infokey s90">Phenotype description: </span>{phenotypeDescription}</div>',
			'<div><span class="w150 infokey s90">Phenotype name: </span>{phenotypeName}</div>',
			'<div><span class="w150 infokey s90">Risk allele freq in controls: </span>{riskAlleleFrequencyInControls}</div>',
			'<div><span class="w150 infokey s90">Source: </span>{source}</div>',
			'<div><span class="w150 infokey s90">Study name: </span>{studyName}</div>',
			'<div><span class="w150 infokey s90">Study type: </span>{studyType}</div>',
			'<div><span class="w150 infokey s90">Study URL: </span>{studyUrl}</div>',
			'<div><span class="w150 infokey s90">Study description: </span>{studyDescription}</div>'
		);
};

InfoWidget.prototype.getPopulationTemplate = function (){
	return new Ext.XTemplate(
		    '<div><span class="panel-border-bottom"><span class="ssel s130">{population}</span> &nbsp; <span class="emph s120"> {source} </span></span></div><br>',
		    '<div><span class="w140 infokey s90">Ref allele:  </span>{refAllele} ({refAlleleFrequency})</div>',
		    '<div><span class="w140 infokey s90">Other allele:  </span>{otherAllele} ({otherAlleleFrequency})</div>',
		    '<div><span class="w140 infokey s90">Ref allele homozygote:  </span>{refAlleleHomozygote} ({refAlleleHomozygoteFrequency})</div>',
		    '<div><span class="w140 infokey s90">Allele heterozygote:  </span>{alleleHeterozygote} ({alleleHeterozygoteFrequency})</div>',
			 '<div><span class="w140 infokey s90">Other allele homozygote:  </span>{otherAlleleHomozygote} ({otherAlleleHeterozygoteFrequency})</div>',
//			 'TODO cuidado <div><span class="w140 infokey s90">other allele heterozygote Frequency:  </span>{otherAlleleHeterozygoteFrequency}</div>',
			 '<div><span class="w140 infokey s90">Source:  </span>{source}</div>',
			 '<div><span class="w140 infokey s90">Population:  </span>{population}</div>'
		);
};

//not used
InfoWidget.prototype.getVariantEffectTemplate = function (){
		
	return new Ext.XTemplate(
		    '<div><span class="panel-border-bottom"><span class="ssel s130">{consequenceTypeObo}</span> &nbsp; <span class="emph s120"> {featureBiotype} </span></span></div><br>'
		);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GeneInfoWidget.prototype.draw = InfoWidget.prototype.draw;
GeneInfoWidget.prototype.render = InfoWidget.prototype.render;
GeneInfoWidget.prototype.getTreePanel = InfoWidget.prototype.getTreePanel;
GeneInfoWidget.prototype.checkDataTypes = InfoWidget.prototype.checkDataTypes;
GeneInfoWidget.prototype.doGrid = InfoWidget.prototype.doGrid;
GeneInfoWidget.prototype.getGeneTemplate = InfoWidget.prototype.getGeneTemplate;
GeneInfoWidget.prototype.getTranscriptTemplate = InfoWidget.prototype.getTranscriptTemplate;

function GeneInfoWidget(targetId, species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "Gene Info";
	InfoWidget.prototype.constructor.call(this, targetId, species, args);
};

GeneInfoWidget.prototype.getdataTypes = function (){
	//Abstract method
	return dataTypes=[
	            { text: "Genomic", children: [
	                { text: "Information"},
	                { text: "Transcripts"},
                    { text: "Xrefs"}
	            ] },
	            { text: "Functional information", children: [
	                { text: "GO"},
	                { text: "Reactome"},
	                { text: "Interpro"}
	            ] },
	            { text: "Regulatory", children: [
	                { text: "TFBS"}
//	                { text: "miRNA targets"}
	            ]},
	            { text:"Protein", children: [
	                { text: "Features"},//protein profile
	                { text: "3D structure"}
	            ]}	     
	        ];
};

GeneInfoWidget.prototype.optionClick = function (item){
	//Abstract method
	if (item.leaf){
		if(this.panel.getComponent(1)!=null){
			this.panel.getComponent(1).hide();
			this.panel.remove(1,false);
		}
		switch (item.text){
			case "Information": this.panel.add(this.getGenePanel(this.data).show()); break;
			case "Transcripts": this.panel.add(this.getTranscriptPanel(this.data.transcripts).show());  break;
			case "Xrefs": this.panel.add(this.getXrefGrid(this.data.transcripts, 'Xref', 'transcript').show());  break;
//			case "GO": this.panel.add(this.getGoGrid().show()); break;
			case "GO": this.panel.add(this.getXrefGrid(this.data.transcripts, 'GO', 'transcript').show());  break;
			case "Interpro": this.panel.add(this.getXrefGrid(this.data.transcripts, 'Interpro', 'transcript').show());  break;
			case "Reactome": this.panel.add(this.getXrefGrid(this.data.transcripts, 'Reactome', 'transcript').show());  break;
			case "TFBS": this.panel.add(this.getTfbsGrid(this.data.transcripts).show());  break;
			case "miRNA targets": this.panel.add(this.getMirnaTargetGrid(this.data.mirnaTargets).show());  break;
			case "Features": this.panel.add(this.getProteinFeaturesGrid(this.data.proteinFeatures).show());  break;
			case "3D structure": this.panel.add(this.get3Dprotein(this.data.snps).show());  break;
		}
	}
};

GeneInfoWidget.prototype.getGenePanel = function(data){
	if(data==null){
		return this.notFoundPanel;
	}
    if(this.genePanel==null){
    	var tpl = this.getGeneTemplate();
    	
		this.genePanel = Ext.create('Ext.panel.Panel',{
			title:"Gene information",
	        border:false,
	        cls:'panel-border-left',
			flex:3,
			bodyPadding:10,
			data:data,
			tpl:tpl
		});
    }
    return this.genePanel;
};


GeneInfoWidget.prototype.getTranscriptPanel = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.transcriptGrid==null){
    	
    	var tpl = this.getTranscriptTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var transcriptPanel = Ext.create('Ext.container.Container',{
				padding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(transcriptPanel);
    	}
		this.transcriptGrid = Ext.create('Ext.panel.Panel',{
			title:"Transcripts ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.transcriptGrid;
};


GeneInfoWidget.prototype.getXrefGrid = function(transcripts, dbname, groupField){
    var data = [];
    for(var i = 0; i<transcripts.length; i++){
        for(var j = 0; j<transcripts[i].xrefs.length; j++){
            var xref = transcripts[i].xrefs[j];
            if(dbname == 'Xref'){
                var shortName  = xref.dbNameShort.toLowerCase();
                if(shortName != 'go' && shortName != 'interpro' && shortName != 'reactome'){
                    xref.transcript = transcripts[i].id;
                    data.push(xref);
                }
            }else{
                if(xref.dbNameShort.toLowerCase() == dbname.toLowerCase()){
                    xref.transcript = transcripts[i].id;
                    data.push(xref);
                }
            }
        }
    }
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this[dbname+"Grid"]==null){
    	var groupField = groupField;
    	var modelName = dbname;
    	var fields = ['description','id', 'dbName', 'transcript'];
    	var columns = [
    	               {header : 'Display Id',dataIndex: 'id',flex:1},
    	               {header : 'DB name',dataIndex: 'dbName',flex:1},
    	               {header : 'Description',dataIndex: 'description',flex:3}
    	               ];
    	this[dbname+"Grid"] = this.doGrid(columns,fields,modelName,groupField);
    	this[dbname+"Grid"].store.loadData(data);
    }
    return this[dbname+"Grid"];
};

//GeneInfoWidget.prototype.getGoGrid = function(){
//    var _this = this;
//    if(this.goGrid==null){
//    	var groupField = 'namespace';
//    	var modelName = 'GO';
//	    var fields = ['id','name','description','level','directNumberOfGenes','namespace','parents','propagatedNumberOfGenes','score'];
//		var columns = [ {header : 'Database id',dataIndex: 'id',flex:2},
//						{header : 'Name',dataIndex: 'name',flex:1},
//						{header : 'Description',dataIndex: 'description',flex:2},
//		                {
//		                	xtype: 'actioncolumn',
//		                	header : '+info',
//		                    flex:1,
//		                    items: [{
//		                        iconCls: 'icon-blue-box',  // Use a URL in the icon config
//		                        tooltip: '+info',    
//		                        handler: function(grid, rowIndex, colIndex) {
//		                            var rec = _this.goStore.getAt(rowIndex);
//		                            Ext.Msg.alert(rec.get('name'), rec.get('description'));
//		                        }
//		                    }]
//		                 },
//		                {header : 'Direct genes',dataIndex: 'directNumberOfGenes',flex:2},
//						{header : 'Level',dataIndex: 'level',flex:1},
//						{header : 'Namespace',dataIndex: 'namespace',flex:2},
//						{header : 'Propagated genes',dataIndex: 'propagatedNumberOfGenes',flex:2.5}
//		             ];
//		this.goGrid = this.doGrid(columns,fields,modelName,groupField);
//		
//    }
//    return this.goGrid;
//};


GeneInfoWidget.prototype.getTfbsGrid = function(data){
    if(data.length<=0){
		return this.notFoundPanel;
	}
    var groupField = '';
    //check data are transcripts or tfbss

    if(data[0].id != null){
        var data2 = [];
        groupField = 'transcriptId';
        for(var i = 0; i<data.length; i++){
            transcript = data[i];
            if(transcript.tfbs != null){
                for(var j = 0; j<transcript.tfbs.length; j++){
                    transcript.tfbs[j].transcriptId = transcript.id;
                }
                data2 = data2.concat(transcript.tfbs);
            }
        }
        data = data2;
    }

    if(this.tfbsGrid==null){
    	var groupField = groupField;
    	var modelName = "TFBS";
	    var fields = ["chromosome","start","end","strand","tfName","relativeStart","relativeEnd","targetGeneName","score","sequence","transcriptId"];
		var columns = [
		                {header : 'Name',dataIndex: 'tfName',flex:1},
		            	{header : 'Location: chr:start-end (strand)', xtype:'templatecolumn', tpl:'{chromosome}:{start}-{end} ({strand})',flex:2.5},
		            	{header : 'Relative (start-end)',xtype:'templatecolumn',tpl:'{relativeStart}-{relativeEnd}',flex:1.5},
						{header : 'Target gene',dataIndex: 'targetGeneName',flex:1},
						{header : 'Score',dataIndex: 'score',flex:1},
						{header : 'Sequence',dataIndex: 'sequence',flex:1}
		             ];
		this.tfbsGrid = this.doGrid(columns,fields,modelName,groupField);
		this.tfbsGrid.store.loadData(data);
    }
    return this.tfbsGrid;
};

GeneInfoWidget.prototype.getMirnaTargetGrid = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.mirnaTargetGrid==null){
    	var groupField = "";
    	var modelName = "miRNA targets";
	    var fields = ["chromosome","start","end","strand","mirbaseId","score","experimentalMethod","source"];
		var columns = [
		                {header : 'Id',dataIndex: 'mirbaseId',flex:1},
		            	{header : 'Location: chr:start-end (strand)', xtype:'templatecolumn', tpl:'{chromosome}:{start}-{end} ({strand})',flex:2},
						{header : 'Score',dataIndex: 'score',flex:1},
						{header : 'Exp. Method',dataIndex: 'experimentalMethod',flex:1},
						{header : 'source',dataIndex: 'source',flex:1}
		             ];
		this.mirnaTargetGrid = this.doGrid(columns,fields,modelName,groupField);
		this.mirnaTargetGrid.store.loadData(data);
    }
    return this.mirnaTargetGrid;
};

GeneInfoWidget.prototype.getProteinFeaturesGrid = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.proteinFeaturesGrid==null){
    	var groupField = '';
    	var modelName = "Protein features";
	    var fields = ["identifier","start","end","original","type","description"];
		var columns = [
		                {header : 'Identifier',dataIndex: 'identifier',flex:1},
		               	{header : 'Location: (start-end)', xtype:'templatecolumn', tpl:'{start}-{end}',flex:1.2},
		               	{header : 'Original',dataIndex: 'original',flex:1},
						{header : 'Type',dataIndex: 'type',flex:1},
						{header : 'Description',dataIndex: 'description',flex:1.5}
		             ];
		this.proteinFeaturesGrid = this.doGrid(columns,fields,modelName,groupField);
		this.proteinFeaturesGrid.store.loadData(data);
    }
    return this.proteinFeaturesGrid;
};


GeneInfoWidget.prototype.getProteinFeaturesGrid = function(data){
    debugger
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.proteinFeaturesGrid==null){
    	var groupField = '';
    	var modelName = 'Protein features';
	    var fields = ["identifier","start","end","original","type","description"];
		var columns = [
		                {header : 'Identifier',dataIndex: 'identifier',flex:1},
		               	{header : 'Location: (start-end)', xtype:'templatecolumn', tpl:'{start}-{end}',flex:1.2},
		               	{header : 'Original',dataIndex: 'original',flex:1},
						{header : 'Type',dataIndex: 'type',flex:1},
						{header : 'Description',dataIndex: 'description',flex:1.5}
		             ];
		this.proteinFeaturesGrid = this.doGrid(columns,fields,modelName,groupField);
		this.proteinFeaturesGrid.store.loadData(data);
    }
    return this.proteinFeaturesGrid;
};

GeneInfoWidget.prototype.get3Dprotein = function(data){
	var _this=this;
    if(this.p3dProtein==null){
    	//ws
//    	
      	this.p3dProtein = Ext.create('Ext.tab.Panel',{
      		title:"3D Protein Viewer",
      		border:false,
      		cls:'panel-border-left',
      		flex:3,
//    		bodyPadding:5,
      		autoScroll:true
//      		items:items
      	});
    	
    	var pdbs = [];

    	$.ajax({
//    		  url: 'http://ws.bioinfo.cipf.es/celldb/rest/v1/hsa/feature/id/brca2/xref?dbname=pdb',
    		  url:new CellBaseManager().host+'/v3/'+_this.species+'/feature/id/'+this.query+'/xref?dbname=pdb&of=json',
//    		  data: data,
//    		  dataType: dataType,
    		  async:false,
    		  success: function(data){
    			if(data!=""){
//      	    		console.log(data.trim());
      	    		pdbs = data[0];
//      	    		console.log(pdbs);
      	    		
      	    		for ( var i = 0; i < pdbs.length; i++) {
      	    			var pdb_name=pdbs[i].id;
      	    			var pan = Ext.create('Ext.panel.Panel',{
      	    				title:pdb_name,
      	    				bodyCls:'background-black',
      	    				html:'<canvas class="ChemDoodleWebComponent" id="pdb_canvas_'+pdb_name+'" width="600" height="600" style="width: 600px; height: 600px; ">This browser does not support HTML5/Canvas.</canvas>',
      	    				listeners:{
      	    					afterrender:function(este){
      	    						// JavaScript Document
      	    						var pdb_name=este.title;
      	    						
      	    				    	ChemDoodle.default_backgroundColor = '#000000';
      	    				    	
      	    				    	var pdb = new ChemDoodle.TransformCanvas3D('pdb_canvas_'+pdb_name, 300, 300);
      	    				    	if(!pdb.gl){
      	    				    	  pdb.emptyMessage = 'Your browser does not support WebGL';
      	    				    	  pdb.displayMessage();
      	    				    	}else{
      	    					    	pdb.specs.set3DRepresentation('Ball and Stick');
      	    					    	pdb.specs.proteins_ribbonCartoonize = true;
      	    					    	pdb.handle = null;
      	    					    	pdb.timeout = 15;
      	    					    	pdb.startAnimation = ChemDoodle._AnimatorCanvas.prototype.startAnimation;
      	    					    	pdb.stopAnimation = ChemDoodle._AnimatorCanvas.prototype.stopAnimation;
      	    					    	pdb.isRunning = ChemDoodle._AnimatorCanvas.prototype.isRunning;
      	    					    	pdb.dblclick = ChemDoodle.RotatorCanvas.prototype.dblclick;
      	    					    	pdb.nextFrame = function(delta){
      	    					    		var matrix = [];
      	    					    		mat4.identity(matrix);
      	    					    		var change = delta/1000;
      	    					    	        var increment = Math.PI/15;
      	    					    		mat4.rotate(matrix, increment*change, [ 1, 0, 0 ]);
      	    					    		mat4.rotate(matrix, increment*change, [ 0, 1, 0 ]);
      	    					    		mat4.rotate(matrix, increment*change, [ 0, 0, 1 ]);
      	    					    		mat4.multiply(this.rotationMatrix, matrix);
      	    					    	};
      	    					    	
//      	    					    	http://ws.bioinfo.cipf.es/celldb/rest/v1/hsa/feature/id/brca2/xref?dbname=pdb
//      	    				    	var mol = ChemDoodle.readPDB('HEADER    PLANT SEED PROTEIN                      30-APR-81   1CRN                                                                       \nDBREF  1CRN A    1    46  UNP    P01542   CRAM_CRAAB       1     46             \nSEQRES   1 A   46  THR THR CYS CYS PRO SER ILE VAL ALA ARG SER ASN PHE          \nSEQRES   2 A   46  ASN VAL CYS ARG LEU PRO GLY THR PRO GLU ALA ILE CYS          \nSEQRES   3 A   46  ALA THR TYR THR GLY CYS ILE ILE ILE PRO GLY ALA THR          \nSEQRES   4 A   46  CYS PRO GLY ASP TYR ALA ASN                                  \nHELIX    1  H1 ILE A    7  PRO A   19  13/10 CONFORMATION RES 17,19       13    \nHELIX    2  H2 GLU A   23  THR A   30  1DISTORTED 3/10 AT RES 30           8    \nSHEET    1  S1 2 THR A   1  CYS A   4  0                                        \nSHEET    2  S1 2 CYS A  32  ILE A  35 -1                                        \nSSBOND   1 CYS A    3    CYS A   40                          1555   1555  2.00  \nSSBOND   2 CYS A    4    CYS A   32                          1555   1555  2.04  \nSSBOND   3 CYS A   16    CYS A   26                          1555   1555  2.05  \nCRYST1   40.960   18.650   22.520  90.00  90.77  90.00 P 1 21 1      2          \nORIGX1      1.000000  0.000000  0.000000        0.00000                         \nORIGX2      0.000000  1.000000  0.000000        0.00000                         \nORIGX3      0.000000  0.000000  1.000000        0.00000                         \nSCALE1      0.024414  0.000000 -0.000328        0.00000                         \nSCALE2      0.000000  0.053619  0.000000        0.00000                         \nSCALE3      0.000000  0.000000  0.044409        0.00000                         \nATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N  \nATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C  \nATOM      3  C   THR A   1      15.685  12.755   5.133  1.00  9.19           C  \nATOM      4  O   THR A   1      15.268  13.825   5.594  1.00  9.85           O  \nATOM      5  CB  THR A   1      18.170  12.703   5.337  1.00 13.02           C  \nATOM      6  OG1 THR A   1      19.334  12.829   4.463  1.00 15.06           O  \nATOM      7  CG2 THR A   1      18.150  11.546   6.304  1.00 14.23           C  \nATOM      8  N   THR A   2      15.115  11.555   5.265  1.00  7.81           N  \nATOM      9  CA  THR A   2      13.856  11.469   6.066  1.00  8.31           C  \nATOM     10  C   THR A   2      14.164  10.785   7.379  1.00  5.80           C  \nATOM     11  O   THR A   2      14.993   9.862   7.443  1.00  6.94           O  \nATOM     12  CB  THR A   2      12.732  10.711   5.261  1.00 10.32           C  \nATOM     13  OG1 THR A   2      13.308   9.439   4.926  1.00 12.81           O  \nATOM     14  CG2 THR A   2      12.484  11.442   3.895  1.00 11.90           C  \nATOM     15  N   CYS A   3      13.488  11.241   8.417  1.00  5.24           N  \nATOM     16  CA  CYS A   3      13.660  10.707   9.787  1.00  5.39           C  \nATOM     17  C   CYS A   3      12.269  10.431  10.323  1.00  4.45           C  \nATOM     18  O   CYS A   3      11.393  11.308  10.185  1.00  6.54           O  \nATOM     19  CB  CYS A   3      14.368  11.748  10.691  1.00  5.99           C  \nATOM     20  SG  CYS A   3      15.885  12.426  10.016  1.00  7.01           S  \nATOM     21  N   CYS A   4      12.019   9.272  10.928  1.00  3.90           N  \nATOM     22  CA  CYS A   4      10.646   8.991  11.408  1.00  4.24           C  \nATOM     23  C   CYS A   4      10.654   8.793  12.919  1.00  3.72           C  \nATOM     24  O   CYS A   4      11.659   8.296  13.491  1.00  5.30           O  \nATOM     25  CB  CYS A   4      10.057   7.752  10.682  1.00  4.41           C  \nATOM     26  SG  CYS A   4       9.837   8.018   8.904  1.00  4.72           S  \nATOM     27  N   PRO A   5       9.561   9.108  13.563  1.00  3.96           N  \nATOM     28  CA  PRO A   5       9.448   9.034  15.012  1.00  4.25           C  \nATOM     29  C   PRO A   5       9.288   7.670  15.606  1.00  4.96           C  \nATOM     30  O   PRO A   5       9.490   7.519  16.819  1.00  7.44           O  \nATOM     31  CB  PRO A   5       8.230   9.957  15.345  1.00  5.11           C  \nATOM     32  CG  PRO A   5       7.338   9.786  14.114  1.00  5.24           C  \nATOM     33  CD  PRO A   5       8.366   9.804  12.958  1.00  5.20           C  \nATOM     34  N   SER A   6       8.875   6.686  14.796  1.00  4.83           N  \nATOM     35  CA  SER A   6       8.673   5.314  15.279  1.00  4.45           C  \nATOM     36  C   SER A   6       8.753   4.376  14.083  1.00  4.99           C  \nATOM     37  O   SER A   6       8.726   4.858  12.923  1.00  4.61           O  \nATOM     38  CB  SER A   6       7.340   5.121  15.996  1.00  5.05           C  \nATOM     39  OG  SER A   6       6.274   5.220  15.031  1.00  6.39           O  \nATOM     40  N   ILE A   7       8.881   3.075  14.358  1.00  4.94           N  \nATOM     41  CA  ILE A   7       8.912   2.083  13.258  1.00  6.33           C  \nATOM     42  C   ILE A   7       7.581   2.090  12.506  1.00  5.32           C  \nATOM     43  O   ILE A   7       7.670   2.031  11.245  1.00  6.85           O  \nATOM     44  CB  ILE A   7       9.207   0.677  13.924  1.00  8.43           C  \nATOM     45  CG1 ILE A   7      10.714   0.702  14.312  1.00  9.78           C  \nATOM     46  CG2 ILE A   7       8.811  -0.477  12.969  1.00 11.70           C  \nATOM     47  CD1 ILE A   7      11.185  -0.516  15.142  1.00  9.92           C  \nATOM     48  N   VAL A   8       6.458   2.162  13.159  1.00  5.02           N  \nATOM     49  CA  VAL A   8       5.145   2.209  12.453  1.00  6.93           C  \nATOM     50  C   VAL A   8       5.115   3.379  11.461  1.00  5.39           C  \nATOM     51  O   VAL A   8       4.664   3.268  10.343  1.00  6.30           O  \nATOM     52  CB  VAL A   8       3.995   2.354  13.478  1.00  9.64           C  \nATOM     53  CG1 VAL A   8       2.716   2.891  12.869  1.00 13.85           C  \nATOM     54  CG2 VAL A   8       3.758   1.032  14.208  1.00 11.97           C  \nATOM     55  N   ALA A   9       5.606   4.546  11.941  1.00  3.73           N  \nATOM     56  CA  ALA A   9       5.598   5.767  11.082  1.00  3.56           C  \nATOM     57  C   ALA A   9       6.441   5.527   9.850  1.00  4.13           C  \nATOM     58  O   ALA A   9       6.052   5.933   8.744  1.00  4.36           O  \nATOM     59  CB  ALA A   9       6.022   6.977  11.891  1.00  4.80           C  \nATOM     60  N   ARG A  10       7.647   4.909  10.005  1.00  3.73           N  \nATOM     61  CA  ARG A  10       8.496   4.609   8.837  1.00  3.38           C  \nATOM     62  C   ARG A  10       7.798   3.609   7.876  1.00  3.47           C  \nATOM     63  O   ARG A  10       7.878   3.778   6.651  1.00  4.67           O  \nATOM     64  CB  ARG A  10       9.847   4.020   9.305  1.00  3.95           C  \nATOM     65  CG  ARG A  10      10.752   3.607   8.149  1.00  4.55           C  \nATOM     66  CD  ARG A  10      11.226   4.699   7.244  1.00  5.89           C  \nATOM     67  NE  ARG A  10      12.143   5.571   8.035  1.00  6.20           N  \nATOM     68  CZ  ARG A  10      12.758   6.609   7.443  1.00  7.52           C  \nATOM     69  NH1 ARG A  10      12.539   6.932   6.158  1.00 10.68           N  \nATOM     70  NH2 ARG A  10      13.601   7.322   8.202  1.00  9.48           N  \nATOM     71  N   SER A  11       7.186   2.582   8.445  1.00  5.19           N  \nATOM     72  CA  SER A  11       6.500   1.584   7.565  1.00  4.60           C  \nATOM     73  C   SER A  11       5.382   2.313   6.773  1.00  4.84           C  \nATOM     74  O   SER A  11       5.213   2.016   5.557  1.00  5.84           O  \nATOM     75  CB  SER A  11       5.908   0.462   8.400  1.00  5.91           C  \nATOM     76  OG  SER A  11       6.990  -0.272   9.012  1.00  8.38           O  \nATOM     77  N   ASN A  12       4.648   3.182   7.446  1.00  3.54           N  \nATOM     78  CA  ASN A  12       3.545   3.935   6.751  1.00  4.57           C  \nATOM     79  C   ASN A  12       4.107   4.851   5.691  1.00  4.14           C  \nATOM     80  O   ASN A  12       3.536   5.001   4.617  1.00  5.52           O  \nATOM     81  CB  ASN A  12       2.663   4.677   7.748  1.00  6.42           C  \nATOM     82  CG  ASN A  12       1.802   3.735   8.610  1.00  8.25           C  \nATOM     83  OD1 ASN A  12       1.567   2.613   8.165  1.00 12.72           O  \nATOM     84  ND2 ASN A  12       1.394   4.252   9.767  1.00  9.92           N  \nATOM     85  N   PHE A  13       5.259   5.498   6.005  1.00  3.43           N  \nATOM     86  CA  PHE A  13       5.929   6.358   5.055  1.00  3.49           C  \nATOM     87  C   PHE A  13       6.304   5.578   3.799  1.00  3.40           C  \nATOM     88  O   PHE A  13       6.136   6.072   2.653  1.00  4.07           O  \nATOM     89  CB  PHE A  13       7.183   6.994   5.754  1.00  5.48           C  \nATOM     90  CG  PHE A  13       7.884   8.006   4.883  1.00  5.57           C  \nATOM     91  CD1 PHE A  13       8.906   7.586   4.027  1.00  6.99           C  \nATOM     92  CD2 PHE A  13       7.532   9.373   4.983  1.00  6.52           C  \nATOM     93  CE1 PHE A  13       9.560   8.539   3.194  1.00  8.20           C  \nATOM     94  CE2 PHE A  13       8.176  10.281   4.145  1.00  6.34           C  \nATOM     95  CZ  PHE A  13       9.141   9.845   3.292  1.00  6.84           C  \nATOM     96  N   ASN A  14       6.900   4.390   3.989  1.00  3.64           N  \nATOM     97  CA  ASN A  14       7.331   3.607   2.791  1.00  4.31           C  \nATOM     98  C   ASN A  14       6.116   3.210   1.915  1.00  3.98           C  \nATOM     99  O   ASN A  14       6.240   3.144   0.684  1.00  6.22           O  \nATOM    100  CB  ASN A  14       8.145   2.404   3.240  1.00  5.81           C  \nATOM    101  CG  ASN A  14       9.555   2.856   3.730  1.00  6.82           C  \nATOM    102  OD1 ASN A  14      10.013   3.895   3.323  1.00  9.43           O  \nATOM    103  ND2 ASN A  14      10.120   1.956   4.539  1.00  8.21           N  \nATOM    104  N   VAL A  15       4.993   2.927   2.571  1.00  3.76           N  \nATOM    105  CA  VAL A  15       3.782   2.599   1.742  1.00  3.98           C  \nATOM    106  C   VAL A  15       3.296   3.871   1.004  1.00  3.80           C  \nATOM    107  O   VAL A  15       2.947   3.817  -0.189  1.00  4.85           O  \nATOM    108  CB  VAL A  15       2.698   1.953   2.608  1.00  4.71           C  \nATOM    109  CG1 VAL A  15       1.384   1.826   1.806  1.00  6.67           C  \nATOM    110  CG2 VAL A  15       3.174   0.533   3.005  1.00  6.26           C  \nATOM    111  N   CYS A  16       3.321   4.987   1.720  1.00  3.79           N  \nATOM    112  CA  CYS A  16       2.890   6.285   1.126  1.00  3.54           C  \nATOM    113  C   CYS A  16       3.687   6.597  -0.111  1.00  3.48           C  \nATOM    114  O   CYS A  16       3.200   7.147  -1.103  1.00  4.63           O  \nATOM    115  CB  CYS A  16       3.039   7.369   2.240  1.00  4.58           C  \nATOM    116  SG  CYS A  16       2.559   9.014   1.649  1.00  5.66           S  \nATOM    117  N   ARG A  17       4.997   6.227  -0.100  1.00  3.99           N  \nATOM    118  CA  ARG A  17       5.895   6.489  -1.213  1.00  3.83           C  \nATOM    119  C   ARG A  17       5.738   5.560  -2.409  1.00  3.79           C  \nATOM    120  O   ARG A  17       6.228   5.901  -3.507  1.00  5.39           O  \nATOM    121  CB  ARG A  17       7.370   6.507  -0.731  1.00  4.11           C  \nATOM    122  CG  ARG A  17       7.717   7.687   0.206  1.00  4.69           C  \nATOM    123  CD  ARG A  17       7.949   8.947  -0.615  1.00  5.10           C  \nATOM    124  NE  ARG A  17       9.212   8.856  -1.337  1.00  4.71           N  \nATOM    125  CZ  ARG A  17       9.537   9.533  -2.431  1.00  5.28           C  \nATOM    126  NH1 ARG A  17       8.659  10.350  -3.032  1.00  6.67           N  \nATOM    127  NH2 ARG A  17      10.793   9.491  -2.899  1.00  6.41           N  \nATOM    128  N   LEU A  18       5.051   4.411  -2.204  1.00  4.70           N  \nATOM    129  CA  LEU A  18       4.933   3.431  -3.326  1.00  5.46           C  \nATOM    130  C   LEU A  18       4.397   4.014  -4.620  1.00  5.13           C  \nATOM    131  O   LEU A  18       4.988   3.755  -5.687  1.00  5.55           O  \nATOM    132  CB  LEU A  18       4.196   2.184  -2.863  1.00  6.47           C  \nATOM    133  CG  LEU A  18       4.960   1.178  -1.991  1.00  7.43           C  \nATOM    134  CD1 LEU A  18       3.907   0.097  -1.634  1.00  8.70           C  \nATOM    135  CD2 LEU A  18       6.129   0.606  -2.768  1.00  9.39           C  \nATOM    136  N   PRO A  19       3.329   4.795  -4.543  1.00  4.28           N  \nATOM    137  CA  PRO A  19       2.792   5.376  -5.797  1.00  5.38           C  \nATOM    138  C   PRO A  19       3.573   6.540  -6.322  1.00  6.30           C  \nATOM    139  O   PRO A  19       3.260   7.045  -7.422  1.00  9.62           O  \nATOM    140  CB  PRO A  19       1.358   5.766  -5.472  1.00  5.87           C  \nATOM    141  CG  PRO A  19       1.223   5.694  -3.993  1.00  6.47           C  \nATOM    142  CD  PRO A  19       2.421   4.941  -3.408  1.00  6.45           C  \nATOM    143  N   GLY A  20       4.565   7.047  -5.559  1.00  4.94           N  \nATOM    144  CA  GLY A  20       5.366   8.191  -6.018  1.00  5.39           C  \nATOM    145  C   GLY A  20       5.007   9.481  -5.280  1.00  5.03           C  \nATOM    146  O   GLY A  20       5.535  10.510  -5.730  1.00  7.34           O  \nATOM    147  N   THR A  21       4.181   9.438  -4.262  1.00  4.10           N  \nATOM    148  CA  THR A  21       3.767  10.609  -3.513  1.00  3.94           C  \nATOM    149  C   THR A  21       5.017  11.397  -3.042  1.00  3.96           C  \nATOM    150  O   THR A  21       5.947  10.757  -2.523  1.00  5.82           O  \nATOM    151  CB  THR A  21       2.992  10.188  -2.225  1.00  4.13           C  \nATOM    152  OG1 THR A  21       2.051   9.144  -2.623  1.00  5.45           O  \nATOM    153  CG2 THR A  21       2.260  11.349  -1.551  1.00  5.41           C  \nATOM    154  N   PRO A  22       4.971  12.703  -3.176  1.00  5.04           N  \nATOM    155  CA  PRO A  22       6.143  13.513  -2.696  1.00  4.69           C  \nATOM    156  C   PRO A  22       6.400  13.233  -1.225  1.00  4.19           C  \nATOM    157  O   PRO A  22       5.485  13.061  -0.382  1.00  4.47           O  \nATOM    158  CB  PRO A  22       5.703  14.969  -2.920  1.00  7.12           C  \nATOM    159  CG  PRO A  22       4.676  14.893  -3.996  1.00  7.03           C  \nATOM    160  CD  PRO A  22       3.964  13.567  -3.811  1.00  4.90           C  \nATOM    161  N   GLU A  23       7.728  13.297  -0.921  1.00  5.16           N  \nATOM    162  CA  GLU A  23       8.114  13.103   0.500  1.00  5.31           C  \nATOM    163  C   GLU A  23       7.427  14.073   1.410  1.00  4.11           C  \nATOM    164  O   GLU A  23       7.036  13.682   2.540  1.00  5.11           O  \nATOM    165  CB  GLU A  23       9.648  13.285   0.660  1.00  6.16           C  \nATOM    166  CG  GLU A  23      10.440  12.093   0.063  1.00  7.48           C  \nATOM    167  CD  GLU A  23      11.941  12.170   0.391  1.00  9.40           C  \nATOM    168  OE1 GLU A  23      12.416  13.225   0.681  1.00 10.40           O  \nATOM    169  OE2 GLU A  23      12.539  11.070   0.292  1.00 13.32           O  \nATOM    170  N   ALA A  24       7.212  15.334   0.966  1.00  4.56           N  \nATOM    171  CA  ALA A  24       6.614  16.317   1.913  1.00  4.49           C  \nATOM    172  C   ALA A  24       5.212  15.936   2.350  1.00  4.10           C  \nATOM    173  O   ALA A  24       4.782  16.166   3.495  1.00  5.64           O  \nATOM    174  CB  ALA A  24       6.605  17.695   1.246  1.00  5.80           C  \nATOM    175  N   ILE A  25       4.445  15.318   1.405  1.00  4.37           N  \nATOM    176  CA  ILE A  25       3.074  14.894   1.756  1.00  5.44           C  \nATOM    177  C   ILE A  25       3.085  13.643   2.645  1.00  4.32           C  \nATOM    178  O   ILE A  25       2.315  13.523   3.578  1.00  4.72           O  \nATOM    179  CB  ILE A  25       2.204  14.637   0.462  1.00  6.42           C  \nATOM    180  CG1 ILE A  25       1.815  16.048  -0.129  1.00  7.50           C  \nATOM    181  CG2 ILE A  25       0.903  13.864   0.811  1.00  7.65           C  \nATOM    182  CD1 ILE A  25       0.756  16.761   0.757  1.00  7.80           C  \nATOM    183  N   CYS A  26       4.032  12.764   2.313  1.00  3.92           N  \nATOM    184  CA  CYS A  26       4.180  11.549   3.187  1.00  4.37           C  \nATOM    185  C   CYS A  26       4.632  11.944   4.596  1.00  3.95           C  \nATOM    186  O   CYS A  26       4.227  11.252   5.547  1.00  4.74           O  \nATOM    187  CB  CYS A  26       5.038  10.518   2.539  1.00  4.63           C  \nATOM    188  SG  CYS A  26       4.349   9.794   1.022  1.00  5.61           S  \nATOM    189  N   ALA A  27       5.408  13.012   4.694  1.00  3.89           N  \nATOM    190  CA  ALA A  27       5.879  13.502   6.026  1.00  4.43           C  \nATOM    191  C   ALA A  27       4.696  13.908   6.882  1.00  4.26           C  \nATOM    192  O   ALA A  27       4.528  13.422   8.025  1.00  5.44           O  \nATOM    193  CB  ALA A  27       6.880  14.615   5.830  1.00  5.36           C  \nATOM    194  N   THR A  28       3.827  14.802   6.358  1.00  4.53           N  \nATOM    195  CA  THR A  28       2.691  15.221   7.194  1.00  5.08           C  \nATOM    196  C   THR A  28       1.672  14.132   7.434  1.00  4.62           C  \nATOM    197  O   THR A  28       0.947  14.112   8.468  1.00  7.80           O  \nATOM    198  CB  THR A  28       1.986  16.520   6.614  1.00  6.03           C  \nATOM    199  OG1 THR A  28       1.664  16.221   5.230  1.00  7.19           O  \nATOM    200  CG2 THR A  28       2.914  17.739   6.700  1.00  7.34           C  \nATOM    201  N   TYR A  29       1.621  13.190   6.511  1.00  5.01           N  \nATOM    202  CA  TYR A  29       0.715  12.045   6.657  1.00  6.60           C  \nATOM    203  C   TYR A  29       1.125  11.125   7.815  1.00  4.92           C  \nATOM    204  O   TYR A  29       0.286  10.632   8.545  1.00  7.13           O  \nATOM    205  CB  TYR A  29       0.755  11.229   5.322  1.00  9.66           C  \nATOM    206  CG  TYR A  29      -0.203  10.044   5.354  1.00 11.56           C  \nATOM    207  CD1 TYR A  29      -1.547  10.337   5.645  1.00 12.85           C  \nATOM    208  CD2 TYR A  29       0.193   8.750   5.100  1.00 14.44           C  \nATOM    209  CE1 TYR A  29      -2.496   9.329   5.673  1.00 16.61           C  \nATOM    210  CE2 TYR A  29      -0.801   7.705   5.156  1.00 17.11           C  \nATOM    211  CZ  TYR A  29      -2.079   8.031   5.430  1.00 19.99           C  \nATOM    212  OH  TYR A  29      -3.097   7.057   5.458  1.00 28.98           O  \nATOM    213  N   THR A  30       2.470  10.984   7.995  1.00  5.31           N  \nATOM    214  CA  THR A  30       2.986   9.994   8.950  1.00  5.70           C  \nATOM    215  C   THR A  30       3.609  10.505  10.230  1.00  6.28           C  \nATOM    216  O   THR A  30       3.766   9.715  11.186  1.00  8.77           O  \nATOM    217  CB  THR A  30       4.076   9.103   8.225  1.00  6.55           C  \nATOM    218  OG1 THR A  30       5.125  10.027   7.824  1.00  6.57           O  \nATOM    219  CG2 THR A  30       3.493   8.324   7.035  1.00  7.29           C  \nATOM    220  N   GLY A  31       3.984  11.764  10.241  1.00  4.99           N  \nATOM    221  CA  GLY A  31       4.769  12.336  11.360  1.00  5.50           C  \nATOM    222  C   GLY A  31       6.255  12.243  11.106  1.00  4.19           C  \nATOM    223  O   GLY A  31       7.037  12.750  11.954  1.00  6.12           O  \nATOM    224  N   CYS A  32       6.710  11.631   9.992  1.00  4.30           N  \nATOM    225  CA  CYS A  32       8.140  11.694   9.635  1.00  4.89           C  \nATOM    226  C   CYS A  32       8.500  13.141   9.206  1.00  5.50           C  \nATOM    227  O   CYS A  32       7.581  13.949   8.944  1.00  5.82           O  \nATOM    228  CB  CYS A  32       8.504  10.686   8.530  1.00  4.66           C  \nATOM    229  SG  CYS A  32       8.048   8.987   8.881  1.00  5.33           S  \nATOM    230  N   ILE A  33       9.793  13.410   9.173  1.00  6.02           N  \nATOM    231  CA  ILE A  33      10.280  14.760   8.823  1.00  5.24           C  \nATOM    232  C   ILE A  33      11.346  14.658   7.743  1.00  5.16           C  \nATOM    233  O   ILE A  33      11.971  13.583   7.552  1.00  7.19           O  \nATOM    234  CB  ILE A  33      10.790  15.535  10.085  1.00  5.49           C  \nATOM    235  CG1 ILE A  33      12.059  14.803  10.671  1.00  6.85           C  \nATOM    236  CG2 ILE A  33       9.684  15.686  11.138  1.00  6.45           C  \nATOM    237  CD1 ILE A  33      12.733  15.676  11.781  1.00  8.94           C  \nATOM    238  N   ILE A  34      11.490  15.773   7.038  1.00  5.52           N  \nATOM    239  CA  ILE A  34      12.552  15.877   6.036  1.00  6.82           C  \nATOM    240  C   ILE A  34      13.590  16.917   6.560  1.00  6.92           C  \nATOM    241  O   ILE A  34      13.168  18.006   6.945  1.00  9.22           O  \nATOM    242  CB  ILE A  34      11.987  16.360   4.681  1.00  8.11           C  \nATOM    243  CG1 ILE A  34      10.914  15.338   4.163  1.00  9.59           C  \nATOM    244  CG2 ILE A  34      13.131  16.517   3.629  1.00  9.73           C  \nATOM    245  CD1 ILE A  34      10.151  16.024   2.938  1.00 13.41           C  \nATOM    246  N   ILE A  35      14.856  16.493   6.536  1.00  7.06           N  \nATOM    247  CA  ILE A  35      15.930  17.454   6.941  1.00  7.52           C  \nATOM    248  C   ILE A  35      16.913  17.550   5.819  1.00  6.63           C  \nATOM    249  O   ILE A  35      17.097  16.660   4.970  1.00  7.90           O  \nATOM    250  CB  ILE A  35      16.622  16.995   8.285  1.00  8.07           C  \nATOM    251  CG1 ILE A  35      17.360  15.651   8.067  1.00  9.41           C  \nATOM    252  CG2 ILE A  35      15.592  16.974   9.434  1.00  9.46           C  \nATOM    253  CD1 ILE A  35      18.298  15.206   9.219  1.00  9.85           C  \nATOM    254  N   PRO A  36      17.664  18.669   5.806  1.00  8.07           N  \nATOM    255  CA  PRO A  36      18.635  18.861   4.738  1.00  8.78           C  \nATOM    256  C   PRO A  36      19.925  18.042   4.949  1.00  8.31           C  \nATOM    257  O   PRO A  36      20.593  17.742   3.945  1.00  9.09           O  \nATOM    258  CB  PRO A  36      18.945  20.364   4.783  1.00  9.67           C  \nATOM    259  CG  PRO A  36      18.238  20.937   5.908  1.00 10.15           C  \nATOM    260  CD  PRO A  36      17.371  19.900   6.596  1.00  9.53           C  \nATOM    261  N   GLY A  37      20.172  17.730   6.217  1.00  8.48           N  \nATOM    262  CA  GLY A  37      21.452  16.969   6.513  1.00  9.20           C  \nATOM    263  C   GLY A  37      21.143  15.478   6.427  1.00 10.41           C  \nATOM    264  O   GLY A  37      20.138  15.023   5.878  1.00 12.06           O  \nATOM    265  N   ALA A  38      22.055  14.701   7.032  1.00  9.24           N  \nATOM    266  CA  ALA A  38      22.019  13.242   7.020  1.00  9.24           C  \nATOM    267  C   ALA A  38      21.944  12.628   8.396  1.00  9.60           C  \nATOM    268  O   ALA A  38      21.869  11.387   8.435  1.00 13.65           O  \nATOM    269  CB  ALA A  38      23.246  12.697   6.275  1.00 10.43           C  \nATOM    270  N   THR A  39      21.894  13.435   9.436  1.00  8.70           N  \nATOM    271  CA  THR A  39      21.936  12.911  10.809  1.00  9.46           C  \nATOM    272  C   THR A  39      20.615  13.191  11.521  1.00  8.32           C  \nATOM    273  O   THR A  39      20.357  14.317  11.948  1.00  9.89           O  \nATOM    274  CB  THR A  39      23.131  13.601  11.593  1.00 10.72           C  \nATOM    275  OG1 THR A  39      24.284  13.401  10.709  1.00 11.66           O  \nATOM    276  CG2 THR A  39      23.340  12.935  12.962  1.00 11.81           C  \nATOM    277  N   CYS A  40      19.827  12.110  11.642  1.00  7.64           N  \nATOM    278  CA  CYS A  40      18.504  12.312  12.298  1.00  8.05           C  \nATOM    279  C   CYS A  40      18.684  12.451  13.784  1.00  7.63           C  \nATOM    280  O   CYS A  40      19.533  11.718  14.362  1.00  9.64           O  \nATOM    281  CB  CYS A  40      17.582  11.117  11.996  1.00  7.80           C  \nATOM    282  SG  CYS A  40      17.199  10.929  10.237  1.00  7.30           S  \nATOM    283  N   PRO A  41      17.880  13.266  14.426  1.00  8.00           N  \nATOM    284  CA  PRO A  41      17.924  13.421  15.877  1.00  8.96           C  \nATOM    285  C   PRO A  41      17.392  12.206  16.594  1.00  9.06           C  \nATOM    286  O   PRO A  41      16.652  11.368  16.033  1.00  8.82           O  \nATOM    287  CB  PRO A  41      17.076  14.658  16.145  1.00 10.39           C  \nATOM    288  CG  PRO A  41      16.098  14.689  14.997  1.00 10.99           C  \nATOM    289  CD  PRO A  41      16.859  14.150  13.779  1.00 10.49           C  \nATOM    290  N   GLY A  42      17.728  12.124  17.884  1.00  7.55           N  \nATOM    291  CA  GLY A  42      17.334  10.956  18.691  1.00  8.00           C  \nATOM    292  C   GLY A  42      15.875  10.688  18.871  1.00  7.22           C  \nATOM    293  O   GLY A  42      15.434   9.550  19.166  1.00  8.41           O  \nATOM    294  N   ASP A  43      15.036  11.747  18.715  1.00  5.54           N  \nATOM    295  CA  ASP A  43      13.564  11.573  18.836  1.00  5.85           C  \nATOM    296  C   ASP A  43      12.936  11.227  17.470  1.00  5.87           C  \nATOM    297  O   ASP A  43      11.720  11.040  17.428  1.00  7.29           O  \nATOM    298  CB  ASP A  43      12.933  12.737  19.580  1.00  6.72           C  \nATOM    299  CG  ASP A  43      13.140  14.094  18.958  1.00  8.59           C  \nATOM    300  OD1 ASP A  43      14.109  14.303  18.212  1.00  9.59           O  \nATOM    301  OD2 ASP A  43      12.267  14.963  19.265  1.00 11.45           O  \nATOM    302  N   TYR A  44      13.725  11.174  16.425  1.00  5.22           N  \nATOM    303  CA  TYR A  44      13.257  10.745  15.081  1.00  5.56           C  \nATOM    304  C   TYR A  44      14.275   9.687  14.612  1.00  4.61           C  \nATOM    305  O   TYR A  44      14.930   9.862  13.568  1.00  6.04           O  \nATOM    306  CB  TYR A  44      13.200  11.914  14.071  1.00  5.41           C  \nATOM    307  CG  TYR A  44      12.000  12.819  14.399  1.00  5.34           C  \nATOM    308  CD1 TYR A  44      12.119  13.853  15.332  1.00  6.59           C  \nATOM    309  CD2 TYR A  44      10.775  12.617  13.762  1.00  5.94           C  \nATOM    310  CE1 TYR A  44      11.045  14.675  15.610  1.00  5.97           C  \nATOM    311  CE2 TYR A  44       9.676  13.433  14.048  1.00  5.17           C  \nATOM    312  CZ  TYR A  44       9.802  14.456  14.996  1.00  5.96           C  \nATOM    313  OH  TYR A  44       8.740  15.265  15.269  1.00  8.60           O  \nATOM    314  N   ALA A  45      14.342   8.640  15.422  1.00  4.76           N  \nATOM    315  CA  ALA A  45      15.445   7.667  15.246  1.00  5.89           C  \nATOM    316  C   ALA A  45      15.171   6.533  14.280  1.00  6.67           C  \nATOM    317  O   ALA A  45      16.093   5.705  14.039  1.00  7.56           O  \nATOM    318  CB  ALA A  45      15.680   7.099  16.682  1.00  6.82           C  \nATOM    319  N   ASN A  46      13.966   6.502  13.739  1.00  5.80           N  \nATOM    320  CA  ASN A  46      13.512   5.395  12.878  1.00  6.15           C  \nATOM    321  C   ASN A  46      13.311   5.853  11.455  1.00  6.61           C  \nATOM    322  O   ASN A  46      13.733   6.929  11.026  1.00  7.18           O  \nATOM    323  CB  ASN A  46      12.266   4.769  13.501  1.00  7.27           C  \nATOM    324  CG  ASN A  46      12.538   4.304  14.922  1.00  7.98           C  \nATOM    325  OD1 ASN A  46      11.982   4.849  15.886  1.00 11.00           O  \nATOM    326  ND2 ASN A  46      13.407   3.298  15.015  1.00 10.32           N  \nATOM    327  OXT ASN A  46      12.703   4.973  10.746  1.00  7.86           O  \nTER     328      ASN A  46                                                      \nCONECT   20  282                                                                \nCONECT   26  229                                                                \nCONECT  116  188                                                                \nCONECT  188  116                                                                \nCONECT  229   26                                                                \nCONECT  282   20                                                                \nMASTER      227    0    0    2    2    1    0    6  327    1    6    4          \nEND                                                                             \n', 1);
      						    		$.get('http://www.rcsb.org/pdb/files/'+pdb_name+'.pdb', function(data) {			
      						    			var mol = ChemDoodle.readPDB(data);
      						    			pdb.loadMolecule(mol);
      						    			pdb.startAnimation();
      						    		});
      	    				    	}
      	    					}
      	    				}
      	    			});
      	    			
      	    			_this.p3dProtein.add(pan);
      	    		}
    			}
    			else{
    				_this.p3dProtein.setTitle('No proteins found');
    			}


  	    	}
    	});
    	
//    	$.get('http://ws.bioinfo.cipf.es/celldb/rest/v1/hsa/feature/id/brca2/xref?dbname=pdb', 
    	
    	
    	
    	
//    	http://www.rcsb.org/pdb/files/1A17.pdb
    	
//    	http://www.rcsb.org/pdb/files/AAAA.pdb
    	
//		var pan = Ext.create('Ext.panel.Panel',{
//			title:"3D Protein Viewer",
//	        border:false,
//	        cls:'panel-border-left',
//			flex:3,
//			bodyPadding:5,
//			autoScroll:true,
//			html:'<canvas class="ChemDoodleWebComponent" id="pdb_canvas_prueba" width="600" height="600" style="width: 600px; height: 600px; ">This browser does not support HTML5/Canvas.</canvas>',
//
//		});

    }
    return this.p3dProtein;

};




GeneInfoWidget.prototype.getEnsembleId = function (){

};


GeneInfoWidget.prototype.getData = function (){
	var _this = this;
	this.panel.disable();
	this.panel.setLoading("Getting information...");
//	category, subcategory, query, resource, callbackFunction
	var cellBaseManager = new CellBaseManager(this.species);
	cellBaseManager.success.addEventListener(function(sender,data){
		_this.dataReceived(data.result);//TODO
	});
	cellBaseManager.get("feature","gene", this.query, "fullinfo");
};
GeneInfoWidget.prototype.dataReceived = function (data){
	this.data=data[0][0];
	console.log(this.data);
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

ProteinInfoWidget.prototype.draw = InfoWidget.prototype.draw;
ProteinInfoWidget.prototype.render = InfoWidget.prototype.render;
ProteinInfoWidget.prototype.getTreePanel = InfoWidget.prototype.getTreePanel;
ProteinInfoWidget.prototype.checkDataTypes = InfoWidget.prototype.checkDataTypes;
ProteinInfoWidget.prototype.doGrid = InfoWidget.prototype.doGrid;

function ProteinInfoWidget(targetId, species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "Protein Info";
	InfoWidget.prototype.constructor.call(this, targetId, species, args);
};

ProteinInfoWidget.prototype.getdataTypes = function (){
	//Abstract method
	return dataTypes=[
	            { text: "Sumary", children: [
	                { text: "Long"},
	                { text: "Seq"}
	            ] },
	            { text: "Functional information", children: [
	                { text: "GO"},
	                { text: "Reactome"},
	                { text: "Interpro"}
	            ] },
	            { text: "Interactions"},
	            { text: "Variations"}
	           
	        ];
};
ProteinInfoWidget.prototype.optionClick = function (item){
	//Abstract method
	if (item.leaf){
		if(this.panel.getComponent(1)!=null){
			this.panel.getComponent(1).hide();
			this.panel.remove(1,false);
		}
		switch (item.text){
			case "":  break;
			case "":  break;
//			case "GO": this.panel.add(this.getGoGrid().show()); break;
			case "Reactome": break;
			case "Interpro": break;
			case "": break;
			case "": break;
			case "": break;
		}
	}
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

SnpInfoWidget.prototype.draw = InfoWidget.prototype.draw;
SnpInfoWidget.prototype.render = InfoWidget.prototype.render;
SnpInfoWidget.prototype.getTreePanel = InfoWidget.prototype.getTreePanel;
SnpInfoWidget.prototype.checkDataTypes = InfoWidget.prototype.checkDataTypes;
SnpInfoWidget.prototype.doGrid = InfoWidget.prototype.doGrid;
SnpInfoWidget.prototype.getSnpTemplate = InfoWidget.prototype.getSnpTemplate;
SnpInfoWidget.prototype.getSnpTranscriptTemplate = InfoWidget.prototype.getSnpTranscriptTemplate;
SnpInfoWidget.prototype.getConsequenceTypeTemplate = InfoWidget.prototype.getConsequenceTypeTemplate;
SnpInfoWidget.prototype.getPhenotypeTemplate = InfoWidget.prototype.getPhenotypeTemplate;
SnpInfoWidget.prototype.getPopulationTemplate = InfoWidget.prototype.getPopulationTemplate;

function SnpInfoWidget(targetId, species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "SNP Info";
	InfoWidget.prototype.constructor.call(this, targetId, species, args);
};

SnpInfoWidget.prototype.getdataTypes = function (){
	//Abstract method
	return dataTypes=[
	            { text: "Genomic", children: [
	                { text: "Information"},
	                { text: "Transcripts"}
	            ] },
	            { text: "Consequence type"},
	            { text: "Annotated phenotype"}
//	            { text: "Population frequency"}
	           
	        ];
};
SnpInfoWidget.prototype.optionClick = function (item){
	//Abstract method
	if (item.leaf){
		if(this.panel.getComponent(1)!=null){
			this.panel.getComponent(1).hide();
			this.panel.remove(1,false);
		}
		switch (item.text){
			case "Information":  this.panel.add(this.getInfoPanel(this.data).show()); break;
			case "Transcripts": this.panel.add(this.getSnpTranscriptPanel(this.data.transcriptVariations).show()); break;
			case "Consequence type": this.panel.add(this.getConsequenceTypePanel(this.data.transcriptVariations).show()); break;
			case "Annotated phenotype": this.panel.add(this.getPhenotypePanel(this.data.phenotype).show()); break;
//			case "Population frequency": this.panel.add(this.getPopulationPanel(this.data.population).show()); break;
		}
	}
};

SnpInfoWidget.prototype.getInfoPanel = function(data){
	if(data==null){
		return this.notFoundPanel;
	}
    if(this.infoPanel==null){
    	var tpl = this.getSnpTemplate();

		this.infoPanel = Ext.create('Ext.panel.Panel',{
			title:"Information",
	        border:false,
	        cls:'panel-border-left',
			flex:3,    
			bodyPadding:10,
			data:data,
			tpl:tpl
		});

    }
    return this.infoPanel;
};


SnpInfoWidget.prototype.getSnpTranscriptPanel = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.snpTranscriptGrid==null){
    	var tpl = this.getSnpTranscriptTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var snpTranscriptPanel = Ext.create('Ext.container.Container',{
				padding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(snpTranscriptPanel);
    	}
		this.snpTranscriptGrid = Ext.create('Ext.panel.Panel',{
			title:"Transcripts ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.snpTranscriptGrid;
};

SnpInfoWidget.prototype.getConsequenceTypePanel = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.consequencePanel==null){
    	var tpl = this.getConsequenceTypeTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var consPanel = Ext.create('Ext.container.Container',{
				padding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(consPanel);
    	}
		this.consequencePanel = Ext.create('Ext.panel.Panel',{
			title:"Consequence type ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.consequencePanel;
};


SnpInfoWidget.prototype.getPhenotypePanel = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.phenotypePanel==null){
    	var tpl = this.getPhenotypeTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var pan = Ext.create('Ext.container.Container',{
				padding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(pan);
    	}
		this.phenotypePanel = Ext.create('Ext.panel.Panel',{
			title:"Phenotype ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.phenotypePanel;
};



SnpInfoWidget.prototype.getPopulationPanel = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.populationPanel==null){
    	var tpl = this.getPopulationTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var pan = Ext.create('Ext.container.Container',{
				padding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(pan);
    	}
		this.populationPanel = Ext.create('Ext.panel.Panel',{
			title:"Population ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.populationPanel;
};


SnpInfoWidget.prototype.getData = function (){
	var _this = this;
	this.panel.disable();
	this.panel.setLoading("Getting information...");
//	category, subcategory, query, resource, callbackFunction
	var cellBaseManager = new CellBaseManager(this.species);
	cellBaseManager.success.addEventListener(function (sender,data){
        _this.dataReceived(data.result);//TODO
	});
	cellBaseManager.get("feature","snp", this.query, "info");
};
SnpInfoWidget.prototype.dataReceived = function (data){
//	var mappedSnps = data[0];
//	for ( var i = 0; i < mappedSnps.length; i++) {
//		if (mappedSnps[i].chromosome == this.feature.chromosome && mappedSnps[i].start == this.feature.start && mappedSnps[i].end == this.feature.end ){
//			this.data=mappedSnps[i];
//			console.log(mappedSnps[i]);
//		}
//	}
    this.data=data[0][0];
    console.log(this.data);
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

TranscriptInfoWidget.prototype.draw = InfoWidget.prototype.draw;
TranscriptInfoWidget.prototype.render = InfoWidget.prototype.render;
TranscriptInfoWidget.prototype.getTreePanel = InfoWidget.prototype.getTreePanel;
TranscriptInfoWidget.prototype.checkDataTypes = InfoWidget.prototype.checkDataTypes;
TranscriptInfoWidget.prototype.doGrid = InfoWidget.prototype.doGrid;
TranscriptInfoWidget.prototype.getGeneTemplate = InfoWidget.prototype.getGeneTemplate;
TranscriptInfoWidget.prototype.getTranscriptTemplate = InfoWidget.prototype.getTranscriptTemplate;
TranscriptInfoWidget.prototype.getExonTemplate = InfoWidget.prototype.getExonTemplate;
//shared with gene
TranscriptInfoWidget.prototype.get3Dprotein = GeneInfoWidget.prototype.get3Dprotein;
TranscriptInfoWidget.prototype.getGenePanel = GeneInfoWidget.prototype.getGenePanel;
TranscriptInfoWidget.prototype.getXrefGrid = GeneInfoWidget.prototype.getXrefGrid;
TranscriptInfoWidget.prototype.getTfbsGrid = GeneInfoWidget.prototype.getTfbsGrid;
TranscriptInfoWidget.prototype.getMirnaTargetGrid = GeneInfoWidget.prototype.getMirnaTargetGrid;
TranscriptInfoWidget.prototype.getProteinFeaturesGrid = GeneInfoWidget.prototype.getProteinFeaturesGrid;

function TranscriptInfoWidget(targetId, species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "Transcript";
	InfoWidget.prototype.constructor.call(this, targetId, species, args);
};

TranscriptInfoWidget.prototype.getdataTypes = function (){
	//Abstract method
	return dataTypes=[
	            { text: "Genomic", children: [
	                 { text: "Information"},
	                 { text: "Gene"},
	                 { text: "Exons"},
	                 { text: "Xrefs"}
	            ] },
	            { text: "Functional information", children: [
	                  { text: "GO"},
	                  { text: "Reactome"},
	                  { text: "Interpro"}
	            ] },
	            { text: "Variation", children: [
	                  { text: "SNPs"},
	                  { text: "Mutations"}
	            ] },
	            { text: "Regulatory", children: [
	                  { text: "TFBS"},
	                  { text: "miRNA targets"}                   
	            ]},
	            { text:"Protein", children: [
	                  { text: "Features"},//protein profile
	                  { text: "3D structure"}
	            ]}	            
	        ];
};
TranscriptInfoWidget.prototype.optionClick = function (item){
	//Abstract method
	if (item.leaf){
		if(this.panel.getComponent(1)!=null){
			this.panel.getComponent(1).hide();
			this.panel.remove(1,false);
		}
		switch (item.text){
			case "Information": this.panel.add(this.getInfoPanel(this.data).show()); break;
			case "Gene": this.panel.add(this.getGenePanel(this.data.gene).show());  break;
			case "Exons": this.panel.add(this.getExonsGrid(this.data.exons).show());  break;
			case "Xrefs": this.panel.add(this.getXrefGrid([this.data], "Xref", 'dbName').show());  break;
			case "GO": this.panel.add(this.getXrefGrid([this.data], "GO").show());  break;
			case "Interpro": this.panel.add(this.getXrefGrid([this.data], "Interpro").show());  break;
			case "Reactome": this.panel.add(this.getXrefGrid([this.data], "Reactome").show());  break;
			case "SNPs": this.panel.add(this.getSnpsGrid(this.data.snps).show());  break;
			case "Mutations": this.panel.add(this.getMutationsGrid(this.data.mutations).show());  break;
			case "TFBS": this.panel.add(this.getTfbsGrid(this.data.tfbs).show());  break;
			case "miRNA targets": this.panel.add(this.getMirnaTargetGrid(this.data.mirnaTargets).show());  break;
			case "Features": this.panel.add(this.getProteinFeaturesGrid(this.data.proteinFeatures).show());  break;
			case "3D structure": this.panel.add(this.get3Dprotein(this.data.snps).show());  break;
		}
	}
};

TranscriptInfoWidget.prototype.getInfoPanel = function(data){
	if(data==null){
		return this.notFoundPanel;
	}
	if(this.infoPanel==null){
		
    	var tpl = this.getTranscriptTemplate();
    	
		this.infoPanel = Ext.create('Ext.panel.Panel',{
			title:"Information",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:10,
			autoScroll:true,
			data:data,//para el template
			tpl:tpl
		});
	}
	return this.infoPanel;
};


TranscriptInfoWidget.prototype.getExonsGrid = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.exonsGrid==null){

    	var tpl = this.getExonTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var exonPanel = Ext.create('Ext.container.Container',{
				padding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(exonPanel);
    	}
		this.exonsGrid = Ext.create('Ext.panel.Panel',{
			title:"Exons ("+i+")",
	        border:false,
	        cls:'panel-border-left',
			flex:3,
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.exonsGrid;
};



//TODO hay muchos y tarda
TranscriptInfoWidget.prototype.getSnpsGrid = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.snpsGrid==null){
    	var groupField = '';
    	var modelName = 'SNPs';
	    var fields = ['chromosome','start','end','name',"strand","alleleString","displaySoConsequence"];
		var columns = [
		               	{header : 'Name',dataIndex: 'name',flex:2},
		               	{header : 'Location: chr:start-end (strand)', xtype:'templatecolumn', tpl:'{chromosome}:{start}-{end} ({strand})',flex:2},
						{header : 'Alleles',dataIndex: 'alleleString',flex:0.7},
						{header : 'Most severe SO term',dataIndex: 'displaySoConsequence',flex:2}
		             ];
		this.snpsGrid = this.doGrid(columns,fields,modelName,groupField);
		this.snpsGrid.store.loadData(data);
    }
    return this.snpsGrid;
};

TranscriptInfoWidget.prototype.getMutationsGrid = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this.mutationsGrid==null){
    	var groupField = '';
    	var modelName = 'Mutations';
	    var fields = ["chromosome","start","end","mutationAa","mutationCds","primaryHistology","source"];
		var columns = [
		                {header : 'Mutation AA',dataIndex: 'mutationAa',flex:1},
		               	{header : 'Mutation CDS',dataIndex: 'mutationCds',flex:1.5},
		               	{header : 'Location: chr:start-end', xtype:'templatecolumn', tpl:'{chromosome}:{start}-{end}',flex:1.7},
						{header : 'Primary histology',dataIndex: 'primaryHistology',flex:1},
						{header : 'Source',dataIndex: 'source',flex:1}
		             ];
		this.mutationsGrid = this.doGrid(columns,fields,modelName,groupField);
		this.mutationsGrid.store.loadData(data);
    }
    return this.mutationsGrid;
};


TranscriptInfoWidget.prototype.getData = function (){
	var _this = this;
	this.panel.disable();
	this.panel.setLoading("Getting information...");
//	category, subcategory, query, resource, callbackFunction
	
	var cellBaseManager = new CellBaseManager(this.species);
	cellBaseManager.success.addEventListener(function(sender,data){
		_this.dataReceived(data.result);//TODO
	});
	cellBaseManager.get("feature","transcript", this.query, "fullinfo");
};
TranscriptInfoWidget.prototype.dataReceived = function (data){
	this.data=data[0][0];
	console.log(this.data);
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};




/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

VCFVariantInfoWidget.prototype.draw = InfoWidget.prototype.draw;
VCFVariantInfoWidget.prototype.render = InfoWidget.prototype.render;
VCFVariantInfoWidget.prototype.getTreePanel = InfoWidget.prototype.getTreePanel;
VCFVariantInfoWidget.prototype.checkDataTypes = InfoWidget.prototype.checkDataTypes;
VCFVariantInfoWidget.prototype.doGrid = InfoWidget.prototype.doGrid;
VCFVariantInfoWidget.prototype.getVCFVariantTemplate = InfoWidget.prototype.getVCFVariantTemplate;
VCFVariantInfoWidget.prototype.getVariantEffectTemplate = InfoWidget.prototype.getVariantEffectTemplate;

function VCFVariantInfoWidget(targetId, species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "VCF variant Info";
	InfoWidget.prototype.constructor.call(this, targetId, species, args);
};

VCFVariantInfoWidget.prototype.getdataTypes = function (){
	return dataTypes=[
	            { text: "Genomic", children: [
	                { text: "Information"},
	                { text: "Variant effect"},
	                { text: "Header"},
	                { text: "Samples"}
	            ] }
	        ];
};
VCFVariantInfoWidget.prototype.optionClick = function (item){
	//Abstract method
	if (item.leaf){
		if(this.panel.getComponent(1)!=null){
			this.panel.getComponent(1).hide();
			this.panel.remove(1,false);
		}
		switch (item.text){
			case "Information":  this.panel.add(this.getInfoPanel(this.data.feature).show()); break;
			case "Variant effect":this.panel.add(this.getEffectPanel(this.data.consequenceType).show()); break;
			case "Header":this.panel.add(this.getHeaderPanel(this.data.header).show()); break;
			case "Samples":this.panel.add(this.getSamplesGrid(this.data.feature.sampleData,this.data.samples,this.data.feature.format).show()); break;
			case "Population": break;
		}
	}
};

VCFVariantInfoWidget.prototype.getInfoPanel = function(data){
	if(data==null){
		return this.notFoundPanel;
	}
    if(this.infoPanel==null){

    	var tpl = this.getVCFVariantTemplate();

		this.infoPanel = Ext.create('Ext.panel.Panel',{
			title:"Information",
	        border:false,
	        cls:'panel-border-left',
			flex:3,    
			bodyPadding:10,
			data:data,
			tpl:tpl
		});

    }
    return this.infoPanel;
};

VCFVariantInfoWidget.prototype.getEffectPanel = function(data){
	if(data.length<=0){
		return this.notFoundPanel;
	}
	for ( var i = 0; i < data.length; i++) {
		data[i].consequence = data[i].consequenceType+" - "+data[i].consequenceTypeObo;
		if(data[i].featureName == ""){data[i].featureName="-";}
		if(data[i].geneId == ""){data[i].geneId="-";}
		if(data[i].transcriptId == ""){data[i].transcriptId="-";}
		if(data[i].featureBiotype == ""){data[i].featureBiotype="-";}
		if(data[i].aaPosition == ""){data[i].aaPosition="-";}
		if(data[i].aminoacidChange == ""){data[i].aminoacidChange="-";}

	}
	
    if(this.effectGrid==null){
    	var groupField = 'consequence';
    	var modelName = "effectGridModel";
    	var fields = ['featureName','geneId','transcriptId','featureBiotype','aaPosition','aminoacidChange','consequence'];
    	var columns = [
    	               {header : 'Feature',dataIndex: 'featureName',flex:1},
    	               {header : 'Gene Id',dataIndex: 'geneId',flex:1.5},
    	               {header : 'Transcript Id',dataIndex: 'transcriptId',flex:1.5},
    	               {header : 'Feat.Biotype',dataIndex: 'featureBiotype',flex:1},
    	               {header : 'aa Position',dataIndex: 'aaPosition',flex:1},
    	               {header : 'aa Change',dataIndex: 'aminoacidChange',flex:1}
    	               ];
    	this.effectGrid = this.doGrid(columns,fields,modelName,groupField);
    	this.effectGrid.store.loadData(data);
    }
    return this.effectGrid;
	
//    if(this.effectPanel==null){
//    	var tpl = this.getVariantEffectTemplate();
//    	//sort by consequenceTypeObo
//    	data.sort(function(a,b){
//    		if(a.consequenceTypeObo == b.consequenceTypeObo){return 0;}
//    		return (a.consequenceTypeObo < b.consequenceTypeObo) ? -1 : 1;
//    	});
//    	
//    	
//    	var panels = [];
//    	for ( var i = 0; i < data.length; i++) {
//			var transcriptPanel = Ext.create('Ext.container.Container',{
//				padding:5,
//				data:data[i],
//				tpl:tpl
//			});
//			panels.push(transcriptPanel);
//    	}
//		this.effectPanel = Ext.create('Ext.panel.Panel',{
//			title:"Effects ("+i+")",
//			border:false,
//			cls:'panel-border-left',
//			flex:3,    
//			bodyPadding:5,
//			autoScroll:true,
//			items:panels
//		});
//    }
//    return this.effectPanel;
};

VCFVariantInfoWidget.prototype.getHeaderPanel = function(data){
	if(data==""){
		return this.notFoundPanel;
	}
    if(this.headerPanel==null){

		this.headerPanel = Ext.create('Ext.panel.Panel',{
			title:"Information",
	        border:false,
	        cls:'panel-border-left',
			flex:3,    
			bodyPadding:10,
			html:data
		});

    }
    return this.headerPanel;
};

VCFVariantInfoWidget.prototype.getSamplesGrid = function(samplesData,samples,format){
	var sData = samplesData.split("\t").slice(9);
	if(sData.length<=0){
		return this.notFoundPanel;
	}
	var data = new Array(samples.length);
	for ( var i = 0, li = data.length; i < li; i++) {
		data[i] = {id:samples[i],info:sData[i]};
	}
	
    if(this.samplesGrid==null){
    	var groupField = '';
    	var modelName = 'VCF samples';
	    var fields = ["id","info"];
		var columns = [
		                {header : 'Identifier',dataIndex: 'id',flex:1},
		                {header : format,dataIndex: 'info',flex:5}
		             ];
		this.samplesGrid = this.doGrid(columns,fields,modelName,groupField);
		this.samplesGrid.store.loadData(data);
    }
    return this.samplesGrid;
};

VCFVariantInfoWidget.prototype.getData = function (){
	var _this = this;
	this.panel.disable();
	this.panel.setLoading("Getting information...");
//	category, subcategory, query, resource, callbackFunction
	var cellBaseManager = new CellBaseManager(this.species);
	cellBaseManager.success.addEventListener(function(sender,data){
		_this.dataReceived(data.result);
	});
	var query = this.feature.chromosome+":"+this.feature.start+":"+this.feature.ref+":"+this.feature.alt;
	cellBaseManager.get("genomic","variant", query, "consequence_type");
};

VCFVariantInfoWidget.prototype.dataReceived = function (data){
	this.data = new Object();
	this.data["header"] = this.adapter.header;
	this.data["samples"] = this.adapter.samples;
	this.data["feature"] = this.feature;
	this.data["consequenceType"] = data;
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function CellBaseManager(species, args) {
//	console.log(species);
	
	this.host = CELLBASE_HOST;
	this.version = CELLBASE_VERSION;

	this.species = species;
	
	this.category = null;
	this.subcategory = null;

	// commons query params
	this.contentformat = "json";
	this.fileformat = "";
	this.outputcompress = false;
	this.dataType = "script";

	this.query = null;
	this.originalQuery = "";
	this.resource = "";

	this.params = {};
	
	this.async = true;
	
	//Queue of queries
	this.maxQuery = 30;
	this.numberQueries = 0;
	this.results = new Array();
	this.resultsCount = new Array();
	this.batching = false;
	
	
	if (args != null){
		if(args.host != null){
			this.host = args.host;
		}
		if(args.async != null){
			this.async = args.async;
		}
	}
	
	
	
	//Events
	this.completed = new Event();
	this.success = new Event();
	this.batchSuccessed = new Event();
	this.error = new Event();

	this.setVersion = function(version){
		this.version = version;
	},
	
	this.setSpecies = function(specie){
		this.species = specie;
	},
	
	this.getVersion = function(){
		return this.version;
	},
	
	this.getSpecies = function(){
		return this.species;
	},
	
	
	
	/** Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation. 
	 * Note that synchronous requests may temporarily lock the browser, disabling any actions while the request is active. **/
	this.setAsync = function(async){
		this.async = async;
	};

	this.getUrl = function() {
		if (this.query != null) {
			return this.host + "/" + this.version + "/" + this.species + "/"+ this.category + "/" + this.subcategory + "/" + this.query+ "/" + this.resource; // + "?contentformat=" + this.contentformat;
		} else {
			return this.host + "/" + this.version + "/" + this.species + "/"+ this.category + "/" + this.subcategory + "/"+ this.resource; // + "?contentformat=" +;
		}

	};

	this.get = function(category, subcategory, query, resource, params, callbackFunction) {
		if(params!=null){
			this.params = params;
		}
//		if(query instanceof Array){
//				this.originalQuery = query;
//				this.batching = true;
//				this.results= new Array();
//				return this.getMultiple(category, subcategory, query, resource);
//		}else{
//				query = new String(query);
//				query = query.replace(/\s/g, "");
//				var querySplitted = query.split(",");
//				this.originalQuery = querySplitted;
//				if (this.maxQuery <querySplitted.length){
//					this.batching = true;
//					this.getMultiple(category, subcategory, querySplitted, resource, callbackFunction);
//				}
//				else{
//					this.batching = false;
//					return this.getSingle(category, subcategory, query, resource, callbackFunction);
//				}
//		}

        if(query != null){
            var querys;
            if(query instanceof Array){
                querys = query;
            }else{
                querys = query.split(',');
            }
            this.originalQuery = querys;
            if(querys.length > 1){
                this.batching = true;
                this.results= new Array();
                return this.getMultiple(category, subcategory, querys, resource);
            }else{
                if (this.maxQuery < querys.length){
                    this.batching = true;
                    this.getMultiple(category, subcategory, querys, resource, callbackFunction);
                } else{
                    this.batching = false;
                    return this.getSingle(category, subcategory, querys[0], resource, callbackFunction);
                }
            }
        }else{
            return this.getSingle(category, subcategory, query, resource, callbackFunction);
        }

	},
//	this.getAllSpecies = function() {
//		
//		//Este código todavía no funciona xq el this._callServer(url) cellBase no tiene una respuesta preparada para this._callServer(url)
//		//es decir, no devuelve jsonp, cuando este todo implementado ya merecerá la pena hacerlo bien
//		var url = this.host + "/" + this.version + "/species";
//		this._callServer(url);
//	},
	this._joinToResults = function(response){
		this.resultsCount.push(true);
		this.results[response.id] = response.data;
		if (this.numberQueries == this.resultsCount.length){
			var result = [];
			
			for (var i = 0; i< this.results.length; i++){
				for (var j = 0; j< this.results[i].length; j++){
					result.push(this.results[i][j]);
				}
			}
			this.success.notify({
				"result": result, 
				"category":  this.category, 
				"subcategory": this.subcategory, 
				"query": this.originalQuery, 
				"resource":this.resource, 
				"params":this.params, 
				"error": ''
			});
		}
	},
	
	this.getSingle = function(category, subcategory, query, resource, batchID, callbackFunction) {
		this.category = category;
		this.subcategory = subcategory;
		this.query = query;
		this.resource = resource;
		var url = this.getUrl();
		return this._callServer(url, batchID, callbackFunction);
	},
	
	this.getMultiple = function(category, subcategory, queryArray, resource, callbackFunction) {
		var pieces = new Array();
		//Primero dividimos el queryArray en trocitos tratables
		if (queryArray.length > this.maxQuery){
			for (var i = 0; i < queryArray.length; i=i+this.maxQuery){
				pieces.push(queryArray.slice(i, i+(this.maxQuery)));
			}
		}else{
			pieces.push(queryArray);
		}
		
		this.numberQueries = pieces.length;
		var _this = this;
		
		this.batchSuccessed.addEventListener(function (evt, response){
			_this._joinToResults(response);
		});	
		
		for (var i = 0; i < pieces.length; i++){
		//	this.get(category, subcategory, pieces[i].toString(), resource);
			this.results.push(new Array());
			this.getSingle(category, subcategory, pieces[i].toString(), resource, i);
		}
	},


	this._callServer = function(url, batchID, callbackFunction) {
		var _this = this;
		this.params["of"] = this.contentformat;
//			jQuery.support.cors = true;
			url = url + this.getQuery(this.params,url);
			console.log(url);
			if(this.async == true){
				$.ajax({
					type : "GET",
					url : url,
                    dataType: 'json',//still firefox 20 does not auto serialize JSON, You can force it to always do the parsing by adding dataType: 'json' to your call.
					async : this.async,
					success : function(data, textStatus, jqXHR) {
//							if(data==""){console.log("data is empty");data="[]";}
//							var jsonResponse = JSON.parse(data);
							var jsonResponse = data;

							if (_this.batching){
								_this.batchSuccessed.notify({data:jsonResponse, id:batchID});
							}else{
								//TODO no siempre el resource coincide con el featureType, ejemplo: mirna es el featureType del resource mirna_targets
								_this.success.notify({
									"result": jsonResponse, 
									"category":  _this.category, 
									"subcategory": _this.subcategory, 
									"query": _this.originalQuery, 
									"resource":_this.resource, 
									"params":_this.params, 
									"error": ''
								});
							}
						
					},
					complete : function() {
						_this.completed.notify();
						
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log("CellBaseManager: Ajax call returned : "+errorThrown+'\t'+textStatus+'\t'+jqXHR.statusText+" END");
						_this.error.notify();
						
					}
				});
			}else{
				var response = null;
				$.ajax({
					type : "GET",
					url : url,
                    dataType: 'json',
					async : this.async,
					success : function(data, textStatus, jqXHR) {
//							if(data==""){console.log("data is empty");data="[]";}
							var jsonResponse = data;
							response =  {
									"result": jsonResponse,
									"category":  _this.category,
									"subcategory": _this.subcategory,
									"query": _this.originalQuery,
									"resource":_this.resource,
									"params":_this.params,
									"error": ''
							}
					},
					error : function(jqXHR, textStatus, errorThrown) {
					}
				});
				return response;
			}
	};
}

CellBaseManager.prototype.getQuery = function(paramsWS,url){
	var chr = "?";
	if(url.indexOf("?")!=-1){
		chr = "&";
	}
	var query = "";
	for ( var key in paramsWS) {
		if(paramsWS[key]!=null)
			query+=key+"="+paramsWS[key].toString()+"&";
	}
	if(query!="")
		query = chr+query.substring(0, query.length-1);
	return query;
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

	/*Nuevo tipo ventana*/
	Ext.define("Ext.ux.Window",{
		extend:"Ext.window.Window",
		minimizable:true,
		constrain:true,
		collapsible:true,
		initComponent: function () {
			this.callParent();
			if(this.taskbar!=null){//si no existe, las ventanas funcionan como hasta ahora
				this.zIndexManager = this.taskbar.winMgr;
				this.iconCls='icon-grid';
				this.button=Ext.create('Ext.button.Button', {
					text:this.title,
					window:this,
					iconCls : this.iconCls,
					handler:function(){
						if(this.window.zIndexManager.front==this.window){
							this.window.minimize();
						}else{
							this.window.show();
						}
					}
				});
				this.taskbar.add(this.button);
				
				
				this.contextMenu = new Ext.menu.Menu({
					items: [{
						text: 'Close',
						window:this,
						iconCls:'tools-icons x-tool-close',
						handler:function(){this.window.close();}
					}]
				});
				this.button.getEl().on('contextmenu', function(e){
													e.preventDefault();
													this.contextMenu.showAt(e.getX(),e.getY()-10-(this.contextMenu.items.length)*25);
													},this);
				
				this.button.on('destroy', function(){this.window.close();});
				
				//Taskbar button can be destroying
				this.on('destroy',function(){if(this.button.destroying!=true){this.button.destroy();}});
				
				this.on('minimize',function(){this.hide();});
				this.on('deactivate',function(){
					if(this.zIndexManager && this.zIndexManager.front.ghostPanel){
						this.zIndexManager.unregister(this.zIndexManager.front.ghostPanel);
					}
					this.button.toggle(false);
				});
				this.on('activate',function(){this.button.toggle(true);});
				
			}
		}
	});
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function GenomicAttributesWidget(species, args){
	var _this=this;
	this.id = "GenomicAttributesWidget" + Math.round(Math.random()*10000);
	
	this.species=species;
	this.args=args;
	
	this.title = "None";
	this.featureType = "gene";
	
	this.columnsCount = null; /** El numero de columns que el attributes widget leera del fichero, si null lo leera entero **/
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.columnsCount!= null){
        	this.columnsCount = args.columnsCount;       
        }
        if (args.featureType!= null){
        	this.featureType = args.featureType;
        }
        if (args.viewer!= null){
        	this.viewer = args.viewer;      
        	args.listWidgetArgs.viewer = args.viewer;
        }
    }
	
	this.listWidget = new ListWidget(this.species,args.listWidgetArgs);
	
	this.attributesPanel = new AttributesPanel({height: 240, columnsCount: this.columnsCount,wum:args.wum,tags:args.tags});
	
	/** Event **/
	this.onMarkerClicked = new Event(this);
	this.onTrackAddAction = new Event(this);
	
	
	/**Atach events i listen**/
	this.attributesPanel.onDataChange.addEventListener(function(sender,data){
		_this.dataChange(data);
	});
	
	
};

GenomicAttributesWidget.prototype.draw = function (){
	var _this=this;
	if (this.panel == null){
		
		this.karyotypePanel  = Ext.create('Ext.panel.Panel', {
			id:this.id+"karyotypePanel",
			height:350,
			maxHeight:350,
			border:0,
//			bodyPadding: 15,
			padding:'0 0 0 0',
			html:'<div id="' + this.id + "karyotypeDiv" +'" ><div>'
		});
		
		this.karyotypePanel.on("afterrender",function(){
			var div = $('#'+_this.id+"karyotypeDiv")[0];
			console.log(div);
			_this.karyotypeWidget = new KaryotypeWidget(div,{
				width:1000,
				height:340,
				species:_this.viewer.species,
				region:_this.viewer.region
			});
			_this.karyotypeWidget.onClick.addEventListener(function(sender,data){
				_this.viewer.region.load(data)
				_this.viewer.onRegionChange.notify({sender:"KaryotypePanel"});
			});
			_this.karyotypeWidget.drawKaryotype();
		});
		
		this.filtersButton = Ext.create('Ext.button.Button', {
			 text: 'Additional Filters',
			 disabled:true,
			 listeners: {
			       scope: this,
			       click: function(){this.onAdditionalInformationClick();}
	        }
		});
		
		this.addTrackButton = Ext.create('Ext.button.Button', {
			text:'Add Track',
			disabled:true,
			handler: function(){
				_this.onTrackAddAction.notify({"adapter":_this.adapter,"fileName":_this.attributesPanel.fileName});
				}
		});
		
		this.panel  = Ext.create('Ext.ux.Window', {
			title : this.title,
			resizable: false,
			minimizable :true,
			constrain:true,
			closable:true,
			bodyStyle: 'background:#fff;',
			taskbar:Ext.getCmp(this.args.viewer.id+'uxTaskbar'),
			items: [this.attributesPanel.getPanel(),this.karyotypePanel],
			width: 1035,
		    height: 653,
		    buttonAlign:'left',
			buttons:[this.addTrackButton,'->',
			         {text:'Close', handler: function(){_this.panel.close();}}],
	 		listeners: {
		    	scope: this,
		    	minimize:function(){
					this.panel.hide();
		       	},
		      	destroy: function(){
		       		delete this.panel;
		      	}
	    	}
		});
		this.attributesPanel.barField.add(this.filtersButton);
		this.panel.setLoading();
	}	
	this.panel.show();
		
};

//GenomicAttributesWidget.prototype.getMainPanel = function (){
//	var _this=this;
//	if (this.panel == null){
//		
//		this.karyotypePanel  = Ext.create('Ext.panel.Panel', {
//			height:350,
//			maxHeight:350,
//			border:0,
//			bodyPadding: 15,
//			padding:'0 0 0 0',
//			html:'<div id="' + this.id + "karyotypeDiv" +'" ><div>'
//		});
//
//		this.filtersButton = Ext.create('Ext.button.Button', {
//			 text: 'Additional Filters',
//			 disabled:true,
//			 listeners: {
//			       scope: this,
//			       click: function(){this.onAdditionalInformationClick();}
//	        }
//		});
//		
//		this.addTrackButton = Ext.create('Ext.button.Button', {
//			text:'Add Track',
//			disabled:true,
//			handler: function(){ 
//				_this.onTrackAddAction.notify({"features":_this.features,"trackName":_this.attributesPanel.fileName});
//				}
//		});
//		
////		this.panel  = Ext.create('Ext.ux.Window', {
////			title : this.title,
////			resizable: false,
////			minimizable :true,
////			constrain:true,
////			closable:true,
////			items: [this.attributesPanel.getPanel(),this.karyotypePanel],
////			width: 1035,
////		    height: 653,
////		    buttonAlign:'left',
////			buttons:[this.addTrackButton,'->',
////			         {text:'Close', handler: function(){_this.panel.close();}}],
////	 		listeners: {
////		    	scope: this,
////		    	minimize:function(){
////					this.panel.hide();
////		       	},
////		      	destroy: function(){
////		       		delete this.panel;
////		      	}
////	    	}
////		});
//		this.attributesPanel.getPanel();
//		this.attributesPanel.barField.add(this.filtersButton);
////		this.panel.setLoading();
////		this.drawKaryotype();
//	}	
//	return [this.attributesPanel.getPanel(),this.karyotypePanel];
//		
//};

//GenomicAttributesWidget.prototype.fill = function (queryNames){
//	var _this = this;
//	var cellBaseDataAdapter = new CellBaseDataAdapter(this.species);
//	cellBaseDataAdapter.successed.addEventListener(function(sender){
//		_this.karyotypePanel.setLoading("Retrieving data");
//		for (var i = 0; i < cellBaseDataAdapter.dataset.toJSON().length; i++) {
//				_this.karyotypeWidget.mark(cellBaseDataAdapter.dataset.toJSON()[i]);
//				
//		}
//		_this.features=cellBaseDataAdapter.dataset.toJSON();
//		_this.query = {"dataset": cellBaseDataAdapter.dataset, "resource":queryNames }; 
//		_this.karyotypePanel.setLoading(false);
//		_this.filtersButton.enable();
//		_this.addTrackButton.enable();
//		
//	});
//	cellBaseDataAdapter.fill("feature", this.featureType, queryNames.toString(), "info");
//};

GenomicAttributesWidget.prototype.dataChange = function (items){
		try{
					var _this = this;
					
					this.karyotypePanel.setLoading("Connecting to Database");
					this.karyotypeWidget.unmark();
					var _this=this;
					var externalNames = [];
					
					for (var i = 0; i < items.length; i++) {
						externalNames.push(items[i].data[0]);
					}	
					if (items.length > 0){
						this.fill(externalNames);
					}
					else{
						this.karyotypePanel.setLoading(false);
					}
		}
		catch(e){
			alert(e);
			
		}
		finally{
			this.karyotypePanel.setLoading(false);
		}
};


GenomicAttributesWidget.prototype.onAdditionalInformationClick = function (){
	var _this=this;
	this.listWidget.draw(this.cbResponse, false);
	this.listWidget.onFilterResult.addEventListener(function(sender,data){
			_this.karyotypeWidget.unmark();
			var items  = data;
			for (var i = 0; i < items.length; i++) {
				var feature = items[i].data;
				_this.karyotypeWidget.addMark(feature);
			}
		
		_this.attributesPanel.store.clearFilter();
		_this.attributesPanel.store.filter(function(item){
			return item.data.cellBase;
		});
	});
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

ExpressionGenomicAttributesWidget.prototype.draw = GenomicAttributesWidget.prototype.draw;
ExpressionGenomicAttributesWidget.prototype.getMainPanel = GenomicAttributesWidget.prototype.getMainPanel;
ExpressionGenomicAttributesWidget.prototype.render = GenomicAttributesWidget.prototype.render;
ExpressionGenomicAttributesWidget.prototype.drawKaryotype = GenomicAttributesWidget.prototype.drawKaryotype;
ExpressionGenomicAttributesWidget.prototype.makeGrid = GenomicAttributesWidget.prototype.makeGrid;
ExpressionGenomicAttributesWidget.prototype.getKaryotypePanelId = GenomicAttributesWidget.prototype.getKaryotypePanelId;
ExpressionGenomicAttributesWidget.prototype.onAdditionalInformationClick = GenomicAttributesWidget.prototype.onAdditionalInformationClick;


function ExpressionGenomicAttributesWidget(species, args){
	if (args == null){
		args = new Object();
	}
	args.columnsCount = 2;
	args.title = "Expression";
	args.tags = ["expression"];
	args.featureType = 'gene';
	args.listWidgetArgs = {title:"Filter",action:'filter'};
	GenomicAttributesWidget.prototype.constructor.call(this, species, args);
};

ExpressionGenomicAttributesWidget.prototype.fill = function (queryNames){
	var _this = this;
	
	var normalized = Normalizer.normalizeArray(values);
	var colors = [];
	for ( var i = 0; i < normalized.length; i++) {
		if (!isNaN(parseFloat(values[i]))){
			colors.push( Colors.getColorByScoreValue(normalized[i]).HexString());
		}
		else{
			colors.push( "#000000");
		}
	}
	
	if(this.cbResponse==null){
		var cellBaseManager = new CellBaseManager(this.species);
		var featureDataAdapter = new FeatureDataAdapter(null,{species:this.species});
		cellBaseManager.success.addEventListener(function(sender,data){
			_this.karyotypePanel.setLoading("Retrieving data");
			for (var i = 0; i < data.result.length; i++) {
				if(data.result[i].length>0){
					_this.attributesPanel.store.data.items[i].data.cellBase = true;
				}else{
					_this.attributesPanel.store.data.items[i].data.cellBase = false;
				}
				for (var j = 0; j < data.result[i].length; j++) {
					var feature = data.result[i][j];
					feature.featureType = "gene";
					_this.karyotypeWidget.addMark(feature,  colors[i]);
					featureDataAdapter.addFeatures(feature);
				}
			}

			_this.adapter = featureDataAdapter;
//			_this.query = {"dataset": cellBaseManager.dataset, "resource":queryNames }; 
//			_this.features=cellBaseManager.dataset.toJSON();
			_this.filtersButton.enable();
			_this.addTrackButton.enable();
			_this.karyotypePanel.setLoading(false);

			_this.cbResponse = data;
			_this.karyotypePanel.setLoading(false);
		});
		this.karyotypePanel.setLoading("Connecting to Database");
		cellBaseManager.get("feature", "gene", queryNames.toString(), "info");
		
	}
};

ExpressionGenomicAttributesWidget.prototype.dataChange = function (items){
	try{
				var _this = this;
				var externalNames = [];
				values = [];
				
				for (var i = 0; i < items.length; i++) {
					externalNames.push(items[i].data[0]);
					values.push(items[i].data[1]);
					
				}	
				
				if (items.length > 0){
					this.fill(externalNames, values);
				}
	}
	catch(e){
		alert(e);
		this.panel.setLoading(false);
	}
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GenotypeGenomicAttributesWidget.prototype.draw = GenomicAttributesWidget.prototype.draw;
GenotypeGenomicAttributesWidget.prototype.render = GenomicAttributesWidget.prototype.render;
GenotypeGenomicAttributesWidget.prototype.drawKaryotype = GenomicAttributesWidget.prototype.drawKaryotype;
GenotypeGenomicAttributesWidget.prototype.makeGrid = GenomicAttributesWidget.prototype.makeGrid;
GenotypeGenomicAttributesWidget.prototype.getKaryotypePanelId = GenomicAttributesWidget.prototype.getKaryotypePanelId;
GenotypeGenomicAttributesWidget.prototype.dataChange = GenomicAttributesWidget.prototype.dataChange;
GenotypeGenomicAttributesWidget.prototype.fill = GenomicAttributesWidget.prototype.fill;
GenotypeGenomicAttributesWidget.prototype.onAdditionalInformationClick = GenomicAttributesWidget.prototype.onAdditionalInformationClick;

function GenotypeGenomicAttributesWidget(species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "Genotype";
	args.tags = ["genotype"];
	args.featureType = 'snp';
	args.listWidgetArgs = {title:'Filter',action:'filter', gridFields:["name", "variantAlleles", "ancestralAllele", "mapWeight",  "position", "sequence"]};
	GenomicAttributesWidget.prototype.constructor.call(this, species, args);
};



/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function AttributesWidget(args){
	this.id = "AttributesWidget_" + Math.random();
	this.title = "";
	this.width = 1025;
	this.height = 628;
	
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
    }
	this.attributesPanel = new AttributesPanel({borderCls:args.borderCls, height:325});
};

AttributesWidget.prototype.draw = function (){
	this.render();
};

AttributesWidget.prototype.getDetailPanel = function (){
	return {};
};

AttributesWidget.prototype.getButtons = function (){
	var _this=this;
	return [{text:'Close', handler: function(){_this.panel.close();}}];
};


AttributesWidget.prototype.render = function (){
	var _this = this;
	if (this.panel == null){
		this.panel  = Ext.create('Ext.ux.Window', {
			title : this.title,
			resizable: false,
			constrain:true,
			closable:true,
			collapsible:true,
			layout: { type: 'vbox',align: 'stretch'},
			items: [this.attributesPanel.getPanel(), this.getDetailPanel()],
			width: this.width,
		    height:this.height,
			buttonAlign:'right',
			buttons:this.getButtons(),
	 		listeners: {
		    	scope: this,
		    	minimize:function(){
					this.panel.hide();
		       	},
		      	destroy: function(){
		       		delete this.panel;
		      	}
	    	}
		});
		this.panel.setLoading();
	}	
	this.panel.show();
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function AttributesPanel(args){
	var _this= this;
	this.targetId = null;
	this.id = "AttributesPanel_" + Math.round(Math.random()*10000000);
	
	this.title = null;
	this.width = 1023;
	this.height = 628;
	this.wum = true;
	this.tags = [];
	this.borderCls='panel-border-bottom';
	
	this.columnsCount = null;
	if (args != null){
		if (args.wum!= null){
        	this.wum = args.wum;       
        }
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
        if (args.columnsCount!= null){
        	this.columnsCount = args.columnsCount;       
        }
        if (args.borderCls!= null){
        	this.borderCls = args.borderCls;       
        }
        if (args.tags!= null){
        	this.tags = args.tags;       
        }
    }
        
	/** create widgets **/
	this.browserData = new BrowserDataWidget();
    
	
    /** Events i send **/
    this.onDataChange = new Event(this);
    this.onFileRead = new Event(this);
    
    /** Events i listen **/
    this.browserData.adapter.onReadData.addEventListener(function (sender, data){
    	var tabularDataAdapter = new TabularDataAdapter(new StringDataSource(data.data),{async:false});
    	var fileLines = tabularDataAdapter.getLines();
		_this.makeGrid(tabularDataAdapter);
		_this.uptadeTotalFilteredRowsInfo(fileLines.length);
		_this.uptadeTotalRowsInfo(fileLines.length);
		_this.fileName = data.filename;
		_this.fileNameLabel.setText('<span class="emph">'+ data.filename +'</span> <span class="info">(server)</span>',false);
	});	
};

AttributesPanel.prototype.draw = function (){
	var panel = this.getPanel();
	
	if (this.targetId != null){
		panel.render(this.targetId);
	}
};

AttributesPanel.prototype.uptadeTotalRowsInfo = function (linesCount){
	this.infoLabel.setText('<span class="dis">Total rows: </span><span class="emph">' + linesCount + '</span>',false);
	
};

AttributesPanel.prototype.uptadeTotalFilteredRowsInfo = function (filteredCount){
	this.infoLabel2.setText('<span class="dis">Filtered rows: </span><span class="emph">' + filteredCount + '</span>',false);
};

AttributesPanel.prototype.sessionInitiated = function (){
	if(this.btnBrowse!=null){
		this.btnBrowse.enable();
	}
};

AttributesPanel.prototype.sessionFinished = function (){
	if(this.btnBrowse!=null){
		this.btnBrowse.disable();
	}
};

AttributesPanel.prototype.getPanel = function (){
	var _this=this;
	if (this.panel == null){
		this.expresionAnalysisUploadFieldFile = Ext.create('Ext.form.field.File', {
			msgTarget : 'side',
//			flex:1,
			width:75,
			emptyText: 'Choose a local file',
	        allowBlank: false,
			buttonText : 'Browse local',
			buttonOnly : true,
			listeners : {
				scope:this,
				change :function() {
						_this.panel.setLoading("Reading file");
						try{
							var dataAdapter = new TabularFileDataAdapter({comment:"#"});
							var file = document.getElementById(this.expresionAnalysisUploadFieldFile.fileInputEl.id).files[0];
							_this.fileName = file.name;
							_this.fileNameLabel.setText('<span class="emph">'+ file.name +'</span> <span class="info">(local)</span>',false);
							dataAdapter.loadFromFile(file);
							
							dataAdapter.onRead.addEventListener(function(sender, id) {
									_this.makeGrid(dataAdapter);
									_this.uptadeTotalFilteredRowsInfo(dataAdapter.lines.length);
									_this.uptadeTotalRowsInfo(dataAdapter.lines.length);
									_this.panel.setLoading(false);
									_this.onFileRead.notify();
							});
						}
						catch(e){
							alert(e);
							_this.panel.setLoading(false);
						}
					
				}
			}
		});
		this.barField = Ext.create('Ext.toolbar.Toolbar');
		this.barInfo = Ext.create('Ext.toolbar.Toolbar',{dock:'bottom'});
		this.barHelp = Ext.create('Ext.toolbar.Toolbar',{dock:'top'});
		
		
		this.clearFilter = Ext.create('Ext.button.Button', {
			 text: 'Clear filters',
			 disabled:true,
			 listeners: {
			       scope: this,
			       click: function(){
			       			if(this.grid.filters!=null){
			       				this.grid.filters.clearFilters();
			       				this.store.clearFilter();
			       			}
			       		}
	        }
		});
			
		
		this.helpLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="dis">Click on the header down arrow to filter by column</span>'
		});
		this.fileNameLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="emph">Select a <span class="info">local</span> file or a <span class="info">server</span> file from your account.</span>'
		});
		this.infoLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'&nbsp;'
		});
		this.infoLabel2 = Ext.create('Ext.toolbar.TextItem', {
			text:'&nbsp;'//'<span class="info">No file selected</span>'
		});
		
		this.barField.add(this.expresionAnalysisUploadFieldFile);
		this.barInfo.add('->',this.infoLabel,this.infoLabel2);
		this.barHelp.add(this.fileNameLabel,'->',this.helpLabel);
		
		this.store = Ext.create('Ext.data.Store', {
			fields:["1","2"],
			data:[]
		});
		this.grid = Ext.create('Ext.grid.Panel', {
		    store: this.store,
		    disabled:true,
		    border:0,
		    columns:[{header:"Column 1",dataIndex:"1"},{header:"Column 2",dataIndex:"2"}]
		});
		
		this.panel  = Ext.create('Ext.panel.Panel', {
			title : this.title,
			border:false,
			layout: 'fit',
			cls:this.borderCls,
			items: [this.grid],
			tbar:this.barField,
			width: this.width,
		    height:this.height,
		    maxHeight:this.height,
			buttonAlign:'right',
	 		listeners: {
		    	scope: this,
		    	minimize:function(){
					this.panel.hide();
		       	},
		      	destroy: function(){
		       		delete this.panel;
		      	}
	    	}
		});
		this.panel.addDocked(this.barInfo);
		this.panel.addDocked(this.barHelp );
		
	}	
	
	
	if(this.wum){
			this.btnBrowse = Ext.create('Ext.button.Button', {
		        text: 'Browse server',
		        disabled:true,
//		        iconCls:'icon-local',
//		        cls:'x-btn-default-small',
		        listeners: {
				       scope: this,
				       click: function (){
				    	   		this.browserData.draw($.cookie('bioinfo_sid'),this.tags);
				       		}
		        }
			});
			
			this.barField.add(this.btnBrowse);
			
			if($.cookie('bioinfo_sid') != null){
				this.sessionInitiated();
			}else{
				this.sessionFinished();
			}
	}
	this.barField.add('-',this.clearFilter);
	
	return this.panel;
};


AttributesPanel.prototype.getData = function (){
	return this.data;
};

AttributesPanel.prototype.makeGrid = function (dataAdapter){
		var _this = this;
		this.data = dataAdapter.getLines();
	
		var fields = [];
		var columns = [];
		var filtros = [];
		
		if (this.columnsCount == null){
			this.columnsCount = this.data[0].length;
		}
//		for(var i=0; i< data[0].length; i++){
		for(var i=0; i< this.columnsCount; i++){
			var type = dataAdapter.getHeuristicTypeByColumnIndex(i);
			fields.push({"name": i.toString(),type:type});
			columns.push({header: "Column "+i.toString(), dataIndex:i.toString(), flex:1,filterable: true,  filter: {type:type}});
			filtros.push({type:type, dataIndex:i.toString()});
		}
		this.store = Ext.create('Ext.data.Store', {
		    fields: fields,
		    data: this.data,
		    listeners:{
		    	scope:this,
		    	datachanged:function(store){
		    		var items = store.getRange();
		    		this.uptadeTotalFilteredRowsInfo(store.getRange().length);
		    		this.onDataChange.notify(store.getRange());
		    	}
		    }
		});
		
		var filters = {
        ftype: 'filters',
        local: true,
        filters: filtros
    	};
		
    	if(this.grid!=null){
			this.panel.remove(this.grid);
		}
    	
		this.grid = Ext.create('Ext.grid.Panel', {
		    store: this.store,
		    columns:columns,
//		    height:164,
//		    maxHeight:164,
//		    height:this.height,
//		    maxHeight:this.height,
		    border:0,
		    features: [filters]
		});
		this.panel.insert(0,this.grid);
		this.clearFilter.enable();
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ListPanel(species, args) {
	this.targetId = null;
	this.id = "ListPanel" + Math.round(Math.random()*100000);
	this.species=species;
	
	this.args=args;
	
	this.title = "List of Genes";
	this.width = 1000;
	this.height = 500;
	this.borderCls='panel-border-bottom';
	
	this.gridFields = [ 'externalName', 'stableId', 'biotype','position', 'strand', 'description', 'chromosome', 'start', 'end'];
		
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
        if (args.gridFields != null){
        	this.gridFields = args.gridFields;
        }
        if (args.borderCls!= null){
        	this.borderCls = args.borderCls;       
        }
        if (args.viewer!= null){
        	this.viewer = args.viewer;       
        }
        if (args.featureType!= null){
        	this.featureType = args.featureType;       
        }
    }
	
	this.onSelected = new Event(this);
	this.onFilterResult = new Event(this);
	
	
};

ListPanel.prototype._getGeneGrid = function() {
	var _this = this;
//	if(this.grid==null){
		var fields = this.gridFields;
		
		var filters = [];
		var columns = new Array();
		
		for(var i=0; i<fields.length; i++){
			filters.push({type:'string', dataIndex:fields[i]});
			columns.push({header:this.gridFields[i], dataIndex:this.gridFields[i], flex:1});
		}
		
		this.store = Ext.create('Ext.data.Store', {
			fields : fields,
			groupField : 'biotype',
			autoload : false
		});

	
		var filters = {
	        ftype: 'filters',
	        local: true, // defaults to false (remote filtering)
	        filters: filters
	    };
		
	    this.infoToolBar = Ext.create('Ext.toolbar.Toolbar');
		this.infoLabelOk = Ext.create('Ext.toolbar.TextItem', {
			text : '&nbsp;'
		});
		this.infoLabelNotFound = Ext.create('Ext.toolbar.TextItem', {
			text : '&nbsp;'
		});
		this.clearFilter = Ext.create('Ext.button.Button', {
			 text: 'Clear filters',
			 listeners: {
			 	scope: this,
			 	click: function(){
			 		if(this.grid.filters!=null){
						this.grid.filters.clearFilters();
			 		}
				}
		    }
		});
		this.found = Ext.create('Ext.button.Button', {
			 text: 'Features found',
			 hidden:true,
			 listeners: {
			 	scope: this,
			 	click: function(){
			 		new InputListWidget({title:"Features found", headerInfo:"This features were found in the database",viewer:this.viewer}).draw(this.queriesFound.join('\n'));
				}
		    }
		});
		this.notFound = Ext.create('Ext.button.Button', {
			 text: 'Features not found',
			 hidden:true,
			 listeners: {
			 	scope: this,
			 	click: function(){
			 		new InputListWidget({title:"Features not found", headerInfo:"This features were not found in the database",viewer:this.viewer}).draw(this.queriesNotFound.join('\n'));
				}
		    }
		});
		this.exportButton = Ext.create('Ext.button.Button', {
			text : 'Export to Text',
			handler : function() {
    	 		new InputListWidget({width:1100, title:"VCS content", headerInfo:"Export results",viewer:_this.args.viewer}).draw(_this._getStoreContent());
     		}
		});
		this.localizeButton = Ext.create('Ext.button.Button', {
			text : 'Localize on karyotype',
			handler : function() { _this._localize();}
		});
		this.infoToolBar.add([ '->',this.exportButton,this.localizeButton,'-',this.found,this.notFound,this.clearFilter]);
	    
		
		this.grid = Ext.create('Ext.grid.Panel', {
			border:0,
			store : this.store,
			features: [filters],
			bbar:this.infoToolBar,
			columns : columns,
			selModel: {
                mode: 'SINGLE'
            }
		});		
	return this.grid;
};

ListPanel.prototype._localize = function() {
	var _this = this;
	
	var panel = Ext.create('Ext.window.Window', {
		id:this.id+"karyotypePanel",
		title:"Karyotype",
		width:1020,
		height:410,
		bodyStyle: 'background:#fff;',
		html:'<div id="' + this.id + "karyotypeDiv" +'" ><div>',
		buttons : [{text : 'Close', handler : function() {panel.close();}} ],
		listeners:{
			afterrender:function(){
				
				var div = $('#'+_this.id+"karyotypeDiv")[0];
				var karyotypeWidget = new KaryotypeWidget(div,{
					width:1000,
					height:340,
					species:_this.viewer.species,
					chromosome:_this.viewer.chromosome,
					position:_this.viewer.position
				});
				karyotypeWidget.onClick.addEventListener(function(sender,data){
					_this.viewer.onLocationChange.notify({position:data.position,chromosome:data.chromosome,sender:"KaryotypePanel"});
				});
				karyotypeWidget.drawKaryotype();

				for ( var i = 0; i < _this.features.length; i++) {
						var feature = _this.features[i];
						karyotypeWidget.addMark(feature);
				}
//				
			}
		}
	}).show();
};

ListPanel.prototype.setTextInfoBar = function(resultsCount, featuresCount, noFoundCount) {
	this.found.setText('<span class="dis">' + resultsCount + ' results found </span> ');
	this.found.show();
	if (noFoundCount > 0){
		this.notFound.setText('<span class="err">'  + noFoundCount +' features not found</span>');
		this.notFound.show();
	}
};

ListPanel.prototype._getStoreContent = function() {
	var text = new String();
		for ( var i = 0; i < this.store.data.items.length; i++) {
			var header = new String();
			if (i == 0){
				for ( var j = 0; j < this.gridFields.length; j++) {
					header = header + this.gridFields[j] + "\t";
				}
				header = header + "\n";
			}
			var row = header;
			for ( var j = 0; j < this.gridFields.length; j++) {
				row = row + this.store.data.items[i].data[ this.gridFields[j]] + "\t";
			}
				
			row = row + "\n";
			text = text + row;
		}
	return text;
};

ListPanel.prototype._render = function() {
	var _this = this;
	if(this.panel==null){
		this.panel = Ext.create('Ext.panel.Panel', {
		    height:240,
		    layout:'fit',
		    cls:this.borderCls,
			title : this.title,
			border:false
		});
	}
	this.panel.add(this._getGeneGrid());
};

ListPanel.prototype.draw = function(cbResponse, useAdapter) {
	this._render();
	
	this.queriesNotFound = [];
	this.queriesFound = [];
	this.features = [];
	

	if(useAdapter != false){
		this.adapter = new FeatureDataAdapter(null,{species:this.species});
		for ( var i = 0; i < cbResponse.result.length; i++) {

			//Check if is a single object
			if(cbResponse.result[i].constructor != Array){
				cbResponse.result[i] = [cbResponse.result[i]];
			}

			for ( var j = 0; j < cbResponse.result[i].length; j++) {
				var feature = cbResponse.result[i][j];
				feature.position = feature.chromosome + ":"+ feature.start + "-" + feature.end;
				feature.featureType = cbResponse.subCategory;
				this.features.push(feature);
			}


			if (cbResponse.result[i].length == 0){
				this.queriesNotFound.push(cbResponse.query[i]);
			}else{
				this.queriesFound.push(cbResponse.query[i]);
				this.adapter.addFeatures(cbResponse.result[i]);
			}
		}
	}else{// no adapter needed because no track will be created 
		for ( var i = 0; i < cbResponse.result.length; i++) {
			//Check if is a single object
			if(cbResponse.result[i].constructor != Array){
				cbResponse.result[i] = [cbResponse.result[i]];
			}
			for ( var j = 0; j < cbResponse.result[i].length; j++) {
				var feature = cbResponse.result[i][j];
				feature.position = feature.chromosome + ":"+ feature.start + "-" + feature.end;
				feature.featureType = cbResponse.subCategory;
				this.features.push(feature);
			}

			if (cbResponse.result[i].length == 0){
				this.queriesNotFound.push(cbResponse.query[i]);
			}else{
				this.queriesFound.push(cbResponse.query[i]);
			}
		}
	}

	
	this.store.loadData(this.features);//true = append;  to sencha store

	this.setTextInfoBar(this.queriesFound.length, this.queriesFound.length, this.queriesNotFound.length);
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ListWidget(species, args) {
	this.targetId = null;
	this.id = "ListWidget" + Math.round(Math.random()*10000000);
	this.species=species;
	
	this.width = 1000;
	this.height = 500;
	this.action = 'localize';
	this.title='';
	
	this.args = args;
	
//	if (args == null){
//		args = {};
//	}
		
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;
        }
        if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
        if (args.action!= null){
        	this.action = args.action;       
        }
        if (args.viewer!= null){
        	this.viewer = args.viewer;
        }
    }
	

	this.listPanel = new ListPanel(this.species,{title:false,gridFields:args.gridFields,viewer:this.args.viewer});
	this.onSelected=this.listPanel.onSelected;
	this.onFilterResult=this.listPanel.onFilterResult;
	
};

ListWidget.prototype._render = function() {
	var _this = this;
	if(this.panel==null){
		this.localizeButton = Ext.create('Ext.button.Button', {
			minWidth : 80,
			text : 'OK',
			disabled:true,
			handler : function() {
					_this.listPanel.onSelected.notify(_this.listPanel.grid.getSelectionModel().getSelection()[0].data);
					_this.panel.hide();
			}
		});
		this.filterButton = Ext.create('Ext.button.Button', {
			minWidth : 80,
			text : 'OK',
			handler : function() {
					_this.listPanel.onFilterResult.notify(_this.listPanel.store.getRange());
					_this.panel.hide();
			}
		});
		
		this.panel = Ext.create('Ext.ux.Window', {
			title : this.title,
			taskbar:Ext.getCmp(this.viewer.id+'uxTaskbar'),
			resizable: false,
			constrain:true,
			closable:true,
			layout: 'fit',
			minimizable :true,
			width: this.width,
			height:this.height,
			items : [ this.listPanel.grid ],
			buttonAlign:'right',
			buttons:[
//			         {text:'aaa', handler: function(){},margin:"0 50 0 0 "},
			         this.getActionButton(this.action),
					{text:'Close', handler: function(){_this.panel.close();}}
			],
			 listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.hide();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	      }
		});
	}
};

ListWidget.prototype.draw = function(cbResponse, processData) {
	var _this = this;
	this.listPanel.draw(cbResponse, processData);
	this.listPanel.grid.getSelectionModel().on('selectionchange',function(){
		if(_this.listPanel.grid.getSelectionModel().hasSelection()){
			_this.localizeButton.enable();
		}else{
			_this.localizeButton.disable();
		}
	});
	this._render();
	this.panel.show();
};

ListWidget.prototype.getActionButton = function(action) {
	switch (action){
		case "localize": return this.localizeButton; break;
		case "filter": this.listPanel.localizeButton.disable().hide(); return this.filterButton; break;
	};
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

GenomicListPanel.prototype._getGeneGrid 				=       ListPanel.prototype._getGeneGrid;
GenomicListPanel.prototype._localize 				=       ListPanel.prototype._localize;
GenomicListPanel.prototype.setTextInfoBar 			=       ListPanel.prototype.setTextInfoBar;
GenomicListPanel.prototype._getStoreContent 			=       ListPanel.prototype._getStoreContent;
GenomicListPanel.prototype._render  					=       ListPanel.prototype._render;
GenomicListPanel.prototype.draw  					=       ListPanel.prototype.draw;

function GenomicListPanel(args) {
	ListPanel.prototype.constructor.call(this, args);
};



/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

//GenomicListWidget.prototype._render 				=       ListWidget.prototype._render;
GenomicListWidget.prototype.draw 				=       ListWidget.prototype.draw;
GenomicListWidget.prototype.getActionButton 			=       ListWidget.prototype.getActionButton;


function GenomicListWidget(species, args) {
	ListWidget.prototype.constructor.call(this, species, args);
//	this.listPanel = new GenomicListPanel({title:false,gridFields:args.gridFields,viewer:this.viewer});
	this.onSelected = this.listPanel.onSelected;
	this.onFilterResult = this.listPanel.onFilterResult;
	
	this.onTrackAddAction = new Event();
	
	
};



GenomicListWidget.prototype._render = function() {
	var _this = this;
	if(this.panel==null){
		this.localizeButton = Ext.create('Ext.button.Button', {
			minWidth : 80,
			text : 'OK',
			disabled:true,
			handler : function() {
					_this.listPanel.onSelected.notify(_this.listPanel.grid.getSelectionModel().getSelection()[0].data);
					_this.panel.hide();
			}
		});
		this.filterButton = Ext.create('Ext.button.Button', {
			minWidth : 80,
			text : 'OK',
			handler : function() {
					_this.listPanel.onFilterResult.notify(_this.listPanel.store.getRange());
					_this.panel.hide();
			}
		});
		var buttonRigthMargin = 375;
		
		
		this.panel = Ext.create('Ext.ux.Window', {
			title : this.title,
			taskbar:Ext.getCmp(this.viewer.id+'uxTaskbar'),
			resizable: false,
			constrain:true,
			closable:true,
			layout: 'fit',
			minimizable :true,
			width: this.width,
			height:this.height,
			items : [ this.listPanel.grid ],
			buttonAlign:'left',
			buttons:[
			         {
			        	 text:'Add Track', 
			        	 handler: function(){
			        		 var name = "Search "+Math.round(Math.random()*1000);
			        		 _this.onTrackAddAction.notify({"adapter":_this.listPanel.adapter,"fileName":name});
			        	 }
			         },
			         '->',
			         this.getActionButton(this.action),
			         {text:'Close', handler: function(){_this.panel.close();}}
			],
			 listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.hide();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	      }
		});
	}
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function InputListWidget(args) {
	this.id = "InputListWidget" + Math.round(Math.random()*10000000);
		
	this.title = "List";
	this.width = 500;
	this.height = 350;
	this.headerInfo = 'Write a list separated only by lines';
	
	this.args=args;
	
	if (args != null){
        if (args.title!= null){
        	this.title = args.title;       
        }
        if (args.width!= null){
        	this.width = args.width;       
        }
        if (args.height!= null){
        	this.height = args.height;       
        }
        if (args.headerInfo!= null){
        	this.headerInfo = args.headerInfo;       
        }
        if (args.viewer!= null){
        	this.viewer = args.viewer;       
        }
    }
	this.onOk = new Event(this);
};


InputListWidget.prototype.draw = function(text){
	var _this = this;
	
	if (text == null){
		text = new String();
	}
	
	if (this.panel == null){
		this.infobar = Ext.create('Ext.toolbar.Toolbar',{cls:"bio-border-false"});
		this.infoLabel = Ext.create('Ext.toolbar.TextItem', {
				text:this.headerInfo
		});
		this.infobar.add(this.infoLabel);
		this.editor = Ext.create('Ext.form.field.TextArea', {
				id:this.id + "genelist_preview",
	       	 	xtype: 'textarea',
	        	name: 'file',
	        	margin:"-1",
				width : this.width,
				height : this.height,
	        	enableKeyEvents:true,
	        	cls: 'dis',
	        	style:'normal 6px tahoma, arial, verdana, sans-serif',
	        	value: text,
	        	listeners: {
				       scope: this,
				       change: function(){
//				       			var re = /\n/g;
//				       			for( var i = 1; re.exec(this.editor.getValue()); ++i );
//				       			this.infoLabel.setText('<span class="ok">'+i+'</span> <span class="info"> Features detected</span>',false);
				       			this.validate();
				       }
				       
		        }
		});
		var form = Ext.create('Ext.panel.Panel', {
			border : false,
			items : [this.infobar,this.editor]
		});
		
		this.okButton = Ext.create('Ext.button.Button', {
			 text: 'Ok',
			 disabled:true,
			 listeners: {
			       scope: this,
			       click: function(){
			       			var geneNames = Ext.getCmp(this.id + "genelist_preview").getValue().split("\n");
							this.onOk.notify(geneNames);
							_this.panel.close();
			       		}
	        }
		});  
		
		this.panel = Ext.create('Ext.ux.Window', {
			title : this.title,
			taskbar:Ext.getCmp(this.viewer.id+'uxTaskbar'),
			layout: 'fit',
			resizable: false,
			collapsible:true,
			constrain:true,
			closable:true,
			items : [ form ],
			buttons : [ this.okButton, {text : 'Cancel',handler : function() {_this.panel.close();}} ],
			listeners: {
				       scope: this,
				       destroy: function(){
				       		delete this.panel;
				       }
		        }
		});
	}
	this.panel.show();
	
};

InputListWidget.prototype.validate = function (){
	if (this.editor.getValue()!="") {
		this.okButton.enable();
	}else{
		this.okButton.disable();
	}
};

/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function ChartWidget(args) {
	var this_ = this;
	this.id = "ChartWidget_" + Math.round(Math.random() * 10000000);

	this.title = null;
	this.width = 750;
	this.height = 300;

	if (args != null) {
		if (args.title != null) {
			this.title = args.title;
		}
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.height != null) {
			this.height = args.height;
		}
	}
};

ChartWidget.prototype.getStore = function() {
	return this.store;
};

ChartWidget.prototype.getChart = function(fields) {
	
	Ext.define('ChromosomeChart', {
	    extend: 'Ext.data.Model',
	    fields: fields
	});
	
	this.store = Ext.create('Ext.data.Store', {
		 model: 'ChromosomeChart',
		 autoLoad : false
	});
	
	var dibujo = Ext.create('Ext.chart.Chart', {
		animate : true,
		shadow : true,
		store : this.store,
		width : this.width,
		height : this.height,
		axes : [{
					position : 'left',
					fields : [fields[0]],
					title : fields[0],
					grid:true,
					type : 'Numeric',
	                minimum: 0 //si no se pone, peta
				}, {
					title : fields[1],
					type : 'category',
					position : 'bottom',
					fields : [fields[1]],
//					width : 10,
					label : {
						rotate : {
							degrees : 270
						}
					}
				}],
		series : [{
					type : 'column',
					axis: 'left',
					gutter: 10,
					yField : fields[0],
					xField : fields[1],
	                style: {
	                    fill: '#38B8BF'
	                }
				}]
	});
	return dibujo;
};
/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of Genome Maps.
 *
 * Genome Maps is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * Genome Maps is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Genome Maps. If not, see <http://www.gnu.org/licenses/>.
 */

function GenomeMaps(targetId, args) {
    var _this = this;
    this.id = "GenomeMaps" + Math.round(Math.random() * 10000);
    this.suiteId = 9;
    this.title = 'Genome Maps';
    this.description = "Genomic data visualization";
    this.version = "3.1.0";

	this.trackIdCounter = 1;
	
    this.args = args;
    this.width = $(window).width();
    this.height = $(window).height();
    this.targetId = targetId || document.body;

//    if (targetId != null) {
//        this.targetId = targetId;
//    }
    if (args != null) {
        if (args.width != null) {
            this.width = args.width;
        }
        if (args.height != null) {
            this.height = args.height;
        }
    }

	this.accountData = null;
    
    var region = new Region();
	
    var url = $.url();
    var url_cbhost = url.param('CELLBASE_HOST');
    if(url_cbhost != null) {
		CELLBASE_HOST = url_cbhost;
    }

    speciesObj = DEFAULT_SPECIES;
    var urlSpecies = url.param('species');
    if(typeof urlSpecies !== 'undefined' && urlSpecies != ''){
        speciesObj = Utils.getSpeciesFromAvailable(AVAILABLE_SPECIES,urlSpecies) || speciesObj;
    }
    this.species = Utils.getSpeciesCode(speciesObj.text);
    region.load(speciesObj.region);
    //console.log(speciesObj);

    var regionStr = url.param('region');
    if(regionStr != null) {
		region.parse(regionStr);
    }
    
    var urlZoom = parseInt(url.param('zoom'));
    if(isNaN(urlZoom) || urlZoom > 100 || urlZoom < 0 ){
		urlZoom = null;
	}

    var urlGene = url.param('gene');
    if(urlGene != null && urlGene != ""){
		region.load(this.getRegionByFeature(urlGene,"gene"));
	}
    var urlSnp = url.param('snp');
    if(urlSnp != null && urlSnp != ""){
		region.load(this.getRegionByFeature(urlSnp,"snp"));
	}

//	if (this.opencga==true){
    this.headerWidget = new HeaderWidget({
            appname: this.title,
            description: this.description,
            version:this.version,
            suiteId : this.suiteId,
            accountData:this.accountData
    });
//	if($.cookie("gm_settings")){
//		var species = JSON.parse($.cookie("gm_settings")).species;
//	}else{
//		var species = AVAILABLE_SPECIES[0];
//	}

	//CHECK genomeviewer check if the param is provided by url to apply zoom param or region param
	region.url = url.param('region');

    //visualiaztion URL paramaters
    var confPanelHidden = CONFPANELHIDDEN;
    if( url.param('confpanel') === 'false'){
        confPanelHidden = true;
    }
    var regionPanelHidden = REGIONPANELHIDDEN;
    if( url.param('regionpanel') === 'false'){
        regionPanelHidden = false;
    }
    this.genomeViewer = new GenomeViewer(this.id+"gvDiv", speciesObj,{
			region:region,
            version:this.version,
            zoom:urlZoom,
            confPanelHidden:confPanelHidden,
            regionPanelHidden:regionPanelHidden,
            availableSpecies: AVAILABLE_SPECIES,
            popularSpecies: POPULAR_SPECIES,
            height:this.height-this.headerWidget.height,
            width:this.width
    });
    
    /**Atach events i listen**/
    this.headerWidget.onLogin.addEventListener (function (sender) {
		Ext.example.msg('Welcome', 'You logged in');
		_this.sessionInitiated();
    });
    
    this.headerWidget.onLogout.addEventListener (function (sender) {
		Ext.example.msg('Good bye', 'You logged out');
		_this.sessionFinished();        
    });

    this.headerWidget.onGetAccountInfo.addEventListener(function (evt, response){
		_this.setAccountData(response);
	});

    this._updateLocalOpencgaTracks();

    //SPECIE EVENT
    this.genomeViewer.onSpeciesChange.addEventListener(function(sender,data){
//            _this._setTracks();
        debugger
//            _this.setTracksMenu();
            _this.headerWidget.setDescription(_this.genomeViewer.speciesName);
            _this.species=_this.genomeViewer.species;
            _this._refreshInitialTracksConfig();
    });

    //RESIZE EVENT
    $(window).smartresize(function(a){
		_this.setSize($(window).width(),$(window).height());
    });
    
    //SAVE CONFIG IN COOKIE
    $(window).unload(function(){
            var value = {
				species:{
					name:_this.genomeViewer.speciesName,
					species:_this.genomeViewer.species,
					chromosome:_this.genomeViewer.chromosome,
					position:_this.genomeViewer.position}
            };
            $.cookie("gm_settings", JSON.stringify(value), {expires: 365});
    });
}

GenomeMaps.prototype.sessionInitiated = function(){
    Ext.getStore(this.id+'import').getRootNode().findChild('id','opencga').set('text','Browse remote data');
};

GenomeMaps.prototype.sessionFinished = function(){
    Ext.getStore(this.id+'import').getRootNode().findChild('id','opencga').set('text','Browse remote data <span class="tip">(login required)</span>');
	this._unloadOpencgaTracks();
	this.accountData = null;
};

GenomeMaps.prototype.setAccountData = function(response) {
    this.accountData = response;
	this._updateOpencgaTracks(JSON.parse(JSON.stringify(response)));
};

GenomeMaps.prototype.draw = function(){
	var _this = this;
	if(this._panel == null){
		
		var gvContainer = Ext.create('Ext.container.Container', {
			id:this.id+"gvContainer",
			region:"center",
			html : '<div id="'+this.id+'gvDiv"></div>'
		});
		
		this._panel = Ext.create('Ext.panel.Panel', {
			id:this.id+"_panel",
			renderTo:this.targetId,
			layout:'border',
			border:false,
			width:this.width,
			height:this.height,
			items:[this.headerWidget.getPanel(),gvContainer]
		});
		
		this.headerWidget.setDescription(this.genomeViewer.speciesName);

		this.genomeViewer.afterRender.addEventListener(function(sender,event){
			Ext.getCmp(_this.genomeViewer.id+"versionLabel").setText('<span class="info">Genome Maps v'+_this.version+'</span>');
			_this._setOverviewTracks();
			_this.genomeViewer.addSidePanelItems(_this.getSidePanelItems());
			_this.genomeViewer.onSvgRemoveTrack.addEventListener(function(sender,trackId){
				Ext.getCmp(_this.id+trackId+"menu").setChecked(false);
			});
		});
		this.genomeViewer.draw();
	}

	//check login
	if($.cookie('bioinfo_sid') != null){
		this.sessionInitiated();
	}else{
		this.sessionFinished();
	}
};


GenomeMaps.prototype.setSize = function(width,height){
	this.width=width;
	this.height=height;
	
	this._panel.setSize(width,height);
	this.genomeViewer.setSize(width,height-this.headerWidget.height);
	this.headerWidget.setWidth(width);
};


GenomeMaps.prototype.getRegionByFeature = function(name, feature){
	var url = CELLBASE_HOST+"/latest/"+this.species+"/feature/"+feature+"/"+name+"/info?of=json";
	var f;
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			f = JSON.parse(data)[0][0];
		}
	});
	if(f != null){
		return {chromosome:f.chromosome, start:f.start, end:f.end}
	}
	return {};
};

//deprecated
//GenomeMaps.prototype.setLocationByFeature = function(name, feature){
//	var loc = this.getRegionByFeature(name, feature);
//	if (loc.chromosome != null &&  loc.position != null){
//		this.genomeViewer.setLoc(loc);
//	}
//};

GenomeMaps.prototype._setOverviewTracks= function(){
	var geneTrack = new TrackData("gene",{
		adapter: new CellBaseAdapter({
			category: "genomic",
			subCategory: "region",
			resource: "gene",
			species: this.genomeViewer.species,
			featureCache:{
				gzip: true,
				chunkSize:50000
			}
		})
	});

	this.genomeViewer.trackSvgLayoutOverview.addTrack(geneTrack,{
		id:"gene1",
		type:"gene",
		title:"Gene",
		featuresRender:"MultiFeatureRender",
		histogramZoom:10,
		labelZoom:20,
		height:150,
		visibleRange:{start:0,end:100},
		titleVisibility:'hidden',
		featureTypes:FEATURE_TYPES
	});
};

GenomeMaps.prototype.genTrackId = function() {
	var id = this.trackIdCounter;
	this.trackIdCounter++;
	return id;
};

GenomeMaps.prototype.removeTrack = function(trackId) {
	return this.genomeViewer.removeTrack(trackId);
};

GenomeMaps.prototype.restoreTrack = function(trackSvg, index) {
	return this.genomeViewer.restoreTrack(trackSvg, index);
};

GenomeMaps.prototype.scrollToTrack = function(trackId) {
	this.genomeViewer.scrollToTrack(trackId);
};

GenomeMaps.prototype.setTrackIndex = function(trackId, newIndex) {
	this.genomeViewer.setTrackIndex(trackId, newIndex);
};

GenomeMaps.prototype.getTrackSvgById = function(trackId) {
	return this.genomeViewer.getTrackSvgById(trackId);
};

GenomeMaps.prototype.addTrack = function(trackType, trackTitle, object, host) {
	var id = this.genTrackId();
	//console.log(trackId);
	switch (trackType) {
	case "Gene/Transcript":
		var geneTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "gene",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:50000
				},
				filters:{},
				options:{},
				featureConfig:FEATURE_CONFIG.gene
			})
		});
		this.genomeViewer.addTrack(geneTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"GeneTranscriptRender",
			histogramZoom:20,
			transcriptZoom:50,
			height:24,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Cytoband":
		
		break;
	case "Sequence":
		var seqtrack = new TrackData(id,{
			adapter: new SequenceAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "sequence",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:1000
				}
			})
		});
		this.genomeViewer.addTrack(seqtrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"SequenceRender",
			height:30,
			visibleRange:{start:100,end:100}
		});
		break;
	case "CpG islands":
		var cpgTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "cpg_island",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:50000
				}
			})
		});
		this.genomeViewer.addTrack(cpgTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:10,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "SNP":
		var snpTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "snp",
				species: this.genomeViewer.species,
                params:{
                    exclude:'transcriptVariations,xrefs,samples'
                },
				featureCache:{
					gzip: true,
					chunkSize:10000
				},
				filters:{},
				options:{},
				featureConfig:FEATURE_CONFIG.snp
			})
		});
		this.genomeViewer.addTrack(snpTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:70,
			labelZoom:80,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Mutation":
		var mutationTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "mutation",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(mutationTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Structural variation (<20Kb)":
		var structuralTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "structural_variation",
				species: this.genomeViewer.species,
				params : {min_length:1,max_length:20000},
				featureCache:{
					gzip: true,
					chunkSize:50000
				}
			})
		});
		this.genomeViewer.addTrack(structuralTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:40,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Structural variation (>20Kb)":
		var structuralTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "structural_variation",
				species: this.genomeViewer.species,
				params : {min_length:20000,max_length:300000000},
				featureCache:{
					gzip: true,
					chunkSize:5000000
				}
			})
		});
		this.genomeViewer.addTrack(structuralTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:40,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "miRNA targets":
		var miRNATrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: 'regulatory',
                params:{
                    type:'mirna_target'
                },
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(miRNATrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:0,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "TFBS":
		var tfbsTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "regulatory",
                params:{
                    type:'TF_binding_site_motif'
                },
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(tfbsTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:0,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
//	case "Histone":
//		
//		break;
//	case "Polymerase":
//		
//		break;
//	case "Open Chromatin":
//		
//		break;
	case "Conserved regions":
		var conservedTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "conserved_region2",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(conservedTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
		
	case "bam":
		var bamTrack = new TrackData(id,{
			adapter: new BamAdapter({
				category: "bam",
                host:host,
				//resource: trackTitle.substr(0,trackTitle.length-4),
				resource: object,
				species: this.genomeViewer.species,
				featureCache:{
					gzip: false,
					chunkSize:5000
				},
				filters:{},
				options:{},
				featureConfig:FEATURE_CONFIG.bam
			})
		});
		this.genomeViewer.addTrack(bamTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"BamRender",
			histogramZoom:60,
			height:24,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;

    case "vcf":
        var vcfTrack = new TrackData(id,{
            adapter: new OpencgaAdapter({
                category: "vcf",
                //resource: trackTitle.substr(0,trackTitle.length-4),
                resource: object,
                species: this.genomeViewer.species,
                featureCache:{
                    gzip: false,
                    chunkSize:5000
                },
                filters:{},
                options:{},
                featureConfig:FEATURE_CONFIG.vcf
            })
        });
        this.genomeViewer.addTrack(vcfTrack,{
            id:id,
            type:trackType,
            title:trackTitle,
            featuresRender:"MultiFeatureRender",
            histogramZoom:60,
            height:150,
            visibleRange:{start:0,end:100},
            featureTypes:FEATURE_TYPES
        });
        break;
	default:
		return null;
	}
	return id;
};

GenomeMaps.prototype.addFileTrack = function(text, updateActiveTracksPanel) {
	var  _this = this;
	var fileWidget = null;
	switch(text){
		case "GFF2": fileWidget = new GFFFileWidget({version:2,viewer:_this.genomeViewer}); break;
		case "GFF3": fileWidget = new GFFFileWidget({version:3,viewer:_this.genomeViewer}); break;
		case "GTF":  fileWidget = new GTFFileWidget({viewer:_this.genomeViewer});break;
		case "BED":  fileWidget = new BEDFileWidget({viewer:_this.genomeViewer});break;
		case "VCF":  fileWidget = new VCFFileWidget({viewer:_this.genomeViewer}); break;
	}
	if(fileWidget != null){
		fileWidget.draw();
        _this.headerWidget.onLogin.addEventListener(function (sender){
            fileWidget.sessionInitiated();
        });
        _this.headerWidget.onLogout.addEventListener(function (sender){
            fileWidget.sessionFinished();
        });
		fileWidget.onOk.addEventListener(function(sender, event) {
			var fileTrack = new TrackData(event.fileName,{
				adapter: event.adapter
			});

			var id = _this.genTrackId();
			var type = text;
			
			_this.genomeViewer.addTrack(fileTrack,{
				id:id,
				title:event.fileName,
				type:type,
				featuresRender:"MultiFeatureRender",
	//					histogramZoom:80,
				height:150,
				visibleRange:{start:0,end:100},
				featureTypes:FEATURE_TYPES
			});
			
			var title = event.fileName+'-'+id;
			updateActiveTracksPanel(type, title, id, true);
		});
	}
};

GenomeMaps.prototype.addDASTrack = function(sourceName, sourceUrl) {
	var id = this.genTrackId();
	var dasTrack = new TrackData("das",{
		adapter: new DasAdapter({
			url: sourceUrl,
			species: this.genomeViewer.species,
			featureCache:{
				gzip: false,
				chunkSize:10000
			}
		})
	});
	this.genomeViewer.addTrack(dasTrack,{
		id:id,
		title:sourceName,
		type:"das",
		featuresRender:"MultiFeatureRender",
		height:150,
		visibleRange:{start:50,end:100},
		settings:{
			height:10
		}
	});
	return id;
};


GenomeMaps.prototype._loadInitialTracksConfig= function(args){
    //Load initial TRACKS config
    var categories = TRACKS[SPECIES_TRACKS_GROUP[this.species]];
    var activeTracks = [];
    var cellbaseTracks = [];
    for (var i=0, leni=categories.length; i<leni; i++) {
        var subChilds = [];
        cellbaseTracks.push({text: categories[i].category, iconCls:"icon-box", expanded:true, children:subChilds});
        for ( var j = 0, lenj=categories[i].tracks.length; j<lenj; j++){
            var trackType = categories[i].tracks[j].id;
            var checked = categories[i].tracks[j].checked;
            var disabled = categories[i].tracks[j].disabled;
            subChilds.push({text: trackType, iconCls:"icon-blue-box", leaf:true, disabled:disabled});
            if(checked){
                if(args && args.addTrack){
                    var trackId = this.addTrack(trackType, trackType);
                }
                activeTracks.push({text: trackType, trackId:trackId, trackType:trackType ,checked:true, iconCls:"icon-blue-box", leaf:true});
            }
        }
    }
    return {cellbaseTracks:cellbaseTracks,activeTracks:activeTracks};
};

GenomeMaps.prototype._refreshInitialTracksConfig = function(){//TODO finish
    var availableStore = Ext.getStore(this.id+'curated');
    var cellbaseNode = availableStore.getRootNode().findChild('text','CellBase');
    cellbaseNode.removeAll();
    cellbaseNode.appendChild(this._loadInitialTracksConfig().cellbaseTracks);
};

GenomeMaps.prototype._loadInitialDasTrackConfig= function(){
    //Load initial DAS_TRACKS config
    var das_tracks = DAS_TRACKS;
    var dasChilds = [];
    for (var i = 0, leni = das_tracks.length; i < leni; i++) {
        if(das_tracks[i].species == this.species){
            for ( var j = 0, lenj = das_tracks[i].categories.length; j < lenj; j++){
                var sourceName, sourceUrl, checked;
                var subChilds = [];
                dasChilds.push({text: das_tracks[i].categories[j].name, iconCls:"icon-box", expanded:true, children:subChilds});
                for ( var k = 0, lenk = das_tracks[i].categories[j].sources.length; k < lenk; k++){
                    sourceName = das_tracks[i].categories[j].sources[k].name;
                    sourceUrl = das_tracks[i].categories[j].sources[k].url;
                    checked = das_tracks[i].categories[j].sources[k].checked;
                    subChilds.push({text:sourceName, url:sourceUrl, iconCls:"icon-blue-box", leaf:true});
                    //if(checked){
                    //this.addDASTrack(sourceName, sourceUrl);
                    //}
                }
            }
            break;
        }
    }
    return dasChilds;
};

GenomeMaps.prototype._loadInitialPluginTrackConfig= function(){
	var plugins_cat = GENOME_MAPS_AVAILABLE_PLUGINS;
	var pluginChilds = [];
    for (var i = 0, leni = plugins_cat.length; i < leni; i++) {
        var subChilds = [];
        pluginChilds.push({text: plugins_cat[i].category, iconCls:"icon-box", expanded:true, children:subChilds});
        for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
            subChilds.push({text:plugins_cat[i].plugins[j].name, plugin:plugins_cat[i].plugins[j], iconCls:"icon-blue-box", leaf:true});
        }
    }
    return pluginChilds;
};

GenomeMaps.prototype.getSidePanelItems = function() {
	var _this = this;


    var tracks = this._loadInitialTracksConfig({addTrack:true});
    var pluginTracks = this._loadInitialPluginTrackConfig();

	var activeSt = Ext.create('Ext.data.TreeStore',{
		fields:['text', 'trackId', 'trackType'],
		root:{
			expanded: true,
			children: tracks.activeTracks
		}
	});
	this.activeSt = activeSt;

	var pluginSt = Ext.create('Ext.data.TreeStore',{
		fields:['text', 'plugin'],
		root:{
			expanded: true,
			children: pluginTracks
		}
	});
	/**example to add a children**/
	//availableSt.getRootNode().findChild("text","Cellbase").appendChild({text: "prueba", expanded: true, iconCls:"icon-blue-box"});

    var activeTracksPanel = {
        title:'<span class="">Active tracks</span>',
        id:this.id+"activeTracksPanel",
        border:0,
        layout:{type:'vbox', align:'stretch'},
        items:[{
            xtype:"treepanel",
            id:this.id+"activeTracksTree",
            store: activeSt,
            bodyPadding:"5 0 0 0",
            margin:"-1 0 0 0",
            border:false,
            autoScroll:true,
            flex:1,
            useArrows:true,
            rootVisible: false,
            selType: 'cellmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2,listeners:{
                edit:function(editor, e, eOpts){
                    var id = e.record.data.trackId;
                    var trackSvg = _this.getTrackSvgById(id);
                    trackSvg.setTitle(e.record.data.text);
                }
            }})],
            hideHeaders:true,
            columns: [{
                xtype: 'treecolumn',
                dataIndex: 'text',
                flex:1,
                editor: {xtype: 'textfield',allowBlank: false}
            },
                //{
                //xtype: 'actioncolumn',
                //menuDisabled: true,
                //align: 'center',
                //tooltip: 'Edit',
                //width:20,
                //icon: Utils.images.edit,
                //handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                //event.stopEvent();
                //if(record.isLeaf()){
                //var id = record.data.trackId;
                //var track = _this.getTrackSvgById(id);
                //if(track != null){
                //var trackSettingsWidget = new TrackSettingsWidget({
                //trackSvg:track,
                //treeRecord:record
                //});
                //}
                //}
                //}
                //},
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    align: 'center',
                    tooltip: 'Remove',
                    width:30,
                    icon: Utils.images.del,
                    handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                        //this also fires itemclick event from tree panel
                        if(record.isLeaf()){
                            var id = record.data.trackId;
                            var checked = record.data.checked;
                            record.destroy();
                            if(checked){
                                _this.removeTrack(id);
                            }
                        }
                    }
                }],
            viewConfig: {
                markDirty:false,
                plugins: {
                    ptype: 'treeviewdragdrop'
                },
                listeners : {
                    drop : function (node, data, overModel, dropPosition, eOpts){
                        var record = data.records[0];
                        //check if is leaf and if the record has a new index
                        if(record.isLeaf() && record.data.index != record.removedFrom && record.data.checked){
                            var id = record.data.trackId;
                            _this.setTrackIndex(id, record.data.index);
                        }
                    }
                }
            },
            listeners : {
                itemclick : function (este, record, item, index, e, eOpts){
                    if(record.isLeaf()){
                        if(record.data.checked){//track can be disabled, so if not checked does not exist in trackSvgLayout
                            //this also fires remove button click event from tree panel action column
                            var id = record.data.trackId;
                            _this.scrollToTrack(id);
                            var trackSvg = _this.getTrackSvgById(id);
                            if(trackSvg!=null){
                                _this._loadTrackConfig(trackSvg,record);
                            }
                        }
                    }
                },
                checkchange : function (node, checked){
                    var type = node.data.trackType;
                    var id = node.data.trackId;
                    if(checked){
                        var track = node.raw.track;
                        _this.restoreTrack(track, node.data.index);
                    }else{
                        var track = _this.removeTrack(id);
                        //save trackSvg pointer
                        node.raw.track = track;
                    }
                },
                itemmouseenter : function (este,record){
                    var track = _this.getTrackSvgById(record.data.trackId);
                    if(track != null){
                        track.fnTitleMouseEnter();
                    }
                },
                itemmouseleave : function (este,record){
                    var track = _this.getTrackSvgById(record.data.trackId);
                    if(track != null){
                        track.fnTitleMouseLeave();
                    }
                }
            }
        },{
            xtype:"tabpanel",
            id:this.id+"activeTracksSettings",
            plain: true,
            border:false,
            margin :"5 0 0 0",
            autoScroll:true,
            flex:2,
            items:[
                {
                    id:this.id+"trackOptions",
                    itemId:this.id+"trackOptions",
                    title:"Options",
                    bodyPadding:10,
                    border:false
                },{
                    id:this.id+"trackFiltering",
                    itemId:this.id+"trackFiltering",
                    title:"Filtering",
                    layout:{type:'vbox', align:'stretch'},
                    border:false
                }
            ]
        }]
    };


    var pluginsTree =  {
        xtype:"treepanel",
        id:this.id+"pluginsTree",
        title:'<span class="">Analysis</span>',
        bodyPadding:"10 0 0 0",
        useArrows:true,
        rootVisible: false,
        store: pluginSt,
        hideHeaders:true,
        listeners : {
            itemclick : function (este, record, item, index, e, eOpts){
                if(record.isLeaf()){
                    var plugin = record.get("plugin");
                    GENOME_MAPS_REGISTERED_PLUGINS[plugin.name].setViewer(_this.genomeViewer);
                    GENOME_MAPS_REGISTERED_PLUGINS[plugin.name].draw();
                }
            }
        }
    };

    var searchSidePanel = {
        title:'<span class="">Advanced search</span>',
        id:this.id+"searchSidePanel",
//        icon:Utils.images.info,
        layout:{type:'vbox', align:'stretch'},
        bodyPadding:"5",
        items:[{
            xtype:'tbtext',text:'<span class="">Search by any external reference:</span>'
        },{
            id:this.id+ "searchTextArea",
            xtype: 'textarea',
            flex:1,
            enableKeyEvents:true,
//            cls: 'dis',
//            style:'normal 6px Ubuntu Mono, arial, verdana, sans-serif',
            value: '',
            listeners: {
                change: function(este){
                    if (este.getValue()!="") {
                        Ext.getCmp(_this.id+'searchPanelButton').enable();
                    }else{
                        Ext.getCmp(_this.id+'searchPanelButton').disable();
                    }
                }
            }
        },{
            id:this.id+"searchPanelCombo",
            fieldLabel:'Result type',
            xtype:'combobox',
            store:{fields:['value', 'name'],data : [
                {"value":"info", "name":"Genes"},
                {"value":"snp", "name":"SNPs"},
                //{"value":"go", "name":"GOs"},
//                {"value":"mutation", "name":"Mutations"},
                {"value":"transcript", "name":"Transcripts"},
                {"value":"exon", "name":"Exons"}
            ]},
            displayField: 'name',
            valueField: 'value',
            listeners:{afterrender:function(este){este.select(este.getStore().data.items[0]);}}
        },{
            id:this.id+'searchPanelButton',
            margin:"0 0 0 0",
            xtype: 'button',
            text:'Search',
            disabled:true,
            handler:function(){
                var resultPan = Ext.getCmp(_this.id+"searchResults");
                resultPan.setLoading(true);
                resultPan.removeAll();
                var features = Ext.getCmp(_this.id+"searchTextArea").getValue().trim().split("\n");
                var boxValue = Ext.getCmp(_this.id+"searchPanelCombo").getValue().toLowerCase();
                var cellBaseManager = new CellBaseManager(_this.species);
                cellBaseManager.success.addEventListener(function(evt, data) {
                    var notFound = "", boxes = [];
                    var featureType = boxValue.replace("info","gene");
                    var id = FEATURE_TYPES[featureType].infoWidgetId;
                    for (var i=0, leni=data.result.length; i<leni; i++) {
                        var queryStr = data.query[i];
                        if(data.result[i].length > 0){
                            var collapsed = data.query.length > 3;
                            switch (featureType){
                                case 'snp':
                                case 'mutation':
                                case 'exon':
                                    var items = [];
                                    var featList = data.result[i];
                                    var width = (featList.length > 1) ? 244 : 250;
                                    for (var j=0, lenj=featList.length; j<lenj; j++) {
                                        var features = featList[j];
                                        var st = Ext.create('Ext.data.Store', {
                                            fields: [id,'chromosome','start','end'], data: features,
                                            proxy: {type: 'memory'},pageSize: 5
                                        });
                                        items.push({xtype:'grid', store: st, hideHeaders:true, width:width, height:180, loadMask: true, margin:'2 0 0 0',
                                            title:'<span class="info">'+queryStr+'</span> <span style="font-family: Oxygen;color:slategray">'+features.length+'</span>',collapsible:true,collapsed:collapsed,titleCollapse:true,
                                            columns: [{text: 'id',dataIndex: id, width:230}],
                                            plugins: 'bufferedrenderer',loadMask: true,
        //                                    dockedItems: [{items:{xtype:'field'}}],
                                            listeners:{
                                                itemclick:function(este, record, item, index, e, eOpts){
                                                    _this.genomeViewer.region.load(record.data);
                                                    _this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
                                                }
                                            }
                                        });
                                    }
                                    if(items.length < 2){
                                        boxes.push(items[0]);
                                    }else{
                                        boxes.push({xtype:'panel',title:'<span class="info">'+queryStr+'</span> - <span style="font-family: Oxygen;color:slategray">'+items.length+' genes</span>',bodyPadding:"0 2 2 2",
                                            collapsible:true,collapsed:false,titleCollapse:true, width:250, items:items});
                                    }

                                    break;
                                case 'transcript':
                                    collapsed = false;
                                    var items = [];
                                    var tpl = new Ext.XTemplate('<span>{'+id+'}</span>');
                                    var transcriptsList = data.result[i];
                                    for (var j=0, lenj=transcriptsList.length; j<lenj; j++) {
                                        var transcripts =transcriptsList[j];
                                        items2 = [];
                                        for (var k=0, lenk=transcripts.length; k<lenk; k++) {
                                            var transcript = transcripts[k];
                                            items2.push({xtype:'box',padding:"1 5 1 10",border:1,tpl:tpl,
                                                data:transcript,datos:transcript,
                                                listeners:{afterrender:function(este){
                                                    this.getEl().addClsOnOver("encima2");
                                                    this.getEl().addCls("whiteborder");
                                                    this.getEl().on("click",function(){
                                                        _this.genomeViewer.region.load(este.datos);
                                                        _this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
                                                    });
                                                }}
                                            });
                                        }
                                        items.push({xtype:'panel',border:0,title: ("Gene "+(j+1)),items:items2});
                                    }
                                    if(items.length < 2){
                                        items = items[0].items
                                    }
                                    boxes.push({xtype:'panel',title:'<span class="info">'+queryStr+'</span>',margin:"2 0 0 0",
                                        collapsible:true,collapsed:false,titleCollapse:true, width:250, items:items});

                                    break;
                                default:
                                    collapsed = false;
                                    var items = [];
                                    var tpl = new Ext.XTemplate('<span>{'+id+'}</span>');
                                    for (var j=0, lenj=data.result[i].length; j<lenj; j++) {
                                        items.push({xtype:'box',padding:"1 5 1 10",border:1,tpl:tpl,
                                            data:data.result[i][j],datos:data.result[i][j],
                                            listeners:{afterrender:function(este){
                                                this.getEl().addClsOnOver("encima2");
                                                this.getEl().addCls("whiteborder");
                                                this.getEl().on("click",function(){
                                                    _this.genomeViewer.region.load(este.datos);
                                                    _this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
                                                });
                                            }}
                                        });
                                    }
                                    boxes.push({xtype:'panel',title:'<span class="info">'+queryStr+'</span>',margin:"2 0 0 0",
                                        collapsible:true,collapsed:false,titleCollapse:true, width:250, items:items});

                                    break;

                            }
                        }else{
                            notFound+='&nbsp; &nbsp;'+data.query[i]+'<br>';
                        }
                    }
                    if(notFound!=""){
                        notFound='<span class="err">Features not found:</span>'+notFound;
                    }
                    boxes.push({xtype:'box',padding:"15 5 2 3",border:1,html:notFound});
                    resultPan.add(boxes);
                    resultPan.setLoading(false);
                });
                var params = null;
                switch (boxValue){
                    case 'snp': params = {exclude:'transcriptVariations,xrefs,samples'}; break;
                    case 'transcript': params = {exclude:'exons,xrefs'}; break;
                }
                cellBaseManager.get("feature", "gene", features, boxValue, params);//gene must search in later versions
            }
        },{
            xtype:'tbtext',margin:'10 0 0 0',text:'<p class="">Results:</p>'
        },{
            id:this.id+"searchResults",
            border:false,
            autoScroll:true,
            flex:3,
            items:[{xtype:'container'}]//dummy container, will be removed on first search
        }]
    };


    var curatedTree = this._createTracksTreePanel({
        title:'Add new tracks from CellBase and DAS',
        id :'curated',
        nodes : [
            { text: "CellBase", iconCls:"icon-box", id:'cellbase', expanded:true, children: tracks.cellbaseTracks },
            { text: "DAS", iconCls:"icon-box", id:'das', expanded:true, children: this._loadInitialDasTrackConfig()}
        ]
    });

    var localChilds = [
        {text:"GFF2", iconCls:"icon-blue-box", leaf:true},
        {text:"GFF3", iconCls:"icon-blue-box", leaf:true},
//        {text:"GTF", iconCls:"icon-blue-box", leaf:true},
        {text:"BED", iconCls:"icon-blue-box", leaf:true},
        {text:"VCF", iconCls:"icon-blue-box", leaf:true}
    ];


    var importTree = this._createTracksTreePanel({
        title:'Import data',
        id:'import',
        nodes:[
            { text: 'Browse remote data', id:'opencga', iconCls:'icon-box', expanded:true, children: [] },
            { text: 'Browse local data <span class="tip">(light server required)</span>', id:'localopencga', iconCls:"icon-box", expanded:true, children: [] },
            { text: 'Load local data (<500MB)', id:'load', iconCls:'icon-box', expanded:true, children:localChilds}
        ]
    });

    return [activeTracksPanel,curatedTree,importTree,/*pluginsTree,*/searchSidePanel];

		//,{
			//title:"Settings",
			//bodyPadding:'10 0 0 10',
			//html:"not yet"
		//}
};


GenomeMaps.prototype._createTracksTreePanel = function(args) {

    var _this = this;
    var store = Ext.create('Ext.data.TreeStore',{
        id:this.id+args.id,
        fields:['text','id'],
        root:{
            expanded: true,
            children: args.nodes
        }
    });

    return {
        xtype:"treepanel", //*********************************************AVAILABLE
        id:this.id+args.id,
        title:'<span class="">'+args.title+'</span>',
        bodyPadding:"10 0 0 0",
        useArrows:true,
        rootVisible: false,
        hideHeaders:true,
        store: store,
        viewConfig: {markDirty:false},
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex:1
        },{
            xtype: 'actioncolumn',
            menuDisabled: true,
            align: 'center',
            width:20,
            renderer: function(value, metaData, record){
                if(record.data.id == "cellbase"){
                    this.icon = Utils.images.info;
                    this.tooltip = CELLBASE_HOST;
                }else if(record.data.id == "das"){
                    this.icon = Utils.images.info;
                    this.tooltip = "Add custom DAS track";
                }else if(record.data.id == "opencga"){
                    this.icon = Utils.images.info;
                    this.tooltip = "OpenCGA server information link";
                }else if(record.data.id == "localopencga"){
                    this.icon = Utils.images.info;
                    this.tooltip = "OpenCGA light server information link";
                }else{
                    this.tooltip = null;
                    this.icon = null;
                }
            },
            handler:function(grid, rowIndex, colIndex, actionItem, event, record, row){
                var text = record.data.text;
                var idText = record.data.id;
                if(idText == 'opencga'){
                    open('http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:opencga_sever');
                }
                if(idText == 'localopencga'){
                    open('http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:opencga_light_sever');
                }

            }
        },{
            xtype: 'actioncolumn',
            menuDisabled: true,
            align: 'center',
            width:30,
            icon: Utils.images.add,
            renderer: function(value, metaData, record){
                if (record.isLeaf()) {
                    this.icon = Utils.images.add;
                    this.tooltip = "Add";
                    if(record.raw.disabled){
                        this.icon = null;
                        this.tooltip = null;
                    }
//                    if((record.raw.fileFormat === 'bam' || record.raw.fileFormat === 'vcf') && record.raw.status !== 'ready'){
//                        this.icon = null;
//                        this.tooltip = null;
//                        record.raw.disabled = true;
//                    }
                }else{
                    if(record.data.id == "cellbase"){
                        this.icon = Utils.images.edit;
                    }else if(record.data.id == "das"){
                        this.icon = Utils.images.add;
                    }else if(record.data.id == "localopencga"){
                        this.icon = Utils.images.refresh;
                        this.tooltip = "Refresh local files";
                    }else{
                        this.icon = null;
                        this.tooltip = null;
                    }
                }
            },
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                var updateActiveTracksPanel = function(trackType, trackTitle, trackId, showActive) {
                    var newNode = _this.activeSt.getRootNode().appendChild({text: trackTitle, trackId:trackId, trackType:trackType, leaf: true, checked:true, iconCls:"icon-blue-box"});
                    Ext.example.msg("Track "+trackType,"actived");
                    //var node = activeSt.getRootNode().findChild("trackId",trackId);
                    //Ext.getCmp(_this.id+"activeTracksTree").getSelectionModel().select(newNode);
                    if(showActive == true){
                        Ext.getCmp(_this.id+"activeTracksTree").expand();
                    }
                };
                var text = record.data.text;
                var idText = record.data.id;
                if(record.isLeaf()){
                    if(record.isAncestor(store.getRootNode().findChild("id","cellbase"))){
                        if(!record.raw.disabled){
                            var type = text;
                            var id = _this.addTrack(type, text);
                            var title = type;
                            updateActiveTracksPanel(type, title, id, true);
                        }
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","das"))){
                        var type = 'das';
                        var id = _this.addDASTrack(text, record.raw.url);
                        var title = text;
                        updateActiveTracksPanel(type, title, id, true);
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","load"))){
                        _this.addFileTrack(text, updateActiveTracksPanel);
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","opencga"))){
                        if(!record.raw.disabled){
                            var type = record.raw.fileFormat;
                            var id = _this.addTrack(type, text, record.raw);
                            if(id != null){
                                var title = text;
                                updateActiveTracksPanel(type, title, id, true);
                            }
                        }
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","localopencga"))){
                        var type = record.raw.oid.split('.').pop();
                        var id = _this.addTrack(type, text, record.raw.oid, OPENCGA_LOCALHOST);
                        if(id != null){
                            var title = text;
                            updateActiveTracksPanel(type, title, id, true);
                        }
                    }
                }else{
                    if(idText == "cellbase"){
                        Ext.Msg.prompt('Cellbase', 'Please enter a new Cellbase URL:', function(btn, text){
                            if (btn == 'ok'){
                                var checkHost = null;
                                var testHost = "http://"+text+"/cellbase/rest";
                                $.ajax({url:testHost+"/rest/latest",async:false,success:function(data){
                                    if(data.indexOf("hsa") != -1 )
                                        checkHost=true;
                                }});
                                if(checkHost){
                                    CELLBASE_HOST = testHost;
                                    record.set('tooltip', CELLBASE_HOST);
                                    Ext.example.msg("Cellbase Host","Host changed<br>"+CELLBASE_HOST);
                                }else{
                                    Ext.example.msg("Cellbase Host","Not found");
                                }
                                //record.save();
                            }
                        });
                    }
                    if(idText == "das"){
                        var urlWidget = new UrlWidget({title:'Add a DAS track'});
                        urlWidget.onAdd.addEventListener(function(sender, event) {
                            var id = _this.addDASTrack(event.name, event.url);
                            updateActiveTracksPanel('das', event.name+"-"+id, id, true);
                        });
                        urlWidget.draw();
                    }
                    if(idText == "localopencga"){
                        _this._updateLocalOpencgaTracks();
                    }
                }
            }
        }]
    };
};


GenomeMaps.prototype._loadOpencgaTracks = function(response) {
	for ( var i = 0; i < response.buckets.length; i++) {
		var files = [];
        var bucketId = response.buckets[i].id;
		for ( var j = 0; j < response.buckets[i].objects.length; j++) {
			var opencgaObj = response.buckets[i].objects[j];
            opencgaObj['bucketId'] = bucketId;
//            console.log(opencgaObj.status);
			if(opencgaObj.fileType!=='dir' && (opencgaObj.fileFormat==='bam' || opencgaObj.fileFormat==='vcf')){
				opencgaObj["text"] = opencgaObj.fileName;
				opencgaObj["qtip"] = opencgaObj.status;
				opencgaObj["icon"] = Utils.images.r;
				opencgaObj["leaf"] = true;
				opencgaObj["oid"] = opencgaObj.id || opencgaObj["oid"];
				files.push(opencgaObj);
			}
		}
		Ext.getStore(this.id+'import').getRootNode().findChild("id","opencga").appendChild({text:response.buckets[i].name, iconCls:"icon-blue-box", expanded:true, children:files});
//        Ext.getStore(this.id+'import').getRootNode().collapse();
//        Ext.getStore(this.id+'import').getRootNode().expand();
	}
};

GenomeMaps.prototype._unloadOpencgaTracks = function() {
	Ext.getStore(this.id+'import').getRootNode().findChild('id','opencga').removeAll();
};

GenomeMaps.prototype._updateOpencgaTracks = function(response) {
	this._unloadOpencgaTracks();
	this._loadOpencgaTracks(response);
};

GenomeMaps.prototype._updateLocalOpencgaTracks = function() {
    var _this = this;

    var opencgaManager = new OpencgaManager(OPENCGA_LOCALHOST);
    opencgaManager.onLocalFileList.addEventListener(function(sender, data){
        Ext.getStore(_this.id+'import').getRootNode().findChild('id','localopencga').removeAll();
        if(data.statusText != 'error'){
            Ext.example.msg('Local Open CGA','loaded');
            Ext.getStore(_this.id+'import').getRootNode().findChild('id','localopencga').set('text','Browse local data <span class="ok">(ready)</span>');
            var localDirTree = JSON.parse(data);
            Ext.getStore(_this.id+'import').getRootNode().findChild('id','localopencga').appendChild(localDirTree);
        }
    });
    opencgaManager.localFileList();
};


GenomeMaps.prototype._loadTrackConfig = function(trackSvg, treeRecord) {
	var _this = this;
	var filtersConfig = trackSvg.getFiltersConfig();
	var filters = trackSvg.getFilters();
	if(filtersConfig != null){
		var items = [];
		var stores = [];
		
		for(var i = 0; i < filtersConfig.length; i++){
			var rootText = filtersConfig[i].text;
			var rootName = filtersConfig[i].name;
			
			var children = [];
			var checked;
			filters[rootName] != null ? checked=false : checked=true;
			for(var j = 0; j < filtersConfig[i].values.length; j++){
				children.push({text: filtersConfig[i].values[j], leaf: true, checked:checked, iconCls:"icon-blue-box"});
			}
			
			var root = {
				text:rootName,
				expanded: true,
				checked:checked,
				iconCls:"icon-box",
				children:children
			};
			var st = Ext.create('Ext.data.TreeStore',{root:root,fields:['text', 'name']});
			items.push({
				xtype:"treepanel",
				useArrows:true,
				//rootVisible: false,
				bodyPadding:"5 0 5 0",
				title : rootText,
				border:0,
				store:st,
				listeners:{
					checkchange:function(node, checked, eOpts ){
						if(node.isRoot()){
							node.eachChild(function(n){
								n.set("checked", checked);
							});
						}
					},
					afterrender:function(este){
						//restore previous filter config
						var node = este.getStore().getRootNode();
						var name = node.get("text");
						if(filters[name] != null){
							for(var i = 0; i < filters[name].length; i++){
								var child = node.findChild("text",filters[name][i]);
								child.set("checked",true);
								child.save;
							}
						}
					}
				}
			});
			stores.push(st);
		}

		var bar = {xtype:"toolbar", layout : {type : 'hbox',	pack : 'center'},
					items:[{xtype:'button', flex:1, text:'<span class="emph">Apply filter</span>',id:this.id+"SettingsPanelOkButton", handler: function(){
						var filters = {};
						for(var i = 0; i < stores.length; i++){
							var root = stores[i].getRootNode();
							var name = root.get("text");
							var checkValues = [];
							var nodesLength = 0;
							root.eachChild(function(node){
								nodesLength++;
								if(node.data.checked){
									checkValues.push(node.get("text"));
								}
							});
							//all check is the same as none checked
							if(checkValues.length == nodesLength){
								checkValues = [];
							}
							//if(checkValues.length > 0){
								filters[name]=checkValues;
							//}
						}
						console.log(filters)
						trackSvg.setFilters(filters);
					}
		}]};
		var tabFilter = Ext.create('Ext.tab.Panel', {
			flex:1,
            plain:true,
			border:0,
			bbar:bar,
			items: items
		});
		Ext.getCmp(this.id+"trackFiltering").removeAll();
		Ext.getCmp(this.id+"trackFiltering").add([tabFilter]);

	}else{
		Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackFiltering").tab.hide();
		Ext.getCmp(this.id+"trackFiltering").removeAll();
	}
    Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackFiltering").tab.show();
    Ext.getCmp(this.id+"activeTracksSettings").setActiveTab(Ext.getCmp(this.id+"trackFiltering"));

	var optionsConfig = trackSvg.getOptionsConfig();
	var options = trackSvg.getOptions();
	if(optionsConfig != null){
		optionComponents = [];
		for(var i = 0; i < optionsConfig.length; i++){
			var option = optionsConfig[i];
			if(option.type == "checkbox"){
				optionComponents.push({
					xtype:option.type,
					boxLabel:option.text,
					checked:option.checked,
					option:option,
					listeners:{
						change:function(este, newValue, oldValue, eOpts){
							if(newValue){
								trackSvg.setOption(este.option, newValue);
							}else{
								trackSvg.setOption(este.option, null);
							}
						}
					}
				});
			}
			if(option.type == "doublenumberfield"){
				optionComponents.push({
					xtype:"panel",
					title:option.text,
					bodyPadding:10,
					layout:{type:'vbox', align:'stretch'},
					items:[{
						xtype:"numberfield",
						checked:option.checked,
						value:option.minValue,
						fieldLabel:'Min',
						flex:1,
						option:option,
						minValue:0,
						listeners:{
							change:function(este, newValue, oldValue, eOpts){
								option["minValue"]=newValue;
							}
						}
					},{
						xtype:"numberfield",
						checked:option.checked,
						value:option.maxValue,
						fieldLabel:'Max',
						option:option,
						flex:1,
						minValue:0,
						listeners:{
							change:function(este, newValue, oldValue, eOpts){
								option["maxValue"]=newValue;
							}
						}
					},{
						xtype:"button",
						text:"apply",
						option:option,
						flex:2,
						handler:function(este, e, eOpts){
							if(este.option["minValue"] != 0 && este.option["maxValue"]!=0){
								trackSvg.setOption(este.option, este.option["minValue"]+","+este.option["maxValue"]);
							}else{
								trackSvg.setOption(este.option, null);
							}
						}
					}
					]
				});
			}
		}

		Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackOptions").tab.show();
		Ext.getCmp(this.id+"trackOptions").removeAll();
		Ext.getCmp(this.id+"trackOptions").add(optionComponents);
		Ext.getCmp(this.id+"activeTracksSettings").setActiveTab(Ext.getCmp(this.id+"trackOptions"));
	}else{
		Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackOptions").tab.hide();
		Ext.getCmp(this.id+"trackOptions").removeAll();
	}
};
