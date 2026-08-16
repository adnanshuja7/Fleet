/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI features will fallback to mock data.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json());

// API: Standard Chat Endpoint using gemini-3.5-flash
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Elegant simulated response if no api key configured
      return res.json({
        text: `[Key Configuration Required] Standard response simulated for FleetOS:\n\nRegarding: "${prompt}"\n\nFleetOS handles multi-tenant capacity exchange by isolating customer records and dispatch groups in distinct schemas. Operators share excess capacity by selectively setting structural toggles to broadcast available blocks on the B2B Capacity Exchange Ledger. Financial clearance is logged instantly, ensuring white-labeled fulfillment and complete confidentiality.`,
      });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are an elite B2B mobility investment director and technical architect briefing high-value venture capital networks on FleetOS.',
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({ error: error.message || 'Error communicating with AI assistant' });
  }
});

// API: Real-Time WhatsApp Booking Parser
app.post('/api/parse-booking', async (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText) {
      return res.status(400).json({ error: 'rawText is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Seed a realistic parsed output offline if API is down or not authenticated
      const randId = Math.floor(1000 + Math.random() * 9000);
      return res.json({
        dateTime: 'Tomorrow at 6:00 PM',
        pickup: 'Downtown Dubai',
        destination: 'DXB Airport Terminal 3',
        pax: 3,
        vehicleTier: 'Executive SUV',
        tripId: `FL-${randId}`,
        simulated: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Parse this raw booking request text and extract the details into Structured JSON: "${rawText}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Extract booking information from raw chat strings. Return exactly the elements requested in the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dateTime: {
              type: Type.STRING,
              description: 'Ex: "Tomorrow at 6:00 PM" or parsed datetime'
            },
            pickup: {
              type: Type.STRING,
              description: 'Ex: "Downtown Dubai" or pickup point'
            },
            destination: {
              type: Type.STRING,
              description: 'Ex: "DXB Terminal 3" or target location'
            },
            pax: {
              type: Type.INTEGER,
              description: 'Number of passengers'
            },
            vehicleTier: {
              type: Type.STRING,
              description: 'Vehicle class request e.g., "Executive SUV", "Business Sedan", etc.'
            },
            tripId: {
              type: Type.STRING,
              description: 'Generate a random trip ID following FL-XXXX'
            }
          },
          required: ['dateTime', 'pickup', 'destination', 'pax', 'vehicleTier', 'tripId']
        }
      }
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini Parser error:', error);
    res.status(500).json({ error: error.message || 'Error compiling booking metadata' });
  }
});

// Setup Vite as middleware or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FleetOS Backend] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
