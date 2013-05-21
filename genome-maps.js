/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of Genome Maps.
 *
 * Genome Maps is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
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
    this.title = 'Genome Maps';
    this.description = "Genomic data visualization";
    this.version = "3.1.0";

	this.trackIdCounter = 1;
	
    this.args = args;
    this.width = $(window).width();
    this.height = $(window).height();
    this.targetId = targetId || document.body;

//    if (targetId != null) {
//        this.targetId = targetId;
//    }
    if (args != null) {
        if (args.width != null) {
            this.width = args.width;
        }
        if (args.height != null) {
            this.height = args.height;
        }
    }

	this.accountData = null;
    
    var region = new Region();
	
    var url = $.url();
    var url_cbhost = url.param('CELLBASE_HOST');
    if(url_cbhost != null) {
		CELLBASE_HOST = url_cbhost;
    }

    speciesObj = DEFAULT_SPECIES;
    var urlSpecies = url.param('species');
    if(typeof urlSpecies !== 'undefined' && urlSpecies != ''){
        speciesObj = Utils.getSpeciesFromAvailable(AVAILABLE_SPECIES,urlSpecies) || speciesObj;
    }
    this.species = Utils.getSpeciesCode(speciesObj.text);
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

//	if (this.opencga==true){
    this.headerWidget = new HeaderWidget({
            appname: this.title,
            description: this.description,
            version:this.version,
            suiteId : this.suiteId,
            accountData:this.accountData
    });
//	if($.cookie("gm_settings")){
//		var species = JSON.parse($.cookie("gm_settings")).species;
//	}else{
//		var species = AVAILABLE_SPECIES[0];
//	}

	//CHECK genomeviewer check if the param is provided by url to apply zoom param or region param
	region.url = url.param('region');

    //visualiaztion URL paramaters
    var confPanelHidden = CONFPANELHIDDEN;
    if( url.param('confpanel') === 'false'){
        confPanelHidden = true;
    }
    var regionPanelHidden = REGIONPANELHIDDEN;
    if( url.param('regionpanel') === 'false'){
        regionPanelHidden = false;
    }
    this.genomeViewer = new GenomeViewer(this.id+"gvDiv", speciesObj,{
			region:region,
            version:this.version,
            zoom:urlZoom,
            confPanelHidden:confPanelHidden,
            regionPanelHidden:regionPanelHidden,
            availableSpecies: AVAILABLE_SPECIES,
            popularSpecies: POPULAR_SPECIES,
            height:this.height-this.headerWidget.height,
            width:this.width
    });
    
    /**Atach events i listen**/
    this.headerWidget.onLogin.addEventListener (function (sender) {
		Ext.example.msg('Welcome', 'You logged in');
		_this.sessionInitiated();
    });
    
    this.headerWidget.onLogout.addEventListener (function (sender) {
		Ext.example.msg('Good bye', 'You logged out');
		_this.sessionFinished();        
    });

    this.headerWidget.onGetAccountInfo.addEventListener(function (evt, response){
		_this.setAccountData(response);
	});

    this._updateLocalOpencgaTracks();

    //SPECIE EVENT
    this.genomeViewer.onSpeciesChange.addEventListener(function(sender,data){
//            _this._setTracks();
//            _this.setTracksMenu();
            _this.headerWidget.setDescription(_this.genomeViewer.speciesName);
            _this.species=_this.genomeViewer.species;
            _this._refreshInitialTracksConfig();
    });

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

GenomeMaps.prototype.sessionInitiated = function(){
    Ext.getStore(this.id+'import').getRootNode().findChild('id','opencga').set('text','Browse remote data');
};

GenomeMaps.prototype.sessionFinished = function(){
    Ext.getStore(this.id+'import').getRootNode().findChild('id','opencga').set('text','Browse remote data <span class="tip">(login required)</span>');
	this._unloadOpencgaTracks();
	this.accountData = null;
};

