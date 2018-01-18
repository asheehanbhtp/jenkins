pipeline {
    agent any

    environment {
        REGISTRY="047362787997.dkr.ecr.us-east-1.amazonaws.com"
        IMAGE_NAME="bhtp/jenkins-playground"
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    docker.build("${env.IMAGE_NAME}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry("https://${env.REGISTRY}") {
                        docker.image("${env.IMAGE_NAME}").push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Deploy to Dev01') {

            environment {
                ENV_NAME="dev01"
            }

            steps {
                sh '''#!/bin/bash
                    JSON=$(jq \'. += [{ "ParameterKey": "ImageUri", "ParameterValue": "\'${REGISTRY}\'/\'${IMAGE_NAME}\':\'${BUILD_NUMBER}\'" }]\' <<<"$(jq -r \'\' cfn/environments/${ENV_NAME}.json)")
                    echo "${JSON}" > parameters.json
                    aws cloudformation update-stack \
                        --region us-east-1 \
                        --stack-name jenkins-dev01 \
                        --capabilities CAPABILITY_NAMED_IAM \
                        --template-url https://s3.amazonaws.com/us-east-1-cloudformation-templates/elastic-container-service/service.yml \
                        --parameters file://parameters.json
                    aws cloudformation wait stack-update-complete --stack-name jenkins-dev01'''
            }
        }

        stage('API Tests Dev01') {

            environment {
                ENV_NAME="dev01"
            }

            steps {
                sh '''
                    echo "Testing..."'''
            }
        }
    }
}
