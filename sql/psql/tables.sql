
drop table if exists main.Chance;
drop table if exists main.Location;
drop table if exists main.Address;
drop table if exists main.Street;
drop table if exists main.City;
drop table if exists main.Driver;

drop sequence if exists main.Driver_seq;
create sequence main.Driver_seq;
create table main.Driver (
	DriverId int not null default nextval ('main.Driver_seq') primary key,
	Name varchar(100) null,
	MobileNum varchar(20) not null,
	CarName varchar(50) null,
	CarColor varchar(50) null,
	Created timestamp(3) not null default(timezone('utc', now())),
	Updated timestamp(3) not null default(timezone('utc', now())),
	Deleted timestamp(3) null
);

-- for beginning only Tel-Aviv record is enough
create table main.City (
	CityId int not null primary key,
	Name varchar(100) not null,
	LocalName varchar(100) not null,
	Descr varchar(1000) null,
	Created timestamp(3) not null default(timezone('utc', now())),
	Updated timestamp(3) not null default(timezone('utc', now())),
	Deleted timestamp(3) null
);

-- https://maps.b144.co.il/רחובות/מפת-תל-אביב-יפו/
-- https://israel-streets.openalfa.com/tel-aviv-yafo/streetdir/a
drop sequence if exists main.Street_seq;
create sequence main.Street_seq;
create table main.Street (
	StreetId int not null default nextval ('main.Street_seq') primary key,
	Name varchar(100) null,														-- english correct name
	LocalName varchar(100) not null,											-- localized (hebrew) correct name
	OtherNames varchar(1500) null, 												-- array of other names
	Descr varchar(1000) null,
	Created timestamp(3) not null default(timezone('utc', now())),
	Updated timestamp(3) not null default(timezone('utc', now())),
	Deleted timestamp(3) null
);

drop sequence if exists main.Address_seq;
create sequence main.Address_seq;
create table main.Address (
	AddressId int not null default nextval ('main.Address_seq') primary key,
	Building int null unique,
	StreetId int not null references main.Street(StreetId) unique,
	CityId int not null references main.City(CityId) unique,
	CountryId int not null unique,												-- CountryIsoCode, The State of Israel - 376
	Descr varchar(1000) null,													-- optionally contains the first complete message
	Created timestamp(3) not null default(timezone('utc', now())),
	CreatedBy int null,
	Updated timestamp(3) not null default(timezone('utc', now())),
	Deleted timestamp(3) null
);

drop sequence if exists main.Location_seq;
create sequence main.Location_seq;
create table main.Location (
	LocationId int not null default nextval ('main.Location_seq') primary key,
	Longitude double precision not null,
	Latitude double precision not null,
	Altitude double precision null,
	AddressId int null references main.Address(AddressId),
	DefLocation boolean not null default false,
	Descr varchar(500) null,
	Created timestamp(3) not null default(timezone('utc', now())),
	CreatedBy int null,
	Updated timestamp(3) not null default(timezone('utc', now())),
	UpdatedBy int null,
	Deleted timestamp(3) null,
	DeletedBy int null
);

drop sequence if exists main.Chance_seq;
create sequence main.Chance_seq;
create table main.Chance (
	ChanceId int not null default nextval ('main.Chance_seq') primary key,
	LocationId int null references main.Location(LocationId),
    AddressId int null references main.Address(AddressId),
    DateStart timestamp(3) not null,
    DriversIn varchar(1000) null, 									-- array of customers id, BTW
    DriverOut int not null references main.Driver(DriverId),		-- out customer id
	Created timestamp(3) not null default(timezone('utc', now())),
	CreatedBy int null,
	Updated timestamp(3) not null default(timezone('utc', now())),
	UpdatedBy int null,
	Deleted timestamp(3) null,
	DeletedBy int null
);
