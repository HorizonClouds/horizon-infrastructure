import { exec } from 'child_process';

process.env.NODE_ENV = 'production';
export const setup = async () => {
    try {
        console.log('Starting Docker containers for integration tests...');
        return new Promise((resolve, reject) => {
            exec('docker-compose -f ./docker-horizon/tests/docker-compose-test.yaml pull && docker-compose -f ./docker-horizon/tests/docker-compose-test.yaml up -d', async (error, stdout, stderr) => {
          if (error) {
              console.error('Error starting Docker containers:', error);
              reject(error);
              return;
          }
          if (stderr) {
              console.error('Docker stderr:', stderr);
          }
          console.log('Docker stdout:', stdout);
          console.log('Docker containers started successfully.');
          await new Promise(resolve => setTimeout(resolve, 10000));
          resolve();
            });
        });
    } catch (error) {
        console.error('Error starting Docker containers:', error);
        throw error;
    }
};

export const teardown = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Stopping Docker containers for integration tests...');
      exec('docker-compose -f ./docker-horizon/tests/docker-compose-test.yaml down', (error, stdout, stderr) => {
        if (error) {
          console.error('Error stopping Docker containers:', error);
          reject(error);
          return;
        }
        if (stderr) {
          console.error('Docker stderr:', stderr);
        }
        console.log('Docker stdout:', stdout);
        console.log('Docker containers stopped successfully.');
        resolve();
      });
    } catch (error) {
      console.error('Error stopping Docker containers:', error);
      reject(error);
    }
  });
};
