actor MeuDapp {
  // Declaração de Variáveis
  let numero1 : Nat = 10;
  let numero2 : Int = 20;
  let mensagem : Text = "Meu primeiro Dapp";

  public query func chamarSomar(a : Nat, b : Nat) : async Nat {
    return a + b;
  };

  public query func chamarSubtrair(a : Nat, b : Nat) : async Nat {
    return a - b;
  };

  public query func chamarMultiplicar(a : Nat, b : Nat) : async Nat {
    return a*b;
  };
};
