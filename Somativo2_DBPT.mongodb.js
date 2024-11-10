// EQUIPE:
// Amanda Queiroz Sobral
// Carlos Eduardo Domingues Hobmeier
// João Vitor de Freitas


// 1. Modelagem de Dados:
//    - Desenhe um esquema de modelagem de dados para o sistema no MongoDB.
//      Considere o uso de documentos incorporados e referências onde apropriado.
//      Pode ser feito em UML ou em DER.


// R: 1 - modelagem.png


///////////////////////////////////////////////////////////////////////////////////

// 2. Inserção e Validação:

//    - Crie collections e schema validations necessários.

const banco = "banco_mongodb";
use(banco);

db.createCollection("usuario", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "nome", "email", "endereco", "senha"],
            properties: {
                id: {
                    bsonType: "int",
                    minimum: 0,
                    description: "o ID do usuário deve ser um número inteiro positivo",
                },
                nome: {
                    bsonType: "string",
                    minLength: 3,
                    description: "deve ser uma string com pelo menos 3 caracteres",
                },
                email: {
                    bsonType: "string",
                    pattern: "^.+@.+\\..+$",
                    description: "deve estar em um formato válido de endereço de email",
                },
                endereco: {
                    bsonType: "string",
                    minLength: 5,
                    description: "deve ser um endereço válido",
                },
                senha: {
                    bsonType: "string",
                    minLength: 8,
                    description: "deve ser uma string com pelo menos 8 caracteres",
                },
            },
        },
    },
    validationLevel: "strict",
    validationAction: "error",
});


db.createCollection("produto", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "nome", "descricao", "preco", "quantidadeEmEstoque", "categoriaId", "subcategoriaId"],
            properties: {
                id: {
                    bsonType: "int",
                    minimum: 0,
                    description: "ID do produto, deve ser um número inteiro positivo"
                },
                nome: {
                    bsonType: "string",
                    minLength: 3,
                    description: "Nome do produto, deve ter pelo menos 3 caracteres"
                },
                descricao: {
                    bsonType: "string",
                    minLength: 10,
                    description: "Descrição do produto, deve ter pelo menos 10 caracteres"
                },
                preco: {
                    bsonType: "double",
                    minimum: 0,
                    description: "Preço do produto, deve ser um valor positivo"
                },
                quantidadeEmEstoque: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Quantidade em estoque, deve ser um número inteiro positivo"
                },
                categoriaId: {
                    bsonType: "int",
                    description: "ID da categoria à qual o produto pertence"
                },
                subcategoriaId: {
                    bsonType: "int",
                    description: "ID da subcategoria à qual o produto pertence"
                },
            },
        },
    },
    validationLevel: "strict",
    validationAction: "error",
});


db.createCollection("transacao", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "usuarioId", "produtoId", "quantidade", "data"],
            properties: {
                id: {
                    bsonType: "int",
                    minimum: 0,
                    description: "ID da transação, deve ser um número inteiro positivo",
                },
                usuarioId: {
                    bsonType: "int",
                    description: "ID do usuário que realizou a transação"
                },
                produtoId: {
                    bsonType: "int",
                    description: "ID do produto comprado na transação"
                },
                quantidade: {
                    bsonType: "int",
                    minimum: 1,
                    description: "Quantidade de produtos comprados, deve ser um número positivo"
                },
                data: {
                    bsonType: "date",
                    description: "Data da transação"
                },
            },
        },
    },
    validationLevel: "strict",
    validationAction: "error",
});


db.createCollection("avaliacao", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nota", "usuarioId", "produtoId"],
            properties: {
                nota: {
                    bsonType: "int",
                    minimum: 0,
                    maximum: 10,
                    description: "Nota da avaliação, deve ser um número inteiro entre 0 e 10",
                },
                comentario: {
                    bsonType: ["string", "null"],
                    description: "Comentário opcional da avaliação"
                },
                usuarioId: {
                    bsonType: "int",
                    description: "ID do usuário que fez a avaliação"
                },
                produtoId: {
                    bsonType: "int",
                    description: "ID do produto avaliado"
                },
            },
        },
    },
    validationLevel: "strict",
    validationAction: "error",
});


db.createCollection("categoria", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome"],
            properties: {
                id: {
                    bsonType: "int",
                    minimum: 0,
                    description: "ID da categoria, deve ser um número inteiro positivo"
                },
                nome: {
                    bsonType: "string",
                    minLength: 3,
                    description: "Nome da categoria, deve ter pelo menos 3 caracteres"
                },
            },
        },
    },
    validationLevel: "strict",
    validationAction: "error",
});


