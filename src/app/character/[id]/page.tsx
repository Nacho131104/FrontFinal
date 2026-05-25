"use client"
import {useRouter, useParams} from "next/navigation"
import {useState, useEffect} from "react"
import type {Character} from "@/types/types"
import api from "../../../api/api"
import "../../components/character/character.css"
import "./page.css"


const CharacterIdPage = () =>{

    const router = useRouter()

    const {id} = useParams()

    const [characterResponse, setCharacterResponse]=useState<Character|null>(null)
    const [loading, setLoading]=useState<boolean>(true)

   
    useEffect(()=>{
        api.get(`/character/${id}`).then((e)=>{
            setCharacterResponse(e.data)
        }).finally(()=>{
            setLoading(false)
        })
    },[])
    return (
        <div className="charactersContainer">
            {loading && <div>Loading ....</div>}
            {characterResponse && (
                <div className="CharacterInfo"> 
                    <h1> {characterResponse.name}</h1>
                    <div className="characterInfoSub">
                        <img src={characterResponse.image}/>
                        <div className="CharacterInfoText">
                            <p>Status: {characterResponse.status}</p>
                            <p> Species: {characterResponse.species}</p>
                            <p> Gender: {characterResponse.gender}</p>
                            <p>Origin: {characterResponse.origin.name}</p>
                            <p> Id: {characterResponse.id}</p>
                            <p>Location: {characterResponse.location.name}</p>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={()=>{router.back()}}>Volver</button>
        </div>
    )

}

export default CharacterIdPage;