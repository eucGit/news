//Recuperando a classe cliente da bibliioteca pg (desestruturação)
//Objetos ou classes iniciam com maiusculas
const {Client} = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://lfygqmashgkryw:b924bbdeb32783f0c94a821b4bf3de94ab36d1728f77cbb17ba97e38c639c429@ec2-54-204-56-171.compute-1.amazonaws.com:5432/d5sqjcs4at2ba0',
    ssl: {
        rejectUnauthorized: false,
    }
})

client.connect()

module.exports = client
