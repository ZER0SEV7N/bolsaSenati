use bolsasenati;

delimiter //
create procedure sp_guardar_progreso_operacion(
    in p_idAprendiz int,
    in p_idOperacion int,
    in p_estado enum('no realizado', 'pendiente', 'realizado')
)
begin
    insert into progreso_operacion (idAprendiz, idOperacion, estado)
    values (p_idAprendiz, p_idOperacion, p_estado)
    on duplicate key update 
        estado = p_estado,
        update_at = current_timestamp;
    select 'OK' as status, 'Progreso actualizado con éxito' as message;
end;
//

-- call sp_guardar_progreso_operacion()