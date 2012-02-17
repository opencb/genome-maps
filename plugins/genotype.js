var genotypePlugin = new GenericPlugin('Genotype', {title: 'Genotype',
											  	width: 900,
											  	launch: function(sender) { auxGenotype(sender); }
});


function auxGenotype(sender){
	genotypePlugin.closeWindow();
	var species = sender.genomeViewer.species;
	
	var genotypeGenomicAttributesWidget =  new GenotypeGenomicAttributesWidget(sender.genomeViewer.species);
	
	if (sender.wum){
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
