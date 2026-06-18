pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    triggers {
        cron('H H * * 1')
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
        BASE_URL = 'http://127.0.0.1:5173'
        SELENIUM_HEADLESS = 'true'
        CYPRESS_BASE_URL = 'http://127.0.0.1:5173'
        API_BASE_URL = 'http://127.0.0.1:8000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Start Zenpay App') {
            steps {
                sh '''
                    set -e
                    nohup npm run dev --prefix backend > backend.log 2>&1 &
                    echo $! > backend.pid
                    nohup npm run dev --prefix frontend -- --host 127.0.0.1 --port 5173 > frontend.log 2>&1 &
                    echo $! > frontend.pid

                    for i in $(seq 1 60); do
                      if curl -sSf http://127.0.0.1:5173 >/dev/null && curl -s http://127.0.0.1:8000 >/dev/null; then
                        exit 0
                      fi
                      sleep 2
                    done
                    echo 'Zenpay app did not become ready in time' >&2
                    exit 1
                '''
            }
        }

        stage('Selenium Tests') {
            steps {
                dir('selenium-tests') {
                    sh 'mvn test'
                }
            }
        }

        stage('Cypress Tests') {
            steps {
                dir('frontend') {
                    sh 'npx cypress run --browser chrome --headless'
                }
            }
        }

        stage('JMeter Tests') {
            steps {
                dir('jmeter-tests') {
                    sh '''
                        if ! command -v jmeter >/dev/null 2>&1; then
                          echo 'JMeter is not installed on this Jenkins agent.' >&2
                          exit 1
                        fi

                        jmeter -n -t auth-login-signup.jmx \
                            -l results.jtl \
                            -Jprotocol=http \
                            -Jhost=127.0.0.1 \
                            -Jport=8000
                    '''
                }
            }
        }
    }

    post {
        always {
            testng testResults: 'selenium-tests/target/surefire-reports/testng-results.xml'
            junit allowEmptyResults: true, testResults: 'selenium-tests/target/surefire-reports/*.xml'
            archiveArtifacts artifacts: 'jmeter-tests/results.jtl, backend.log, frontend.log', allowEmptyArchive: true
            archiveArtifacts artifacts: 'frontend/cypress/screenshots/**', allowEmptyArchive: true

            sh '''
                if [ -f backend.pid ]; then kill $(cat backend.pid) || true; fi
                if [ -f frontend.pid ]; then kill $(cat frontend.pid) || true; fi
            '''
        }
    }
}
