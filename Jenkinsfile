pipeline {
    agent any
    def dockerImage
    stages {
        stage('Checkout') { 
            steps {
                checkout scm
            }
        }
        stage('Build') { 
            steps {
                dockerImage = docker.build("gabrient/example-angular-app")
            }
        }
        stage('Publish') { 
            steps {
                docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_credentials') {
                    dockerImage.push("${env.BUILD_ID}")
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
