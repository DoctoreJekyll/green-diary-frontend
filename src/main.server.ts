import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/auth/auth.interceptor';

const bootstrap = () => bootstrapApplication(App, {
  providers: [
    provideServerRendering(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
});

export default bootstrap;
