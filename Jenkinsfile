pipeline {
    agent {
        label 'agent1'
    }

    environment {
        
        STAGE = "${env.BRANCH_NAME ==~ 'feature/.*' ? 'devops' : env.BRANCH_NAME == 'develop' ? 'dev' : env.BRANCH_NAME ==~ 'release' ? 'sta' : env.BRANCH_NAME == 'main' ? 'prod' : '0' }"
        
        URL_CMS = "${env.BRANCH_NAME ==~ 'feature/.*' ? 'https://adminmi-dev-xx.xx01.link' : env.BRANCH_NAME == 'develop' ? 'https://adminmi-dev-xx.xx01.link' : env.BRANCH_NAME ==~ 'release' ? 'https://adminmi-cert.xx.xx.pe' : env.BRANCH_NAME == 'main' ? 'https://adminmi.xx.xx.pe' : '0' }"
       
        API_KEY_LAMBDA = credentials('API_KEY_LAMBDA')
       
        MODALIDADES = "FC,AC,UK"
    }
    stages {        
        stage('Despliegue Desarrollo'){
            environment {
                AWS_CREDENTIALS = credentials('aws-access-dev')
                AWS_ACCESS_KEY_ID = AWS_CREDENTIALS.username
                AWS_SECRET_ACCESS_KEY = AWS_CREDENTIALS.password
                AWS_DEFAULT_REGION = 'us-east-1'               
                API_KEY_GESTOR_NOTIFICACIONES = credentials('API_KEY_GESTOR_NOTIFICACIONES_DEV')
            }
            when { branch "develop" }
            steps {
                echo "El ambiente es: ${STAGE}"      
                echo "El url del ambiente es:  ${URL_CMS}"               
                echo "la region de despliegue es:  ${AWS_DEFAULT_REGION}"  
                echo "las modalidades son:  ${MODALIDADES}"                
            }
        }
        stage('Despliegue Calidad'){
            environment {
                AWS_CREDENTIALS = credentials('aws-access-qa')
                AWS_ACCESS_KEY_ID = AWS_CREDENTIALS.username
                AWS_SECRET_ACCESS_KEY = AWS_CREDENTIALS.password
                AWS_DEFAULT_REGION = 'us-east-2'               
                API_KEY_GESTOR_NOTIFICACIONES = credentials('API_KEY_GESTOR_NOTIFICACIONES_STA')
            }
            when { branch "release" }
            steps {
                echo "El ambiente es: ${STAGE}"      
                echo "El url del abmiente es:  ${URL_CMS}"
                echo "la region de despliegue es:  ${AWS_DEFAULT_REGION}"               
                echo "las modalidades son:  ${MODALIDADES}"
            }
        }
        stage('Produccion'){
            environment {
                AWS_CREDENTIALS = credentials('aws-access-prod')
                AWS_ACCESS_KEY_ID = AWS_CREDENTIALS.username
                AWS_SECRET_ACCESS_KEY = AWS_CREDENTIALS.password
                AWS_DEFAULT_REGION = 'us-east-2'               
                API_KEY_GESTOR_NOTIFICACIONES = credentials('API_KEY_GESTOR_NOTIFICACIONES_STA')
            }
            when { branch "release" }
            steps {
                echo "El ambiente es: ${STAGE}"      
                echo "El url del abmiente es:  ${URL_CMS}"
                echo "la region de despliegue es:  ${AWS_DEFAULT_REGION}"               
                echo "las modalidades son:  ${MODALIDADES}"
            }
        }        
    }
}