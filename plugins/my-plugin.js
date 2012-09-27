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
