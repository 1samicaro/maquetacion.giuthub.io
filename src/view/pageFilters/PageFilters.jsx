import React, {useEffect, useState } from 'react'
import Carousel from "react-elastic-carousel";
import { changeLanguageAction } from '../../stateManagement/actions/changeLanguageAction'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../services/bookServices'
import DataTable from '../../components/table/DataTable'
import { booksCopyAction, booksInfo, booksCatalogoAction } from '../../stateManagement/actions/booksInfoAction'
import { ProgressBar } from 'react-loader-spinner'
import { getAuthors, getCountries, getGenres } from '../../services/dataByLanguage'
import { booksAuthors, booksCountries, booksGenres } from '../../stateManagement/actions/stateActions'
import { recomendedAction } from '../../stateManagement/actions/recommendedAction'
import { Link } from 'react-router-dom'
import "./PageFilters.css"
import loggo1 from "../../assets/loggo1.png";
import loggo2 from "../../assets/loggo2.png";

import DataTableFilter from '../../components/table/DataTableFilter';


const breakPoints = [
    { width: 480, itemsToShow: 3 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 6 },
    { width: 1200, itemsToShow: 8 },
];

const languages =[
    {
        name:"Español", 
        id: 1
    }, 
    {
        name:"English",
        id:2
    }, 
    {
        name:"Française",
        id:3
    },
    {
        name:"Italiana",
        id:4
    },
    {
        name:"Português",
        id:5
    }
]

let didInit = false

