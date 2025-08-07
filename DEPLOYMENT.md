# Deployment Guide for Rantilini Portfolio (GBP 1500)

This modern portfolio website can be deployed in multiple ways. Choose the option that best fits your needs.

## 🚀 Quick Deployment Options

### 1. **Netlify (Recommended for Static Sites)**
- **Best for**: Simple, fast deployment with CDN
- **Cost**: Free tier available
- **Steps**:
  1. Push your code to GitHub
  2. Connect your GitHub repo to Netlify
  3. Deploy automatically with the included `netlify.toml`

### 2. **Vercel**
- **Best for**: Modern web applications
- **Cost**: Free tier available  
- **Steps**:
  1. Install Vercel CLI: `npm i -g vercel`
  2. Run `vercel` in your project directory
  3. Follow the prompts

### 3. **Docker Deployment**
- **Best for**: Consistent environments, cloud platforms
- **Steps**:
  ```bash
  # Build the image
  docker build -t rantilini-portfolio .
  
  # Run the container
  docker run -p 3001:3001 rantilini-portfolio
  
  # Or use docker-compose
  docker-compose up -d
  ```

## 🐳 Docker Deployment

### Local Docker
```bash
# Clone and navigate to the project
git clone <your-repo>
cd GBP-1500

# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:3001
```

### Docker Hub Deployment
```bash
# Tag and push to Docker Hub
docker tag rantilini-portfolio your-username/rantilini-portfolio
docker push your-username/rantilini-portfolio
```

## ☁️ Cloud Platform Deployments

### AWS (EC2/ECS)
1. **EC2**: Use the Docker image on an EC2 instance
2. **ECS**: Deploy using AWS Elastic Container Service
3. **Lightsail**: Simple container deployment

### Google Cloud Platform
1. **Cloud Run**: Serverless container deployment
   ```bash
   gcloud run deploy --image gcr.io/PROJECT-ID/rantilini-portfolio --port 3001
   ```

### Microsoft Azure
1. **Container Instances**: Quick container deployment
2. **App Service**: Platform-as-a-service deployment

### DigitalOcean
1. **App Platform**: Easy deployment from GitHub
2. **Droplets**: Virtual machine deployment with Docker

## 🔧 Server Configurations

### Production with Gunicorn
```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn --config gunicorn.conf.py server:app
```

### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔐 Security Considerations

### Environment Variables
Create a `.env` file (don't commit this):
```env
PORT=3001
NODE_ENV=production
```

### HTTPS Setup
- Use Let's Encrypt for free SSL certificates
- Configure your reverse proxy (Nginx/Apache) for HTTPS
- Update any hardcoded HTTP links to HTTPS

## 📊 Monitoring and Logging

### Health Checks
The Docker container includes health checks. Monitor with:
```bash
docker ps  # Check container status
docker logs container-name  # View logs
```

### Analytics
Add your analytics code to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 CI/CD Pipeline

### GitHub Actions
The included workflow (`.github/workflows/deploy.yml`) provides:
- Automated testing
- Docker image building
- Multi-platform deployment

### Required Secrets
Set these in your GitHub repository settings:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 🌐 Domain Setup

### Custom Domain
1. Purchase a domain from any registrar
2. Point DNS A records to your server's IP
3. Configure SSL/TLS certificates

### Subdomain Setup
```
portfolio.yourdomain.com → Your server IP
www.portfolio.yourdomain.com → Your server IP
```

## 🎯 Performance Optimization

### CDN Setup
- Use Cloudflare for global CDN
- Configure caching rules for static assets
- Enable Brotli/Gzip compression

### Image Optimization
- Add actual project images to replace placeholders
- Use WebP format for better compression
- Implement lazy loading for images

## 🛠️ Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT in environment variables
2. **Docker build fails**: Check .dockerignore and file permissions
3. **Static files not loading**: Verify file paths and server configuration

### Debug Commands
```bash
# Check if server is running
curl http://localhost:3001

# View Docker logs
docker logs rantilini-portfolio

# Test Docker build locally
docker build -t test-portfolio . && docker run -p 3001:3001 test-portfolio
```

## 📞 Support

For deployment issues:
1. Check the logs first
2. Verify all configuration files
3. Test locally before deploying
4. Check firewall and security group settings

---

Choose the deployment method that best fits your infrastructure and requirements. The Docker approach is recommended for production environments, while Netlify/Vercel are great for quick deployments.
