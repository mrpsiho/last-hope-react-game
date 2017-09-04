// Core
import React from 'react';
import { getCurrentTime, getUniqueID } from './';

describe('Helpers - getCurrentTime:', () => {
    test('must be a function', () => {
        expect(typeof getCurrentTime).toBe('function');
    });

    test('must return a number', () => {
        expect(typeof getCurrentTime()).toBe('number');
    });

    test('unix timestamp (seconds) is returned: 10 digits only', () => {
        const exampleTime = getCurrentTime();

        expect(exampleTime.toString()).toHaveLength(10);
    });
});

describe('Helpers - getUniqueID:', () => {
    test('must be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('must return a string', () => {
        expect(typeof getUniqueID(15)).toBe('string');
    });

    test('arg must be number', () => {
        function getUniqueIDWithError () {
            getUniqueID(null);
        }

        expect(getUniqueIDWithError).toThrowError(
            'length must be type of number'
        );
    });
});
