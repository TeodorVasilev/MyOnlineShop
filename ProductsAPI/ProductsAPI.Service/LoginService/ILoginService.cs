namespace ProductsAPI.Service.LoginService
{
    public interface ILoginService
    {
        Task<(string token, string message)> Attempt(string email, string password);
    }
}
