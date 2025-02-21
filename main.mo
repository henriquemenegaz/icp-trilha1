import Buffer "mo:base/Buffer";

actor Main {
  type Buffer<X> = Buffer.Buffer<X>;

  // Buffer que armazena nomes do tipo Text
  var pessoas : Buffer<Text> = Buffer.Buffer<Text>(0);

  public func adicionarPessoa(nomePessoa : Text) : async () {
    pessoas.add(nomePessoa); // Adiciona o nome ao final do Buffer
  };

  public query func listarPessoas() : async [Text] {
    return Buffer.toArray(pessoas); // Converte o Buffer em um Array para retornar
  };
};
