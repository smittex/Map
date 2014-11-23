$(document).foundation();
$(".full-height").height($(".main").parent().height());

var map,
    mapDiv;

function initialize() {
    google.maps.visualRefresh = true;

    mapDiv = $('#googft-mapCanvas')[0];
    mapDiv.style.width = '100%';
    mapDiv.style.height = '100%';

    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(44.966655601600145, -93.15117697460937),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    $('div.full-height').css('padding-right', 0);
}

// Resize the content to fit the window
$(window).on('resize', Foundation.utils.throttle(function(e){
    $('div.full-height').height($(window).height());
}, 300));

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
        }),
        legend: {
            title: 'Pounds Distributed',
            custom: true
        }
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
        name: 'schoolSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "col14",
                from: "1T5LM9Y5iww9SBb2ZQmCnO1iuziR5FN52NsYk-Zvm",
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
        name: 'precinctSwitch',
        overlay: new google.maps.FusionTablesLayer({
            heatmap: { enabled: false },
            query: {
                select: "colt",
                from: "1UHN42Ej1v23RI7LoClSYu5YNwAQ79X6TMK8uHpYF",
                where: ""
            },
            options: {
                styleId: 2,
                templateId: 2
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
        }),
        legend: {
            title: 'Children 0-5 in Poverty',
            min: 0,
            max: 1080,
            minColor: '#cfe2f3',
            maxColor: '#0000ff'
        }
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
        }),
        legend: {
            title: 'Children 6-18 in Poverty',
            min: 0,
            max: 1192,
            minColor: '#d9ead3',
            maxColor: '#00ff00'
        }
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
        }),
        legend: {
            title: 'Seniors in Poverty',
            min: 0,
            max: 599,
            minColor: '#f4cccc',
            maxColor: '#ff0000'
        }
    },
];

var source   = $("#legend").html();
var template = Handlebars.compile(source);

$(document).ready(function () {
    $('.switch [type=checkbox]').change(function () {
        var legendData = [],
            context = {subLegends: []};

        // Iterating from top down to keep the food shelf, CSFP, and congressional layers on top
        for (var i = layers.length - 1; i >= 0; i--) {
            layers[i].overlay.setMap($('#' + layers[i].name)[0].checked ? map : null);

            if($('#' + layers[i].name)[0].checked && typeof layers[i].legend != "undefined") {
                legendData.push(layers[i].legend);
            }
        }

        // Reverse the legend data and push them into an object
        for (var i = legendData.length - 1; i >= 0; i--) {
            if (typeof legendData[i] != 'undefined') {
                // Determine if there's an item before this item for styling reasons
                legendData[i].hasNext = typeof legendData[i - 1] != "undefined";
                context.subLegends.push(legendData[i]);
            }
        }

        var legend = template(context);
        $('#googft-legend').replaceWith(legend);

        context.subLegends.length ? map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend')) : null;
    });
});
