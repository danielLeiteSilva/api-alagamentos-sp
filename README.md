# API alagamentos na cidade de São Paulo

Essa é uma API que visa trazer dados de locais que tiveram alagamentos na cidade de São Paulo. Com esses dados, podemos realizar a monitoração dos locais que mais alagam e, também, minerar esses dados para criar soluções mais efetivas através de ciência de dados.

## Documentação da API

#### Retorna a data do alagamento e uma lista de endereços com latitude, longitude e hora dos alagamentos

#### Endereço de API

```url
http://google.com.br
```

#### Requisição HTTP

```http
  POST /api/v1/alagamentos/data
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
##


#### Retorna uma lista de datas dos alagamentos em um determinado intervalo

#### Requisição HTTP

```http
  POST /api/v1/alagamentos/periodo
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `start_date` | `01/01/2020` | **Obrigatório** |
| `end_date`   | `10/01/2020` | **Obrigatório** |


#### Exemplo de requisição

```JSON
{
  "start_date": "01/01/2020"
  "end_date": "02/01/2020"
}

```

#### Exemplo de retorno

```JSON
[
    {
        "date": "01-01-2024",
        "list_address": [
            {
                "address": "r carlos garcia - sao paulo, sp",
                "locale": {
                    "lat": -23.5712518,
                    "lng": -46.7694316
                },
                "hour": "de 06:34 a 08:07"
            },
            {
                "address": "av santo amaro - sao paulo, sp",
                "locale": {
                    "lat": -23.5712518,
                    "lng": -46.7694316
                },
                "hour": "de 06:34 a 08:07"
            }
        ]
    },
    {
        "date": "02-01-2024",
        "list_address": [
            {
                "address": "r universal - sao paulo, sp",
                "locale": {
                    "lat": -23.5712518,
                    "lng": -46.7694316
                },
                "hour": "de 06:34 a 08:07"
            }
        ]
    }
]
```