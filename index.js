var map;

function initialize() {
    google.maps.visualRefresh = true;

    var mapDiv = $('#googft-mapCanvas')[0];
    mapDiv.style.width = '100%';
    //mapDiv.style.height = '90%';

    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(44.966655601600145, -93.15117697460937),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    /*

     map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend-open'));
     map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));
     */
}

google.maps.event.addDomListener(window, 'load', initialize);

var layers = [
    {
        name: 'foodShelfSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col7",
                from: "1deXuJFS4T3kHXSZgYMCP1e1K0iXcMPiIm8ina0JO",
                where: ""
            },
            options: {
                styleId: 3,
                templateId: 4
            }
        })
    },
    {
        name: 'csfpSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col6\x3e\x3e0",
                from: "1HBr7P4oowfyWTExXZYw0KqYEDCKF0-9gx7GU6c-q",
                where: ""
            },
            options: {
                styleId: 2,
                templateId: 2
            }
        })
    },
    {
        name: 'conDistSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col5",
                from: "187LYAmqvE1mKBINMJ-3cdrF-1mN4JUtETtGX1PA0",
                where: ""
            },
            options: {
                styleId: 2,
                templateId: 2
            }
        })
    },
    {
        name: 'childPopulationSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 6,
                templateId: 6
            }
        })
    },
    {
        name: 'childrenInPovertySwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 7,
                templateId: 7
            }
        })
    },
    {
        name: 'childPovertyRateSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 8,
                templateId: 8
            }
        })
    },
    {
        name: 'sixToEighteenPopulationSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 9,
                templateId: 9
            }
        })
    },
    {
        name: 'sixToEighteenInPovertySwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 10,
                templateId: 10
            }
        })
    },
    {
        name: 'sixToEighteenPovertyRateSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 11,
                templateId: 11
            }
        })
    },
    {
        name: 'seniorPopulationSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 2,
                templateId: 2
            }
        })
    },
    {
        name: 'seniorsInPovertySwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 4,
                templateId: 4
            }
        })
    },
    {
        name: 'seniorPovertyRateSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14\x3e\x3e1",
                from: "1vZSvyPyfneLqGIhWEBA7ltERhz1K73_35QqjgVcT",
                where: ""
            },
            options: {
                styleId: 5,
                templateId: 5
            }
        })
    }
];

$(document).ready(function () {
    $('.switch [type=checkbox]').change(function () {
        // Iterating from top down to keep the food shelf, CSFP, and congressional layers on top
        for (var i = layers.length - 1; i >= 0; i--) {
            layers[i].overlay.setMap($('#' + layers[i].name)[0].checked ? map : null);
        }
    });
});