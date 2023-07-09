USE restdb;

LOAD DATA LOCAL INFILE "/user.csv" INTO TABLE User 
        FIELDS TERMINATED BY "," 
        LINES TERMINATED by "\n" 
        (id, username, created_at)