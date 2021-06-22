# React-Flask App Template/Boilerplate

Boilerplate application for a Flask and a React Front-End with Material UI.

### Create DB

```sh
$ export DATABASE_URL="postgresql://username:password@localhost/testdb"

or

$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/testdb"

or

$ export DATABASE_URL="sqlite:///test.db"
```

(More about connection strings in this [flask config guide](http://flask-sqlalchemy.pocoo.org/2.1/config/).)

### Install Back-End Requirements

```sh
$ pip install -r requirements.txt
```

### Install Front-End Requirements

```sh
$ cd static
$ npm install
```

### Build Front-End App

```sh
$ cd static
$ npm run build
```

### Run Back-End

```sh
$ python manage.py run
```

### Run Front-End

```sh
$ cd static
$ npm start
```

If all goes well, you should see `* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)` followed by a few more lines in the terminal.

open your browser to http://localhost:3000/
enjoy! By this point, you should be able to CRUD Todo tasks.

### Note: 
you do not need to run "python manage.py db init" or "python manage.py db migrate" or "python manage.py db upgrade".
