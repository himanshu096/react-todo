import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "yourkey",
    projectId: "yourapp",
    databaseURL: "https://yourapp.firebaseio.com",
    authDomain: "AUTH_DOMAIN",
    // OPTIONAL
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID"
});

const db = firebaseApp.firestore();

const addTodo =  async (data) => {

    var id = await db.collection("todos").doc().id;
    data["id"] = id;
    db.collection("todos").doc(id).set(data);
    return  data;
};

const deleteTodo =  async (id) => {
    var id = await db.collection("todos").doc(id).delete();
};

const updateTodo =  async (todo) => {
    var id = await db.collection("todos").doc(todo.id).set(todo);
};

async function getFirebaseTodos(){
    var snapshot = await  db.collection("todos").get();
    const data = snapshot.docs.map(doc => doc.data());
    return data;
}

export const loginUser = (email, password) => {
    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user.user.email);
        })
        .catch(error => {
            //Do something with the error if you want!
        });
};

export const logoutUser = () => {
    firebaseApp
        .auth()
        .signOut()
        .then(() => {
        })
        .catch(error => {
            //Do something with the error if you want!
        });
};


export { db,addTodo,getFirebaseTodos,deleteTodo,updateTodo};