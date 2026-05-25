"use client"
import "../estado/estado.css"
import type { Estado } from "@/types/types"

const GeneroComponent = ({generoActual,setGenero}: {generoActual: Estado,setGenero: (estado:number) => void}) =>{

    const gestionarEstado = () =>{
        const posicion = generoActual.pos
        let nextpos: number;
        if(posicion == 2){
            nextpos = 0
        }else {
        nextpos = posicion+1
        }

        setGenero(nextpos)
    }
    return (
        <div className="estadoBoton"> 
            <button onClick={()=>{gestionarEstado()}}>{generoActual.name}</button>
        </div>
    )

}

export default GeneroComponent;