
//****   EVENT INTERFACE ****//
/*var Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
};*/

function Event(sender) {
    this._sender = sender;
    this._listeners = [];
};

 
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
};var Colors = new function()
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
}();function HeaderWidget(args){
	var _this=this;
	this.id = "HeaderWidget"+ Math.round(Math.random()*10000000);
	this.targetId = null;
//	this.height = 94;
	this.height = 67;
//	this.menubar=null;
	
	this.args = new Object();
	this.args.appname="My new App";
	this.args.description="My app description";
	this.args.suiteId=-1;
	
	if (args != null){
        if (args.appname != null){
        	this.args.appname = args.appname;       
        }
        if (args.description != null){
        	this.args.description = args.description;       
        }
        if (args.suiteId != null){
        	this.args.suiteId = args.suiteId;       
        }
    }
    
	this.adapter = new WumAdapter();
	
	/** Events **/
	this.onLogin = new Event();
	this.onLogout = new Event();
	
	
	/** create widgets **/
	this.loginWidget= new LoginWidget(this.args.suiteId);
	this.userBarWidget = new UserBarWidget();
	this.editUserWidget = new EditUserWidget();
	this.uploadWidget = new UploadWidget({suiteId:this.args.suiteId});
	this.projectManager = new ManageProjectsWidget({width:800,height:500,suiteId:this.args.suiteId});
	
	/**Atach events i listen**/
	this.loginWidget.onSessionInitiated.addEventListener(function (sender){
		_this.btnLogout.disable();
		_this.sessionInitiated();
		_this.onLogin.notify();
	});
	this.userBarWidget.onItemsReady.addEventListener(function(sender){
		_this.responseItemsReady();
	});
	this.projectManager.onRefreshProjectList.addEventListener(function(sender,data){
		_this.userBarWidget.createProjectMenuItems(data);
	});
	
	this.adapter.onLogout.addEventListener(function (sender, data){
		//Se borran todas las cookies por si acaso
		$.cookie('bioinfo_sid', null);
		$.cookie('bioinfo_sid', null, {path: '/'});
		_this.sessionFinished();
		_this.onLogout.notify();
	});	
	
};

HeaderWidget.prototype.responseItemsReady = function(){
	for (var i = 0; i < this.userBarWidget.items.length; i++) {
		this.userbar.insert(this.userbarInsertPos+i,this.userBarWidget.items[i]);
	}
//	this.userbar.add(this.userBarWidget.items);
	this.btnLogout.enable();
};

HeaderWidget.prototype.sessionInitiated = function(){
	/**HIDE**/
	this.loginWidget.clean();
	this.btnSignin.hide();
	/**SHOW**/
	this._enableMenubarItems();
	this.userBarWidget.draw(this.userbar);
	this.btnLogout.show();
	this.btnEdit.show();
};

HeaderWidget.prototype.sessionFinished = function(){
	/**HIDE**/
	this._disableMenubarItems();
	this.userBarWidget.clean(this.userbar);
	this.btnLogout.hide();
	this.btnEdit.hide();
	/**SHOW**/
	this.btnSignin.show();
};

HeaderWidget.prototype.draw = function(){
	this.render();
	if($.cookie('bioinfo_sid') != null){
		this.sessionInitiated();
	}else{
		this.sessionFinished();
	}
};

HeaderWidget.prototype.render = function (){
	var _this=this;
	if (this.panel==null){
		
		this.species = Ext.create('Ext.toolbar.TextItem', {
			id:this.id+"speciesTextItem",
			text:''
		});
		this.assembly = Ext.create('Ext.toolbar.TextItem', {
			id:this.id+"assemblyTextItem",
			text:''
		});
		
//		console.log(this.args.suiteId);
		switch(this.args.suiteId){
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
				this.helpLink="http://docs.bioinfo.cipf.es/projects/genomemaps";
				this.tutorialLink="http://docs.bioinfo.cipf.es/projects/genomemaps/wiki/Tutorial";
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
				this.helpLink="http://docs.bioinfo.cipf.es";
				this.tutorialLink="http://docs.bioinfo.cipf.es";
				this.aboutText = '';
				break;
			case 12://UNTBgen
				this.homeLink="http://bioinfo.cipf.es/apps/untbgen";
				this.helpLink="http://bioinfo.cipf.es/ecolopy/";
				this.tutorialLink="http://bioinfo.cipf.es/ecolopy/";
				this.aboutText = '';
				break;
			default:
				this.homeLink="http://docs.bioinfo.cipf.es";
				this.helpLink="http://docs.bioinfo.cipf.es";
				this.tutorialLink="http://docs.bioinfo.cipf.es";
				this.aboutText = '';
		}
		
		
		this.linkbar = new Ext.create('Ext.toolbar.Toolbar', {
		id:this.id+"linkbarToolbar",
		dock: 'top',
		cls:'bio-linkbar',
		height:40,
		minHeight:40,
		maxHeight:40,
		items: [
		        {
		        	id:this.id+"appTextItem",
		        	xtype:'tbtext',
//		        	html: '<span class="appName">Vitis vinifera&nbsp; '+this.args.appname +'</span> <span class="appDesc">'+this.args.description+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><img height="30" src="http://www.demeter.es/imagenes/l_demeter.gif"></span>',
		        	text: '<span class="appName">'+this.args.appname +'</span> <span id="'+this.id+'description" class="appDesc">'+this.args.description+'</span>',
		        	padding: '0 0 0 10'
		        	
		        },
		        this.species,
		        this.assembly,
		        '->',
		        {
		        	id:this.id+"homeButton",
		        	text: 'home', 
		        	handler:function(){window.location.href=_this.homeLink;}
		        },
		        {
		        	id:this.id+"helpButton",
		        	text: 'help',
		        	handler:function(){window.open(_this.helpLink);}
		        },
		        {
		        	id:this.id+"tutorialButton",
		        	text: 'tutorial',
		        	handler:function(){window.open(_this.tutorialLink);}
		        },
		        {
		        	id:this.id+"aboutButton",
		        	text: 'about',
		        	handler:function(){
		        		Ext.create('Ext.window.Window', {
		        			id:_this.id+"aboutWindow",
		        			bodyStyle: 'background:#fff; color:#333;',
		        			bodyPadding:10,
		        			title: 'About',
		        			height: 340,
		        			width: 500,
		        			modal:true,
		        			layout: 'fit',
		        			html:_this.aboutText
		        		}).show();
		        	}
		        }
		        ]
		});
		
		this.userbar = new Ext.create('Ext.toolbar.Toolbar', {
			id : this.userBarId,
			dock: 'top',
			border:true,
			cls:'bio-userbar',
			height:27,
			minHeight:27,
			maxHeight:27
//			items:[
//					{
//						text: 'Genome Maps',
//        				handler:function(){window.location.href='../genomemap';}
//					},
//					{
//						text: 'Network',
//        				handler:function(){window.location.href='../network';}
//					},
//					{
//						text: 'Pupasuite 4',
//        				handler:function(){window.location.href='../pupasuite4';}
//					}
//				]
		});
//		var appItems=this.userbar.items.items;
//		for(var i=0;i<appItems.length;i++){
//			if(this.args.appname==appItems[i].getText()){
//				appItems[i].setText('<span class="ssel border-bot">'+this.args.appname+'</span>');
//			}
//		}
		this.userbar.add('->');
		this.userbarInsertPos = this.userbar.items.items.length;
		
		this.btnSignin = Ext.create('Ext.Button', {
			id :this.id+"btnSignin",
	        text: '<span class="emph">sign in</span>',
	        scope:this,
	        listeners: {
			       scope: this,
			       click: function (){
			    	   this.loginWidget.draw();
			       		}
	        }
		});

		this.btnEdit = Ext.create('Ext.Button', {
			id :this.id+"btnEdit",
	        text: '<span class="emph">edit</span>',
	        scope:this,
	        listeners: {
			       scope: this,
			       click: function (){
			    	   		this.editUserWidget.draw();
			       		}
	        }
		});
		this.btnLogout = Ext.create('Ext.Button', {
			id :this.id+"btnLogout",
	        text: '<span class="emph">logout</span>',
	        scope:this,
	        listeners: {
			       scope: this,
			       click: function (){
			    	   this.adapter.logout($.cookie('bioinfo_sid'));
			       		}
	        }
		});
		
		this.userbar.add(this.btnEdit);
		this.userbar.add(this.btnLogout);
		this.userbar.add(this.btnSignin);
		
		this.linkbar.add(this._getMenubarItems());
		
		this.panel = Ext.create('Ext.panel.Panel', {
			id:this.id+"panel",
	        region: 'north',
	        border:false,
	        renderTo:this.targetId,
	        height : this.height,
	        minHeight: this.height,
	        maxHeigth: this.height
	    });
		
		this.panel.add(this.userbar);
		this.panel.add(this.linkbar);
//		this.setMenubar();
	}
};

HeaderWidget.prototype.getPanel = function (){
	this.draw();
	return this.panel;
};	

HeaderWidget.prototype._getMenubarItems = function (){
	var _this = this;
	this.btnUpload = Ext.create('Ext.Button', {
		id:this.id+"btnUpload",
        text: 'Upload data',
        iconCls: 'icon-upload',
        disabled: true,
        listeners: {
		       scope: this,
		       click: function (){
		    	   		this.uploadWidget.draw();
		       		}
        }
	});
//	return ['->',this.btnUpload];
	
	this.manageProjectsButton = Ext.create('Ext.Button', {
			id:this.id+"manageProjectsButton",
			text: 'Projects',
			iconCls: 'icon-project-manager',
			disabled: true,
			handler: function() {
				_this.projectManager.draw();
//				projectManager.parseData(_this.projectNames);
			}
	});
	
	
	return [this.manageProjectsButton,this.btnUpload];
};

HeaderWidget.prototype._enableMenubarItems = function (){
	this.btnUpload.enable();
	this.manageProjectsButton.enable();
};
HeaderWidget.prototype._disableMenubarItems = function (){
	this.btnUpload.disable();
	this.manageProjectsButton.disable();
};


HeaderWidget.prototype.setDescription = function (text){
	$("#"+this.id+"description").text(text);
};

HeaderWidget.prototype.setWidth = function (width){
//	if(width<500){width=500;}
//	if(width>2400){width=2400;}//if bigger does not work TODO why?
	this.width=width;
	this.getPanel().setWidth(width);
	this.getPanel().updateLayout();//sencha 4.1.0 : items are not allocated in the correct position after setWidth
};


