SELECT
  *
FROM
  job_applications
ORDER BY
  pinned DESC NULLS LAST,
  date_applied DESC
LIMIT
  $1 OFFSET $2