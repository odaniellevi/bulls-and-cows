'use client';

import { useState, useEffect } from "react";

export default function JogoDaSenha() {
  const [numeroSecreto, setNumeroSecreto] = useState("");
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

  useEffect(() => {
    setNumeroSecreto(gerarNumeroSecreto());
  }, []);

  const verificarTentativa = () => {
    if (palpite.length !== 4 || new Set(palpite).size !== 4) {
      setResultados((prev) => [
        "Por favor insira um número com 4 dígitos únicos",
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

  const reiniciarJogo = () => {
    setNumeroSecreto(gerarNumeroSecreto());
    setTentativas(0);
    setResultados([]);
    setPalpite("");
  };

  const mostrarCombinacao = () => {
    alert(`A combinação secreta é: ${numeroSecreto}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181b] text-white p-4">
      <div className="flex flex-col items-center justify-center bg-[#18181b] rounded-[50px] w-80 h-[30rem] gap-4">
        <h1 className="text-red-500 text-center text-2xl font-bold">JOGO DA SENHA</h1>
        <p className="text-lg">Digite um número de 4 dígitos</p>
        <input
          type="text"
          placeholder="* * * *"
          value={palpite}
          onChange={(e) => setPalpite(e.target.value)}
          className="rounded-full text-center w-40 h-8 text-white placeholder-white-700"
        />
        <button
          onClick={verificarTentativa}
          className="flex items-center justify-center w-40 h-12 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          VERIFICAR
        </button>
        <button
          onClick={reiniciarJogo}
          className="flex items-center justify-center w-40 h-12 bg-red-600 text-white rounded-full hover:bg-red-700"
        >
          REINICIAR
        </button>
        <button
          onClick={mostrarCombinacao}
          className="flex items-center justify-center w-40 h-12 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          MOSTRAR COMBINAÇÃO
        </button>
        <div className="text-center overflow-y-auto w-72 max-h-40 border border-white p-2 box-border">
          {resultados.map((res, idx) => (
            <p key={idx}>{res}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
