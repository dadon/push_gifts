const shell = require("shelljs");

const sh = command => shell.exec(command);

const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;

if (!GCLOUD_PROJECT) {
    throw "Error. GCLOUD_PROJECT environment variable must be set.";
}

const IMAGE_NAME = `gcr.io/${GCLOUD_PROJECT}/push-gifts-frontend`;


const version = sh("git rev-parse HEAD")["stdout"].replace("\n", "");
const image = `${IMAGE_NAME}:${version}`;

console.log(`Start to deploy ${image}`);

let response = sh("gcloud config get-value project");
if (response["stdout"].replace("\n", "") !== GCLOUD_PROJECT) {
    throw `Error. Invalid gcloud project, should be ${GCLOUD_PROJECT}`;
}

// build frontend
sh("rm -rf dist/");
sh("VUE_APP_API=https://api-dev.push.gifts VUE_APP_SITE=https://pushgifts.avallon.im npm run build");

// build image
sh(`docker build -t ${image} .`);
sh(`docker push ${image}`);

// insert new image address to deployment config
sh(`sed "s,IMAGE_URL,${image},g" deploy/deployment.template.yaml > deploy/deployment.yaml`);

// deploy
sh("kubectl apply -f deploy/deployment.yaml");
sh(`rm deploy/deployment.yaml`);

// clear cache
sh("gcloud compute url-maps invalidate-cdn-cache --path='/' k8s-um-default-push-gifts-frontend-ingress--d57c9c4b89ad0186");
