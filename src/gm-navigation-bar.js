/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

function GmNavigationBar(args) {

    // Using Underscore 'extend' function to extend and add Backbone Events
    _.extend(this, Backbone.Events);

    var _this = this;

    this.id = Utils.genId("GmNavigationBar");

    this.species = 'Homo sapiens';
    this.increment = 3;
    this.zoom;

    //set instantiation args, must be last
    _.extend(this, args);


    //set new region object
    this.region = new Region(this.region);

    this.currentChromosomeList = [];

    this.on(this.handlers);

    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }
};

GmNavigationBar.prototype = {

    render: function (targetId) {
        var _this = this;
        this.targetId = (targetId) ? targetId : this.targetId;
        if ($('#' + this.targetId).length < 1) {
            console.log('targetId not found in DOM');
            return;
        }

        this.targetDiv = $('#' + this.targetId)[0];
        this.div = $('<div id="navigation-bar' + this.id + '" class="unselectable"></div>')[0];
        $(this.targetDiv).append(this.div);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            id: this.id + "navToolbar",
            renderTo: $(this.div).attr('id'),
            cls: 'gm-navigation-bar',
            region: "north",
            width: '100%',
            border: false,
            items: [
                {
                    id: this.id + 'speciesButton',
                    tooltip: 'Species menu',
                    text: this.species.text + ' ' + this.species.assembly,
                    menu: {
                        id: this.id + 'speciesMenu'
                    }
                },
                {
                    xtype: 'tbtext',
                    text: '<span style="color:#708090;">Chr</span>'
                },
                {
                    id: this.id + 'chromosomesButton',
                    tooltip: 'Chromosomes menu',
//                    iconCls: 'ocb-icon-chromosome',
                    text: this.region.chromosome,
                    margin: '0 15 0 0',
                    menu: {
                        plain: true,
                        id: this.id + 'chromosomesMenu'
                    }
                },
                {
                    tooltip: 'Show karyotype',
                    iconCls: 'ocb-icon-karyotype',
                    enableToggle: true,
                    pressed: false,
                    toggleHandler: function () {
                        _this.trigger('karyotype-button:change', {selected: this.pressed, sender: _this});
                    }
                },
                {
                    tooltip: 'Show chromosome',
                    iconCls: 'ocb-icon-chromosome',
                    enableToggle: true,
                    pressed: false,
                    toggleHandler: function () {
                        _this.trigger('chromosome-button:change', {selected: this.pressed, sender: _this});
                    }
                },
                {
                    tooltip: 'Show Region',
                    iconCls: 'ocb-icon-region',
                    enableToggle: true,
                    pressed: true,
                    toggleHandler: function () {
                        _this.trigger('region-button:change', {selected: this.pressed, sender: _this});
                    }
                },
                {
                    tooltip: 'Zoom out',
                    iconCls: 'ocb-icon-minus',
                    margin: '0 0 0 15',
                    handler: function () {
                        _this._handleZoomOutButton();
                    }
                },
                {
                    xtype: 'slider',
                    id: this.id + 'zoomSlider',
                    width: 140,
                    maxValue: 100,
                    minValue: 0,
                    value: this.zoom,
                    useTips: true,
                    increment: 1,
                    animate: false,
                    tipText: function (thumb) {
                        return Ext.String.format('<b>{0}%</b>', thumb.value);
                    },
                    listeners: {
                        'changecomplete': {
//                            buffer: 500,
                            fn: function (slider, newValue) {
                                _this._handleZoomSlider(newValue);
                            }
                        }
                    }
                },
                {
                    tooltip: 'Zoom in',
                    iconCls: 'ocb-icon-plus',
                    margin: '0 15 0 0',
                    handler: function () {
                        _this._handleZoomInButton();
                    }
                },
                {
                    id: this.id + 'regionField',
                    xtype: 'textfield',
                    width: 205,
                    value: this.region.toString(),
                    fieldLabel: 'Position',
                    labelWidth: 40,
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() == e.ENTER) {
                                _this._goRegion(this.value);
                            }
                        }
                    }
                },
                {
                    tooltip: 'Go region',
                    text: 'Go!',
                    margin: '0 15 0 0',
                    handler: function () {
                        _this._goRegion(Ext.getCmp(_this.id + 'regionField').getValue());
                    }
                },
                {
                    tooltip: 'Move further left',
                    iconCls: 'ocb-icon-arrow-w-bold',
                    handler: function () {
                        _this._handleMoveRegion(10);
                    }
                },
                {
                    tooltip: 'Move left',
                    iconCls: 'ocb-icon-arrow-w',
                    handler: function () {
                        _this._handleMoveRegion(1);
                    }
                },
                {
                    tooltip: 'Move right',
                    iconCls: 'ocb-icon-arrow-e',
                    handler: function () {
                        _this._handleMoveRegion(-1);
                    }
                },
                {
                    tooltip: 'Move further right',
                    iconCls: 'ocb-icon-arrow-e-bold',
                    margin: '0 15 0 0',
                    handler: function () {
                        _this._handleMoveRegion(-10);
                    }
                },
                {
                    tooltip: 'Restore initial Region',
                    iconCls: 'ocb-icon-repeat',
                    handler: function () {
                        _this.trigger('restoreDefaultRegion:click', {sender: {}})
                    }
                },
                {
                    tooltip: 'Region history',
                    iconCls: 'ocb-icon-clock',
                    menu: {
                        id: this.id + 'regionHistoryMenu',
                        plain: true
                    }
                },
                {
                    tooltip: 'Tracks height will be calculated automatically',
                    iconCls: 'ocb-icon-track-autoheight',
                    handler: function () {
                        _this.trigger('autoHeight-buttonchromosomesButton:click', {sender: _this});
                    }
                },
                /*{
                    tooltip: 'Tracks will be compacted automatically',
                    iconCls: 'ocb-icon-compressed',
                    handler: function () {
                        $(".ocb-compactable").toggle();
                        //_this.trigger('autoHeight-button:click', {sender: _this});
                    }
                },*/
                '->',
                this._createSearchComboBox(),
                {
                    tooltip: 'Search',
                    iconCls: 'ocb-icon-find',
                    handler: function () {

                    }
                },
                {
                    tooltip: 'Configure',
                    text: '<span class="emph"> Configure</span>',
                    margin: '0 0 0 15',
                    enableToggle: true,
                    iconCls: 'ocb-icon-gear',
                    pressed: true,
                    toggleHandler: function () {
                        _this.trigger('configuration-button:change', {selected: this.pressed, sender: _this});
                    }
                }
            ]
        });
        this._addRegionHistoryMenuItem(this.region);
        this._addRegionHistoryMenuItem(new Region("20:32878277-32878277"));
        this._addRegionHistoryMenuItem(new Region("19:300018-300018"));
        this._addRegionHistoryMenuItem(new Region("7:127471196-127471196"));
        this._addRegionHistoryMenuItem(new Region("20:14370-14370"));
        this._setSpeciesMenu();
        this._setChromosomeMenu();

        this.rendered = true;
    },

    _addRegionHistoryMenuItem: function (region) {
        var _this = this;
        var menuEntry = Ext.create('Ext.menu.Item', {
            text: region.toString(),
            handler: function () {
                console.log(this.text);
                _this.region.parse(this.text);
                Ext.getCmp(_this.id + 'regionField').setValue(_this.region.toString());
                _this.trigger('region:change', {region: _this.region, sender: _this});
            }
        });
        var menu = Ext.getCmp(this.id + 'regionHistoryMenu');
        menu.add(menuEntry);
    },

    _setChromosomeMenu: function () {
        var _this = this;

        var menu = Ext.getCmp(this.id + 'chromosomesMenu');
        var button = Ext.getCmp(this.id + 'chromosomesButton');
        menu.removeAll(true);

        //find species object
        var list = [];
        for (var i in this.availableSpecies.items) {
            for (var j in this.availableSpecies.items[i].items) {
                var species = this.availableSpecies.items[i].items[j];
                if (species.text === this.species.text) {
                    list = species.chromosomes;
                    break;
                }
            }
        }

        this.currentChromosomeList = list;
        //add bootstrap elements to the menu

        var chromosomeData = [];
        for (var i = 0; i < list.length; i++) {
            chromosomeData.push({'name': list[i]});
        }
        var chrStore = Ext.create('Ext.data.Store', {
            id: this.id + "chrStore",
            fields: ["name"],
            autoLoad: false,
            data: chromosomeData
        });
        /*Chromolendar*/
        var chrView = Ext.create('Ext.view.View', {
            id: this.id + "chrView",
            width: 125,
            store: chrStore,
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    selectionchange: function (este, selNodes) {
                        if (selNodes.length > 0) {
                            var chr = selNodes[0].data.name;
                            console.log(chr);
                            button.setText(chr);
                            _this.region.chromosome = chr;
                            Ext.getCmp(_this.id + 'regionField').setValue(_this.region.toString());
                            _this._addRegionHistoryMenuItem(_this.region);
                            _this.trigger('region:change', {region: _this.region, sender: _this});
                        }
                        menu.hide();
                    }
                }
            },
            cls: 'list',
            trackOver: true,
            overItemCls: 'list-item-hover',
            itemSelector: '.chromosome-item',
            tpl: '<tpl for="."><div style="float:left;" class="chromosome-item">{name}</div></tpl>'
        });
        /*END chromolendar*/

        menu.add(chrView);
