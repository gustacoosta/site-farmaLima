var clientes = document.querySelectorAll(".cliente");

for (let i = 0; i < clientes.length; i++) {
    var qtde = clientes[i].querySelector(".info-quant").textContent;
    var unitario = clientes[i].querySelector(".info-valor").textContent;

    //Formatando a linha do valor unitário
    clientes[i].querySelector(".info-valor").textContent = formatacao(unitario);

    // Verificação da quantidade
    if (verificacaoQuantidade(qtde) == false) {
        clientes[i].querySelector(".info-quant").textContent = "Qtde inválida";
        clientes[i].querySelector(".info-quant").classList.add("alertaMin");
        clientes[i].querySelector(".info-total").textContent = formatacao(0);
    } else {
        // Verificação do valor unitário
        if (verificacaoValorUnitario(unitario) == false) {
            clientes[i].querySelector(".info-valor").textContent = "Valor inválido";
            clientes[i].classList.add("alertaMax");
            clientes[i].querySelector(".info-quant").style.color = "black";
            clientes[i].querySelector(".info-total").textContent = formatacao(0);
        } else {
            clientes[i].querySelector(".info-total").textContent = calculaTotal(qtde, unitario);
        }
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

// Função para verificar o valor unitário
function verificacaoValorUnitario(unitario) {
    if (unitario < 1 || isNaN(unitario)) {
        return false;
    } else {
        return true;
    }
}

// Função para verificar a quantidade
function verificacaoQuantidade(qtde) {
    if (qtde < 1 || isNaN(qtde)) {
        return false;
    } else {
        return true;
    }
}