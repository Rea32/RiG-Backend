
import { PublisherModel } from "../data/mongodb/models/publisher.model";
import { GameEntity } from "../domain";


export const findAndAddPublisher = async (game: GameEntity) => {
    try {
        const publishers = await PublisherModel.find({});
        if (!publishers) return;
        // console.log('Game Publishers: ', game)
        const newPublishers = game.editoras.filter((gamePublisher: any) => publishers.some((publisher: any) => publisher.id === gamePublisher.id));
        if (newPublishers.length === 0) return;
        // console.log(newPublishers)
        const newCompletePublishersPromises = newPublishers.map(async (publisher: any) => {

            return new PublisherModel({ id: publisher.id, nombre: publisher.name })
        })
        const newCompletePublishers = await Promise.all(newCompletePublishersPromises);

        await PublisherModel.insertMany(newCompletePublishers);
        console.log("Nuevas editoras agregadas")
    } catch (error) {
        console.log(error)
    }

}