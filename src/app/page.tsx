"use client"
import "./page.css";
import {useRouter} from "next/navigation"
import {useState, useEffect} from "react"
import type {Character, Response , Estado} from "../types/types"
import api from "@/api/api"
import CharacterSerie from "./components/character/character"
import Paginador from "./components/paginador/paginador";
import EstadoComponent from "./components/estado/estado"
import GeneroComponent from "./components/genero/genero";

const estados: Estado[] = [
  {name:"Dead", pos:0},{name:"Alive", pos:1 },{name:"Unknown", pos: 2}
]


const generos: Estado[] = [
  {name: "Male", pos:0}, {name: "Female", pos:0}, {name:"Genderless", pos: 1},{name: "Unknown", pos:2}
]


const Home = () =>{
    const [charactersData, setCharactersData] = useState<Response|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage]= useState(1)

    const [estado, setEstado] = useState<number>(0)
    const [genero, setGenero] = useState<number>(0)

    const router = useRouter()

    const [id, setId]=useState<number|null>(null)

    const fetchCharacters = async ()=>{
         await api.get(`/character?page=${page}`).then((e)=>{
            const {data}:{data:Response} = e;
            setCharactersData(data)
        }).finally(()=>{
            setLoading(false)
        })
    }


    useEffect(()=>{
        fetchCharacters()
    },[page])

    return (
      <div className="principalContainer"> 
          <div className="filtrosContainer">
              <h1>Filtros de Busqueda</h1>
              <div className="filtros">
                <EstadoComponent estadoActual= {estados.find((e)=> e.pos === estado)!} setEstado={(estado)=>setEstado(estado)}></EstadoComponent>
                <GeneroComponent generoActual={generos.find((g)=>g.pos== genero)!} setGenero={(genero)=>{setGenero(genero)}}></GeneroComponent>
              </div>
          </div>
          <div className = "charactersContainer">
            <h1> Welcome to characters</h1>
            {loading && (<p>Loading ....</p>)}
            {charactersData && charactersData.results.map((r)=>{
                return (
                    <CharacterSerie key= {r.id} personaje={r}></CharacterSerie>
                )
            })}

            <Paginador next={!!charactersData?.info.next} prev={!!charactersData?.info.prev} page={page} setPage={(e)=>{setPage(e)}}/>
          </div>
      </div>
    );
}


export default Home;
