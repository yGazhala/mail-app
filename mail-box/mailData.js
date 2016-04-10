'use strict';
// This data were uploaded to firebase:
// https://gazhala.firebaseio.com/inbox.json
// https://gazhala.firebaseio.com/sent-mail.json
// I left this file here, just for example

var inboxJson = `[
    {
        "id": 0,
        "boxId": "inbox",
        "date": 1457615478909,
        "email": "ivanov@mail.ru",
        "subject": "свежий юмор",
        "content": "Проблемы в личной жизни? Устройся на две работы!!! Нет личной жизни - нет проблем..."
    },
    {
        "id": 1,
        "boxId": "inbox",
        "date": 1457605458419,
        "email": "petrov@mail.ru",
        "subject": "занудный факт",
        "content": "Высота горы Мауна-Кеа от основания до вершины составляет 10203 метра, что на 1355 метров выше Джомолунгмы. Большая часть горы скрыта под водой, а над уровнем моря Мауна-Кеа возвышается на 4205 метров."
    },
    {
        "id": 2,
        "boxId": "inbox",
        "date": 1457605478609,
        "email": "natasha@mail.ru",
        "subject": "о погоде",
        "content": "В России закончилась самая теплая зима за всю историю метеонаблюдений (а ведутся они у нас с 1891 года, больше 120 лет), сообщили в Росгидромете. До сих пор рекорд держался за зимой 1962 года. В центре России, Северо-Западном федеральном округе, в Сибири и на Дальнем Востоке средняя температура трех зимних месяцев на 4 - 7 градусов зашкалила за климатические нормы. На юге страны аномалии не такие сильные, хотя на Черном море уже в феврале стояла 20-градусная теплынь - хоть пляжный сезон открывай!"
    }
]`;

var sentMailJson = `[
    {
        "id": 0,
        "boxId": "sent-mail",
        "date": 1457606478800,
        "email": "sidorov@yandex.ru",
        "subject": "Бавария - Вердер: 5:0",
        "content": "Мюнхенская Бавария в рамках 26-го тура чемпионата Германии без проблем разгромила обескровленный Вердер Виктора Скрипника. Уже на 9-й минуте первый гол забил полузащитник хозяев Тьяго Алькантара. На 31-й минуте отличился его партнер Томас Мюллер."
    },
    {
        "id": 1,
        "boxId": "sent-mail",
        "date": 1457606479000,
        "email": "joe-springfield@gmail.com",
        "subject": "Leo DiCaprio wins his first oscar",
        "content": "The biggest highlight of the night for the six-time Oscar nominated actor: making history by finally winning his first Oscar! Leonardo won Best Actor in a Leading Role for his performance in The Revenant, and his Oscar acceptance speech was certainly one for the record books."
    },
    {
        "id": 2,
        "boxId": "sent-mail",
        "date": 1457606499000,
        "email": "semen@mail.ru",
        "subject": "Новый iPhone 7",
        "content": "Ожидаемая дата выхода - осень 2016, получит абсолютно новый дизайн и обновления в технической части. iPhone 7 должен получить экран с разрешением 2К (2560x1440 пикселей) и обновленный 3D Touch. Возможен вариант выпуска трех iPhone 7 – с экранами 5,5, 4,7 и 4 дюйма."
    }
]`;

var trash = `[
    {
        "id": 0,
        "boxId": "inbox",
        "date": 1457615478900,
        "email": "ivanov@mail.ru",
        "subject": "юмор",
        "content": "Проблемы в личной жизни?"
    },
    {
        "id": 1,
        "boxId": "sent-mail",
        "date": 1457606499000,
        "email": "semen@mail.ru",
        "subject": "iPhone",
        "content": "Ожидаемая дата выхода"
    }
]`;
