'use strict';
// This data were uploaded to firebase:
// https://gazhala.firebaseio.com/inbox.json
// https://gazhala.firebaseio.com/sent-mail.json
// https://gazhala.firebaseio.com/trash.json
// I left this file here, just for example.

var inboxJson = `[
    {
        "id": 0,
        "boxId": "inbox",
        "date": 1457615478909,
        "email": "ivanov@mail.ru",
        "subject": "свежий юмор",
        "content": "Проблемы в личной жизни? Устройся на две работы!!! Нет личной жизни - нет проблем..."
    },{
        "id": 1,
        "boxId": "inbox",
        "date": 1462136400000,
        "email": "petrov@mail.ru",
        "subject": "занудный факт",
        "content": "Высота горы Мауна-Кеа от основания до вершины составляет 10203 метра, что на 1355 метров выше Джомолунгмы. Большая часть горы скрыта под водой, а над уровнем моря Мауна-Кеа возвышается на 4205 метров."
    },{
        "id": 2,
        "boxId": "inbox",
        "date": 1462827600000,
        "email": "natasha@mail.ru",
        "subject": "о погоде",
        "content": "В России закончилась самая теплая зима за всю историю метеонаблюдений (а ведутся они у нас с 1891 года, больше 120 лет), сообщили в Росгидромете. До сих пор рекорд держался за зимой 1962 года. В центре России, Северо-Западном федеральном округе, в Сибири и на Дальнем Востоке средняя температура трех зимних месяцев на 4 - 7 градусов зашкалила за климатические нормы. На юге страны аномалии не такие сильные, хотя на Черном море уже в феврале стояла 20-градусная теплынь - хоть пляжный сезон открывай!"
    },{
        "id": 3,
        "boxId": "inbox",
        "date": 1465160400000,
        "email": "bender@planet-express.com",
        "subject": "Bender's quote",
        "content": "Blackmail is such an ugly word. I prefer extortion. The ‘x’ makes it sound cool."
    },{
        "id": 4,
        "boxId": "inbox",
        "date": 1459976400000,
        "email": "yoda@star-wars.com",
        "subject": "Yoda's quote",
        "content": "You will know (the good from the bad) when you are calm, at peace. Passive. A Jedi uses the Force for knowledge and defense, never for attack."
    },{
        "id": 5,
        "boxId": "inbox",
        "date": 1465246800000,
        "email": "yoda@star-wars.com",
        "subject": "Yoda's quote",
        "content": "Many of the truths that we cling to depend on our point of view."
    },{
        "id": 6,
        "boxId": "inbox",
        "date": 1463432400000,
        "email": "fry@planet-express.com",
        "subject": "Fry's quote",
        "content": "Oh my God, it's the future. My parents, my co-workers, my girlfriend, i'll never see any of them again. Yahoo!"
    },{
        "id": 7,
        "boxId": "inbox",
        "date": 1460667600000,
        "email": "hubert@planet-express.com",
        "subject": "Professor's quote",
        "content": "Good news, everyone! The university is bringing me on disciplinary charges. Wait - that's not good news at all."
    },{
        "id": 8,
        "boxId": "inbox",
        "date": 1458853200000,
        "email": "hubert@planet-express.com",
        "subject": "Science News",
        "content": "To make robots more cooperative and have them perform tasks in close proximity to humans, they must be softer and safer. A new actuator generates movements similar to those of skeletal muscles using vacuum power to automate soft, rubber beams. Like real muscles, the actuators are soft, shock absorbing, and pose no danger to their environment or humans working collaboratively alongside them or the potential future robots equipped with them."
    },{
        "id": 9,
        "boxId": "inbox",
        "date": 1456779600000,
        "email": "ivanov@mail.ru",
        "subject": "Printing Live Human Tissue",
        "content": "Two Israeli companies say they used a specialized 3-D printer to create an environment in which stem cells could grow into a specific tissue. In the near future, the technology could be used for testing new drugs, but it also opens up the possibility of growing organ replacements.\n\n In 2006, Japanese scientist Shinya Yamanaka and his team discovered that common human cells, such as skin cells, can be turned into stem cells, previously harvested from embryos. With ethical concerns about using embryonic stem cells removed, many researchers around the world started experimenting with tissue regeneration.\n\n The so-called induced pluripotent stem cells, or IPS cells, are now being used for replacing simpler tissues in the human body lost to disease or injury."
    }
]`;

