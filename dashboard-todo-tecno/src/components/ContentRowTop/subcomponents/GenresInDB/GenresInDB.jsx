import React, { Component } from "react";
import GenreCard from "../../../GenreCard/GenreCard";

class GenresInDB extends Component {

    constructor(props) {
        super()
        this.state = {
            genresList: [],
            color: "",
            categories: props.categories
        }
    }

    componentDidMount() {

        /* fetch('http://localhost:3001/api/genres')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(genres => {
                this.setState({ genresList: genres.data })
            })
            .catch(error => console.log(error)) */
            
    }




    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800" >Total de Productos por Categoría</h5>
                    </div>
                    <div className={`card-body`}>
                        <div className="row">
                            {
                                /* Array.isArray(this.state.genresList) && this.state.genresList.map((genre, i) => <GenreCard key={ genre.name + i } name={ genre.name } />) */
                                Object.entries(this.state.categories).map((categories, i) => <GenreCard key={ categories[0] + i } name={ categories[0] } count = {categories[1].count}/>)
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GenresInDB;