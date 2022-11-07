# AccountingApp

Accounting App is a project which helps to keep an overview of balances of personal wallets. It consists of a web application powered by NextJS, React, MUI and Recoil and a backend server powered by NestJS, TypeORM and MySQL.

## Configuration

Copy `.env.template` files in frontend and backend to `.env` respectively and fill in the values.

### Backend

The backend server is configured via environment variables. The following variables are available:

```env
SESSION_SECRET=
DATABASE_URL=
PORT=
```

### Frontend

The frontend is configured via environment variables. The following variables are available:

```env
NEXT_PUBLIC_BACKEND_HOST=
```

## Building

The project is structured as a Monorepo. It includes a shared package, that handles shared code between the frontend and the backend. The frontend and backend are located in the `frontend` and `backend` folders respectively. The shared package is located in the `shared` folder.

For both backend and frontend to work, the shared package needs to be built first. To do so, run the following command in the root folder:

```bash
npm run build:shared
```

After that, the backend can be built with the following command:

```bash
npm run build:backend
```

And the frontend can be built with the following command:

```bash
npm run build:frontend
```

## Development

Before starting the application, the shared package needs to be built. To do so, run the following command in the root folder:

```bash
npm run build:shared
```

After that, start backend and frontend in development mode in different terminals with the following commands:

```bash
npm run start:dev:backend
npm run start:dev:frontend
```
