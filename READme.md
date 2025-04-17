# RedTex

RedTex é um aplicativo para upload, dowload e analise de IA para documentos pdf e imagens.

![](https://raw.githubusercontent.com/gabriel-ferreira-da-silva/RedTex/f1b627dda68f29a14055e05e314364bea1f15374/frontend/src/assets/appear.gif)

# backend

Para rodar o backend é necessário rodar os comandos basicos npm para aplicações nest.js e configurar o banco de de dado com prismaORM

```shell
cd backend
npm install
npm run build
npx prisma generate --schema ./src/prisma/schema.prisma
npm run start
```

No arquivo backend/.env altere as variáveis de ambiente, caso queira usar serviços diferentes ou localmente.

# Frontend

O frontend foi desenvolvido com React. Para roda-lo:

```
cd frontend
npm install
npm run build
npm run start
```

