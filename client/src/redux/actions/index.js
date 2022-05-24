import axios from 'axios'
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG = 'GET_DOG';
export const CREATE_BREED = 'CREATE_BREED'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BREED= 'FILTER_BREED'
export const FILTER_TEMP ='FILTER_TEMP'
export const SORT_ALF = 'SORT_ALF'
export const DELETE_FROM = 'DELETE_FROM'
export const GET_DOG_NAME ='GET_DOG_NAME'

export const getAll = () => dispatch => {
    return fetch(`http://localhost:3001/dogs`)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: GET_ALL_DOGS, payload: json });
          });
};

export const getDog = (id) => dispatch => {  
    
    return fetch(`http://localhost:3001/dogs/${id}`)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: GET_DOG, payload: json });
          });};

          export const getDogName = (name) => dispatch => {  
    
            return fetch(`http://localhost:3001/dogs?name=${name}`)
                  .then(response => response.json())
                  .then(json => {
                    dispatch({ type: GET_DOG_NAME, payload: json });
                  });};



export const getTemperaments = () => dispatch => {
  return fetch('http://localhost:3001/temperament')
          .then(response => response.json())
          .then(json => {
            dispatch({ type: GET_TEMPERAMENTS, payload: json });
          });
}
export const deleteBreed = (id) => async (dispatch) => {
  await fetch(`http://localhost:3001/${id}/`, {
    method: "DELETE",
  });
  dispatch({
    type: DELETE_FROM,
    payload: id,
  });
};

export const filterBreed = (payload) => {
  return{
    type: FILTER_BREED,
    payload
  }
}

export const filterTemp = (payload) => {
  return {
    type: FILTER_TEMP,
    payload
  }
}

export const filterDB = (payload) => {
  return{
    type: 'FILTER_DB',
    payload
  }
}

export const sortAlf = (payload) => {
  return {
    type: SORT_ALF,
    payload
  }
}
export const createBreed = (payload) => {
  return async function(dispatch){
    const res = await axios.post('http://localhost:3001/dog', payload)
    return res
  }
}


export const cleanUp = () => {
 let action = {
   type: 'CLEAN_UP'

 }
 return action
}