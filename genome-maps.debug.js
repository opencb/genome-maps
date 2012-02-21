var AVAILABLE_SPECIES = [{"name":"Homo sapiens", "species":"hsa", "icon":""},
                         {"name":"Mus musculus", "species":"mmu", "icon":""},
                         {"name":"Danio rerio", "species":"dre", "icon":""}
                         ];

var AVAILABLE_TRACKS = [{"species":"hsa",
			"enabled_tracks":[{"id":"Gene/Transcript", "checked":true},
			                  {"id":"Cytoband", "checked":true},
			                  {"id":"Sequence", "checked":true}
			]},
			{"species":"mmu",
			"enabled_tracks":[{"id":"Gene/Transcript", "checked":false},
				                  {"id":"Cytoband", "checked":false}
			]},
			{"species":"dre",
			"enabled_tracks":[{"id":"Gene/Transcript", "checked":false},
			                  {"id":"Cytoband", "checked":true}
			]}
			];

var DAS_TRACKS = [{"species":"hsa",
				   "categories":[
				      {"name":"Core",
					   "sources":[
                	        {"name":"GRC Region NCBI_37","url":"http://das.sanger.ac.uk/das/grc_region_GRCh37/features","checked":true},
                	        {"name":"Vega genes","url":"http://das.sanger.ac.uk/das/vega_ens_zv8_genes/features","checked":false}
                	        ]
				      },
				      {"name":"Variation",
					   "sources":[
                	        {"name":"Cosmic Mutations NCBI 36","url":"http://das.sanger.ac.uk/das/cosmic_mutations_GRCh37/features","checked":false}
                	        ]
				      },
				      {"name":"Regulatory",
					   "sources":[]
				      }
				   ]
				},{"species":"mmu",
				   "categories":[
				      {"name":"Core",
					   "sources":[
                	        {"name":"GRC Region NCBI_37","url":"http://das.sanger.ac.uk/das/grc_region_GRCh37/features","checked":false},
                	        {"name":"Vega genes","url":"http://das.sanger.ac.uk/das/vega_ens_zv8_genes/features","checked":true}
                	        ]
				      },
				      {"name":"Variation",
					   "sources":[
                	        {"name":"Cosmic Mutations NCBI 36","url":"http://das.sanger.ac.uk/das/cosmic_mutations_GRCh37/features","checked":false}
                	        ]
				      },
				      {"name":"Regulatory",
					   "sources":[]
				      }
				   ]
				},{"species":"dre",
				   "categories":[
					      {"name":"Core",
						   "sources":[
	                	        {"name":"GRC Region NCBI_37","url":"http://das.sanger.ac.uk/das/grc_region_GRCh37/features","checked":false},
	                	        {"name":"Vega genes","url":"http://das.sanger.ac.uk/das/vega_ens_zv8_genes/features","checked":false}
	                	        ]
					      },
					      {"name":"Variation",
						   "sources":[
	                	        {"name":"Cosmic Mutations NCBI 36","url":"http://das.sanger.ac.uk/das/cosmic_mutations_GRCh37/features","checked":true}
	                	        ]
					      },
					      {"name":"Regulatory",
						   "sources":[]
					      }
					   ]
				}
				];


var GENOME_MAPS_REGISTERED_PLUGINS = {};

