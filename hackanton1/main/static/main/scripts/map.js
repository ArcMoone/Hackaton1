var xhr = new XMLHttpRequest();

xhr.open('GET', '/getPoints');
xhr.send();

var placemarks = [];

xhr.onload = function(){
    var responseText = xhr.responseText;
    // TODO:(Тимур) получить массив меток из бд. Зайди в main.py и измени getPoints(), чтобы она сюда этот массив отдала.
    //вот как массив должен выглядеть:
    placemarks = [ // в квадратных скобках элементы массива (метки)
    { // в фигурных скобках содержимое меток
        latitude: 55.75399399999374, 
        longitude: 37.62209300000001,
        id: 0
    },
    {
        latitude: 55.76399399999374, 
        longitude: 37.61209300000001,
        id: 1
    }
    ];
};

xhr.open('GET', '/getUserPoint');
xhr.send();

var myPlacemark;

xhr.onload = function(){
    var responseText = xhr.responseText;
    // TODO:(Тимур) добавить получение координат метки пользователя в myPlacemark из бд с пользователями, eсли у данного пользователя есть метка:
    // myPlacemark = createPlacemark([latitude, longitude]);
    //для этого измени getUserPoint() в main.py
}

ymaps.ready(init);

function init(){
    var map = new ymaps.Map('map', { // инициализация карты
        center: [55.75399399999374, 37.62209300000001],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: []
    });

    placemarks.forEach(function(obj){ // использую массив, полученный из бд, для расставления меток на карту
        var placemark = new ymaps.Placemark(obj.coordinates, {
            hintContent: '',
            balloonContent: ''
            }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/5309/5309036.png',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -20]
            }
        );

        map.geoObjects.add(placemark);
    });

    map.events.add('click', function(e){ // жду клика по карте и ставлю/передвигаю метку пользователя
        var coords = e.get('coords');
        if(myPlacemark){
            myPlacemark.geometry.setCoordinates(coords);
        }
        else{
            xhr.open('GET', '/checkAround?coords=' + coords);
            xhr.send();
            xhr.onload = function(){
                var responseText = xhr.responseText;
            }
            /*TODO: (Никита) пройти по бд с пользователями и проверить:
                    Если в радиусе 1 км есть метки, которые уже и так в голосовании, ничего дальше делать не нужно.
                    Если в радиусе 500 м есть только пользовательские метки, то, если их >= 100, поставить в их общем центре одну настоящую, а пользовательские удалить.
            */
            myPlacemark = createPlacemark(coords);
            map.geoObjects.add(myPlacemark);
        }
        // TODO: (Тимур) положить метку в бд или изменить координаты, если она уже есть в бд
        xhr.open('POST', '/setPoint');
        xhr.send();
    })

    function createPlacemark(coords){
        return new ymaps.Placemark(coords, {
            hintContent: '',
            balloonContent: ''
            }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/5309/5309036.png',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -20],
            draggable: true
            })
    }
}