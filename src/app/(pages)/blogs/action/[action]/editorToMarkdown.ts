function editorJsToMarkdown(data) {
    let markdown = '';
  
    data.blocks.forEach((block) => {
      switch (block.type) {
        case 'header':
          markdown += `${'#'.repeat(block.data.level)} ${block.data.text}\n\n`;
          break;
        case 'paragraph':
          markdown += `${block.data.text}\n\n`;
          break;
        case 'list':
          block.data.items.forEach((item) => {
            markdown += block.data.style === 'unordered' ? `- ${item}\n` : `1. ${item}\n`;
          });
          markdown += '\n';
          break;
        case 'quote':
          markdown += `> ${block.data.text}\n\n`;
          break;
        // Add other block types as needed
        default:
          markdown += `Unsupported block: ${block.type}\n\n`;
      }
    });
  
    return markdown.trim();
  }
  
  // Usage Example
  async function saveContentToMarkdown() {
    const outputData = await editor.save();
    const markdown = editorJsToMarkdown(outputData);
    console.log(markdown);
  }
  