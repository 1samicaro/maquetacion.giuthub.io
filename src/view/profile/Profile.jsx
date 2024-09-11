import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Profile.css'
// import logo from '../../assets/logoblack.png'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import loggo from "../../assets/loggo.png";

import { editProfile } from '../../services/editProfileService';

import Spinner from 'react-bootstrap/Spinner';


// import { moneyTransfer, sendPoint } from '../../services/ventaService'
// import { getSearchPerson } from '../../services/searchPersonService'
// import { DebounceInput } from 'react-debounce-input'
import { infoUser, userLogOut } from '../../stateManagement/actions/infoUserAction'
import Modal from '../../components/Modal'
// import { infoLoad } from '../../services/userServices'
// import { getIdCity } from '../../stateManagement/actions/IDCityAction'
// import { getMaxLoan, postLoan } from '../../services/loanServices'
// import { transactionsHistory } from '../../stateManagement/actions/getTrasactions';

export default function Profile() {

    const initialStatePB = {
        username: "",
        points: 0,
    };
    const initialState = {
        username: "",
        money:0,
        points: 0,
        categoryId : 0,
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(state=>state.infoUserReducer?.user)
    const token = useSelector(state=>state.infoUserReducer?.token?.token)
    // const user = useSelector(state=>state.infoUserReducer.user.token)
    let discount ={}
    if(userInfo.discount){
        // setDiscount(userInfo.discount)
        discount=userInfo.discount
    }

    const [input, setInput] = useState({})
    const [changePassword, setChangePassword] = useState(false)
    const [pass, setPassword] = useState()
    const [passValid, setPassValid] = useState(0)
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState({});
    
    const [buttonStop, setButtonStop] = useState(false)

    function passwordComparation(e){
        // const patron =  /(((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]))|((?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]))|((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])))(?=.{8,})/
        const patron =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$"@ñÑç|~€,;:¬`+´[º·_{}!%*?&.¿'¡()=/#-])[A-Za-z\d$@Ññç|"~€,;:¬`+´[º·_{}!%*?&.¿'¡()=/#-]{8,15}/
        // const patron =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if(patron.test(e.target.value)){
            setPassValid(1)
            setPassword(e.target.value)
        }
        else{
            setPassValid(2)
        }
    }
    function passwordVerificated(input, e){
        setPassValid(0)
        setErrors({})
        if(pass===e.target.value){
            setInput(prev=>({...prev, [input]:e.target.value}))
        }
        else{
            setErrors(prev=>({...prev, [input]:"Las contraseñas son diferentes"}))
        }
    }

    const notify = () => {
        toast('Actualización de datos realizada!', {
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

    const [modalUpdate, setModalUpdate] = useState(false)
    
    
    const nameUser = userInfo?.name
    function logOut(){
        dispatch(userLogOut())
        navigate('/')
    }

    async function onSend (e){
        e.preventDefault()
        setButtonStop(true)
        let errores = {}
        // if((input.RoleId === "4" && !input.docs)) errores.docs="Falta documento"
        // if(input.RoleId ==="4" && !input.Categories) errores.Categories="Ingrese servicios que ofrece"
        // if(input.Categories?.length!==Object.keys(input.discount)?.length) errores.discount = "Ingrese descuentos a cada servicio"
        if(Object.keys(errores).length === 0){
            // if(input.RoleId==='4'){
            //     const user = await editProfile(input, token)
            //     if(user.data.message==='User updated'){
            //         notifyVendedor()
            //         setButtonStop(false)
            //         dispatch(userLogOut())
            //         setTimeout(() => {
            //             navigate('/')
            //         }, "3000");
            //     }
            // }
            if(userInfo?.RoleId===3 || userInfo?.RoleId===4){
                const user = await editProfile(input, token)
                if(user.data.message==='User updated'){
                    notify()
                    setButtonStop(false)
                    setTimeout(() => {
                        navigate('/pageFilters')
                    }, "3000");
                }
            }
            // if(userInfo?.RoleId===4){
            //     if(representLastName){
            //         input.representName=[]
            //         input.representName.push(representLastName.lastName)
            //     }
            //     if(representName){
            //         input.representName=[]
            //         input.representName.push(representName.name)
            //     }
            //     const user = await editProfile(input, token)
            //     if(user.data.message==='User updated'){
            //         notify()
            //         setButtonStop(false)
            //         setTimeout(() => {
            //             navigate('/Profile')
            //         }, "3000");
            //     }
            // }
        }
        else{
            setErrors(errores)
        }
    }

    return (

        <div className="contenedor_registro">
            <ToastContainer />
            <nav className="navbar navbar-light mb-5" >
                <Link to="/pageFilters" className="container-fluid">
                    <img
                    src={loggo}
                    width="290"
                    height="550"
                    className="img-fluid d-block mx-auto"
                    alt='logo'
                    />
                </Link>
            </nav>
            <br />   

            <div className="container-fluid"  id="registro">
                <section className='seccion-perfil-usuario'>
                    <div className='container-fluid'>
                        <label className="l-01"> <h2 id="titulo1_"><b>Actualizar información</b> </h2></label>
                        <br />
                        {userInfo.profilePic?<img src={userInfo.profilePic} alt="imagen"/>:<></>}
                        <label className="l-01"> <h4 id="titulo1_">Mis datos personales</h4></label>
                        {userInfo ?
                        <div className='perfil-usuario-footer'
                        id="containerPerfil">
                                <div className='lista-datos' >
                                    <li><i className='icon-imagen'></i> <b>Nombres:</b> {nameUser}</li>
                                </div>
                                <div className='lista-datos'>
                                    <br />
                                {/* {userInfo.RoleId===3 &&
                                <div>
                                    <li id="left"><i className='icon-imagen'></i>Vincula alguien mas, copia el siguiente enlace </li>
                                    <li id="left"><i className='icon-imagen'></i><b>https://www.clubleo.net/SignUp?name={userInfo?.username}</b></li>
                                    <li>y compartelo <button className='btn btn-secondary sm' onClick={copyInvited}><i className="bi bi-copy">copiar</i></button></li>
                                </div>
                                }
                                {userInfo.RoleId===4 &&
                                    <li id="left"><i className='icon-imagen'></i><b></b>Socio</li>
                                } */}
                                </div>
                        </div>
                        // :<Spinner animation="grow" variant="info" />}
                        :<></>}
                        <br />

                        <br />
                    </div>

                    <div  className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Ingresa nueva contraseña</span>

                                <input 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                type={showPass ? "text" : "password"} onChange={(e)=>passwordComparation(e)}
                                />
                            </div>
                     
                    <div  className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Confirma nueva contraseña</span>

                                <input 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                type={showPass ? "text" : "password"} onChange={(e)=>passwordVerificated("password", e)}
                                />
                            </div>
                            {errors.password ? <span className='textError'>{errors.password}</span> : <></>}
                            {passValid===1?<span className='textValid'>Contraseña valida</span> : <></>}
                            {passValid===2?<span className='textError'>La contraseña no se cumple los requisitos</span>:<></>}


                        <div>
                        {/* aqui empieza ese ojo, el onclick es el que hace que se dispare el evento de cambio para ver o no */}
                        <div className="" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                            <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                            </svg>} Ver contraseñas 
                        </div>
                        {!buttonStop? <button className="btn btn-success" onClick={onSend}>Confirmar Cambios</button>: <Spinner animation="grow" variant="info" />}
                        {/* aqui termina */}
                        </div>
                        <br />

                    <br />

                    <div className="container -fluid" id="containerSelect">
                        <div className="row align-items-center" id="eleccion">
                            <div className="row">
                                {/* <Link className="iconos" to='/EditProfile'>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    width="40" height="40" fill="currentColor"
                                    className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                    <br />
                                    <b><h6>Actualizar datos</h6></b>
                                </Link> */}
                                <br />
                                <div align="center">
                                <button className="btn btn-success" id="seguir_1"  onClick={()=>setModalUpdate(!modalUpdate)}>
                                    
                                    <b><h6><b>Cerrar sesión</b></h6></b>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <br />
            <br />
            <br />
            <Modal
                estado={modalUpdate}
                cambiarEstado={setModalUpdate}
            >
                <Contenido>
                    <h1>Salir</h1>
                    <p>¿Estás seguro de cerrar la sesión?</p>
                    <div className='row'>
                        <Boton onClick={()=>logOut()}>Si</Boton>
                        <Boton onClick={()=>setModalUpdate(!modalUpdate)}>No</Boton>
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