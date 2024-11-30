
import './App.css'
import useApi from './hooks/useApi'

function App() {
  const{
    pathestado,
    pathmunicipio,
     estados,
     setEstado,
     setMunicipio,
    municipios,
   
    selectedEstado,
    setSelectedEstado,
    selectedMunicipio,
    setSelectedMunicipio,
   mapEstado,mapMunicipio, viewBox} = useApi()
   

    function setarEstado(e) {
      const id = Number(e.target.value)
      if (!id) {
        console.warn("Nenhum estado foi selecionado.");
        return;
      }
      setSelectedEstado(id)
      const estado = estados.find((e) => e.id === id)
      console.log(estado)
       setEstado(estado.nome)
    }
    const setarMunicipio =(e) => {
       setSelectedMunicipio(e.target.value)
       setMunicipio(e.target.value)
    }

  return (
    <>
      <h1>Projeto Banco de Dados II</h1>
     {estados&& estados.map((item) => (
      <option key={item.id} value={item.id}>
          <div>{item.id}</div>
          <div>{item.nome}</div>
      </option>
     ))}

<div>
        <label htmlFor="estado">Selecione um Estado: </label>
        <div>{selectedEstado}</div>
        <div>{pathestado}</div>
        <select
          id="estado"
          value={selectedEstado || ""}
          onChange={setarEstado}
        >
          <option value={estados[0]}>Selecione um Estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id} >
              {estado.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Select de Municípios */}
      <div>
        <label htmlFor="municipio">Selecione um Município: </label>
        <div>{pathmunicipio}</div>
        <select
          id="municipio"
          
          value={selectedMunicipio || ""}
          onChange={setarMunicipio}
        >
          <option value=''>Selecione um Município</option>
          {municipios.map((municipio) => (
            <option key={municipio.id} value={municipio.nome}>
              {municipio.nome}
            </option>
          ))}
        </select>
      </div>

  



<svg width="2000" height="2000" xmlns="http://www.w3.org/2000/svg" 
      viewBox={viewBox || "-90 -12 2 80"}
  
      
    >
     
        <path d={mapEstado} fill="blue" stroke="red" strokeWidth="0.001" transform="scale(2)" />
        <path d={mapMunicipio} fill="red" stroke="yellow" strokeWidth="0.001" transform="scale(2)"  />
      
    </svg>


    </>
  )
}

export default App
