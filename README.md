# 🌟 ChatNova – Modern AI Chat Platform  
**Vite + React + TailwindCSS + DaisyUI + Zustand**

🚀 **ChatNova** is a modern, fast, and visually polished AI chat web application designed to deliver a smooth and engaging user experience. Built with the latest frontend tools, it focuses on clean UI, performance, scalability, and customization—similar to professional AI chat platforms.

---

## ✨ Key Features

### 🔥 Modern UI / UX
- Clean, minimal, and professional layout  
- Chat-style message bubbles (sent & received)  
- Typing animation & auto-scroll behavior  
- Smooth transitions and responsive interactions  

### 🎨 Smart Theme Customizer
- Multiple built-in themes using **DaisyUI**  
- Real-time theme switching  
- Zustand-powered global theme state  
- Available themes:
  - Light  
  - Dark  

### 🔐 Authentication Ready (Backend Friendly)
- Login & Signup UI  
- Profile page with avatar upload UI  
- Structured for easy backend integration  
- Secure and scalable architecture  

### 📱 Fully Responsive Design
Optimized for:
- Desktop  
- Mobile  
- Tablet  

---

## 🏗️ Tech Stack

| Technology       | Role |
|------------------|------|
| **React.js**     | Component-based UI |
| **Vite**         | Fast development & build tool |
| **TailwindCSS**  | Utility-first styling |
| **DaisyUI**      | Theme & UI components |
| **Zustand**      | Lightweight state management |
| **Lucide Icons** | Modern vector icons |

---

## 📂 Project Structure

```bash
chatnova/
│
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components (Chat, Login, Profile)
│   ├── store/             # Zustand state management
│   ├── assets/            # Images & static files
│   ├── utils/             # Helper functions
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Application entry point
│
├── public/                # Public assets
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

---

## 🔄 Technical Workflow

```text
User Action
   ↓
React Components
   ↓
Zustand Store (Global State)
   ↓
Theme / UI Update
   ↓
Re-render with Tailwind + DaisyUI styles
```

---

## ⚙️ Installation & Setup

### 🚀 Install Dependencies
```bash
npm install
```

### 🚀 Run the Development Server
```bash
npm run dev
```

App runs at:
```
http://localhost:5173
```

---

## 🧩 Customization

- Add new themes easily via DaisyUI config  
- Extend Zustand stores for chat history or authentication  
- Backend APIs can be integrated seamlessly  

---

## 🤝 Contribution Guidelines

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Open a Pull Request  

---

## 📌 Future Enhancements

- AI API integration  
- Real-time messaging  
- Chat history persistence  
- Full authentication  
- Multi-language support  

---

## 📜 License

This project is licensed under the **MIT License**.
