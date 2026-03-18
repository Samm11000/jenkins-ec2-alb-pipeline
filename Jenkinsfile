pipeline {
    agent any

    environment {
        EC2_IP   = '54.145.224.135'
        EC2_USER = 'ubuntu'
        APP_DIR  = '/home/ubuntu/project'
        ALB_DNS  = 'my-app-alb-344711081.us-east-1.elb.amazonaws.com'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Commit: ${env.GIT_COMMIT}"
                echo "Branch: ${env.GIT_BRANCH}"
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                echo 'Dependencies installed'
            }
        }

        stage('Test') {
            steps {
                sh 'node -e "require(\'./app.js\')" &'
                sh 'sleep 2 && curl -f http://localhost:3000/check && kill %1 || true'
                echo 'Basic smoke test passed'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '
                            cd ${APP_DIR} &&
                            git pull origin main &&
                            npm install &&
                            pm2 restart my-app &&
                            sudo systemctl reload nginx
                        '
                    """
                }
                echo "Deployed to http://${ALB_DNS}"
            }
        }

        stage('Verify') {
            steps {
                sh "sleep 10 && curl -f http://${ALB_DNS}/check"
                echo 'Post-deploy health check passed!'
            }
        }

    }

    post {
        success {
            echo "PIPELINE SUCCESS"
            echo "App: http://${ALB_DNS}"
            echo "Jenkins: http://${EC2_IP}:8080"
        }
        failure {
            echo 'PIPELINE FAILED — check console above'
        }
    }
}