import React, {useEffect, useState} from "react";
import Card from "./subcomponents/Card/Card";
import LastMovieInDB from "./subcomponents/LastMovieInDB/LastMovieInDB";
import GenresInDB from "./subcomponents/GenresInDB/GenresInDB";

function ContentRowTop(){

    const [arrayCards, setArrayCards] = useState([]);

    const URL_BASE = "http://localhost:3000/";

    const page = 1;

	const URL_API_PRODUCTS = URL_BASE + "api/products?page=" + page;

    const URL_API_USERS = URL_BASE + "api/users?page=" + page;

    const [categoriesInfo, setCategoriesInfo] = useState({});

    useEffect(() => {
        async function loadArrayCardsData(){
            let response, productsData, usersData, categoryCount;

            response = await fetch(URL_API_PRODUCTS);
			productsData = await response.json();

            categoryCount = Object.keys(productsData.countByCategory).length;

            setCategoriesInfo(productsData.countByCategory);

            response = await fetch(URL_API_USERS);
			usersData = await response.json();

            let arrayCardsData = [
                {
                    titulo: "Total de Productos",
                    cifra: productsData.count,
                    color: "primary",
                    icono:"fa-cart-shopping"
                },
                {
                    titulo: "Total de Usuarios",
                    cifra: usersData.count,
                    color: "success",
                    icono:"fa-user"
                },
                {
                    titulo: "Total de Categorías",
                    cifra: categoryCount,
                    color: "warning",
                    icono:"fa-list"
                }
            ];

            setArrayCards(arrayCardsData);
        };
        
        loadArrayCardsData();
    },[]);

    return(
        <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>
    
        {/* <!-- Content Row Movies--> */}
        <div className="row">

            {
                arrayCards.map((card, i) => <Card key={ card.titulo + i } titulo={card.titulo} color={card.color} cifra={card.cifra} icono={card.icono} />)
            }
                        
        </div>
        {/* <!-- End movies in Data Base --> */}
        

        {/* <!-- Content Row Last Movie in Data Base --> */}
        <div className="row">
            {/* <!-- Last Movie in DB --> */}
            <LastMovieInDB />
            {/* <!-- End content row last movie in Data Base --> */}

            {/* <!-- Genres in DB --> */}
            <GenresInDB categories={categoriesInfo}/>
        </div>
    </div>
    )
}

export default ContentRowTop;