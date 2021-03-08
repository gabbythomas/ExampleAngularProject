def dockerImage = 'null'

pipeline {
    agent any
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
            when {
                branch 'main'
            }
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
