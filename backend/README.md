#Rodando o projeto

#Criando imagem docker
docker build -t nlwsports .

#subindo container
docker run --name backendnlwsports -d -p 3333:3333 nlwsports