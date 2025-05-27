import { useState, useEffect } from "react";

export default function JogoDaSenha() {
  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumeroSecreto());
  const [palpite, setPalpite] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [resultados, setResultados] = useState([]);

  function gerarNumeroSecreto() {
    let numero = "";
    while (numero.length < 4) {
      let digito = Math.floor(Math.random() * 10).toString();
      if (!numero.includes(digito)) {
        numero += digito;
      }
    }
    return numero;
  }
}