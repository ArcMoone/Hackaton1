var placemarks = [];

function createPlacemark(coords, isDraggable = false){
    return new ymaps.Placemark(coords, {
        hintContent: '',
        balloonContent: ''
        }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/5309/5309036.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20],
        draggable: isDraggable
        })
}

function getAllPoints(){
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/getPoints');
    xhr.send();

    xhr.onload = function(){
        let response = xhr.response;
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
    let map = new ymaps.Map('map', { // инициализация карты
        center: [55.75399399999374, 37.62209300000001],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: []
    });

    let userPlacemark;
    let userID = 1; // временно
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/getUserPoint?id=' + userID); // Получаю метку пользователя по его id
    xhr.send();

    xhr.onload = function(){
        let response = xhr.response;
        let coords = response['coords'];
        if(coords[0] != 0 && coords[1] != 0){
            userPlacemark = createPlacemark([coords[0], coords[1]], true); // Ставлю метку пользователя
            map.geoObjects.add(userPlacemark);
        }
    };

    placemarks.forEach(function(obj){ // использую массив, полученный из бд, для расставления меток на карту
        let placemark = createPlacemark([obj.latitude, obj.longitude]);
        map.geoObjects.add(placemark);
    });

    map.events.add('click', function(e){ // жду клика по карте и ставлю/передвигаю метку пользователя
        let coords = e.get('coords');
        if(userPlacemark){
            userPlacemark.geometry.setCoordinates(coords);
        }
        else{
            userPlacemark = createPlacemark(coords);
            map.geoObjects.add(userPlacemark);
        }
        let flag = false;
        xhr1 = new XMLHttpRequest();
        xhr1.open('GET', '/checkAround?latitude=' + coords[0] + '&longitude=' + coords[1], false);
        xhr1.send();
        if(xhr1.status == 200){
            let response = JSON.parse(xhr1.response);
            if(response['result'] == 1){
                flag = true;
            }
        }
        if(flag){
            xhr.open('GET', '/setPoint?latitude=' + coords[0] + '&longitude=' + coords[1]);
            xhr.send();
            xhr.onload = function(){};
        }
    })
}

getAllPoints();
ymaps.ready(init);
