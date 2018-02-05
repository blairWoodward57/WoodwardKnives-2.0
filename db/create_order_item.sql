INSERT INTO orderitem
(orderId, knifeId)
VALUES ($1, $2)
RETURNING *;