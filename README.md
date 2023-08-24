### Запуск
```
git clone
npm ci
npm start
```

далее в браузере http://localhost:3000

После запуска попросит ключ API JSON-Generator (если нужен мой - он есть по ссылке https://onetimesecret.com/secret/70jx9nndetjmlj3v1debynv7g6bznw2 ВНИМАНИЕ! ССЫЛКА ОДНОРАЗОВАЯ!)

Если вы ввели неверный ключ, то надо очистить ключ из localStorage и после обновления страницы, интерфейс попросит ключ снова. Для этого в консоли `localStorage.removeItem('json-generator-token')`
