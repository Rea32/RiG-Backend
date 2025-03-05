import { Request, Response } from "express";
import axios from 'axios';
const puppeteer = require('puppeteer');



export class HltbController {
    constructor() { }

    searchGameHltb = async (req: Request, res: Response) => {

        const { title } = req.query;
        if (title) {
            return res.status(400).json({ error: 'Missing game title' });
        }
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto('https://howlongtobeat.com');
            await page.type('input[name="q"]', title); // Cambia el selector según la página actual
            await page.click('button[type="submit"]');    // Cambia según el botón actual
            await page.waitForSelector('.search_results_table'); // Ajusta según el contenedor actual

            const results = await page.evaluate(() => {
                const games = Array.from(document.querySelectorAll('.search_list_details'));

                if (games.length === 0) {
                    return []; // Si no hay juegos, retorna un arreglo vacío
                }

                return games.map((game: any) => {
                    const nameElement = game.querySelector('a');
                    const timeElement = game.querySelector('.search_list_tidbit');

                    return {
                        name: nameElement ? nameElement.textContent.trim() : 'N/A',
                        time: timeElement ? timeElement.textContent.trim() : 'N/A',
                    };
                });
            });

            await browser.close();
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: `Scraping failed ${error}` });
        }
    }

    searchEldenRing = async () => {
        const browser = await puppeteer.launch(); // Lanzar el navegador
        const page = await browser.newPage();      // Nueva página

        try {
            await page.goto('https://howlongtobeat.com/?q=elden%2520ring'); // Ir a la URL específica de Elden Ring
            await page.waitForSelector('input[name="q"]'); // Esperar a que aparezca el campo de búsqueda

            // Ingresar el término de búsqueda y enviar el formulario
            await page.type('input[name="q"]', 'elden ring');
            await page.click('button[type="submit"]');
            await page.waitForSelector('.search_results_table',{ timeout: 15000 }); // Esperar los resultados

            // Extraer datos
            const results = await page.evaluate(() => {
                const games = Array.from(document.querySelectorAll('.search_list_details'));
                return games.map((game:any) => ({
                    name: game.querySelector('a')?.textContent.trim() || 'N/A',
                    time: game.querySelector('.search_list_tidbit')?.textContent.trim() || 'N/A',
                }));
            });

            console.log(results); // Imprimir los resultados

            await browser.close(); // Cerrar el navegador
        } catch (error) {
            console.error('Error:', error);
            await browser.close(); // Cerrar el navegador en caso de error
        }
    }



}