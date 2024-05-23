const formFields = document.querySelectorAll("[required]");
const submitButton = document.getElementById('submit__button');
const errorsType = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const errorsMessages = {
    product:{
        valueMissing : 'Por favor, preencha esse campo com o nome do produto.',
        tooShort: 'Por favor, preencha um nome válido.'
    },
    price:{
        valueMissing: 'Por favor, preencha esse campo com o preço do produto.(Ex. 5,17)',
        patternMismatch:'Por favor, preencha esse campo com o preço do produto.(Ex. 5,17)',
        customError:'Por favor, preencha esse campo com o preço do produto.(Ex. 5,17)'
    },
    image:{
        valueMissing : 'Por favor, preencha esse campo com um link válido.(Ex. https://... ou http://...)',
        tooShort: 'Por favor, preencha com um link válido.(Ex. https://... ou http://...)',
        typeMismatch: 'Por favor, preencha com um link válido.(Ex. https://... ou http://...)'
    }
}

submitButton.addEventListener('click', () =>{
    formFields.forEach((field) => verifyField(field));
});

formFields.forEach((field) =>{
    field.addEventListener('blur', () => verifyField(field));
    field.addEventListener('invalid', e => e.preventDefault());
})


function verifyField(formField){
    
    let message = "";

    if(formField.name == 'price' && formField.value.length <= 12){
        formField.value = validatePrice(formField);
    }

    errorsType.forEach(error => {
       if (formField.validity[error]){
        message = errorsMessages[formField.name][error];
       } 
    })

    const messageElement = formField.parentNode.querySelector('.error__message');
    const isInputValid = formField.checkValidity();

    if (!isInputValid){
        messageElement.textContent = message;
        formField.classList.add('form__item-error');
    } else {
        messageElement.textContent = '';
        formField.classList.remove('form__item-error');
    }
}

function validatePrice(formField){
    let price = formField.value.replace(/\./g,"") 
    price = formField.value.replace(/\./g,"");
    price = price.replace(/\,/g,".");
    price = parseFloat(price);
    if(price < 0 || price == undefined || isNaN(price)){
        return '';
    }else{    
        price = parseFloat(price.toFixed(2));
        price = price.toLocaleString('pt-br', {minimumFractionDigits: 2});
        return price;
    }
}
    