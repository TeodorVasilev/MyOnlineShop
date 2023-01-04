
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.Models.Products;

using (var context = new ProductsDbContext())
{
    //var property = context.Properties.Where(p => p.Id == 1).Include(p => p.Options).FirstOrDefault();

    //var option = new Option();

    //option.Name = "Red";

    //property.Options.Add(option);

    //context.SaveChanges();

    //var product = context.Products.Where(p => p.Id == 6).Include(p => p.Properties).ThenInclude(p => p.Options).FirstOrDefault();

    //Console.WriteLine(product.Name);
    //foreach (var item in product.Properties)
    //{
    //    Console.WriteLine(item.Name);

    //    foreach (var propOption in item.Options)
    //    {
    //        Console.WriteLine(propOption.Name);
    //    }
    //}

    var user = context.Users.Where(u => u.Id == 4).Include(u => u.CartProducts).FirstOrDefault();
    //add product with options to user cart;

    var property = context.Properties.Where(p => p.Id == 1).Include(p => p.Options).FirstOrDefault();

    var product = context.Products.Where(p => p.Id == 4).Include(p => p.Options).FirstOrDefault();

    //product.Options.Add(property.Options.Where(o => o.Id == 1).FirstOrDefault());

    var cart = new Cart();
    cart.ProductId = product.Id;
    cart.UserId = user.Id;
    cart.Quantity = 1;

    user.CartProducts.Add(cart);

    context.SaveChanges();
}