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

  const verificarTentativa = () => {
    if (palpite.length !== 4 || new Set(palpite).size !== 4) {
      setResultados((prev) => [
        "Por favor, insira um número com 4 dígitos únicos",
        ...prev
      ]);
      return;
    }

    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
      if (palpite[i] === numeroSecreto[i]) {
        bulls++;
      } else if (numeroSecreto.includes(palpite[i])) {
        cows++;
      }
    }

    const novaTentativa = tentativas + 1;
    setTentativas(novaTentativa);

    const novoResultado =
      bulls === 4
        ? `Parabéns! Você acertou o número secreto ${numeroSecreto} em ${novaTentativa} tentativas!`
        : `Tentativa #${novaTentativa}: ${palpite} | Bulls: ${bulls}, Cows: ${cows}`;

    setResultados((prev) => [novoResultado, ...prev]);
    setPalpite("");
  };
}