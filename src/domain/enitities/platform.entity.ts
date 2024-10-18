
export class PlatformEntity {
    constructor(
        public id: number,
        public nombre: string,
        public slug?: string,
        public año_lanzamiento?: number
    ){}
}