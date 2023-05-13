import React from "react";

function GenreCard(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body d-flex justify-content-between">                
                    <span>{props.name}</span><span>{props.count}</span>
                </div>
            </div>
        </div>
    )
}

export default GenreCard;