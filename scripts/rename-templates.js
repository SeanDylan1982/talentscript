const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);

// Template mapping: old name -> new name
const templateMapping = {
  // Minimal Style (MIN-XX-Name)
  'MinimalTemplate.tsx': 'MIN-01-Minimal.tsx',
  'MinimalistTemplate.tsx': 'MIN-02-Minimalist.tsx',
  'MinimalistATS.tsx': 'MIN-03-ATS.tsx',
  'MinimalistSidebarTemplate.tsx': 'MIN-04-Sidebar.tsx',
  'CleanMinimalistTemplate.tsx': 'MIN-05-Clean.tsx',

  // Professional Style (PRO-XX-Name)
  'ProfessionalTemplate.tsx': 'PRO-01-Professional.tsx',
  'ProfessionalSidebarTemplate.tsx': 'PRO-02-Sidebar.tsx',
  'ProfessionalBlueTemplate.tsx': 'PRO-03-Blue.tsx',
  'ProfessionalSummaryTemplate.tsx': 'PRO-04-Summary.tsx',
  'MinimalistProfessionalTemplate.tsx': 'PRO-05-Minimalist.tsx',
  'ModernProfessionalTemplate.tsx': 'PRO-06-Modern.tsx',
  'CleanProfessionalTemplate.tsx': 'PRO-07-Clean.tsx',

  // Creative Style (CRE-XX-Name)
  'CreativeTemplate.tsx': 'CRE-01-Creative.tsx',
  'CreativeColorBlocksTemplate.tsx': 'CRE-02-ColorBlocks.tsx',
  'ModernTemplate.tsx': 'CRE-03-Modern.tsx',
  'ModernSidebarTemplate.tsx': 'CRE-04-ModernSidebar.tsx',
  'ModernDarkSidebarTemplate.tsx': 'CRE-05-DarkSidebar.tsx',

  // Executive Style (EXE-XX-Name)
  'ExecutiveTemplate.tsx': 'EXE-01-Executive.tsx',
  'ModernExecutiveTemplate.tsx': 'EXE-02-Modern.tsx',
  'CorporateTemplate.tsx': 'EXE-03-Corporate.tsx',

  // Other Style (OTH-XX-Name)
  'AcademicTemplate.tsx': 'OTH-01-Academic.tsx',
  'BoldTemplate.tsx': 'OTH-02-Bold.tsx',
  'ElegantTemplate.tsx': 'OTH-03-Elegant.tsx',
  'TechTemplate.tsx': 'OTH-04-Tech.tsx',
  'TimelineTemplate.tsx': 'OTH-05-Timeline.tsx',
  'ModernTimelineTemplate.tsx': 'OTH-06-ModernTimeline.tsx',
  'ModernTwoColumn.tsx': 'OTH-07-TwoColumn.tsx'
};

// ID mapping for template registry
const idMapping = {
  // Minimal Style
  'minimal': 'min-01-minimal',
  'minimalist': 'min-02-minimalist',
  'minimalist-ats': 'min-03-ats',
  'minimalist-sidebar': 'min-04-sidebar',
  'clean-minimalist': 'min-05-clean',

  // Professional Style
  'professional': 'pro-01-professional',
  'professional-sidebar': 'pro-02-sidebar',
  'professional-blue': 'pro-03-blue',
  'professional-summary': 'pro-04-summary',
  'minimalist-professional': 'pro-05-minimalist',
  'modern-professional': 'pro-06-modern',
  'clean-professional': 'pro-07-clean',

  // Creative Style
  'creative': 'cre-01-creative',
  'creative-color-blocks': 'cre-02-color-blocks',
  'modern': 'cre-03-modern',
  'modern-sidebar': 'cre-04-modern-sidebar',
  'modern-dark-sidebar': 'cre-05-dark-sidebar',

  // Executive Style
  'executive': 'exe-01-executive',
  'modern-executive': 'exe-02-modern',
  'corporate': 'exe-03-corporate',

  // Other Style
  'academic': 'oth-01-academic',
  'bold': 'oth-02-bold',
  'elegant': 'oth-03-elegant',
  'tech': 'oth-04-tech',
  'timeline': 'oth-05-timeline',
  'modern-timeline': 'oth-06-modern-timeline',
  'modern-two-column': 'oth-07-two-column'
};

async function updateTemplateRegistry() {
  const registryPath = path.join(__dirname, '../src/components/resume-builder/templateRegistry.ts');
  let registryContent = await fs.promises.readFile(registryPath, 'utf8');
  
  // Update imports
  for (const [oldName, newName] of Object.entries(templateMapping)) {
    const oldImportName = oldName.replace('.tsx', '');
    const newImportName = newName.replace('.tsx', '');
    
    // Update imports
    const importRegex = new RegExp(`import\('\..\/templates\/${oldName.replace('.', '\.')}'\)`, 'g');
    registryContent = registryContent.replace(importRegex, `import('..\/templates\/${newName}')`);
    
    // Update component names in the registry
    const componentRegex = new RegExp(`component: templates\.${oldImportName}`, 'g');
    registryContent = registryContent.replace(componentRegex, `component: templates.${newImportName}`);
  }
  
  // Update template IDs in the registry
  for (const [oldId, newId] of Object.entries(idMapping)) {
    const idRegex = new RegExp(`id: '${oldId}'`, 'g');
    registryContent = registryContent.replace(idRegex, `id: '${newId}'`);
  }
  
  // Write the updated registry back to disk
  await fs.promises.writeFile(registryPath, registryContent, 'utf8');
  console.log('Template registry updated successfully');
}

async function renameTemplateFiles() {
  const templatesDir = path.join(__dirname, '../src/components/resume-builder/templates');
  const files = await readdir(templatesDir);
  
  for (const file of files) {
    if (templateMapping[file]) {
      const oldPath = path.join(templatesDir, file);
      const newPath = path.join(templatesDir, templateMapping[file]);
      
      try {
        await rename(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${templateMapping[file]}`);
      } catch (err) {
        console.error(`Error renaming ${file}:`, err);
      }
    }
  }
}

async function main() {
  try {
    console.log('Starting template renaming process...');
    
    // First rename all the files
    console.log('\nRenaming template files...');
    await renameTemplateFiles();
    
    // Then update the template registry
    console.log('\nUpdating template registry...');
    await updateTemplateRegistry();
    
    console.log('\nTemplate renaming completed successfully!');
    console.log('Please review the changes and run tests to ensure everything works as expected.');
    
  } catch (error) {
    console.error('Error during template renaming:', error);
    process.exit(1);
  }
}

main();
