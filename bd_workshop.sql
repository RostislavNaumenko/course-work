DROP DATABASE IF EXISTS workshop;
CREATE DATABASE workshop CHARACTER SET utf8;
USE workshop;

drop table if exists users;
create table users(
id_user tinyint(3) not null primary key auto_increment,
user_name char(60) not null unique,
user_mail char(30) not null,
user_phone char(60) not null
) engine=InnoDB character set utf8;
drop table if exists category;
create table category(
cat_id tinyint(3) not null  primary key auto_increment,
cat_name char(60) not null
)ENGINE =InnoDB CHARACTER SET utf8;

drop table if exists product;
create table product(
id_product tinyint(3) not null primary key auto_increment,
cat_id tinyint not null,
name_product varchar(100) NOT NULL,
diameter_product double unsigned,
price_product decimal(7,2) NULL default '0.00',
amount_product int(6) NULL default '0',
FOREIGN KEY (cat_id) REFERENCES category(cat_id) ON DELETE CASCADE ON UPDATE CASCADE
)engine=InnoDB character set utf8;

drop table if exists services;
create table services(
id_serv tinyint(3)  not null primary key auto_increment,
name_serv varchar(100) NOT NULL,
price_serv decimal(7,2) NOT NULL
)engine=InnoDB character set utf8;

drop table if exists orders;
create table orders(
id_order tinyint(3) not null primary key auto_increment,
id_product tinyint NOT NULL,
count_ tinyint NOT NULL,
 FOREIGN KEY (id_serv) REFERENCES services(id_serv) ON DELETE CASCADE ON UPDATE CASCADE,
 FOREIGN KEY (id_product) REFERENCES product(id_product) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE =InnoDB CHARACTER SET utf8;

drop table if exists list_oreder;
create table list_order(
id_li tinyint(3) not null primary key auto_increment,
id_user tinyint not null,
id_order tinyint not null,
date_order datetime not null,
 FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
 FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE =InnoDB CHARACTER SET utf8;

drop table if exists special_order;
create table special_order(
id_sp_order tinyint(3) not null primary key auto_increment,
id_user tinyint(3) not null,
user_phone char,
date_sp_order datetime not null,
FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE =InnoDB CHARACTER SET utf8;

delimiter //
drop procedure if exists insertIntoUser;
 CREATE PROCEDURE insertIntoUser ( name_ char(45) , mail char(45), phone char(30))
       BEGIN
        IF ((select count(id_user) from users where user_name = name_  and user_mail = mail and user_phone = phone) = 0) THEN
        insert into users(user_name, user_mail, user_phone) values(name_,mail,phone);
        end if;
       
       END//

delimiter ;
call insertIntoUser("Stas","228@ui", "337");

delimiter //
drop procedure if exists insertIntoOrder;
 CREATE PROCEDURE insertIntoOrder (prod_id tinyint, prodcount tinyint)
       BEGIN
        insert into orders (id_product,count_) values(prod_id, prodcount);
       
       END//

delimiter ;
 call insertIntoOrder(1,5);
 delimiter //
drop procedure if exists insertIntoListOrder;
 CREATE PROCEDURE insertIntoListOrder (prod_id tinyint, prodcount tinyint,name_ char(45) , mail char(45), phone char(30), dateOredr datetime)
       BEGIN
        insert into list_order (id_user,id_order,date_order) values 
        ((select id_user from users where user_name = name_ and user_mail  = mail and user_phone = phone),
        (select  id_order  from orders where id_product = prod_id and count_ = prodcount order by id_order desc limit 1),
        dateOredr);
       
       END//
delimiter ;
call insertIntoListOrder();
select (select count(id_user) from users where user_name = 'p'  and user_mail = '22@' and user_phone = '33') = 0 ;
