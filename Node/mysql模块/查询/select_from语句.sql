-- SELECT
--   id,
--   loginid,
--   loginpwd,
--   'abc' AS '安拉花瓜' 
-- FROM
--   `user`;


-- SELECT
--   ismale 'gender' 
-- FROM
--   employee;


-- SELECT
--   *,
--   'abc' 
-- FROM
--   employee;


-- SELECT
--   id,
--   `name`,
--   CASE 
-- 	WHEN ismale=1 THEN '男'
-- 	ELSE '女'
--   END gender,
--   CASE
--   WHEN salary>=10000 THEN '高收入' 
--   WHEN salary>=5000 THEN '中等收入' 
--   ELSE '低收入' 
--   END `levl`,
--   salary
-- FROM
--   employee;


-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE ismale=1;


-- SELECT
--   * 
-- FROM
--   department
-- WHERE
--   companyid IN ( 1, 2 );


-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE location is NULL;


-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE location is NOT NULL;


-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   salary >= 10000;


-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   salary BETWEEN 10000 
--   AND 12000;


-- 前后都可以有字
-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   `name` LIKE '%袁%';


-- 匹配两个字,袁开头
-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   `name` LIKE '袁_';


-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   `name` LIKE '张%' 
--   AND ismale = 0 
--   AND salary >= 10000;


-- and会被看做成一个整体
-- 该语句会查询姓张的女性工资在15k以上 或者 生日在1996年1月1号之后的
-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   `name` LIKE '张%' 
--   AND ismale = 0 
--   AND salary >= 15000 
--   OR birthday >= '1996-1-1';


-- -- 升序
-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   ismale = 0 
--   AND salary >= 15000 
-- ORDER BY
--   salary ASC;
-- -- 降序
--   SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   ismale = 0 
--   AND salary >= 15000 
-- ORDER BY
--   salary DESC;


-- -- 从employee找所有员工,ismale为1是男否则为女加到新的sex列中
-- -- 查询条件为生日在2000.1.1之后的,并且工资在15k以上
-- -- 然后先按性别升序排,再按工资降序排列
-- SELECT
--   *,
-- CASE
--     ismale 
--     WHEN 1 THEN
--     '男' ELSE '女' 
--   END AS sex 
-- FROM
--   employee 
-- WHERE
--   birthday > '2000-1-1' 
--   AND salary >= 10000 
-- ORDER BY
--   sex ASC,
--   salary DESC;


-- SELECT
--   * 
-- FROM
--   employee 
--   LIMIT 2,3


-- SELECT
--   * 
-- FROM
--   `user` 
-- WHERE
--   loginid = 'admin' 
--   AND loginpwd = 123456


-- -- 分页查询公式
-- -- (pagenum-1)*pagesize,pagesize
-- SELECT
--   * 
-- FROM
--   employee 
-- ORDER BY
--   joinDate DESC 
--   LIMIT 10,
--   10


-- -- 查询工资最高的女员工
-- SELECT
--   * 
-- FROM
--   employee 
-- WHERE
--   ismale = 0 
-- ORDER BY
--   salary DESC 
--   LIMIT 0,1



-- SELECT
-- DISTINCT
--   location 
-- FROM
--   employee 
-- ORDER BY
--   location




-- 连表查询
-- SELECT
--   * 
-- FROM
--   department AS d
--   LEFT JOIN employee AS e ON d.id = e.deptId; 


-- SELECT
--   * 
-- FROM
--   employee AS e
--   RIGHT JOIN department AS d ON d.id = e.deptId; 


-- SELECT
--   d.`name` AS dname,
--   e.`name` AS ename ,
--   c.`name` AS cname
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON c.id = d.companyId


-- SELECT
--   e.`name`,
-- CASE
--     e.ismale 
--     WHEN 1 THEN
--     '男' ELSE '女' 
--   END AS sex,
--   e.joinDate AS '入职时间',
--   e.salary AS '薪水',
--   d.`name` AS '所属部门',
--   c.`name` AS '所属公司' 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON c.id = d.companyId


-- SELECT
--   e.`name`,
-- CASE
    
--     WHEN e.ismale = 1 THEN
--     '男' ELSE '女' 
--   END AS sex,
--   e.joinDate,
--   d.`name` AS depname,
--   c.`name` AS comname 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON c.id = d.companyId 
-- WHERE
--   c.id IN ( 1, 3 );



-- SELECT
--   e.`name`,
-- CASE
    
--     WHEN e.ismale = 1 THEN
--     '男' ELSE '女' 
--   END AS sex,
--   e.joinDate,
--   d.`name` AS depname,
--   c.`name` AS comname 
-- FROM
--   employee AS e
--   INNER JOIN department AS d ON e.deptId = d.id
--   INNER JOIN company AS c ON c.id = d.companyId 
-- WHERE
--   c.id = 2 
--   AND d.id = 8;


-- SELECT
-- DISTINCT
--   e.location 
-- FROM
--   employee AS e;