db.createCollection("subcategoria", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "nome", "categoriaId"],
            properties: {
                id: {
                    bsonType: "int",
                    minimum: 0,
                    description: "ID da subcategoria, deve ser um número inteiro positivo"
                },
                nome: {
                    bsonType: "string",
                    minLength: 3,
                    description: "Nome da subcategoria, deve ter pelo menos 3 caracteres"
                },
                categoriaId: {
                    bsonType: "int",
                    description: "ID da categoria de onde advém, deve ser um número inteiro positivo"
                },
            },
        },
    },
    validationLevel: "strict",
    validationAction: "error",
});



//    - Insira alguns usuários, produtos e categorias de exemplo no banco de dados
//      (pelo menos 5 para cada).


db.usuario.insertMany([
    { id: 1, nome: "Alice", email: "alice@example.com", endereco: "Rua A, 123", senha: "senha1234" },
    { id: 2, nome: "Bob", email: "bob@example.com", endereco: "Rua B, 456", senha: "senha5678" },
    { id: 3, nome: "Carlos", email: "carlos@example.com", endereco: "Rua C, 789", senha: "senha91011" },
    { id: 4, nome: "Diana", email: "diana@example.com", endereco: "Rua D, 101", senha: "senha1213" },
    { id: 5, nome: "Eva", email: "eva@example.com", endereco: "Rua E, 202", senha: "senha1415" },
    { id: 6, nome: "Felipe", email: "felipe@example.com", endereco: "Rua F, 303", senha: "senha1617" },
    { id: 7, nome: "Gabriela", email: "gabriela@example.com", endereco: "Rua G, 404", senha: "senha1819" },
    { id: 8, nome: "Henrique", email: "henrique@example.com", endereco: "Rua H, 505", senha: "senha2021" },
    { id: 9, nome: "Irene", email: "irene@example.com", endereco: "Rua I, 606", senha: "senha2223" },
    { id: 10, nome: "João", email: "joao@example.com", endereco: "Rua J, 707", senha: "senha2425" }
]);


db.categoria.insertMany([
    { id: 1, nome: "Eletrônicos" },
    { id: 2, nome: "Vestuário" },
    { id: 3, nome: "Alimentos" },
    { id: 4, nome: "Livros" },
    { id: 5, nome: "Esportes" },
    { id: 6, nome: "Beleza" },
    { id: 7, nome: "Brinquedos" },
    { id: 8, nome: "Móveis" },
    { id: 9, nome: "Automóveis" },
    { id: 10, nome: "Ferramentas" }
]);


db.subcategoria.insertMany([
    { id: 1, nome: "Celulares", categoriaId: 1 },
    { id: 2, nome: "Notebooks", categoriaId: 1 },
    { id: 3, nome: "Camisetas", categoriaId: 2 },
    { id: 4, nome: "Calçados", categoriaId: 2 },
    { id: 5, nome: "Ficção", categoriaId: 4 },
    { id: 6, nome: "Suspense", categoriaId: 4 },
    { id: 7, nome: "Ciclismo", categoriaId: 5 },
    { id: 8, nome: "Fitness", categoriaId: 5 },
    { id: 9, nome: "Maquiagem", categoriaId: 6 },
    { id: 10, nome: "Cuidados com a pele", categoriaId: 6 }
]);


db.produto.insertMany([
    { id: 1, nome: "iPhone 13", descricao: "Smartphone da Apple com 128GB", preco: 6999.99, quantidadeEmEstoque: 10, categoriaId: 1, subcategoriaId: 1 },
    { id: 2, nome: "Galaxy S21", descricao: "Smartphone da Samsung com 128GB", preco: 5499.99, quantidadeEmEstoque: 15, categoriaId: 1, subcategoriaId: 1 },
    { id: 3, nome: "MacBook Pro", descricao: "Notebook da Apple com 16GB RAM", preco: 12999.99, quantidadeEmEstoque: 5, categoriaId: 1, subcategoriaId: 2 },
    { id: 4, nome: "Dell XPS 13", descricao: "Notebook Dell de alta performance", preco: 8999.99, quantidadeEmEstoque: 8, categoriaId: 1, subcategoriaId: 2 },
    { id: 5, nome: "Camiseta Branca", descricao: "Camiseta de algodão branca", preco: 29.99, quantidadeEmEstoque: 100, categoriaId: 2, subcategoriaId: 3 },
    { id: 6, nome: "Tênis de Corrida", descricao: "Tênis para corrida esportiva", preco: 199.99, quantidadeEmEstoque: 50, categoriaId: 2, subcategoriaId: 4 },
    { id: 7, nome: "Livro de Ficção", descricao: "Livro de aventura e fantasia", preco: 39.99, quantidadeEmEstoque: 30, categoriaId: 4, subcategoriaId: 5 },
    { id: 8, nome: "Livro de Suspense", descricao: "Livro de mistério e investigação", preco: 49.99, quantidadeEmEstoque: 20, categoriaId: 4, subcategoriaId: 6 },
    { id: 9, nome: "Bicicleta Mountain Bike", descricao: "Bicicleta para trilhas e montanhas", preco: 1200.99, quantidadeEmEstoque: 10, categoriaId: 5, subcategoriaId: 7 },
    { id: 10, nome: "Halteres de 10kg", descricao: "Par de halteres para musculação", preco: 150.99, quantidadeEmEstoque: 40, categoriaId: 5, subcategoriaId: 8 }
]);


