importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAAZwM-2tlA5YHnLisRbSV5En_QBc2d6_k",
  authDomain: "foodlancer-ae872.firebaseapp.com",
  projectId: "foodlancer-ae872",
  storageBucket: "foodlancer-ae872.firebasestorage.app",
  messagingSenderId: "123630284354",
  appId: "1:123630284354:web:92b60161bc7692ba2407db",
  measurementId: "G-THV2GWYCH1",
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
