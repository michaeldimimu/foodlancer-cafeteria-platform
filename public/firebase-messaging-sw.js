importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBTAcMkbsVJzZh4dNeL-U9k7pLWk5qAQ0Q",
  authDomain: "fcm-tutorial-2b4ce.firebaseapp.com",
  projectId: "fcm-tutorial-2b4ce",
  storageBucket: "fcm-tutorial-2b4ce.firebasestorage.app",
  messagingSenderId: "1003331905837",
  appId: "1:1003331905837:web:60f8b6ddb2ed32af734ba4",
  measurementId: "G-77Z8HEQ6GM",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
