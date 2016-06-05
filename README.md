# Почтовое приложение с Angular 1.5 и Firebase

Это браузерное одностраничное приложение для работы с электронной почтой на компьютере или мобильном устройстве пользователя.
Программа включает два основных модуля: почтовый ящик и книга контактов.

## Основные возможности

- Приложение взаимодействует с сервером посредством AJAX запросов, осуществляет чтение, добавление, обновление и удаление пользовательских данных на сервере.

- Модуль "mail-box" представляет пользователю интерфейс для поиска, чтения, отправки и удаления писем. Также поддерживается возможность восстановления писем из корзины.

- Модуль "contacts" представляет интерфейс для поиска, добавления, редактирования и удаления контактов.

- Разработанное с учетом адаптивной верстки, приложение работает, как на настольных компьютерах, так и на мобильных устройствах.

- Поддержка браузеров: начиная с IE10+ .

> Обратите внимание: в этой тестовой версии приложения, на бекенде не существует реального почтового сервера. После отправки письма, оно не будет доставлено получателю, а лишь будет сохранено на сервере в директории "отправленные письма".

## Демонстрация

Чтобы посмотреть работу приложения, перейдите по одной из ссылок ниже и введите тестовые данные для авторизации:

- логин: `my@email.com`
- пароль: `test`

[Демонстрация](http://ygazhala.github.io/mail-app "Прямая ссылка")

[Демонстрация на популярных мобильных устройствах](http://www.responsinator.com/?url=http%3A%2F%2Fygazhala.github.io%2Fmail-app "Открыть с использованием сервиса responsinator.com")

## Локальная установка

Чтобы запустить приложение локально, необходимо произвести его сборку с помощью Webpack. Исходные файлы находятся в директории `frontend`. В результате сборки в директорию `public` будут сохранены "пакетные" файлы `bundle.js` и `styles.css`, а также source-maps со ссылками на исходники. 

Для начала сборки убедитесь, что у вас глобально установлены: node.js, npm и webpack.

Далее:

1. Клонируйте этот репозиторий: https://github.com/yGazhala/mail-app.git

2. Перейдите в директорию с проектом и выполните команду: `npm install`, дождитесь установки всех зависимостей.

3. Выполните сборку с запуском локального дев-сервера, выполнив команду: `npm start`.

4. В адресной строке браузера наберите: `localhost:8080`.

После запуска дев-сервера, он отслеживает изменения в исходных файлах (в директории `frontend`) и отображает результаты в браузере.

Другие варианты сборки:
- `npm run build` - запускает сборку с минификацией, собранные файлы сохраняются в папке `public`.
- `npm run dev-build` - запускает сборку без минификации.

## Архитектура и файловая система

Приложение состоит из 6 модулей, которые в свою очередь включают отдельные компоненты. В каждой директории модуля находится файл `index.js` в котором инициализируется angular-модуль и объявляются angular-сущности (компоненты, сервисы и т.д). Сами компоненты описаны в отдельных JS файлах, в JS объектах и функциях, которые импортируются в `index.js`.

- Модуль `services` - включает сервисы, которые предоставляют данные для всего приложения. Сюда относятся: MailDataService, ContactsService, AuthService. Посредством этих сервисов осуществляются взаимодействие с сервером Firebase.

- Модуль `auth` - реализует "login/password" аутентификацию пользователя. Аутентификация осуществляется на сервере Firebase, посредством библиотеки AngularFire. В приложении, аутентификация размещена с помощью angular-ui-router. Детальнее по размещению авторизации смотрите следующие файлы:
```
services/auth.service.js;
auth/auth.routes.js;
auth/auth.run.js;
auth/login/login.component.js;
shared/shared.routes.js;
shared/logout/logout.component.js.
```

- Модуль `shared` - содержит общий макет страницы и общие компоненты, которые используются во всем приложении. Сюда относятся такие компоненты как: layout, page-mask, nav-bar и т.д.

- Модуль `mail-box` - реализует функционал почтового ящика, включает компоненты: message-list, message, compose и т.д.

- Модуль `contacts` - по аналогии с предыдущим модулем, модуль contacts реализует функционал книги контактов.

- Модуль `core` - это главный модуль, объединяет все модули в одно приложения и является точкой входа в программу.

### Организация стилей CSS

Исходные файлы стилей написаны с использованием препроцессора SASS и скомпилированы в один итоговый файл `styles.css`.
Как и в случае с организацией JS кода, стили CSS разбиты на модули и компоненты, таким образом, каждому компоненту соответствуют его стили.
Общая структура стилей выглядит так:
```
base
	- base.scss
	- reset.scss
modules
	- auth
	- contacts
		// компоненты
		- contacts-list.scss
		- user-card.scss
		...
	- mail-box
	- shared
utils
	- mixins.scss
	- variables.scss
core.scss
```

Здесь дополнительно присутствуют два модуля:
- Модуль `base` - включает сброс стилей браузера и общие базовые стили, такие как размер шрифта.
- Модуль `utils` - содержит все глобальные переменные и миксины, используемые в компонентах. Вынесение глобальных переменных в отдельный файл дает возможность удобно изменять общие стили для всего приложения, такие как цвета, шрифт и т.д. 

Для организации "областей видимости" к CSS классам добавляется префикс, который состоит из имени компонента, к которому относится данный класс стилей.
Например, класс `.contactsList_removeUserButton` относится к кнопке удаления контакта в компоненте `contacts-list`.