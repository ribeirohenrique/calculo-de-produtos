function validaCampos(){
   let validaNome = document.getElementById('inputNome').value;
   let validaDependentes = document.getElementById('inputDependentes').value;
   let validaSalarioBruto = document.getElementById('inputSalBruto').value;

   if(validaNome.trim() == '' || validaDependentes.trim() == '' || validaSalarioBruto.trim()==''){
       alert("preencha todos os campos")
   }
   else{
       recebeInformacoes();
   }
}
function recebeInformacoes(){

    // pegar valor dos inputs

    let nome = document.getElementById("inputNome").value;
    let qtdDependentes = document.getElementById("inputDependentes").value;
    let salarioBruto = document.getElementById("inputSalBruto").value;

    // INSS
    let faixaINSS = verificaFaixaINSS(salarioBruto);

    let inss = calculaINSS(faixaINSS, salarioBruto);
    let aliqINSS = inss.first;
    let valINSS = inss.second;
    let salarioInssDescontado = inss.third;

    // Dependentes
    let valorDescDependentes = calculaDependentes(qtdDependentes);

    // IRRF
    let descontosIRRF= aplicaDescontosIRRF(salarioBruto, valorDescDependentes, valINSS);
    let faixaIRRF = verificaFaixaIRRF(descontosIRRF);
    let irrf = calculaIRRF(faixaIRRF, descontosIRRF);
    let aliqIRRF = irrf.first;
    let valIRRF = irrf.second;

    //calculo salario liquido

    let salarioLiquido = calculoSalarioLiquido(salarioBruto, valINSS, valorDescDependentes, valIRRF);

    // tabela
    insereNaTabela(nome, qtdDependentes, salarioBruto, aliqINSS, valINSS, aliqIRRF, valIRRF, salarioLiquido);
    
}

function verificaFaixaINSS(salarioBruto){

    this.salarioBruto=parseFloat(salarioBruto);

    let faixaINSS = 0;

    if(salarioBruto <= 1100){
       return faixaINSS = 1;
    }
    else if(salarioBruto > 1100 && salarioBruto <= 2203.48){
        return faixaINSS = 2;
    }
    else if(salarioBruto > 2203.48 && salarioBruto <= 3305.22){
        return faixaINSS = 3;
    }
    else if(salarioBruto > 3305.22){
        return faixaINSS = 4;
    }

}

function calculaINSS(faixaINSS, salarioBruto){

    this.salarioBruto=parseFloat(salarioBruto);
    this.faixaINSS=parseInt(faixaINSS);
    let valorInss = 0;
    let salarioInssDescontado;

    if(faixaINSS==1){
        valorInss = salarioBruto * 7.5 / 100;
        salarioInssDescontado = salarioBruto - valorInss;
        return {
            first:"1ª faixa",
            second: valorInss,
            third: salarioInssDescontado,
        };
    }
    else if(faixaINSS == 2){
        valorInss = 82.5;
        valorInss += (salarioBruto-1100.1) * 9 / 100;
        salarioInssDescontado = salarioBruto - valorInss;
        return {
            first:"2ª faixa",
            second: valorInss,
            third: salarioInssDescontado,
        };
    }
    else if(faixaINSS == 3){
        valorInss = 82.5 + 99.31;
        valorInss += (salarioBruto-2203.48) * 12 / 100;
        salarioInssDescontado = salarioBruto - valorInss;
        return {
            first:"3ª faixa",
            second: valorInss,
            third: salarioInssDescontado,
        };

    }
    else if(faixaINSS == 4){
        valorInss = 82.5 + 99.31 + 132.21;

        if(salarioBruto <= 6433.57){

            valorInss += (salarioBruto-3305.22) * 14 / 100;

        }
        else{
            valorInss += 437.97
        }
        
        salarioInssDescontado = salarioBruto - valorInss;
        return {
            first:"4ª faixa",
            second: valorInss,
            third: salarioInssDescontado,
        };
        
    }
    
}

function calculaDependentes(qtdDependentes){
    this.qtdDependentes = parseInt(qtdDependentes);
    let valorDescDependentes = 0;
    if(qtdDependentes > 0){
       return valorDescDependentes = qtdDependentes * 189.59
    }
    else{
        return valorDescDependentes;
    }


}

