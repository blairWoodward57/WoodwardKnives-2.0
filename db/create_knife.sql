INSERT INTO knifeTable
(knife_name, description, blade_length, overall_length, blade_thickness, price, handle_material, steel_type, img)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9);
-- RETURNING *;

select * from knifeTable;