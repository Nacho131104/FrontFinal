"use client"
import "./page.css";
import {useRouter} from "next/navigation"
import {useState, useEffect} from "react"
import type {Character, Response } from "../types/types"
import api from "@/api/api"
import CharacterSerie from "./components/character/character"
import Paginador from "./components/paginador/paginador";

const Home = () =>{
    const [charactersData, setCharactersData] = useState<Response|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage]= useState(1)

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
        <div className = "charactersContainer">
            <h1> Welcome to characters</h1>
            {loading && (<p>Loading ....</p>)}
            {charactersData && charactersData.results.map((r,index)=>{
                return (
                    <CharacterSerie key= {r.id} personaje={r}></CharacterSerie>
                )
            })}

            <Paginador next={!!charactersData?.info.next} prev={!!charactersData?.info.prev} page={page} setPage={(e)=>{setPage(e)}}/>
        </div>
    );
}


export default Home;