var GENOME_MAPS_AVAILABLE_PLUGINS = [{"category" : "Test",
				                      "plugins" : [{"name" : "MyPlugin",
				                	   		   	  "email" : "yo@cipf.es",
				                	   		   	  "version" : "1.0",
				                	   		   	  "description" : "",
				                	   		   	  "icon" : "",
				                	   		   	  "permissions" : "",
				                	   		   	  "available_species" : [{"name:":"hsa", "assembly":"hg19"}]
									 		 	  }]
				                     },
				                     {"category" : "",
				                      "plugins" : [{"name" : "Expression",
				               	   		   	  	  	"email" : "imedina@cipf.es",
				               	   		   	  	  	"version" : "1.0",
				               	   		   	  	  	"description" : "",
				               	   		   	  	  	"icon" : "",
				               	   		   	  	  	"permissions" : "",
				               	   		   	  	  	"available_species" : [{"name:":"hsa", "assembly":"hg19"}]
								 		 		  },
								 		 		  {"name" : "Genotype",
				                   	   		   	   "email" : "imedina@cipf.es",
				                   	   		   	   "version" : "1.0",
				                   	   		   	   "description" : "",
				                   	   		   	   "icon" : "",
				                   	   		   	   "permissions" : "",
				                   	   		   	   "available_species" : [{"name:":"hsa", "assembly":"hg19"}]
								 		 		  }]
				                     }];

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
var expressionPlugin = new GenericPlugin('Expression', {title: 'Expression',
											  	width: 1035,
											  	height: 653,
											  	launch: function() { auxExpression(); }
});


function auxExpression(){
//	expressionPlugin.closeWindow();
	var species = genomeMaps.genomeViewer.species;
	
	var expressionGenomicAttributesWidget = new ExpressionGenomicAttributesWidget(species);
	
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
	
	expressionGenomicAttributesWidget.onTrackAddAction.addEventListener(function(sender, feature){
		console.log(feature);
		genomeMaps.addTrackFromFeaturesList(feature);
	});
	
};
function GenericPlugin(name, args){
	var _this=this;
	this.id = name+"_" + Math.round(Math.random()*10000);
	
	this.name = name;
	this.title = null;
	this.width = 640;
	this.height = 480;
	this.launch = null;
	
	this.container_div = this.name+'_plugin_container';
	
	if (args != null){
        if (args.targetId!= null) {
        	this.targetId = args.targetId;       
        }
        if (args.title!= null) {
        	this.title = args.title;       
        }
        if (args.width!= null) {
        	this.width = args.width;       
        }
        if (args.height!= null) {
        	this.height = args.height;       
        }
        if (args.launch!= null) {
        	this.launch = args.launch;       
        }
    }
	
	GENOME_MAPS_REGISTERED_PLUGINS[this.name] = this;
};

GenericPlugin.prototype.draw = function (){
	var _this=this;
	this.win = Ext.create('Ext.window.Window',{
		id:this.id+'pluginWindow',
		title: this.title,
		resizable: false,
		minimizable: true,
		constrain: true,
		closable: true,
		width: this.width,
		height: this.height,
		html: '<div id='+this.container_div+'></div>',
		buttonAlign:'left',
		buttons:['->',
		         {text:'Close', handler: function(){_this.closeWindow();}}],
 		listeners: {
	    	scope: this,
	    	minimize:function(){
				this.win.hide();
	       	},
	      	destroy: function(){
	       		delete this.win;
	      	}
    	}
	});
	this.win.show();
};

GenericPlugin.prototype.addHtmlElement = function (html) {
	$("#"+this.container_div).html("html de prueba");
};

GenericPlugin.prototype.addSenchaElement = function (component) {
	this.getWindow().add(component);
};

GenericPlugin.prototype.getWindow = function () {
	return Ext.getCmp(this.id+'pluginWindow');
};

