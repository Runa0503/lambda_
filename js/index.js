//const AWS = require('aws-sdk');
//const cognitoIdentity = new AWS.CognitoIdentity();

window.onload = function() {
  // ユーザープールの設定
  const poolData = {
    UserPoolId: "us-east-2_4Db3DfALw",
    ClientId: "312r8a9didcj621ct31dq05teo"
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser(); // 現在のユーザー

  const currentUserData = {}; // ユーザーの属性情報

  // Amazon Cognito 認証情報プロバイダーを初期化します
  AWS.config.region = "us-east-2"; // リージョン
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:9ee0731a-84ec-4e9a-bddf-6c727ed16167"
  });

  // 現在のユーザーの属性情報を取得・表示する
  // 現在のユーザー情報が取得できているか？
  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        location.href = "signin.html";
      } else {
        // ユーザの属性を取得
        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            location.href = "signin.html";
          }

          // 取得した属性情報を連想配列に格納
          for (let i = 0; i < result.length; i++) {
            currentUserData[result[i].getName()] = result[i].getValue();
          }
          document.getElementById("name").innerHTML =
            "ようこそ！" + currentUserData["name"] + "さん";
          document.getElementById("role").innerHTML =
            "Your Role is " + currentUserData["custom:role"];
          document.getElementById("email").innerHTML =
            "Your E-Mail is " + currentUserData["email"];

          // サインアウト処理
          const signoutButton = document.getElementById("signout");
          signoutButton.addEventListener("click", event => {
            cognitoUser.signOut();
            location.reload();
          });
          signoutButton.hidden = false;
          console.log(currentUserData);
        });
      }
    });
  } else {
    location.href = "signin.html";
  }
};



/*AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:9ee0731a-84ec-4e9a-bddf-6c727ed16167',
});
  // Initialize the Amazon Cognito credentials provider
  AWSCognito.config.region = 'us-east-2'; // Region
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-2:9ee0731a-84ec-4e9a-bddf-6c727ed16167'
  });
  var data = { UserPoolId: 'us-east-2_4Db3DfALw',
                ClientId: '312r8a9didcj621ct31dq05teo',
                Paranoia : 7
  };

  var userPool;
  var cognitoUser;

$("#login-button").click(function(event){	
    event.preventDefault();
    var authenticationData = {
        Username : $('#name').val(),
        Password : $('#password').val()
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
    var userData = {
        Username : $('#name').val(),
        Pool : userPool
       };
    cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (authresult) {
            //console.log('access token + ' + authresult.getIdToken().getJwtToken());
            
             var url = "mypage.html";

             $('form').fadeOut(700, function(){
                $(location).attr("href", url);
             });
             $('.wrapper').addClass('form-success'); 
            
        },
        onFailure: function(err) {
            alert(err.message);
        },
    });
});
*/
