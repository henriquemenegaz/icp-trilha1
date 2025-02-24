import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Tarefa {
  'id' : bigint,
  'categoria' : string,
  'descricao' : string,
  'urgente' : boolean,
  'concluida' : boolean,
}
export interface _SERVICE {
  'addTarefa' : ActorMethod<[string, string, boolean, boolean], undefined>,
  'alterarTarefa' : ActorMethod<
    [bigint, string, string, boolean, boolean],
    undefined
  >,
  'excluirTarefa' : ActorMethod<[bigint], undefined>,
  'getTarefas' : ActorMethod<[], Array<Tarefa>>,
  'get_principal_client' : ActorMethod<[], string>,
  'totalTarefasConcluidas' : ActorMethod<[], bigint>,
  'totalTarefasEmAndamento' : ActorMethod<[], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
