# Proyecto Backend Senati-Connection

## Deploy

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el archivo de configuracion para la base de datos

```bash
npx sequelize-cli init:config
```

```bash
{
    "development" : {
        "username" : "root",
        "password" : "password",
        "database" : "database",
        "host" : "127.0.0.1",
        "dialect" : "mysql"
    },
    "test" : {
        "username" : "root",
        "password" : "password",
        "database" : "database",
        "host" : "127.0.0.1",
        "dialect" : "mysql"
    },
    "production" : {
        "username" : "root",
        "password" : "password",
        "database" : "database",
        "host" : "127.0.0.1",
        "dialect" : "mysql"
    }
}
```

### 3. Correr Migraciones y Seeders

```bash
npx sequelize-cli db:migrate
```

```bash
npx sequelize-cli db:seed:all
```

### 4. Ejecutar el entorno

```bash
npx nodemon app.js
```