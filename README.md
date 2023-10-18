# SmartStock: Su Solución de Inventariado Inteligente y Eficiente

## Tecnologías Empleadas

El presente proyecto se ha confeccionado empleando una selecta gama de tecnologías contemporáneas que han permitido su realización integral. A continuación, se detallan las tecnologías clave utilizadas en la ejecución de este proyecto:

- JavaScript (Lenguaje de Programación): Se ha empleado el lenguaje de programación JavaScript, conocido por su versatilidad y amplia adopción en el ámbito del desarrollo web y de aplicaciones. La elección de JavaScript se fundamenta en su facilidad de uso, así como en su capacidad de manejar eficientemente operaciones asíncronas. Cabe destacar que, como lenguaje primordial en el entorno web, proporciona la posibilidad de una eventual transición de la aplicación hacia un entorno en línea.

- CSS (Hoja de Estilos): El lenguaje de diseño CSS ha sido implementado para conferir estilo y presentación a la aplicación. La utilización de CSS ha permitido una presentación visual atractiva y coherente en todo el desarrollo.

- HTML (Lenguaje de Marcado): El lenguaje de marcado HTML ha sido utilizado para estructurar y organizar los componentes y elementos de la aplicación. Esta elección garantiza una estructura sólida y semánticamente coherente.

- Electron.JS (Framework para Aplicaciones de Escritorio): El marco de desarrollo Electron.JS ha sido seleccionado como el entorno para construir esta aplicación de escritorio multiplataforma. Este framework se basa en tecnologías web estándar, como HTML, CSS y JavaScript, lo que permite la creación de aplicaciones de escritorio atractivas y funcionales utilizando herramientas familiares. Electron.JS proporciona la capacidad de compilar la aplicación para distintos sistemas operativos y facilita la creación de instaladores.

- XAMPP (Herramienta de Gestión de Base de Datos): Para el manejo eficiente de la base de datos, se ha empleado XAMPP, una herramienta ampliamente reconocida que proporciona un entorno de servidor web local con Apache, MySQL y PHP. La elección de XAMPP garantiza una administración segura y confiable de los datos del inventario.

## Justificación de la Elección de Tecnologías

La selección de las tecnologías antes mencionadas responde a una evaluación cuidadosa de las necesidades y objetivos del proyecto. A continuación, se describen las razones fundamentales que sustentan la elección de cada tecnología:

JavaScript: La elección de JavaScript se ha basado en su amplia adopción y su robusta capacidad para gestionar operaciones asíncronas, lo que es esencial para una aplicación de esta naturaleza. Además, como lenguaje central en el ámbito web, ofrece la posibilidad de migrar la aplicación a un entorno en línea con relativa facilidad. La abundancia de librerías y frameworks disponibles en el ecosistema de JavaScript ha agilizado el desarrollo y permitirá futuras expansiones de la aplicación.

CSS y HTML: La implementación de CSS y HTML se ha justificado por la necesidad de dotar a la aplicación de una presentación visual atractiva y una estructura semánticamente organizada. Estos lenguajes estándar aseguran la coherencia en el diseño y la disposición de los elementos de la interfaz de usuario.

Electron.JS: La elección de Electron.JS como framework para aplicaciones de escritorio se basa en su capacidad para utilizar tecnologías web en un entorno de escritorio. Esta elección permite una experiencia de usuario fluida y familiar, además de facilitar la distribución de la aplicación en diversas plataformas. La integración con Node.JS brinda acceso a funcionalidades del sistema operativo, enriqueciendo las capacidades de la aplicación.

- XAMPP: La elección de XAMPP para la gestión de la base de datos se ha realizado debido a su posición destacada en el ámbito de la administración de bases de datos locales. La inclusión de Apache y MySQL en su conjunto proporciona un entorno robusto y seguro para la gestión de datos, garantizando la confiabilidad y la eficiencia en el almacenamiento y recuperación de información relevante para el inventariado.

## Implementación

