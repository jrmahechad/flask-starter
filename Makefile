staging := TBD-staging
prod := TBD-prod

trigger-cloud-function-init-firebase:
	curl http://localhost:8090/

trigger-cloud-function-sample:
	curl http://localhost:8092/

deploy-app-engine:
	gcloud app deploy appengine/app.yaml --project=${staging}

deploy-cf-init:
	gcloud functions deploy init-firebase \
		--entry-point=hook \
		--runtime=python39 \
		--source=./cloud-functions/init-firebase \
		--memory 4GB \
		--timeout 540s \
		--project=${staging} \
		--trigger-http

deploy-cf-test:
	gcloud functions deploy test \
		--entry-point=hook \
		--runtime=python39 \
		--source=./cloud-functions/test \
		--memory 4GB \
		--timeout 540s \
		--project=${staging} \
		--trigger-http

prod-deploy-app-engine:
	gcloud app deploy appengine/app.yaml --project=${prod}

prod-deploy-cf-init:
	gcloud functions deploy init-firebase \
		--entry-point=hook \
		--runtime=python39 \
		--source=./cloud-functions/init-firebase \
		--memory 4GB \
		--timeout 540s \
		--project=${prod} \
		--trigger-http

prod-deploy-cf-waze-api:
	gcloud functions deploy sample \
		--entry-point=hook \
		--runtime=python39 \
		--source=./cloud-function/sample \
		--memory 4GB \
		--timeout 540s \
		--project=${prod} \
		--trigger-http

run-tests:
	make test-cf-sample

test-cf-sample:
	docker exec -it cf-sample sh -c "python -m unittest discover -s tests -v"

init:
	make trigger-cloud-function-init-firebase
