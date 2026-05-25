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
  {name: "Male", pos:0}, {name: "Female", pos:1}, {name:"Genderless", pos: 2},{name: "Unknown", pos:3}
]


const Home = () =>{
    const [charactersData, setCharactersData] = useState<Response|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage]= useState(1)


    const [characterEspecifico, setCharacterEspecifico] = useState<Character |null> (null)

  
    const [estado, setEstado] = useState<number>(0)
    const [genero, setGenero] = useState<number>(0)
  
    const [id,setID] = useState<number>(0)

    const [ejecutarId, setEjecutarId] = useState<boolean>(false)
    const [ejecutarEstado, setEjecutarEstado] = useState<boolean>(false)
    const [ejecutarGenero, setEjecutarGenero] = useState<boolean>(false)

    const applyEstado= async() =>{
        if(!ejecutarEstado && !ejecutarGenero && !ejecutarId){
          setEjecutarEstado(true)
          const status = estados.find((e)=>e.pos== estado)
          const filtro = status?.name
          await api.get(`/character/?status=${filtro}`).then((e)=>{
            setCharactersData(e.data)
          })
        }else if (ejecutarEstado){
            setEjecutarEstado(false)
        }
    }

    const applyGenero = async () => {
          if(!ejecutarEstado && !ejecutarGenero && !ejecutarId){
            setEjecutarGenero(true)

    
            const genero = generos.find((e)=>e.pos== estado)
            const filtro = genero?.name
            await api.get(`/character/?gender=${filtro}`).then((e)=>{
              setCharactersData(e.data)
            })
        }else if (ejecutarGenero){
            setEjecutarGenero(false)
        }
    }

    const applyId = async () =>{
      if(!ejecutarEstado && !ejecutarGenero && !ejecutarId){
            setEjecutarId(true)

            await api.get(`/character/${id}`).then((e)=>{
              setCharacterEspecifico(e.data)
            })
        }else if (ejecutarId){
            setEjecutarId(false)
            setCharacterEspecifico(null)
        }
    }

    const router = useRouter()

    

    const fetchCharacters = async ()=>{
      if (!ejecutarEstado && !ejecutarGenero){

        await api.get(`/character?page=${page}`).then((e)=>{
            const {data}:{data:Response} = e;
            setCharactersData(data)
        }).finally(()=>{
            setLoading(false)
            
        })
      }
    }


    useEffect(()=>{
        fetchCharacters()
    },[page])

    useEffect(()=>{
      fetchCharacters()
    },[ejecutarEstado])

    return (
      <div className="principalContainer"> 
          <div className="filtrosContainer">
              <h1>Filtros de Busqueda</h1>
              <div className="filtros">
                <div className="filtroboton">
                  <EstadoComponent estadoActual= {estados.find((e)=> e.pos === estado)!} setEstado={(estado)=>setEstado(estado)}></EstadoComponent>
                  <button onClick={()=>{applyEstado()}}>{!ejecutarEstado ? (<p>Aplicar</p>):(<p>Quitar</p>)}</button>
                </div>
                <div className="filtroboton">
                  <GeneroComponent generoActual={generos.find((g)=>g.pos== genero)!} setGenero={(genero)=>{setGenero(genero)}}></GeneroComponent>
                  <button onClick={()=>{applyGenero()}}>{!ejecutarGenero ? (<p>Aplicar</p>):(<p>Quitar</p>)}</button>
                </div>

                <div className="filtroboton">
                  <input type="text" value={Number(id)} onChange={(e)=>{setID(Number(e.target.value))}} placeholder="Filtrar por id"></input>
                  <button onClick={()=>{applyId()}}>{!ejecutarId ?(<p>Aplicar</p>):(<p>Quitar</p>)}</button>
                </div>
              </div>
          </div>
          <div className = "charactersContainer">
            <h1> Welcome to characters</h1>
            {loading && (<p>Loading ....</p>)}
            {!characterEspecifico && charactersData && charactersData.results.map((r)=>{
                return (
                  <div  key={r.id} onClick={()=>{router.push(`/character/${r.id}`)}}>
                    <CharacterSerie key= {r.id} personaje={r}></CharacterSerie>
                  </div>
                )
            })}

            {characterEspecifico && <CharacterSerie personaje={characterEspecifico}></CharacterSerie>}

            <Paginador next={!!charactersData?.info.next} prev={!!charactersData?.info.prev} page={page} setPage={(e)=>{setPage(e)}}/>
          </div>
      </div>
    );
}


export default Home;