GenericPlugin.prototype.closeWindow = function () {
	Ext.getCmp(this.id+'pluginWindow').close();
};
function GenomeMaps(targetId,args){
	var _this=this;
	this.id = "GenomeMaps#"+ Math.round(Math.random()*10000) +"#";
	this.suiteId = 9;
	this.title="Genome Maps";
	this.description="RC";
	this.wum=true;

	this.args = args;
	
	this.width =  $(window).width();
	this.height = $(window).height();
	this.targetId=document.body;
	
	if (targetId != null){
		this.targetId=targetId;
	}
//	if (args != null){
//		if(args.wum != null){
//			this.wum = args.wum;
//		}
//	}
	
	if (args != null){
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
	
//	this.genomeViewer = new GenomeViewer(null, {description:"Homo Sapiens", menuBar:this.getMenuBar()});
	this.genomeViewer =new GenomeViewer(null, AVAILABLE_SPECIES[0],{
		menuBar:this.getMenuBar()
	});
	
//	if (this.wum==true){
	this.headerWidget = new HeaderWidget({
		appname: this.title,
		description: this.description,
		suiteId : this.suiteId
	});
	
	/**Atach events i listen**/
	this.headerWidget.onLogin.addEventListener(function (sender){
		Ext.example.msg('Welcome', 'You logged in');
	});
	
	this.headerWidget.onLogout.addEventListener(function (sender){
		Ext.example.msg('Good bye', 'You logged out');
	});
//	}
	
	//SPECIE EVENT
	this.genomeViewer.onSpeciesChange.addEventListener(function(sender,data){
		_this.draw();
	});
	
	//RESIZE EVENT
	$(window).smartresize(function(a){
		_this.setSize($(window).width(),$(window).height());
	});
	
};



GenomeMaps.prototype.draw = function(){
	if(this._panel==null){
		
		
		this._panel = Ext.create('Ext.panel.Panel', {
			renderTo:this.targetId,
//			renderTo:Ext.getBody(),
//		layout: { type: 'vbox',align: 'stretch'},
			border:false,
			width:this.width,
			height:this.height,
			items:[this.headerWidget.getPanel(),this.genomeViewer._getPanel(this.width, this.height-this.headerWidget.height)]
		});
	}
	
	this.headerWidget.setDescription(this.genomeViewer.speciesName);
	
	this.genomeViewer.setSpecieMenu(AVAILABLE_SPECIES);
	this._setTracks();
	this.setTracksMenu();
	this.setDASMenu();
	this.setPluginsMenu();
	this.genomeViewer.draw();

};


GenomeMaps.prototype.setSize = function(width,height){
	if(width<500){width=500;}
	if(width>2400){width=2400;}//if bigger does not work TODO why?
	
	this.width=width;
	this.height=height;
	
	this._panel.setSize(width,height);
	this.genomeViewer.setSize(width,height-this.headerWidget.height);
	this.headerWidget.setWidth(width);
};


GenomeMaps.prototype._setTracks= function(){	
	var _this = this;
	var species = this.genomeViewer.species;
	var tracks = AVAILABLE_TRACKS;
	
	//Load initial AVAILABLE_TRACKS config
	for (var i = 0; i < tracks.length; i++) {
		if(tracks[i].species == species){
			var id, checked;
			for ( var j = 0; j < tracks[i].enabled_tracks.length; j++){
					id = tracks[i].enabled_tracks[j].id;
					checked = tracks[i].enabled_tracks[j].checked;
					
					if(checked){
						_this.genomeViewer.genomeWidgetProperties.tracks[id] = checked;
					}
			}
			break;
		}
	}
	
	//Load initial DAS_TRACKS config
	var das_tracks = DAS_TRACKS;
	for (var i = 0; i < das_tracks.length; i++) {
		if(das_tracks[i].species == species){
			for ( var j = 0; j < das_tracks[i].categories.length; j++){
				var sourceName, sourceUrl, checked;
				for ( var k = 0; k < das_tracks[i].categories[j].sources.length; k++){
					sourceName = das_tracks[i].categories[j].sources[k].name;
					sourceUrl = das_tracks[i].categories[j].sources[k].url;
					checked = das_tracks[i].categories[j].sources[k].checked;
					
					if(checked){
						_this.genomeViewer.loadDASTrack(sourceName, sourceUrl);
						_this.genomeViewer.genomeWidgetProperties.tracks[sourceName] = checked;
					}
				}
			}
			break;
		}
	}

};





//App interface, Main menu ...  and others menus
GenomeMaps.prototype.getMenuBar = function() {
	var _this = this;
	var fileMenu = Ext.create('Ext.menu.Menu', {
		items : [{
				text : 'New',
				handler : function() {
					console.log("Not yet implemented, press F5");
				}
			},'-',{
				text : 'Import',
				menu : [{
					text : 'GFF',
					handler : function() {
						var gffFileWidget = new GFFFileWidget();
						gffFileWidget.draw();
						gffFileWidget.onOk.addEventListener(function(sender, args) {
							_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
						});
	
					}
				},{
					text : 'BED',
					disabled : true,
					handler : function(sender, args) {
						_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
					}
				},{
					text : 'VCF',
					handler : function() {
						var vcfFileWidget = new VCFFileWidget();
						vcfFileWidget.draw();
						vcfFileWidget.onOk.addEventListener(function(sender, args) {
							_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
		
						});
					}
				}]
			},{
				text : 'Download as',
				iconCls:'icon-box',
				menu : [{
					text:'PNG',iconCls:'icon-blue-box',disabled:false,
					listeners : {
						scope : this,
						'click' : function() {
							var svg = new XMLSerializer().serializeToString(this.genomeViewer.genomeWidget.trackCanvas._svg);
							var canvas = DOM.createNewElement("canvas", document.body, [["id", "ext-gen1097"]]);
							canvg(canvas, svg);
							Canvas2Image.saveAsPNG(canvas); 
//							DOM.select("canvas").parent.removeChild(canvas);
						}
					}
				},{
					text:'JPEG',iconCls:'icon-blue-box',disabled:false,
					listeners : {
					scope : this,
						'click' : function() {
							try{
								_this.genomeViewer._getPanel().setLoading("Saving image");
								var svg = new XMLSerializer().serializeToString(this.genomeViewer.genomeWidget.trackCanvas._svg);
								var canvas = DOM.createNewElement("canvas", document.body, [["id", "ext-gen1097"]]);
								canvg(canvas, svg);
								Canvas2Image.saveAsJPEG(canvas); 
//								DOM.select("canvas").parent.removeChild(canvas);
							}
							catch(e){
								alert(e);
							}
							finally{
								_this.genomeViewer._getPanel().setLoading(false);
							}
						}
					}
				}]
			}]
	});
	
	var viewMenu = Ext.create('Ext.menu.Menu', {
		margin : '0 0 10 0',
		floating : true,
		items : [{
				text : 'Zoom',
				menu : this.getZoomMenu()
			}, '-',
			{
				text : 'Label',
				menu : this.getLabelMenu()
			}, '-',
			{
				text : 'Karyotype',
				handler : function() {
					_this.genomeViewer._showKaryotypeWindow();
				}
			}, {
				text : 'Gene legend',
				handler : function() {
					var geneFeatureFormatter = new GeneFeatureFormatter();
					var legendWidget = new LegendWidget({title:"Gene legend"});
					legendWidget.draw(geneFeatureFormatter.getBioTypeColors());
				}
			},"-",{
	        	 text:'Ensembl Id',
	        	 checked:false,
	        	 handler : function() {
//					GENOMEMAPS_CONFIG.showFeatureStableId = this.checked;
					_this.position = Math.ceil(_this.genomeViewer.genomeWidget.trackCanvas.getMiddlePoint())+1;
					
					_this.genomeViewer.refreshMasterGenomeViewer();
					
					if (this.checked){
						_this.genomeViewer.genomeWidgetProperties.setLabelHeight(9);
					}
					else{
						_this.genomeViewer.genomeWidgetProperties.setLabelHeight(10);
					}
	         	}
	         }]
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
		padding:'0 0 0 10',
//		margins : '0 0 0 5',
		items : [{
				text : 'File',
				menu : fileMenu
			},{
				text : 'View',
				menu : viewMenu
			},{
				text : 'Search',
				menu : searchMenu
			},{
				text : 'Tracks',
				menu : this.getTracksMenu()
			},{
				text : 'Plugins',
				menu : this.getPluginsMenu()
			}
		]
	});
	return toolbarMenu;
};

/** zoom Menu * */
GenomeMaps.prototype.getZoomMenu = function(chromosome, position) {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
				items : []
			});
	for ( var i = 0; i <= 100; i=i+10) {
		menu.add({text : i + '%', group : 'zoom', checked : false, handler : function() { _this.genomeViewer.setZoom(this.text.replace("%", ""));}});
	}
	return menu;
};

