import jwt from 'jsonwebtoken';
import config from './config/config.js';
export const exampleItinerary = {
    name: 'Test Itinerary',
    description: 'Test Description',
    startDate: new Date(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    activities: [],
    comments: [],
    reviews: []
};

export const exampleActivity = {
    userId: 'user1',
    name: 'Test Activity',
    description: 'Test Activity Description',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    location: {
        latitude: 37.38283,
        longitude: -5.97317,
        address: 'Seville, Spain'
    }
};
export const exampleInterestFilter = {
    userId: "user1",
    categoryList: [
        "CITY",
        "ADVENTURE"
    ]
};

export const exampleItinerariesFeed = {
    userId: "user1",
};


const user1payload = {
    user: {
        userId: "user1",
        roles: ['admin', 'user'],
        plan: 'pro',
        addons: ['all'],
        name: 'John Doe',
        verifiedEmail: true,
    }
};

const user2payload = {
    user: {
        userId: "user2",
        roles: ['user'],
        plan: 'basic',
        addons: ["addon1"],
        name: 'Jane Smith',
        verifiedEmail: true,
    }
};

const user3payload = {
    user: {
        userId: "user3",
        roles: ['user'],
        plan: 'pro',
        addons: ['addon1', 'addon2'],
        name: 'Alice Johnson',
        verifiedEmail: false,
    }
};

/**
 * User 1: Admin, Pro plan, all addons, verified email
 */
export const token1 = jwt.sign(user1payload, config.jwtSecret, { expiresIn: '1h' });
/**
 * User 2: User, Basic plan, addon1, verified email
*/
export const token2 = jwt.sign(user2payload, config.jwtSecret, { expiresIn: '1h' });
/**
 * User 3: User, Pro plan, addon1, addon2, unverified email
 */
export const token3 = jwt.sign(user3payload, config.jwtSecret, { expiresIn: '1h' });

