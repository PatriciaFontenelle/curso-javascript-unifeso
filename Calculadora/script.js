
function setResultado(resultado) {
    const res = document.getElementById('resultado-valor');
    res.innerText = resultado;
}

function getResultado() {
    const res = document.getElementById('resultado-valor');
    return res.innerText;
}

function setHistorico(historico) {
    const hist = document.getElementById('historico-valor');
    hist.innerText = historico;
}

function getHistorico() {
    const hist = document.getElementById('historico-valor');
    return hist.innerText;
}

function formatString(string, goBack = false) {
    let value = '';
    
    if (goBack) {
        value = string.replace('\u00F7', '/');
        value = value.replace('\u00D7', '*');
    } else {
        value = string.replace('/', '\u00F7');
        value = value.replace('*', '\u00D7');
    }

    return value;
}

function calcularPercent() {
    let percent = 0;
    const historico = getHistorico();
    const resultado = getResultado();

    if (resultado === "") {
        return;
    }

    if (historico === "") {
        percent = resultado / 100;
    } else {
        const operador = historico.substr(-1);
        if (operador === '/' || operador === '*') {
            percent = resultado / 100;
        } else {
            const v1 = parseFloat(historico.substr(0, historico.length - 1));
            const v2 = parseFloat(resultado);

            percent = (v1 * v2) / 100;
        }
    }
    return (percent);
}

const numeros = document.getElementsByClassName('numero');

for (let n of numeros) {
    n.addEventListener('click', () => {
        const result = getResultado();
        const resultadoFinal = result + n.id;
        setResultado(resultadoFinal);
    })
}

const operadores = document.getElementsByClassName('operacao');

//Adicionar event listeners aos elementos
for (let o of operadores) {
    o.addEventListener('click', () => {
        const id = o.id;
        const valorHistorico = getHistorico();
        const valorResultado = getResultado();
        switch (id) {
            case ('AC'):
                setHistorico('');
                setResultado('');
                break;
            case ('C'):
                const valor = getResultado();
                if (valor !== '') {
                    const novoValor = valor.substr(0, valor.length - 1);
                    setResultado(novoValor);
                }
                break;
            case ('%'):
                const p = calcularPercent();
                setResultado(eval(formatString(valorHistorico + p, true)));
                setHistorico('');
                break;
            case ('='):
                if (valorHistorico === '' || valorResultado === '') {
                    return;
                }

                const resultadoFinal = eval (formatString(valorHistorico + valorResultado, true));

                const qtdCasasDecimais = parseInt(resultadoFinal).toString().length;

                setResultado(parseFloat(resultadoFinal.toFixed(15 - qtdCasasDecimais)));
                setHistorico('');

                break;
            default:
                const historico = valorResultado + o.id;
                setHistorico(formatString(historico));
                setResultado('');
        }
    })
}

