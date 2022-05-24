import React from 'react';
import {useState} from 'react'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import { getAll, getTemperaments, filterBreed, filterTemp, sortAlf, filterDB } from "../redux/actions/index";
import Card from './Card';
import { cleanUp } from '../redux/actions/index';
import Paging from './Paging';
import {Link} from 'react-router-dom'
import styles from './styles/Main.module.css'
import logo from '../assets/logo.svg'
import SearchBar from './SearchBar';


export default function Main() {
    const dispatch = useDispatch()
    
React.useEffect(()=>{
    Promise.all([dispatch(getAll()), dispatch(getTemperaments())])
        return () => {
            dispatch(cleanUp())
          };
    },[])
const allDogs = useSelector((state) => state.dogs)
const allTemperaments = useSelector((state)=> state.temperaments)
const dogsBackUp = useSelector((state)=> state.dogsBackUp)


const [currentPage, setCurrentPage] = useState(1)
const [dogsPage, setDogsPage] = useState(8)
const [estado, setEstado] = useState('')
const lastDog = currentPage * dogsPage
const firstDog = lastDog - dogsPage
const currentDogs = allDogs.slice(firstDog, lastDog)     

const paging = (pageNum) => {
    setCurrentPage(pageNum)
}

function handleFilterBreed(e){
    if(e.target.value !=='---'){
       dispatch(filterBreed(e.target.value)) 
    }else{
        window.location.reload();
    }
    
}

function handleFilterTemp(e){
    if(e.target.value !== '---'){
        dispatch(filterTemp(e.target.value))
    }else{
         window.location.reload();
    }
}

function handleAlf(e){
    dispatch(sortAlf(e.target.value))
    setCurrentPage(1)
    setEstado(`${e.target.value}`)
}

function handleFilterCreated(e){
dispatch(filterDB(e.target.value))
}


return(
        <div className={styles.container}>
            <header>
            <h1>Doggy App</h1><img src={logo} alt="img_logo"></img>
            </header>
                 <Paging dogsPage={dogsPage}
            allDogs={allDogs.length}
            paging={paging}/>
            <SearchBar/>
           
            <div>
                <Link to={'/form'}>
          
            <button className={styles.button}>Create Breed</button>
            </Link>
            </div>
            <div className={styles.filters}>
                <h4>Filter on: </h4><br />
                <span>Temperaments: </span>
            <select onChange={e=> handleFilterTemp(e)}>
            <option value='---'>---</option>
             {allTemperaments?.map(e=><option key={e.id} value={e.name}>{e.name}</option>)}
            </select>
            <span>Breeds: </span>
            <select onChange={e=> handleFilterBreed(e)}>
                <option value="---">---</option>
                {dogsBackUp?.map(e=><option key={e.id} value={e.name}>{e.name}</option>)}
            </select>
            <select onChange={e=> handleAlf(e)}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="weight asc">Weight (asc)</option>
                <option value="weight desc">Weight (desc)</option>
            </select> <br /><br />           
            <select onChange={e=> handleFilterCreated(e)}>
                <option value="All">All</option>
                <option value="Created">Created</option>
                <option value="Api">Api</option>
            </select>
            </div>
            <div className={styles.dogs}>
                  {
             currentDogs?.map(e=><Card className={styles.col} key={e.id} image={e.image} img={e.img} id={e.id} name={e.name} tempDB={e.temperaments} temp={e.temperament} weight={e.weight}/>)
            }
            </div>
          
        </div>
    );
};