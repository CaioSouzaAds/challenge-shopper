README - Challenge Shopper

Este projeto foi desenvolvido seguindo rigorosamente os requisitos especificados. Para executar, certifique-se de estar no diretório challenge-shopper e rode o comando:

docker-compose up

As aplicações frontend e backend irão se comunicar automaticamente.

Observações importantes:

- Não defini o campo `id` como numérico, pois isso não foi especificado no desafio. Optei por deixá-lo livre para uso de texto ou números, considerando que um "id" mais amigável pode ser mais prático para os usuários, mas isso seria discutido na fase de planejamento do projeto.
- Foquei em entregar uma aplicação funcional, como solicitado, dentro do tempo e ferramentas disponíveis.

Nota sobre a variável de ambiente:
Certifique-se de que o arquivo `.env` contendo a variável `GOOGLE_API_KEY=<sua chave da API>` esteja presente no diretório raiz do projeto. Caso contrário, ao executar o comando:

/challenge-shopper$ docker-compose up

Sem o arquivo `.env` com a variável definida, você receberá o seguinte erro:

Failed to load /mnt/c/projetos/challenge-shopper/.env: open /mnt/c/projetos/challenge-shopper/.env: no such file or directory

Adicione o arquivo `.env` com a chave correta para evitar esse problema.
