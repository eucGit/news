//npm init 
//git init
//npm install express
//npm install -g nodemon
//npm install ejs
//npm install pg *** antes do testeDB ***
//npm install express-session

//Recuperando módulo de configuração do Server
const app = require('./config/server')

//Recuperando módulo noticias do arquivo mockup
/* const noticias = require('./mockup') */

//Recuperar módulo de conexão com p Postgree
const db = require('./config/dbConnection')

//Rota Home
app.get('/', function(req,res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3', function(error, result){
    res.render('home/index', {noticias: result.rows})
})
})

//Rota Notícias
app.get('/noticias', function(req,res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC', function(error, result){
        //passamos atravez de um JSON todas as notícias
        res.render('news/noticias', {noticias: result.rows})
    })
})

//Rota noticia
app.get('/noticia', function(req, res){
    //Recuperar através do método GET o id
    const id = req.query.id
    db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id], function(error, result){
        res.render('news/noticia', {noticia: result.rows[0]})
    })
})


//Rota de Autenticação
app.post('/admin/autenticar', function(req,res){
    const {usuario,senha} = req.body
    if (usuario == 'admin' && senha == 'admin') {
        req.session.autorized = true
    }
    res.redirect('/admin')
})

//Rota de sair da rota autenticada
app.get('/admin/sair', function(req, res) {
    req.session.destroy(erro => {/* console.log(erro) */})
    res.redirect('/admin')
})

//Rota Admin
app.get('/admin', function(req,res){
    const autorizado = req.session.autorized
    if(autorizado == true) {
        res.render('admin/form_add_noticia',{autorizado: autorizado})
    }
    else {
        res.render('admin/login')
    }
})

//Rota salvar noticia
app.post('/admin/salvar-noticia', function(req,res){
    const {titulo, conteudo} = req.body
    db.query('INSERT INTO noticias(titulo, conteudo) VALUES($1, $2)', [titulo, conteudo],
    function(error,result){
        //redireciona para outra rota e remove as informações do corpo da requisição
        res.redirect('/noticias')
    })
    
})

//Iniciando Servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando com express\nCTRL+C para fechar`)
})