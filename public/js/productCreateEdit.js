window.onload = async () => {
    //const defaultOptionSubcategory = document.querySelector("select[name='subcategory'] option.choose-option");
    //defaultOptionSubcategory.appendS
    
    const subCategorySelector = document.querySelector("select[name='subCategory']");
    const categorySelector = document.querySelector("select[name='category']");
    const brandSelector = document.querySelector("select[name='brand']");
    
    categorySelector.addEventListener("change", async function(e){
        const selectedIndex = this.selectedIndex; //obtengo el indice correspondiente a la opcion elegida del select de categoria
        const categoryId = this.children[selectedIndex].value; //obtengo el valor de la opcion elegida (option es hijo de select)

        //elimino todas las opciones de subcategorias para agregar nuevas
        subCategorySelector.innerHTML = '<option value="" class= "choose-option" disabled selected>Selecciona una SubCategoría</option>';

        //pido las subcategorias correspondientes a la categoria elegida
        const response = await fetch("http://localhost:3000/api/categorySubCategory/subcategories?categoryId="+categoryId);

        let subCategories = await response.json();
        subCategories = subCategories.data;       
        
        //cargo las subcategorias como options hijos del select de subcategorias
        subCategories.forEach(subCategory => {
            const newOption = document.createElement("option");
            newOption.value = subCategory.id;
            newOption.innerHTML = subCategory.name;
            subCategorySelector.appendChild(newOption);
        });

        //elimino todas las opciones de marcas para agregar nuevas
        brandSelector.innerHTML = '<option value="" class= "choose-option" disabled selected>Selecciona una Marca</option>';


        //pido las marcas correspondientes a la categoria elegida
        const brandResponse = await fetch("http://localhost:3000/api/categorySubCategory/brands?categoryId="+categoryId);

        let brands = await brandResponse.json();
        brands = brands.data;       
        
        //cargo las subcategorias como options hijos del select de subcategorias
        brands.forEach(brand => {
            const newOption = document.createElement("option");
            newOption.value = brand.brandOfCategory.id;
            newOption.innerHTML = brand.brandOfCategory.name;
            brandSelector.appendChild(newOption);
        });
        
    });

    

    
}