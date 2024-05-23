import { apiConnection } from "./apiConnection.js";

const list = document.querySelector('.products__list');
const form = document.querySelector('.form__container');


buildProductsList();

form.addEventListener('submit', e => createNewProduct(e));

function buildCards(id, product, price, image){
    const newProduct = document.createElement('li');
    newProduct.className = 'products__card';
    newProduct.setAttribute('title', product);
    newProduct.innerHTML =`<img src="${image}" alt="${product}" class="card__image">
                         <p class="card__information">${product}</p>
                         <p class="card__information bold">$ ${price}</p>
                         <button class="card__delete-button"></button>`;

    
    const deleteButton = newProduct.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => apiConnection.deleteProduct(id));
    
    return newProduct;
}

async function buildProductsList(){
    const productsListApi = await apiConnection.getProducts();
    list.innerHTML='';
    productsListApi.forEach(element => list.appendChild(buildCards(element.id, element.product, element.price, element.image)))
}

async function createNewProduct(event){
    event.preventDefault();
    
    const product = document.getElementById('form-product').value;
    const price = document.getElementById('form-price').value;
    const image = document.getElementById('form-image').value;

    await apiConnection.postProducts(product, price, image);
}


