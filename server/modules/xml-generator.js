const xmlBuilder = require('xmlbuilder');

function generateXML(currentAPIS){
    console.log('currentApis from xml generator:', currentAPIS);
    let itinerary = currentAPIS.itinerary;
    let crew = currentAPIS.crew;
    let paxArray = currentAPIS.pax;
    /**
     * First we create a Transaction element...it's long
     ***************** TRANSACTION *******************
     */

    let emergencyContact = {
        LastName: crew.emergencycontactlastname,
        FirstName: crew.emergencycontactfirstname,
        MiddleName: (crew.emergencycontactmiddlename != null ? crew.emergencycontactmiddlename : ''),
        TelephoneNbr: crew.emergencycontactphonenbr,
        EmailAddr: crew.emergencycontactemail,
    }

    let itinerary = {
        InboundItinerary: {
            InboundDepartureLocation: {
                AirportCode: itinerary.departureairportcode,
                City: itinerary.departureairportcity,
                State: '',//itinerary.departureairportstate
                CountryCode: itinerary.departurecountrycode,
                PlaceDescription: itinerary.departureairportdesc
            },
            LocalDepartureDate: Date.toLocaleDateString(itinerary.departuretimestamp),
            LocalDepartureTime: Date.toLocaleTimeString(itinerary.departuretimestamp),
            InboundCompleteItinerary: {
                // ForeignAirport1: 'MSP',
                // ForeignAirport2: 'MSP',
                // ForeignAirport3: 'MSP',
                // ForeignAirport4: 'MSP',
                // ForeignAirport5: 'MSP',
            },
            InboundArrivalLocation: {
                AirportCode: itinerary.inboundairportcode,
                City: itinerary.inboundairportcity,
                State: '',//itinerary.inboundairportstate,
                CountryCode: itinerary.inboundcountrycode,
                PlaceDescription: itinerary.inboundairportdesc
            },
            LocalArrivalDate: Date.toLocaleDateString(itinerary.arrivaltimestamp),
            LocalArrivalTime: Date.toLocaleTimeString(itinerary.arrivaltimestamp),
        }
    }

    let aircraft = {
        AircraftDetail: {
            TailNumber: itinerary.tailnumber,
            TypeAircraft: itinerary.typeaircraft,
            Color: itinerary.color,
            CallSign: itinerary.callsign,
            CBPDecalNumber: itinerary.cbpdecalnbr
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