db.transacao.insertMany([
    { id: 1, usuarioId: 1, produtoId: 1, quantidade: 1, data: new Date("2023-11-10") },
    { id: 2, usuarioId: 2, produtoId: 5, quantidade: 2, data: new Date("2023-11-09") },
    { id: 3, usuarioId: 3, produtoId: 3, quantidade: 1, data: new Date("2023-11-08") },
    { id: 4, usuarioId: 4, produtoId: 7, quantidade: 3, data: new Date("2023-11-07") },
    { id: 5, usuarioId: 5, produtoId: 6, quantidade: 1, data: new Date("2023-11-06") },
    { id: 6, usuarioId: 6, produtoId: 2, quantidade: 4, data: new Date("2023-11-05") },
    { id: 7, usuarioId: 7, produtoId: 8, quantidade: 1, data: new Date("2023-11-04") },
    { id: 8, usuarioId: 8, produtoId: 9, quantidade: 2, data: new Date("2023-11-03") },
    { id: 9, usuarioId: 9, produtoId: 10, quantidade: 5, data: new Date("2023-11-02") },
    { id: 10, usuarioId: 10, produtoId: 4, quantidade: 1, data: new Date("2023-11-01") }
]);


db.avaliacao.insertMany([
    { nota: 9, comentario: "Ótimo produto!", usuarioId: 1, produtoId: 1 },
    { nota: 8, comentario: "Muito bom!", usuarioId: 2, produtoId: 5 },
    { nota: 7, comentario: "Bom custo-benefício.", usuarioId: 3, produtoId: 3 },
    { nota: 10, comentario: "Excelente!", usuarioId: 4, produtoId: 7 },
    { nota: 6, comentario: "Produto satisfatório.", usuarioId: 5, produtoId: 6 },
    { nota: 5, comentario: "Cumpre o que promete.", usuarioId: 6, produtoId: 2 },
    { nota: 4, comentario: "Esperava mais.", usuarioId: 7, produtoId: 8 },
    { nota: 10, comentario: "Produto incrível!", usuarioId: 8, produtoId: 9 },
    { nota: 7, comentario: "Produto de qualidade.", usuarioId: 9, produtoId: 10 },
    { nota: 8, comentario: "Muito bom!", usuarioId: 10, produtoId: 4 }
]);



///////////////////////////////////////////////////////////////////////////////////

// 3. Consultas:

//    - Escreva uma consulta para encontrar todos os produtos em uma categoria específica.
use('banco_mongodb')
db.produto.find({ categoriaId: 1 });


//    - Escreva uma consulta para encontrar todas as avaliações de um produto específico.
use('banco_mongodb')
db.avaliacao.find({ produtoId: 1 });

//    - Escreva uma consulta para criar uma nova transação.
use('banco_mongodb')
db.transacao.insertOne({
    id: 11,
    usuarioId: 2,
    produtoId: 5,
    quantidade: 3,
    data: new Date()
});

    // verificando
use('banco_mongodb')
db.transacao.find({ id: 11 });

//    - Escreva uma consulta para atualizar a quantidade disponível de um produto após uma compra.

    //como estava antes
use('banco_mongodb')
db.produto.find(
    { id: 5 },
    { nome: 1, quantidadeEmEstoque: 1, _id: 0 }
);


    //atualizando
use('banco_mongodb')
db.produto.updateOne(
    { id: 5 },
    { $inc: { quantidadeEmEstoque: -3 } }
);

    //como ficou depois
use('banco_mongodb')
db.produto.find(
    { id: 5 },
    { nome: 1, quantidadeEmEstoque: 1, _id: 0 }
);




///////////////////////////////////////////////////////////////////////////////////

// 4. Índices:

//    - Pense sobre quais índices seriam úteis para otimizar as consultas mais comuns.

    // para o usuário autenticar vai ter que buscar o e-mail
