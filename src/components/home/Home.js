import React from 'react'
import Products from "./Products"
function Home({ input }) {
    return (
        <div>
            <Products input={input} />
        </div>
    )
}

export default Home
