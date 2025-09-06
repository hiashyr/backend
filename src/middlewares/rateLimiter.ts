import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import logger from '../config/logger';

// Создаем подключение к Redis, если оно настроено
const redisClient = process.env.REDIS_URL 
  ? new Redis(process.env.REDIS_URL)
  : null;

// Создаем хранилище для ограничителя
const store = redisClient 
  ? new RedisStore({
      sendCommand: (...args: string[]) => redisClient.call(args[0], ...args.slice(1)) as Promise<any>,
    })
  : undefined; // Если Redis не доступен, будет использоваться память

// Общий лимитер для всех API endpoints
export const apiLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Лимит 100 запросов с одного IP
  message: {
    error: 'TOO_MANY_REQUESTS',
    message: 'Слишком много запросов. Попробуйте позже.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Специальный лимитер для регистрации
export const registrationLimiter = rateLimit({
  store,
  windowMs: 60 * 60 * 1000, // 1 час
  max: 5, // Максимум 5 попыток регистрации в час
  message: {
    error: 'TOO_MANY_REGISTRATION_ATTEMPTS',
    message: 'Слишком много попыток регистрации. Попробуйте через час.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Специальный лимитер для авторизации
export const loginLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Максимум 10 попыток входа за 15 минут
  message: {
    error: 'TOO_MANY_LOGIN_ATTEMPTS',
    message: 'Слишком много попыток входа. Попробуйте через 15 минут.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Лимитер для запросов на сброс пароля
export const passwordResetLimiter = rateLimit({
  store,
  windowMs: 60 * 60 * 1000, // 1 час
  max: 3, // Максимум 3 попытки сброса пароля в час
  message: {
    error: 'TOO_MANY_RESET_ATTEMPTS',
    message: 'Слишком много попыток сброса пароля. Попробуйте через час.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware для проверки повторной регистрации email
export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const key = `registration:${req.body.email}`;
  
  try {
    if (redisClient) {
      const attempts = await redisClient.get(key);
      if (attempts) {
        return res.status(429).json({
          error: 'DUPLICATE_REGISTRATION',
          message: 'Повторная попытка регистрации. Проверьте свою почту или подождите некоторое время.'
        });
      }
      
      // Устанавливаем флаг на 30 минут
      await redisClient.set(key, '1', 'EX', 1800);
    }
    next();
  } catch (error) {
    logger.error('Rate limiter error:', error);
    next();
  }
};
