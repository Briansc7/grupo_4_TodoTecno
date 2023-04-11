window.onload = async () => {
    //const defaultOptionSubcategory = document.querySelector("select[name='subcategory'] option.choose-option");
    //defaultOptionSubcategory.appendS
    
    const subCategorySelector = document.querySelector("select[name='subcategory']");
    

    let categoryId = 1;

    const response = await fetch("http://localhost:3000/api/categorySubCategory/subcategories?categoryId="+categoryId);

    let subCategories = await response.json();
    subCategories = subCategories.data;

    console.log(subCategories);

    subCategories.forEach(subCategory => {
        const newOption = document.createElement("option");
        newOption.value = subCategory.id;
        newOption.innerHTML = subCategory.name;
        subCategorySelector.appendChild(newOption);
    });

    
}