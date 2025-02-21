actor MeuDapp {
  // Declaração de Variáveis
  let numero1 : Nat = 10;
  let numero2 : Int = 20;
  let mensagem : Text = "Meu primeiro Dapp";

  // Função para somar dois números do tipo Nat
  func somar(a : Nat, b : Nat) : Nat {
    a + b
  };

  // Função para subtrair dois números do tipo Nat
  func subtrair(a : Nat, b : Nat) : Nat {
    a - b
  };

  // Função para multiplicar dois números do tipo Nat
  func multiplicar(a : Nat, b : Nat) : Nat {
    a * b
  };
};
