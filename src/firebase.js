import firebase from 'firebase';

const config = {
    apiKey:            'AIzaSyAVv5vTuVxAuWvDtO8QYA_cV3XaNta7b40',
    authDomain:        'last-hope-game-db.firebaseapp.com',
    databaseURL:       'https://last-hope-game-db.firebaseio.com',
    projectId:         'last-hope-game-db',
    storageBucket:     'last-hope-game-db.appspot.com',
    messagingSenderId: '249946517983'
};

firebase.initializeApp(config);
export default firebase;
