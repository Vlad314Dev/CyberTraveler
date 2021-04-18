# IMPORTANT
## The project is using Licensed art!
## It is prohibided to reuse images from this project!
You can find the assets on the artist page: https://ansimuz.itch.io/


# Description
Futuristic action platformer written using Phaser3 + React.js + GraphQL + MySQL (dev-setup tag has also socket.io usage example)
The project is ment for learning purposes.

# Local setup
```
cd /www
git clone git@github.com:Vlad314Dev/CyberTraveler.git
cd CyberTraveler
npm install
```

Open new terminal window for backend server process:
```
cd /www/CyberTraveler
npm run start-dev-be
```

Open new terminal window for frontend application process:
```
cd /www/CyberTraveler
npm run start-dev-fe
```

The project should be available at http://localhost:5314


# NGINX configuration sample for socket.io
```
server {
  listen 80;
  listen 443 ssl;
  ssl_certificate     /usr/local/etc/nginx/ssl/localhost.crt;
  ssl_certificate_key /usr/local/etc/nginx/ssl/localhost.key;
  server_name localhost;

  access_log /usr/local/var/log/nginx/cybertraveler_access.log;
  error_log /usr/local/var/log/nginx/cybertraveler_error.log;
  
  location ~ / {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade"; # required for socket.io
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_pass http://localhost:5314;
  }
}
```

# Tests
```
npm run test src/tests/
```