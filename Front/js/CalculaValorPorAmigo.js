// Função para obter parâmetros de consulta da URL
function obterParametroDeConsulta(nome) {
    debugger;
    var urlSearchParams = new URLSearchParams(window.location.search);
    debugger;
    return urlSearchParams.get(nome);
}

// Recupera o parâmetro de consulta 'dados'
var dadosString = obterParametroDeConsulta('dados');

// Converte a string JSON de volta para um array
var pedidos = JSON.parse(dadosString);

//Valida se o calculo dos valores ja foi realizado para gerar o link
var calculoRealizado = false;

var amigosResultados;

function calcularConta() {
    var entrega = document.getElementById('calcularContaForm').entrega.value;
    var desconto = document.getElementById('calcularContaForm').desconto.value;
    var acrescimopercentual = document.getElementById('calcularContaForm').acrescimopercentual.value;
    var pedido = {pedidos: pedidos, entrega: entrega, desconto: desconto, acrescimoPercentual: acrescimopercentual};


    fetch('http://localhost:8080/calcular-conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido),
    })
    .then(response => response.json())
    .then(data => {
        exibirResultado(data.amigosResultados);
        calculoRealizado = true;
        amigosResultados = data.amigosResultados;
        document.getElementById("btnEnviarLinkPagamento").style.display = "block";
    })
    .catch(error => {
        console.error('Erro ao calcular a conta:', error);
    });

}

function exibirResultado(resultado) {
    var lista = document.getElementById('resultado');
    debugger;

    // Limpa a lista antes de adicionar os novos itens
    lista.innerHTML = '';

    // Percorre o array de objetos
    for (var item of resultado) {

        // Cria um elemento de lista (li) para cada objeto
        var listItem = document.createElement('li');
        listItem.textContent = 'Nome: ' + item.nome + ', Valor: R$ ' + item.valorPagar;
        // Adiciona o elemento de lista à lista
        lista.appendChild(listItem);
    }
}

function enviarLinkPagamento() {

    fetch('http://localhost:8080/cobrar-conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(amigosResultados),
    })
    .then(response => response.json())
    .then(data => {
        if(data){
            alert("Link de pagamento enviado com sucesso!");
        }else {
            alert("Envio de Link de pagamento falhou!");
        }
    }).catch(error => {
        console.error('Erro ao enviar link de pagamento', error);
    });

}