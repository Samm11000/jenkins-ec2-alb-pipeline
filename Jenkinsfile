pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Code GitHub se aa gaya — Jenkins ne khud pull kiya'
            }
        }

        stage('Build') {
            steps {
                echo '=== Dependencies install ho rahi hain ==='
                sh 'npm install'
                echo '=== Build complete ==='
            }
        }

        stage('Test') {
            steps {
                echo 'Abhi koi tests nahi hain — Phase 4-5 mein add karenge'
            }
        }

    }

    post {
        success {
            echo 'Pipeline SUCCESS! Sab theek hua.'
        }
        failure {
            echo 'Pipeline FAIL! Console output check karo.'
        }
    }
}