
async function getProducts(){
        const products = await fetch('http://localhost:3000/products');
        const productsList = await products.json();
        return productsList;  
}

async function postProducts(product, price, image){

    const newProduct = await fetch('http://localhost:3000/products', {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product : product,
            price : price,
            image : image
        })
    });

    const convertedNewProduct = await newProduct.json();
    return convertedNewProduct;
}

async function deleteProduct(id){
    const product = await fetch(`http://localhost:3000/products/${id}`,{
        method: 'DELETE'
    });
}

export const apiConnection = {
    getProducts,
    postProducts,
    deleteProduct
}