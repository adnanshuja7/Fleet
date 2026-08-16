# FleetOS Developer & Agent Guidelines

## 1. System Overview
**FleetOS** is a specialized B2B executive transportation procurement, inter-fleet capacity exchange, and dispatch operating platform designed for the $3.2B GCC premium chauffeur and luxury fleet market across the UAE (Dubai, Abu Dhabi), Saudi Arabia (Riyadh, Jeddah), Qatar (Doha), Kuwait, Bahrain, and Oman.

## 2. Core Architecture & Tech Stack
- **Frontend**: React 18+ (TypeScript), Vite, Tailwind CSS with custom GCC luxury/gold dark palette.
- **3D Visualization**: Three.js, OrbitControls, GSAP for smooth orbital camera transitions and particle arc trajectories connecting GCC hubs.
- **Backend / API**: Express.js server in `server.ts`, integrating Vite middleware in development mode and compiling to CommonJS bundle for production.
- **AI Intelligence**: `@google/genai` TypeScript SDK utilizing `gemini-2.5-flash` for server-side enterprise RFP synthesis, dispatch route margin modeling, and operational intelligence.
- **Port & Host**: Bind to port `3000` on host `0.0.0.0`.

## 3. Business Domain & Glossary
- **Anchor Fleet**: Certified tier-1 limousine and luxury transport operators who supply bonded vehicles and licensed chauffeurs.
- **Capacity Exchange / Clearinghouse**: Inter-fleet B2B marketplace allowing operators to offload excess booking spillovers during peak demand surges (summits, F1, LEAP, GITEX) to peer fleets with idle vehicles.
- **Take Rate**: Platform transaction fee (12% standard, 15% VIP/Armored) deducted during automated escrow settlement.
- **Vehicle Tiers**:
  - `Executive Sedan`: Mercedes-Benz E-Class, BMW 5-Series, Genesis G80.
  - `First Class Luxury`: Mercedes-Benz S-Class (Maybach opt.), BMW 7-Series, Audi A8L.
  - `Prestige SUV`: Range Rover Autobiography, Cadillac Escalade ESV, Mercedes-Benz GLS.
  - `Armored / Diplomatic VIP`: VR7/VR9 Ballistic certified SUVs and sedans with close protection certified drivers.
  - `Ultra-Luxury Executive Sprinter`: Custom bespoke 6-8 passenger luxury jet vans with workstation and satellite WiFi.

## 4. Key Directory Structure
- `/src/components/`: Modular functional views (`CorporatePortalTab`, `GccNetworkScene`, `SimulatorTab`, `RevenueStackTab`, `RiskMatrixTab`, `RoadmapTab`, `PitchTab`, `AiAssistant`).
- `/src/data/`: Domain data schemas and mock operational telemetry (`mockData.ts`).
- `/src/types.ts`: TypeScript contracts for rides, invoices, cities, and simulator parameters.
- `/docs/`: Product, architectural, operational, and investor documentation.

## 5. Development Principles
- Keep secrets server-side (Gemini API keys must never be exposed to the browser).
- Ensure strict TypeScript typing with zero warnings.
- Test production builds with `npm run build` before finalizing changes.
