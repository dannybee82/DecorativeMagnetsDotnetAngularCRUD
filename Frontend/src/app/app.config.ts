import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';
import { LoadingService } from './services/loading/loading.service';

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  
  // Show loading spinner when request starts
  loadingService.isLoading.next(true);

  return next(req).pipe(
    tap(event => {
      // Hide loading spinner when response is received
      if (event.type === HttpEventType.Response || event.type === HttpEventType.User || event.type === HttpEventType.ResponseHeader) {
        loadingService.isLoading.next(false);
      }
    }),
    // Use finalize to ensure loading is hidden even if there's an error
    finalize(() => {
      loadingService.isLoading.next(false);
    })
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    )
  ]
};