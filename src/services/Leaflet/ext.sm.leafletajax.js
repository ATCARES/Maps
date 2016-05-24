/**
 * JavaScript for Leaflet in the Semantic Maps extension.
 * @see https://www.mediawiki.org/wiki/Extension:Semantic_Maps
 *
 * @licence GNU GPL v2+
 * @author Peter Grassberger < petertheone@gmail.com >
 */


(function( $ ) {
    var ajaxRequest = null;

    // todo: maybe move to Maps
    function getQueryString( map, ajaxcoordproperty ) {
        var bounds = map.map.getBounds();

        var query = map.options.ajaxquery.join( ' ' ) + ' ';
        query += '[[' + ajaxcoordproperty + '::+]] ';
        query += '[[' + ajaxcoordproperty + '::>' + bounds.getSouthWest().lat + '°, ' + bounds.getSouthWest().lng + '°]] ';
        query += '[[' + ajaxcoordproperty + '::<' + bounds.getNorthEast().lat + '°, ' + bounds.getNorthEast().lng + '°]]';
        query += '|?' + ajaxcoordproperty;
        return query;
    }

    function ajaxUpdateMarker( map ) {
        var ajaxcoordproperty = map.options.ajaxcoordproperty;
        var query = getQueryString( map, ajaxcoordproperty );

        if ( ajaxRequest !== null ) {
            ajaxRequest.abort();
        }

        ajaxRequest = $.ajax( {
            method: 'GET',
            url: '/w/api.php?',
            data: {
                'action': 'ask',
                'query': query,
                'format': 'json'
            },
            dataType: 'json'
        } ).done( function( data ) {
            ajaxRequest = null;

            // todo: don't remove and recreate all markers..
            // only add new ones.
            // todo: implement removeMarkers() in Maps
            //map.removeMarkers();
            for ( var property in data.query.results ) {
                if ( data.query.results.hasOwnProperty( property ) ) {
                    var location = data.query.results[property];
                    var coordinates = location.printouts[ajaxcoordproperty][0];
                    map.addMarker( coordinates );
                }
            }
        } );
    }

    var mapEvents = ['dragend', 'zoomend'];

    $( document ).ready( function() {
        // todo: find a way to remove setTimeout.
        setTimeout(function() {
            $( window.maps.leafletList ).each( function( index, map ) {
                if (!map.options.ajaxquery && !map.options.ajaxcoordproperty) {
                    return;
                }
                map.map.on( mapEvents.join( ' ' ), function() {
                    console.log('event!');
                    ajaxUpdateMarker( map );
                } );
            } );
        }, 500 );
    } );
})( window.jQuery );
