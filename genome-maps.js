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

function GenomeMaps(targetId, args) {
    var _this = this;
    this.id = "GenomeMaps" + Math.round(Math.random() * 10000);
    this.suiteId = 9;
    this.title = "Genome Maps";
    this.description = "RC";
    this.wum = true;
    this.version = "2.2.0";

	this.trackIdCounter = 1;
	
    this.args = args;
    this.width = $(window).width();
    this.height = $(window).height();
    this.targetId = document.body;

    if (targetId != null) {
        this.targetId = targetId;
    }
    if (args != null) {
        if (args.width != null) {
            this.width = args.width;
        }
        if (args.height != null) {
            this.height = args.height;
        }
        if (args.wum != null) {
            this.wum = args.wum;
        }
    }
	// Parse query params to get region.... Also in AVAILABLE_SPECIES, an
	// example region is set.

    var region = new Region();
	
    var url = $.url();
    var url_cbhost = url.param('CELLBASE_HOST');
    if(url_cbhost != null) {
		CELLBASE_HOST = url_cbhost;
    }

    speciesObj = DEFAULT_SPECIES;
    var urlSpecies = url.param('species');
    if(urlSpecies != null || urlSpecies != ""){
            //TODO change to object AVAILABLE SPECIES
            for(var i = 0; i < AVAILABLE_SPECIES.length; i++){
                    if(AVAILABLE_SPECIES[i].species==urlSpecies){
                            speciesObj=AVAILABLE_SPECIES[i];
                            break;
                    }
            }
    }
    this.species = speciesObj.species;
    region.load(speciesObj.region);
    //console.log(speciesObj);

    var regionStr = url.param('region');
    if(regionStr != null) {
		region.parse(regionStr);
    }
    
    var urlZoom = parseInt(url.param('zoom'));
    if(isNaN(urlZoom) || urlZoom > 100 || urlZoom < 0 ){
		urlZoom = null;
	}

    var urlGene = url.param('gene');
    if(urlGene != null && urlGene != ""){
		region.load(this.getRegionByFeature(urlGene,"gene"));
	}
    var urlSnp = url.param('snp');
    if(urlSnp != null && urlSnp != ""){
		region.load(this.getRegionByFeature(urlSnp,"snp"));
	}
	
//	console.log(Ext.ComponentManager.each(function(a){console.log(a);}));
//	console.log(Ext.ComponentManager.getCount());
    
//	if (this.wum==true){
    this.headerWidget = new HeaderWidget({
            appname: this.title,
            description: this.description,
            version:this.version,
            suiteId : this.suiteId
    });
//	if($.cookie("gm_settings")){
//		var species = JSON.parse($.cookie("gm_settings")).species;
//	}else{
//		var species = AVAILABLE_SPECIES[0];
//	}

    this.genomeViewer = new GenomeViewer(this.id+"gvDiv", speciesObj,{
			region:region,
            toolbar:this.getMenuBar(),
            version:this.version,
            zoom:urlZoom,
            availableSpecies: AVAILABLE_SPECIES,
            height:this.height-this.headerWidget.height,
            width:this.width
    });
    
    /**Atach events i listen**/
    this.headerWidget.onLogin.addEventListener (function (sender) {
            Ext.example.msg('Welcome', 'You logged in');
    });
    
    this.headerWidget.onLogout.addEventListener (function (sender) {
            Ext.example.msg('Good bye', 'You logged out');
    });
//	}
    
    //SPECIE EVENT
    this.genomeViewer.onSpeciesChange.addEventListener(function(sender,data){
            _this._setTracks();
            _this.setTracksMenu();
            _this.headerWidget.setDescription(_this.genomeViewer.speciesName);
            _this.species=_this.genomeViewer.species;
    });

    //Events i listen
//	this.genomeViewer.onLocationChange.addEventListener(function(sender,data){
//	});
    
    //RESIZE EVENT
    $(window).smartresize(function(a){
            _this.setSize($(window).width(),$(window).height());
    });
    
    //SAVE CONFIG IN COOKIE
    $(window).unload(function(){
            var value = {
                            species:{
                                    name:_this.genomeViewer.speciesName,
                                    species:_this.genomeViewer.species,
                                    chromosome:_this.genomeViewer.chromosome,
                                    position:_this.genomeViewer.position}
            };
            
            $.cookie("gm_settings", JSON.stringify(value), {expires: 365});
    });
}



GenomeMaps.prototype.draw = function(){
	var _this = this;
	if(this._panel == null){
		
		var gvContainer = Ext.create('Ext.container.Container', {
			id:this.id+"gvContainer",
			region:"center",
			html : '<div id="'+this.id+'gvDiv"></div>'
		});
		
		this._panel = Ext.create('Ext.panel.Panel', {
			id:this.id+"_panel",
			renderTo:this.targetId,
//			renderTo:Ext.getBody(),
//		layout: { type: 'vbox',align: 'stretch'},
			layout:'border',
			border:false,
			width:this.width,
			height:this.height,
			items:[this.headerWidget.getPanel(),gvContainer]
		});
		
		this.headerWidget.setDescription(this.genomeViewer.speciesName);
		$("#"+this.headerWidget.id+"appTextItem").qtip({
			content: '<span class="info">'+this.version+'</span>',
			position: {my:"bottom center",at:"top center",adjust: { y: 0, x:-25 }}
			
		});
		
		this.genomeViewer.afterRender.addEventListener(function(sender,event){
			Ext.getCmp(_this.genomeViewer.id+"versionLabel").setText('<span class="info">Genome Maps v'+_this.version+'</span>');
			//_this._setTracks();
			_this._setOverviewTracks();
			_this.genomeViewer.addSidePanelItems(_this.getSidePanelItems());
			_this.genomeViewer.onSvgRemoveTrack.addEventListener(function(sender,trackId){
				Ext.getCmp(_this.id+trackId+"menu").setChecked(false);
			});
		});
		//this.setTracksMenu();
	//	this.setDASMenu();
		//this.setPluginsMenu();
		this.genomeViewer.draw();
	}
	
};


GenomeMaps.prototype.setSize = function(width,height){
	this.width=width;
	this.height=height;
	
	this._panel.setSize(width,height);
	this.genomeViewer.setSize(width,height-this.headerWidget.height);
	this.headerWidget.setWidth(width);
};


