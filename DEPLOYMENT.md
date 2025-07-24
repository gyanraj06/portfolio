# GitHub Pages Deployment Guide

This guide will help you deploy the portfolio to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## 🚀 Quick Deployment Steps

### Step 1: Create GitHub Repository

1. **Create a new repository** on GitHub
   - Repository name: `portfolio` (or any name you prefer)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we already have one)

2. **Clone or initialize** the repository locally:
   ```bash
   # If you created an empty repo:
   git init
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   
   # If you cloned:
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

### Step 2: Prepare Files

1. **Copy all files** to your repository folder:
   ```
   portfolio/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── assets/
   │   └── gyan.jpg
   ├── README.md
   ├── _config.yml
   ├── manifest.json
   ├── sitemap.xml
   ├── robots.txt
   ├── .gitignore
   ├── CNAME (optional)
   └── DEPLOYMENT.md
   ```

2. **Update URLs** in the following files if your repository name is different:
   - `README.md`: Update live demo URL
   - `sitemap.xml`: Update all URLs
   - `index.html`: Update Open Graph and Twitter meta tags
   - `_config.yml`: Update baseurl if needed

### Step 3: Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio deployment

🚀 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. **Go to repository Settings**
   - Navigate to your repository on GitHub
   - Click on "Settings" tab

2. **Configure Pages**
   - Scroll down to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click "Save"

3. **Wait for deployment**
   - GitHub will provide a URL like: `https://YOUR_USERNAME.github.io/portfolio/`
   - It may take 5-10 minutes for the site to be live

## 🌐 Custom Domain (Optional)

### Using GitHub Pages Domain
Your site will be available at:
```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
```

### Using Custom Domain

1. **Purchase a domain** (e.g., from Namecheap, GoDaddy, etc.)

2. **Update CNAME file**:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. **Configure DNS** with your domain provider:
   - For apex domain (`yourdomain.com`):
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     Value: 185.199.109.153
     Value: 185.199.110.153
     Value: 185.199.111.153
     ```
   
   - For subdomain (`www.yourdomain.com`):
     ```
     Type: CNAME
     Name: www
     Value: YOUR_USERNAME.github.io
     ```

4. **Enable HTTPS** in repository Settings → Pages

## 🔧 Updating Content

### Method 1: Direct GitHub Edit
1. Navigate to the file on GitHub
2. Click the "Edit" (pencil) icon
3. Make changes and commit

### Method 2: Local Development
```bash
# Pull latest changes
git pull origin main

# Make your changes to files

# Commit and push
git add .
git commit -m "Update portfolio content"
git push origin main
```

## 📈 SEO Optimization

### Google Search Console
1. **Verify ownership** at [Google Search Console](https://search.google.com/search-console/)
2. **Submit sitemap**: `https://yourdomain.com/sitemap.xml`
3. **Request indexing** for important pages

### Social Media
1. **Test sharing** on Facebook, Twitter, LinkedIn
2. **Use debugging tools**:
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## 🚨 Troubleshooting

### Common Issues

1. **404 Error**
   - Check if GitHub Pages is enabled
   - Verify the file is named `index.html`
   - Ensure the repository is public

2. **Styling Issues**
   - Check that `styles.css` is in the root directory
   - Verify all file paths are relative (no leading `/`)
   - Check browser console for errors

3. **Images Not Loading**
   - Ensure images are in the `assets/` folder
   - Check file paths in HTML
   - Verify image file names match exactly (case-sensitive)

4. **Custom Domain Issues**
   - Check DNS propagation (can take 24-48 hours)
   - Verify CNAME file contains only the domain name
   - Ensure DNS records are configured correctly

### Contact Form Issues
- **Formspree endpoint**: Ensure the form action URL is correct
- **Email delivery**: Check spam folders
- **Validation errors**: Check browser console

## 📊 Analytics (Optional)

### Google Analytics
1. **Create** Google Analytics account
2. **Add tracking code** to `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

## 🔒 Security

- **Never commit** sensitive information (API keys, passwords)
- **Use environment variables** for sensitive data
- **Keep dependencies updated**
- **Review** third-party scripts and services

## 📱 PWA Features

The portfolio includes PWA manifest for:
- **Add to home screen** functionality
- **Offline viewing** (basic)
- **App-like experience** on mobile devices

## ✅ Final Checklist

Before going live:
- [ ] All personal information updated
- [ ] Profile photo added to `assets/gyan.jpg`
- [ ] Contact form endpoint configured
- [ ] All links tested and working
- [ ] Responsive design verified on mobile
- [ ] SEO meta tags updated
- [ ] Social media sharing tested
- [ ] Performance optimized (images, scripts)
- [ ] Accessibility checked
- [ ] Cross-browser compatibility verified

## 🎉 Success!

Your portfolio should now be live at:
- **GitHub Pages**: `https://YOUR_USERNAME.github.io/portfolio/`
- **Custom Domain**: `https://yourdomain.com` (if configured)

Share your portfolio and showcase your professional work! 🚀