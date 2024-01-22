import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// firebase
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import "firebase/compat/database";
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// components
import Loader from '@/components/Loader'




const firebaseConfig = {
    apiKey: "AIzaSyBtqjQ3HXd7HnxVlWydl7g4AdU2GfS7dV0",
    authDomain: "diplom-83ea4.firebaseapp.com",
    projectId: "diplom-83ea4",
    storageBucket: "diplom-83ea4.appspot.com",
    messagingSenderId: "964672236605",
    appId: "1:964672236605:web:d1ae8b5c2312f3ba75ce54"
  };

 firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// auth.signOut()
const firestore = getFirestore();
console.log(firestore)

let app;


auth.onAuthStateChanged(()=>{
    if(!app){
        createApp(App).use(store).use(router)
        .component('Loader', Loader)
        .mount('#app')
    }
})




