import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import loggo3 from "../../assets/loggo3.png";



export default function ViewWord() {

    const { id } = useParams();
    // const onlyNumbers = Number(id?.replace(/[^0-9]+/g, ""))
    // console.log(onlyNumbers);

    const books = useSelector(state=> state.booksInfoReducer?.booksCopy)
    const word = books?.find(el => el.name===id)

    return (
        <div style={{display:'flex', position:'absolute', width:'100%', height:'100%', flexDirection:'column'}} id='paginaprincipal'>
            <Link to="/pageFilters" className="logo-back">
                {/* Imagen  */}
                <img
                    src={loggo3}
                    width="250"
                    height="70"
                    alt='prolem'
                    />
            </Link>
            <iframe src={`https://drive.google.com/file/d/${word.URL}/preview`} title={word.id} width='100%' height='100%'></iframe>
        </div>
    )
}
