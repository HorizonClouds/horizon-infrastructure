# horizon-infrastructure
Comando de inicio en local
```
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env up -d 
```

Comando para actualizar las imágenes de los microservicios. Este comando se usa cuando la imagen tiene una nueva versión y quieres actualizarla. 
```
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env pull
```