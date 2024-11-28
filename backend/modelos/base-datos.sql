
CREATE SCHEMA IF NOT EXISTS `libreria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `libreria` ;

-- -----------------------------------------------------
-- Table `libreria`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`empleados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `cargo` VARCHAR(100) NULL DEFAULT NULL,
  `salario` DECIMAL(10,2) NULL DEFAULT NULL,
  `fecha_contratacion` DATE NULL DEFAULT NULL,
  `activo` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `direccion` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`alquileres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`alquileres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `empleado_id` INT NULL DEFAULT NULL,
  `cliente_id` INT NULL DEFAULT NULL,
  `fecha_alquiler` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_devolucion` DATETIME NULL DEFAULT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `empleado_id` (`empleado_id` ASC) VISIBLE,
  INDEX `cliente_id` (`cliente_id` ASC) VISIBLE,
  CONSTRAINT `alquileres_ibfk_1`
    FOREIGN KEY (`empleado_id`)
    REFERENCES `libreria`.`empleados` (`id`),
  CONSTRAINT `alquileres_ibfk_2`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `libreria`.`clientes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`autores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`autores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`generos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`generos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`editoriales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`editoriales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`libros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(200) NOT NULL,
  `isbn` VARCHAR(20) NULL DEFAULT NULL,
  `genero_id` INT NULL DEFAULT NULL,
  `autor_id` INT NULL DEFAULT NULL,
  `editorial_id` INT NULL DEFAULT NULL,
  `año` INT NULL DEFAULT NULL,
  `precio_venta` DECIMAL(10,2) NOT NULL,
  `precio_alquiler` DECIMAL(10,2) NOT NULL,
  `activo` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `isbn` (`isbn` ASC) VISIBLE,
  INDEX `genero_id` (`genero_id` ASC) VISIBLE,
  INDEX `autor_id` (`autor_id` ASC) VISIBLE,
  INDEX `editorial_id` (`editorial_id` ASC) VISIBLE,
  CONSTRAINT `libros_ibfk_1`
    FOREIGN KEY (`genero_id`)
    REFERENCES `libreria`.`generos` (`id`),
  CONSTRAINT `libros_ibfk_2`
    FOREIGN KEY (`autor_id`)
    REFERENCES `libreria`.`autores` (`id`),
  CONSTRAINT `libros_ibfk_3`
    FOREIGN KEY (`editorial_id`)
    REFERENCES `libreria`.`editoriales` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`detalles_alquileres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`detalles_alquileres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alquiler_id` INT NULL DEFAULT NULL,
  `libro_id` INT NULL DEFAULT NULL,
  `precio_alquiler` DECIMAL(10,2) NOT NULL,
  `duracion_dias` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `alquiler_id` (`alquiler_id` ASC) VISIBLE,
  INDEX `libro_id` (`libro_id` ASC) VISIBLE,
  CONSTRAINT `detalles_alquileres_ibfk_1`
    FOREIGN KEY (`alquiler_id`)
    REFERENCES `libreria`.`alquileres` (`id`),
  CONSTRAINT `detalles_alquileres_ibfk_2`
    FOREIGN KEY (`libro_id`)
    REFERENCES `libreria`.`libros` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `empleado_id` INT NULL DEFAULT NULL,
  `cliente_id` INT NULL DEFAULT NULL,
  `fecha_venta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `empleado_id` (`empleado_id` ASC) VISIBLE,
  INDEX `cliente_id` (`cliente_id` ASC) VISIBLE,
  CONSTRAINT `ventas_ibfk_1`
    FOREIGN KEY (`empleado_id`)
    REFERENCES `libreria`.`empleados` (`id`),
  CONSTRAINT `ventas_ibfk_2`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `libreria`.`clientes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`detalles_ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`detalles_ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `venta_id` INT NULL DEFAULT NULL,
  `libro_id` INT NULL DEFAULT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `venta_id` (`venta_id` ASC) VISIBLE,
  INDEX `libro_id` (`libro_id` ASC) VISIBLE,
  CONSTRAINT `detalles_ventas_ibfk_1`
    FOREIGN KEY (`venta_id`)
    REFERENCES `libreria`.`ventas` (`id`),
  CONSTRAINT `detalles_ventas_ibfk_2`
    FOREIGN KEY (`libro_id`)
    REFERENCES `libreria`.`libros` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`inventario_libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`inventario_libros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `libro_id` INT NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT '0',
  `fecha_actualizacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `libro_id` (`libro_id` ASC) VISIBLE,
  CONSTRAINT `inventario_libros_ibfk_1`
    FOREIGN KEY (`libro_id`)
    REFERENCES `libreria`.`libros` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`movimientos_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`movimientos_inventario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `libro_id` INT NULL DEFAULT NULL,
  `tipo_movimiento` ENUM('entrada', 'venta', 'alquiler') NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `libro_id` (`libro_id` ASC) VISIBLE,
  CONSTRAINT `movimientos_inventario_ibfk_1`
    FOREIGN KEY (`libro_id`)
    REFERENCES `libreria`.`libros` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `direccion` VARCHAR(200) NULL DEFAULT NULL,
  `fecha_registro` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`reposiciones_proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`reposiciones_proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proveedor_id` INT NOT NULL,
  `libro_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `fecha_reposicion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `costos_compra` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  INDEX `libro_id` (`libro_id` ASC) VISIBLE,
  CONSTRAINT `reposiciones_proveedores_ibfk_1`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `libreria`.`proveedores` (`id`),
  CONSTRAINT `reposiciones_proveedores_ibfk_2`
    FOREIGN KEY (`libro_id`)
    REFERENCES `libreria`.`libros` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libreria`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreria`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('administrador', 'empleado') NULL DEFAULT 'empleado',
  `empleado_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  INDEX `empleado_id` (`empleado_id` ASC) VISIBLE,
  CONSTRAINT `usuarios_ibfk_1`
    FOREIGN KEY (`empleado_id`)
    REFERENCES `libreria`.`empleados` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `libreria` ;

-- -----------------------------------------------------
-- procedure AgregarEmpleado
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarEmpleado`(
	IN i_nombre VARCHAR(150),
    IN i_cargo VARCHAR(100),
    IN i_salario DECIMAL(10,2),
    IN i_fecha_contratacion DATE,
    IN i_username VARCHAR(50),
    IN i_password VARCHAR(255),
    IN i_rol ENUM('administrador', 'empleado'))