/** label Menu **/
GenomeMaps.prototype.getLabelMenu = function() {
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
};

/** search Feature Menu **/
GenomeMaps.prototype.getFeatureSearchMenu = function() {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ {
						text : 'Genes',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Gene List',genomeViewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, geneNames) {
								_this.genomeViewer.openGeneListWidget(geneNames);
							});
							inputListWidget.draw();
						}
					},
					{
						text : 'Transcript',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Ensembl Transcript',genomeViewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, names) {
								_this.genomeViewer.openTranscriptListWidget(names);
							});
							inputListWidget.draw();
						}
					},
					{
						text : 'Exon',
						handler : function() {
							//ENSE00001663727
							var inputListWidget = new InputListWidget({title:'Ensembl Exon List',genomeViewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, geneNames) {
								_this.genomeViewer.openExonListWidget(geneNames);
							});
							inputListWidget.draw();
						}
					},
					{
						text : 'SNP',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'SNP List',genomeViewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openSNPListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					},
					
					{
						text : 'Protein',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Ensembl Protein',genomeViewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openGOListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					}
					
					
					]
			});
	return menu;
};

GenomeMaps.prototype.getFunctionalSearchMenu = function() {
	var _this = this;
	var menu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
					items : [ 
	        	  {
						text : 'GO',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Gene Ontology',genomeViewer:_this.genomeViewer});
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
					},
					{
						text : 'Interpro',
						handler : function() {
							var inputListWidget = new InputListWidget({title:'Protein',genomeViewer:_this.genomeViewer});
							inputListWidget.onOk.addEventListener(function(evt, snpNames) {
								_this.genomeViewer.openGOListWidget(snpNames);
							});
							inputListWidget.draw();
						}
					}
					]
			});
	return menu;
};

