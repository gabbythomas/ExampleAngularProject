pipeline {
    environment {
        registry = 'https://registry.hub.docker.com'
        registryCredentials = 'dockerhub_credentials'
        dockerImage = ''
        dockerImageName = "gabrient/example-angular-app"
        deployContainerName = "example-angular-app-deploy"
    }
    agent any
    stages {
        stage('Remove Deploy') {
            steps {
                script {
                    sh """
                        if docker container ls | grep ${deployContainerName}; then
                            docker container stop ${deployContainerName}
                        fi
                    """
                }
            }
        }
        stage('Checkout') { 
            steps {
                checkout scm
            }
        }
        stage('Build') { 
            steps {
                script {
                    dockerImage = docker.build(dockerImageName)
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
        stage('Deploy') { 
            when {
                branch 'main'
            }
            steps {
                sh "docker pull ${dockerImageName}:${env.BUILD_ID}"
                sh "docker run -d --rm --name ${deployContainerName} -p 4200:4200 ${dockerImageName}"
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
