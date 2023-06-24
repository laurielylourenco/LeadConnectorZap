const {Sequelize, Model, DataTypes, QueryTypes} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const { HOST, USERLOCAL, PASSWORD, DB, DIALECT } = process.env;

const sequelize = new Sequelize(DB, USERLOCAL, PASSWORD, { host: HOST, dialect: DIALECT });

class Form extends Model {}

Form.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  nome: DataTypes.TEXT,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status_email: DataTypes.INTEGER,
  status_ativo: DataTypes.INTEGER,
  status_usuario: DataTypes.INTEGER,
  datacreate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'formulario'
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


module.exports = {
  createCadastro: async (user) => {
    try {
      return await Form.create({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        status_email: 1,
        status_ativo: 1,
        status_usuario: 1
      });
    } catch (error) {
        console.error('Error:', error);
      throw error;
    }
  },
  searchUser: async (user) => {
    try {

      if (user.id) {
        
        return await Form.findByPk(user.id)

      } else {

        return await Form.findByOne({
          where: {
            numero: user.numero
          }
        })

      }


    } catch (error) {
         console.error('Error creating cadastro:', error);
      throw error;
    }
  },
  countUserToday: async () => {


    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    return await sequelize.query(`
          SELECT 
            count(*) 
          FROM formularios
          WHERE 
            EXTRACT(year FROM datacreate) = :year
            AND EXTRACT(month FROM datacreate) = :month  
            AND EXTRACT(day FROM datacreate) = :day
      `, {
        replacements: {
        year: ano,
        month: mes,
        day: dia
      }, type: QueryTypes.SELECT
    })


  }
};











