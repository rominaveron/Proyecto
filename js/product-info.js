var product = {};
let prodRel = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
            <li data-thumb="` + imageSrc + `">
                <a href="` + imageSrc + `" data-fancybox="gallery">
                    <img class="img-prod-info" src="` + imageSrc + `" />
                </a>
            </li>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let pos = array[i];

        htmlContentToAppend += `
        
            <div class="card card-prod-rel m-2 bg-light">
                <a id="link-a" href="product-info.html">
                    <img class="card-img-top d-block" src="`+ prodRel[pos].imgSrc +`" alt="Card image cap">
                    <div class="card-body">
                        <h3 class="card-title text-center ">`+ prodRel[pos].name +`</h3>
                        <hr>
                        <p class="card-text text-center">`+ prodRel[pos].description +`</p>
                    </div>
                    <div class="card-footer">
                        <h4 class=" text-center">`+prodRel[pos].currency + prodRel[pos].cost+`</h4>
                    </div>
                </a>
            </div>
       
        `

        document.getElementById("productRelatedProducts").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function (resultObj){
        if(resultObj.status === "ok")
        {
            prodRel = resultObj.data;
            
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCurrencyAndCostHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCurrencyAndCostHTML.innerHTML = product.currency + ` ` + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            
            
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Muestro imagenes de los productos relacionados
            showRelatedProducts(product.relatedProducts);
        }
    });

    });