export default function PageFilters() {
    
    const dispatch = useDispatch()
    
    const languageChange = useSelector(state=> state.changeLanguageReducer?.id)
    
    
    const charge = async () =>{
        setIsLoading(true)
        dispatch(changeLanguageAction(1))
        const [genres, countries, authors, books] = await Promise.all([
            getGenres(languageChange),
            getCountries(languageChange),
            getAuthors(languageChange),
            getBooks(languageChange)
        ]
        )
        dispatch(booksGenres(genres))
        dispatch(booksCountries(countries))
        dispatch(booksAuthors(authors))
        // const books = await getBooks(1)
        if(books?.length>0){
            // dispatch(recomendedAction(recommend))
            if(userInfo.RoleId===3){
                // books.sort((x, y) => x.name.localeCompare(y.name))
                // const demoBooks = books.slice(0,100)
                //dispatch(booksInfo(demoBooks))
                //dispatch(booksCatalogoAction(demoBooks))
                // dispatch(booksCopyAction(demoBooks))
                // dispatch(recomendedAction(recommend))
                setIsLoading(false)
                // const demoBooks = books.slice(0,100)
                const recommend = books.filter(r => r.isFree===true)
                // const filterCountry = demoBooks.filter(g => g.CountryId===17)
                // const filterAuthor = filterCountry.filter(g => g.GenreId===15)
                const image = books.filter(r => r.image!=="")
                dispatch(recomendedAction(image))
                dispatch(booksInfo(recommend))
                dispatch(booksCatalogoAction(recommend))
                dispatch(booksCopyAction(recommend))
            }
            if(userInfo.RoleId===4) {
                // dispatch(booksInfo(books))
                setBusquedaAvanzada(true)
                // dispatch(booksCatalogoAction(books))
                setIsLoading(false)
                // const demoBooks = books.slice(0,40)
                // dispatch(booksInfo(demoBooks))
                const image = books.filter(r => r.image!=="")
                dispatch(recomendedAction(image))
                const filterCountry = books.filter(g => g.CountryId===17)
                const filterAuthor = filterCountry.filter(g => g.GenreId===29)
                dispatch(booksInfo(filterAuthor))
                dispatch(booksCatalogoAction(books))
                dispatch(booksCopyAction(books))
            }
        }
    }
    useEffect(()=> {
        if(!didInit){
            didInit=true        
            charge();}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])
    
    ///aquí en false se muestran todos los libros, en true solo los 100 primeros
    const demo = true
    ////////////

    const [language, setLanguage] = useState("1")
    // const language = useSelector(state=> state.changeLanguageReducer.id)
    const [isloading, setIsLoading] = useState(false)
    // const [predeterminado, setPredeterminado] = useState(false)

    // const [genres, setGenres] = useState([])
    // const [countries, setCountries] = useState([])
    // const [authors, setAuthors] = useState([])
    const [genre, setGenre] = useState(0)
    const [country, setCountry] = useState(0)
    const [author, setAuthor] = useState(0)

    ////para el filtro de la segunda tabla
    // const [genre2, setGenre2] = useState(0)
    // const [country2, setCountry2] = useState(0)
    // const [author2, setAuthor2] = useState(0)

    const [busquedaAvanzada, setBusquedaAvanzada] = useState(false)
    const [catalogo, setCatalogo] = useState(true)
    // const [random, setRandom] = useState([])


    // const books = useSelector(state=> state.booksInfoReducer?.books)
    const booksCopy = useSelector(state=> state.booksInfoReducer?.booksCopy)
    const booksCatalogo = useSelector(state=> state.booksInfoReducer?.booksCatalogo)
    const genres = useSelector(state=> state.stateReducers?.genres)
    const countries = useSelector(state=> state.stateReducers?.countries)
    const authors = useSelector(state=> state.stateReducers?.authors)
    const recommended = useSelector(state=>state.recommendedReducer?.recommended)

    const userInfo = useSelector(state=>state.infoUserReducer?.user)

    const changeLanguage = async (e)=>{
        setIsLoading(true)
        setLanguage(e.target.value)
        dispatch(changeLanguageAction(Number(e.target.value)))
        const books = await getBooks(Number(e.target.value))
        if(books?.length>0){
            if(userInfo.RoleId===3){

                // books.sort((x, y) => x.name.localeCompare(y.name))
                // const demoBooks = books.slice(0,100)
                const recommend = books.filter(r => r.isFree===true)
                const image = books.filter(r => r.image!=="")
                dispatch(recomendedAction(image))
                setIsLoading(false)
                // dispatch(booksInfo(demoBooks))
                const demoBooks1 = books.slice(0,40)
                dispatch(booksInfo(recommend))
                dispatch(booksCatalogoAction(recommend))
                dispatch(booksCopyAction(recommend))
                // dispatch(recomendedAction(recommend))
            }
            if(userInfo.RoleId===4) {
                setBusquedaAvanzada(true)
                setIsLoading(false)
                // dispatch(booksInfo(books))
                // const recommend = books.filter(r => r.isFree===true)
                const demoBooks = books.slice(0,40)
                dispatch(booksInfo(demoBooks))
                dispatch(booksCatalogoAction(books))
                dispatch(booksCopyAction(books))
                const image = books.filter(r => r.image!=="")
                dispatch(recomendedAction(image))
            }
        }
        const [genres, countries, authors] = await Promise.all([
            getGenres(e.target.value),
            getCountries(e.target.value),
            getAuthors(e.target.value),
        ]
        )
        dispatch(booksGenres(genres))
        dispatch(booksCountries(countries))
        dispatch(booksAuthors(authors))
    }

    // const charge = () =>{
    //     const demoBooks = booksCopy.slice(0,40)
    //     dispatch(booksInfo(demoBooks))
    //     dispatch(booksCatalogoAction(booksCopy))
    // }
    // useEffect(()=>{
    //     charge()
    // }
    // ,[booksCopy])

    /////Busqueda Rápida
    const send = async () => {
        // setIsLoading(true)
        // setPredeterminado(true)
        if(genre===0 && author===0 && country===0){
            dispatch(booksInfo(booksCopy))
        }
        if(genre!==0 && author===0 && country===0){
            const filterGenre = booksCopy.filter(g => g.GenreId===genre)
            dispatch(booksInfo(filterGenre))
        }
        if(genre===0 && author!==0 && country===0){
            const filterAuthor = booksCopy.filter(g => g.AuthorId===author)
            dispatch(booksInfo(filterAuthor))
        }
        if(genre===0 && author===0 && country!==0){
            const filterCountry = booksCopy.filter(g => g.CountryId===country)
            dispatch(booksInfo(filterCountry))
        }
        if(genre!==0 && author!==0 && country===0){
            const filterAuthor = booksCopy.filter(g => g.AuthorId===author)
            const filterGenre = filterAuthor.filter(g => g.GenreId===genre)
            dispatch(booksInfo(filterGenre))
        }
        if(genre!==0 && author===0 && country!==0){
            const filterCountry = booksCopy.filter(g => g.CountryId===country)
            const filterGenre = filterCountry.filter(g => g.GenreId===genre)
            dispatch(booksInfo(filterGenre))
        }
        if(genre===0 && author!==0 && country!==0){
            const filterCountry = booksCopy.filter(g => g.CountryId===country)
            const filterAuthor = filterCountry.filter(g => g.AuthorId===author)
            dispatch(booksInfo(filterAuthor))
        }
        if(genre!==0 && author!==0 && country!==0){
            const filterCountry = booksCopy.filter(g => g.CountryId===country)
            const filterAuthor = filterCountry.filter(g => g.AuthorId===author)
            const filterGenre = filterAuthor.filter(g => g.GenreId===genre)
            dispatch(booksInfo(filterGenre))
        }
    }
    const restart = () =>{
        setAuthor(0)
        setCountry(0)
        setGenre(0)
        // setPredeterminado(false)
        const filterCountry = booksCopy.filter(g => g.CountryId===17)
        const filterAuthor = filterCountry.filter(g => g.GenreId===29)
        dispatch(booksInfo(filterAuthor))
        // dispatch(booksInfo(booksCopy))
    }

    ///Catalogo ::filtros para la segunda tabla
    // const send2 = async () => {
    //     // setIsLoading(true)
    //     if(genre2===0 && author2===0 && country2===0){
    //         dispatch(booksCatalogoAction(booksCopy))
    //     }
    //     if(genre2!==0 && author2===0 && country2===0){
    //         const filterGenre = booksCopy.filter(g => g.GenreId===genre2)
    //         dispatch(booksCatalogoAction(filterGenre))
    //     }
    //     if(genre2===0 && author2!==0 && country2===0){
    //         const filterAuthor = booksCopy.filter(g => g.AuthorId===author2)
    //         dispatch(booksCatalogoAction(filterAuthor))
    //     }
    //     if(genre2===0 && author2===0 && country2!==0){
    //         const filterCountry = booksCopy.filter(g => g.CountryId===country2)
    //         dispatch(booksCatalogoAction(filterCountry))
    //     }
    //     if(genre2!==0 && author2!==0 && country2===0){
    //         const filterAuthor = booksCopy.filter(g => g.AuthorId===author2)
    //         const filterGenre = filterAuthor.filter(g => g.GenreId===genre2)
    //         dispatch(booksCatalogoAction(filterGenre))
    //     }
    //     if(genre2!==0 && author2===0 && country2!==0){
    //         const filterCountry = booksCopy.filter(g => g.CountryId===country2)
    //         const filterGenre = filterCountry.filter(g => g.GenreId===genre2)
    //         dispatch(booksCatalogoAction(filterGenre))
    //     }
    //     if(genre2===0 && author2!==0 && country2!==0){
    //         const filterCountry = booksCopy.filter(g => g.CountryId===country2)
    //         const filterAuthor = filterCountry.filter(g => g.AuthorId===author2)
    //         dispatch(booksCatalogoAction(filterAuthor))
    //     }
    //     if(genre2!==0 && author2!==0 && country2!==0){
    //         const filterCountry = booksCopy.filter(g => g.CountryId===country2)
    //         const filterAuthor = filterCountry.filter(g => g.AuthorId===author2)
    //         const filterGenre = filterAuthor.filter(g => g.GenreId===genre2)
    //         dispatch(booksCatalogoAction(filterGenre))
    //     }
    // }
    // const restart2 = () =>{
    //     setAuthor2(0)
    //     setCountry2(0)
    //     setGenre2(0)
    //     dispatch(booksCatalogoAction(booksCopy))
    // }

    return (
        <div>
            <br />

            <div>
                <div className="grid3">

                {userInfo.RoleId===6?
                <div className="col">
                        <img
                            src={loggo1}
                            width="250"
                            height="70"
                            alt=''
                        />
                    </div>
                    : <div className="col">
                    {/* Imagen  */}

                        <img
                            src={loggo2}
                            width="250"
                            height="70"
                            alt=''
                        />
                    </div>}


                    {/* <img src="https://drive.google.com/uc?export=view&id=1BC6Ecit3qrOoG8ii2QBmMjjQREzWer6B" alt="img" /> */}


                    {/* {(language==="0" && languageChange===0)&&
                    
                    <div>
                        <h3 id="titulo12">Selecciona el idioma</h3>
                        <div className="form-floating" id="selectidioma">
                            <select name='select' 
                            className="form-control"
                            onChange={(e)=>changeLanguage(e)}>
                                <option value='----'> ---- </option>
                                {languages?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)} 
                            </select>
                            <label htmlFor="floatingInput">Idioma</label>
                        </div>
                    </div>} */}

                    {/* <button  className="btn btn-success" id="botones"  to="/pageFilters"
                            onClick={()=>setBusquedaAvanzada(!busquedaAvanzada)}>Catálogo</button>
                    <button  className="btn btn-success" id="botones"  to="/pageFilters"
                            onClick={()=>setCatalogo(!catalogo)}>Busqueda Avanzada</button> */}

                    {busquedaAvanzada?<div>
                        {(language===1 || languageChange===1)&& 
                            <div className="col">
                                <h3 id="titulo12">Selecciona el idioma</h3>
                                <div className="form-floating">
                                    <select name='select'  
                                    className="form-control"
                                    onChange={(e)=>changeLanguage(e)}>
                                        <option value='0'> ---- 
                                        </option>
                                        {languages?.map((language, index)=> 
                                        <option value={language.id} key={index}>{language.name}</option>)} 
                                        {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                                    </select>
                                    <label htmlFor="floatingInput">Idioma</label>
                                </div>
                            </div>
                        }

                        {(language===2 || languageChange===2) &&
                        
                        <div className="col">
                            <h3 id="titulo12">Select the language</h3> <div className="form-floating" id="selectidioma">
                                <select name='select' 
                                className="form-control"
                                onChange={(e)=>changeLanguage(e)}>
                                    <option value='0'> ---- </option>
                                    {languages?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                    {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                                </select>
                                <label htmlFor="floatingInput">Language</label>
                            </div>
                        </div>}

                        {(language===3 || languageChange===3)&&
                        
                        <div className="col">
                            <h3 id="titulo12">Sélection del'idiome </h3>
                            <div className="form-floating" id="selectidioma">
                                <select name='select' 
                                className="form-control"
                                onChange={(e)=>changeLanguage(e)}>
                                    <option value='0'> ---- </option>
                                    {languages?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                    {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                                </select>
                                <label htmlFor="floatingInput">Idiome</label>
                            </div>
                        </div>}

                        {(language===4 || languageChange===4)&&
                        
                        <div className="col">
                            <h3 id="titulo12">Seleciona o idioma</h3>
                            <div className="form-floating" id="selectidioma">
                                <select name='select' 
                                className="form-control"
                                onChange={(e)=>changeLanguage(e)}>
                                    <option value='0'> ---- </option>
                                    {languages?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                    {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                                </select>
                                <label htmlFor="floatingInput">Idioma</label>
                            </div>
                        </div>}

                        {(language===5 || languageChange===5) &&
                        
                        <div className="col">
                            <h3 id="titulo12">Selezionare la lingua</h3>
                            <div className="form-floating" id="selectidioma">
                                <select name='select' 
                                className="form-control"
                                onChange={(e)=>changeLanguage(e)}>
                                    <option value='0'> ---- </option>
                                    {languages?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                    {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                                </select>
                                <label htmlFor="floatingInput">Lingua</label>
                            </div>
                        </div>}
                    </div>:<></>}



                    
                    <div className="col" align="center">
                                        
                       <Link to={`/profile`}>
                       <svg 
                       xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                       <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                       <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                       </svg>  
                       </Link>
                       <p id= "titulo1_">Perfil</p>
                    </div>
                </div>
            </div>
            <br />

            <div>
                {language===1 &&<h3 id="titulo1">Te recomendamos leer</h3>}
                {language===2 &&<h3 id="titulo1">We recommend you read</h3>}
                {language===3 &&<h3 id="titulo1">Nous vous recommandons de lire</h3>}
                {language===4 &&<h3 id="titulo1">Recomendamos que você leia</h3>}
                {language===5 &&<h3 id="titulo1">Ti consigliamo di leggere</h3>}
                {recommended.length>0? <div className="AppC">
                    <Carousel breakPoints={breakPoints} >
                    {recommended.map(link =>
                        <div className='recommend tamano-2' key={link.id} >
                            <Link to={`/viewWord/${link.name}`}>
                                <figure>

                                    <img src={`https://lh3.google.com/u/0/d/${link.image}`} alt={link.name} />
                                    <figcaption>
                                        <p className='mostrar'>{link.name}</p>
                                    </figcaption>
                                    <p className='mostrar'><string>{link.name}</string></p>
                                </figure>
                                {/* <iframe src={`https://drive.google.com/file/d/${link.URL}/preview`} title={link.name} width="170" height="200" seamless="seamless"></iframe> */}
                            </Link>
                            {/* <p className='mostrar'>{link.name}</p> */}
                        </div>)}
                    </Carousel>
                </div>:<></>}
            </div>
            <br />
            

            {busquedaAvanzada?<div>

                <div>
                    {(language===1 || languageChange===1)&&
                    
                    <div>

                        <h2 id="titulo1">BUSQUEDA AVANZADA</h2>
                        <p id="titulo5">Utiliza uno o más criterios de búsqueda</p>
                        <br />
                        <br />
                        <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">País</label>
                            <select name='select' 
                            className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Autor</label>
                            <select name='select' 
                            className="form-control"
                            value={author}
                            onChange={(e)=>setAuthor(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Género</label>
                            <select name='select' 
                            className="form-control"
                            value={genre}
                            onChange={(e)=>setGenre(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>
            
                        <div className="col">
                        <button  className="btn btn-success" id="botones"  to="/pageFilters"
                            onClick={send}> <b>Aplicar Filtros</b> </button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones"  to="/pageFilters"
                            onClick={restart}> <b>Restaurar Filtros</b> </button>
                        </div>
                        </div>

                    </div>}
                </div>

                <div>
                    {(language===2 || languageChange===2) &&
                    
                    
                    <div>

                        <h3 id="titulo1">ADVANCED SEARCH</h3>
                        <p id="titulo5">Use one or more search criteria</p>
                        <br />
                        <br />
                        <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Country</label>
                            <select name='select' 
                            className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="floatingInput" id="titulo4">Author</label>
                            <select name='select' 
                            className="form-control"
                            value={author}
                            onChange={(e)=>setAuthor(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Genre</label>
                            <select name='select' 
                            className="form-control"
                            value={genre}
                            onChange={(e)=>setGenre(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col" id="selectores">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send}> <b>Apply Filters</b> </button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart}> <b>Restart Filters</b> </button>
                        </div>    

                        </div>
                    </div>}
                </div>

                <div>
                    {(language===3 || languageChange===3) &&
                    
                    <div>

                        <h3 id="titulo1">RECHERCHE AVANCÉE</h3>
                        <p id="titulo5">Utiliser un ou plusieurs critères de recherche</p>
                        <br />
                        <br />
                        <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Pays</label>
                            <select name='select' 
                            className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Auteur</label>
                            <select name='select' 
                            className="form-control"
                            value={author}
                            onChange={(e)=>setAuthor(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Genre</label>
                            <select name='select' 
                            className="form-control"
                            value={genre}
                            onChange={(e)=>setGenre(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send}> <b>Appliquer des filtres</b> </button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart}> <b>Redémarrer les filtres</b> </button>
                        </div>    

                        </div>  
                    </div>}
                </div>

                <div>
                    {(language===4 || languageChange===4) &&   
                    <div>
                        <h3 id="titulo1">PESQUISA AVANÇADA</h3>
                        <p id="titulo5">Use um ou mais critérios de pesquisa</p>
                        <br />
                        <br />
                        <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4"> País</label>
                            <select name='select' 
                            className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Autor</label>
                            <select name='select' 
                            className="form-control"
                            value={author}
                            onChange={(e)=>setAuthor(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Gênero</label>
                            <select name='select' 
                            className="form-control"
                            value={genre}
                            onChange={(e)=>setGenre(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send}> <b>Aplicar Filtros</b> </button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart}>  <b>Reiniciar Filtros</b></button>
                        </div>    

                        </div>    
                    </div>}
                </div>
                
                <div>
                    {(language===5 || languageChange===5) &&
                    
                    <div>
                        <h3 id="titulo1">RICERCA AVANZATA</h3>
                        <p id="titulo5">Utilizza uno o più criteri di ricerca</p>
                        <br />
                        <br />
                        <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Paese</label>
                            <select name='select' 
                            className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Autore</label>
                            <select name='select' 
                            className="form-control"
                            value={author}
                            onChange={(e)=>setAuthor(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4"> Genere</label>
                            <select name='select' 
                            className="form-control"
                            value={genre}
                            onChange={(e)=>setGenre(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                                {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                            </select>
                        </div>

                        <div className="col">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send}> <b>Applica filtri</b> </button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart}> <b>Riavvia i filtri</b></button>
                        </div>
                        </div>
                    </div>}
                </div>
            </div>:
            <div>
                {(language===1 || languageChange===1)&&
                
                <div>

                    <h2 id="titulo1">BUSQUEDA AVANZADA</h2>
                    <p id="titulo5">Utiliza uno o más criterios de búsqueda</p>
                    <br />
                    <br />
                    <div className="grid1">
                    <div className="col" id="selectores">
                        <label htmlFor="floatingInput" id="titulo4">País</label>
                        <select name='select' 
                        className="form-control"
                        value={country}
                        onChange={(e)=>setCountry(Number(e.target.value))}>
                            <option value='0'> ---- </option>
                            {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                        </select>
                    </div>

                    <div className="col" id="selectores">
                        <label htmlFor="floatingInput" id="titulo4">Autor</label>
                        <select name='select' 
                        className="form-control"
                        value={author}
                        onChange={(e)=>setAuthor(Number(e.target.value))}>
                            <option value='0'> ---- </option>
                            {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                        </select>
                    </div>

                    <div className="col" id="selectores">
                        <label htmlFor="floatingInput" id="titulo4">Género</label>
                        <select name='select' 
                        className="form-control"
                        value={genre}
                        onChange={(e)=>setGenre(Number(e.target.value))}>
                            <option value='0'> ---- </option>
                            {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            {/* {languages?.map((country)=> <option value={country.id} key={country.id}>{country.name}</option>)}  */}
                        </select>
                    </div>
        
                    <div className="col">
                    <button  className="btn btn-success" id="botones"  to="/pageFilters"
                        onClick={send}> <b>Aplicar Filtros</b> </button>
                        <br />
                        <br />
                    <button className="btn btn-success" id="botones"  to="/pageFilters"
                        onClick={restart}> <b>Restaurar Filtros</b> </button>
                    </div>
                    </div>

                </div>}
            </div>
            }

            <div className='row justify-content-center '>
                {isloading===true? <ProgressBar
                    height="250"
                    width="250"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperclassName="progress-bar-wrapper"
                    borderColor = '#F4442E'
                    barColor = '#51E5FF'
                />:<></>}
            </div>

            {(booksCatalogo?.length>0 && isloading===false)?<DataTableFilter />:<></>}
            
            
            {/* {busquedaAvanzada?
            <div>
                {(books?.length>0 && books?.length<=40)? 
                    <div className="card-images">
                        {books.map(link =>
                        <div key={link.id} className="card bg-black">
                            <Link to={`/viewWord/${link.id}`} className="card-body" align="center" id="title-center">
                                <iframe src={`https://drive.google.com/file/d/${link.URL}/preview`} title={link.name} width="100%" height="200" frameborder="0px"></iframe>
                                <p className="p-white">{link.name}</p>
                            </Link>
                        </div>)}
                    </div>:<></>
                }
            </div>:<></>
            } */}
            {catalogo?
            <div >
                <div>
                    {(language===1 || languageChange===1)&&
                    
                    <div>

                        <h2 id="titulo1">Catálogo</h2>
                        <p id="titulo5">Para organizar por orden alfabético dar clic en el título de la tabla de la columna que desee ver en orden</p>
                        <br />
                        <br />
                        {/* <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">País</label>
                            <select name='select' 
                            className="form-control"
                            value={country2}
                            onChange={(e)=>setCountry2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Autor</label>
                            <select name='select' 
                            className="form-control"
                            value={author2}
                            onChange={(e)=>setAuthor2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Género</label>
                            <select name='select' 
                            className="form-control"
                            value={genre2}
                            onChange={(e)=>setGenre2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>
            
                        <div className="col">
                        <button  className="btn btn-success" id="botones"  to="/pageFilters"
                            onClick={send2}>Aplicar Filtros</button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones"  to="/pageFilters"
                            onClick={restart2}>Restaurar Filtros</button>
                        </div>
                        </div> */}

                    </div>}
                </div>

                <div>
                    {(language===2 || languageChange===2) &&
                    
                    
                    <div>

                        <h3 id="titulo1">Catalogue</h3>
                        <p id="titulo5">Use one or more search criteria</p>
                        <br />
                        <br />
                        {/* <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Country</label>
                            <select name='select' 
                            className="form-control"
                            value={country2}
                            onChange={(e)=>setCountry2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="floatingInput" id="titulo4">Author</label>
                            <select name='select' 
                            className="form-control"
                            value={author2}
                            onChange={(e)=>setAuthor2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Genre</label>
                            <select name='select' 
                            className="form-control"
                            value={genre2}
                            onChange={(e)=>setGenre2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col" id="selectores">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send2}>Apply Filters</button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart2}>Restart Filters</button>
                        </div>    

                        </div> */}
                    </div>}
                </div>

                <div>
                    {(language===3 || languageChange===3) &&
                    
                    <div>

                        <h3 id="titulo1">Catalogue</h3>
                        <p id="titulo5">Utiliser un ou plusieurs critères de recherche</p>
                        <br />
                        <br />
                        {/* <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Pays</label>
                            <select name='select' 
                            className="form-control"
                            value={country2}
                            onChange={(e)=>setCountry2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Auteur</label>
                            <select name='select' 
                            className="form-control"
                            value={author2}
                            onChange={(e)=>setAuthor2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Genre</label>
                            <select name='select' 
                            className="form-control"
                            value={genre2}
                            onChange={(e)=>setGenre2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send2}>Appliquer des filtres</button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart2}>Redémarrer les filtres</button>
                        </div>    

                        </div>   */}
                    </div>}
                </div>

                <div>
                    {(language===4 || languageChange===4) &&   
                    <div>
                        <h3 id="titulo1">Catálogo</h3>
                        <p id="titulo5">Use um ou mais critérios de pesquisa</p>
                        <br />
                        <br />
                        {/* <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4"> País</label>
                            <select name='select' 
                            className="form-control"
                            value={country2}
                            onChange={(e)=>setCountry2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Autor</label>
                            <select name='select' 
                            className="form-control"
                            value={author2}
                            onChange={(e)=>setAuthor2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Gênero</label>
                            <select name='select' 
                            className="form-control"
                            value={genre2}
                            onChange={(e)=>setGenre2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send2}>Aplicar Filtros</button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart2}>Reiniciar Filtros</button>
                        </div>    

                        </div>     */}
                    </div>}
                </div>
                
                <div>
                    {(language===5 || languageChange===5) &&
                    
                    <div>
                        <h3 id="titulo1">Catalogare</h3>
                        <p id="titulo5">Utilizza uno o più criteri di ricerca</p>
                        <br />
                        <br />
                        {/* <div className="grid1">
                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Paese</label>
                            <select name='select' 
                            className="form-control"
                            value={country2}
                            onChange={(e)=>setCountry2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {countries?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4">Autore</label>
                            <select name='select' 
                            className="form-control"
                            value={author2}
                            onChange={(e)=>setAuthor2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {authors?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col" id="selectores">
                            <label htmlFor="floatingInput" id="titulo4"> Genere</label>
                            <select name='select' 
                            className="form-control"
                            value={genre2}
                            onChange={(e)=>setGenre2(Number(e.target.value))}>
                                <option value='0'> ---- </option>
                                {genres?.map((language, index)=> <option value={language.id} key={index}>{language.name}</option>)} 
                            </select>
                        </div>

                        <div className="col">
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={send2}>Applica filtri</button>
                            <br />
                            <br />
                        <button className="btn btn-success" id="botones" to="/pageFilters"
                            onClick={restart2}>Riavvia i filtri</button>
                        </div>
                        </div> */}
                    </div>}
                </div>
            
                <div>
                    {(booksCatalogo?.length>0 && isloading===false)?<DataTable />:<></>}
                </div>
            </div>:<></>}
        </div>
    )
}