BEGIN
	
    DECLARE v_empleado_id INT;

    -- Verificar que el username no exista en la tabla usuarios
    IF EXISTS (SELECT 1 FROM usuarios WHERE username = i_username) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'El nombre de usuario ya existe.';
    END IF;

    -- Insertar el nuevo empleado
    INSERT INTO empleados (nombre, cargo, salario, fecha_contratacion)
    VALUES (i_nombre, i_cargo, i_salario, i_fecha_contratacion);

    -- Obtener el ID del empleado recién creado
    SET v_empleado_id = LAST_INSERT_ID();

    -- Insertar en la tabla usuarios
    INSERT INTO usuarios (username, password, rol, empleado_id)
    VALUES (i_username, i_password, i_rol, v_empleado_id);
    
    SELECT i_username AS username, i_cargo AS cargo;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure AgregarLibroNuevo
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarLibroNuevo`(
    IN i_titulo VARCHAR(200),
    IN i_isbn VARCHAR(20),
    IN i_genero_nombre VARCHAR(100),
    IN i_autor_nombre VARCHAR(150),
    IN i_editorial_nombre VARCHAR(150),
    IN i_año INT,
    IN i_stock_inicial INT,
    IN i_precio_venta DECIMAL(10,2),
    IN i_precio_alquiler DECIMAL(10,2)
)
BEGIN
    DECLARE v_genero_id INT;
    DECLARE v_autor_id INT;
    DECLARE v_editorial_id INT;

    -- Verificar si el género existe, si no, crearlo
    SELECT id INTO v_genero_id
    FROM generos
    WHERE nombre = i_genero_nombre
    LIMIT 1;

    IF v_genero_id IS NULL THEN
        INSERT INTO generos (nombre)
        VALUES (i_genero_nombre);
        SET v_genero_id = LAST_INSERT_ID();
    END IF;

    -- Verificar si el autor existe, si no, crearlo
    SELECT id INTO v_autor_id
    FROM autores
    WHERE nombre = i_autor_nombre
    LIMIT 1;

    IF v_autor_id IS NULL THEN
        INSERT INTO autores (nombre)
        VALUES (i_autor_nombre);
        SET v_autor_id = LAST_INSERT_ID();
    END IF;

    -- Verificar si la editorial existe, si no, crearla
    SELECT id INTO v_editorial_id
    FROM editoriales
    WHERE nombre = i_editorial_nombre
    LIMIT 1;

    IF v_editorial_id IS NULL THEN
        INSERT INTO editoriales (nombre)
        VALUES (i_editorial_nombre);
        SET v_editorial_id = LAST_INSERT_ID();
    END IF;

    -- Insertar el libro en la tabla libros
    INSERT INTO libros (
        titulo,
        isbn,
        genero_id, 
        autor_id, 
        editorial_id, 
        año, 
        precio_venta, 
        precio_alquiler
    ) VALUES (
        i_titulo, 
        i_isbn,
        v_genero_id, 
        v_autor_id, 
        v_editorial_id, 
        i_año,  
        i_precio_venta, 
        i_precio_alquiler
    );

    -- Obtener el ID del libro recién insertado
    SET @nuevo_libro_id = LAST_INSERT_ID();

    -- Inicializar el stock en la tabla inventario_libros
    INSERT INTO inventario_libros (
        libro_id, 
        cantidad, 
        fecha_actualizacion
    ) VALUES (
        @nuevo_libro_id, 
        i_stock_inicial, 
        NOW()
    );

    -- Registrar el movimiento de inventario
    INSERT INTO movimientos_inventario (
        libro_id, 
        tipo_movimiento, 
        cantidad, 
        fecha
    ) VALUES (
        @nuevo_libro_id, 
        'entrada', 
        i_stock_inicial, 
        NOW()
    );
    
    SELECT i_titulo AS nombre;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure AgregarProveedor
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarProveedor`(
IN i_nombre VARCHAR(150),
IN i_telefono VARCHAR(20),
IN i_email VARCHAR(100),
IN i_direccion VARCHAR(200)
)
BEGIN
INSERT INTO proveedores(nombre, telefono, email, direccion)
VALUES (i_nombre, i_telefono, i_email, i_direccion);

