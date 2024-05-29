document.addEventListener("DOMContentLoaded", function () {
    const formPop = document.getElementById("adicionarEncomendaPop");

    formPop.addEventListener("submit", (event) => {
        event.preventDefault();

        const fNome = document.getElementById("ipNomePop");
        const fProduto = document.getElementById("ipProdPop");
        const fQtde = document.getElementById("ipQtdePop");
        const fVUni = document.getElementById("ipVUniPop");

        const nome = fNome.value;
        const produto = fProduto.value;
        const qtde = parseInt(fQtde.value);
        const vUni = parseFloat(fVUni.value);

        if (qtde === 0 || vUni === 0 || isNaN(qtde) || isNaN(vUni)) {
            window.alert("Erro! Por favor, insira uma quantidade e valor válidos.");
            return;
        }

        const tabelaIndex = window.opener.document.querySelector(".tabela_tabela tbody");
        const novaLinha = tabelaIndex.insertRow();
        novaLinha.classList.add("cliente");
        novaLinha.setAttribute("ondblclick", "apagaLinha(this)");

        novaLinha.insertCell(0).textContent = nome;
        novaLinha.insertCell(1).textContent = produto;
        novaLinha.insertCell(2).textContent = qtde;
        novaLinha.insertCell(3).textContent = formatacao(vUni);
        novaLinha.insertCell(4).textContent = calculaTotal(qtde, vUni);

        novaLinha.cells[0].classList.add("info-nome");
        novaLinha.cells[1].classList.add("info-produto");
        novaLinha.cells[2].classList.add("info-quant");
        novaLinha.cells[3].classList.add("info-valor");
        novaLinha.cells[4].classList.add("info-total");

        formPop.reset();
    });
});

function adicionaEncomenda(encomenda) {
    const tabelaIndex = document.querySelector(".tabela_tabela");
    const tabelaBody = tabelaIndex.querySelector("tbody");
    const novaLinha = tabelaBody.insertRow();

    novaLinha.classList.add("cliente");
    novaLinha.setAttribute("ondblclick", "apagaLinha(this)");

    novaLinha.insertCell(0).textContent = encomenda["info-nome"];
    novaLinha.insertCell(1).textContent = encomenda["info-produto"];
    novaLinha.insertCell(2).textContent = encomenda["info-quant"];
    novaLinha.insertCell(3).textContent = formatacao(encomenda["info-valor"]);
    novaLinha.insertCell(4).textContent = calculaTotal(encomenda["info-quant"], encomenda["info-valor"]);

    novaLinha.cells[0].classList.add("info-nome");
    novaLinha.cells[1].classList.add("info-produto");
    novaLinha.cells[2].classList.add("info-quant");
    novaLinha.cells[3].classList.add("info-valor");
    novaLinha.cells[4].classList.add("info-total");

    // Verificação da quantidade
    var qtde = encomenda["info-quant"];
    if (verificacaoQuantidade(qtde) == false) {
        novaLinha.querySelector(".info-quant").textContent = "Qtde inválida";
        novaLinha.querySelector(".info-quant").classList.add("alertaMin");
        novaLinha.querySelector(".info-total").textContent = formatacao(0);
    }

    // Verificação do valor unitário
    var unitario = encomenda["info-valor"];
    if (verificacaoValorUnitario(unitario) == false) {
        novaLinha.querySelector(".info-valor").textContent = "Valor inválido";
        novaLinha.classList.add("alertaMax");
        novaLinha.querySelector(".info-quant").style.color = "black";
        novaLinha.querySelector(".info-total").textContent = formatacao(0);
    }
}



// Função para calcular o valor total
function calculaTotal(qtde, unitario) {
    var total = qtde * unitario;
    return formatacao(total);
}

// Função para formatação
function formatacao(valor) {
    var nValor = parseFloat(valor);
    var x = nValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return x;
}