//        for (var i in list) {
//            var chromosomeName = list[i];
//            var menuEntry = Ext.create('Ext.menu.Item', {
//                text: chromosomeName,
//                handler: function () {
//                    console.log(this.text);
//                    button.setText(this.text);
//                    _this.region.chromosome = this.text;
//                    _this._addRegionHistoryMenuItem(_this.region);
//                    _this.trigger('region:change', {region: _this.region, sender: _this});
//                }
//            });
//            menu.add(menuEntry);
//        }
    },

    _setSpeciesMenu: function () {
        var _this = this;

        var menu = Ext.getCmp(this.id + 'speciesMenu');
        var button = Ext.getCmp(this.id + 'speciesButton');
        var popularEntries = [];

        var createEntry = function (species) {
            return Ext.create('Ext.menu.Item', {
                text: species.text + ' ' + species.assembly,
                handler: function () {
                    _this.species = species;
                    button.setText(this.text);
                    _this._setChromosomeMenu();
                    _this.trigger('species:change', {species: species, sender: _this});
                }
            });
        };
        var createEntries = function (items) {
            var entries = [];
            for (var i in items) {
                var species = items[i];
                var entry = createEntry(species);
                entries.push(entry);
                if (_this.popularSpecies && _this.popularSpecies.indexOf(species.text) != -1) {
                    popularEntries.push(entry);
                }
            }
            return entries;
        };
        var createSubMenu = function (phylo) {
            return Ext.create('Ext.menu.Item', {
                text: phylo.text,
                menu: {
                    items: createEntries(phylo.items)
                }
            });
        };
        var items = [];
        for (var i in this.availableSpecies.items) {
            var phylo = this.availableSpecies.items[i];
            items.push(createSubMenu(phylo));
        }
        if (this.popularSpecies) {
            popularEntries.sort(function (a, b) {
                return a.text.localeCompare(b.text);
            });
            menu.add(popularEntries);
            menu.add('-');
        }
        menu.add(items);
    },

    _goRegion: function (value) {
        var reg = new Region();
        if (!reg.parse(value) || reg.start < 0 || reg.end < 0 || _.indexOf(this.currentChromosomeList, reg.chromosome) == -1) {
            Ext.getCmp(this.id + 'regionField').animate({
                duration: 700,
                to: {
                    opacity: 0
                }
            }).animate({
                    duration: 700,
                    to: {
                        opacity: 1
                    }
                });
        } else {
            this.region.load(reg);
            Ext.getCmp(this.id + 'chromosomesButton').setText(this.region.chromosome);
            this._addRegionHistoryMenuItem(this.region);
            this.trigger('region:change', {region: this.region, sender: this});
        }
    },

