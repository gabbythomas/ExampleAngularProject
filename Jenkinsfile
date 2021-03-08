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
                sh "docker build -t example-angular-app ."
            }
        }
        stage('Publish') { 
            steps {
                sh "docker tag example-angular-app gabrient/example-angular-app:${env.BUILD_ID}"
                sh "docker push gabrient/example-angular-app:${env.BUILD_ID}"
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
