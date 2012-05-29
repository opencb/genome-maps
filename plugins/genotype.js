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
