$(function () {
    const config = {
        apiKey: "AIzaSyD1ygCOm0MPyIyqgAQBYrbSPZq7CFwU-YI",
        authDomain: "tradekg-2621a.firebaseapp.com",
        databaseURL: "https://tradekg-2621a.firebaseio.com",
        projectId: "tradekg-2621a",
        storageBucket: "tradekg-2621a.appspot.com",
        messagingSenderId: "148348868294"
    };

    firebase.initializeApp(config);

    $("#signUp").click(function ( event ) {
        event.preventDefault();
        UIkit.notification('Загрузка')
        var email = document.forms["formUp"]["email"].value;
        var pass = document.forms["formUp"]["pass"].value;
        var confirmPass = document.forms["formUp"]["confirmPass"].value;
        var name = document.forms["formUp"]["name"].value;
        if(pass !== confirmPass || confirmPass === null || name === '') {
            UIkit.notification('pass != confirmPass')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(
                userCredentials => {
                    var userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('users/'+ userId).set({
                        email: email,
                        name
                      });
                    axios.post('/sign',{userId})
                        .then(response => location.reload())
                        .catch(error => alert('Server don\'t work'));
                }
            )
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
            });
        }
    )

    $("#signInGoogle").click(function (event) {
        event.preventDefault();
        UIkit.notification('Загрузка')
        var provider = new firebase.auth.GoogleAuthProvider();
        signWithProvider(provider);
    })

    $("#signInFacebook").click(function (event) {
        event.preventDefault();
        UIkit.notification('Загрузка')
        var provider = new firebase.auth.FacebookAuthProvider();
        signWithProvider(provider);
    })

    $("#signIn").click(function ( event ) {
        event.preventDefault();
        UIkit.notification('Загрузка')
        var email = document.forms["formIn"]["email"].value;
        var pass = document.forms["formIn"]["pass"].value;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, pass)
            .then(userCredentials => {
                axios.post('/sign',{userId: userCredentials.user.uid})
                    .then(response => location.reload())
                    .catch(error => alert('Server don\'t work'));
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });
        }
    )
    $("#signOut").click(function(event){
        event.preventDefault();
        UIkit.notification('Загрузка')
        firebase.auth().signOut()
        .then( () => {
            axios.post('/sign/out')
                .then(response => location.replace('/') )
                .catch(error => console.log(error));
            }
        ).catch(error => alert(error))
    })
})

function signWithProvider(provider) {  
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            var isNewUser = result.additionalUserInfo.isNewUser;
            if(isNewUser) {
                var email = result.user.email;
                firebase.database().ref('users/' + result.user.uid).set({
                    email: email,
                    name: result.user.providerData[0].displayName,
                    photoURL: result.user.providerData[0].photoURL
                });
            }
            axios.post('/sign',{userId: result.user.uid})
                .then(response => location.reload())
                .catch(error => alert('Server don\'t work'));
            })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}
