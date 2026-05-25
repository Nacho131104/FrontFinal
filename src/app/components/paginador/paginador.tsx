import "./paginador.css"


const Paginador = ({next, prev, page, setPage}: {next: boolean, prev: boolean, page: number, setPage:(page:number)=>void}) =>{

    return (
        <div className= "paginadorContainer">
            { prev && <button onClick={()=>{setPage(page-1)}}> {"<-"}</button>}
            <h1>{page}</h1>
            {next  && <button onClick={()=>{setPage(page+1)}}> {"->"}</button>}
        </div>
    )
}

export default Paginador;