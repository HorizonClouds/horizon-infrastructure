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
# Contenedores Grupales. Puertos 

|   | Microservicio         | Puerto   | Docker Image            |   |
|---|-----------------------|----------|-------------------------|---|
|   | API-Gateway           | 6900     |                         |   |
|   | Logger                | 6901     |                         |   |
|   | Front-end             | 6902     |                         |   |
|   | Zookeeper             | 2181     |                         |   |
|   | Kafka                 | 9092     |                         |   |


# Javier y Marta (61XX)

|   | Microservicio         | Puerto   | Docker Image            |   |
|---|-----------------------|----------|-------------------------|---|
|   | Feeds                 | 6101     |                         |   |
|   | Feeds database        | 6102     |                         |   |
|   | Chats                 | 6103     |                         |   |
|   | Chats database        | 6104     |                         |   |

# Jose y Alex (62XX)

|   | Microservicio         | Puerto   | Docker Image            |   |
|---|-----------------------|----------|-------------------------|---|
|   | Micro 1               | 6201     |                         |   |
|   | Database 1            | 6202     |                         |   |
|   | Micro 2               | 6203     |                         |   |
|   | Database 2            | 6204     |                         |   |

# Isma y Juan (63XX)

|   | Microservicio         | Puerto   | Docker Image            |   |
|---|-----------------------|----------|-------------------------|---|
|   | Micro 1               | 6301     |                         |   |
|   | Database 1            | 6302     |                         |   |
|   | Micro 2               | 6303     |                         |   |
|   | Database 2            | 6304     |                         |   |

# Claudia y Manuel (64XX)

|   | Microservicio         | Puerto   | Docker Image            |   |
|---|-----------------------|----------|-------------------------|---|
|   | Itineraries           | 6401     |                         |   |
|   | Itineraries DB        | 6402     |                         |   |
|   | Meteo                 | 6403     |                         |   |
|   | Meteo REDIS           | 6404     |                         |   |

# Antonio y Luis (65XX)

|   | Microservicio         | Puerto   | Docker Image            |   |
|---|-----------------------|----------|-------------------------|---|
|   | Micro 1               | 6501     |                         |   |
|   | Database 1            | 6502     |                         |   |
|   | Micro 2               | 6503     |                         |   |
|   | Database 2            | 6504     |                         |   |
