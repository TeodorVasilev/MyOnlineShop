using System.ComponentModel.DataAnnotations;

namespace ProductsAPI.DAL.Models.Orders
{
    public enum OrderStatus
    {
        [Display(Name = "Pending")]
        Pending,
        [Display(Name = "Shipped")]
        Shipped,
        [Display(Name = "Completed")]
        Finished,
        [Display(Name = "Cancelled")]
        Cancelled
    }
}
