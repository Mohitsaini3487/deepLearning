# 🚀 NewsGuardian Deployment Guide

This guide will help you deploy your NewsGuardian application to various platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Node.js 18+ installed
- ✅ All dependencies installed (`npm install`)
- ✅ Database set up (`npx prisma db push`)
- ✅ Environment variables configured

## 🔧 Environment Variables

Create a `.env.local` file in your project root:

```env
# Database
DATABASE_URL="file:./dev.db"

# AI Integration (Optional)
ZAI_API_KEY="your-zai-api-key-here"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Application
NODE_ENV="production"
```

## 🌐 Vercel Deployment (Recommended)

### 1. Connect to GitHub
1. Push your code to a GitHub repository
2. Sign in to [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository

### 2. Configure Environment Variables
In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all the environment variables from above
3. Click **Save**

### 3. Configure Build Settings
1. Go to **Settings** → **Build & Development**
2. Ensure these settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 4. Deploy
1. Click **Deploy**
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

## 🐳 Docker Deployment

### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Build and Run
```bash
# Build the Docker image
docker build -t newsguardian .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./dev.db" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  newsguardian
```

## 🖥️ Traditional Server Deployment

### 1. Build the Application
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### 2. Use PM2 for Process Management
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "newsguardian" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 3. Configure Nginx (Optional)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## ☁️ AWS Deployment

### AWS Elastic Beanstalk
1. Install AWS CLI and EB CLI
2. Initialize EB application:
   ```bash
   eb init
   ```
3. Create environment:
   ```bash
   eb create production
   ```
4. Deploy:
   ```bash
   eb deploy
   ```

### AWS ECS
1. Build and push Docker image to ECR
2. Create ECS task definition
3. Create ECS service
4. Configure load balancer

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### 2. Database Connection Issues
```bash
# Reset database
npx prisma db push --force-reset
npx prisma db seed
```

#### 3. Environment Variables Not Loading
- Ensure variables are set in the correct environment
- Check for typos in variable names
- Restart the application after changing variables

#### 4. CSS Not Loading
```bash
# Rebuild Tailwind CSS
npm run build
```

### Performance Optimization

#### 1. Enable Caching
```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

#### 2. Optimize Images
```javascript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

## 📊 Monitoring

### Application Monitoring
- **Vercel Analytics**: Built-in monitoring for Vercel deployments
- **LogRocket**: Session replay and error tracking
- **Sentry**: Error monitoring and performance tracking

### Database Monitoring
- **Prisma Studio**: Visual database browser
- **Slow Query Logs**: Monitor database performance

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🎯 Best Practices

### Security
1. **Environment Variables**: Never commit sensitive data
2. **HTTPS**: Always use HTTPS in production
3. **Dependencies**: Regularly update dependencies
4. **Authentication**: Implement proper authentication and authorization

### Performance
1. **Caching**: Implement appropriate caching strategies
2. **CDN**: Use CDN for static assets
3. **Database**: Optimize database queries
4. **Images**: Optimize images and use modern formats

### Reliability
1. **Monitoring**: Set up proper monitoring and alerting
2. **Backups**: Regular database backups
3. **Scaling**: Design for horizontal scaling
4. **Testing**: Implement comprehensive testing

---

🎉 **Congratulations! Your NewsGuardian application is now ready for production!**