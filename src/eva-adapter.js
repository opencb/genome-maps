/*
 * Copyright (c) 2014 Francisco Salavert (SGL-CIPF)
 * Copyright (c) 2014 Alejandro Alemán (SGL-CIPF)
 * Copyright (c) 2014 Ignacio Medina (EBI-EMBL)
 *
 * This file is part of EVA.
 *
 * EVA is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * EVA is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EVA. If not, see <http://www.gnu.org/licenses/>.
 */
function EvaAdapter(args) {

    _.extend(this, Backbone.Events);

    this.host;
    this.version;

    _.extend(this, args);

    this.on(this.handlers);

    this.cache = {};
}

EvaAdapter.prototype = {

    getData: function (args) {
        var _this = this;

        args.webServiceCallCount = 0;

        /** Check region and parameters **/
        var region = args.region;
        if (region.start > 300000000 || region.end < 1) {
            return;
        }
        region.start = (region.start < 1) ? 1 : region.start;
        region.end = (region.end > 300000000) ? 300000000 : region.end;


        var params = {};
        _.extend(params, this.params);
        _.extend(params, args.params);

        var dataType = args.dataType;
        if (_.isUndefined(dataType)) {
            console.log("dataType must be provided!!!");
        }
        var chunkSize;


        /** Check dataType histogram  **/
        if (dataType == 'histogram') {
            // Histogram chunks will be saved in different caches by interval size
            // The chunkSize will be the histogram interval
            var histogramId = dataType + '_' + params.interval;
            if (_.isUndefined(this.cache[histogramId])) {
                this.cache[histogramId] = new FeatureChunkCache(_.extend({chunkSize: params.interval, objectStore: 'eva'}, this.cacheConfig));
            }
            chunkSize = this.cache[histogramId].chunkSize;

            // Extend region to be adjusted with the chunks
            //        --------------------             -> Region needed
            // |----|----|----|----|----|----|----|    -> Logical chunk division
            //      |----|----|----|----|----|         -> Chunks covered by needed region
            //      |------------------------|         -> Adjusted region
            this.cache[histogramId].getAdjustedRegions(region, function (adjustedRegions) {
                if (adjustedRegions.length > 0) {
                    for (var i = 0; i < adjustedRegions.length; i++) {
                        args.webServiceCallCount++;
                        // Get CellBase data
                        EvaManager.get({
                            host: _this.host,
                            version: _this.version,
                            species: _this.species,
                            category: _this.category,
                            query: adjustedRegions[i],
                            resource: _this.resource,
                            params: params,
                            success: function (data) {
                                _this._histogramSuccess(data, dataType, histogramId, args);
                            }
                        });
                    }
                }

                // Get chunks from cache
                _this.cache[histogramId].getByRegion(region, function (cachedChunks) {
                    _this.trigger('data:ready', {items: cachedChunks, dataType: dataType, chunkSize: chunkSize, sender: _this});
                    if (args.webServiceCallCount === 0) {
                        args.done();
                    }
                });
            });
            /** Features: genes, snps ... **/
        } else {
            // Features will be saved using the dataType features
            if (_.isUndefined(this.cache[dataType])) {
                this.cache[dataType] = new FeatureChunkCache(_.extend({objectStore: 'eva'}, this.cacheConfig));
            }
            chunkSize = this.cache[dataType].chunkSize;

            // Get cached chunks and not cached chunk regions
            //        --------------------             -> Region needed
            // |----|----|----|----|----|----|----|    -> Logical chunk division
            //      |----|----|----|----|----|         -> Chunks covered by needed region
            //      |----|++++|++++|----|----|         -> + means the chunk is cached so its region will not be retrieved
            this.cache[dataType].getCachedByRegion(region, function (chunksByRegion) {
                if (chunksByRegion.notCached.length > 0) {
                    var queryRegionStrings = _.map(chunksByRegion.notCached, function (region) {
                        return new Region(region).toString();
                    });

                    // Multiple CellBase calls will be performed, each one will
                    // query 50 or less chunk regions
                    var n = 50;
                    var lists = _.groupBy(queryRegionStrings, function (a, b) {
                        return Math.floor(b / n);
                    });
                    // Each element on queriesList contains and array of 50 or less regions
                    var queriesList = _.toArray(lists); //Added this to convert the returned object to an array.

                    for (var i = 0; i < queriesList.length; i++) {
                        args.webServiceCallCount++;
                        EvaManager.get({
                            host: _this.host,
                            version: _this.version,
                            species: _this.species,
                            category: _this.category,
                            query: queriesList[i],
                            resource: _this.resource,
                            params: params,
                            success: function (data) {
                                _this._success(data, dataType, args);
                            }
                        });
                    }
                }
                // Get chunks from cache
                if (chunksByRegion.cached.length > 0) {
                    _this.cache[dataType].getByRegions(chunksByRegion.cached, function (cachedChunks) {
                        _this.trigger('data:ready', {items: cachedChunks, dataType: dataType, chunkSize: chunkSize, sender: _this});
                        if (args.webServiceCallCount === 0) {
                            args.done();
                        }
                    });
                }
            });
        }
        if (args.webServiceCallCount === 0) {
            args.done();
        }
    },

    _success: function (data, dataType, args) {
        args.webServiceCallCount--;
        var timeId = this.resource + " save " + Utils.randomString(4);
        console.time(timeId);
        /** time log **/

        var chunkSize = this.cache[dataType].chunkSize;

        var regions = [];
        var chunks = [];
        for (var i = 0; i < data.response.length; i++) {
            var queryResult = data.response[i];

            regions.push(new Region(data.query[i]));
            chunks.push(queryResult.result);
        }
        chunks = this.cache[dataType].putByRegions(regions, chunks);

        /** time log **/
        console.timeEnd(timeId);


        if (chunks.length > 0) {
            this.trigger('data:ready', {items: chunks, dataType: dataType, chunkSize: chunkSize, sender: this});
        }
        if (args.webServiceCallCount === 0) {
            args.done();
        }


    },
    _histogramSuccess: function (data, dataType, histogramId, args) {
        args.webServiceCallCount--;
        var timeId = Utils.randomString(4);
        console.time(this.resource + " save " + timeId);
        /** time log **/

        var chunkSize = this.cache[histogramId].chunkSize;

        var chunks = [];
        var regions = [];
        for (var i = 0; i < data.response.length; i++) {
            var queryResult = data.response[i];
            var queryId = data.query[i];//temporal
            for (var j = 0; j < queryResult.result.length; j++) {
                var interval = queryResult.result[j];
                var region = new Region(queryId);
                regions.push(region);
                chunks.push(interval);
            }
        }

        var items = this.cache[histogramId].putByRegions(regions, chunks, false, histogramId);

        this.trigger('data:ready', {items: items, dataType: dataType, chunkSize: chunkSize, sender: this});
        if (args.webServiceCallCount === 0) {
            args.done();
        }

        /** time log **/
        console.timeEnd(this.resource + " get and save " + timeId);
    }
};