# Sistema de Controle de Fechamento de Caixa e Turnos (PIT II — v2.0)

**Aluno:** Elysson Pessoa dos Reis  
**RGM:** 37110209  
**Curso:** Engenharia de Software — Cruzeiro do Sul Virtual  

## Sobre o Projeto
Aplicação Web desenvolvida no padrão arquitetural **MVC (Model-View-Controller)** para controle de abertura de turnos, lançamento de entradas/saídas e conferência automática de fechamento de caixa.

## Melhorias Implementadas na Versão 2.0 (Pós-Testes de Qualidade)
1. **Exclusão de Lançamentos:** Adicionado botão para remover entradas ou saídas lançadas por engano enquanto o turno estiver aberto.
2. **Prevenção de Erros (Confirmação de Fechamento):** Adicionado diálogo de confirmação antes de encerrar o turno, evitando fechamentos acidentais.
3. **Gestão de Histórico e Saldos:** Exibição da diferença/resultado diretamente na tabela de histórico e opção para excluir registros de turno.

## Tecnologias Utilizadas
* **Back-end:** Node.js + Express
* **Front-end:** HTML5, CSS3, JavaScript (EJS Templates)
* **Banco de Dados:** SQLite3
* **Arquitetura:** MVC (Model-View-Controller)
