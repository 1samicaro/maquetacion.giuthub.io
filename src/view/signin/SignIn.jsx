import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Gobernador from "../../assets/Gobernador.jpg";
import "./SingIn.css"
import { booksCatalogoAction, booksCopyAction, booksInfo } from '../../stateManagement/actions/booksInfoAction';
import { getBooks } from '../../services/bookServices';
import { booksAuthors, booksCountries, booksGenres } from '../../stateManagement/actions/stateActions';
import { getAuthors, getCountries, getGenres } from '../../services/dataByLanguage';
import { recomendedAction } from '../../stateManagement/actions/recommendedAction';
import { changeLanguageAction } from '../../stateManagement/actions/changeLanguageAction';
import { ToastContainer, toast } from 'react-toastify';
import niños from "../../assets/niños.png";
import loggo from "../../assets/loggo.png";


import Modal from '../../components/Modal';
import { infoToken, infoUser } from '../../stateManagement/actions/infoUserAction';
import { postLogin, recoverPass } from '../../services/userServices';
import styled from 'styled-components';

const initialState = {
    email: "",
    password: "",
};

export default function SignIn() {

    const dispatch = useDispatch()

    const demo = false

    

    const navigate = useNavigate()

    const [input, setInput] = useState(initialState)
    const [errors, setErrors] = useState(initialState);
    const [modalUpdate, setModalUpdate] = useState(false)
    const [recoveryPass, setRecoveryPass] = useState({})

    function handleInputChange(input, e){
        e.preventDefault()
        setInput(prev=>({...prev, [input]:e.target.value}))
    }

    const notify = () => {
        toast('Correo enviado', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    };

    const notifyError = () => {
        toast('Usuario no existe', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    };

    function handleRecovery(e){
        e.preventDefault()
        setRecoveryPass(e.target.value)
    }

    const onSend = async (e) => {
        e.preventDefault()
        const error = {};
        if (!input.password) { error.password = "Requerido" };
        if (!input.email) { error.email = "Requerido" };
        if (!(Object.entries(error).length === 0)) { setErrors(error) }
        else {
            const user = await postLogin(input);
            if (user.isAuthenticated) {
                if(user.user.RoleId===4 || user.user.RoleId===3){
                    if(user.user.isSuscribed){
                        user.user.name=user?.user?.name?.reverse().join(" ")
                        dispatch(infoUser(user.user))
                        dispatch(infoToken(user.token))
                        navigate('/pageFilters')
                    }
                    else {
                        const obj ={
                            email:user.user.email,
                            password:input.password
                        }
                        navigate('/paid', {state:obj})
                    }
                }
                else{
                    setErrors(prev=>({...prev, email:"Correo o Password incorrecto"}))
                    setErrors(prev=>({...prev, password:"Correo o Password incorrecto"}))
                }
            }
            else if(user==="Username or password incorrect"){
                setErrors(prev=>({...prev, email:"Correo o Password incorrecto"}))
                setErrors(prev=>({...prev, password:"Correo o Password incorrecto"}))
            }
        }
    };
    async function recovery(){
        const recover = await recoverPass(recoveryPass)
        if(recover.message==="Error sending mail"){
            notifyError()
        }
        if(recover.message==="mail send"){
            console.log("ingresa recovery");
            notify()
            setModalUpdate(!modalUpdate)
        }
    }

    return (
        <div id='paginasecundaria'>
            <ToastContainer />
            <div>
                <br />

                
                <img
                        src={loggo}
                        width="300"
                        height="170"
                        className="img-fluid d-block mx-auto"
                        alt='logoMingga'
                        />

                <br />

                <h6 id="titulo1_"> <b> <i>
                Maquetación de la Interfaz gráfica en HTML  GA5-220501095-AA1-EV04 <br />

               Instructor: Edgar Céspedes<br />
               Aprendiz: Sandra Milena Chavarría Romero
               </i> </b></h6>
               <br />

            

            <h5 id="titulo1_"> <b> <i>Bienvenidos al mágico mundo de la lectura</i> </b></h5>

                <img
                        src={niños}
                        width="350"
                        height="400"
                        className="img-fluid d-block mx-auto"
                        alt='logoMingga'
                        />


            <h5 id="titulo1_" > <b><i> La puerta de acceso al conocimiento <br />
            y al patrimonio literario de la humanidad
             </i></b> </h5>

                <div className="container-fluid" id="registro">
                    <div className="container">
                        <div className="container text-center">
                        </div>
                        <br />

                        <h4 id="titulo1_">Iniciar sesión</h4>
                            
                            

                            
                            <div  className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Ingresa con tu correo</span>

                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                onChange={(e)=>handleInputChange("email", e)} required/>
                                
                               
                            </div>
                            {errors.email ? <span className='textError'>{errors.email}</span> : <></>}


                            <div  className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Ingresa con tu contraseña</span>

                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                onChange={(e)=>handleInputChange("password", e)} required/>
                                
                                
                            </div>


                                <Link href="/" className="password" onClick={()=>setModalUpdate(!modalUpdate)}> <p id="titulo1_"><b>¿Olvidaste tu contraseña?</b></p></Link>
                                <Link to="/SignUp" className="password"> <p id="titulo1_"><b>¿Aún no te has registrado?</b></p></Link>
                               
                            
                            <p className="text">
                            
                            </p>

                            <Link         
                            className="btn btn-success" id="seguir_1" onClick={onSend}><b>Ingresar </b> 
                            </Link>
                            <br />
                            <div className="d-grid gap-2 col-6 mx-auto">
                        </div>
                    </div>
            </div>
            <br />

        </div>
        <Modal
                estado={modalUpdate}
                cambiarEstado={setModalUpdate}
            >
            <Contenido>
                <h1>Recuperar contraseña</h1>
                <div className="form-floating mb-3">
                        <input 
                        className="form-control"
                        onChange={(e)=>handleRecovery(e)}/>
                        <label htmlFor="floatingInput">Correo de usuario</label>
                    </div>
                <div className='row'>
                    <Boton onClick={()=>recovery()}>Enviar un correo</Boton>
                </div>
            </Contenido>
        </Modal>
    </div>
    )
}


const Boton = styled.button`
	display: block;
	padding: 10px 30px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #1766DC;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;

	&:hover {
		background: #0066FF;
	}
`;

const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;