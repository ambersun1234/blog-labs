USE restdb;

LOAD DATA INFILE "/user.csv" INTO TABLE User 
        FIELDS TERMINATED BY "," 
        LINES TERMINATED by "\n" 
        (id, username, created_at);

LOAD DATA INFILE "/post.csv" INTO TABLE Post 
        FIELDS TERMINATED BY "," 
        LINES TERMINATED by "\n" 
        (id, postname, created_at);
