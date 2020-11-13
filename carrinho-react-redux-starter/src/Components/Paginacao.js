import React from 'react'

export default ({ proxima, anterior, primeira, ultima, atual, onClick, categoriaAtual }) => {
    console.log('--atual--')
    console.log(atual)
    console.log('--atual--')
    return (
        <nav aria-label="Navegação de página">
            <ul class="pagination">
                {anterior && <li class="page-item">
                   <button
                        onClick={() => onClick(categoriaAtual, anterior)}
                        class="page-link" 
                        >Anterior
                    </button>
                </li>}
                {[...new Array(ultima)].map((valor,indice)=>(
                    <li className={`page-item${(indice + 1) === atual ? ' disabled ':''}`}>
                        <button 
                            onClick={() => onClick(categoriaAtual, indice + 1)}
                            class={`page-link${(proxima) === atual ? ' disabled ':''}`}
                            >{indice + 1}
                        </button>
                    </li>
                ))}
                {proxima && <li class="page-item">
                   <button
                        onClick={() => onClick(categoriaAtual, proxima)}
                        class="page-link" 
                        >Próximo
                    </button>
                </li>}
            </ul>
        </nav>
    )
}