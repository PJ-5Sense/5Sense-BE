FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package* ./

RUN npm install --silent

COPY . .

RUN npm run build

RUN npm prune --production

# 개발 과정에서만 사용되었던 의존성 패키지들을 삭제함 - 이슈가 생길 시 우선파악할 요소
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD [ "node", "./dist/main" ]