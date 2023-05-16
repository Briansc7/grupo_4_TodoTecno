import React, {useState, useEffect} from "react";
import ContentRowTop from "../../components/ContentRowTop/ContentRowTop";
import Table from "../../components/Table/Table";

function ContentWrapper() {

    const [tableRows, setTableRows] = useState([]);

    const [columnNames, setColumnNames] = useState({});

    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);  

    const URL_BASE = "http://localhost:3000/";

    const [URL_API_PRODUCTS, setURL_API_PRODUCTS] = useState(URL_BASE + "api/products?page=1");

    useEffect(() => {
        async function loadData(){
            let response, responseJson, productsData, rowsData = [], productsCount;

            setColumnNames({ id: "Id", brandName: "Marca", model: "Modelo", categoryName: "Categoría", subCategoryName: "Subcategoría"});

            response = await fetch(URL_API_PRODUCTS);
			responseJson = await response.json();
            productsCount = responseJson.count;
            productsData = responseJson.products;

            setPreviousPage(responseJson.previous);
            setNextPage(responseJson.next);

            productsData.forEach(product => {
                rowsData.push({
                    id: product.id, 
                    brandName: product.brandName, 
                    model: product.model, 
                    categoryName: product.category.name, 
                    subCategoryName: product.subCategory.name,
                    link: product.detail //debe ser el ultimo argumento para no mostrarse en las columnas
                })
            });

            setTableRows(rowsData);
        }
        
        loadData();

    },[URL_API_PRODUCTS]);

    function pageDown(){
        if(previousPage){
            setURL_API_PRODUCTS(previousPage);
        }
    }
    
    function pageUp(){
        if(nextPage){
            setURL_API_PRODUCTS(nextPage);
        }   
    } 

    return (
            <div id="content">
                {/* <!-- Content Row Top --> */}
                <ContentRowTop />
                {/* <!--End Content Row Top--> */}
                {<Table data={tableRows} 
                columns={columnNames} />} 
                 
                <div class="d-flex justify-content-around">
                    <button class={`btn p-3 ${previousPage?"btn-dark":"btn-secondary"}`} onClick={pageDown}>{"<"}</button>
                    <button class={`btn p-3 ${nextPage?"btn-dark":"btn-secondary"}`} onClick={pageUp}>{">"}</button>
                </div>              
            </div>
    );
}

export default ContentWrapper;