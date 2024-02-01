import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { name, version, as_web_component } from '../config';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: as_web_component ? [] : [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    if (as_web_component) {
      const selector = `${name}_${version}`;
      const e1 = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define(selector, e1);
    }
  }
}
