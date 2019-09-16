SELECT
  *
FROM
  job_applications
where
  user_id = $1;