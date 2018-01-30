SELECT ot.id, ot.userId, oi.knifeId, oi.quantity, kt.knife_name, kt.price, kt.img FROM orderstable AS ot
JOIN OrderItem AS oi ON oi.orderId = ot.id
JOIN KnifeTable AS kt ON oi.knifeId = kt.id
WHERE ot.id = $1