use('banco_mongodb')
db.usuario.createIndex({ email: 1 });


    // Consultas que filtram produtos por categoria ou subcategoria podem se beneficiar de um índice composto das duas:
use('banco_mongodb')
db.produto.createIndex({ categoriaId: 1, subcategoriaId: 1 });


    // para verificar a disponibilidade de um produto será comum consultar a quantidade em estoque
use('banco_mongodb')
db.produto.createIndex({ quantidadeEmEstoque: 1 });


    // para consultas que objetivem levantar estatísticas das vendas de um produto
use('banco_mongodb')  
db.transacao.createIndex({ produtoId: 1 });


    // será comum consultar todas as avaliações de um único produto
use('banco_mongodb')  
db.avaliacao.createIndex({ produtoId: 1 });




///////////////////////////////////////////////////////////////////////////////////

// 5. Agregações:

//    - Escreva uma consulta de agregação para encontrar a média de avaliações para cada produto.

use('banco_mongodb')
db.avaliacao.aggregate([
    {
        $group: {
            _id: "$produtoId",
            mediaAvaliacoes: { $avg: "$nota" },
            totalAvaliacoes: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "produto",
            localField: "_id",
            foreignField: "id",
            as: "produto"
        }
    },
    {
        $project: {
            _id: 0,
            produtoId: "$_id",
            nomeProduto: { $arrayElemAt: ["$produto.nome", 0] },
            mediaAvaliacoes: { $round: ["$mediaAvaliacoes", 1] },
            totalAvaliacoes: 1
        }
    },
    { $sort: { mediaAvaliacoes: -1 } }
])

//    - Escreva uma consulta de agregação para encontrar o total de vendas para cada categoria.

use('banco_mongodb')
db.transacao.aggregate([
    {
        $lookup: {
            from: "produto",
            localField: "produtoId",
            foreignField: "id",
            as: "produto"
        }
    },
    { $unwind: "$produto" },
    {
        $lookup: {
            from: "categoria",
            localField: "produto.categoriaId",
            foreignField: "id",
            as: "categoria"
        }
    },
    { $unwind: "$categoria" },
    {
        $group: {
            _id: {
                categoriaId: "$produto.categoriaId",
                categoriaNome: "$categoria.nome"
            },
            totalVendas: { 
                $sum: { $multiply: ["$quantidade", "$produto.preco"] }
            },
            quantidadeTotal: { $sum: "$quantidade" },
            numeroTransacoes: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            categoriaId: "$_id.categoriaId",
            categoria: "$_id.categoriaNome",
            totalVendas: { $round: ["$totalVendas", 2] },
            quantidadeTotal: 1,
            numeroTransacoes: 1
        }
    },
    { $sort: { totalVendas: -1 } }
]);



// Depois da sprint inicial, os stackholders decidiram algumas mudanças em relação ao projeto inicial.
// Você deve realizar todas as mudanças sem que tenha perda de dados ou perca de integridade dos dados.


// 6. Promoções:

//    - Implemente uma funcionalidade que permita aos vendedores oferecerem descontos em seus produtos
//      por um período limitado.


    //desconto para produtos de uma subcategoria
use('banco_mongodb')
db.produto.updateMany(
    { subcategoriaId: 2 },
    {
        $set: {
            "promocao.desconto": 20,
            "promocao.dataInicio": new Date("2024-12-01"),
            "promocao.dataFim": new Date("2024-12-30")
        }
    }
);

    //desconto para produtos de uma categoria
use('banco_mongodb')
db.produto.updateMany(
    { categoriaId: 1 },
    {
        $set: {
            "promocao.desconto": 15,
            "promocao.dataInicio": new Date("2024-12-01"),
            "promocao.dataFim": new Date("2024-12-30")
        }
    }
);



// 7. Pontos de Fidelidade:

//    - Implemente um sistema de pontos de fidelidade onde os usuários ganham pontos por cada compra,
//      que podem ser usados para descontos em futuras compras.





// 8. Resposta a Avaliações:

//    - Permita que os vendedores respondam às avaliações deixadas em seus produtos.





// 9. Geolocalização

//   - Os usuários podem definir sua localização geográfica.

//   - Os produtos têm a localização geográfica do vendedor associada a eles.

//   - crie indices caso ache necessário.

//   - Os usuários podem buscar produtos com base na proximidade geográfica, podendo filtrar os
//      resultados por raio de distância.

//   - Escreva uma consulta de agregação para encontrar a média de distância entre compradores
//      e vendedores para transações concluídas.

//   - Escreva uma consulta de agregação para encontrar a categoria de produto mais popular em
//      uma área geográfica específica.






// 10. Relatórios:

//     - Crie consultas de agregação para gerar relatórios de vendas para os vendedores.