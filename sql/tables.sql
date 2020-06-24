use Parking

go
drop table if exists main.Street
drop table if exists main.City
drop table if exists main.Address
drop table if exists main.Location
drop table if exists main.Chance
drop table if exists main.Driver

go
create table main.Driver (
	DriverId int not null identity(1, 1) primary key,
	[Name] nvarchar(100) null,
	MobileNum varchar(20) not null,
	CarName nvarchar(50) null,
	CarColor nvarchar(50) null
)

-- for beginning only Tel-Aviv record is enough
go
create table main.City (
	CityId int not null primary key,
	[Name] varchar(100) not null,
	LocalName nvarchar(100) not null,
	[Desc] nvarchar(1000) null
)

-- https://maps.b144.co.il/רחובות/מפת-תל-אביב-יפו/
-- https://israel-streets.openalfa.com/tel-aviv-yafo/streetdir/a
go
create table main.Street (
	StreetId int not null identity(1, 1) primary key,
	[Name] varchar(100) null,			-- english correct name
	LocalName nvarchar(100) not null,		-- localized (hebrew) correct name
	OtherNames nvarchar(1500) null, 		-- array of other names
	[Desc] nvarchar(1000) null
)

create table main.Address (
	AddressId int not null identity(1, 1) primary key,
	Building int null,
	StreetId int not null,
	CityId int not null,
	CountryId int not null 		-- CountryIsoCode, The State of Israel - 376

	foreign key (StreetId) references main.Street(StreetId),
	foreign key (CityId) references main.City(CityId),

	unique (CountryId, CityId, StreetId, Building)
)

create table main.Location (
	LocationId int not null identity(1,1) primary key,
	Longitude float not null,
    Latitude float not null,
    AddressId int null,
    [Desc] nvarchar(500) null

    foreign key (AddressId) references main.Address(AddressId)
)
create table main.Chance (
	ChanceId int not null identity(1, 1) primary key,
	LocationId int null,
    AddressId int null,
    DateStart datetime not null,
    DriversIn varchar(1000) null, 	-- array of customers id, BTW
    DriversOut int not null		-- out customer id

    foreign key (LocationId) references main.Location(LocationId),
    foreign key (AddressId) references main.Address(AddressId),
    foreign key (DriversOut) references main.Driver(DriverId)
)
