import React, { Component } from "react";
import GenreCard from "../../../GenreCard/GenreCard";

class GenresInDB extends Component {

    constructor() {
        super()
        this.state = {
            genresList: [],
            color: ""
        }
    }

    componentDidMount() {

        fetch('http://localhost:3001/api/genres')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(genres => {
                this.setState({ genresList: genres.data })
            })
            .catch(error => console.log(error))
    }

    cambiarColor = () => {
        this.setState({ color: "bg-secondary" })
    }


    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800" onMouseOver={ this.cambiarColor }>Genres in Data Base</h5>
                    </div>
                    <div className={`card-body ${this.state.color}`}>
                        <div className="row">
                            {
                                Array.isArray(this.state.genresList) && this.state.genresList.map((genre, i) => <GenreCard key={ genre.name + i } name={ genre.name } />)
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GenresInDB;