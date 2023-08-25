### Launch
```
git clone
nvm use
npm ci
npm start
```

After that, open url http://localhost:3000 in browser

Right after you launched interface, it will prompt you for API key for JSON-generator API (you can obtain mine with URL https://onetimesecret.com/secret/70jx9nndetjmlj3v1debynv7g6bznw2 - ATTENTION! LINK CAN BE USED FOR SINGLE TIME!)

If you fail to enter right key, you'll have to clear key from localStorage, and, after page refresh, you'll be prompted again. To do so, just type  `localStorage.removeItem('json-generator-token')` into the development console.

### Lint
```
npm run lint
```
