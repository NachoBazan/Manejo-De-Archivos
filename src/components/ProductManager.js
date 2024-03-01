import { promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.path = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts() 
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter))
        console.log("Producto eliminado.")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productModif = [
            {...producto, id},
            ...productOld
        ]
        await fs.writeFile(this.path, JSON.stringify(productModif))
        }


}

//const productos = new ProductManager

// Agregar productos
/*productos.addProduct("Nike Air Force 1 07", "Zapatillas de Moda para Hombre", 178000,
"https://nikearprod.vtexassets.com/arquivos/ids/659760-800-800?width=800&height=800&aspect=true", "h523", 10)

productos.addProduct("Nike", "Botines de Pasto Sintético para Niño/a", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)

productos.addProduct("Nike Jr ", "Botines de Pasto Sintético para Niño/a", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)

productos.addProduct("Nike Jr Phantom ", "Botines de Pasto Sintético para Niño/a", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)

productos.addProduct("Nike Jr Phantom GX ", "Botines de Pasto Sintético para Niño/a", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)

productos.addProduct("Nike Jr Phantom GX Academy", "Botines de Pasto Sintético para Niño/a", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)

productos.addProduct("Nike Jr Phantom GX Academy 1", "Botines", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)

productos.addProduct("Nike Jr Phantom GX Academy 2", "Botines de Pasto Sintético ", 105000,
"https://nikearprod.vtexassets.com/arquivos/ids/734429-800-800?width=800&height=800&aspect=true", "h555", 20)
*/

//productos.getProducts()


// Buscar productos por Id
//productos.getProductsById(2)


//Eliminar productos por ID
//productos.deleteProductsById(1)
//productos.deleteProductsById(2)


// Actualizar productos
/*productos.updateProducts({
    title: 'Nike Dunk Low',
    description: 'Zapatillas de Moda para Mujer',
    price: 2000,
    thumbnail: 'https://nikearprod.vtexassets.com/arquivos/ids/773875-800-800?width=800&height=800&aspect=true',
    code: 'b433',
    stock: 200,
    id: 2
})
*/
