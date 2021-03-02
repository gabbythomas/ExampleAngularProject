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
                sh 'ng build tour-of-heroes'
            }
        }
        stage('Deploy') { 
            steps {
                echo "Deploy"
            }
        }
    }
    post {
    	always {
    	    cleanWs()
    	}
    }
}
