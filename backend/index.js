import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import pg from 'pg';
import cors from 'cors';

const { Client } = pg;
const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
});

conectar();

async function conectar(){
    await client.connect();
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/svg/:estado/:municipio', async (req, res) => { 
    try {
        const { estado, municipio } = req.params;

        if (!estado || !municipio) {
            return res.status(400).json({ error: "Estado ou município não fornecido." });
        }

        const pathEstado = await client.query(
            'SELECT ST_AsSVG(geom) AS st_assvg FROM estado WHERE nome ilike $1', [estado]
        );

        const pathMunicipio = await client.query(
            'SELECT ST_AsSVG(geom) AS st_assvg FROM municipio WHERE nome ilike $1', [municipio]
        );

        const viewBox = await client.query(
            'SELECT getViewBox($1) AS getviewbox FROM estado WHERE nome ilike $1', [estado]
        );

        if (!pathEstado.rows.length) {
            return res.status(404).json({ error: "Estado não encontrado." });
        }

        if (!pathMunicipio.rows.length) {
            return res.status(404).json({ error: "Município não encontrado." });
        }

        if (!viewBox.rows.length) {
            return res.status(404).json({ error: "ViewBox não encontrado." });
        }

        res.json({
            pathestado: pathEstado.rows[0].st_assvg,
            pathmunicipio: pathMunicipio.rows[0].st_assvg,
            viewBox: viewBox.rows[0].getviewbox,
        });
    } catch (error) {
        console.error("Erro ao buscar SVG:", error.message);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

app.listen(3008, () =>{
    console.log('Aplicação rodando na porta 3008');
});