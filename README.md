# horizon-infrastructure
Comando de inicio en local
```bash
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env up -d 
```

Comando para actualizar las imágenes de los microservicios. Este comando se usa cuando la imagen tiene una nueva versión y quieres actualizarla. 
```bash
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env pull
```


Los dos comandos anteriores se pueden ejecutar en un solo comando. 
```bash
docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env pull && docker-compose -f docker-horizon/docker-compose-dev.yaml --env-file .env up -d
```



Para configurar el kubectl con el cluster de azure
```bash
az login

az provider register --namespace Microsoft.ContainerService

az provider register --namespace Microsoft.Compute


az provider register --namespace Microsoft.Insights

az provider show -n Microsoft.Insights

az group create --name horizonResourceGroup --location eastus

az aks create \
  --resource-group horizonResourceGroup \
  --name horizonCluster \
  --node-count 3 \
  --enable-addons monitoring \
  --generate-ssh-keys

```

Para kubernetes
```bash
npm i && 
cd ./k8s &&
kompose convert -f ../docker-horizon/docker-compose-dev.yaml && 
cd .. &&
node k8s/config/secretsMapper.js

```
Modificar el env de los secretos en k8s/secrets/horizon-secrets.env.
Despues ACTUALIZAR LOS SECRETOS EN KUBERNETES
```bash
kubectl delete secret horizon-secrets &&
kubectl create secret generic horizon-secrets --from-env-file=k8s/secrets/horizon-secrets.env 
```

En el api-gateway service (Expone a internet el api-gateway)

```yaml
  type: LoadBalancer #This
  ports:
    - name: "6900"
      port: 6900
      targetPort: 80
      nodePort: 30000 #This
```

En el frontend
```yaml
  type: LoadBalancer #This
  ports:
    - name: "6902"
      port: 6902
      targetPort: 80
      nodePort: 30002 #This
```


Busca el orden en el que se deben aplicar los archivos de k8s (Algunos servicios dependen de otros)
```bash
node k8s/config/orderOfApply.js 
```
Mira los resultados en k8s/config/orderOfApply.txt. Ve aplicando los archivos en el orden que se muestra en el archivo.


Comandos de kubernetes útiles:
```bash
kubectl get pods
kubectl get svc
kubectl describe pod <pod-name>
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
|   | Feeds REDIS           | 6105     |                         |   |


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
