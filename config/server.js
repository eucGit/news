/* Módulo de configuração do Server */

//Requisitando a biblioteca Express
const express = require('express')

//Requisitando a biblioteca Session do Express ' OS cookies '
const session = require('express-session')

//Atribuindo a variável app a biblioteca exprexx
const app = express()

//Definir o motor de views como sendo o EJS
app.set('view engine', 'ejs')

//Setar diretório de views EJS
app.set('views', './app/views')

//Configuração dos caminhos dos arquivs estáticos
app.use(express.static('./app/public'))

//configuração do metodo POST
app.use(express.urlencoded({extended: true}))

//Configuração Session
app.use(session({
    secret: 'J#lA0bD!3Ci3OS$Wz', 
    resave: false,
    saveUninitialized: false,

}))

//fazendo a exportação das configurações do sever
module.exports = app