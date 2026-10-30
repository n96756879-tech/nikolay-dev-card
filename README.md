# Nikolay Dev Card

Backend-визитка разработчика, построенная на современном стеке технологий с GraphQL API.

## Технологии

- **Runtime**: Node.js 20+
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **API**: GraphQL, Apollo Server 4
- **Containerization**: Docker, Docker Compose

## Архитектура

Проект реализует модульный монолит NestJS с чётким разделением ответственности:

### Слои архитектуры

1. **GraphQL Resolvers** (`src/*/resolver.ts`)
   - Обработка входящих GraphQL-запросов
   - Валидация входных данных
   - Делегирование бизнес-логики сервисам

2. **Services** (`src/*/service.ts`)
   - Бизнес-логика приложения
   - Работа с данными через Prisma
   - Трансформация и агрегация данных

3. **Prisma** (`src/prisma/prisma.service.ts`)
   - Централизованный доступ к базе данных
   - Управление соединениями
   - Глобальный сервис для всех модулей

4. **Modules** (`src/*/module.ts`)
   - Организация функциональности по доменам
   - Dependency Injection
   - Изоляция и тестируемость

### Структура модулей

```
src/
├── prisma/          # Глобальный Prisma сервис
├── profile/         # Модуль профиля
│   ├── dto/         # GraphQL типы
│   ├── profile.resolver.ts
│   └── profile.service.ts
├── skill/           # Модуль навыков
├── experience/      # Модуль опыта работы
└── project/         # Модуль проектов
```

## База данных

### Схема

```prisma
model Profile {
  id          Int          @id @default(autoincrement())
  name        String
  description String?
  email       String?
  github      String?
  linkedin    String?
  skills      Skill[]
  experience  Experience[]
  projects    Project[]
}

model Skill {
  id        Int     @id @default(autoincrement())
  name      String
  profileId Int
  profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
}

model Experience {
  id          Int     @id @default(autoincrement())
  company     String?
  position    String?
  period      String?
  description String?
  profileId   Int
  profile     Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
}

model Project {
  id          Int     @id @default(autoincrement())
  name        String
  description String?
  url         String?
  profileId   Int
  profile     Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
}
```

### Связи

- **Profile → Skills**: One-to-Many
- **Profile → Experience**: One-to-Many
- **Profile → Projects**: One-to-Many
- **Cascade Delete**: При удалении профиля удаляются все связанные записи

## GraphQL API

### Доступные запросы

#### Основной запрос профиля

```graphql
query {
  profile {
    id
    name
    description
    email
    github
    linkedin
    skills {
      id
      name
    }
    experience {
      id
      company
      position
      period
      description
    }
    projects {
      id
      name
      description
      url
    }
  }
}
```

#### Дополнительные запросы

```graphql
# Все навыки
query {
  skills {
    id
    name
  }
}

# Весь опыт работы
query {
  experience {
    id
    company
    position
    period
    description
  }
}

# Все проекты
query {
  projects {
    id
    name
    description
    url
  }
}
```

### Apollo Sandbox

В режиме разработки доступен Apollo Sandbox для интерактивного тестирования запросов:

```
http://localhost:3000/graphql
```

## Запуск проекта

### Предварительные требования

- Node.js 20+
- PostgreSQL 16 (или Docker)
- npm 10+

### Локальный запуск

1. **Установите зависимости**
   ```bash
   npm install
   ```

2. **Настройте переменные окружения**
   ```bash
   cp .env.example .env
   ```
   
   Отредактируйте `.env` при необходимости:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nikolay_dev_card?schema=public"
   ```

3. **Выполните миграции и seed**
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

4. **Запустите приложение**
   ```bash
   npm run start:dev
   ```

5. **Откройте Apollo Sandbox**
   ```
   http://localhost:3000/graphql
   ```

### Запуск через Docker Compose

1. **Запустите все сервисы**
   ```bash
   docker-compose up --build
   ```

2. **Подождите готовности**
   - PostgreSQL запустится с healthcheck
   - Приложение автоматически выполнит миграции и seed
   - Сервис станет доступен после полной инициализации

3. **Откройте Apollo Sandbox**
   ```
   http://localhost:3000/graphql
   ```

4. **Остановка сервисов**
   ```bash
   docker-compose down
   ```

5. **Остановка с удалением данных**
   ```bash
   docker-compose down -v
   ```

## Команды

```bash
# Разработка
npm run start:dev          # Запуск с hot-reload
npm run start:debug        # Запуск с отладкой

