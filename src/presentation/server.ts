import express, { Router } from 'express';
import path from 'path';
const cors = require('cors');

interface Options {
    port?: number;
    routes: Router
}

export class Server {

    public readonly app = express();
    public readonly port: number;
    public readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start() {

        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        // Sirve archivos estáticos desde la carpeta build del frontend
        this.app.use(express.static(path.join(__dirname, '..', 'dist')));

        // Manejar todas las demás rutas y servir index.html
        this.app.get('/home', (req, res) => {
            res.sendFile(path.join(__dirname,'..', 'dist', 'index.html'));
        });
        this.app.use(this.routes);

        // this.app.listen( this.port, () =>{
        //     console.log(`Server running on port ${ this.port }`)
        // });
        // Iniciar el servidor y escuchar en el puerto especificado
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`Server running on port ${this.port}`);
        });
        //   this.app.get('/', (req,res)=>{
        //     res.send("Hello World")
        //   })
    }
}