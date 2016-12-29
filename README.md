# ShopCrawler

## Build & Run
```bash
npm install
npm run build

export PORT=8000
export NODE_ENV=dev

# docker run --name mongodb --publish 27017:27017 -d mongo
export DATABASE_HOST="localhost"
export DATABASE_PORT="27017"
export DATABASE_NAME="shop_crawler"

# docker run --name redis --publish 6379:6379 -d redis
export REDIS_HOST="localhost" 
export REDIS_PORT="6379" 
export REDIS_PREFIX="shop_crawler"

# Вытянуть из магазина товары и категории
node ./dist/cli.js crawler

# Запуск сервера
node ./dist/app.js

# Примеры запросов
## Корневые категории
curl localhost:8000/api/categories 

## Категория и дерево ее потомков
curl localhost:8000/api/categories/586439c3094127555fb22479 # (586439c3094127555fb22479 - _id категории)

## Товары
curl "localhost:8000/api/products?perPage=10&page=1"
## Товары из категории
curl "localhost:8000/api/products?perPage=10&page=1&category=586439c3094127555fb22479" # (586439c3094127555fb22479 - _id категории)

# Товар
curl "localhost:8000/api/products/586439c5094127555fb224e6" # (586439c5094127555fb224e6 - _id товара)
```

## Задание
* Написать парсер любого интернет-магазина, который сохранит в базу все категории и товары. 
Для примера можно взять интернет-магазин с 10 категориями и 200-300 товарами.
    * Категории должны иметь вложенность
    * Товары должны иметь:
        * название
        * категорию (связь)
        * описание
        * цену
* Создать приложение на NodeJS, которое будет парсить товары и складывать их в базу данных MongoDB.
* Создать методы получения категорий и товаров.

## Обязательные условия:
* Использовать TypeScript;
* Применять gulp или любой другой сборщик.

## Рекомендуемые условия:
* Плюсом будет реализация с использованием кэширующего сервера
Redis для методов получения категорий и товаров.


> Результаты прохождения тестового задания необходимо "залить" в публичный репозиторий (предпочтительно Git). 
> Предоставить пример результирующей базы и набор инструкций, как её получить.