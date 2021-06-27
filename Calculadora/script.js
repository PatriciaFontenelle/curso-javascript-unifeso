function setHistorico(hist) {
    document.getElementById("historico-valor").innerText = hist;
}

function getHistorico() {
    return document.getElementById("historico-valor").innerText;
}

function setResultado(hist) {
    document.getElementById("resultado-valor").innerText = hist;
}

function getResultado() {
    return document.getElementById("resultado-valor").innerText;
}

function formatString(string, goBack = false) {
    let value = '';
    if (goBack) {
        value = string.replace('\u00F7', '/');
        value = value.replace('\u00D7', '*' );
    } else {
        value = string.replace(/\//, '\u00F7');
        value = value.replace(/\*/, '\u00D7');
    }
    return (value);
}

const numeros = document.getElementsByClassName("numero");

for (let i of numeros) {
    i.addEventListener('click', () => {
        const resultado = getResultado();
        setResultado(resultado + i.id)
    })
}

const operacoes = document.getElementsByClassName("operacao");

for (let i of operacoes) {
    i.addEventListener('click', () => {
        if (i.id === 'AC') {
            setHistorico("");
            setResultado("");
        }
        else if (i.id === 'C') {
            const valor = getResultado();
            if (valor) {
                const novoValor = valor.substr(0, valor.length - 1);
                setResultado(novoValor);
            }
        }
        else {
            if (i.id === "%") {
                let percent = 0
                const historico = getHistorico();
                const resultado = getResultado();

                if (resultado === "") return;

                if (historico === "") {
                    percent = resultado / 100;
                } else {
                    const operador = formatString(historico.substr(-1), true);
                    if (operador === '/' || operador === '*') {
                        percent = resultado / 100;
                    } else {
                        const n1 = parseFloat(historico.substr(0, historico.length - 1));
                        const n2 = parseFloat(resultado);
    
                        percent = (n2 * n1) / 100;
                    }
                }
                setResultado(percent)
            }
            else if (i.id === "=") {
                const historico = formatString(getHistorico(), true);
                const resultado = getResultado();

                if (resultado !== "" && historico !== "") {
                    const resultadoFinal = eval(historico + resultado);
                    setHistorico("");
                    setResultado(parseFloat(resultadoFinal.toFixed(13)));
                }


            }
            else {
                const historico = getHistorico();
                if (historico) return;
                const resultado = getResultado();

                if (resultado) {
                    const novoHistorico = resultado + i.id;
                    setHistorico(formatString(novoHistorico));
                    setResultado("");
                }
            }
        }
    })
}