Para proceder con la implementación, se instauró el entorno necesario. Primeramente, se instaló Node.JS (https://nodejs.dev/en) versión v18.16.1, el motor V8 de JavaScript independiente del navegador y con funcionalidades adicionales para la interacción con el sistema operativo. Posteriormente, se dio inicio a la creación del proyecto de Electron mediante el uso de Electron Forge (https://www.electronforge.io), que simplifica la generación de aplicaciones y su posterior compilación para distintos sistemas operativos.

Para la creación del proyecto, se siguió el procedimiento siguiente:

- Se empleó el comando npm (Node Package Manager) con la finalidad de generar la aplicación inicial.

```console
$ npm init electron-app@latest SmartStock -- --template=webpack
```

- Una vez creada la estructura base, se procedió a la apertura del proyecto en un entorno de desarrollo, como Visual Studio Code, para iniciar la fase de construcción y programación.

- En la búsqueda de una interfaz de usuario dinámica y de fácil desarrollo, se decidió implementar React (https://react.dev), una biblioteca que simplifica la construcción de interfaces interactivas. Para ello, se realizaron las instalaciones pertinentes de las dependencias necesarias, asegurando un proceso fluido de desarrollo.

## Estructura y Funcionamiento

Después de la instalación de React y una serie de utilidades esenciales, como dotenv, mysql2, momentjs, nodemailer, react-router-dom, react-router, sonner, uuid, react-icons y tailwindcss, la atención se centró en la creación de la interfaz de usuario. Utilizando JSX, que será posteriormente compilado por webpack, y haciendo uso de tailwindcss, se diseñó la interfaz, incorporando tablas, iconos, botones y otros elementos necesarios para una experiencia de usuario completa y atractiva.

La aplicación se compone de tres archivos principales:

    main.js: Este archivo representa el punto de partida de la aplicación. Su función primordial es crear la ventana de la aplicación, cargar los archivos preload.js y renderer.js, y gestionar las operaciones críticas de la aplicación. Estas operaciones abarcan:
        Establecimiento de la conexión con la base de datos.
        Carga de los archivos preload y renderer.
        Administración de la autenticación de usuarios.
        Manejo de eventos provenientes del archivo preload mediante el protocolo IPC.

    preload.js: Este archivo cumple la función de actuar como intermediario entre el proceso principal y el proceso de la interfaz de usuario (renderer). Empleando el protocolo de comunicación entre procesos IPC, el archivo preload facilita la interacción entre ambos procesos, permitiendo la transferencia de datos y eventos.

    renderer.js: El archivo renderer es el encargado de contener toda la interfaz de usuario de la aplicación. Sin embargo, está diseñado para no tener acceso directo a la base de datos ni a las operaciones del sistema operativo. Esta separación confiere ventajas significativas en términos de seguridad y modularidad.

Ventajas de Seguridad y Funcionamiento

La separación de funciones entre los archivos preload y renderer se traduce en múltiples ventajas de seguridad:

    Acceso Controlado: El archivo preload actúa como un intermediario que permite al proceso de la interfaz de usuario interactuar con funciones críticas del proceso principal, como la conexión con la base de datos y la autenticación. Esta arquitectura reduce el riesgo de manipulaciones no autorizadas de la base de datos y el sistema operativo.

    Comunicación Local: La comunicación entre el proceso principal y el proceso de la interfaz de usuario se basa en eventos IPC locales en lugar de operaciones de red. Esta aproximación minimiza las posibles vulnerabilidades relacionadas con la exposición de la aplicación a la red y reduce los vectores de ataque potenciales.

    Gestión de Eventos: La comunicación basada en eventos IPC proporciona un enfoque más seguro para el intercambio de información y acciones entre los procesos. Los eventos controlados y gestionados ofrecen un control más preciso sobre el flujo de datos y las operaciones realizadas.

En resumen, el funcionamiento de la aplicación se inicia con la ejecución del archivo main.js. Desde allí, se establece la conexión con la base de datos, se cargan los archivos preload y renderer, y se gestionan operaciones críticas. La comunicación entre el proceso principal y el proceso de la interfaz de usuario se lleva a cabo mediante el protocolo IPC, lo que contribuye a la seguridad y eficiencia de la aplicación. La arquitectura y el enfoque de seguridad implementados en la aplicación SmartStock aseguran un funcionamiento confiable y robusto en el manejo de datos e interacciones del usuario.


```console
C:.
│   .gitignore
│   forge.config.js
│   inventario.sql
│   package-lock.json
│   package.json
│   postcss.config.js
│   README.MD
│   tailwind.config.js
│   webpack.main.config.js
│   webpack.renderer.config.js
│   webpack.rules.js
│   yarn.lock
│
├───icons
│       netready.ico
│       netready.png
│
└───src
    │   app.jsx
    │   index.css
    │   index.html
    │   ipcMain.js
    │   main.js
    │   preload.js
    │   renderer.js
    │
    ├───components
    │       Control.js 
    │       Customers.js
    │       data.js
    │       Header.js
    │       Home.js
    │       Loader.js
    │       Orders.js
    │       Sidebar.js
    │       Stock.js
    │       Tables.js
    │
    ├───database
    │       Database.js
    │
    └───views
            Home.jsx
            Inventory.jsx
            Login.jsx
            NewPassword.jsx
            PasswordReset.jsx
            Register.jsx
```

## Descripción de Archivos y Carpetas

    .gitignore: Archivo que especifica los archivos y carpetas que se deben ignorar al subir el proyecto a un repositorio git.

    forge.config.js: Archivo de configuración utilizado para definir opciones de compilación y otras configuraciones específicas de Electron Forge.

    inventario.sql: Archivo que contiene las instrucciones SQL necesarias para generar la estructura y las tablas de la base de datos.

    package-lock.json: Archivo generado por npm para asegurar la coherencia y la seguridad de las versiones de los paquetes instalados.

    package.json: Archivo que define la información del proyecto, las dependencias y los scripts de inicio, construcción y otros comandos.

    postcss.config.js: Archivo de configuración necesario para utilizar el framework CSS tailwindcss.

    README.MD: Archivo de documentación que proporciona información sobre el proyecto y su funcionamiento.

    tailwind.config.js: Archivo de configuración de tailwindcss que permite personalizar y ajustar las características del framework.

    webpack.main.config.js: Archivo de configuración de webpack específico para el proceso principal de Electron.

    webpack.renderer.config.js: Archivo de configuración de webpack específico para el proceso de la interfaz de usuario (renderer).

    webpack.rules.js: Archivo que define las reglas de webpack utilizadas en el proyecto.

    yarn.lock: Archivo similar a package-lock.json, específico para el administrador de paquetes Yarn.

    icons: Carpeta que contiene iconos utilizados en la aplicación.

    src: Carpeta principal que contiene el código fuente de la aplicación.

## Estructura de Código

La carpeta src contiene los archivos y carpetas principales para el desarrollo de la aplicación:

    app.jsx: Componente principal cargado por el renderer. Actúa como el punto de entrada de la interfaz de usuario y carga las vistas correspondientes.

    index.css: Estilos globales de la aplicación que se aplican en toda la interfaz.

    index.html: Punto de entrada del renderer. Carga el componente app en el elemento con el id root.

    ipcMain.js: Archivo cargado por el main para gestionar eventos de preload. Establece la comunicación entre el proceso principal y el proceso de la interfaz de usuario.

    main.js: Punto de arranque de la aplicación. Crea la ventana de la aplicación, carga preload.js y renderer.js, y gestiona operaciones críticas.

    preload.js: Archivo preload que permite la comunicación entre el proceso principal y el proceso de la interfaz de usuario mediante IPC.

    renderer.js: Archivo que contiene la interfaz de usuario. Carga y renderiza las vistas y componentes.

    components: Carpeta que contiene componentes JSX que son cargados por las vistas y, por ende, por app.jsx.

    database: Carpeta que contiene el archivo Database.js, cargado por el main para gestionar la base de datos.

    views: Carpeta que contiene las vistas JSX que cargan componentes desde la carpeta components. Estas vistas son cargadas por app.jsx.

Esta estructura modular y organizada permite un desarrollo eficiente y mantenible, así como una separación clara de las responsabilidades entre los distintos componentes y procesos de la aplicación SmartStock.