var sentMailJson = `[
    {
        "id": 0,
        "boxId": "sent-mail",
        "date": 1457606478800,
        "email": "natasha@mail.ru",
        "subject": "Бавария - Вердер: 5:0",
        "content": "Мюнхенская Бавария в рамках 26-го тура чемпионата Германии без проблем разгромила обескровленный Вердер Виктора Скрипника. Уже на 9-й минуте первый гол забил полузащитник хозяев Тьяго Алькантара. На 31-й минуте отличился его партнер Томас Мюллер."
    },{
        "id": 1,
        "boxId": "sent-mail",
        "date": 1461963600000,
        "email": "fry@planet-express.com",
        "subject": "Leo DiCaprio wins his first oscar",
        "content": "The biggest highlight of the night for the six-time Oscar nominated actor: making history by finally winning his first Oscar! Leonardo won Best Actor in a Leading Role for his performance in The Revenant, and his Oscar acceptance speech was certainly one for the record books."
    },{
        "id": 2,
        "boxId": "sent-mail",
        "date": 1461618000000,
        "email": "leia@star-wars.com",
        "subject": "Новый iPhone 7",
        "content": "Ожидаемая дата выхода - осень 2016, получит абсолютно новый дизайн и обновления в технической части. iPhone 7 должен получить экран с разрешением 2К (2560x1440 пикселей) и обновленный 3D Touch. Возможен вариант выпуска трех iPhone 7 – с экранами 5,5, 4,7 и 4 дюйма."
    },{
        "id": 3,
        "boxId": "sent-mail",
        "date": 1457902800000,
        "email": "hubert@planet-express.com",
        "subject": "Space news",
        "content": "Elon Musk believes SpaceX should be able to land humans on Mars nine years from now. \n\nMusk reiterated confidence in his Mars timeline at the Code Conference on Wednesday night. 'If things go according to plan, we should be able to launch people in 2024, with arrival in 2025,' Musk said. \n\nMusk said he's planning to share an architectural plan for the colonization of Mars at a conference in September 2016. The tech conference audience was enthralled by Musk's comments. He told interviewers Kara Swisher and Walt Mossberg that plotting travel throughout the Solar System, and 'ultimately other star systems', provides the kind of inspiration that makes life worth living."
    },{
        "id": 4,
        "boxId": "sent-mail",
        "date": 1465246800000,
        "email": "yoda@star-wars.com",
        "subject": "Part 1: Getting Healthy By Phone",
        "content": "Over and over, science tells us that losing weight is about eating less, and exercising more. But for many people, going to a gym or starting a weight loss regimen is not an option. \n\nHowever, it's easy to download all kinds of meal plans or weight loss programs from any app store. In fact, according to new research from a team of European scientists, there are currently more than 3,000 mobile apps that pop up in response to the key words 'weight', 'weight-management', and 'calorie.'\n\nWhen the team from Catholic University of Louvain, Belgium, and the University of Glasgow in Scotland studied the apps, they found the content focused mainly on body weight, exercise and calorie intake."
    },{
        "id": 5,
        "boxId": "sent-mail",
        "date": 1465160400000,
        "email": "yoda@star-wars.com",
        "subject": "Part 2: Getting Healthy By Phone",
        "content": "Is All Information Good Information? \n\nIn presenting their work at the European Obesity Summit being held this week in Sweden, lead researcher Charoula Nikolaou, from Catholic University expressed concern about 'the quality of the information provided in each app.' \n\nHe told VOA, 'for example, there are apps advising on extreme diets like smoothie diet or very high protein, low carbohydrate diets' which may not be advisable for everyone. \n\nThe other concern, he told VOA, is that 'They might be downloaded by an adult but can also be downloaded by a child or a teenager or a vulnerable adult, where following the wrong advice would have more detrimental effects.' \n\nWe asked if there was any push to regulate the apps, but Nikolaou said so far he did not see much push, but he did point to an intriguing website called https://iprescribeapps.com/.  It's run by 'a team of health care professionals that look into developing apps that could be prescribed and would be password protected.' \n\nDoctor could use the site to prescribe an app that they think passes muster, just like they write a prescription for medicine."
    }
]`;

var trash = `[
    {
        "id": 0,
        "boxId": "inbox",
        "date": 1463778000000,
        "email": "fry@planet-express.com",
        "subject": "What Is It Like to Become an Astronaut?",
        "content": "Colonel Terry Virts always knew he wanted to be a pilot or an astronaut. He had pictures of galaxies and planes on his walls as a child. He never thought he could actually become an astronaut, but he did the things he had to do to qualify. He got a mathematics degree, went into the Air Force, and eventually became a test pilot. In 2000, he was accepted to the astronaut candidate program. As an active astronaut with the U.S. Space Program -- the National Aeronautics and Space Administration -- Virts has one of the most demanding jobs in the world. He has flown the space shuttle, conducted spacewalks, and was the commander of the International Space Station in spring 2015. Upon being selected for the astronaut program, 'I was excited beyond belief. This is my boyhood dream, and I finally made it happen,' Virts said."
    },{
        "id": 1,
        "boxId": "inbox",
        "date": 1464728400000,
        "email": "yoda@star-wars.com",
        "subject": "Build your own AngularJS by Tero Parviainen",
        "content": "This book will teach you the inner workings of AngularJS by guiding you through implementing your own version of the framework from the ground up. Each feature is introduced by discussing what it's used for and why it's needed. The feature is then implemented step by step using test-driven development practices: By writing a failing test and then making it pass."
    },{
        "id": 2,
        "boxId": "inbox",
        "date": 1460322000000,
        "email": "bender@planet-express.com",
        "subject": "Futurama",
        "content": "Futurama is an American animated science fiction sitcom created by Matt Groening for the Fox Broadcasting Company. The series follows the adventures of a late-20th-century New York City pizza delivery boy, Philip J. Fry, who, after being unwittingly cryogenically frozen for one thousand years, finds employment at Planet Express, an interplanetary delivery company in the retro-futuristic 31st century."
    }
]`;
