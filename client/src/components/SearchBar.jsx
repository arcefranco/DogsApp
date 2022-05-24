import React from 'react'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import { getDogName } from '../redux/actions'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

function handleInputChange(e){
    setName(e.target.value)
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getDogName(name))
}

    return(
        <div>
            <input type="text" placeholder='Buscar...' value={name} onChange={(e)=> handleInputChange(e)}></input>
            <button type='submit' onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
    )
}