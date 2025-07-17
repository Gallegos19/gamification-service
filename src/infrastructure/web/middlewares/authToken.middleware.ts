import { Request, Response, NextFunction } from 'express';

/**
 * Middleware que verifica la existencia de un token de autenticación en el encabezado de la solicitud.
 * No valida la firma ni el contenido del token, solo verifica que exista.
 */
export function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers.authorization;
  
  // Verificar si el encabezado Authorization existe
  if (!authHeader) {
    return res.status(401).json({ 
      message: 'Acceso no autorizado',
      error: 'Token de autenticación no proporcionado'
    });
  }
  
  // Verificar si el encabezado tiene el formato correcto (Bearer token)
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      message: 'Acceso no autorizado',
      error: 'Formato de token inválido. Debe ser "Bearer [token]"'
    });
  }
  
  const token = parts[1];
  
  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ 
      message: 'Acceso no autorizado',
      error: 'Token de autenticación vacío'
    });
  }
  
  // Si el token existe, continuar con la siguiente función en la cadena de middleware
  next();
}