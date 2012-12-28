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

var expressionPlugin = new GenericPlugin('Expression', {title: 'Expression',
											  	width: 1035,
											  	height: 653,
											  	window: false,
											  	launch: function() { auxExpression(); }
});


function auxExpression(){
//	expressionPlugin.closeWindow();
	var species = expressionPlugin.getSpecies();
	
	var viewer = expressionPlugin.viewer;
	
	var expressionGenomicAttributesWidget = new ExpressionGenomicAttributesWidget(species,{viewer:viewer});
	
	if (genomeMaps.wum){
		genomeMaps.headerWidget.onLogin.addEventListener(function (sender){
			expressionGenomicAttributesWidget.attributesPanel.sessionInitiated();
		});
		genomeMaps.headerWidget.onLogout.addEventListener(function (sender){
			expressionGenomicAttributesWidget.attributesPanel.sessionFinished();
		});
	}
	expressionGenomicAttributesWidget.draw();
//	expressionPlugin.addSenchaElement(expressionGenomicAttributesWidget.getMainPanel());
	expressionGenomicAttributesWidget.onMarkerClicked.addEventListener(function(sender, feature){
		genomeMaps.goTo(feature.chromosome, feature.start);
		
	});
	
	expressionGenomicAttributesWidget.onTrackAddAction.addEventListener(function(sender, event){
		var track = new TrackData(event.fileName,{
			adapter: event.adapter
		});
		viewer.trackSvgLayout.addTrack(track,{
			id:event.fileName,
			featuresRender:"MultiFeatureRender",
//			histogramZoom:80,
			height:150,
			visibleRange:{start:0,end:100},
			types:FEATURE_TYPES
		});
		
	});
	
};
