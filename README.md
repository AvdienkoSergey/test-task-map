### Порядок установки

```
npm install --legacy-peer-deps
```

### Порядок запуска в dev режиме

```
npm run serve
```

### Порядок исправления ошибок выявленных Prettier

```
npm run prettier:doctor
```

### Порядок сборки Docker и его последующего запуск

```
docker build -t test-task-map .
docker run -d -p 80:80 --name app test-task-map
```

Внимание! Проверьте что 80 порт не занят. Напрмер, службой IIS на Windows

### Технический долг по заданию

- Добавление кнопки переключения тема Светлая/Темная
- Реализация всех ключевых действий через Observer pattern
- Добавить режим namespace для модулей Vuex
- Добавить e2e тесты