GenomeMaps.prototype.setAccountData = function(response) {
    this.accountData = response;
	this._updateOpencgaTracks(JSON.parse(JSON.stringify(response)));
};

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
			layout:'border',
			border:false,
			width:this.width,
			height:this.height,
			items:[this.headerWidget.getPanel(),gvContainer]
		});
		
		this.headerWidget.setDescription(this.genomeViewer.speciesName);

		this.genomeViewer.afterRender.addEventListener(function(sender,event){
			Ext.getCmp(_this.genomeViewer.id+"versionLabel").setText('<span class="info">Genome Maps v'+_this.version+'</span>');
			_this._setOverviewTracks();
			_this.genomeViewer.addSidePanelItems(_this.getSidePanelItems());
			_this.genomeViewer.onSvgRemoveTrack.addEventListener(function(sender,trackId){
				Ext.getCmp(_this.id+trackId+"menu").setChecked(false);
			});
		});
		this.genomeViewer.draw();
	}

	//check login
	if($.cookie('bioinfo_sid') != null){
		this.sessionInitiated();
	}else{
		this.sessionFinished();
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

//deprecated
//GenomeMaps.prototype.setLocationByFeature = function(name, feature){
//	var loc = this.getRegionByFeature(name, feature);
//	if (loc.chromosome != null &&  loc.position != null){
//		this.genomeViewer.setLoc(loc);
//	}
//};

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
		id:"gene1",
		type:"gene",
		title:"Gene",
		featuresRender:"MultiFeatureRender",
		histogramZoom:10,
		labelZoom:20,
		height:150,
		visibleRange:{start:0,end:100},
		titleVisibility:'hidden',
		featureTypes:FEATURE_TYPES
	});
};

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

