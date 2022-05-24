import React from "react";
import styles from './styles/Paging.module.css'

export default function Paging({dogsPage, allDogs, paging}){
    let pageNumbers = []
    for(let i= 0; i<=Math.ceil(allDogs/dogsPage); i++){
        pageNumbers.push(i+1)
    }
   
     return(
        <nav >
            <ul className={styles.pagination}>
                {
                     pageNumbers?.map(num=>{
          
                        return(
                             <li key={num}>
                        <button className={styles.button} onClick={()=>paging(num)}>{num}</button>
                        </li>
                        
                        )
                       
                    })
                }
            </ul>
        </nav>
    )   
    
    
    
}