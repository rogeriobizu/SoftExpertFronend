var pedidos = [];

function exibirLista(pedidos) {
    var lista = document.getElementById('listaDados');

    // Limpa a lista antes de adicionar os novos itens
    lista.innerHTML = '';

    // Percorre o array de objetos
    for (var item of pedidos) {

        // Cria um elemento de lista (li) para cada objeto
        var listItem = document.createElement('li');
        listItem.textContent = 'Nome: ' + item.nome + ', Valor: R$ ' + item.valor;
        // Adiciona o elemento de lista à lista
        lista.appendChild(listItem);
    }
}

function adicionarPedidoIndividual() {
    var form = document.getElementById('pedidoIndividualForm');
    var pedido = { nome: form.nome.value, valor: form.valorPedido.value }

    if (pedido.nome.trim() === "" || pedido.valor.trim() === "") {
        alert("Por favor, preencha os campos 'Nome' e 'Valor do Pedido'.");
        return;
    }

    pedidos.push(pedido);

    exibirLista(pedidos);

    document.getElementById("nome").value = "";
    document.getElementById("valorPedido").value = "";

}

function direcionarParaFinalizacao(){
    // Define a URL da nova tela
    var todosPedidos = JSON.stringify(pedidos)
    var novaTelaURL = 'CalculaValorPorAmigo.html?dados='+encodeURIComponent(todosPedidos);

    // Abre uma nova tela
    window.open(novaTelaURL, '_blank');
}

function limparListaAmigos() {
    // Obter a referência da lista de amigos
    var listaDados = document.getElementById("listaDados");

    // Limpar a lista de amigos
    listaDados.innerHTML = "";
}