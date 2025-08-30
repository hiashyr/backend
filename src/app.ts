import "dotenv/config";
import express from "express";
import { AppDataSource } from "./config/data-source";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import examRoutes from './routes/exam.routes';
import questionRoutes from './routes/question.routes'; // Добавляем новый роут
import topicRoutes from './routes/topic.routes'; // Добавляем этот импорт
import hardModeRoutes from './routes/hard-mode.routes';
import adminRoutes from './routes/admin.routes'; // Добавляем админ роут
import theoryRuleRoutes from './routes/theoryRule.routes';
import theoryTopicRoutes from './routes/theoryTopic.routes';
import theoryPointRoutes from './routes/theoryPoint.routes';
import path from "path";
import fs from "fs"; // Для создания папок

const app = express();
const PORT = process.env.PORT;

// Проверка обязательных переменных
if (!process.env.JWT_SECRET || !process.env.FRONTEND_URL) {
  console.error("❌ Ошибка: Отсутствуют обязательные переменные в .env");
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: (process.env.FRONTEND_URL || '').split(',').map(url => url.trim()),
  credentials: true
}));
app.use(express.json());

// Создаем папки для загрузок если их нет
const uploadDirs = [
  path.join(__dirname, '../uploads/avatars'),
  path.join(__dirname, '../uploads/questions')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Статические файлы
app.use('/api/uploads/avatars', express.static(uploadDirs[0]));
app.use('/api/uploads/questions', express.static(uploadDirs[1]));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Роуты
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/tests/hard-mode", hardModeRoutes);
app.use("/api/admin", adminRoutes); // Добавляем админ роут
app.use("/api/theory-rules", theoryRuleRoutes);
app.use("/api/theory-topics", theoryTopicRoutes);
app.use("/api/theory-points", theoryPointRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Сервер работает",
    uploads: {
      avatars: "/uploads/avatars",
      questions: "/uploads/questions"
    }
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

// Инициализация
AppDataSource.initialize()
  .then(() => {
    console.log("✅ База данных подключена");
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`📁 Папки загрузок созданы: ${uploadDirs.join(', ')}`);
    });
  })
  .catch(error => {
    console.error("❌ Ошибка подключения к БД:", error);
    process.exit(1);
  });