GenomeMaps.prototype.getRegionByFeature = function(name, feature){
	var url = CELLBASE_HOST+"/latest/"+this.species+"/feature/"+feature+"/"+name+"/info?of=json";
	var f;
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			f = JSON.parse(data)[0][0];
		}
	});
	if(f != null){
		return {chromosome:f.chromosome, start:f.start, end:f.end}
	}
	return {};
};

GenomeMaps.prototype.setLocationByFeature = function(name, feature){
	var loc = this.getRegionByFeature(name, feature);
	if (loc.chromosome != null &&  loc.position != null){
		this.genomeViewer.setLoc(loc);
	}
};

GenomeMaps.prototype._setOverviewTracks= function(){
	var geneTrack = new TrackData("gene",{
		adapter: new CellBaseAdapter({
			category: "genomic",
			subCategory: "region",
			resource: "gene",
			species: this.genomeViewer.species,
			featureCache:{
				gzip: true,
				chunkSize:50000
			}
		})
	});
	this.genomeViewer.trackSvgLayoutOverview.addTrack(geneTrack,{
		id:"gene",
		type:"gene",
		featuresRender:"MultiFeatureRender",
		histogramZoom:10,
		labelZoom:20,
		height:150,
		visibleRange:{start:0,end:100},
		titleVisibility:'hidden',
		featureTypes:FEATURE_TYPES
	});
};
/*
GenomeMaps.prototype._setTracks= function(){
	//Load initial TRACKS config
	var _this = this;
	var species = this.genomeViewer.species;
	var categories = TRACKS[SPECIES_TRACKS_GROUP[species]];
	
	for (var i=0, leni=categories.length; i<leni; i++) {
		var sources = [];
		for ( var j = 0, lenj=categories[i].tracks.length; j<lenj; j++){
			var id = categories[i].tracks[j].id;
			var checked = categories[i].tracks[j].checked;
			var disabled = categories[i].tracks[j].disabled;
			if(checked && !disabled && !this.genomeViewer.checkRenderedTrack(id)){
				this.addTrack(id);
			}else if((!checked || disabled) && this.genomeViewer.checkRenderedTrack(id)){
				this.removeTrack(id);
			}
		}
	}
	
	//Load initial DAS_TRACKS config
	var das_tracks = DAS_TRACKS;
	for (var i = 0, leni = das_tracks.length; i < leni; i++) {
		if(das_tracks[i].species == species){
			for ( var j = 0, lenj = das_tracks[i].categories.length; j < lenj; j++){
				var sourceName, sourceUrl, checked;
				for ( var k = 0, lenk = das_tracks[i].categories[j].sources.length; k < lenk; k++){
					sourceName = das_tracks[i].categories[j].sources[k].name;
					sourceUrl = das_tracks[i].categories[j].sources[k].url;
					checked = das_tracks[i].categories[j].sources[k].checked;
					
					if(checked){
						this.addDASTrack(sourceName, sourceUrl);
					}
				}
			}
			break;
		}
	}

};
*/
GenomeMaps.prototype.genTrackId = function() {
	var id = this.trackIdCounter;
	this.trackIdCounter++;
	return id;
};

GenomeMaps.prototype.removeTrack = function(trackId) {
	return this.genomeViewer.removeTrack(trackId);
};

GenomeMaps.prototype.restoreTrack = function(trackSvg, index) {
	return this.genomeViewer.restoreTrack(trackSvg, index);
};

GenomeMaps.prototype.scrollToTrack = function(trackId) {
	this.genomeViewer.scrollToTrack(trackId);
};

GenomeMaps.prototype.setTrackIndex = function(trackId, newIndex) {
	this.genomeViewer.setTrackIndex(trackId, newIndex);
};

GenomeMaps.prototype.getTrackSvgById = function(trackId) {
	return this.genomeViewer.getTrackSvgById(trackId);
};

