import * as vscode from 'vscode';
import { chatRequestHandler } from './chatRequestHandler';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "code-runner-copilot" is now active!');

	let disposable = vscode.commands.registerCommand('code-runner-copilot.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Code Runner Copilot!');
	});

	context.subscriptions.push(disposable);

	const chatParticipant = vscode.chat.createChatParticipant("code-runner-copilot.coderunner", chatRequestHandler);

    context.subscriptions.push(chatParticipant);
}

export function deactivate() {}
