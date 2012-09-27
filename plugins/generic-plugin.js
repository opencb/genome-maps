/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of Genome Maps.
 *
 * Genome Maps is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
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

function GenericPlugin(name, args){
	var _this=this;
	this.id = name+"_" + Math.round(Math.random()*10000);
	
	this.name = name;
	this.title = null;
	this.width = 640;
	this.height = 480;
	this.window = true;
	
	this.launch = null;
	this.viewer = null;
	
	this.container_div = this.name+'_plugin_container';
	
	if (args != null){
        if (args.targetId!= null) {
        	this.targetId = args.targetId;       
        }
        if (args.title!= null) {
        	this.title = args.title;       
        }
        if (args.width!= null) {
        	this.width = args.width;       
        }
        if (args.height!= null) {
        	this.height = args.height;       
        }
        if (args.launch!= null) {
        	this.launch = args.launch;       
        }
        if (args.window!= null) {
        	this.window = args.window;       
        }
    }
	
	GENOME_MAPS_REGISTERED_PLUGINS[this.name] = this;
};

GenericPlugin.prototype.setViewer = function (viewer){
	this.viewer = viewer;
};
GenericPlugin.prototype.getSpecies = function (){
	return this.viewer.species;
};

GenericPlugin.prototype.draw = function (){
	var _this=this;
	if(this.window){
		this.win = Ext.create('Ext.window.Window',{
			id:this.id+'pluginWindow',
			title: this.title,
			resizable: false,
			minimizable: true,
			taskbar:Ext.getCmp(this.viewer.id+'uxTaskbar'),
			constrain: true,
			closable: true,
			width: this.width,
			height: this.height,
			html: '<div id='+this.container_div+'></div>',
			buttonAlign:'left',
			buttons:['->',
			         {text:'Close', handler: function(){_this.closeWindow();}}],
	 		listeners: {
		    	scope: this,
		    	minimize:function(){
					this.win.hide();
		       	},
		      	destroy: function(){
		       		delete this.win;
		      	}
	    	}
		});
		this.win.show();
	}
	if(this.launch!=null){
		this.launch();
	}else{
		console.log("No launch method defined.");
	}
};

GenericPlugin.prototype.addHtmlElement = function (html) {
	$("#"+this.container_div).html(html);
};

GenericPlugin.prototype.addSenchaElement = function (component) {
	this.getWindow().add(component);
};

GenericPlugin.prototype.getWindow = function () {
	return Ext.getCmp(this.id+'pluginWindow');
};

GenericPlugin.prototype.closeWindow = function () {
	Ext.getCmp(this.id+'pluginWindow').close();
};
