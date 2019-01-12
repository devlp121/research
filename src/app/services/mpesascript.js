var request = require('request'),
    consumer_key = "dtroPUFZaYP6hDJO6N0KjdRqrWj4bVOo",
    consumer_secret = "12DJQ25KqNN9C5KF",
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

request(
    {
        url: url,
        headers: {
            "Authorization": auth
        }
    },
    (req)=>{
        if (req.secure == true){
            host = 'https://'+ req.headers.host;
        }
        else{
            host = 'http://' + req.headers.host;
        }
    },
    function (error, response, body) {
        var result;
        result = JSON.parse.body;
        console.log(result);
        // TODO: Use the body object to extract OAuth access token
    }
)