GenomeMaps.prototype.getRegulatorySearchMenu = function() {
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
};

GenomeMaps.prototype.getTracksMenu = function() {
	var _this = this;
	this.tracksMenu = Ext.create('Ext.menu.Menu', {
				margin : '0 0 10 0',
				floating : true,
				items : [{
						text : 'Core',
						menu : [{
							text : 'Gene/Transcript',
							id : 'Gene/Transcript',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'Cytoband',
							id : 'Cytoband',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'Sequence',
							id : 'Sequence',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'CpG islands',
							id : 'CpG islands',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}]
					}, {
						text : 'Variation',
						menu : [{
							text : 'SNP',
							id : 'SNP',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'Mutation',
							id : 'Mutation',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'Structural variation',
							id : 'Structural variation',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}
		
						]
					}, {
						text : 'Regulatory',
						menu : [{
							text : 'miRNA targets',
							id : 'miRNA targets',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'TFBS',
							id : 'TFBS',
							checked : false,
							disabled : true,
							handler : function() {
//								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
//								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}, {
							text : 'Histone',
							id : 'Histone',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						},
						{
							text : 'Polymerase',
							id : 'Polymerase',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}
						,
						{
							text : 'Open Chromatin',
							id : 'Open Chromatin',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						},
//						{
//							text : 'Triplex',
//							checked : false,
//							disabled : true,
//							handler : function() {
//								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
//								_this.genomeViewer.refreshMasterGenomeViewer();
//							}
//						}, 
						{
							text : 'Conserved regions',
							id : 'Conserved regions',
							checked : false,
							disabled : true,
							handler : function() {
								_this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
								_this.genomeViewer.refreshMasterGenomeViewer();
							}
						}]
						
					}, "-", 
					{
						text : 'DAS',
						menu : this.getDASMenu()
					
					},"-",{
						text : 'Add custom data',
						menu : [{
							text : 'GFF',
							handler : function() {
//							_this.getGFFUploadMenu();
//							_this.openGFFDialog.show();
							var gffFileWidget = new GFFFileWidget();
							gffFileWidget.draw();
							if (_this.wum){
								_this.headerWidget.onLogin.addEventListener(function (sender){
									gffFileWidget.sessionInitiated();
								});
								_this.headerWidget.onLogout.addEventListener(function (sender){
									gffFileWidget.sessionFinished();
								});
							}
							gffFileWidget.onOk.addEventListener(function(sender, args) {
								_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
							});

						}
						}, {
							text : 'BED',
							handler : function() {
								var bedFileWidget = new BEDFileWidget();
								bedFileWidget.draw();
								bedFileWidget.onOk.addEventListener(function(sender, args) {
									_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);
								});
							}
						},

						{
							text : 'VCF',
							handler : function() {
							var vcfFileWidget = new VCFFileWidget();
							vcfFileWidget.draw();
							vcfFileWidget.onOk.addEventListener(function(sender, args) {
								_this.genomeViewer.addFeatureTrack(args.title, args.dataAdapter);

							});
						}
						}

						]
					}]
		
				});

	return this.tracksMenu;
};

