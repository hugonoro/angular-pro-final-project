# Angular Pro Final Project

This is the final project of the Ultimate Angular Pro course and was adapted to be using [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0. 
instead of the provided seed codebase. The motivation for this, apart from the challenge motivation, was the occurrence of a few issues on the 
early stages of the course due to version mismatch of the dependencies. This project was started more than a year after the initial seed was created 
and I have decided to try to adapt it to run on the latest version of the CLI. It would also be a good exercise trying to adapt it.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Firebase
1. Install Firebase CLI on the command-line with `npm install -g firebase-tools`
2. You'll need to ensure you're logged into Firebase first `firebase login` (if you are prompted, otherwise skip to next step):
3. Run `npm run deploy` to build the project in production mode and deploy to Firebase. It is assumed the user has an account and is logged in to Firebase

## Upgrading to AngularFire 5.0
AngularFire 5.0 is a refactor of the AngularFireDatabase module. It removes the FirebaseListObservable and FirebaseObjectObservable in favor of a generic based service API.

In this version of the project a few changes were needed in order to use the latest version of the API.

For further reference on the changes needed please check the [Documentation](https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md#50)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
