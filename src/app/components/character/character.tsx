"use client"
import type {Character} from "@/types/types"
import "./character.css"
import {useRouter} from "next/navigation"

const CharacterSerie = ( {personaje}:{personaje: Character} ) =>{


    const router= useRouter()
    return (
        <div className="CharacterInfo">
            <h1  onClick={()=>{router.push(`/character/${personaje.id}`)}} className="text">{personaje.name}</h1>
            <div className="characterInfoSub">
                <div className="CharacterInfoText">
                    <p> Status: {personaje?.status}</p>
                    <p> Species: {personaje?.species}</p>
                    <p> Gender: {personaje?.gender}</p>
                    <img src={personaje?.image} />
                </div>

            </div>
        </div>
    )
}

export default CharacterSerie;