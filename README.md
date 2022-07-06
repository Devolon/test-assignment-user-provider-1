# User Provider

## Running the user provider instance
```shell
docker run --rm -p 3000:3000 dev0l0n/test-assignment-user-provider-1:latest
```

## Endpoints

### Getting list of users
```http request
GET http://localhost:3000/users?page=1&size=10
Accept: application/json
```

### Getting a specific user details by id
```http request
GET http://localhost:3000/users/10
Accept: application/json
```

### Increase user credit
```http request
PUT http://localhost:3000/users/10/credit
Accept: application/json
Content-Type: application/json

{
  "amount": 10,
  "operation": "increase"
}
```

### Decrease user credit
```http request
PUT http://localhost:3000/users/10/credit
Accept: application/json
Content-Type: application/json

{
  "amount": 10,
  "operation": "decrease"
}
```