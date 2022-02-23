import React from 'react';
import { useState, useEffect } from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import EventoCard from '../../components/evento-card';


function Home({match}){

const [eventos, setEventos] = useState([]);
const [pesquisa, setPesquisa] = useState('');
const usuarioEmail = useSelector(state => state.usuarioEmail);

let listaeventos = [];

useEffect(() => {

if(match.params.parametro){

    firebase.firestore().collection('eventos')
    .where('usuario', '==', usuarioEmail)
    .get()
    .then(async (resultado) => {
       await resultado.docs.forEach(doc => {

            if(doc.data().titulo.indexOf(pesquisa) >= 0 )
            {

              listaeventos.push({
                  id: doc.id,
                  ...doc.data()
             })
           }
       })

        setEventos(listaeventos);

    })
   
}else {
    
    firebase.firestore().collection('eventos')
    .get()
    .then(async (resultado) => {
       await resultado.docs.forEach(doc => {

            if(doc.data().titulo.indexOf(pesquisa) >= 0 )
            {

              listaeventos.push({
                  id: doc.id,
                  ...doc.data()
             })
           }
       })

        setEventos(listaeventos);

    })
}

    
})

    return(
        <>
        <Navbar/>

        <div className="row p-3">
            <h2 className="mx-auto p-5">Eventos Publicados</h2>
           <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar Evento pelo titulo..." />
        </div>
         

       <div className="row mt-3 p-2">
        {eventos.map(item => <EventoCard  key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} /> )}
        
        </div>
        </>
    )
}
export default Home;