# Angular UI seed based on Angle theme
[http://themicon.co/theme/angle/v3.3.1/material/#/app/welcome](http://themicon.co/theme/angle/v3.3.1/material/#/app/welcome)
## 

### Theme Documentation
[http://themicon.co/theme/angle/v3.3.1/material/#/app/documentation](http://themicon.co/theme/angle/v3.3.1/material/#/app/documentation)

### Running local env (exec all commands at ./master folder)
```npm install```


```bower install```

```gulp serve --env dev|prod|demo|local```

```bash
gulp build --env dev
```

this code will build all the source file ad will replace apiBaseUrl variable which is pointing on API running so we will be able to have as much testing/beta/production apps as we need.
here is a list of known  environment names and its variables: 

```javascript
//env names 
['local', 'demo', 'dev', 'prod'];
//env options
{
    local: {
        apiBaseUrl: "http://localhost:1337"
    }
}
```

NOTE: "local" environment is set by default so if you will not define --env argument before deploying you will deploy UI which will try to interface with API on `localhost:1337`

# Run front-end server (--env local is dsefault)

## local

```bash
    gulp serve
```
## demo

```bash
    gulp serve --env demo 
```

# Deployment

## requirements

Deployment script requires to have `./master/aws_config.json` which looks like `{"key":"your key", "secret": "your secret"}`.
You can get these keys on AWS under IAM section

## configuration

Bucket names is configurable for each environment (`local` is default) on `./master/gulpfile.js`. variable: `s3EnvBuckets`

## deploy


```bash
gulp deploy --env demo
```
# Notes

=======
```gulp serve --env dev|prod|demo|local```

# DEVELOPMENT

## Run localhost with connected to demo API (if you dont have localhosted API)

```bash
gulp serve --env demo
```


Once authorized next variables will be updated:

***$rootScope.user*** (user profile object)

***$localStorage.user*** (user profile object)

***$localStorage.authentication*** (authentication token)


## Sidebar data

Sidebar is potentially served by api based on user role.
But for development purposes (once its not figured out) its served by `./server/sidebar-menu.json`
Check out angle template documentation to get more details about sidebar if needed.

## Authentication events


All authentication is handled by a auth core module `./master/js/components/auth/*`
auth.run.js contains all of the ***AUTHENTICATION EVENT HANDLERS***
events: 

```javascript
$rootScope.$on('$updateUserProfile',...
$rootScope.$on('$login', ...
$rootScope.$on('$unauthorized', ...
$rootScope.$on('$logout', ...

```
