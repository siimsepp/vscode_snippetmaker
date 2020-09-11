// Author: Siim Sepp
// Github repo: https://github.com/siimsepp/vscode_snippetmaker.git

const nupp = document.getElementById('nupp');

nupp.addEventListener('click', generateSnippet);

function generateSnippet(e) {
    // e.preventDefault();
    const prefix = document.getElementById('prefix').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code-textarea').value;

    const codeLinesArr = code.split('\n');

    let snippet = '';
    snippet += `"${prefix}": {<br>`;
    snippet += `&#160;&#160;"prefix": "${prefix}",<br>`;
    snippet += `&#160;&#160;"body": [<br>`;
    codeLinesArr.forEach(line => {
        snippet += `&#160;&#160;&#160;&#160;"${line}",<br>`;
    });
    snippet += `&#160;&#160;],<br>`;
    snippet += `&#160;&#160;"description": "${description}"<br>`;
    snippet += `},`;

    // See on vajalik, sest snippetites käsitletakse tähendusega $ erisümbolina. $ asemel peab olema \\$.
    snippet = snippet.replace('$', '\\\\$');

    snipOutput = document.getElementById('snippet');
    snipOutput.innerHTML = snippet;

    // See on vajalik, et clipboardile kopeeritav tekst oleks ridade kaupa.
    snippetCopy = snippet.replaceAll('&#160;', ' ');
    snippetCopy = snippetCopy.replaceAll('<br>', '\n');

    nupp.disabled = true;
    document.querySelector('#kopeeri').style.visibility = 'visible';

    document.getElementById('kopeeri').addEventListener('click', e => {
        // Teen selle elemendi, sest select() meetodi abil saab valida vaid text input ja textarea välju. 
        // Textarea on vajalik, et säiliksid reavahed.
        const input = document.body.appendChild(document.createElement("textarea"));
        input.innerHTML = snippetCopy;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);
    });


}






