# Portal de IA Generativa 🧠🤖

Este é um portal educacional interativo e prático projetado para ensinar conceitos avançados de **Inteligência Artificial Generativa** de forma imersiva e visualmente deslumbrante, utilizando o padrão visual **Bento Grid**.

O portal foi desenvolvido em **React**, **TypeScript** e **Tailwind CSS**, integrando a API do **Gemini** como tutor interativo.

---

## 🗺️ Funcionalidades Principais

O aplicativo é dividido em quatro módulos dinâmicos principais:

### 1. 📖 Artigo Completo (Leitor Editorial)
* **Conteúdo Rico:** Guia didático detalhado sobre GANs, VAEs, Modelos Autorregressivos, Modelos de Difusão, e aplicações reais em saúde, finanças e desenvolvimento de software.
* **Filtros de Leitura:** Personalize sua experiência de leitura alterando o tamanho da fonte, espaçamento de linhas e filtros de tela (Modo Claro, Sépia e Modo Escuro).
* **Marcadores (Bookmarks):** Salve seções de interesse para ler mais tarde, com persistência automática no `localStorage`.

### 2. 🧪 Laboratório de Simuladores Interativos
Experimente simuladores de arquiteturas de IA em tempo real com feedbacks visuais ricos:
* **GAN (Redes Adversárias Generativas):** Ajuste a taxa de aprendizado e veja o duelo adversarial em tempo real entre o Gerador e o Discriminador para forjar imagens realistas.
* **VAE (Autocodificadores Variacionais):** Controle as dimensões do Espaço Latente e veja como a compactação e descompactação de dados geram novos rostos ou objetos.
* **LLM (Modelos Autorregressivos):** Simule a geração de tokens (palavras) baseada em probabilidades e ajuste parâmetros como Temperatura para obter maior ou menor criatividade.
* **DIFF (Modelos de Difusão):** Observe o processo de redução de ruído passo a passo (Denoising Steps) transformando estática pura em imagens de alta definição.

### 3. 🏆 Quiz & Certificado de Aproveitamento
* **Desafio Prático:** Teste seus conhecimentos teóricos e práticos com uma avaliação interativa de 5 questões contextualizadas.
* **Explicações Dinâmicas:** Receba feedbacks imediatos e explicações didáticas para cada alternativa selecionada.
* **Certificado Personalizável:** Insira seu nome e emita um certificado exclusivo de conclusão.
* **Suporte à Impressão (Print-Ready):** CSS otimizado para impressão que permite imprimir ou salvar o certificado como PDF perfeitamente formatado.

### 4. 💬 Tutor Virtual Inteligente (Gemini AI)
* **Chatbot Dedicado:** Esclareça dúvidas complexas sobre o artigo ou conceitos de Deep Learning em tempo real.
* **Powered by Gemini:** Integração robusta com os modelos do Gemini.
* **Sugestões de Perguntas:** Atalhos para perguntas frequentes para facilitar o aprendizado.

---

## 🎨 Design Theme: Bento Grid

O portal adota o design premium **Bento Grid**:
* **Estrutura Modular:** Organização da informação em cartões ("bento boxes") com gradientes sutis, bordas arredondadas e sombras finas.
* **Responsividade Completa:** Layout perfeitamente adaptado para dispositivos móveis, tablets e monitores ultra-wide.
* **Animações Fluidas:** Transições suaves de abas e estados com a biblioteca `motion` (Framer Motion).

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [React 18](https://react.dev/) com [Vite](https://vite.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animações:** [motion/react](https://www.framer.com/motion/) (Framer Motion)
* **Iconografia:** [Lucide React](https://lucide.dev/)
* **Inteligência Artificial:** [@google/genai SDK](https://github.com/google/generative-ai-js) (Gemini)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (v18 ou superior recomendado)
* Chave de API do Gemini (Google AI Studio)

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portal-ia-generativa.git
cd portal-ia-generativa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione sua chave do Gemini:
```env
GEMINI_API_KEY=sua_chave_aqui
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado!

---

## 📦 Build para Produção

Para gerar o build de produção otimizado:

```bash
npm run build
npm run start
```

---

## 🌐 Implantação no GitHub Pages (Ambiente Estático)

Como este projeto é um aplicativo full-stack com um backend Express opcional, nós o configuramos para ser **totalmente compatível com o GitHub Pages** (que é um servidor de arquivos 100% estático).

### ⚙️ Como Funciona o Suporte Estático:
1. **Caminhos Relativos:** O arquivo `vite.config.ts` está configurado com `base: './'`, permitindo que o site funcione perfeitamente dentro de subdiretórios no domínio `github.io` (ex: `https://seu-usuario.github.io/nome-do-repositorio/`).
2. **Fallback Cliente-Side:** Caso o aplicativo não consiga se comunicar com o backend Express (o que acontece em hosts estáticos), o Tutor de IA automaticamente tentará ler uma chave de API do Gemini configurada no cliente sob a variável `VITE_GEMINI_API_KEY`.

### 🚀 Publicando Automaticamente com GitHub Actions

O projeto já inclui um arquivo de workflow em `.github/workflows/deploy.yml`. Para publicar:

1. Suba o código para um repositório no GitHub.
2. (Opcional) No seu repositório do GitHub, vá em **Settings** > **Secrets and variables** > **Actions** e adicione o Secret `VITE_GEMINI_API_KEY` com sua chave do Google AI Studio se quiser que o Tutor funcione no ar.
3. No seu repositório, vá em **Settings** > **Pages**:
   * Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. Sempre que você fizer um `git push` para a branch `main` ou `master`, o GitHub Actions irá gerar a build estática e implantar o site automaticamente!

---

## 📄 Licença

Este projeto é de uso educacional e acadêmico. Sinta-se à vontade para utilizá-lo e adaptá-lo para seus próprios estudos.
