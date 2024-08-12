# KonectApp

Este proyecto es una aplicación full-stack compuesta por un backend, un frontend y una base de datos PostgreSQL. La infraestructura está configurada para ejecutarse en contenedores Docker utilizando Docker Compose.

## Prerrequisitos

Antes de iniciar, asegúrate de tener instalados los siguientes componentes:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estructura del Proyecto

- **Backend**: Carpeta `./Backend`
- **Frontend**: Carpeta `./Frontend/konectapp-front`
- **Base de Datos**: PostgreSQL, configurada en el contenedor `db`

## Configuración del Entorno

La aplicación está configurada para utilizar las siguientes variables de entorno:

- `DATABASE_URL`: URL de conexión a la base de datos PostgreSQL.
  - **Valor**: `postgresql://postgres:1234@db:5432/konectapp`
- `POSTGRES_USER`: Nombre de usuario de PostgreSQL.
  - **Valor**: `postgres`
- `POSTGRES_PASSWORD`: Contraseña del usuario de PostgreSQL.
  - **Valor**: `1234`
- `POSTGRES_DB`: Nombre de la base de datos.
  - **Valor**: `konectapp`

Estas variables de entorno ya están definidas en el archivo `docker-compose.yml`.

## Iniciar la Aplicación

Para levantar la aplicación, sigue los siguientes pasos:

1. Clona el repositorio en tu máquina local.
2. Navega hasta la carpeta raíz del proyecto.
3. Ejecuta el siguiente comando para construir y levantar los servicios:

   ```bash
   docker-compose up --build

# Nota Importante

### Disculpa por la Falta de Implementación de Alertas

Quiero ofrecer una disculpa por no haber podido implementar alertas en el frontend que notifiquen a los usuarios sobre las respuestas de los servicios (éxito o error) en esta iteración del proyecto. 

Debido a limitaciones de tiempo, prioricé otras funcionalidades críticas para asegurar que la aplicación estuviera operativa y cumpliera con los requisitos principales. Reconozco que las alertas son una parte importante de la experiencia del usuario y, sin duda, mejorarían la interacción al brindar retroalimentación inmediata.