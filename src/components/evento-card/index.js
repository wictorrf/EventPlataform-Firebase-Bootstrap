import React from 'react';
import { useState, useEffect } from 'react';
import './evento-card.css';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';


function EventoCard({id, img, titulo, detalhes, vizualizacoes}){

    const [urlImagem, setUrlImagem] = useState('');

    useEffect(() => {
        firebase.storage().ref(`imagens/${img}`)
        .getDownloadURL()
        .then((url) => {
           setUrlImagem(url)
        })
    }, [urlImagem]);

    return(
        <div className="  col-md-3 col-sm-12">
           <img  src={urlImagem} className="card-img-top img-card" alt="imagem do evento"/>

           <div className="card-body">
              <h5>{titulo}</h5>
              <p className="card-text text-justify" >{detalhes}</p>

              <div className="row rodape-card d-flex align-items-center">

                 <div className="col-6">
                   <Link to={'/eventodetalhes/' + id }  className="btn btn-sm btn-detalhes">+ Detalhes</Link>
                 </div>
                
            
                 <div className=" view col-6 text-right">
                    <i className="far fa-eye"></i> <span>{vizualizacoes}</span>
                 </div>

              </div>
           </div>
        </div>
    )
}
export default EventoCard;


