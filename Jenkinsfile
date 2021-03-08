pipeline {
    environment {
        registry = 'https://registry.hub.docker.com'
        registryCredentials = 'dockerhub_credentials'
        dockerImage = ''
    }
    agent any
    stages {
        stage('Checkout') { 
            steps {
                checkout scm
            }
        }
        stage('Build') { 
            steps {
                script {
                    dockerImage = docker.build("gabrient/example-angular-app")
                }
            }
        }
        stage('Publish') { 
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry(registry, registryCredentials) {
                        dockerImage.push("${env.BUILD_ID}")
                    }
                }
            }
        }
    }
    post {
    	always {
            sh "docker system prune -f"
    	    cleanWs()
    	}
    }
}