SELECT id AS proveedor_id,
 i_nombre AS nombre,
 i_telefono AS telefono,
 i_email AS correo,
 i_direccion AS direccion
 FROM proveedores
 WHERE id = last_insert_id();
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure AgregarStock
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarStock`(
    IN i_libro_id INT,
    IN i_proveedor_id INT,
    IN i_cantidad INT,
    IN i_costo_compra DECIMAL(10,2)
)
BEGIN
    DECLARE v_stock_actual INT;
    DECLARE v_nombre_libro VARCHAR(255);
    DECLARE v_stock_actualizado INT;

    -- Manejar valores NULL en los parámetros opcionales
    IF i_proveedor_id IS NULL THEN
        SET i_proveedor_id = NULL;
    END IF;

    IF i_costo_compra IS NULL THEN
        SET i_costo_compra = NULL;
    END IF;

	SELECT il.cantidad, l.titulo
    INTO v_stock_actual, v_nombre_libro
    FROM inventario_libros il
    JOIN libros l ON il.libro_id = l.id
    WHERE libro_id = i_libro_id;

    -- Validar que el libro exista en el inventario
    IF v_stock_actual IS NULL THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'El libro especificado no existe en el inventario.';
    END IF;

    -- Actualizar el stock en la tabla inventario_libros
    UPDATE inventario_libros
    SET cantidad = cantidad + i_cantidad,
        fecha_actualizacion = NOW()
    WHERE libro_id = i_libro_id;
    
    SELECT cantidad INTO v_stock_actualizado
    FROM inventario_libros
    WHERE libro_id = i_libro_id;

    -- Registrar el movimiento de reposición en movimientos_inventario
    INSERT INTO movimientos_inventario (libro_id, tipo_movimiento, cantidad, fecha)
    VALUES (i_libro_id, 'entrada', i_cantidad, NOW());

    -- Si el proveedor es especificado, registrar en reposicion_proveedor
    IF i_proveedor_id IS NOT NULL THEN
        -- Validar que el proveedor exista
        IF NOT EXISTS (SELECT 1 FROM proveedores WHERE id = i_proveedor_id) THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'El proveedor especificado no existe.';
        END IF;

        -- Registrar la reposición en la tabla reposicion_proveedor
        INSERT INTO reposiciones_proveedores (proveedor_id, libro_id, cantidad, fecha_reposicion, costos_compra)
        VALUES (i_proveedor_id, i_libro_id, i_cantidad, NOW(), i_costo_compra);
    END IF;
    SELECT v_nombre_libro AS nombre_libro, v_stock_actualizado AS stock_actualizado;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure EditarLibro
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarLibro`(
    IN i_libro_id INT,
    IN i_titulo VARCHAR(200),
    IN i_genero_nombre VARCHAR(100),
    IN i_autor_nombre VARCHAR(150),
    IN i_editorial_nombre VARCHAR(150),
    IN i_año INT,
    IN i_precio_venta DECIMAL(10,2),
    IN i_precio_alquiler DECIMAL(10,2)
)
BEGIN
    DECLARE v_genero_id INT;
    DECLARE v_autor_id INT;
    DECLARE v_editorial_id INT;

    -- Verificar si el libro existe
    IF NOT EXISTS (SELECT 1 FROM libros WHERE id = i_libro_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El libro especificado no existe.';
    END IF;

    -- Verificar si el género existe, si no, crearlo
    IF i_genero_nombre IS NOT NULL AND i_genero_nombre <> '' THEN
        SELECT id INTO v_genero_id
        FROM generos
        WHERE nombre = i_genero_nombre
        LIMIT 1;

        IF v_genero_id IS NULL THEN
            INSERT INTO generos (nombre)
            VALUES (i_genero_nombre);
            SET v_genero_id = LAST_INSERT_ID();
        END IF;
    ELSE
        SET v_genero_id = NULL;
    END IF;

    -- Verificar si el autor existe, si no, crearlo
    IF i_autor_nombre IS NOT NULL AND i_autor_nombre <> '' THEN
        SELECT id INTO v_autor_id
        FROM autores
        WHERE nombre = i_autor_nombre
        LIMIT 1;

        IF v_autor_id IS NULL THEN
            INSERT INTO autores (nombre)
            VALUES (i_autor_nombre);
            SET v_autor_id = LAST_INSERT_ID();
        END IF;
    ELSE
        SET v_autor_id = NULL;
    END IF;

    -- Verificar si la editorial existe, si no, crearla
    IF i_editorial_nombre IS NOT NULL AND i_editorial_nombre <> '' THEN
        SELECT id INTO v_editorial_id
        FROM editoriales
        WHERE nombre = i_editorial_nombre
        LIMIT 1;

        IF v_editorial_id IS NULL THEN
            INSERT INTO editoriales (nombre)
            VALUES (i_editorial_nombre);
            SET v_editorial_id = LAST_INSERT_ID();
        END IF;
    ELSE
        SET v_editorial_id = NULL;
    END IF;

    -- Actualizar los detalles del libro en la tabla libros
    UPDATE libros
    SET 
        titulo = IF(i_titulo IS NOT NULL AND i_titulo <> '', i_titulo, titulo), 
        genero_id = IF(v_genero_id IS NOT NULL, v_genero_id, genero_id),
        autor_id = IF(v_autor_id IS NOT NULL, v_autor_id, autor_id),
        editorial_id = IF(v_editorial_id IS NOT NULL, v_editorial_id, editorial_id),
        año = IF(i_año IS NOT NULL AND i_año <> '', i_año, año),
        precio_venta = IF(i_precio_venta IS NOT NULL AND i_precio_venta <> '', i_precio_venta, precio_venta),
        precio_alquiler = IF(i_precio_alquiler IS NOT NULL AND i_precio_alquiler <> '', i_precio_alquiler, precio_alquiler)
    WHERE id = i_libro_id;

    -- Obtener los detalles del libro actualizado
    SELECT 
        titulo AS nombre, 
        año, 
        precio_venta, 
        precio_alquiler 
    FROM libros 
    WHERE id = i_libro_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure VerificarStockDisponible
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerificarStockDisponible`()
BEGIN
    SELECT 
        l.id AS libro_id, 
        l.titulo, 
        il.cantidad AS stock
    FROM libros l
    INNER JOIN inventario_libros il ON l.id = il.libro_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure agregarCliente
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarCliente`(
IN i_nombre VARCHAR(250),
IN i_email VARCHAR(250),
IN i_telefono VARCHAR(250),
IN i_direccion VARCHAR(250)
)
BEGIN
INSERT INTO clientes(nombre, email, telefono, direccion)
VALUES (i_nombre, i_email, i_telefono, i_direccion);

SELECT i_nombre AS nombre, i_telefono AS telefono,i_email AS correo,i_direccion AS direccion;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure all
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `all`()
BEGIN
SELECT l.id,
l.titulo,
l.isbn,
g.nombre AS genero,
a.nombre AS autor,
e.nombre AS editorial,
l.año,
l.precio_venta,
l.precio_alquiler
FROM libros l
INNER JOIN autores a ON l.autor_id = a.id
INNER JOIN generos g ON l.genero_id = g.id
INNER JOIN editoriales e ON l.editorial_id = e.id
WHERE activo = 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure borrarDB
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `borrarDB`()
BEGIN
DECLARE hecho INT DEFAULT FALSE;
DECLARE nombre_tabla VARCHAR(255);
DECLARE cur CURSOR FOR
	SELECT TABLE_NAME
	FROM INFORMATION_SCHEMA.TABLES
	WHERE TABLE_SCHEMA = DATABASE();
    
DECLARE CONTINUE HANDLER FOR NOT FOUND SET hecho = TRUE;

    
SET FOREIGN_KEY_CHECKS = 0;

OPEN cur;

leer_tablas: LOOP
	FETCH cur INTO nombre_tabla;
	IF hecho THEN
		LEAVE leer_tablas;
	END IF;

	SET @sql = CONCAT('TRUNCATE TABLE ', nombre_tabla);
	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
    END LOOP;

CLOSE cur;

SET FOREIGN_KEY_CHECKS = 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure busquedaAvanzada
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `busquedaAvanzada`(
    IN i_titulo VARCHAR(200),
    IN i_autor_nombre VARCHAR(150),
    IN i_isbn VARCHAR(20)
)
BEGIN
    SELECT 
        l.id AS libro_id,
        l.titulo,
        l.isbn,
        l.año,
        l.precio_venta,
        l.precio_alquiler,
        a.nombre AS autor,
        g.nombre AS genero,
        e.nombre AS editorial
    FROM libros l
    INNER JOIN autores a ON l.autor_id = a.id
    INNER JOIN generos g ON l.genero_id = g.id
    INNER JOIN editoriales e ON l.editorial_id = e.id
    WHERE 
        (i_titulo IS NULL OR l.titulo LIKE CONCAT('%', i_titulo, '%')) AND
        (i_autor_nombre IS NULL OR a.nombre LIKE CONCAT('%', i_autor_nombre, '%')) AND
        (i_isbn IS NULL OR l.isbn LIKE CONCAT('%', i_isbn, '%'));
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure calcularGananciasDiarias
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcularGananciasDiarias`(IN fecha DATE)
BEGIN
    SELECT SUM(dv.cantidad * (dv.precio_unitario - l.precio_alquiler)) AS ganancias
    FROM detalles_ventas dv
    INNER JOIN libros l ON dv.libro_id = l.id
    INNER JOIN ventas v ON dv.venta_id = v.id
    WHERE DATE(v.fecha_venta) = fecha;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure calcularVentasDiarias
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcularVentasDiarias`(IN fecha DATE)
BEGIN
    SELECT SUM(total) AS total_ventas
    FROM ventas
    WHERE DATE(fecha_venta) = fecha;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure deshabilitarEmpleado
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deshabilitarEmpleado`(
IN i_empleado_id INT
)
BEGIN
	UPDATE empleados
    SET activo = 0
    WHERE id = i_empleado_id;
    
    SELECT nombre FROM empleados WHERE id = i_empleado_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure deshabilitarLibro
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deshabilitarLibro`(
IN i_libro_id INT
)
BEGIN
	UPDATE libros
    SET activo = 0
    WHERE id = i_libro_id;
    
    SELECT titulo FROM libros WHERE id = i_libro_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure empleadoPorId
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `empleadoPorId`(IN i_empleado_id INT)
BEGIN
  SELECT e.id, e.nombre, e.cargo, e.salario, e.fecha_contratacion, u.username, u.rol
   FROM empleados e 
   INNER JOIN usuarios u ON e.id = u.empleado_id
   WHERE e.id = i_empleado_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure generarReporteVentas
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `generarReporteVentas`(IN fecha_inicio DATE, IN fecha_fin DATE)
BEGIN
    SELECT l.id, l.titulo, SUM(dv.cantidad) AS cantidad_vendida, SUM(dv.cantidad * dv.precio_unitario) AS total_ventas
    FROM detalles_ventas dv
    INNER JOIN libros l ON dv.libro_id = l.id
    INNER JOIN ventas v ON dv.venta_id = v.id
    WHERE v.fecha_venta BETWEEN fecha_inicio AND fecha_fin
    GROUP BY l.id, l.titulo;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure habilitarEmpleado
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `habilitarEmpleado`(
IN i_empleado_id INT
)
BEGIN
	UPDATE empleados
    SET activo = 1
    WHERE id = i_empleado_id;
    
    SELECT nombre FROM empleados WHERE id = i_empleado_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure habilitarLibro
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `habilitarLibro`(
IN i_libro_id INT
)
BEGIN
	UPDATE libros
    SET activo = 1
    WHERE id = i_libro_id;
    
    SELECT titulo FROM libros WHERE id = i_libro_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure historialAlquileresLibro
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `historialAlquileresLibro`(
    IN i_libro_id INT
)
BEGIN
    SELECT 
        a.id AS alquiler_id,
        c.nombre AS cliente,
        a.fecha_alquiler,
        a.fecha_devolucion,
        da.duracion_dias,
        da.precio_alquiler
    FROM detalles_alquileres da
    INNER JOIN alquileres a ON da.alquiler_id = a.id
    INNER JOIN clientes c ON a.cliente_id = c.id
    WHERE da.libro_id = i_libro_id
    ORDER BY a.fecha_alquiler DESC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure librosActivos
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `librosActivos`()
BEGIN
SELECT l.id,
l.titulo,
l.isbn,
g.nombre AS genero,
a.nombre AS autor,
e.nombre AS editorial,
l.año,
l.precio_venta,
l.precio_alquiler
FROM libros l
INNER JOIN autores a ON l.autor_id = a.id
INNER JOIN generos g ON l.genero_id = g.id
INNER JOIN editoriales e ON l.editorial_id = e.id
WHERE activo = 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure librosConStockBajo
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `librosConStockBajo`(IN minimo_stock INT)
BEGIN
   SELECT 
        l.id AS libro_id, 
        l.titulo, 
        il.cantidad AS stock
    FROM libros l
    INNER JOIN inventario_libros il ON l.id = il.libro_id
    WHERE il.cantidad < nivel_minimo;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtenerLibrosMasAlquilado
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerLibrosMasAlquilado`()
BEGIN
    SELECT 
    l.titulo AS libro, 
    COUNT(da.libro_id) AS total_alquileres
FROM 
    detalles_alquileres da
INNER JOIN 
    libros l ON da.libro_id = l.id
GROUP BY 
    da.libro_id
ORDER BY 
    total_alquileres DESC
LIMIT 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtenerLibrosMasVendidos
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerLibrosMasVendidos`(IN fecha_inicio DATE, IN fecha_fin DATE)
BEGIN
    SELECT l.id, l.titulo, SUM(dv.cantidad) AS total_vendido
    FROM detalles_ventas dv
    INNER JOIN libros l ON dv.libro_id = l.id
    INNER JOIN ventas v ON dv.venta_id = v.id
    WHERE v.fecha_venta BETWEEN fecha_inicio AND fecha_fin
    GROUP BY l.id, l.titulo
    ORDER BY total_vendido DESC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure registrarAlquiler
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrarAlquiler`(
    IN i_empleado_id INT,
    IN i_cliente_id INT,
    IN i_libro_id INT,
    IN i_duracion_dias INT,
    IN i_cantidad INT
)
BEGIN
    DECLARE v_precio_alquiler DECIMAL(10,2);
    DECLARE v_stock_actual INT;
    DECLARE v_total DECIMAL(10,2);
	DECLARE v_fecha_devolucion DATETIME;
    
    -- Validar que el libro exista y obtener precio de alquiler
    SELECT precio_alquiler INTO v_precio_alquiler
    FROM libros
    WHERE id = i_libro_id;

    -- Validar stock actual
    SELECT cantidad INTO v_stock_actual
    FROM inventario_libros
    WHERE libro_id = i_libro_id;

    -- Verificar si hay suficiente stock disponible
    IF v_stock_actual < i_cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'NO HAY STOCK DISPONIBLE';
    END IF;

    -- Calcular el total del alquiler
    SET v_total = v_precio_alquiler * i_cantidad * i_duracion_dias;
	SET v_fecha_devolucion = NOW() + INTERVAL i_duracion_dias DAY;
   
   -- Registrar el alquiler
    INSERT INTO alquileres (empleado_id, cliente_id, fecha_alquiler,fecha_devolucion, total)
    VALUES (i_empleado_id, i_cliente_id, NOW(),v_fecha_devolucion, v_total);

    -- Obtener el ID del alquiler recién insertado
    SET @id_alquiler = LAST_INSERT_ID();

    -- Registrar los detalles del alquiler
    INSERT INTO detalles_alquileres (alquiler_id, libro_id, precio_alquiler, duracion_dias, cantidad)
    VALUES (@id_alquiler, i_libro_id, v_precio_alquiler, i_duracion_dias, i_cantidad);

    -- Registrar el movimiento de inventario
    INSERT INTO movimientos_inventario (libro_id, tipo_movimiento, cantidad, fecha)
    VALUES (i_libro_id, 'alquiler', i_cantidad, NOW());

    -- Actualizar el stock del inventario
    UPDATE inventario_libros
    SET cantidad = v_stock_actual - i_cantidad, fecha_actualizacion = NOW()
    WHERE libro_id = i_libro_id;

    -- Devolver información del alquiler y sus detalles
    SELECT 
        @id_alquiler AS id_alquiler,
        i_cliente_id AS cliente_id,
        i_libro_id AS libro_id,
        i_cantidad AS cantidad_alquilada,
        i_duracion_dias AS duracion_dias,
        v_fecha_devolucion AS devolucion,
        v_precio_alquiler AS precio_unitario,
        v_total AS total,
        NOW() AS fecha_alquiler;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure registrarVentas
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrarVentas`(
    IN i_empleado_id INT,
    IN i_cliente_id INT,
    IN i_libro_id INT,
    IN i_cantidad INT
    )
BEGIN 
	DECLARE v_total DECIMAL (10,2);
    DECLARE v_precio_unitario DECIMAL(10,2);
    DECLARE v_stock_actual INT;
    
    SELECT precio_venta INTO v_precio_unitario FROM libros WHERE id = i_libro_id;
    
    SELECT cantidad INTO v_stock_actual FROM inventario_libros WHERE libro_id = i_libro_id;
    
    IF v_stock_actual < i_cantidad THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT= 'NO HAY STOCK DISPONIBLE';
    END IF;
    
    SET v_total = i_cantidad * v_precio_unitario;
    
	INSERT INTO ventas (empleado_id, cliente_id, total)
    VALUES (i_empleado_id, i_cliente_id, v_total);
    SET @id_venta = LAST_INSERT_ID();
    
    INSERT INTO detalles_ventas (venta_id, libro_id, cantidad, precio_unitario)
    VALUES (@id_venta, i_libro_id, i_cantidad, v_precio_unitario);
    
    INSERT INTO movimientos_inventario (libro_id, tipo_movimiento, cantidad, fecha)
    VALUES (i_libro_id, 'venta', i_cantidad, NOW());
    
    UPDATE inventario_libros SET cantidad = v_stock_actual - i_cantidad,fecha_actualizacion = NOW()
    WHERE libro_id = i_libro_id;
    
    SELECT 
        v.id AS venta_id,
        v.fecha_venta,
        v.total AS total_venta,
        dv.libro_id,
        l.titulo AS titulo_libro,
        dv.cantidad,
        dv.precio_unitario
    FROM ventas v
    JOIN detalles_ventas dv ON v.id = dv.venta_id
    JOIN libros l ON dv.libro_id = l.id
    WHERE v.id = @id_venta;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure verEmpleadosActivos
-- -----------------------------------------------------

DELIMITER $$
USE `libreria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `verEmpleadosActivos`()
BEGIN
   SELECT e.id, e.nombre, e.cargo, e.salario, e.fecha_contratacion, u.username, u.rol
   FROM empleados e 
   INNER JOIN usuarios u ON e.id = u.empleado_id
   WHERE activo = 1;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
