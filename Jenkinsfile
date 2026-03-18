// pipeline {
//     agent any

//     stages {

//         stage('Checkout') {
//             steps {
//                 echo 'Code GitHub se aa gaya — Jenkins ne khud pull kiya'
//             }
//         }

//         stage('Build') {
//             steps {
//                 echo '=== Dependencies install ho rahi hain ==='
//                 sh 'npm install'
//                 echo '=== Build complete ==='
//             }
//         }

//         stage('Test') {
//             steps {
//                 echo 'Abhi koi tests nahi hain — Phase 4-5 mein add karenge'
//             }
//         }

//     }

//     post {
//         success {
//             echo 'Pipeline SUCCESS! Sab theek hua.'
//         }
//         failure {
//             echo 'Pipeline FAIL! Console output check karo.'
//         }
//     }
// }




pipeline {
    agent any

    environment {
        EC2_IP = '54.145.224.135'
        EC2_USER = 'ubuntu'
        APP_DIR = '/home/ubuntu/project'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Branch: ${env.GIT_BRANCH}"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                echo 'Build complete'
            }
        }

        stage('Test') {
            steps {
                echo 'No tests yet'
            }
        }

        stage('Deploy') {
            steps {
                echo '=== Deploying to EC2 ==='
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
                echo "=== Live at http://${EC2_IP} ==="
            }
        }

    }

    post {
        success {
            echo "SUCCESS! http://${EC2_IP}/check"
        }
        failure {
            echo 'FAILED! Check console output above.'
        }
    }
}