SELECT
  *
FROM
  job_applications
where
  user_id = $1
ORDER BY
  date_applied DESC
limit
  5;