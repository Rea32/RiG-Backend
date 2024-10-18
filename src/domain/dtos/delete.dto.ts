export class DeleteDto{
    private constructor(
        public _id: number,
    )
    {}

    static delete (  object: {[key:string]: any} ): [string?, DeleteDto?]{
        const { _id } = object;
        console.log(`El nombre recibido ${_id}`);
        if ( !_id ) return ['Missing _Id'];

        return [
            undefined,
            new DeleteDto( _id )
        ]
    }
        
}
