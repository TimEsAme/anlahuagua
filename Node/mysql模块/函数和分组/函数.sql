-- 数字函数
-- SELECT ABS(-10086);
-- SELECT CEIL(1.4)
-- SELECT FLOOR(1.2)
-- SELECT MOD(10,3)
-- SELECT PI()
-- SELECT RAND()
-- SELECT ROUND(3.141592657,3)
-- SELECT TRUNCATE(3.567321412312,3)
-- SELECT TRUNCATE(salary,2) AS '工资' FROM employee


-- 聚合函数
-- 查询员工工资平均数
-- SELECT AVG(salary) as avg 
-- FROM employee;
-- 查询员工数量
-- SELECT COUNT(id) FROM employee;

-- SELECT COUNT(id) AS '员工数量',
-- AVG(salary) AS '平均薪资',
-- SUM(salary) AS '总薪资',
-- MIN(salary) AS '最小薪资',
-- MAX(salary) AS '最高薪资'
-- FROM employee;


-- 字符函数
-- SELECT
--   CONCAT(`name`,salary) AS ash
-- FROM
--   employee;

-- SELECT
--   CONCAT_WS('-',`name`,salary) AS ash
-- FROM
--   employee;


-- 日期函数
-- SELECT CURRENT_DATE();
-- SELECT CURDATE();
-- SELECT CURTIME();
-- SELECT TIMESTAMPDIFF(HOUR,'2000-1-1 11:11:11','2026-1-1 11:11:11');
-- SELECT
--   *,
--   TIMESTAMPDIFF(
--     YEAR,
--     birthday,
--   CURDATE()) AS age 
-- FROM
--   employee 
-- ORDER BY
--   age ASC
  

-- 分组
-- 查询薪水在10k以上的员工分布居住地
-- 然后得到居住地员工数量大于30人的结果
-- SELECT location,COUNT(id) AS empnumber
-- FROM employee
-- WHERE salary>=10000
-- GROUP BY location
-- HAVING count(id)>=30;


-- 查询员工分布的居住地,以及每个居住地有多少员工
-- 方法1
-- SELECT
--   location,
-- CASE
--     
--     WHEN ismale = 1 THEN
--     '男' ELSE '女' 
--   END AS '性别',
--   COUNT( id ) AS '员工数量' 
-- FROM
--   employee 
-- GROUP BY
--   location,
--   ismale 
-- ORDER BY
--   location ASC,
--   ismale ASC

-- 方法2
-- SELECT
--   location,
--   SUM(CASE WHEN ismale = 1 THEN 1 ELSE 0 END) AS '男',
--   SUM(CASE WHEN ismale = 0 THEN 1 ELSE 0 END) AS '女',
--   COUNT( id ) AS '员工数量' 
-- FROM
--   employee 
-- GROUP BY
--   location
-- ORDER BY
--   location ASC;


-- 练习

-- 1
-- SELECT
--   d.id,
--   d.`name`,
--   COUNT( e.id ) 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- WHERE
--   c.id = 2 
-- GROUP BY
--   d.id

-- 2
-- SELECT
--   c.id,
--   c.`name`,
--   COUNT( e.id ) 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- GROUP BY
--   c.id,
--   c.`name`

-- 3
-- SELECT
--   COUNT( e.id ) 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- WHERE
--   TIMESTAMPDIFF(
--     YEAR,
--     e.joinDate,
--   CURDATE())<= 15 
--   AND e.ismale = 0 
--   AND e.location = '万家湾'


-- 4
-- SELECT
--   e.location,
--   COUNT(e.id) 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- WHERE
--   c.id = 2 
-- GROUP BY
--   e.location


-- 5
-- SELECT
--   c.id,
--   c.`name` 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- GROUP BY
--   c.id,
--   c.`name` 
-- HAVING
--   COUNT( e.id )>= 200


-- 6
-- SELECT
--   e.* 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- WHERE
--   c.`name` LIKE '%渡一%' 
--   AND e.salary > (
--   SELECT
--     AVG( e.salary ) 
--   FROM
--     employee AS e
--     INNER JOIN department AS d ON e.deptId = d.id
--     INNER JOIN company AS c ON d.companyId = c.id 
--   WHERE
--   c.`name` LIKE '%渡一%'
--   )


-- 7
-- SELECT
--   CHAR_LENGTH( e.`name` ) AS name_length,
--   COUNT( e.id ) AS employee_count 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- WHERE
--   c.`name` LIKE '%渡一%' 
-- GROUP BY
--   CHAR_LENGTH(
--   e.`name`)


-- 8
-- SELECT
--   c.`name`,
--   SUM( e.salary ) 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON d.companyId = c.id 
-- GROUP BY
--   c.`name`,
--   c.id 
-- ORDER BY
--   SUM( e.salary ) 