# AADMIN-150 백엔드 기초 세팅

# install history

npm install typeorm-extension --save
npm install --save @nestjs/typeorm typeorm mysql2
npm i --save @nestjs/config
npm i --save class-validator class-transformer

# typeorm migration

```
"typeorm": "node -r tsconfig-paths/register -r ts-node/register ./node_modules/typeorm/cli",
"typeorm:migration": "node -r tsconfig-paths/register -r ts-node/register ./node_modules/typeorm/cli -d ./src/database/configs/migration.config.ts",
"migration:create": "npm run typeorm migration:create ./src/database/migrations/$npm_config_name",
"migration:generate": "npm run typeorm:migration migration:generate ./src/database/migrations/$npm_config_name",
"migration:run": "npm run typeorm:migration migration:run",
```
