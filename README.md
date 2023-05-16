# grupo_4_TodoTecno

<h1>Descripción del sitio web</h1>

Ecommerce orientada a la venta de electrodomésticos y demás productos electrónicos como televisores, celulares y tablets.

El público al cual está dirigido es principalmente a personas de clase media que puedan permitirse comprar dichos productos. También hay algunos productos premium, como por ejemplo smart tv de 98”, que por su elevado precio sólo son accesibles por personas de mayores recursos econónicos.

<h2>Integrantes del equipo</h2>

Cattaneo, Santino

Leguiza, Martin Leandro

Samudio Cáceres, Brian:
Ingeniero en Sistemas e Ingeniero en Electrónica, egresado de UTN FRBA.

<h2>Sitios de referencia</h2>

Se tomó como referencia las siguientes páginas web:

Frávega: Se la eligió por ser una empresa líder en el mercado de electrodomésticos y artículos tecnológicos en Argentina con más 100 años de trayectoria y más de 100 sucursales en todo el país.
Es un referente importante gracias a la gran variedad de marcas y productos que posee.
Apunta al mismo público de nuestra página. 
El Header se inspiró en parte de esta página.
Parte del Footer se inspiró de esta página.

Garbarino: empresa con gran presencia en Argentina. También ofrece variedad de electrodomésticos y artículos tecnológicos. Apunta al mismo público de nuestra página. El Header se inspiró en parte de esta página.

Rodo: empresa argentina que hace más de 70 años está presente en el mercado, ofreciendo gran variedad de electrodomésticos, notebooks y celulares. El diseño del login y registro se inspiró en esta página. Tambien se inspiró en parte del Footer. Apunta al mismo público de nuestra página. 

Grupo Marquez: empresa Argentina con más de 150 tiendas en 10 provincias del país. También ofrece variedad de electrodomésticos y artículos tecnológicos. Apunta al mismo público de nuestra página. 

Mercado Libre: Importante referente de precios para varios productos, abarcando los productos y clientes a los que se apunta. Si bien nuestra página no busca que los mismos usuarios puedan publicar sus porductos además de venderlos, la gran variedad de productos ofrecidos se organiza de forma similar a las páginas anteriormente mencionadas por lo que su diseño sirve de inspiración para nuestro sitio web. El Header se inspiró en parte de esta página.

<h2>Tablero de Trabajo</h2>

Se decidió utilizar Trello para organizar fácilmente las tareas a realizar por los miembros del equipo.
Se puede acceder al tablero utilizado en el siguiente link: https://trello.com/b/v3UYoJE2/digitalhousegrupo4

<h2>Instrucciones</h2>

Luego de clonar el repositorio, instalar las dependencias correspondientes ejecutando: 
> npm install 

Cargar las imágenes de los productos precargados y crear archivo .env con el siguiente comando:
> npm run cdata

Editar el archivo .env ubicado en la raíz del proyecto con el usuario y contraseña correspondiente a la base de datos mysql.
Por defecto considera que el usuario es root y no posee contraseña.

Levantar el servidor de Mysql.

Importar la estructura de la base de datos a partir del archivo estruture.sql ubicado en /src/database.

Realizar la carga inicial de la base de datos ejecutando el script data.sql ubicado en /src/database.

En la carpeta /src/database se puede ver el DER de la base de datos consultando el archivo DER.pdf. Además se incluyó una explicación del DER en el archivo DER.md.

En caso de que hayan futuros cambios en el repositorio en cuanto a la estructura y/o datos precargado en la base de datos, es necesario volver a ejecutar los pasos anteriores desde la ejecución del comando npm run cdata.

Para levantar el servidor de backend ejecutar el comando:
> npm start

Para levantar el dashboard, es necesario ubicarse en la carpeta dashboard-todo-tecno y dentro de la misma ejecutar el comando:
>npm start

El dashboard requiere que previamente se levanten tanto el servidor de Mysql con la base de datos, como levantar el servidor de backend.

<h2>Rutas</h2>

Se puede comprobar el funcionamiento de la página visitando los siguientes links:

<h3>Rutas accesibles por cualquiera:</h3>

Página principal:
> http://localhost:3000/

Búsqueda de productos (funciona con la barra de búsqueda):
> http://localhost:3000/search?keywords=samsung

Lista de producto:
> http://localhost:3000/products/

Detalle de producto:
> http://localhost:3000/products/productDetail/1

Carrito de compras:

Se permite agregar productos al carrito antes de hacer login para mejorar la experiencia del usuario.

> http://localhost:3000/products/productCart

<h3>Rutas accesibles solamente por visitantes:</h3>

Hacen redirect a /users/profile si el usuario ya está logueado.

Login:
> http://localhost:3000/users/login

Registro: 
> http://localhost:3000/users/register

<h3>Rutas accesibles solamente por usuarios logueados:</h3>

Hacen redirect a /users/login si el usuario no está logueado.

Perfil: 
> http://localhost:3000/users/profile

Edición de Perfil: 
> http://localhost:3000/users/edit-profile

<h3>Rutas accesibles solamente por usuarios logueados y con rol administrador:</h3>

Devuelven error 404 si el usuario no está logueado y si no tiene rol administrador.

Creación de productos:
> http://localhost:3000/admin/productCreate

Edición de productos:
> http://localhost:3000/admin/productEdit/1

Detalle de producto (es igual a la vista que pueden acceder los visitantes pero se incluye un botón para editar el producto:
> http://localhost:3000/products/productDetail/1

Listado de Usuarios existentes:
> http://localhost:3000/admin/users

Creación de Usuarios:
> http://localhost:3000/admin/users/add

Edición de Usuario:
> http://localhost:3000/admin/users/edit/1

Detalles del Usuario:
> http://localhost:3000/admin/users/detail/1


<h2>Usuarios</h2>

Para las pruebas se proveen dos usuarios predefinidos.
Las credenciales de inicio de sesión son:

Email: admin@todotecno.com
Contraseña: administrador
Rol: admin.

Email: usuario@email.com
Contraseña: usuario1
Rol: user.
