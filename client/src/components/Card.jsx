import React from "react";
import { Link } from 'react-router-dom';
import styles from './styles/Card.module.css'
import { useDispatch } from "react-redux";
import {deleteBreed} from '../redux/actions/index'


export default function Card({id, name, image, img, temp, weight, tempDB}){
    var str=""
    tempDB?.map(e=>{
        str= e.name.concat(' ',str)
    })


const dispatch = useDispatch()

function handleDelete(id){
dispatch(deleteBreed(id))
window.location.reload()
}


return(
    <section className={styles.container}>
        <article className={styles.card}>
        <div className={styles.title}>
        <Link to={`/dog/${id}`}><h5>{name}</h5></Link>
        {image && <img src={image} className={styles.img} alt='img_dog'></img>}
        {img && <img src={img} className={styles.img} alt='img_dog'></img>}
       
        </div>

        <div className={styles.info}>
        {tempDB && <button className={styles.btn} onClick={()=>handleDelete(id)}>x</button>}
        <p>{str}</p>
        <p>{temp}</p>
        <p>{weight}kg</p> 
        </div>
       
        </article>
    
    </section>
)
}