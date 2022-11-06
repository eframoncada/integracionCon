//elementos del DOM
let translateFrom = document.querySelector('#translateFrom');
let translateTo = document.querySelector('#translateTo');

//Conseguir lista de idiomas desde el servidor
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages'

const OPTIONS = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8593f5e438msh1abfd3a2f2a3c71p121651jsn03adcc908646',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
}

let source_language = 'es';
let target_language = 'af';


fetch(GET_URL, OPTIONS)
    .then(res => res.json())
    .then(objeto => {
        let lenguajes = objeto.data.languages;
        console.log()
        //Cargar el select con la información
        lenguajes.forEach(element => {
            translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`
            translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`

        })
        translateFrom.addEventListener('click',()=>{
            source_language = translateFrom.value;
        })
        translateTo.addEventListener('click',()=>{
            target_language = translateTo.value;
        })
    })        
    
    .catch(error => console.log(error));

//Envio de datos al servidor
let translate = document.querySelector('#translate');
let outputTranslate = document.querySelector('#outputTranslate');

translate.addEventListener('click',()=>{
    let inputTranslate = document.querySelector('#inputTranslate');
    let textToTranslate = inputTranslate.value;


    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", textToTranslate);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '8593f5e438msh1abfd3a2f2a3c71p121651jsn03adcc908646',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => outputTranslate.value = response.data.translatedText)
        .catch(err => console.error(err));

});