GenomeMaps.prototype.addTrack = function(trackType, trackTitle) {
	var id = this.genTrackId();
	//console.log(trackId);
	switch (trackType) {
	case "Gene/Transcript":
		var geneTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "gene",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:50000
				},
				filters:{},
				filtersConfig:FEATURE_FILTERS.gene
			})
		});
		this.genomeViewer.addTrack(geneTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"GeneTranscriptRender",
			histogramZoom:20,
			transcriptZoom:50,
			height:24,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Cytoband":
		
		break;
	case "Sequence":
		var seqtrack = new TrackData(id,{
			adapter: new SequenceAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "sequence",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:1000
				}
			})
		});
		this.genomeViewer.addTrack(seqtrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"SequenceRender",
			height:50,
			visibleRange:{start:100,end:100}
		});
		break;
	case "CpG islands":
		var cpgTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "cpg_island",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:50000
				}
			})
		});
		this.genomeViewer.addTrack(cpgTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:10,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "SNP":
		var snpTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "snp",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				},
				filters:{},
				filtersConfig:FEATURE_FILTERS.snp
			})
		});
		this.genomeViewer.addTrack(snpTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:70,
			labelZoom:80,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Mutation":
		var mutationTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "mutation",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(mutationTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Structural variation (<20Kb)":
		var structuralTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "structural_variation",
				species: this.genomeViewer.species,
				params : {min_length:1,max_length:20000},
				featureCache:{
					gzip: true,
					chunkSize:50000
				}
			})
		});
		this.genomeViewer.addTrack(structuralTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:40,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "Structural variation (>20Kb)":
		var structuralTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "structural_variation",
				species: this.genomeViewer.species,
				params : {min_length:20000,max_length:300000000},
				featureCache:{
					gzip: true,
					chunkSize:5000000
				}
			})
		});
		this.genomeViewer.addTrack(structuralTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:40,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "miRNA targets":
		var miRNATrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "mirna_target",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(miRNATrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
	case "TFBS":
		var tfbsTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "tfbs",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(tfbsTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
//	case "Histone":
//		
//		break;
//	case "Polymerase":
//		
//		break;
//	case "Open Chromatin":
//		
//		break;
	case "Conserved regions":
		var conservedTrack = new TrackData(id,{
			adapter: new CellBaseAdapter({
				category: "genomic",
				subCategory: "region",
				resource: "conserved_region",
				species: this.genomeViewer.species,
				featureCache:{
					gzip: true,
					chunkSize:10000
				}
			})
		});
		this.genomeViewer.addTrack(conservedTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;
		
	case "bam":
		var bamTrack = new TrackData(id,{
			adapter: new BamAdapter({
				category: "bam",
				resource: trackTitle.substr(0,trackTitle.length-4),
				species: this.genomeViewer.species,
				featureCache:{
					gzip: false,
					chunkSize:5000
					}
			})
		});
		this.genomeViewer.addTrack(bamTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"BamRender",
			histogramZoom:20,
			height:24,
			visibleRange:{start:95,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;

	default:
		break;
	}
	return id;
};

GenomeMaps.prototype.addFileTrack = function(text, updateActiveTracksPanel) {
	var  _this = this;
	var fileWidget = null;
	switch(text){
		case "GFF2": fileWidget = new GFFFileWidget({version:2,viewer:_this.genomeViewer}); break;
		case "GFF3": fileWidget = new GFFFileWidget({version:3,viewer:_this.genomeViewer}); break;
		case "GTF":  fileWidget = new GTFFileWidget({viewer:_this.genomeViewer});break;
		case "BED":  fileWidget = new BEDFileWidget({viewer:_this.genomeViewer});break;
		case "VCF":  fileWidget = new VCFFileWidget({viewer:_this.genomeViewer}); break;
	}
	if(fileWidget != null){
		fileWidget.draw();
		if (_this.wum){
			_this.headerWidget.onLogin.addEventListener(function (sender){
				fileWidget.sessionInitiated();
			});
			_this.headerWidget.onLogout.addEventListener(function (sender){
				fileWidget.sessionFinished();
			});
		}
		fileWidget.onOk.addEventListener(function(sender, event) {
			var fileTrack = new TrackData(event.fileName,{
				adapter: event.adapter
			});

			var id = _this.genTrackId();
			var type = text;
			
			_this.genomeViewer.addTrack(fileTrack,{
				id:id,
				title:event.fileName,
				type:type,
				featuresRender:"MultiFeatureRender",
	//					histogramZoom:80,
				height:150,
				visibleRange:{start:0,end:100},
				featureTypes:FEATURE_TYPES
			});
			
			var title = event.fileName+'-'+id;
			updateActiveTracksPanel(type, title, id, true);
		});
	}
};

GenomeMaps.prototype.addDASTrack = function(sourceName, sourceUrl) {
	var id = this.genTrackId();
	var dasTrack = new TrackData("das",{
		adapter: new DasAdapter({
			url: sourceUrl,
			species: this.genomeViewer.species,
			featureCache:{
				gzip: false,
				chunkSize:10000
			}
		})
	});
	this.genomeViewer.addTrack(dasTrack,{
		id:id,
		title:sourceName,
		type:"das",
		featuresRender:"MultiFeatureRender",
		height:150,
		visibleRange:{start:50,end:100},
		settings:{
			height:10
		}
	});
	return id;
};

GenomeMaps.prototype.getSidePanelItems = function() {
	var _this = this;
	var species = this.species;
	var categories = TRACKS[SPECIES_TRACKS_GROUP[species]];
	var plugins_cat = GENOME_MAPS_AVAILABLE_PLUGINS;
	
	cellbaseChilds = [];
	dasChilds = [];
	gcsChilds = [];
	activeTracks = [];
	pluginChilds = [];

	//Load initial TRACKS config
	for (var i=0, leni=categories.length; i<leni; i++) {
		var subChilds = [];
		cellbaseChilds.push({text: categories[i].category, iconCls:"icon-box", expanded:true, children:subChilds});
		for ( var j = 0, lenj=categories[i].tracks.length; j<lenj; j++){
			var trackType = categories[i].tracks[j].id;
			var checked = categories[i].tracks[j].checked;
			var disabled = categories[i].tracks[j].disabled;
			subChilds.push({text: trackType, iconCls:"icon-blue-box", leaf:true});
			if(checked){
				var trackId = this.addTrack(trackType, trackType);
				var trackTitle = trackType+'-'+trackId;
				activeTracks.push({text: trackTitle, trackId:trackId, trackType:trackType ,checked:true, iconCls:"icon-blue-box", leaf:true});
			}
		}
	}
	
	//Load initial DAS_TRACKS config
	var das_tracks = DAS_TRACKS;
	for (var i = 0, leni = das_tracks.length; i < leni; i++) {
		if(das_tracks[i].species == species){
			for ( var j = 0, lenj = das_tracks[i].categories.length; j < lenj; j++){
				var sourceName, sourceUrl, checked;
				var subChilds = [];
				dasChilds.push({text: das_tracks[i].categories[j].name, iconCls:"icon-box", expanded:true, children:subChilds});
				for ( var k = 0, lenk = das_tracks[i].categories[j].sources.length; k < lenk; k++){
					sourceName = das_tracks[i].categories[j].sources[k].name;
					sourceUrl = das_tracks[i].categories[j].sources[k].url;
					checked = das_tracks[i].categories[j].sources[k].checked;
					subChilds.push({text:sourceName, url:sourceUrl, iconCls:"icon-blue-box", leaf:true});
					if(checked){
						//this.addDASTrack(sourceName, sourceUrl);
					}
				}
			}
			break;
		}
	}

	//PLUGINS
	for (var i = 0, leni = plugins_cat.length; i < leni; i++) {
		var subChilds = [];
		pluginChilds.push({text: plugins_cat[i].category, iconCls:"icon-box", expanded:true, children:subChilds});
		for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
			subChilds.push({text:plugins_cat[i].plugins[j].name, plugin:plugins_cat[i].plugins[j], iconCls:"icon-blue-box", leaf:true});
		}
	}

	var localChilds = [
		{text:"GFF2", iconCls:"icon-blue-box", leaf:true},
		{text:"GFF3", iconCls:"icon-blue-box", leaf:true},
		{text:"GTF", iconCls:"icon-blue-box", leaf:true},
		{text:"BED", iconCls:"icon-blue-box", leaf:true},
		{text:"VCF", iconCls:"icon-blue-box", leaf:true}
	]
	
	var activeSt = Ext.create('Ext.data.TreeStore',{
		fields:['text', 'trackId', 'trackType'],
		root:{
			expanded: true,
			children: activeTracks
		}
	});
	
	var availableSt = Ext.create('Ext.data.TreeStore',{
		root:{
			expanded: true,
			children: [
				{ text: "Cellbase", iconCls:"icon-box", expanded:true, children: cellbaseChilds },
				//{ text: "Genomic Cloud Storage", iconCls:"icon-box", expanded:true, children: [] },
				{ text: "DAS", iconCls:"icon-box", expanded:true, children: dasChilds},
				{ text: "Local", iconCls:"icon-box", expanded:true, children:localChilds}
			]
		}
	});
	
	var pluginSt = Ext.create('Ext.data.TreeStore',{
		fields:['text', 'plugin'],
		root:{
			expanded: true,
			children: pluginChilds
		}
	});

	//LOAD GCS
	//this.dqsManager = new DqsManager();
    //this.dqsManager.onBamList.addEventListener(function (evt, data){
            //console.log(data);
            //for ( var i = 0; i < data.length; i++) {
                    //availableSt.getRootNode().findChild("text","Genomic Cloud Storage").appendChild({text:data[i], iconCls:"icon-blue-box", leaf:true});
            //}
    //});
    //this.dqsManager.bamList();

    
	//example to add a children
	//availableSt.getRootNode().findChild("text","Cellbase").appendChild({text: "prueba", expanded: true, iconCls:"icon-blue-box"});

	var items = [];
	items.push({
			xtype:"treepanel",
			id:this.id+"activeTracksTree",
			title:"Active tracks",
			bodyPadding:"10 0 0 0",
			useArrows:true,
			rootVisible: false,
			hideHeaders:true,
			columns: [{
				xtype: 'treecolumn',
				dataIndex: 'text',
				flex:1
			},{
				xtype: 'actioncolumn',
				menuDisabled: true,
				align: 'center',
				tooltip: 'Edit',
				width:20,
				icon: Compbio.images.edit,
				handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
					event.stopEvent();
					if(record.isLeaf()){
						var id = record.data.trackId;
						var track = _this.getTrackSvgById(id);
						if(track != null){
							var trackSettingsWidget = new TrackSettingsWidget({
								trackSvg:track,
								treeRecord:record
							});
						}
					}
				}
			},{
				xtype: 'actioncolumn',
				menuDisabled: true,
				align: 'center',
				tooltip: 'Remove',
				width:30,
				icon: Compbio.images.del,
				handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
					//this also fires itemclick event from tree panel
					if(record.isLeaf()){
						var id = record.data.trackId;
						var checked = record.data.checked;
						record.destroy();
						if(checked){
							_this.removeTrack(id);
						}
					}
				}
			}],
			viewConfig: {
				plugins: {
					ptype: 'treeviewdragdrop'
				},
				listeners : {
					drop : function (node, data, overModel, dropPosition, eOpts){
						var record = data.records[0];
						//check if is leaf and if the record has a new index
						if(record.isLeaf() && record.data.index != record.removedFrom && record.data.checked){
							var id = record.data.trackId;
							_this.setTrackIndex(id, record.data.index);
						}
					}
				}
			},
			listeners : {
				itemclick : function (este, record, item, index, e, eOpts){
					if(record.isLeaf()){
						if(record.data.checked){//if is checked because if not checked does not exist
							//this also fires remove button click event from tree panel action column	
							//Could be that track no exists because of that
							var id = record.data.trackId;
							_this.scrollToTrack(id);
						}
					}
				},
				checkchange : function (node, checked){
					var type = node.data.trackType;
					var id = node.data.trackId;
					if(checked){
						var track = node.raw.track;
						_this.restoreTrack(track, node.data.index);
					}else{
						var track = _this.removeTrack(id);
						//save trackSvg pointer
						node.raw.track = track;
					}
				},
				itemmouseenter : function (este,record){
					var track = _this.getTrackSvgById(record.data.trackId);
					if(track != null){
						track.fnTitleMouseEnter();
					}
				},
				itemmouseleave : function (este,record){
					var track = _this.getTrackSvgById(record.data.trackId);
					if(track != null){
						track.fnTitleMouseLeave();
					}
				}
			},
			store: activeSt
		},{
			xtype:"treepanel", //*********************************************AVAILABLE
			id:this.id+"availableTracksTree",
			title:"Add new track",
			bodyPadding:"10 0 0 0",
			useArrows:true,
			rootVisible: false,
			hideHeaders:true,
			store: availableSt,
			columns: [{
				xtype: 'treecolumn',
				dataIndex: 'text',
				flex:1
			},{
				xtype: 'actioncolumn',
				menuDisabled: true,
				align: 'center',
				width:20,
				renderer: function(value, metaData, record){
					if(record.data.text == "Cellbase"){
						this.icon = Compbio.images.info;
						this.tooltip = CELLBASE_HOST;
					}else if(record.data.text == "DAS"){
						this.icon = Compbio.images.info;
						this.tooltip = "Add custom DAS track";
					}else{
						this.tooltip = null;
						this.icon = null;
					}
				}
			},{
				xtype: 'actioncolumn',
				menuDisabled: true,
				align: 'center',
				width:30,
				icon: Compbio.images.add,
				renderer: function(value, metaData, record){
					if (record.isLeaf()) {
						this.icon = Compbio.images.add;
						this.tooltip = "Add";
					}else{
						if(record.data.text == "Cellbase"){
							this.icon = Compbio.images.edit;
						}else if(record.data.text == "DAS"){
							this.icon = Compbio.images.add;
						}else{
							this.icon = null;
						}
					}
				},
				handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
					var updateActiveTracksPanel = function(trackType, trackTitle, trackId, showActive) {
						activeSt.getRootNode().appendChild({text: trackTitle, trackId:trackId, trackType:trackType, leaf: true, checked:true, iconCls:"icon-blue-box"});
						Ext.example.msg("Track "+trackType,"actived");
						Ext.getCmp(_this.id+"activeTracksTree").getSelectionModel().select(activeSt.getRootNode().findChild("trackId",trackId))
						if(showActive == true){
							Ext.getCmp(_this.id+"activeTracksTree").expand();
						}
					};
					var text = record.data.text;
					if(record.isLeaf()){
						if(record.isAncestor(availableSt.getRootNode().findChild("text","Cellbase"))){
							var type = text;
							var id = _this.addTrack(type, text);
							var title = type+'-'+id;
							updateActiveTracksPanel(type, title, id, true);
						}
						if(record.isAncestor(availableSt.getRootNode().findChild("text","DAS"))){
							var type = 'das';
							var id = _this.addDASTrack(text, record.raw.url);
							var title = text+'-'+id;
							updateActiveTracksPanel(type, title, id, true);
						}
						if(record.isAncestor(availableSt.getRootNode().findChild("text","Local"))){
							_this.addFileTrack(text, updateActiveTracksPanel);
						}
						if(record.isAncestor(availableSt.getRootNode().findChild("text","Genomic Cloud Storage"))){
							var type = "bam";
							var id = _this.addTrack(type, text);
							var title = type+'-'+id;
							updateActiveTracksPanel(type, title, id, true);
						}
					}else{
						if(text == "Cellbase"){
							Ext.Msg.prompt('Cellbase', 'Please enter a new Cellbase URL:', function(btn, text){
								if (btn == 'ok'){
									var checkHost = null;
									var testHost = "http://"+text+"/cellbase/rest";
									$.ajax({url:testHost+"/rest/latest",async:false,success:function(data){
										if(data.indexOf("hsa") != -1 )
											checkHost=true;
									}});
									if(checkHost){
										CELLBASE_HOST = testHost;
										record.set('tooltip', CELLBASE_HOST);
										Ext.example.msg("Cellbase Host","Host changed<br>"+CELLBASE_HOST);
									}else{
										Ext.example.msg("Cellbase Host","Not found");
									}
									//record.save();
								}
							});
						}
						if(record.data.text == "DAS"){
							var urlWidget = new UrlWidget({title:'Add a DAS track'});
							urlWidget.onAdd.addEventListener(function(sender, event) {
								var id = _this.addDASTrack(event.name, event.url);
								updateActiveTracksPanel('das', event.name+"-"+id, id, true);
							});
							urlWidget.draw();
						}
					}
				}
			}]
		},{
			xtype:"treepanel",
			id:this.id+"pluginsTree",
			title:"Plugins",
			bodyPadding:"10 0 0 0",
			useArrows:true,
			rootVisible: false,
			store: pluginSt,
			hideHeaders:true,
			listeners : {
				itemclick : function (este, record, item, index, e, eOpts){
					if(record.isLeaf()){
						var plugin = record.get("plugin");
						GENOME_MAPS_REGISTERED_PLUGINS[plugin.name].setViewer(_this.genomeViewer);
						GENOME_MAPS_REGISTERED_PLUGINS[plugin.name].draw();
					}
				}
			}
		},{
			title:"Search",
			id:this.id+"searchSidePanel",
			layout:{type:'vbox', align:'stretch'},
			bodyPadding:"5",
			items:[{xtype:'tbtext',text:'<p class="">Search by any external reference:</p>'},{
				id:this.id+ "searchTextArea",
	       	 	xtype: 'textarea',
	        	flex:1,
	        	enableKeyEvents:true,
	        	cls: 'dis',
	        	style:'normal 6px Ubuntu Mono, arial, verdana, sans-serif',
	        	value: '',
	        	listeners: {
					change: function(este){
						if (este.getValue()!="") {
							Ext.getCmp(_this.id+'searchPanelButton').enable();
						}else{
							Ext.getCmp(_this.id+'searchPanelButton').disable();
						}
					}
				}
			},{
				id:this.id+"searchPanelCombo",
				fieldLabel:'Result type',
				xtype:'combobox',
				store:{fields:['value', 'name'],data : [
					{"value":"info", "name":"Genes"},
					{"value":"snp", "name":"SNPs"},
					//{"value":"go", "name":"GOs"},
					{"value":"mutation", "name":"Mutations"},
					{"value":"transcript", "name":"Transcripts"},
					{"value":"exon", "name":"Exons"}
				]},
				displayField: 'name',
				valueField: 'value',
				listeners:{afterrender:function(este){este.select(este.getStore().data.items[0]);}}
			},{
				id:this.id+'searchPanelButton',
				xtype: 'button',
				text:'Search',
				disabled:true,
				handler:function(){
					var resultPan = Ext.getCmp(_this.id+"searchResults");
					resultPan.setLoading(true);
					resultPan.removeAll();
					var features = Ext.getCmp(_this.id+"searchTextArea").getValue().trim().split("\n");
					var boxValue = Ext.getCmp(_this.id+"searchPanelCombo").getValue().toLowerCase();
					var cellBaseManager = new CellBaseManager(_this.species);
					cellBaseManager.success.addEventListener(function(evt, data) {
						var notFound = "";
						var boxes = [];
						var grids = [];
						for (var i=0, leni=data.result.length; i<leni; i++) {
							if(data.result[i].length > 0){
								var featureType = boxValue.replace("info","gene");
								var id = FEATURE_TYPES[featureType].infoWidgetId;
								var st = Ext.create('Ext.data.Store', {
									fields: [id,'chromosome','start','end'], data: data.result[i],
									proxy: {type: 'pagingmemory'},pageSize: 5
								});
								grids.push({xtype:'grid', store: st, hideHeaders:true, width:245, height:170, loadMask: true, margin:'2 0 0 0',
									title:'<p class="info">'+data.query[i]+'</p>',
									columns: [{text: 'id',dataIndex: id, width:243}],
									dockedItems: [{xtype: 'pagingtoolbar',store: st, dock: 'top',beforePageText:''/*displayInfo: true*/
									}],
									listeners:{
										itemclick:function(este, record, item, index, e, eOpts){
											_this.genomeViewer.region.load(record.data);
											_this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
										}
									}
								});
							}else{
								notFound+='&nbsp; &nbsp;'+data.query[i]+'<br>';
							}
						}
						if(notFound!=""){
							notFound='<p class="err">Features not found:</p>'+notFound;
						}
						grids.push({xtype:'box',padding:"15 5 2 3",border:1,html:notFound});
						resultPan.add(grids);
						resultPan.setLoading(false);
					});
					cellBaseManager.get("feature", "gene", features, boxValue, null/*params*/);//gene must search in later versions
				}
			},
				{xtype:'tbtext',margin:'10 0 0 0',text:'<p class="">Results:</p>'},
			{
				id:this.id+"searchResults",
				border:false,
				autoScroll:true,
				flex:3
			}
			]
		}
		//,{
			//title:"Settings",
			//bodyPadding:'10 0 0 10',
			//html:"not yet"
		//}
	);
	return items;
					//Ext.getCmp(_this.id+"regionHistory").add({
					//xtype:'container',padding:"2 5 2 3",border:1,
					//html:_this.region.toString(),
					//s:_this.region.toString(),
					//listeners:{
					//afterrender:function(){
							//var s = this.s;
							//this.getEl().addClsOnOver("encima");
							//this.getEl().addCls("whiteborder");
							//this.getEl().on("click",function(){
								//_this.region.parse(s);
								//_this.setRegion({sender:"regionHistory"});
							//});
						//}
					//}
				//});
};


