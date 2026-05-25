import "./paginador.css"


const Paginador = ({next, prev, page, setPage}: {next: boolean, prev: boolean, page: number, setPage:(page:number)=>void}) =>{

    return (
        <div className= "paginadorContainer">
            { prev && <button onClick={()=>{setPage(page-1)}}> {"<-"}</button>}

            {page === 1 && (
                <div className = "paginas">
                    <p>{page}  18,19,20</p>
                </div>
            )}
            {page === 2 && (
                <div className = "paginas">
                
                    <p>1,  {page}   18,19,20</p>
                </div>
            )}
            {page === 3 && (
                <div className = "paginas">
                    <p> 1,2  {page}  18,19,20</p> 
                </div>
            )}

            {page!= 1 && page!=2 && page != 3 && page!=18 && page != 19 && page!=20 &&(
                <div className = "paginas">
                    <p>1,2,3   {page}    18,19,20</p> 
                </div>
            )}

            {page === 18  && (
                <div className = "paginas">
                    <p>1,2,3   {page}   19,20</p> 
                </div>
            )}
            {page === 19 && (
                <div className = "paginas">
                    <p>1,2,3  {page}    ,20</p> 
                </div>
            )}
            {page === 20  && (
                <div className = "paginas">
                    <p>1,2,3    {page}</p> 
                </div>
            )}

            
            
            
            {next  && <button onClick={()=>{setPage(page+1)}}> {"->"}</button>}
        </div>
    )
}

export default Paginador;