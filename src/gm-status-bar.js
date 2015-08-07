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

function GmStatusBar(args) {

    // Using Underscore 'extend' function to extend and add Backbone Events
    _.extend(this, Backbone.Events);

    var _this = this;

    this.id = Utils.genId("GmStatusBar");

    //set instantiation args, must be last
    _.extend(this, args);

    //set new region object
    this.region = new Region(this.region);

    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }
};

GmStatusBar.prototype = {
    render: function (targetId) {
        this.targetId = (targetId) ? targetId : this.targetId;
        if ($('#' + this.targetId).length < 1) {
            console.log('targetId not found in DOM');
            return;
        }
        this.targetDiv = $('#' + this.targetId)[0];
        this.div = $('<div id="' + this.id + '"></div>')[0];
        $(this.targetDiv).append(this.div);
        $(this.div).css({height:'26px'});

        var geneLegendPanel = new LegendPanel({title: 'Gene legend'});
        var snpLegendPanel = new LegendPanel({title: 'SNP legend'});

        var taskbar = Ext.create('Ext.toolbar.Toolbar', {
//            id: this.id + 'uxTaskbar',
            winMgr: new Ext.ZIndexManager(),
            enableOverflow: true,
            cls: 'gm-navigation-bar',
//            height: 28,
            flex: 1
        });

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            id: this.id + 'toolbar',
            width: '100%',
            cls: 'gm-navigation-bar',
            border: false,
            items: [
                '->',
                {
                    xtype: 'tbtext',
                    text: 'Mouse position: ',
                    style:'color:slategray'
                },
                {
                    id: this.id + 'mousePosition',
                    text: '<span id="'+this.id+'mousePositionEl">&nbsp;</span>',
                    xtype: 'tbtext',
                    width:100
                },
                geneLegendPanel.getButton(GENE_BIOTYPE_COLORS),
                snpLegendPanel.getButton(SNP_BIOTYPE_COLORS),
                {
                    id: this.id + 'version',
                    xtype: 'tbtext',
                    margin: '0 10 0 15',
                    style:'color:slategray',
                    text: ' Genome Maps ' + this.version
                }
            ]
        });

        var bottomBar = Ext.create('Ext.container.Container', {
            id: this.id + 'bottomBar',
            renderTo: $(this.div).attr('id'),
            layout: 'hbox',
            region: "south",
            cls: "gm-navigation-bar unselectable",
            border: true,
            items: [taskbar, toolbar]
        });

        this.rendered = true;
    },
    setRegion: function (event) {
        this.region.load(event.region);
        var text = Utils.formatNumber(event.region.center());
        $('#'+this.id + 'mousePositionEl').html(text);
    },
    setMousePosition: function (event) {
        var text = event.baseHtml + ' ' + this.region.chromosome + ':' + Utils.formatNumber(event.mousePos);
        $('#'+this.id + 'mousePositionEl').html(text);
    }

}