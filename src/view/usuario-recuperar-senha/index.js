import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/navbar';
import './usuario-recuperar-senha.css';

import firebase from '../../config/firebase';
import 'firebase/auth';


function UsuarioRecuperarSenha(){

const [email, setEmail] = useState();
const [msg, setMsg] = useState();

function recuperarsenha(){
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        setMsg('Enviamos um link no seu email para redefinir sua senha!');
    })
    .catch((error) =>{
        setMsg('Verifique se o amail esta correto!');
    })
}

    return(
        <>
           <Navbar/>

           <div className="cadastro">
           <h3 className="mb-3 font-weight-bold text-center">Recuperar senha</h3>
               <div className=" login mx-auto mt-5" >
                  <input onChange={(e) => setEmail(e.target.value)} type="email" className="forn-control my-2" placeholder="Email" />

                  <div className="msf my4 text-center" >
                      <span>{msg}</span>
                  </div>
                  <button onClick={recuperarsenha} type="button" className="btn btn-lg btn-block btn-enviar" >Recuperar senha</button>
               </div>
           </div>


        </>
    )
}
export default UsuarioRecuperarSenha;
