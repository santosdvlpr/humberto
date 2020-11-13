const urlBase = 'http://localhost:3000' 
export function getProdutosPorPagina(pagina = 1) { 
        console.log('fetch por pagina')
        return (
        new Promise((resolve) => {
            window
            .fetch(`${urlBase}/produtos?pagina=${pagina}`)
            .then( data => data.json())
            .then(resolve)
        })
    )
}
export function getProdutosPorCategoria(categoria, pagina = 1) { 
        console.log(`${urlBase}/categorias/${categoria}/produtos?pagina=${pagina}`)
        return  (
        new Promise((resolve) => {
            window
            .fetch(`${urlBase}/categorias/${categoria}/produtos?pagina=${pagina}`)
            .then( data => data.json())
            .then(resolve)
        })
    )
}

export const getCategorias = () => (
    new Promise((resolve) => {
        window
        .fetch(`${urlBase}/categorias`)
        .then( data => data.json())
        .then(resolve)
    })
)