//Enables or no the checkBoxes
GenomeMaps.prototype.setTracksMenu = function() {
	var _this = this;
	var tracks = AVAILABLE_TRACKS;
	var species = this.genomeViewer.species;
	//Auto generate menu items depending of AVAILABLE_TRACKS config
	for (var i = 0; i < tracks.length; i++) {
		if(tracks[i].species == species){
			var item = null;
			for (var j = 0; j < tracks[i].enabled_tracks.length; j++){
				enabled =  tracks[i].enabled_tracks[j];
				Ext.getCmp(enabled.id).enable().setChecked(enabled.checked);
			}
			break;
		}
	};
};

GenomeMaps.prototype.getDASMenu = function() {
	if(this._DASMenu == null){
		this._DASMenu = Ext.create('Ext.menu.Menu', {
			margin : '0 0 10 0',
			floating : true,
			items : []
		});
	}
	return this._DASMenu;
};

GenomeMaps.prototype.setDASMenu = function() {
	var _this = this;
	var tracks = DAS_TRACKS;
	var species = this.genomeViewer.species;
	//Auto generate menu items depending of DAS_TRACKS config
	var menu = this.getDASMenu();
	menu.removeAll(); // Remove the old DAS
	for (var i = 0; i < tracks.length; i++) {
		if(tracks[i].species == species){
			for ( var j = 0; j < tracks[i].categories.length; j++){
				var sources = [];
				for ( var k = 0; k < tracks[i].categories[j].sources.length; k++){
					sources.push({text : tracks[i].categories[j].sources[k].name,
								  sourceName : tracks[i].categories[j].sources[k].name,
								  sourceUrl : tracks[i].categories[j].sources[k].url,
								  checked : tracks[i].categories[j].sources[k].checked,
								  handler : function() {
									  _this.genomeViewer.loadDASTrack(this.sourceName, this.sourceUrl);
									  _this.genomeViewer.genomeWidgetProperties.tracks[this.text] = this.checked;
									  _this.genomeViewer.refreshMasterGenomeViewer();
								  }
					});
				}
				menu.add({
					text : tracks[i].categories[j].name,
					menu : sources
				});
			}
			break;
		}
	}
	
	//Add custom source
	menu.add("-",{
		text : 'Add custom...',
		handler : function() {
			var urlWidget = new UrlWidget({title:'Add a DAS track'});
			urlWidget.onAdd.addEventListener(function(event, data) {
				_this.genomeViewer.loadDASTrack(data.name, data.url);
				_this.setCustomDASMenu(data.name);
				_this.genomeViewer.refreshMasterGenomeViewer();
			});
			urlWidget.draw();
		},
		menu : this.getCustomDASMenu()
	});
};

GenomeMaps.prototype.getCustomDASMenu = function() {
	if(this._customDASMenu == null){
		this._customDASMenu = Ext.create('Ext.menu.Menu', {
			margin : '0 0 10 0',
			floating : true,
			items : []
		});
	}
	return this._customDASMenu;
};

GenomeMaps.prototype.setCustomDASMenu = function(name) {
	var _this = this;
	
	_this.getCustomDASMenu().add({
		text : name,
		checked : true,
		handler : function() {
			_this.genomeViewer.genomeWidgetProperties.tracks[name] = this.checked;
			_this.genomeViewer.refreshMasterGenomeViewer();
		}
	});
};









