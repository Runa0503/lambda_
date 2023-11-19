AWS.config.region = 'us-east-2'; // Region
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
