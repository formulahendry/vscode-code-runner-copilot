import * as vscode from 'vscode';

const MODEL_SELECTOR: vscode.LanguageModelChatSelector = { vendor: 'copilot', family: 'gpt-4o' };

export async function chatRequestHandler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) {
    if (request.command === 'run') {
        vscode.commands.executeCommand('code-runner.run');
        stream.markdown('Calling "Code Runner" extension to run code...');
    } else {
        const messages = [
            vscode.LanguageModelChatMessage.User(`You are a VS Code expert to use "Code Runner" extension to run code in VS Code.  
                Your job is to explain how to use "Code Runner" extension to run code.

                Below are reference to help you explain:
                https://github.com/formulahendry/vscode-code-runner/blob/master/README.md
                https://github.com/formulahendry/vscode-code-runner/issues?q=is%3Aissue+label%3Afyi+is%3Aclosed
                https://stackoverflow.com/questions/tagged/vscode-code-runner

                Only answer questions that related to how to use "Code Runner" extension to run code in VS Code.`),
            vscode.LanguageModelChatMessage.User(request.prompt)
        ];
        const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
        const chatResponse = await model.sendRequest(messages, {}, token);
        for await (const fragment of chatResponse.text) {
            stream.markdown(fragment);
        }
    }
}