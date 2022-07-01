
FROM node:16-slim

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN npm prune --production

RUN rm -rf \ 
    tests \
    src \
    .github \
    tsconfig.build.json \
    jest.config.js \
    .eslintignore \
    .eslintrc.cjs \
    .gitignore \
    tsconfig.json \
    README.md

CMD [ "npm", "run", "start:prod"]