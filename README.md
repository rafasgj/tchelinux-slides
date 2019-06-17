Tchelinux Slides
================

Este projeto cria uma plataforma para a distribuição de apresentações e
arquivos utilizados nas palestras dos eventos do grupo de usuários Tchelinux.
O objetivo do projeto é prove uma forma de distribuir estes arquivos a partir
de um _site_ estático, permitindo o uso de ferramentas como Github Pages.

## Adição de apresentações

O diretório `tchelinux` contém uma estrutura de diretórios contendo
`ano/cidade` onde os arquivos PDF são armazenados. Os nomes das cidades são os
mesmos nomes utilizados nos CNAME dos eventos realizados na cidade. Obviamente,
o ano é o ano de realização do evento. Na ocasião de ocorrer mais de um evento
por ano na cidade, todos os arquivos serão armazenados no mesmo diretório.

No mesmo diretório `tchelinux`, é armazenado um arquivos JSON, `slides.json`,
que contém a descrição dos dados que serão mostrados aos usuários.

### Regras de nomenclatura

Sugere-se que os nomes dos arquivos contendo os _slides_ sejam criados com
_**nome*-**título**.pdf_, porém, qualquer nome "suficientemente único" será
aceito.

As únicas regras que não devem ser quebradas são:
    * Não serão aceitos espaços nos nomes de arquivo, pois dificultam a sua
    manipulação, tanto no console quanto na URL;
    * Não serão aceitos arquivos que possua caracteres fora do padrão ASCII
    7-bits (o que exclui os caracteres acentuados), pelos motivos anteriores,
    e para evitar problemas de codificação de caracteres entre diferentes
    sistemas.

Exemplo de nome de arquivo válido: **uma-apresentacao-no-tchelinux.pdf**

Um exemplo ainda melhor: **nome_do_autor-uma_apresentacao_no_tchelinux.pdf**

Um péssimo exemplo, mas válido: **c097177fbe25c1894d2115272454742e.pdf** (sim,
é o MD5 do nome anterior).

## JSON Schema

O arquivo `slides.schema` contém o JSON schema do arquivo `slides.json.`

A validação foi verificada com o `jsonschema` disponível no PyPi.
