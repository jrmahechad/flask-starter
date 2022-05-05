# flask-starter

Flask starter project

Creates web pages that will display on digital billboards.

This project is using AppEngine (python3), Firestore, and Cloud Functions.

| Folder                                                                      | Description                                         |
| :--------------------------------------------------------------------------- | :-------------------------------------------------- |
| appengine | The AppEngine project that displays a page. |
| firestore | Provides local firestore emulation (not deployed) |
| cloud-functions | Contains sample cloud functions |

## Development

If you have not setup your local service account you will need to do so (once):

```bash
gcloud auth application-default login
```

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

Run init tests

```bash
make run-tests
```

