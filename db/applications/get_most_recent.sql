SELECT
  *
FROM
  job_applications
where
  user_id = $1
limit
  5
ORDER BY
  date_applied DESC;