# Análise de Domínio - LocaFacil

## 📊 Composição do Repositório

| Linguagem | Percentual |
|-----------|-----------|
| JavaScript | 75.1% |
| CSS | 24.5% |
| HTML | 0.4% |

**Repositório:** [PauloHudson/CC7540---LocaFacil](https://github.com/PauloHudson/CC7540---LocaFacil)  
**ID do Repositório:** 1152215332  
**URL:** https://github.com/PauloHudson/CC7540---LocaFacil

---

## 📋 Linha de Produto de Software (LPS)

### 1. Requisitos da LPS

#### ✅ Requisitos Comuns (Obrigatórios)

Estes requisitos devem estar presentes em todos os produtos derivados da LPS:

| ID | Requisito | Descrição |
|----|-----------|-----------|
| RC01 | Autenticação de Usuário | Todos os usuários devem fazer login com email e senha |
| RC02 | Gestão de Perfil | Usuários podem visualizar e atualizar seus dados pessoais |
| RC03 | Busca de Produtos | Sistema deve permitir buscar e filtrar produtos disponíveis |
| RC04 | Visualização de Detalhes | Exibir informações completas de produtos (descrição, preço, fotos) |
| RC05 | Cálculo de Locação | Sistema calcula automaticamente o valor baseado em período e produto |
| RC06 | Confirmação de Locação | Usuário deve confirmar os dados antes de finalizar a locação |
| RC07 | Histórico de Locações | Registro de todas as locações realizadas pelo usuário |
| RC08 | Notificações | Sistema envia notificações sobre status de locações |
| RC09 | Avaliação de Produtos | Usuários podem avaliar produtos após locação |
| RC10 | Suporte ao Cliente | Canal de comunicação para dúvidas e problemas |

#### 🎁 Requisitos Opcionais (Adicionais)

Requisitos que podem ser incluídos em alguns produtos:

| ID | Requisito | Descrição |
|----|-----------|-----------|
| RO01 | Programa de Fidelidade | Pontos acumuláveis em cada locação |
| RO02 | Descontos Promocionais | Cupons e promoções sazonais |
| RO03 | Entrega a Domicílio | Serviço de entrega do produto em casa do cliente |
| RO04 | Rastreamento em Tempo Real | GPS para rastrear produtos alugados |
| RO05 | Relatórios de Gastos | Dashboard com análise de gastos do usuário |

#### 🔄 Requisitos Alternativos (Variações)

Requisitos que podem ser implementados de diferentes formas:

| ID | Requisito | Alternativa 1 | Alternativa 2 | Alternativa 3 |
|----|-----------|---------------|---------------|---------------|
| RA01 | Método de Pagamento | Cartão de Crédito | Pix | Boleto Bancário |
| RA02 | Tipo de Entrega | Entrega em Casa | Retirada Presencial | Agendamento |
| RA03 | Autenticação | Email + Senha | Google OAuth | Apple ID |
| RA04 | Catálogo de Produtos | Veículos | Eletrônicos | Equipamentos |
| RA05 | Cálculo de Taxa | Por Hora | Por Dia | Por Semana |

---

### 2. Modelo de Features

```
LocaFacil LPS
├── Autenticação (Obrigatória)
│   ├── Login com Email e Senha (Comum)
│   ├── Login com Google (Opcional)
│   └── Login com Apple ID (Opcional)
│
├── Gestão de Usuários (Obrigatória)
│   ├── Criar Conta (Comum)
│   ├── Atualizar Perfil (Comum)
│   ├── Deletar Conta (Opcional)
│   └── Recuperar Senha (Comum)
│
├── Catálogo de Produtos (Obrigatória)
│   ├── Veículos (Alternativo)
│   │   ├── Carros (Comum)
│   │   ├── Motos (Opcional)
│   │   └── Bicicletas (Opcional)
│   │
│   ├── Eletrônicos (Alternativo)
│   │   ├── Celulares (Comum)
│   │   ├── Laptops (Comum)
│   │   └── Câmeras (Opcional)
│   │
│   └── Equipamentos (Alternativo)
│       ├── Ferramentas (Opcional)
│       └── Esportes (Opcional)
│
├── Locação (Obrigatória)
│   ├── Selecionar Produto (Comum)
│   ├── Definir Período (Comum)
│   ├── Cálculo por Hora (Alternativo)
│   ├── Cálculo por Dia (Alternativo)
│   ├── Confirmar Locação (Comum)
│   └── Rastreamento em Tempo Real (Opcional)
│
├── Pagamento (Obrigatória)
│   ├── Cartão de Crédito (Alternativo)
│   ├── Pix (Alternativo)
│   ├── Boleto Bancário (Alternativo)
│   └── Criptografia SSL (Comum)
│
├── Seguro (Opcional)
│   ├── Cobertura Básica (Alternativo)
│   ├── Cobertura Completa (Alternativo)
│   └── Seguro Adicional (Opcional)
│
├── Entrega (Opcional)
│   ├── Entrega a Domicílio (Alternativo)
│   ├── Retirada Presencial (Alternativo)
│   └── Agendamento (Opcional)
│
├── Notificações (Opcional)
│   ├── Email (Alternativo)
│   ├── SMS (Alternativo)
│   └── Push Notification (Alternativo)
│
├── Avaliação (Comum)
│   ├── Avaliar Produto (Comum)
│   ├── Comentários (Comum)
│   └── Fotos (Opcional)
│
├── Histórico e Relatórios (Comum)
│   ├── Histórico de Locações (Comum)
│   ├── Relatório de Gastos (Opcional)
│   └── Exportar Dados (Opcional)
│
└── Suporte (Comum)
    ├── Chat com Suporte (Comum)
    ├── FAQ (Comum)
    └── Ticket de Suporte (Opcional)
```

---

### 3. Diagrama de Casos de Uso

#### 📌 Casos de Uso Comuns (Presentes em Todos os Produtos)

1. **UC001 - Registrar Novo Usuário**
   - Ator: Usuário Externo
   - Descrição: Criar nova conta com email e senha
   - Fluxo: Email → Senha → Confirmação → Perfil Criado
   - Pré-condição: Email não deve estar registrado
   - Pós-condição: Usuário autenticado no sistema

2. **UC002 - Fazer Login**
   - Ator: Usuário Registrado
   - Descrição: Autenticar-se no sistema
   - Fluxo: Email → Senha → Validação → Acesso Concedido
   - Pré-condição: Usuário deve estar registrado
   - Pós-condição: Sessão iniciada

3. **UC003 - Buscar Produtos**
   - Ator: Usuário Autenticado
   - Descrição: Pesquisar produtos disponíveis
   - Fluxo: Filtros → Busca → Resultados Exibidos
   - Pré-condição: Usuário autenticado
   - Pós-condição: Lista de produtos exibida

4. **UC004 - Visualizar Detalhes do Produto**
   - Ator: Usuário Autenticado
   - Descrição: Ver informações completas do produto
   - Fluxo: Selecionar → Exibir Detalhes → Fotos → Avaliações
   - Pré-condição: Produto deve existir
   - Pós-condição: Detalhes exibidos

5. **UC005 - Realizar Locação**
   - Ator: Usuário Autenticado
   - Descrição: Alugar um produto
   - Fluxo: Selecionar → Data Início → Data Fim → Cálculo → Confirmação
   - Pré-condição: Produto disponível, usuário autenticado
   - Pós-condição: Locação registrada

6. **UC006 - Processar Pagamento**
   - Ator: Usuário Autenticado
   - Descrição: Efetuar pagamento da locação
   - Fluxo: Escolher Método → Inserir Dados → Validar → Confirmar
   - Pré-condição: Locação deve estar pendente
   - Pós-condição: Pagamento processado

7. **UC007 - Visualizar Histórico de Locações**
   - Ator: Usuário Autenticado
   - Descrição: Consultar locações anteriores
   - Fluxo: Acessar Histórico → Filtrar → Exibir Lista
   - Pré-condição: Usuário deve ter realizações
   - Pós-condição: Histórico exibido

#### 🎁 Casos de Uso Opcionais

8. **UC008 - Adicionar Seguro à Locação**
   - Ator: Usu��rio Autenticado
   - Descrição: Contratar cobertura adicional
   - Fluxo: Selecionar Tipo Seguro → Calcular Taxa → Confirmar
   - Pré-condição: Locação em processo
   - Pós-condição: Seguro adicionado

9. **UC009 - Usar Entrega a Domicílio**
   - Ator: Usuário Autenticado
   - Descrição: Solicitar entrega em casa
   - Fluxo: Ativar Opção → Inserir Endereço → Agendar → Confirmar
   - Pré-condição: Serviço disponível na região
   - Pós-condição: Entrega agendada

10. **UC010 - Participar do Programa de Fidelidade**
    - Ator: Usuário Autenticado
    - Descrição: Acumular pontos em locações
    - Fluxo: Completar Locação → Pontos Acumulados → Resgate
    - Pré-condição: Programa habilitado
    - Pós-condição: Pontos creditados

11. **UC011 - Rastrear Produto em Tempo Real**
    - Ator: Usuário Autenticado
    - Descrição: Monitorar localização do produto alugado
    - Fluxo: Acessar Mapa → Atualizar Localização → Compartilhar
    - Pré-condição: Rastreamento ativo
    - Pós-condição: Mapa exibido

12. **UC012 - Visualizar Relatório de Gastos**
    - Ator: Usuário Autenticado
    - Descrição: Analisar despesas em gráficos
    - Fluxo: Período → Gerar Relatório → Exportar (PDF/Excel)
    - Pré-condição: Locações realizadas
    - Pós-condição: Relatório disponível

#### 🔄 Casos de Uso Alternativos

13. **UC013 - Escolher Método de Pagamento**
    - Ator: Usuário Autenticado
    - Alternativas:
      - Pagar com Cartão de Crédito
      - Pagar com Pix (instantâneo)
      - Pagar com Boleto Bancário

14. **UC014 - Receber Notificações**
    - Ator: Usuário Autenticado
    - Alternativas:
      - Notificação por Email
      - Notificação por SMS
      - Notificação Push (App Mobile)

15. **UC015 - Avaliar Produto**
    - Ator: Usuário Autenticado
    - Alternativas:
      - Avaliação com Estrelas
      - Avaliação com Comentário Textual
      - Avaliação com Fotos

#### Diagrama Textual

```
                          ┌─ UC001: Registrar Novo Usuário
                          │
                          └─ UC002: Fazer Login ──┐
                                                   │
         ┌─────────────────────────────────────────┘
         │
    Usuário ─── UC003: Buscar Produtos
    Autenticado │
         │      └─ UC004: Visualizar Detalhes
         │              │
         ├─ UC005: Realizar Locação ◄──────┘
         │       │
         │       ├─ UC013: Escolher Pagamento
         │       │   ├─ Cartão
         │       │   ├─ Pix
         │       │   └─ Boleto
         │       │
         │       ├─ UC008: Adicionar Seguro (Opcional)
         │       │
         │       └─ UC006: Processar Pagamento
         │
         ├─ UC009: Usar Entrega (Opcional)
         │
         ├─ UC014: Receber Notificações (Opcional)
         │   ├─ Email
         │   ├─ SMS
         │   └─ Push
         │
         ├─ UC007: Visualizar Histórico
         │
         ├─ UC011: Rastrear Produto (Opcional)
         │
         ├─ UC012: Ver Relatório de Gastos (Opcional)
         │
         ├─ UC010: Programa de Fidelidade (Opcional)
         │
         └─ UC015: Avaliar Produto
             ├─ Estrelas
             ├─ Comentário
             └─ Fotos (Opcional)
```

---

### 4. Produtos Derivados da LPS

#### 🚗 Produto 1: LocaFacil Veículos Premium

**Descrição:** Serviço de aluguel de veículos de alta qualidade com todas as features premium.

**Features Incluídas:**

| Categoria | Feature | Status |
|-----------|---------|--------|
| Autenticação | Email + Senha | ✅ Incluído |
| | Google OAuth | ✅ Incluído |
| Produtos | Carros | ✅ Incluído |
| | Motos | ✅ Incluído |
| Locação | Cálculo por Dia | ✅ Incluído |
| Pagamento | Cartão de Crédito | ✅ Incluído |
| | Pix | ✅ Incluído |
| Entrega | Entrega a Domicílio | ✅ Incluído |
| Seguro | Cobertura Completa | ✅ Incluído |
| Notificações | Email + SMS | ✅ Incluído |
| Rastreamento | GPS em Tempo Real | ✅ Incluído |
| Programa | Fidelidade | ✅ Incluído |
| Relatórios | Dashboard Completo | ✅ Incluído |

**Fluxo de Uso:**
1. Usuário faz login com email ou Google
2. Busca veículos de seu interesse
3. Seleciona período de locação (mínimo 1 dia)
4. Adiciona cobertura de seguro completa
5. Escolhe entrega a domicílio
6. Paga com cartão ou Pix
7. Recebe confirmação por email e SMS
8. Rastreia o veículo pelo GPS
9. Após devolução, acumula pontos de fidelidade
10. Avalia a experiência

**Configurações:**
- Preço: A partir de R$ 150/dia
- Público: Usuários premium
- Funcionalidades Extras: Seguro, entrega, rastreamento

---

#### 📱 Produto 2: LocaFacil Express Eletrônicos

**Descrição:** Serviço de aluguel de eletrônicos com foco em acessibilidade e conveniência.

**Features Incluídas:**

| Categoria | Feature | Status |
|-----------|---------|--------|
| Autenticação | Email + Senha | ✅ Incluído |
| | Apple ID | ✅ Incluído |
| Produtos | Celulares | ✅ Incluído |
| | Laptops | ✅ Incluído |
| Locação | Cálculo por Hora | ✅ Incluído |
| | Cálculo por Dia | ✅ Incluído |
| Pagamento | Pix | ✅ Incluído |
| | Boleto Bancário | ✅ Incluído |
| Entrega | Retirada Presencial | ✅ Incluído |
| Seguro | Cobertura Básica | ✅ Incluído |
| Notificações | Push Notification | ✅ Incluído |
| Rastreamento | Não Incluído | ❌ |
| Programa | Não Incluído | ❌ |
| Relatórios | Básico (Histórico) | ✅ Incluído |

**Fluxo de Uso:**
1. Usuário faz login com email ou Apple ID
2. Busca eletrônicos disponíveis
3. Seleciona período por hora ou dia
4. Cobertura de seguro básica (automática)
5. Escolhe pagar com Pix ou Boleto
6. Agenda retirada presencial
7. Recebe notificação push de confirmação
8. Retira o produto na loja
9. Após devolução, completa locação
10. Recebe histório atualizado

**Configurações:**
- Preço: A partir de R$ 20/hora ou R$ 80/dia
- Público: Usuários com necessidades pontuais
- Funcionalidades Extras: Seguro básico, retirada presencial

---

## 📊 Matriz de Rastreabilidade de Features

| Feature | Produto 1 (Premium) | Produto 2 (Express) | Tipo |
|---------|:--:|:--:|----------|
| Autenticação Básica | ✅ | ✅ | Comum |
| Google OAuth | ✅ | ❌ | Opcional |
| Apple ID | ❌ | ✅ | Opcional |
| Catálogo Veículos | ✅ | ❌ | Alternativo |
| Catálogo Eletrônicos | ❌ | ✅ | Alternativo |
| Cálculo por Hora | ❌ | ✅ | Alternativo |
| Cálculo por Dia | ✅ | ✅ | Alternativo |
| Cartão de Crédito | ✅ | ❌ | Alternativo |
| Pix | ✅ | ✅ | Alternativo |
| Boleto Bancário | ❌ | ✅ | Alternativo |
| Entrega a Domicílio | ✅ | ❌ | Opcional |
| Retirada Presencial | ❌ | ✅ | Opcional |
| Seguro Completo | ✅ | ❌ | Opcional |
| Seguro Básico | ✅ | ✅ | Opcional |
| Rastreamento GPS | ✅ | ❌ | Opcional |
| Fidelidade | ✅ | ❌ | Opcional |
| Notificações Email/SMS | ✅ | ❌ | Opcional |
| Notificações Push | ❌ | ✅ | Opcional |
| Relatório Completo | ✅ | ❌ | Opcional |
| Histórico Básico | ✅ | ✅ | Comum |

---

## 🏗️ Arquitetura da LPS

```
┌─────────────────────────────────────────────────────────┐
│         LocaFacil LPS - Núcleo Compartilhado             │
├─────────────────────────────────────────────────────────┤
│ • Autenticação de Usuário                              │
│ • Gestão de Perfil                                     │
│ • API de Produtos                                      │
│ • Motor de Cálculo de Locação                          │
│ • Sistema de Notificações Base                         │
│ • Processamento de Pagamentos                          │
│ • Histórico de Transações                              │
└─────────────────────────────────────────────────────────┘
                     △
        ┌────────────┼────────────┐
        │            │            │
   ┌────▼────┐  ┌───▼────┐  ┌───▼────┐
   │ Produto │  │ Produto │  │ Produto │
   │   1     │  │   2     │  │   N     │
   │ Premium │  │ Express │  │ Custom  │
   └─────────┘  └─────────┘  └─────────┘
       + GPS       + Básico       + Custom
       + Premium   + Retirada     + Features
       + Entrega   + Hora/Dia     + Config
```

---

## 📌 Conclusão

A Linha de Produto de Software (LPS) LocaFacil foi modelada para permitir:

✅ **Flexibilidade:** Múltiplos produtos derivados com diferentes configurações  
✅ **Reuso:** Componentes comuns compartilhados entre todos os produtos  
✅ **Escalabilidade:** Fácil adicionar novos produtos ou features  
✅ **Manutenibilidade:** Código centralizado e organizado por camadas  

Os dois produtos apresentados (Premium e Express) demonstram como a LPS pode suportar tanto usuários que buscam soluções premium quanto aqueles que precisam de opções mais acessíveis.

---

**Última Atualização:** 2026-05-13  
**Responsável:** NathanGblOk  
**Repositório:** [PauloHudson/CC7540---LocaFacil](https://github.com/PauloHudson/CC7540---LocaFacil)
