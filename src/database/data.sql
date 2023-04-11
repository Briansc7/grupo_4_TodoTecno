use todo_tecno;

/* Roles admin y user*/
insert into roles (name) values ("admin");
set @admin_role_id = LAST_INSERT_ID();
insert into roles (name) values ("user");
set @user_role_id = LAST_INSERT_ID();

/* Usuarios iniciales de prueba */
insert into users (firstName, lastName, email, password,image, roleId) values ("Brian", "Samudio Caceres", "admin@todotecno.com", 
"$2a$10$iex9S2k.svcncHIxlznVku3MQpy0roRETMZ9F.QFipvSJi5kSFN7S", "adminAvatar.jpg",@admin_role_id);

insert into users (firstName, lastName, email, password, roleId, birthday, address, zipCode, location, province) values ("fernando", "perez", "usuario@email.com", 
"$2a$10$uaRb9LVNYGna6XKP7hEIJ.QF7NJQKROAsweUnDQ.AHQPcWCkrJh36",@user_role_id ,
"2000-05-14", "calle 1", "1448", "la plata", "buenos aires"
);
set @user2 = LAST_INSERT_ID();

/*Categorías de productos y subcategorias*/
insert into categories (name) values ("Tv y Video");
set @category_tv_video = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("TV", @category_tv_video);
set @tv_video_tv = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values
("Accesorios", @category_tv_video);
set @tv_video_accesorios = LAST_INSERT_ID();

insert into categories (name) values ("Audio");
set @category_audio = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Auriculares", @category_audio);
set @audio_Auriculares = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Parlantes", @category_audio);
set @audio_Parlantes = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Home Theater", @category_audio);
set @audio_HomeTheater = LAST_INSERT_ID();

insert into categories (name) values ("HELADERAS, FREEZERS Y CAVAS");
set @category_heladeras_freezers_cavas = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Heladeras", @category_heladeras_freezers_cavas);
set @Heladeras = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Freezers", @category_heladeras_freezers_cavas);
set @Freezers = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Exhibidoras y Cavas", @category_heladeras_freezers_cavas);
set @ExhibidorasCavas = LAST_INSERT_ID();

insert into categories (name) values ("PEQUEÑOS ELECTRODOMÉSTICOS");
set @category_pequenios_electro = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Cocina", @category_pequenios_electro);
set @pequenios_electro_Cocina = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values  
("Cuidado Personal", @category_pequenios_electro);
set @pequenios_electro_CuidadoPersonal = LAST_INSERT_ID();
insert into subcategories (name, categoryId) values 
("Hogar", @category_pequenios_electro);
set @pequenios_electro_Hogar = LAST_INSERT_ID();

/*Marcas de productos*/
insert into brands set name="Samsung";
set @Samsung = LAST_INSERT_ID();
insert into brands set name="Nakamichi";
set @Nakamichi = LAST_INSERT_ID();
insert into brands set name="Iofi";
set @Iofi = LAST_INSERT_ID();
insert into brands set name="Philco";
set @Philco = LAST_INSERT_ID();
insert into brands set name="Peabody";
set @Peabody = LAST_INSERT_ID();

/*Marcas de cada categoría de productos*/
insert into brandsOfCategories (brandId, categoryId) values
(@Samsung, @category_tv_video),
(@Samsung, @category_audio),
(@Samsung, @category_heladeras_freezers_cavas),
(@Samsung, @category_pequenios_electro),

(@Nakamichi, @category_audio),

(@Iofi, @category_tv_video),

(@Philco, @category_tv_video),
(@Philco, @category_audio),
(@Philco, @category_heladeras_freezers_cavas),
(@Philco, @category_pequenios_electro),

(@Peabody, @category_pequenios_electro);