//App interface, Main menu ...  and others menus
GenomeMaps.prototype.getMenuBar = function() {
	/*
	var _this = this;
	var fileMenu = Ext.create('Ext.menu.Menu', {
		
		items : [
//		    {
//				text : 'New',
//				handler : function() {
//					console.log("Not yet implemented, press F5");
//				}
//			},'-',{
//				text : 'Import',
//				menu : [{
//					text : 'GFF',
//					handler : function() {
//						var gffFileWidget = new GFFFileWidget({viewer:_this.genomeViewer});
//						gffFileWidget.draw();
//						gffFileWidget.onOk.addEventListener(function(sender, args) {
//							_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
//						});
//	
//					}
//				},{
//					text : 'BED',
//					disabled : true,
//					handler : function(sender, args) {
//						_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
//					}
//				},{
//					text : 'VCF',
//					handler : function() {
//						var vcfFileWidget = new VCFFileWidget({viewer:_this.genomeViewer});
//						vcfFileWidget.draw();
//						vcfFileWidget.onOk.addEventListener(function(sender, args) {
//							console.log(args.dataAdapter);
//							_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
//		
//						});
//					}
//				}]
//			},
		]
	});
	
	
	var viewMenu = Ext.create('Ext.menu.Menu', {
		margin : '0 0 10 0',
		floating : true,
		items : [{
				text : 'Zoom',
				menu : this.getZoomMenu()
			}, '-',
//			{
//				text : 'Karyotype',
//				handler : function() {
//					Ext.getCmp(_this.genomeViewer.id+"karyotypeButton").toggle();
//				}
//			},
//			{
//				text : 'Chromosome',
//				handler : function() {
//					Ext.getCmp(_this.genomeViewer.id+"ChromosomeToggleButton").toggle();
//				}
//			},
//			{
//				text : 'Region',
//				handler : function() {
//					Ext.getCmp(_this.genomeViewer.id+"RegionToggleButton").toggle();
//				}
//			},
//			'-',
//			{
//				text : 'Label',
//				menu : this.getLabelMenu()
//			}, '-',
//			{
//				text : 'Karyotype',
//				handler : function() {
//					_this.genomeViewer._showKaryotypeWindow();
//				}
//			}, 
			{
				text : 'Gene legend',
				handler : function() {
					var legendWidget = new LegendWidget({title:"Gene legend"});
					legendWidget.draw(GENE_BIOTYPE_COLORS);
				}
			}
//			,'-',
//			{
//			text:'Ensembl Id',
//			checked:false,
//			handler : function() {
////					GENOMEMAPS_CONFIG.showFeatureStableId = this.checked;
//					_this.position = Math.ceil(_this.genomeViewer.genomeWidget.trackCanvas.getMiddlePoint())+1;
//					
//					_this.genomeViewer.refreshMasterGenomeViewer();
//					
//					if (this.checked){
//						_this.genomeViewer.genomeWidgetProperties.setLabelHeight(9);
//					}
//					else{
//						_this.genomeViewer.genomeWidgetProperties.setLabelHeight(10);
//					}
//			}
//		},

//	         {
//					text : 'Download as',
//					iconCls:'icon-box',
//					menu : [{
//						text:'PNG',iconCls:'icon-blue-box',disabled:false,
//						listeners : {
//							scope : this,
//							'click' : function() {
//								var svg = new XMLSerializer().serializeToString(_this.genomeViewer.trackSvgLayout.svg);
//								var canvas = DOM.createNewElement("canvas", document.body, [["id", _this.id+"png"],["visibility", _this.id+"hidden"]]);
//								
////								console.log(svg);
////								svg = '<svg width="1582" height="407"><svg width="7000000" height="407" x="-35000"><rect width="1000" height="200" x="1000" y="50" fill="red"></rect></svg></svg>';
//								canvg(canvas, svg);
////								console.log(canvas);
//								canvas.toBlob(function(blob) {
//						            saveAs(blob, "exported_image.png");
//						        }, "image/png");
////								Canvas2Image.saveAsPNG(canvas);
//								$("#"+_this.id+"png").remove();
////								DOM.select("canvas").parent.removeChild(canvas);
//							}
//						}
//					},{
//						text:'JPEG',iconCls:'icon-blue-box',disabled:false,
//						listeners : {
//						scope : this,
//							'click' : function() {
//								try{
////									_this.genomeViewer._getPanel().setLoading("Saving image");
//									var svg = new XMLSerializer().serializeToString(_this.genomeViewer.trackSvgLayout.svg);
//									var canvas = DOM.createNewElement("canvas", document.body, [["id", this.id+"jpg"],["visibility", this.id+"hidden"]]);
//									canvg(canvas, svg);
//									Canvas2Image.saveAsJPEG(canvas); 
//									$("#"+this.id+"jpg").remove();
////									DOM.select("canvas").parent.removeChild(canvas);
//								}
//								catch(e){
//									alert(e);
//								}
//								finally{
////									_this.genomeViewer._getPanel().setLoading(false);
//								}
//							}
//						}
//					}]
//				}
			]
	});
	
	var searchMenu = Ext.create('Ext.menu.Menu', {
		margin : '0 0 10 0',
		floating : true,
		items : [ {
				text: 'Feature',
				menu : this.getFeatureSearchMenu()
			},
			{
				text:'Functional',
				menu: this.getFunctionalSearchMenu()
				
			},{
				text: 'Regulatory',
				menu : this.getRegulatorySearchMenu()
			}
		]
	});
	
	var toolbarMenu = Ext.create('Ext.toolbar.Toolbar', {
		cls:'bio-menubar',
		height:27,
		region:"north",
		padding:'0 0 0 10',
//		margins : '0 0 0 5',
		items : [
//		{
//				text : 'File',
//				menu : fileMenu
//			},
			{
				text : 'View',
				menu : viewMenu
			},{
				text : 'Search',
				menu : searchMenu
			},{
				id : this.id+"tracksMenu",
				text : 'Tracks',
				menu : []
			},{
				text : 'Plugins',
				menu : this.getPluginsMenu()
			}
		]
	});
	return toolbarMenu;
	*/
};

