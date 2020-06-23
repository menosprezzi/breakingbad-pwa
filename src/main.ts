import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

const bootstrap = async () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

declare const module: any;
if (environment.hmr) {
  // tslint:disable
  if (module['hot']) {
    import('./hmr').then(mod => mod.hmrBootstrap(module, bootstrap));
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
    bootstrap();
  }
} else {
  bootstrap();
}
