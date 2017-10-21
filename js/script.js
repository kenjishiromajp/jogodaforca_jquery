// Tem que saber 
// O que é função
// O que é função com retorno
// O que é String
// Pegar uma letra da string por indice
// O que é for
// O que é integer
// O que é evento
// o que é preventDefault()
// o que boolean
// Selecionar Elemento com jquery
// Adicionar classe
// Remove Class
// Toggle class com jquery
// Criar elemento com jquery
// O que é array 
// array.push
// seletor :not(.active)

var palavra = "";
var letrasUsadas = [];
var erros = 0;
var jogocomecou = false;

function minhaFuncaoMarota(ev) {
    ev.preventDefault();
    //Minhas linhas de códigos marota
}
$(".botao").click(minhaFuncaoMarota)

function comecarJogo() {

    jogocomecou = true;
    $(".tela").removeClass("visivel");
    $("#forca").addClass("visivel");

    //Formar Palavras
    palavra = $("#palavra").val().toUpperCase();
    for (var i = 0; i < palavra.length; i++) {
        var letra = palavra[i];
        var span = $("<span>" + letra + "</span>");
        $(".letras").append(span);
    }
}

function recomecar() {
    erros = 0;
    letrasUsadas = [];
    $(".letras").html(null);
    $(".letras-usadas").html(null);
    $("#boneco .corpo > *").attr("class", "st0");

    $(".tela").removeClass("visivel");
    $("#cadastro").addClass("visivel");
}

function chutarLetra(letra) {
    if (!jogocomecou)
        return;
    //Anula os meta key ctrl, shift e etc...
    if (letra.length != 1)
        return;
    //Anula letras que já foram utilizados
    if (letrasUsadas.indexOf(letra) != -1)
        return;
    //Adicionar a letra no array de tentativas
    $(".letras-usadas").append("<span>" + letra + "</span>")

    //Verificar se a letra existe
    var achei = false;
    for (var i = 0; i < palavra.length; i++) {
        var letraArray = palavra[i];
        if (letraArray == letra) {
            achei = true;
            $(".letras span").eq(i).addClass("visivel");
        }
    }
    //Se não achou
    if (!achei) {
        //adicione a classe no corpo
        $("#boneco .corpo > *").eq(erros).attr("class", "st0 visivel");
        erros++;
    }

    if (erros >= 6) {
        $("#forca").toggleClass("visivel");
        $("#perdeu").toggleClass("visivel");
        jogocomecou = false;
    }

    if ($(".letras > span:not(.visivel)").length == 0) {
        $("#forca").toggleClass("visivel");
        $("#ganhou").toggleClass("visivel");
        jogocomecou = false;
    }
    //Acumular as letras
    letrasUsadas.push(letra);
}

$(`#cadastro form`).submit(function (ev) {
    ev.preventDefault();
    //Começar o jogo
    comecarJogo();
});

$(document).keydown(function (ev) {
    var letra = ev.key.toUpperCase();
    chutarLetra(letra);
});

$(".btn-recomecar").click(function (ev) {
    ev.preventDefault();
    recomecar();
});
