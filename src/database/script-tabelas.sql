drop database aevus;
create database if not exists aevus;
use aevus;

CREATE TABLE IF NOT EXISTS Empresa (
  idEmpresa INT AUTO_INCREMENT,
  nomeFantasia VARCHAR(45),
  cnpj CHAR(14),
  razaoSocial VARCHAR(100),
  email varchar(100) not null,
  senha varchar(30) not null,
  tipoUsuario varchar(30) default 'Empresa',
  status VARCHAR(255) DEFAULT 'Ativo',
  PRIMARY KEY (idEmpresa),
  UNIQUE INDEX razaoSocial_UNIQUE (razaoSocial ASC) VISIBLE,
  UNIQUE INDEX cnpj_UNIQUE (cnpj ASC) VISIBLE,
  constraint uk_email unique (email),
  constraint uk_cpj unique (cnpj)
);


CREATE TABLE IF NOT EXISTS Pessoa (
  idPessoa INT AUTO_INCREMENT,
  nome VARCHAR(100),
  cpf CHAR(11) UNIQUE,
  PRIMARY KEY (idPessoa)
);


CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,       
    nome VARCHAR(100),                              
    email VARCHAR(254) UNIQUE,                     
    cpf CHAR(11) UNIQUE,                            
    tipoUsuario VARCHAR(255) DEFAULT 'Operacional', 
    senha VARCHAR(255),                             
    dataContratacao DATETIME DEFAULT CURRENT_TIMESTAMP, 
    status VARCHAR(255) DEFAULT 'Ativo',            
    fkPessoa INT,                                   
    FOREIGN KEY (fkPessoa) REFERENCES Pessoa(idPessoa) ON DELETE SET NULL, 
    CONSTRAINT ck_tipoUsuario CHECK (tipoUsuario IN ('Operacional', 'Administrador')) 
);