function aplicaDescontosIRRF(salarioBruto, valorDescDependentes, valINSS){
    return salarioBruto - valorDescDependentes - valINSS;
}

function verificaFaixaIRRF(descontosIRRF){
    this.descontosIRRF=parseFloat(descontosIRRF);
    let faixaIRRF = 0;

    if(descontosIRRF <= 1903.98){
        return faixaIRRF = 1;
     }
     else if(descontosIRRF > 1903.98 && descontosIRRF <= 2826.65){
         return faixaIRRF = 2;
     }
     else if(descontosIRRF > 2826.65 && descontosIRRF <= 3751.05){
         return faixaIRRF = 3;
     }
     else if(descontosIRRF > 3751.05 && descontosIRRF <= 4664.68){
         return faixaIRRF = 4;
     }
     else{
         return faixaIRRF = 5;
     }

}

function calculaIRRF(faixaIRRF, descontosIRRF){
    this.faixaIRRF=parseInt(faixaIRRF);
    this.descontosIRRF=parseFloat(descontosIRRF);
    let valorIRRF = 0;

    if(faixaIRRF == 1){
        return {
            first:"isento",
            second: valorIRRF = 0,
        };
    }

    else if(faixaIRRF == 2){
        valorIRRF = (descontosIRRF - 1903.98) * 7.5 / 100;
        return{
            first:"2ª faixa",
            second: valorIRRF,
        };
         
    }
    else if(faixaIRRF == 3){
        valorIRRF = 69.20;
        valorIRRF += (descontosIRRF - 2826.65) * 15 / 100
        return{
            first:"3ª faixa",
            second: valorIRRF,
        };
    }
    else if(faixaIRRF == 4){
        valorIRRF = 69.20 + 138.66;
        valorIRRF += (descontosIRRF - 3751.05) * 22.5 / 100
        return{
            first:"4ª faixa",
            second: valorIRRF,
        };
    }
    else if(faixaIRRF == 5){
        valorIRRF = 69.20 + 138.66 + 205.57;
        valorIRRF += (descontosIRRF - 4664.68) * 27.5 / 100
        return{
            first:"5ª faixa",
            second: valorIRRF,
        };
    }

}

function calculoSalarioLiquido(salarioBruto, valINSS, valorDescDependentes, valIRRF){

    return salarioBruto - valINSS - valorDescDependentes - valIRRF;

}

function insereNaTabela(nome, qtdDependentes, salarioBruto, aliqINSS, valINSS, aliqIRRF, valIRRF, salarioLiquido){

    let tabela = document.getElementById("tabelaPessoas");
    let qtdLinhas = tabela.rows.length;
    let linha = tabela.insertRow(qtdLinhas);

    let salarioBrutoConv = parseFloat(salarioBruto).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let valINSSConv = parseFloat(valINSS).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let valIRRFConv = parseFloat(valIRRF).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let salarioLiquidoConv = parseFloat(salarioLiquido).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});


    
    let cellNome = linha.insertCell(0)
    let cellDependentes = linha.insertCell(1)
    let cellSalarioBruto = linha.insertCell(2)
    let cellaliqINSS = linha.insertCell(3)
    let cellvalINSS = linha.insertCell(4)
    let cellaliqIRRF = linha.insertCell(5)
    let cellvalIRRF = linha.insertCell(6)
    let cellsalarioLiquido = linha.insertCell(7)


    cellNome.innerHTML = nome;
    cellDependentes.innerHTML = qtdDependentes;
    cellSalarioBruto.innerHTML = salarioBrutoConv
    cellaliqINSS.innerHTML = aliqINSS;
    cellvalINSS.innerHTML = valINSSConv;
    cellaliqIRRF.innerHTML = aliqIRRF;
    cellvalIRRF.innerHTML = valIRRFConv;
    cellsalarioLiquido.innerHTML = salarioLiquidoConv;

    limpaInputs();

}

function limpaInputs(){

    document.getElementById('inputNome').value='';
    document.getElementById('inputDependentes').value='';
    document.getElementById('inputSalBruto').value='';

}