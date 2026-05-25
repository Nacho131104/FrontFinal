"use client"
import "./estado.css"
import type { Estado } from "@/types/types"

const EstadoComponent = ({estadoActual,setEstado}: {estadoActual: Estado,setEstado: (estado:number) => void}) =>{

    const gestionarEstado = () =>{
        const posicion = estadoActual.pos
        let nextpos: number;
        if(posicion == 2){
            nextpos = 0
        }else {
        nextpos = posicion+1
        }

        setEstado(nextpos)
    }
    return (
        <div className="estadoBoton"> 
            <button onClick={()=>{gestionarEstado()}}>{estadoActual.name}</button>
        </div>
    )

}

export default EstadoComponent;