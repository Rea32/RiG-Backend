export class GetAllDto{
    private constructor(
        public page: number,
        public limit: number,
        public sort: number
    ){}


    static query ( object: {[key:string]: any} ): GetAllDto{

        let { page, limit, sort } = object;
        if ( !page ) page = 1;
        if ( !limit ) limit = 25;
        if ( !sort ) sort = 1;
        return new GetAllDto( page, limit, sort )
        
    }

}