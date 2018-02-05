SELECT ot.id, ot.open, oi.knifeId, kt.knife_name, kt.price, kt.img, ku.firstname, ku.lastname, ku.address_1, ku.address_2, ku.address_3, ku.address_4 FROM orderstable AS ot
JOIN OrderItem AS oi ON oi.orderId = ot.id
JOIN KnifeTable AS kt ON oi.knifeId = kt.id
JOIN KnifeUsers AS ku ON ot.userid = ku.id
ORDER BY id DESC
-- WHERE ot.id = $1