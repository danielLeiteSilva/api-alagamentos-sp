# API alagamentos na cidade de São Paulo

Essa é uma API que visa trazer dados de locais que tiveram alagamentos na cidade de São Paulo. Com esses dados, podemos realizar a monitoração dos locais que mais alagam e, também, minerar esses dados para criar soluções mais efetivas através de ciência de dados.

## Documentação da API

#### Retorna a data do alagamento e uma lista de endereços com latitude, longitude e hora dos alagamentos

```http
  POST /api/v1/alagamentos
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `data` | `01/01/2020` | **Obrigatório** |

#### Exemplo de requisição

```JSON
{
  "data": "29/01/2024"
}

```

#### Exemplo de retorno
```JSON
{
    "date": "29-01-2024",
    "list_address": [
        {
            "address": "r carlos garcia - sao paulo, sp",
            "locale": {
                "lat": -23.5712518,
                "lng": -46.7694316
            },
            "hour": "de 06:34 a 08:07"
        }
    ]
}
```
