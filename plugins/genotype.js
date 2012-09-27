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

var genotypePlugin = new GenericPlugin('Genotype', {title: 'Genotype',
											  	width: 900,
											  	window: false,
											  	launch: function(sender) { auxGenotype(sender); }
});


function auxGenotype(sender){
//	genotypePlugin.closeWindow();
	var species = genotypePlugin.getSpecies();
	
	var genotypeGenomicAttributesWidget =  new GenotypeGenomicAttributesWidget(species,{viewer:genotypePlugin.viewer});
	
	if (genomeMaps.wum){
		genomeMaps.headerWidget.onLogin.addEventListener(function (sender){
			genotypeGenomicAttributesWidget.attributesPanel.sessionInitiated();
		});
		genomeMaps.headerWidget.onLogout.addEventListener(function (sender){
			genotypeGenomicAttributesWidget.attributesPanel.sessionFinished();
		});
	}
	
	genotypeGenomicAttributesWidget.draw();
	
	genotypeGenomicAttributesWidget.onMarkerClicked.addEventListener(function(sender, feature){
		genomeMaps.goTo(feature.chromosome, feature.start);
	});
	
	genotypeGenomicAttributesWidget.onTrackAddAction.addEventListener(function(sender, feature){
	genomeMaps.addTrackFromFeaturesList(feature);
		
	});
};
