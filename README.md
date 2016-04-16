# [Angular Firebase Chat](https://github.com/rhildred/angularfirebasechat)

Last year when I did mobile development with phonegap, I spent some time on node.js with socket.io. [Firebase](https://www.firebase.com/docs/web/quickstart.html) is a ready-made back end that uses similar push technology to keep multiple clients up to date.

The dependencies for firebase are:

```

<script src="cordova.js"></script>
<!-- AngularJS -->
<script src="js/angular.min.js"></script>

<!-- Firebase -->
<script src="js/firebase.js"></script>

<!-- AngularFire -->
<script src="js/angularfire.min.js"></script>

```

A really neat thing about firebase is that it allows for 3 way data binding. In this case we will bind the `messages` array to an object stored in firebase:

```
<form ng-hide="auth == null">
    <div ng-repeat="(n, message) in messages track by n">{{message.sender}}:{{message.text}}</div>
    <p >Message : <input type="text" ng-model="newMessageText"></p>
    <button type = "submit" ng-click="addMessage()">Send</button>
    <button ng-click="logout()">Logout</button>
</form>

```

We create an app on firebase, to which we get a url, in my case `https://dazzling-heat-1553.firebaseio.com` We can 3 way bind a data structure to this url like this:

```
$scope.ref = new Firebase("https://dazzling-heat-$firebaseArray($scope.ref);
```

Once bound, we can add a new message onto all of the clients:

```
$scope.addMessage = function() {
    $scope.messages.$add({
        text: $scope.newMessageText,
        sender: $scope.auth.google.displayName,
        uid:$scope.auth.uid
    });
    $scope.newMessageText = "";
};

```

We don't want people to add messages anonymously. We use google oauth2 to authenticate:

```

$scope.login =function() {
    var provider = 'google';
    var scope = {scope:'email'};
    var auth = $firebaseAuth(getRef());
    auth.$authWithOAuthPopup(provider, scope, function(error, authData){
        if (error) {
            // an error occurred while attempting login
            alert("error: " + error);
        }
    });
};
$scope.logout = function(){
    $scope.auth = null;
    getRef().unauth();
}

```

We create a rule on firebase to protect our data:

```
{
    "rules": {
        ".read": false,
        ".write": false,
        "messages":{
          ".read": "auth != null",
          "$message":{
            ".write":"auth != null",
            "uid":{
              ".validate": "newData.val() == auth.uid"
            }
          }
        }
    }
```

There was one pretty big gotcha with firebase this year. The latest cordova (cli-5.2.0) is broken with respect to firebase's oauth2 implementation. After messing about with it for way too long. I ended with this fix `<preference name="phonegap-version" value="3.7.0" />` being the active ingredient:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="io.github.rhildred.simplechat" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Simple chat</name>
    <description>
        A simple chatapp with a firebase backend.
    </description>
    <author email="rhildred@gmail.com" href="https://rhildred.github.io">
        Apache Cordova Team
    </author>
    <content src="index.html" />
    <preference name="phonegap-version" value="3.7.0" />
    <plugin name="org.apache.cordova.inappbrowser" />
    <allow-navigation href="https://*/*" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
</widget>
```

Firebase is an amazing tool to share state among multiple clients. Check the running ap out [here](https://rhildred.github.io/angularfirebasechat/www)!
