function apagaLinha(linha) {
    linha.classList.add("fadeOut");
    setTimeout(function () {
        linha.parentNode.removeChild(linha);
    }, 500);
}