/** zoom Menu * */
GenomeMaps.prototype.getZoomMenu = function(chromosome, position) {
	/*
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
				items : []
			});
	for ( var i = 0; i <= 100; i=i+10) {
		menu.add({text : i + '%', group : 'zoom', checked : false, handler : function() {
			Ext.getCmp(_this.genomeViewer.id+'zoomSlider').setValue(this.text.replace("%", "")); 
		}});
	}
	return menu;
	* */
};

/** label Menu **/
GenomeMaps.prototype.getLabelMenu = function() {
	/*
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
				items : [
					{
						text:'None',
						handler : function() {
							_this.genomeViewer.genomeWidgetProperties.setLabelHeight(0);
							_this.genomeViewer.refreshMasterGenomeViewer();
						}
					},
					{
						text:'Small',
						handler : function() {
								_this.genomeViewer.genomeWidgetProperties.setLabelHeight(8);
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
					},
					{
						text:'Medium',
						handler : function() {
								_this.genomeViewer.genomeWidgetProperties.setLabelHeight(10);
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
					},
					{
						text:'Large',
						handler : function() {
								_this.genomeViewer.genomeWidgetProperties.setLabelHeight(12);
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
					},
					{
						text:'x-Large',
						handler : function() {
							_this.genomeViewer.genomeWidgetProperties.setLabelHeight(14);
							_this.genomeViewer.refreshMasterGenomeViewer();
							}
					}
					]
			});
	return menu;
	*/
};

