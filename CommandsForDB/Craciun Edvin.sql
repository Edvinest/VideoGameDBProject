INSERT INTO Publisher (pName, pDevelopers) VALUES
('Edv Publishing', null);

select p.pName,listagg(d.dName, ', ') within group (order by d.dName) AS "Developer(s)"
from Publisher p
left join json_table(
       p.pDevelopers,
       '$[*]' columns (devID int path'$.devID')
) jt on 1 = 1
left join Developer d on jt.devID = d.dID
group by p.pName;

commit;

