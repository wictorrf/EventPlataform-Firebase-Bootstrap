import React from 'react';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import firebase from '../../config/firebase';
import './evento-cadastro.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';


function EventoCadastro(props){

    const [carregando, setCarregando] = useState('')
    const [msgtipo, setMsgTipo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [foto, setFoto] = useState('');
    const  usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const bd = firebase.firestore();

    

    


    function cadastrar(){
         
        setMsgTipo(null);
        setCarregando(1);

        storage.ref(`imagens/${foto.name}`)
        .put(foto)
        .then(() => {
           bd.collection('eventos')
           .add({
               titulo: titulo,
               tipo: tipo,
               detalhes: detalhes,
               data: data,
               hora: hora,
               usuario: usuarioEmail,
               vizualizacoes: 0,
               foto: foto.name,
               publico: 1,
               criacao: new Date()
           })
           .then(() => {
            setMsgTipo('sucesso')
            setCarregando(null);
           })
          
        })
        .catch((error) => {
            setMsgTipo('error');
            setCarregando(null);
        })
    }

    return(
        <>
        <Navbar/>
         <div  className=" col-12 mt-5">
              <div className="row">
                  <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar evento ' : 'Nove Evento'}</h3>
              </div>

                 <form>
                     <div className="form-group">
                         <label>Titulo: </label>
                         <input  onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control"/>

                     </div>
                     <div className="form-group">
                         <label>Tipo do evento: </label>
                         <select  onChange={(e) => setTipo(e.target.value)} className="form-control">
                         <option disabled select value >-- Selecione um tipo --</option>
                             <option>Festa</option>
                             <option>Teatro</option>
                             <option>Show</option>
                             <option>Cinema</option>

                         </select>

                     </div>

                     <div className="form-group">
                         <label>Descricao do evento: </label>
                          <textarea  onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" />

                     </div>

                     <div className="form-group row">
                         <div className="col-6">
                         <label>Data: </label>
                        <input  onChange={(e) => setData(e.target.value)} type="date" className="form-control"/>
                        </div>
                        <div className="col-6">
                         <label>Hora: </label>
                        <input  onChange={(e) => setHora(e.target.value)} type="time" className="form-control"/>
                        </div>

                     </div>

                     <div className="form-group">
                         <label>Upload da Foto: </label>
                         <input  onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control"/>

                     </div>

                     <div className="row">

                         {
                              carregando > 0 ?
                     <div class="spinner-border text-danger mx-auto" role="status">
                      <span class="sr-only">Loading...</span></div>
                      : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro" > {props.match.params.id ? 'Atualizar evento ' : 'Publicar Evento'} </button>

                    }
                     </div>


                 </form>

                 <div className="msg-login text-info text-center my-3">

                 {msgtipo === 'sucesso' && <span><strong>Boa!</strong> Seu evento foi publicado! &#128513;</span> } <br/>
                    
                   {msgtipo === 'erro' && <span><strong>Ops!</strong> Nao foi possivel publicar o evento!&#128542;</span>}
                 
               </div>

         </div>
        </>
    )
}
export default EventoCadastro;