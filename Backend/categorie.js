function utente() {
    this.NomeCategoria;
    this.Immagine;
}

var url = 'http://localhost:3000/';

function categorie() {
    let ut = new utente();
    ut.NomeCategoria = document.getElementById('nomeCat').value
    ut.Immagine = document.getElementById('ImmagineCat').value;


    console.log(ut);

    fetch(url + 'categorie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ut)
    })
}









function stampaCat() {
    let url = 'http://localhost:3000/stampaCat';

    document.getElementById('prodotti').innerHTML = ""

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        const categoria = data.data;

        categoria.forEach(element => {
            console.log(element);
           

            document.getElementById('prodotti').innerHTML +=
                `
            
                <div class=" m-2 d-flex justify-content-between align-items-center" style="background-color:rgba(0, 0, 0, 0.2); border-radius: 10px;" >
                 <div class="prod d-flex" style="padding: 10px;">
                    <div>
                    <img src="/Frontend/img/${element.Immagine.slice(10)}" style="height: 100px;" alt="">
                     </div>
                     <div class="desc">
                         <h6>${element.NomeCategoria}</h6>
            </div>
        </div>
        <div class="mod" style="padding: 10px;">
            <button type="button" class="btn btn-primary my-2 my-sm-0" onclick="modificaCat('${element.idcategoria}')">Modifica</button>
            <button type="button" class="btn btn-danger my-2 my-sm-0" onclick="deleteCat('${element.idcategoria}')">elimina</button>
            <button type="button" class="btn btn-danger my-2 my-sm-0" onclick="deleteAllP('${element.NomeCategoria}')">elimina prodotti</button>
        </div>
    </div>
            `
        });
    })
}
stampaCat();




function deleteCat(idcategoria) {

    let url = 'http://localhost:3000/';


    fetch(url + `cancella/${idcategoria}`, {
        method: 'DELETE',

    })
    stampaCat();
}


function deleteAllP(CategoriaProd) {

    console.log(CategoriaProd);

    let url = 'http://localhost:3000/';


    fetch(url + `cancprod/${CategoriaProd}`, {
        method: 'DELETE',

    })

}


function modificaCat(idcategoria) {
    console.log(idcategoria);
    let ut = new utente();
    ut.NomeCategoria = prompt('Nuovo nome categoria');
    /* ut.NomeCategoria = document.getElementById('nomeCat').value */
/*     ut.Immagine = document.getElementById('ImmagineCat').value;
 */
    let url = 'http://localhost:3000/';

    fetch(url + `modificaCat/'${idcategoria}'`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ut)
    })
}