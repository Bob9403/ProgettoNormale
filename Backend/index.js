const express = require('express');//import libreria express
const bodyparser = require('body-parser');//import libreria body-parser
const cors = require('cors');//import libreria cors
const mysql = require('mysql2');


const app = express();      //creo istanza del mio server

app.use(cors());   //imposto al servere la libreria cors
app.use(bodyparser.json()); // imposto al server la libreria body-parser


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'ecommerce',
    port: 3306
})

app.get('/stampaProd', (req,res)=> {
    console.log('effettuata chiama get alla ricerca');
    let istruzione= 'select * from prodotti';
    connection.query(istruzione, (err,result)=>{
        if(result.length > 0){
            res.send({
                message : 'prodotto trovato',
                data : result
            })
        }else{
            res.send({
                message : 'prodotto non trovato'
            });
        }
    })
});

app.get('/stampaCat', (req,res)=> {
    console.log('effettuata chiama get alla ricerca');
    let istruzione= 'select * from categoria';
    connection.query(istruzione, (err,result)=>{
        if(result.length > 0){
            res.send({
                message : 'prodotto trovato',
                data : result
            })
        }else{
            res.send({
                message : 'prodotto non trovato'
            });
        }
    })
});

app.get('/loginutente', (req,res)=>{ 
 
    console.log('Hanno effettuato una chiamata al login utente'); 
 
    let email    = req.query.email; 
    let Password = req.query.Password; 
 
    let istruzione = `select * from daticlienti where email = '${email}' and Password = '${Password}'`; 
    console.log(istruzione); 
    connection.query(istruzione, (errore,risultato)=>{ 
        // risultato è un array 
        if(risultato.length > 0){ 
            res.send({ 
                messaggio : 'tutto ok', 
                result : risultato 
            }); 
        }else{ 
            res.status(400); 
            res.send({ 
                messaggio : 'non ho trovato nulla', 
                result : null 
            }); 
        } 
    }); 
});

 
app.get('/ricercautente/:idut', (req,res)=> {
    console.log('effettuata chiama get alla ricerca');

    let id_ut = req.params.idut;
    let istruzione= `select * from daticlienti where idClienti = ${id_ut}`;// per mettere "``" alt+960

    connection.query(istruzione, (err,result)=>{
        if(result.length > 0){
            res.send({
                message : 'utente trovato',
                data : result
            })
        }else{
            res.send({
                message : 'utente non trovato'
            });
        }
    })
});

