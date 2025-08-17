using System;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;

namespace AnasBE.Controllers
{
    [Route("[Controller]")]
    public class ProductsController : Controller
    {

        string _connectionString = "Server=localhost;Port=3306;Database=productstore;User=root;Password=Anas@12345;AllowPublicKeyRetrieval=True;SslMode=None;";


        [HttpGet("getproducts")]
        public IActionResult GetProducts()
        {
            using (var conn = new MySqlConnection(_connectionString))
            {
                List<Product> productList = new List<Product>();
                try
                {
                    conn.Open();
                    var query = "select * from products;";
                    using (var cmd = new MySqlCommand(query, conn))
                    {
                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                productList.Add(new Product
                                {
                                    id = reader.GetInt32("id"),
                                    name = reader.GetString("name"),
                                    image = reader.GetString("image")
                                });
                            }
                        }
                    }
                }
                catch (MySqlException ex)
                {
                    return BadRequest("MySql Error: " + ex.Message);
                }
                return Ok(productList);
            }
        }


        [HttpPost("createProducts")]
        public IActionResult createProducts([FromBody] Product body)
        {
            using (var conn = new MySqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                    var query = "insert into products (name,image) values('" + body.name + "','" + body.image + "');";
                    using (var cmd = new MySqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("name", body.name);
                        cmd.Parameters.AddWithValue("image", body.image);
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (MySqlException ex)
                {
                    return BadRequest("Server Error: " + ex.Message);
                }
                return Ok("Product created successfully");
            }
        }

        [HttpPut("updateproduct/{id}")]
        public IActionResult updateProducts(int id, [FromBody] Product body)
        {
            using (var conn = new MySqlConnection(_connectionString))
            {

                if (body == null ||
                   string.IsNullOrWhiteSpace(body.name) ||
                   string.IsNullOrWhiteSpace(body.image))
                {
                    return BadRequest("Please provide all required fields.");
                }

                try
                {
                    conn.Open();
                    string query = "update products set name = '" + body.name+"', image = '"+body.image+"' where id='"+id+"'";
                    using (var cmd = new MySqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("name", body.name);
                        cmd.Parameters.AddWithValue("image", body.image);
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Product updated successfully!");
                        }
                        else
                            return NotFound("Product not found.");
                    }
                }
                catch (MySqlException ex)
                {
                    return BadRequest("Server Error: " + ex.Message);
                }        
            }
        }


        [HttpDelete("deleteproduct/{id}")]

        public IActionResult DeleteProducts(int id)
        {
            using (var conn = new MySqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                    string query = "delete from products where id='"+id+"'";
                    using (var cmd = new MySqlCommand(query, conn))
                    {
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Product Deleted successfully!");
                        }
                        else
                            return NotFound("Product not found.");
                    }
                }
                catch (MySqlException ex)
                {
                    return BadRequest("server Error:" + ex.Message);
                }
                return Ok("Product Deleted Successfully");
}
        }
    
    } 
 }


public class Product
{
        public int id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
}