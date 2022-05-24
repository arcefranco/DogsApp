import {GET_ALL_DOGS} from '../actions/index'
import { GET_DOG } from '../actions/index'
import { GET_TEMPERAMENTS, FILTER_BREED, FILTER_TEMP, SORT_ALF, GET_DOG_NAME } from '../actions/index'
const initialState = {
dogs: [],
dogsBackUp: [],
dog: {},
temperaments: [],
}

export default function rootReducer(state= initialState, action) {
switch(action.type) {
    case GET_ALL_DOGS : 
    return{
        ...state,
        dogs: state.dogs.concat(action.payload),
        dogsBackUp: state.dogsBackUp.concat(action.payload)
    }
    case GET_DOG: 
    return{
        ...state,
        dog: action.payload
    }
    case GET_TEMPERAMENTS: 
    return{
        ...state,
        temperaments: state.temperaments.concat(action.payload),
    }
    case 'CREATE_BREED': 
    return{
        ...state
    }
    case FILTER_BREED: 
    const allDogs = state.dogsBackUp
    const filteredBreed = allDogs.filter(e=>e.name===action.payload)
    return{
        ...state,
        dogs: filteredBreed
        
    }
    case GET_DOG_NAME: 

    return{
        ...state,
        dogs: action.payload
    }
    case 'FILTER_DB': 
        var createdFilter
        if(action.payload === 'Created'){
            var createdFilter = state.dogsBackUp.filter(e=> e.inDB)
        }
        else if(action.payload === 'Api'){
            var createdFilter = state.dogsBackUp.filter(e=> !e.inDB)
        }else{
            var createdFilter = state.dogsBackUp
        }
        return{
            ...state,
                dogs:  createdFilter
        }
        
    case FILTER_TEMP:
        const allDogsTemp = state.dogsBackUp
        var array = []
    let filterTemperament = allDogsTemp.map(e=> {
        var str = e.temperament
        if(typeof str === 'string' && str.includes(action.payload)){
            array.push(e)
        }
    })
        
    return{
        ...state,
        dogs: array
    }
    case SORT_ALF:
        function SortArrayAZ(x, y){
            return x.name.localeCompare(y.name);
        }
        function SortArrayZA(x, y){
            return y.name.localeCompare(x.name);
        }
        function SortArrayWA(x, y){
            var weightX = x.weight.split(' - ')
            var weightY = y.weight.split(' - ')
            x = parseInt(weightX[1])
            y= parseInt(weightY[1])
            return x - y
        }
        function SortArrayWD(x, y){
            var weightX = x.weight.split(' - ')
            var weightY = y.weight.split(' - ')
            x = parseInt(weightX[1])
            y= parseInt(weightY[1])
            return y - x
        }
        const allDogsAlf = state.dogsBackUp
        var arrayAlf = []
        if(action.payload === 'A-Z') arrayAlf = allDogsAlf.sort(SortArrayAZ)
        if(action.payload === 'Z-A') arrayAlf = allDogsAlf.sort(SortArrayZA)
        if(action.payload === 'weight asc') arrayAlf = allDogsAlf.sort(SortArrayWA)
        if(action.payload === 'weight desc') arrayAlf = allDogsAlf.sort(SortArrayWD)
        return{
            ...state,
            dogs: arrayAlf
        }
        case 'DELETE_FROM':
        return{
            ...state,
            dogs: state.dogs.filter(e=> e.id !== action.payload)
        }
    case 'CLEAN_UP':
        return{
            ...state,
            dogs: [],
            dogsBackUp:[],
            temperaments:[]
        }

    default: return {...state}
}
    
}
