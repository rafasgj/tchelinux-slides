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

## JSON Schema

O arquivo `slides.schema` contém o JSON schema do arquivo `slides.json.`

A validação foi verificada com o `jsonschema` disponível no PyPi.
