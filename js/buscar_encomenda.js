var botaoBusca = document.querySelector("#buscar-encomendas");

botaoBusca.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/encomendas");
    xhr.addEventListener("load", function () {
        var resposta = xhr.responseText;
        var encomendas = JSON.parse(resposta);

        encomendas.forEach(function (cada_encomenda) {
            adicionaEncomenda(cada_encomenda);
        });
    });
    xhr.send();
});

/* npm install -g json-server
npx json-server encomendas.json */