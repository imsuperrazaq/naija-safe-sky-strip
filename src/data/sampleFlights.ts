
import { FlightData } from '../components/atc/FlightStrip';

export const sampleFlights: FlightData[] = [
  {
    id: 'NGA203',
    callsign: 'NGA203',
    aircraft: 'B737',
    route: {
      departure: 'DNMM',
      destination: 'DNAA',
    },
    level: {
      current: 'FL250',
      cleared: 'FL280',
      requested: 'FL320'
    },
    estimatedTime: '14:25',
    speed: '450',
    status: 'active',
    type: 'departure',
    squawk: '4271',
    remarks: 'VIP on board. Priority handling requested.'
  },
  {
    id: 'AFR123',
    callsign: 'AFR123',
    aircraft: 'A330',
    route: {
      departure: 'LFPG',
      destination: 'DNMM',
    },
    level: {
      current: 'FL350',
      cleared: 'FL350',
    },
    estimatedTime: '14:30',
    speed: '480',
    status: 'pending',
    type: 'arrival',
    squawk: '7612',
  },
  {
    id: 'ETH509',
    callsign: 'ETH509',
    aircraft: 'B788',
    route: {
      departure: 'HAAB',
      destination: 'GOBD',
    },
    level: {
      current: 'FL370',
      cleared: 'FL370',
    },
    estimatedTime: '14:40',
    speed: '510',
    status: 'cleared',
    type: 'overflight',
  },
  {
    id: 'ENT422',
    callsign: 'ENT422',
    aircraft: 'E195',
    route: {
      departure: 'DNAA',
      destination: 'DNPO',
    },
    level: {
      current: 'FL230',
      cleared: 'FL270',
    },
    estimatedTime: '14:15',
    speed: '430',
    status: 'active',
    type: 'departure',
  },
  {
    id: 'AJG335',
    callsign: 'AJG335',
    aircraft: 'C208',
    route: {
      departure: 'DNKN',
      destination: 'DNAA',
    },
    level: {
      current: 'FL100',
      cleared: 'FL100',
    },
    estimatedTime: '14:55',
    speed: '210',
    status: 'active',
    type: 'arrival',
  },
  {
    id: 'BAW80',
    callsign: 'BAW80',
    aircraft: 'B772',
    route: {
      departure: 'EGLL',
      destination: 'FALE',
    },
    level: {
      current: 'FL370',
      cleared: 'FL390',
      requested: 'FL410'
    },
    estimatedTime: '15:10',
    speed: '498',
    status: 'pending',
    type: 'overflight',
  },
  {
    id: 'DLH234',
    callsign: 'DLH234',
    aircraft: 'A346',
    route: {
      departure: 'EDDF',
      destination: 'FACT',
    },
    level: {
      current: 'FL380',
      cleared: 'FL380',
    },
    estimatedTime: '15:25',
    speed: '495',
    status: 'cleared',
    type: 'overflight',
  },
  {
    id: 'ABD704',
    callsign: 'ABD704',
    aircraft: 'A320',
    route: {
      departure: 'DNMM',
      destination: 'DRRN',
    },
    level: {
      current: 'FL180',
      cleared: 'FL240',
    },
    estimatedTime: '15:05',
    speed: '420',
    status: 'active',
    type: 'departure',
    remarks: 'Requesting direct routing to GIBRA'
  },
  {
    id: 'UAE793',
    callsign: 'UAE793',
    aircraft: 'B77W',
    route: {
      departure: 'OMDB',
      destination: 'DNMM',
    },
    level: {
      current: 'FL360',
      cleared: 'FL280',
      requested: 'FL220'
    },
    estimatedTime: '14:50',
    speed: '460',
    status: 'active',
    type: 'arrival',
  },
  {
    id: 'QTR503',
    callsign: 'QTR503',
    aircraft: 'A350',
    route: {
      departure: 'OTHH',
      destination: 'DNMM',
    },
    level: {
      current: 'FL340',
      cleared: 'FL280',
    },
    estimatedTime: '15:15',
    speed: '450',
    status: 'pending',
    type: 'arrival',
  },
  {
    id: 'NAL062',
    callsign: 'NAL062',
    aircraft: 'CRJX',
    route: {
      departure: 'DNAA',
      destination: 'DNMM',
    },
    level: {
      current: 'FL230',
      cleared: 'FL230',
    },
    estimatedTime: '14:22',
    speed: '410',
    status: 'alert',
    type: 'arrival',
    remarks: 'Radio communication issues'
  }
];
