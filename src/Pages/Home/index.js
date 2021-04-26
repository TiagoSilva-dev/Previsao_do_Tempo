import React, { useEffect, useState } from 'react';
import { FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import api from '../../services/api';
import './Home.css';
import { toast } from 'react-toastify';




export default function Home() {
  const [cidade, setCidade] = useState('');
  const [resultado, setResultado] = useState([]);
  const [semana, setSemana] = useState('');
  const [status, setStatus] = useState(false);
  const [diasSemana, setDiasSemana] = useState([]);
  const [res, setRes] = useState([]);
  const [resProx, setResProx] = useState([]);

  useEffect(() => {
    async function loadStorage() {
      setRes(JSON.parse(await localStorage.getItem('Temp')));
      setResProx(JSON.parse(await localStorage.getItem('Prox')));
      setStatus(true);
    }
    loadStorage();

  }, [])

  async function handleBusca(e) {
    e.preventDefault();
    let data = [];
    let dias = [];
    await api.get(`${cidade}`).then(async (resp) => {
      data.push({
        temperatura: resp.data.results.temp,
        descricao: resp.data.results.description,
        cidade: resp.data.results.city,
        humidade: resp.data.results.humidity,
        ventos: resp.data.results.wind_speedy,
        min: resp.data.results.forecast[0].min,
        max: resp.data.results.forecast[0].max
      });
      setSemana(resp.data.results.forecast);
      setResultado(data);

      await semana.map((item, index) => {
        if (index < 7) {
          dias.push({
            dia: item.weekday,
            min: item.min,
            max: item.max
          })
        }
      })

      setDiasSemana(dias);
      localStorage.setItem('Prox', JSON.stringify(diasSemana));
      localStorage.setItem('Temp', JSON.stringify(resultado));


    }).catch((error) => {
      console.log(error);
    })

  }

  return (
    <div className="container" >
      <div className="content">
        <h1>Previsão do Tempo</h1>
        {status === true ? (
          resultado.map((item, index) => {
            return (
              <div className="areaTemp">
                <span className="cidade"> {item.cidade} </span>
                <h1> {item.temperatura}°C {item.descricao}</h1>
                <div className="detalhes">
                  <span><FiArrowDown size={18} color="#FFA215" />{item.min}°C</span>
                  <span><FiArrowUp size={18} color="#FFA215" />{item.max}°C</span>
                  <span> Humidade {item.humidade}%</span>
                  <hr />
                </div>
                {resProx.map((item) => {
                  return (
                    <div className="prox">
                      <span>{item.dia}</span>
                      <div>
                        <span className="temp">{item.min}°  {item.max} °</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : ''}

        <div className="formulario">
          <form onSubmit={handleBusca}>
            <input placeholder="insira aqui o nome da cidade" onChange={((e) => { setCidade(e.target.value) })} />
            <button type="submit">
              <FiSearch color="#565655" size={25} />
            </button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );

}