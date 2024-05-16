pipeline {
    agent {
        label 'node18-sls'
    }

    environment {
        
        STAGE = "${env.BRANCH_NAME ==~ 'feature/.*' ? 'devops' : env.BRANCH_NAME == 'develop' ? 'dev' : env.BRANCH_NAME ==~ 'release' ? 'sta' : env.BRANCH_NAME == 'master' ? 'prod' : '0' }"
        
        URL_CMS = "${env.BRANCH_NAME ==~ 'feature/.*' ? 'https://adminmi-dev-xx.xx01.link' : env.BRANCH_NAME == 'develop' ? 'https://adminmi-dev-xx.xx01.link' : env.BRANCH_NAME ==~ 'release' ? 'https://adminmi-cert.xx.xx.pe' : env.BRANCH_NAME == 'master' ? 'https://adminmi.xx.xx.pe' : '0' }"
       
        API_KEY_LAMBDA = credentials('API_KEY_LAMBDA')
       
        MODALIDADES = "FC,AC,UK"
    }
    stages {
        stage('Validacion Inicial') {
            steps {
                sh 'pwd'
                sh 'ls -lh'
                sh 'node --version'
                sh 'npm --version'
                sh 'python3 --version'
                sh 'pip --version'
                sh 'serverless --version'
                //sh 'printenv'
            }
        }
        stage('Build'){
            steps {
                sh 'npm install'
                sh 'npm i -D serverless-dotenv-plugin'
                sh 'npm install serverless-domain-manager --save-dev'
                sh 'sls plugin install -n serverless-python-requirements'
                sh 'pip install -r requirements.txt'
            }
        }
        stage('Pruebas de Integración'){
            steps {
                echo "El valor de STAGE es: ${STAGE}"
                echo "El valor de URL_CMS es: ${URL_CMS}"
                sh "pytest || echo 'La prueba pytest falló...'"
            }
        } 
        stage('Análisis de Calidad'){
            agent {
                label 'java11-minimal'
            }
            environment {
                scannerHome = tool 'Sonarqube-Scanner-48'
            }
            steps {
                withSonarQubeEnv(credentialsId: 'sonarqube-token', installationName:'Sonarqube-Laureate') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=PR-xx-BE-xx"
                }
            }
        }
        stage('Despliegue Desarrollo'){
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id-dev')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key-dev')
                AWS_DEFAULT_REGION = 'us-east-1'               
                API_KEY_GESTOR_NOTIFICACIONES = credentials('API_KEY_GESTOR_NOTIFICACIONES_DEV')
            } 

            when { branch "develop" }
            steps {
                sh 'pwd'
                sh 'ls -lh'
                sh 'aws s3 ls'

                echo "El ambiente es: ${STAGE}"
      

                echo "Realizando el despliegue a Desarrollo ..."

                //sh 'serverless create_domain --stage ${STAGE} --verbose'
                sh 'serverless deploy --stage ${STAGE} --verbose'

                //sh 'serverless delete_domain --stage ${STAGE} --verbose'
                //sh 'serverless remove --stage ${STAGE} --verbose'
            }
        }
        stage('Despliegue Calidad'){
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id-qa')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key-qa')
                AWS_DEFAULT_REGION = 'us-east-1'               
                API_KEY_GESTOR_NOTIFICACIONES = credentials('API_KEY_GESTOR_NOTIFICACIONES_STA')
            }
            when { branch "release" }
            steps {
                echo "El ambiente es: ${STAGE}"


                //input '¿Está seguro de realizar el Despliegue a Calidad?'
                echo "Realizando el despliegue a Calidad ..."

                //sh 'serverless create_domain --stage ${STAGE} --verbose'
                sh 'serverless deploy --stage ${STAGE} --verbose'

                //sh 'serverless delete_domain --stage ${STAGE} --verbose'
                //sh 'serverless remove --stage ${STAGE} --verbose'
            }
        }
    }
}