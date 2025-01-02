# horizon-infrastructure
Comando de inicio en local
```
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env up -d 
```

Comando para actualizar las imágenes de los microservicios. Este comando se usa cuando la imagen tiene una nueva versión y quieres actualizarla. 
```
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env pull
```
---
# Ports Schema

| Microservicio       | Puerto | Docker Image          |
|---------------------|--------|-----------------------|
| Front-end       | 6000   |    |
| Feeds       | 6101   | |
| Feeds database | 6102   |   |
| Chats       | 6103   |   |
| Chats database      | 6104   | |
| Logger               | 6900   |  |
