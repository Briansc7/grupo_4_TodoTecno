import React from "react";
import Card from "./subcomponents/Card/Card";
import LastMovieInDB from "./subcomponents/LastMovieInDB/LastMovieInDB";
import GenresInDB from "./subcomponents/GenresInDB/GenresInDB";

function ContentRowTop(){

    let arrayCards = [
        {
            
            cifra: 21,
            color: "primary",
            icono:"fa-film"
        },
        {
            titulo: "Total awards",
            cifra: 79,
            color: "success",
            icono:"fa-award"
        },
        {
            titulo: "Actors quantity",
            cifra: 49,
            color: "warning",
            icono:"fa-user"
        }
    ]

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
            <GenresInDB />
        </div>
    </div>
    )
}

export default ContentRowTop;