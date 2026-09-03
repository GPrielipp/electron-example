const info = document.getElementById('info');

info.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;


// handle IPC from the main process
const func = async () => {
    const response = await window.versions.ping();
    info.innerText += `\n\nIPC response from main process: ${response}`;
}

func();