CREATE TABLE IF NOT EXISTS Aeroporto (
  idAeroporto INT AUTO_INCREMENT,
  siglaAeroporto VARCHAR(255),
  nomeAeroporto VARCHAR(100),
  endereco VARCHAR(235),
  classificacao INT CHECK (classificacao BETWEEN 1 AND 5),
  Empresa_idEmpresa INT,
  PRIMARY KEY (idAeroporto),
  INDEX fk_Aeroporto_Empresa1_idx (Empresa_idEmpresa ASC) VISIBLE,
  CONSTRAINT fk_Aeroporto_Empresa1
  FOREIGN KEY (Empresa_idEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS RelacaoAeroporto_Funcionario (
    Aeroporto_idAeroporto INT,
    Funcionario_idFuncionario INT,
    dataInicio DATETIME,
    dataFim DATETIME,
    PRIMARY KEY (Aeroporto_idAeroporto, Funcionario_idFuncionario),
    FOREIGN KEY (Aeroporto_idAeroporto) REFERENCES Aeroporto(idAeroporto) ON DELETE CASCADE,
    FOREIGN KEY (Funcionario_idFuncionario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Passageiro (
    Passageiro_ID INT AUTO_INCREMENT PRIMARY KEY,
    Nacionalidade VARCHAR(20),
    Genero VARCHAR(20),
    Faixa_Etaria VARCHAR(20),
    Escolaridade VARCHAR(50),
    Renda_Familiar VARCHAR(30),
    Viajando_Sozinho VARCHAR(5),
    Numero_Acompanhantes VARCHAR(20),
    Motivo_Viagem VARCHAR(255),
    Quantidade_Viagens_Ultimos_12_Meses VARCHAR(20),
    Ja_Embarcou_Desembarcou_Antes VARCHAR(5),
    Antecedencia VARCHAR(20),
    Tempo_Espera VARCHAR(20),
    Comentarios_Adicionais TEXT
);

CREATE TABLE IF NOT EXISTS PesquisaDeSatisfacao (
    Pesquisa_ID INT PRIMARY KEY,
    Passageiro_ID INT,
    Aeroporto_idAeroporto INT,
    Mes VARCHAR(255),
    DataPesquisa date,
    FOREIGN KEY (Passageiro_ID) REFERENCES Passageiro(Passageiro_ID),
    FOREIGN KEY (Aeroporto_idAeroporto) REFERENCES Aeroporto(idAeroporto)
);

CREATE TABLE IF NOT EXISTS RelacaoAeroporto_Pesquisa (
    idPesquisaDeSatisfacao INT,
    Aeroporto_idAeroporto INT,
    Data VARCHAR(45),
    Relatorio TEXT NULL,
    PRIMARY KEY (idPesquisaDeSatisfacao, Aeroporto_idAeroporto),
    FOREIGN KEY (Aeroporto_idAeroporto) REFERENCES Aeroporto(idAeroporto),
    FOREIGN KEY (idPesquisaDeSatisfacao) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Informacoes_Voo (
    Voo_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Processo VARCHAR(255),
    Aeroporto VARCHAR(255),
    Terminal VARCHAR(255),
    Portao VARCHAR(255),
    Tipo_Voo VARCHAR(255),
    Cia_Aerea VARCHAR(255),
    Voo VARCHAR(255),
    Conexao VARCHAR(255),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Aquisição_Passagem (
    Passagem_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Aquisição_Passagem VARCHAR(255),
    Meio_Aquisição_Passagem VARCHAR(255),
    Meio_Transporte_Aeroporto VARCHAR(255),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Necessidades_Especiais (
    Necessidade_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Possui_Deficiencia VARCHAR(255),
    Utiliza_Recurso_Assistivo VARCHAR(255),
    Solicitou_Assistencia_Especial VARCHAR(255),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Desembarque (
    Desembarque_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Forma_Desembarque VARCHAR(255),
    Avaliacao_Metodo_Desembarque INT CHECK (Avaliacao_Metodo_Desembarque BETWEEN 1 AND 5),
    Utilizou_Estacionamento BOOLEAN,
    Facilidade_Desembarque_Meio_Fio INT CHECK (Facilidade_Desembarque_Meio_Fio BETWEEN 1 AND 5),
    Opcoes_Transporte_Aeroporto INT CHECK (Opcoes_Transporte_Aeroporto BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Check_in (
    Check_in_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Forma_Check_in VARCHAR(255),
    Processo_Check_in INT CHECK (Processo_Check_in BETWEEN 1 AND 5),
    Tempo_Espera_Fila INT CHECK (Tempo_Espera_Fila BETWEEN 1 AND 5),
    Organizacao_Filas INT CHECK (Organizacao_Filas BETWEEN 1 AND 5), 
    Quantidade_Totens_AA INT,
    Quantidade_Balcoes INT,
    Cordialidade_Funcionarios INT CHECK (Cordialidade_Funcionarios BETWEEN 1 AND 5),
    Tempo_Atendimento INT CHECK (Tempo_Atendimento BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Inspecao_Seguranca (
    Inspecao_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Processo_Inspecao_Seguranca INT CHECK (Processo_Inspecao_Seguranca BETWEEN 1 AND 5),
    Tempo_Espera_Fila INT CHECK (Tempo_Espera_Fila BETWEEN 1 AND 5),
    Organizacao_Filas INT CHECK (Organizacao_Filas BETWEEN 1 AND 5),
    Atendimento_Funcionarios INT CHECK (Atendimento_Funcionarios BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Controle_Migratorio_Aduaneiro (
    Controle_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Controle_Migratorio INT CHECK (Controle_Migratorio BETWEEN 1 AND 5),
    Tempo_Espera_Fila INT CHECK (Tempo_Espera_Fila BETWEEN 1 AND 5),
    Organizacao_Filas INT CHECK (Organizacao_Filas BETWEEN 1 AND 5),
    Atendimento_Funcionarios INT CHECK (Atendimento_Funcionarios BETWEEN 1 AND 5),
    Quantidade_Guiches INT,
    Controle_Aduaneiro INT CHECK (Controle_Aduaneiro BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Estabelecimentos (
    Estabelecimento_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Estabelecimentos_Alimentacao VARCHAR(255),
    Quantidade_Estabelecimentos_Alimentacao INT CHECK (Quantidade_Estabelecimentos_Alimentacao BETWEEN 1 AND 5),
    Qualidade_Variedade_Opcoes_Alimentacao INT CHECK (Qualidade_Variedade_Opcoes_Alimentacao BETWEEN 1 AND 5),
    Relacao_Preco_Qualidade_Alimentacao INT CHECK (Relacao_Preco_Qualidade_Alimentacao BETWEEN 1 AND 5),
    Estabelecimentos_Comerciais VARCHAR(255),
    Quantidade_Estabelecimentos_Comerciais INT CHECK (Quantidade_Estabelecimentos_Comerciais BETWEEN 1 AND 5),
    Qualidade_Variedade_Opcoes_Comerciais INT CHECK (Qualidade_Variedade_Opcoes_Comerciais BETWEEN 1 AND 5),
    Relacao_Preco_Qualidade_Comerciais INT CHECK (Relacao_Preco_Qualidade_Comerciais BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Estacionamento (
    Estacionamento_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Qualidade_Instalacoes_Estacionamento INT CHECK (Qualidade_Instalacoes_Estacionamento BETWEEN 1 AND 5),
    Facilidade_Encontrar_Vagas INT CHECK (Facilidade_Encontrar_Vagas BETWEEN 1 AND 5),
    Facilidade_Acesso_Terminal INT CHECK (Facilidade_Acesso_Terminal BETWEEN 1 AND 5),
    Relacao_Preco_Qualidade INT CHECK (Relacao_Preco_Qualidade BETWEEN 1 AND 5),
    Tempo_Caminhada_Estacionamento_Terminais INT CHECK (Tempo_Caminhada_Estacionamento_Terminais BETWEEN 1 AND 5),
    Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais INT CHECK (Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);


CREATE TABLE IF NOT EXISTS Conforto_Acessibilidade (
    Conforto_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Localizacao_Deslocamento INT CHECK (Localizacao_Deslocamento BETWEEN 1 AND 5),
    Sinalizacao INT CHECK (Sinalizacao BETWEEN 1 AND 5),
    Disponibilidade_Paineis_Informacoes_Voo INT CHECK (Disponibilidade_Paineis_Informacoes_Voo BETWEEN 1 AND 5),
    Acessibilidade_Terminal INT CHECK (Acessibilidade_Terminal BETWEEN 1 AND 5),
    Conforto_Sala_Embarque INT CHECK (Conforto_Sala_Embarque BETWEEN 1 AND 5),
    Conforto_Termico INT CHECK (Conforto_Termico BETWEEN 1 AND 5),
    Conforto_Acustico INT CHECK (Conforto_Acustico BETWEEN 1 AND 5),
    Disponibilidade_Assentos INT CHECK (Disponibilidade_Assentos BETWEEN 1 AND 5),
    Disponibilidade_Assentos_Reservados INT CHECK (Disponibilidade_Assentos_Reservados BETWEEN 1 AND 5),
    Disponibilidade_Tomadas INT CHECK (Disponibilidade_Tomadas BETWEEN 1 AND 5),
    Internet_Disponibilizada_Aeroporto INT CHECK (Internet_Disponibilizada_Aeroporto BETWEEN 1 AND 5),
    Velocidade_Conexao INT CHECK (Velocidade_Conexao BETWEEN 1 AND 5),
    Facilidade_Acesso_Rede INT CHECK (Facilidade_Acesso_Rede BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Sanitarios (
    Sanitario_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    sanitariosQt INT,
    Quantidade_Banheiros INT CHECK (Quantidade_Banheiros BETWEEN 1 AND 5),
    Limpeza_Banheiros INT CHECK (Limpeza_Banheiros BETWEEN 1 AND 5),
    Manutencao_Geral_Sanitarios INT CHECK (Manutencao_Geral_Sanitarios BETWEEN 1 AND 5),
    Limpeza_Geral_Aeroporto INT CHECK (Limpeza_Geral_Aeroporto BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE IF NOT EXISTS Restituicao_Bagagens (
    Bagagem_ID INT AUTO_INCREMENT PRIMARY KEY,
    Pesquisa_ID INT,
    Processo_Restituicao_Bagagens INT CHECK (Processo_Restituicao_Bagagens BETWEEN 1 AND 5),
    Facilidade_Identificacao_Esteira INT CHECK (Facilidade_Identificacao_Esteira BETWEEN 1 AND 5),
    Tempo_Restituicao INT CHECK (Tempo_Restituicao BETWEEN 1 AND 5),
    Integridade_Bagagem INT CHECK (Integridade_Bagagem BETWEEN 1 AND 5),
    Atendimento_Cia_Aerea INT CHECK (Atendimento_Cia_Aerea BETWEEN 1 AND 5),
    FOREIGN KEY (Pesquisa_ID) REFERENCES PesquisaDeSatisfacao(Pesquisa_ID)
);

CREATE TABLE log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    arquivo_lido VARCHAR(255) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Massa de dados para teste:

-- INSERT INTO Empresa (nomeFantasia, cnpj, razaoSocial, email, senha)
-- VALUES 
-- ('Aevus Infinity', '12345678000199', 'Aevus Infinity LTDA', 'testeempresa@teste.com', 'xx123456');


-- INSERT INTO Pessoa (nome, cpf)
-- VALUES 
-- ('João Silva', '12345678901'),
-- ('Maria Santos', '98765432100');

-- INSERT INTO Usuario (nome, email, cpf, tipoUsuario, senha, fkPessoa)
-- VALUES 
-- ('João Silva', 'testeop@teste.com', '12345678901', 'Operacional', 'xx123456', 1),
-- ('Maria Santos', 'testeadm@teste.com', '98765432100', 'Administrador', 'xx123456', 2);

-- select * from Pessoa;
-- select * from Usuario;

