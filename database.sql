--DATABASE NAME "aeropaladin"

--user table
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE NOT NULL,
    "firstName" VARCHAR (20),
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (70),
    "phoneNumber" VARCHAR(25)
);

--Document Table
CREATE TABLE "Document" (
    "id" SERIAL PRIMARY KEY,
    "DocCode" VARCHAR(3),
    "DocumentNbr" VARCHAR(20),
    "ExpiryDate" DATE,
    "CntryCode" VARCHAR(3)
);

--Address Table
CREATE TABLE "Address" (
     "id" SERIAL PRIMARY KEY,
     "StreetAddr" VARCHAR(35),
     "City" VARCHAR (35),
     "State" VARCHAR (2),
     "PostalCode" VARCHAR(9) 
);

--Airport Table
CREATE TABLE "Airport" (
    "id" SERIAL PRIMARY KEY,
    "AirportCode" VARCHAR(6),
    "City" VARCHAR(30),
    "CntryCode" VARCHAR(3),
    "State" VARCHAR(2),
    "Description" VARCHAR(75) 
);


--People table
CREATE TABLE "People" (
    "id" SERIAL PRIMARY KEY,
    "LastName" VARCHAR (25)  NOT NULL,
    "FirstName" VARCHAR (20) NOT NULL,
    "MiddleName" VARCHAR (20),
    "BirthDate" DATE,
    "Sex" VARCHAR (1),
    "ResidenceCntry" VARCHAR(3),
    "citizenshipCntry" VARCHAR(3),
    "EmailAddr" VARCHAR(70),
    "TelephoneNbr" VARCHAR(25),
    "peopleType" INTEGER,
    "User_id" INT REFERENCES "User",
    "PermanentAddress_id" INT REFERENCES "Address",
    "AddressWhileInUS_id" INT REFERENCES "Address"
);

--EmergencyContacts Table
CREATE TABLE "EmergencyContacts" (
    "id" SERIAL PRIMARY KEY,
    "LastName" VARCHAR (25)  NOT NULL,
    "FirstName" VARCHAR (20) NOT NULL,
    "MiddleName" VARCHAR (20),
    "TelephoneNbr" VARCHAR(25),
    "EmailAddr" VARCHAR(70) 
);

--Aircraft Table
CREATE TABLE "Aircraft" (
    "id" SERIAL PRIMARY KEY,
    "TailNumber" VARCHAR(8),
    "TypeAircraft" VARCHAR(30),
    "Color" VARCHAR(30),
    "CallSign" VARCHAR(30),
    "CBPDecalNbr" VARCHAR(8),
    "Owner_id" INT REFERENCES "People" 
);

--Itinerary Table
CREATE TABLE "Itinerary" (
   "id" SERIAL PRIMARY KEY,
   "Departure_Airport_id" INT REFERENCES "Airport",
   "LocalDepartureTimeStamp" TIMESTAMP,
   "InboundArrivalLocation_Airport_id" INT REFERENCES "Airport",
   "LocalArrivalTimestamp" TIMESTAMP
);


--Flight Table
CREATE TABLE "Flight" (
    "id" SERIAL PRIMARY KEY,
    "EmergencyContact_id" INT REFERENCES "EmergencyContacts",
    "Itinerary_id" INT REFERENCES "Itinerary",
    "Aircraft_id" INT REFERENCES "Aircraft",
    "Operator_id" INT REFERENCES "People",
    "Owner_id" INT REFERENCES "People"
);

--User_Itinerary Junction Table
CREATE TABLE "User_Itinerary" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "User",
    "Itinerary_id" INT REFERENCES "Itinerary"
);   

--Flight_People Junction Table
CREATE TABLE "Flight_People" (
    "id" SERIAL PRIMARY KEY,
    "Flight_id" INT REFERENCES "Flight",
    "People_id" INT REFERENCES "People"
    
);
   

--People_EmergencyContacts JUNCTION Table
CREATE TABLE "People_EmergencyContacts" (
     "id" SERIAL PRIMARY KEY,
     "People_id" INT REFERENCES "People",
     "EmergencyContact_id" INT REFERENCES "EmergencyContacts"
);

--People_Document JUNCTION Table
CREATE TABLE "People_Document" (
    "id" SERIAL PRIMARY KEY,
    "People_id" INT REFERENCES "People",
    "Document_id" INT REFERENCES "Document"
);
