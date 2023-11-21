document.addEventListener("DOMContentLoaded", function () {
  let listaDeTarefas = [];
  const inputDaTarefa = document.querySelector(".input-da-tarefa");
  const formulario = document.querySelector("form");
  const listaDasTarefas = document.querySelector(".lista-das-tarefas");
  const botaoLimparTudo = document.querySelector(".limpar-tudo");

  const adicionarTarefas = () => {
    let conteudoTarefa = inputDaTarefa.value.trim();

    if (conteudoTarefa === "") {
      alert("Por favor, digite uma tarefa.");
      return;
    }

    const tarefaDuplicada = listaDeTarefas.some(
      (tarefa) => tarefa.descricao === conteudoTarefa
    );

    if (tarefaDuplicada) {
      alert("Esta tarefa já está na lista.");
    } else {
      listaDeTarefas.push({ descricao: conteudoTarefa, concluida: false });
      salvarNoLocalStorage();
      renderizarTarefas();
    }

    inputDaTarefa.value = "";
  };

  const renderizarTarefas = () => {
    listaDasTarefas.innerHTML = "";

    listaDeTarefas.forEach((tarefa, index) => {
      const li = document.createElement("li");
      li.className = "li-da-tarefa";

      const textoDaTarefa = document.createElement("p");
      textoDaTarefa.textContent = tarefa.descricao;

      const botaoApagar = document.createElement("button");
      botaoApagar.className = "botoes-do-li";
      botaoApagar.textContent = "Apagar";
      botaoApagar.addEventListener("click", () => apagarTarefa(index));

      const botaoConcluir = document.createElement("button");
      botaoConcluir.className = "botoes-do-li";
      botaoConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
      botaoConcluir.addEventListener("click", () => toggleConcluida(index));

    const divDosBotoes = document.createElement("div")
    divDosBotoes.className = "div-dos-botoes"

    divDosBotoes.appendChild(botaoApagar);
    divDosBotoes.appendChild(botaoConcluir);

      li.appendChild(textoDaTarefa);
      li.appendChild(divDosBotoes)

      if (tarefa.concluida) {
        li.style.backgroundColor = "green";
      }

      listaDasTarefas.appendChild(li);
    });
  };

  const apagarTarefa = (index) => {
    listaDeTarefas.splice(index, 1);
    salvarNoLocalStorage();
    renderizarTarefas();
  };

  const toggleConcluida = (index) => {
    listaDeTarefas[index].concluida = !listaDeTarefas[index].concluida;
    salvarNoLocalStorage();
    renderizarTarefas();
  };

  const limparTudo = () => {
    listaDeTarefas = [];
    salvarNoLocalStorage();
    renderizarTarefas();
  };

  const salvarNoLocalStorage = () => {
    localStorage.setItem("listaDeTarefas", JSON.stringify(listaDeTarefas));
  };

  const carregarDoLocalStorage = () => {
    const storageData = localStorage.getItem("listaDeTarefas");
    listaDeTarefas = storageData ? JSON.parse(storageData) : [];
  };

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionarTarefas();
  });

  botaoLimparTudo.addEventListener("click", limparTudo);

  carregarDoLocalStorage();
  renderizarTarefas();
});

