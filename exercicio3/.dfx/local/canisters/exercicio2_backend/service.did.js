export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'chamarMultiplicar' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], ['query']),
    'chamarSomar' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], ['query']),
    'chamarSubtrair' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
