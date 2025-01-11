import { writeFileSync, readdirSync, readFileSync, appendFileSync } from 'fs';
import { join } from 'path';
import { load, dump } from 'js-yaml';
import dotenv from 'dotenv';
dotenv.config();

const APP_NAME = 'horizon'; // Name of the application
const directoryPath = './k8s'; // Path to the directory containing deployment.yaml files
const secretEnvPath = join(directoryPath, `secrets/${APP_NAME}-secrets.env`);
const secretEnvExamplePath = join(directoryPath, `secrets/${APP_NAME}-secrets.env.example`);

function traverseAndReplaceEnvVars() {
    console.log('Starting to traverse and replace environment variables...');

    // Recreate the secret files
    writeFileSync(secretEnvPath, '', 'utf8');
    writeFileSync(secretEnvExamplePath, '', 'utf8');
    console.log(`Recreated secret env files: ${secretEnvPath}, ${secretEnvExamplePath}`);

    const files = readdirSync(directoryPath).filter(file => /-deployment\.yaml$/.test(file));
    console.log(`Found files: ${files}`);

    files.forEach(file => {
        const SERVICE_NAME = file.split('-')[0];
        const filePath = join(directoryPath, file);
        console.log(`Processing file: ${filePath}`);
        const fileContent = load(readFileSync(filePath, 'utf8'));
        processContainers(fileContent.spec.template.spec.containers, `${SERVICE_NAME}-secrets`);

        // const outputFilePath = path.join(directoryPath, `secrets/${SERVICE_NAME}-secrets.yaml`);
        writeFileSync(filePath, dump(fileContent), 'utf8');
        console.log(`Updated file written to: ${filePath}`);
    });
}

function processContainers(containers, serviceSecretGroupName) {
    containers.filter(container => container.env && container.env.length > 0)
        .forEach(container => {
            const secretData = {};

            if (!container.env) {
                return;
            }
            container.imagePullPolicy = 'Always';
            container.env.forEach(env => {
                const name = `${serviceSecretGroupName}_${env.name}`;
                const value = env.value;
                console.log(`Replacing env var: ${name} with secret reference`);
                delete env.value;
                env.valueFrom = {
                    secretKeyRef: {
                        name: APP_NAME + '-secrets',
                        key: name
                    }
                };
                secretData[name] = value ?? process.env[env.name] ?? '';
            });
            generateSecretEnv(secretData);
        });
}

function generateSecretEnv(secretData) {
    console.log('Generating secret.env and secret.env.example files...');

    appendFileSync(secretEnvPath, Object.entries(secretData).map(([key, value]) => `${key}=${value}`).join('\n') + '\n', 'utf8');
    appendFileSync(secretEnvExamplePath, Object.keys(secretData).join('=\n') + '=\n', 'utf8');
    console.log(`Secret env file appended to: ${secretEnvPath}`);
    console.log(`Secret env example file appended to: ${secretEnvExamplePath}`);
}

traverseAndReplaceEnvVars();
