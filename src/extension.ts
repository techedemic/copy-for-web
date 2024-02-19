import * as vscode from 'vscode';
import * as path from 'path';



export function  activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copyFileForWeb.copy', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active file opened.');
            return; 
        }

        // Dynamically obtain correct path
        const currentFileDir = path.dirname(__filename);
        let extensionFilePath = path.join(currentFileDir, 'out', 'extension.js'); 
		const fileName = extensionFilePath.split('/').pop() || '';

     
		const fileContents = editor.document.getText();

		// Format the copied text
		const contentToCopy = `${fileName}\n\`\`\`\n${fileContents}\n\`\`\``;

		// Copy the text to the clipboard
		await vscode.env.clipboard.writeText(contentToCopy);

		vscode.window.showInformationMessage('File content copied for assistance!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