GenomeMaps.prototype.addTrack = function(trackType, trackTitle, objectid, host) {
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
				options:{},
				featureConfig:FEATURE_CONFIG.gene
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
			height:30,
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
                params:{
                    exclude:'transcriptVariations,xrefs,samples'
                },
				featureCache:{
					gzip: true,
					chunkSize:10000
				},
				filters:{},
				options:{},
				featureConfig:FEATURE_CONFIG.snp
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
				resource: 'regulatory',
                params:{
                    type:'mirna_target'
                },
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
			histogramZoom:0,
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
				resource: "regulatory",
                params:{
                    type:'TF_binding_site_motif'
                },
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
			histogramZoom:0,
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
				resource: "conserved_region2",
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
                host:host,
				//resource: trackTitle.substr(0,trackTitle.length-4),
				resource: objectid,
				species: this.genomeViewer.species,
				featureCache:{
					gzip: false,
					chunkSize:5000
				},
				filters:{},
				options:{},
				featureConfig:FEATURE_CONFIG.bam
			})
		});
		this.genomeViewer.addTrack(bamTrack,{
			id:id,
			type:trackType,
			title:trackTitle,
			featuresRender:"BamRender",
			histogramZoom:60,
			height:24,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		break;

    case "vcf":
        var vcfTrack = new TrackData(id,{
            adapter: new OpencgaAdapter({
                category: "vcf",
                //resource: trackTitle.substr(0,trackTitle.length-4),
                resource: objectid,
                species: this.genomeViewer.species,
                featureCache:{
                    gzip: false,
                    chunkSize:5000
                },
                filters:{},
                options:{},
                featureConfig:FEATURE_CONFIG.vcf
            })
        });
        this.genomeViewer.addTrack(vcfTrack,{
            id:id,
            type:trackType,
            title:trackTitle,
            featuresRender:"MultiFeatureRender",
            histogramZoom:60,
            height:150,
            visibleRange:{start:0,end:100},
            featureTypes:FEATURE_TYPES
        });
        break;
	default:
		return null;
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
        _this.headerWidget.onLogin.addEventListener(function (sender){
            fileWidget.sessionInitiated();
        });
        _this.headerWidget.onLogout.addEventListener(function (sender){
            fileWidget.sessionFinished();
        });
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


GenomeMaps.prototype._loadInitialTracksConfig= function(args){
    //Load initial TRACKS config
    var categories = TRACKS[SPECIES_TRACKS_GROUP[this.species]];
    var activeTracks = [];
    var cellbaseTracks = [];
    for (var i=0, leni=categories.length; i<leni; i++) {
        var subChilds = [];
        cellbaseTracks.push({text: categories[i].category, iconCls:"icon-box", expanded:true, children:subChilds});
        for ( var j = 0, lenj=categories[i].tracks.length; j<lenj; j++){
            var trackType = categories[i].tracks[j].id;
            var checked = categories[i].tracks[j].checked;
            var disabled = categories[i].tracks[j].disabled;
            subChilds.push({text: trackType, iconCls:"icon-blue-box", leaf:true, disabled:disabled});
            if(checked){
                if(args && args.addTrack){
                    var trackId = this.addTrack(trackType, trackType);
                }
                activeTracks.push({text: trackType, trackId:trackId, trackType:trackType ,checked:true, iconCls:"icon-blue-box", leaf:true});
            }
        }
    }
    return {cellbaseTracks:cellbaseTracks,activeTracks:activeTracks};
};

GenomeMaps.prototype._refreshInitialTracksConfig = function(){//TODO finish
    var availableStore = Ext.getStore(this.id+'curated');
    var cellbaseNode = availableStore.getRootNode().findChild('text','CellBase');
    cellbaseNode.removeAll();
    cellbaseNode.appendChild(this._loadInitialTracksConfig().cellbaseTracks);
};

GenomeMaps.prototype._loadInitialDasTrackConfig= function(){
    //Load initial DAS_TRACKS config
    var das_tracks = DAS_TRACKS;
    var dasChilds = [];
    for (var i = 0, leni = das_tracks.length; i < leni; i++) {
        if(das_tracks[i].species == this.species){
            for ( var j = 0, lenj = das_tracks[i].categories.length; j < lenj; j++){
                var sourceName, sourceUrl, checked;
                var subChilds = [];
                dasChilds.push({text: das_tracks[i].categories[j].name, iconCls:"icon-box", expanded:true, children:subChilds});
                for ( var k = 0, lenk = das_tracks[i].categories[j].sources.length; k < lenk; k++){
                    sourceName = das_tracks[i].categories[j].sources[k].name;
                    sourceUrl = das_tracks[i].categories[j].sources[k].url;
                    checked = das_tracks[i].categories[j].sources[k].checked;
                    subChilds.push({text:sourceName, url:sourceUrl, iconCls:"icon-blue-box", leaf:true});
                    //if(checked){
                    //this.addDASTrack(sourceName, sourceUrl);
                    //}
                }
            }
            break;
        }
    }
    return dasChilds;
};

GenomeMaps.prototype._loadInitialPluginTrackConfig= function(){
	var plugins_cat = GENOME_MAPS_AVAILABLE_PLUGINS;
	var pluginChilds = [];
    for (var i = 0, leni = plugins_cat.length; i < leni; i++) {
        var subChilds = [];
        pluginChilds.push({text: plugins_cat[i].category, iconCls:"icon-box", expanded:true, children:subChilds});
        for (var j = 0, lenj = plugins_cat[i].plugins.length; j < lenj; j++){
            subChilds.push({text:plugins_cat[i].plugins[j].name, plugin:plugins_cat[i].plugins[j], iconCls:"icon-blue-box", leaf:true});
        }
    }
    return pluginChilds;
};

GenomeMaps.prototype.getSidePanelItems = function() {
	var _this = this;


    var tracks = this._loadInitialTracksConfig({addTrack:true});
    var pluginTracks = this._loadInitialPluginTrackConfig();

	var activeSt = Ext.create('Ext.data.TreeStore',{
		fields:['text', 'trackId', 'trackType'],
		root:{
			expanded: true,
			children: tracks.activeTracks
		}
	});
	this.activeSt = activeSt;

	var pluginSt = Ext.create('Ext.data.TreeStore',{
		fields:['text', 'plugin'],
		root:{
			expanded: true,
			children: pluginTracks
		}
	});
	/**example to add a children**/
	//availableSt.getRootNode().findChild("text","Cellbase").appendChild({text: "prueba", expanded: true, iconCls:"icon-blue-box"});

    var activeTracksPanel = {
        title:'<span class="">Active tracks</span>',
        id:this.id+"activeTracksPanel",
        border:0,
        layout:{type:'vbox', align:'stretch'},
        items:[{
            xtype:"treepanel",
            id:this.id+"activeTracksTree",
            store: activeSt,
            bodyPadding:"5 0 0 0",
            margin:"-1 0 0 0",
            border:false,
            autoScroll:true,
            flex:1,
            useArrows:true,
            rootVisible: false,
            selType: 'cellmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2,listeners:{
                edit:function(editor, e, eOpts){
                    var id = e.record.data.trackId;
                    var trackSvg = _this.getTrackSvgById(id);
                    trackSvg.setTitle(e.record.data.text);
                }
            }})],
            hideHeaders:true,
            columns: [{
                xtype: 'treecolumn',
                dataIndex: 'text',
                flex:1,
                editor: {xtype: 'textfield',allowBlank: false}
            },
                //{
                //xtype: 'actioncolumn',
                //menuDisabled: true,
                //align: 'center',
                //tooltip: 'Edit',
                //width:20,
                //icon: Utils.images.edit,
                //handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                //event.stopEvent();
                //if(record.isLeaf()){
                //var id = record.data.trackId;
                //var track = _this.getTrackSvgById(id);
                //if(track != null){
                //var trackSettingsWidget = new TrackSettingsWidget({
                //trackSvg:track,
                //treeRecord:record
                //});
                //}
                //}
                //}
                //},
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    align: 'center',
                    tooltip: 'Remove',
                    width:30,
                    icon: Utils.images.del,
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
                markDirty:false,
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
                        if(record.data.checked){//track can be disabled, so if not checked does not exist in trackSvgLayout
                            //this also fires remove button click event from tree panel action column
                            var id = record.data.trackId;
                            _this.scrollToTrack(id);
                            var trackSvg = _this.getTrackSvgById(id);
                            if(trackSvg!=null){
                                _this._loadTrackConfig(trackSvg,record);
                            }
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
            }
        },{
            xtype:"tabpanel",
            id:this.id+"activeTracksSettings",
            plain: true,
            border:false,
            margin :"5 0 0 0",
            autoScroll:true,
            flex:2,
            items:[
                {
                    id:this.id+"trackOptions",
                    itemId:this.id+"trackOptions",
                    title:"Options",
                    bodyPadding:10,
                    border:false
                },{
                    id:this.id+"trackFiltering",
                    itemId:this.id+"trackFiltering",
                    title:"Filtering",
                    layout:{type:'vbox', align:'stretch'},
                    border:false
                }
            ]
        }]
    };


    var pluginsTree =  {
        xtype:"treepanel",
        id:this.id+"pluginsTree",
        title:'<span class="">Analysis</span>',
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
    };

    var searchSidePanel = {
        title:'<span class="">Advanced search</span>',
        id:this.id+"searchSidePanel",
//        icon:Utils.images.info,
        layout:{type:'vbox', align:'stretch'},
        bodyPadding:"5",
        items:[{
            xtype:'tbtext',text:'<span class="">Search by any external reference:</span>'
        },{
            id:this.id+ "searchTextArea",
            xtype: 'textarea',
            flex:1,
            enableKeyEvents:true,
//            cls: 'dis',
//            style:'normal 6px Ubuntu Mono, arial, verdana, sans-serif',
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
//                {"value":"mutation", "name":"Mutations"},
                {"value":"transcript", "name":"Transcripts"},
                {"value":"exon", "name":"Exons"}
            ]},
            displayField: 'name',
            valueField: 'value',
            listeners:{afterrender:function(este){este.select(este.getStore().data.items[0]);}}
        },{
            id:this.id+'searchPanelButton',
            margin:"0 0 0 0",
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
                    var notFound = "", boxes = [];
                    var featureType = boxValue.replace("info","gene");
                    var id = FEATURE_TYPES[featureType].infoWidgetId;
                    for (var i=0, leni=data.result.length; i<leni; i++) {
                        var queryStr = data.query[i];
                        if(data.result[i].length > 0){
                            var collapsed = data.query.length > 3;
                            switch (featureType){
                                case 'snp':
                                case 'mutation':
                                case 'exon':
                                    var items = [];
                                    var featList = data.result[i];
                                    var width = (featList.length > 1) ? 244 : 250;
                                    for (var j=0, lenj=featList.length; j<lenj; j++) {
                                        var features = featList[j];
                                        var st = Ext.create('Ext.data.Store', {
                                            fields: [id,'chromosome','start','end'], data: features,
                                            proxy: {type: 'memory'},pageSize: 5
                                        });
                                        items.push({xtype:'grid', store: st, hideHeaders:true, width:width, height:180, loadMask: true, margin:'2 0 0 0',
                                            title:'<span class="info">'+queryStr+'</span> <span style="font-family: Oxygen;color:slategray">'+features.length+'</span>',collapsible:true,collapsed:collapsed,titleCollapse:true,
                                            columns: [{text: 'id',dataIndex: id, width:230}],plugins: 'bufferedrenderer',loadMask: true,
        //                                    dockedItems: [{items:{xtype:'field'}}],
                                            listeners:{
                                                itemclick:function(este, record, item, index, e, eOpts){
                                                    _this.genomeViewer.region.load(record.data);
                                                    _this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
                                                }
                                            }
                                        });
                                    }
                                    if(items.length < 2){
                                        boxes.push(items[0]);
                                    }else{
                                        boxes.push({xtype:'panel',title:'<span class="info">'+queryStr+'</span> - <span style="font-family: Oxygen;color:slategray">'+items.length+' genes</span>',bodyPadding:"0 2 2 2",
                                            collapsible:true,collapsed:false,titleCollapse:true, width:250, items:items});
                                    }

                                    break;
                                case 'transcript':
                                    collapsed = false;
                                    var items = [];
                                    var tpl = new Ext.XTemplate('<span>{'+id+'}</span>');
                                    var transcriptsList = data.result[i];
                                    for (var j=0, lenj=transcriptsList.length; j<lenj; j++) {
                                        var transcripts =transcriptsList[j];
                                        items2 = [];
                                        for (var k=0, lenk=transcripts.length; k<lenk; k++) {
                                            var transcript = transcripts[k];
                                            items2.push({xtype:'box',padding:"1 5 1 10",border:1,tpl:tpl,
                                                data:transcript,datos:transcript,
                                                listeners:{afterrender:function(este){
                                                    this.getEl().addClsOnOver("encima2");
                                                    this.getEl().addCls("whiteborder");
                                                    this.getEl().on("click",function(){
                                                        _this.genomeViewer.region.load(este.datos);
                                                        _this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
                                                    });
                                                }}
                                            });
                                        }
                                        items.push({xtype:'panel',border:0,title: ("Gene "+(j+1)),items:items2});
                                    }
                                    if(items.length < 2){
                                        items = items[0].items
                                    }
                                    boxes.push({xtype:'panel',title:'<span class="info">'+queryStr+'</span>',margin:"2 0 0 0",
                                        collapsible:true,collapsed:false,titleCollapse:true, width:250, items:items});

                                    break;
                                default:
                                    collapsed = false;
                                    var items = [];
                                    var tpl = new Ext.XTemplate('<span>{'+id+'}</span>');
                                    for (var j=0, lenj=data.result[i].length; j<lenj; j++) {
                                        items.push({xtype:'box',padding:"1 5 1 10",border:1,tpl:tpl,
                                            data:data.result[i][j],datos:data.result[i][j],
                                            listeners:{afterrender:function(este){
                                                this.getEl().addClsOnOver("encima2");
                                                this.getEl().addCls("whiteborder");
                                                this.getEl().on("click",function(){
                                                    _this.genomeViewer.region.load(este.datos);
                                                    _this.genomeViewer.onRegionChange.notify({sender:"searchSidePanel"});
                                                });
                                            }}
                                        });
                                    }
                                    boxes.push({xtype:'panel',title:'<span class="info">'+queryStr+'</span>',margin:"2 0 0 0",
                                        collapsible:true,collapsed:false,titleCollapse:true, width:250, items:items});

                                    break;

                            }
                        }else{
                            notFound+='&nbsp; &nbsp;'+data.query[i]+'<br>';
                        }
                    }
                    if(notFound!=""){
                        notFound='<span class="err">Features not found:</span>'+notFound;
                    }
                    boxes.push({xtype:'box',padding:"15 5 2 3",border:1,html:notFound});
                    resultPan.add(boxes);
                    resultPan.setLoading(false);
                });
                var params = null;
                switch (boxValue){
                    case 'snp': params = {exclude:'transcriptVariations,xrefs,samples'}; break;
                    case 'transcript': params = {exclude:'exons,xrefs'}; break;
                }
                cellBaseManager.get("feature", "gene", features, boxValue, params);//gene must search in later versions
            }
        },{
            xtype:'tbtext',margin:'10 0 0 0',text:'<p class="">Results:</p>'
        },{
            id:this.id+"searchResults",
            border:false,
            autoScroll:true,
            flex:3,
            items:[{xtype:'container'}]//dummy container, will be removed on first search
        }]
    };


    var curatedTree = this._createTracksTreePanel({
        title:'Add new tracks from CellBase and DAS',
        id :'curated',
        nodes : [
            { text: "CellBase", iconCls:"icon-box", id:'cellbase', expanded:true, children: tracks.cellbaseTracks },
            { text: "DAS", iconCls:"icon-box", id:'das', expanded:true, children: this._loadInitialDasTrackConfig()}
        ]
    });

    var localChilds = [
        {text:"GFF2", iconCls:"icon-blue-box", leaf:true},
        {text:"GFF3", iconCls:"icon-blue-box", leaf:true},
//        {text:"GTF", iconCls:"icon-blue-box", leaf:true},
        {text:"BED", iconCls:"icon-blue-box", leaf:true},
        {text:"VCF", iconCls:"icon-blue-box", leaf:true}
    ];


    var importTree = this._createTracksTreePanel({
        title:'Import data',
        id:'import',
        nodes:[
            { text: 'Browse remote data', id:'opencga', iconCls:'icon-box', expanded:true, children: [] },
            { text: 'Browse local data <span class="tip">(light server required)</span>', id:'localopencga', iconCls:"icon-box", expanded:true, children: [] },
            { text: 'Load local data (<500MB)', id:'load', iconCls:'icon-box', expanded:true, children:localChilds}
        ]
    });

    return [activeTracksPanel,curatedTree,importTree,/*pluginsTree,*/searchSidePanel];

		//,{
			//title:"Settings",
			//bodyPadding:'10 0 0 10',
			//html:"not yet"
		//}
};


