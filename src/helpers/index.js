// Core
import moment from 'moment';

export const getCurrentTime = () => moment().unix();

export const getUniqueID = (length) => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if (typeof length !== 'number') {
        throw Error('length must be type of number');
    }

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getRandomNumber = (min, max) => {
    if (typeof min !== 'number') {
        throw Error('min must be type of number');
    }
    if (typeof max !== 'number') {
        throw Error('max must be type of number');
    }

    return Math.floor(Math.random() * (max - min + 1) + min);  // eslint-disable-line
};
