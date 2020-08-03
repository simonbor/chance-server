
-- =================================
-- Driver
-- =================================

create or replace function main.sp_GetDriver (	
	MobileNum varchar(20)
)
RETURNS SETOF main.Driver AS $$
    select * from main.Driver d where d.MobileNum = MobileNum;
$$ language sql;

create or replace function main.sp_InsertDriver (
	p_MobileNum varchar(20),
    p_Name varchar(100) = null,
	p_CarName varchar(50) = null,
	p_CarColor varchar(50) = null
) returns integer as $$
insert into main.Driver (Name, MobileNum, CarName, CarColor)
values (p_Name, p_MobileNum, p_CarName, p_CarColor);
select DriverId from main.Driver d where d.MobileNum = MobileNum;
$$ language sql;

-- =================================
-- Address
-- =================================
go
create or replace function main.sp_GetAddress (
	p_StreetName varchar(100),
	p_CityId int,
	p_Building int = null,
	p_CountryId int) returns void
as $$
begin
	declare v_StreetId int = null;begin

	-- todo: select @StreetId by OtherNames when by Name it has not been found
	 select top(1) StreetId from main.Street s where s.LocalName = p_StreetName;
	
	if v_StreetId is not null
	then
		select * from [main].Address a 
        where a.CountryId = p_CountryId and 
                a.cityid = p_CityId and 
                a.streetid = v_StreetId and 
                a.building = p_Building;
	end if;
return 0;

-- 1 check if street is exists
-- 2 if street isn’t exists insert new Street and with obtained StreetId insert Address
go
$$ language plpgsql;
create or replace function main.sp_InsertAddress (
    p_StreetName varchar(100),
	p_CityId int,
	p_CountryId int = 376,
	p_Building int = null,
	p_CreatedBy int = null) returns void
as $$
begin
	declare v_StreetId int = null;begin

	-- todo: select @StreetId by OtherNames when by StreetName has not been found
	 select top 1 StreetId from main.Street s where s.LocalName = p_StreetName;
	
	if v_StreetId is null
	then
		insert into main.Street (LocalName)
		values (p_StreetName);
    	v_StreetId := @@identity;
	end if;

	insert into main.Address (CountryId, CityId, StreetId, Building, CreatedBy)
	values (p_CountryId, p_CityId, v_StreetId, p_Building, p_CreatedBy);
	select @@identity as AddressId;
return 0;
$$ language plpgsql;

-- =================================
-- Location
-- =================================

create or replace function main.sp_GetLocationByAddress (
	p_AddressId int
) RETURNS SETOF main.Location AS $$
	select * from main.Location l where l.AddressId = p_AddressId limit 1;
$$ LANGUAGE SQL;

create or replace function main.sp_InsertLocation (
	p_Latitude double precision,
	p_Longitude double precision,
	p_Altitude double precision = null,
	p_AddressId int = null,
	p_Default boolean = false,
	p_Desc varchar(500) = null,
	p_CreatedBy int = null
) returns integer as $$
	insert into main.Location(Latitude, Longitude, Altitude, AddressId, DefLocation, Descr, CreatedBy)
	values (p_Latitude, p_Longitude, p_Altitude, p_AddressId, p_Default, p_Desc, p_CreatedBy);
	
	select LocationId from main.Location l where l.Latitude = p_Latitude and l.Longitude = p_Longitude
$$ language sql;

-- =================================
-- Chance
-- =================================
go
create or replace function main.sp_InsertChance (
	p_LocationId int = null,
	p_AddressId int = null,
	p_DateStart timestamp(3),
	p_DriverOut int,
	p_CreatedBy int = null) returns void
as $$
begin
begin
	insert into main.Chance (LocationId, AddressId, DateStart, DriverOut, CreatedBy)
	values (p_LocationId, p_AddressId, p_DateStart, p_DriverOut, p_CreatedBy);
	select @@identity as ChanceId;
return 0;

go
$$ language plpgsql;
create or replace function main.sp_GetChanceByCity (
	p_CityId int,
	p_Gap int = 10) returns void -- 10 minutes gap
as $$
begin
declare v_NowMinusGap timestamp(3) = (SELECT -@Gap * INTERVAL '1 mi' + getutcdate());
begin

	select * from main.Chance c where 
        c.AddressId in (select AddressId from main.Address a where a.CityId = p_CityId) and
        c.DateStart > v_NowMinusGap;
return 0;
$$ language plpgsql;
