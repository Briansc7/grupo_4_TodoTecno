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

La aplicación utiliza una base de datos basada en json, es necesario incializarla ejecutando:
> npm run cdata

Para levantar el servidor ejecutar el comando:
> npm start

<h2>Rutas</h2>

Se puede comprobar el funcionamiento de la página visitando los siguientes links:

Página principal:
> http://localhost:3000/

Login:
> http://localhost:3000/users/login

Registro: 
> http://localhost:3000/users/register

Búsqueda de productos (funciona con la barra de búsqueda):
> http://localhost:3000/search?keywords=samsung

Lista de producto:
> http://localhost:3000/products/

Detalle de producto:
> http://localhost:3000/products/productDetail/1

Carrito de compras:
> http://localhost:3000/products/productCart

Creación de productos:
> http://localhost:3000/admin/productCreate

Edición de productos:
> http://localhost:3000/admin/productEdit/1


<h2>Usuarios</h2>

Para las pruebas se proveen dos usuarios predefinidos.
Los datos de inicio de sesión son:

Email: admin@todotecno.com
Contraseña: administrador
Rol: admin.

Email: usuario@email.com
Contraseña: usuario1
Rol: user.
