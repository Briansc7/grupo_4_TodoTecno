import React, {useState, useEffect} from "react";
import ContentRowTop from "../../components/ContentRowTop/ContentRowTop";
import Table from "../../components/Table/Table";

function ContentWrapper() {

    const [tableRows, setTableRows] = useState([]);

    const [columnNames, setColumnNames] = useState({});

    const [page, setPage] = useState(1);

    const [lastPage, setLastPage] = useState(1);    
    const productsPerPage = 10;

    const URL_BASE = "http://localhost:3000/";

	const URL_API_PRODUCTS = URL_BASE + "api/products?page=" + page;

    useEffect(() => {
        async function loadData(){
            let response, productsData, rowsData = [], productsCount;

            setColumnNames({ id: "Id", brandName: "Marca", model: "Modelo", categoryName: "Categoría", subCategoryName: "Subcategoría"});//, detail: "Detalle"});

            response = await fetch(URL_API_PRODUCTS);
			productsData = await response.json();
            productsCount = productsData.count;
            productsData = productsData.products;

            const lastPageCalculation = Math.ceil(productsCount/productsPerPage);
            console.log(lastPageCalculation);
            setLastPage(lastPageCalculation);

            productsData.forEach(product => {
                rowsData.push({
                    id: product.id, 
                    brandName: product.brandName, 
                    model: product.model, 
                    categoryName: product.category.name, 
                    subCategoryName: product.subCategory.name,
                    //detail: product.detail
                })
            });

            setTableRows(rowsData);
        }
        
        loadData();

    },[URL_API_PRODUCTS]);

    function pageDown(){
        if(page>1){
            setPage(page-1);
        }
    }
    
    function pageUp(){
        if(page < lastPage){
            setPage(page+1);
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
                    <button class={`btn p-3 ${page>1?"btn-dark":"btn-secondary"}`} onClick={pageDown}>{"<"}</button>
                    <button class={`btn p-3 ${page<lastPage?"btn-dark":"btn-secondary"}`} onClick={pageUp}>{">"}</button>
                </div>              
            </div>
    );
}

export default ContentWrapper;