GenomeMaps.prototype._createTracksTreePanel = function(args) {

    var _this = this;
    var store = Ext.create('Ext.data.TreeStore',{
        id:this.id+args.id,
        fields:['text','id'],
        root:{
            expanded: true,
            children: args.nodes
        }
    });

    return {
        xtype:"treepanel", //*********************************************AVAILABLE
        id:this.id+args.id,
        title:'<span class="">'+args.title+'</span>',
        bodyPadding:"10 0 0 0",
        useArrows:true,
        rootVisible: false,
        hideHeaders:true,
        store: store,
        viewConfig: {markDirty:false},
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
                if(record.data.id == "cellbase"){
                    this.icon = Utils.images.info;
                    this.tooltip = CELLBASE_HOST;
                }else if(record.data.id == "das"){
                    this.icon = Utils.images.info;
                    this.tooltip = "Add custom DAS track";
                }else if(record.data.id == "opencga"){
                    this.icon = Utils.images.info;
                    this.tooltip = "OpenCGA server information link";
                }else if(record.data.id == "localopencga"){
                    this.icon = Utils.images.info;
                    this.tooltip = "OpenCGA light server information link";
                }else{
                    this.tooltip = null;
                    this.icon = null;
                }
            },
            handler:function(grid, rowIndex, colIndex, actionItem, event, record, row){
                var text = record.data.text;
                var idText = record.data.id;
                if(idText == 'opencga'){
                    open('http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:opencga_sever');
                }
                if(idText == 'localopencga'){
                    open('http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:opencga_light_sever');
                }

            }
        },{
            xtype: 'actioncolumn',
            menuDisabled: true,
            align: 'center',
            width:30,
            icon: Utils.images.add,
            renderer: function(value, metaData, record){
                if (record.isLeaf()) {
                    this.icon = Utils.images.add;
                    this.tooltip = "Add";
                    if(record.raw.disabled){
                        this.icon = null;
                        this.tooltip = null;
                    }
                    if((record.raw.fileFormat === 'bam' || record.raw.fileFormat === 'vcf') && record.raw.status !== 'ready'){
                        this.icon = null;
                        this.tooltip = null;
                        record.raw.disabled = true;
                    }
                }else{
                    if(record.data.id == "cellbase"){
                        this.icon = Utils.images.edit;
                    }else if(record.data.id == "das"){
                        this.icon = Utils.images.add;
                    }else if(record.data.id == "localopencga"){
                        this.icon = Utils.images.refresh;
                        this.tooltip = "Refresh local files";
                    }else{
                        this.icon = null;
                        this.tooltip = null;
                    }
                }
            },
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                var updateActiveTracksPanel = function(trackType, trackTitle, trackId, showActive) {
                    var newNode = _this.activeSt.getRootNode().appendChild({text: trackTitle, trackId:trackId, trackType:trackType, leaf: true, checked:true, iconCls:"icon-blue-box"});
                    Ext.example.msg("Track "+trackType,"actived");
                    //var node = activeSt.getRootNode().findChild("trackId",trackId);
                    //Ext.getCmp(_this.id+"activeTracksTree").getSelectionModel().select(newNode);
                    if(showActive == true){
                        Ext.getCmp(_this.id+"activeTracksTree").expand();
                    }
                };
                var text = record.data.text;
                var idText = record.data.id;
                if(record.isLeaf()){
                    if(record.isAncestor(store.getRootNode().findChild("id","cellbase"))){
                        if(!record.raw.disabled){
                            var type = text;
                            var id = _this.addTrack(type, text);
                            var title = type;
                            updateActiveTracksPanel(type, title, id, true);
                        }
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","das"))){
                        var type = 'das';
                        var id = _this.addDASTrack(text, record.raw.url);
                        var title = text;
                        updateActiveTracksPanel(type, title, id, true);
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","load"))){
                        _this.addFileTrack(text, updateActiveTracksPanel);
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","opencga"))){
                        if(!record.raw.disabled){
                            var type = record.raw.fileFormat;
                            var id = _this.addTrack(type, text, record.raw.oid);
                            if(id != null){
                                var title = text;
                                updateActiveTracksPanel(type, title, id, true);
                            }
                        }
                    }
                    if(record.isAncestor(store.getRootNode().findChild("id","localopencga"))){
                        var type = record.raw.oid.split('.').pop();
                        var id = _this.addTrack(type, text, record.raw.oid, OPENCGA_LOCALHOST);
                        if(id != null){
                            var title = text;
                            updateActiveTracksPanel(type, title, id, true);
                        }
                    }
                }else{
                    if(idText == "cellbase"){
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
                    if(idText == "das"){
                        var urlWidget = new UrlWidget({title:'Add a DAS track'});
                        urlWidget.onAdd.addEventListener(function(sender, event) {
                            var id = _this.addDASTrack(event.name, event.url);
                            updateActiveTracksPanel('das', event.name+"-"+id, id, true);
                        });
                        urlWidget.draw();
                    }
                    if(idText == "localopencga"){
                        _this._updateLocalOpencgaTracks();
                    }
                }
            }
        }]
    };
};


