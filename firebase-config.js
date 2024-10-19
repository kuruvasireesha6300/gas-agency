const firebaseConfig = {
    apiKey: "AIzaSyDxeHDkzOLvO79POjCq11HH15oB58L5A4E",
    authDomain: "gas-agency-1751c.firebaseapp.com",
    projectId: "gas-agency-1751c",
    storageBucket: "gas-agency-1751c.appspot.com",
    messagingSenderId: "314926236437",
    appId: "1:314926236437:web:32aa4d316b17c3b8fd5f1c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();