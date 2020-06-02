pipeline {
    agent none
    stages {
        
        stage('cypress parallel tests'){
            parallel {
                stage('tester A') {
                    agent {
                        
                        docker {
                            image 'cypress/browsers:node12.4.0-chrome76'
                            //label 'tester A'
                            args  '-u root:sudo'
                        }
                    }
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'npm install --save-dev cypress'
                        sh './node_modules/.bin/cypress run  --spec "cypress/integration/justlog.js" --env host=DevLab'
                    }
                }
                stage('tester B') {
                    agent {
                        
                        docker {
                            image 'cypress/browsers:node12.4.0-chrome76'
                            //label 'tester B'
                            args  '-u root:sudo'
                        }
                    }
                    steps {
                        sh 'npm install --save-dev cypress'
                        sh './node_modules/.bin/cypress run --spec "cypress/integration/kk.js" --env host=TestLab'
                    }
                }
            }
        }
    }
    post {
                always {
                    //junit 'results/cypress-report-*.xml'
                    //sh 'rm results/*'
                    echo 'Build finished'
                }

                success {
                    echo 'Build finished successfully'
                }
                failure {
                    emailext body: "<b>Project: ${env.JOB_NAME} </b><br>Build Number: ${env.BUILD_NUMBER} <br> URL of build: ${env.BUILD_URL}",
                            mimeType: 'text/html',
                            subject: "ERROR CI: Project name -> ${env.JOB_NAME}",
                            recipientProviders: [developers()]
                }
                unstable {
                    emailext body: "<b>Project: ${env.JOB_NAME} </b><br>Build Number: ${env.BUILD_NUMBER} <br> URL of build: ${env.BUILD_URL}",
                            mimeType: 'text/html',
                            subject: "Unstable Build: Project name -> ${env.JOB_NAME}",
                            recipientProviders: [developers()]
                }
                changed {
                    // This will run only if the state of the Pipeline has changed
                    //For example, if the Pipeline was previously failing but is now successful
                    emailext body: "<b>Project: ${env.JOB_NAME} </b><br>Build Number: ${env.BUILD_NUMBER} <br>URL of build: ${env.BUILD_URL} <br>Build result is: ${currentBuild.result}",
                            mimeType: 'text/html',
                            subject: "Build state has changed: Project name -> ${env.JOB_NAME}",
                            recipientProviders: [developers()]
                }
            }
}