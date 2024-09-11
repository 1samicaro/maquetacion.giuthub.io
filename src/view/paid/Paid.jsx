import React, { useEffect, useState } from 'react'
import './Paid.css'
import { Link, json, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import loggo from "../../assets/loggo.png";
import PayPalButton from '../paypal/PayPalButton'
import PayPalButtonPremium from '../paypal/PayPalPremium';
import { initMercadoPago, Payment, Wallet } from '@mercadopago/sdk-react'
import mercadoPago from "../../assets/mercado_pago.png"
import { postLogin } from '../../services/userServices'
import { useDispatch, useSelector } from 'react-redux'
// import Modal1 from '../../components/Modal1';
import Spinner from 'react-bootstrap/Spinner';
import { infoToken, infoUser } from '../../stateManagement/actions/infoUserAction'
import { editProfile, payProfile } from '../../services/editProfileService'
import { mercadoPagoBackBasic, mercadoPagoBackPremium } from '../../services/ventaService'


import excel1 from './Catálogo Biblioteca Básica.xlsx'
import excel2 from './Catálogo Biblioteca Premium.xlsx'





initMercadoPago("APP_USR-7aee5ee2-142b-49d9-9f7e-729f49344057");


function Paid() {

    const [estadoModal1, cambiarEstadoModal1] = useState(false);

    const { state } = useLocation();

    const notify = () => {
        toast('Ya puedes disfrutar de tus libros', {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [basic, setBasic] = useState(false)
    const [premium, setPremium] = useState(false)
    const [mercadoEspera, setMercadoEspera] = useState(true)
    const [mercadoEsperaPremium, setMercadoEsperaPremium] = useState(true)

    const payPalAnswer = useSelector(state=>state.transactionsReducer.payPalAnswer)
    const payPalAnswerPremium = useSelector(state=>state.transactionsReducer?.payPalAnswerPremium)
    const token = useSelector(state=>state.infoUserReducer.token.token)
    // const userInfo = useSelector(state=>state.infoUserReducer.user)
    const pay = async ()=>{
        const user = await postLogin(state);
        if (user.isAuthenticated) {
            user.user.name=user?.user?.name?.reverse().join(" ")
            dispatch(infoUser(user.user))
            dispatch(infoToken(user.token))
            // navigate('/Profile')
        }
    }
    if(state){
        pay()
    }

    //pagos
    const [payPalDivBasic, setPayPalDivBasic] = useState(false)
    const [payPalDivPremium, setPayPalDivPremium] = useState(false)
    const getPayPalDivBasic = (e) =>{
        e.preventDefault()
        setPayPalDivBasic(!payPalDivBasic) 
    }
    const getPayPalDivPremium = (e) =>{
        e.preventDefault()
        setPayPalDivPremium(!payPalDivPremium) 
    }

    const payPalAccept = async () =>{
        let date = ""
        const dateToday = new Date()
        if((dateToday.getMonth())===11 && (dateToday.getDate())===31){
            date = `${(dateToday.getFullYear()+2)}-01-01`
        }
        else if((dateToday.getMonth()+1)<10 && (dateToday.getDate()+1)<10){
            date = `${dateToday.getFullYear()+1}-0${(dateToday.getMonth() + 1)}-0${(dateToday.getDate()+1)}`
        }
        else if((dateToday.getMonth()+1)<10){
            date = `${dateToday.getFullYear()+1}-0${(dateToday.getMonth() + 1)}-${(dateToday.getDate()+1)}`
        }
        else if((dateToday.getDate()+1)<10){
            date = `${dateToday.getFullYear()+1}-${(dateToday.getMonth() + 1)}-0${(dateToday.getDate()+1)}`
        }
        else if ((dateToday.getMonth()+1)>=10 && (dateToday.getDate()+1)>=10){
            date = `${dateToday.getFullYear()+1}-${(dateToday.getMonth() + 1)}-${(dateToday.getDate()+1)}`
        }
        const input = {
            isSuscribed : true,
            suscriptionDate: date
        }
        const user = await payProfile(input, token)
        notify()
        setTimeout(() => {
            navigate('/')
        },"3000");
    }

    const payPalAcceptPremium = async () =>{
        let date = ""
        const dateToday = new Date()
        if((dateToday.getMonth())===11 && (dateToday.getDate())===31){
            date = `${(dateToday.getFullYear()+2)}-01-01`
        }
        else if((dateToday.getMonth()+1)<10 && (dateToday.getDate()+1)<10){
            date = `${dateToday.getFullYear()+1}-0${(dateToday.getMonth() + 1)}-0${(dateToday.getDate()+1)}`
        }
        else if((dateToday.getMonth()+1)<10){
            date = `${dateToday.getFullYear()+1}-0${(dateToday.getMonth() + 1)}-${(dateToday.getDate()+1)}`
        }
        else if((dateToday.getDate()+1)<10){
            date = `${dateToday.getFullYear()+1}-${(dateToday.getMonth() + 1)}-0${(dateToday.getDate()+1)}`
        }
        else if ((dateToday.getMonth()+1)>=10 && (dateToday.getDate()+1)>=10){
            date = `${dateToday.getFullYear()+1}-${(dateToday.getMonth() + 1)}-${(dateToday.getDate()+1)}`
        }
        const input = {
            RoleId:4,
            isSuscribed : true,
            suscriptionDate: date
        }
        
        await payProfile(input, token)
        notify()
        setTimeout(() => {
            navigate('/')
        },"3000");
        
    }

    useEffect(()=> {// eslint-disable-next-line react-hooks/exhaustive-deps
        if(payPalAnswer){
            payPalAccept()
        }
        ;}, [payPalAnswer])

    useEffect(()=> {// eslint-disable-next-line react-hooks/exhaustive-deps
        if(payPalAnswerPremium){
            payPalAcceptPremium()
        }
        ;}, [payPalAnswerPremium])

    const [preferenceId, setPreferenceId] = useState(null)
    const [preferenceIdPremium, setPreferenceIdPremium] = useState(null)

    const createPreference = async () => {
        try {
            const response = await mercadoPagoBackBasic()
            const {id} = response.data.body
            return id;
        } catch (error) {
            console.log(error);
        }
    }
    const createPreferencePremium = async () => {
        try {
            const response = await mercadoPagoBackPremium()
            console.log(response);
            const {id} = response.data.body
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () =>{
        setPreferenceIdPremium(null)
        setMercadoEspera(false)
        const id = await createPreference()
        if(id){
            localStorage.setItem('state',JSON.stringify(state))
            setPreferenceId(id)
            setMercadoEspera(true)
        }
    }
    const handleBuyPremium = async () =>{
        setPreferenceId(null)
        console.log("premium");
        setMercadoEsperaPremium(false)
        const id = await createPreferencePremium()
        if(id){
            localStorage.setItem('pay', JSON.stringify(4))
            localStorage.setItem('state',JSON.stringify(state))
            setPreferenceIdPremium(id)
            setMercadoEsperaPremium(true)
        }
    }

    const [mercadoPagoDiv, setMercadoPagoDiv] = useState(false)
    const getMercadoPagoDiv = (e) =>{
        e.preventDefault()
        setMercadoPagoDiv(!mercadoPagoDiv) 
    }

    const customization = {
        paymentMethods: {
            ticket: "all",
            bankTransfer: "all",
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
    };
    const initialization = {
        amount: 50000,
        preferenceId: "1",
    };

    const onSubmit = () =>{
        console.log("submit");
    }

    const onReady = () =>{
        console.log("ready");
    }
    const onError = () =>{
        console.log("error");
    }

    return (
        <div id="paginasecundaria">
        <ToastContainer />

        <br />

                
        <img
        src={loggo}
        width="300"
        height="200"
        className="img-fluid d-block mx-auto"
        alt='logoMingga'
        />

        <br />


        <div className="container-fluid">
            <h4 id="titulo1_">Realiza tu pago aquí, según el tipo de plan que deseas elegir</h4>
            <br />
            <br />

            <div className="grid">
            <div className="col">
            <br />
            
            <h3 id="titulo1_"> <b>SUSCRIPCIÓN BÁSICA</b> </h3>
            <br />

                
                    <ul>
                        <li> <h5 > <b>Detalle: </b>Suscripción anual a una biblioteca digital con 2.000 libros en español</h5></li>
                        <li><h5 ><b>Precio: </b>$10.000</h5></li>
                        <br />

                        <li><h5>Consulta nuestro cátologo de 2.000 obras → <a href={excel1} download> <b id="titdescargar">Click aquí para descargar</b></a></h5> </li>

                    </ul>
                    <br />

                    <div className="formasPago">
                        <button onClick={getPayPalDivBasic}><img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logotipo_paypal_pagos.png" alt="Payments by PayPal"/></button>
                        {mercadoEspera ? <button className='mercadoPago' onClick={handleBuy}><img src={mercadoPago} alt="Payments by mercado pago"/></button> : <Spinner animation="grow" variant="info" />}
                        {preferenceId && <Wallet initialization={{preferenceId}}/>}
                    </div>

                    {payPalDivBasic? 
                        <div>
                            <PayPalButton totalValue={'2.59'} invoice={'Pago anual Basic Artes Literarias'}/>
                        </div>
                    :<></>}

                


              </div>

              <div className="col">
              <br />
            
              <h3 id="titulo1_"> <b>SUSCRIPCIÓN PREMIUM</b> </h3>
              <br />

                
                    <ul>
                        <li> <h5> <b>Detalle: </b>Suscripción anual a una biblioteca digital con 15.000 libros en 5 idiomas (español, inglés, portugués, italiano y francés)</h5></li>
                        <li><h5><b>Precio: </b>$50.000</h5></li>
                        
                        <br />
                        <li><h5>Consulta nuestro cátologo de 15.000 obras → <a href={excel2} download> <b id="titdescargar">Click aquí para descargar</b></a></h5> </li>
            

                    </ul>

                    <div className="formasPago">
                        <button onClick={getPayPalDivPremium}><img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logotipo_paypal_pagos.png" alt="Payments by PayPal"/></button>
                        {mercadoEsperaPremium ?<button className='mercadoPago' onClick={handleBuyPremium}><img src={mercadoPago} alt="Payments by mercado pago"/></button>:  <Spinner animation="grow" variant="info" />}
                        {preferenceIdPremium && <Wallet initialization={{preferenceIdPremium}}/>}
                    </div>

                    {payPalDivPremium? 
                        <div>
                            <PayPalButtonPremium totalValue={'12.5'} invoice={'Pago anual premium Artes Literarias'}/>
                        </div>
                    :<></>}


             </div>
             </div>


                {/* <Payment
                    initialization={initialization}
                    customization={customization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                /> */}
            </div>
            <br />

             {/*
            <div>
                <br />
                  
                <Link class="btn btn-primary"
                    onClick={()=> cambiarEstadoModal1(!estadoModal1)}
                > <h3>Pago Directo</h3>
                </Link>
                <Modal1 
                    estado={estadoModal1}
                    cambiarEstado={cambiarEstadoModal1}>
                    <h4 align="right">Depósito electrónico</h4>
                    <ul align="right"> 
                    <li align="right">
                    <p>
                    - NEQUI <br />
                    N° 3002673887
                    </p>
                    </li>
                    </ul>
                    <h4 align="right">Transferencia bancaria</h4>
                    <ul align="right"> 
                    <li align="right">
                    <p>
                    - DAVIVIENDA <br />
                    Cuenta de Ahorros N° 0550488425412597
                    </p>
                    </li>
                    <li align="right">
                    <p>
                    - BANCOLOMBIA  <br />
                    Cuenta de Ahorros N° 602-666846-68
                    </p>
                    </li>
                    </ul>
                    <h4 align="right">Pagos fisicos</h4>
                    <ul align="right"> 
                    <li align="right">
                    <p>
                    - Oficina Club Leo<br />
                    </p>
                    </li>
                    <li align="right">
                    <p>
                    - Efecty <br />
                    N° 3002673887 <br />    
                    Cédula N° 1032437031
                    </p>
                    </li>
                    <li align="right">
                    <p>
                    - Baloto  <br />
                    N° 3002673887 <br />
                    Cédula N° 1032437031
                    </p>
                    </li>
                    </ul>
                    <br /> 
                </Modal1>
            </div>
            */}
  

            {/*
            <br />
            <br />
            <div className="aviso">
                <h5>
                    Al elegir el método de pago directo, tu pago será verificado <br />
                    en un plazo máximo de 24 horas y recibirás un correo de <br />
                    bienvenida como nuevo socio de CLUB LEO.
                    <br />
            
                </h5>



            </div>
        */}


            
        </div>
    )
}

export default Paid