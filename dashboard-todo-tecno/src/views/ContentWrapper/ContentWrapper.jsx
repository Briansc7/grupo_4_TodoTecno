import React, {useState, useEffect} from "react";
import ContentRowTop from "../../components/ContentRowTop/ContentRowTop";
import Table from "../../components/Table/Table";

function ContentWrapper() {

    const [tableRows, setTableRows] = useState([]);

    const [columnNames, setColumnNames] = useState({});

    const URL_BASE = "http://localhost:3000/";

    const page = 1;

	const URL_API_PRODUCTS = URL_BASE + "api/products?page=" + page;

    useEffect(() => {
        async function loadData(){
            let response, productsData, rowsData = [];

            setColumnNames({ id: "Id", brandName: "Marca", model: "Modelo", categoryName: "Categoría", subCategoryName: "Subcategoría", detail: "Detalle"});

            response = await fetch(URL_API_PRODUCTS);
			productsData = await response.json();
            productsData = productsData.products;

            productsData.forEach(product => {
                rowsData.push({
                    id: product.id, 
                    brandName: product.brandName, 
                    model: product.model, 
                    categoryName: product.category.name, 
                    subCategoryName: product.subCategory.name,
                    detail: product.detail
                })
            });

            setTableRows(rowsData);
        }
        
        loadData();

    },[URL_API_PRODUCTS]);

      

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