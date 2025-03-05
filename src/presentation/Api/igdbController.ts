import { Request, Response } from "express";
import axios from 'axios';
import { envs } from "../../config";



export class IgdbController{
    constructor(){}

    searchGameIgdb = async (req: Request, res:Response) => {

        const { title } = req.body;
        const clientID = envs.CLIENT_ID;
        const igdbApikey = envs.IGDB_API_KEY;
        try {
            const response = await axios.post(
                'https://api.igdb.com/v4/games',
                `fields name, franchises.name, first_release_date, platforms.name, genres.name, category, screenshots.url, involved_companies.*, themes.name, cover.url, remakes.name, remasters.name, dlcs.name, parent_game.name ;
                 search "${title}"; limit 100;`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': clientID,
                        'Authorization': igdbApikey,
                    }
                }
            );
            console.log("Respuesta API:",response.data)
            return res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    searchGameIgdbByID = async (req: Request, res:Response) => {

        const { id } = req.body;
        const clientID = envs.CLIENT_ID;
        const igdbApikey = envs.IGDB_API_KEY;
        try {
            const response = await axios.post(
                'https://api.igdb.com/v4/games',
                `fields name, franchises.name, first_release_date, platforms.name, genres.name, category, screenshots.url, involved_companies.*, themes.name, cover.url, remakes.name, remasters.name, dlcs.name, parent_game.name ;
                 where id =  ${id};`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': clientID,
                        'Authorization': igdbApikey,
                    }
                }
            );
            console.log("Respuesta API:",response.data)
            return res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from IGDB');
        }
    }

    searchCompaniesIgdb = async (req: Request, res:Response) => {

        const { id } = req.body;
        console.log('ID: ',id)
        const clientID = envs.CLIENT_ID;
        const igdbApikey = envs.IGDB_API_KEY;
        try {
            const response = await axios.post(
                'https://api.igdb.com/v4/companies',
                `fields name; where id = ${id};`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': clientID,
                        'Authorization': igdbApikey,
                    }
                }
            );

            const [desarrolladora] = response.data
            return res.json(desarrolladora);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from IGDB');
        }
    }

}