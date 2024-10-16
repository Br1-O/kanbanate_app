<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="  https://github.com/user-attachments/assets/dff38aeb-a5c1-4ebd-be1e-dce2a283bed3">
    <img src="https://github.com/user-attachments/assets/dff38aeb-a5c1-4ebd-be1e-dce2a283bed3" alt="Logo" width="200" height="150" style="border-radius:15px;">
  </a>


  <h3 align="center"> Kanbanate </h3>

  <p align="center">
    Un sistema Kanban para el manejo de espacios de trabajo colaborativos
    <br />
    <a href="https://"><strong> Ver sitio en producción »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenido </summary>
  <ol>
    <li><a href="#about"> Sobre el proyecto</a></li>
    <li><a href="#develop-with">Desarrollado con</a></li>
    <li><a href="#project-structure">Estructura del proyecto </a></li>
    <li><a href="#preview">Vista previa </a></li>
    <li><a href="#getting-started"> Cómo instalarlo</a></li>
  </ol>
</details>


<a id="about"></a>
<!-- ABOUT THE PROJECT -->
## Sobre este proyecto

Este proyecto se trata de un sistema Kanban, que cuenta con un sistema de autentificación de usuarios y gestión de organizaciones, en las cuales los usuarios podrán crear multiples tableros kanban para la gestión de tareas y visualizar la actividad de cada uno en las respectivas tareas así como desde un panel global.
<br><br>
Originalmente se desarrolló este proyecto bajo el marco de trabajo integrador final para el curso de Desarrollador Fullstack, brindado por [CILSA](https://www.cilsa.org/).

<p align="right">(<a href="#readme-top">Volver al inicio</a>)</p>

<a id="develop-with"></a>
## Desarrollado con:

Para este proyecto se usaron las siguientes técnologias, lenguajes y librerias:

#### Desarrollo en general:

* React.js
* Next.js
* TailwindCSS
* mySQL
* Prisma

#### Librerias para funcionalidades:

* Shadcn-ui
* Sonner
* Lodash
* Hello-pangea/dnd

#### Control de versionado:

[![GitHub][GitHub.com]][GitHub-url]
[![Git][Git.com]][Git-url]

#### Personalmente se optó para el desarrollo de este proyecto el uso de:

[![VSCode][VSCode.com]][VSCode-url]
[![LiveServer][LiveServer.com]][LiveServer-url]

<p align="right">(<a href="#readme-top">Volver al inicio</a>)</p>

<a id="project-structure"></a>
## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

  <a href="https://github.com/user-attachments/assets/3a6a3191-0f4c-40c7-83c7-f77b69aed2d1">
    <img src="https://github.com/user-attachments/assets/3a6a3191-0f4c-40c7-83c7-f77b69aed2d1" alt="proyect structure" width="350" height="900" style="border-radius:15px;">
  </a>

Al tratarse de una aplicación que usa el sistema de enrutamiento de Next.js las carpetas corresponden con endpoints de la aplicación, y poseen una sintaxis propia:
() => carpetas de categorización que no afectan al enrutamiento
[] => rutas dinamicas
_ => carpetas que quedan ocultas al cliente

<p align="right">(<a href="#readme-top">Volver al inicio</a>)</p>

<a id="preview"></a>
## Vista previa

#### Pagina Sign-In/Sign-Up (path: '/sign-in' | '/sign-up')

<a href="https://github.com/user-attachments/assets/bfef4479-a28f-4d3c-848a-dd6c24ad9920" target="_blank">
  <img src="https://github.com/user-attachments/assets/bfef4479-a28f-4d3c-848a-dd6c24ad9920" alt="documentation-main1" width="800"/>
</a>
<a href="https://github.com/user-attachments/assets/d91f6c2f-f5cc-4535-8eb7-fabf32e7a864" target="_blank">
  <img src="https://github.com/user-attachments/assets/d91f6c2f-f5cc-4535-8eb7-fabf32e7a864" alt="documentation-main2" width="800"/>
</a>

#### Pagina de creación / selección de organizaciones (path: '/select-org')

<a href="https://github.com/user-attachments/assets/a3c07ae1-4173-4b78-964e-2ef4a62790c8" target="_blank">
  <img src="https://github.com/user-attachments/assets/a3c07ae1-4173-4b78-964e-2ef4a62790c8" alt="documentation-selectOrg" width="800"/>
</a>

#### Pagina de organización (path: '/organization/[orgId]')

<a href="https://github.com/user-attachments/assets/54bfc6d1-96c4-4113-b163-4917ff7d5699" target="_blank">
  <img src="https://github.com/user-attachments/assets/54bfc6d1-96c4-4113-b163-4917ff7d5699" alt="documentation-mainOrg" width="800"/>
</a>
<a href="https://github.com/user-attachments/assets/d4e95906-b4bb-4f08-8dfa-d897e1a2a91e" target="_blank">
  <img src="https://github.com/user-attachments/assets/d4e95906-b4bb-4f08-8dfa-d897e1a2a91e" alt="documentation-mainOrg" width="800"/>
</a>
<a href="https://github.com/user-attachments/assets/88a69d07-decf-40c4-8f46-5baa94c4f0cd" target="_blank">
  <img src="https://github.com/user-attachments/assets/88a69d07-decf-40c4-8f46-5baa94c4f0cd" alt="documentation-mainOrg" width="800"/>
</a>

#### Pagina de tablero de tareas (path: '/board/[boardId]')

<a href="https://github.com/user-attachments/assets/1b406b1a-8e1f-42ed-92a5-b812e271cede" target="_blank">
  <img src="https://github.com/user-attachments/assets/1b406b1a-8e1f-42ed-92a5-b812e271cede" alt="documentation-board1" width="800"/>
</a>
<a href="https://github.com/user-attachments/assets/4aab47ae-ffe4-473e-b4d2-23e3c49a1c6a" target="_blank">
  <img src="https://github.com/user-attachments/assets/4aab47ae-ffe4-473e-b4d2-23e3c49a1c6a" alt="documentation-board2" width="800"/>
</a>
<a href="https://github.com/user-attachments/assets/0bd1e478-e383-4697-b107-ce2386be7164" target="_blank">
  <img src="https://github.com/user-attachments/assets/0bd1e478-e383-4697-b107-ce2386be7164" alt="documentation-board2" width="800"/>
</a>

#### Pagina de actividad de usuarios (path: '/organization/[orgId]/activity')

<a href="https://github.com/user-attachments/assets/694dc84c-5eb5-4798-8ca3-50e69d202958" target="_blank">
  <img src="https://github.com/user-attachments/assets/694dc84c-5eb5-4798-8ca3-50e69d202958" alt="documentation-contact1" width="800"/>
</a>

<a id="getting-started"></a>
<!-- GETTING STARTED -->
## Cómo comenzar a utilizarlo

Si se desea, se puede descargar este proyecto y usarlo de forma local siguiendo los siguientes pasos:

### Pre requisitos

Se requiere tener instalado previamente [Node.js](https://nodejs.org/en/download/package-manager) y un servidor, ya sea local o externo, corriendo una base de datos mySQL.
<br>
Deberán crearse las variables indicadas en un archivo .env donde los valores sean las keys correspondientes, y la url para la conexión al servidor mySQL.
<br>

### Instalación

A continuación se muestran los pasos a seguir para instalar este proyecto.

#### Usando Git

> 1. Navegar al directorio donde deseas instalar el proyecto
   ```sh
   cd /ruta/donde/deseas/instalar
   ```

> 2. Clonar el repositorio
   ```sh
   git clone https://github.com/Br1-O/kanbanate_app
   ```

> 3. Navegar al directorio del proyecto
   ```sh
   cd kanbanate_app
   ```

> 4. Crear el archivo `.env` y añadir las siguientes variables:
   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = PublicKeyClerk
   CLERK_SECRET_KEY = SecretKeyClerk

   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up

   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /

   # DB data
   DATABASE_URL = mysqlDBURL 

   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = PublicKeyUnSplash
   ```

> 5. Instalar las dependencias necesarias
   ```sh
   npm install
   ```

> 6. Ejecutar los comandos de Prisma para configurar la base de datos
   ```sh
   npx prisma db push
   npx prisma db generate
   ```

> 7. Iniciar el servidor de desarrollo
   ```sh
   npm run dev
   ```

> 8. Abrir tu navegador web y visitar `http://localhost:3000`

#### Descarga manual desde GitHub

> 1. Descargar el archivo .zip desde GitHub: [Link de descarga](https://github.com/Br1-O/kanbanate_app/archive/refs/heads/main.zip)

> 2. Descomprimir el archivo .zip
   ```sh
   unzip kanbanate_app-main.zip
   ```

> 3. Navegar al directorio donde fue descomprimido
   ```sh
   cd kanbanate_app-main
   ```

> 4. Crear el archivo `.env` y añadir las siguientes variables:
   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = PublicKeyClerk
   CLERK_SECRET_KEY = SecretKeyClerk

   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up

   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /

   # DB data
   DATABASE_URL = mysqlDBURL 

   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = PublicKeyUnSplash
   ```

> 5. Instalar las dependencias necesarias
   ```sh
   npm install
   ```

> 6. Ejecutar los comandos de Prisma para configurar la base de datos
   ```sh
   npx prisma db push
   npx prisma db generate
   ```

> 7. Iniciar el servidor de desarrollo
   ```sh
   npm run dev
   ```

> 8. Abrir tu navegador web y visitar `http://localhost:3000`


<p align="right">(<a href="#readme-top">Volver al inicio</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

[React.com]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge
[React-url]: https://reactjs.org

[Next.js.com]: https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=for-the-badge
[Next.js-url]: https://nextjs.org

[MySQL.com]: https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge
[MySQL-url]: https://www.mysql.com

[Prisma.com]: https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=for-the-badge
[Prisma-url]: https://www.prisma.io

[TailwindCSS.com]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge
[TailwindCSS-url]: https://tailwindcss.com

[Clerk.com]: https://img.shields.io/badge/Clerk-6B5B93?logo=clerk&logoColor=white&style=for-the-badge
[Clerk-url]: https://clerk.dev

[shadcn.com]: https://img.shields.io/badge/shadcn-000000?logo=shadcn&logoColor=white&style=for-the-badge
[shadcn-url]: https://ui.shadcn.com

[JavaScript.com]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[CSS.com]: https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white&style=for-the-badge
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[HTML.com]: https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=for-the-badge
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML

[GitHub.com]: https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge
[GitHub-url]: https://github.com/

[Git.com]: https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge
[Git-url]: https://git-scm.com/

[GitHubPages.com]: https://img.shields.io/badge/GitHub_Pages-222?logo=github&logoColor=white&style=for-the-badge
[GitHubPages-url]: https://pages.github.com/

[VSCode.com]: https://img.shields.io/badge/VSCode-007ACC?logo=visual-studio-code&logoColor=white&style=for-the-badge
[VSCode-url]: https://code.visualstudio.com/

[LiveServer.com]: https://img.shields.io/badge/LiveServer-4993CD?logo=visual-studio-code&logoColor=white&style=for-the-badge
[LiveServer-url]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