GenomeMaps.prototype.getPluginsMenu = function() {
	if(this._pluginsMenu == null){
		this._pluginsMenu = Ext.create('Ext.menu.Menu', {
			margin : '0 0 10 0',
			floating : true,
			items : []
		});
	}
	return this._pluginsMenu;
};

GenomeMaps.prototype.setPluginsMenu = function() {
	var _this = this;
	var plugins_cat = GENOME_MAPS_AVAILABLE_PLUGINS;
	var species = this.genomeViewer.species;
	
	//Auto generate menu items depending of AVAILABLE_PLUGINS config
	var menu = this.getPluginsMenu();
	menu.removeAll(); // Remove the old entries
	for (var i = 0; i < plugins_cat.length; i++) {
		// If category is blank, adds directly a button in the root menu
		if(plugins_cat[i].category == ""){
			for (var j = 0; j < plugins_cat[i].plugins.length; j++){
				menu.add({
					text : plugins_cat[i].plugins[j].name,
					pluginName : plugins_cat[i].plugins[j].name,
					handler : function() {
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].draw();
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].launch();
					}
				});
			}
		}
		else{
			var sources = [];
			for (var j = 0; j < plugins_cat[i].plugins.length; j++){
//			if(plugins[i].species == species){
				sources.push({text : plugins_cat[i].plugins[j].name,
					pluginName : plugins_cat[i].plugins[j].name,
					handler : function() {
						
						
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].draw();
						GENOME_MAPS_REGISTERED_PLUGINS[this.pluginName].launch();
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
};










GenomeMaps.prototype.getPluginsMenuOLD = function(chromosome, position) {
	var _this = this;
	if(this.pluginsMenu==null){
		return Ext.create('Ext.menu.Menu', {
			margin : '0 0 10 0',
			floating : true,
			items : [{
						text : 'Expression',
						handler : function() {
							var expressionGenomicAttributesWidget = new ExpressionGenomicAttributesWidget(_this.genomeViewer.species);
							
							if (_this.wum){
								_this.headerWidget.onLogin.addEventListener(function (sender){
									expressionGenomicAttributesWidget.attributesPanel.sessionInitiated();
								});
								_this.headerWidget.onLogout.addEventListener(function (sender){
									expressionGenomicAttributesWidget.attributesPanel.sessionFinished();
								});
							}
							expressionGenomicAttributesWidget.draw();
							expressionGenomicAttributesWidget.onMarkerClicked.addEventListener(function(sender, feature){
								_this.goTo(feature.chromosome, feature.start);
								
							});
							
							expressionGenomicAttributesWidget.onTrackAddAction.addEventListener(function(sender, feature){
								console.log(feature);
								_this.addTrackFromFeaturesList(feature);
								
							});

						}
					},
					{
						text : 'Genotype',
						handler : function() {
							var genotypeGenomicAttributesWidget =  new GenotypeGenomicAttributesWidget(_this.genomeViewer.species);
							
							if (_this.wum){
								_this.headerWidget.onLogin.addEventListener(function (sender){
									genotypeGenomicAttributesWidget.attributesPanel.sessionInitiated();
								});
								_this.headerWidget.onLogout.addEventListener(function (sender){
									genotypeGenomicAttributesWidget.attributesPanel.sessionFinished();
								});
							}
							
							genotypeGenomicAttributesWidget.draw();
							
							genotypeGenomicAttributesWidget.onMarkerClicked.addEventListener(function(sender, feature){
								_this.goTo(feature.chromosome, feature.start);
							});
							
							genotypeGenomicAttributesWidget.onTrackAddAction.addEventListener(function(sender, feature){
								_this.addTrackFromFeaturesList(feature);
								
							});
						}
					}]
		});
	}
	
	return Ext.create('Ext.menu.Menu', {
		margin : '0 0 10 0',
		floating : true,
		items : this.pluginsMenu
	});
	
	
};