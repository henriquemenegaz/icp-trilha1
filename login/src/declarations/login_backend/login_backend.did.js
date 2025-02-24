export const idlFactory = ({ IDL }) => {
  const Tarefa = IDL.Record({
    'id' : IDL.Nat,
    'categoria' : IDL.Text,
    'descricao' : IDL.Text,
    'urgente' : IDL.Bool,
    'concluida' : IDL.Bool,
  });
  return IDL.Service({
    'addTarefa' : IDL.Func([IDL.Text, IDL.Text, IDL.Bool, IDL.Bool], [], []),
    'alterarTarefa' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Bool, IDL.Bool],
        [],
        [],
      ),
    'excluirTarefa' : IDL.Func([IDL.Nat], [], []),
    'getTarefas' : IDL.Func([], [IDL.Vec(Tarefa)], []),
    'get_principal_client' : IDL.Func([], [IDL.Text], []),
    'totalTarefasConcluidas' : IDL.Func([], [IDL.Nat], []),
    'totalTarefasEmAndamento' : IDL.Func([], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
