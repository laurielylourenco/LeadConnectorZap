 const db = require('./FormModel.js');

 exports.createInfo = async (req, res) => {

 	try {
 		let usuario = await db.createCadastro({
 			nome: req.body.nome,
 			email: req.body.email,
 			telefone: req.body.telefone
 		})

 		res.status(200).json({
 			status: 'success',
 			dados: usuario
 		});

 	} catch (error) {

 		res.status(400).json({
 			status: "failed",
 			message: error.message
 		})
 	}
 };

 exports.qtdEmailsEnviados = async (req, res, next) => {
 	try {
 		// Código assíncrono
 		// Aguarde uma operação assíncrona aqui, por exemplo, uma consulta ao banco de dados
 		let number = await db.countUserToday();
 		number = number[0].count;
 		if (number > 100) {
 			throw "Limite de emails por dia excedido.Enviaremos seu email no proximo dia!";
 		}
 		// Se tudo estiver certo, chame next() para prosseguir para a próxima middleware
 		next();
 	} catch (error) {
 		// Em caso de erro, passe o erro para o manipulador de erros
 		next({
 			status: 429,
 			message: error
 		});
 	}
 };