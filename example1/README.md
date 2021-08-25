# Introduction
Testing Project

# Getting Started

1.	Installation process
-  nodejs (version >=14.7.0)
-  pg (version >= 13.1)

2. Prerequisites
- copy all variable in .env.example  to .env and update all information

# Build and Test
Install Dependency:

```bash
    npm run install || yarn install
```

Migrate database 

```bash
    npm run db:migration:run || yarn db:migration:run
```

start project :
```bash
    npm run start:dev || yarn start:dev
```

Api documentation available at: ```localhost:{PORT}/api```


# Structure
```bash
.
├── _constant
│   		
├── common                
│   ├──   filters          
│   ├──   intercepters        
│   └──   middleware     
├── configs
│   ├── environments          
│   ├── logger           
│   ├── typeorm        
├── cores        
├── database          
├── helpers    
├── config.orm      
├── app.module      
└── main

          
```

# Work Flow
## 
Create device and its state via api ```localhost:{PORT}/devices```

# Contribute

