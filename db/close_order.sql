UPDATE orderstable
SET open = false
WHERE id = $1
RETURNING *;