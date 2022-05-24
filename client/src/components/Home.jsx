import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../components/styles/Home.module.css'

export default function Home(){
    return (
        <div className={styles.container}>
          
            <h1>Welcome to Doggy</h1>
            <Link to={'/main'}>
                <button className={styles.button}>
                      LET'S GO
                </button>
            </Link> 
        
        </div>
    )
}