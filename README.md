# AADMIN-150 백엔드 기초 세팅

# install history

npm i --save typeorm-extension
npm i --save-dev @faker-js/faker
npm i --save @nestjs/typeorm typeorm mysql2
npm i --save @nestjs/config
npm i --save class-validator class-transformer
npm i --dev jest-junit
npm i axios

# Github npm docs

[Faker Docs](https://fakerjs.dev/guide/)

# typeorm migration & seed With typeorm-extension package

**[Click Github [typeorm-extension] Click](https://github.com/tada5hi/typeorm-extension)**

### Database Schema Create

```
npm run db:create
```

### Database Schema drop

```
npm run db:drop
```

### seed 생성

```
 npm run seed:create --name=<이름>

 # EX. npm run seed:create --name=user -> 1700746434744-user
```

### seed 실행

```
 npm run seed:run --name=<이름>

 # EX. npm run seed:create --name=user -> 1700746434744-user
```

### database migration generate

```
npm run migration:generate
```

### database migration run

```
npm run migration:run
```

### database migration revert

```
npm run migration:revert
```

test
