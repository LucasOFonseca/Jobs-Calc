const express = require("express") // require() importa para o arquivo bibliotecas necessárias, corresponde ao #include (precisa ser armazenado em uma var constante)
const routes = require("./routes") // Importa "routes.js" para o arquivo
const path = require("path")
const server = express() // Constante correspondente ao objeto "server" que tem como propriedades as funcções do express

/*----------------------------------------------------------------
** set() "Seta" uma determinada configuração para o servidor
** 'view engine' parâmetro que atribui uma engine de visualização
*/
server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views')) // Muda a Localização da pasta views

server.listen(3000, () => console.log('rodando')) // listen() recebe como atributo uma porta para abrir e uma função para enviar ao servidor

/*----------------------------------------------------------------
** use() adiciona configurações ao servidor
**
** static() define e habilita os arquivos estáticos, tem como parâmetro o diretório onde se encontram
*/
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true })) // urlencoded() usada para habilitar o uso de "req.body"
server.use(routes) // Usa as rotas do arquivo "routes.js" para exibir as páginas na web