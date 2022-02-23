import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



function Navbar(){

const dispatch = useDispatch();

    return(
 <nav className="navbar navbar-expand-lg ">
     <i class="far fa-smile-wink text-white fa-3x "></i>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars text-white"></i>
      </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active"><Link className="nav-link ml-3" to="/">Home </Link> </li>

        {
           useSelector(state => state.usuarioLogado) > 0 ? 

      <>
         
         <li className="nav-item active"><Link className="nav-link" to="/eventocadastro">Publicar eventos </Link> </li>
         <li className="nav-item active"><Link className="nav-link" to="/eventos/meus">Meus eventos </Link> </li>
         <li className="nav-item active"><Link className="nav-link" onClick={() =>  dispatch({type: 'LOG_OUT'})}  >Sair </Link> </li>

      </>
      :
      <>
      
         <li className="nav-item active"><Link className="nav-link" to="/novousuario">cadastrar </Link> </li>
         <li className="nav-item active"><Link className="nav-link" to="/login">login </Link> </li>

      </>
        
        }
     
    </ul>


  </div>
</nav>
    )
}
export default Navbar;