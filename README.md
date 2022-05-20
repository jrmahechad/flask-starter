# flask-starter

This project is mean to be a starter for future projects.
It uses a Flask application deployed in AppEngine.
It can be used along with Firebase and Cloud Functions.

If you are going to update this project bare in mind this is a starter project. Only add update that can be used in this way. Please do not add project specify configuration.

Fork/download and modify as needed.

When forking from this project update `docker-compose.yaml` file container names with something related to your project.
Change `project_*` names as you see fit.

| Folder                       | Description                                       |
| :--------------------------- | :------------------------------------------------ |
| appengine                    | The AppEngine project that displays a page.       |
| firestore                    | Provides local firestore emulation (not deployed) |
| cloud-build                  | Provides yaml files for cloud build               |
| cloud-functions              | Contains sample cloud functions                   |
| cloud-functions/github_event | Contains sample cloud functions                   |

## Development

You will need to install gcloud-cli. [Follow the official documentation](https://cloud.google.com/sdk/docs/install-sdk).

If you have not setup your local service account you will need to do so (once):

```bash
gcloud auth application-default login
```

Install Docker following the [official documentation](https://www.docker.com/get-started/)

**Make sure to run Docker before the next step**

To setup the base images (once or when you change requirements):

```bash
docker-compose build
```

After that the code can be loaded at any time with:

```bash
docker-compose up
```

Init firebase data and load sample cloud function

```bash
make init
```

Run unit tests

```bash
make run-tests
```

If you add more functions with test please update the `Makefile` accordingly.

## How to add a new cloud function

Create you function folder inside `cloud-functions` folder.

Add the setup for your cloud function into the `docker-compose.yaml` following existing configuration.

You will need to run `docker-compose build` after this.

You can edit the `Makefile` to add triggers for you function if needed.
