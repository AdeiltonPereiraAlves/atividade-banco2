import { useEffect, useState } from "react";
import axios from 'axios';

export default function useApi() {
  
    const [pathestado, setEstado] = useState("");
    const [pathmunicipio, setMunicipio] = useState(null);
    const [viewBox, setView] = useState();
    const [selectedEstado, setSelectedEstado] = useState(null);
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  
    const url = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados';
    // const url2 = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados/municipios';
    // const urlTest = "http://localhost:3008/svg/paraíba/sousa"

    const [mapEstado, setMapEstado] = useState()
    const[mapMunicipio, setMapMunicipio] = useState()    
    useEffect(() => {
        // Função para carregar os dados do IBGE
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log("Dados do IBGE:", response.data);
                setEstados(response.data);// array com estados
              }catch(error){
              console.error('Erro ao carregar os dados do IBGE:', error);

            }
        };
        const fetchMunicipios = async () => {
          try {
            
            const response = await axios.get(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios`);
            console.log(response.data)
            setMunicipios(response.data);
          } catch (error) {
            console.error("Erro ao buscar municípios:", error);
          }
        };

      
        const buscarMapas = async () => {
          console.log(selectedEstado)
          try {
              if(!pathestado || !pathmunicipio){
                console.error("não existe estado ou municipio");
              }
                
                const dados = await axios.get(`http://localhost:3008/svg/${pathestado}/${pathmunicipio}`);
                console.log("Dados do Mapa:", dados.data);
               
                setMapEstado(dados.data.pathestado);
                setMapMunicipio(dados.data.pathmunicipio);
                setView(dados.data.viewBox);
            } catch (error) {
                console.error('Erro ao carregar o mapa:', error);
            }
        };

        // Chama as funções para carregar os dados
        fetchData();
        buscarMapas();
        fetchMunicipios()
    }, [selectedEstado,pathestado, pathmunicipio]); 

   
    
    
  
    return {
      
        pathestado,
        pathmunicipio,
        viewBox,
        estados,
        municipios,
      
        selectedEstado,
        setSelectedEstado,
        selectedMunicipio,
        setSelectedMunicipio,
        setEstado,
        setMunicipio,
        mapEstado,
        mapMunicipio
    };
}
