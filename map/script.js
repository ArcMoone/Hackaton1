ymaps.ready(init);

function init(){
    let map = new ymaps.Map('map', {
        center: [55.75399399999374,37.62209300000001],
        zoom: 12
    });

    let placemark = new ymaps.Placemark([55.75399399999374,37.62209300000001], {
        balloonContentHeader: 'Header',
        balloonContentBody: 'Body',
        balloonContentFooter: 'Footer'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/5309/5309036.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20]
    });

    map.geoObjects.add(placemark);
}