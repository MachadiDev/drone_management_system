/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly API_BASE_URL: string
    // adicione todas as suas variáveis aqui
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}