import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './shared/shared.module';

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: 'AIzaSyDVIkR6kIcvR6UUg196hQixaAfvddgW6KM',
    authDomain: 'fitness-app-bf2ac.firebaseapp.com',
    databaseURL: 'https://fitness-app-bf2ac.firebaseio.com',
    projectId: 'fitness-app-bf2ac',
    storageBucket: 'fitness-app-bf2ac.appspot.com',
    messagingSenderId: '886834584882'
};

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ]
})
export class AuthModule {
}
