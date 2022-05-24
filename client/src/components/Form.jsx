import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { createBreed, getTemperaments, cleanUp, getAll } from '../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles/Form.module.css'
import validate from '../auxiliar/validate.js'


export default function Form(){
    
    
    let history= useHistory()
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getTemperaments())
        return () => {
            dispatch(cleanUp())
          };
    }, [])


    const temperaments = useSelector(state => state.temperaments)
    const [input, setInput] = useState({
        name: "",
        heightMin: "",
        heightMax:"",
        height: "",
        weightMin: "",
        weightMax:"",
        weight: "",
        img:"",
        life_span: "",
    
        temperaments: [],
      

    })
    const[errors, setErrors] = useState({})


 const handleChange = (e) => {
     setInput({
         ...input,
         height: input.heightMin + ' - ' + input.heightMax,
         weight: input.weightMin + ' - ' + input.weightMax,
         [e.target.name]: e.target.value
     })
     setErrors(validate({
         ...input,
         [e.target.name]: e.target.value
     }))
     console.log(input)
     console.log(errors)
 }

 const handleCheck = (e) => {
     if(e.target.checked){
        
         setInput({
             ...input,
             temperaments: [...input.temperaments, e.target.value]
           
         })
     }
     if(!e.target.checked){
         input.temperaments.pop()
         setInput({
             ...input,
             temperaments: [...input.temperaments]
         })
     }
     console.log(input)
 }
 const handleSubmit = (e) => {
     e.preventDefault()
    if(!Object.keys(errors).length){
    
    dispatch(createBreed(input))
     alert('Dog created!')
     setInput({
        name: "",
        heightMin: "",
        heightMax:"",
        height:"",
        weightMin: "",
        weightMax:"",
        weight:"",
        life_span: "",
        img:"",
        temperaments: [],
      

    })
    dispatch(getAll()) 
    history.push('/main')
    }else{
        alert('Fields must be completed')
    }
    
 }
return(
    <div className={styles.container}>
        <Link to={'/main'}><button className={styles.button}> Back</button></Link>
        <h1>Create your own breed!</h1>

        <form onSubmit={e=> handleSubmit(e)}>
            <div className={styles.form}>
                <div className={styles.inputs}>
            <section><label>Name: </label>    
                <input type="text" value={input.name} name= "name" onChange={(e)=> handleChange(e)} />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
                </section>
            <section>
                        
            <label>Height(min): </label>
                <input type="text" value={input.heightMin} name= "heightMin" onChange={(e)=> handleChange(e)} />
                {errors.heightMin && <p className={styles.error}>{errors.heightMin}</p>}
            </section>
            <section>
                    <label>Height(max): </label>
                <input type="text"  value={input.heightMax} name= "heightMax" onChange={(e)=> handleChange(e)}/>
                {errors.heightMax && <p className={styles.error}>{errors.heightMax}</p>}
            </section>
            <section>
                  <label>Weight(min): </label>
                <input type="text" value={input.weightMin} name= "weightMin" onChange={(e)=> handleChange(e)} />
                {errors.weightMin && <p className={styles.error}>{errors.weightMin}</p>}
            
            </section>
            <section>
                
            <label>Weight(max): </label>
                <input type="text"  value={input.weightMax} name= "weightMax" onChange={(e)=> handleChange(e)}/>
                {errors.weightMax && <p className={styles.error}>{errors.weightMax}</p>}
            </section>
            <section>
                  <label>Life span: </label>
                <input type="text" value={input.life_span} name="life_span" onChange={(e)=> handleChange(e)}/>
                {errors.life_span && <p className={styles.error}>{errors.life_span}</p>} 
            </section>
            <section>
                  <label>Image Url (optional): </label>
                <input type="text" value={input.img} name="img" onChange={(e)=> handleChange(e)}/>
               
            </section>

                </div>
                <br />
                <span>How would you describe your dog personality?</span>
                <br /><br />
                <div className={styles.checkbox}>
            {
                
                temperaments.map((e, index)=>(
                <label key={e.id}>
                   <input type="checkbox" name={e.name} value={e.name} onChange={(e)=> handleCheck(e)}/>
                   {e.name}
               </label>  
                ))
            
            }
            </div>
            </div>
            <br />
            <button className={styles.button} type='submit'>Create Breed</button>
        </form>

    </div>

)
}