/* Productos iniciales de prueba, con relacion a imagenes y caractetisticas*/
insert into products (subCategoryId, brandId, model, artNumber, price, discountPorc,
isOnSale, isNew, description) values (
@tv_video_tv,
@Samsung,
"Neo Qled 8k Qn75qn800agczb Qled", 990025707, 1681980, 10, 1, 1, 
"Samsung es reconocida a nivel mundial como una empresa líder en la industria tecnológica. Todos sus productos son diseñados con una calidad superior y pensados para contribuir a un futuro mejor. Por eso, va a hacer que disfrutes de una experiencia visual incomparable. Con el Smart TV QN75QN800A vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos. Descubrí la tecnología QLED Su pantalla con puntos cuánticos ofrece un volumen de color muy superior a cualquier LED del mercado, lo que significa que puede hacer que todos los colores del espectro disponible sean más brillantes sin perder saturación. Además, se distingue por ofrecer un mejor ángulo de visión sin perder calidad desde ninguna posición. Viví en 8K Con una resolución 4 veces más alta que el 4K, muestra una calidad de imagen más nítida y detallada que su antecesor. Esto se debe a que los pixeles son tan pequeñitos que no se pueden distinguir, ni siquiera desde un primer plano. Un sonido que te envuelve Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado. Más allá de ver televisión Su función Screen Share permite duplicar la pantalla de tu smartphone, tablet o PC para que aparezca en la TV. De esta forma vas a poder visualizar todo tipo de contenido: material audiovisual, documentos de trabajo, correos electrónicos y más. Conexión invisible Este modelo está pensado para que puedas despejar tu campo visual. El sector donde coloques el televisor se verá mucho más prolijo porque los cables estarán ocultos, ordenados y organizados, ¡vas a notar la diferencia!"
);
set @SmartTvSamsung = LAST_INSERT_ID();
set @productId = LAST_INSERT_ID();
insert into productimages (fileName, productId) values
("neoQled8k-01.jpg", @productId), ("neoQled8k-02.jpg", @productId), ("neoQled8k-03.jpg", @productId),
("neoQled8k-04.jpg", @productId), ("neoQled8k-05.jpg", @productId), ("neoQled8k-06.jpg", @productId),
("neoQled8k-07.jpg", @productId), ("neoQled8k-08.jpg", @productId);
insert into characteristics (name, productId) values
("Sonido", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Cantidad de parlantes", "8", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Dimensiones", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Ancho", "1668.3 mm", LAST_INSERT_ID()), ("Profundidad", "172.2 mm", LAST_INSERT_ID()), ("Peso", "32.1 kg", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Modelo y origen", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Modelo", "QN75QN800A", LAST_INSERT_ID());

insert into products (subCategoryId, brandId, model, artNumber, price, discountPorc,
isOnSale, isNew, description) values (
@audio_HomeTheater,
@Nakamichi,
"SHOCKWAFE ULTRA 9.2 220v", 5484450, 961949, 10, 0, 1,
"MARCA Nakamichi
MODELO SHOCKWAFE ULTRA 9.2
1 BARRA DE SONIDO DE 45\" Controlador de rango completo de 6 x 2.5 \"
2 X ALTAVOCES LATERALES SURROUND 1 controlador de rango completo de 3\" (cada uno)/1 tweeter de alta frecuencia de 1” (cada uno)
2 X ALTAVOCES SURROUND TRASEROS 1 controlador de rango completo de 3\" (cada uno)/1 tweeter de alta frecuencia de 1” (cada uno)
2 SUBWOOFERS INALÁMBRICOS 1 subwoofer de 10\" hacia abajo (cada uno)
CONTROLADORES DE ALTAVOCES TOTALES 18 conductores
CANALES DE AUDIO hasta 9.2.4
VOLUMEN 110dB SPL
POTENCIA MÁX TOTAL 1000W
RESPUESTA FRECUENTE 30Hz - 20kHz
PROCESADOR DE AUDIO Chipset Cirrus Logic de cuatro núcleos
INTERFAZ DE ENTRADA Y SALIDA Entrada HDMI, salida HDMI (ARC), entrada óptica, entrada coaxial, entrada analógica de 3,5 mm, USB tipo A
BLUETOOTH Versión 4.1 con aptX
ENTRADA DE ALIMENTACIÓN 100 - 240 V, 50/60 Hz (barra de sonido)/ 110 - 240 V, 50/60 Hz (altavoz de graves)
MEZCLA ASCENDENTE ENVOLVENTE Dolby Surround , DTS Neural:X"
);
set @HomeTheaterNakamichi = LAST_INSERT_ID();
set @productId = LAST_INSERT_ID();
insert into productimages (fileName, productId) values
("soundbar-nakamichi.jpg", @productId);
insert into characteristics (name, productId) values
("Conectividad", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Bluetooth", "Sí", LAST_INSERT_ID()), ("USB-A", "Sí", LAST_INSERT_ID()), ("Óptico", "Sí", LAST_INSERT_ID()), ("Jack 3.5 mm", "Sí", LAST_INSERT_ID()),
("Coaxial", "Sí", LAST_INSERT_ID()), ("HDMI", "Sí", LAST_INSERT_ID()), ("HDMI ARC", "Sí", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Parlantes", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("barra de sonido", "1", LAST_INSERT_ID()), 
("altavoces laterales", "2", LAST_INSERT_ID()), 
("altavoces traseros", "2", LAST_INSERT_ID()), 
("subwoofer", "2", LAST_INSERT_ID());

insert into products (subCategoryId, brandId, model, artNumber, price, discountPorc,
isOnSale, isNew, description) values (
@tv_video_accesorios,
@Iofi,
"TVS-MOV-17-905586", 20064031, 16999, 16, 1, 1,
"DESCRIPCIÓN - Norma: vesa - Medida: 200 x 200 mm / 300 x 300 mm / 400 x 400 mm / 600 x 400 mm - Móvil: Si - Carga máxima: 65 Kg - Inclinación 15° - Giro: 60° Hacia ambos lados - Distancia a la pared: 69- 635 mm - Tipo de brazo: 6 brazos - Super resistente nivelando el peso en todos sus brazos - Kit de tornillos para instalación: Si"
);
set @SoporteTVIofi = LAST_INSERT_ID();
set @productId = LAST_INSERT_ID();
insert into productimages (fileName, productId) values
("soporte-tv.png", @productId);
insert into characteristics (name, productId) values
("Datos tecnicos", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("VESA", "75X75/100X100/200X200/400X400/600X400", LAST_INSERT_ID()), 
("Pulgadas", '17 a 90"', LAST_INSERT_ID()), 
("Peso máximo", "65 Kg", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Modelo y origen", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Modelo", "TVS-MOV-17-90", LAST_INSERT_ID());

insert into products (subCategoryId, brandId, model, artNumber, price, discountPorc,
isOnSale, isNew, description) values (
@ExhibidorasCavas,
@Philco,
"220V rgh94PHCAV052N hrf", 8458540, 124999, 3, 1, 1,
"CAVA ELÉCTRICA PHILCO PHCAV052N 52 BOTELLAS - DISPLAY ELECTRÓNICO - CAPACIDAD: 52 BOTELLAS - IDEAL PARA ALMACENAMIENTO PROLONGADO - RANGO DE TEMPERATURA AJUSTABLE: 5 a 18°C - CONTROL DE VIBRACION GRACIAS A LOS ESTANTES DE MADERA - LUZ LED INTERIOR - SISTEMA DE ENFRIAMIENTO POR MOTOR COMPRESOR Y VENTILADOR INTERNO - SÚPER SILENCIOSO - MEDIDAS: 84 x 49,5 x 58 Cms - PESO: 38 KG "
);
set @CavaPhilco = LAST_INSERT_ID();
set @productId = LAST_INSERT_ID();
insert into productimages (fileName, productId) values
("cavaPhilco-01.jpg", @productId), ("cavaPhilco-02.jpg", @productId), ("cavaPhilco-03.jpg", @productId), ("cavaPhilco-04.jpg", @productId);
insert into characteristics (name, productId) values
("Datos tecnicos", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Capacidad", "52 botellas", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Dimensiones", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Ancho", "490 mm", LAST_INSERT_ID()), ("Profundidad", "580 mm", LAST_INSERT_ID()), ("Altura", "840 mm", LAST_INSERT_ID()), ("Peso", "38 kg", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Modelo y origen", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Modelo", "94PHCAV052N 52 Botellas", LAST_INSERT_ID());

insert into products (subCategoryId, brandId, model, artNumber, price, discountPorc,
isOnSale, isNew, description) values (
@pequenios_electro_Cocina,
@Peabody,
"LN805R  220v rojo 254849", 5498445, 15999, 35, 1, 0, 
"Un electrodoméstico infaltable en tu casa. La licuadora Peabody PE-LN805 te va a ayudar a obtener resultados increíbles en todo lo que prepares, ya sea que quieras disfrutar de una bebida bien fría, de salsas y sopas, o de postres deliciosos. ¡Tenela siempre a mano!

Práctica y segura
Su función pulsar te permite poner en marcha el producto de forma intermitente según lo necesites o de acuerdo al contenido de la jarra. Su cierre de seguridad impide accidentes por descuidos y preserva la limpieza de tu cocina al evitar derrames.

Todo lo que más te gusta
Es apta para moler hielo en segundos y preparar smoothies refrescantes en los días de calor. Además, podés hacer tus propios tragos de coctelería en casa sin necesidad de ir a un bar. Ahora el bartender ¡sos vos!"
);
set @LicuadoraPeabody = LAST_INSERT_ID();
set @productId = LAST_INSERT_ID();
insert into productimages (fileName, productId) values
("licuadoraPeabody-01.jpg", @productId), ("licuadoraPeabody-02.jpg", @productId), ("licuadoraPeabody-03.jpg", @productId), ("licuadoraPeabody-04.jpg", @productId);
insert into characteristics (name, productId) values
("Potencia", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Potencia", "800W", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Dimensiones", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Capacidad", "1.75 lt", LAST_INSERT_ID());
insert into characteristics (name, productId) values
("Modelo y origen", @productId);
insert into subcharacteristics (name, value, characteristicId) values
("Modelo", "LN805R", LAST_INSERT_ID());


/* Relaciones entre productos con cantidad de veces que fueron comprados juntos*/
insert into boughttogether (product1, product2, timesBoughtTogether) values
(@SmartTvSamsung, @HomeTheaterNakamichi, 10), (@SmartTvSamsung, @SoporteTVIofi, 50), 
(@HomeTheaterNakamichi, @SmartTvSamsung, 10),
(@SoporteTVIofi, @SmartTvSamsung, 50),
(@CavaPhilco, @LicuadoraPeabody, 1),
(@LicuadoraPeabody, @CavaPhilco, 1);

/*Sucursales*/

insert into stores (name, address, location, phone, description, shoppingHours) values
("Todo Tecno CABA", "Av. Corrientes 1107", "CABA", "011 4381-7777", 
"Sucursal principal de Todo Tecno.
Ven a visitarnos!",
"Lun a Vi 9:00hs a 17:00hs. Sab 9:00hs a 13:30hs.");
set @sucursalCABA = LAST_INSERT_ID();
insert into stores (name, address, location, phone, description, shoppingHours) values
("Todo Tecno Pilar", "Av. V. Castro 907", "Pilar", "011 2342-7777", 
"Sucursal Todo Tecno de Pilar.
Ven a visitarnos!",
"Lun a Vi 9:00hs a 17:00hs. Sab 9:00hs a 13:30hs.");
set @sucursalPilar = LAST_INSERT_ID();
insert into stores (name, address, location, phone, description, shoppingHours) values
("Todo Tecno Palermo", "Av. Santa Fé 4500", "Palermo", "011 4772-9999", 
"Sucursal Todo Tecno de Palermo.
Ven a visitarnos!",
"Lun a Vi 9:00hs a 17:00hs. Sab 9:00hs a 13:30hs.");
set @sucursalPalermo = LAST_INSERT_ID();
insert into stores (name, address, location, phone, description, shoppingHours) values
("Todo Tecno Unicenter", "Paraná 3745", "Martínez", "011 4733-1111", 
"Sucursal Todo Tecno en Unicenter.
Ven a visitarnos!",
"Lun a Vi 9:00hs a 17:00hs. Sab 9:00hs a 13:30hs.");
set @sucursalUnicenter = LAST_INSERT_ID();

/* Estado de los productos en stock */
insert into statusstock set name = "Disponible en tienda";
set @stockAvailable = LAST_INSERT_ID();
insert into statusstock set name = "En espera para ser retirado";
set @stockToPickUp = LAST_INSERT_ID();
insert into statusstock set name = "En espera para envío";
set @stockToBeDelivered = LAST_INSERT_ID();
insert into statusstock set name = "En reparto";
set @stockInDelivery = LAST_INSERT_ID();
insert into statusstock set name = "Entregado";
set @stockDelivered = LAST_INSERT_ID();
insert into statusstock set name = "Retirado";
set @stockPickedUp = LAST_INSERT_ID();

/* Stock disponible de los productos en cada tienda*/
insert into stock (productId, storeId, quantity, statusId) values
(@SmartTvSamsung, @sucursalCABA, 5, @stockAvailable),
(@SmartTvSamsung, @sucursalPilar, 1, @stockAvailable),
(@SmartTvSamsung, @sucursalUnicenter, 3, @stockAvailable),
(@HomeTheaterNakamichi, @sucursalCABA, 10, @stockAvailable),
(@HomeTheaterNakamichi, @sucursalPilar, 10, @stockAvailable),
(@HomeTheaterNakamichi, @sucursalPalermo, 15, @stockAvailable),
(@HomeTheaterNakamichi, @sucursalUnicenter, 5, @stockAvailable),
(@SoporteTVIofi, @sucursalCABA, 20, @stockAvailable),
(@SoporteTVIofi, @sucursalPilar, 15, @stockAvailable),
(@SoporteTVIofi, @sucursalPalermo, 5, @stockAvailable),
(@SoporteTVIofi, @sucursalUnicenter, 10, @stockAvailable),
(@CavaPhilco, @sucursalCABA, 3, @stockAvailable),
(@CavaPhilco, @sucursalPilar, 5, @stockAvailable),
(@CavaPhilco, @sucursalUnicenter, 1, @stockAvailable),
(@LicuadoraPeabody, @sucursalCABA, 10, @stockAvailable);

/*Métodos de Pago y opciones de cuotas con interés*/
insert into interestoptions (installmentsQuantity, interestPorcentage) values
(3, 0);
set @tresCuotasSinInteres = LAST_INSERT_ID();
insert into interestoptions (installmentsQuantity, interestPorcentage) values
(3, 5);
set @tresCuotas5porcInt = LAST_INSERT_ID();
insert into interestoptions (installmentsQuantity, interestPorcentage) values
(6, 10);
set @seisCuotas10porcInt = LAST_INSERT_ID();
insert into interestoptions (installmentsQuantity, interestPorcentage) values
(6, 0);
set @seisCuotasSinInteres = LAST_INSERT_ID();
insert into interestoptions (installmentsQuantity, interestPorcentage) values
(12, 12);
set @doceCuotas12porcInt = LAST_INSERT_ID();
insert into interestoptions (installmentsQuantity, interestPorcentage) values
(12, 0);
set @doceCuotasSinInteres = LAST_INSERT_ID();

insert into paymentmethods (name, interestOption) values 
("Tarjeta de Crédito Santander - 3 Cuotas sin interés", @tresCuotasSinInteres),
("Tarjeta de Crédito Santander - 6 Cuotas sin interés", @seisCuotasSinInteres),
("Tarjeta de Crédito Santander - 12 Cuotas", @doceCuotas12porcInt);
insert into paymentmethods set name = "Tarjeta de Débito Santander";
set @pagoDebitoSantander = LAST_INSERT_ID();

insert into paymentmethods (name, interestOption) values 
("Tarjeta de Crédito BBVA - 3 Cuotas", @tresCuotas5porcInt),
("Tarjeta de Crédito BBVA - 6 Cuotas", @seisCuotas10porcInt),
("Tarjeta de Crédito BBVA - 12 Cuotas", @doceCuotas12porcInt);
insert into paymentmethods set name = "Tarjeta de Débito BBVA";

/*Cupones de descuento*/
insert into discountcupons (name, cuponCode, startDate, endDate, discountPorcentage, minPurchaseRequired, maxDiscountValue, maxUsesPerUser, maxUsesTotal) values
("BlackFriday 2023","BlackF23", "2023-03-24", "2023-03-26", 10, 3000, 1000, 1, 2000);
set @cuponBlackFriday = LAST_INSERT_ID();

insert into discountcupons (name, cuponCode, startDate, endDate, discountPorcentage, minPurchaseRequired, maxDiscountValue, maxUsesPerUser, maxUsesTotal) values
("Aniversario 2023","ANIVERSARIO", "2023-07-07", "2023-07-07", 25, 3500, 2500, 1, 3000);
set @cuponAniversario = LAST_INSERT_ID();

insert into discountcupons (name, cuponCode, discountPorcentage, minPurchaseRequired, maxDiscountValue, maxUsesPerUser) values
("Primera compra","Bienvenido", 10, 1000, 4000, 1);
set @cuponPrimeraCompra = LAST_INSERT_ID();

/*Estados de ventas*/
insert into statussales set name = "En espera para ser retirado";
set @saleToPickUp = LAST_INSERT_ID();
insert into statussales set name = "En espera para envío";
set @saleToBeDelivered = LAST_INSERT_ID();
insert into statussales set name = "En reparto";
set @saleInDelivery = LAST_INSERT_ID();
insert into statussales set name = "Entregado";
set @saleDelivered = LAST_INSERT_ID();
insert into statussales set name = "Retirado";
set @salePickedUp = LAST_INSERT_ID();

/*Ventas, detalles de ventas y uso de cupón*/
/*Se crea un registro base de la venta total*/
insert into sales (userId, discountCuponId, date, storeId, paymentMethodId, isPickup, statusId) values 
(@user2, @cuponPrimeraCompra, "2023-03-24", @sucursalCABA, @pagoDebitoSantander, 1, @salePickedUp);
set @sale = LAST_INSERT_ID();
/*Se carga en detalle de ventas cada uno de los productos que corresponden a la venta*/
insert into detailsales (saleId, productId, quantity, unitPrice, discountPorc) values
(@sale, @SmartTvSamsung, 1, 
(select price from products where id = @SmartTvSamsung),
(select if(
(select isOnSale from products where id = @SmartTvSamsung) = 1, /*Si está en oferta obtengo el descuento, sino el descuento es 0*/
(select discountPorc from products where id = @SmartTvSamsung),
0))
);
insert into detailsales (saleId, productId, quantity, unitPrice, discountPorc) values
(@sale, @HomeTheaterNakamichi, 1, 
(select price from products where id = @HomeTheaterNakamichi),
(select if(
(select isOnSale from products where id = @HomeTheaterNakamichi) = 1, /*Si está en oferta obtengo el descuento, sino el descuento es 0*/
(select discountPorc from products where id = @HomeTheaterNakamichi),
0))
);
insert into detailsales (saleId, productId, quantity, unitPrice, discountPorc) values
(@sale, @SoporteTVIofi, 1, 
(select price from products where id = @SoporteTVIofi),
(select if(
(select isOnSale from products where id = @SoporteTVIofi) = 1, /*Si está en oferta obtengo el descuento, sino el descuento es 0*/
(select discountPorc from products where id = @SoporteTVIofi),
0))
);
/*Se actualiza la venta con el valor total de los productos*/
update sales set chargeProducts = 
(select sum(chargeTotal) from detailsales where saleId = @sale)
where id = @sale;
/*Se Carga el valor total descontado por el cupon teniendo en cuenta el valor maximo de descuento*/
update sales set discountCuponAmount = least(
(select chargeProducts from sales where id = @sale) * (select discountPorcentage from discountcupons where id = @cuponPrimeraCompra)/100,
(select maxDiscountValue from discountcupons where id = @cuponPrimeraCompra)
)
where id = @sale;
/*Se carga el uso del cupon por el usuario*/
insert into cuponsusedbyusers (userId, cuponId, usesCount) values
(@user2, @cuponPrimeraCompra, 1);



