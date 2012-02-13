
var myPlugin = new GenericPlugin('MyPlugin', {title: 'My first plugin',
											  width: 900,
											  launch: function() { aux(); }
});


function aux(){
	myPlugin.addHtmlElement("html de prueba");
	
	
	win = myPlugin.getWindow();

	
	var pan = Ext.create('Ext.panel.Panel', {
		title:'Prueba',
		width:300,
		height:300,
	});
	
	var pan2 = Ext.create('Ext.panel.Panel', {
		title:'Prueba',
		width:300,
		height:100,
	});
	
	win.add(pan,pan2);
};






















//	myPlugin.setTitle();
//	myPlugin.setVisible(false);
//	....
//	addApplication(win);
//	myplugin.show();
		
//	var win = Ext.create('Ext.window.Window',{
//		title:'myPlugin',
//		resizable: false,
//		minimizable :true,
//		constrain:true,
//		closable:true,
//		width: 800,
//		height: 400,
//		html:'hola'
//	});
//	
//	setStatus("");
//	
//	win.show();
