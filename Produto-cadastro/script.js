class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.produtoEditado = {};
    this.isEdicao = false;
  }
  adicionar() {
    let produto = this.lerdados();
    if (this.validar(produto) == true) {
      this.adicionarNaLista(produto);
    }
    this.listar();
  }
  lerdados() {
    let produto = {};

    produto.id = this.id;
    produto.produtoNome = document.getElementById("pdnome").value;
    produto.produtoPreco = document.getElementById("pdpreco").value;

    return produto;
  }
  validar(produto) {
    let msg = "";
    if (produto.produtoNome == "") {
      msg += "Por favor, insira o nome do produto \n";
    }
    if (produto.produtoPreco == "") {
      msg += "Por favor, insira o valor do preço do produto \n";
    }
    if (msg != "") {
      alert(msg);
      return false;
    }
    return true;
  }
  adicionarNaLista(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
    this.salvar();
    this.limpar();
  }
  listar() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_preco = tr.insertCell();
      let td_del = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_nome.innerText = this.arrayProdutos[i].produtoNome;
      td_preco.innerText = this.arrayProdutos[i].produtoPreco;
      let imagem = document.createElement("i");
      imagem.setAttribute("onclick", "produto.Deletar(" + this.arrayProdutos[i].id + ")");
      imagem.setAttribute("class", "fa fa-trash");
      td_del.appendChild(imagem);

      let iconeEditar = document.createElement("i");
      iconeEditar.setAttribute("onclick", "produto.editar(" + this.arrayProdutos[i].id + ")");
      iconeEditar.setAttribute("class", "fa fa-pen");
      td_del.appendChild(iconeEditar);
    }
  }
  Cancelar() {
    document.getElementById("pdnome").value = "";
    document.getElementById("pdpreco").value = "";
  }
  Deletar(id) {
    let tbody = document.getElementById("tbody");
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos.splice(i, 1);
        tbody.deleteRow(i);
      }
    }
    this.salvar();
    alert("O item foi apagado com sucesso");
  }
  salvar() {
    localStorage.setItem("produtos", JSON.stringify(this.arrayProdutos));
  }
  carregar() {
    let produtoSalvos = localStorage.getItem("produtos");

    if (produtoSalvos) {
      this.arrayProdutos = JSON.parse(produtoSalvos);
      this.id = this.arrayProdutos[this.arrayProdutos.length - 1].id + 1;
      this.listar();
    }
  }

  editar(id) {
    // this.arrayProdutos.forEach((prod,i) => {
    //   if (prod.id === id) {
    //     this.produtoEditado = prod;
    //   }
    // });
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id === id) {
        this.produtoEditado = this.arrayProdutos[i];
      }
    }

    document.getElementById("pdnome").value = this.produtoEditado.produtoNome;
    document.getElementById("pdpreco").value = this.produtoEditado.produtoPreco;
    this.isEdicao = true;
    /**
     * 1.mostrar  botao atualizar
     * 2.esconder o botao adcionar
     */
    document.getElementById("atualiza").style.display = "block";
    document.getElementById("adicio").style.display = "none";
  }
  limpar() {
    document.getElementById("pdnome").value = "";
    document.getElementById("pdpreco").value = "";
  }
  atualizar() {
    var produto = {
      produtoNome: document.getElementById("pdnome").value,
      produtoPreco: document.getElementById("pdpreco").value,
    };
    if (this.validar(produto) == true) {
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id === this.produtoEditado.id) {
          this.arrayProdutos[i].produtoNome = document.getElementById("pdnome").value;
          this.arrayProdutos[i].produtoPreco = document.getElementById("pdpreco").value;
        }
      }
      this.limpar();
      this.listar();
      this.salvar();
      /**
       * 1.esconder o botao atualizar
       * 2.mostrar botao adcionar
       */
      document.getElementById("atualiza").style.display = "none";
      document.getElementById("adicio").style.display = "block";
    }
  }

  //fimclasse
}
var produto = new Produto();
produto.carregar();
