import { useState } from 'react';
import {createActor, login_backend} from 'declarations/login_backend';
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";

let actorLoginBackend = login_backend;

function App() {  

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Utilizado para apresentar os botão Login e Logout

  async function login() {

      // Criar o authClient
      let authClient = await AuthClient.create();

      // Inicia o processo de login e aguarda até que ele termine
      await authClient.login({
        // Redireciona para o provedor de identidade da ICP (Internet Identity)
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {   
          // Se entrar neste bloco então a autenticação ocorreu com sucesso!
          const identity = authClient.getIdentity();
          console.log(identity.getPrincipal().toText()); // Já é possivel ter acesso ao Principal do usuário atenticado         
          
          /* A identidade do usuário autenticado poderá ser utilizada para criar um HttpAgent.
             Ele será posteriormente utilizado para criar o Actor (autenticado) correspondente ao Canister de Backend  */
          const agent = new HttpAgent({identity});
          /* O comando abaixo irá criar um Actor autenticado correspondente ao Canister de Backend  
            desta forma, todas as chamadas realizadas a metodos SHARED no Backend irão receber o "Principal" do usuário */
          actorLoginBackend = createActor(process.env.CANISTER_ID_LOGIN_BACKEND, {
              agent,
          });
          
          const principalText = await actorLoginBackend.get_principal_client();          
          setIsLoggedIn(true);
          document.getElementById("principalText").innerText = principalText;     
          //O principal anônimo no Internet Computer é representado pelo valor textual "2vxsx-fae".   

        },
        
        windowOpenerFeatures: `
                                left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705
                              `,
      })
      
      return false;
      
  };

  async function logout() {
      const authClient = await AuthClient.create();        
      await authClient.logout();     
      document.getElementById("principalText").innerText = "";
      setIsLoggedIn(false);
  };  

  // Esconder o botão de logout até que o usuário faça login
  document.addEventListener("DOMContentLoaded", function() {    
     document.getElementById("logout").style.display = "none";
  });

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />      
      <div class="panel">   
        {/* Botão de login */}
        {!isLoggedIn && <button id="login" onClick={login}>Login</button>}
        {/* Botão de logout */}
        {isLoggedIn && <button id="logout" onClick={logout}>Logout</button>}
        <br/>
        {/* Campo para exibir o principal do usuário */}
        <label id="principalText"></label>                  
      </div>
    </main>
  );
}

export default App;
