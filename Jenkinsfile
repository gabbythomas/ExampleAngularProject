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
                ng build tour-of-heroes
            }
        }
        stage('Deploy') { 
            steps {
                echo "Deploy"
            }
        }
    }
}
