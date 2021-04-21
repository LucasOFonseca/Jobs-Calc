const express = require('express');
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

/*----------------------------------------------------------------
** get() traz para o servidor quando "/" for acessado a partir de uma função um conteúdo a ser exibido na página para o usuário
** Utiliza como parâmetro request e response: um requerimento e uma resposta
**
** sendFile() envia o arquivo que foi passado como parâmetro para a página web, é uma função "response"
**
** render() renderiza o arquivo que foi passado como parâmetro antes de enviar para a página web
*/
routes.get('/', DashboardController.index)
routes.get('/job/:id', JobController.show) 
routes.get('/job', JobController.create) 
routes.get('/profile', ProfileController.index)

// post() método que envia as informações do formulário
routes.post('/job', JobController.save)
routes.post('/profile', ProfileController.update)
routes.post('/job/:id', JobController.update) 
routes.post('/job/delete/:id', JobController.delete) 

module.exports = routes; // Habilita "routes.js" para ser importado para outros projetos