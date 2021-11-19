function validaCampos(){
   let validaProduto = document.getElementById('inputNome').value;
   let validaValor = document.getElementById('inputValor').value;
   let validaQuantidade = document.getElementById('inputQuantidade').value;

   if(validaProduto.trim() === '' || validaValor.trim() === '' || validaQuantidade.trim() === ''){
       alert("Preencha todos os campos")
   }
   else{
       recebeInformacoes();
   }
}
function recebeInformacoes(){

    // pegar valor dos inputs

    let produto = document.getElementById("inputNome").value;
    let valor = document.getElementById("inputValor").value;
    let quantidade = document.getElementById("inputQuantidade").value;

    // Calcular o valor total bruto
    let vlrTotalBruto = valorTotalBruto(valor, quantidade);

    // Calcular a porcentagem de desconto
    let porcentagemDesconto = pctDesconto(vlrTotalBruto, quantidade);

    // Calcular Desconto
    let valorComDesconto = valorTotalComDesconto(vlrTotalBruto, quantidade);

    // tabela
    insereNaTabela(produto, valor, quantidade, vlrTotalBruto, porcentagemDesconto, valorComDesconto);
    
}

function valorTotalBruto(valor, quantidade) {
    return valor * quantidade;
}

function pctDesconto(valorTotal, quantidade) {
    if (valorTotal >= 1000 && quantidade > 10) {
        return "10%";
    }
    if (valorTotal < 1000 && quantidade <= 5) {
        return "5%";
    }
    if (valorTotal < 1000 && quantidade > 5) {
        return "7%";
    }
    else {
        return "0%";
    }
}

function valorTotalComDesconto(valor, quantidade) {
    if (valor >= 1000 && quantidade > 10) {
        return valor - (valor * 0.1);

    } else if (valor < 1000 && quantidade <= 5) {
        return valor - (valor * 0.05);

    } else if (valor < 1000 && quantidade > 5) {
        return valor - (valor * 0.07);

    } else {
        return valor;
    }
}


function insereNaTabela(produto, valor, quantidade, valorTotalBruto, porcentagemDesconto, valorComDesconto){

    let tabela = document.getElementById("tabelaProdutos");
    let qtdLinhas = tabela.rows.length;
    let linha = tabela.insertRow(qtdLinhas);

    let valorDescConv = parseInt(valorComDesconto).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let valorUnit = parseInt(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let valorBrutoConv = parseInt(valorTotalBruto).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    let cellProduto = linha.insertCell(0)
    let cellValorUnitario = linha.insertCell(1)
    let cellQuantidade = linha.insertCell(2)
    let cellValorBruto = linha.insertCell(3)
    let cellDesconto = linha.insertCell(4)
    let cellValorDesconto = linha.insertCell(5)


    cellProduto.innerHTML = produto;
    cellValorUnitario.innerHTML = valorUnit;
    cellQuantidade.innerHTML = quantidade;
    cellValorBruto.innerHTML = valorBrutoConv;
    cellDesconto.innerHTML = porcentagemDesconto;
    cellValorDesconto.innerHTML = valorDescConv;

    limpaInputs();

}

function limpaInputs(){

    document.getElementById('inputNome').value='';
    document.getElementById('inputValor').value='';
    document.getElementById('inputQuantidade').value='';

}