GenomeMaps.prototype._loadOpencgaTracks = function(response) {
	for ( var i = 0; i < response.buckets.length; i++) {
		var files = [];
		for ( var j = 0; j < response.buckets[i].objects.length; j++) {
			var opencgaObj = response.buckets[i].objects[j];
//            console.log(opencgaObj.status);
			if(opencgaObj.fileType!=='dir' && (opencgaObj.fileFormat==='bam' || opencgaObj.fileFormat==='vcf')){
				opencgaObj["text"] = opencgaObj.fileName;
				opencgaObj["qtip"] = opencgaObj.status;
				opencgaObj["icon"] = Utils.images.r;
				opencgaObj["leaf"] = true;
				opencgaObj["oid"] = opencgaObj.id || opencgaObj["oid"];
				files.push(opencgaObj);
			}
		}
		Ext.getStore(this.id+'import').getRootNode().findChild("id","opencga").appendChild({text:response.buckets[i].name, iconCls:"icon-blue-box", expanded:true, children:files});
//        Ext.getStore(this.id+'import').getRootNode().collapse();
//        Ext.getStore(this.id+'import').getRootNode().expand();
	}
};

GenomeMaps.prototype._unloadOpencgaTracks = function() {
	Ext.getStore(this.id+'import').getRootNode().findChild('id','opencga').removeAll();
};

