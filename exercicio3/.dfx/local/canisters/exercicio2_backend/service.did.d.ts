import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'chamarMultiplicar' : ActorMethod<[bigint, bigint], bigint>,
  'chamarSomar' : ActorMethod<[bigint, bigint], bigint>,
  'chamarSubtrair' : ActorMethod<[bigint, bigint], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