//HeaderWidget.prototype.setMenubar = function (){
//	this.menubar.add(this._getMenubarItems());
//	this.menubar.xtype='toolbar';
//    this.menubar.dock= 'top';
//	this.menubar.height=27;
//	this.menubar.padding= '0 0 0 10';
//	this.menubar.cls='bio-menubar',
//	this.menubar.minHeight=27;
//	this.menubar.maxHeight=27;
//	this.panel.add(this.menubar);
//};
function UserListWidget (args){
	var _this = this;
	this.id = "UserListWidget_"+ Math.round(Math.random()*10000000);
	this.data = new Array();
	
	this.args = new Object();
	this.timeout = 4000;
	this.pagedViewList = args.pagedViewList;
	this.suiteId=-1;
	
	if (args != null){
        if (args.timeout != null && args.timeout > 4000){
        	this.timeout = args.timeout;       
        }
        if (args.suiteId != null){
        	this.suiteId = args.suiteId;       
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
JobListWidget.prototype.draw = UserListWidget.prototype.draw;
JobListWidget.prototype.getData = UserListWidget.prototype.getData;
JobListWidget.prototype.getCount = UserListWidget.prototype.getCount;

function JobListWidget (args){
	UserListWidget.prototype.constructor.call(this, args);
	this.counter = null;
	var _this = this;
	var jobstpl = [
					'<tpl for=".">',
					'<div class="joblist-item">',
						'<p style="color:'+
											'<tpl if="visites == 0">green</tpl>'+
											'<tpl if="visites &gt; 0">blue</tpl>'+
											'<tpl if="visites == -1">red</tpl>'+
											'<tpl if="visites == -2">Darkorange</tpl>'+
											'">{name}</p>',
						'<p style="color: #15428B"><i>{creationTime}</i></p>',
						'<p style="color:steelblue"><i>- {toolName} -</i></p>',
						'<p style="color:grey"><i>',
//						'<tpl if="visites == 0">finished and unvisited</tpl>',
//						'<tpl if="visites &gt; 0">{visites} visites</tpl>',
						'<tpl if="visites == -1">',
						'<div style="height:10px;width:{percentage/100*180}px;background:url(\'http://jsapi.bioinfo.cipf.es/ext/sencha/4.0.2/resources/themes/images/default/progress/progress-default-bg.gif\') repeat-x;">',
						'&#160;</div>{percentage}%',
						'</tpl>',
						'<tpl if="visites == -2">waiting in the queue...</tpl>',
						'<i></p>',
					'</div>',
					'</tpl>'
					];

	var	jobsfields = ['commandLine','creationTime','description','diskUsage','finishTime','inputData','jobId','message','name','outputData','ownerId','percentage','projectId','toolName','visites'];

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
	    	_this.selectProjectData();
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
                  this.projectFilterButton,
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
	
	this.allData = new Array();
	
	this.adapter = new WumAdapter();
	this.adapter.onListProject.addEventListener(function (sender, data){
//		console.log("onListProject");
		_this.allData = JSON.parse(data);
		_this.selectProjectData();
		_this.render();
	});	
};

JobListWidget.prototype.clean =  function (){
	clearInterval(this.interval);
	if(this.bar.isDescendantOf(Ext.getCmp(this.pagedListViewWidget.panelId))==true){
		Ext.getCmp(this.pagedListViewWidget.panelId).removeDocked(this.bar,false);
	}
	this.pagedListViewWidget.clean();
};

JobListWidget.prototype.getResponse = function (){
	this.adapter.listProject($.cookie("bioinfo_sid"), this.suiteId);
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
			    	sorters: [{ property : 'creationTime', direction: 'DESC'}],
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
					    		console.log("jobId: "+record.data.jobId+ "   dataId: "+record.data.dataId);
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
							    		_this.store.sort('creationTime', 'ASC');
							    		this.setIconCls('icon-order-asc');
							    	}
							    	else {
							    		_this.sort = "DESC";
							    		_this.store.sort('creationTime', 'DESC');
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
					title : this.title,
					border:this.border,
				    width: this.width,
				    tbar : this.pagBar,
				    items: [pan]
				});
//				this.view.setHeight(this.panel.getHeight());
				
				var target = Ext.getCmp(this.targetId);
				if (target instanceof Ext.panel.Panel){
					target.insert(this.order, this.panel);
					target.setActiveTab(1);//si no se pone el active da un error de EXT
					target.setActiveTab(0);//si no se pone el active da un error de EXT
					pan.setHeight = this.panel.getHeight();
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
/** END Paging bar Events **/function UserBarWidget(args){
	var _this=this;
	this.id = "UserBarWidget_";
	this.targetId = null;
	
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
    }
	
    /**ID**/
	this.spltbtnActiveProjectId = this.id + "_spltbtnActiveProjectID";
    
    this.adapter = new WumAdapter();
    
	/**Events i send**/
	this.onItemsReady = new Event(this);
	this.onProjectChange = new Event(this);
	
	/**Atach events i listen**/
	this.adapter.onGetUserInfo.addEventListener(function (sender, data){
		_this.responseGetUserInfo(data);
		
	});	
	this.adapter.onActiveProject.addEventListener(function (sender, data){
		_this.responseActiveProject();
	});
	
};
UserBarWidget.prototype.responseActiveProject = function(data){
	Ext.getBody().unmask();
	Ext.getCmp(this.spltbtnActiveProjectId).setText('<b class="emph">'+this.workingProject+'</b>');
	this.onProjectChange.notify();
};
UserBarWidget.prototype.responseGetUserInfo = function(data){
//	console.log(data);
	this.pdata = JSON.parse(data);
//	console.log(this.pdata);
	
	var a=(this.pdata.diskUsage/1024).toFixed(2);
	var b=(this.pdata.diskQuota/1024)/1024;
	var p=(this.pdata.diskUsage/this.pdata.diskQuota*100).toFixed(2);
	
//	this.projectNames = [];
	this.workingProject = '<b class="emph">'+this.pdata.activeProjectName+'</b>';
	
	
	this.createProjectMenuItems(this.pdata.ownedProjects);
	
	this.userInfo = '<b style="color:darkred">'+this.pdata.email+'</b>&nbsp;working&nbsp;on&nbsp;project';
	this.userInfo2 = ' using&nbsp;<b style="color:chocolate">'+a+'</b>&nbsp;MB&nbsp;of&nbsp;<b style="color:blue">'+b+'</b>&nbsp;GB&nbsp;(<b>'+p+'%</b>)&nbsp;';

	this.render();
	this.onItemsReady.notify();
};

UserBarWidget.prototype.draw = function (bar){
	this.clean(bar);
	this.adapter.getUserInfo($.cookie('bioinfo_sid'));
	
	
};
UserBarWidget.prototype.clean = function (bar){
	if (this.items != null){
		for(var i=0;i<this.items.length;i++){
			bar.remove(this.items[i]);
		}
		delete this.items;
	}
};

UserBarWidget.prototype.render = function (){
	var _this = this;
	if (this.items == null){
		this.projectMenu = Ext.create('Ext.menu.Menu',{
			plain:true,
			items: this.projects
		});
		var splitButton = Ext.create('Ext.button.Button',{
			id : this.spltbtnActiveProjectId,
		    text :this.workingProject,
		    menu: this.projectMenu
		});
		var infoLabel = Ext.create('Ext.container.Container', {
			html: this.userInfo
		});
		var infoLabel2 = Ext.create('Ext.container.Container', {
			html: this.userInfo2
		});
		this.items = [infoLabel, splitButton, infoLabel2];
	}
};

UserBarWidget.prototype.createProjectMenuItems = function (data){
	this.projects = new Array();
	for (var i = 0; i < data.length; i++){
		this.projects[i] = { text : data[i].name,
				index : i,
				iconCls: 'icon-change-project',
				listeners: {
					scope: this,
					click: function(button){
						Ext.getBody().mask('Changing project...');
						console.log('cliked on project id -> '+data[button.index].projectId);
						this.workingProject = data[button.index].name;
						this.workingProjectId = data[button.index].projectId;
						this.adapter.activeProject(data[button.index].projectId, $.cookie('bioinfo_sid'));
					}
				}
		};
//		this.projectNames.push({name:this.pdata.ownedProjects[i].name,jobs:this.pdata.ownedProjects[i].jobs, id:this.pdata.ownedProjects[i].projectId, suiteId:this.pdata.ownedProjects[i].suiteId});
	}
	
	if(this.projectMenu!=null){
		this.projectMenu.removeAll();
		this.projectMenu.add(this.projects);
	}
//	console.log(this.pdata.ownedProjects[0]);
};
function UploadWidget (args){
	var _this=this;
	this.id = "uploadWidget_"+ Math.round(Math.random()*10000000);
	this.targetId = null;
	this.suiteId=null;
	
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
		if (args.suiteId!= null){
        	this.suiteId = args.suiteId;       
        }
    }
	
	this.adapter = new WumAdapter();
	
	
	this.uploadButtonId = this.id+'_uploadButton';
	this.uploadFieldId = this.id+'_uploadField';
	
	this.selectedDataType = null;
};

//UploadWidget.prototype.getsdf = function(){
//	return this.id+'_uploadButton';
//};

UploadWidget.prototype.draw = function(){
	var dataTypes = {};
	dataTypes["9"]=[
		            { text: "ID List", children: [
		                { text: "SNP", tag:"idlist:snp"},//el tag es para introducirlo en la base de datos al subir los datos
		                { text: "Gene/Transcript",tag:"idlist:gene:transcript"}//si son varios van separados por ->  :
		            ] },
		            { text: "Feature", children: [
		                { text: "VCF 4.0", tag:"vcf"},
		                { text: "GFF2", tag:"gff2"},
		                { text: "GFF3", tag:"gff3"},
		                { text: "GTF", tag:"gtf"},
		                { text: "BED", tag:"bed"},
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
	switch (this.suiteId){
		case 9: this.checkDataTypes(dataTypes["9"]); this.render(dataTypes["9"]); break;
		case 6: this.checkDataTypes(dataTypes["6"]); this.render(dataTypes["6"]); break;
		case 11: this.checkDataTypes(dataTypes["11"]); this.render(dataTypes["11"]); break;
		case 12: this.checkDataTypes(dataTypes["12"]); this.render(dataTypes["12"]); break;
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
		var height = Object.keys(store.tree.nodeHash).length*20;
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
			    			this.dataTypeLabel.setText('<span class="info">Type:</span><span class="ok"> OK </span>',false);
			    		}else{
			    			this.selectedDataType = null;
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
	        allowBlank: false,
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
				_this.uploadFile();
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
			items:[this.originCheck,'->',this.dataTypeLabel,'-',this.dataNameLabel,'-',this.dataFieldLabel]
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
	
	if (this.selectedDataType != null && this.nameField.getValue() !="" && (this.uploadField.getRawValue()!="" || this.editor.getValue()!="") ){
		Ext.getCmp(this.uploadButtonId).enable();
	}else{
		Ext.getCmp(this.uploadButtonId).disable();
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
    if(this.originCheck.getValue()){
    	fd.append("file", this.editor.getValue());
    }else{
	    fd.append("file", document.getElementById(Ext.getCmp(this.uploadFieldId).fileInputEl.id).files[0]);
	    
    }
    var sessionId = $.cookie('bioinfo_sid');
    
   	fd.append("name", this.nameField.getValue()); 
   	fd.append("tags", this.selectedDataType);//TODO mirar bien los tags
   	fd.append("responsible", this.responsableField.getValue());
   	fd.append("organization", this.organizationField.getValue());
   	fd.append("date", this.acquisitiondate.getValue());
   	fd.append("description", this.textArea.getValue());
   	fd.append("sessionid", sessionId);
   	
    	
//    var xhr2 = new XMLHttpRequest();
//    xhr.upload.addEventListener("progress", this.uploadProgress, false);
//    xhr.addEventListener("load", function(res){_this.uploadComplete(res);}, false);
//    xhr.addEventListener("error", function(res){_this.uploadFailed(res);}, false);
//    xhr.addEventListener("abort", this.uploadCanceled, false);
//    xhr.open("POST", this.adapter.getHost()+'/rest/data/upload?sessionid='+sessionId, false);// si pones true es asíncrono, si pones false no
//    															   // en asíncrono aparece el problema del cors
//    xhr.send(fd);
   	
   	
   var xhr = $.ajax({
      url: this.adapter.getHost()+'/data/upload',
      type: "POST",
      data:fd,
//      success:function(res){_this.uploadComplete(res);},
//      error:function(res){_this.uploadFailed(res);},
      processData: false,  // tell jQuery not to process the data
      contentType: false   // tell jQuery not to set contentType
    });  
   xhr.done(function(res){_this.uploadComplete(res);});
   xhr.fail(function(res){_this.uploadFailed(res);});
//   xhr.progress(function(res){_this.uploadProgress(res);}); //solo en jquery 1.7.1 pero no funciona, en la 1.6.4 peta
    
};

UploadWidget.prototype.uploadProgress = function(evt)  {
	console.log("Progress...");
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
  		console.log(percentComplete);
//      document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    }
    else {
    	console.log('unable to compute');
//      document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
};

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
	
	this.adapter = new WumAdapter();
	
	/**Atach events i listen**/
	this.adapter.onLogin.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
//		console.log(data.length);
		console.log(data);
		data = data.replace(/^\s+|\s+$/g, '');
		if(data.length == 64){
//			console.log(_this.id+' LOGIN RESPONSE -> '+data);
			$.cookie('bioinfo_sid', data /*,{path: '/'}*/);//TODO ATENCION si se indica el path el 'bioinfo_sid' es comun entre dominios
			_this.onSessionInitiated.notify();
		}else{
			//login anonymous not working fix
			if(data.indexOf("ERROR")==-1){
				var pdata = JSON.parse(data);
				if(pdata.currentSessionId!=null){
					 $.cookie('bioinfo_sid', pdata.currentSessionId /*,{path: '/'}*/);
					_this.onSessionInitiated.notify();
				}
			}else{
	//          console.log(_this.id+' SESSION ID FORMAT INVALID -> '+data);
	            Ext.getCmp(_this.labelPassId).setText('<span class="err">'+data+'</span>', false);
	            //Se borran las cookies por si acaso
				$.cookie('bioinfo_sid', null);
				$.cookie('bioinfo_sid', null, {path: '/'});
			}
		}
	});
	this.adapter.onRegister.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
//		console.log(data.length);
		data = data.replace(/^\s+|\s+$/g, '');
		if(data.length == 64){
//			console.log(_this.id+' LOGIN RESPONSE -> '+data);
			$.cookie('bioinfo_sid', data /*,{path: '/'}*/);//TODO ATENCION si se indica el path el 'bioinfo_sid' es comun entre dominios
			_this.onSessionInitiated.notify();
		}else{
//			console.log(_this.id+' SESSION ID FORMAT INVALID -> '+data);
			data = data.replace(/ERROR: /gi," ");
			Ext.getCmp(_this.labelPassId).setText('<span class="err">'+data+'</span>', false);
			//Se borran las cookies por si acaso
			$.cookie('bioinfo_sid', null);
			$.cookie('bioinfo_sid', null, {path: '/'});
		}
	});
	this.adapter.onReset.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
		Ext.getCmp(_this.labelPassId).setText('<span class="emph">'+data+'</span>', false);
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
		this.adapter.login("anonymous", "", this.suiteId );
			this.panel.setLoading('Waiting server...');
	}else{
		if(this.checkemail()){
			if (this.getLogin().indexOf("@")!=-1){//If 
				this.adapter.login(this.getLogin(), this.getPassword(), this.suiteId );
			}else{
				this.adapter.login(this.getLogin()+"@cipf.es", this.getPassword(), this.suiteId );
			}
			
//		Ext.getCmp(this.labelPassId).setText('Waiting server to respond...', false);
			this.panel.setLoading('Waiting server...');
			
			$.cookie('bioinfo_user', this.getLogin(), {path:'/',expires: 7});
		}
	}
};
LoginWidget.prototype.register = function (){ 
	if(this.checkemail() && this.checkpass() ){
		this.adapter.register(this.getLogin(), this.getPasswordReg(), this.suiteId );
	}
};

LoginWidget.prototype.sendRecover = function (){ 
	if(this.checkemail()){
		this.adapter.reset(this.getLogin());
		this.panel.setLoading('Waiting server...');
	}
};

LoginWidget.prototype.getLogin = function (){
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
			text: '<span class="info">Type your email</span>'
		});
		var labelPass = Ext.create('Ext.toolbar.TextItem', {
			id : this.labelPassId,
			padding:3,
			text:'<span class="info">Type your password</span>'
		});
		
		this.pan = Ext.create('Ext.form.Panel', {
			id : this.id+"formPanel",
			bodyPadding:20,
		    width: 350,
		    height: 145,
		    border:false,
		    bbar:{items:[labelEmail,'-', labelPass]},
		    items: [{
		    	id: this.fldEmailId,
		    	xtype:'textfield',
		    	value:$.cookie('bioinfo_user'),
		        fieldLabel: 'e-mail',
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
		    	id: this.fldPasswordId,
		    	xtype:'textfield',
		        fieldLabel: 'password',
		        inputType: 'password' ,
//		        emptyText:'please enter your password',
		        listeners:{
					specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	_this.sign();
	                    }
	                }
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
		    	margin:"0 0 0 50"
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
	
	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your email to send a new password</span>', false);
	Ext.getCmp(this.labelPassId).setText('&nbsp;', false);
};
LoginWidget.prototype.ShowBack = function (){
	Ext.getCmp(this.fldEmailId).reset();
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

	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your email</span>', false);
	Ext.getCmp(this.labelPassId).setText('<span class="info">Type your password</span>', false);
};
LoginWidget.prototype.ShowNewacc = function (){
	Ext.getCmp(this.fldEmailId).reset();
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
	
	
	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your email</span>', false);
	Ext.getCmp(this.labelPassId).setText('<span class="info">Type your password</span>', false);
};

LoginWidget.prototype.checkpass = function (){
	
	var passwd1 = Ext.getCmp(this.fldNpass1Id).getValue();
	var passwd2 = Ext.getCmp(this.fldNpass2Id).getValue();
	var patt = new RegExp("[ *]");
	
		if(!patt.test(passwd1) && passwd1.length > 3){
			if (passwd1 == passwd2){
//				Ext.getCmp(this.fldNpass1Id).clearInvalid();
				Ext.getCmp(this.labelPassId).setText('<span class="ok">Passwords match</span>', false);
				return true;
			}else{
				Ext.getCmp(this.labelPassId).setText('<span class="err">Password does not match</span>', false);
//				Ext.getCmp(this.fldNpass1Id).markInvalid('Password does not match');
				return false;
			}
		}else{
			Ext.getCmp(this.labelPassId).setText('<span class="err">Password must be at least 4 characters</span>', false);
//			Ext.getCmp(this.fldNpass1Id).markInvalid('password must be at least 4 characters');
			return false;
		}
};

LoginWidget.prototype.anonymousSelected = function (este,value){ 
	if(value){
		Ext.getCmp(this.labelEmailId).setText('<span class="ok">Anonymous selected</span>', false);
		Ext.getCmp(this.labelPassId).setText('<span class="ok">No password required</span>', false);
	}else{
		Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your email</span>', false);
		Ext.getCmp(this.labelPassId).setText('<span class="info">Type your password</span>', false);
	}
	
};

LoginWidget.prototype.checkemail = function (a,b,c){
	Ext.getCmp(this.btnAnonymousId).reset();
	var email = Ext.getCmp(this.fldEmailId).getValue();
	var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
	if (email.indexOf("@")!=-1){
		if (patt.test(email)){
//		Ext.getCmp(this.fldEmailId).clearInvalid();
			Ext.getCmp(this.labelEmailId).setText('<span class="ok">E-mail format valid</span>', false);
			return true;
		}else{
//		Ext.getCmp(this.fldEmailId).markInvalid('email format not valid');
			Ext.getCmp(this.labelEmailId).setText('<span class="err">E-mail format not valid</span>', false);
			return false;
		}
	}else{
		Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your email</span>', false);
		return true;
	}
	
};
function EditUserWidget(args){
	var _this=this;
	this.id = "EditUserWidget_"+ Math.round(Math.random()*10000000);
	this.targetId = null;
	
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
    }
	
	this.adapter = new WumAdapter();
	
	this.adapter.onEditPassword.addEventListener(function (sender, data){
			_this.panel.setLoading(false);
			console.log(_this.id+' EDIT PASS RESPONSE -> '+data);
			Ext.getCmp(_this.labelPassId).setText(data, false);
//			_this.??.notify();
	});
	
	this.fldOldId = this.id+"fldOld";
	this.fldNew1Id = this.id+"fldNew1";
	this.fldNew2Id = this.id+"fldNew2";
	this.btnChangeId = this.id+"btnChange";
	
	this.labelPassId = this.id+"labelPass";
};

EditUserWidget.prototype.getOldPassword = function (){
	return $.sha1(Ext.getCmp(this.fldOldId).getValue());
};

EditUserWidget.prototype.getNewPassword = function (){
	console.log($.sha1(Ext.getCmp(this.fldNew1Id).getValue()));
	return $.sha1(Ext.getCmp(this.fldNew1Id).getValue());
};

EditUserWidget.prototype.change = function (){ 
	if(this.checkpass()){
		this.adapter.editPassword(this.getOldPassword(),this.getNewPassword(), $.cookie('bioinfo_sid'));
		this.panel.setLoading('Waiting for the server to respond...');
	}
}

EditUserWidget.prototype.draw = function (){
	this.render();
};

EditUserWidget.prototype.clean = function (){
	if (this.panel != null){
		this.panel.destroy();
		delete this.panel;
		console.log(this.id+' PANEL DELETED');
	}
};



EditUserWidget.prototype.render = function (){
	var _this=this;
	if (this.panel == null){
		console.log(this.id+' CREATING PANEL');
		
		var labelPass = Ext.create('Ext.toolbar.TextItem', {
			id : this.labelPassId,
			padding:3,
			text:'<span class="info">Type the old and the new password</span>'
		});
		
		
		
		this.pan = Ext.create('Ext.panel.Panel', {
			bodyPadding:20,
		    width: 350,
		    height:135,
		    border:false,
		    bbar:{items:[labelPass]},
		    items: [{
		    	id: this.fldOldId,
		    	xtype:'textfield',
		        fieldLabel: 'Old password',
		        inputType: 'password'
		    },{
		    	id: this.fldNew1Id,
		    	xtype:'textfield',
		        fieldLabel: 'New password',
		        inputType: 'password' ,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkpass
			    }
		    },{
		    	id: this.fldNew2Id,
		    	xtype:'textfield',
		        fieldLabel: 'Confirm new',
		        inputType: 'password' ,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkpass
			    }
		    }
		    ]
		});
		
		this.panel = Ext.create('Ext.window.Window', {
		    title: 'Change your password',
		   	resizable: false,
		    minimizable :true,
			constrain:true,
		    closable:true,
		    modal:true,
		    items:[this.pan],
		    buttonAlign:'center',
		    buttons:[{
		    	id: this.btnChangeId,
		    	text:'Change'
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
		Ext.getCmp(this.btnChangeId).on('click', this.change, this);
	}
		this.panel.show();
};



EditUserWidget.prototype.checkpass = function (){ 
	
	var passwd1 = Ext.getCmp(this.fldNew1Id).getValue();
	var passwd2 = Ext.getCmp(this.fldNew2Id).getValue();
	var patt = new RegExp("[ *]");
	
		if(!patt.test(passwd1) && passwd1.length > 3){
			if (passwd1 == passwd2){
//				Ext.getCmp(this.fldNew1Id).clearInvalid();
				Ext.getCmp(this.labelPassId).setText('<p class="ok">Passwords match</p>', false);
				return true;
			}else{
//				Ext.getCmp(this.fldNew1Id).markInvalid('Password does not match');
				Ext.getCmp(this.labelPassId).setText('<p class="err">Passwords does not match</p>', false);
				return false;
			}
		}else{
//			Ext.getCmp(this.fldNew1Id).markInvalid('password must be at least 4 characters');
			Ext.getCmp(this.labelPassId).setText('<p class="err">Password must be at least 4 characters</p>', false);
			return false;
		}
};function ResultWidget(args){
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
	
	this.adapter = new WumAdapter();
	
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
	this.jobId = this.record.data.jobId;
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
			this.adapter.jobResult(this.jobId, "json", sid);
		}else{
//			this.panel.setLoading(false);
			Ext.getCmp(this.targetId).setActiveTab(this.panel);
		}
};

ResultWidget.prototype.render = function (){
	var _this=this;
	
	console.log(this.application);
	
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
			
			console.log(obj);
			
			var topLink = Ext.create('Ext.container.Container', {html:'<a name="'+this.jobId+'top"></a>'});
			var info = Ext.create('Ext.container.Container', {
				margin: "15 0 5 15",
				html:'<p >The job named <span class="info">'+this.record.data.name+' </span>'+
				'was launched on <span class="err">'+this.record.data.creationTime+' </span>'+
				'and has been visited <span class="dis">'+this.record.data.visites+' times</span></p>'+
				'You can download the job results by pressing the <b>download</b> button.'
			});
			
			var result = [];
			//Solo grupos juntos al principio
			var i=1;
			for (key in obj){
				var groupBox = Ext.create('Ext.container.Container', {
					padding:"0 0 2 15",
					html:'<p class="s110 emph">'+i+'. <a href="#'+key+'">'+key+'</a></p>'
				});
				result.push(groupBox);
				i++;
			}
			
			//Grupos con resultados a continuacion
			var i=1;
			for (key in obj){
				//Grupo
				var infoId = (this.jobId+key+"info").replace(/ /gi, "");
				var groupBox = Ext.create('Ext.container.Container', {
					infoId:infoId,
					groupName:key,
					padding:"60 15 5 15",
					html:'<p class="panel-border-bottom"><span class="s140 emph">'+i+'. <a name="'+key+'" href="#'+this.jobId+'top">'+key+'</a>'+
						' </span><span class="info" id="'+infoId+'"></span></p>',
					listeners:{
						afterrender:function(){
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
			this.panel.add(downloadButton);
			this.panel.add(deleteJobButton);
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
	    				var value = datos.value;
		    			_this.adapter.poll(_this.jobId, value, true, $.cookie('bioinfo_sid'));
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
			box.html =  '<div><img width="900" src="'+_this.adapter.pollurl(_this.jobId,item.value,$.cookie('bioinfo_sid'))+'"></div>';
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
        		var id = _this.jobId+item.value+item.tags;
        		var value = item.value;
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
		
		var adapterPoll = new WumAdapter();
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
		adapterPoll.poll(this.jobId,this.resultHistograms[id],false,$.cookie('bioinfo_sid'));
		
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
		height:700,
		cls:'greyborder',
		html:'<div id="'+this.id+'Container"></div>'
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
		
	var genomeViewer = new GenomeViewer(targetId, AVAILABLE_SPECIES[0],{
		version:"",
		zoom:75,
		width:width-2,
		height:height-2
	});
	genomeViewer.setMenuBar(this.getGenomeViewerResultBar(genomeViewer));
	
	genomeViewer.afterRender.addEventListener(function(sender,event){
		_this.app.setTracks(genomeViewer);
	});
	genomeViewer.draw();
	
	
	var adapter = new WumRestAdapter();
	adapter.onPoll.addEventListener(function(sender, data){
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
		var feature = vcfDataAdapter.featureCache.getFirstFeature();
		genomeViewer.setLoc({sender:"",chromosome:feature.chromosome, position:feature.start});
//		genomeViewer.setZoom(75);
	});
	
	
//	console.log(this.filteredVcfFile)
	if(this.filteredVcfFile != null){
		adapter.poll(_this.jobId, this.filteredVcfFile, false, $.cookie('bioinfo_sid'));
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
function ResultTable(jobId, filename, tags, args){
	var _this = this;
	this.id = "ResultTable"+ Math.round(Math.random()*10000000);
	this.targetId = null;
	
	this.jobId = jobId;
	this.fileName=filename;
	this.tags=tags;
	this.numRows=5;
	this.flex=null;
	this.collapsible=true;
	this.border=true;
	this.cls=null;
	
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
		if (args.numRows!= null){
        	this.numRows = args.numRows;       
        }
		if (args.flex!= null){
        	this.flex = args.flex;       
        }
		if (args.collapsible!= null){
        	this.collapsible = args.collapsible;      
        }
		if (args.border!= null){
        	this.border = args.border;      
        }
		if (args.cls!= null){
        	this.cls = args.cls;      
        }
    }
	
	this.adapter = new WumAdapter();
	
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
	for( var i =0; i < tables.length; i++){
		if (this.tags.indexOf(tables[i].name)!= -1){//me quedo con la primera que encuentro
			this.tableSkel = tables[i];
			this.colNames = tables[i].colNames; 
			this.colVisibilty = tables[i].colVisibility;
			this.colTypes = tables[i].colTypes;
			rows = tables[i].numRows;
			
			filteredGridNames = new Array();
			filteredColNames = new Array();
			for (var j=0;j<this.colNames.length; j++){
				if (this.colVisibilty[j]==1){
					filteredGridNames.push({header:this.colNames[j],dataIndex:this.colNames[j], flex:1});
					filteredColNames.push({name:this.colNames[j],type:this.colTypes[j]});
				}
			}
		break;
		}
	}
	if(this.tableSkel.type == "text"){
		
		var adapterPoll = new WumAdapter();
		adapterPoll.poll(this.jobId,this.fileName,false,$.cookie('bioinfo_sid'));
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
		
	}else{
		var url = this.adapter.tableurl(this.jobId,this.fileName,this.colNames,this.colVisibilty,$.cookie('bioinfo_sid'));
//		console.log(url);
		
		/*
		http://ws.bioinfo.cipf.es/wum/rest/job/86232/table?
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
		
		http://ws.bioinfo.cipf.es/wum-beta/rest/job/42/table?
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
		http://ws.bioinfo.cipf.es/wum-beta/rest/job/42/table?sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll&filename=significant_your_annotation_0.1.txt&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0&_dc=1326279241960&page=1&start=0&limit=5
		&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D
		&callback=Ext.data.JsonP.callback7
		http://ws.bioinfo.cipf.es/wum-beta/rest/job/42/table?sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll&filename=significant_your_annotation_0.1.txt&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0&_dc=1326279394677&page=1&start=0&limit=5
		&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D&callback=Ext.data.JsonP.callback2
		*
		*/
		if(rows==null){
			rows = this.numRows;
		}
		var itemsPerPage = rows; 
		
		this.st = Ext.create('Ext.data.Store', {
			fields: filteredColNames,
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
	
};function ManageProjectsWidget(args){
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
function CheckBrowser(appName){
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
		.html('Genome Maps provides the best user experience with Google Chrome and Apple Safari, otherwise some latencies may be experienced when browsing due to some problems in Firefox.')
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
}function WumAdapter(){
	
	this.adapter = new WumRestAdapter();
	
	this.onGetJobs = this.adapter.onGetJobs;
	this.onGetData = this.adapter.onGetData;
	this.onReadData = this.adapter.onReadData;
	this.onGetUserInfo = this.adapter.onGetUserInfo;
	
	this.onActiveProject = this.adapter.onActiveProject;
	this.onCreateProject = this.adapter.onCreateProject;
	this.onDeleteProject = this.adapter.onDeleteProject;
	this.onRenameProject = this.adapter.onRenameProject;
	this.onListProject = this.adapter.onListProject;
	
	this.onLogin = this.adapter.onLogin;
	this.onLoginError = this.adapter.onLoginError;
	
	this.onRegister = this.adapter.onRegister;
	this.onRegisterError = this.adapter.onRegisterError;

	this.onReset = this.adapter.onReset;
	this.onResetError = this.adapter.onResetError;
	
	this.onEditPassword = this.adapter.onEditPassword;
	this.onLogout = this.adapter.onLogout;
	this.onJobResult = this.adapter.onJobResult;
	this.onDownload = this.adapter.onDownload;
	this.onDeleteJob = this.adapter.onDeleteJob;
	this.onPoll = this.adapter.onPoll;
	this.onTable =this.adapter.onTable;
	this.onGrep =this.adapter.onGrep;
	
	this.onSuiteList = this.adapter.onSuiteList;
	
	this.onError = this.adapter.onError;
}

WumAdapter.prototype.getJobs = function (sessionId) {
	this.adapter.getJobs(sessionId);
};

WumAdapter.prototype.getData = function (sessionId,suiteId) {
	this.adapter.getData(sessionId,suiteId);
};

WumAdapter.prototype.readData = function (sessionId,fileId,filename) {
	this.adapter.readData(sessionId,fileId,filename);
};

WumAdapter.prototype.getUserInfo = function (sessionId) {
	this.adapter.getUserInfo(sessionId);
};

WumAdapter.prototype.activeProject = function (projectId, sessionId) {
	this.adapter.activeProject(projectId, sessionId);
};

WumAdapter.prototype.createProject = function(projectname, description, sessionId){
	this.adapter.createProject(projectname, description, sessionId);
};

WumAdapter.prototype.deleteProject = function (projectId, sessionId, suiteId) {
	this.adapter.deleteProject(projectId, sessionId, suiteId);
};

WumAdapter.prototype.renameProject = function(projectId, projectname, sessionId){
	this.adapter.renameProject(projectId, projectname, sessionId);
};

WumAdapter.prototype.listProject = function(sessionId,suiteId){
	this.adapter.listProject(sessionId,suiteId);
};

WumAdapter.prototype.login = function (email, password, suiteId) {
	this.adapter.login(email, password, suiteId);
};

WumAdapter.prototype.register = function (email, password, suiteId) {
	this.adapter.register(email, password, suiteId);
};

WumAdapter.prototype.reset = function (email) {
	this.adapter.reset(email);
};

WumAdapter.prototype.editPassword = function (oldPass,newPass,sessionId) {
	this.adapter.editPassword(oldPass,newPass,sessionId);
};

WumAdapter.prototype.logout = function (sessionId) {
	this.adapter.logout(sessionId);
};

WumAdapter.prototype.jobResult = function (jobId, format, sessionId) {
	this.adapter.jobResult(jobId, format, sessionId);
};

WumAdapter.prototype.download = function (jobId, sessionId) {
	this.adapter.download(jobId, sessionId);
};

WumAdapter.prototype.deleteJob = function (jobId, sessionId) {
	this.adapter.deleteJob(jobId, sessionId);
};

WumAdapter.prototype.poll = function (jobId, filename, zip, sessionId) {
	this.adapter.poll(jobId, filename, zip, sessionId);
};

WumAdapter.prototype.pollurl = function(jobId, filename, sessionId){
	return this.adapter.pollurl(jobId, filename, sessionId);
};


WumAdapter.prototype.table = function (jobId, filename, colNames, colVisibilty, sessionId){
	this.adapter.table(jobId, filename, colNames, colVisibilty, sessionId);
};
WumAdapter.prototype.tableurl = function (jobId, filename, colNames, colVisibilty, sessionId){
	return this.adapter.tableurl(jobId, filename, colNames, colVisibilty, sessionId);
};
WumAdapter.prototype.grep = function(jobId, filename, pattern, ignorecase, sessionId){
	return this.adapter.grep(jobId, filename, pattern, ignorecase, sessionId);
};


WumAdapter.prototype.getSuiteList = function () {
	this.adapter.getSuiteList();
};
/****/
//WumAdapter.prototype.getProxy = function(){
//	return this.adapter.getProxy();
//};
//WumAdapter.prototype.setProxy = function(proxyUrl){
//	return this.adapter.setProxy(proxyUrl);
//};
WumAdapter.prototype.getHost = function(){
	return this.adapter.getHost();
};
WumAdapter.prototype.setHost = function(hostUrl){
	 return this.adapter.setHost(hostUrl);
};function WumRestAdapter (){

	//This line never changes
	this.host = "http://ws.bioinfo.cipf.es/wum/rest";
	
	if(window.location.host.indexOf("fsalavert")!=-1 ||
	   window.location.host.indexOf("rsanchez")!=-1 ||
	   window.location.host.indexOf("imedina")!=-1 ||
	   window.location.href.indexOf("http://bioinfo.cipf.es/apps-beta")!=-1
	){
		this.host = "http://ws-beta.bioinfo.cipf.es/wum/rest";
//		this.host = "http://fsalavert:8080/wum/rest";
//		this.host = "http://rsanchez:8080/wum/rest";
//		this.host = "http://imedina:8080/wum/rest";
//		this.host = "http://gen29:8080/wum/rest";
	}
	
	var url = $.url();
	var prod = url.param('p');
	if(prod != null) {
		this.host = "http://ws.bioinfo.cipf.es/wum/rest";
	}

	WUMHOST = this.host;

	/** Events **/
	/**Data**/
	this.onGetData = new Event(this);
	this.onReadData = new Event(this);
	
	/**Job**/
	this.onGetJobs = new Event(this);
	this.onJobResult = new Event(this);
	this.onPoll = new Event(this);
	this.onDownload = new Event(this);
	this.onDeleteJob = new Event(this);
	this.onTable = new Event(this);
	this.onGrep = new Event(this);
	
	/**Project**/
	this.onActiveProject = new Event(this);
	this.onCreateProject = new Event(this);
	this.onDeleteProject = new Event(this);
	this.onRenameProject = new Event(this);
	this.onListProject = new Event(this);
	
	/**Suite**/
	this.onSuiteList = new Event(this);
	
	/**User**/
	this.onGetUserInfo = new Event(this);
	this.onLogin = new Event(this);
	this.onLoginError = new Event(this);
	this.onRegister = new Event(this);
	this.onRegisterError = new Event(this);
	this.onReset = new Event(this);
	this.onResetError = new Event(this);
	this.onEditPassword = new Event(this);
	this.onLogout = new Event(this);

	
	this.onError = new Event(this);
	
};
/**Data**/
WumRestAdapter.prototype.getData = function(sessionId,suiteId){
	var _this=this;
	var url = this.getHost()+'/data/list?sessionid='+sessionId+'&suiteid='+suiteId;
	
	function success(data){
		_this.onGetData.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
		console.log(data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
	
};
WumRestAdapter.prototype.readData = function(sessionId,fileId,filename){
	var _this=this;
	var url = this.getHost()+'/data/'+fileId+'/read?sessionid='+sessionId+'&filename='+filename;
	this.filename = filename;
	function success(data){
		_this.onReadData.notify({data:data,filename:_this.filename});
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
	
};


/**Job**/
WumRestAdapter.prototype.getJobs = function(sessionId){
	var _this=this;
	var url = this.getHost()+'/job/list?sessionid='+sessionId;
	
	function success(data){
		_this.onGetJobs.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
	
};

WumRestAdapter.prototype.jobResult = function(jobId, format, sessionId){
	var _this=this;	
	var url = this.getHost() + '/job/'+jobId+'/result.'+format+'?incvisites=true&sessionid='+sessionId;
	function success(data){
		_this.onJobResult.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.download = function(jobId, sessionId){
	var _this=this;
	var url = this.getHost() + '/job/'+jobId+'/download?sessionid='+sessionId;
	open(url);
//	console.log(url);
};

WumRestAdapter.prototype.deleteJob = function(jobId, sessionId){
	var _this=this;
	var url = this.getHost() + '/job/'+jobId+'/delete?sessionid='+sessionId;
	function success(data){
		_this.onDeleteJob.notify({response:data,jobId:jobId});
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.poll = function(jobId, filename, zip, sessionId){
	var _this=this;
	if(zip==true){
		var url = this.getHost() + '/job/'+jobId+'/poll?sessionid='+sessionId+'&filename='+filename;
		open(url);
	}else{
		var url = this.getHost() + '/job/'+jobId+'/poll?sessionid='+sessionId+'&filename='+filename+'&zip=false';
		function success(data){
			_this.onPoll.notify(data);
		}
	
		function error(data){
			console.log("ERROR: " + data);
		}
		
		this.doGet(url, success, error);
	}
//	console.log(url);
};
WumRestAdapter.prototype.pollurl = function(jobId, filename, sessionId){
	return this.getHost() + '/job/'+jobId+'/poll?sessionid='+sessionId+'&filename='+filename+'&zip=false';
};

WumRestAdapter.prototype.table = function(jobId, filename, colNames, colVisibilty, sessionId){
	var _this=this;
	var url = this.getHost()+'/job/'+jobId+'/table?sessionid='+sessionId+'&filename='+filename+'&colNames='+colNames+'&colVisibility='+colVisibilty;
		function success(data){
			_this.onTable.notify(data);
		}
	
		function error(data){
			console.log("ERROR: " + data);
		}
		
		this.doGet(url, success, error);
//	console.log(url);
};
WumRestAdapter.prototype.tableurl = function(jobId, filename, colNames, colVisibilty, sessionId){
	return this.getHost()+'/job/'+jobId+'/table?sessionid='+sessionId+'&filename='+filename+'&colNames='+colNames+'&colVisibility='+colVisibilty;
};

WumRestAdapter.prototype.grep = function(jobId, filename, pattern, ignorecase, sessionId){
	var _this=this;	
	var url = this.getHost() + '/job/'+jobId+'/grep?&filename='+filename+'&pattern='+pattern+'&ignorecase='+ignorecase+'&sessionid='+sessionId;
	function success(data){
		_this.onGrep.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};



/**Project**/
WumRestAdapter.prototype.activeProject = function(projectId, sessionId){
	var _this=this;
	var url = this.getHost()+'/project/'+projectId+'/active?sessionid='+sessionId;
	
	function success(data){
		_this.onActiveProject.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.createProject = function(projectname, description, sessionId){
	var _this=this;
	var url = this.getHost()+'/project/create?projectname='+projectname+'&description='+description+'&sessionid='+sessionId;
	
	function success(data){
		_this.onCreateProject.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.deleteProject = function(projectId, sessionId, suiteId){
	var _this=this;
	var url = this.getHost()+'/project/'+projectId+'/delete?sessionid='+sessionId+'&suiteid='+suiteId;
	
	function success(data){
		_this.onDeleteProject.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.renameProject = function(projectid, projectname, sessionId){
	var _this=this;
	var url = this.getHost()+'/project/'+projectid+'/rename?projectname='+projectname+'&sessionid='+sessionId;
	
	function success(data){
		_this.onRenameProject.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.listProject = function(sessionId,suiteId){
	var _this=this;
	var url = this.getHost()+'/project/list?sessionid='+sessionId+'&suiteid='+suiteId;
	
	function success(data){
		_this.onListProject.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

/**Suite**/
WumRestAdapter.prototype.getSuiteList = function(){
	var _this=this;	
	var url = this.getHost()+'/suite/list';
	function success(data){
		_this.onSuiteList.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

/**User**/
WumRestAdapter.prototype.getUserInfo = function(sessionId){
	var _this=this;
	var url = this.getHost()+'/user/info?sessionid='+sessionId;
//	console.log("/rest/user/info?sessionid= -> Envia todos los datos incluidos los jobs y el data, información repetida");
	function success(data){
		_this.onGetUserInfo.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.login = function(email, password, suiteId){
	var _this=this;
	var url = this.getHost()+'/user/login?email='+email+'&password='+password+'&suiteid='+suiteId;
	console.log(url);
	
	function success(data){
		_this.onLogin.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	this.doGet(url, success, error);
};

WumRestAdapter.prototype.register = function(email, password, suiteId){
	var _this = this;
	var url =  this.getHost()+'/user/register?email='+email+'&password='+password+'&suiteid='+suiteId;
	
	function success(data){
		_this.onRegister.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.reset = function(email){
	var _this=this;
	var url = this.getHost() + '/user/password/reset?email='+email;
	
	function success(data){
		_this.onReset.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.editPassword = function(oldPass,newPass,sessionId){
	var _this=this;
	var url = this.getHost() + '/user/password/change?sessionid='+sessionId+'&password='+oldPass+'&newpass='+newPass;
	function success(data){
		_this.onEditPassword.notify(data);
	}
	
	function error(data){
		console.log("ERROR: " + data);
	}
	
	this.doGet(url, success, error);
//	console.log(url);
};

WumRestAdapter.prototype.logout = function(sessionId){
	var _this=this;
	var url = this.getHost() + '/user/logout?sessionid='+sessionId;
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
};



/***************************************************************************************/

WumRestAdapter.prototype.doGet = function (url, successCallback, errorCallback, enctype){
	if(!enctype) enctype = "application/x-www-form-urlencoded";
	$.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		cache: false,	
		success: successCallback,
		error: errorCallback,
		contentType: enctype
	});
};

WumRestAdapter.prototype.getHost = function(){
	return this.host;
};

WumRestAdapter.prototype.setHost = function(hostUrl){
	 this.host = hostUrl;
};
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
	
	this.browserData = new BrowserDataWidget();
	/** Events i listen **/
	this.browserData.onSelect.addEventListener(function (sender, data){
		_this.trackNameField.setValue(data.filename);
		_this.fileNameLabel.setText('<span class="emph">'+ data.filename +'</span> <span class="info">(server)</span>',false);
		_this.panel.setLoading();
	});	
    this.browserData.adapter.onReadData.addEventListener(function (sender, data){
    	console.log(data)
    	_this.trackNameField.setValue(data.filename);
    	_this.fileNameLabel.setText('<span class="emph">'+ data.filename +'</span> <span class="info">(server)</span>',false);
    	_this.loadFileFromServer(data);
    	_this.panel.setLoading(false);
	});	
    
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
//		flex:1,
		width:75,
		emptyText: 'Choose a local file',
        allowBlank: false,
		buttonText : 'Browse local',
		buttonOnly : true,
		listeners : {
			change : {
				fn : function() {
					_this.panel.setLoading();
					var file = document.getElementById(_this.uploadField.fileInputEl.id).files[0];
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
			this.btnBrowse = Ext.create('Ext.button.Button', {
		        text: 'Browse server',
		        disabled:true,
//		        iconCls:'icon-local',
//		        cls:'x-btn-default-small',
		        handler: function (){
	    	   		_this.browserData.draw($.cookie('bioinfo_sid'),_this.tags);
	       		}
			});
			
			browseBar.add(this.btnBrowse);
			
			if($.cookie('bioinfo_sid') != null){
				this.sessionInitiated();
			}else{
				this.sessionFinished();
			}
		}
		
		this.fileNameLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="emph">Select a <span class="info">local</span> file or a <span class="info">server</span> file from your account.</span>'
		});
		browseBar.add(['->',this.fileNameLabel]);
		
		
		
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
			items : [browseBar, this.panel, panelSettings],
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
	if(this.btnBrowse!=null){
		this.btnBrowse.enable();
	}
};
FileWidget.prototype.sessionFinished = function (){
	if(this.btnBrowse!=null){
		this.btnBrowse.disable();
	}
};function LegendWidget(args){
	
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
	
	
};function LegendPanel(args){
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
		
		//Remove "_" and UpperCase first letter
		var name = item.replace(/_/gi, " ");
		name = name.charAt(0).toUpperCase() + name.slice(1);
		
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
					items: [this.getPanel(legend)]
				}
		});
	}	
	return this.button;
	
};function UrlWidget(args){
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
};GV_CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";

GENE_BIOTYPE_COLORS = {
		//TODO buscar los colores en ensembl!
		"3prime_overlapping_ncrna":"Orange",
		"ambiguous_orf":"SlateBlue",
		"antisense":"SteelBlue",
		"disrupted_domain":"YellowGreen",
		"IG_C_gene":"#FF7F50",
		"IG_D_gene":"#FF7F50",
		"IG_J_gene":"#FF7F50",
		"IG_V_gene":"#FF7F50",
		"lincRNA":"#8b668b",
		"miRNA":"#8b668b",//TODO falta
		"misc_RNA":"#8b668b",
		"Mt_rRNA":"#8b668b",
		"Mt_tRNA":"#8b668b",
		"ncrna_host":"Fuchsia",
		"nonsense_mediated_decay":"Chartreuse",
		"non_coding":"orangered",
		"non_stop_decay":"aqua",
		"polymorphic_pseudogene":"#666666",
		"processed_pseudogene":"#666666",
		"processed_transcript":"#0000ff",
		"protein_coding":"#a00000",
		"pseudogene":"#666666",
		"retained_intron":"gold",
		"retrotransposed":"lightsalmon",
		"rRNA":"LawnGreen",
		"sense_intronic":"#20B2AA",
		"sense_overlapping":"#20B2AA",  
		"snoRNA":"#8b668b",//TODO falta
		"snRNA":"#8b668b",
		"transcribed_processed_pseudogene":"#666666",
		"transcribed_unprocessed_pseudogene":"#666666",
		"unitary_pseudogene":"#666666",
		"unprocessed_pseudogene":"#666666",
		"":"orangered",
		"other":"#000000"
};



SNP_BIOTYPE_COLORS = {
	"2KB_upstream_variant":"#a2b5cd",				//TODO done Upstream
	"5KB_upstream_variant":"#a2b5cd",				//TODO done Upstream
	"500B_downstream_variant":"#a2b5cd",			//TODO done Downstream
	"5KB_downstream_variant":"#a2b5cd",			//TODO done Downstream
	"3_prime_UTR_variant":"#7ac5cd",				//TODO done 3 prime UTR
	"5_prime_UTR_variant":"#7ac5cd",				//TODO done 5 prime UTR
	"coding_sequence_variant":"#458b00",			//TODO done Coding unknown
	"complex_change_in_transcript":"#00fa9a",		//TODO done Complex in/del
	"frameshift_variant":"#ff69b4",				//TODO done Frameshift coding
	"incomplete_terminal_codon_variant":"#ff00ff",	//TODO done Partial codon
	"inframe_codon_gain":"#ffd700",				//TODO done Non-synonymous coding
	"inframe_codon_loss":"#ffd700",				//TODO done Non-synonymous coding
	"initiator_codon_change":"#ffd700",			//TODO done Non-synonymous coding
	"non_synonymous_codon":"#ffd700",				//TODO done Non-synonymous coding
	"intergenic_variant":"#636363",				//TODO done Intergenic
	"intron_variant":"#02599c",					//TODO done Intronic
	"mature_miRNA_variant":"#458b00",				//TODO done Within mature miRNA
	"nc_transcript_variant":"#32cd32",				//TODO done Within non-coding gene
	"splice_acceptor_variant":"#ff7f50",			//TODO done Essential splice site
	"splice_donor_variant":"#ff7f50",				//TODO done Essential splice site
	"splice_region_variant":"#ff7f50",				//TODO done Splice site
	"stop_gained":"#ff0000",						//TODO done Stop gained
	"stop_lost":"#ff0000",							//TODO done Stop lost
	"stop_retained_variant":"#76ee00",				//TODO done Synonymous coding
	"synonymous_codon":"#76ee00",					//TODO done Synonymous coding
	"other":"#000000"
};


SEQUENCE_COLORS = {A:"#009900", C:"#0000FF", G:"#857A00", T:"#aa0000", N:"#555555"}

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
//		infoWidgetId: "stableId",
		height:10
//		histogramColor:"lightblue"
	},
	gene:{
		getLabel: function(f){
			var str = "";
			str+= (f.strand < 0) ? "<" : "";
			str+= " "+f.externalName+" ";
			str+= (f.strand > 0) ? ">" : "";
			str+= " ["+f.biotype+"]";
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType) +
			' - <span class="ok">'+f.externalName+'</span>';
		},
		getTipText: function(f){
			var color = GENE_BIOTYPE_COLORS[f.biotype];
			return	'Ensembl&nbsp;ID:&nbsp;<span class="ssel">'+f.stableId+'</span><br>'+
			'biotype:&nbsp;<span class="emph" style="color:'+color+';">'+f.biotype+'</span><br>'+
			'description:&nbsp;<span class="emph">'+f.description+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return GENE_BIOTYPE_COLORS[f.biotype];
		},
		infoWidgetId: "stableId",
		height:4,
		histogramColor:"lightblue"
	},
	geneorange:{
		getLabel: function(f){
			var str = "";
			str+= (f.strand < 0) ? "<" : "";
			str+= " "+f.externalName+" ";
			str+= (f.strand > 0) ? ">" : "";
			str+= " ["+f.biotype+"]";
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType) +
			' - <span class="ok">'+f.externalName+'</span>';
		},
		getTipText: function(f){
			var color = GENE_BIOTYPE_COLORS[f.biotype];
			return	'Ensembl&nbsp;ID:&nbsp;<span class="ssel">'+f.stableId+'</span><br>'+
			'biotype:&nbsp;<span class="emph" style="color:'+color+';">'+f.biotype+'</span><br>'+
			'description:&nbsp;<span class="emph">'+f.description+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
		},
		getColor: function(f){
			return GENE_BIOTYPE_COLORS[f.biotype];
		},
		infoWidgetId: "stableId",
		height:4,
		histogramColor:"lightblue"
	},
	transcript:{
		getLabel: function(f){
			var str = "";
			str+= (f.strand < 0) ? "<" : "";
			str+= " "+f.externalName+" ";
			str+= (f.strand > 0) ? ">" : "";
			str+= " ["+f.biotype+"]";
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.featureType) +
			' - <span class="ok">'+f.externalName+'</span>';
		},
		getTipText: function(f){
			var color = GENE_BIOTYPE_COLORS[f.biotype];
			return	'Ensembl&nbsp;ID:&nbsp;<span class="ssel">'+f.stableId+'</span><br>'+
			'biotype:&nbsp;<span class="emph" style="color:'+color+';">'+f.biotype+'</span><br>'+
			'description:&nbsp;<span class="emph">'+f.description+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return GENE_BIOTYPE_COLORS[f.biotype];
		},
		infoWidgetId: "stableId",
		height:4,
		histogramColor:"lightblue"
	},
	exon:{//not yet
		getLabel: function(f){
			var str = "";
			str+= f.stableId;
			return str;
		},
		getTipTitle: function(f){
			return FEATURE_TYPES.formatTitle(f.exon.featureType)+' - <span class="ok">'+f.exon.stableId+'</span>';
		},
		getTipText: function(e2t,t){
			var color = GENE_BIOTYPE_COLORS[t.biotype];
			return	'transcript name:&nbsp;<span class="ssel">'+t.externalName+'</span><br>'+
			'transcript Ensembl&nbsp;ID:&nbsp;<span class="ssel">'+t.stableId+'</span><br>'+
			'transcript biotype:&nbsp;<span class="emph" style="color:'+color+';">'+t.biotype+'</span><br>'+
			'transcript description:&nbsp;<span class="emph">'+t.description+'</span><br>'+
			'transcript start-end:&nbsp;<span class="emph">'+t.start+'-'+t.end+'</span><br>'+
			'exon start-end:&nbsp;<span class="emph">'+e2t.exon.start+'-'+e2t.exon.end+'</span><br>'+
			'strand:&nbsp;<span class="emph">'+t.strand+'</span><br>'+
			'length:&nbsp;<span class="info">'+(e2t.exon.end-e2t.exon.start+1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</span><br>';
		},
		getColor: function(f){
			return "black";
		},
		infoWidgetId: "stableId",
		height:4,
		histogramColor:"lightblue"
	},
	snp:{
		getLabel: function(f){
			return f.name;
		},
		getTipTitle: function(f){
			return f.featureType.toUpperCase() +
			' - <span class="ok">'+f.name+'</span>';
		},
		getTipText: function(f){
			var color = SNP_BIOTYPE_COLORS[f.displaySoConsequence];
			return 'alleles:&nbsp;<span class="ssel">'+f.alleleString+'</span><br>'+
			'ancestral allele:&nbsp;<span class="ssel">'+f.ancestralAllele+'</span><br>'+
			'SO consequence:&nbsp;<span class="emph" style="color:'+color+';">'+f.displaySoConsequence+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f)+
			'source:&nbsp;<span class="ssel">'+f.source+'</span><br>';
			
		},
		getColor: function(f){
			return SNP_BIOTYPE_COLORS[f.displaySoConsequence];
		},
		infoWidgetId: "name",
		height:10,
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
		infoWidgetId: "name",
		height:10,
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
			return f.tfName;
		},
		getTipTitle: function(f){
			return 'TFBS - <span class="ok">'+f.tfName+'</span>';
		},
		getTipText: function(f){
			return 'TF name:&nbsp;<span class="ssel">'+f.tfName+'</span><br>'+
			'relative start:&nbsp;<span class="ssel">'+f.relativeStart+'</span><br>'+
			'relative end:&nbsp;<span class="ssel">'+f.relativeEnd+'</span><br>'+
			'target gene name:&nbsp;<span class="ssel">'+f.targetGeneName+'</span><br>'+
			'score:&nbsp;<span class="ssel">'+f.score+'</span><br>'+
			'sequence:&nbsp;<span class="ssel">'+f.sequence+'</span><br>'+
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
			return f.mirbaseId;
		},
		getTipTitle: function(f){
			return 'miRNA target - <span class="ok">'+f.mirbaseId+'</span>';
		},
		getTipText: function(f){
			return 'gene target name:&nbsp;<span class="ssel">'+f.geneTargetName+'</span><br>'+
			'experimental method:&nbsp;<span class="ssel">'+f.experimentalMethod+'</span><br>'+
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
		height:10,
		histogramColor:"orange"
	},
	vcf:{
		getLabel: function(f){
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
			return 'alleles (ref/alt):&nbsp;<span class="emph">'+f.ref+"/"+f.alt+'</span><br>'+
			'quality:&nbsp;<span class="emph">'+f.quality+'</span><br>'+
			'filter:&nbsp;<span class="emph">'+f.filter+'</span><br>'+
			FEATURE_TYPES.getTipCommons(f);
		},
		getColor: function(f){
			return "black";
		},
		infoWidgetId: "id",
		height:10,
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
		height:10,
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
		height:10,
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
		height:10,
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
		height:10,
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
				FEATURE_TYPES.getTipCommons(f)+'<br>'+
				FEATURE_TYPES.bam.explainFlags(f.flags);
			
			var three = '<div style="background:#FFEF93;font-weight:bold;">attributes</div>';
			delete f.attributes["BQ"];//for now because is too long
			for (var key in f.attributes) {
				three += key+":"+f.attributes[key]+"<br>";
			}
			var style = "background:#FFEF93;font-weight:bold;";
			return '<div style="float:left">'+one+'</div>'+
					'<div style="float:right">'+three+'</div>';
		},
		getColor: function(f){
			return (parseInt(f.flags)&16) == 0 ? "DarkGray" : "LightGray";
		},
		getStrand: function(f){
			return (parseInt(f.flags)&16) == 0 ? "Forward" : "Reverse";
		},
		height:10,
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
		height:10,
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
};function GenomeViewer(targetId, species, args) {
	var _this=this;
	this.id = "GenomeViewer"+ Math.round(Math.random()*10000);
	this.menuBar = null;
	
	// if not provided on instatiation
	this.width =  $(document).width();
	this.height = $(document).height();
	this.targetId=null;
	
	//Default values
	this.species="hsa";
	this.speciesName="Homo sapiens";
	this.increment = 5;
	this.zoom=100;
	
	//Setting paramaters
	if (targetId != null){
		this.targetId=targetId;
	}
	if (species != null) {
		this.species = species.species;
		this.speciesName = species.name;
		this.chromosome = species.chromosome;//this is a string
		this.position = parseInt(species.position);
	}
	if (args != null){
		if(args.toolbar != null){
			this.toolbar = args.toolbar;
		}
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.availableSpecies != null) {
			this.setSpeciesMenu(args.availableSpecies);
		}
		if (args.chromosome != null) {
			this.chromosome = args.chromosome;
		}
		if (args.position != null) {//middle browser window
			this.position = parseInt(args.position);
		}
		if (args.zoom != null) {
			this.zoom = args.zoom;
		}
	}

	//Events i send
	this.onSpeciesChange = new Event();
	this.onLocationChange = new Event();
	this.afterLocationChange = new Event();
	this.afterRender = new Event();
	
	//Events i listen
	this.onLocationChange.addEventListener(function(sender,data){
		_this.setLoc(data);
	});

	
	//Events i propagate
	this.onSvgRemoveTrack = null;//assigned later, the component must exist
	
//	this.geneBioTypeColors = this.getGeneBioTypeColors();
//	this.snpBioTypeColors = this.getSnpBioTypeColors();
	
	// useful logs
	console.log(this.width+"x"+this.height);
	console.log(this.targetId);
	console.log(this.id);
	
};

GenomeViewer.prototype.draw = function(){
	//interface
	this.render();
//	this.getData();
};
GenomeViewer.prototype.render = function(){
	var _this = this;
	var container = Ext.create('Ext.container.Container', {
		id:this.id+"container",
		renderTo:this.targetId,
    	width:this.width,
    	height:this.height,
		cls:'x-unselectable',
		layout: { type: 'vbox',align: 'stretch'},
		region : 'center',
		margins : '0 0 0 0'
	});
	
	if(this.toolbar!=null){
		container.insert(0, this.toolbar);
	}
	//The last item is regionPanel
	//when all items are inserted afterRender is notified, tracks can be added now
	var tracksPanel = this._drawTracksPanel();
	var regionPanel = this._drawRegionPanel();
	var regionAndTrackRendered = 0;
	
	var createSvgLayout = function (){
		var div = $('#'+_this.id+"tracksSvg")[0];
		_this.trackSvgLayout = new TrackSvgLayout(div,{
			width:_this.width-18,
			position:_this.position,
			chromosome:_this.chromosome,
			zoom : _this.zoom
		});
		_this.trackSvgLayout.onMove.addEventListener(function(sender,data){
			_this.onLocationChange.notify({position:data,sender:"trackSvgLayout"});
		});
		_this.trackSvgLayout.onMousePosition.addEventListener(function(sender,data){
			var formatedMousePos = data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			Ext.getCmp(_this.id+"mouseLabel").setText('<span class="ssel">Position: '+formatedMousePos+'</span>');
			$('#'+_this.id+"mouseLabel").qtip({content:'Mouse position',style:{width:95},position: {my:"bottom center",at:"top center"}});
		});
		Ext.getCmp(_this.id+"windowSize").setText('<span class="emph">'+_this.trackSvgLayout.windowSize+'</span>');
		_this.trackSvgLayout.onWindowSize.addEventListener(function(sender,data){
			Ext.getCmp(_this.id+"windowSize").setText('<span class="emph">'+data.windowSize+'</span>');
		});
		_this.trackSvgLayout.onTracksRendered.addEventListener(function(sender,data){
//			Ext.getCmp(_this.id+'container').setLoading(false);
		});
		//propagate event
		_this.onSvgRemoveTrack = _this.trackSvgLayout.onSvgRemoveTrack;
		
		var div = $('#'+_this.id+"regionSvg")[0];
		_this.trackSvgLayout2 = new TrackSvgLayout(div,{
			width:_this.width-18,
			position:_this.position,
			chromosome:_this.chromosome,
			zoom : _this.zoom,
			zoomOffset:40,
			parentLayout:_this.trackSvgLayout
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
	
	container.insert(1, this._getNavigationBar());
	container.insert(2, this._drawKaryotypePanel().hide());
	container.insert(3, this._drawChromosomePanel());
	container.insert(4, tracksPanel);
	container.insert(5, this._getBottomBar());
	container.insert(4, regionPanel);//rendered after trackspanel but inserted with minor index
	
	Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.chromosome);
	Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.chromosome);
	Ext.getCmp(this.id+'tbCoordinate').setValue( this.chromosome + ":" + Math.ceil(this.position));
};
GenomeViewer.prototype.setMenuBar = function(toolbar) {
	this.toolbar = toolbar;
};

GenomeViewer.prototype.setSize = function(width,height) {
//	Ext.getCmp(this.id+'container').setLoading();
	this.trackSvgLayout.setWidth(width-18);
	this.trackSvgLayout2.setWidth(width-18);
	this.chromosomeWidget.setWidth(width);
	this.karyotypeWidget.setWidth(width);
	Ext.getCmp(this.id+"container").setSize(width,height);
	
//	$("#"+this.id+'tracksSvg')[0].setAttribute('width',width);
//	$("#"+this.id+'regionSvg')[0].setAttribute('width',width);
};

GenomeViewer.prototype.setLoc = function(data) {
//	Ext.getCmp(this.id+'container').setLoading();
	console.log("GV SetLoc sender: "+data.position);
//	this.chromosomeFeatureTrack.select(data.position-1000, data.position+1000);

	switch(data.sender){
	case "setSpecies": 
		this.species = data.species;
		this.speciesName = data.name;
		this.position = data.position;
		this.chromosome = data.chromosome;
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.chromosome);
		Ext.getCmp(this.id+'tbCoordinate').setValue( this.chromosome + ":" + Math.ceil(this.position));
		Ext.getCmp(this.id+"speciesMenuButton").setText(this.speciesName);
		Ext.example.msg('Species', this.speciesName+' selected.');
		this._updateChrStore();
		this.trackSvgLayout.setLocation({chromosome:this.chromosome,species:this.species,position:this.position});
		this.trackSvgLayout2.setLocation({chromosome:this.chromosome,species:this.species,position:this.position});
		this.chromosomeWidget.setLocation({chromosome:this.chromosome,species:this.species,position:this.position});
		this.karyotypeWidget.setLocation({chromosome:this.chromosome,species:this.species,position:this.position});
		this.onSpeciesChange.notify();
		break;
	case "_getChromosomeMenu":
		if(this.chromosome!=data.chromosome){
			this.chromosome = data.chromosome;
			this.trackSvgLayout.setLocation({chromosome:this.chromosome});
			this.trackSvgLayout2.setLocation({chromosome:this.chromosome});
			this.chromosomeWidget.setLocation({chromosome:this.chromosome});
			this.karyotypeWidget.setLocation({chromosome:this.chromosome,position:this.position});
		}
		Ext.getCmp(this.id+'tbCoordinate').setValue( this.chromosome + ":" + Math.ceil(this.position));
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.chromosome);
		break;
	case "GoButton":
		var obj = {};
		if(data.position != null && this.position != data.position){
			this.position = data.position;
			obj.position = this.position;
		}
		if(data.chromosome != null && this.chromosome != data.chromosome){
			this.chromosome = data.chromosome;
			obj.chromosome = this.chromosome;
			Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.chromosome);
			Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.chromosome);
		}
		if(Object.keys(obj).length>0){ //if obj has change
			this.trackSvgLayout.setLocation(obj);
			this.trackSvgLayout2.setLocation(obj);
			this.chromosomeWidget.setLocation(obj);
			this.karyotypeWidget.setLocation(obj);
		}
		break;
	case "KaryotypePanel":
		var obj = {};
		if(data.position != null && this.position != data.position){
			this.position = data.position;
			obj.position = this.position;
		}
		if(data.chromosome != null && this.chromosome != data.chromosome){
			this.chromosome = data.chromosome;
			obj.chromosome = this.chromosome;
			Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.chromosome);
			Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.chromosome);
		}
		if(Object.keys(obj).length>0){ //if obj has changeç
			this.trackSvgLayout.setLocation(obj);
			this.trackSvgLayout2.setLocation(obj);
			this.chromosomeWidget.setLocation(obj);
			
			Ext.getCmp(this.id+'tbCoordinate').setValue(this.chromosome + ":" + Math.ceil(this.position));
			this.karyotypeWidget.updatePositionBox({chromosome:this.chromosome,position:this.position});
		}
		break;
	case "ChromosomeWidget":
		this.position = data.position;
		this.trackSvgLayout.setLocation({position:this.position});
		this.trackSvgLayout2.setLocation({position:this.position});
		this.karyotypeWidget.setLocation({position:this.position});
		Ext.getCmp(this.id+'tbCoordinate').setValue(this.chromosome + ":" + Math.ceil(this.position));
		break;
	case "trackSvgLayout":
		this.position -= data.position;
		Ext.getCmp(this.id+'tbCoordinate').setValue( this.chromosome + ":" + Math.ceil(this.position));
		this.chromosomeWidget.setLocation({position:this.position});
		this.karyotypeWidget.setLocation({position:this.position});
		break;
	default:
		var obj = {};
		if(data.species != null){
			this.species = data.species;
			obj.species = this.species;
			Ext.example.msg('Species', this.speciesName+' selected.');
			this.onSpeciesChange.notify();
		}
		if(data.name != null){
			this.speciesName = data.name;
			obj.speciesName = this.speciesName;
		}
		if(data.position != null){
			this.position = data.position;
			obj.position = this.position;
		}
		if(data.chromosome != null){
			this.chromosome = data.chromosome;
			obj.chromosome = this.chromosome;
		}
		Ext.getCmp(this.id+"chromosomeMenuButton").setText("Chromosome "+this.chromosome);
		Ext.getCmp(this.id+"chromosomePanel").setTitle("Chromosome "+this.chromosome);
		Ext.getCmp(this.id+'tbCoordinate').setValue( this.chromosome + ":" + Math.ceil(this.position));
		Ext.getCmp(this.id+"speciesMenuButton").setText(this.speciesName);
		this._updateChrStore();
		this.trackSvgLayout.setLocation(obj);
		this.trackSvgLayout2.setLocation(obj);
		this.chromosomeWidget.setLocation(obj);
		this.karyotypeWidget.setLocation(obj);
		
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
		emptyText:'Quick search: gene, snp',
		hideTrigger: true,
		width:170,
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
		        	 pressed:true,
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
		        	 margin : '0 0 0 10',
		        	 iconCls:'icon-zoom-out',
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
		        	 width : 120,
		        	 text : this.chromosome + ":" + this.position,
		        	 listeners:{
		        		 specialkey: function(field, e){
		        			 if (e.getKey() == e.ENTER) {
		        				 _this._handleNavigationBar('Go');
		        			 }
		        		 }
		        	 }
		         },{
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
			items : []
		});
	}
	return this._specieMenu;
};
//Sets the species buttons in the menu
GenomeViewer.prototype.setSpeciesMenu = function(speciesObj) {
	var _this = this;
	//Auto generate menu items depending of AVAILABLE_SPECIES config
	var menu = this._getSpeciesMenu();
	menu.hide();//Hide the menu panel before remove
	menu.removeAll(); // Remove the old species
	for ( var i = 0; i < speciesObj.length; i++) {
		menu.add({	
					id:this.id+speciesObj[i].name,
					text:speciesObj[i].name,
					speciesObj:speciesObj[i],
					handler:function(este){
						//can't use the i from the FOR so i create the object again
						_this.setSpecies(este.speciesObj);
				}
		});
	};
};
//Sets the new specie and fires an event
GenomeViewer.prototype.setSpecies = function(data){
	data["sender"]="setSpecies";
	this.onLocationChange.notify(data);
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
 						_this.onLocationChange.notify({sender:"_getChromosomeMenu",chromosome:selNodes[0].data.name});
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
		items : [chrView]
	});
 	this._updateChrStore();
	return chromosomeMenu;
};

GenomeViewer.prototype._updateChrStore = function(){
	var _this = this;
	var chrStore = Ext.getStore(this.id+"chrStore");
	var chrView = Ext.getCmp(this.id+"chrView");
	var cellBaseManager = new CellBaseManager(this.species);
 	cellBaseManager.get("feature", "karyotype", "none", "chromosome");
 	cellBaseManager.success.addEventListener(function(sender,data){
 		var chromosomeData = [];
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
		}
		chrStore.loadData(chromosomeData);
//		chrView.getSelectionModel().select(chrStore.find("name",_this.chromosome));
 	});
};

GenomeViewer.prototype._getZoomSlider = function() {
	var _this = this;
	if(this._zoomSlider==null){
		this._zoomSlider = Ext.create('Ext.slider.Single', {
			id : this.id+'zoomSlider',
			width : 200,
			minValue : 0,
			maxValue : 100,
			value : this.zoom,
			useTips : true,
			increment : this.increment,
			tipText : function(thumb) {
				return Ext.String.format('<b>{0}%</b>', thumb.value);
			}
		});
		
		this._zoomSlider.on({
			'change': {
				fn: function(slider, newValue) {
				 _this._handleNavigationBar("ZOOM", newValue);
   			 },
   			 buffer : 500
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
	var _this = this;
//	Ext.getCmp(this.id+'container').setLoading();
	this.zoom = zoom;
	this._getZoomSlider().setValue(zoom);
	if(this.trackSvgLayout!=null){
		this.trackSvgLayout.setZoom(zoom);
		this.trackSvgLayout2.setZoom(zoom);
	}
	this.chromosomeWidget.setZoom(zoom);
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
        var position = parseInt(value.split(":")[1]);
        var chromosome = value.split(":")[0];
        
        // Validate chromosome and position
        if(isNaN(position) || position < 0){
        	Ext.getCmp(this.id+'tbCoordinate').markInvalid("Position must be a positive number");
        }
        else if(Ext.getCmp(this.id+"chromosomeMenu").almacen.find("name", chromosome) == -1){
        	Ext.getCmp(this.id+'tbCoordinate').markInvalid("Invalid chromosome");
        }
        else{
        	this.onLocationChange.notify({chromosome:chromosome,position:position,sender:"GoButton"});
        }
        
    }
};


GenomeViewer.prototype._drawKaryotypePanel = function() {
	var _this = this;
	var panel =  Ext.create('Ext.panel.Panel', {
		id:this.id+"karyotypePanel",
		height : 200,
		title:'Karyotype',
		border:false,
		margin:'0 0 1 0',
		cls:'border-bot panel-border-top',
		html: '<div id="'+this.id+'karyotypeSvg" style="margin-top:2px"></div>',
		listeners:{
			afterrender:function(){
				var div = $('#'+_this.id+"karyotypeSvg")[0];
				_this.karyotypeWidget = new KaryotypeWidget(div,{
					width:_this.width,
					height:168,
					species:_this.species,
					chromosome:_this.chromosome,
					zoom:_this.zoom,
					position:_this.position
				});
				_this.karyotypeWidget.onClick.addEventListener(function(sender,data){
					_this.onLocationChange.notify({position:data.position,chromosome:data.chromosome,sender:"KaryotypePanel"});
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
		border:false,
		margin:'0 0 1 0',
		cls:'border-bot panel-border-top',
		html: '<div id="'+this.id+'chromosomeSvg" style="margin-top:2px"></div>',
		listeners:{
			afterrender:function(){
				var div = $('#'+_this.id+"chromosomeSvg")[0];
				_this.chromosomeWidget = new ChromosomeWidget(div,{
					width:_this.width,
					height:65,
					species:_this.species,
					chromosome:_this.chromosome,
					zoom:_this.zoom,
					position:_this.position
				});
				_this.chromosomeWidget.onClick.addEventListener(function(sender,data){
					_this.onLocationChange.notify({position:data,sender:"ChromosomeWidget"});
				});
				_this.chromosomeWidget.drawChromosome();
			}
		}
	});
	return panel;
};


GenomeViewer.prototype._drawRegionPanel = function() {
	var _this=this;
	var panel =  Ext.create('Ext.panel.Panel', {
		id:this.id+"regionPanel",
		height : 150,
		title:'Region overview',
		border:false,
		autoScroll:true,
		margin:'0 0 1 0',
		cls:'border-bot panel-border-top x-unselectable',
		html: '<div id="'+this.id+'regionSvg" style="margin-top:2px"></div>'
	});
	return panel;
};

GenomeViewer.prototype._drawTracksPanel = function() {
	var _this=this;
	var panel = Ext.create('Ext.panel.Panel', {
		id:this.id+"tracksPanel",
		title:'Detailed information',
		autoScroll:true,
		cls:"x-unselectable",
		flex: 1,
		html:'<div id = "'+this.id+'tracksSvg"></div>'
	});
	return panel;
};

GenomeViewer.prototype.addTrack = function(trackData, args) {
	this.trackSvgLayout.addTrack(trackData, args);
};

GenomeViewer.prototype.removeTrack = function(trackId) {
	return this.trackSvgLayout.removeTrack(trackId);
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
		width:600,
		height:28,
		items : [/*scaleLabel, */
		         '-',mouseLabel,windowSize,
		         geneLegendPanel.getButton(GENE_BIOTYPE_COLORS),
		         snpLegendPanel.getButton(SNP_BIOTYPE_COLORS),
		         '->',versionLabel]
	});
	
	var bottomBar = Ext.create('Ext.container.Container', {
		id:this.id+'bottomBar',
		layout:'hbox',
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
						_this.setLoc({sender:"",chromosome:feature.chromosome, position:feature.start});
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
				_this.setLoc({sender:"",chromosome:feature.chromosome, position:feature.start});
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
//	this.openListWidget({
//		category:"feature",
//		subcategory:"transcript",
//		query:name.toString(),
//		resource:"info",
//		title:"Transcript List",
//		gridField:["externalName","stableId", "biotype", "chromosome", "start", "end", "strand", "description"]
//	});
};

GenomeViewer.prototype.openExonListWidget = function(name) {
//	this.openListWidget({
//		category:"feature",
//		subcategory:"exon",
//		query:name.toString(),
//		resource:"info",
//		title:"Exon List",
//		gridField:["stableId", "chromosome","start", "end", "strand"]
//	});
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
function TrackSvg(parent, args) {
	this.args = args;
//	this.id = Math.round(Math.random()*10000000); // internal id for this class
	this.parent = parent;
	
	this.y = 25;
	this.height = 50;
	this.width = 200;
	this.title = "track";
//	this.type = "generic";
	this.renderedArea = {};
	
	this.lienzo=7000000;//mesa
	this.pixelPosition=this.lienzo/2;
	
	this.histogramZoom = -1000;//no histogram by default
	
	this.titleVisibility = 'visible';	
	
	this.closable = true;
	this.types = FEATURE_TYPES;
	
	
	this.labelZoom = -1;
	
	if (args != null){
		if(args.title != null){
			this.title = args.title;
		}
		if(args.id != null){
			this.id = args.id;
		}
		if(args.trackSvgLayout != null){
			this.trackSvgLayout = args.trackSvgLayout;
		}
		if(args.trackData != null){
			this.trackData = args.trackData;
		}
		if(args.clase != null){
			this.clase = args.clase;
		}
		if(args.width != null){
			this.width = args.width;
		}
		if(args.height != null){
			this.height = args.height;
		}
		if(args.position != null){
			this.position = args.position;
		}
		if(args.zoom != null){
			this.zoom = args.zoom;
		}
		if(args.pixelBase != null){
			this.pixelBase = args.pixelBase;
		}
//		if(args.type != null){
//			this.type = args.type;
//		}
		if(args.closable != null){
			this.closable = args.closable;
		}
		if(args.labelZoom != null){
			this.labelZoom = args.labelZoom;
		}
		if(args.histogramZoom != null){
			this.histogramZoom = args.histogramZoom;
		}
		if(args.transcriptZoom != null){//gene only
			this.transcriptZoom = args.transcriptZoom;
		}
		if(args.featureTypes != null){
			this.featureTypes = args.featureTypes;
		}
		if(args.titleVisibility != null){
			this.titleVisibility = args.titleVisibility;
		}
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
	
	//flags
	this.rendered = false;//svg structure already draw, svg elements can be used from now
	
	
	this.interval=null;
	this.histogram=null;
	this.transcript=null;
};

TrackSvg.prototype.setY = function(value){
	this.y = value;
};
TrackSvg.prototype.getHeight = function(){
	return this.height;
};
TrackSvg.prototype.setHeight = function(height){
	this.height=height;
	if(this.rendered){
		this.main.setAttribute("height",height);
		this.features.setAttribute("height",height);
	}
};

TrackSvg.prototype.setWidth = function(width){
	this.width=width;
	if(this.rendered){
		this.main.setAttribute("width",width);
	}
};

TrackSvg.prototype.setLoading = function(bool){
	if(bool){
		this.loading.setAttribute("visibility", "visible");
	}else{
		this.loading.setAttribute("visibility", "hidden");
	}
	
};


TrackSvg.prototype.draw = function(){
	var _this = this;
	
//	var loadingDiv =  document.createElement("div");
//	$(loadingDiv).css("width",this.width);
//	$(loadingDiv).css("height",this.height);
//	$(loadingDiv).css("left","0");
//	$(loadingDiv).css("top",this.y);
////	$(loadingDiv).css("display","block");
//	$(loadingDiv).css("background","gray");
//	$(loadingDiv).css("position","absolute");
//	$(loadingDiv).css('z-index','50000')
//	$("body")[0].appendChild(loadingDiv);
	
	var main = SVG.addChild(this.parent,"svg",{
//		"style":"border:1px solid #e0e0e0;",
		"id":this.id,
		"x":0,
		"y":this.y,
		"width":this.width,
		"height":this.height
	});
	
	var features = SVG.addChild(main,"svg",{
		"class":"features",
		"x":-this.pixelPosition,
		"width":this.lienzo,
		"height":this.height
	});
	
	var titleGroup = SVG.addChild(main,"g",{
		visibility:this.titleVisibility	
	});
	
	var textWidth = 15+this.id.length*6;
	var titlebar = SVG.addChild(titleGroup,"rect",{
		"x":0,
		"y":0,
		"width":textWidth,
		"height":22,
		"stroke":"deepSkyBlue",
		"stroke-width":"1",
		"opacity":"0.6",
		"fill":"honeydew"
	});
	var titleText = SVG.addChild(titleGroup,"text",{
		"x":4,
		"y":14,
		"font-size": 10,
		"opacity":"0.4",
		"fill":"black"
//		"transform":"rotate(-90 50,50)"
	});
	titleText.textContent = this.id;

	var settingsRect = SVG.addChildImage(titleGroup,{
		"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABHNCSVQICAgIfAhkiAAAAPJJREFUOI2llD0OgkAQhb/QExuPQGWIB/A63IAbGLwG0dNQWxPt6GmoELMWzuJk3IUYJ5mQnXlv/nYWnHOEFCgAp7SIYRPiclg5f0SyJkCmqtgBrankBuwVJwMS59xsKAV4Bc7AwwTwOgEXwTmgFD5boI+QnkAn35C/Fz7HSMYTkErXqZynAPYIkAN346giI6wM7g7kfiYbYFAtpJYtuFS1NggPvRejODtLNvvTCW60GaKVmADhSpZmEqgiPBNWbkdVsHg7/+/Jjxv7EP+8sXqwCe+34CX0dlqxe8mE9zV9LbUJUluAl+CvQAI2xtxYjE/8Ak/JC4Cb6l5eAAAAAElFTkSuQmCC",
		"x":4+textWidth,
		"y":3,
		"width":17,
		"height":17,
		"opacity":"0.6",
		"visibility":"hidden"
	});
	
	var upRect = SVG.addChildImage(titleGroup,{
		"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD9JREFUOI1jYKAhEGBgYJgPxWSB+QwMDP+hmGRDkDWTbAg2zUQbgk8zQUOI0Uyyd2AacAImYk0aNWAwG0AxAABRBSdztC0IxQAAAABJRU5ErkJggg==",
		"x":22+textWidth,
		"y":4,
	    "width":16,
	    "height":16,
	    "opacity":"0.6",
	    "visibility":"hidden"
	});
	
	var downRect = SVG.addChildImage(titleGroup,{
		"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAERJREFUOI1jYKAx+A/FOAETpTaMGjDYDJjPgIh39PhHF5+Py0BshhCtmRhDCGrGZwjRmrEZQrJmZEPmMzAwCJBrAEEAANCqJXdWrFuyAAAAAElFTkSuQmCC",
		"x":36+textWidth,
		"y":4,
		"width":16,
		"height":16,
		"opacity":"0.6",
		"visibility":"hidden"
	});
	var hideRect = SVG.addChildImage(titleGroup,{
		"xlink:href":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAJFJREFUOI2tks0NgzAMhb+wAFP05FM2aCdjtDBCLjkxBRO4F4JoAONIfVKkyHk/sl4CQIyRFqpKzvk0/zvCMRSYgU9LEpH9XkpJwFtEgqr+8NJmkozAR45F2N+WcTQyrk3c4lYwbadLXFGFCkx34sHr9lrXrvTLFXrFx509Fd+K3SaeqkwTb1XV5Axvz73/wcQXYitIjMzG550AAAAASUVORK5CYII=",
		"x":52+textWidth,
		"y":4,
		"width":16,
		"height":16,
		"opacity":"0.6",
		"visibility":"hidden"
	});
	
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
	
	var bamStrandForward = SVG.addChild(main,"linearGradient",{
		"id":this.id+"bamStrandForward"
	});
	var bamStrandReverse = SVG.addChild(main,"linearGradient",{
		"id":this.id+"bamStrandReverse"
	});
	var stop1 = SVG.addChild(bamStrandForward,"stop",{
		"offset":"5%",
		"stop-color":"#666"
	});
	var stop2 = SVG.addChild(bamStrandForward,"stop",{
		"offset":"95%",
		"stop-color":"#BBB"
	});
	var stop1 = SVG.addChild(bamStrandReverse,"stop",{
		"offset":"5%",
		"stop-color":"#BBB"
	});
	var stop2 = SVG.addChild(bamStrandReverse,"stop",{
		"offset":"95%",
		"stop-color":"#666"
	});
	
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
	
	
	
	$(titleGroup).mouseenter(function(event){
//		over.setAttribute("opacity","0.1");
		titlebar.setAttribute("width",74+textWidth);
		titlebar.setAttribute("opacity","1.0");
		titleText.setAttribute("opacity","1.0");
		upRect.setAttribute("visibility","visible");
		downRect.setAttribute("visibility","visible");
		if(_this.closable == true){ hideRect.setAttribute("visibility","visible"); }
//		settingsRect.setAttribute("visibility","visible");//TODO not implemented yet, hidden for now...
	});
	$(titleGroup).mouseleave(function(event){
////	over.setAttribute("opacity","0.0");
		titlebar.setAttribute("width",textWidth);
		titlebar.setAttribute("opacity","0.6");
		titleText.setAttribute("opacity","0.4");
		upRect.setAttribute("visibility","hidden");
		downRect.setAttribute("visibility","hidden");
		hideRect.setAttribute("visibility","hidden");
		settingsRect.setAttribute("visibility","hidden");
	});
	
	$([upRect,downRect,hideRect,settingsRect]).mouseover(function(event){
		this.setAttribute("opacity","1.0");
	});
	$([upRect,downRect,hideRect,settingsRect]).mouseleave(function(event){
		this.setAttribute("opacity","0.6");
	});

	$(settingsRect).mouseover(function(event){
		titlebar.setAttribute("height",22+22);
	});
	$(settingsRect).mouseleave(function(event){
		titlebar.setAttribute("height",22);
	});
	
	//set initial values when hide due mouseleave event not fires when hideTrack from TrackSvgLayout
	$(hideRect).click(function(event){
		titlebar.setAttribute("width",textWidth);
		titlebar.setAttribute("opacity","0.6");
		titleText.setAttribute("opacity","0.4");
		upRect.setAttribute("visibility","hidden");
		downRect.setAttribute("visibility","hidden");
		hideRect.setAttribute("visibility","hidden");
		settingsRect.setAttribute("visibility","hidden");
	});
	
	
	this.invalidZoomText = SVG.addChild(main,"text",{
		"x":154,
		"y":14,
		"font-size": 10,
		"opacity":"0.6",
		"fill":"black",
		"visibility":"hidden"
	});
	this.invalidZoomText.textContent = "This level of zoom isn't appropiate for this track";
	
	this.loading = SVG.addChildImage(main,{
		"xlink:href":"data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20width%3D%2230px%22%20height%3D%2230px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cg%20id%3D%22pair%22%3E%3Cellipse%20cx%3D%2210%22%20cy%3D%220%22%20rx%3D%225%22%20ry%3D%222%22%20style%3D%22fill%3A%23ccc%3B%20fill-opacity%3A0.5%3B%22%2F%3E%3Cellipse%20cx%3D%22-10%22%20cy%3D%220%22%20rx%3D%225%22%20ry%3D%222%22%20style%3D%22fill%3A%23aaa%3B%20fill-opacity%3A1.0%3B%22%2F%3E%3C%2Fg%3E%3C%2Fdefs%3E%3Cg%20transform%3D%22translate(15%2C15)%22%3E%3Cg%3E%3CanimateTransform%20attributeName%3D%22transform%22%20type%3D%22rotate%22%20from%3D%220%22%20to%3D%22360%22%20dur%3D%222s%22%20repeatDur%3D%22indefinite%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23pair%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23pair%22%20transform%3D%22rotate(45)%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23pair%22%20transform%3D%22rotate(90)%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23pair%22%20transform%3D%22rotate(135)%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
		"x":this.width-40,
		"y":0,
		"width":22,
		"height":22,
		"visibility":"hidden"
	});
	
	//ya no se usa, es track svg layout el q captura el evento de click y arrastrar
//	$(this.parent).mousedown(function(event) {
//		var x = parseInt(features.getAttribute("x")) - event.clientX;
//		$(this).mousemove(function(event){
//			features.setAttribute("x",x + event.clientX);
//		});
//	});
//	$(this.parent).mouseup(function(event) {
//		$(this).off('mousemove');
//	});
	
	
	this.main = main;
	this.titleGroup = titleGroup;
	this.titlebar = titlebar;
	this.titleText = titleText;
	this.upRect = upRect;
	this.downRect = downRect;
	this.hideRect = hideRect;
	this.settingsRect = settingsRect;
	this.features = features;
	
	this.rendered = true;
};


//RENDERS for MultiFeatureRender, sequence, Snp, Histogram

TrackSvg.prototype.MultiFeatureRender = function(featureList){
	var _this = this;
	console.time("Multirender "+featureList.length);
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
		
		//get type settings object
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
		
		var textHeight = 12;
		if(_this.zoom > _this.labelZoom){
			try{
				var maxWidth = Math.max(width, settings.getLabel(feature).length*8); //XXX cuidado : text.getComputedTextLength()
			}catch(e){
				var maxWidth = 72;
			}
		}else{
			var maxWidth = Math.max(width,10);
			textHeight = 0;
		}
		
		
		var rowHeight = textHeight+12;
		var rowY = 0;
		var textY = textHeight+settings.height;
		
		while(true){
			if(_this.renderedArea[rowY] == null){
				_this.renderedArea[rowY] = new FeatureBinarySearchTree();
			}
			var enc = _this.renderedArea[rowY].add({start: x, end: x+maxWidth-1});
			
			if(enc){
				var featureGroup = SVG.addChild(_this.features,"g");
				var rect = SVG.addChild(featureGroup,"rect",{
					"x":x,
					"y":rowY,
					"width":width,
					"height":settings.height,
					"stroke": "#3B0B0B",
					"stroke-width": 0.5,
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
	console.timeEnd("Multirender "+featureList.length);
};

TrackSvg.prototype.BamRender = function(chunkList){
	var _this = this;
	var middle = this.width/2;
	console.log(chunkList.length);
	var bamGroup = SVG.addChild(_this.features,"g");
	var drawCoverage = function(chunk){
		var coverageList = chunk.coverage.all;
		var readList = chunk.reads;
		var start = parseInt(chunk.region.start);
		var end = parseInt(chunk.region.end);
		var pixelWidth = (end-start+1)*_this.pixelBase;
		
		var points = "";
		var baseMid = (_this.pixelBase/2)-0.5;//4.5 cuando pixelBase = 10
		
		var x,y, p  = parseInt(chunk.region.start), covHeight = 50;
		for ( var i = 0; i < coverageList.length; i++) {
			x = _this.pixelPosition+middle-((_this.position-p)*_this.pixelBase)+baseMid;
			y = coverageList[i]/200*covHeight;//200 is the depth
			points += x+","+y+" ";
			p++;
			
//			$(text).qtip({
//				content:(parseInt(chunk.region.start)+i).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
//				position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
//				style: { width:true, classes: 'ui-tooltip-light ui-tooltip-shadow'}
//			});
		}
//		console.log(points)
		var dummyRect = SVG.addChild(bamGroup,"rect",{
			"x":_this.pixelPosition+middle-((_this.position-start)*_this.pixelBase),
			"y":0,
			"width":pixelWidth,
			"height":covHeight,
			"fill": "transparent",
			"cursor": "pointer"
		});
		var pol = SVG.addChild(bamGroup,"polyline",{
			"points":points,
			"stroke": "black",
			"stroke-width": 2,
			"opacity": 0.4,
			"fill": "gray"
		});
		$(dummyRect).qtip({
			content:" ",
			position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
			style: { width:true, classes: 'ui-tooltip-shadow'}
		});
		_this.trackSvgLayout.onMousePosition.addEventListener(function(sender,mousePos){
			
			var str = 'depth: <span class="ssel">'+coverageList[mousePos-parseInt(chunk.region.start)]+'</span><br>'+
					'A: <span class="ssel">'+chunk.coverage.a[mousePos-parseInt(chunk.region.start)]+'</span><br>'+
					'C: <span class="ssel">'+chunk.coverage.c[mousePos-parseInt(chunk.region.start)]+'</span><br>'+
					'G: <span class="ssel">'+chunk.coverage.g[mousePos-parseInt(chunk.region.start)]+'</span><br>'+
					'T: <span class="ssel">'+chunk.coverage.t[mousePos-parseInt(chunk.region.start)]+'</span><br>';
			$(dummyRect).qtip('option', 'content.text', str ); 
		});
		
//		var overPol = false;
//		$(pol).mouseenter(function(){
//			console.log("enter");
//			overPol = true;
//		});
		
//		$(pol).qtip({
//			content:"asdf",
//			position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
//			style: { width:true, classes: 'ui-tooltip-light ui-tooltip-shadow'}
//		});
		
		
//		_this.trackSvgLayout.onMousePosition.addEventListener(function(sender,mousePos){
//			if(overPol){
//				_this.customSvgField.textContent = coverageList[mousePos-parseInt(chunk.region.start)];
//			}
//		});
		
		for ( var i = 0, li = readList.length; i < li; i++) {
			draw(readList[i]);
		}
	};
	
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
		
		var rowHeight = 12;
		var rowY = 70;
//		var textY = 12+settings.height;
		
		while(true){
			if(_this.renderedArea[rowY] == null){
				_this.renderedArea[rowY] = new FeatureBinarySearchTree();
			}
			var enc = _this.renderedArea[rowY].add({start: x, end: x+maxWidth-1});
			
			if(enc){
				
				var strand = settings.getStrand(feature);
				var rect = SVG.addChild(bamGroup,"rect",{
					"x":x,
					"y":rowY,
					"width":width,
					"height":settings.height,
					"stroke": "white",
					"stroke-width": 1,
					"fill": color,
//					"fill": 'url(#'+_this.id+'bamStrand'+strand+')',
					"cursor": "pointer"
				});
//				var d = 'M '+x+' '+rowY+' L '+(x+width)+' '+rowY+' L '+(x+width)+' '+(rowY+settings.height)+' L '+x+' '+(rowY+settings.height)+' Z';
//				var rect = SVG.addChild(bamGroup,"path",{
////					"x":x,
////					"y":rowY,
////					"width":width,
////					"height":settings.height,
//					"d":d,
//					"stroke": "white",
//					"stroke-width": 1,
//					"fill": color,
//					"cursor": "pointer"
//				});
////				console.log(d)
				
//				rect.onmouseover = function(){
//					console.log("over");
//				};
				
//				var text = SVG.addChild(_this.features,"text",{
//					"i":i,
//					"x":x,
//					"y":textY,
//					"font-size":10,
//					"opacity":null,
//					"fill":"black",
//					"cursor": "pointer"
//				});
//				text.textContent = settings.getLabel(feature);
				
				$([rect]).qtip({
					content: {text:settings.getTipText(feature), title:settings.getTipTitle(feature)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:280,classes: 'ui-tooltip ui-tooltip-shadow'}
				});
				
				$([rect]).click(function(event){
					_this.showInfoWidget({query:feature[settings.infoWidgetId], feature:feature, featureType:feature.featureType, adapter:_this.trackData.adapter});
				});
				break;
			}
			rowY += rowHeight;
//			textY += rowHeight;
		}
	};
	
	//process features
	console.time("BamRender");
	for ( var i = 0, li = chunkList.length; i < li; i++) {
		drawCoverage(chunkList[i]);
	}
	console.timeEnd("BamRender");
	var newHeight = Object.keys(this.renderedArea).length*24;
	if(newHeight>0){
		this.setHeight(newHeight+/*margen entre tracks*/10+70);
	}
};

TrackSvg.prototype.GeneTranscriptRender = function(featureList){
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
		
		var rowHeight = 24;
		var rowY = 0;
		var textY = 12+settings.height;
		
		
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
					"cursor": "pointer"
				});
				text.textContent = settings.getLabel(feature);

				$([rect,text]).qtip({
					content: {text:settings.getTipText(feature), title:settings.getTipTitle(feature)},
					position: {target:  "mouse", adjust: {x:15, y:0},  viewport: $(window), effect: false},
					style: { width:true, classes: 'ui-tooltip ui-tooltip-shadow'}
				});

				$([rect,text]).click(function(event){
					_this.showInfoWidget({query:feature[settings.infoWidgetId], feature:feature, featureType:feature.featureType , adapter:_this.trackData.adapter});
				});


				//paint transcripts
				var checkRowY = rowY+rowHeight;
				var checkTextY = textY+rowHeight;
				if(feature.transcripts!=null){
					for(var i = 0, leni = feature.transcripts.length; i < leni; i++){//XXX loop over transcripts
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
							"y":checkRowY+2,
							"width":transcriptWidth,
							"height":settings.height-3,
							"fill": "gray",
							"cursor": "pointer"
						});
						var text = SVG.addChild(transcriptGroup,"text",{
							"x":transcriptX,
							"y":checkTextY,
							"font-size":10,
							"opacity":null,
							"fill":"black",
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
						for(var e = 0, lene = feature.transcripts[i].exonToTranscripts.length; e < lene; e++){//XXX loop over exons
							var e2t = feature.transcripts[i].exonToTranscripts[e];
							var exonSettings = _this.types[e2t.exon.featureType];
							var exonStart = parseInt(e2t.exon.start);
							var exonEnd =  parseInt(e2t.exon.end);

							var exonX = _this.pixelPosition+middle-((_this.position-exonStart)*_this.pixelBase);
							var exonWidth = (exonEnd-exonStart+1) * ( _this.pixelBase);

							var exonGroup = SVG.addChild(_this.features,"g");
							
							$(exonGroup).qtip({
								content: {text:exonSettings.getTipText(e2t,transcript), title:exonSettings.getTipTitle(e2t)},
								position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
								style: { width:true, classes: 'ui-tooltip ui-tooltip-shadow'}
							});
							
							var eRect = SVG.addChild(exonGroup,"rect",{//paint exons in white without coding region
								"i":i,
								"x":exonX,
								"y":checkRowY-1,
								"width":exonWidth,
								"height":exonSettings.height+3,
								"stroke": "gray",
								"stroke-width": 1,
								"fill": "white",
								"cursor": "pointer"
							});

							//XXX now paint coding region
							var	codingStart = 0;
							var codingEnd = 0;
							// 5'-UTR
							if(transcript.codingRegionStart > exonStart && transcript.codingRegionStart < exonEnd){
								codingStart = parseInt(transcript.codingRegionStart);
								codingEnd = exonEnd;
							}else {
								// 3'-UTR
								if(transcript.codingRegionEnd > exonStart && transcript.codingRegionEnd < exonEnd){
									codingStart = exonStart;		
									codingEnd = parseInt(transcript.codingRegionEnd);		
								}else
									// all exon is transcribed
									if(transcript.codingRegionStart < exonStart && transcript.codingRegionEnd > exonEnd){
										codingStart = exonStart;		
										codingEnd = exonEnd;	
									}
//									else{
//										if(exonEnd < transcript.codingRegionStart){
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
									"height":exonSettings.height+3,
									"stroke": color,
									"stroke-width": 1,
									"fill": color,
									"cursor": "pointer"
								});
								//XXX draw phase only at zoom 100, where this.pixelBase=10
								for(var p = 0, lenp = 3 - e2t.phase; p < lenp && _this.pixelBase==10 && e2t.phase!=-1; p++){//==10 for max zoom only
									SVG.addChild(exonGroup,"rect",{
										"i":i,
										"x":codingX+(p*10),
										"y":checkRowY-1,
										"width":_this.pixelBase,
										"height":settings.height+3,
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

TrackSvg.prototype.SequenceRender = function(featureList){
	var middle = this.width/2;
	
	if(featureList.length > 0){
		var seqString = featureList[0].sequence;
		var seqStart = featureList[0].start;
		var width = 1*this.pixelBase;
		
//		if(!this.settings.color){
//			this.settings.color = {A:"#009900", C:"#0000FF", G:"#857A00", T:"#aa0000", N:"#555555"};
//		}
		
		var start = featureList[0].start;
		
		if(jQuery.browser.mozilla){
			var x = this.pixelPosition+middle-((this.position-start)*this.pixelBase);
			var text = SVG.addChild(this.features,"text",{
				"x":x+1,
				"y":13,
				"font-size":19,
				"font-family": "Ubuntu Mono"
			});
			text.textContent = seqString;
		}else{
			for ( var i = 0; i < seqString.length; i++) {
				var x = this.pixelPosition+middle-((this.position-start)*this.pixelBase);
				start++;
				var text = SVG.addChild(this.features,"text",{
					"x":x+1,
					"y":12,
					"font-size":16,
					"font-family": "Ubuntu Mono",
					"fill":SEQUENCE_COLORS[seqString.charAt(i)]
				});
				text.textContent = seqString.charAt(i);
				
				$(text).qtip({
					content:(seqStart+i).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
					position: {target: 'mouse', adjust: {x:15, y:0}, viewport: $(window), effect: false},
					style: { width:true, classes: 'ui-tooltip-light ui-tooltip-shadow'}
				});
			}
			
		}
	}
	console.timeEnd("all");
};


TrackSvg.prototype.HistogramRender = function(featureList){
	console.time("histogramRender");
	var middle = this.width/2;
//	console.log(featureList);
	var histogramHeight = 50;
	var points = "";
	if(featureList.length>0) {
		var firstx = this.pixelPosition+middle-((this.position-featureList[0].start)*this.pixelBase);
		points = firstx+",50 ";
		
	}
	for ( var i = 0, len = featureList.length; i < len; i++) {
		var feature = featureList[i];
		var width = (feature.end-feature.start);
		//get type settings object
		var settings = this.types[feature.featureType];
		var color = settings.histogramColor;
		
		width = width * this.pixelBase;
		var x = this.pixelPosition+middle-((this.position-feature.start)*this.pixelBase);
		var height = histogramHeight * featureList[i].value;
		
		//
		if(featureList[i].value==null){
			console.log(featureList[i]);
		}

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
	}
	if(featureList.length>0) {
		var firstx = this.pixelPosition+middle-((this.position-featureList[featureList.length-1].start)*this.pixelBase);
		points += firstx+",50 ";
		
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
	console.timeEnd("histogramRender");
};


TrackSvg.prototype.showInfoWidget = function(args){
	console.log(args);
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
function TrackSvgLayout(parent, args) {//parent is a DOM div element
	var _this = this;
	this.args = args;
	this.id = Math.round(Math.random()*10000000);
	
	this.trackDataList =  new Array();
	this.trackSvgList =  new Array();
	this.swapHash = new Object();
	this.zoomOffset = 0;//for region overview panel, that will keep zoom higher, 0 by default
	this.parentLayout = null;
	this.mousePosition="";
	this.windowSize = "";
	
	
	//default values
	this.height=25;
	
	if (args != null){
		if(args.width != null){
			this.width = args.width;
		}
		if(args.height != null){
			this.height = args.height;
		}
		if(args.position != null){
			this.position = args.position;
		}
		if(args.chromosome != null){
			this.chromosome = args.chromosome;
		}
		if(args.zoomOffset != null){
			this.zoomOffset = args.zoomOffset;
		}
		if(args.zoom != null){
			this.zoom = args.zoom-this.zoomOffset;
		}
		if(args.parentLayout != null){
			this.parentLayout = args.parentLayout;
		}
	}
	
	this._createPixelsbyBase();//create pixelByBase array
	this.pixelBase = this._getPixelsbyBase(this.zoom);
	this.halfVirtualBase = (this.width*3/2) / this.pixelBase;
	
	
	//SVG structure and events initialization
	this.onZoomChange = new Event();
	this.onChromosomeChange = new Event();
	this.onMove = new Event();
	this.onWindowSize = new Event();
	this.onMousePosition = new Event();
	this.onSvgRemoveTrack = new Event();
	
	
	
	//Flags 
	this.tracksRendered=0;
	this.onTracksRendered = new Event();
	
	//Main SVG and his events
	this.svg = SVG.init(parent,{
		"width":this.width,
		"height":this.height
	});
	
	//grid
	var patt = SVG.addChild(this.svg,"pattern",{
		"id":this.id+"gridPatt",
		"patternUnits":"userSpaceOnUse",
		"x":0,
		"y":0,
		"width":10,
		"height":2000
	});
	
	var mid = this.width/2;
	this.grid = SVG.addChild(patt,"rect",{
		"x":parseInt(mid%10),
		"y":25,
		"width":1,
		"height":2000,
		"opacity":"0.15",
		"fill":"grey"
	});
	
	this.grid2 = SVG.addChild(this.svg,"rect",{
		"width":this.width,
		"height":2000,
		"x":0,
		"fill":"url(#"+this.id+"gridPatt)"
	});
	
	this.positionText = SVG.addChild(this.svg,"text",{
		"x":mid-30,
		"y":22,
		"font-size":10,
		"fill":"green"
	});
	this.firstPositionText = SVG.addChild(this.svg,"text",{
		"x":0,
		"y":22,
		"font-size":10,
		"fill":"green"
	});
	this.lastPositionText = SVG.addChild(this.svg,"text",{
		"x":this.width-70,
		"y":22,
		"font-size":10,
		"fill":"green"
	});
	this._setTextPosition();
	
	
	this.viewNtsArrow = SVG.addChild(this.svg,"rect",{
		"x":16,
		"y":2,
		"width":this.width-32,
		"height":10,
		"opacity":"0.7",
		"fill":"grey"
	});
	this.viewNtsArrowLeft = SVG.addChild(this.svg,"polyline",{
		"points":"0,7 16,0 16,14",
		"opacity":"0.7",
		"fill":"grey"
	});
	this.viewNtsArrowRight = SVG.addChild(this.svg,"polyline",{
		"points":this.width+",7 "+(this.width-16)+",0 "+(this.width-16)+",14",
		"opacity":"0.7",
		"fill":"grey"
	});
	this.viewNtsText = SVG.addChild(this.svg,"text",{
		"x":mid-30,
		"y":11,
		"font-size":10,
		"fill":"white"
	});
	this.windowSize = "Window size: "+Math.ceil((this.width)/this.pixelBase).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+" nts";
	this.viewNtsText.textContent = this.windowSize;
	
	this.currentLine = SVG.addChild(this.svg,"rect",{
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
		"x":-20,
		"y":this.height,
		"width":this.pixelBase,
		"height":this.height,
		"stroke-width":"2",
		//"stroke":"LawnGreen",
		"stroke":"lightgray",
		"opacity":"0.4",
		//"fill":"GreenYellow"
		"fill":"gainsboro"
	});

	if(this.parentLayout==null){
		//Main svg  movement events
//		this.svg.setAttribute("cursor", "move");
		
		$(parent).mousemove(function(event) {
			var mid = _this.width/2;
			var pb2 = _this.pixelBase/2;
			var offsetX = (event.clientX - $(parent).offset().left);
			var cX = offsetX-pb2;
			var rcX = (cX/_this.pixelBase) | 0;
			var pos = (rcX*_this.pixelBase) + mid%_this.pixelBase;
			_this.mouseLine.setAttribute("x",pos);
			
			var posOffset = (mid/_this.pixelBase) | 0;
			_this.mousePosition = _this.position+rcX-posOffset;
			_this.onMousePosition.notify(_this.mousePosition);
		});
		
		$(this.svg).mousedown(function(event) {
//			_this.mouseLine.setAttribute("visibility","hidden");
			this.setAttribute("cursor", "move");
			var downX = event.clientX;
			var lastX = 0;
			$(this).mousemove(function(event){
				this.setAttribute("cursor", "move");
				var newX = (downX - event.clientX)/_this.pixelBase | 0;//truncate always towards zero
				if(newX!=lastX){
					var desp = lastX-newX;
					var p = _this.position - desp;
					if(p>0){//avoid 0 and negative positions
						_this.position -= desp;
						_this._setTextPosition();
						_this.onMove.notify(desp);
						lastX = newX;
					}
				}
			});
		});
		$(this.svg).mouseup(function(event) {
			_this.mouseLine.setAttribute("visibility","visible");
			this.setAttribute("cursor", "default");
			$(this).off('mousemove');
//			$(this).focus();// without this, the keydown does not work
		});
		$(this.svg).mouseleave(function(event) {
			this.setAttribute("cursor", "default");
			$(this).off('mousemove');
			$("body").off('keydown');
		});
		
		$(this.svg).mouseenter(function(e) {
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
							desp = 100/_this.pixelBase;
						}else{
							desp = 10/_this.pixelBase;
						}
					break;
					case 39://right arrow
						if(e.ctrlKey){
							desp = -100/_this.pixelBase;
						}else{
							desp = -10/_this.pixelBase;
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
					_this.position -= desp;
					_this._setTextPosition();
					_this.onMove.notify(desp);
				}
			});
		};
		
		
//		$(this.svg).focus();// without this, the keydown does not work
		
	}else{
		_this.parentLayout.onMove.addEventListener(function(sender,desp){
			_this.position -= desp;
			_this._setTextPosition();
			_this.onMove.notify(desp);
		});
	}
};

TrackSvgLayout.prototype.setHeight = function(height){
	this.height=height;
	this.svg.setAttribute("height",height);
	this.grid.setAttribute("height",height);
	this.grid2.setAttribute("height",height);
	this.currentLine.setAttribute("height",parseInt(height)-25);//25 es el margen donde esta el texto de la posicion
	this.mouseLine.setAttribute("height",parseInt(height)-25);//25 es el margen donde esta el texto de la posicion
};
TrackSvgLayout.prototype.setWidth = function(width){
	this.width=width;
	var mid = this.width/2;
	this.svg.setAttribute("width",width);
	this.grid.setAttribute("x",parseInt(mid%10));
	this.grid2.setAttribute("width",width);
	this.positionText.setAttribute("x",mid-30);
	this.lastPositionText.setAttribute("x",width-70);
	this.viewNtsArrow.setAttribute("width",width-32);
	this.viewNtsArrowRight.setAttribute("points",width+",7 "+(width-16)+",0 "+(width-16)+",14");
	this.viewNtsText.setAttribute("x",mid-30);
	this.currentLine.setAttribute("x",mid);
	for ( var i = 0; i < this.trackSvgList.length; i++) {
		this.trackSvgList[i].setWidth(width);
	}		
	this.halfVirtualBase = (this.width*3/2) / this.pixelBase;
	this.viewNtsText.textContent = "Window size: "+Math.ceil((this.width)/this.pixelBase).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+" nts";
	this.windowSize = this.viewNtsText.textContent;
	this._setTextPosition();
	this.onWindowSize.notify({windowSize:this.viewNtsText.textContent});
	this.onZoomChange.notify();
};

TrackSvgLayout.prototype.setZoom = function(zoom){
	this.zoom=Math.max(zoom-this.zoomOffset, -5);
//	console.log(this.zoom);
//	console.log(this._getPixelsbyBase(this.zoom));
	this.pixelBase = this._getPixelsbyBase(this.zoom);
	this.halfVirtualBase = (this.width*3/2) / this.pixelBase;
	this.currentLine.setAttribute("width", this.pixelBase);
	this.mouseLine.setAttribute("width", this.pixelBase);
	this.viewNtsText.textContent = "Window size: "+Math.ceil((this.width)/this.pixelBase).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+" nts";
	this.windowSize = this.viewNtsText.textContent;
	this._setTextPosition();
	this.onWindowSize.notify({windowSize:this.viewNtsText.textContent});
	this.onZoomChange.notify();
};
TrackSvgLayout.prototype.setLocation = function(item){//item.chromosome, item.position, item.species
	if(item.chromosome!=null){
		this.chromosome = item.chromosome;
	}
	if(item.position!=null){
		this.position = parseInt(item.position);//check int, must be a number
		this._setTextPosition();
	}
	if(item.species!=null){
		//check species and modify CellBaseAdapter, clean cache
		for(i in this.trackDataList){
			if(this.trackDataList[i].adapter instanceof CellBaseAdapter){
				this.trackDataList[i].adapter.species = item.species;
				this.trackDataList[i].adapter.featureCache.clear();
			}
		}
	}
	this.onChromosomeChange.notify();
};



TrackSvgLayout.prototype.addTrack = function(trackData, args){
	var _this = this;
	var visibleRange = args.visibleRange;
	
	args["position"] = this.position;
	args["trackData"] = trackData;
	args["zoom"] = this.zoom;
	args["pixelBase"] = this.pixelBase;
	args["width"] = this.width;
	args["adapter"] = trackData.adapter;
	args["trackSvgLayout"] = this;
	
	var i = this.trackDataList.push(trackData);
	var trackSvg = new TrackSvg(this.svg,args);
	
	
	this.trackSvgList.push(trackSvg);
	this.swapHash[trackSvg.id] = {index:i-1,visible:true};
	trackSvg.setY(this.height);
	trackSvg.draw();
	this.setHeight(this.height + trackSvg.getHeight());
	
	
	
	
	//XXX help methods
	var callStart, callEnd, virtualStart, vitualEnd;
	var setCallRegion = function (){
		//needed call variables
		callStart = parseInt(_this.position - _this.halfVirtualBase*2);
		callEnd = parseInt(_this.position + _this.halfVirtualBase*2);
		virtualStart = parseInt(_this.position - _this.halfVirtualBase*2);//for now
		vitualEnd = parseInt(_this.position + _this.halfVirtualBase*2);//for now
	};
	var checkHistogramZoom = function(){
		if(_this.zoom <= trackSvg.histogramZoom){
			trackSvg.histogram = true;
			trackSvg.interval = Math.max(512, 5/_this.pixelBase);//server interval limit 512
//			console.log(trackData.adapter.featureCache);
		}else{
			trackSvg.histogram = null;
		}
	};
	var checkTranscriptZoom = function(){ //for genes only
		if(trackSvg.transcriptZoom != null && _this.zoom >= trackSvg.transcriptZoom){
			trackSvg.transcript=true;
		}else{
			trackSvg.transcript=null;
		}
	};
	var cleanSvgFeatures = function(){
		console.time("empty");
//		$(trackSvg.features).empty();
//		trackSvg.features.textContent = "";
		while (trackSvg.features.firstChild) {
			trackSvg.features.removeChild(trackSvg.features.firstChild);
		}
		console.timeEnd("empty");
		trackData.adapter.featureCache.chunksDisplayed = {};
		trackSvg.renderedArea = {};
	};
	//END help methods
	
	
	
	//EventListeners
	//Watch out!!!
	//this event must be attached before any "trackData.retrieveData()" call
	trackSvg.onGetDataIdx = trackData.adapter.onGetData.addEventListener(function(sender,event){
//		_this.tracksRendered++;
		if(event.params.histogram == true){
			trackSvg.featuresRender = trackSvg.HistogramRender;
		}else{
			trackSvg.featuresRender = trackSvg.defaultRender;
		}
		
		_this.setHeight(_this.height - trackSvg.getHeight());//modify height before redraw
		
		trackSvg.featuresRender(event.data);
		
		trackSvg.setLoading(false);
		
		$(trackSvg.features).fadeIn("fast");
		
		
		console.log("rendered");
//		console.log(trackData.adapter.featureCache);
		_this.setHeight(_this.height + trackSvg.getHeight());//modify height after redraw 
		_this._redraw();
	});
	
	
	//first load, get virtual window and retrieve data
	checkHistogramZoom();
	checkTranscriptZoom();//for genes only
	setCallRegion();
	// check if track is visible in this zoom
	if(_this.zoom >= visibleRange.start-_this.zoomOffset && _this.zoom <= visibleRange.end){
		trackSvg.setLoading(true);
		trackData.retrieveData({chromosome:_this.chromosome,start:virtualStart,end:vitualEnd, histogram:trackSvg.histogram, interval:trackSvg.interval, transcript:trackSvg.transcript});
		trackSvg.invalidZoomText.setAttribute("visibility", "hidden");
	}else{
		trackSvg.invalidZoomText.setAttribute("visibility", "visible");
	}
	
	
	//on zoom change set new virtual window and update track values
	trackSvg.onZoomChangeIdx = this.onZoomChange.addEventListener(function(sender,data){
		trackSvg.zoom=_this.zoom;
		trackSvg.pixelBase=_this.pixelBase;
		
		checkHistogramZoom();
		checkTranscriptZoom();//for genes only
		cleanSvgFeatures();
		setCallRegion();
		
		// check if track is visible in this zoom
		if(_this.zoom >= visibleRange.start-_this.zoomOffset && _this.zoom <= visibleRange.end){
			trackSvg.setLoading(true);
			trackData.retrieveData({chromosome:_this.chromosome,start:virtualStart,end:vitualEnd, histogram:trackSvg.histogram, interval:trackSvg.interval, transcript:trackSvg.transcript});
			trackSvg.invalidZoomText.setAttribute("visibility", "hidden");
		}else{
			trackSvg.invalidZoomText.setAttribute("visibility", "visible");
		}
	});

	
	//on chromosome change set new virtual window and update track values
	trackSvg.onChromosomeChangeIdx = this.onChromosomeChange.addEventListener(function(sender,data){
		trackSvg.position=_this.position;
		
		cleanSvgFeatures();
		setCallRegion();
		
		// check if track is visible in this zoom
		if(_this.zoom >= visibleRange.start-_this.zoomOffset && _this.zoom <= visibleRange.end){
			trackSvg.setLoading(true);
			trackData.retrieveData({chromosome:_this.chromosome,start:virtualStart,end:vitualEnd, histogram:trackSvg.histogram, interval:trackSvg.interval, transcript:trackSvg.transcript});
		}
	});
	

	//movement listeners 
	trackSvg.onMoveIdx = this.onMove.addEventListener(function(sender,desp){
		trackSvg.position -= desp;
		var despBase = desp*_this.pixelBase;
		trackSvg.pixelPosition-=despBase;

		//parseFloat important 
		var move =  parseFloat(trackSvg.features.getAttribute("x")) + despBase;
		trackSvg.features.setAttribute("x",move);

		// check if track is visible in this zoom
		if(_this.zoom >= visibleRange.start && _this.zoom <= visibleRange.end){
			virtualStart = parseInt(trackSvg.position - _this.halfVirtualBase);
			virtualEnd = parseInt(trackSvg.position + _this.halfVirtualBase);
			
			var s = parseInt(trackSvg.position - _this.halfVirtualBase*2);
			var e = parseInt(trackSvg.position + _this.halfVirtualBase*2);
			
			if(desp>0 && virtualStart < callStart){
				trackData.retrieveData({chromosome:_this.chromosome,start:parseInt(callStart-_this.halfVirtualBase),end:callStart, histogram:trackSvg.histogram, interval:trackSvg.interval, transcript:trackSvg.transcript});
				callStart = parseInt(callStart-_this.halfVirtualBase);
			}

			if(desp<0 && virtualEnd > callEnd){
				trackData.retrieveData({chromosome:_this.chromosome,start:callEnd,end:parseInt(callEnd+_this.halfVirtualBase), histogram:trackSvg.histogram, interval:trackSvg.interval, transcript:trackSvg.transcript});
				callEnd = parseInt(callEnd+_this.halfVirtualBase);
			}

		}
	});
	
	
	
	
	
	//track buttons
	//XXX se puede mover?
	$(trackSvg.upRect).bind("click",function(event){
		_this._reallocateAbove(this.parentNode.parentNode.id);//"this" is the svg element
	});
	$(trackSvg.downRect).bind("click",function(event){
		_this._reallocateUnder(this.parentNode.parentNode.id);//"this" is the svg element
	});
	$(trackSvg.hideRect).bind("click",function(event){
//		_this._hideTrack(this.parentNode.parentNode.id);//"this" is the svg element
		_this.removeTrack(this.parentNode.parentNode.id);//"this" is the svg element
		_this.onSvgRemoveTrack.notify(this.parentNode.parentNode.id);
	});
	$(trackSvg.settingsRect).bind("click",function(event){
		console.log("settings click");//"this" is the svg element
	});
	

};

TrackSvgLayout.prototype.removeTrack = function(trackId){
	// first hide the track
	this._hideTrack(trackId);
	
	var position = this.swapHash[trackId].index;
	
	// delete listeners
	this.onZoomChange.removeEventListener(this.trackSvgList[position].onZoomChangeIdx);
	this.onChromosomeChange.removeEventListener(this.trackSvgList[position].onChromosomeChangeIdx);
	this.onMove.removeEventListener(this.trackSvgList[position].onMoveIdx);

	// delete data
	this.trackSvgList.splice(position, 1);
	this.trackDataList.splice(position, 1);
	delete this.swapHash[trackId];
	//uddate swapHash with correct index after slice
	for ( var i = 0; i < this.trackSvgList.length; i++) {
		this.swapHash[this.trackSvgList[i].id].index = i;
	}
	return trackId;
};

TrackSvgLayout.prototype._redraw = function(){
	var _this = this;
	var trackSvg = null;
	var lastY = 25;
	for ( var i = 0; i < this.trackSvgList.length; i++) {
		trackSvg = this.trackSvgList[i];
		if(this.swapHash[trackSvg.id].visible){
			trackSvg.main.setAttribute("y",lastY);
			lastY += trackSvg.getHeight();
		}
	}
};

//This routine is called when track order modified
TrackSvgLayout.prototype._reallocateAbove = function(trackMainId){
	var i = this.swapHash[trackMainId].index;
	console.log(i+" quiere moverse 1 posicion arriba");
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
		console.log("ya esta en la mas alta");
	}
};
//This routine is called when track order modified
TrackSvgLayout.prototype._reallocateUnder = function(trackMainId){
	var i = this.swapHash[trackMainId].index;
	console.log(i+" quiere moverse 1 posicion abajo");
	if(i+1<this.trackDataList.length){
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
		console.log("abajo del todo");
	}
};

TrackSvgLayout.prototype._hideTrack = function(trackMainId){
	this.swapHash[trackMainId].visible=false;
	var i = this.swapHash[trackMainId].index;
	var track = this.trackSvgList[i];
	this.svg.removeChild(track.main);
	
	this.setHeight(this.height - track.getHeight());
	
	this._redraw();
	
	var _this= this;
//	setTimeout(function() {
//		_this._showTrack(trackMainId);
//	},2000);
};

TrackSvgLayout.prototype._showTrack = function(trackMainId){
	this.swapHash[trackMainId].visible=true;
	var i = this.swapHash[trackMainId].index;
	var track = this.trackSvgList[i];
	this.svg.appendChild(track.main);
	
	this.setHeight(this.height + track.getHeight());
	
	this._redraw();
};


TrackSvgLayout.prototype._getPixelsbyBase = function(zoom){
	return this.zoomLevels[zoom];
};

TrackSvgLayout.prototype._createPixelsbyBase = function(){
	this.zoomLevels = new Array();
	var pixelsByBase = 10;
	for ( var i = 100; i >= -40; i-=5) {
		this.zoomLevels[i] = pixelsByBase;
		pixelsByBase = pixelsByBase / 2;
	}
};

TrackSvgLayout.prototype._setTextPosition = function(){
	this.positionText.textContent = this.position.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	var x = Math.floor((this.width)/this.pixelBase/2);
	this.firstPositionText.textContent = (this.position-x).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	this.lastPositionText.textContent = (this.position+x-1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
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
		// check if this key exists in cache (features from files)
		if(this.cache[key] != null && this.cache[key][dataType] != null){
			for ( var j = 0, len = this.cache[key][dataType].length; j < len; j++) {
				if(this.gzip) {
					try {
						feature = JSON.parse(RawDeflate.inflate(this.cache[key][dataType][j]));
					} catch (e) {
						/** feature es "" **/
						console.log(e)
						debugger
						
					}
					
				}else{
					feature = this.cache[key][dataType][j];
				}
				// we only get those features in the region AND check if chunk has been already displayed
				if(feature.end > region.start && feature.start < region.end){
					
					//check if any feature chunk has been already displayed 
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
				}
			}
		}
		this.chunksDisplayed[key+dataType]=true;//mark chunk as displayed
	}
	if(returnNull){
		return null;
	}else{
		return features;
	}
};

FeatureCache.prototype.putFeaturesByRegion = function(featureDataList, region, featureType, dataType){
	var key, firstRegionChunk, lastRegionChunk, firstChunk, lastChunk, feature, gzipFeature;
	
	console.time("-----"+featureType);
	var ssss = 0;
	
	//initialize region
	firstRegionChunk = this._getChunk(region.start);
	lastRegionChunk = this._getChunk(region.end);
	for(var i=firstRegionChunk; i<=lastRegionChunk; i++){
		key = region.chromosome+":"+i;
		if(this.cache[key]==null){
			this.cache[key] = {};
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
			ssss+=gzipFeature.length;
		}else{
			gzipFeature = feature;
			ssss+=JSON.stringify(gzipFeature).length;
		}
		
		for(var i=firstChunk; i<=lastChunk; i++) {
			if(i >= firstRegionChunk && i<= lastRegionChunk){//only if is inside the called region
				key = region.chromosome+":"+i;
				this.cache[key][dataType].push(gzipFeature);
			}
		}
	}
	console.timeEnd("-----"+featureType);
	console.log("-----"+ssss)
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

FeatureCache.prototype.clearType = function(dataType){
	this.cache[dataType] = null;
};






//XXX need revision
FeatureCache.prototype.putFeatures = function(featureDataList, dataType){
	var feature, key, firstChunk, lastChunk;

	//Check if is a single object
	if(featureDataList.constructor != Array){
		var featureData = featureDataList;
		featureDataList = [featureData];
	}

	for(var index = 0, len = featureDataList.length; index<len; index++) {
		feature = featureDataList[index];
		firstChunk = this._getChunk(feature.start);
		lastChunk = this._getChunk(feature.end);
		for(var i=firstChunk; i<=lastChunk; i++) {
			key = feature.chromosome+":"+i;
			if(this.cache[key]==null){
				this.cache[key] = [];
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




//TODO XXX not tested
FeatureCache.prototype.histogram = function(region, interval){

	var intervals = (region.end-region.start+1)/interval;
	var intervalList = [];
	
	for ( var i = 0; i < intervals; i++) {
		var featuresInterval = 0;
		
		var intervalStart = i*interval;//deberia empezar en 1...
		var intervalEnd = ((i+1)*interval)-1;
		
		var firstChunk = this._getChunk(intervalStart+region.start);
		var lastChunk = this._getChunk(intervalEnd+region.start);
		
		console.log(this.cache);
		for(var j=firstChunk; j<=lastChunk; j++){
			var key = region.chromosome+":"+j;
			console.log(key);
			console.log(this.cache[key]);
			for ( var k = 0, len = this.cache[key].length; k < len; k++) {
				if(this.gzip) {
					feature = JSON.parse(RawDeflate.inflate(this.cache[key][k]));
				}else{
					feature = this.cache[key][k];
				}
				if(feature.start > intervalStart && feature.start < intervalEnd);
				featuresInterval++;
			}
			
		}
		intervalList[i]=featuresInterval;
		
		if(this.maxFeaturesInterval<featuresInterval){
			this.maxFeaturesInterval = featuresInterval;
		}
	}
	
	for ( var inter in  intervalList) {
		intervalList[inter]=intervalList[inter]/this.maxFeaturesInterval;
	}
};function FeatureDataAdapter(dataSource, args){
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
};

FeatureDataAdapter.prototype.getData = function(region){
	
	console.log("XXX comprobar histograma");
	console.log(region);
	var dataType = "data";
	var itemList = this.featureCache.getFeaturesByRegion(region, dataType);
	if(itemList != null){
		this.onGetData.notify({data:itemList, params:this.params, cached:true});
	}
};


FeatureDataAdapter.prototype.addFeatures = function(features){
		this.featureCache.putFeatures(features, "data");
};
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
		if(args.chromosome != null){
			this.chromosome = args.chromosome;
		}
		if(args.zoom != null){
			this.zoom = args.zoom;
		}
		if(args.position != null){
			this.position = args.position;
		}
	}

	this._createPixelsbyBase();//create pixelByBase array
	this.tracksViewedRegion = this.width/this._getPixelsbyBase(this.zoom);
	
	this.onClick = new Event();
	
	this.svg = SVG.init(parent,{
		"width":this.width,
		"height":this.height
	});
	
	this.colors = {gneg:"white", stalk:"#666666", gvar:"#CCCCCC", gpos25:"silver", gpos33:"lightgrey", gpos50:"gray", gpos66:"dimgray", gpos75:"darkgray", gpos100:"black", gpos:"gray", acen:"blue"};
	
	this.data = null;
};

ChromosomeWidget.prototype.setWidth = function(width){
	this.width=width;
	this.svg.setAttribute("width",width);
	this.tracksViewedRegion = width/this._getPixelsbyBase(this.zoom);
	while (this.svg.firstChild) {
		this.svg.removeChild(this.svg.firstChild);
	}
	this._drawSvg(this.data);
};

ChromosomeWidget.prototype.drawChromosome = function(){
	var _this = this;
	
	var cellBaseManager = new CellBaseManager(this.species);
 	cellBaseManager.success.addEventListener(function(sender,data){
 		_this.data = data;
 		_this._drawSvg(data);
 	});
 	cellBaseManager.get("genomic", "region", this.chromosome,"cytoband");
};
ChromosomeWidget.prototype._drawSvg = function(data){
	var _this = this;
	
	_this.pixelBase = (_this.width -40) / data.result[0][data.result[0].length-1].end;
	var x = 20;
	var y = 10;
	var firstCentromere = true;

	var offset = 20;
	var pointerPosition = (_this.position * _this.pixelBase) + offset;

	var group = SVG.addChild(_this.svg,"g",{"cursor":"pointer"});
	$(group).click(function(event){
		var clickPosition = parseInt((event.clientX - offset)/_this.pixelBase);
		var positionBoxWidth = parseFloat(_this.positionBox.getAttribute("width"));

		_this.positionBox.setAttribute("x",event.clientX-(positionBoxWidth/2));
		_this.onClick.notify(clickPosition);
	});

	for (var i = 0; i < data.result[0].length; i++) {
		var width = _this.pixelBase * (data.result[0][i].end - data.result[0][i].start);
		var height = 18;
		var color = _this.colors[data.result[0][i].stain];
		if(color == null) color = "purple";
		var cytoband = data.result[0][i].cytoband;
		var middleX = x+width/2;
		var endY = y+height;

		if(data.result[0][i].stain == "acen"){
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
		var text = SVG.addChild(_this.svg,"text",{
			"x":middleX,
			"y":textY,
			"font-size":10,
			"transform": "rotate(90, "+middleX+", "+textY+")",
			"fill":"black"
		});
		text.textContent = cytoband;

		x = x + width;
	}

	var positionBoxWidth = _this.tracksViewedRegion*_this.pixelBase;
	_this.positionBox = SVG.addChild(group,"rect",{
		"x":pointerPosition-(positionBoxWidth/2),
		"y":2,
		"width":positionBoxWidth,
		"height":_this.height-2,
		"stroke":"orangered",
		"stroke-width":2,
		"opacity":0.5,
		"fill":"orange"
	});
};


ChromosomeWidget.prototype.setLocation = function(item){//item.chromosome, item.position, item.species
	var needDraw = false;
	if(item.species!=null){
		this.species = item.species;
		needDraw = true;
	}
	if(item.chromosome!=null){
		this.chromosome = item.chromosome;
		needDraw = true;
	}
	if(item.position!=null){
		this.position = item.position;

		var pointerPosition = this.position*this.pixelBase+20;
		var positionBoxWidth = parseFloat(this.positionBox.getAttribute("width"));
		this.positionBox.setAttribute("x",pointerPosition-(positionBoxWidth/2));
	}
	if(needDraw){
//		$(this.svg).empty();
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}
		this.drawChromosome();
	}
};

ChromosomeWidget.prototype.setZoom = function(zoom){
	this.zoom=zoom;
	this.tracksViewedRegion = this.width/this._getPixelsbyBase(this.zoom);
	var width = this.tracksViewedRegion*this.pixelBase;
	this.positionBox.setAttribute("width",width);
	var pointerPosition = this.position*this.pixelBase+20;
	this.positionBox.setAttribute("x",pointerPosition-(width/2));
};

ChromosomeWidget.prototype._getPixelsbyBase = function(zoom){
	return this.zoomLevels[zoom];
};

ChromosomeWidget.prototype._createPixelsbyBase = function(){
	this.zoomLevels = new Array();
	var pixelsByBase = 10;
	for ( var i = 100; i >= -40; i-=5) {
		this.zoomLevels[i] = pixelsByBase;
		pixelsByBase = pixelsByBase / 2;
	}
};
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
		if(args.chromosome != null){
			this.chromosome = args.chromosome;
		}
		if(args.position != null){
			this.position = args.position;
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
		for (var i = 0; i < a.length && IsNumber == true; i++) {
			if (isNaN(a[i])) {
				IsNumber = false;
			}
		}
		if (!IsNumber) return 1;
		return (a - b);
	};
	
	var cellBaseManager = new CellBaseManager(this.species);
 	cellBaseManager.success.addEventListener(function(sender,data){
 		_this.chromosomeList = data.result;
 		_this.chromosomeList.sort(sortfunction);
 		var cellBaseManager2 = new CellBaseManager(_this.species);
 		cellBaseManager2.success.addEventListener(function(sender,data2){
 			_this.data2 = data2;
 			_this._drawSvg(_this.chromosomeList,data2);
 		});
 		cellBaseManager2.get("genomic", "region", _this.chromosomeList.toString(),"cytoband");
 	});
 	cellBaseManager.get("feature", "karyotype", "none", "chromosome");
	
};
KaryotypeWidget.prototype._drawSvg = function(chromosomeList, data2){
	var _this = this;

	var x = 20;
	var xOffset = _this.width/chromosomeList.length;
	var yMargin = 2;

	///////////
	var biggerChr = 0;
	for(var i=0, len=chromosomeList.length; i<len; i++){
		var size = data2.result[i][data2.result[i].length-1].end;
		if(size > biggerChr) biggerChr = size;
	}
	_this.pixelBase = (_this.height - 10) / biggerChr;
	_this.chrOffsetY = {};
	_this.chrOffsetX = {};

	for(var i=0, len=chromosomeList.length; i<len; i++){ //loop over chromosomes
		var chr = data2.result[i][0].chromosome;
		chrSize = data2.result[i][data2.result[i].length-1].end * _this.pixelBase;
		var y = yMargin + (biggerChr * _this.pixelBase) - chrSize;
		_this.chrOffsetY[chr] = y;
		var firstCentromere = true;
		var pointerPosition = (_this.position * _this.pixelBase);

		var group = SVG.addChild(_this.svg,"g",{"cursor":"pointer","chr":chromosomeList[i]});
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
			_this.chromosome = chrClicked;
			_this.onClick.notify({chromosome:_this.chromosome, position:clickPosition});
		});

		for ( var j=0, lenJ=data2.result[i].length; j<lenJ; j++){ //loop over chromosome objects
			var height = _this.pixelBase * (data2.result[i][j].end - data2.result[i][j].start);
			var width = 13;

			var color = _this.colors[data2.result[i][j].stain];
			if(color == null) color = "purple";

			if(data2.result[i][j].stain == "acen"){
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
		text.textContent = chr;

		_this.chrOffsetX[chr] = x;
		x += xOffset;
	}
	_this.positionBox = SVG.addChild(_this.svg,"line",{
		"x1":_this.chrOffsetX[_this.chromosome]-10,
		"y1":pointerPosition + _this.chrOffsetY[_this.chromosome],
		"x2":_this.chrOffsetX[_this.chromosome]+23,
		"y2":pointerPosition + _this.chrOffsetY[_this.chromosome],
		"stroke":"orangered",
		"stroke-width":2,
		"opacity":0.5
	});

	_this.rendered=true;
	_this.afterRender.notify();
};


KaryotypeWidget.prototype.setLocation = function(item){//item.chromosome, item.position, item.species
	var needDraw = false;
	if(item.species!=null){
		this.species = item.species;
		needDraw = true;
	}
	if(item.chromosome!=null){
		this.chromosome = item.chromosome;
		
		if(item.species==null){
			this.positionBox.setAttribute("x1",this.chrOffsetX[this.chromosome]-10);
			this.positionBox.setAttribute("x2",this.chrOffsetX[this.chromosome]+23);
		}
	}
	if(item.position!=null){
		this.position = item.position;
		
		if(item.species==null){
			var pointerPosition = this.position * this.pixelBase + this.chrOffsetY[this.chromosome];
			this.positionBox.setAttribute("y1",pointerPosition);
			this.positionBox.setAttribute("y2",pointerPosition);
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


KaryotypeWidget.prototype.updatePositionBox = function(item){
	this.chromosome = item.chromosome;
	this.position = item.position;
	this.positionBox.setAttribute("x1",this.chrOffsetX[this.chromosome]-10);
	this.positionBox.setAttribute("x2",this.chrOffsetX[this.chromosome]+23);
	var pointerPosition = this.position * this.pixelBase + this.chrOffsetY[this.chromosome];
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
function DataSource() {
	
};

DataSource.prototype.fetch = function(){

};
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
	}
	this.featureCache =  new FeatureCache(argsFeatureCache);
	this.onGetData = new Event();
};

CellBaseAdapter.prototype.getData = function(args){
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
	
	var type = "data";
	if(args.histogram){
		type = "histogram"+args.interval;
	}
	if(args.transcript){
		type = "withTranscripts";
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
			var items = this.featureCache.getFeaturesByChunk(key, type);
//			console.time("concat");
			itemList = itemList.concat(items);
//			console.timeEnd("concat");
		}
	}
//	//notify all chunks
//	if(itemList.length>0){
//		this.onGetData.notify({data:itemList, params:this.params, cached:true});
//	}
	
	
	//CellBase data process
	var cellBaseManager = new CellBaseManager(this.species,{host: this.host});
	cellBaseManager.success.addEventListener(function(sender,data){
		console.timeEnd("cellbase");
		console.time("insertCache"+" "+data.resource);
		var type = "data";
		if(data.params.histogram){
			type = "histogram"+data.params.interval;
		}
		if(data.params.transcript){
			type = "withTranscripts";
		}
		
		//XXX quitar cuando este arreglado el ws
		if(data.params.histogram == true){
			data.result = [data.result];
		}
		//XXX
		
		var queryList = [];
//		console.log("query length "+data.query.length);
//		console.log("data length "+data.result.length);
//		console.log("data "+data.result);
		for(var i = 0; i < data.query.length; i++) {
			var splitDots = data.query[i].split(":");
			var splitDash = splitDots[1].split("-");
			queryList.push({chromosome:splitDots[0],start:splitDash[0],end:splitDash[1]});
		}
//		console.log(_this.featureCache.cache);

		
		for(var i = 0; i < data.result.length; i++) {
			
			//Check if is a single object
			if(data.result[i].constructor != Array){
				data.result[i] = [data.result[i]];
			}
			
			if(data.resource == "gene" && data.params.transcript!=null){
				for ( var j = 0, lenj = data.result[i].length; j < lenj; j++) {
					for (var t = 0, lent = data.result[i][j].transcripts.length; t < lent; t++){
						data.result[i][j].transcripts[t].featureType = "transcript";
						//for de exones
						for (var e = 0, lene = data.result[i][j].transcripts[t].exonToTranscripts.length; e < lene; e++){
							data.result[i][j].transcripts[t].exonToTranscripts[e].exon.featureType = "exon";
						}
					}
				}
			}
			
			_this.featureCache.putFeaturesByRegion(data.result[i], queryList[i], data.resource, type);
			var items = _this.featureCache.getFeaturesByRegion(queryList[i], type);
			console.timeEnd("insertCache"+" "+data.resource);
			if(items != null){
				itemList = itemList.concat(items);
			}
		}
		if(itemList.length > 0){
			_this.onGetData.notify({data:itemList, params:_this.params, cached:false});
		}
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
		console.time("cellbase");
		cellBaseManager.get(this.category, this.subCategory, querys, this.resource, this.params);
	}else{
		if(itemList.length > 0){
			this.onGetData.notify({data:itemList, params:this.params});
		}
	}
};FileDataSource.prototype.fetch = DataSource.prototype.fetch;

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
	if(this.file.size <= 104857600){
		if(async){
			var  reader = new FileReader();
			reader.onload = function(evt) {
				_this.success.notify(evt.target.result);
			};
			reader.readAsText(this.file, "UTF-8");
		}else{
			var reader = new FileReaderSync();
			return reader.readAsText(this.file, "UTF-8");
		}
	}else{
		_this.error();
		_this.error.notify();
	}
};
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
UrlDataSource.prototype.fetch = DataSource.prototype.fetch;

function UrlDataSource(url, args) {
	DataSource.prototype.constructor.call(this);
	
	this.url = url;
	this.proxy = "http://ws-beta.bioinfo.cipf.es/cellbase/rest/v1/utils/proxy?url=";
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
VCFDataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;

function VCFDataAdapter(dataSource, args){
	FeatureDataAdapter.prototype.constructor.call(this, dataSource, args);
	var _this = this;
	
	this.async = true;
	debugger
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
	
	
};

VCFDataAdapter.prototype.parse = function(data){
	var _this = this;
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
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
						"ref": 			fields[3], 
						"alt": 			fields[4], 
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
};
GFF2DataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;

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
	
};

GFF2DataAdapter.prototype.parse = function(data){
	var _this = this;
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			var chromosome = fields[0].replace("chr", "");

			//NAME  SOURCE  TYPE  START  END  SCORE  STRAND  FRAME  GROUP
			var feature = {
					"chromosome": chromosome, 
					"label": fields[2], 
					"start": parseInt(fields[3]), 
					"end": parseInt(fields[4]), 
					"score": parseFloat(fields[5]),
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
};
GFF3DataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;

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
	
};

GFF3DataAdapter.prototype.parse = function(data){
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

			
			//NAME  SOURCE  TYPE  START  END  SCORE  STRAND  FRAME  GROUP
			var feature = {
					"chromosome": chromosome, 
					"label": fields[2], 
					"start": parseInt(fields[3]), 
					"end": parseInt(fields[4]), 
					"score": parseFloat(fields[5]),
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
};
GTFDataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;

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
};

GTFDataAdapter.prototype.parse = function(data){
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

			
			//NAME  SOURCE  TYPE  START  END  SCORE  STRAND  FRAME  GROUP
			var feature = {
					"chromosome": chromosome, 
					"label": fields[2], 
					"start": parseInt(fields[3]), 
					"end": parseInt(fields[4]), 
					"score": parseFloat(fields[5]),
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
};
BEDDataAdapter.prototype.getData = FeatureDataAdapter.prototype.getData;

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
	
};

BEDDataAdapter.prototype.parse = function(data){
	var _this = this;
	var dataType = "data";
	var lines = data.split("\n");
//	console.log("creating objects");
	for (var i = 0; i < lines.length; i++){
		var line = lines[i].replace(/^\s+|\s+$/g,"");
		if ((line != null)&&(line.length > 0)){
			var fields = line.split("\t");
			var chromosome = fields[0].replace("chr", "");
			
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
};
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
};function DasAdapter(args){
	this.gzip = true;
	
	this.proxy = "http://ws-beta.bioinfo.cipf.es/cellbase/rest/v1/utils/proxy?url=";
	
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
			var items = this.featureCache.getFeaturesByChunk(key, type);
//			console.time("concat");
			itemList = itemList.concat(items);
//			console.timeEnd("concat");
		}
	}
//	//notify all chunks
	if(itemList.length>0){
		this.onGetData.notify({data:itemList, params:this.params, cached:true});
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
						_this.featureCache.putFeaturesByRegion(result, region, resource, type);
						console.log(_this.featureCache.cache);
						var items = _this.featureCache.getFeaturesByRegion(region, type);
						if(items != null){
							_this.onGetData.notify({data:items, params:this.params, cached:false});
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
	}
	this.featureCache =  new FeatureCache(argsFeatureCache);
	this.onGetData = new Event();
};

CellBaseAdapter.prototype.getData = function(args){
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
	
	var type = "data";
	if(args.histogram){
		type = "histogram"+args.interval;
	}
	if(args.transcript){
		type = "withTranscripts";
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
			var items = this.featureCache.getFeaturesByChunk(key, type);
//			console.time("concat");
			itemList = itemList.concat(items);
//			console.timeEnd("concat");
		}
	}
//	//notify all chunks
//	if(itemList.length>0){
//		this.onGetData.notify({data:itemList, params:this.params, cached:true});
//	}
	
	
	//CellBase data process
	var cellBaseManager = new CellBaseManager(this.species,{host: this.host});
	cellBaseManager.success.addEventListener(function(sender,data){
		console.timeEnd("cellbase");
		console.time("insertCache"+" "+data.resource);
		var type = "data";
		if(data.params.histogram){
			type = "histogram"+data.params.interval;
		}
		if(data.params.transcript){
			type = "withTranscripts";
		}
		
		//XXX quitar cuando este arreglado el ws
		if(data.params.histogram == true){
			data.result = [data.result];
		}
		//XXX
		
		var queryList = [];
//		console.log("query length "+data.query.length);
//		console.log("data length "+data.result.length);
//		console.log("data "+data.result);
		for(var i = 0; i < data.query.length; i++) {
			var splitDots = data.query[i].split(":");
			var splitDash = splitDots[1].split("-");
			queryList.push({chromosome:splitDots[0],start:splitDash[0],end:splitDash[1]});
		}
//		console.log(_this.featureCache.cache);

		
		for(var i = 0; i < data.result.length; i++) {
			
			//Check if is a single object
			if(data.result[i].constructor != Array){
				data.result[i] = [data.result[i]];
			}
			
			if(data.resource == "gene" && data.params.transcript!=null){
				for ( var j = 0, lenj = data.result[i].length; j < lenj; j++) {
					for (var t = 0, lent = data.result[i][j].transcripts.length; t < lent; t++){
						data.result[i][j].transcripts[t].featureType = "transcript";
						//for de exones
						for (var e = 0, lene = data.result[i][j].transcripts[t].exonToTranscripts.length; e < lene; e++){
							data.result[i][j].transcripts[t].exonToTranscripts[e].exon.featureType = "exon";
						}
					}
				}
			}
			
			_this.featureCache.putFeaturesByRegion(data.result[i], queryList[i], data.resource, type);
			var items = _this.featureCache.getFeaturesByRegion(queryList[i], type);
			console.timeEnd("insertCache"+" "+data.resource);
			if(items != null){
				itemList = itemList.concat(items);
			}
		}
		if(itemList.length > 0){
			_this.onGetData.notify({data:itemList, params:_this.params, cached:false});
		}
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
		console.time("cellbase");
		cellBaseManager.get(this.category, this.subCategory, querys, this.resource, this.params);
	}else{
		if(itemList.length > 0){
			this.onGetData.notify({data:itemList, params:this.params});
		}
	}
};VCFFileWidget.prototype.getTitleName = FileWidget.prototype.getTitleName;
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
		_this.btnOk.enable();
	});
};


VCFFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	debugger
	this.adapter = new VCFDataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
	this._loadChartInfo();
	this.btnOk.enable();
};

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
		_this.btnOk.enable();
	});
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
};GTFFileWidget.prototype.getTitleName = FileWidget.prototype.getTitleName;
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
		_this.btnOk.enable();
	});
};


GTFFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	this.adapter = new GTFDataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
	this._loadChartInfo();
	this.btnOk.enable();
};

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
		_this.btnOk.enable();
	});
};


BEDFileWidget.prototype.loadFileFromServer = function(data){
	this.file = {name:data.filename};
	this.adapter = new BEDDataAdapter(new StringDataSource(data.data),{async:false,species:this.viewer.species});
	this._loadChartInfo();
	this.btnOk.enable();
};function InfoWidget(targetId, species, args){
	this.id = "InfoWidget_" + Math.round(Math.random()*10000000);
	this.targetId = null;
	
	this.species=species;
	
	this.title = null;
	this.featureId = null;
	this.width = 800;
	this.height = 430;
	
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
	case "hsa": 
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
	case "mmu":
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
	case "dre":
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
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{externalName}</span> &nbsp; <span class="emph s120"> {stableId} </span></span>',
			' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Location/View?g={stableId}">Ensembl</a>',
			' &nbsp; <a target="_blank" href="http://wikipathways.org//index.php?query={externalName}&species='+this.wikipathwaysSpecie+'&title=Special%3ASearchPathways&doSearch=1">Wikipathways</a>',
			'</p><br>',
		    '<p><span class="w75 dis s90">Location: </span> <span class="">{chromosome}:{start}-{end} </span><span style="margin-left:50px" class=" dis s90">Strand: </span> {strand}</p>',
		    '<p><span class="w75 dis s90">Biotype: </span> {biotype}</p>',
		    '<p><span class="w75 dis s90">Description: </span> <span><tpl if="description == &quot;&quot;">No description available</tpl>{description}</span></p>',
		    '<br>',
		    '<p><span class="w75 dis s90">Source: </span> <span class="s110">{source}</span></p>',
		    '<p><span class="w75 dis s90">External DB: </span> {externalDb}</p>',
		    '<p><span class="w75 dis s90">Status: </span> {status}</p>' // +  '<br>'+str
	);
};
InfoWidget.prototype.getTranscriptTemplate = function (){
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{externalName}</span> &nbsp; <span class="emph s120"> {stableId} </span></span>',
		    ' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Transcript/Transcript?t={stableId}">Ensembl</a>',
		    ' &nbsp; <a target="_blank" href="http://wikipathways.org//index.php?query={externalName}&species='+this.wikipathwaysSpecie+'&title=Special%3ASearchPathways&doSearch=1">Wikipathways</a>',
		    '</p><br>',
		    '<p><span class="w100 dis s90">Location: </span> <span class="">{chromosome}:{start}-{end} </span><span style="margin-left:50px" class=" dis s90">Strand: </span> {strand}</p>',
		    '<p><span class="w100 dis s90">Biotype: </span> {biotype}</p>',
		    '<p><span class="w100 dis s90">Description: </span> <span><tpl if="description == &quot;&quot;">No description available</tpl>{description}</span></p>',
		    '<br>',
		    '<p><span class="w100 dis s90">CDS &nbsp; (start-end): </span> {codingRegionStart}-{codingRegionEnd} <span style="margin-left:50px" class="w100 dis s90">CDNA (start-end): </span> {cdnaCodingStart}-{cdnaCodingEnd}</p>',
		    '<br>',
		    '<p><span class="w100 dis s90">External DB: </span> {externalDb}</p>',
		    '<p><span class="w100 dis s90">Status: </span> {status}</p><br>'// +  '<br>'+str
		);
};
InfoWidget.prototype.getSnpTemplate = function (){
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{name}</span></span>',
		    ' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Variation/Summary?v={name}">Ensembl</a>',
		    '</p><br>',
		    '<p><span class="w140 dis s90">Location: </span> <span class="">{chromosome}:{start}-{end} </span><span style="margin-left:50px" class=" dis s90">Strand: </span> {strand}</p>',
		    '<p><span class="w140 dis s90">Source: </span> <span class="s110">{source}</span></p>',
		    '<br>',
		    '<p><span class="w140 dis s90">Map weight: </span> {mapWeight}</p>',
		    '<p><span class="w140 dis s90">Allele string: </span> {alleleString}</p>',
		    '<p><span class="w140 dis s90">Ancestral allele: </span> {ancestralAllele}</p>',
		    '<p><span class="w140 dis s90">Display So consequence: </span> {displaySoConsequence}</p>',
		    '<p><span class="w140 dis s90">So consequence type: </span> {soConsequenceType}</p>',
		    '<p><span class="w140 dis s90">Display consequence: </span> {displayConsequence}</p>',
		    '<p><span class="w140 dis s90">Sequence: </span> {sequence}</p>' // +  '<br>'+str
		);
};

InfoWidget.prototype.getExonTemplate = function (){
	return new Ext.XTemplate(
			'<span><span class="panel-border-bottom"><span class="ssel s110">{stableId}</span></span></span>',
			'<span><span style="margin-left:30px" class="dis s90"> Location: </span> <span class="">{chromosome}:{start}-{end} </span></span>',
			'<span><span style="margin-left:30px" class="dis s90"> Strand: </span> {strand}</span>'
		);
};

InfoWidget.prototype.getProteinTemplate = function (){
	return new Ext.XTemplate(
			 '<p><span class="panel-border-bottom"><span class="ssel s130">{name}</span> &nbsp; <span class="emph s120"> {primaryAccession} </span></span></p>',
			 '<br>',
			 '<p><span class="w100 dis s90">Full name: </span> <span class="">{fullName}</span></p>',
			 '<p><span class="w100 dis s90">Gene name: </span> <span class="">{geneName}</span></p>',
			 '<p><span class="w100 dis s90">Organism: </span> <span class="">{organism}</span></p>'
		);
};


InfoWidget.prototype.getVCFVariantTemplate = function (){
	return new Ext.XTemplate(
			'<p><span><span class="panel-border-bottom"><span class="ssel s130">{chromosome}:{start}-{alt}</span> &nbsp; <span class="emph s120"> {label} </span></span></span></p><br>',
			'<p><span class="w75 dis s90">Alt: </span> {alt}</p>',
			'<p><span class="w75 dis s90">Ref: </span> {ref}</p>',
			'<p><span class="w75 dis s90">Quality: </span> {quality}</p>',
			'<p><span class="w75 dis s90">Format: </span> {format}</p>',
			'<p><span class="w75 dis s90">Samples: </span> {samples}</p>',
			'<p><span class="w75 dis s90">Info: <br></span> {info}</p>'
		);
};

InfoWidget.prototype.getPWMTemplate = function (){
	return new Ext.XTemplate(
			 '<p><span class="panel-border-bottom"><span class="ssel s130">{accession}</span> &nbsp; <span class="emph s120"> {tfName} </span></span></p>',
			 '<br>',
			 '<p><span class="w100 dis s90">Type: </span> <span class="">{source}</span></p>',
			 '<p><span class="w100 dis s90">Source: </span> <span class="">{type}</span></p>',
			 '<p><span class="w100 dis s90">Description: </span> <span class="">{description}</span></p>',
			 '<p><span class="w100 dis s90">Length: </span> <span class="">{length}</span></p>',
			 '<p><span class="w100 dis s90">Frequencies: </span> <span class="">{[this.parseFrequencies(values.frequencies)]}</span></p>',
			 {
				 parseFrequencies: function(values){
					 return '<p>'+values.replace(/,/gi, '<br>')+"</p>";
				 }
			 }
		);
};

InfoWidget.prototype.getProteinXrefTemplate = function (){
	return new Ext.XTemplate(
			'<p><span class="w75 emph s100">{[values.source.toUpperCase()]}</span> &nbsp; <span class="emph w125 s100"> {[this.generateLink(values)]} <span class="info">&raquo;</span> </span></p>',
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
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{[this.getStableId(values)]}</span> &nbsp; <span class="emph s120"> {stableId} </span></span>',
		    ' &nbsp; <a target="_blank" href="http://www.ensembl.org/'+this.ensemblSpecie+'/Transcript/Transcript?t={[this.getStableId(values)]}">Ensembl</a>',
		    '</p><br>',
		    '<p><span class="w140 dis s90">CDS &nbsp; (start : end): </span> {cdsStart} : {cdsEnd} <span style="margin-left:50px" class="w100 dis s90">cDNA (start : end): </span> {cdnaStart} : {cdnaEnd}</p>',
		    '<p><span class="w140 dis s90">Translation (start : end): </span> {translationStart} : {translationEnd}</p>',
		    '<p><span class="w140 dis s90">Peptide allele: </span> {peptideAlleleString}</p>',
		    '<p><span class="w140 dis s90">Alt. peptide allele: </span> {alternativePeptideAlleleString}</p>',
			'<p><span class="w140 dis s90">Codon: </span> {codon}</p>',
			'<p><span class="w140 dis s90">Reference codon: </span> {referenceCodon}</p>',
			'<p><span class="w140 dis s90">Polyphen prediction: </span> {polyphenPrediction}',
			'<span style="margin-left:50px" class="w140 dis s90">Polyphen score: </span> {polyphenScore}</p>',
			'<p><span class="w140 dis s90">Sift prediction: </span> {siftPrediction}',
			'<span style="margin-left:50px" class="w140 dis s90">Sift score: </span> {siftScore}</p>',
		    {
		    	getStableId: function(values){
		    		if(values.transcript!=""){
		    			return values.transcript.stableId;
		    		}
		    		return "Intergenic SNP";
		    	}
		    }
		);
};


InfoWidget.prototype.getConsequenceTypeTemplate = function (){
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{transcript.stableId}</span> &nbsp; <span class="emph s120"> {consequenceType.description} </span></span><br><br>',
		    '<p><span class="w100 dis s90">SO accesion: </span> {consequenceType.soAccession}</p>',
		    '<p><span class="w100 dis s90">SO term: </span> {consequenceType.soTerm}</p>',
		    '<p><span class="w100 dis s90">Feature So term: </span> {consequenceType.featureSoTerm}</p>',
		    '<p><span class="w100 dis s90">NCBI term: </span> {consequenceType.ncbiTerm}</p>',
		    '<p><span class="w100 dis s90">Rank: </span> {consequenceType.rank}</p><br>'
		);
};


InfoWidget.prototype.getPhenotypeTemplate = function (){
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{phenotypeDescription}</span> &nbsp; <span class="emph s120"> {source} </span></span><br><br>',
			'<p><span class="w150 dis s90">PValue: </span>{PValue}</p>',
			'<p><span class="w150 dis s90">Assoc. gene name: </span>{associatedGeneName}</p>',
			'<p><span class="w150 dis s90">Assoc. variant risk allele: </span>{associatedVariantRiskAllele}</p>',
			'<p><span class="w150 dis s90">Phenotype description: </span>{phenotypeDescription}</p>',
			'<p><span class="w150 dis s90">Phenotype name: </span>{phenotypeName}</p>',
			'<p><span class="w150 dis s90">Risk allele freq in controls: </span>{riskAlleleFrequencyInControls}</p>',
			'<p><span class="w150 dis s90">Source: </span>{source}</p>',
			'<p><span class="w150 dis s90">Study name: </span>{studyName}</p>',
			'<p><span class="w150 dis s90">Study type: </span>{studyType}</p>',
			'<p><span class="w150 dis s90">Study URL: </span>{studyUrl}</p>',
			'<p><span class="w150 dis s90">Study description: </span>{studyDescription}</p>'
		);
};

InfoWidget.prototype.getPopulationTemplate = function (){
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{population}</span> &nbsp; <span class="emph s120"> {source} </span></span><br><br>',
		    '<p><span class="w140 dis s90">Ref allele:  </span>{refAllele} ({refAlleleFrequency})</p>',
		    '<p><span class="w140 dis s90">Other allele:  </span>{otherAllele} ({otherAlleleFrequency})</p>',
		    '<p><span class="w140 dis s90">Ref allele homozygote:  </span>{refAlleleHomozygote} ({refAlleleHomozygoteFrequency})</p>',
		    '<p><span class="w140 dis s90">Allele heterozygote:  </span>{alleleHeterozygote} ({alleleHeterozygoteFrequency})</p>',
			 '<p><span class="w140 dis s90">Other allele homozygote:  </span>{otherAlleleHomozygote} ({otherAlleleHeterozygoteFrequency})</p>',
//			 'TODO cuidado <p><span class="w140 dis s90">other allele heterozygote Frequency:  </span>{otherAlleleHeterozygoteFrequency}</p>',
			 '<p><span class="w140 dis s90">Source:  </span>{source}</p>',
			 '<p><span class="w140 dis s90">Population:  </span>{population}</p>'
		);
};

//not used
InfoWidget.prototype.getVariantEffectTemplate = function (){
		
	return new Ext.XTemplate(
		    '<p><span class="panel-border-bottom"><span class="ssel s130">{consequenceTypeObo}</span> &nbsp; <span class="emph s120"> {featureBiotype} </span></span><br><br>'
		);
};
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
	                { text: "Transcripts"}
	            ] },
	            { text: "Functional information", children: [
	                { text: "GO"},
	                { text: "Reactome"},
	                { text: "Interpro"}
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
//			case "GO": this.panel.add(this.getGoGrid().show()); break;
			case "GO": this.panel.add(this.getXrefGrid(this.data.go, "GO").show());  break;
			case "Interpro": this.panel.add(this.getXrefGrid(this.data.interpro, "Interpro").show());  break;
			case "Reactome": this.panel.add(this.getXrefGrid(this.data.reactome, "Reactome").show());  break;
			case "TFBS": this.panel.add(this.getTfbsGrid(this.data.tfbs).show());  break;
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


GeneInfoWidget.prototype.getXrefGrid = function(data, dbname){
	if(data.length<=0){
		return this.notFoundPanel;
	}
    if(this[dbname+"Grid"]==null){
    	var groupField = '';
    	var modelName = dbname;
    	var fields = ['description','displayId'];
    	var columns = [
    	               {header : 'Display Id',dataIndex: 'displayId',flex:1},
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
    if(this.tfbsGrid==null){
    	var groupField = "";
    	var modelName = "TFBS";
	    var fields = ["chromosome","start","end","strand","tfName","relativeStart","relativeEnd","targetGeneName","score","sequence"];
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
    		  url:new CellBaseManager().host+'/latest/'+_this.species+'/feature/id/'+this.query+'/xref?dbname=pdb&header=false',
//    		  data: data,
//    		  dataType: dataType,
    		  async:false,
    		  success: function(data){
    			if(data!=""){
//      	    		console.log(data.trim());
      	    		pdbs = data.trim().split("\n");
//      	    		console.log(pdbs);
      	    		
      	    		for ( var i = 0; i < pdbs.length; i++) {
      	    			var pdb_name=pdbs[i].trim();
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
		_this.dataReceived(JSON.parse(data.result));//TODO
	});
	cellBaseManager.get("feature","gene", this.query, "fullinfo");
};
GeneInfoWidget.prototype.dataReceived = function (data){
	this.data=data[0][0];
	console.log(this.data);
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};ProteinInfoWidget.prototype.draw = InfoWidget.prototype.draw;
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
};SnpInfoWidget.prototype.draw = InfoWidget.prototype.draw;
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
	            { text: "Annotated phenotype"},
	            { text: "Population frequency"}
	           
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
			case "Transcripts": this.panel.add(this.getSnpTranscriptPanel(this.data.snptotranscript).show()); break;
			case "Consequence type": this.panel.add(this.getConsequenceTypePanel(this.data.snptotranscript).show()); break;
			case "Annotated phenotype": this.panel.add(this.getPhenotypePanel(this.data.phenotype).show()); break;
			case "Population frequency": this.panel.add(this.getPopulationPanel(this.data.population).show()); break;
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
		_this.dataReceived(JSON.parse(data.result));//TODO
	});
	cellBaseManager.get("feature","snp", this.query, "fullinfo");
};
SnpInfoWidget.prototype.dataReceived = function (data){
	var mappedSnps = data[0];
	for ( var i = 0; i < mappedSnps.length; i++) {
		if (mappedSnps[i].chromosome == this.feature.chromosome && mappedSnps[i].start == this.feature.start && mappedSnps[i].end == this.feature.end ){
			this.data=mappedSnps[i];
			console.log(mappedSnps[i]);
		}
	}
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};
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
	                 { text: "Exons"}
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
			case "GO": this.panel.add(this.getXrefGrid(this.data.go, "GO").show());  break;
			case "Interpro": this.panel.add(this.getXrefGrid(this.data.interpro, "Interpro").show());  break;
			case "Reactome": this.panel.add(this.getXrefGrid(this.data.reactome, "Reactome").show());  break;
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
		_this.dataReceived(JSON.parse(data.result));//TODO
	});
	cellBaseManager.get("feature","transcript", this.query, "fullinfo");
};
TranscriptInfoWidget.prototype.dataReceived = function (data){
	this.data=data[0];
	console.log(this.data);
	this.optionClick({"text":"Information","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};



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
function CellBaseManager(species, args) {
//	console.log(species);
	
	this.host = CELLBASE_HOST;
	
	this.version = "latest";
	this.species = species;
	
	this.category = null;
	this.subcategory = null;

	// commons query params
	this.contentformat = "json";
	this.fileformat = "";
	this.outputcompress = false;
	this.dataType = "script";

	this.query = "";
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
		if(query instanceof Array){
				this.originalQuery = query;
				this.batching = true;
				this.results= new Array();
				this.getMultiple(category, subcategory, query, resource);
		}
		else{
				query = new String(query);
				query = query.replace(/\s/g, "");
				var querySplitted = query.split(",");
				this.originalQuery = querySplitted;
				if (this.maxQuery <querySplitted.length){
					this.batching = true;
					this.getMultiple(category, subcategory, querySplitted, resource, callbackFunction);
				}
				else{
					this.batching = false;
					this.getSingle(category, subcategory, query, resource, callbackFunction);
				}
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
		this._callServer(url, batchID, callbackFunction);
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
//		this.params["outputcompress"] = this.outputcompress;//esto ya lo hace el servidor y el navegador por defecto

//			jQuery.support.cors = true;
			url = url + this.getQuery(this.params,url);
			$.ajax({
				type : "GET",
				url : url,
				async : this.async,
				success : function(data, textStatus, jqXHR) {
//					try{
						if(data==""){console.log("data is empty");data="[]";}
						var jsonResponse = JSON.parse(data);
//					console.log(jsonResponse);
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
//					}
//					catch(e){
//						console.log("CellBaseManager: data returned was not json: "+url+" :");
//						console.log(data+" END");
//					}
					
				},
				complete : function() {
					_this.completed.notify();
					
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("CellBaseManager: Ajax call returned : "+errorThrown+'\t'+textStatus+'\t'+jqXHR.statusText+" END");
					_this.error.notify();
					
				}
			});
			
		
//		$.ajax({
//			type : "GET",
//			url : url,
//			async : this.async,
////			dataType : this.dataType,
//			data : params,
////			jsonp : "callback",
//			success : function() {
//				if( typeof( response ) != 'undefined'  ){
////					if (callbackFunction!=null){
////						callbackFunction(response);
////					}
//					
//					if (_this.batching){
//						_this.batchSuccessed.notify({data:response, id:batchID});
//					}else{
//						_this.successed.notify(response);
//					}
//				}
//				else{
//					_this.error.notify();
//				}
//			},
//			complete : function() {
//				_this.completed.notify();
//				
//			},
//			error : function() {
//				_this.error.notify();
//				
//			}
//		});
		
		console.log(url);
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
			query+=key+"="+paramsWS[key]+"&";
	}
	if(query!="")
		query = chr+query.substring(0, query.length-1);
	return query;
};
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
	});function GenomicAttributesWidget(species, args){
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
				chromosome:_this.viewer.chromosome,
				position:_this.viewer.position
			});
			_this.karyotypeWidget.onClick.addEventListener(function(sender,data){
				_this.viewer.onLocationChange.notify({position:data.position,chromosome:data.chromosome,sender:"KaryotypePanel"});
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
};GenotypeGenomicAttributesWidget.prototype.draw = GenomicAttributesWidget.prototype.draw;
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
};function ListPanel(species, args) {
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
				feature.featureType = cbResponse.resource;
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
				feature.featureType = cbResponse.resource;
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
};function ListWidget(species, args) {
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
};GenomicListPanel.prototype._getGeneGrid 				=       ListPanel.prototype._getGeneGrid;
GenomicListPanel.prototype._localize 				=       ListPanel.prototype._localize;
GenomicListPanel.prototype.setTextInfoBar 			=       ListPanel.prototype.setTextInfoBar;
GenomicListPanel.prototype._getStoreContent 			=       ListPanel.prototype._getStoreContent;
GenomicListPanel.prototype._render  					=       ListPanel.prototype._render;
GenomicListPanel.prototype.draw  					=       ListPanel.prototype.draw;

function GenomicListPanel(args) {
	ListPanel.prototype.constructor.call(this, args);
};


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
};function InputListWidget(args) {
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
};function GenomeMaps(targetId,args){
	var _this=this;
	this.id = "GenomeMaps"+ Math.round(Math.random()*10000);
	this.suiteId = 9;
	this.title="Genome Maps";
	this.description="RC";
	this.wum=true;
	this.version="2.1.2";

	this.args = args;
	
	this.width =  $(window).width();
	this.height = $(window).height();
	this.targetId = document.body;
	
	if (targetId != null){
		this.targetId=targetId;
	}
//	if (args != null){
//		if(args.wum != null){
//			this.wum = args.wum;
//		}
//	}
	
	if (args != null){
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.wum != null) {
			this.wum = args.wum;
		}
	}
	
	//Parse query params to get location.... Also in AVAILABLE_SPECIES, an example location is set.
	var url = $.url();
	
	var url_cbhost = url.param('CELLBASE_HOST');
	if(url_cbhost != null) {
		CELLBASE_HOST = url_cbhost;
	}
	
	var location = url.param('location');
	if(location != null) {
		var position = location.split(":")[1];
		var chromosome = location.split(":")[0];
	}
	
	var speciesObj = DEFAULT_SPECIES;
	var urlSpecies = url.param('species');
	if(urlSpecies != null){
		//TODO change to object AVAILABLE SPECIES
		for(var i = 0; i < AVAILABLE_SPECIES.length; i++){
			if(AVAILABLE_SPECIES[i].species==urlSpecies){
				speciesObj=AVAILABLE_SPECIES[i];
				break;
			}
		}
	}
	console.log(speciesObj);
//	console.log(Ext.ComponentManager.each(function(a){console.log(a);}));
//	console.log(Ext.ComponentManager.getCount());
	
//	if (this.wum==true){
	this.headerWidget = new HeaderWidget({
		appname: this.title,
		description: this.description,
		version:this.version,
		suiteId : this.suiteId
	});
	

//	if($.cookie("gm_settings")){
//		var species = JSON.parse($.cookie("gm_settings")).species;
//	}else{
//		var species = AVAILABLE_SPECIES[0];
//	}
	
	this.genomeViewer = new GenomeViewer(this.id+"gvDiv", speciesObj,{
		position:position,
		chromosome:chromosome,
		toolbar:this.getMenuBar(),
		version:this.version,
		availableSpecies: AVAILABLE_SPECIES,
		height:this.height-this.headerWidget.height,
		width:this.width
	});
	
	/**Atach events i listen**/
	this.headerWidget.onLogin.addEventListener(function (sender){
		Ext.example.msg('Welcome', 'You logged in');
	});
	
	this.headerWidget.onLogout.addEventListener(function (sender){
		Ext.example.msg('Good bye', 'You logged out');
	});
//	}
	
	//SPECIE EVENT
	this.genomeViewer.onSpeciesChange.addEventListener(function(sender,data){
		_this._setTracks();
		_this.setTracksMenu();
		_this.headerWidget.setDescription(_this.genomeViewer.speciesName);
	});
	
	//Events i listen
//	this.genomeViewer.onLocationChange.addEventListener(function(sender,data){
//	});
	
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
};



GenomeMaps.prototype.draw = function(){
	var _this = this;
	if(this._panel==null){
		
		var gvContainer = Ext.create('Ext.container.Container', {
			id:this.id+"gvContainer",
			html : '<div id="'+this.id+'gvDiv"></div>'
		});
		
		this._panel = Ext.create('Ext.panel.Panel', {
			id:this.id+"_panel",
			renderTo:this.targetId,
//			renderTo:Ext.getBody(),
//		layout: { type: 'vbox',align: 'stretch'},
			border:false,
			width:this.width,
			height:this.height,
			items:[this.headerWidget.getPanel(),gvContainer]
		});
	}
	
	this.headerWidget.setDescription(this.genomeViewer.speciesName);
	$("#"+this.headerWidget.id+"appTextItem").qtip({
		content: '<span class="info">'+this.version+'</span>',
		position: {my:"bottom center",at:"top center",adjust: { y: 0, x:-25 }}
		
	});
	
	this.genomeViewer.afterRender.addEventListener(function(sender,event){
		Ext.getCmp(_this.genomeViewer.id+"versionLabel").setText('<span class="info">Genome Maps v'+_this.version+'</span>');
		_this._setTracks();
		_this._setRegionTracks();
		_this.genomeViewer.onSvgRemoveTrack.addEventListener(function(sender,trackId){
			Ext.getCmp(_this.id+trackId+"menu").setChecked(false);
		});
	});
	this.setTracksMenu();
//	this.setDASMenu();
	this.setPluginsMenu();
	this.genomeViewer.draw();
};


GenomeMaps.prototype.setSize = function(width,height){
	if(width<500){width=500;}
	if(width>2400){width=2400;}//if bigger does not work TODO why?
	
	this.width=width;
	this.height=height;
	
	this._panel.setSize(width,height);
	this.genomeViewer.setSize(width,height-this.headerWidget.height);
	this.headerWidget.setWidth(width);
};

GenomeMaps.prototype._setRegionTracks= function(){
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
	this.genomeViewer.trackSvgLayout2.addTrack(geneTrack,{
		id:"gene",
		type:"gene",
		featuresRender:"MultiFeatureRender",
		histogramZoom:10,
		labelZoom:20,
		height:150,
		visibleRange:{start:0,end:100},
		titleVisibility:'hidden',
		featureTypes:FEATURE_TYPES
	});
};

GenomeMaps.prototype._setTracks= function(){
	//Load initial TRACKS config
	var _this = this;
	var species = this.genomeViewer.species;
	var categories = TRACKS[SPECIES_TRACKS_GROUP[species]];
	
	for (var i=0, leni=categories.length; i<leni; i++) {
		var sources = [];
		for ( var j = 0, lenj=categories[i].tracks.length; j<lenj; j++){
			var id = categories[i].tracks[j].id;
			var checked = categories[i].tracks[j].checked;
			var disabled = categories[i].tracks[j].disabled;
			
			if(checked && !disabled && !this.genomeViewer.checkRenderedTrack(id)){
				this.addTrack(id);
			}else if((!checked || disabled) && this.genomeViewer.checkRenderedTrack(id)){
				this.removeTrack(id);
			}
		}
	}
	
	//Load initial DAS_TRACKS config
	var das_tracks = DAS_TRACKS;
	for (var i = 0, leni = das_tracks.length; i < leni; i++) {
		if(das_tracks[i].species == species){
			for ( var j = 0, lenj = das_tracks[i].categories.length; j < lenj; j++){
				var sourceName, sourceUrl, checked;
				for ( var k = 0, lenk = das_tracks[i].categories[j].sources.length; k < lenk; k++){
					sourceName = das_tracks[i].categories[j].sources[k].name;
					sourceUrl = das_tracks[i].categories[j].sources[k].url;
					checked = das_tracks[i].categories[j].sources[k].checked;
					
					if(checked){
						this.addDASTrack(sourceName, sourceUrl);
					}
				}
			}
			break;
		}
	}

};

GenomeMaps.prototype.removeTrack = function(trackId) {
	this.genomeViewer.removeTrack(trackId);
};

GenomeMaps.prototype.addTrack = function(trackId) {
	console.log(trackId);
	switch (trackId) {
	case "Gene/Transcript":
		var geneTrack = new TrackData(trackId,{
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
		this.genomeViewer.addTrack(geneTrack,{
			id:trackId,
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
		var seqtrack = new TrackData(trackId,{
			adapter: new CellBaseAdapter({
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
			id:trackId,
			featuresRender:"SequenceRender",
			height:50,
			visibleRange:{start:100,end:100}
		});
		break;
	case "CpG islands":
		var cpgTrack = new TrackData(trackId,{
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
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:10,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "SNP":
		var snpTrack = new TrackData(trackId,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "snp",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(snpTrack,{
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:70,
			labelZoom:80,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Mutation":
		var mutationTrack = new TrackData(trackId,{
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
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Structural variation (<20Kb)":
		var structuralTrack = new TrackData(trackId,{
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
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:40,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Structural variation (>20Kb)":
		var structuralTrack = new TrackData(track>Id,{
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
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:40,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "miRNA targets":
		var miRNATrack = new TrackData(trackId,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "mirna_target",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(miRNATrack,{
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "TFBS":
		var tfbsTrack = new TrackData(trackId,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "tfbs",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(tfbsTrack,{
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
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
		var conservedTrack = new TrackData(trackId,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "conserved_region",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(conservedTrack,{
			id:trackId,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;

	default:
		break;
	}
};

GenomeMaps.prototype.addDASTrack = function(sourceName, sourceUrl) {
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
		id:sourceName,
		type:"das",
		featuresRender:"MultiFeatureRender",
//		histogramZoom:80,
		height:150,
		visibleRange:{start:0,end:100},
		settings:{
			height:10
		}
	});
};


//App interface, Main menu ...  and others menus
GenomeMaps.prototype.getMenuBar = function() {
	var _this = this;
	var fileMenu = Ext.create('Ext.menu.Menu', {
		
		items : [
//		    {
//				text : 'New',
//				handler : function() {
//					console.log("Not yet implemented, press F5");
//				}
//			},'-',{
//				text : 'Import',
//				menu : [{
//					text : 'GFF',
//					handler : function() {
//						var gffFileWidget = new GFFFileWidget({viewer:_this.genomeViewer});
//						gffFileWidget.draw();
//						gffFileWidget.onOk.addEventListener(function(sender, args) {
//							_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
//						});
//	
//					}
//				},{
//					text : 'BED',
//					disabled : true,
//					handler : function(sender, args) {
//						_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
//					}
//				},{
//					text : 'VCF',
//					handler : function() {
//						var vcfFileWidget = new VCFFileWidget({viewer:_this.genomeViewer});
//						vcfFileWidget.draw();
//						vcfFileWidget.onOk.addEventListener(function(sender, args) {
//							console.log(args.dataAdapter);
//							_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
//		
//						});
//					}
//				}]
//			},
		]
	});
	
	
	var viewMenu = Ext.create('Ext.menu.Menu', {
		margin : '0 0 10 0',
		floating : true,
		items : [{
				text : 'Zoom',
				menu : this.getZoomMenu()
			}, '-',
//			{
//				text : 'Karyotype',
//				handler : function() {
//					Ext.getCmp(_this.genomeViewer.id+"karyotypeButton").toggle();
//				}
//			},
//			{
//				text : 'Chromosome',
//				handler : function() {
//					Ext.getCmp(_this.genomeViewer.id+"ChromosomeToggleButton").toggle();
//				}
//			},
//			{
//				text : 'Region',
//				handler : function() {
//					Ext.getCmp(_this.genomeViewer.id+"RegionToggleButton").toggle();
//				}
//			},
//			'-',
//			{
//				text : 'Label',
//				menu : this.getLabelMenu()
//			}, '-',
//			{
//				text : 'Karyotype',
//				handler : function() {
//					_this.genomeViewer._showKaryotypeWindow();
//				}
//			}, 
			{
				text : 'Gene legend',
				handler : function() {
					var legendWidget = new LegendWidget({title:"Gene legend"});
					legendWidget.draw(GENE_BIOTYPE_COLORS);
				}
			}
//			,'-',
//			{
//	        	 text:'Ensembl Id',
//	        	 checked:false,
//	        	 handler : function() {
////					GENOMEMAPS_CONFIG.showFeatureStableId = this.checked;
//					_this.position = Math.ceil(_this.genomeViewer.genomeWidget.trackCanvas.getMiddlePoint())+1;
//					
//					_this.genomeViewer.refreshMasterGenomeViewer();
//					
//					if (this.checked){
//						_this.genomeViewer.genomeWidgetProperties.setLabelHeight(9);
//					}
//					else{
//						_this.genomeViewer.genomeWidgetProperties.setLabelHeight(10);
//					}
//	         	}
//	         },

//	         {
//					text : 'Download as',
//					iconCls:'icon-box',
//					menu : [{
//						text:'PNG',iconCls:'icon-blue-box',disabled:false,
//						listeners : {
//							scope : this,
//							'click' : function() {
//								var svg = new XMLSerializer().serializeToString(_this.genomeViewer.trackSvgLayout.svg);
//								var canvas = DOM.createNewElement("canvas", document.body, [["id", _this.id+"png"],["visibility", _this.id+"hidden"]]);
//								
////								console.log(svg);
////								svg = '<svg width="1582" height="407"><svg width="7000000" height="407" x="-35000"><rect width="1000" height="200" x="1000" y="50" fill="red"></rect></svg></svg>';
//								canvg(canvas, svg);
////								console.log(canvas);
//								canvas.toBlob(function(blob) {
//						            saveAs(blob, "exported_image.png");
//						        }, "image/png");
////								Canvas2Image.saveAsPNG(canvas);
//								$("#"+_this.id+"png").remove();
////								DOM.select("canvas").parent.removeChild(canvas);
//							}
//						}
//					},{
//						text:'JPEG',iconCls:'icon-blue-box',disabled:false,
//						listeners : {
//						scope : this,
//							'click' : function() {
//								try{
////									_this.genomeViewer._getPanel().setLoading("Saving image");
//									var svg = new XMLSerializer().serializeToString(_this.genomeViewer.trackSvgLayout.svg);
//									var canvas = DOM.createNewElement("canvas", document.body, [["id", this.id+"jpg"],["visibility", this.id+"hidden"]]);
//									canvg(canvas, svg);
//									Canvas2Image.saveAsJPEG(canvas); 
//									$("#"+this.id+"jpg").remove();
////									DOM.select("canvas").parent.removeChild(canvas);
//								}
//								catch(e){
//									alert(e);
//								}
//								finally{
////									_this.genomeViewer._getPanel().setLoading(false);
//								}
//							}
//						}
//					}]
//				}
			]
	});
	
	var searchMenu = Ext.create('Ext.menu.Menu', {
		margin : '0 0 10 0',
		floating : true,
		items : [ {
				text: 'Feature',
				menu : this.getFeatureSearchMenu()
			},
			{
				text:'Functional',
				menu: this.getFunctionalSearchMenu()
				
			},{
				text: 'Regulatory',
				menu : this.getRegulatorySearchMenu()
			}
		]
	});
	
	var toolbarMenu = Ext.create('Ext.toolbar.Toolbar', {
		cls:'bio-menubar',
		height:27,
		padding:'0 0 0 10',
//		margins : '0 0 0 5',
		items : [
//		    {
//				text : 'File',
//				menu : fileMenu
//			},
			{
				text : 'View',
				menu : viewMenu
			},{
				text : 'Search',
				menu : searchMenu
			},{
				id : this.id+"tracksMenu",
				text : 'Tracks',
				menu : []
			},{
				text : 'Plugins',
				menu : this.getPluginsMenu()
			}
		]
	});
	return toolbarMenu;
};

/** zoom Menu * */
GenomeMaps.prototype.getZoomMenu = function(chromosome, position) {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
				items : []
			});
	for ( var i = 0; i <= 100; i=i+10) {
		menu.add({text : i + '%', group : 'zoom', checked : false, handler : function() {
			Ext.getCmp(_this.genomeViewer.id+'zoomSlider').setValue(this.text.replace("%", "")); 
		}});
	}
	return menu;
};

/** label Menu **/
GenomeMaps.prototype.getLabelMenu = function() {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
				items : [
				         {
				        	 text:'None',
				        	 handler : function() {
				        	 	_this.genomeViewer.genomeWidgetProperties.setLabelHeight(0);
				        	 	_this.genomeViewer.refreshMasterGenomeViewer();
				         	}
				         },
				         {
				        	 text:'Small',
				        	 handler : function() {
					        	 	_this.genomeViewer.genomeWidgetProperties.setLabelHeight(8);
					        	 	_this.genomeViewer.refreshMasterGenomeViewer();
					         	}
				         },
				         {
				        	 text:'Medium',
				        	 handler : function() {
					        	 	_this.genomeViewer.genomeWidgetProperties.setLabelHeight(10);
					        	 	_this.genomeViewer.refreshMasterGenomeViewer();
					         	}
				         },
				         {
				        	 text:'Large',
				        	 handler : function() {
					        	 	_this.genomeViewer.genomeWidgetProperties.setLabelHeight(12);
					        	 	_this.genomeViewer.refreshMasterGenomeViewer();
					         	}
				         },
				         {
				        	 text:'x-Large',
				        	 handler : function() {
					        	 	_this.genomeViewer.genomeWidgetProperties.setLabelHeight(14);
					        	 	_this.genomeViewer.refreshMasterGenomeViewer();
					         	}
				         }
				         ]
			});
	return menu;
};

/** search Feature Menu **/
GenomeMaps.prototype.getFeatureSearchMenu = function() {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ {
						text : 'Genes',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Gene List',viewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, geneNames) {
								_this.genomeViewer.openGeneListWidget(geneNames);
							});
							inputListWidget.draw();
						}
					}
//					,
//					{
//						text : 'Transcript',
//						handler : function() {
//							var inputListWidget = new InputListWidget({title:'Ensembl Transcript',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, names) {
//								_this.genomeViewer.openTranscriptListWidget(names);
//							});
//							inputListWidget.draw();
//						}
//					}
//					,
//					{
//						text : 'Exon',
//						handler : function() {
//							//ENSE00001663727
//							var inputListWidget = new InputListWidget({title:'Ensembl Exon List',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, geneNames) {
//								_this.genomeViewer.openExonListWidget(geneNames);
//							});
//							inputListWidget.draw();
//						}
//					}
					,
					{
						text : 'SNP',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'SNP List',viewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openSNPListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					}
//					,
//					{
//						text : 'Protein',
//						handler : function() {
//							var inputListWidget = new InputListWidget({title:'Ensembl Protein',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
//								_this.genomeViewer.openGOListWidget(snpNames);
//							});
//							inputListWidget.draw();
//						}
//					}
					
					
					]
			});
	return menu;
};

GenomeMaps.prototype.getFunctionalSearchMenu = function() {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ 
	        	  {
						text : 'GO',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Gene Ontology',viewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openGOListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					},
					{
						text : 'Reactome',
						disabled:true,
						handler : function() {
							alert("Not yet implemented");
						}
					}
//					,
//					{
//						text : 'Interpro',
//						handler : function() {
//							var inputListWidget = new InputListWidget({title:'Protein',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
//								_this.genomeViewer.openGOListWidget(snpNames);
//							});
//							inputListWidget.draw();
//						}
//					}
					]
			});
	return menu;
};

GenomeMaps.prototype.getRegulatorySearchMenu = function() {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ 
	        	  {
						text : 'miRNA Target',
						disabled:true,
						handler : function() {
	        		  		alert("Not yet implemented");
						}
					},
					{
						text : 'TFBS',
						disabled:true,
						handler : function() {
							alert("Not yet implemented");
						}
					}
					]
			});
	return menu;
};

//XXX DEPRECATED
GenomeMaps.prototype.getTracksMenuOLD = function() {
	var _this = this;
	if(this.tracksMenu!=null){
		this.tracksMenu.destroy();
	}
	
	this.tracksMenu = Ext.create('Ext.menu.Menu', {
				id:this.id+"tracksMenuInit",
				margin : '0 0 10 0',
				floating : true,
				items : [{
						id:this.id+"tracksMenuCore",
						text : 'Core',
						menu : [
						        {
							id : 'Gene/Transcript',
							text : 'Gene/Transcript',
							checked : true,
							disabled : true,
							handler : function() {
//								if(this.checked){
//									  if(_this.genomeViewer.trackSvgLayout.swapHash[this.text]){
//										  _this.genomeViewer.trackSvgLayout._showTrack(this.text);
//									  }else{
//										  _this.addTrack(this.text);
//									  }
//								  }
//								  else{
//									  _this.genomeViewer.trackSvgLayout._hideTrack(this.text);
//								  }
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, 
						{
							id : 'Cytoband',
							text : 'Cytoband',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							id : 'Sequence',
							text : 'Sequence',
							checked : false,
							disabled : true,
							handler : function() {
//								if(this.checked){
//									  if(_this.genomeViewer.trackSvgLayout.swapHash[this.text]){
//										  _this.genomeViewer.trackSvgLayout._showTrack(this.text);
//									  }else{
//										  _this.addTrack(this.text);
//									  }
//								  }
//								  else{
//									  _this.genomeViewer.trackSvgLayout._hideTrack(this.text);
//								  }
//								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
//								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							id : 'CpG islands',
							text : 'CpG islands',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}]
					}, {
						id:this.id+"tracksMenuVariation",
						text : 'Variation',
						menu : [{
							id : 'SNP',
							text : 'SNP',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							id : 'Mutation',
							text : 'Mutation',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							id : 'Structural variation',
							text : 'Structural variation',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}
		
						]
					}, {
						id:this.id+"tracksMenuRegulatory",
						text : 'Regulatory',
						menu : [{
							id : 'miRNA targets',
							text : 'miRNA targets',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							id : 'TFBS',
							text : 'TFBS',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							id : 'Histone',
							text : 'Histone',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						},
						{
							id : 'Polymerase',
							text : 'Polymerase',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}
						,
						{
							id : 'Open Chromatin',
							text : 'Open Chromatin',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						},
//						{
//							text : 'Triplex',
//							checked : false,
//							disabled : true,
//							handler : function() {
//								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
//								_this.genomeViewer.refreshMasterGenomeViewer();
//							}
//						}, 
						{
							id : 'Conserved regions',
							text : 'Conserved regions',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}]
						
					}, "-", 
					{
						id : this.id+"tracksMenuDAS",
						text : 'DAS',
						menu : this.getDASMenu()
					
					}]
		
				});
	return this.tracksMenu;
};

GenomeMaps.prototype.setTracksMenu = function() {
	Ext.getCmp(this.id+"tracksMenu").menu=this.getTracksMenu();
};

GenomeMaps.prototype.getTracksMenu = function() {
	var _this = this;
	if(this._TracksMenu!=null){
		this._TracksMenu.destroy();
	}
	
	var species = this.genomeViewer.species;
	var categories = TRACKS[SPECIES_TRACKS_GROUP[species]];
	
	var items = new Array();
	
	for (var i = 0, leni = categories.length; i < leni; i++) {
		var sources = [];
		for ( var j = 0, lenj = categories[i].tracks.length; j < lenj; j++){
			sources.push({
				id : this.id+categories[i].tracks[j].id+"menu",
				text : categories[i].tracks[j].id,
				disabled : categories[i].tracks[j].disabled,
				checked : categories[i].tracks[j].checked,
				handler : function() {
					if(this.checked){
//						if(_this.genomeViewer.trackSvgLayout.swapHash[this.text]){
//							_this.genomeViewer.trackSvgLayout._showTrack(this.text);
//						}else{
							_this.addTrack(this.text);
//						}
					}
					else{
						_this.removeTrack(this.text);
					}
				}
			});
		}
		items.push({
			text : categories[i].category,
			menu : sources
		});
	}
	
	items.push("-");
	items.push({
		id : this.id+"tracksMenuDAS",
		text : 'DAS',
		menu : this.getDASMenu()
	});
	
	
	this._TracksMenu = Ext.create('Ext.menu.Menu', {
		id:this.id_panel+"_TracksMenu",
		margin : '0 0 10 0',
		floating : true,
		items : items
	});
	return this._TracksMenu;
};

GenomeMaps.prototype.getDASMenu = function() {
	var _this = this;
	
	var tracks = DAS_TRACKS;
	var species = this.genomeViewer.species;
	//Auto generate menu items depending of DAS_TRACKS config
//	var menu = this.getDASMenu();
//	menu.removeAll(); // Remove the old DAS
	
	var items = new Array();
	
	for (var i = 0, leni = tracks.length; i < leni; i++) {
		if(tracks[i].species == species){
			for ( var j = 0, lenj = tracks[i].categories.length; j < lenj; j++){
				var sources = [];
				for ( var k = 0, lenk = tracks[i].categories[j].sources.length; k < lenk; k++){
					sources.push({
						id : this.id+tracks[i].categories[j].sources[k].name+"menu",
						text : tracks[i].categories[j].sources[k].name,
						sourceName : tracks[i].categories[j].sources[k].name,
						sourceUrl : tracks[i].categories[j].sources[k].url,
						checked : tracks[i].categories[j].sources[k].checked,
						handler : function() {
							if(this.checked){
//								if(_this.genomeViewer.trackSvgLayout.swapHash[this.sourceName]){
//								_this.genomeViewer.trackSvgLayout._showTrack(this.sourceName);
//								}else{
								_this.addDASTrack(this.sourceName, this.sourceUrl);
//								}
							}
							else{
								_this.removeTrack(this.sourceName);
							}
						}
					});
				}
				items.push({
					text : tracks[i].categories[j].name,
					menu : sources
				});
			}
			break;
		}
	}
	
	//Add custom source
	items.push("-",{
		text : 'Add custom...',
		handler : function() {
			var urlWidget = new UrlWidget({title:'Add a DAS track'});
			urlWidget.onAdd.addEventListener(function(sender, event) {
				_this.addDASTrack(event.name, event.url);
				_this.setCustomDASMenu(event.name);
			});
			urlWidget.draw();
		},
		menu :{
			id:this.id+"_customDASMenu",
			margin : '0 0 10 0',
			floating : true,
			items : []
		}
	});
	
	this._DASMenu = Ext.create('Ext.menu.Menu', {
		id:this.id_panel+"_DASMenu",
		margin : '0 0 10 0',
		floating : true,
		items : items
	});
	return this._DASMenu;
};

GenomeMaps.prototype.setCustomDASMenu = function(name) {
	var _this = this;
	Ext.getCmp(this.id+"_customDASMenu").add({
		text : name,
		checked : true,
		handler : function() {
			if(this.checked){
				  _this.genomeViewer.showTrack(this.text);
			  }
			  else{
				  _this.genomeViewer.hideTrack(this.text);
			  }
		}
	});
};

GenomeMaps.prototype.getPluginsMenu = function() {
	if(this._pluginsMenu == null){
		this._pluginsMenu = Ext.create('Ext.menu.Menu', {
			id:this.id+"_pluginsMenu",
			margin : '0 0 10 0',
			floating : true,
			items : []
		});
	}
	return this._pluginsMenu;
};

GenomeMaps.prototype.setPluginsMenu = function() {
	var _this = this;
	var plugins_cat = GENOME_MAPS_AVAILABLE_PLUGINS;
	var species = this.genomeViewer.species;
	
	//Auto generate menu items depending of AVAILABLE_PLUGINS config
	var menu = this.getPluginsMenu();
	menu.removeAll(); // Remove the old entries
	menu.add([{
		id : this.id+"tracksMenuPlugins",
		text : 'Load',
		menu : [
		  {
			id : this.id+"tracksMenuGFF2",
			text : 'GFF2',
			handler : function() {
//			_this.getGFFUploadMenu();
//			_this.openGFFDialog.show();
			var gffFileWidget = new GFFFileWidget({version:2,viewer:_this.genomeViewer});
			gffFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					gffFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					gffFileWidget.sessionFinished();
				});
			}
			gffFileWidget.onOk.addEventListener(function(sender, event) {
				var gff2Track = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(gff2Track,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});

		}
		},
		  {
			id : this.id+"tracksMenuGFF3",
			text : 'GFF3',
			handler : function() {
//			_this.getGFFUploadMenu();
//			_this.openGFFDialog.show();
			var gffFileWidget = new GFFFileWidget({version:3,viewer:_this.genomeViewer});
			gffFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					gffFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					gffFileWidget.sessionFinished();
				});
			}
			gffFileWidget.onOk.addEventListener(function(sender, event) {
				var gff3Track = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(gff3Track,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});

		}
		},
		  {
			id : this.id+"tracksMenuGTF",
			text : 'GTF',
			handler : function() {
//			_this.getGFFUploadMenu();
//			_this.openGFFDialog.show();
			var gtfFileWidget = new GTFFileWidget({viewer:_this.genomeViewer});
			gtfFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					gtfFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					gtfFileWidget.sessionFinished();
				});
			}
			gtfFileWidget.onOk.addEventListener(function(sender, event) {
				var gtfTrack = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(gtfTrack,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});

		}
		},
		
		{
			id : this.id+"tracksMenuBED",
			text : 'BED',
			handler : function() {
				var bedFileWidget = new BEDFileWidget({viewer:_this.genomeViewer});
				bedFileWidget.draw();
				if (_this.wum){
					_this.headerWidget.onLogin.addEventListener(function (sender){
						bedFileWidget.sessionInitiated();
					});
					_this.headerWidget.onLogout.addEventListener(function (sender){
						bedFileWidget.sessionFinished();
					});
				}
				bedFileWidget.onOk.addEventListener(function(sender, event) {
					var bedTrack = new TrackData(event.fileName,{
						adapter: event.adapter
					});
					_this.genomeViewer.addTrack(bedTrack,{
						id:event.fileName,
						featuresRender:"MultiFeatureRender",
//						histogramZoom:80,
						height:150,
						visibleRange:{start:0,end:100},
						featureTypes:FEATURE_TYPES
					});
				});
			}
		},
		{
			id : this.id+"tracksMenuVCF",
			text : 'VCF4',
			handler : function() {
			var vcfFileWidget = new VCFFileWidget({viewer:_this.genomeViewer});
			vcfFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					vcfFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					vcfFileWidget.sessionFinished();
				});
			}
			vcfFileWidget.onOk.addEventListener(function(sender, event) {
				console.log(event.fileName);
				var vcfTrack = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(vcfTrack,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});
		}
		}

		]
	}]);
	

	//XXX ANALYSIS PLUGINS
	for (var i = 0, leni = plugins_cat.length; i < leni; i++) {
		// If category is blank, adds directly a button in the root menu
		if(plugins_cat[i].category == ""){
			for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
				menu.add({
					text : plugins_cat[i].plugins[j].name,
					pluginName : plugins_cat[i].plugins[j].name,
					handler : function() {
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].setViewer(_this.genomeViewer);
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].draw();
//						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].launch();
					}
				});
			}
		}
		else{
			var sources = [];
			for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
//			if(plugins[i].species == species){
				sources.push({text : plugins_cat[i].plugins[j].name,
					pluginName : plugins_cat[i].plugins[j].name,
					handler : function() {
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].setViewer(_this.genomeViewer);
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].draw();
//						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].launch();
					}
				});
//				break;
//			}
			}
			menu.add({
				text : plugins_cat[i].category,
				menu : sources
			});
		}
	}
	//XXX ANALYSIS PLUGINS
	
	
};
