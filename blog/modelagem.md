# SQL gerado por Python 

```python 
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, ForeignKey, DateTime, Text

# Create an in-memory SQLite engine
engine = create_engine('sqlite:///:memory:')
metadata = MetaData()

# Define tables
players = Table('Players', metadata,
    Column('player_id', Integer, primary_key=True),
    Column('username', String),
    Column('email', String),
    Column('password_hash', String),
    Column('level', Integer),
    Column('currency_blue_essence', Integer),
    Column('currency_rp', Integer),
    Column('created_at', DateTime)
)

champions = Table('Champions', metadata,
    Column('champion_id', Integer, primary_key=True),
    Column('name', String),
    Column('role', String),
    Column('base_health', Float),
    Column('base_attack_damage', Float),
    Column('base_armor', Float)
)

matches = Table('Matches', metadata,
    Column('match_id', Integer, primary_key=True),
    Column('match_type', String),
    Column('start_time', DateTime),
    Column('end_time', DateTime),
    Column('duration_seconds', Integer),
    Column('winning_team', String)
)

match_participants = Table('Match_Participants', metadata,
    Column('match_id', Integer, ForeignKey('Matches.match_id')),
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('champion_id', Integer, ForeignKey('Champions.champion_id')),
    Column('kills', Integer),
    Column('deaths', Integer),
    Column('assists', Integer),
    Column('gold_earned', Integer)
)

items = Table('Items', metadata,
    Column('item_id', Integer, primary_key=True),
    Column('name', String),
    Column('cost', Integer),
    Column('attack_bonus', Float),
    Column('armor_bonus', Float),
    Column('health_bonus', Float)
)

player_inventory = Table('Player_Inventory', metadata,
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('item_id', Integer, ForeignKey('Items.item_id')),
    Column('quantity', Integer)
)

skins = Table('Skins', metadata,
    Column('skin_id', Integer, primary_key=True),
    Column('champion_id', Integer, ForeignKey('Champions.champion_id')),
    Column('name', String),
    Column('release_date', DateTime),
    Column('cost_rp', Integer)
)

player_skins = Table('Player_Skins', metadata,
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('skin_id', Integer, ForeignKey('Skins.skin_id')),
    Column('unlocked_at', DateTime)
)

leaderboards = Table('Leaderboards', metadata,
    Column('season', String),
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('rank_tier', String),
    Column('rank_division', Integer),
    Column('lp', Integer)
)

friends = Table('Friends', metadata,
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('friend_id', Integer, ForeignKey('Players.player_id')),
    Column('friendship_status', String),
    Column('added_at', DateTime)
)

reports = Table('Reports', metadata,
    Column('report_id', Integer, primary_key=True),
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('reported_player_id', Integer, ForeignKey('Players.player_id')),
    Column('reason', String),
    Column('match_id', Integer, ForeignKey('Matches.match_id')),
    Column('report_date', DateTime)
)

punishments = Table('Punishments', metadata,
    Column('punishment_id', Integer, primary_key=True),
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('punishment_type', String),
    Column('punishment_start', DateTime),
    Column('punishment_end', DateTime)
)

quests = Table('Quests', metadata,
    Column('quest_id', Integer, primary_key=True),
    Column('name', String),
    Column('description', Text),
    Column('reward_blue_essence', Integer),
    Column('reward_rp', Integer)
)

player_quests = Table('Player_Quests', metadata,
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('quest_id', Integer, ForeignKey('Quests.quest_id')),
    Column('progress', Integer),
    Column('completed_at', DateTime)
)

chat_logs = Table('Chat_Logs', metadata,
    Column('chat_id', Integer, primary_key=True),
    Column('match_id', Integer, ForeignKey('Matches.match_id')),
    Column('player_id', Integer, ForeignKey('Players.player_id')),
    Column('message', Text),
    Column('sent_at', DateTime)
)

# Create all tables
metadata.create_all(engine)

# Reflect tables to create SQL schemas
metadata.tables.keys()


```

### Esquema SQL:

