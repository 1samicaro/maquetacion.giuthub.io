import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import prolem from "../../assets/prolempng.png";
import { payProfile } from '../../services/editProfileService'
import { postLogin } from '../../services/userServices'
import { useDispatch } from 'react-redux'
import { infoToken, infoUser } from '../../stateManagement/actions/infoUserAction'

export default function SendPay() {

    const dispatch = useDispatch()

    const [state, setState] = useState('')
    const [rol, setRol] = useState('')

    const [stopEffect, setStopEffect] = useState(false)
    const getData = () =>{
        return localStorage.getItem('state')
    }
    const getDataRol = () =>{
        return localStorage.getItem('pay')
    }

    // const pay = async ()=>{
    //     const user = await postLogin(state);
    //     console.log(user);
    //     if (user.isAuthenticated) {
    //         user.user.name=user?.user?.name?.reverse().join(" ")
    //         dispatch(infoUser(user.user))
    //         dispatch(infoToken(user.token))
    //         // navigate('/Profile')
    //     }
    // }
    // if(state){
    //     pay()
    // }
    useEffect(()=>{
            setStopEffect(true)
            setState(JSON.parse(getData()))
            setRol(JSON.parse(getDataRol()))
    }, [])
    console.log(state);

    const pay = async ()=>{
        const user = await postLogin(state);
        console.log(user);
        if (user.isAuthenticated) {
            user.user.name=user?.user?.name?.reverse().join(" ")
            dispatch(infoUser(user.user))
            dispatch(infoToken(user.token))
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
            await payProfile(input, user.token.token)
            // navigate('/Profile')
        }
    }
    if(stopEffect){
        pay()
    }

    // const payPalAccept = async () =>{
    //     console.log("cambiar datos registro");
    //     let date = ""
    //     const dateToday = new Date()
    //     if((dateToday.getMonth())===11 && (dateToday.getDate())===31){
    //         date = `${(dateToday.getFullYear()+2)}-01-01`
    //         console.log(date);
    //     }
    //     else if((dateToday.getMonth()+1)<10 && (dateToday.getDate()+1)<10){
    //         date = `${dateToday.getFullYear()+1}-0${(dateToday.getMonth() + 1)}-0${(dateToday.getDate()+1)}`
    //         console.log(date);
    //     }
    //     else if((dateToday.getMonth()+1)<10){
    //         date = `${dateToday.getFullYear()+1}-0${(dateToday.getMonth() + 1)}-${(dateToday.getDate()+1)}`
    //         console.log(date);
    //     }
    //     else if((dateToday.getDate()+1)<10){
    //         date = `${dateToday.getFullYear()+1}-${(dateToday.getMonth() + 1)}-0${(dateToday.getDate()+1)}`
    //         console.log(date);
    //     }
    //     else if ((dateToday.getMonth()+1)>=10 && (dateToday.getDate()+1)>=10){
    //         date = `${dateToday.getFullYear()+1}-${(dateToday.getMonth() + 1)}-${(dateToday.getDate()+1)}`
    //         console.log(date);
    //     }
    //     const input = {
    //         isSuscribed : true,
    //         suscriptionDate: date
    //     }
    //     const user = await payProfile(input, token)
    //     console.log(user);
    // }

    return (
        <div>
            <Link to="/" className="container-fluid">
                <img
                align="left"
                src={prolem}
                width="340"
                height="600"
                className="img-fluid d-block mx-auto"
                alt='logo'
                />
            </Link>
            <h1>Pago realizado, por favor diríjase de nuevo al principio para poder disfrutar de todos nuestros libros</h1>
        </div>
    )
}