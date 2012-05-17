
var myPlugin = new GenericPlugin('MyPlugin', {title: 'My first plugin',
											  width: 900,
											  launch: function() { aux(); }
});


function aux(){
//	myPlugin.addHtmlElement("html de prueba");
	
//	win = myPlugin.getWindow();

	
	var pan = Ext.create('Ext.panel.Panel', {
		title:'Test panel',
		width:300,
		height:300
	});
	
	var pan2 = Ext.create('Ext.panel.Panel', {
		title:'Test panel',
		width:300,
		height:100
	});
	
//	win.add(pan,pan2);
	myPlugin.addSenchaElement(pan);
//	myPlugin.addSenchaElement(pan2);
};
