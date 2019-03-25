def ciProject = 'deven-ci-cd'
def testProject = 'deven-test'
def devProject = 'deven-demo'

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
        sh 'npm install'
        sh 'npm --cache /tmp/npm-cache run build'
      }
    }
    stage('Build Image') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject(ciProject) {
              def bc = null
              try {
                bc = openshift.newBuild("--name=oauth-test", "--binary=true", "--image-stream=openshift/nginx", "--to=oauth-test")
              } catch (Exception e) {
                bc = openshift.selector('bc', 'oauth-test')
              }
              bc.startBuild("--from-dir=dist/", '--wait')
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
              def testDeployment = openshift.process("-f", "./.openshift/templates/deploymentconfig.yml", "-p", "NAME=oauth-test")
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
              def demoDeployment = openshift.process("-f", "./.openshift/templates/deploymentconfig.yml", "-p", "NAME=oauth-test")
              openshift.apply(demoDeployment)
            }
          }
        }
      }
    }
  }
}