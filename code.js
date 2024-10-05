var todosPaises = []
var todosPaisesDiv = document.querySelector(".todosPaises")
var qtPaises = document.querySelector("#qtPaises")

async function consultarPaises(url) {
    var resposta = await fetch("https://restcountries.com/v3.1/"+url)
    var dados = await resposta.json()

    todosPaises = dados
    qtPaises.innerHTML = todosPaises.length 
    mostrarPaises(todosPaises)
}

function mostrarPaises(paises) {
    todosPaisesDiv.innerHTML = "" 

    for (let pais of paises) {
        var paisdiv = document.createElement("div")
        paisdiv.classList.add("pais")

        paisdiv.innerHTML = `
        <img 
            width="150"
            src="${pais.flags.png}"
            alt="${pais.flags.alt}" 
        />
        <p>${pais.name.common}</p>
        `

        paisdiv.addEventListener("click", () => irParaDetalhesDoPais(pais.cca2))

        todosPaisesDiv.appendChild(paisdiv)
    }
}

function buscarPaises(value) {
    var paisesBuscados = []

    for (pais of todosPaises) {
        var nome = pais.name.common.toLowerCase()
        if (nome.startsWith(value.toLowerCase())) {
            paisesBuscados.push(pais)
        }
    }

    mostrarPaises(paisesBuscados)
}

function pesquisarPaisPorFiltro(value){
    var url = ""
    if(value !="all"){
        url = "region/" + value
    }else{
        url = "all"
    }
    consultarPaises(url)
}

function irParaDetalhesDoPais(codigo) {
    window.location.href = `detalhes.html?code=${codigo}`
}

consultarPaises("all")
