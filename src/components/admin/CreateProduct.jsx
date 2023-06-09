import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, listProducts, updateSelectedProduct } from '../../redux/actions/productActions'
import "./admin.css"
import { useNavigate } from 'react-router-dom'
const CreateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createProducts = useSelector(state => state.createProduct)
    const { loading, error } = createProducts


    // getting product update data
    const singleProduct = useSelector(state => state.getUpdateProduct)
    const { updateProduct } = singleProduct
    console.log(updateProduct)

    const productList = useSelector(state => state.productList)
    // const s = useSelector(state => state)
    const { products } = productList
    const categories = products?.map((product) => product?.category)
    let unique = [...new Set(categories)];
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const [input, setInput] = useState({
        name: updateProduct?.name || "", slug: updateProduct?.slug || "", description: updateProduct?.description || "", price: updateProduct?.price || "", rating: updateProduct?.ratings || '', brand: updateProduct?.brand || "", inStock: updateProduct?.inStock || "", instruction: updateProduct?.instruction || ""
    })
    const [selected, setSelected] = useState(updateProduct?.category || '')
    const [isActive, setIsActive] = useState(false)
    const [image, setImage] = useState('')

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const { name, slug, description, price, rating, brand, inStock, instruction } = input

        const formData = new FormData()
        formData.append("name", name)
        formData.append("slug", slug)
        formData.append("image", image)
        formData.append("category", selected)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("rating", rating)
        formData.append("brand", brand)
        formData.append("inStock", inStock)
        formData.append("instruction", instruction)
        if (!name || !slug || !description || !price || !rating || !brand || !inStock || !instruction) {
            alert("all fields requires")
            return
        }
        dispatch(createProduct(formData))
        setInput({ name: "", slug: "", description: "", price: "", rating: '', brand: "", inStock: "", instruction: "" })
        setSelected("")
        setImage("")
    }

    const updateSelectedProductData = (e) => {
        // e.preventDefault()

        const { name, slug, description, price, rating, brand, inStock, instruction } = input

        if (!name || !slug || !description || !price || !rating || !brand || !inStock || !instruction) {
            alert("all fields requires")
            return
        }
        dispatch(updateSelectedProduct(updateProduct._id, input))
        setInput({ name: "", slug: "", description: "", price: "", rating: '', brand: "", inStock: "", instruction: "" })
        navigate("/")
        // window.location.reload()
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h3 className="text-4xl font-semibold text-gray-900 mb-6">Create Product</h3>
            <div className="flex flex-col gap-4 border-5 w-full p-9">
                <form className="flex flex-col">
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="name" className="text-gray-800">Product Name</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="name"
                            placeholder="product name"
                            autoComplete="off"
                            value={input.name}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="slug" className="text-gray-800">Slug Name</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="slug"
                            placeholder="slug Name must be product related and little bit unique"
                            autoComplete="off"
                            value={input.slug}
                            onChange={inputHandler}
                        />
                    </div>
                    {
                        updateProduct ? null :
                            <div className="flex flex-col py-1 text-gray-400 text-lg">
                                <label htmlFor="image" className="text-gray-800">Image</label>
                                <input
                                    type="file"
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                                    name="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                    }
                    {
                        updateProduct ? null :
                            <div className="dropdown-container">
                                <label className="text-gray-800">Product Category</label>

                                <div className="dropdown" onClick={() => setIsActive(!isActive)}>
                                    {selected ?
                                        <>
                                            <div className="dropdown-btn" >{selected}</div>
                                            <i className='bx bx-chevron-down arrow-city'></i>
                                        </>

                                        :
                                        <>
                                            <span className="se">Select Product Category</span>
                                            <i className='bx bx-chevron-down arrow-city'></i>
                                        </>

                                    }
                                    {isActive &&
                                        <div className="dropdown-content">

                                            {unique.map((option, idx) => {
                                                return (
                                                    <div className="dropdown-item"
                                                        key={idx}
                                                        onClick={e => {
                                                            setSelected(option)
                                                            setIsActive(false)
                                                        }}
                                                    >
                                                        {option}

                                                    </div>
                                                )
                                            })}

                                        </div>
                                    }
                                </div>

                            </div>
                    }
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="description" className="text-gray-800">description</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="description"
                            placeholder="product description"
                            value={input.description}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="price" className="text-gray-800">Price</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="price"
                            placeholder="product price must be numbers"
                            value={input.price}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="rating" className="text-gray-800">Rating</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="rating"
                            placeholder="product rating must be in number between 1 to 5"
                            value={input.rating}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="brand" className="text-gray-800">Brand</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="brand"
                            placeholder="product brand"
                            value={input.brand}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="inStock" className="text-gray-800">Product Stock</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="inStock"
                            placeholder="product inStock"
                            value={input.inStock}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label htmlFor="instruction" className="text-gray-800">Product Instruction</label>
                        <input
                            type="text"
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="instruction"
                            placeholder="product instruction"
                            value={input.instruction}
                            onChange={inputHandler}
                        />
                    </div>
                    {error && <span className="text-red-700 font-bold text-lg capitalize">{error}</span>}


                    {/* <button className="w-full my-1 py-2 bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">Create</button> */}
                    {
                        updateProduct ?
                            <button onClick={updateSelectedProductData} className="w-full my-1 py-2 bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">Update</button>
                            :
                            <button onClick={submitHandler} className="w-full my-1 py-2 bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">Create</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