/** search Feature Menu **/
GenomeMaps.prototype.getFeatureSearchMenu = function() {
	/*
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ {
						text : 'Genes',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Gene List',viewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, geneNames) {
								_this.genomeViewer.openGeneListWidget(geneNames);
							});
							inputListWidget.draw();
						}
					},
//					,
//					{
//						text : 'Transcript',
//						handler : function() {
//							var inputListWidget = new InputListWidget({title:'Ensembl Transcript',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, names) {
//								_this.genomeViewer.openTranscriptListWidget(names);
//							});
//							inputListWidget.draw();
//						}
//					}
//					,
//					{
//						text : 'Exon',
//						handler : function() {
//							//ENSE00001663727
//							var inputListWidget = new InputListWidget({title:'Ensembl Exon List',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, geneNames) {
//								_this.genomeViewer.openExonListWidget(geneNames);
//							});
//							inputListWidget.draw();
//						}
//					}
					{
						text : 'SNP',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'SNP List',viewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openSNPListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					}
//					,
//					{
//						text : 'Protein',
//						handler : function() {
//							var inputListWidget = new InputListWidget({title:'Ensembl Protein',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
//								_this.genomeViewer.openGOListWidget(snpNames);
//							});
//							inputListWidget.draw();
//						}
//					}
					
					
					]
			});
	return menu;
	*/
};

