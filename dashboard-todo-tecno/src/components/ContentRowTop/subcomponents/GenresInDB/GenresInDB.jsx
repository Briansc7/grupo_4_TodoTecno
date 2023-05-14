import React from "react";
import GenreCard from "../../../GenreCard/GenreCard";

function GenresInDB(props) {
    
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800" >Total de Productos por Categoría</h5>
                    </div>
                    <div className={`card-body`}>
                        <div className="row">
                            {
                                Object.entries(props.categories).map((categories, i) => <GenreCard key={ categories[0] + i } name={ categories[0] } count = {categories[1].count}/>)
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )

}

export default GenresInDB;