## Реализация

В основе лежит реализация класса WorldMap. Позволяет работать с любыми типами карт, которые релизуют интерфейс WorldMapAbstract

```
export abstract class WorldMapAbstract {
  abstract downloadDependencies(url?: string, guid?: string): Promise<boolean>;
  abstract initialization<T>(config: T): Promise<void>;
  abstract displayOnTheScreen<T>(coordinates: T): void;
  abstract enableEventTracking(): void;
  abstract disableEventTracking(): void;
  abstract createTrackingEvent<T>(event: T): void;
  abstract moveAroundTheMap<T>(coordinates: T): void;
  abstract deleteAllObjects<T>(objects: T[]): void;
  abstract putAllObjects<T>(objects: T[]): void;
  abstract putOneObject<T>(object: T): void;
}
```

Я для примера 2 подключил. Google требует заполнения каких-то форм (не стал)

```
/src/entities
  - MapYandex
  - MapGoogle
  - MapLeaflet
```

Для использования желаемой карты сделайте нужное наследование

```
import { YandexMap } from "./MapYandex";
import { LeafletMap } from "./MapLeaflet";

class _WorldMap extends YandexMap {
  constructor() {
    super();
  }
}

const WorldMap = new _WorldMap();

export { WorldMap, _WorldMap };
```

Тесты на рандомный компонент и имплементацию класса WorldMapAbstract в лице YandexMap

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

### Технический долг по заданию обязательный

- При клике на маркер должна подсвечиваться запись в списке
- В адресной строке должен отображаться id выбранного маркера

### Технический долг по заданию опциональный

- Добавление кнопки переключения тема Светлая/Темная
- Реализация всех ключевых действий через Observer pattern
- Добавить режим namespace для модулей Vuex
- Добавить e2e тесты
