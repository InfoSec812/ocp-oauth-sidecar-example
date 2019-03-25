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
    stage('Compile & Test') {
      steps {
        sh 'npm --cache /tmp/npm-cache run build'
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
              def testDeployment = openshift.process("./.openshift/templates/deploymentconfig.yml", "-p", "NAME=oauth-test", "-p", "CONTAINER_IMAGE=docker-registry.default.svc:5000/deven-test/oauth-test")
              openshift.apply(testDeployment)
            }
          }
        }
      }
    }
    stage('Promote to DEMO') {
      input {
        message "Promote service to DEMO environment?"
        ok "PROMOTE"
      }
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject(ciProject) {
              openshift.tag("oauth-test:latest", "${devProject}/oauth-test:latest")
            }
            openshift.withProject(devProject) {
              def testDeployment = openshift.process("./.openshift/templates/deploymentconfig.yml", "-p", "NAME=oauth-test", "-p", "CONTAINER_IMAGE=docker-registry.default.svc:5000/deven-test/oauth-test")
              openshift.apply(testDeployment)
            }
          }
        }
      }
    }
  }
}