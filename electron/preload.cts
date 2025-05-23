// electron/preload.cts
export {}; // Explicitly make this file a module

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('assistantAPI', {
  mouse: {
    click: (params: { x: number; y: number }) => ipcRenderer.invoke('mouse:click', params),
    move: (params: { x: number; y: number }) => ipcRenderer.invoke('mouse:move', params),
  },
  keyboard: {
    typeText: (params: { text: string }) => ipcRenderer.invoke('keyboard:typeText', params),
  },
  app: {
    openApp: (params: { appName: string }) => ipcRenderer.invoke('app:openApp', params),
    closeApp: () => ipcRenderer.invoke('app:closeApp'),
  },
  browser: {
    navigate: (params: { url: string }) => ipcRenderer.invoke('browser:navigate', params),
    openTab: (params: { url: string }) => ipcRenderer.invoke('browser:openTab', params),
  },
  media: {
    play: () => ipcRenderer.invoke('media:play'),
    pause: () => ipcRenderer.invoke('media:pause'),
  },
  vision: {
    captureScreen: () => ipcRenderer.invoke('vision:captureScreen'),
    captureCamera: () => ipcRenderer.invoke('vision:captureCamera'),
    parseDiagram: (params: { image: string }) => ipcRenderer.invoke('vision:parseDiagram', params),
  },
  memory: {
    logEvent: (params: { tag: string; data: any }) => ipcRenderer.invoke('memory:logEvent', params),
    retrieveMemories: (params: { query: string }) => ipcRenderer.invoke('memory:retrieveMemories', params),
  },
  editor: {
    openEditor: (params: { editor: string }) => ipcRenderer.invoke('editor:openEditor', params),
    writeCode: (params: { code: string }) => ipcRenderer.invoke('editor:writeCode', params),
  },
  chat: {
    analyzeChat: (params: { transcript: string }) => ipcRenderer.invoke('chat:analyzeChat', params),
  },
  codegen: {
    generateCode: (params: { spec: string }) => ipcRenderer.invoke('custom-code:generateCode', params),
  },
  dependency: {
    install: (params: { package: string }) => ipcRenderer.invoke('dependency:install', params),
  },
  db: {
    query: (params: { table: string; query: any }) => ipcRenderer.invoke('db:query', params),
  },
});