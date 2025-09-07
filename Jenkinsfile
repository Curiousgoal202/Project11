pipeline {
    agent any
    environment {
        REGISTRY = "docker.io"
        IMAGE_NAME = "server1"
        IMAGE_TAG = "latest"
        DOCKERHUB_CREDENTIALS = "creds"   // Jenkins credential ID
        SERVER_PORT = "8085"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Curiousgoal202/Project11.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building'
            }
        }

        stage('Test') {
            steps {
                echo 'Running test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}",
                                                      usernameVariable: 'DOCKER_USER',
                                                      passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                          echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                          docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                          docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                        """
                    }
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                sh """
                  docker stop webserver || true
                  docker rm webserver || true
                """
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}",
                                                      usernameVariable: 'DOCKER_USER',
                                                      passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                          docker run -d --name webserver -p $SERVER_PORT:80 $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend(
                channel: '#johncena',
                color: 'good',
                message: "✅ SUCCESS: Job '${env.JOB_NAME}' Build #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
            )
            mail to: 'santosgoal2024@gmail.com',
                 subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The build succeeded!\n\nCheck details here: ${env.BUILD_URL}"
        }

        failure {
            slackSend(
                channel: '#johncena',
                color: 'danger',
                message: "❌ FAILURE: Job '${env.JOB_NAME}' Build #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
            )
            mail to: 'santosgoal2024@gmail.com',
                 subject: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The build failed. See logs: ${env.BUILD_URL}console"
        }
    }
}
