# Slcsp

Made with Node.js, React, Postgres, Sequelize

My answer is slcspSolution.csv

This code is built linearly. Order of execution of components is: 

        Home.js => GetZipData.js => GetSilverPlans.js => FillInSlcsp.js

To run:

1.  $ npm install
        
        (make sure postgres is open, then run -)
2.  $ createdb slcsp

3.  $ npm run start-dev
        (builds webpack, syncs database, starts server)

4.  ** open new terminal window and execute - 

5.  $ psql slcsp
        (opens psql command line for querying on our DB slcsp)
        then run these querys to populate our DB from our .csv files:

6.  =# \COPY slcsps (zipcode, rate) FROM './slcsp.csv' DELIMITER ',' CSV HEADER;
7.  =# \COPY plans FROM './plans.csv' DELIMITER ',' CSV HEADER;
8.  =# \COPY zips (zipcode, state, county_code, name, rate_area) FROM './zips.csv' DELIMITER ','CSV HEADER;

9.  ** navigate to localhost:8080 in your browser
        (triggers AJAX requests to update slcsp table with rates. Once slcsp data seeded run...)

10. =# \COPY (SELECT zipcode, rate FROM slcsps ORDER BY id) TO './slcsp.csv' DELIMITER ',' CSV HEADER;
        
11. Open ./slcsp.csv!

