import rateLimit from 'express-rate-limit';


export const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });
 