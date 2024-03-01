import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express()
app.use(express.urlencoded({extended: true}))

const productos = new ProductManager()
const leerProducts = productos.readProducts()

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await leerProducts)
    let allProducts = await leerProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
})

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await leerProducts
    let productById = allProducts.find(producto => producto.id === id)
    res.send(productById)
})



const puerto = 8080
const server = app.listen(puerto, () => {
    console.log(`express por local host ${server.address().port}`)
})


server.on("error", (error) => {
    console.log(`Error del servidor ${error}`)
})