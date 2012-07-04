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
