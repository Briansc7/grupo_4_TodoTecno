import React, {useState, useEffect} from "react";
import ContentRowTop from "../../components/ContentRowTop/ContentRowTop";
import Table from "../../components/Table/Table";

function ContentWrapper() {

    const [tableRows, setTableRows] = useState([]);

    const [columnNames, setColumnNames] = useState({});

    useEffect(() => {
        async function loadData(){
            setColumnNames({ name: "Nombre", lastname: "Apellido"});
            setTableRows([{name: "Fede", lastname: "Garcia"}, {name: "Lauti", lastname: "Nuñez"}, {name: "Hernan", lastname: "Garcia"}]);
        }
        
        loadData();

    },[]);

      

    return (
            <div id="content">
                {/* <!-- Content Row Top --> */}
                <ContentRowTop />
                {/* <!--End Content Row Top--> */}
                {<Table data={tableRows} 
                columns={columnNames} />}
            </div>
    );
}

export default ContentWrapper;