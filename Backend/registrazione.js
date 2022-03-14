function utente(){
    this.Nome;
    this.RagioneSociale;
    this.tipologia;
    this.PartitaIva;
    this.Codicefiscale;
    this.Nazione;
    this.Via;
    this.CAP;
    this.Comune;
    this.Provincia;
    this.TelefonoFisso;
    this.Cellulare;
    this.email;
    this.Username;
    this.Password;
}

var url = 'http://localhost:3000/';

function invia(){
    let ut = new utente();
    ut.Nome = document.getElementById('inputnome').value;
    ut.RagioneSociale = document.getElementById('inputRagione').value;
    ut.tipologia = document.getElementById('inputTipologia').value;
    ut.PartitaIva = document.getElementById('inputIva').value;
    ut.CodiceFiscale = document.getElementById('inputFis').value;
    ut.Nazione = document.getElementById('inputState').value;
    ut.Via = document.getElementById('inputvia').value;
    ut.CAP = document.getElementById('inputcap').value;
    ut.Comune = document.getElementById('inputcom').value; 
    ut.Provincia = document.getElementById('inputprov').value;
    ut.TelefonoFisso = document.getElementById('inputtell').value;
    ut.Cellulare = document.getElementById('inputcell').value;
    ut.email = document.getElementById('inputEmail4').value;
    ut.Username = document.getElementById('inputuser').value;
    ut.Password = document.getElementById('inputpass').value;

    console.log(ut);

    fetch(url+'inserimento',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(ut)
    })
}
