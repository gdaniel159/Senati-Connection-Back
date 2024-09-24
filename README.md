# Proyecto Backend Senati-Connection

## Deploy

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el directorio y archivo de configuracion

```bash
mkdir config
```
```bash
nano config.json
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
npx sequelize-cli init
```

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