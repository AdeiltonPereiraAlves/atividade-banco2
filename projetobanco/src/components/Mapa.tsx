import React from "react";
import useApi from "../hooks/useApi";

const Mapa = () => {
  const {mapEstado,mapMunicipio, viewBox } = useApi();
  console.log(mapEstado)

  if (!mapEstado || !mapMunicipio) {
    return <div>Carregando mapa...</div>; // Exibindo mensagem enquanto os dados não são carregados
  }

  return (
    <svg width="2000" height="2000" xmlns="http://www.w3.org/2000/svg" 
      viewBox={viewBox || "-90 -12 2 80"}
  
      
    >
     
        <path d={mapEstado} fill="blue" stroke="red" strokeWidth="0.001" transform="scale(2)" />
        <path d={mapMunicipio} fill="red" stroke="yellow" strokeWidth="0.001" transform="scale(2)"  />
      
    </svg>
  );
};

export default Mapa;
