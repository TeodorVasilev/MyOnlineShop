namespace ProductsAPI.DAL.ViewModels.Account
{
    public class RoleViewModel
    {
        public RoleViewModel()
        {
            this.Users = new List<UserViewModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<UserViewModel> Users { get; set; }
    }
}
