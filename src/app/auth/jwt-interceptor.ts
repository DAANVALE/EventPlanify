import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  const authUrl = 'http://localhost:8080/auth'; 

  // Intercepta si hay token, si la URL es el backend principal y no es un endpoint de autenticación
  if (token && req.url.startsWith('http://localhost:8080') && !req.url.startsWith(authUrl)) {
    const cloned = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};