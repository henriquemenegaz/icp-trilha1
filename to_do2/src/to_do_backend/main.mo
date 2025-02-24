import Buffer "mo:base/Buffer";
actor {
  type Tarefa = {
    id : Nat; // Identificador único da tarefa
    categoria : Text; // Categoria da tarefa
    descricao : Text; // Descrição detalhada da tarefa
    urgente : Bool; // Indica se a tarefa é urgente (true) ou não (false)
    concluida : Bool; // Indica se a tarefa foi concluída (true) ou não (false)
  };

  // ... declaração do type ...
  var idTarefa : Nat = 0;
  var tarefas : Buffer.Buffer<Tarefa> = Buffer.Buffer<Tarefa>(10);

  // Função para adicionar itens ao buffer 'tarefas'.
  public func addTarefa(desc : Text, cat : Text, urg : Bool, con : Bool) : async () {

    idTarefa += 1;
    let t : Tarefa = {
      id = idTarefa;
      categoria = cat;
      descricao = desc;
      urgente = urg;
      concluida = con;
    };

    tarefas.add(t);
  };

  // Função para remover itens ao buffer 'tarefas'.
  public func excluirTarefa(idExcluir : Nat) : async () {

    func localizaExcluir(_ : Nat, x : Tarefa) : Bool {
      return x.id != idExcluir;
    };

    tarefas.filterEntries(localizaExcluir);

  };

  // Função para alterar itens ao buffer 'tarefas'.
  public func alterarTarefa(
    idTar : Nat,
    cat : Text,
    desc : Text,
    urg : Bool,
    con : Bool,
  ) : async () {

    let t : Tarefa = {
      id = idTar;
      categoria = cat;
      descricao = desc;
      urgente = urg;
      concluida = con;
    };

    func localizaIndex(x : Tarefa, y : Tarefa) : Bool {
      return x.id == y.id;
    };

    let index : ?Nat = Buffer.indexOf(t, tarefas, localizaIndex);

    switch (index) {
      case (null) {
        // não foi localizado um index
      };
      case (?i) {
        tarefas.put(i, t);
      };
    };

  };

  //Esta função irá retornar todas as tarefas do Buffer.
  public func getTarefas() : async [Tarefa] {
    return Buffer.toArray(tarefas);
  };

  // Função para contar total de tarefas em andamento
  public func totalTarefasEmAndamento() : async Nat {
    var total : Nat = 0;
    for (tarefa in tarefas.vals()) {
      if (not tarefa.concluida) {
        total += 1;
      };
    };
    return total;
  };

  // Função para contar total de tarefas concluídas
  public func totalTarefasConcluidas() : async Nat {
    var total : Nat = 0;
    for (tarefa in tarefas.vals()) {
      if (tarefa.concluida) {
        total += 1;
      };
    };
    return total;
  };
};