//    _quickSearch: function (query) {
//        var results = [];
//        var speciesCode = Utils.getSpeciesCode(this.species.text).substr(0, 3);
////        var host = new CellBaseManager().host;
//        var host = 'http://ws.bioinfo.cipf.es/cellbase/rest';
//        $.ajax({
//            url: host + '/latest/' + speciesCode + '/feature/id/' + query.term + '/starts_with?of=json',
//            async: false,
//            dataType: 'json',
//            success: function (data, textStatus, jqXHR) {
//                for (var i in data[0]) {
//                    results.push(data[0][i].displayId);
//                }
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.log(textStatus);
//            }
//        });
//        return results;
//    },

    _goFeature: function (featureName) {
        if (featureName != null) {
            if (featureName.slice(0, "rs".length) == "rs" || featureName.slice(0, "AFFY_".length) == "AFFY_" || featureName.slice(0, "SNP_".length) == "SNP_" || featureName.slice(0, "VAR_".length) == "VAR_" || featureName.slice(0, "CRTAP_".length) == "CRTAP_" || featureName.slice(0, "FKBP10_".length) == "FKBP10_" || featureName.slice(0, "LEPRE1_".length) == "LEPRE1_" || featureName.slice(0, "PPIB_".length) == "PPIB_") {
                this.openSNPListWidget(featureName);
            } else {
                console.log(featureName);
                // TO-DO: gene list widget to be implemented
                // this.openGeneListWidget(featureName);

                // meanwhile the location of feature is set
                console.log(this.species);
                var _this = this;

                CellBaseManager.get({
                    species: this.species,
                    category: 'feature',
                    subCategory: 'gene',
                    query: featureName,
                    resource: 'info',
                    params: {
                        include: 'chromosome,start,end'
                    },
                    success: function (data) {
                        var feat = data.response[0].result[0];
                        var regionStr = feat.chromosome + ":" + feat.start + "-" + feat.end;
                        var region = new Region();
                        region.parse(regionStr);
                        _this.region = region;
                        _this.trigger('region:change', {region: _this.region, sender: _this});
                    }
                });
            }
        }
    },

    _handleZoomOutButton: function () {
        this._handleZoomSlider(Math.max(0, this.zoom - 1));
    },
    _handleZoomSlider: function (value) {
        this.zoom = value;
        this.trigger('zoom:change', {zoom: this.zoom, sender: this});
    },
    _handleZoomInButton: function () {
        this._handleZoomSlider(Math.min(100, this.zoom + 1));
    },

    _handleMoveRegion: function (positions) {
        var pixelBase = (this.width - this.svgCanvasWidthOffset) / this.region.length();
        var disp = Math.round((positions * 10) / pixelBase);
        this.region.start -= disp;
        this.region.end -= disp;
        Ext.getCmp(this.id + 'regionField').setValue(this.region.toString());
        this.trigger('region:move', {region: this.region, disp: disp, sender: this});
    },

    setVisible: function (obj) {
        for (key in obj) {
            var query = $(this.div).find('#' + key);
            if (obj[key]) {
                query.show();
            } else {
                query.hide();
            }
        }
    },

    setRegion: function (region) {
        this.region.load(region);
        Ext.getCmp(this.id + 'chromosomesButton').setText(this.region.chromosome);
        Ext.getCmp(this.id + 'regionField').setValue(this.region.toString());
        this._addRegionHistoryMenuItem(region);
    },
    moveRegion: function (region) {
        this.region.load(region);
        Ext.getCmp(this.id + 'chromosomesButton').setText(this.region.chromosome);
        Ext.getCmp(this.id + 'regionField').setValue(this.region.toString());
    },

    setWidth: function (width) {
        this.width = width;
    },

    setZoom: function (zoom) {
        this.zoom = zoom;
        Ext.getCmp(this.id + 'zoomSlider').setValue(this.zoom);
    },

    draw: function () {
        if (!this.rendered) {
            console.info(this.id + ' is not rendered yet');
            return;
        }
    },
    _createSearchComboBox: function () {
        var _this = this;

        var searchResults = Ext.create('Ext.data.Store', {
            fields: ["xrefId", "displayId", "description"],
            data: [
            ]
        });

//        console.log(searchResults)
        var searchCombo = Ext.create('Ext.form.ComboBox', {
            id: this.id + '-quick-search',
            fieldLabel: 'Search:',
            store: searchResults,
            queryMode: 'local',
            displayField: 'displayId',
            valueField: 'displayId',
            emptyText: 'gene, snp, ...',
            hideTrigger: true,
            labelWidth: 40,
            width: 150,
            typeAhead: true,
            minChars: 3,
            autoSelect: false,
            forceSelection: true,
            queryDelay: 500,
            listeners: {
                change: function () {
                    var value = this.getValue();
                    var min = 2;
                    if (value && value.substring(0, 3).toUpperCase() == "ENS") {
                        min = 10;
                    }
                    if (value && value.length > min) {
                        CellBaseManager.get({
                            host: 'http://ws.bioinfo.cipf.es/cellbase/rest',
                            version: 'latest',
                            species: Utils.getSpeciesCode(_this.species.text).substring(0, 3),
                            category: 'feature',
                            subCategory: 'id',
                            query: this.getValue(),
                            resource: 'starts_with',
                            success: function (data) {
                                searchResults.loadData(data[0]);
                            }
                        });
                    }
                },
                select: function (field, e) {
                    _this._goFeature(this.getValue())
                }
//			,specialkey: function(field, e){
//				if (e.getKey() == e.ENTER) {
//					_this._handleGmNavigationBar('GoToGene');
//				}
//			}
            }
        });
        return searchCombo;
    },
