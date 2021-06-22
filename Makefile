.PHONY: build flask react

default: flask

build: # installs the dependencies based on the requirements file & build react app
	@pip install -r requirements.txt
	cd static
	@npm install
	@npm run build

flask: # runs the flask app
	@echo "starting the flask application ..."
	@python manage.py run

react: # runs the react app
	@echo "starting the react application ..."
	cd static
	@npm start
