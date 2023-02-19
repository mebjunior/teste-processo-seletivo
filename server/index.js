const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const db_dados = mysql.createPool({
    host: 'mysql_db',
    user: 'root',
    password: 'MYSQL_ROOT_PASSWORD'
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Backend App')
})


//GET ALL
app.get('/getAll', (req, res) => {
    const id = req.params.id
    const queryDados =
        "SELECT dd.id, \
        dd.nome, ld.nome as nome_legado, \
        dd.cpf_cnpj, ld.cpf_cnpj as cpf_cnpj_legado, \
        dd.nome_logradouro, ld.nome_logradouro as nome_logradouro_legado, \
        dd.numero, ld.numero as numero_legado, \
        dd.complemento, ld.complemento as complemento_legado, \
        DATE_FORMAT(dd.data_nascimento, '%d/%m/%Y') as data_nascimento, DATE_FORMAT(ld.data_nascimento, '%d/%m/%Y') as data_nascimento_legado \
        FROM dados.dados dd \
        INNER JOIN legado.dados ld on ld.id = dd.id";
    db_dados.query(queryDados, (err, result) => {
        res.send(result)
    })
})


//GET DADOS
app.get('/get/:id', (req, res) => {
    const id = req.params.id
    const queryDados =
        "SELECT dd.id, \
        dd.nome, ld.nome as nome_legado, \
        dd.cpf_cnpj, ld.cpf_cnpj as cpf_cnpj_legado, \
        dd.nome_logradouro, ld.nome_logradouro as nome_logradouro_legado, \
        dd.numero, ld.numero as numero_legado, \
        dd.complemento, ld.complemento as complemento_legado, \
        DATE_FORMAT(dd.data_nascimento, '%d/%m/%Y') as data_nascimento, DATE_FORMAT(ld.data_nascimento, '%d/%m/%Y') as data_nascimento_legado \
        FROM dados.dados dd \
        INNER JOIN legado.dados ld on ld.id = dd.id \
        WHERE dd.id = ?";
    db_dados.query(queryDados, [id], (err, result) => {
        res.send(result)
    })
})

//UPDATE DADOS
app.put("/update/:id", (req, res) => {
    const dados = {
        nome: req.body.nome !== '' ? req.body.nome : req.body.fetchData[0].nome,
        cpf_cnpj: req.body.cpf_cnpj !== '' ? req.body.cpf_cnpj : req.body.fetchData[0].cpf_cnpj,
        nome_logradouro: req.body.nome_logradouro !== '' ? req.body.nome_logradouro : req.body.fetchData[0].nome_logradouro,
        numero: req.body.numero !== '' ? req.body.numero : req.body.fetchData[0].numero,
        complemento: req.body.complemento !== '' ? req.body.complemento : req.body.fetchData[0].complemento,
        data_nascimento: req.body.data_nascimento !== '' ? req.body.data_nascimento : req.body.fetchData[0].data_nascimento
    }
    const id = req.params.id;
    const UpdateQuery = "UPDATE dados.dados SET nome = ?, cpf_cnpj = ?,  nome_logradouro = ?, numero = ?, complemento = ?, data_nascimento = ? WHERE id = ?";
    db_dados.query(UpdateQuery, [dados.nome, dados.cpf_cnpj, dados.nome_logradouro, dados.numero, dados.complemento, dados.data_nascimento, id], (err, result) => {
        if (err) console.log(err)
    })
})

app.listen('3001', () => { })