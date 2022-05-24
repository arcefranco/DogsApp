const { Router } = require('express');
const axios  = require('axios');
const {Breed, Temperament} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApi = async () => {
    const apiData = await axios.get('https://api.thedogapi.com/v1/breeds')
    const info = await apiData.data.map(e => {
       return {
           name: e.name,
           weight: e.weight.metric,
           height: e.height.metric,
           breed: e.breed_group,
           life: e.life_span,
           temperament: e.temperament,
           image: e.image.url,
           id: e.id
       }

    })
    return info
}

const getDb = async () => { //select * from breeds, temperaments;
    return await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAll = async () => {
    let apiData = await getApi()
    let dbData = await getDb()
    let total = apiData.concat(dbData)
    return total
}
//Obtener un listado de las razas de perro
//Debe devolver solo los datos necesarios para la ruta principal
router.get('/dogs', async (req, res) => {
    let total = await getAll()
    const name = req.query.name
    if (name){
        let thisDog = await total.filter(e=> e.name.toLowerCase() === name.toLowerCase())
        if(thisDog.length){
            res.status(200).send(thisDog)
        }else{
            res.status(404).send('Dog not found')
        }
    }else{
        res.status(200).send(total)
    } 
    

})
//Obtener todos los temperamentos posibles
//En una primera instancia deberán obtenerlos desde la API externa 
//y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/temperament', async (req, res)=> {
    let allDogs = await getAll()
    var array = []
    let filterTemperament = allDogs.map(e=> {
        var str = e.temperament
        if(typeof str === 'string'){
            array.push(str.split(', '))
        }else{
            console.log(str)
        }
    })
   var apiTemperament = array.flat()
    apiTemperament.forEach(e => {
        Temperament.findOrCreate({
            where: {name: e}
        })
    })
    const allTemperaments = await Temperament.findAll()
        res.send(allTemperaments)
  
})


//Recibe los datos recolectados desde el formulario controlado de la ruta 
//de creación de raza de perro por body
//Crea una raza de perro en la base de datos

router.post('/dog', async (req,res)=> {
let {name, height, weight, life_span, temperaments, img} = req.body
if(!name || !height || !weight || !life_span){
    res.send('Error: fields must be completed')
}
let newBreed = await Breed.create({
    name,
    height,
    weight,
    life_span,
    img
    
})
let dbTemperament = await Temperament.findAll({
    
    where: {
        name: temperaments
    }
})
newBreed.addTemperament(dbTemperament)
res.send("new breed added")
})

//Obtener el detalle de una raza de perro en particular
//Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
//Incluir los temperamentos asociados

router.get('/dogs/:idRaza', async (req,res)=> {
    let {idRaza} = req.params
    let allBreeds = await getAll()
    if(idRaza){
        let foundBreed = await allBreeds.filter(e=> e.id == idRaza) // == , NO ===
        if (foundBreed.length>=1){
            res.send(foundBreed)
        }else{
            res.send('breed does not exist')
        }
        
    }
    else{
        res.send('breed not found')
    }

})

router.delete('/:id', async function (req, res) {
    let {id} = req.params
    await Breed.destroy({
        where: {
          id: id
        }
      })
    res.send('Got a DELETE request at /id');
  });
module.exports = router;
