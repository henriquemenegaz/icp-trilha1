import { useState, useEffect } from 'react';
import { to_do_backend } from 'declarations/to_do_backend';

function tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [totalEmAndamento, setTotalEmAndamento] = useState(0);
  const [totalConcluidas, setTotalConcluidas] = useState(0);

  // Atualiza a lista de tarefas e os totalizadores
  async function atualizarDados() {
    await consultarTarefas();
    await obterTotais();
  }

  // Consulta a lista de tarefas
  async function consultarTarefas() {
    const lista = await to_do_backend.getTarefas();
    setTarefas(lista);
  }

  // Obtém os totalizadores de tarefas do backend
  async function obterTotais() {
    const totalAndamento = parseInt(await to_do_backend.totalTarefasEmAndamento());
    const totalConcl = parseInt(await to_do_backend.totalTarefasConcluidas());
    setTotalEmAndamento(totalAndamento);
    setTotalConcluidas(totalConcl);
  }

  // useEffect para inicializar os dados
  useEffect(() => {
    atualizarDados();
  }, []);

  async function excluir(id) {
    await to_do_backend.excluirTarefa(parseInt(id));
    atualizarDados();
  }

  async function alterar(id, categoria, descricao, urgente, concluida) {
    await p1_to_do_backend.alterarTarefa(parseInt(id), categoria, descricao, urgente, concluida);
    atualizarDados();
  }

  async function editar(id, categoria, descricao, urgente) {
    document.getElementById('formTarefas').elements['idTarefa'].value = id;
    document.getElementById('formTarefas').elements['categoria'].value = categoria;
    document.getElementById('formTarefas').elements['descricao'].value = descricao;
    document.getElementById('formTarefas').elements['urgente'].value = urgente;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const idTarefa = event.target.elements.idTarefa.value;
    const categoria = event.target.elements.categoria.value;
    const descricao = event.target.elements.descricao.value;
    const urgente = (event.target.elements.urgente.value === "false" ? false : true);

    if (idTarefa === null || idTarefa === "") {
      await p1_to_do_backend.addTarefa(descricao, categoria, false, false);
    } else {
      await p1_to_do_backend.alterarTarefa(parseInt(idTarefa), categoria, descricao, urgente, false);
    }

    atualizarDados();

    event.target.elements.idTarefa.value = "";
    event.target.elements.categoria.value = "";
    event.target.elements.descricao.value = "";
    event.target.elements.urgente.value = "";
  }

  return (
    <main class="mt-[30px] mx-[30px]">
      {/* Formulário para adicionar/alterar tarefas */}
      <form id="formTarefas" class="flex space-x-4" onSubmit={handleSubmit}>
        <div class="w-[15%]">
          <select id="categoria" class="block w-full px-4 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
            <option selected>Categoria</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Saúde">Saúde</option>
            <option value="Casa">Casa</option>
            <option value="Lazer">Lazer</option>
            <option value="Estudo">Estudo</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Compras">Compras</option>
            <option value="Projetos">Projetos</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div class="w-[85%] relative">
          <input type="text" id="descricao" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Adicione uma tarefa" required />
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg">Adicionar</button>
        </div>
        <input type="hidden" name="idTarefa" />
        <input type="hidden" name="urgente" />
      </form>

      <br />

      {/* Tarefas em andamento */}
      <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold">Tarefas em andamento</h5>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200">
            {tarefas.filter(ta => !ta.concluida).map(ta => (
              <li class="py-3">
                <div class="flex items-center">
                  <div class="shrink-0">
                    <a onClick={() => alterar(ta.id, ta.categoria, ta.descricao, !ta.urgente, ta.concluida)} class="cursor-pointer">
                      {!ta.urgente ? (
                        <svg class="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ) : (
                        <svg class="w-6 h-6 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      )}
                    </a>
                  </div>
                  <div class="flex-1 min-w-0 ms-4">
                    <p class="text-sm font-medium text-gray-900 truncate">{ta.categoria}</p>
                    <p class="text-sm text-gray-500 truncate">{ta.descricao}</p>
                  </div>
                  <div class="inline-flex items-center">
                    <span onClick={() => alterar(ta.id, ta.categoria, ta.descricao, ta.urgente, !ta.concluida)} class="cursor-pointer mr-2">
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917L5.724 10.5L15 1.5" />
                      </svg>
                    </span>
                    <span onClick={() => editar(ta.id, ta.categoria, ta.descricao, ta.urgente)} class="cursor-pointer mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h-1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97l-8.415 8.385v3h3l8.385-8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </span>
                    <span onClick={() => excluir(ta.id)} class="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 7h16" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
                        <path d="M9 7v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Totalizador de tarefas em andamento */}
        <div class="mt-4 font-bold">
          TOTAL: {totalEmAndamento}
        </div>
      </div>

      <br />

      {/* Tarefas concluídas */}
      <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold">Tarefas concluídas</h5>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200">
            {tarefas.filter(ta => ta.concluida).map(ta => (
              <li class="py-3">
                <div class="flex items-center">
                  <div class="shrink-0">
                    {!ta.urgente ? (
                      <svg class="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ) : (
                      <svg class="w-6 h-6 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    )}
                  </div>
                  <div class="flex-1 min-w-0 ms-4">
                    <p class="text-sm font-medium text-gray-900 truncate">{ta.categoria}</p>
                    <p class="text-sm text-gray-500 truncate">{ta.descricao}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Totalizador de tarefas concluídas */}
        <div class="mt-4 font-bold">
          TOTAL: {totalConcluidas}
        </div>
      </div>
    </main>
  );
}

export default tarefas;
