INSERT INTO
  users (user_id, email, firstname, lastname, hashpass)
VALUES
  ($1, $2, $3, $4, $5) 
RETURNING *;