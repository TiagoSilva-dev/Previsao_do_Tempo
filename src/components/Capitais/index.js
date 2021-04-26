import React, { useEffect, useState } from 'react';
import './capitais.css';
import api from '../../services/api';




export default function Capitais() {
  const [capitais, setCapitais] = useState([]);

  useEffect(() => {
    api.get(`Rio de janeiro`).then((resp) => {
      let capRio = [];
      capRio.push({
        nome: resp.data.results.city_name,
        min: resp.data.results.forecast[0].min,
        max: resp.data.results.forecast[0].max,
      });
      setCapitais(capRio);
    }).catch((error) => { });

    api.get(`Belo Horizonte`).then((resp) => {
      let capBH = [];
      capBH.push({
        nome: resp.data.results.city_name,
        min: resp.data.results.forecast[0].min,
        max: resp.data.results.forecast[0].max,
      });
      setCapitais(...capBH);
    }).catch((error) => { });

    console.log(capitais);

  }, [])

  return (
    <div>
      <div>
        <h1>Capitais</h1>
      </div>
      <div>
        <span>min </span> <span>max </span>
      </div>

      <span>16° </span> <span>19° </span> <span>Rio de janeiro</span>
      <span>16° </span> <span>19° </span> <span>São Paulo</span>
      <span>16° </span> <span>19° </span> <span>Belo Horizonte</span>
      <span>16° </span> <span>19° </span> <span>Brasilia</span>
      <span>16° </span> <span>19° </span> <span>Belém</span>
      <span>16° </span> <span>19° </span> <span>Rio de janeiro</span>

      <div>
        <span>min </span> <span>max </span>
      </div>
      <span>16° </span> <span>19° </span> <span>Rio de janeiro</span>
      <span>16° </span> <span>19° </span> <span>São Paulo</span>
      <span>16° </span> <span>19° </span> <span>Belo Horizonte</span>
      <span>16° </span> <span>19° </span> <span>Brasilia</span>
      <span>16° </span> <span>19° </span> <span>Belém</span>
      <span>16° </span> <span>19° </span> <span>Rio de janeiro</span>


    </div>
  );
}
