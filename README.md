#  Catálogo de Jogos (CRUD)

Este é um projeto de um catálogo de jogos pessoal, desenvolvido como um aplicativo web completo no estilo "CRUD" (Create, Read, Update, Delete).

### [Clique aqui para ver o site no ar (Deploy Vivo)](https://crud-jogos.vercel.app/)

---

## ✨ Funcionalidades Principais

* **CRUD Completo:** Adicione, edite e exclua jogos da sua lista.
* **Assistente de API:** Busca títulos de jogos em tempo real usando a API da [RAWG.io](https://rawg.io/) para autocompletar o nome.
* **Persistência de Dados:** Os jogos são salvos no `localStorage` do navegador, para que sua lista não desapareça ao recarregar a página.
* **Filtragem e Busca:** A lista de jogos pode ser filtrada por Gênero, Status (Jogando, Zerado, etc.) e buscada por título.
* **Design Responsivo:** O layout se adapta perfeitamente a telas de desktop e dispositivos móveis.
* **Feedback Visual:** Notificações "toast" (com `react-toastify`) informam o usuário sobre ações bem-sucedidas (adicionar, editar, excluir).

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído do zero utilizando as seguintes tecnologias:

* **Front-end:** [React](https://reactjs.org/) (com Hooks e Gerenciamento de Estado)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (para estilização "utility-first" e design responsivo)
* **API Externa:** [RAWG.io Video Games Database API](https://rawg.io/apidocs)
* **Deploy:** [Vercel](https://vercel.com/victor-stavarengos-projects/crud-jogos)

---

## 🖼️ Screenshots

### Layout Desktop
(Aqui você pode colar uma das screenshots do seu app em tela cheia)
![Layout Desktop do App](<img width="1919" height="944" alt="Captura de tela 2025-11-14 150026" src="https://github.com/user-attachments/assets/b13ddfd7-4eac-4b49-bd84-8ddda910ff87" />

) 

### Layout Mobile
(Aqui você pode colar a screenshot do modo celular)
![Layout Mobile do App](<img width="1363" height="943" alt="Captura de tela 2025-11-14 150042" src="https://github.com/user-attachments/assets/34d568da-bdd2-4680-bac2-10243313002f" />
)

---

## 🚀 Como Rodar o Projeto Localmente

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/VictorStavarengo/crud-jogos.git](https://github.com/VictorStavarengo/crud-jogos.git)
   


2.  Entre na pasta do projeto e instale as dependências:
    ```bash
    cd crud-jogos
    npm install
    ```

3.  Crie um arquivo `.env.local` na raiz do projeto. Você precisará de uma chave de API gratuita do site [RAWG.io](https://rawg.io/apidocs) e adicione-a ao arquivo:
    ```
    VITE_RAWG_API_KEY=sua_chave_secreta_aqui
    ```

4.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
