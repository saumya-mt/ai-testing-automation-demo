# Philips Support Portal with AI-Enhanced SDLC

A modern customer support portal for Philips products with AI-driven development workflow automation. This project demonstrates how AI can enhance the software development lifecycle by automating code reviews and test generation.

## Features

- 🏠 **Home Page**: Welcome screen with quick access to all features
- ❓ **FAQs**: Interactive frequently asked questions section
- 📋 **Warranty Check**: Product warranty status verification
- 🎫 **Support Ticket**: Customer support ticket submission system
- 📊 **AI Dashboard**: Real-time insights into AI-powered development metrics

## AI Automation Features

### Code Review Automation
- Automatically analyzes committed code
- Provides suggestions for improvements
- Focuses on code quality, performance, and security
- Generates detailed review reports

### Test Generation
- Automatically generates Jest-based unit tests
- Covers component rendering, user interactions, and state management
- Creates comprehensive test suites for new components
- Maintains test coverage as code evolves

### CI/CD Pipeline
- Triggers on every push and pull request
- Runs AI code review
- Generates unit tests
- Builds and deploys the application
- Archives AI-generated artifacts

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Custom CSS with Philips design system
- **AI Integration**: OpenAI GPT-4 API
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/philips-support-portal.git
   cd philips-support-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env file
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## AI Scripts

### Code Reviewer (`ai-scripts/code_reviewer.py`)
- Analyzes React components for best practices
- Generates markdown reports with suggestions
- Integrates with OpenAI GPT-4 for intelligent analysis

### Test Generator (`ai-scripts/test_generator.py`)
- Creates Jest test files for React components
- Generates comprehensive test cases
- Maintains test coverage automatically

## CI/CD Configuration

The GitHub Actions workflow (`ci.yml`) includes:

1. Environment setup (Node.js and Python)
2. Dependency installation
3. Frontend build
4. AI code review
5. Test generation
6. Artifact upload
7. Deployment to Vercel (on main branch)

## Environment Variables

Required environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key for AI features
- `VERCEL_TOKEN`: Vercel deployment token (for CI/CD)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Philips design system for inspiration
- OpenAI for GPT-4 API
- React.js community for excellent tools and libraries
