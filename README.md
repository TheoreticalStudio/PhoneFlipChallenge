# Phone Flip Challenge Website

This is a Jekyll-based website for the Phone Flip Challenge game, configured to run with Docker.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your machine
- Git (optional, for version control)

## Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repository-url>
   cd website
   ```

2. **Build and start the Docker container**:
   ```bash
   docker-compose up --build
   ```
   This will:
   - Build the Docker image with all necessary dependencies
   - Start the Jekyll development server
   - Mount your local files into the container for live reload

3. **Access the website**:
   Open your web browser and navigate to:
   ```
   http://localhost:4000
   ```

4. **Stop the server**:
   Press `Ctrl+C` in the terminal where the server is running, or run:
   ```bash
   docker-compose down
   ```

## Development

- The website will automatically reload when you make changes to any files.
- The site is configured with the following plugins:
  - jekyll-feed: For RSS/Atom feeds
  - jekyll-seo-tag: For better SEO
  - jekyll-sitemap: For sitemap generation

## Project Structure

```
.
├── _config.yml      # Jekyll configuration
├── _data/          # Data files
├── _includes/      # Reusable components
├── _layouts/       # Layout templates
├── _pages/         # Individual pages
├── _posts/         # Blog posts (if any)
├── _sass/          # SASS stylesheets
├── css/            # Compiled CSS
├── img/            # Image assets
├── .dockerignore   # Files to ignore in Docker build
├── Dockerfile      # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── Gemfile         # Ruby dependencies
```

## Deployment to GitHub Pages

This project is configured to work with GitHub Pages. To deploy:

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch as the source
4. The site will be available at `https://<username>.github.io/<repository-name>`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
