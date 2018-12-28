import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Store } from 'store';
import { AuthModule } from '../auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { AppComponent } from './containers/app/app.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule
    ],
    providers: [
        Store
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
