import { readFileSync, writeFileSync, appendFileSync } from 'fs';
import { load } from 'js-yaml';

const dockerComposePath = 'docker-horizon/docker-compose-dev.yaml';
const outputOrderPath = './k8s/config/applyOrder.txt';

function getServiceDependencies(dockerCompose) {
    const services = dockerCompose.services;
    const dependencies = {};

    for (const service in services) {
        dependencies[service] = services[service].depends_on || [];
    }

    return dependencies;
}

function resolveOrder(dependencies) {
    const resolved = [];
    const seen = new Set();

    function resolve(service) {
        if (seen.has(service)) {
            return;
        }
        seen.add(service);

        dependencies[service].forEach(dep => {
            if (!seen.has(dep)) {
                resolve(dep);
            }
        });

        resolved.push(service);
    }

    for (const service in dependencies) {
        resolve(service);
    }

    return resolved;
}

function writeKubernetesConfigs(order) {
    // Clear the file before appending new commands
    writeFileSync(outputOrderPath, 'For each complete using TAB. first volumes, then deploys then services', 'utf8');

    order.forEach(service => {

        const command = `kubectl apply -f ./k8s/${service}-`;
        appendFileSync(outputOrderPath, command + `\n`, 'utf8');
    });
}

function main() {
    const dockerCompose = load(readFileSync(dockerComposePath, 'utf8'));
    const dependencies = getServiceDependencies(dockerCompose);
    const order = resolveOrder(dependencies);

    console.log(`Order of apply written to: ${outputOrderPath}`);

    writeKubernetesConfigs(order);
}

main();
