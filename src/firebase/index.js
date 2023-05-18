import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  export {auth, db};

  function saveMessage(assistant, user, content) {
    const messageData = {
      assistant: assistant,
      user: user, 
      content: content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
  
    db.collection('messages')
      .add(messageData)
      .then(docRef => {
        console.log('메시지가 Firestore에 저장되었습니다. 문서 ID:', docRef.id);
      })
      .catch(error => {
        console.error('메시지 저장 중 오류가 발생했습니다:', error);
      });
  }