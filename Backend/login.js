function utente() {
    this.email;
    this.Password;
}



function login() {


    let url = 'http://localhost:3000/loginutente';

    //let url = 'http://localhost:3000/loginutente?email=info@email.it&password=1234'; 

    let messaggio = '';

    let ut = new utente();
    ut.email = document.getElementById('inputEmail4').value;
    ut.Password = document.getElementById('inputpass').value;

    console.log(ut);

    url += '?';

    for (let i in ut) {
        url += i + '=' + ut[i] + '&';
    }

    url = url.slice(0, -1);

    fetch(url).then(

        result => {

            if (result.ok == true) {
                let risultato = result.json();
                console.log(risultato);
                document.getElementById('esito').innerHTML = 'Autenticazione Avvenuta con Successo';
                document.location.href='admin.html';
            } else {
                document.getElementById('esito').innerHTML = 'Email o Password errati... riprova';
                throw new Error();
            }
        }
    ).catch(
        error => {
            console.log(error);
        }
    );


}