//
//    _createFullScreenButton: function () {
//        var _this = this;
//        var regionButton = Ext.create('Ext.Button', {
//            id: this.id + "FullScreenButton",
//            text: 'F11',
//            cls: 'x-btn-text-icon',
//            enableToggle: false,
//            toggleHandler: function () {
//                var elem = document.getElementById("genome-viewer");
//                req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
//                req.call(elem);
////                if (elem.requestFullscreen) {
////                    elem.requestFullscreen();
////                } else if (elem.mozRequestFullScreen) {
////                    elem.mozRequestFullScreen();
////                } else if (elem.webkitRequestFullscreen) {
////                    elem.webkitRequestFullscreen();
////                }
//            }
//
//        });
//        return regionButton;
//    },
    setSpeciesVisible: function (bool) {
        if (bool) {
            Ext.getCmp(this.id + "speciesMenuButton").show();
        } else {
            Ext.getCmp(this.id + "speciesMenuButton").hide();
        }
    },
    setChromosomeMenuVisible: function (bool) {
        if (bool) {
            Ext.getCmp(this.id + "chromosomeMenuButton").show();
        } else {
            Ext.getCmp(this.id + "chromosomeMenuButton").hide();
        }
    },
    setKaryotypePanelButtonVisible: function (bool) {
        this.karyotypeButton.setVisible(bool);
    },
    setChromosomePanelButtonVisible: function (bool) {
        this.chromosomeButton.setVisible(bool);
    },
    setRegionOverviewPanelButtonVisible: function (bool) {
        this.regionButton.setVisible(bool);
    },
    setRegionTextBoxVisible: function (bool) {
        if (bool) {
            Ext.getCmp(this.id + "positionLabel").show();
            Ext.getCmp(this + "tbCoordinate").show();
            Ext.getCmp(this.id + "GoButton").show();
        } else {
            Ext.getCmp(this.id + "positionLabel").hide();
            Ext.getCmp(this.id + "tbCoordinate").hide();
            Ext.getCmp(this.id + "GoButton").hide();
        }
    },
    setSearchVisible: function (bool) {
        if (bool) {
            this.searchComboBox.show();
            Ext.getCmp(this.id + "GoToGeneButton").show();
        } else {
            this.searchComboBox.hide();
            Ext.getCmp(this.id + "GoToGeneButton").hide();
        }
    },
    setFullScreenButtonVisible: function (bool) {
        this.fullscreenButton.setVisible(bool);
    }

}
