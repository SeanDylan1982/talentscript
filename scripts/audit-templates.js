import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, '..', 'src', 'components', 'resume-builder', 'templates');
const outputFile = path.join(__dirname, '..', 'TEMPLATE_AUDIT_REPORT.md');

// Get all template files
const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.tsx'));

// Initialize report
let report = '# Template Audit Report\n\n';
report += `Generated: ${new Date().toISOString()}\n\n`;
report += `Total templates found: ${templateFiles.length}\n\n`;

// Check each template file
templateFiles.forEach((file, index) => {
  const filePath = path.join(templatesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Basic checks
  const hasTemplateProps = content.includes('interface TemplateProps') || content.includes('type TemplateProps');
  const hasExport = content.includes(`export function ${file.replace('.tsx', '')}`);
  const hasDefaultExport = content.includes('export default');
  
  // Add to report
  report += `## ${file}\n`;
  report += `- **Export Name:** ${file.replace('.tsx', '')}\n`;
  report += `- **Has TemplateProps:** ${hasTemplateProps ? '✅' : '❌'}\n`;
  report += `- **Has Correct Export:** ${hasExport ? '✅' : '❌'}\n`;
  report += `- **Has Default Export:** ${hasDefaultExport ? '✅' : '❌'}\n`;
  
  // Check for common issues
  const issues = [];
  if (!hasTemplateProps) issues.push('Missing TemplateProps interface/type');
  if (!hasExport) issues.push(`Missing export for ${file.replace('.tsx', '')}`);
  
  if (issues.length > 0) {
    report += '\n**Issues:**\n';
    issues.forEach(issue => {
      report += `- ❌ ${issue}\n`;
    });
  } else {
    report += '\n✅ No issues found\n';
  }
  
  report += '\n---\n\n';
});

// Save the report
fs.writeFileSync(outputFile, report);
console.log(`Audit complete. Report saved to: ${outputFile}`);
