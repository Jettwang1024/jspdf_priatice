import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
//import { config } from './app/app.config.server';

//const bootstrap = () => bootstrapApplication(AppComponent, config);

const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
    ]
  });

export default bootstrap;