GenomeMaps.prototype.getFunctionalSearchMenu = function() {
	/*
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ 
			  {
						text : 'GO',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Gene Ontology',viewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openGOListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					},
					{
						text : 'Reactome',
						disabled:true,
						handler : function() {
							alert("Not yet implemented");
						}
					}
//					,
//					{
//						text : 'Interpro',
//						handler : function() {
//							var inputListWidget = new InputListWidget({title:'Protein',viewer:_this.genomeViewer});
//							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
//								_this.genomeViewer.openGOListWidget(snpNames);
//							});
//							inputListWidget.draw();
//						}
//					}
					]
			});
	return menu;
	* */
};

GenomeMaps.prototype.getRegulatorySearchMenu = function() {
	/*
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ 
			  {
						text : 'miRNA Target',
						disabled:true,
						handler : function() {
						alert("Not yet implemented");
						}
					},
					{
						text : 'TFBS',
						disabled:true,
						handler : function() {
							alert("Not yet implemented");
						}
					}
					]
			});
	return menu;
	* */
};


GenomeMaps.prototype.setTracksMenu = function() {
	/*
	Ext.getCmp(this.id+"tracksMenu").menu=this.getTracksMenu();
	*/
};

GenomeMaps.prototype.getTracksMenu = function() {
	/*
	var _this = this;
	if(this._TracksMenu!=null){
		this._TracksMenu.destroy();
	}
	
	var species = this.genomeViewer.species;
	var categories = TRACKS[SPECIES_TRACKS_GROUP[species]];
	
	var items = new Array();
	
	for (var i = 0, leni = categories.length; i < leni; i++) {
		var sources = [];
		for ( var j = 0, lenj = categories[i].tracks.length; j < lenj; j++){
			sources.push({
				id : this.id+categories[i].tracks[j].id+"menu",
				text : categories[i].tracks[j].id,
				disabled : categories[i].tracks[j].disabled,
				checked : categories[i].tracks[j].checked,
				handler : function() {
					if(this.checked){
//						if(_this.genomeViewer.trackSvgLayout.swapHash[this.text]){
//							_this.genomeViewer.trackSvgLayout._showTrack(this.text);
//						}else{
							_this.addTrack(this.text);
//						}
					}
					else{
						_this.removeTrack(this.text);
					}
				}
			});
		}
		items.push({
			text : categories[i].category,
			menu : sources
		});
	}
	
	items.push("-");
	items.push({
		id : this.id+"tracksMenuDAS",
		text : 'DAS',
		menu : this.getDASMenu()
	});
	
	
	this._TracksMenu = Ext.create('Ext.menu.Menu', {
		id:this.id_panel+"_TracksMenu",
		margin : '0 0 10 0',
		floating : true,
		items : items
	});
	return this._TracksMenu;
	*/
};

GenomeMaps.prototype.getDASMenu = function() {
	/*
	var _this = this;
	
	var tracks = DAS_TRACKS;
	var species = this.genomeViewer.species;
	//Auto generate menu items depending of DAS_TRACKS config
//	var menu = this.getDASMenu();
//	menu.removeAll(); // Remove the old DAS
	
	var items = new Array();
	
	for (var i = 0, leni = tracks.length; i < leni; i++) {
		if(tracks[i].species == species){
			for ( var j = 0, lenj = tracks[i].categories.length; j < lenj; j++){
				var sources = [];
				for ( var k = 0, lenk = tracks[i].categories[j].sources.length; k < lenk; k++){
					sources.push({
						id : this.id+tracks[i].categories[j].sources[k].name+"menu",
						text : tracks[i].categories[j].sources[k].name,
						sourceName : tracks[i].categories[j].sources[k].name,
						sourceUrl : tracks[i].categories[j].sources[k].url,
						checked : tracks[i].categories[j].sources[k].checked,
						handler : function() {
							if(this.checked){
//								if(_this.genomeViewer.trackSvgLayout.swapHash[this.sourceName]){
//								_this.genomeViewer.trackSvgLayout._showTrack(this.sourceName);
//								}else{
								_this.addDASTrack(this.sourceName, this.sourceUrl);
//								}
							}
							else{
								_this.removeTrack(this.sourceName);
							}
						}
					});
				}
				items.push({
					text : tracks[i].categories[j].name,
					menu : sources
				});
			}
			break;
		}
	}
	
	//Add custom source
	items.push("-",{
		text : 'Add custom...',
		handler : function() {
			var urlWidget = new UrlWidget({title:'Add a DAS track'});
			urlWidget.onAdd.addEventListener(function(sender, event) {
				_this.addDASTrack(event.name, event.url);
				_this.setCustomDASMenu(event.name);
			});
			urlWidget.draw();
		},
		menu :{
			id:this.id+"_customDASMenu",
			margin : '0 0 10 0',
			floating : true,
			items : []
		}
	});
	
	this._DASMenu = Ext.create('Ext.menu.Menu', {
		id:this.id_panel+"_DASMenu",
		margin : '0 0 10 0',
		floating : true,
		items : items
	});
	return this._DASMenu;
	*/
};

