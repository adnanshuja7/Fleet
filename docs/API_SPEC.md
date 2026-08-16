# FleetOS — REST & Webhook API Specification

**Specification Version:** 1.1.0  
**Base URL (Production):** `https://api.fleetos.io/v1`  
**Authentication:** Bearer Token (`Authorization: Bearer <FLEETOS_API_KEY>`)

---

## 1. Authentication & Security
All requests to the FleetOS REST API must include a valid API token in the HTTP Authorization header:
```http
Authorization: Bearer sec_live_9f823a10b42c98...
Content-Type: application/json
X-FleetOS-Tenant-ID: corp_difc_investcorp
```

---

## 2. Enterprise Corporate Booking Endpoints

### 2.1 Create Ride Booking
`POST /rides/create`

**Request Body:**
```json
{
  "corporateAccountId": "corp_8923a",
  "passenger": {
    "name": "His Excellency Tariq Al-Husseini",
    "phone": "+971501234567",
    "email": "tariq@investcorp.ae",
    "vipTier": "diplomatic"
  },
  "tier": "First Class",
  "pickup": {
    "city": "Dubai",
    "address": "Terminal 3, Dubai International Airport (DXB)",
    "coordinates": { "lat": 25.2532, "lng": 55.3657 },
    "scheduledTime": "2026-09-20T14:30:00Z",
    "flightNumber": "EK008"
  },
  "dropoff": {
    "city": "Dubai",
    "address": "Burj Al Arab Jumeirah, Suite 101",
    "coordinates": { "lat": 25.1412, "lng": 55.1852 }
  },
  "amenityPreferences": {
    "bottledWater": "San Pellegrino",
    "cabinTemperatureCelsius": 20.5,
    "chauffeurLanguage": "Arabic/English",
    "silentChaperone": true
  }
}
```

**Response (`201 Created`):**
```json
{
  "bookingId": "ride_90123fa",
  "status": "confirmed",
  "estimatedFare": 650.00,
  "currency": "AED",
  "flightStatus": {
    "flightNumber": "EK008",
    "estimatedTouchdown": "2026-09-20T13:55:00Z",
    "adjustedChauffeurArrival": "2026-09-20T14:25:00Z",
    "terminal": "Terminal 3 VIP Chauffeur Gate 4"
  },
  "escrowId": "escrow_881923"
}
```

---

## 3. Capacity Exchange & Clearinghouse Endpoints

### 3.1 Broadcast Spillover Demand
`POST /clearinghouse/broadcast-spillover`

Used by fleet operators when utilization reaches >90% during high-demand summits.

**Request Body:**
```json
{
  "sourceFleetId": "fleet_royal_dubai",
  "rideId": "ride_90123fa",
  "requiredTier": "First Class",
  "pickupWindowStart": "2026-09-20T14:15:00Z",
  "payoutOffered": 552.50,
  "currency": "AED",
  "maxVehicleAgeMonths": 24,
  "minChauffeurRating": 4.90
}
```

**Response (`200 OK`):**
```json
{
  "spilloverAuctionId": "spill_389102",
  "broadcastNodes": ["DXB", "AUH"],
  "eligibleOperatorsPinged": 14,
  "status": "bidding_open",
  "expiresAt": "2026-09-20T13:30:00Z"
}
```

### 3.2 Accept Spillover Leg
`POST /clearinghouse/claim`

**Request Body:**
```json
{
  "spilloverAuctionId": "spill_389102",
  "servicingFleetId": "fleet_emirates_black",
  "assignedVehicle": {
    "vin": "WDD2230631A123456",
    "model": "2025 Mercedes-Maybach S580",
    "licensePlate": "DXB-VIP-889"
  },
  "assignedChauffeur": {
    "id": "chauf_7718",
    "name": "Kareem Mostafa",
    "rating": 4.98,
    "rtaPermitNumber": "RTA-LIM-99214"
  }
}
```

---

## 4. Webhook Event Notifications

FleetOS pushes real-time event webhooks to enterprise ERP / travel systems:

| Event Type | Description |
| :--- | :--- |
| `ride.flight_delayed` | Flight tracking engine detected a delay; dispatch time rescheduled automatically. |
| `ride.chauffeur_arrived` | Chauffeur arrived at VIP tarmac/terminal gate. |
| `ride.trip_completed` | Passenger safely arrived at destination; trip receipt & telemetry locked. |
| `escrow.disbursed` | Capacity exchange settlement finalized; payment routed to servicing operator. |
