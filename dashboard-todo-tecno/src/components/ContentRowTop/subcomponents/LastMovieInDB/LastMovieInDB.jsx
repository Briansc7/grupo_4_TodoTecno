import React, {useEffect, useState} from "react";
import SuperCard from "../../../SuperCard/SuperCard";

function LastMovieInDB() {
    const [lastProduct, setLastProduct] = useState({});

    const URL_BASE = "http://localhost:3000/";

	const URL_API_LAST_PRODUCT = URL_BASE + "api/products/lastProductDetail";

    const [photo, setPhoto] = useState("");

    const [detailLink, setDetailLink] = useState("");

    useEffect(() => {
        async function loadLastProduct(){
            let response, productData;

            response = await fetch(URL_API_LAST_PRODUCT);
			productData = await response.json();

            console.log(productData);
            
            setPhoto(productData.images[0]?.imageUrl??`${URL_BASE}images/products/defaultProduct.png`);

            setDetailLink(`${URL_BASE}products/productDetail/${productData.id}`);

            setLastProduct(productData);
        };
        
        loadLastProduct();
    },[]);

    return (
        <SuperCard title="Último Producto Agregado">
            <p><h1>{lastProduct.brandName} {lastProduct.model}</h1></p>
            <div className="text-center">
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "40rem" }} src={photo} alt=" Star Wars - Mandalorian " />
            </div>
            <p>{lastProduct.description}</p>
            <a className="btn btn-danger" target="_blank" rel="nofollow" href={detailLink}>Ver Detalle de Producto</a>      
        </SuperCard>


    )
}

export default LastMovieInDB;