#Shine

##Desciption
The Practice App for "Rails, Angular, Postgres and Bootstrap" Book

## Installation
* Install dependencies
``` 
  bundle install
```

* Set the following Enviroment variables:
  * ENV['SHINE_DATABASE_PASSWORD']

* Run Migrations
``` 
  rake db:migrate
```

Run developement server
``` 
  rails server
```

## Run Tests
* For running rspec tests
``` 
  rspec
```

* For running jasmine tests
``` 
  rake teaspoon
```