import rootReducer from "../../reducer/index";
import {createBreed, deleteBreed} from "../../actions";


describe("Reducer", () => {
  const state = {
    dogs: [],
    dogsBackUp: [],
    dog: {},
    temperaments: [],
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({  dogs: [],
        dogsBackUp: [],
        dog: {},
        temperaments: [], });
  });
  it('Debería eliminar una raza de nuestro store cuando action type es "DELETE_FROM"', () => {
    const state = {
        dogs: [
            {
            id: 1,    
            name: 'Lenny',
            weight: '15-25',
            height:'40-60',
            life_span:'10-15'
        },
        {
            id: 2,    
            name: 'Mateo',
            weight: '15-25',
            height:'40-60',
            life_span:'10-15'
        }
    ],
        dogsBackUp: [],
        dog: {},
        temperaments: [],
      };
      const result1 = rootReducer(state, {
        type: 'DELETE_FROM',
        payload: 1,
      })
      const result2 = rootReducer(state, {
        type: 'DELETE_FROM',
        payload: 2,
      })
    

      expect(result1).not.toEqual(state);
      expect(result2).not.toEqual(state);
      
      expect(result1).toEqual({
        dogs: [
        {
            id: 2,    
            name: 'Mateo',
            weight: '15-25',
            height:'40-60',
            life_span:'10-15'
        }
    ],
        dogsBackUp: [],
        dog: {},
        temperaments: [],
      })


})


})