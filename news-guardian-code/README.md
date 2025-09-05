# 🛡️ NewsGuardian - Fake News Detection Platform

A comprehensive AI-powered fake news detection and analysis platform built with Next.js 15, featuring real-time news verification, multilingual summarization, and advanced AI algorithms.

## 🚀 Features

### Core Features
- **🛡️ Fake News Detection**: Advanced AI algorithms to detect and analyze fake news with high accuracy
- **📄 News Summarization**: Get concise summaries of news articles in multiple Indian languages
- **🌍 Real-time News**: Stay updated with verified news from 6 different categories
- **🤖 AI Assistant**: 24/7 AI chatbot support for all your queries about news and platform features

### Additional Features
- ✅ **Source Verification**: Verify the credibility of news sources and authors
- 📈 **Historical Analysis**: Track the evolution and spread of news stories over time
- 👥 **Social Media Integration**: Analyze news shared on social media platforms
- 🔔 **Custom Alerts**: Get notified about breaking news in your areas of interest
- 🏆 **Fact Check Database**: Access our comprehensive database of fact-checked claims
- ⚡ **Browser Extension**: Detect fake news while browsing with our Chrome extension
- 📱 **Mobile App**: Access all features on-the-go with our mobile application
- 🔌 **API Access**: Integrate our detection capabilities into your own applications
- 📚 **Educational Resources**: Learn about media literacy and fake news detection
- 🚩 **Community Reports**: Report suspicious news and help our community stay informed

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & AI
- **AI Integration**: z-ai-web-dev-sdk
- **Database**: Prisma ORM with SQLite
- **Authentication**: Custom implementation
- **Real-time**: Socket.IO integration
- **API**: Next.js API Routes

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build**: Next.js
- **Deployment**: Vercel ready

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd news-guardian

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# AI SDK (optional - for production)
ZAI_API_KEY="your-zai-api-key"

# Next.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## 🏗️ Project Structure

```
news-guardian-code/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/               # Authentication pages
│   │   ├── detect/             # Fake news detection
│   │   ├── news/               # Real-time news
│   │   ├── summarize/          # News summarization
│   │   ├── profile/            # User profile
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   ├── detection/          # Detection components
│   │   ├── news/               # News components
│   │   ├── summarization/      # Summarization components
│   │   └── chatbot/            # AI chatbot
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility libraries
├── public/                     # Static assets
├── prisma/                     # Database schema
├── components.json             # shadcn/ui config
├── tailwind.config.ts         # Tailwind CSS config
├── next.config.ts            # Next.js config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── vercel.json               # Vercel deployment config
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t newsguardian .

# Run container
docker run -p 3000:3000 newsguardian
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open database browser

# Deployment
npm run vercel-build # Build for Vercel
```

## 🎨 Styling & Theming

The application uses a comprehensive design system with:

- **Color Palette**: Blue, purple, green, and orange gradients
- **Typography**: Clean, modern sans-serif fonts
- **Components**: Consistent shadcn/ui components
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Ready for dark theme implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for the beautiful components
- Tailwind CSS for the utility-first styling
- Vercel for the excellent hosting platform

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Next.js and modern web technologies**