GenomeMaps.prototype._updateOpencgaTracks = function(response) {
	this._unloadOpencgaTracks();
	this._loadOpencgaTracks(response);
};

GenomeMaps.prototype._updateLocalOpencgaTracks = function() {
    var _this = this;

    var opencgaManager = new OpencgaManager(OPENCGA_LOCALHOST);
    opencgaManager.onLocalFileList.addEventListener(function(sender, data){
        Ext.getStore(_this.id+'import').getRootNode().findChild('id','localopencga').removeAll();
        if(data.statusText != 'error'){
            Ext.example.msg('Local Open CGA','loaded');
            Ext.getStore(_this.id+'import').getRootNode().findChild('id','localopencga').set('text','Browse local data <span class="ok">(ready)</span>');
            var localDirTree = JSON.parse(data);
            Ext.getStore(_this.id+'import').getRootNode().findChild('id','localopencga').appendChild(localDirTree);
        }
    });
    opencgaManager.localFileList();
};


GenomeMaps.prototype._loadTrackConfig = function(trackSvg, treeRecord) {
	var _this = this;
	var filtersConfig = trackSvg.getFiltersConfig();
	var filters = trackSvg.getFilters();
	if(filtersConfig != null){
		var items = [];
		var stores = [];
		
		for(var i = 0; i < filtersConfig.length; i++){
			var rootText = filtersConfig[i].text;
			var rootName = filtersConfig[i].name;
			
			var children = [];
			var checked;
			filters[rootName] != null ? checked=false : checked=true;
			for(var j = 0; j < filtersConfig[i].values.length; j++){
				children.push({text: filtersConfig[i].values[j], leaf: true, checked:checked, iconCls:"icon-blue-box"});
			}
			
			var root = {
				text:rootName,
				expanded: true,
				checked:checked,
				iconCls:"icon-box",
				children:children
			};
			var st = Ext.create('Ext.data.TreeStore',{root:root,fields:['text', 'name']});
			items.push({
				xtype:"treepanel",
				useArrows:true,
				//rootVisible: false,
				bodyPadding:"5 0 5 0",
				title : rootText,
				border:0,
				store:st,
				listeners:{
					checkchange:function(node, checked, eOpts ){
						if(node.isRoot()){
							node.eachChild(function(n){
								n.set("checked", checked);
							});
						}
					},
					afterrender:function(este){
						//restore previous filter config
						var node = este.getStore().getRootNode();
						var name = node.get("text");
						if(filters[name] != null){
							for(var i = 0; i < filters[name].length; i++){
								var child = node.findChild("text",filters[name][i]);
								child.set("checked",true);
								child.save;
							}
						}
					}
				}
			});
			stores.push(st);
		}

		var bar = {xtype:"toolbar", layout : {type : 'hbox',	pack : 'center'},
					items:[{xtype:'button', flex:1, text:'<span class="emph">Apply filter</span>',id:this.id+"SettingsPanelOkButton", handler: function(){
						var filters = {};
						for(var i = 0; i < stores.length; i++){
							var root = stores[i].getRootNode();
							var name = root.get("text");
							var checkValues = [];
							var nodesLength = 0;
							root.eachChild(function(node){
								nodesLength++;
								if(node.data.checked){
									checkValues.push(node.get("text"));
								}
							});
							//all check is the same as none checked
							if(checkValues.length == nodesLength){
								checkValues = [];
							}
							//if(checkValues.length > 0){
								filters[name]=checkValues;
							//}
						}
						console.log(filters)
						trackSvg.setFilters(filters);
					}
		}]};
		var tabFilter = Ext.create('Ext.tab.Panel', {
			flex:1,
            plain:true,
			border:0,
			bbar:bar,
			items: items
		});
		Ext.getCmp(this.id+"trackFiltering").removeAll();
		Ext.getCmp(this.id+"trackFiltering").add([tabFilter]);

	}else{
		Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackFiltering").tab.hide();
		Ext.getCmp(this.id+"trackFiltering").removeAll();
	}
    Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackFiltering").tab.show();
    Ext.getCmp(this.id+"activeTracksSettings").setActiveTab(Ext.getCmp(this.id+"trackFiltering"));

	var optionsConfig = trackSvg.getOptionsConfig();
	var options = trackSvg.getOptions();
	if(optionsConfig != null){
		optionComponents = [];
		for(var i = 0; i < optionsConfig.length; i++){
			var option = optionsConfig[i];
			if(option.type == "checkbox"){
				optionComponents.push({
					xtype:option.type,
					boxLabel:option.text,
					checked:option.checked,
					option:option,
					listeners:{
						change:function(este, newValue, oldValue, eOpts){
							if(newValue){
								trackSvg.setOption(este.option, newValue);
							}else{
								trackSvg.setOption(este.option, null);
							}
						}
					}
				});
			}
			if(option.type == "doublenumberfield"){
				optionComponents.push({
					xtype:"panel",
					title:option.text,
					bodyPadding:10,
					layout:{type:'vbox', align:'stretch'},
					items:[{
						xtype:"numberfield",
						checked:option.checked,
						value:option.minValue,
						fieldLabel:'Min',
						flex:1,
						option:option,
						minValue:0,
						listeners:{
							change:function(este, newValue, oldValue, eOpts){
								option["minValue"]=newValue;
							}
						}
					},{
						xtype:"numberfield",
						checked:option.checked,
						value:option.maxValue,
						fieldLabel:'Max',
						option:option,
						flex:1,
						minValue:0,
						listeners:{
							change:function(este, newValue, oldValue, eOpts){
								option["maxValue"]=newValue;
							}
						}
					},{
						xtype:"button",
						text:"apply",
						option:option,
						flex:2,
						handler:function(este, e, eOpts){
							if(este.option["minValue"] != 0 && este.option["maxValue"]!=0){
								trackSvg.setOption(este.option, este.option["minValue"]+","+este.option["maxValue"]);
							}else{
								trackSvg.setOption(este.option, null);
							}
						}
					}
					]
				});
			}
		}

		Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackOptions").tab.show();
		Ext.getCmp(this.id+"trackOptions").removeAll();
		Ext.getCmp(this.id+"trackOptions").add(optionComponents);
		Ext.getCmp(this.id+"activeTracksSettings").setActiveTab(Ext.getCmp(this.id+"trackOptions"));
	}else{
		Ext.getCmp(this.id+"activeTracksSettings").child('#'+this.id+"trackOptions").tab.hide();
		Ext.getCmp(this.id+"trackOptions").removeAll();
	}
};