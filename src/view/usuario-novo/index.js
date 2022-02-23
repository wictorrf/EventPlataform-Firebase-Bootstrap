import React from 'react';
import {useState} from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import Navbar from '../../components/navbar';

function NovoUsuario(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgtipo, setMsgTipo] = useState('');
    const [msg, setMsg] = useState('');
    const [carregando, setCarregando] = useState('')

    function cadastrar(){
        
        setMsgTipo(null);

        if(!email || !senha){
            setMsgTipo('error')
            setMsg('Voce precisa informar email e senha para cadastrar!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((resultado) => {
            setCarregando(0);
            setMsgTipo('sucesso')
        })
        .catch((error) => {
            setCarregando(0);
            setMsgTipo('error')
            switch(error.message)
            {
                case 'Password should be at least 6 characters' :
                    setMsg('Asenha deve ter pelo menis 6 caracteres!');
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Este ja esta sendo utilizado por outro usuario!');  
                    break; 
                case 'the email address is badly formatted.':
                    setMsg('O formato do seu email e invalido!');    
                    break;
                default:
                    setMsg('Nao foi possivel cadastrar. Tente novamente mais tarde!');
                    break;     
            }
        })

    }

    return(
        <>

        <Navbar/>

        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 font-weight-bold" > Cadastro</h1>

                <input onChange={(e) => setEmail(e.target.value)}  type="email" className="form-control my-2" placeholder="Email" />
                <input onChange={(e) => setSenha(e.target.value)}  type="password" className="form-control my-2" placeholder="Senha" />

                {
                    carregando ? 
                <div class="spinner-border text-danger" role="status">
                    <span class="sr-only">Loading...</span>

                 </div> :
                 <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 btn-cadastro" >Cadastrar</button>

                }

                
            

                <div className="msg-login text-black text-center my-3">

               
                    {msgtipo === 'sucesso' && <span><strong>Boa!</strong> Usuario cadastrado com sucesso! &#128513;</span> } <br/>
                    
                    {msgtipo === 'error' && <span><strong>Ops!</strong> {msg} &#128542;</span>}
                
                 </div>

            </form>

        </div>
        </>
    )
}
export default NovoUsuario;