LOTSOFDOTS SERVER WITH RELATIONAL DATABASE

This server has been developed to be used as the backend for LotsOfDots frontend.
This server uses a Postgre SQL database for data storage.


# TO START LOCAL POSTGRES DATABASE:
    docker run --rm --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres

# TO CREATE A DATABASE IN THE RUNNING DOCKER POSTGRES:
    First build with:
        npm run tsc
    Then use the created js-files:
        node build/src/database/createDatabase.js

# TO RUN TESTS (once database is up and running):
    Commands in Terminal to run tests:
    (Note: You need to setup the database before running tests, as described above).
        All tests:
            jest
        One file (like test.test.js):
            jest tests/test.test.ts

# TO RUN SERVER (once database is up and runnig):
    npm run dev


