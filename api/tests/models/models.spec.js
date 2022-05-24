const { sequelize } = require('../../src/db.js');
const { Breed } = require('../../src/db.js')
const expect = require('chai').expect;

describe('Model Testing', function() {
    afterAll(async function() {
      await sequelize.sync({ force: true });
      sequelize.close();
    })
    describe('Breed model', function () {
        beforeEach(async function() {
          await Breed.sync({ force: true });
        });
        describe('Validations', function () {
            it('error sin title', function(done) {
               Breed.create({
                name: 'Hola',
               })
                .then(() => done('No debería haberse creado'))
                .catch(() => done());
            });

        })
        


    })
})