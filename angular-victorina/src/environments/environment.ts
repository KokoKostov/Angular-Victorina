// export class AppModule { }
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
 
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const environment = {
    production: false,
    firebaseConfig: { // Use 'firebaseConfig' instead of 'firebase'
      apiKey: "AIzaSyClNwHZUQ2Kjp0ng8kSKk73jxae9ENoR04",
      authDomain: "angularvictorina.firebaseapp.com",
      projectId: "angularvictorina",
      storageBucket: "angularvictorina.appspot.com",
      messagingSenderId: "426959602814",
      appId: "1:426959602814:web:20f00630d52a1044c9842f",
      measurementId: "G-4X0NG79J1X"
    }
  };
  