```sql
-- Tabela de Jogadores
CREATE TABLE Players (
    player_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password_hash VARCHAR(255),
    level INT,
    currency_blue_essence INT,
    currency_rp INT,
    created_at DATETIME
);

-- Tabela de Campeões
CREATE TABLE Champions (
    champion_id INT PRIMARY KEY,
    name VARCHAR(50),
    role VARCHAR(30),
    base_health FLOAT,
    base_attack_damage FLOAT,
    base_armor FLOAT
);

-- Tabela de Partidas
CREATE TABLE Matches (
    match_id INT PRIMARY KEY,
    match_type VARCHAR(50),
    start_time DATETIME,
    end_time DATETIME,
    duration_seconds INT,
    winning_team VARCHAR(50)
);

-- Participantes de uma Partida
CREATE TABLE Match_Participants (
    match_id INT,
    player_id INT,
    champion_id INT,
    kills INT,
    deaths INT,
    assists INT,
    gold_earned INT,
    PRIMARY KEY (match_id, player_id),
    FOREIGN KEY (match_id) REFERENCES Matches(match_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (champion_id) REFERENCES Champions(champion_id)
);

-- Itens no jogo
CREATE TABLE Items (
    item_id INT PRIMARY KEY,
    name VARCHAR(50),
    cost INT,
    attack_bonus FLOAT,
    armor_bonus FLOAT,
    health_bonus FLOAT
);

-- Inventário do Jogador
CREATE TABLE Player_Inventory (
    player_id INT,
    item_id INT,
    quantity INT,
    PRIMARY KEY (player_id, item_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

-- Skins de Campeões
CREATE TABLE Skins (
    skin_id INT PRIMARY KEY,
    champion_id INT,
    name VARCHAR(50),
    release_date DATETIME,
    cost_rp INT,
    FOREIGN KEY (champion_id) REFERENCES Champions(champion_id)
);

-- Skins adquiridas pelos Jogadores
CREATE TABLE Player_Skins (
    player_id INT,
    skin_id INT,
    unlocked_at DATETIME,
    PRIMARY KEY (player_id, skin_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (skin_id) REFERENCES Skins(skin_id)
);

-- Placares de Líderes
CREATE TABLE Leaderboards (
    season VARCHAR(50),
    player_id INT,
    rank_tier VARCHAR(50),
    rank_division INT,
    lp INT,
    PRIMARY KEY (season, player_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- Lista de amigos dos jogadores
CREATE TABLE Friends (
    player_id INT,
    friend_id INT,
    friendship_status VARCHAR(50),
    added_at DATETIME,
    PRIMARY KEY (player_id, friend_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (friend_id) REFERENCES Players(player_id)
);

-- Relatórios de comportamento inapropriado
CREATE TABLE Reports (
    report_id INT PRIMARY KEY,
    player_id INT,
    reported_player_id INT,
    reason VARCHAR(255),
    match_id INT,
    report_date DATETIME,
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (reported_player_id) REFERENCES Players(player_id),
    FOREIGN KEY (match_id) REFERENCES Matches(match_id)
);

-- Punições aplicadas a jogadores
CREATE TABLE Punishments (
    punishment_id INT PRIMARY KEY,
    player_id INT,
    punishment_type VARCHAR(50),
    punishment_start DATETIME,
    punishment_end DATETIME,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- Missões do jogo
CREATE TABLE Quests (
    quest_id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    reward_blue_essence INT,
    reward_rp INT
);

-- Progresso do jogador nas missões
CREATE TABLE Player_Quests (
    player_id INT,
    quest_id INT,
    progress INT,
    completed_at DATETIME,
    PRIMARY KEY (player_id, quest_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (quest_id) REFERENCES Quests(quest_id)
);

-- Logs do chat durante partidas
CREATE TABLE Chat_Logs (
    chat_id INT PRIMARY KEY,
    match_id INT,
    player_id INT,
    message TEXT,
    sent_at DATETIME,
    FOREIGN KEY (match_id) REFERENCES Matches(match_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);
```

### Explicação das Tabelas:
1. **Players**: Contém as informações dos jogadores, incluindo ID, username, nível e moedas (essência azul e RP).
2. **Champions**: Detalhes dos campeões, como saúde, dano base e armadura.
3. **Matches**: Informações sobre as partidas, como o tipo de partida, horário e equipe vencedora.
4. **Match_Participants**: Liga jogadores e campeões a partidas, além de registrar estatísticas (kills, deaths, assists).
5. **Items**: Define os itens disponíveis no jogo, como bônus de atributos e custo.
6. **Player_Inventory**: Inventário dos jogadores, armazenando itens e quantidade de cada.
7. **Skins**: Skins dos campeões, incluindo custo em RP e data de lançamento.
8. **Player_Skins**: Armazena skins desbloqueadas pelos jogadores.
9. **Leaderboards**: Rankings dos jogadores com informações sobre temporadas, divisões e LP.
10. **Friends**: Relacionamentos entre jogadores, incluindo status de amizade.
11. **Reports**: Relatórios de jogadores que cometeram infrações, com o motivo e partida relacionada.
12. **Punishments**: Punições aplicadas a jogadores, incluindo tipo e duração.
13. **Quests**: Missões disponíveis no jogo e suas recompensas.
14. **Player_Quests**: Progresso dos jogadores em missões.
15. **Chat_Logs**: Logs de mensagens enviadas durante partidas.
