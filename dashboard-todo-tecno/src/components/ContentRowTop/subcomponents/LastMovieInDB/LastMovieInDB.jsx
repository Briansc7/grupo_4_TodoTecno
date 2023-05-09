import React from "react";
import Mandalorian from "../../../../assets/images/mandalorian.jpg";
import SuperCard from "../../../SuperCard/SuperCard";

function LastMovieInDB() {
    return (
        <SuperCard title="Last movie in Data Base">
            <div className="text-center">
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "40rem" }} src={Mandalorian} alt=" Star Wars - Mandalorian " />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
            <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
        </SuperCard>


    )
}

export default LastMovieInDB;