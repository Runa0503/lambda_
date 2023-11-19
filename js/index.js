(() => {
  // ユーザープールの設定
  const poolData = {
    UserPoolId: "us-east-2_4Db3DfALw",
    ClientId: "312r8a9didcj621ct31dq05teo"
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const attributeList = [];

  // Amazon Cognito 認証情報プロバイダーを初期化します
  AWS.config.region = "us-east-2"; // リージョン
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:9ee0731a-84ec-4e9a-bddf-6c727ed16167"
  });

  // 「Create Account」ボタン押下時
  const createAccountBtn = document.getElementById("createAccount");
  createAccountBtn.addEventListener("click", () => {
    /**
     * サインアップ処理。
     */
    const username = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById('password').value;

    // 何か1つでも未入力の項目がある場合、処理終了
    const message = document.getElementById("message-span");
    if (!username | !name | !password) {
      message.innerHTML = "未入力項目があります。";
      return false;
    }

    // ユーザ属性リストの生成
    const dataName = {
      Name: "name",
      Value: name
    };
    const dataRole = {
      Name: "custom:role",
      Value: "5"
    };
    const attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataName
    );
    const attributeRole = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataRole
    );

    attributeList.push(attributeName);
    attributeList.push(attributeRole);

    // サインアップ処理
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        message.innerHTML = err.message;
        return;
      } else {
        // サインアップ成功の場合、アクティベーション画面に遷移する
        alert(
          "登録したメールアドレスへアクティベーション用のリンクを送付しました。"
        );
        location.href = "index.html";
      }
    });
  });
})();

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
