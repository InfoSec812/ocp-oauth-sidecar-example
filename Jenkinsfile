def ciProject = 'deven-ci-cd'
def testProject = 'deven-test'
def devProject = 'deven-dev'

pipeline {
  environment {
    PROJECT_NAME = 'ocp-oauth-sidecar-example'
    KUBERNETES_NAMESPACE = "${ciProject}"
  }
  agent {
    label 'jenkins-slave-npm'
  }
  stages {
    stage('Quality And Security') {
      parallel {
        stage('Dependency Check') {
          steps {
            sh 'npm config set cache /tmp'
            sh 'mkdir -p audit-reports'
            sh 'npm audit --json | /home/jenkins/.npm-global/bin/npm-audit-html -o audit-reports/npm-audit-report.html'
            publishHTML(target: [
              reportDir             : 'audit-reports',
              reportFiles           : 'npm-audit-report.html',
              reportName            : 'NPM Audit Report',
              keepAll               : true,
              alwaysLinkToLastBuild : true,
              allowMissing          : true
            ])
            sh '/home/jenkins/.npm-global/bin/npm-audit-ci-wrapper -t high --ignore-dev-dependencies'
          }
        }
        stage('Compile & Test') {
          steps {
            sh 'npm --cache /tmp/npm-cache --registry http://nexus:8081/repository/npm-group/ install'
            sh 'npm --cache /tmp/npm-cache run test:unit'
            sh 'npm --cache /tmp/npm-cache run build'
            publishHTML(target: [
              reportDir             : 'unit-test-reports',
              reportFiles           : 'index.html',
              reportName            : 'Jest Unit Test Report',
              keepAll               : true,
              alwaysLinkToLastBuild : true,
              allowMissing          : true
            ])
            publishHTML(target: [
              reportDir             : 'coverage/lcov-report',
              reportFiles           : 'index.html',
              reportName            : 'Jest Test Coverage Report',
              keepAll               : true,
              alwaysLinkToLastBuild : true,
              allowMissing          : true
            ])
          }
        }
      }
    }
    stage('Wait for SonarQube Quality Gate') {
      steps {
        script {
          withSonarQubeEnv('sonar') {
            sh 'unset JAVA_TOOL_OPTIONS; /home/jenkins/.npm-global/bin/sonar-scanner'
          }
          def qualitygate = waitForQualityGate()
          if (qualitygate.status != "OK") {
            error "Pipeline aborted due to quality gate failure: ${qualitygate.status}"
          }
        }
      }
    }
    stage('Build Image') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject(ciProject) {
              openshift.selector('bc', 'vue-app').startBuild("--from-dir=dist/", '--wait')
            }
          }
        }
      }
    }
    stage('Promote to TEST') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject(ciProject) {
              openshift.tag("oauth-test:latest", "${testProject}/oauth-test:latest")
            }
            openshift.withProject(testProject) {
              def testDeployment = openshift.process("./.openshift/templates/deploymentconfig.yml", "-p" "NAME=oauth-test", "-p", "CONTAINER_IMAGE=docker-registry.default.svc:5000/deven-test/oauth-test")
              openshift.apply(testDeployment)
            }
          }
        }
      }
    }
    stage('Promote to TEST') {
      input {
        message "Promote service to DEMO environment?"
        ok "PROMOTE"
      }
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject(ciProject) {
              openshift.tag("oauth-test:latest", "${testProject}/oauth-test:latest")
            }
            openshift.withProject(testProject) {
              def testDeployment = openshift.process("./.openshift/templates/deploymentconfig.yml", "-p" "NAME=oauth-test", "-p", "CONTAINER_IMAGE=docker-registry.default.svc:5000/deven-test/oauth-test")
              openshift.apply(testDeployment)
            }
          }
        }
      }
    }
  }
}