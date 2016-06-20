function showMap()
{
    "use strict"

    ///

    var shadesOfGrey =
    [
        {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers:
            [
                { saturation: 36 },
                { color: "#000000" },
                { lightness: 40 }
            ]
        },
        {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers:
            [
                { visibility: "on" },
                { color: "#000000" },
                { lightness: 16 }
            ]
        },
        // {
        //     featureType: "all",
        //     elementType: "labels.icon",
        //     stylers:
        //     [
        //         { visibility: "off" }
        //     ]
        // },
        {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers:
            [
                { color: "#000000" },
                { lightness: 20 }
            ]
        },
        {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers:
            [
                { color: "#000000" },
                { lightness: 17 },
                { weight: 1.2 }
            ]
        },
        {
            featureType: "all",
            elementType: "geometry",
            stylers:
            [
                { color: "#000000" },
                { lightness: 20 }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers:
            [
                { color: "#000000" },
                { lightness: 21 }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers:
            [
                { "color": "#000000" },
                { "lightness": 17 }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers:
            [
                { color: "#000000" },
                { lightness: 29 },
                { weight: 0.2 }
            ]
        },
        {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers:
            [
                { color: "#000000" },
                { lightness: 18 }
            ]
        },
        {
            featureType: "road.local",
            elementType: "geometry",
            stylers:
            [
                { color: "#000000" },
                { lightness: 16 }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers:
            [
                { color: "#000000" },
                { lightness: 19 }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers:
            [
                { color: "#000000" },
                { lightness: 17 }
            ]
        }
    ]

    ///

    var lunarLandscape =
    [
        {
            "stylers":
            [
                { hue: "#ff1a00" },
                { invert_lightness: true },
                { saturation: -100 },
                { lightness: 33 },
                { gamma: 0.5 }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers:
            [
                { color: "#2D333C" }
            ]
        }
    ]

    var center =
    {
        lat: 50.448993,
        lng: 30.458967
    }

    var markerLocation =
    {
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        location: {
            lat: 50.448412,
            lng: 30.460126
        }
    }

    ///

    var mapElement = document.getElementById("map_iframe")
    var mapDataset = mapElement.dataset

    var map = new google.maps.Map(mapElement,
    {
        // styles: shadesOfGrey,
        styles: lunarLandscape,
        center: center,
        zoom: + mapDataset.zoom,

        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: true
    })


    var widgetDiv = document.getElementById("save-widget")

    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(widgetDiv);
            // Append a Save Control to the existing save-widget div.
        var saveWidget = new google.maps.SaveWidget(widgetDiv, {
          place: markerLocation,
          attribution: {
            source: 'TEDxKPI',
            webUrl: 'http://tedx.kpi.ua'
          }
        });

    var marker = new google.maps.Marker({
        map: map,
        position: saveWidget.getPlace().location,
        // icon: mapDataset.icon,
        title: mapDataset.title
    })

    marker.addListener("click", function()
    {
        top.open(mapDataset.href, "_blank")
    })
}