app.post('/inserimento', (req,res)=>{
    let Nome = req.body.Nome;
    let RagioneSociale = req.body.RagioneSociale;
    let tipologia = req.body.tipologia;
    let PartitaIva = req.body.PartitaIva;
    let CodiceFiscale = req.body.CodiceFiscale;
    let Nazione = req.body.Nazione;
    let Via = req.body.Via;
    let CAP = req.body.CAP;
    let Comune = req.body.Comune;
    let Provincia = req.body.Provincia;
    let TelefonoFisso = req.body.TelefonoFisso;
    let Cellulare = req.body.Cellulare;
    let email = req.body.email;
    let Username = req.body.Username;
    let Password = req.body.Password;

    let qry= `insert into daticlienti (Nome,RagioneSociale,tipologia,PartitaIva,
        Codicefiscale,Nazione,Via,CAP,Comune,Provincia,TelefonoFisso,
        Cellulare,email,Username,Password)values
    ('${Nome}','${RagioneSociale}','${tipologia}','${PartitaIva}' ,
     '${CodiceFiscale}', '${Nazione}', '${Via}','${CAP}',
     '${Comune}','${Provincia}','${TelefonoFisso}',
     '${Cellulare}', '${email}','${Username}', '${Password}')`;

     console.log(qry);
    connection.query(qry , (err,result)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});


app.post('/prodotti', (req,res)=>{
    let nome = req.body.nome;
    let Prezzo = req.body.Prezzo;
    let ImmagineProd = req.body.ImmagineProd;
    let CategoriaProd = req.body.CategoriaProd;
   

    let qry= `insert into prodotti (nome,Prezzo,ImmagineProd,CategoriaProd)values
    ('${nome}','${Prezzo}','${ImmagineProd}','${CategoriaProd}')`;

     console.log(qry);
    connection.query(qry , (err,result)=>{
        res.send({
            message: 'prodotto inserito correttamente'
        });
    });

});


app.post('/categorie', (req,res)=>{
    let NomeCategoria = req.body.NomeCategoria;
    let Immagine = req.body.Immagine;
   

    let qry= `insert into categoria (NomeCategoria,Immagine)values
    ('${NomeCategoria}','${Immagine}')`;

     console.log(qry);
    connection.query(qry , (err,result)=>{
        res.send({
            message: 'categoria inserito correttamente'
        });
    });

});


app.put('/modifica/:id', (req,res)=>{
    let id_ut = req.params.id;
    let Nome = req.body.Nome;
    let RagioneSociale = req.body.RagioneSociale;
    let tipologia = req.body.tipologia;
    let PartitaIva = req.body.PartitaIva;
    let CodiceFiscale = req.body.CodiceFiscale;
    let Nazione = req.body.Nazione;
    let Via = req.body.Via;
    let CAP = req.body.CAP;
    let Comune = req.body.Comune;
    let Provincia = req.body.Provincia;
    let TelefonoFisso = req.body.TelefonoFisso;
    let Cellulare = req.body.Cellulare;
    let email = req.body.email;
    let Username = req.body.Username;
    let Password = req.body.Password;

    let qry= `update daticlienti set
     Nome = '${Nome}',
     RagioneSociale = '${RagioneSociale}' ,
     tipologia = '${tipologia}',
     PartitaIva ='${PartitaIva}' ,
     CodiceFiscale ='${CodiceFiscale}' ,
     Nazione ='${Nazione}' ,
     Via = '${Via}',
     CAP ='${CAP}' ,
     Comune = '${Comune}' ,
     Provincia = '${Provincia}',
     TelefonoFisso ='${TelefonoFisso}' ,
     Cellulare = '${Cellulare}',
     Email = '${email}' ,
     Username = '${Username}' ,
     Password ='${Password}' 
    where idutenti = ${id_ut}` ;

    connection.query(qry , (err,res)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});

app.delete('/cancella/:idcategoria', (req,res)=>{
    let id_ut = req.params.idcategoria;
    console.log(id_ut);

    let qry= `delete from categoria where idcategoria  = ${id_ut}` ;
    

    connection.query(qry , (err,result)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});
app.delete('/elimina/:idprodotti', (req,res)=>{
    let id_ut = req.params.idprodotti;
    console.log(id_ut);

    let qry= `delete from prodotti where idprodotti  = ${id_ut}` ;
    

    connection.query(qry , (err,result)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});

app.delete('/cancprod/:CategoriaProd', (req,res)=>{
    console.log(req.params);
    let id_ut = req.params.CategoriaProd;
    console.log(id_ut);

    let qry= `delete from prodotti where CategoriaProd  = '${id_ut}'` ;
    

    connection.query(qry , (err,result)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});




app.listen(3000, () => {     //imposto il server in ascolto sulla porta 3000
    console.log('server running . . .');

});



app.put('/modificaCat/:idcategoria', (req,res)=>{
    let id_ut = req.params.idcategoria;
    let NomeCategoria = req.body.NomeCategoria;
    


    let qry= `update categoria set
     NomeCategoria = '${NomeCategoria}'
    where idcategoria = ${id_ut}` ;
    console.log(qry);
    connection.query(qry , (err,result)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});
app.put('/modificaProd/:idprodotti', (req,res)=>{
    let id_ut = req.params.idprodotti;
    let nome = req.body.nome;
    let Prezzo = req.body.Prezzo;
    let CategoriaProd = req.body.CategoriaProd;
    


    let qry= `update prodotti set
     nome = '${nome}',
     Prezzo = '${Prezzo}',
     CategoriaProd = '${CategoriaProd}'
    where idprodotti = ${id_ut}` ;
    console.log(qry);
    connection.query(qry , (err,result)=>{
        res.send({
            message: 'utente inserito'
        });
    });

});