GenomeMaps.prototype.setCustomDASMenu = function(name) {
	/*
	var _this = this;
	Ext.getCmp(this.id+"_customDASMenu").add({
		text : name,
		checked : true,
		handler : function() {
			if(this.checked){
				  _this.genomeViewer.showTrack(this.text);
			  }
			  else{
				  _this.genomeViewer.hideTrack(this.text);
			  }
		}
	});
	*/
};

GenomeMaps.prototype.getPluginsMenu = function() {
	/*
	if(this._pluginsMenu == null){
		this._pluginsMenu = Ext.create('Ext.menu.Menu', {
			id:this.id+"_pluginsMenu",
			margin : '0 0 10 0',
			floating : true,
			items : []
		});
	}
	return this._pluginsMenu;
	*/
};

GenomeMaps.prototype.setPluginsMenu = function() {
	/*
	var _this = this;
	var plugins_cat = GENOME_MAPS_AVAILABLE_PLUGINS;
	var species = this.genomeViewer.species;
	
	//Auto generate menu items depending of AVAILABLE_PLUGINS config
	var menu = this.getPluginsMenu();
	menu.removeAll(); // Remove the old entries
	menu.add([{
		id : this.id+"tracksMenuPlugins",
		text : 'Load',
		menu : [
		  {
			id : this.id+"tracksMenuGFF2",
			text : 'GFF2',
			handler : function() {
//			_this.getGFFUploadMenu();
//			_this.openGFFDialog.show();
			var gffFileWidget = new GFFFileWidget({version:2,viewer:_this.genomeViewer});
			gffFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					gffFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					gffFileWidget.sessionFinished();
				});
			}
			gffFileWidget.onOk.addEventListener(function(sender, event) {
				var gff2Track = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(gff2Track,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});

		}
		},
		  {
			id : this.id+"tracksMenuGFF3",
			text : 'GFF3',
			handler : function() {
//			_this.getGFFUploadMenu();
//			_this.openGFFDialog.show();
			var gffFileWidget = new GFFFileWidget({version:3,viewer:_this.genomeViewer});
			gffFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					gffFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					gffFileWidget.sessionFinished();
				});
			}
			gffFileWidget.onOk.addEventListener(function(sender, event) {
				var gff3Track = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(gff3Track,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});

		}
		},
		  {
			id : this.id+"tracksMenuGTF",
			text : 'GTF',
			handler : function() {
//			_this.getGFFUploadMenu();
//			_this.openGFFDialog.show();
			var gtfFileWidget = new GTFFileWidget({viewer:_this.genomeViewer});
			gtfFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					gtfFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					gtfFileWidget.sessionFinished();
				});
			}
			gtfFileWidget.onOk.addEventListener(function(sender, event) {
				var gtfTrack = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(gtfTrack,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});

		}
		},
		
		{
			id : this.id+"tracksMenuBED",
			text : 'BED',
			handler : function() {
				var bedFileWidget = new BEDFileWidget({viewer:_this.genomeViewer});
				bedFileWidget.draw();
				if (_this.wum){
					_this.headerWidget.onLogin.addEventListener(function (sender){
						bedFileWidget.sessionInitiated();
					});
					_this.headerWidget.onLogout.addEventListener(function (sender){
						bedFileWidget.sessionFinished();
					});
				}
				bedFileWidget.onOk.addEventListener(function(sender, event) {
					var bedTrack = new TrackData(event.fileName,{
						adapter: event.adapter
					});
					_this.genomeViewer.addTrack(bedTrack,{
						id:event.fileName,
						featuresRender:"MultiFeatureRender",
//						histogramZoom:80,
						height:150,
						visibleRange:{start:0,end:100},
						featureTypes:FEATURE_TYPES
					});
				});
			}
		},
		{
			id : this.id+"tracksMenuVCF",
			text : 'VCF4',
			handler : function() {
			var vcfFileWidget = new VCFFileWidget({viewer:_this.genomeViewer});
			vcfFileWidget.draw();
			if (_this.wum){
				_this.headerWidget.onLogin.addEventListener(function (sender){
					vcfFileWidget.sessionInitiated();
				});
				_this.headerWidget.onLogout.addEventListener(function (sender){
					vcfFileWidget.sessionFinished();
				});
			}
			vcfFileWidget.onOk.addEventListener(function(sender, event) {
				console.log(event.fileName);
				var vcfTrack = new TrackData(event.fileName,{
					adapter: event.adapter
				});
				_this.genomeViewer.addTrack(vcfTrack,{
					id:event.fileName,
					featuresRender:"MultiFeatureRender",
//					histogramZoom:80,
					height:150,
					visibleRange:{start:0,end:100},
					featureTypes:FEATURE_TYPES
				});
			});
		}
		}

		]
	}]);
	

	//XXX ANALYSIS PLUGINS
	for (var i = 0, leni = plugins_cat.length; i < leni; i++) {
		// If category is blank, adds directly a button in the root menu
		if(plugins_cat[i].category === ""){
			for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
				menu.add({
					text : plugins_cat[i].plugins[j].name,
					pluginName : plugins_cat[i].plugins[j].name,
					handler : function() {
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].setViewer(_this.genomeViewer);
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].draw();
//						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].launch();
					}
				});
			}
		}
		else{
			var sources = [];
			for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
//			if(plugins[i].species == species){
				sources.push({text : plugins_cat[i].plugins[j].name,
					pluginName : plugins_cat[i].plugins[j].name,
					handler : function() {
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].setViewer(_this.genomeViewer);
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].draw();
//						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].launch();
					}
				});
//				break;
//			}
			}
			menu.add({
				text : plugins_cat[i].category,
				menu : sources
			});
		}
	}
	//XXX ANALYSIS PLUGINS
	*/
};

