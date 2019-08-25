# URL Shortener.REST
Restful apis that helps in getting shortened urls.

Technology Stack : Node.js, Express, MySQL 5.7, Sequelize

Urls exposed : 

1. To get the shortened url
    Url : '/'
    Type : POST
    Body : {
        url:"http://www.example.com"
    },
    Auth : No Auth/Public
    Response : 
        {
            "data": {
                "code": "nh"
            }
        }

    Here "code" that we have received in the response will be appended to the base url of the User Interface(Another project built on Angular) as in http://ui/nh ===>> This will redirect the user to http://www.example.com
    This redirection is happening from front-end only after capturing necessary details whenever the url gets open.
    

2. To get the long url based on the code
    Url : '/nh'
    Type : GET
    Auth : No Auth/Public
    Response : 
       {
        "data": {
            "id": 1003,
            "url": "http://www.example.com",
            "created_at": "2019-08-25T16:56:33.000Z",
            "updated_at": "2019-08-25T16:56:33.000Z"
        }
    }

    This response fetches the original url based on the code.

3. To get all the urls that are in db
    Url : '/'
    Type : GET
    Auth : No Auth/Public
    Response : 
       {
        "data": [
            {
            "id": 1000,
            "url": "https://www.netflix.com/browse",
            "created_at": "2019-08-25T19:28:25.000Z",
            "updated_at": "2019-08-25T19:28:25.000Z",
            "UrlLogs": []
                }
            }
    
    This endpoint list all the urls that are in the database.


