UPDATE
  job_applications
SET
  pinned = $2
WHERE
  id = $1 RETURNING *;