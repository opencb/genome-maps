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
var EvaManager = {
    host: 'http://www.ebi.ac.uk/eva/webservices/rest',
    version: 'v1',
    get: function (args) {
        var success = args.success;
        var error = args.error;
        var async = (_.isUndefined(args.async) || _.isNull(args.async) ) ? true : args.async;
        var urlConfig = _.omit(args, ['success', 'error', 'async']);

        var url = EvaManager.url(urlConfig);
        if (typeof url === 'undefined') {
            return;
        }
        console.log(url);

        var d;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',//still firefox 20 does not auto serialize JSON, You can force it to always do the parsing by adding dataType: 'json' to your call.
            async: async,
            success: function (data, textStatus, jqXHR) {
                if ($.isPlainObject(data) || $.isArray(data)) {
                    data.query = args.query;
                    if (_.isFunction(success)) success(data);
                    d = data;
                } else {
                    console.log('Eva returned a non json object or list, please check the url.');
                    console.log(url);
                    console.log(data)
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("EvaManager: Ajax call returned : " + errorThrown + '\t' + textStatus + '\t' + jqXHR.statusText + " END");
                if (_.isFunction(error)) error(jqXHR, textStatus, errorThrown);
            }
        });
        return d;
    },
    url: function (args) {
        if (!$.isPlainObject(args)) args = {};
        if (!$.isPlainObject(args.params)) args.params = {};

        var version = this.version;
        if (typeof args.version !== 'undefined' && args.version != null) {
            version = args.version
        }

        var host = this.host;
        if (typeof args.host !== 'undefined' && args.host != null) {
            host = args.host;
        }

        delete args.host;
        delete args.version;

        var config = {
            host: host,
            version: version
        };

        var params = {
        };

        _.extend(config, args);
        _.extend(config.params, params);

        var query = '';
        if (typeof config.query !== 'undefined' && config.query != null) {
            if ($.isArray(config.query)) {
                config.query = config.query.toString();
            }
            query = '/' + config.query;
        }

        var url = config.host + '/' + config.version + '/' + config.category + query + '/' + config.resource;
        url = Utils.addQueryParamtersToUrl(config.params, url);
        return url;
    }
};