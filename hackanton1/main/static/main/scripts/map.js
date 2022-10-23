var placemarks = [];

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

function getAllPoints(){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/getPoints');
    xhr.send();

    xhr.onload = function(){
        var response = xhr.response;
        // TODO:(Тимур) получить массив меток из бд
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
}

function init(){
    var map = new ymaps.Map('map', { // инициализация карты
        center: [55.75399399999374, 37.62209300000001],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: []
    });

    var userPlacemark;
    var userID = 1; // временно
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/getUserPoint?id=' + userID);
    xhr.send();

    xhr.onload = function(){
        var response = xhr.response;
        var coords = response['coords'];
        if(coords[0] != 0 && coords[1] != 0){
            userPlacemark = createPlacemark([coords[0], coords[1]]);
            map.geoObjects.add(userPlacemark);
        }
    };

    placemarks.forEach(function(obj){ // использую массив, полученный из бд, для расставления меток на карту
        var placemark = createPlacemark([obj.latitude, obj.longitude]);
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
}

getAllPoints();
ymaps.ready(init);
