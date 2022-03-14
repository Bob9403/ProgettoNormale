function utente() {
    this.nome;
    this.Prezzo;
    this.ImmagineProd;
    this.CategoriaProd;
}

var url = 'http://localhost:3000/';

function prodotti() {
    let ut = new utente();
    ut.nome = document.getElementById('nome').value;
    ut.Prezzo = document.getElementById('Prezzo').value;
    ut.ImmagineProd = document.getElementById('ImmagineProd').value;
    ut.CategoriaProd = document.getElementById('CategoriaProd').value;


    console.log(ut);

    fetch(url + 'prodotti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ut)
    })
}


function stampaProd() {
    let url = 'http://localhost:3000/stampaProd';

    document.getElementById('prodotti').innerHTML = ""

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        const prodotti = data.data;

        prodotti.forEach(element => {
            console.log(element);
            document.getElementById('prodotti').innerHTML +=
                `
            
                <div class=" m-2 d-flex justify-content-between align-items-center" style="background-color:rgba(0, 0, 0, 0.2); border-radius: 10px;" >
                 <div class="prod d-flex" style="padding: 10px;">
                    <div>
                         <img src="/Frontend/img/${element.ImmagineProd.slice(10)}" style="height: 100px;" alt="">
                     </div>
                     <div class="desc">
                         <h5>${element.CategoriaProd}</h5>
                         <h6>${element.nome}</h6>
                <h6><strong>EUR ${element.Prezzo}</strong></h6>
            </div>
        </div>
        <div class="mod" style="padding: 10px;">
            <button type="button" class="btn btn-primary my-2 my-sm-0" onclick="modificaProd('${element.idprodotti}')">modifica</button>
            <button type="button" class="btn btn-danger my-2 my-sm-0" onclick="deleteProd('${element.idprodotti}')">elimina</button>
        </div>
    </div>
            `
        });
    })
}
stampaProd();


function deleteProd(idprodotti) {
    
    let url = 'http://localhost:3000/';

    
    fetch(url+`elimina/${idprodotti}`,{
        method: 'DELETE',
        
    })
    stampaProd();   
}

function modificaProd(idprodotti) {
    console.log(idprodotti);
    let ut = new utente();
    ut.nome = prompt('Nuovo nome Prodotto');
    ut.Prezzo = prompt('Nuovo prezzo prodotto');
    ut.CategoriaProd = prompt('Sostituisci categoria Prodotto');
    
    /* ut.NomeCategoria = document.getElementById('nomeCat').value */
/*     ut.Immagine = document.getElementById('ImmagineCat').value;
 */
    let url = 'http://localhost:3000/';

    fetch(url + `modificaProd/'${idprodotti}'`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ut)
    })
}