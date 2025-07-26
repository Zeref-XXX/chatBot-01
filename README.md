<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Nezuko Chat Bot v0.1 🐱

A simple, anime-themed chatbot inspired by Nezuko from Demon Slayer. This project features a React frontend with an Express.js backend powered by Google’s Gemini AI to provide responses in Nezuko’s characteristic innocent and knowledgeable style about anime.

## 🌟 Features

- **Anime-Themed Personality:** Responds as Nezuko with immense anime knowledge.
- **Real-time Chat Interface:** Modern React-based UI with smooth messaging.
- **AI-Powered Responses:** Uses Google Gemini 1.5 Flash model for intelligent conversations.
- **Responsive Design:** Clean, user-friendly chat interface.
- **Error Handling:** Graceful handling of API failures and overload scenarios.
- **Live Demo:** Deployed on Vercel for easy access.


## 🏗️ Project Structure

```
chatBot-01/
├── Nezuko-back/           # Backend Express.js server
│   ├── Neko.js            # AI integration with Google Gemini
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── vercel.json        # Deployment configuration
├── nezuko-front/          # React frontend
│   ├── Chatbot.js         # Main chat component
│   ├── Chatbot.css        # Styling for chat interface
│   ├── app.js             # React entry point
│   ├── index.html         # HTML template
│   └── package.json       # Frontend dependencies
├── index.js               # Alternative server entry point
└── README.md              # Project documentation
```


## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **Google Gemini API Key** (from Google AI Studio)
- **npm** or **yarn** package manager


### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Zeref-XXX/chatBot-01.git
cd chatBot-01
```

2. **Backend Setup**

```bash
cd Nezuko-back
npm install
```

3. **Frontend Setup**

```bash
cd ../nezuko-front
npm install
```

4. **Environment Configuration**
Create a `.env` file in the `Nezuko-back` directory:

```env
GEN=your_google_gemini_api_key
PORT=4000
```


## 🔧 Running the Application

1. **Start the Backend Server**

```bash
cd Nezuko-back
npm start
# or
node server.js
```

The server will run on `http://localhost:4000`.
2. **Start the Frontend**
In a new terminal:

```bash
cd nezuko-front
npm start
# or with Parcel
npx parcel index.html
```

The frontend will be available at `http://localhost:1234` by default.
3. **Interact**
Open the chat interface in your browser and type your questions. Nezuko will respond with her signature “Nya” charm.

## 📋 API Endpoints

### Backend Routes

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | `/` | Health check (returns “pong”) |
| GET | `/ping` | Status check (returns “working”) |
| POST | `/api/chat` | Main chat endpoint: send `{ "message": "Your question here" }` and receive a Nezuko-style reply |

## 🎨 Frontend Features

- **Real-time Messaging:** Smooth auto-scroll and instant updates.
- **Loading Indicators:** Visual feedback during API calls.
- **Error Handling:** User-friendly messages on network/API errors.
- **Responsive Design:** Mobile and desktop support.
- **Nezuko-Themed UI:** Cat emojis and pastel styling for an anime vibe.


## 🤖 AI Integration

The chatbot uses **Google Gemini 1.5 Flash** with a custom system instruction:

```javascript
systemInstruction: "you are Nezuko anime freak who have immense knowlege about it"
```

This ensures responses are:

- Anime-focused and knowledgeable
- In-character as Nezuko
- Friendly and engaging


## 🌐 Deployment

- **Backend:** Vercel (configured via `vercel.json`)
- **Frontend:** Any static hosting (Vercel, Netlify, GitHub Pages)
- **Live Demo:** https://frontend-roan-two-80.vercel.app


## 🛠️ Dependencies

### Backend (`Nezuko-back/package.json`)

- `@google/genai` – Google Gemini AI integration
- `express` – Web framework
- `cors` – Cross-origin resource sharing
- `dotenv` – Environment variable management
- `chalk` – Terminal styling
- `readline-sync` – Synchronous input


### Frontend (`nezuko-front/package.json`)

- `react` – Frontend framework
- `react-dom` – React DOM rendering
- `parcel` – Build tool and bundler


## 🐛 Error Handling

- Validates API key on startup
- Detects and reports model overload
- Retries on transient network errors
- Provides clear user error messages


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Future Enhancements

- Add more Demon Slayer characters
- Implement conversation memory
- Add voice chat capabilities
- Develop a mobile app version
- Include anime recommendation features


## 📄 License

This project is open source under the **MIT License**.
Keep your Google Gemini API key secure and never commit it to version control. Enjoy chatting with Nezuko! 🐾
