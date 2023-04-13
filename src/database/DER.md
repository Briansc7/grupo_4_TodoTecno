<h1>Explicación de Tablas y relaciones del DER:</h3>
<h2>Users:</h2>
Tabla destinada a almacenar los datos de los usuarios del sistema. Los usuarios pueden tener el rol admin o user según si son administradores o usuarios normales del sistema. En caso de ser administradores pueden tener acceso a funcionalidades privilegiadas del sitio web como por ejemplo editar los datos de un producto.

<h2>Roles:</h2>
Tabla destinada a almacenar los roles que pueden tener los usuarios.

<h2>Products:</h2>
Almacena los datos de los productos. Ya que un producto puede tener más de una imagen, la referencia a las mismas se almacenar en una tabla a parte llamada <b>ProductImages</b>.
A su vez un producto tiene asociada una marca, la cual se almacena en la tabla <b>Brands</b>. Entre la información relevante de un producto, se encuentran las características y subcaracterísticas del mismo, las cuales se guardas en las tablas <b>Characteristics</b> y <b>SubCharacteristics</b>. Por ejemplo una características de un televisor podría ser Dimensiones y las subcaracterísticas de dicha características podrían ser ancho, profundidad y peso.
Para tener una mejor organización de los productos, los mismos tienen asociado una subcategoría, la cual pertenece a una categoría de mayor jerarquía. Por ejemplo, la subcategoría "Tv" que pertenece a una categoría más general llamada "Tv y Video". Estos se almacenan en las tablas <b>Subcategories</b> y <b>Categories</b>.

<h2>Categories:</h2>
Almacena los tipos (categorías) de productos existentes. Además de existir subcategorías que dependen jerárquicamente de una categoría, las marcas también se asocian a una categoría. Lo cual nos permite a la hora de querer elegir una marca en un formulario, la misma tenga sentido para el tipo de producto a crear o editar. Como una categoría puede tener muchas marcas, pero a su vez una marca puede estar presente en distintos tipos de productos, dicha relación muchos a muchos se resuelve con la tabla intermedia <b>brandsOfCategories</b>

<h2>Stock:</h2>
Se almacena la cantidad de stock disponible de cada producto. A su vez se almacena el estado de dicho producto en una tabla externa llamanda <b>statusStock</b>.
El producto físico puede no estar solamente disponible para su compra, sino que tambié puede estar reservado debido a que fue comprado y sólo debe ser retirado por el usuario de forma presencial, también puede estar en espera de ser entregado, estar en reparto, o ya haber sido entregado o retirado. Entonces el stock de un mismo producto puede ser almacenado varias veces, cada una por cada tipo de estado. A su vez un producto puede tener solamente stock en algunas sucursales.

<h2>Stores:</h2>
Almacena los datos de las sucursales como por ejemplo su dirección y el horario de atención del mismo.

<h2>Sales:</h2>
Almacena los datos globales de una venta como por ejemplo en qué sucursal se realizó la venta y el monto total de la misma. Como una venta puede tener varios productos, y un producto puede estar presente en muchas ventas, se utiliza la tabla intermedia <h2>DetailSales</h2> y gracias a la misma se puede terminar conociendo los productos que componen una misma venta.
A su vez, una venta puede tener un estado asociado como por ejemplo "En espera para ser retirado". Dicho dato se almacena en la tabla <b>statusSales</b>.

<h2>PaymentMethods</h2>
Almacena los tipos de pagos a elegir. Una venta tiene un tipo de pago asociado. A su vez, según el financiamiento, un tipo de pago puede tener un porcentaje de interés y una determinada cantidad de cuotas. Dichos datos se almacenan en la tabla <b>Interesoptions</b>

<h2>DiscountCupons</h2>
Almacena los cupones de descuento que se pueden utilizar a comprar productos.Dichos cupones pueden estar asociados o no a una venta dependiendo de si se utilizó el cupon al comprar los productos. A su vez es necesario almacenar quienes utilizaron los cupones y para poder aplicar límites en cuanto a la reutilización de dichos cupones. Dicho datos se almacena en la tabla intermedia <b>cuponsUsedByUsers</b>

