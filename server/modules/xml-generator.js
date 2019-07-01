const xmlBuilder = require('xmlbuilder');

function generateXML(currentAPIS){
    
    /**
     * First we create a Transaction element...it's long
     ***************** TRANSACTION *******************
     */

    let emergencyContact = {
        LastName: 'Dog',
        FirstName: 'Gulash',
        MiddleName: 'The',
        TelephoneNbr: '867-5309',
        EmailAddr: 'gubu@gmail.com',
    }

    let itinerary = {
        InboundItinerary: {
            InboundDepartureLocation: {
                AirportCode: 'inbound airport',
                City: 'city',
                CountryCode: 'USA',
            },
            LocalDepartureDate: '2019-08-17',
            LocalDepartureTime: '16:20',
            InboundCompleteItinerary: {
                ForeignAirport1: 'MSP',
                ForeignAirport2: 'MSP',
                ForeignAirport3: 'MSP',
                ForeignAirport4: 'MSP',
                ForeignAirport5: 'MSP',
            },
            InboundArrivalLocation: {
                AirportCode: 'MSP',
                City: 'Minneapolis',
                State: 'Minnesota',
                PlaceDescription: 'Not too bad'
            },
            LocalArrivalDate: '2019-08-17',
            LocalArrivalTime: '17:20'
        }
    }

    let aircraft = {
        AircraftDetail: {
            TailNumber: 'nbp420',
            TypeAircraft: 'Cessna',
            Color: 'blue',
            CallSign: 'SAW420',
            CBPDecalNumber: '4598clo'
        },
        OperatorDetail: {
            PersonOperator: {
                LastName: 'Menzel',
                FirstName: 'Stefen',
                MiddleName: 'Adam',
            },
            OperatorContact: {
                StreetAddr: '123 fake st.',
                City: 'Minneapolis',
                StateProvince: 'Minnesota',
                ZipPostal: '55678',
                Country: 'USA',
                TelephoneNbr: '8675309',
                EmailAddr: 'fakemail@aol.com'
            }
        },
        OwnerDetail: {
            PersonOwnerOrLessee: {
                LastName: 'Dykoski',
                FirstName: 'Rhea',
                MiddleName: 'Marie',
            },
            OwnerOrLesseeContact: {
                StreetAddr: '123 Fake St.',
                City: 'Minneapolis',
                StateProvice: 'Minnesota',
                ZipPostal: '45678',
                Country: 'USA',
                TelephoneNbr: '8675309',
                EmailAddr: 'anotherfakemail@gmail.com'
            }
        }
    }

    let transaction = {        
        FlightType: 'GA',
        SchemaVersion: '2.2',
        SenderId: 'avFinity',
        DateAssembled: 'Pickup date from computer at send',
        TimeAssembled: 'Pickup time from computer at send',
        EmergencyContact: emergencyContact,
        Itinerary: itinerary,
        Aircraft: aircraft        
    }    

    /**
     * ************** TRANSACTION ENDS HERE ***************
     */

    /**
     * ***************** This will be our Flight Manifest *************
     */

     //I'm writing this to make one example crew...it will need to have the ability to make
     //multiple crew members and passengers.

    let crew = {
        CrewDocument1: {
            DocCode: 'P',
            DocumentNbr: '9098676',
            ExpiryDate: '2024-04-20',
            CntryCode: 'USA'
        },
        CrewDocument2: {
            DocCode: 'L',
            DocumentNbr: '0982097',
            ExpiryDate: '2024-03-30',
            CntryCode: 'USA'
        },
        SurName: 'Menzel',
        FirstName: 'Stefen',
        SecondName: 'Adam',
        Birthdate: '1987-02-19',
        Sex: 'M',
        ResidenceCntry: 'USA',
        CitizenshipCntry: 'USA',
        PermanentAddress: {
            StreetAddr: '1234 Faker St.',
            City: 'Minneapolis',
            StateProvince: 'Minnesota',
            ZipPostal: '44567',
            Country: 'USA'
        },
        AddressWhileInUs: {
            StreetAddr: '1234 Faker St.',
            City: 'Minneapolis',
            State: 'Minnesota',
            ZipPostal: '55678'
        },
        TravelerType: 'CREW'
    }

    let pax = {
        PaxDocument1: {
            DocCode: 'P',
            DocumentNbr: '9098676',
            ExpiryDate: '2024-04-20',
            CntryCode: 'USA'
        },
        PaxDocument2: {
            DocCode: 'M',
            DocumentNbr: '0982097',
            ExpiryDate: '2024-03-30',
            CntryCode: 'USA'
        },
        SurName: 'Menzel',
        FirstName: 'Stefen',
        SecondName: 'Adam',
        Birthdate: '1987-02-19',
        Sex: 'M',
        ResidenceCntry: 'USA',
        CitizenshipCntry: 'USA',
        AddressWhileInUs: {
            StreetAddr: '1234 Faker St.',
            City: 'Minneapolis',
            State: 'Minnesota',
            ZipPostal: '55678'
        },
    }

     let flightManifest = {        
        Crew: crew,
        Pax: pax,
     }     

     function getCrew() {
         //for each crew in currentApis, make a crew, add it to flightmanifest obj
     }

     /**
      * ************** Flight Manifest Section ends here ********************
      */

    let Manifest = {
        Manifest:{
            Transaction: transaction,
            FlightManifest: flightManifest,
        }        
    }


    let xmlApis = xmlBuilder.create(Manifest);
    let xmlStr = xmlApis.end();
    // console.log("we here in the generator", xmlApis);
    return xmlStr;
}

module.exports = generateXML;