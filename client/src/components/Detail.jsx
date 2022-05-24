import React from "react";
import { useDispatch } from "react-redux";
import {getDog} from '../redux/actions/index'
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import styles from './styles/Detail.module.css'

export default function Detail({match}) {
    
const dispatch = useDispatch() 
const dog = useSelector(state => state.dog)
React.useEffect(() => {
     
    dispatch(getDog(match.params.id));
  },[])

if (dog.length){
 
    var str=""
    dog[0].temperaments?.map(e=>{
        str= e.name.concat(' ',str)
    })
return(
    <div className={styles.container}>
        <Link to={'/main'}><button className={styles.button}>Back</button></Link><br /><br/>
        <div className={styles.info}>
            {dog[0].image && <img src={dog[0].image} alt="img dog" className={styles.img} />}
            {dog[0].img && <img src={dog[0].img} alt="img dog" className={styles.img} />}
            



            <h2>{dog[0].name}</h2>
            <span>Temperament: </span>
            <p>{dog[0].temperament}</p>
            <p>{str}</p>
             <span>Weight: </span>   
            <p>{dog[0].weight}kg</p>
            <span>Height:</span>
            <p>{dog[0].height}cm</p>
            <span>Life: </span>
            {dog[0].life && <p>{dog[0].life} years </p>}
            {dog[0].life_span && <p>{dog[0].life_span} years</p> }
            
        </div>


    </div>
       
    )
}else{
    return(
        <div className={styles.charging}>Cargando...</div>
    )
}
    

    
}