import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';
import { setup, teardown } from './config/setup';
import { token1, token2, token3 , exampleItinerary, exampleActivity, exampleInterestFilter, exampleItinerariesFeed } from './data';
import config from './config/config';

const API_GATEWAY_BASE_URL = config.apiGatewayBaseUrl;
// URLs to access the services through the API Gateway
const ITINERARY_BASE_URL = API_GATEWAY_BASE_URL + '/api/v1/itineraries/api/v1';
const FEEDS_BASE_URL = API_GATEWAY_BASE_URL + '/api/v1/feeds/api/v1';
console.log(`ITINERARY_BASE_URL: ${ITINERARY_BASE_URL}`);
console.log(`FEEDS_BASE_URL: ${FEEDS_BASE_URL}`);
let itineraryId;
let activityIndex=0;

beforeAll(async () => {
    await setup();
}, 60000); 

// afterAll(async () => {
    await teardown();
// });

describe('Integration Tests', () => {
    it('[+] [API-GATEWAY] [Validation] Should return 200 from api-gateway', async () => {
        console.log(`API_GATEWAY_BASE_URL: ${API_GATEWAY_BASE_URL}`);
        const response = await axios.get(API_GATEWAY_BASE_URL);
        expect(response.status).toBe(200);
    });

    it('[+] [API-GATEWAY] [Validation] Should get the infrastructure data from the api-gateway', async () => {
        const response = await axios.get(API_GATEWAY_BASE_URL+'/api/v1/infrastructure');
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('services');
        console.log(response.data);
    });

    
    it('[+] [API-GATEWAY][ITIN] [Validation] should ADD an itinerary', async () => {
        const response = await axios.post(`${ITINERARY_BASE_URL}/itineraries`, exampleItinerary, {
            headers: { 'Authorization': `Bearer ${token1}` }
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('name', 'Test Itinerary');
        itineraryId = response.data.data._id;
    });

    it('[+] [API-GATEWAY][ITIN] [Validation] Should ADD an activity', async () => {
        console.log(`url: ${ITINERARY_BASE_URL}/itineraries/${itineraryId}/activities`)
        const response = await axios.post(`${ITINERARY_BASE_URL}/itineraries/${itineraryId}/activities`, exampleActivity, {
            headers: { 'Authorization': `Bearer ${token1}` }
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('name', 'Test Activity');
    });

    it('[+] [API-GATEWAY][ITIN][METEO] [Auth][Addon] GET forecast should return 200 if user has addon2', async () => {
        const response = await axios.get(`${ITINERARY_BASE_URL}/itineraries/${itineraryId}/activities/${activityIndex}/forecast`, {
            headers: { 'Authorization': `Bearer ${token3}` }
        });
        expect(response.status).toBe(200);
        console.log(response.data);
        expect(response.data.data).toHaveProperty('daily');
        expect(response.data.data.daily).toHaveProperty('time');
    });

    it('[-] [API-GATEWAY][ITIN][METEO] [Auth][Addon] GET forecast should return 403 if user does not have addon2', async () => {
        try {
            const response = await axios.get(`${ITINERARY_BASE_URL}/itineraries/${itineraryId}/activities/${activityIndex}/forecast`, {
                headers: { 'Authorization': `Bearer ${token2}` }
            });
        } catch (error) {
            // If axios throws an error, it should be an HTTP 403 error
            expect(error.response.status).toBe(403);  
        }
    });

    it('[+] [API-GATEWAY][FEEDS] [Validation] should ADD an interestFilter', async () => {
        const response = await axios.post(`${FEEDS_BASE_URL}/interestFilter`, exampleInterestFilter, {
            headers: { 'Authorization': `Bearer ${token1}` }
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('userId', 'user1');
     });

     it('[+] [API-GATEWAY][FEEDS][ITIN] [Validation] should ADD an itinerariesFeed', async () => {
        const response = await axios.post(`${FEEDS_BASE_URL}/itinerariesFeed`, exampleItinerariesFeed, {
            headers: { 'Authorization': `Bearer ${token1}` }
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data.itineraryList).toBeInstanceOf(Array);
        expect(response.data.data.itineraryList).toHaveLength(1);
        expect(response.data.data.itineraryList[0]._id).toBe(itineraryId);

     });
});