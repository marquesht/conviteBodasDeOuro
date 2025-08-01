# Bodas de Ouro - Zé Diniz & Maria das Graças

**Acesse a página aqui:** [https://convitebodas.netlify.app/](https://convitebodas.netlify.app/)

Este projeto é um site comemorativo para as Bodas de Ouro de Zé Diniz e Maria das Graças, marcando 50 anos de seu amor e dedicação. O site apresenta a história do casal, uma galeria de fotos, detalhes do local do evento, um formulário de RSVP e uma seção de sugestões de presentes com integração Pix.

## Sumário

* [Recursos](#recursos)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [API e Integração](#api-e-integracao)
* [Configuração e Instalação](#configuração-e-instalação)
* [Uso](#uso)
* [Personalização](#personalização)
* [Contribuindo](#contribuindo)
* [Licença](#licença)

---

## Recursos

* **Navegação com Rolagem Suave**: Navegação fácil para diferentes seções da página.
* **Galeria de Fotos Dinâmica**: Um carrossel de imagens responsivo com reprodução automática, navegação manual (setas e pontos) e funcionalidade de deslize para dispositivos de toque.
* **Seção "Nossa História"**: Uma seção dedicada para compartilhar a jornada do casal.
* **Detalhes do Local do Evento**: Fornece informações sobre o local da cerimônia e recepção, data e hora, incluindo um link para o mapa.
* **Formulário de RSVP**: Permite que os convidados confirmem sua presença e enviem uma mensagem ao casal. As submissões do formulário são integradas com o Google Sheets.
* **Seção de Sugestões de Presentes**: Exibe itens de presentes sugeridos com imagens, títulos e preços de produtos.
* **Doação Pix Integrada**: Os convidados podem optar por fazer uma doação Pix para um valor de presente sugerido, exibindo um QR code e um código "Pix Copia e Cola".
* **Integração com o Mercado Livre**: Opção de comprar diretamente os presentes sugeridos no Mercado Livre (ou outras plataformas de e-commerce) através de um link direto.
* **Design Responsivo**: Otimizado para vários tamanhos de tela, desde dispositivos móveis até desktops.

---

## Tecnologias Utilizadas

* **HTML5**: Estrutura da página web.
* **CSS3**: Estilização e design responsivo.
* **JavaScript (ES6+)**: Aprimora a interatividade e o conteúdo dinâmico.
* **Font Awesome**: Ícones utilizados em todo o site.
* **Google Fonts**: Fontes personalizadas para títulos (`Playfair Display`) e texto (`Montserrat`).

---

## Estrutura do Projeto

* ├── index.html
* ├── style.css
* ├── index.js
* ├── img/
* │   └── qrcodes/


---

## API e Integração

A funcionalidade do **Formulário de RSVP** e o salvamento dos dados são gerenciados por uma API simples, construída com **Google Apps Script**.

Quando um convidado preenche e envia o formulário na página web, os dados são enviados como uma requisição `HTTP POST` para um URL específico do Google Apps Script.

### Como a API funciona:
1.  **Recebimento de Dados**: O script `doPost` recebe os dados do formulário, garantindo que os nomes dos parâmetros correspondam aos cabeçalhos das colunas na sua planilha do Google Sheets.
2.  **Proteção contra Conflitos**: Um **bloqueio** (`LockService`) é utilizado para garantir que apenas uma requisição por vez possa escrever na planilha, evitando que os dados sejam corrompidos em caso de múltiplas submissões simultâneas.
3.  **Processamento**: O script adiciona um carimbo de data/hora (`Timestamp`) e anexa uma nova linha à planilha `DadosBodas` com as informações do convidado.
4.  **Resposta**: Envia uma mensagem de sucesso ou erro de volta para a página web, informando sobre o resultado da operação.

A configuração dessa API é detalhada na seção de **Personalização**.

---

## Configuração e Instalação

Para configurar este projeto localmente, siga estes passos:

1.  **Clone o repositório (ou baixe os arquivos):**
    ```bash
    git clone <URL-do-repositório>
    cd <pasta-do-projeto>
    ```
2.  **Abra o `index.html`:**
    Basta abrir o arquivo `index.html` em seu navegador da web. Não há processo de compilação necessário, pois é um site estático.

---

## Uso

* **Navegação**: Clique na seta "scroll down" na página inicial para navegar até a seção "Nossa História".
* **Galeria de Fotos**: Use as setas esquerda/direita ou os pontos de navegação para navegar pelas imagens. Em dispositivos de toque, você pode deslizar para a esquerda ou para a direita.
* **RSVP**: Preencha o formulário na seção "Confirme sua presença" e clique em "Confirmar presença" para enviar seus dados. *Nota: Isso requer que a integração com o Google Sheets seja configurada (consulte Personalização).*
* **Sugestão de Presente**: Clique em "Escolher Presente" em qualquer card de produto. Um modal aparecerá, dando-lhe opções para "Fazer Pix" ou "Comprar Presente no Site".
    * **Pix**: Se você escolher "Fazer Pix", outro modal aparecerá com um QR code e um código "Pix Copia e Cola". Você pode copiar o código para a sua área de transferência.
    * **Mercado Livre**: Se você escolher "Comprar Presente no Site", você será redirecionado para a página do produto no Mercado Livre.

---

## Personalização

### 1. Conteúdo do Cabeçalho (`index.html`)

* **Nomes**: Altere "Zé Diniz & Maria das Graças" na tag `<div class="couple-names">`.
* **Mensagem de Aniversário**: Atualize "50 anos de amor e dedicação" na tag `<div class="header-date">`.
* **Imagem de Fundo**: Substitua `img/bg1.jpg` no `style.css` (na regra `header`) pela imagem desejada.

### 2. Nossa História (`index.html`)

* **Conteúdo do Texto**: Modifique os parágrafos dentro da tag `<div class="story-text">` para contar sua própria história.
* **Imagem da História**: Altere `img/capa.jpg` na tag `<div class="story-image">` para sua imagem preferida.

### 3. Galeria de Fotos (`index.html` e pasta `img/`)

* **Adicionar/Remover Imagens**:
    * No `index.html`, dentro de `<div class="gallery-slider">`, adicione ou remova elementos `<div class="gallery-slide"><img src="./img/sua-imagem.jpg" /><div class="slide-caption">Sua Legenda</div></div>`.
    * Certifique-se de colocar suas imagens na pasta `img/`.
* **Atualizar Pontos de Navegação**: Para cada `gallery-slide` que você adicionar ou remover, você precisa atualizar a seção `<div class="gallery-nav">` no `index.html` adicionando ou removendo `<div class="gallery-dot" data-slide="X"></div>`. Certifique-se de que o atributo `data-slide` corresponda ao índice (baseado em 0) dos seus slides.

### 4. Detalhes do Local (`index.html`)

* **Nome do Local**: Atualize `<h3>Ginásio Poliesportivo</h3>`.
* **Endereço**: Altere o endereço na tag `<p>` com o ícone `fas fa-map-marker-alt`.
* **Data, Hora, Informações**: Modifique a data, hora e quaisquer informações adicionais conforme necessário.
* **Imagem do Mapa**: Atualize `img/quadra.jpg` com uma imagem do seu local, e considere alterar o `href` da tag `<a>` para um link direto do Google Maps do seu local.

### 5. Formulário de RSVP (Integração com Google Sheets) (`index.js`)

O formulário de RSVP usa o Google Apps Script para enviar dados para uma Planilha Google.

1.  **Crie uma Nova Planilha Google**: Vá para o Google Sheets e crie uma nova planilha em branco.
2.  **Obter URL do Script**:
    * Na Planilha Google, vá em `Extensões` > `Apps Script`.
    * Copie o código Apps Script fornecido (você precisará de um script básico para lidar com solicitações `POST` e anexar dados à planilha. Um padrão comum envolve uma função `doPost(e)`). Se você não tiver um, procure por "envio de formulário Google Apps Script para Planilha Google" para exemplos.
    * Quando seu script estiver pronto, **Implante** como um **Aplicativo da web**.
    * Defina "Executar como" para "Eu" e "Quem tem acesso" para "Qualquer pessoa".
    * Copie a "URL do aplicativo da web" que é gerada.
3.  **Atualize `scriptURL` em `index.js`**:
    Substitua o URL de espaço reservado em `const scriptURL = 'https://script.google.com/macros/s/AKfycbx0n0En-ry9Wf1U4LUOKcmBF5jtgd3N8OHxIGNAO_Nv98C7683Urk2ZR6eFfa_LBIBSnA/exec';` pelo URL do aplicativo da web que você copiou do Google Apps Script.

### 6. Sugestão de Presente - Integração Pix (`index.js` e pasta `img/qrcodes/`)

* **`PIX_KEY_FIXA`**: Atualize `const PIX_KEY_FIXA = "eltonpena59@gmail.com";` com sua chave Pix fixa real.
* **`PIX_DATA_POR_VALOR`**: Este objeto mapeia os preços dos produtos para suas respectivas imagens de QR code e códigos Pix BR.
    * Cada chave no objeto `PIX_DATA_POR_VALOR` deve ser a string exata `data-product-price` do seu `index.html` (por exemplo, `"50.80"`).
    * `qrCodeUrl`: Caminho para sua imagem de QR code pré-gerada. Você precisará gerar esses QR codes externamente (por exemplo, usando um gerador de QR code Pix) e salvá-los no diretório `img/qrcodes/`.
    * `pixBrCode`: A string real do Pix "Copia e Cola" para aquele valor específico.
    * **Importante**: Certifique-se de ter imagens de QR code e códigos BR correspondentes para cada preço de produto que você listar no site.
* **Cartões de Produto (`index.html`)**:
    * Para cada `<div class="product-card">`:
        * Atualize o `src` da tag `<img>` para o URL da imagem do seu produto.
        * Altere `<h3>` com a classe `product-title` para o nome do produto.
        * Atualize `<p>` com a classe `product-price` com o preço (por exemplo, `R$50,80`).
        * Crucialmente, atualize o atributo `data-product-price` no `<button class="choose-gift-button">` para corresponder à string de preço exata (por exemplo, `data-product-price="50.80"`). Esta string deve ser uma chave no seu objeto `PIX_DATA_POR_VALOR` em `index.js`.
        * Atualize o atributo `data-product-link` com o URL direto para o produto no Mercado Livre ou na plataforma de e-commerce escolhida.

### 7. Estilização (`style.css`)

* **Cores**: Modifique as variáveis CSS no topo do `style.css` (`--gold`, `--light-gold`, etc.) para alterar o esquema de cores do site.
* **Fontes**: Ajuste as propriedades `font-family`.
* **Layout**: Ajuste o preenchimento, margens e outras propriedades de layout para corresponder às suas preferências.

---

## Contribuindo

Sinta-se à vontade para fazer um fork deste repositório, fazer alterações e enviar pull requests. Quaisquer melhorias, correções de bugs ou novos recursos são bem-vindos!

---

## Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).
