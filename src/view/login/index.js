import React from 'react';
import { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import {Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgtipo, setMsgTipo] = useState('');

    const dispatch = useDispatch();

    function logar(){
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resultado) => {
           setMsgTipo('sucesso')
           setTimeout(() => {
            dispatch({type: 'LOG_IN', usuarioEmail: email})
           }, 2000);

        })
        .catch((error) => {
            setMsgTipo('erro')
        });
       
    }



    return(
       <div className="Login-content d-flex aling-item-center">


           {
               useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/'/>
               :
               null
           }

            <form className="form-signin mx-auto">
            <div className="text-center mb-4">
            <i class="far fa-smile-wink text-white fa-7x "></i>
                <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
            </div>

            
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" class="form-control my-2" placeholder="Email address" />
            
                 <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" class="form-control  my-2" placeholder="Password" />
           

            <button  onClick={logar} class="btn btn-md btn-light btn-block btn-login" type="button"> Login </button>

            <div className="msg-login text-white text-center my-3">

                 {msgtipo === 'sucesso' && <span><strong>Boa!</strong> voce esta conectado! &#128513;</span> } <br/>
                    
                   {msgtipo === 'erro' && <span><strong>Ops!</strong> verifique se a senha ou usuario estao corretos!&#128542;</span>}
                 
               </div>
            
            <div className="opcoes-login mt-3">
            <Link to='/usuariorecuperarsenha'> Recuperar Senha </Link>
            <Link to='/novousuario' className="mx-2"> Cadastrar </Link>
            </div>
            </form>

       </div>
    )
}
export default Login;