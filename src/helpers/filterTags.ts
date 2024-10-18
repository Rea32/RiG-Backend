import { GameEntity } from "../domain";
import { TagModel } from "../data/mongodb/models/tag.model";
import { TagEntity } from "../domain/enitities/tag.entity";

const estilosGraficos = new Set([
    { nombre: "Fotorealismo", name: "Photorealistic", tipo: "Estilo Gráfico" },
    { nombre: "Cell Shading", name: "Cell Shading", tipo: "Estilo Gráfico" },
    { nombre: "Pixel Art", name: "Pixel Art", tipo: "Estilo Gráfico" },
    { nombre: "Low Poly", name: "Low Poly", tipo: "Estilo Gráfico" },
    { nombre: "Estilo de Arte Vectorial", name: "Vector Art Style", tipo: "Estilo Gráfico" },
    { nombre: "Arte Isométrico", name: "Isometric", tipo: "Estilo Gráfico" },
    { nombre: "Estilo 8-bit y 16-bit", name: "8-bit and 16-bit Style", tipo: "Estilo Gráfico" },
    { nombre: "Arte Acuarela", name: "Watercolor Art", tipo: "Estilo Gráfico" },
    { nombre: "Estilo de Dibujo a Mano", name: "Hand-Drawn Style", tipo: "Estilo Gráfico" },
    { nombre: "Arte Gráfico 2.5D", name: "2.5D Graphic Art", tipo: "Estilo Gráfico" },
    { nombre: "Voxels", name: "Voxels", tipo: "Estilo Gráfico" },
    { nombre: "Arte de Sombras Planas (Flat Shading)", name: "Flat Shading", tipo: "Estilo Gráfico" },
    { nombre: "Realismo Simplificado (Stylized Realism)", name: "Stylized Realism", tipo: "Estilo Gráfico" },
    { nombre: "Arte Abstracto", name: "Abstract Art", tipo: "Estilo Gráfico" },
    { nombre: "Arte 3D Realista con Estilo", name: "Stylized 3D Realism", tipo: "Estilo Gráfico" },
    { nombre: "Arte en Blanco y Negro", name: "Black and White Art", tipo: "Estilo Gráfico" },
    { nombre: "Estilo Retro-Futurista", name: "Retro-Futuristic Style", tipo: "Estilo Gráfico" },
    { nombre: "Estilo Chibi", name: "Chibi Style", tipo: "Estilo Gráfico" }
]);



const ambientacion = new Set([
    { nombre: "Fantasía", name: "Fantasy", tipo: "ambientación" },
    { nombre: "Ciencia Ficción", name: "Sci-Fi", tipo: "ambientación" },
    { nombre: "Postapocalíptico", name: "Post-apocalyptic", tipo: "ambientación" },
    { nombre: "Cyberpunk", name: "Cyberpunk", tipo: "ambientación" },
    { nombre: "Steampunk", name: "Steampunk", tipo: "ambientación" },
    { nombre: "Terror", name: "Horror", tipo: "ambientación" },
    { nombre: "Histórico", name: "Historical", tipo: "ambientación" },
    { nombre: "Medieval", name: "Medieval", tipo: "ambientación" },
    { nombre: "Western", name: "Western", tipo: "ambientación" },
    { nombre: "Piratas", name: "Pirates", tipo: "ambientación" },
    { nombre: "Espacial", name: "Space", tipo: "ambientación" },
    { nombre: "Distopía", name: "Dystopia", tipo: "ambientación" },
    { nombre: "Guerra Moderna", name: "Modern Warfare", tipo: "ambientación" },
    { nombre: "Guerra Futurista", name: "Futuristic Warfare", tipo: "ambientación" },
    { nombre: "Zombis", name: "Zombies", tipo: "ambientación" },
    { nombre: "Superhéroes", name: "Superheroes", tipo: "ambientación" },
    { nombre: "Aventura Gráfica", name: "Graphic Adventure", tipo: "ambientación" },
    { nombre: "Noir", name: "Noir", tipo: "ambientación" },
    { nombre: "Cybernoir", name: "Cybernoir", tipo: "ambientación" },
    { nombre: "Fantasía Oscura", name: "Dark Fantasy", tipo: "ambientación" },
    { nombre: "Japón Feudal", name: "Feudal Japan", tipo: "ambientación" },
    { nombre: "Mitología", name: "Mythology", tipo: "ambientación" },
    { nombre: "Cyberfantasy", name: "Cyberfantasy", tipo: "ambientación" },
    { nombre: "Viajes en el Tiempo", name: "Time Travel", tipo: "ambientación" },
    { nombre: "Futurista", name: "Futuristic", tipo: "ambientación" },
    { nombre: "Surrealista", name: "Surrealist", tipo: "ambientación" },
    { nombre: "Anime", name: "Anime", tipo: "ambientación" }
]);



const narrativa = new Set([
    { nombre: "Histórica", name: "Historical", tipo: "narrativa" },
    { nombre: "Cinematográfica", name: "Cinematic", tipo: "narrativa" },
    { nombre: "Lineal", name: "Linear", tipo: "narrativa" },
    { nombre: "No Lineal", name: "Non-linear", tipo: "narrativa" },
    { nombre: "Interactiva", name: "Interactive", tipo: "narrativa" },
    { nombre: "Emergente", name: "Emergent", tipo: "narrativa" },
    { nombre: "Rama de Decisiones", name: "Branching Decisions", tipo: "narrativa" },
    { nombre: "Narrativa Ambiental", name: "Environmental Storytelling", tipo: "narrativa" },
    { nombre: "Narrativa de Personajes", name: "Character-driven Story", tipo: "narrativa" },
    { nombre: "Narrativa de Misiones", name: "Mission-based Story", tipo: "narrativa" },
    { nombre: "Narrativa Fragmentada", name: "Fragmented Narrative", tipo: "narrativa" },
    { nombre: "Narrativa de Mundo Abierto", name: "Open World Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Basada en Elecciones", name: "Choice-based Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Simbólica", name: "Symbolic Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Contada en Flashbacks", name: "Flashback Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Sin Diálogos", name: "Dialogue-free Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Epistolar (cartas, diarios, etc.)", name: "Epistolary Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Experimental", name: "Experimental Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Dinámica", name: "Dynamic Narrative", tipo: "narrativa" },
    { nombre: "Narrativa Cíclica", name: "Cyclical Narrative", tipo: "narrativa" }
]);


const mecanicas = new Set([
    { nombre: 'Exploración', name: 'Exploration' },
    { nombre: 'Combate por Turnos', name: 'Turn-Based Combat' },
    { nombre: 'Mundo Abierto', name: 'Open World' },
])

export const filterTags = async (tag: Array<TagEntity>) => {
    // Obtener todas las etiquetas de TagModel
    const tags = await TagModel.find({});
    if (!tags || !tag) return tag;

    // Filtrar las etiquetas que ya existen en TagModel
    const existTags = tags.filter((dbTag: any) =>
        tag.some((tag: any) => tag.name === dbTag.name)
    );
    console.log('Original Tags: ', tag)
    if (!existTags || existTags.length === 0) return [];

    // Actualizar el campo 'game.etiquetas' con las etiquetas existentes
    tag = existTags;

    // Retornar el objeto 'game' con las etiquetas actualizadas
    return tag;
};



