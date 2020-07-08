use Parking

go
drop procedure if exists main.sp_GetAddress;
drop procedure if exists main.sp_GetChanceByCity;
drop procedure if exists main.sp_GetLocationByAddress;
drop procedure if exists main.sp_InsertAddress;
drop procedure if exists main.sp_InsertChance;
drop procedure if exists main.sp_InsertDriver;
drop procedure if exists main.sp_InsertLocation;
drop procedure if exists main.sp_GetDriver;

-- =================================
-- Driver
-- =================================
go
create procedure [main].[sp_GetDriver]
	@MobileNum varchar(20)
as
    select * from main.Driver d where d.MobileNum = @MobileNum
return 0

go
create procedure main.sp_InsertDriver
    @Name nvarchar(100) = null,
	@MobileNum varchar(20)
as
	insert into main.Driver ([Name], MobileNum)
	values (@Name, @MobileNum)
	select @@identity as DriverId
return 0

-- =================================
-- Address
-- =================================
go
create procedure main.sp_GetAddress
	@StreetName nvarchar(100),
	@CityId int,
	@Building int = null,
	@CountryId int
as
	declare @StreetId int = null
	-- todo: select @StreetId by OtherNames when by Name it has not been found
	set @StreetId = (select top(1) StreetId from main.Street s where s.LocalName = @StreetName)
	
	if @StreetId is not null
	begin
		select * from [main].[Address] a 
        where a.CountryId = @CountryId and 
                a.cityid = @cityid and 
                a.streetid = @streetid and 
                a.building = @building
	end
return 0

-- 1 check if street is exists
-- 2 if street isn’t exists insert new Street and with obtained StreetId insert Address
go
create procedure main.sp_InsertAddress
    @StreetName nvarchar(100),
	@CityId int,
	@CountryId int = 376,
	@Building int = null,
	@CreatedBy int = null
as
	declare @StreetId int = null
	-- todo: select @StreetId by OtherNames when by StreetName has not been found
	set @StreetId = (select top 1 StreetId from main.Street s where s.LocalName = @StreetName)
	
	if @StreetId is null
	begin
		insert into main.Street (LocalName)
		values (@StreetName)
    	set @StreetId = @@identity
	end

	insert into main.Address (CountryId, CityId, StreetId, Building, CreatedBy)
	values (@CountryId, @CityId, @StreetId, @Building, @CreatedBy)
	select @@identity as AddressId
return 0

-- =================================
-- Location
-- =================================
go
create procedure main.sp_GetLocationByAddress
	@AddressId int
as
	select top(1) * from main.Location l where l.AddressId = @AddressId
return 0

go
create procedure main.sp_InsertLocation
	@Latitude float,
	@Longitude float,
	@Altitude float = null,
	@AddressId int = null,
	@Default bit = 0,
	@Desc nvarchar(500) = null,
	@CreatedBy int = null
as
	insert into main.Location(Latitude, Longitude, Altitude, AddressId, [Default], [Desc], CreatedBy)
	values (@Latitude, @Longitude, @Altitude, @AddressId, @Default, @Desc, @CreatedBy)

	select @@identity as LocationId
return 0

-- =================================
-- Chance
-- =================================
go
create procedure main.sp_InsertChance
	@LocationId int = null,
	@AddressId int = null,
	@DateStart datetime,
	@DriverOut int,
	@CreatedBy int = null
as
	insert into main.Chance (LocationId, AddressId, DateStart, DriverOut, CreatedBy)
	values (@LocationId, @AddressId, @DateStart, @DriverOut, @CreatedBy)
	select @@identity as ChanceId
return 0

go
create procedure main.sp_GetChanceByCity
	@CityId int,
	@Gap int = 10 -- 10 minutes gap
as
declare @NowMinusGap datetime = (SELECT DATEADD(mi, -@Gap, getutcdate()))
	select * from main.Chance c where 
        c.AddressId in (select AddressId from main.Address a where a.CityId = @CityId) and
        c.DateStart > @NowMinusGap
return 0
