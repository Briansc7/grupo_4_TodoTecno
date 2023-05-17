window.addEventListener("load",  async () => {
    const mainImage = document.querySelector(".picture img.product-picture");
    const imagesList = document.querySelectorAll(".images-products img.product-picture");

    imagesList.forEach(image => {
        image.addEventListener("click", () => {
            mainImage.src = image.src;
        });
    });
});