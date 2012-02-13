function GenericPlugin(name, args){
	var _this=this;
	this.id = name+"_" + Math.round(Math.random()*10000);
	
	this.name = name;
	this.title = null;
	this.width = 640;
	this.height = 480;
	this.launch = null;
	
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
    }
	
	GENOME_MAPS_REGISTERED_PLUGINS[this.name] = this;
};

GenericPlugin.prototype.draw = function (){
	var win = Ext.create('Ext.window.Window',{
		id:this.id+'pluginWindow',
		title: this.title,
		resizable: false,
		minimizable: true,
		constrain: true,
		closable: true,
		width: this.width,
		height: this.height,
		html: '<div id='+this.container_div+'></div>'
	});
	win.show();
};

GenericPlugin.prototype.addHtmlElement = function (html) {
	$("#"+this.container_div).html("html de prueba");
};

GenericPlugin.prototype.getWindow = function () {
	return Ext.getCmp(this.id+'pluginWindow');
};
