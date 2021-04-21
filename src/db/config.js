const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // Importa a função open do módulo sqlite

// Função que abre a conecção com o banco de dados
module.exports = () => open({
    filename: './database.sqlite', // Cria o arquivo onde serão armazenadas as informações
    driver: sqlite3.Database
})