import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";



import Form from "../Form";


configure({ adapter: new Adapter() });

describe("<Form />", () => {
  const state = { dogs: [],
    dogsBackUp: [],
    dog: {},
    temperaments: [], };
  const mockStore = configureStore([thunk]);
 



  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let form;
    let store = mockStore(state);
    beforeEach(() => {
      form = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/dog/:id"]}>
            <Form />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(form.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Name: "', () => {
      expect(form.find("label").at(0).text()).toEqual("Name: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(form.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Height(min): "', () => {
      expect(form.find("label").at(1).text()).toEqual("Height(min): ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "heightMin"', () => {
      expect(form.find('input[name="heightMin"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Height(max): "', () => {
      expect(form.find("label").at(2).text()).toEqual("Height(max): ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "heightMax"', () => {
      expect(form.find('input[name="heightMax"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create"', () => {
      expect(form.find('button[type="submit"]')).toHaveLength(1);
      expect(form.find("button").at(1).text()).toEqual("Create Breed");
    });
  });



})