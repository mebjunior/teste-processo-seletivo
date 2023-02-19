
CREATE SCHEMA dados;

CREATE TABLE dados.dados (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    cpf_cnpj TEXT,
    nome_logradouro TEXT,
    numero INT,
    complemento TEXT,
    data_nascimento TIMESTAMP
);

CREATE SCHEMA legado;

CREATE TABLE legado.dados (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    cpf_cnpj TEXT,
    nome_logradouro TEXT,
    numero INT,
    complemento TEXT,
    data_nascimento TIMESTAMP
);

INSERT INTO dados.dados(nome,cpf_cnpj,nome_logradouro,numero,complemento,data_nascimento) VALUES
('Fulano','123.456.789-10','Rua do Fulano',10,'Casa',STR_TO_DATE('14/04/1980','%d/%m/%Y')),
('Ciclano','098.765.432-10','Rua do Ciclano',20,'Apto',STR_TO_DATE('10/05/1989','%d/%m/%Y')),
('Beltrano','234.534.229-10','Rua do Beltrano',30,'Casa',STR_TO_DATE('01/08/1990','%d/%m/%Y'));


INSERT INTO legado.dados(nome,cpf_cnpj,nome_logradouro,numero,complemento,data_nascimento) VALUES
('Fulano de Souza','123.455.789-10','Rua do Fulano',10,'Apartamento',STR_TO_DATE('14/04/1980','%d/%m/%Y')),
('Ciclano','091.765.432-10','Rua do Ciclano',21,'Apto',STR_TO_DATE('10/05/1989','%d/%m/%Y')),
('Beltrano','234.534.129-10','Rua do Beltreano',30,'Quintal',STR_TO_DATE('01/09/1990','%d/%m/%Y'));