# Production
npm run build              # Сборка TypeScript
npm run start:prod         # Запуск production сборки

# База данных
npx prisma generate        # Генерация Prisma Client
npx prisma migrate dev     # Создание и применение миграций
npx prisma migrate deploy  # Применение миграций в production
npx prisma studio          # Визуальный редактор БД
npm run prisma:seed        # Заполнение БД начальными данными

# Тестирование
npm test                   # Unit тесты
npm run test:e2e           # E2E тесты
npm run test:cov           # Покрытие кода

# Линтинг
npm run lint               # Проверка кода
npm run format             # Форматирование кода
```

## Структура проекта

```
nikolay-dev-card/
├── src/
│   ├── prisma/              # Prisma сервис
│   ├── profile/             # Модуль профиля
│   │   ├── dto/
│   │   │   └── profile.type.ts
│   │   ├── profile.module.ts
│   │   ├── profile.resolver.ts
│   │   └── profile.service.ts
│   ├── skill/               # Модуль навыков
│   │   ├── dto/
│   │   │   └── skill.type.ts
│   │   ├── skill.module.ts
│   │   ├── skill.resolver.ts
│   │   └── skill.service.ts
│   ├── experience/          # Модуль опыта работы
│   │   ├── dto/
│   │   │   └── experience.type.ts
│   │   ├── experience.module.ts
│   │   ├── experience.resolver.ts
│   │   └── experience.service.ts
│   ├── project/             # Модуль проектов
│   │   ├── dto/
│   │   │   └── project.type.ts
│   │   ├── project.module.ts
│   │   ├── project.resolver.ts
│   │   └── project.service.ts
│   ├── app.module.ts        # Корневой модуль
│   └── main.ts              # Точка входа
├── prisma/
│   ├── schema.prisma        # Схема базы данных
│   └── seed.ts              # Seed скрипт
├── docker-compose.yml       # Docker Compose конфигурация
├── Dockerfile               # Docker образ приложения
├── .env.example             # Пример переменных окружения
├── package.json
├── tsconfig.json
└── README.md
```

## Архитектурные решения

### 1. Модульная архитектура
Каждая сущность (Profile, Skill, Experience, Project) вынесена в отдельный модуль для:
- Чёткого разделения ответственности
- Упрощения тестирования
- Масштабируемости
- Переиспользования

### 2. GraphQL вместо REST
- Единая точка входа для всех данных
- Клиент запрашивает только нужные поля
- Избежание over-fetching и under-fetching
- Само-документирующийся API

### 3. Prisma как ORM
- Type-safe запросы
- Автоматические миграции
- Декларативная схема
- Встроенный seed механизм

### 4. Global Prisma Module
- Единое подключение к БД
- Переиспользование соединения
- Упрощение dependency injection

### 5. Docker Compose
- Воспроизводимое окружение
- Автоматическая инициализация БД
- Healthcheck для PostgreSQL
- Готовность к production deployment

### 6. Seed механизм
- Идемпотентность (безопасный повторный запуск)
- Автоматическая очистка перед заполнением
- Предопределённые данные для демонстрации

## Решение проблемы N+1

GraphQL резолверы используют `@ResolveField` для ленивой загрузки связанных данных:

```typescript
@ResolveField(() => [SkillType])
async skills(@Parent() profile: Profile) {
  return this.profileService.getSkills(profile.id);
}
```

Это предотвращает избыточные запросы при вложенных полях и позволяет Prisma оптимизировать выполнение.

## Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `DATABASE_URL` | Подключение к PostgreSQL | `postgresql://postgres:postgres@localhost:5432/nikolay_dev_card?schema=public` |
| `PORT` | Порт приложения | `3000` |

## Лицензия

MIT

## Автор

Николай Толмачев  
Email: nikt0lmachev@yandex.ru  
GitHub: https://github.com/n96756879-tech
