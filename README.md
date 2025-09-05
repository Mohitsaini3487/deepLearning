# 🛡️ NewsGuardian - Fake News Detection Platform

An advanced AI-powered fake news detection and analysis platform built with modern web technologies. Detect fake news in files, links, and videos with multilingual support and real-time analysis.

## ✨ Features

### 🎯 Core Functionality
- **🛡️ Fake News Detection** - Advanced AI algorithms to detect and analyze fake news with high accuracy
- **📝 News Summarization** - Get concise summaries of news articles in multiple Indian languages
- **📰 Real-time News** - Stay updated with verified news from 6 different categories
- **🤖 AI Assistant** - 24/7 AI chatbot support for all your queries about news and platform features

### 🌟 Advanced Features
- **🔍 Source Verification** - Verify the credibility of news sources and authors
- **📈 Historical Analysis** - Track the evolution and spread of news stories over time
- **📱 Social Media Integration** - Analyze news shared on social media platforms
- **🔔 Custom Alerts** - Get notified about breaking news in your areas of interest
- **📊 Fact Check Database** - Access our comprehensive database of fact-checked claims
- **🌐 Browser Extension** - Detect fake news while browsing with our Chrome extension
- **📱 Mobile App** - Access all features on-the-go with our mobile application
- **🔌 API Access** - Integrate our detection capabilities into your own applications

## 🚀 Technology Stack

### 🎯 Core Framework
- **⚡ Next.js 15** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Production-ready motion library for React

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🌐 Axios** - Promise-based HTTP client

### 🗄️ Database & Backend
- **🗄️ Prisma** - Next-generation Node.js and TypeScript ORM
- **🔐 NextAuth.js** - Complete open-source authentication solution

### 🤖 AI Integration
- **🤖 Z-AI Web Dev SDK** - Advanced AI capabilities for news analysis and detection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mohitsaini3487/fake-News-Detection.git
cd fake-News-Detection

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Homepage
│   ├── auth/           # Authentication pages
│   ├── detect/         # Fake news detection
│   ├── summarize/      # News summarization
│   ├── news/           # News categories
│   ├── profile/        # User profile
│   └── api/            # API routes
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components
│   ├── detection/      # Detection components
│   ├── summarization/  # Summarization components
│   ├── news/           # News components
│   └── chatbot/        # AI chatbot
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations
```

## 🎨 Available Components

### 🧩 UI Components (shadcn/ui)
- **Layout**: Card, Separator, Aspect Ratio
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar

### 🎨 Interactive Features
- **Animations**: Smooth micro-interactions with Framer Motion
- **Theme Switching**: Built-in dark/light mode support

### 🔐 Backend Integration
- **Authentication**: Ready-to-use auth flows with NextAuth.js
- **Database**: Type-safe database operations with Prisma
- **API Client**: HTTP requests with Axios
- **State Management**: Simple and scalable with Zustand

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: Automatic deployment from GitHub
- **Railway**: Full-stack application deployment
- **AWS Amplify**: Scalable cloud deployment

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [ ] Advanced AI models for better detection accuracy
- [ ] Mobile application development
- [ ] Browser extension release
- [ ] API documentation and public access
- [ ] Multi-language support expansion
- [ ] Real-time news feed integration
- [ ] Social media monitoring tools

---

Built with ❤️ for fighting misinformation. Supercharged by modern web technologies 🚀
