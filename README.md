## Mail app with Angular 1.5, Firebase and authorization

This is a browser single page application for managing emails on personal computers or on mobile devices.
The app consists of 2 main modules: "mail-box" and "contacts".

## Core features

- The app connects with a server by AJAX technology and implements creating, reading, updating and deleting user data on the server.

- The "mail-box" module provides a user interface for searching, creating, reading and deleting emails. An autocomplete in the email field on the compose form was implemented. When the user fills in the field, requiring contacts are being shown automatically. In addition, restoring emails from the trash is also supported.

- The "contacts" module provides an interface for searching, creating, reading, updating and deleting contacts.

- Checking of user forms was implemented with "ngMessages" module.

- Routing was made with Angular UI router.

- The app was developed with responsive web design, thereby it runs well on desktops, tablets and smartphones.

- Browser support: IE10+ .

> Note: in this test version, there is no a real postal service on the server. Thus, new messages will not be sent to receivers. They will be just saved in the sent mail directory on the server.

## Demo

To see demo in your browser, please follow one of the next links and pass authorization with this login/password:

- login: `my@email.com`
- password: `test`

[Demo](https://gazhala.firebaseapp.com "Direct link")

[Demo on popular mobile devices](http://www.responsinator.com/?url=https%3A%2F%2Fgazhala.firebaseapp.com "See through responsinator.com service")

## Local installation

To run the app locally, you need to compile package files with Webpack. The source code is in the `frontend` directory. In the end of packaging, Webpack adds resulted `bundle.js`, `styles.css` and the source-maps to the `public` directory.

At first, ensure you are running `Node (v4.1.x+)` and `NPM (2.15.x+)`.

Next:

1. Clone this repository: https://github.com/yGazhala/mail-app.git

2. Navigate to the project directory and run: `npm install`, wait until all dependencies will be installed.

3. To compile package files and run the local dev-server, execute: `npm start`.

4. Open in your browser: `http://localhost:8080`.

When the dev-server runs, it tracks all changes in the source code (`frontend` directory) and updates the results in the browser.

You can also make the package files without running the dev-server:
- `npm run build` - makes compressed files and adds them to the `public` directory.
- `npm run dev-build` - makes uncompressed files.

## Unit testing

There are two ways of running tests:
- `npm run test` - single run;
- `npm run test-watch` - live mode (TDD style).

> Note: writing unit tests is ongoing. Currently, the next modules are covered with tests: `services` - 94,6%.

## Architecture and the file system

The app consists of 6 modules, each of them also includes separate components. Each module directory includes `index.js` file, that initializes angular-module and angular-entities (components, services etc.). The original entities were written in JavaScript objects and functions and were imported to the `index.js`.

- `services` module provides data services to the entire application. It includes MailDataService, ContactsService, AuthService. The app is connected with Firebase server by these services.

- `auth` module provides user "login/password" authentication. The authentication is performed on Firebase server by using AngularFire library. In the app, the authentication is placed with angular-ui-router. To understand how the authentication is implemented, see the next files:

```
services/auth.service.js;
auth/auth.routes.js;
auth/auth.run.js;
auth/login/login.component.js;
auth/logout/logout.component.js.
shared/shared.routes.js;
shared/layout/layout.html;
```

- `shared` module describes the page layout and includes common components that are used by different modules of the app. These components are "layout", "page-mask", "nav-bar" etc.

- `mail-box` module provides user interface for managing emails, it includes the next components: "message-list", "message", "compose" etc. The autocomplete service for the "email" field on the compose form was implemented with Angular Material library. It was the only task in the app, which this library was used for.

- `contacts` - like the previous one, this module provides user interface for managing contacts.

- `core` module joins all modules to one application, it is also the program entry point.

- `mocks` directory includes static data needed for unit tests.

### CSS stylesheet structure

The source code was written in SASS and was compiled to the single `styles.css` file.

Organization of stylesheets is similar to the structuring of the JavaScript code. The styles were divided into modules and components, thus each component corresponds its styles.

The general structure is:
```
base
	- base.scss
	- reset.scss
modules
	- auth
	- contacts
		// components
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

There are two extra modules:
- `base` module describes setting of browser styles and common base styles, as a font-family and font-size.
- `utils` module includes all global variables and mixins, that are used by all classes. This allows changing common styles for the entire app easily.

To arrange "namespaces" - prefixes are added to names of CSS classes. Each prefix - is the name of the corresponding component.
For example, `.contactsList_removeUserButton` class refers to the remove user button in the `contacts-list` component.