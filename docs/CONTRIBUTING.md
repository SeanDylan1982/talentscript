# Contributing to TalentScript

Thank you for your interest in contributing to TalentScript! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **🐛 Bug Reports**: Help us identify and fix issues
- **✨ Feature Requests**: Suggest new functionality
- **📝 Documentation**: Improve or add documentation
- **🔧 Code Contributions**: Fix bugs or implement features
- **🎨 Design Improvements**: Enhance UI/UX
- **🧪 Testing**: Add or improve tests

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git** for version control
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/talentscript.git
   cd talentscript
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173`

### Project Structure

```
src/
├── components/
│   ├── resume-builder/     # Main application components
│   ├── tutorial/          # Tutorial system
│   └── ui/                # Reusable UI components
├── contexts/              # React Context for state management
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── lib/                   # Third-party library configurations
```

## 📋 Development Guidelines

### Code Style

We use ESLint and TypeScript for code quality:

```bash
# Run linting
npm run lint

# Check TypeScript
npx tsc --noEmit
```

#### Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Use functional components with hooks
- **Naming**: Use PascalCase for components, camelCase for functions
- **Files**: Use PascalCase for component files, camelCase for utilities

#### Example Component Structure

```typescript
import React from 'react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const { state, dispatch } = useResume();

  const handleClick = () => {
    // Handle action
    onAction?.();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button onClick={handleClick}>
        Action
      </Button>
    </div>
  );
}
```

### State Management

- Use the `ResumeContext` for global state
- Follow the established action patterns
- Add new action types to the reducer when needed

```typescript
// Adding a new action
dispatch({ 
  type: 'UPDATE_SOMETHING', 
  payload: { id: 'item-id', data: newData } 
});
```

### Styling Guidelines

- **Tailwind CSS**: Use utility classes for styling
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Include proper ARIA labels and keyboard navigation
- **Dark Mode**: Not currently implemented, but consider in designs

```typescript
// Good styling example
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
  <h3 className="text-sm font-medium text-gray-900">Title</h3>
  <Button size="sm" variant="outline">Action</Button>
</div>
```

## 🐛 Bug Reports

### Before Submitting

1. **Search existing issues** to avoid duplicates
2. **Test with latest version** to ensure bug still exists
3. **Check browser compatibility** (Chrome, Firefox, Safari, Edge)

### Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome 120, Firefox 119]
- Device: [e.g. Desktop, Mobile]

**Additional Context**
Any other context about the problem.
```

## ✨ Feature Requests

### Before Submitting

1. **Check existing feature requests** to avoid duplicates
2. **Consider the scope** - does it fit the project goals?
3. **Think about implementation** - is it technically feasible?

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or examples.
```

## 🔧 Code Contributions

### Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow existing patterns
   - Add tests if applicable

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   npm run preview
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Commit Message Format

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```bash
feat: add drag and drop for experience items
fix: resolve PDF generation on mobile devices
docs: update installation instructions
style: improve button hover states
refactor: simplify form validation logic
```

### Pull Request Guidelines

#### PR Title
Use the same format as commit messages:
```
feat: add new resume template
```

#### PR Description Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] Tested PDF generation
- [ ] Tested data persistence

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated if needed
- [ ] No breaking changes (or clearly documented)
```

## 🧪 Testing

### Manual Testing

Before submitting PRs, test these areas:

#### Core Functionality
- [ ] Form inputs work correctly
- [ ] Data persists across page reloads
- [ ] PDF generation produces quality output
- [ ] All templates render correctly

#### Responsive Design
- [ ] Mobile layout works (320px+)
- [ ] Tablet layout works (768px+)
- [ ] Desktop layout works (1024px+)

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets standards
- [ ] Focus indicators visible

### Adding Tests

While we don't have automated tests yet, consider:

1. **Unit Tests**: For utility functions
2. **Component Tests**: For complex components
3. **Integration Tests**: For user workflows
4. **E2E Tests**: For critical paths

## 📝 Documentation

### Types of Documentation

- **Code Comments**: Explain complex logic
- **README Updates**: Keep installation/usage current
- **API Documentation**: Document interfaces and types
- **User Guides**: Help users understand features

### Documentation Style

- **Clear and Concise**: Easy to understand
- **Examples**: Include code examples
- **Up-to-date**: Keep in sync with code changes
- **Accessible**: Consider all skill levels

## 🎨 Design Contributions

### Design Principles

- **Simplicity**: Clean, uncluttered interfaces
- **Accessibility**: Usable by everyone
- **Consistency**: Follow established patterns
- **Performance**: Fast and responsive

### Design Tools

- **Figma**: For mockups and prototypes
- **Tailwind CSS**: For implementation
- **Lucide Icons**: For consistent iconography

### Submitting Designs

1. Create mockups in Figma or similar tool
2. Share design files or screenshots
3. Explain design decisions
4. Consider implementation complexity

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number bumped
- [ ] Changelog updated
- [ ] Build succeeds
- [ ] Deploy to staging
- [ ] Final testing
- [ ] Deploy to production

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Request Comments**: Code-specific discussions

### Response Times

- **Bug Reports**: Within 48 hours
- **Feature Requests**: Within 1 week
- **Pull Requests**: Within 1 week

## 🏆 Recognition

### Contributors

All contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Special mentions for outstanding contributions

### Types of Recognition

- **Code Contributors**: Direct code contributions
- **Bug Reporters**: High-quality bug reports
- **Feature Requesters**: Valuable feature suggestions
- **Documentation**: Documentation improvements
- **Community**: Helping other users

## 📜 Code of Conduct

### Our Standards

- **Respectful**: Treat everyone with respect
- **Inclusive**: Welcome diverse perspectives
- **Constructive**: Provide helpful feedback
- **Professional**: Maintain professional communication

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Spam or off-topic content

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to project maintainers.

## 📚 Resources

### Learning Resources

- **React**: [Official React Documentation](https://react.dev/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **Vite**: [Vite Guide](https://vitejs.dev/guide/)

### Tools

- **VS Code**: Recommended editor with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

### Project-Specific Resources

- [Project README](../README.md)
- [API Documentation](API.md)
- [Deployment Guide](DEPLOYMENT.md)

---

**Thank you for contributing to TalentScript!** 🎉

Your contributions help make resume building accessible and beautiful for everyone.