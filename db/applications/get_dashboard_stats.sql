SELECT
  COUNT(*) AS "Total Applications",
  SUM(
    CASE
      WHEN status = 'scheduled' THEN 1
      ELSE 0
    END
  ) AS "Interviews Scheduled",
  SUM(
    CASE
      WHEN status = 'offered' THEN 1
      ELSE 0
    END
  ) AS "Job Offers"
FROM
  job_applications
WHERE
  user_id = $1;