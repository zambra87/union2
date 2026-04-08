# Installation

This project use [docker-compose](https://docs.docker.com/compose/) to run the PostgreSQL database.

To run the database, you need to install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).

Then, you can run the database with the following command:

    docker-compose up -d

If you want to access the db by using command line, you can run the following command:

    docker-compose exec db psql -U postgres
