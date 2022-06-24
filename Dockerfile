
FROM node:16-slim

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN npm prune --production

RUN rm -rf \ 
    test \
    src \
    tsconfig.build.json \
    nest-cli.json \
    tsconfig.json \
    README.md

CMD [ "sh", "-c", "npm run start:prod"]