export class GetAllPlatformsDto{
    private constructor(
        public page: number,
        public limit: number,
    ){}


    static query ( object: {[key:string]: any} ): GetAllPlatformsDto{

        let { page, limit } = object;
        if ( !page ) page = 1;
        if ( !limit ) limit = 25;
        return new GetAllPlatformsDto( page, limit )
        
    }

}