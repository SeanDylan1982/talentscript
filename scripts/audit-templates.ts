import fs from 'fs';
import path from 'path';

const templatesDir = path.join(process.cwd(), 'src/components/resume-builder/templates');
const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.tsx'));

interface TemplateAuditResult {
  filename: string;
  hasTemplateProps: boolean;
  exportName: string;
  hasDefaultExport: boolean;
  issues: string[];
}

const auditResults: TemplateAuditResult[] = [];

// Check each template file
templateFiles.forEach(filename => {
  const filePath = path.join(templatesDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const result: TemplateAuditResult = {
    filename,
    hasTemplateProps: content.includes('interface TemplateProps') || content.includes('type TemplateProps'),
    exportName: '',
    hasDefaultExport: content.includes('export default'),
    issues: []
  };

  // Extract export name
  const exportMatch = content.match(/export\s+(?:function|const|class)\s+(\w+)/);
  if (exportMatch) {
    result.exportName = exportMatch[1];
  } else {
    result.issues.push('No named export found');
  }

  // Check for common issues
  if (!result.hasTemplateProps) {
    result.issues.push('Missing TemplateProps interface/type');
  }

  // Check if export name matches filename
  const expectedExportName = filename.replace('.tsx', '');
  if (result.exportName && result.exportName !== expectedExportName) {
    result.issues.push(`Export name (${result.exportName}) doesn't match filename (${expectedExportName})`);
  }

  auditResults.push(result);
});

// Generate report
console.log('## Template Audit Report');
console.log(`Generated: ${new Date().toISOString()}`);
console.log(`Templates Audited: ${auditResults.length}\n`);

// Summary
const templatesWithIssues = auditResults.filter(t => t.issues.length > 0);
console.log('### Summary');
console.log(`- Total Templates: ${auditResults.length}`);
console.log(`- Templates with issues: ${templatesWithIssues.length}`);
console.log(`- Templates without TemplateProps: ${auditResults.filter(t => !t.hasTemplateProps).length}`);
console.log(`- Templates with default export: ${auditResults.filter(t => t.hasDefaultExport).length}\n`);

// Detailed report
if (templatesWithIssues.length > 0) {
  console.log('### Templates with Issues');
  templatesWithIssues.forEach(template => {
    console.log(`\n#### ${template.filename}`);
    if (template.exportName) {
      console.log(`- Export: ${template.exportName}`);
    }
    template.issues.forEach(issue => {
      console.log(`- ❌ ${issue}`);
    });
  });
}

// All templates list
console.log('\n### All Templates');
console.log('| Filename | Export Name | Issues |');
console.log('|----------|-------------|--------|');
auditResults.forEach(template => {
  const status = template.issues.length === 0 ? '✅' : '❌';
  console.log(`| ${template.filename} | ${template.exportName || 'N/A'} | ${template.issues.length} issue(s) |`);
});

// Save report to file
const reportPath = path.join(process.cwd(), 'TEMPLATE_AUDIT_REPORT.md');
const reportStream = fs.createWriteStream(reportPath);

reportStream.write('# Template Audit Report\n');
reportStream.write(`Generated: ${new Date().toISOString()}\n\n`);

// Summary
auditResults.forEach(template => {
  reportStream.write(`## ${template.filename}\n`);
  reportStream.write(`- Export: ${template.exportName || 'N/A'}\n`);
  reportStream.write(`- Has TemplateProps: ${template.hasTemplateProps ? '✅' : '❌'}\n`);
  reportStream.write(`- Has Default Export: ${template.hasDefaultExport ? '✅' : '❌'}\n`);
  
  if (template.issues.length > 0) {
    reportStream.write('### Issues\n');
    template.issues.forEach(issue => {
      reportStream.write(`- ❌ ${issue}\n`);
    });
  } else {
    reportStream.write('✅ No issues found\n');
  }
  reportStream.write('\n');
});

reportStream.end();

console.log(`\nAudit complete. Detailed report saved to: ${reportPath}`);
