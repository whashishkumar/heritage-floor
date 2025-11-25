pipeline {
    agent any
    
    environment {
        DEPLOY_PATH = '/var/www/frontend1'
        CLIENT_PATH = '/var/www/frontend1/client'
        NODE_VERSION = '24.11.1'
        PM2_APP_NAME = 'heritage-floor-frontend'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                sh '''
                    cd ${DEPLOY_PATH}
                    git fetch origin
                    git reset --hard origin/main
                    git clean -fd
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh '''
                    cd ${CLIENT_PATH}
                    npm ci --legacy-peer-deps || npm install --legacy-peer-deps
                '''
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building Next.js application...'
                sh '''
                    cd ${CLIENT_PATH}
                    npm run build
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh '''
                    cd ${CLIENT_PATH}
                    # Install PM2 if not already installed
                    if ! command -v pm2 &> /dev/null; then
                        npm install -g pm2
                    fi
                    
                    # Check if app is already running
                    if pm2 list | grep -q "${PM2_APP_NAME}"; then
                        echo "Restarting existing PM2 app..."
                        pm2 restart ${PM2_APP_NAME}
                    else
                        echo "Starting new PM2 app..."
                        pm2 start npm --name "${PM2_APP_NAME}" -- start
                        pm2 save
                    fi
                    
                    # Show PM2 status
                    pm2 list
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                sh '''
                    sleep 5
                    pm2 list | grep "${PM2_APP_NAME}" || exit 1
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
            sh '''
                cd ${CLIENT_PATH}
                pm2 logs ${PM2_APP_NAME} --lines 50 || echo "No PM2 logs available"
            '''
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}

