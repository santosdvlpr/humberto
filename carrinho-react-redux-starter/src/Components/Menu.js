import React from 'react'

export default ({ categorias, onClick, buscaTodas    }) => (
    <nav class="nav flex-column">
        <a class="nav-link" href="#" onClick={() => buscaTodas('')}>Tôdas</a>
    {categorias.map((categoria, index) => (
        <a class="nav-link" href="#" onClick={() => onClick(categoria)}>{categoria}</a>
    ))}
    </nav>
)