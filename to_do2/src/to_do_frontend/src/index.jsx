import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import { createActor, to_do_backend } from 'declarations/to_do_backend';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

let actorToDoBackend = to_do_backend;

function Index() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    async function login() {
        let authClient = await AuthClient.create();
        await authClient.login({
            identityProvider: "https://identity.ic0.app/#authorize",
            onSuccess: async () => {
                const identity = authClient.getIdentity();
                console.log(identity.getPrincipal().toText());
                const agent = new HttpAgent({ identity });
                actorToDoBackend = createActor(process.env.CANISTER_ID_TO_DO_BACKEND, { agent });
                setIsLoggedIn(true);
                window.location.href = "/tarefas/";
            },
            windowOpenerFeatures: `
        left=${window.screen.width / 2 - 525 / 2},
        top=${window.screen.height / 2 - 705 / 2},
        toolbar=0,location=0,menubar=0,width=525,height=705
      `,
        });
        return false;
    };

    async function logout() {
        const authClient = await AuthClient.create();
        await authClient.logout();
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">TO-DO</h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Controle suas tarefas 100% onchain na ICP!</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    {!isLoggedIn && <button class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" id="login" onClick={login}>Login</button>}
                    {isLoggedIn && <button class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" id="logout" onClick={logout}>Logout</button>}
                </div>
            </div>
        </section>
    );
}

export default Index;
