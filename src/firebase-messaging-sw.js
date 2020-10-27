// import firebase scripts inside service worker js script
importScripts('https://www.gstatic.com/firebasejs/5.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.10.0/firebase-messaging.js');

let config = {
    // messagingSenderId: "674925598222"
   
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
   const title = payload.notification.title;
   console.log('payload', payload.notification.icon);
   const options = {
      body: payload.notification.body,
      icon: payload.notification.icon
   }
   return self.registration.showNotification(title, options);
})