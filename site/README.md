# Lucas ♥ Karen

Site comemorativo com a história de vocês: contador ao vivo desde o início
do namoro, números do chat (mensagens, mídias, "te amo"s), gráficos de
rotina, linha do tempo, o dia histórico de 28/06/2025, galeria de fotos e
uma carta.

É um site 100% estático (HTML + CSS + JS puro, sem build/instalação) —
pronto para subir no **GitHub Pages**.

## Ver localmente

Qualquer servidor estático serve. O mais simples:

```bash
cd site
python -m http.server 8000
```

Depois abra http://localhost:8000 no navegador.

> Não abra o `index.html` direto com duplo clique (`file://`) — os dados
> (`data/stats.json`, `data/photos.json`) são carregados via `fetch` e
> precisam de um servidor http.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado).
2. Dentro da pasta `site/`, rode:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin <URL_DO_SEU_REPOSITORIO>
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Source → Deploy from a branch**,
   escolha a branch `main` e a pasta `/ (root)`.
4. Em alguns minutos o site fica disponível em
   `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

## Como editar o conteúdo

Quase todo o texto personalizado está em **[data/content.js](data/content.js)**:

- `names` — nomes exibidos no site.
- `startDate` — data/hora usada no contador "Juntos há...".
- `milestones` — cards da linha do tempo ("Nossos marcos"). Tem dois itens
  marcados com ✏️ esperando vocês completarem com datas e histórias de
  vocês (primeiro encontro, aniversário, viagens etc). Pode adicionar
  quantos quiser, só copiar o formato de um item existente.
- `historicDay` — texto e foto da seção "Dia histórico" (28/06/2025).
- `letter` — texto da carta (cada item do array `paragraphs` é um
  parágrafo).

Basta editar o arquivo, salvar e atualizar a página.

## Dados e fotos

- `data/stats.json` — números gerados a partir do export do WhatsApp
  (total de mensagens, mídias, "te amo"s, horários, etc).
- `data/photos.json` — lista das fotos usadas na galeria.
- `assets/img/` — fotos (já redimensionadas/otimizadas para a web).

Se quiser atualizar os números/fotos com um export mais recente do
WhatsApp, os scripts usados para gerar esses arquivos
(`analyze.py` e `extract_photos.py`) estão na pasta acima de `site/`.
