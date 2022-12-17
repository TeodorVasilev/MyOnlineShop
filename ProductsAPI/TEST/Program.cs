
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;

using (var context = new ProductsDbContext())
{
    var user = context.Users.Where(u => u.Id == 4).Include(u => u.CartProducts).ThenInclude(c => c.Product).FirstOrDefault();
    var products = user.CartProducts.Select(c => c.Product).ToList();

    //foreach (var product in products)
    //{
    //    Console.WriteLine(product.Name);
    //}

    //foreach (var product in user.CartProducts)
    //{
    //    Console.WriteLine(product);
    //}
}