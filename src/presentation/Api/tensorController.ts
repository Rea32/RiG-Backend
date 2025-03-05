import { Request, Response } from "express";
import axios from 'axios';
import { envs } from "../../config";



export class TensorController{
    constructor(){}

    trainModel = async (req: Request, res:Response) => {

        const { inputs, outputs } = req.body;
        console.log(inputs)
        console.log(outputs)



      
    }

   

}